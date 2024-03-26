import React, { useEffect, useState } from 'react'
import '../../Style.css'
import { Database } from '../../../Types/supaTypes';
import { RootState } from '../../../Reducer/store';
import { useSelector } from 'react-redux';
import { PostgrestResponse } from '@supabase/supabase-js';
import supabase from '../../../Config/supabaseClient';
const SP_Dashboard = () => {
  
    var hrs = new Date().getHours()
    var greet : string;
    if(hrs < 12){
      greet='Good Morning'
    }else if(hrs >= 12 && hrs <= 17){
      greet='Good Afternoon'
    } else if(hrs >= 17 && hrs <= 24){
      greet='Good Evening'
    }
    
  const [serviceProviderData, setServiceProviderData] = useState<Database['public']['Tables']['service-providers']['Row'][] | null>(null)
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const checkuuid = useSelector((state: RootState) => state.authUser?.userDetails?.checkuuid);
  const uuid = useSelector((state: RootState) => state.authUser.userDetails?.uuid); // take the uuid from user details
    useEffect(() => {
    async function fetchRecords() {
        try {
          const {data, error}: PostgrestResponse<Database['public']['Tables']['service-providers']['Row'][] >  = await supabase // Fetching auth user's row
           .from("service-providers")
           .select()
           .eq('uuid', uuid)

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

  return (
    <div className='Dashboard'>
      <div className='Dashboard_hero flex flex-col pb-5 md:pb-32 border-b mb-5 mt-4 relative'>
       {serviceProviderData?.map(provider =>( 
       <div className="hero mt-12 pl-14 md:mt-24 mb-10 md:pl-24 flex flex-col items-start ">
         <div className="blob w-full md:w-2/4"></div>
          <h1 className='font-poppins font-semibold text-4xl md:text-6xl text-[#F7F7F7] bg-transparent z-10'>{greet},</h1>
          <h1 className="font-poppins font-semibold  text-3xl md:text-5xl text-[#F7F7F7] bg-transparent capitalize ml-2 z-10">{provider.first_name+ ' '+provider.last_name}</h1>
        </div>))}
        <div className="dashboard_items flex flex-col md:flex-row gap-4 lg:gap-0 basis-10 justify-evenly mt-16">
            <div className="ratings  h-28 md:w-56 md:h-56 flex flex-col border rounded-xl border-red-600 shadow-red-500 justify-center items-center bg-transparent z-20">
                <h1 className="text- md:text-3xl font-poppins font-bold bg-transparent">Your Ratings</h1>
                <h1 className="text- md:text-3xl font-outfit bg-transparent">{Math.floor(Math.random() * 100 + 30)}</h1>
            </div>
            <div className="ratings  h-28 md:w-56 md:h-56 flex flex-col border rounded-xl border-blue-600 shadow-blue-800 justify-center items-center">
                <h1 className="text- md:text-3xl font-poppins font-bold text-center">Current Connections</h1>
                <h1 className="text- md:text-3xl font-outfit">{Math.floor(Math.random() * 10 + 1)}</h1>
            </div>
            <div className="ratings  h-28 md:w-56 md:h-56 flex flex-col border rounded-xl border-green-600 shadow-green-900 justify-center items-center">
                <h1 className="text- md:text-3xl font-poppins font-bold">Users</h1>
                <h1 className="text- md:text-3xl font-outfit">{Math.floor(Math.random() * 10 + 2)}</h1>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SP_Dashboard
