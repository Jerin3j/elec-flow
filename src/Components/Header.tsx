import React, { useState } from 'react'
import Logo from '../Pages/Logo'
import './Style.css'
import { BiCurrentLocation, BiMenu, BiSolidMoon, BiSolidXCircle } from "react-icons/bi";
import { CgBookmark, CgLogIn, CgPhone, CgProfile } from "react-icons/cg";


const Header:React.FC = () => {
  
  const [menu, setMenu] = useState<boolean>(false)
  return (
    <div className='Header relative md:p-2 justify- md:mt-6 border-b-2 basis-6'>
      <Logo/>
      <div className="hamburger-menu md:hidden right-3 fixed flex gap-4">
        <BiSolidMoon size={22}/> 
        {menu?(
          <BiSolidXCircle size={23} className='z-10' onClick={()=>setMenu(!menu)}/>
        )
        :<BiMenu size={23} className='z-10' onClick={()=>setMenu(!menu)}/>}
        {
          menu ? (
            <ul className="ProfileOpt flex items-center flex-col justify-evenly absolute right-0 mt-5 w-44 h-52 rounded-sm bg-white drop-shadow-lg z-30">
              <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-3 items-center cursor-pointer"><CgProfile/>Profile</li>
              <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-3 items-center cursor-pointer"><CgLogIn/>Find Electricians</li>
              <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-3 items-center cursor-pointer"><CgBookmark/>Find Plumbers</li>
              <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-3 items-center cursor-pointer"><CgPhone/>Register</li>
            </ul>
          ) : null
        }
      </div>
      {/* Desktop view */}
      <div className="Options hidden md:flex justify-evenly gap-56">
        <div className="Options__text flex gap-6 items-center">
          <h1 className="text-base font-rubik cursor-pointer bg-transparent hover:text-[#28CC9E] active:drop-shadow-xl">Home</h1>
          <h1 className="text-base font-rubik cursor-pointer hover:text-[#28CC9E]">About</h1>
          <h1 className="text-base font-rubik cursor-pointer hover:text-[#28CC9E]">Plumbers</h1>
          <h1 className="text-base font-rubik cursor-pointer hover:text-[#28CC9E]">Electricians</h1>
          <h1 className="text-base font-rubik cursor-pointer hover:text-[#28CC9E]">Our team</h1>
          <h1 className="text-base font-rubik cursor-pointer hover:text-[#28CC9E]">Contact</h1>
        </div>
        <div className="Options__icons--notLoginned flex gap-4 font-rubik">
          <button className="outline-none hover:text-theme-200">Sign in</button>
          <button className="bg-[#28CC9E] text-white py-3 px-3 rounded drop-shadow-md hover:drop-shadow-lg">Register</button>
        </div>
        {/* <div className='Options__profile--logined icons flex gap-4'>
        <BiCurrentLocation size={33} className='cursor-pointer'/>
        <BiSolidMoon size={33} className='cursor-pointer'/> 
        <CgProfile size={33} className='cursor-pointer'/>
        </div> */}
      </div>
    </div>
  )
}

export default Header
