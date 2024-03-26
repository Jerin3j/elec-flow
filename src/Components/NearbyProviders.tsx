import React, { useEffect, useRef, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCheckUuid } from '../Reducer/Slices/userSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../Reducer/store'
import supabase from '../Config/supabaseClient'
import { PostgrestResponse } from '@supabase/supabase-js'
import { Database } from '../Types/supaTypes'
import SP_SideProfile from './Service Provider/ServiceProviderProfile-Edit/SP_SideProfile'

const NearbyProviders = () => {
  const dispatch = useDispatch()
  const refOne = useRef(null);
  const uuid = useSelector((state: RootState)=> state.authUser.userDetails?.uuid)
  const userLatitude = useSelector((state: RootState)=> state.userLocation.LocDetails?.latitude)
  const userLongitude = useSelector((state: RootState)=> state.userLocation.LocDetails?.longitude)
  const UserLocation = useSelector((state: RootState)=> state.userLocation.LocDetails?.currentLocation)
  const [checkUser, setCheckUser] = useState<string | null>(null);
  const [userLat, setUserLat] = useState<string | null>(null);
  const [nearbyProviders, setNearbyProviders] = useState<Database['public']['Tables']['service-providers']['Row'][]>(); // storing nearby providers after calculating lat and lng with user's
  const [serviceProviders, setServiceProviders] = useState<Database['public']['Tables']['service-providers']['Row'][] | null>(); // temp adding all providers loc details
  
// take service-provider's location details
useEffect(()=>{
  const getProviderLocation= async()=>{
    const {data, error} :  PostgrestResponse<Database['public']['Tables']['service-providers']['Row'][]>= await supabase
    .from("service-providers")
    .select('*')
    if(error){
      console.log("error in fetching providers location", error)
    }else{
      setServiceProviders(data.flat())
      console.log("provides location", data.flat())
    }
  }
  getProviderLocation()
},[])

   // Function to handle closing SP_SideProfile
   const handleClose = () => {
    setCheckUser(null);
  };

  // Function to handle user click and show their details
  const handleUserClick = (newCheckUuid: string) => {
    setCheckUser(newCheckUuid);
  };

// Function to calculate distance using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * (Math.PI / 180))) * Math.cos((lat2 * (Math.PI / 180))) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

   const getNearbyProviders = () => {
    let nearbyProviders: any;
    if (UserLocation && serviceProviders) {
       nearbyProviders = serviceProviders.filter(provider=> {
        const distance = calculateDistance(
          userLatitude!,
          userLongitude!,
          provider.latitude!,
          provider.longitude!
        );
        console.log("Filtered providers", nearbyProviders);
        
        // You can adjust the distance threshold as needed
        return distance < 10; // Example: Providers within 10 kilometers
      });
      return nearbyProviders;
    }
    return []
  }
  useEffect(() => {
   const nearby_providers = getNearbyProviders()
   setNearbyProviders(nearby_providers)
   console.log("Nearby providers",nearby_providers)
  }, [UserLocation, serviceProviders]);

  const viewProvider = async(checkuuid : string | null) =>{
    await dispatch(setCheckUuid(checkuuid))
    setCheckUser(checkuuid)
    // await navigate('/sp-profile') 
  }
  return (
    <section className='Nearby-Providers'>
      <div  className="NearbyProviders h-[100dvh] flex flex-col gap-7  p-5">
        <div className="header__Sp">
        <div className="ServiceProviders__Text ml-3">
            <h1 className="text-2xl md:text-5xl font-poppins font-bold text-center">Nearby Providers</h1>
            {nearbyProviders == null && 
             <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400 text-center">Here is the list of plumbers and electricians they were near to you.</p> 
            }
        </div>
        </div>
            {/* Body */}
            {
        nearbyProviders && nearbyProviders.map((provider, index)=>(
        <div key={index} className="NearbyProviders__List flex px-3 gap-4 md:gap-8 mb-4 items-center">
         <h1 className='capitalize font-rubik md:text-2xl'>{index+1}</h1>
         {/* <Link to={'/sp-profile'}> */}
          <img onClick={()=>viewProvider(provider.uuid)} 
          src={provider.profilePicUrl ? provider.profilePicUrl : 'https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg'}
          alt={provider.first_name!}
          className='serviceProvider-profile rounded-full h-9 w-9 md:h-16 md:w-16 drop-shadow-xl cursor-pointer' />
           {/* </Link> */}
           <div className="NearbyProviders__List-name-email">
             <h1 className='text- md:text-3xl font-outfit capitalize'> {provider.first_name+' '+provider.last_name +' - '+ provider.job}</h1>
             <h1 className='hidden md:block text-xs md:text-sm font-poppins text-neutral-600'>( {"provider.email"} )</h1>
            </div>
            <div className="rating md:ml-6 w-20 md:w-auto">
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" checked/>
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" />
            </div>
        </div>))}
       
      {checkUser?
 <SP_SideProfile checkuuid={checkUser} uuid refOne={refOne} onClose={handleClose} onUserClick={handleUserClick} />
         :null}
      </div>
    </section>
  )
}

export default NearbyProviders
