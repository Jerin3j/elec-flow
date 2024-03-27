import React, { useEffect, useState } from 'react';
import Home from './Pages/Home';
import './App.css';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import Register from './Components/Auth/Register';
import ServiceProviders from './Components/ServiceProviders';
import Service_Providers from './Pages/Service_Providers';
import { BrowserRouter, Routes, Route, useNavigate, Router } from "react-router-dom";
import ServiceProvider_Profile from './Components/Service Provider/ServiceProviderProfile-Edit/ServiceProvider_Profile';
import ElectriciansFAQ from './Components/User/User_Home/ElectriciansFAQ';
import PlumbersFAQ from './Components/PlumbersFAQ';
import UserProfile from './Components/UserProfile';
import UserProfile_Edit from './Components/User/Userprofile_Edit/YourProfile';
import EditYourProfile from './Components/User/Userprofile_Edit/EditYourProfile';
import supabase from './Config/supabaseClient';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { User, addUserIdentity, setAuthUuid, setMetaData } from './Reducer/Slices/userSlice';
import { setCurrentLocation, setLocationDetails } from './Reducer/Slices/locationSlice';
import { PostgrestResponse, UserIdentity } from '@supabase/supabase-js';
import store, { RootState, useAppDispatch } from './Reducer/store';
import { UnknownAction } from 'redux';
import ResetPassword from './Components/Auth/ResetPassword';
import Chat from './Components/Chat';
import EditSp_Profile from './Components/Service Provider/ServiceProviderProfile-Edit/EditSp_Profile';
import SP_Requests from './Components/Service Provider/ServiceProvider_Home/SP_Requests';
import SP_Dashboard from './Components/Service Provider/ServiceProvider_Home/SP_Dashboard';
import AccountPrefrences from './Components/User/Userprofile_Edit/AccountPrefrences';
import Messages from './Components/Messages';
import NearbyProviders from './Components/NearbyProviders';
import GetGoogleLoc from './Components/User/Userprofile_Edit/GetGoogleLoc';
import { BsDeviceHdd } from 'react-icons/bs';
import BarLoader from './Components/BarLoader';
import NotFound from './Components/Statuses/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OfflineStat from './Components/Statuses/OfflineStat';
import ContactForm from './Components/ContactForm';
import YourProfile from './Components/User/Userprofile_Edit/YourProfile';
import { Helmet } from 'react-helmet';
import OurTeam from './Components/OurTeam';


const App:React.FC  =() => {
  
 
  const [isLoading, SetIsLoading] = useState(false)
  const dispatch = useDispatch() 
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const LocDetails = useSelector((state:RootState)=> state.userLocation.LocDetails)
  const [uuid, setUuid] = useState<any>()
  const metadata = useSelector((state: RootState)=> state.authUser.userDetails?.metadata)
  const isEdited = useSelector((state: RootState)=> state.userLocation.isEdited)
  console.log("redux Data @App",authUser)
  console.log("location Data @App",LocDetails)
  
  console.log("Is Location Edited? ", isEdited)

   useEffect(()=> {
     try {
       (async()=>{
         const { data:{user}, } = await supabase.auth.getUser()
         let current_user : any = user?.identities
         let user_id: any = user?.id
          dispatch(addUserIdentity(current_user))
          dispatch(setAuthUuid(user_id))
          SetIsLoading(true)                                                                                                              
          setUuid(current_user?.id)
          console.log("User Identities",current_user);
          console.log("User Identities ID",user_id);
          if(user?.user_metadata?.job){
            dispatch(setMetaData(user?.user_metadata?.job))
          }
          
          // just alert for other providers throuh registered job description is null so they should add their job thourgh edit profile
          if(user?.user_metadata?.job == 0){
            console.log("Service Provider Joined");
            alert(`You Were not selected your job! cause you sign up through ${user?.app_metadata.provider} Go on edit profile and add job` )
          }
          else{
            console.log("User Joined");
            
          }
        
   const fetchUserLocation=async()=>{
      navigator.geolocation.getCurrentPosition(
        function(position) {
          console.log("Geo api's latitude and longitude",position.coords.latitude,position.coords.longitude)
          const loc =`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude},${position.coords.longitude}&key=ee4cd75f7d4f494ea9058692bc9f3359`
          fetch(loc)
          .then(res=> res.json())
          .then((data)=>{
            console.log("user loc data", data.results[0].geometry)
            const latitude = data.results[0].geometry.lat
            const longitude = data.results[0].geometry.lng
            const currentLocation = `${data.results[0].components?.road && data.results[0].components?.road} , ${data.results[0].components?.city}`
            dispatch(setLocationDetails({currentLocation, latitude, longitude}))
  
            async function updateLocation(){
              const {data, error} = await supabase
              .from('users')
              // .update({location: currentLocation, latitude, longitude})
              // .eq('uuid','5aca0478-72d8-498f-885b-29082a1ebf4a')
              .upsert({uuid, location: currentLocation, latitude, longitude }, { onConflict: 'uuid' })
              console.log("LOC DONE");
              if(error){
                console.log("We got an errorrr location ", error.message)
              }else{
                console.log("maybe location be updated user!")
              }
             }
             async function updateProviderLocation(){
              console.log("UUid:",user?.id)
              const {data, error} = await supabase
              .from('service-providers')
              // .update({location: currentLocation, latitude, longitude})
              // .eq('uuid', user?.id)
              .upsert({uuid, location: currentLocation, latitude, longitude }, { onConflict: 'uuid'})
              console.log("LOC DONE Provider");
              if(error){
                console.log("We got an errorrr provider location", error)
              }else{
                console.log("maybe location be updated provider!")
              }
             }
          if(user && user?.user_metadata?.job){
            updateProviderLocation()
            console.log("LOC Provider successfully");
          } 
          else if(user){
           updateLocation()
           }
        })      
        },
        function(error) {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
       }
       
       // check the isEdited state, initially false when user edit the location it will true 
       // if it is false fetch user location, otherwise no
       if(isEdited === false){
         fetchUserLocation()
       }
    })()


    }catch(error) {
      console.error('Error fetching user data at App:', error);
    }
      
      }, [uuid, isEdited])
      
    
  
    return (
      isLoading?
      ( <div className="App bg-[#F7F7F7] dark:bg-gradient-to-tr dark:from-[#000] dark:to-[#101720] text-[#0c0c0c] dark:text-[#F7F7F7]" >
        <BrowserRouter>
        <Helmet>
        <title>ElecFlow - Connecting You with Local Electricians and Plumbers</title>
        <meta name="description"content="ElecFlow: Your ultimate solution for quick access to nearby plumbers and electricians. Say goodbye to service hassles with our user-friendly interface. Get your plumbing and electrical issues resolved promptly and efficiently."/>
        <meta name="keywords" content="Emergency Plumbers, Licensed Electricians, Local Plumbing Services, Professional Electricians, 24/7 Plumbing Assistance, Reliable Electrical Contractors, Residential Plumbing Experts, Commercial Electrical Services, Affordable Plumbing Solutions, Experienced Electrician Near Me, Plumbing Repair Services, Electrical Installation Specialists, Certified Plumbers, Skilled Electricians in India, Plumbing Maintenance Contracts, Electrical Wiring Repair, Plumbing Renovation Experts, Electrical Safety Inspections, Drain Cleaning Services, Lighting Fixture Installation, elecflow, how to get nearby plumbers, how to get nearby electricians, electricians near me, plumbers near me, how to do myself, how to solve" />
        <meta name="author" content="Jerin Jerome Justin" />
        <meta property="og:title" content="ElecFlow - Connecting You with Local Electricians and Plumbers" />
        <meta property="og:description" content="ElecFlow - Solve your problems" />
        <meta property="og:image" content="https://imgs.search.brave.com/bnZyuhgmwqPlPu2hwWLe2qmTeizFXKoXudilZOceXbk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdDMu/ZGVwb3NpdHBob3Rv/cy5jb20vMTAzMjQ2/My8xNzc3Mi9pLzQ1/MC9kZXBvc2l0cGhv/dG9zXzE3NzcyMjQ1/NC1zdG9jay1waG90/by1wbHVtYmluZy1z/ZXJ2aWNlcy1wbHVt/YmVyLXdpdGgtd3Jl/bmNoLmpwZw" />
        <meta property="og:url" content="https://elec-flow-jerin3j.vercel.app/" />
        <meta name="twitter:title" content="ElecFlow - Connecting You with Local Electricians and Plumbers" />
        <meta name="twitter:description" content="ElecFlow - Solve your problems" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='service-providers' element={<ServiceProviders/>}/>
          <Route path='nearby-providers' element={<NearbyProviders/>}/>
          <Route path='signin' element={<SignIn/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='signup' element={<SignUp/>}/>
          <Route path='contact' element={<ContactForm/>}/>
          <Route path='meetourteam' element={<OurTeam/>}/>
          <Route path='reset-password' element={<ResetPassword/>}/>
          <Route path='sp-profile' element={<ServiceProvider_Profile/>}/>
           <Route path='sp-profile/edit' element={<EditSp_Profile/>}/>
          <Route path='elecflow-electricians' element={<ElectriciansFAQ/>}/>
          <Route path='elecflow-plumbers' element={<PlumbersFAQ/>}/>
          <Route path='user-profile'element={<UserProfile supabase={supabase}/>}/>
          <Route path='your-profile' element={<YourProfile/>}/>
           <Route path='your-profile/edit' element={<EditYourProfile/>}/>
           <Route path='your-profile/preferences' element={<AccountPrefrences/>}/>
          <Route path='requests' element={<SP_Requests/>}/>
          <Route path='dashboard' element={<SP_Dashboard/>}/>
          <Route path='chat' element={<Chat/>}/>
          <Route path='messages' element={<Messages/>}/>
          <Route path='loc' element={<GetGoogleLoc/>}/>
          <Route path='*' element={<NotFound/>}/>
          </Routes>
        </BrowserRouter> 
    <ToastContainer position="top-center" autoClose={800} hideProgressBar={true} limit={1} theme="light" className={'bg-transparent'}/>
        
      </div>) 
      :
      <BarLoader/>
    );
  }

export default App;
