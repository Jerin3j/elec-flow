import React from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/User/User_Home/Header'
import Hero from '../Components/User/User_Home/Hero'
import HowItWorks from '../Components/User/User_Home/HowItWorks'
import Services from '../Components/User/User_Home/Services'
import Testimonial from '../Components/User/User_Home/Testimonial'
import WhyChoose from '../Components/User/User_Home/WhyChoose'

const Home = () => {
  return (
    <div>
    <div className='px-4 md:px-64 scroll-smooth'>
      <Header/>
      <Hero/>
      <Services/>
      <HowItWorks/>
      <WhyChoose/>
      <Testimonial/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
