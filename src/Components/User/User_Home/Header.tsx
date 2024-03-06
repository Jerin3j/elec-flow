import React, { useEffect, useState } from 'react'
import Logo from '../../../Pages/Logo'
import '../../Style.css'
import { BiCurrentLocation, BiMenu, BiSolidMoon, BiSolidSun, BiSolidXCircle } from "react-icons/bi";
import { CgBookmark, CgComment, CgHome, CgInfo, CgLogIn, CgPhone, CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { PostgrestResponse } from '@supabase/supabase-js';
import { Database } from '../../../Types/supaTypes';
import supabase from '../../../Config/supabaseClient';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducer/store';
import { useGeolocated } from "react-geolocated";


const Header:React.FC = () => {
  
  const [menu, setMenu] = useState<boolean>(false)
  const [userData, setUserData] = useState<Database['public']['Tables']['users']['Row'][] | null>(null)
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const uuid = useSelector((state: RootState) => state.authUser.userDetails?.uuid); // take the uuid from user details
  const locName = useSelector((state: RootState)=> state.userLocation.LocDetails?.currentLocation)
  console.log("typ", locName)
 
  
  //Note*
  // If fetching table uuid is not same as authUser.id (maybe its service provider table uuid) 
  // then data doesn't fetch the data so the userData array length is 0
  // most of case the service-providers table not fetch on user profile!..
  // useEffect(() => {
  //   async function updateLocation(){
  //  try{
  //     const {error} = await supabase
  //     .from("users")
  //     .update({location: locName})
  //     .eq('uuid', uuid)
  //     console.log("LOC DONE");
  //     if(error){
  //       console.log("We got an errorrr", error.message)
  //     }else{
  //       console.log("maybe location be updated")
  //     }
  //     updateLocation()
  //   }catch(er){
  //     console.log("got a fuckin error",er);
  //  }
  // }
    
  // }, [uuid])
  
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
  return (
    <div className='Header relative md:p-2 border-b-2 basis-6'>
      <Logo/>
      
      <div className="hamburger-menu md:hidden mr-3 flex gap-3">
         <select className="select select-bordered border-slate-800 select-sm w-20 select-accent font-rubik text-xs">
            <option selected className='font-rubik text-sm '>Kerala</option>
            <option className='font-rubik text-sm'>Tamil nadu</option>
            <option className='font-rubik text-sm'>Karnadaka</option>
          </select>
       {menu?(
          <BiSolidXCircle size={25} className='z-10 mt-1' onClick={()=>setMenu(!menu)}/>
        )
        :<BiMenu size={25} className='z-10 mt-1' onClick={()=>setMenu(!menu)}/>}
        {
          menu ? (
            <div className="side_menu absolute left-0 mt-9 pt-16 flex flex-col items-center gap-16 w-full h-screen rounded-sm bg-white drop-shadow-lg z-30 transition-transform delay-200 ease-in-out transform -translate-x-2">
              <label className="swap swap-rotate absolute bg-transparent left-5 top-5 cursor-pointer">
               <input type="checkbox" className='bg-transparent'/>
              <BiSolidMoon className={'w-10 h-10 swap-on bg-transparent'}/> 
              <BiSolidSun className={' w-11 h-11 swap-off bg-transparent '}/> 
                </label>
              {userData? (
                userData.map((user)=>(
                <div className="userData bg-transparent">
                <div className="side_menu--profile_icon bg-transparent flex flex-col gap-3 items-center ">
               <Link to={'/your-profile'}>
                <img className='h-24 w-2h-24 rounded-full' src="https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg" alt="" />
                <h1 className="username text-2xl font-poppins font-bold bg-white">{user.first_name+" "+user.last_name}</h1>
                </Link>
              </div>
             
            <ul className="side_menu--options flex items-center flex-col justify-center gap-9 mt-12 bg-transparent">
            <li className="uppercase font-medium hover:text-[#28CC9E] flex cursor-pointer border-b-0 w-full bg-white text-xl bg-transparent"><Link to={'/'} className='flex gap-5 items-center bg-transparent'><CgHome />Home</Link></li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-xl bg-transparent"><Link to={'/messages'}><CgComment />Messages</Link></li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-xl bg-transparent"><CgBookmark />About</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex cursor-pointer border-b-0 w-full bg-white text-xl bg-transparent"><Link to={'/register'} className='flex gap-5 items-center bg-transparent'><CgPhone />Register</Link></li>
          </ul>
          </div>
           ))
          ):( 
            <ul className="side_menu--options flex items-center flex-col justify-center  gap-7 mt-5 bg-transparent">
            <li className="uppercase font-medium hover:text-[#28CC9E] cursor-pointer border-b-0 w-full bg-white text-2xl"><Link to={'/'} className='flex gap-5 items-center bg-transparent'><CgHome />Home</Link></li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgInfo />About</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><Link to={'/signin'} className='flex gap-5 items-center bg-transparent'><CgLogIn />Login</Link></li>
            <li className="uppercase font-medium hover:text-[#28CC9E] items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><Link to={'/register'} className='flex gap-5 items-center bg-transparent'><CgPhone />Register</Link></li>
          </ul>
           )} 
          </div>
          ) : null
        }
      </div>
      {/* Desktop view */}
      <div className="Options hidden md:flex sm:justify-center md:justify-evenly sm:gap-2 lg:gap-56">
        <div className="Options__text flex sm:gap-1 sm:ml-3 lg:ml-0 lg:gap-6 items-center">
          <h1 className="text-base font-rubik cursor-pointer bg-transparent hover:text-[#28CC9E] active:drop-shadow-xl">Home</h1>
          <Link to={'/service-providers'}><h1 className="text-base font-rubik cursor-pointer hover:text-[#28CC9E] hidden lg:flex">Service Providers</h1></Link>
          <Link to={'/messages'}><h1 className="text-base font-rubik cursor-pointer hover:text-[#28CC9E] hidden lg:flex">Messages</h1></Link>
          <h1 className="text-base font-rubik cursor-pointer hover:text-[#28CC9E] hidden lg:flex">Our team</h1>
          <h1 className="text-base font-rubik cursor-pointer hover:text-[#28CC9E]">Contact</h1>
        </div>

       {userData? (
         <div className='Options__profile--logined icons flex sm:gap-3 lg:gap-6'>
        {locName?
        (<div className="location__name flex gap-1 items-end mr-2">
          <img className='w-8 h-8' src={require('../../../Media/Icons/loactionIcon.png')}/>
          <h1 className="text-xl font-semibold font-lato">{locName}</h1>
        </div> ):
        (<BiCurrentLocation  size={33} className='cursor-pointer'/>)}
        <BiSolidMoon  size={33} className='cursor-pointer'/> 
        <Link to={'/your-profile'}>
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

export default Header
