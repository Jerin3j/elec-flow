import React from 'react'
import { BiArrowToRight, BiSolidArrowToRight } from 'react-icons/bi'
import { ImArrowRight } from 'react-icons/im'
import SP_SideNav from './SP_SideNav'

const SP_Requests:React.FC = () => {
  return (
    <section className='Requests'>
   <div className="Requests_section h-screen flex flex-col gap-3">
      <h1 className="text-bold font-poppins text-2xl md:text-5xl font-bold text-center underline underline-offset-4 ">Requests</h1>
      <div id='1' className="User-Requests relative flex flex-col md:flex-row items-start justify-end md:items-stretch md:justify-center md:gap-40 mt-12 h-20 rounded-lg mx-8 bg-blue-50 hover:bg-blue-100 cursor-pointer">
        <span className="LeftArrow absolute left-4 -mt-28 md:mt-6 bg-transparent">
          <ImArrowRight size={28} className='bg-transparent'/>
        </span>
        <div className="user-profile flex items-center gap-3 bg-transparent mt-4 md:mt-0">
          <img className='serviceProvider-profile rounded-full h-10 w-10 md:h-16 md:w-16 drop-shadow-xl' src="https://imgs.search.brave.com/BN_fhov3dztUsUTDPT0l446WqsYOYmdxKtg9hgpa45M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlZmFtb3VzcGVv/cGxlLmNvbS9wcm9m/aWxlcy90aHVtYnMv/amFjay1kb3JzZXkt/NjQ1MC0xLmpwZw" alt="" />
          <h1 className="text-xl md:text-3xl font-rubik capitalize bg-transparent">Jerin Jerome</h1>
        </div>

        <div className="mobile__text_time flex bg-transparent items-center md:gap-40">
        <div className="user-request_text flex md:gap-2 items-center bg-transparent">
          <h1 className="text-bold font-rubik text-xl md:text-2xl bg-transparent hidden md:block">Request Text :</h1>
          <span className="connect-text_from-user text-neutral-400 font-lato md:text-xl bg-transparent ml-4 md:ml-auto truncate">Hi, I want you to accept my connect!</span>
        </div>
        <h1 className="request-time font-rubik text-xs md:text-2xl bg-transparent hidden md:block">3:05pm</h1>
        </div>
      </div>
      </div> 
      <div className='underline underline-offset-4 bg-black'></div> 
    </section>
  )
}
  //  After clicking on User request redirect to /message page. then click btn to continue chat

export default SP_Requests
