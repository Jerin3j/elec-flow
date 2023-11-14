import React from 'react'
import { Link } from 'react-router-dom'

const Services:React.FC = () => {
  return (
    <section className='Services mt-12 md:mt-24 '>
      <h1 className='font-poppins text-center font-bold text-2xl md:text-5xl text-[#010103]'>Our Services</h1>
      <div className="services flex justify-evenly mt-3 md:mt-10">
        <Link to={'/elecflow-electricians'}>
        <div className="services__elec flex gap-1 md:gap-2 items-center py-1 md:py-3 px-3 md:px-7 hover:bg-blue-100 cursor-pointer rounded hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
            <img src={require('../Media/electrician.png')} className='h-10 w-10 max-h-fit md:h-auto md:w-auto bg-transparent' alt="Electrician" />
            <h1 className='font-rubik font-medium text-lg md:text-3xl bg-transparent'>Electrical</h1>
        </div>
        </Link>
        <Link to={'/elecflow-plumbers'}>      
        <div className="services__plumb flex gap-1 md:gap-2 items-center py-1 md:py-3 px-3 md:px-7 hover:bg-blue-100 cursor-pointer rounded hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
            <img src={require('../Media/plumber.png')} className='h-10 w-10 max-h-fit md:h-auto md:w-auto bg-transparent' alt="Plumber" />
            <h1 className="font-rubik font-medium text-lg md:text-3xl bg-transparent">Plumbing</h1>
        </div>
       </Link>
      </div>
      <br/>
    </section>
  )
}

export default Services
