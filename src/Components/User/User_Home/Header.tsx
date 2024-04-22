import React, { useEffect, useState } from 'react'
import Logo from '../../../Pages/Logo'
import '../../Style.css'
import { BiCurrentLocation, BiMenu, BiSolidMoon, BiSolidSun, BiSolidXCircle } from "react-icons/bi";
import { CgBookmark, CgComment, CgHome, CgInfo, CgLogIn, CgPhone, CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { PostgrestResponse } from '@supabase/supabase-js';
import { Database } from '../../../Types/supaTypes';
import supabase from '../../../Config/supabaseClient';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducer/store';
import { useDispatch } from 'react-redux';
import { changeIsEdited, setLocationDetails } from '../../../Reducer/Slices/locationSlice';


const Header:React.FC = () => {
  
  const [theme, setTheme] = useState<boolean>(false)
  const [menu, setMenu] = useState<boolean>(false)
  const [userData, setUserData] = useState<Database['public']['Tables']['users']['Row'][] | null>(null)
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const uuid = useSelector((state: RootState) => state.authUser.userDetails?.uuid); // take the uuid from user details
  const locName = useSelector((state: RootState)=> state.userLocation.LocDetails?.currentLocation)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log("typ", locName)

  theme ? document.body.classList.toggle('dark') : document.body.classList.toggle('light') 

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
           console.log("data get in header", data.flat())
         }
           } catch (error) {
             console.error('An unexpected error occurred:', error);
           }
           
        } 
       fetchRecords();
    
    }, [authUser, uuid]); // Ensure this effect runs when `supabase` changes

    const fetchUserLocation=async()=>{
      alert('Your actual location will change, if you want to add your current kocation. Go to Edit Profile -> change Location.')
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
      if (permissionStatus.state === 'prompt' || permissionStatus.state === 'granted') {
        // Permission is either prompt or already granted, directly request location
      dispatch(changeIsEdited(false))
       
      } else if (permissionStatus.state === 'denied') {
        // Permission was denied, instruct the user to enable it
        alert('Location access was denied. Please enable it in your browser settings.');
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success! Handle the position data
          const { latitude, longitude } = position.coords;
        },
        (error) => {
          // Handle the error
          console.error(error.message);
        }
      );
    
       }

    return (
    <div className='Header relative md:p-2 border-b-2 basis-6'>
      <Logo/>
      
      <div className="hamburger-menu md:hidden mr-3 flex gap-2 items-center">
        {locName == null? 
          <div onClick={fetchUserLocation} className="location__name flex gap-1 items-end mr-1 cursor-pointer">
          <img className='w-5 h-5' src={require('../../../Media/Icons/loactionIcon.png')}/>
          <h1 className="text-sm font-bold font-popp whitespace-nowrap">Kerala</h1>
        </div> 
          // <select className="select select-bordered border-slate-800 bg-slate-50 dark:bg-gray-300 dark:text-black select-sm w-20 select-accent font-rubik text-xs mr-2">
          //  <option onClick={fetchUserLocation} selected className='font-rubik text-sm '>Kerala</option>
          //  <option className='font-rubik text-sm'>Tamil nadu</option>
          //  <option className='font-rubik text-sm'>Karnataka</option>
          // </select> 
          :
             <div className="location__name flex gap-1 items-end mr-1 cursor-pointer">
               <img className='w-5 h-5' src={require('../../../Media/Icons/loactionIcon.png')}/>
               <h1 className="text-sm font-bold font-popp whitespace-nowrap">{locName}</h1>
             </div> 
         }
       {menu?(
          <BiSolidXCircle size={25} className='z-10 mt-1' onClick={()=>setMenu(!menu)}/>
        )
        :<BiMenu size={25} className='z-10 mt-1' onClick={()=>setMenu(!menu)}/>}
        {
          menu ? (
            <div className="side_menu absolute left-0 top-12 pt-16 flex flex-col items-center gap-16 w-full h-screen rounded-sm bg-white dark:bg-[#0b1215] dark:text-[#F7F7F7] drop-shadow-lg z-30 dark:rounded-sm transition-transform delay-200 ease-in-out transform -translate-x-2 ">
              <label onClick={()=>{setTheme(!theme);}} className="swap swap-rotate absolute bg-transparent left-5 top-5 cursor-pointer">
               <input type="checkbox" className='bg-transparent theme-controller' value="synthwave"/>
              <BiSolidMoon className={'w-10 h-10 swap-off bg-transparent'}/> 
              <BiSolidSun className={' w-11 h-11 swap-on bg-transparent text-yellow-500'}/> 
                </label>
              {userData? (
                userData.map((user)=>(
                <div className="userData bg-transparent">
                <div className="side_menu--profile_icon bg-transparent flex flex-col gap-2 items-center ">
               <Link to={`/your-profile`} className='bg-transparent flex flex-col items-center gap-3'>
                <img className='h-24 w-2h-24 rounded-full bg-transparent' src="https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg" alt="" />
                <h1 className="username text-2xl font-poppins font-bold bg-white dark:bg-[#0b1215]">{user.first_name+" "+user.last_name}</h1>
                </Link>
              </div>
             
            <ul className="side_menu--options flex items-center flex-col gap-9 mt-8 ml-[70px] bg-transparent">
            <li className="uppercase font-medium hover:text-[#28CC9E] flex cursor-pointer border-b-0 w-full bg-white dark:bg-[#0b1215] text-xl bg-transparent">
              <Link to={'/'} className='flex gap-5 items-center bg-transparent'>
            <svg xmlns="http://www.w3.org/2000/svg" className=' fill-[#0c0c0c] dark:fill-[#F7F7F7]' fill="none" viewBox="0 0 14 14" height="20" width="20" id="Home-2--Streamline-Flex"><g id="Home-2--Streamline-Flex"><path id="Subtract" fill="" fill-rule="evenodd" d="M6.09272 1.26474c0.53629 -0.407352 1.27834 -0.407351 1.81463 0.00001l0.66005 0.50137c1.9389 1.47275 3.5998 3.27911 4.9051 5.33443l0.2118 0.3334c0.4228 0.66577 -0.0555 1.5361 -0.8442 1.5361h-0.6913c0.04 0.91907 -0.0102 1.84095 -0.1506 2.75225 -0.1394 0.9056 -0.9186 1.574 -1.8349 1.574H8.25V9.99991c0 -0.69036 -0.55964 -1.25 -1.25 -1.25s-1.25 0.55964 -1.25 1.25v3.29639H3.83675c-0.91623 0 -1.69547 -0.6684 -1.83492 -1.574 -0.14034 -0.9113 -0.19056 -1.83318 -0.15056 -2.75225h-0.69145c-0.78868 0 -1.266967 -0.87034 -0.844143 -1.53611l0.21178 -0.33346C1.83275 5.0452 3.49374 3.23888 5.43258 1.76617l0.66014 -0.50143Z" clip-rule="evenodd" stroke-width="1"></path></g></svg>
            Home</Link>
            </li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white dark:bg-[#0b1215] text-xl bg-transparent">
              <Link  className='flex gap-5 items-center bg-transparent' to={'/messages'}>
            <svg xmlns="http://www.w3.org/2000/svg" className=' fill-[#0c0c0c] dark:fill-[#F7F7F7]' fill="none" viewBox="0 0 14 14" height="20" width="20" id="Chat-Bubble-Text-Square--Streamline-Flex"><g id="Chat-Bubble-Text-Square--Streamline-Flex"><path id="Subtract" fill="" fill-rule="evenodd" d="M7.25001 0.25C5.91275 0.25 4.46305 0.368017 3.1512 0.516684 2.02052 0.644821 1.13436 1.54033 1.01094 2.66898 0.868408 3.97233 0.750049 5.42041 0.750049 6.75c0 1.07272 0.077035 2.22326 0.181436 3.3115l-0.670064 3.0823c-0.036512 0.1679 0.015804 0.3429 0.138532 0.4632 0.122727 0.1204 0.298661 0.1692 0.465867 0.1294l2.88053 -0.6858c1.14603 0.1156 2.36538 0.1994 3.50366 0.1994 1.33685 0 2.78729 -0.1156 4.10009 -0.2629 1.1313 -0.127 2.0176 -1.0228 2.1405 -2.1517 0.142 -1.30508 0.2594 -2.75572 0.2594 -4.0854 0 -1.32938 -0.1174 -2.7773 -0.2593 -4.08077 -0.123 -1.12887 -1.0093 -2.024416 -2.14 -2.152504C10.0382 0.368038 8.58739 0.25 7.25001 0.25ZM4.1875 5.5c0 -0.34518 0.27982 -0.625 0.625 -0.625h4.875c0.3452 0 0.625 0.27982 0.625 0.625s-0.2798 0.625 -0.625 0.625h-4.875c-0.34518 0 -0.625 -0.27982 -0.625 -0.625Zm0.625 2.375c-0.34518 0 -0.625 0.27982 -0.625 0.625s0.27982 0.625 0.625 0.625H8.5c0.34518 0 0.625 -0.27982 0.625 -0.625s-0.27982 -0.625 -0.625 -0.625H4.8125Z" clip-rule="evenodd" stroke-width="1"></path></g></svg>
            Messages</Link>
            </li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white dark:bg-[#0b1215] text-xl bg-transparent">
            <Link  className='flex gap-5 items-center bg-transparent' to={'/service-providers'}>
            <svg xmlns="http://www.w3.org/2000/svg" className=' fill-[#0c0c0c] dark:fill-[#F7F7F7]' fill="none" viewBox="0 0 14 14" height="20" width="20" id="Information-Circle--Streamline-Core"><g id="Information-Circle--Streamline-Core"><path id="Subtract" fill="" fill-rule="evenodd" d="M7 14c3.866 0 7 -3.134 7 -7 0 -3.86599 -3.134 -7 -7 -7 -3.86599 0 -7 3.13401 -7 7 0 3.866 3.13401 7 7 7ZM5.5 9.375c-0.34518 0 -0.625 0.27982 -0.625 0.625 0 0.3452 0.27982 0.625 0.625 0.625h3c0.34518 0 0.625 -0.2798 0.625 -0.625 0 -0.34518 -0.27982 -0.625 -0.625 -0.625h-0.875V6.5c0 -0.34518 -0.27982 -0.625 -0.625 -0.625H6c-0.34518 0 -0.625 0.27982 -0.625 0.625s0.27982 0.625 0.625 0.625h0.375v2.25H5.5ZM8 4c0 0.55228 -0.44772 1 -1 1s-1 -0.44772 -1 -1 0.44772 -1 1 -1 1 0.44772 1 1Z" clip-rule="evenodd" stroke-width="1"></path></g></svg>
            Service Providers</Link>
            </li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex cursor-pointer border-b-0 w-full bg-white dark:bg-[#0b1215] text-xl bg-transparent">
              <Link to={'/register'} className='flex gap-5 items-center bg-transparent'>
              <svg xmlns="http://www.w3.org/2000/svg" className=' fill-[#0c0c0c] dark:fill-[#F7F7F7]' fill="none" viewBox="0 0 14 14" height="20" width="20" id="File-Add-Alternate--Streamline-Core"><g id="File-Add-Alternate--Streamline-Core"><path id="Union" fill="" fill-rule="evenodd" d="M3.5 0A1.5 1.5 0 0 0 2 1.5v5.189A2 2 0 0 1 5.25 8.25v0.5h0.5a2 2 0 1 1 0 4h-0.5v0.5c0 0.265 -0.052 0.518 -0.145 0.75H12.5a1.5 1.5 0 0 0 1.5 -1.5v-8a0.5 0.5 0 0 0 -0.146 -0.354l-4 -4A0.5 0.5 0 0 0 9.5 0h-6ZM4 8.25a0.75 0.75 0 0 0 -1.5 0V10H0.75a0.75 0.75 0 0 0 0 1.5H2.5v1.75a0.75 0.75 0 0 0 1.5 0V11.5h1.75a0.75 0.75 0 0 0 0 -1.5H4V8.25Z" clip-rule="evenodd" stroke-width="1"></path></g></svg>
              Register</Link></li>
          </ul>
          </div>
           ))
          ):( 
            <ul className="side_menu--options flex items-center flex-col justify-center  gap-7 mt-5 bg-transparent">
            <li className="uppercase font-medium hover:text-[#28CC9E] cursor-pointer border-b-0 w-full bg-white dark:bg-[#0b1215] text-2xl"><Link to={'/'} className='flex gap-5 items-center bg-transparent'><CgHome />Home</Link></li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white dark:bg-[#0b1215] text-2xl"><CgInfo />About</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] items-center cursor-pointer border-b-0 w-full bg-white dark:bg-[#0b1215] text-2xl"><Link to={'/signin'} className='flex gap-5 items-center bg-transparent'><CgLogIn />Sign In</Link></li>
            <li className="uppercase font-medium hover:text-[#28CC9E] items-center cursor-pointer border-b-0 w-full bg-white dark:bg-[#0b1215] text-2xl"><Link to={'/register'} className='flex gap-5 items-center bg-transparent'><CgPhone />Register</Link></li>
          </ul>
           )} 
          </div>
          ) : null
        }
      </div>
      {/* Desktop view */}
      <div className="Options hidden md:flex sm:justify-center md:justify-evenly sm:gap-2 lg:gap-56 bg-transparent">
        <div className="Options__text flex sm:gap-1 sm:ml-3 lg:ml-0 lg:gap-6 items-center">
          <h1 className="text-base font-rubik cursor-pointer bg-transparent hover:text-[#28CC9E] active:drop-shadow-xl">Home</h1>
          <Link to={'/service-providers'}><h1 className="text-base font-rubik cursor-pointer hover:text-[#28CC9E] whitespace-nowrap">Service Providers</h1></Link>
          <Link to={'/messages'}><h1 className="text-base font-rubik cursor-pointer hover:text-[#28CC9E] hidden lg:flex">Messages</h1></Link>
          <h1 onClick={()=>navigate('/meetourteam')} className="text-base font-rubik cursor-pointer hover:text-[#28CC9E] hidden lg:flex">Our team</h1>
          <h1 onClick={()=> navigate('/contact')} className="text-base font-rubik cursor-pointer hover:text-[#28CC9E] hidden lg:flex">Contact</h1>
        </div>

       {userData? (
         <div className='Options__profile--logined icons flex sm:gap-3 lg:gap-6 items-center'>
        {locName?
        (<div onClick={fetchUserLocation} className="location__name flex gap-1 items-center mr-2 cursor-pointer">
          <img className='w-8 h-8' src={require('../../../Media/Icons/loactionIcon.png')}/>
          <h1 className="2xl:text-xl font-semibold font-lato whitespace-nowrap ">{locName}</h1>
        </div> ):
        (<BiCurrentLocation onClick={fetchUserLocation} size={33} className='cursor-pointer'/>)
        }
        <label onClick={()=>{setTheme(!theme)}} className="swap swap-rotate bg-transparent cursor-pointer">
          <input type="checkbox" className='bg-transparent theme-controller' value="synthwave"/>
            <BiSolidMoon className={'w-8 h-8 swap-off bg-transparent'}/> 
            <BiSolidSun className={' w-9 h-9 swap-on bg-transparent text-yellow-500'}/> 
          </label>
        <Link to={'/your-profile'}>
         {userData? userData.map((img)=> <img style={{boxShadow: '0px 0px 3px #ead7c6'}} className='w-9 h-9 border rounded-full image-full' src={img.profilePicUrl? img.profilePicUrl : 'https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg'}/>):<CgProfile size={33} className='cursor-pointer'/>}
        </Link>
        </div>
       ):
       (
        <div className="Options__icons--notLoginned flex gap-4 font-rubik">
        <Link to={"/signin"} unstable_viewTransition><button className="outline-none hover:text-theme-200 mt-3">Sign in</button></Link>
        <Link to={"/register"}><button className="bg-[#28CC9E] text-white py-3 px-3 rounded drop-shadow-md hover:drop-shadow-lg">Register</button></Link>
      </div>
       )} 
      </div>
    </div>
  )
}

export default Header
