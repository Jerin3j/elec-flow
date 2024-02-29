import React from 'react'
import '../../Style.css'
const SP_Dashboard = () => {
  return (
    <div className='Dashboard'>
      <div className='Dashboard_hero flex flex-col pb-5 md:pb-32 border-b mb-5 mt-4 relative'>
       <div className="hero mt-12 pl-14 md:mt-24 mb-10 md:pl-24 flex flex-col items-start ">
         <div className="blob w-full md:w-2/4"></div>
          <h1 className='font-poppins font-semibold text-4xl md:text-6xl text-[#F7F7F7] bg-transparent z-10'>Good Morning,</h1>
          <h1 className="font-poppins font-semibold  text-3xl md:text-5xl text-[#F7F7F7] bg-transparent capitalize ml-2 z-10">John doe</h1>
        </div>
        <div className="dashboard_items flex flex-col md:flex-row gap-4 lg:gap-0 basis-10 justify-evenly mt-16">
            <div className="ratings  h-28 md:w-56 md:h-56 flex flex-col border rounded-xl border-red-600 shadow-red-500 justify-center items-center bg-transparent z-20">
                <h1 className="text- md:text-3xl font-poppins font-bold bg-transparent">Your Ratings</h1>
                <h1 className="text- md:text-3xl font-outfit bg-transparent">52</h1>
            </div>
            <div className="ratings  h-28 md:w-56 md:h-56 flex flex-col border rounded-xl border-blue-600 shadow-blue-800 justify-center items-center">
                <h1 className="text- md:text-3xl font-poppins font-bold text-center">Current Connections</h1>
                <h1 className="text- md:text-3xl font-outfit">2</h1>
            </div>
            <div className="ratings  h-28 md:w-56 md:h-56 flex flex-col border rounded-xl border-green-600 shadow-green-900 justify-center items-center">
                <h1 className="text- md:text-3xl font-poppins font-bold">Users</h1>
                <h1 className="text- md:text-3xl font-outfit">9</h1>
            </div>
        </div>
      </div>
    </div>
  )
}

export default SP_Dashboard
