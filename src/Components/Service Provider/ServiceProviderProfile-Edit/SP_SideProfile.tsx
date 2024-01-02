import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducer/Slices/store';
import { PostgrestResponse } from '@supabase/supabase-js';
import { Database } from '../../../Types/supaTypes';
import supabase from '../../../Config/supabaseClient';
import { useNavigate } from 'react-router';

const SP_SideProfile = ({checkuuid, refOne, onUserClick, onClose}:any) => {
    const [serviceProviderData, setServiceProviderData] = useState<Database['public']['Tables']['service-providers']['Row'][] | null>(null)
     const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
     const navigate = useNavigate()    
  useEffect(() => {
    async function fetchRecords() {
          const {data, error}: PostgrestResponse<Database['public']['Tables']['service-providers']['Row'][] >  = await supabase // Fetching auth user's row
           .from("service-providers")
           .select()
           .eq('uuid', checkuuid)

           if (error) {
           console.error('Error fetching data:', error);
         } else {
           setServiceProviderData(data.flat())
         }
           
        } 
       fetchRecords();
    }, [authUser]); // Ensure this effect runs when `supabase` changes

    
     //Click outside
     useEffect(() => {
      const handleOutsideClick = (e: any) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
          onClose()
          console.log("Clicked outside");
        } else {
          console.log("Clicked IN");
        }
      };
  
      document.addEventListener('click', handleOutsideClick, true);
  
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, [refOne, onClose]);


    const handleUserClick = (newCheckUuid: string) => {
      onUserClick(newCheckUuid); // Update the checkuuid with the new user's ID
    };

 console.log("serviceProviderData ::",serviceProviderData);
 
  return (
    <div className="ServiceProvider_Side-Profile w-2/4 h-full z-10 absolute right-0 border-2 bg-blue-400 " ref={refOne}>
    {serviceProviderData?.map((provider)=>(
        <div className="Sp__Profile  flex flex-col justify-center items-center gap-10">
        <div className="serviceProvider__1">
         <img className='serviceProvider-profile-pic rounded-full w-40 h-40 md:h-52 md:w-52 drop-shadow-xl' src="https://imgs.search.brave.com/BN_fhov3dztUsUTDPT0l446WqsYOYmdxKtg9hgpa45M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlZmFtb3VzcGVv/cGxlLmNvbS9wcm9m/aWxlcy90aHVtYnMv/amFjay1kb3JzZXkt/NjQ1MC0xLmpwZw" alt="" />
        </div>
          {/* <div className='Hr_line bg-[#1f2937] h-80 w-0.5'></div> */}
          <div className="Profile__contact_details flex flex-col items-start md:mt-2 gap-2 md:gap-3">
           <h1 className="SP__Name font-poppins text-7xl md:text-7xl font-bold capitalize">{provider.first_name+" "+provider.last_name}</h1>
           <h1 className="proffesion text-2xl font-lato">Profession - {provider.job}</h1>
            <div className="User-phone flex gap-3 justify-center items-center">
              <img className='w-5 h-5 md:w-8 md:h-8' src={require('../../../Media/Icons/phoneIcon.png')} alt="" />
              <h1 className="font-lacto md:text-2xl font-semibold">{provider.phonenumber}</h1>
            </div>
            <div className="User-email flex gap-3 justify-center items-center ">
              <img className='w-5 h-5 md:w-8 md:h-8' src={require('../../../Media/Icons/gmailIcon.png')} alt="" />
              <h1 className="font-lato md:text-2xl font-semibold">{provider.email}</h1>
            </div>
            <div className="SP__rating rating rating-md">
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked/>
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            </div>
         </div>
         <button onClick={onClose} className="btn absolute right-1 top-2">X</button>
        </div>
    ))}
  </div>
  )
}

export default SP_SideProfile;
