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
import { Link } from 'react-router-dom';
import { verify } from 'crypto';

const Hero:React.FC = () => {
  const [userData, setUserData] = useState<Database['public']['Tables']['users']['Row'][] | null>()
  const [lsId, setLsId] = useState<string>()
  const authUser = useSelector((state:RootState) => state.authUser.userDetails)
  const uuid : string = authUser && Array.isArray(authUser) && authUser.length > 0 ? authUser[0].id : null
  
  const localStaorageData = () =>{
    const lsKey : any = Object.keys(localStorage)
    const lsValue :any= JSON.parse(localStorage.getItem(lsKey) || "")
    setLsId(lsValue.user.id)
    console.log("local storage",lsValue.user.id);
    
  }
  useEffect(()=>{
    localStaorageData();
    const fetchRecords = async()=>{
    try{
      const {data, error}: PostgrestResponse<Database['public']['Tables']['users']['Row'][] >  = await supabase
      .from("users")
      .select()
      .eq('uuid',lsId)
      
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
  }, [authUser, lsId])
  return (
  <div className='Hero Section py-8 md:py-12 '>
{    userData?
   ( userData.map(user => 
   (<>
   <div className="Hero__with-user circle__blob relative flex flex-col items-start justify-center md:hidden h-64 mx-1">
   <div className="circle__blob-inner flex flex-col items-start justify-start w-32 h-20">
     <h1 className='font-poppins font-semibold text-xl -mt-2 self-start'>Hello,</h1>
     <h1 className="font-poppins font-semibold capitalize self-end">{user.first_name}</h1>
   </div>
   <form className="Selectionn bg-transparent text-black flex flex-col gap-1 self-end mr-5">
   <h1 className="text-2xl font-poppins bg-transparent font-bold">Search Nearby,</h1>
    <div className="radio_selection flex justify-between gap-3 bg-transparent">
     <label htmlFor="plumbers" className='bg-transparent font-outfit gap-1 flex items-center justify-center flex-row '>Plumbers
      <input className=' radio-secondary radio-[2px]' type="radio" name='radio1' checked/>
     </label>
     <label htmlFor="electricians" className='bg-transparent font-outfit flex gap-1 items-center justify-center '>Electricians
      <input className='radio-primary radio-xs' type="radio" name='radio1'/>
     </label>
     </div> 
     <button className="self-center bg-transparent flex gap-0.5 text-lg font-lato font-bold text-red-500 drop-shadow-' underline underline-offset-2 ">Locate 
     <BiLocationPlus className='bg-transparent' size={28}/></button>
   </form>
 </div>
     {/* Desktop mode */}
   <div className="Hero__with-user circle__blob relative hidden md:flex">
      <div className="circle__blob-inner flex flex-col items-center justify-start w-auto absolute ml-10 pt10 h-32">
        <h1 className='font-poppins font-semibold text-4xl -mt-7 self-start'>Hello,</h1>
        <h1 className="font-poppins font-semibold  text-3xl capitalize self-end ml-2">{user.first_name}</h1>
      </div>
      <form className="Selectionn bg-transparent absolute  lg:right-56 top-64 text-black flex flex-col gap-5">
      <h1 className="text-7xl font-poppins bg-transparent font-bold">Search Nearby,</h1>
       <div className="radio_selection flex justify-evenly bg-transparent">
        <label htmlFor="plumbers" className='bg-transparent font-outfit text-4xl flex items-center justify-center flex-row'>Plumbers
         <input type="radio" name='radio1' checked/>
        </label>
        <label htmlFor="electricians" className='bg-transparent font-outfit text-4xl items-center'>Electricians
         <input type="radio" name='radio1'/>
        </label>
        </div> 
        <button className="self-center bg-transparent flex gap-1 text-3xl font-lato font-bold text-red-600 underline underline-offset-2 mt-7">Locate 
        <BiLocationPlus className='bg-transparent' size={36}/></button>
      </form>
    </div>
    </>)))
    :
    
    (<div className="Hero__without_user">
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
     <section className='hidden md:flex Hero mx-4 md:mx-10 relative'>
        <div id='slide1' className="Hero__item-1 -ml-7  flex sm:flex-col sm:px-4 lg:px-0 lg:flex-row justify-evenly items-center bg-black h-[30em] rounded-lg" >
            <Search/>
            <div className="Hero__text flex flex-col z-10 gap-4 sm:w-full lg:w-1/2 bg-transparent " >
              <h1 className="text-3xl sm:text-2xl lg:text-5xl shadow-lg font-poppins bg-transparent text-[#f8f8f8] leading-tight">
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
