import React from 'react';
import Home from './Pages/Home';
import './App.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Register from './Components/Register';
import ServiceProviders from './Components/ServiceProviders';
import Service_Providers from './Pages/Service_Providers';

   const App:React.FC  =() => {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }

export default App;
