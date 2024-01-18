import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/User/User_Home/Header'
import Hero from '../Components/User/User_Home/Hero'
import HowItWorks from '../Components/User/User_Home/HowItWorks'
import Services from '../Components/User/User_Home/Services'
import Testimonial from '../Components/User/User_Home/Testimonial'
import WhyChoose from '../Components/User/User_Home/WhyChoose'
import SP_Requests from '../Components/Service Provider/ServiceProvider_Home/SP_Requests'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../Reducer/Slices/store'
import supabase from '../Config/supabaseClient'
import { addUserIdentity } from '../Reducer/Slices/userSlice'
import SP_SideNav from '../Components/Service Provider/ServiceProvider_Home/SP_SideNav'
import SP_Header from '../Components/Service Provider/ServiceProvider_Home/SP_Header'

const Home = () => {
  const [authUser, setAuthUser] = useState<any>()

    useEffect(()=> {
      (async()=>{
        const { data:{user}, } = await supabase.auth.getUser()
        let current_user : any = user?.identities
        let use : any = user 
        setAuthUser(use)
        console.log("typeee", typeof(use));
        
    })()
    }, [ ])
  return (
    <div>
      {authUser?.user_metadata?.job ?     // if service provider loggined
     ( 
       <>
       <div className='px-4 scroll-smooth'>
        <SP_Header/>
        <SP_SideNav/>
        <div className='sm:ml-64'>
        <Hero/>
        <SP_Requests/>
        <Footer/> 
        </div>
        </div>
      </>
      ) : (                                 // if user loggined
      <div className='px-4 md:px-64 scroll-smooth'>   
      <Header/>
      <Hero/>
      <Services/>
      <HowItWorks/>
      <WhyChoose/>
      <Testimonial/>
      <Footer/>
      </div>
      ) }
    </div>
  )
}

export default Home
