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
import { RootState } from '../Reducer/store'
import supabase from '../Config/supabaseClient'
import { addUserIdentity, setMetaData } from '../Reducer/Slices/userSlice'
import SP_SideNav from '../Components/Service Provider/ServiceProvider_Home/SP_SideNav'
import SP_Header from '../Components/Service Provider/ServiceProvider_Home/SP_Header'
import SP_Dashboard from '../Components/Service Provider/ServiceProvider_Home/SP_Dashboard'
import SignIn from '../Components/Auth/SignIn'

const Home = () => {
  const dispatch = useDispatch()
  const metadata = useSelector((state: RootState) => state.authUser.userDetails?.metadata); 
  const [authUser, setAuthUser] = useState<any>()
  const [isLoading, SetIsLoading] = useState(false)
  const [lsId, setLsId] = useState<string>()

  const localStaorageData = () =>{
    const lsKey : any = Object.keys(localStorage)
    const lsValue :any= JSON.parse(localStorage.getItem(lsKey) || "")
    setLsId(lsValue.user.id)
    console.log("local storage",lsValue.user.id);
    
  }
    useEffect(()=> {
      (async()=>{
        const { data:{user}, } = await supabase.auth.getUser()
        let current_user : any = user?.identities
        let use : any = user
        console.log("user at <home>",use);
        console.log("Metadata..",user?.user_metadata?.job)
        SetIsLoading(true);
        setAuthUser(use);
       
        
    })()
    }, [])
  return (
    isLoading? //remove authUser anytime
    (<div>
      {metadata ?     // if service provider loggined
     ( 
       <>
       <div className='px-4 scroll-smooth'>
        <SP_Header/>
        <SP_SideNav/>
        <div className='lg:ml-72'>
        <SP_Dashboard/>
        <SP_Requests/>
        <Footer/> 
        </div>
        </div>
      </>
      ) : (                                 // if user loggined
      <div className='px-4 sm:px-1 lg:px-64 scroll-smooth'>   
      <Header/>
      <Hero/>
      <Services/>
      <HowItWorks/>
      <WhyChoose/>
      <Testimonial/>
      <Footer/>
      </div>
      ) }
    </div>):
        <h1>Loading at Home</h1>
        );
}

export default Home
