import React from 'react'
import { BiCurrentLocation, BiSearch } from "react-icons/bi";

const Search :React.FC= () => {
  return (
    <div className="Search bg-transparent ">
  <div className="relative mb-4 mt-4 md:mt-0 flex items-center md:justify-center bg-transparent">
   <div className="relative rounded-xl w-full mx-5 md:mx-0 md:w-[500px] border md:border-2 shadow-lg md:shadow-none focus-within:border-theme-100 bg-gray-50 outline-none md:outline focus:border-primary focus:text-neutral-900">
    <input
      type="search"
      className=" md:py-5 py-3 px-1 md:px-3 w-5/6 rounded-lg text-sm md:text-lg bg-gray-50 hover:bg-white hover:placeholder:text-black text-neutral-700  transition duration-200 ease-in-out  focus:shadow-red-400 focus:outline-none dark:border-neutal-950 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
      placeholder="Find Electricians and Plumbers Near You"
      aria-label="Search"
      aria-describedby="button-addon2" />
    <BiCurrentLocation size={32} className='absolute h-7 md:h-auto w-7 md:w-auto right-2 md:right-16 top-2 md:top-4 fill-neutral-700  hover:fill-black bg-transparent cursor-pointer'/>
    <BiSearch size={33} className='hidden md:block absolute right-4 top-4 fill-neutral-700  hover:fill-black bg-transparent cursor-pointer'/>
    </div>
  </div>
</div>
  )
}

export default Search
