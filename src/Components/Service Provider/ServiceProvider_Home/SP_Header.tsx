import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Database } from '../../../Types/supaTypes';
import { RootState } from '../../../Reducer/store';
import { PostgrestResponse } from '@supabase/supabase-js';
import supabase from '../../../Config/supabaseClient';
import { Link } from 'react-router-dom';
import { BiMenu, BiSolidMoon, BiSolidSun, BiSolidXCircle } from 'react-icons/bi';
import { CgBookmark, CgComment, CgHome, CgInfo, CgLogIn, CgPhone, CgProfile } from 'react-icons/cg';
import Logo from '../../../Pages/Logo';
import { changeIsEdited } from '../../../Reducer/Slices/locationSlice';
import { useDispatch } from 'react-redux';

const SP_Header:React.FC = () => {
   
  const [theme, setTheme] = useState<boolean>(false)
  const [menu, setMenu] = useState<boolean>(false)
  const [userData, setUserData] = useState<Database['public']['Tables']['service-providers']['Row'][] | null>(null)
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const uuid = useSelector((state: RootState) => state.authUser.userDetails?.uuid); // take the uuid from user details
  const locName = useSelector((state: RootState)=> state?.userLocation?.LocDetails?.currentLocation);
  const dispatch = useDispatch()
  
  theme ? document.body.classList.toggle('dark') : document.body.classList.toggle('light') 
  
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
           setUserData(data.flat())
         }
           } catch (error) {
             console.error('An unexpected error occurred:', error);
           }
        } 
       fetchRecords();
    }, [authUser, uuid]); // Ensure this effect runs when `supabase` changes
  
    const fetchUserLocation = async() => {
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
    <div className='Header relative p-2 border-b-2 basis-6 flex justify-center md:flex md:justify-end '>      
      <div className="Header__items lg:hidden mr-3 flex justify-center gap-16 sm:gap-80">
       {menu?(
          <BiSolidXCircle size={23} className='z-10 mt-1 self-center bg-transparent' onClick={()=>setMenu(!menu)}/>
        )
        :<BiMenu size={23} className='z-10 mt-1 self-center bg-transparent' onClick={()=>setMenu(!menu)}/>} 
          <Logo/>
          <Link to={'/sp-profile'} className='profile__pic self-center'>
            <img className='w-9 h-9' src='https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg'/>
         </Link>
        {
           menu ? (
              <div className="side_menu absolute left-0 mt-12 pt-28 flex flex-col items-center w-full h-screen rounded-xl bg-white dark:bg-slate-700 drop-shadow-lg z-30 transition-transform delay-200 ease-in-out transform -translate-x-2">
              <label onClick={()=>{setTheme(!theme)}} className="swap swap-rotate absolute bg-transparent left-5 top-5 cursor-pointer">
               <input type="checkbox" className='bg-transparent'/>
                 <BiSolidSun className={' w-11 h-11 swap-on bg-transparent text-yellow-500'}/> 
                 <BiSolidMoon className={'w-10 h-10 swap-off bg-transparent'}/> 
                </label>
                <div className="userData">
          {userData?.map((user)=>(
                <div className="side_menu--profile_icon bg-transparent flex flex-col gap-3 items-center">
                <img className='h-24 w-24 rounded-full' src="https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg" alt="" />
               <Link to={'/your-profile'}>
                <h1 className="username text-2xl font-poppins font-bold bg-transparent">{user.first_name+" "+user.last_name}</h1>
                </Link>
                 </div>
                 ))}
             
            <ul className="side_menu--options flex items-start flex-col justify-center mt-3 ml-7 gap-6 bg-white dark:bg-slate-700 z-10 font-rubik">
            <li>
            <Link to="/" className="flex items-center p-2 text-gray-900 dark:text-gray-200 rounded-lg dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-gray-700 group bg-white">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap bg-transparent text-xl">Home</span>
            </Link>
         </li>
         <li>
            <Link to="/messages" className="flex items-center p-2 text-gray-900 dark:text-gray-200 rounded-lg dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-gray-700 group bg-white">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap bg-transparent text-xl">Messages</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </Link>
         </li>
         <li>
            <Link to="/requests" className="flex items-center p-2 text-gray-900 dark:text-gray-200 rounded-lg dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-gray-700 group bg-white">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap bg-transparent text-xl">Requests</span>
            </Link>
         </li>
         <li>
            <Link to="/sp-profile/edit" className="flex items-center p-2 text-gray-900 dark:text-gray-200 rounded-lg dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-gray-700 group bg-white">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap bg-transparent text-xl">Edit Profile</span>
            </Link>
         </li>
         </ul>
          </div>
          <div onClick={fetchUserLocation} className="location__name flex gap-1 items-center justify-center absolute top-5 right-5">
            <img className='w-5 h-5' src={require('../../../Media/Icons/loactionIcon.png')}/>
            <h1 className="text-sm font-bold font-popp whitespace-nowrap">{locName}</h1>
          </div> 
          </div>
          ) : null
         }
      </div>

      {/* Desktop view */}
      <div className="Options hidden lg:flex mr-10">
        
       {userData? (
         <div className='Options__profile--logined icons flex gap-6'>
         <label onClick={()=>{setTheme(!theme)}} className="swap swap-rotate  bg-transparent  cursor-pointer">
          <input type="checkbox" className='bg-transparent theme-controller' value="synthwave"/>
             <BiSolidSun className={' w-9 h-9 swap-on bg-transparent text-yellow-500'}/> 
            <BiSolidMoon className={'w-8 h-8 swap-off bg-transparent'}/> 
          </label>
        <Link to={'/sp-profile'}>
         <CgProfile size={33} className='cursor-pointer'/>
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

export default SP_Header
