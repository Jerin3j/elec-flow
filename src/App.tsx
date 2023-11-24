import React from 'react';
import Home from './Pages/Home';
import './App.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Register from './Components/Register';
import ServiceProviders from './Components/ServiceProviders';
import Service_Providers from './Pages/Service_Providers';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServiceProvider_Profile from './Components/ServiceProvider_Profile';
import ElectriciansFAQ from './Components/ElectriciansFAQ';
import PlumbersFAQ from './Components/PlumbersFAQ';
import UserProfile from './Components/UserProfile';
import UserProfile_Edit from './Components/Userprofile-Edit/yourProfile';
import EditYourProfile from './Components/Userprofile-Edit/EditYourProfile';

   const App:React.FC  =() => {
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
          <Route path='/user-profile' element={<UserProfile/>}/>
          <Route path='/your-profile' element={<UserProfile_Edit/>}/>
          <Route path='/your-profile/edit' element={<EditYourProfile/>}/>

        </Routes>
        </BrowserRouter> 
        
      </div>
    );
  }

export default App;
