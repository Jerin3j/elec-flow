import React from 'react'
import Search from './Search'
import './Style.css'
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Hero:React.FC = () => {
  return (
  <>
  <span className='md:hidden'><Search/></span>
  <div className="carousel md:hidden h-64 mt-8 mx-2 rounded shadow-lg">
  <div id='slide1' className="hero-content carousel-item relative w-full">
    <div className=" text-center">
      <h1 className="text-2xl font-bold">Hello there,</h1>
      <p className="py-6">Quickly Locate Reliable Electricians and Plumbers.</p>
      <button className="btn btn-primary">Get Started</button>
      <a  className="absolute top-1/2 right-0 -translate-x-1/2 text-2xl text-theme-100">❯</a>
    </div>
  </div>
  <div id="slide2" className="carousel-item relative w-full">
    <img src="https://imgs.search.brave.com/33WB5KG5py80p3nzkZyDcJHcNM0NVdy8l0h23_AStOY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTI5/NzcwNjgzL3Bob3Rv/L3lvdW5nLXBsdW1i/ZXItd2l0aC1jbGlw/LWJvYXJkLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1mTkJH/MHgtRkpwUjR2dHUw/X2VXZUVLMmQ4S1p2/S1ZtZ2F3cE9fX0w3/NW00PQ" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 bg-transparent">
      <a href="#slide1" className="btn text-theme-100">❮</a> 
      <a href="#slide3" className="btn text-theme-100">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="https://imgs.search.brave.com/dWsjrlqO_XuU3K-zPBgzGLePG1biJ2Eq1FFUoQtdVu0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9lbXBp/cmUtczMtcHJvZHVj/dGlvbi5ib2J2aWxh/LmNvbS9hcnRpY2xl/cy93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MS8wMS9UaGUtQmVz/dC1FbGVjdHJpY2lh/bi1OZWFyLU1lLURv/LUktTmVlZC1hbi1F/bGVjdHJpY2lhbi02/NTB4NDM0LmpwZw" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 bg-transparent">
      <a href="#slide2" className="btn text-theme-100">❮</a> 
      <a href="#slide4" className="btn text-theme-100">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
    <img src="https://imgs.search.brave.com/9CAuAnCHqLDiAaK61IwFQlpmR1Uj0of2lObEqcqLVm4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTY5/MjcwMjgyL3Bob3Rv/L3BsdW1iZXItd29y/a2luZy1vbi1waXBl/cy11bmRlci1zaW5r/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1iNFlwVnpzeEFo/cFVXYmNFblhMNFIw/Y3pONVZ0Y0lnbHRI/TWxiaERFZVl3PQ" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 bg-transparent">
      <a href="#slide3" className="btn text-theme-100">❮</a> 
      <a href="#slide1" className="btn text-theme-100">❯</a>
    </div>
  </div>
</div>

     {/* desktop view */}
    <section className='hidden md:flex Hero mx-4 md:mx-10 relative'>
      <div className="Hero__slide bg-transparent carousel scroll-smooth">
        <div id='slide1' className="Hero__item-1 Hero -ml-7 carousel-item flex flex-col md:flex-row mt-3 justify-evenly items-center bg-black min-h-fit" >
            <Search/>
            <div className="Hero__text flex flex-col z-10 gap-4 md:w-1/2 bg-transparent " >
              <h1 className="text-3xl md:text-5xl shadow-lg font-poppins bg-transparent text-[#f8f8f8] leading-tight">
              Power Up Your Space with Trusted Experts
              </h1>
              <q className="text-white bg-transparent tracking-wider font-poppins">
              Connect with Nearby Electricians and Plumbers
              </q>
           </div>

           <a href='#slide2' className="side__arrow rounded-full w-12 h-12 flex items-center justify-center bg-white absolute  left-0 -translate-x-1/2 cursor-pointer">
              <BsArrowLeft size={24}/>
           </a>
           <a href='#slide2' className="side__arrow rounded-full w-12 h-12 flex items-center justify-center bg-white absolute right-0 translate-x-1/2 cursor-pointer">
              <BsArrowRight size={24}/>
           </a>
           </div>


           <div id='slide2' className="Hero__item-2 carousel-item flex flex-col md:flex-row mt-3 justify-evenly items-center w-full bg-blue-600  " >
            <div className="Hero__text flex flex-col z-10 gap-4 md:w-1/2 bg-transparent " >
              <h1 className="text-3xl md:text-5xl shadow-lg font-poppins bg-transparent text-[#f8f8f8] leading-tight">
              Power Up Your Space with Trusted Experts
              </h1>
              <q className="text-white bg-transparent tracking-wider font-poppins">
              Connect with Nearby Electricians and Plumbers
              </q>
           </div>

           <a href='#slide1' className="side__arrow rounded-full w-12 h-12 flex items-center justify-center bg-white absolute left-0 -translate-x-1/2 cursor-pointer">
              <BsArrowLeft size={24}/>
           </a>
           <a className="side__arrow rounded-full w-12 h-12 flex items-center justify-center bg-white absolute right-0 translate-x-1/2 cursor-pointer">
              <BsArrowRight size={24}/>
           </a>
           </div>
          </div>
          
      
    </section>
    </>
  )
}

export default Hero
