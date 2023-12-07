import React from 'react'

const WhyChoose:React.FC = () => {
  return (
    <section className='Choose mt-12 md:mt-28'>
      <h1 className='font-poppins text-center font-bold text-2xl md:text-5xl text-[#010103]'>Why Choose Us</h1>
        <div className="choose flex flex-col md:flex-row gap-20 mt-5 md:mt-10">
        <div className="choose__one flex flex-col mt-2 md:mt-5 md:w-3/4 ml-2 md:ml-0 gap-4 md:gap-7">
            <h1 className='font-poppins md:font-rubik text-lg md:text-3xl font-extrabold tracking-wide'>Effortlessly Book Nearby Electricians and Plumbers</h1>
            <h1 className='text-neutral-400 md:leading-[26px] font-poppins ml-1 md:ml-0'>
            Discover the reliable electricians and plumbers in their local area. Our platform not only helps users find skilled professionals quickly but also allows electricians and plumbers to register and access job opportunities in their vicinity. Whether you're in need of urgent repairs or planning a home improvement project, ElecFlow is here to simplify the process and ensure you get the assistance you need.
            </h1>
            <a href='#' className="Button w-32 py-3 md:py-4 rounded-md text-center font-rubik bg-theme-100 shadow-theme-200 shadow-md hover:drop-shadow-lg cursor-pointer tracking-wider">Find more &gt;</a>
        </div>
        <div className="choose__two flex flex-col gap-4 md:gap-9 mx-2 md:mx-0">
          <div className="choose_text-1 flex">
          <img className='h-20 w-20 self-center' src={require('../Media/Icons/Experience.png')} alt="" />
            <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className="text-lg md:text-xl font-rubik font-bold tracking-wide">Expertise and Experience</h1>
            <h1 className="md:text-lg md:w-3/4 tracking-wide font-poppins">Our team comprises highly skilled professionals with years of experience, ensuring top-notch service and reliable solutions for your needs.</h1>
            </div>
            </div>
            <div className="choose_text-2 flex">
            <img className='h-20 w-20 self-center' src={require('../Media/Icons/CustomerApproach.png')} alt="" />
            <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className="text-lg md:text-xl font-rubik font-bold">Customer-Centric Approach</h1>
            <h1 className="md:text-lg md:w-3/4 font-poppins">We prioritize your satisfaction, offering personalized service, transparent communication, and a commitment to meeting and exceeding your expectations.</h1>
            </div>
            </div>
            <div className="choose_text-2 flex">
            <img className='h-20 w-20 self-center' src={require('../Media/Icons/Quality.png')} alt="" />
            <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className="text-lg md:text-xl font-rubik font-bold">Quality Assurance</h1>
            <h1 className="md:text-lg md:w-3/4 font-poppins">Rest easy knowing that we adhere to the highest industry standards, providing quality workmanship and utilizing top-grade materials to deliver lasting results.</h1>
            </div>
            </div>
        </div>
        </div>
        
    </section>
  )
}

export default WhyChoose
