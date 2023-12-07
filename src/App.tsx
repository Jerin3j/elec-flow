import React, { useEffect, useState } from 'react';
import Home from './Pages/Home';
import './App.css';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import Register from './Components/Auth/Register';
import ServiceProviders from './Components/ServiceProviders';
import Service_Providers from './Pages/Service_Providers';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServiceProvider_Profile from './Components/ServiceProvider_Profile';
import ElectriciansFAQ from './Components/ElectriciansFAQ';
import PlumbersFAQ from './Components/PlumbersFAQ';
import UserProfile from './Components/UserProfile';
import UserProfile_Edit from './Components/Userprofile-Edit/yourProfile';
import EditYourProfile from './Components/Userprofile-Edit/EditYourProfile';
import supabase from './Config/supabaseClient';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { User, addUserIdentity } from './Reducer/Slices/userSlice';
import { UserIdentity } from '@supabase/supabase-js';
import store, { RootState, useAppDispatch } from './Reducer/Slices/store';
import { UnknownAction } from 'redux';
// import { useSession, useUser } from '@supabase/auth-helpers-react'
   const App:React.FC  =() => {

    const dispatch = useDispatch() 
    const authUser = useSelector((state: RootState) => state.authUser.userDetails);

    console.log("redux] ",authUser)

      useEffect(()=> {
        (async()=>{
          const { data:{user}, } = await supabase.auth.getUser()
          let current_user : any = user?.identities
          dispatch(addUserIdentity(current_user))
          console.log("User Identities",current_user);
          
      })()
      }, [ ])
  
    return (
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/service-providers' element={<ServiceProviders/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/signup' element={<SignUp/>}/>
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
