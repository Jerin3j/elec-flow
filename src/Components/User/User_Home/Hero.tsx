import React, { useEffect, useState } from 'react'
import Search from './Search'
import '../../Style.css'
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { BiLocationPlus } from 'react-icons/bi';
import { Database } from '../../../Types/supaTypes';
import { RootState } from '../../../Reducer/store';
import { useSelector } from 'react-redux';
import { PostgrestResponse } from '@supabase/supabase-js';
import supabase from '../../../Config/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { forEachTrailingCommentRange } from 'typescript';
import { useDispatch } from 'react-redux';
import { changeIsEdited } from '../../../Reducer/Slices/locationSlice';

const Hero:React.FC = () => {
  const dispatch = useDispatch()
  var hrs = new Date().getHours()
  var greet : string;
  if(hrs < 12){
    greet='Good Morning'
  }else if(hrs >= 12 && hrs <= 17){
    greet='Good Afternoon'
  } else if(hrs >= 17 && hrs <= 24){
    greet='Good Evening'
  }
  const navigate = useNavigate()
  const [userData, setUserData] = useState<Database['public']['Tables']['users']['Row'][] | null>()
  const uuid = useSelector((state:RootState) => state.authUser.userDetails?.uuid)
  const loc = useSelector((state:RootState) => state.userLocation?.LocDetails?.currentLocation)
  
  console.log("Hero section uuid", uuid);
  console.log("HeroSectionUserData", userData);
  useEffect(()=>{
    const fetchRecords = async()=>{
    try{
      const {data, error}: PostgrestResponse<Database['public']['Tables']['users']['Row'][] >  = await supabase
      .from("users")
      .select()
      .eq('uuid',uuid)
      console.log("Geting Hero data", data)
      
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setUserData(data.flat())
      }
       }
       catch (error) {
          console.error('An unexpected error occurred:', error);
        }
  }
  fetchRecords();
  }, [uuid])

  const fetchLoc = async() =>{
    const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
    if (permissionStatus.state === 'prompt' || permissionStatus.state === 'granted') {
      // Permission is either prompt or already granted, directly request location
     
    } else if (permissionStatus.state === 'denied') {
      // Permission was denied, instruct the user to enable it
      alert('Location access was denied. Please enable it in your browser settings.');
    }
  }
  return (
  <div className='Hero-section py-8 md:py-12 '>
{    userData?
   ( userData.map(user => 
   (<>
   <div className="Hero__with-user circle__blob bg-gradient-to-r from-[#c9ffdb] to-[#f9fdc8] dark:bg-gradient-to-r dark:from-[#101720] dark:to-[#020d19] relative flex flex-col items-start justify-center sm:hidden h-64 mx-1">
   <div className="circle__blob-inner bg-[#4e4376] dark:bg-[#101720] flex flex-col items-start justify-start h-20">
     <h1 className='font-poppins font-semibold text-sm self-start whitespace-nowrap'>{greet},</h1>
     <h1 className="font-poppins font-semibold text-sm capitalize self-end">{user.first_name}</h1>
   </div>
   <form className="Selectionn bg-transparent text-black flex flex-col gap-1 self-end mr-5">
   <h1 className="text-2xl font-poppins bg-transparent font-bold text-[#0c0c0c] dark:text-[#F7F7F7]">Search Nearby,</h1>
    <div className="radio_selection flex justify-between gap-3 bg-transparent">
     <label htmlFor="plumbers" className='bg-transparent font-outfit gap-1 flex items-center justify-center flex-row text-[#0c0c0c] dark:text-[#F7F7F7]'>Plumbers
      <input className=' radio-secondary radio-[2px]' type="radio" name='radio1' checked/>
     </label>
     <label htmlFor="electricians" className='bg-transparent font-outfit flex gap-1 items-center justify-center text-[#0c0c0c] dark:text-[#F7F7F7]'>Electricians
      <input className='radio-primary radio-xs' type="radio" name='radio1'/>
     </label>
     </div> 
     <button
      onClick={()=>loc? navigate('/nearby-providers'): fetchLoc()} 
      className="self-center bg-transparent flex gap-0.5 text-lg font-lato font-bold text-red-500 drop-shadow-' underline underline-offset-2 ">Locate 
     <BiLocationPlus className='bg-transparent' size={28}/></button>
   </form>
 </div>
     {/* Desktop mode */}
   <div className="Hero__with-user circle__blob bg-gradient-to-r from-[#c9ffdb] to-[#f9fdc8] dark:bg-gradient-to-tr dark:from-[#020d19] dark:to-[#101720] relative hidden lg:flex">
      <div className="circle__blob-inner bg-[#4e4376] dark:bg-[#000] flex flex-col items-center justify-start w-auto absolute md:h-24 2xl:h-32">
        <h1 className='font-poppins font-semibold text-4xl -mt-7 self-start whitespace-nowrap'>{greet},</h1>
        <h1 className="font-poppins font-semibold  text-3xl capitalize self-end ml-2">{user.first_name}</h1>
      </div>
      <form className="Selectionn bg-transparent absolute  lg:right-56 top-64 text-black flex flex-col gap-5">
      <h1 className="md:text-7xl font-poppins bg-transparent font-bold text-[#0c0c0c] dark:text-[#F7F7F7]">Search Nearby,</h1>
       <div className="radio_selection flex justify-evenly bg-transparent text-[#0c0c0c] dark:text-[#F7F7F7]">
        <label htmlFor="plumbers" className='bg-transparent font-outfit text-4xl flex items-center justify-center flex-row'>Plumbers
         <input type="radio" name='radio1' checked/>
        </label>
        <label htmlFor="electricians" className='bg-transparent font-outfit text-4xl items-center'>Electricians
         <input type="radio" name='radio1'/>
        </label>
        </div> 
        <button
          onClick={()=>loc? navigate('/nearby-providers') : fetchLoc()}
          className="self-center bg-transparent flex gap-1 text-3xl font-lato font-bold text-red-600 underline underline-offset-2 mt-7">Locate 
        <BiLocationPlus className='bg-transparent' size={36}/></button>
      </form>
    </div>
    </>)))
    :
    
    (<div className="Hero__without_user dark:bg-gradient-to-r dark:from-[#020d19] dark:to-[#101720]">
  <span className='md:hidden'><Search/></span>
  <div className="for_mobile md:hidden h-64 mx-2 rounded shadow-xl">
  <div id='slide1' className="hero-content relative w-full">
    <div className=" text-center">
      <h1 className="text-2xl font-bold">Hello there,</h1>
      <p className="py-6">Quickly Locate Reliable Electricians and Plumbers.</p>
      <Link to={'/signup'}>
        <button className="btn btn-primary">Get Started</button>
        </Link>
    </div>
  </div>
</div>

     {/* desktop view */}
     <section className='hidden lg:flex Hero mx-4 md:mx-10 relative '>
        <div id='slide1' className="Hero__item-1 sm:-ml-auto flex sm:w-full 2xl:w-auto sm:flex-col sm:px-4 lg:px-0 lg:flex-row justify-evenly items-center bg-black h-[30em] rounded-lg" >
            <Search/>
            <div className="Hero__text flex flex-col sm:items-center md:justify-normal z-10 gap-4 sm:w-full lg:w-1/2 bg-transparent " >
              <h1 className="text-3xl sm:text-2xl md:text-4xl 2xl:text-5xl shadow-lg font-poppins bg-transparent text-[#f8f8f8] leading-tight">
              Power Up Your Space with Trusted Experts
              </h1>
              <q className="text-white bg-transparent tracking-wider font-poppins">
              Connect with Nearby Electricians and Plumbers
              </q>
              
               <Link to={'/signup'} className='bg-inherit'>
               <button className="btn btn-primary self-center btn-md">Get Started
              </button>
              </Link>
           </div>
           </div>
          
      
    </section> 
    </div> 
    ) }
    </div>
  )
}

export default Hero
