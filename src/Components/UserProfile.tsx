import React,{useEffect, useState} from 'react'
import { FaArrowLeft, FaPhone, FaVoicemail,  } from "react-icons/fa";
import { FaMapLocation, FaMapLocationDot, FaMapPin } from 'react-icons/fa6';
import "../Media/Icons/loactionIcon.png"
import { Link, Navigate, useParams ,} from 'react-router-dom';
import { SupabaseClient,PostgrestResponse } from '@supabase/supabase-js';
import { Database } from "../Types/supaTypes";
import { useSelector } from 'react-redux';
import { RootState } from '../Reducer/store';
import { User } from '../Reducer/Slices/userSlice';
import { useDispatch } from 'react-redux';
interface UserProfileProps {
  supabase : SupabaseClient
}


const UserProfile:React.FC<UserProfileProps> = ({supabase}) => {

  const [userData, setUserData] = useState<Database['public']['Tables']['users']['Row'][] | null>(null)
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const uuid = useSelector((state: RootState) => state.authUser.userDetails?.uuid);  // take the uuid from service provider details

  useEffect(() => {
    async function fetchRecords() {
        try {
          const {data, error}: PostgrestResponse<Database['public']['Tables']['users']['Row'][] >  = await supabase // Fetching auth service provider's row
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
    <>
    {  userData?.map((user)=>(
    <div className='User_profile h-screen'>
      <div className="Header_items flex justify-between items-center p-2 px-4 pt-2 md:p-5 md:px-10">
        <div className="header__username flex items-center gap-2 ">
           <Link to={'/'}>
           <FaArrowLeft size={20} />
           </Link>
          <h1 className="text-xl font-outfit font-bold lowercase">{user.first_name && user.last_name? user.first_name && user.last_name : user.email?.slice(0, user.email.indexOf('@'))}</h1>
        </div>
         <div className="User-location flex items center">
          <img className='w-5 h-5 md:w-8 md:h-8' src={require('../Media/Icons/loactionIcon.png')} alt="" />
           <h1 className="font-rubik md:font-semibold text-sm md:text-lg">{user.location}</h1>
           </div>
         </div>
      <div className="Profile__User flex flex-col justify-center items-center gap-2 mt-24">
      <img className='serviceProvider-profile rounded-full w-40 h-40 md:h-72 md:w-72 drop-shadow-xl' src="https://imgs.search.brave.com/BN_fhov3dztUsUTDPT0l446WqsYOYmdxKtg9hgpa45M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlZmFtb3VzcGVv/cGxlLmNvbS9wcm9m/aWxlcy90aHVtYnMv/amFjay1kb3JzZXkt/NjQ1MC0xLmpwZw" alt="" />
      <h1 className="font-poppins text-4xl md:text-7xl font-bold capitalize">{user.first_name && user.last_name? user.first_name && user.last_name : user.email?.slice(0, user.email.indexOf('@'))}</h1>
      
      <div className="Profile__contact_details flex flex-col items-center md:mt-2 gap-2 md:gap-6">
        <div className="User-phone flex gap-3 justify-center items-center">
          <img className='w-5 h-5 md:w-8 md:h-8' src={require('../Media/Icons/phoneIcon.png')} alt="" />
          <h1 className="font-lacto md:text-xl font-semibold">{user.phonenumber}</h1>
        </div>
        <div className="User-email flex gap-3 justify-center items-center ">
          <img className='w-5 h-5 md:w-8 md:h-8' src={require('../Media/Icons/gmailIcon.png')} alt="" />
          <h1 className="font-lato md:text-xl font-semibold">{user.email}</h1>
        </div>
      </div>
      </div>
      </div>
      ))}
    </>

   ) 
}

export default UserProfile
