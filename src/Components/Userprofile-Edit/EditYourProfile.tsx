import React from 'react'
import { FaArrowLeft, FaX } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const EditYourProfile = () => {
  return (
    <div className='Edit_your_Profile h-screen'>
      <div className="Header_items flex justify-between items-center p-2 px-4 pt-2 md:p-5 md:px-10">
        <div className="header__username flex items-center gap-2 ">
           <Link to={'/'}>
           <FaArrowLeft size={20} />
           </Link>
          <h1 className="text-xl font-outfit font-bold lowercase">Alphin.yogesh</h1>
        </div>
         <div className="User-location flex items center">
          <img className='w-5 h-5 md:w-8 md:h-8' src={require('../../Media/Icons/loactionIcon.png')} alt="" />
           <h1 className="font-rubik md:font-semibold text-sm md:text-lg">Byrathi Cross, Bengaluru</h1>
           </div>
         </div>
      <div className="Profile__User flex flex-col justify-center items-center gap-2 mt-24">
        <div className="Profile__User Profile-pic relative">
         <button>
          <img className='absolute w-9 h-9 md:w-11 md:h-11 right-4 bottom-4 z-10 rounded-full' src={require('../../Media/Icons/editPenIcon.png')}/>
         </button>
        <img className='serviceProvider-profile rounded-full w-40 h-40 md:h-72 md:w-72 drop-shadow-xl' src="https://imgs.search.brave.com/BN_fhov3dztUsUTDPT0l446WqsYOYmdxKtg9hgpa45M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlZmFtb3VzcGVv/cGxlLmNvbS9wcm9m/aWxlcy90aHVtYnMv/amFjay1kb3JzZXkt/NjQ1MC0xLmpwZw" alt="" />
        </div>
        <div className="Edit__name flex justify-center items-center border-b border-teal-500 py-2">
        <input className="appearance-none bg-transparent text-4xl md:text-5xl text-center border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none font-poppins font-bold" type="text" placeholder="Yogesh Alphin" aria-label="Full name"/>
        <button className="f border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
       </div>
      {/* <h1 className="font-poppins text-4xl md:text-7xl font-bold">Yogesh Alphin</h1> */}
      
      <div className="Profile__contact_details flex flex-col items-center md:mt-2 gap-2 md:gap-6">
      <div className="Edit__number flex items-center border-b border-teal-500 py-2">
        <input className="appearance-none bg-transparent md:text-xl text-center border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none font-lacto font-semibold" type="text" placeholder="919526941079" aria-label="Phone number"/>
        <button className="flex-shrink-  border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
       </div>
       {/* <div className="User-phone flex gap-3 justify-center items-center">
          <img className='w-5 h-5 md:w-8 md:h-8' src={require('../../Media/Icons/phoneIcon.png')} alt="" />
          <h1 className="font-lacto md:text-xl font-semibold">919526941079</h1>
        </div> */}
        <div className="Edit__email flex items-center border-b border-teal-500 py-2">
        <input className="appearance-none bg-transparent md:text-xl text-center border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none font-lacto font-semibold" type="email" placeholder="yogeshalphin@gmail.com" aria-label="Email address"/>
        <button className="flex-shrink- border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
       </div>
        {/* <div className="User-email flex gap-3 justify-center items-center ">
          <img className='w-5 h-5 md:w-8 md:h-8' src={require('../../Media/Icons/gmailIcon.png')} alt="" />
          <h1 className="font-lato md:text-xl font-semibold">jerinjj202@gmail.com</h1>
        </div> */}
      </div>

      <button className="btn bg-theme-100 hover:bg-theme-200 font-poppins mt-7">Save Profile</button>

      <div className="Boxes flex gap-5 md:gap-12 mt-7 md:mt-16 flex-col md:flex-row ">
        <div className="Ac__Preferences border-2 border-green-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center cursor-pointer hover:drop-shadow-xl hover:shadow-green-700">
        <img className='w-5 h-5 md:w-7 md:h-7' src={require('../../Media/Icons/settingsIcon.png')} alt="Account Preferences" />
        <h1 className="font-lato font-semibold py-3 px-2 text-green-700 hover:text-green-900">Account Preferences</h1>
        </div>
        <Link to={'your-profile/edit'}>
        <div className="Ac__Preferences border-2 border-blue-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center gap-2 cursor-pointer hover:drop-shadow-xl hover:shadow-blue-700">
          <img className='w-5 h-5 md:w-7 md:h-7' src={require('../../Media/Icons/editIcon.png')} alt="Edit Profile" />
          <h1 className="font-lato font-semibold py-3 px-2 text-blue-700 hover:text-blue-900">Edit Profile</h1>
        </div>
        </Link>
        <div className="Ac__Preferences border-2 border-red-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center gap-2 cursor-pointer hover:drop-shadow-xl hover:shadow-red-700">
          <img className='w-5 h-5 md:w-7 md:h-7' src={require('../../Media/Icons/logoutIcon.png')} alt="Log out" />
          <h1 className="font-lato font-semibold py-3 px-2 text-red-700 hover:text-red-900">Log out</h1>
        </div>
      </div>
      </div>
    </div>
  )
}

export default EditYourProfile
