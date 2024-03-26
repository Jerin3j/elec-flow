import React from 'react'

const BarLoader = () => {
  return (
    <div className='h-[100dvh] flex justify-center items-center'>
      <span className="loading loading-bars w-12 md:w-24 text-theme-200"></span>
    </div>
  )
}

export default BarLoader