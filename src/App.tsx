import React from 'react';
import Home from './Pages/Home';
import './App.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Register from './Components/Register';

   const App:React.FC  =() => {
    return (
      <div className="App">
        <Register/>
      </div>
    );
  }

export default App;
