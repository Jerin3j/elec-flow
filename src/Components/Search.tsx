import React from 'react'
import { BiCurrentLocation, BiSearch } from "react-icons/bi";

const Search :React.FC= () => {
  return (
    <div className="Search bg-transparent ">
  <div className="relative mb-4 flex items-center justify-center bg-transparent">
   <div className="relative rounded-xl w-[500px] border-2 focus:border-primary focus:text-neutral-900">
    <input
      type="search"
      className=" py-5 px-3 w-full border hover:bg-white hover:placeholder:text-black rounded-lg text-lg text-neutral-700 outline-none transition duration-200 ease-in-out  focus:shadow-red-400 focus:outline-none dark:border-neutal-950 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
      placeholder="Find Electricians and Plumbers Near You"
      aria-label="Search"
      aria-describedby="button-addon2" />
    <BiCurrentLocation size={32} className='absolute right-16 top-4 fill-neutral-700  hover:fill-black bg-transparent cursor-pointer'/>
    <BiSearch size={33} className='absolute right-4 top-4 fill-neutral-700  hover:fill-black bg-transparent cursor-pointer'/>
    </div>
  </div>
</div>
  )
}

export default Search
