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
import { User, addUserIdentity } from './Reducer/Slices/userSlice';
import { PostgrestResponse, UserIdentity } from '@supabase/supabase-js';
import store, { RootState, useAppDispatch } from './Reducer/Slices/store';
import { UnknownAction } from 'redux';
import ResetPassword from './Components/Auth/ResetPassword';
import { Database } from './Types/supaTypes';


const App:React.FC  =() => {

    const dispatch = useDispatch() 
    const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  console.log("redux Data",authUser)

      useEffect(()=> {
        (async()=>{
          
          const { data:{user}, } = await supabase.auth.getUser()
          let current_user : any = user?.identities
          dispatch(addUserIdentity(current_user))
          console.log("User Identities",current_user);

          // just alert for other providers throuh registered job description is null so they should add their job thourgh edit profile
          if(user?.user_metadata?.job == 0){
            console.log("Service Provider Joined");
            alert(`You Were not selected your job! cause you sign up through ${user?.app_metadata.provider} Go on edit profile and add job` )
          }
          else{
            console.log("User Joined");
            
          }
          
      })()
      }, [ ])
      
      // useEffect(() => {
      //   const Provider = async() =>{
      //     try{
      //       const {data, error}: PostgrestResponse<Database['public']['Tables']['service-providers']['Row'][] >  = await supabase // Fetching auth user's row
      //      .from("service-providers")
      //      .select()
      //      .eq('uuid', authUser?.uuid)
      //      console.log("serviceProvider == ", data)

      //      if(data?.map(da=>(da.values.)))
      //   }
      //   catch(error){
      //     console.log('Catched error', error)
      //   }
      //     }
      //   Provider()
      // }, [])
      
  
    return (
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/service-providers' element={<ServiceProviders/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/sp-profile' element={<ServiceProvider_Profile/>}/>
          <Route path='/elecflow-electricians' element={<ElectriciansFAQ/>}/>
          <Route path='/elecflow-plumbers' element={<PlumbersFAQ/>}/>
          <Route path='/user-profile'element={<UserProfile supabase={supabase}/>}/>
          <Route path='/your-profile' element={<UserProfile_Edit/>}/>
          <Route path='/your-profile/edit' element={<EditYourProfile/>}/>
          

        </Routes>
        </BrowserRouter> 
        
      </div>
    );
  }

export default App;
