import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Database } from '../../../Types/supaTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Reducer/store'
import { PostgrestResponse } from '@supabase/supabase-js'
import supabase from '../../../Config/supabaseClient'
import { toast } from 'react-toastify'


const ServiceProvider_Profile:React.FC = () => {

  const [serviceProviderData, setServiceProviderData] = useState<Database['public']['Tables']['service-providers']['Row'][] | null>(null)
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const checkuuid = useSelector((state: RootState) => state.authUser?.userDetails?.checkuuid);
  const uuid = useSelector((state: RootState) => state.authUser.userDetails?.uuid); // take the uuid from user details
  const navigate = useNavigate()
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

    const SignOut =async () => {
      const { error } = await supabase.auth.signOut()
      if(!error){
        toast("Successfully Log Out!");
        navigate('/')
        window.location.reload()}
    }
 
  return (
     <>
     {
      serviceProviderData?.map((provider =>(
     <div className='ServiceProvider_Profile h-screen pt-20 md:pt-52 flex flex-col items-center'>
      <div className="Sp__Profile flex flex-col md:flex-row justify-center items-center gap-10">
        <div className="serviceProvider__1">
         <img className='serviceProvider-profile-pic rounded-full w-40 h-40 md:h-52 md:w-52 drop-shadow-xl' src={provider.profilePicUrl? provider.profilePicUrl: 'https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg'} alt={`${provider.first_name} portrait`}/>
        </div>
      <div className='Hr_line bg-[#1f2937] h-80 w-0.5 hidden md:block'></div>
      <div className="Profile__contact_details flex flex-col items-center md:mt-2 gap-2 md:gap-3">
       <h1 className="SP__Name font-poppins text-5xl md:text-7xl font-bold capitalize">{provider.first_name+" "+provider.last_name}</h1>
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
      </div>
      <div className="Boxes flex gap-5 md:gap-12 mt-7 md:mt-16 flex-col md:flex-row bg-transparent">
        <div className="Ac__Preferences border-2 border-green-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center cursor-pointer hover:drop-shadow-xl hover:shadow-green-700">
      <img className='w-5 h-5 md:w-7 md:h-7' src={require('../../../Media/Icons/settingsIcon.png')} alt="Account Preferences" />
        <h1 className="font-lato font-semibold py-3 px-2 text-green-700 hover:text-green-900">Account Preferences</h1>
        </div>
       <Link to={'edit'}>
        <div className="Ac__Preferences border-2 border-blue-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center gap-2 cursor-pointer hover:drop-shadow-xl hover:shadow-blue-700">
          <img className='w-5 h-5 md:w-7 md:h-7' src={require('../../../Media/Icons/editIcon.png')} alt="Edit Profile" />
          <h1 className="font-lato font-semibold py-3 px-2 text-blue-700 hover:text-blue-900">Edit Profile</h1>
        </div>
        </Link>
        <div onClick={SignOut} className="Ac__Preferences border-2 border-red-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center gap-2 cursor-pointer hover:drop-shadow-xl hover:shadow-red-700">
          <img className='w-5 h-5 md:w-7 md:h-7' src={require('../../../Media/Icons/logoutIcon.png')} alt="Log out" />
          <h1 className="font-lato font-semibold py-3 px-2 text-red-700 hover:text-red-900">Log out</h1>
        </div>
      </div>
    </div>
    )))
      }
     </>
     )
}

export default ServiceProvider_Profile
