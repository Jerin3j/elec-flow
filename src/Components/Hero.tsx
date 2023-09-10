import React from 'react'
import Search from './Search'
import './Style.css'
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Hero:React.FC = () => {
  return (
    <section className='Hero mx-10 relative'>
      <div className="Hero__slide bg-transparent">
        <div className="Hero__item-1 flex mt-3 justify-evenly items-center bg-transparent float-left transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none" data-te-carousel-item data-te-carousel-active>
            <Search/>
            <div className="Hero__text  flex flex-col z-10 gap-4 w-1/2 bg-transparent " >
              <h1 className="text-5xl dshadow-lg font-poppins bg-transparent text-[#f8f8f8] leading-tight">
              Power Up Your Space with Trusted Experts
              </h1>
              <q className="text-white bg-transparent tracking-wider font-poppins">
              Connect with Nearby Electricians and Plumbers
              </q>
           </div>
           </div>
           
          </div>
          <div className="side__arrow rounded-full w-12 h-12 flex items-center justify-center bg-white absolute -left-7 cursor-pointer">
              <BsArrowLeft size={24}/>
           </div>
           <div className="side__arrow rounded-full w-12 h-12 flex items-center justify-center bg-white absolute -right-7 cursor-pointer">
              <BsArrowRight size={24}/>
           </div>
      
    </section>
  )
}

export default Hero
