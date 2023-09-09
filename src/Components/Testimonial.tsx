import React from 'react'

const Testimonial:React.FC = () => {
  return (
    <section className='Testimonial mt-20'>
      <div className='testimonial-section flex flex-col justify-center'>
      <div className="testimonial__content flex flex-col items-center">
        <h1 className='text-2xl font-rubik'>Reviewed by People</h1>
        <h1 className='font-poppins text-center font-bold text-5xl text-[#010103] mt-4'>Client's Testimonials</h1>
        <h1 className="text-lg font-poppins text-neutral-400 mt-7">
            Discover the positive impact we've made on the our clients by reading through their testimonials. Our clients have experienced our service and results, and they're eager to share their positive experiences with you.
        </h1>
      </div>
      <div className="testimoial__all flex justify-around mt-10">
        <div className="testimonial__all--box w-[550px] p-8 bg-white drop-shadow-xl">
          <p className='bg-transparent p-2 text-xl font-poppins'>"ElecFlow made finding an electrician for my home renovation project a breeze. The platform is incredibly user-friendly, and I was connected with a skilled electrician in no time. Highly recommended!"</p>
           <div className="testimonial__all--box-profile flex items-center ml-5 mt-4 justify-between bg-transparent">
            <div className="box--profile-items flex items-center gap-7 bg-transparent">
            <img src={require('../Media/profession-welder.png')} className='w-14 h-14 rounded-full bg-transparent' alt="" />
            <span className='flex flex-col bg-transparent'>
            <h1 className='bg-transparent font-rubik text-xl'>Michael W</h1>
            <h1 className='bg-transparent'> New York</h1>
            </span>
            </div>
            <img src="https://img.icons8.com/ios-filled/50/quote-right.png" className=' bg-white' alt="quote" />
          </div>
        </div>
        <div className="testimonial__all--box-2 w-[550px] p-8 bg-white shadow-xl">
          <p className='bg-transparent p-2 text-xl font-poppins'>"I was skeptical about hiring services online, but ElecFlow proved me wrong. It's secure, and the service providers I've hired have been top-notch. The reviews and ratings helped me make informed decisions."</p>
           <div className="testimonial__all--box-profile flex items-center ml-5 mt-4 justify-between bg-transparent">
            <div className="box--profile-items flex items-center gap-7 bg-transparent">
            <img src={require('../Media/profession-welder.png')} className='w-14 h-14 rounded-full' alt="" />
            <span className='flex flex-col bg-transparent'>
            <h1 className='bg-transparent font-rubik text-xl'>Emily H</h1>
            <h1 className='bg-transparent'> New York</h1>
            </span>
            </div>
            <img src="https://img.icons8.com/ios-filled/50/quote-right.png" className=' bg-white' alt="quote" />
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Testimonial
