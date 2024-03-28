import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaX } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Database } from '../../../Types/supaTypes'
import { RootState } from '../../../Reducer/store'
import { PostgrestResponse } from '@supabase/supabase-js'
import supabase from '../../../Config/supabaseClient'
import { toast, ToastContainer } from 'react-toastify'
import { GeoapifyContext, GeoapifyGeocoderAutocomplete } from '@geoapify/react-geocoder-autocomplete'
import { changeIsEdited, setLocationDetails } from '../../../Reducer/Slices/locationSlice'
import { useDispatch } from 'react-redux'

const EditSp_Profile = () => {
  const [serviceProviderData, setServiceProviderData] = useState<Database['public']['Tables']['service-providers']['Row'][] | null>(null)
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const uuid = useSelector((state: RootState) => state.authUser.userDetails?.uuid); // take the uuid from user details
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [newFirstName, setnewFirstName] = useState<string>()
  const [newLastName, setnewLastName] = useState<string>()
  const [newPhonenumber, setNewPhonenumber] = useState<string>()
  const [newEmail, setNewEmail] = useState<string>()
  const [newJob, setNewJob] = useState<string>()
  const [profilePic, setProfilePic] = useState<any>(null)
  const [profilePicUrl, setProfilePicUrl] = useState<any>()
  const [newLocation, setNewLocation] = useState<string>()
  const [newLat, setNewLat] = useState<string>()
  const [newlng, setNewLng] = useState<string>()
  const [map, setMap] = useState<boolean>(false)
  const blobImage = profilePic? new Blob([profilePic], {type: 'image/jpg'}): null  //blobImage is actually not null, so first the input profilePic is true then create blob url
  console.log("image blob", blobImage);
  //Note*
  // If fetching table uuid is not same as authUser.id (maybe its service provider table uuid) 
  // then data doesn't fetch the data so the userData array length is 0
  // most of case the service-providers table not fetch on user profile!..
  useEffect(() => {
    async function fetchRecords() {
        try {
          const {data, error}: PostgrestResponse<Database['public']['Tables']['service-providers']['Row'][] >  = await supabase // Fetching auth user's row
           .from("service-providers")
           .select()
           .eq('uuid',uuid)

           if (error) {
           console.error('Error fetching data:', error);
         } else {
          setServiceProviderData(data.flat())
         }
           } catch (error) {
             console.error('An unexpected error occurred:', error);
           }
        } 
       fetchRecords();
    }, [authUser, uuid]); // Ensure this effect runs when `supabase` changes

       console.log("userData ::",serviceProviderData);

      const handleImageChange = async(e : any)=>{
          const file = e.target.files && e.target.files[0];
          if (file) {
            setProfilePic(file);
          }
        };
      useEffect(() => {  //useEffect for profile Pic adding to storage and taking url and assign to a variable 
        if(profilePic){     // upload / updating profile pic
          supabase.storage.from('profile_pic')
        .list('service-providers',{             //list all files from profile_pic bucket
          limit: 100,
          offset: 0,
          search: `${uuid}.jpg`
        }).then((res)=>{
        const existingImg = res.data?.find(f=> f.name === `${uuid}.jpg`)  //checking the same uid file in storage bucket if it is do update otherwise upload
        if(existingImg){                                 //update existing image to new file
          supabase.storage.from('profile_pic')
          .update(`service-providers/${uuid}.jpg`, profilePic)
        }else{                                      // if existing file is not upload new file
        try{
          supabase.storage.from('profile_pic')
          .upload(`service-providers/${uuid}.jpg`, profilePic)
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
            .createSignedUrl(`service-providers/${uuid}.jpg`, 525600 * 60 * 1000); // 1 year validity
        
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
          .from("service-providers")
          .update({
            first_name: newFirstName,
            email: newEmail,
            phonenumber: newPhonenumber,
            job: newJob,
            profilePicUrl,
            latitude: newLat,
            longitude: newlng,
            location: newLocation
          })
          .eq('uuid', uuid)
      
        if (error) {
          console.error("Error updating user data:", error.message);
        } else {
          console.log("url", profilePicUrl);
          toast("Data Updated");
          navigate(-1);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    }

      const SignOut =async () => {
        const { error } = await supabase.auth.signOut()
        if(!error){
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
    {
      serviceProviderData?.map(provider =>(
    <div className='Edit_ServiceProvider_Profile'>
       <div className="Header_items flex justify-between items-center p-2 px-4 pt-2 md:p-5 md:px-10">
        <div className="header__username flex items-center gap-2 ">
           <Link to={'/'}>
           <FaArrowLeft size={20} />
           </Link>
          <h1 className="text-xl font-outfit font-bold lowercase">{provider.first_name+'.'+provider.last_name}</h1>
        </div>
        <div onClick={getLocationMap} className="User-location flex items-center">
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
           <h1 className="font-rubik md:font-semibold text-sm md:text-lg whitespace-nowrap ">{provider.location ? provider.location  : 'console.log("Do location function")'}</h1>
          }
            </div>
         </div>
      <div className="Profile__User flex flex-col justify-center items-center gap-2 mt-12">
        <div className="Profile__User Profile-pic relative">
         <button>
         <img className='edit__dp absolute w-9 h-9 md:w-11 md:h-11 right-4 bottom-4 rounded-full z-10' src={require('../../../Media/Icons/editPenIcon.png')}/>
          <input 
          type='file' 
          onChange={handleImageChange}
          accept='image/*' 
          className=' absolute w-9 h-9 md:w-11 md:h-11 right-4 bottom-4 opacity-0 rounded-full z-20'/>
          </button>
        <img className='serviceProvider-profile rounded-full w-40 h-40 md:h-72 md:w-72 drop-shadow-xl' 
         src={blobImage?  URL.createObjectURL(profilePic) : 'https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg'} 
        alt="" />
        <p className="text-sm italic">(upload under 1 mb .jpg, .png)</p>
        </div>
        <div className="user--full_name flex gap-3 md:w-7/12">
          <div className="Edit__firstname flex justify-center items-center border-b border-teal-500 py-2">
          <input 
           placeholder={`${provider.first_name}`}
           value={`${newFirstName || provider.first_name}`}
           onChange={(e)=>(setnewFirstName(e.target.value))}
           className="appearance-none bg-transparent text-3xl md:text-5xl text-center border-none w-full text-gray-700 dark:text-[#F7F7F7] mr-3 py-1 px-2 leading-tight focus:outline-none font-poppins font-bold" type="text" aria-label="First name"/>
          <button onClick={()=>setnewFirstName(' ')} className="border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
         </div>
         <div className="Edit__lastname flex justify-center items-center border-b border-teal-500 py-2">
          <input 
           placeholder={`${provider.last_name}`}
           value={`${newLastName || provider.last_name}`}
           onChange={(e)=>(setnewLastName(e.target.value))}
           className="appearance-none bg-transparent text-3xl md:text-5xl text-center border-none w-full text-gray-700 dark:text-[#F7F7F7] mr-3 py-1 px-2 leading-tight focus:outline-none font-poppins font-bold" type="text" aria-label="Last name"/>
          <button onClick={()=>setnewLastName(' ')} className="border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
         </div>
        </div>
       <div className="Edit__job flex items-center border-teal-500 py-2">
       <select defaultValue={`${provider.job}`}
           onChange={(e)=>setNewJob((e.target.value))}
               className={`block w-full selection: p-2 mb- border border-gray-200 rounded-md outline-0 py-3 bg-gray-200  dark:bg-gray-400 text-[#0c0c0c]`}>
                <option selected disabled className='text-neutral-700'>Choose your job</option>
                <option className='text-neutral-600'>Electrician</option>
                <option className='text-neutral-600'>Plumber</option>
              </select>
              </div>
      <div className="Profile__contact_details flex flex-col items-center md:mt-2 gap-2 md:gap-6">
      <div className="Edit__number flex items-center border-b border-teal-500 py-2">
        <input defaultValue={`${provider.phonenumber}`} 
        onChange={(e)=>(setNewPhonenumber(e.target.value))}
        className="appearance-none bg-transparent md:text-xl text-center border-none w-full text-gray-700 dark:text-[#F7F7F7] mr-3 py-1 px-2 leading-tight focus:outline-none font-lacto font-semibold" type="text" placeholder="919526941079" aria-label="Phone number"/>
        <button className="flex-shrink-  border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
       </div>
        <div className="Edit__email flex items-center border-b border-teal-500 py-2">
        <input defaultValue={`${provider.email}`} 
        onChange={(e)=>(setNewEmail(e.target.value))}
        className="appearance-none bg-transparent md:text-xl text-center border-none w-full text-gray-700 dark:text-[#F7F7F7] mr-3 py-1 px-2 leading-tight focus:outline-none font-lacto font-semibold" type="email" placeholder="yogeshalphin@gmail.com" aria-label="Email address"/>
        <button className="flex-shrink- border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
       </div>
      </div>

      <button onClick={updateProfile} className="btn bg-theme-100 hover:bg-theme-200 font-poppins mt-7 dark:text-white dark:bg-theme-200 text-white">Save Profile</button>

      <div className="Boxes flex gap-5 md:gap-12 mt-7 md:mt-16 flex-col md:flex-row ">
        <div className="Ac__Preferences border-2 border-green-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center cursor-pointer hover:drop-shadow-xl hover:shadow-green-700">
        <img className='w-5 h-5 md:w-7 md:h-7' src={require('../../../Media/Icons/settingsIcon.png')} alt="Account Preferences" />
        <h1 className="font-lato font-semibold py-3 px-2 text-green-700 hover:text-green-900">Account Preferences</h1>
        </div>
        <div onClick={()=>navigate('sp-profile/edit')} className="Ac__Preferences border-2 border-blue-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center gap-2 cursor-pointer hover:drop-shadow-xl hover:shadow-blue-700">
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

export default EditSp_Profile
