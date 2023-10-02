import React from 'react'

const ServiceProviders:React.FC = () => {
  return (
    <section className='Service-Providers'>
      <div className="ServiceProviders flex flex-col gap-5 h-screen">
        <div className="ServiceProviders__Text ml-3">
            <h1 className="text-4xl font-poppins font-bold">Service Providers</h1>
        </div>
        <div className="ServiceProviders__List flex justify-between px-3">
            <h1 className='text-xl font-rubik'>1.</h1>
            <h1 className='text-xl font-rubik'>John dae</h1>
            <h1 className='text-xl font-rubik'>johndae2@gmail.com</h1>
            <h1 className='text-xl font-rubik'>* * * * *</h1>
            <h1 className='capitalize font-rubik'>electrician</h1>
        </div>
      </div>
    </section>
  )
}

export default ServiceProviders
