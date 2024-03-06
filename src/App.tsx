import React, { useEffect, useState } from 'react';
import Home from './Pages/Home';
import './App.css';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import Register from './Components/Auth/Register';
import ServiceProviders from './Components/ServiceProviders';
import Service_Providers from './Pages/Service_Providers';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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


const App:React.FC  =() => {
  
  const [isLoading, SetIsLoading] = useState(false)
  const dispatch = useDispatch() 
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const LocDetails = useSelector((state:RootState)=> state.userLocation.LocDetails)
  const [uuid, setUuid] = useState<any>()
  const metadata = useSelector((state: RootState)=> state.authUser.userDetails?.metadata)
  console.log("redux Data @App",authUser)
  console.log("location Data @App",LocDetails)
  


  useEffect(() => {
    
  }, [uuid]);

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
          

      navigator.geolocation.getCurrentPosition(
        function(position) {
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
              const {error} = await supabase
              .from("service-providers")
              .upsert({uuid, location: currentLocation, latitude, longitude }, { onConflict: 'uuid' })
              console.log("LOC DONE Provider");
              if(error){
                console.log("We got an errorrr", error.message)
              }else{
                console.log("maybe location be updated provider!")
              }
             }
          if(user && user?.user_metadata?.job){
            updateProviderLocation()
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
      
    })()


    }catch(error) {
      console.error('Error fetching user data at App:', error);
    }
      
      }, [uuid])
      
    
  
    return (
      isLoading?
      ( <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/service-providers' element={<ServiceProviders/>}/>
          <Route path='/nearby-providers' element={<NearbyProviders/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/sp-profile' element={<ServiceProvider_Profile/>}/>
          <Route path='/sp-profile/edit' element={<EditSp_Profile/>}/>
          <Route path='/elecflow-electricians' element={<ElectriciansFAQ/>}/>
          <Route path='/elecflow-plumbers' element={<PlumbersFAQ/>}/>
          <Route path='/user-profile'element={<UserProfile supabase={supabase}/>}/>
          <Route path='/your-profile' element={<UserProfile_Edit/>}/>
          <Route path='/your-profile/edit' element={<EditYourProfile/>}/>
          <Route path='/your-profile/preferences' element={<AccountPrefrences/>}/>
          <Route path='/requests' element={<SP_Requests/>}/>
          <Route path='/dashboard' element={<SP_Dashboard/>}/>
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/messages' element={<Messages/>}/>
        </Routes>
        </BrowserRouter> 
        
      </div>) :

      <svg version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 100 100" enable-background="new 0 0 100 100" xmlSpace="preserve">
    <circle fill="none" stroke="#fff" stroke-width="4" stroke-miterlimit="10" cx="20" cy="20" r="48"/>
    <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
      <animateTransform 
           attributeName="transform" 
           dur="2s"
           type="rotate"
           from="0 50 50"
           to="360 50 50"
           repeatCount="indefinite" />
    </line>
    <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
      <animateTransform 
           attributeName="transform" 
           dur="15s"
           type="rotate"
           from="0 50 50"
           to="360 50 50"
           repeatCount="indefinite" />
    </line>
    </svg>
    
    );
  }

export default App;
