import React,{useEffect, useState} from 'react'
import { FaArrowLeft, FaPhone, FaVoicemail,  } from "react-icons/fa";
import { FaMapLocation, FaMapLocationDot, FaMapPin } from 'react-icons/fa6';
import "../Media/Icons/loactionIcon.png"
import { Link, Navigate ,} from 'react-router-dom';
import { SupabaseClient,PostgrestResponse } from '@supabase/supabase-js';
import { Database } from "../Types/supaTypes";
interface UserProfileProps {
  supabase : SupabaseClient
}


const UserProfile:React.FC<UserProfileProps> = ({supabase}) => {
  useEffect(() => {
    async function fetchRecords() {
       try {
      
         const {data, error}: PostgrestResponse<any> = await supabase
        .from("ef-users")
         .select("*")

        if (data) {
          console.log('Fetched records:', data);
         } else {
           console.error('Error fetching records:', error);
          //Now 'data' is an array of 'EfUser' objects
        }
        } catch (error) {
          console.error('An unexpected error occurred:', error);
         }
    } 

    fetchRecords();
    
  }, []); // Ensure this effect runs when `supabase` changes

 
  return (
    <div className='User_profile h-screen'>
      <div className="Header_items flex justify-between items-center p-2 px-4 pt-2md:p-5 md:px-10">
        <div className="header__username flex items-center gap-2 ">
           <Link to={'/'}>
           <FaArrowLeft size={20} />
           </Link>
          <h1 className="text-xl font-outfit font-bold lowercase">Alphin.yogesh</h1>
        </div>
         <div className="User-location flex items center">
          <img className='w-5 h-5 md:w-8 md:h-8' src={require('../Media/Icons/loactionIcon.png')} alt="" />
           <h1 className="font-rubik md:font-semibold text-sm md:text-lg">Byrathi Cross, Bengaluru</h1>
           </div>
         </div>
      <div className="Profile__User flex flex-col justify-center items-center gap-2 mt-24">
      <img className='serviceProvider-profile rounded-full w-40 h-40 md:h-72 md:w-72 drop-shadow-xl' src="https://imgs.search.brave.com/BN_fhov3dztUsUTDPT0l446WqsYOYmdxKtg9hgpa45M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlZmFtb3VzcGVv/cGxlLmNvbS9wcm9m/aWxlcy90aHVtYnMv/amFjay1kb3JzZXkt/NjQ1MC0xLmpwZw" alt="" />
      <h1 className="font-poppins text-4xl md:text-7xl font-bold">Alphin Yogesh</h1>
      
      <div className="Profile__contact_details flex flex-col items-center md:mt-2 gap-2 md:gap-6">
        <div className="User-phone flex gap-3 justify-center items-center">
          <img className='w-5 h-5 md:w-8 md:h-8' src={require('../Media/Icons/phoneIcon.png')} alt="" />
          <h1 className="font-lacto md:text-xl font-semibold">919526941079</h1>
        </div>
        <div className="User-email flex gap-3 justify-center items-center ">
          <img className='w-5 h-5 md:w-8 md:h-8' src={require('../Media/Icons/gmailIcon.png')} alt="" />
          <h1 className="font-lato md:text-xl font-semibold">jerinjj202@gmail.com</h1>
        </div>
      </div>
      </div>
    </div>
  )
}

export default UserProfile
