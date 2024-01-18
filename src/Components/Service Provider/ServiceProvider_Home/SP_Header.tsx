import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Database } from '../../../Types/supaTypes';
import { RootState } from '../../../Reducer/Slices/store';
import { PostgrestResponse } from '@supabase/supabase-js';
import supabase from '../../../Config/supabaseClient';
import { Link } from 'react-router-dom';
import { BiMenu, BiSolidMoon, BiSolidSun, BiSolidXCircle } from 'react-icons/bi';
import { CgBookmark, CgComment, CgHome, CgInfo, CgLogIn, CgPhone, CgProfile } from 'react-icons/cg';
import Logo from '../../../Pages/Logo';

const SP_Header:React.FC = () => {
    
  const [menu, setMenu] = useState<boolean>(false)
  const [userData, setUserData] = useState<Database['public']['Tables']['users']['Row'][] | null>(null)
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const uuid : string  = authUser && Array.isArray(authUser) && authUser.length > 0 ? authUser[0].id : null // take the uuid from user details
  // const { coords, isGeolocationAvailable, isGeolocationEnabled } =useGeolocated({positionOptions: {
  //     enableHighAccuracy: false,
  //   }})
  // console.log("location..",coords);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     function(position) {
  //       console.log("position",position);
  //       const loc =`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude},${position.coords.longitude}&key=ee4cd75f7d4f494ea9058692bc9f3359`
  //       fetch(loc).then((res)=> res.json)
  //       .then((data)=>(
  //       console.log("loc data", data)
  //       ))
  //       console.log("loc", loc);
        
  //     },
  //     function(error) {
  //       console.error("Error Code = " + error.code + " - " + error.message);
  //     }
  //   );

  // }, [])
  
  
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
  
  return (
    <div className='Header relative md:p-2 border-b-2 basis-6 md:flex md:justify-end '>
      
      <div className="hamburger-menu md:hidden mr-3 flex gap-3 ">
         <select className="select select-bordered border-slate-800 select-sm w-20 select-accent font-rubik text-xs">
            <option selected className='font-rubik text-sm '>Kerala</option>
            <option className='font-rubik text-sm'>Tamil nadu</option>
            <option className='font-rubik text-sm'>Karnadaka</option>
          </select>
       {menu?(
          <BiSolidXCircle size={23} className='z-10 mt-1' onClick={()=>setMenu(!menu)}/>
        )
        :<BiMenu size={23} className='z-10 mt-1' onClick={()=>setMenu(!menu)}/>}
        {
          menu ? (
            <div className="side_menu absolute left-0 mt-10 pt-28 flex flex-col items-center gap-16 w-full h-screen rounded-sm bg-white drop-shadow-lg z-30 transition-transform delay-200 ease-in-out transform -translate-x-2">
              <label className="swap swap-rotate absolute bg-transparent left-5 top-5 cursor-pointer">
               <input type="checkbox" className='bg-transparent'/>
              <BiSolidMoon className={'w-10 h-10 swap-on bg-transparent'}/> 
              <BiSolidSun className={' w-11 h-11 swap-off bg-transparent '}/> 
                </label>
              {userData? (
                userData.map((user)=>(
                <div className="userData">
                <div className="side_menu--profile_icon bg-transparent flex flex-col gap-3 items-center">
                <img className='h-16 w-16 rounded-full' src="https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg" alt="" />
               <Link to={'/your-profile'}>
                <h1 className="username text-2xl font-poppins font-bold bg-transparent">{user.first_name+" "+user.last_name}</h1>
                </Link>
              </div>
             
            <ul className="side_menu--options flex items-center flex-col justify-center gap-9 pl-10 bg-transparent">
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgHome />Home</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgComment />Messages</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgBookmark />About</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgPhone />Register</li>
          </ul>
          </div>
           ))
          ):( 
            <ul className="side_menu--options flex items-center flex-col justify-center  gap-7 mt-5 bg-transparent">
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgHome />Home</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgInfo />About</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgLogIn />Login</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgPhone />Register</li>
          </ul>
           )} 
          </div>
          ) : null
        }
      </div>
      {/* Desktop view */}
      <div className="Options hidden md:flex mr-10">
        
       {userData? (
         <div className='Options__profile--logined icons flex gap-6'>
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

export default SP_Header
