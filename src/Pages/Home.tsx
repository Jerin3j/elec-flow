import React from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Hero from '../Components/Hero'
import HowItWorks from '../Components/HowItWorks'
import Services from '../Components/Services'
import Testimonial from '../Components/Testimonial'
import WhyChoose from '../Components/WhyChoose'

const Home = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Services/>
      <HowItWorks/>
      <WhyChoose/>
      <Testimonial/>
      <Footer/>
    </div>
  )
}

export default Home
