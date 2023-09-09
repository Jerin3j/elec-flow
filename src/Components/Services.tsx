import React from 'react'

const Services:React.FC = () => {
  return (
    <section className='Services mt-24'>
      <h1 className='font-poppins text-center font-bold text-5xl text-[#010103]'>Our Services</h1>
      <div className="services flex justify-evenly mt-10">
        <div className="services__elec flex gap-2 items-center py-3 px-7 hover:bg-blue-100 cursor-pointer rounded hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
            <img src={require('../Media/electrician.png')} className='bg-transparent' alt="Electrician" />
            <h1 className='font-rubik font-medium text-3xl bg-transparent'>Electrical</h1>
        </div>
        <div className="services__plumb flex gap-2 items-center py-3 px-7 hover:bg-blue-100 cursor-pointer rounded hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
            <img src={require('../Media/plumber.png')} className='bg-transparent' alt="Plumber" />
            <h1 className="font-rubik font-medium text-3xl bg-transparent">Plumbing</h1>
        </div>
      </div>
      <br/>
    </section>
  )
}

export default Services
