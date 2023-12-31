import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../Reducer/Slices/store';
import { Database } from '../Types/supaTypes';
import { PostgrestResponse } from '@supabase/supabase-js';
import supabase from '../Config/supabaseClient';
import { useDispatch } from 'react-redux';
import { addProviderIdentity } from '../Reducer/Slices/serviceProviderSlice';
import { addUserIdentity, setCheckUuid } from '../Reducer/Slices/userSlice';
import SP_SideProfile from './Service Provider/ServiceProviderProfile-Edit/SP_SideProfile';

const ServiceProviders:React.FC = () => {
  const [serviceProviderData, setServiceProviderData] = useState<Database['public']['Tables']['service-providers']['Row'][] | null>(null)
  const [checkUser, setCheckUser] = useState<string | null>(null);
  const refOne = useRef(null);
  const [sort, setSort] = useState<string>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  console.log("Check User state :", checkUser);
  
  useEffect(() => {
    async function fetchRecords() {
        try {
          const {data, error}: PostgrestResponse<Database['public']['Tables']['service-providers']['Row'][] >  = await supabase // Fetching auth user's row
           .from("service-providers")
           .select()

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
    }, [authUser]); // Ensure this effect runs when `supabase` changes
    
    console.log("serviceProviderData ::",serviceProviderData);
    
    const viewProvider = async(checkuuid : string | null) =>{
      await dispatch(setCheckUuid(checkuuid))
      setCheckUser(checkuuid)
      // await navigate('/sp-profile') 
    }
    

   // Function to handle closing SP_SideProfile
   const handleClose = () => {
     setCheckUser(null);
   };
 
   // Function to handle user click and show their details
   const handleUserClick = (newCheckUuid: string) => {
     setCheckUser(newCheckUuid);
   };
 
  return (
    <section className='Service-Providers'>
      <div  className="ServiceProviders flex flex-col gap-7 h-screen p-5">
        <div className="header__Sp">
        <div className="ServiceProviders__Text ml-3">
            <h1 className="text-5xl font-poppins font-bold text-center">Service Providers</h1>
        </div>
        <select 
        onChange={e=>setSort(e.target.value)}
        className='ServiceProviders__Sort absolute right-7 top-6 border-2 rounded px-1 py-1' name="" id="" >
              <option disabled selected>Sort By</option>
              <option value="">Electricians</option>
              <option value="">Plumbers</option>
            </select>
        </div>
            {/* Body */}
     { serviceProviderData?.map(((provider, id) =>(
        <div key={id} className="ServiceProviders__List flex px-3 gap-8 mb-4 items-center">
         <h1 className='capitalize font-rubik text-2xl'>{id+1}</h1>
         {/* <Link to={'/sp-profile'}> */}
          <img onClick={()=>viewProvider(provider.uuid)} className='serviceProvider-profile rounded-full h-16 w-16 drop-shadow-xl' src="https://imgs.search.brave.com/BN_fhov3dztUsUTDPT0l446WqsYOYmdxKtg9hgpa45M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlZmFtb3VzcGVv/cGxlLmNvbS9wcm9m/aWxlcy90aHVtYnMv/amFjay1kb3JzZXkt/NjQ1MC0xLmpwZw" alt="" />
           {/* </Link> */}
           <div className="ServiceProviders__List-name-email">
             <h1 className='text-3xl font-outfit capitalize'>{ provider.first_name+' '+provider.last_name +' - '+ provider.job}</h1>
             <h1 className='text-sm font-poppins text-neutral-600'>( {provider.email} )</h1>
            </div>
            <div className="rating ml-6">
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked/>
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            </div>
        </div>
        )))}
       
      {checkUser?
      <SP_SideProfile checkuuid={checkUser} refOne={refOne} onClose={handleClose} onUserClick={handleUserClick} />
         :null}
      </div>
    </section>
  )
}

export default ServiceProviders
