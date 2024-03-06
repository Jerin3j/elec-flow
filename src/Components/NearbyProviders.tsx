import React, { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCheckUuid } from '../Reducer/Slices/userSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../Reducer/store'
import supabase from '../Config/supabaseClient'
import { PostgrestResponse } from '@supabase/supabase-js'
import { Database } from '../Types/supaTypes'

const NearbyProviders = () => {
  const dispatch = useDispatch()
  const userLatitude = useSelector((state: RootState)=> state.userLocation.LocDetails?.latitude)
  const userLongitude = useSelector((state: RootState)=> state.userLocation.LocDetails?.longitude)
  const UserLocation = useSelector((state: RootState)=> state.userLocation.LocDetails?.currentLocation)
  const [checkUser, setCheckUser] = useState<string | null>(null);
  const [userLat, setUserLat] = useState<string | null>(null);
  const [userLong, setUserLong] = useState<string | null>(null); // temp adding all providers loc details
  const [serviceProviders, setServiceProviders] = useState<Database['public']['Tables']['service-providers']['Row'][] | null>(); // temp adding all providers loc details
  const ProviderLatitude: any = serviceProviders?.map((loc)=>loc.latitude)
  const ProviderLongitude: any = serviceProviders?.map((loc)=>loc.longitude)

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
    if (UserLocation && serviceProviders) {
      const nearbyProviders = serviceProviders.filter(provider=> {
        const distance = calculateDistance(
          userLatitude,
          userLongitude,
          provider.latitude,
          provider.longitude
        );
        console.log("Filtered providers", nearbyProviders);
        
        // You can adjust the distance threshold as needed
        return distance < 10; // Example: Providers within 10 kilometers
      });
    }
  }
  useEffect(() => {
    getNearbyProviders()
  }, [UserLocation, serviceProviders]);

  const viewProvider = async(checkuuid : string | null) =>{
    await dispatch(setCheckUuid(checkuuid))
    setCheckUser(checkuuid)
    // await navigate('/sp-profile') 
  }
  return (
    <div className='NearbyProviders'>
     
        {/* Desktop View */}
        <div key={'1'} className="NearbyProviders__List flex px-3 gap-4 md:gap-8 mb-4 items-center">
         <h1 className='capitalize font-rubik md:text-2xl'>{'id+1'}</h1>
         {/* <Link to={'/sp-profile'}> */}
          <img onClick={()=>viewProvider('provider.uuid')} className='serviceProvider-profile rounded-full h-9 w-9 md:h-16 md:w-16 drop-shadow-xl cursor-pointer' />
           {/* </Link> */}
           <div className="NearbyProviders__List-name-email">
             <h1 className='text- md:text-3xl font-outfit capitalize'> 'provider.first_name+' '+provider.last_name +' - '+ provider.job'</h1>
             <h1 className='hidden md:block text-xs md:text-sm font-poppins text-neutral-600'>( {"provider.email"} )</h1>
            </div>
            <div className="rating md:ml-6 w-20 md:w-auto">
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" checked/>
              <input type="radio" name="rating-2" className="mask  mask-star-2 bg-orange-400" />
            </div>
        </div>
      </div>
  )
}

export default NearbyProviders
