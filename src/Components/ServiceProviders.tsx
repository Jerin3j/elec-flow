import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../Reducer/store';
import { Database } from '../Types/supaTypes';
import { PostgrestResponse } from '@supabase/supabase-js';
import supabase from '../Config/supabaseClient';
import { useDispatch } from 'react-redux';
import { addUserIdentity, setCheckUuid } from '../Reducer/Slices/userSlice';
import SP_SideProfile from './Service Provider/ServiceProviderProfile-Edit/SP_SideProfile';
import { Helmet } from 'react-helmet';
import BarLoader from './BarLoader';

const ServiceProviders:React.FC = () => {
  const [serviceProviderData, setServiceProviderData] = useState<Database['public']['Tables']['service-providers']['Row'][] | null>(null)
  const [checkUser, setCheckUser] = useState<string | null>(null);
  const refOne = useRef(null);
  const [sort, setSort] = useState<string>()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const uuid = useSelector((state: RootState) => state.authUser.userDetails?.uuid);
    
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
    }, [uuid]); // Ensure this effect runs when `supabase` changes
    
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
       <Helmet>
        <title>ElecFlow - Service Providers</title>
        <meta name="description"content="ElecFlow - Solve your problems"/>
        <meta name="keywords" content="Emergency Plumbers, Licensed Electricians, Local Plumbing Services, Professional Electricians, 24/7 Plumbing Assistance, Reliable Electrical Contractors, Residential Plumbing Experts, Commercial Electrical Services, Affordable Plumbing Solutions, Experienced Electrician Near Me, Plumbing Repair Services, Electrical Installation Specialists, Certified Plumbers, Skilled Electricians in India, Plumbing Maintenance Contracts, Electrical Wiring Repair, Plumbing Renovation Experts, Electrical Safety Inspections, Drain Cleaning Services, Lighting Fixture Installation, elecflow, how to get nearby plumbers, how to get nearby electricians, electricians near me, plumbers near me, how to do myself, how to solve" />
        <meta name="author" content="Jerin Jerome Justin" />
        <meta property="og:title" content="ElecFlow - Service Providers" />
        <meta property="og:description" content="ElecFlow - Solve your problems" />
        <meta property="og:image" content="https://imgs.search.brave.com/bnZyuhgmwqPlPu2hwWLe2qmTeizFXKoXudilZOceXbk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdDMu/ZGVwb3NpdHBob3Rv/cy5jb20vMTAzMjQ2/My8xNzc3Mi9pLzQ1/MC9kZXBvc2l0cGhv/dG9zXzE3NzcyMjQ1/NC1zdG9jay1waG90/by1wbHVtYmluZy1z/ZXJ2aWNlcy1wbHVt/YmVyLXdpdGgtd3Jl/bmNoLmpwZw" />
        <meta property="og:url" content="https://elec-flow-jerin3j.vercel.app/" />
        <meta name="twitter:title" content="ElecFlow - Service Providers" />
        <meta name="twitter:description" content="ElecFlow - Solve your problems" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div  className="ServiceProviders flex flex-col gap-7 p-5">
        <div className="header__Sp">
        <div className="ServiceProviders__Text ml-3">
            <h1 className="text-2xl md:text-5xl font-poppins font-bold text-center">Service Providers</h1>
            <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400 text-center">Here's the available plumbers and electricians to you.</p>
        </div>
        <select 
        onChange={e=>setSort(e.target.value)}
        className='ServiceProviders__Sort absolute right-7 top-6 border-2 rounded px-1 py-1 mt-[72px] md:mt-7 w-20 md:w-auto text-sm md:text-base dark:text-[#0c0c0c] dark:bg-gray-200' name="" id="" >
              <option disabled selected>Sort By</option>
              <option value="">Electricians</option>
              <option value="">Plumbers</option>
            </select>
        </div>
            {/* Body */}
            <div className="service-providers__list flex flex-col gap-7 bg-transparent">
     { serviceProviderData?
     serviceProviderData?.map(((provider, id) =>(
        <div key={id} className="ServiceProviders__List flex px-3 gap-4 md:gap-8 mb-4 items-center">
         <h1 className='capitalize font-rubik md:text-2xl'>{id+1}</h1>
          <img onClick={()=>viewProvider(provider.uuid)} className='serviceProvider-profile rounded-full h-9 w-9 md:h-16 md:w-16 drop-shadow-xl cursor-pointer' src={provider.profilePicUrl?provider.profilePicUrl: 'https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg'} alt={`${provider.first_name} portrait`} />
           <div className="ServiceProviders__List-name-email">
             <h1 className='text- md:text-3xl font-outfit capitalize'>{ provider.first_name+' '+provider.last_name +' - '+ provider.job}</h1>
             <h1 className='hidden md:block text-xs md:text-sm font-poppins text-neutral-600'>( {provider.email} )</h1>
            </div>
            <div className="rating md:ml-6 w-20 md:w-auto">
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" checked/>
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" />
            </div>
        </div>
        ))):
        <BarLoader/>
      }
       </div>
      {checkUser?
 <SP_SideProfile checkuuid={checkUser} uuid={uuid} refOne={refOne} onClose={handleClose} onUserClick={handleUserClick} />
         :null}
      </div>
    </section>
  )
}

export default ServiceProviders
