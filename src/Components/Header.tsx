import React, { useState } from 'react'
import Logo from '../Pages/Logo'
import './Style.css'
import { BiCurrentLocation, BiMenu, BiSolidMoon, BiSolidSun, BiSolidXCircle } from "react-icons/bi";
import { CgBookmark, CgComment, CgHome, CgInfo, CgLogIn, CgPhone, CgProfile } from "react-icons/cg";


const Header:React.FC = () => {
  
  const [menu, setMenu] = useState<boolean>(false)
  return (
    <div className='Header relative md:p-2 border-b-2 basis-6'>
      <Logo/>
      
      <div className="hamburger-menu md:hidden mr-3 flex gap-3 ">
         <select className="select select-bordered border-slate-800 select-sm w-20 select-accent font-rubik text-xs">
            <option selected className='font-rubik text-sm '>Kerala</option>
            <option className='font-rubik text-sm'>Tamil nadu</option>
            <option className='font-rubik text-sm'>Karnadaka</option>
          </select>
       {menu?(
          <BiSolidXCircle size={23} className='z-10 mt-1' onClick={()=>setMenu(!menu)}/>
        )
        :<BiMenu size={23} className='z-10 mt-1' onClick={()=>setMenu(!menu)}/>}
        {
          menu ? (
            <div className="side_menu absolute left-0 mt-10 pt-28 flex flex-col items-center gap-16 w-full h-screen rounded-sm bg-white drop-shadow-lg z-30 transition-transform delay-200 ease-in-out transform -translate-x-2">
              <label className="swap swap-rotate absolute bg-transparent left-5 top-5 cursor-pointer">
               <input type="checkbox" className='bg-transparent'/>
              <BiSolidMoon className={'w-10 h-10 swap-on bg-transparent'}/> 
              <BiSolidSun className={' w-11 h-11 swap-off bg-transparent '}/> 
                </label>
             {/* {user? (
                <div className="side_menu--profile_icon bg-transparent flex flex-col gap-3 items-center">
                <img className='h-16 w-16 rounded-full' src="https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg" alt="" />
                <h1 className="username text-2xl font-poppins font-bold bg-transparent">Your name</h1>
              </div>
             
            <ul className="side_menu--options flex items-center flex-col justify-center gap-9 pl-10 bg-transparent">
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgHome />Home</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgComment />Messages</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgBookmark />About</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgPhone />Register</li>
          </ul>
          ):( */}
            <ul className="side_menu--options flex items-center flex-col justify-center  gap-7 mt-5 bg-transparent">
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgHome />Home</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgInfo />About</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgLogIn />Login</li>
            <li className="uppercase font-medium hover:text-[#28CC9E] flex gap-5 items-center cursor-pointer border-b-0 w-full bg-white text-2xl"><CgPhone />Register</li>
          </ul>
          {/* )} */}
          </div>
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
