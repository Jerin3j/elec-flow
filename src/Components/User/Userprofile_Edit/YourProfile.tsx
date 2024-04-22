import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaPhone, FaVoicemail,  } from "react-icons/fa";
import { FaMapLocation, FaMapLocationDot, FaMapPin } from 'react-icons/fa6';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Database } from '../../../Types/supaTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducer/store';
import { PostgrestResponse } from '@supabase/supabase-js';
import supabase from '../../../Config/supabaseClient';
import { updateSourceFileNode } from 'typescript';
import { toast } from 'react-toastify';

const YourProfile:React.FC = () => {

  const [userData, setUserData] = useState<Database['public']['Tables']['users']['Row'][] | null>(null)
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const uuid = useSelector((state: RootState) => state.authUser.userDetails?.uuid); // take the uuid from user details
  const navigate = useNavigate()
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
    }, [uuid, authUser]); // Ensure this effect runs when `supabase` changes

 console.log("userData ::",userData);

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
 
  return (
    <>
    {userData?.length!=0 ?  // Checks userData lenght is not 0 then do mapping 
     userData?.map(user =>(
      
      <div className='yourProfile h-screen md:h-full'>
      <div className="Header_items flex justify-between items-center p-2 px-4 pt-2 md:p-5 md:px-10">
        <div className="breadcrumbs text-sm ">
          <ul>
            <li>
              <Link to={'/'} className='inline-flex gap-2 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14" id="Home-3--Streamline-Core"><desc>Home 3 Streamline Icon: https://streamlinehq.com</desc><g id="Home-3--Streamline-Core"><path id="Vector" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M13.5 6.94c0.001 -0.1388 -0.027 -0.27628 -0.0821 -0.40368 -0.0551 -0.1274 -0.1361 -0.24194 -0.2379 -0.33632L7.00002 0.5 0.820023 6.2c-0.101775 0.09438 -0.182787 0.20892 -0.23788 0.33632S0.499084 6.8012 0.500023 6.94v5.56c0 0.2652 0.105357 0.5196 0.292893 0.7071s0.441894 0.2929 0.707104 0.2929H12.5c0.2652 0 0.5196 -0.1054 0.7071 -0.2929 0.1876 -0.1875 0.2929 -0.4419 0.2929 -0.7071V6.94Z" stroke-width="1"></path><path id="Vector_2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M7 13.5v-4" stroke-width="1"></path></g></svg>
                Home
              </Link>
            </li> 
            <li>
              <Link to={'/your-profile'} className='inline-flex gap-2 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14" id="Business-User-Curriculum--Streamline-Core"><desc>Business User Curriculum Streamline Icon: https://streamlinehq.com</desc><g id="Business-User-Curriculum--Streamline-Core"><path id="Vector" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M4.09766 3.65061c0 0.63533 0.51503 1.15037 1.15036 1.15037 0.16062 0 0.31354 -0.03292 0.45241 -0.09237 0.41042 -0.17573 0.69796 -0.58328 0.69796 -1.058 0 -0.63533 -0.51504 -1.15037 -1.15037 -1.15037 -0.63533 0 -1.15036 0.51504 -1.15036 1.15037Z" stroke-width="1"></path><path id="Vector_2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M3.5 5.94004c0.18279 -0.34767 0.4397 -0.63502 0.74602 -0.83441 0.30632 -0.19939 0.65175 -0.30412 1.00309 -0.30412s0.69677 0.10473 1.00309 0.30412c0.30632 0.19939 0.56323 0.48674 0.74602 0.83441" stroke-width="1"></path><path id="Vector_3" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M12.5 12.5c0 0.2652 -0.1054 0.5196 -0.2929 0.7071s-0.4419 0.2929 -0.7071 0.2929h-9c-0.26522 0 -0.51957 -0.1054 -0.70711 -0.2929C1.60536 13.0196 1.5 12.7652 1.5 12.5v-11c0 -0.26522 0.10536 -0.51957 0.29289 -0.707107C1.98043 0.605357 2.23478 0.5 2.5 0.5H9L12.5 4v8.5Z" stroke-width="1"></path><path id="Vector 2531" stroke="#000000" stroke-linecap="round" d="M3.5 8.5h7" stroke-width="1"></path><path id="Vector 2532" stroke="#000000" stroke-linecap="round" d="M3.5 11h4" stroke-width="1"></path></g></svg>
                Profile
              </Link>
            </li> 
          </ul>
        </div>
         <div className="User-location flex items center">
          <img className='w-5 h-5 md:w-8 md:h-8' src={require('../../../Media/Icons/loactionIcon.png')} alt="" />
           <h1 className="font-rubik md:font-semibold text-sm md:text-lg">{user.location}</h1>
           </div>
         </div>
         
      <div className="Profile__User flex flex-col justify-center items-center gap-2 mt-24">
      <img className='serviceProvider-profile rounded-full w-40 h-40 md:h-72 md:w-72 drop-shadow-xl ' src={user.profilePicUrl?user.profilePicUrl: 'https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg'} alt={`${user.first_name} portrait`} />
      <h1 className="font-poppins text-4xl md:text-7xl font-bold">{user.first_name+" "+user.last_name}</h1>
      
      <div className="Profile__contact_details flex flex-col items-center md:mt-2 gap-2 md:gap-6">
        <div className="User-phone flex gap-3 justify-center items-center">
          <img className='w-5 h-5 md:w-8 md:h-8' src={require('../../../Media/Icons/phoneIcon.png')} alt="" />
          <h1 className="font-lacto md:text-xl font-semibold">{user.phonenumber}</h1>
        </div>
        <div className="User-email flex gap-3 justify-center items-center ">
          <img className='w-5 h-5 md:w-8 md:h-8' src={require('../../../Media/Icons/gmailIcon.png')} alt="" />
          <h1 className="font-lato md:text-xl font-semibold">{user.email}</h1>
        </div>
      </div>
      <div className="Boxes flex gap-5 md:gap-12 mt-7 md:mt-16 flex-col md:flex-row ">
       <Link to={'/your-profile/preferences'}>
        <div className="Ac__Preferences border-2 border-green-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center cursor-pointer hover:drop-shadow-xl hover:shadow-green-700">
         <img className='w-5 h-5 md:w-7 md:h-7' src={require('../../../Media/Icons/settingsIcon.png')} alt="Account Preferences" />
         <h1 className="font-lato font-semibold py-3 px-2 text-green-700 hover:text-green-900">Account Preferences</h1>
        </div>
        </Link>
       <Link to={'/your-profile/edit'}>
        <div className="Ac__Preferences border-2 border-blue-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center gap-2 cursor-pointer hover:drop-shadow-xl hover:shadow-blue-700">
          <img className='w-5 h-5 md:w-7 md:h-7' src={require('../../../Media/Icons/editIcon.png')} alt="Edit Profile" />
          <h1 className="font-lato font-semibold py-3 px-2 text-blue-700 hover:text-blue-900">Edit Profile</h1>
        </div>
        </Link>
        <div onClick={SignOut} className="Ac__Preferences border-2 border-red-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center gap-2 cursor-pointer hover:drop-shadow-xl hover:shadow-red-700">
          <img className='w-5 h-5 md:w-7 md:h-7' src={require('../../../Media/Icons/logoutIcon.png')} alt="Log out" />
          <h1 className="font-lato font-semibold py-3 px-2 text-red-700 hover:text-red-900">Log out</h1>
        </div>
      </div>
      </div>
    </div>
    )) : <h1 className="text-7xl font-bold font-outfit text-center h-screen">Your are a service Provider right?</h1> // Just show that.. : )
  }

  </>
  )
}

export default YourProfile
