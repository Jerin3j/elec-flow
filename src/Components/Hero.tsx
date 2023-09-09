import React from 'react'
import Search from './Search'
import './Style.css'

const Hero:React.FC = () => {
  return (
    <section className='Hero mx-10'>
        <div className="Hero-items flex mt-3 justify-evenly items-center bg-transparent">
            <Search/>
            <div className="Hero__text  flex flex-col z-10 gap-4 w-1/2 bg-transparent ">
              <h1 className="text-5xl dshadow-lg font-poppins bg-transparent text-[#f8f8f8] leading-tight">
              Power Up Your Space with Trusted Experts
              </h1>
              <q className="text-white bg-transparent tracking-wider">
              Connect with Nearby Electricians and Plumbers
              </q>
           </div>
        </div>
      
    </section>
  )
}

export default Hero
