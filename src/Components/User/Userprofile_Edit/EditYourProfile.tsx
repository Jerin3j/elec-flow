import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaX } from 'react-icons/fa6'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Database } from '../../../Types/supaTypes'
import { RootState } from '../../../Reducer/store'
import { useSelector } from 'react-redux'
import { PostgrestResponse } from '@supabase/supabase-js'
import supabase from '../../../Config/supabaseClient'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import { useDispatch } from 'react-redux'
import { changeIsEdited, setLocationDetails } from '../../../Reducer/Slices/locationSlice'
import BarLoader from '../../BarLoader'
import { toast, ToastContainer } from 'react-toastify'
 
const EditYourProfile:React.FC = () => { 

  const [userData, setUserData] = useState<Database['public']['Tables']['users']['Row'][] | null>(null)
  const [newFirstName, setnewFirstName] = useState<string>()
  const [newLastName, setnewLastName] = useState<string>()
  const [newPhonenumber, setNewPhonenumber] = useState<string>()
  const [newEmail, setNewEmail] = useState<string>()
  const [profilePic, setProfilePic] = useState<any>(null)
  const [profilePicUrl, setProfilePicUrl] = useState<any>()
  const [newLocation, setNewLocation] = useState<string>()
  const [newLat, setNewLat] = useState<string>()
  const [newlng, setNewLng] = useState<string>()
  const [map, setMap] = useState<boolean>(false)
  const [isLoad, setIsLoad] = useState<boolean>(false)

  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const uuid = useSelector((state: RootState) => state.authUser.userDetails?.uuid); // take the uuid from user details
  const lat = useSelector((state:RootState)=> state.userLocation.LocDetails?.latitude)
  const lng = useSelector((state:RootState)=> state.userLocation.LocDetails?.longitude)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blobImage = profilePic? new Blob([profilePic], {type: 'image/jpg'}): null  //blobImage is actually not null, so first the input profilePic is true then create blob url
  console.log("image blob", blobImage);
  
  
  //Note*
  // If fetching table uuid is not same as authUser.id (maybe its service provider table uuid) 
  // then data doesn't fetch the data so the userData array length is 0
  // most of case the service-providers table not fetch on user profile!..
  useEffect(() => {
    async function fetchRecords() {
        try {
          const {data, error}: PostgrestResponse<Database['public']['Tables']['users']['Row'][] >  = await supabase // Fetching auth user's row
           .from("users")
           .select()
           .eq('uuid',uuid)

           if (error) {
           console.error('Error fetching data:', error);
         } else {
           setUserData(data.flat())
         }
           } catch (error) {
             console.error('An unexpected error occurred:', error);
           }
        } 
       fetchRecords();
    }, [authUser, uuid]); // Ensure this effect runs when `supabase` changes

       console.log("userData ::",userData);

       const handleImageChange = (e : any) => {
        console.log("typeeel", e);
        
        const file = e.target.files && e.target.files[0];
        if (file) {
          setProfilePic(file);
        }
      };
      
      useEffect(() => {  //useEffect for profile Pic adding to storage and taking url and assign to a variable 
        if(profilePic){     // upload / updating profile pic
          supabase.storage.from('profile_pic')
        .list('users',{             //list all files from profile_pic bucket
          limit: 100,
          offset: 0,
          search: `${uuid}.jpg`
        }).then((res)=>{
        const existingImg = res.data?.find(f=> f.name === `${uuid}.jpg`)  //checking the same uid file in storage bucket if it is do update otherwise upload
        if(existingImg){                                 //update existing image to new file
          supabase.storage.from('profile_pic')
          .update(`users/${uuid}.jpg`, profilePic)
        }else{                                      // if existing file is not upload new file
        try{
          supabase.storage.from('profile_pic')
          .upload(`users/${uuid}.jpg`, profilePic)
        }catch(er){
          console.log(er)
         }
        }
       }).catch(er=>{
         console.log("error on listing profile_pic storage bucket", er)
        })
        console.log("profile added to bucket",)
      }
     
        async function getSignedUrl() { // get url of file
          const { data, error } = await supabase.storage
            .from('profile_pic')
            .createSignedUrl(`users/${uuid}.jpg`, 525600 * 60 * 1000); // 1 year validity
            
          if (error) {
            console.error('Error creating signed URL:', error.message);
          } else {
                setProfilePicUrl(data.signedUrl)
            console.log('Signed URL:', data.signedUrl);
          }
        }
        getSignedUrl()
      }, [profilePic])

      const updateProfile = async() => {
       try {
        const { error } = await supabase
          .from("users")
          .update({
            first_name: newFirstName,
            last_name: newLastName,
            email: newEmail,
            phonenumber: newPhonenumber,
            profilePicUrl,
            location: newLocation,
            latitude: newLat,
            longitude: newlng
          })
          .eq('uuid', uuid)
      
        if (error) {
          console.error("Error updating user data:", error.message);
        } else {
         setIsLoad(true);
         toast("Edited Successfully")
          navigate(-1);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    }
        
    const SignOut =async () => {
      const { error } = await supabase.auth.signOut()
      if(error){
        alert(error.message)
      }else{
        toast("Successfully Log Out!")
        navigate('/')
        window.location.reload()
      }
    }

    const getLocationMap = () => {
      setMap(true);
      // navigate('/loc')
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          (position) => {
           const {latitude, longitude} = position.coords
          }
        )
      }
    }

    function onPlaceSelect(value: any) {
      alert(`Confirm ${value.properties.formatted} ?`)
      dispatch(changeIsEdited(true))
      let currentLocation =`${value.properties.name+', '+value.properties.state}`;
      let latitude = `${value.properties.lat}`;
      let longitude = `${value.properties.lon}`;
      dispatch(setLocationDetails({currentLocation, latitude, longitude}))
      setNewLocation(`${value.properties.name+', '+value.properties.state}`);
      setNewLat(value.properties.lat);
      setNewLng(value.properties.lon);
      console.log(value.properties.lng, value.properties.lon);
    }
   
    function onSuggectionChange(value: any) {
      console.log("On suggestion Change",value);
    }
  return (
    <> 
    { isLoad? <BarLoader/>:

      userData?.map(user =>(

    <div className='Edit_your_Profile h-screen md:h-full'>
      <div className="Header_items flex justify-between items-center p-2 px-4 pt-2 md:p-5 md:px-10">
      <div className="breadcrumbs text-sm ">
          <ul>  
            <li>
              <Link to={'/'} className='inline-flex gap-2 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14" id="Home-3--Streamline-Core"><g id="Home-3--Streamline-Core"><path id="Vector" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M13.5 6.94c0.001 -0.1388 -0.027 -0.27628 -0.0821 -0.40368 -0.0551 -0.1274 -0.1361 -0.24194 -0.2379 -0.33632L7.00002 0.5 0.820023 6.2c-0.101775 0.09438 -0.182787 0.20892 -0.23788 0.33632S0.499084 6.8012 0.500023 6.94v5.56c0 0.2652 0.105357 0.5196 0.292893 0.7071s0.441894 0.2929 0.707104 0.2929H12.5c0.2652 0 0.5196 -0.1054 0.7071 -0.2929 0.1876 -0.1875 0.2929 -0.4419 0.2929 -0.7071V6.94Z" stroke-width="1"></path><path id="Vector_2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M7 13.5v-4" stroke-width="1"></path></g></svg>
                Home
              </Link>
            </li> 
            <li>
              <Link to={'/your-profile'} className='inline-flex gap-2 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14" id="Business-User-Curriculum--Streamline-Core"><g id="Business-User-Curriculum--Streamline-Core"><path id="Vector" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M4.09766 3.65061c0 0.63533 0.51503 1.15037 1.15036 1.15037 0.16062 0 0.31354 -0.03292 0.45241 -0.09237 0.41042 -0.17573 0.69796 -0.58328 0.69796 -1.058 0 -0.63533 -0.51504 -1.15037 -1.15037 -1.15037 -0.63533 0 -1.15036 0.51504 -1.15036 1.15037Z" stroke-width="1"></path><path id="Vector_2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M3.5 5.94004c0.18279 -0.34767 0.4397 -0.63502 0.74602 -0.83441 0.30632 -0.19939 0.65175 -0.30412 1.00309 -0.30412s0.69677 0.10473 1.00309 0.30412c0.30632 0.19939 0.56323 0.48674 0.74602 0.83441" stroke-width="1"></path><path id="Vector_3" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M12.5 12.5c0 0.2652 -0.1054 0.5196 -0.2929 0.7071s-0.4419 0.2929 -0.7071 0.2929h-9c-0.26522 0 -0.51957 -0.1054 -0.70711 -0.2929C1.60536 13.0196 1.5 12.7652 1.5 12.5v-11c0 -0.26522 0.10536 -0.51957 0.29289 -0.707107C1.98043 0.605357 2.23478 0.5 2.5 0.5H9L12.5 4v8.5Z" stroke-width="1"></path><path id="Vector 2531" stroke="#000000" stroke-linecap="round" d="M3.5 8.5h7" stroke-width="1"></path><path id="Vector 2532" stroke="#000000" stroke-linecap="round" d="M3.5 11h4" stroke-width="1"></path></g></svg>
                Profile
              </Link>
            </li> 
            <li>
              <Link to={''} onClick={()=>navigate(-1)} className="inline-flex gap-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14" id="Pencil--Streamline-Core"><g id="Pencil--Streamline-Core"><path id="Vector" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M5 12.24 0.5 13.5l1.26 -4.49998L10 0.800021c0.0931 -0.095246 0.2044 -0.170925 0.3271 -0.222592 0.1228 -0.051668 0.2547 -0.078283 0.3879 -0.078283 0.1332 0 0.2651 0.026615 0.3879 0.078283 0.1227 0.051667 0.234 0.127346 0.3271 0.222592L13.2 2.58002c0.0937 0.09296 0.1681 0.20357 0.2189 0.32542 0.0508 0.12186 0.0769 0.25257 0.0769 0.38458 0 0.13201 -0.0261 0.26272 -0.0769 0.38458 -0.0508 0.12186 -0.1252 0.23246 -0.2189 0.32542L5 12.24Z" stroke-width="1"></path></g></svg>
                Edit
              </Link>
            </li>
          </ul>
        </div>
         <div onClick={getLocationMap} className="User-location flex items center">
          <img className='w-5 h-5 md:w-8 md:h-8' src={require('../../../Media/Icons/loactionIcon.png')} alt="" />
           {map? 
           <GeoapifyContext apiKey="2003c7aa13b04598a65d56c01f5e235e">
             <GeoapifyGeocoderAutocomplete placeholder="Enter your place name"
               lang={'en'}
               limit={5}
               placeSelect={onPlaceSelect}
               suggestionsChange={onSuggectionChange}
               />
          </GeoapifyContext>
           :
           <h1 className="font-rubik md:font-semibold text-sm md:text-lg whitespace-nowrap ">{user.location ? user.location  : 'Enter your current location'}</h1>
          }
            </div>
         </div>
      <div className="Profile__User flex flex-col justify-center items-center gap-2 mt-24">
        <div className="Profile__User Profile-pic relative">
         <button>
          <img className='edit__dp absolute w-9 h-9 md:w-11 md:h-11 right-4 bottom-4 rounded-full z-10 cursor-pointer' src={require('../../../Media/Icons/editPenIcon.png')}/>
          <input 
          type='file' 
          onChange={handleImageChange}
          accept='image/*' 
          className=' absolute w-9 h-9 md:w-11 md:h-11 right-4 bottom-4 opacity-0 rounded-full z-20 cursor-pointer'/>
         </button>
        <img className='serviceProvider-profile rounded-full w-40 h-40 md:h-72 md:w-72 drop-shadow-xl' 
        src={blobImage?  URL.createObjectURL(profilePic) : 'https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg'} 
        alt="" />
        <p className="text-sm italic">(upload under 1 mb .jpg, .png)</p>
        </div>
        <div className="user--full_name flex gap-3 md:w-7/12">
        <div className="Edit__firstname flex justify-center items-center border-b border-teal-500 py-2">
        <input 
         placeholder={`${user.first_name}`}
         value={`${newFirstName || user.first_name}`}
         onChange={(e)=>(setnewFirstName(e.target.value))}
         maxLength={13}
         minLength={3}
         className="appearance-none bg-transparent text-3xl md:text-5xl text-center border-none w-full text-gray-700 dark:text-[#F7F7F7] mr-3 py-1 px-2 leading-tight focus:outline-none font-poppins font-bold" type="text" aria-label="First name"/>
        <button onClick={()=>setnewFirstName(' ')} className="border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
       </div>
       <div className="Edit__lastname flex justify-center items-center border-b border-teal-500 py-2">
        <input 
         placeholder={`${user.last_name}`}
         value={`${newLastName || user.last_name}`}
         onChange={(e)=>(setnewLastName(e.target.value))}
         className="appearance-none bg-transparent text-3xl md:text-5xl text-center border-none w-full text-gray-700 dark:text-[#F7F7F7] mr-3 py-1 px-2 leading-tight focus:outline-none font-poppins font-bold" type="text" aria-label="Last name"/>
        <button onClick={()=>setnewLastName(' ')} className="border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
       </div>
        </div>
      
      <div className="Profile__contact_details flex flex-col items-center md:mt-2 gap-2 md:gap-6">
      <div className="Edit__number flex items-center border-b border-teal-500 py-2">
        <input defaultValue={`${user.phonenumber}`} 
         onChange={(e)=>(setNewPhonenumber(e.target.value))}
         maxLength={10}
         minLength={10}
         className="appearance-none bg-transparent md:text-xl text-center border-none w-full text-gray-700 dark:text-[#F7F7F7] mr-3 py-1 px-2 leading-tight focus:outline-none font-lacto font-semibold" type="text" placeholder="919526941079" aria-label="Phone number"/>
        <button onClick={()=>setNewPhonenumber(' ')} className="border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
       </div>
        <div className="Edit__email flex items-center border-b border-teal-500 py-2">
        <input defaultValue={`${user.email}`} 
         onChange={(e)=>(setNewEmail(e.target.value))}
         className="appearance-none bg-transparent md:text-xl text-center border-none w-full text-gray-700 dark:text-[#F7F7F7] mr-3 py-1 px-2 leading-tight focus:outline-none font-lacto font-semibold" type="email" placeholder="yogeshalphin@gmail.com" aria-label="Email address"/>
        <button onClick={()=>setNewEmail(' ')} className="flex-shrink- border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
       </div>
      </div>

      <button onClick={updateProfile} className="btn bg-theme-100 hover:bg-theme-200 font-poppins mt-7 text-[#F7F7F7]">Save Profile</button>

      <div className="Boxes flex gap-5 md:gap-12 mt-7 md:mt-16 flex-col md:flex-row bg-transparent">
        <div onClick={()=>navigate(-1)} className="Ac__Preferences border-2 border-red-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center cursor-pointer hover:drop-shadow-xl hover:shadow-red-700">
          <img className='w-5 h-5 md:w-7 md:h-7 rotate-180' src={require('../../../Media/Icons/logoutIcon.png')} alt="Account Preferences" />
          <h1 className="font-lato font-semibold py-3 px-2 text-red-700 hover:text-red-900">Go Back</h1>
        </div>
        <div  onClick={()=>navigate('')} className="Ac__Preferences border-2 border-blue-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center gap-2 cursor-pointer hover:drop-shadow-xl hover:shadow-blue-700">
          <img className='w-5 h-5 md:w-7 md:h-7' src={require('../../../Media/Icons/editIcon.png')} alt="Edit Profile" />
          <h1 className="font-lato font-semibold py-3 px-2 text-blue-700 hover:text-blue-900">Edit Profile</h1>
        </div>
        <div onClick={SignOut} className="Ac__Preferences border-2 border-red-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center gap-2 cursor-pointer hover:drop-shadow-xl hover:shadow-red-700">
          <img className='w-5 h-5 md:w-7 md:h-7' src={require('../../../Media/Icons/logoutIcon.png')} alt="Log out" />
          <h1 className="font-lato font-semibold py-3 px-2 text-red-700 hover:text-red-900">Log out</h1>
        </div>
      </div>
      </div>
    </div>
    ))
    }
    </>

  )
}

export default EditYourProfile
