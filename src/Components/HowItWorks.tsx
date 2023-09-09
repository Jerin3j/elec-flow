import React from 'react'

const HowItWorks:React.FC = () => {
  return (
    <section className='HowItWorks mt-12'>
      <div className="Hit__Text">
      <h1 className='font-poppins text-center font-bold text-5xl text-[#010103]'>How To Start ?</h1>
      </div>
      <div className="Hit__Contents flex justify-between pt-10">
    <div className="Hit__Contents__row_1">
        <div className="Hit__Contents--1 flex flex-col gap-2">
            <h1 className="text-4xl font-semibold font-rubik">1</h1>
            <h1 className="text-2xl font-rubik">User Registration:</h1>
            <ul className='font-poppins'>
              <li>Create your ElecFlow account with a few simple steps.</li>
              <li>Fill out your profile to personalize your experience.</li>
            </ul>
        </div>
        <div className="Hit__Contents--2 flex flex-col gap-2">
            <h1 className="text-4xl font-semibold font-rubik">2</h1>
            <h1 className="text-2xl font-rubik">Finding Service Providers:</h1>
            <ul className='font-poppins'>
              <li>Search for electricians and plumbers in your area.</li>
              <li>Filter results by location, services offered, ratings, and reviews.</li>
            </ul>
        </div>
        <div className="Hit__Contents--3 flex flex-col gap-2">
            <h1 className="text-4xl font-semibold font-rubik">3</h1>
            <h1 className="text-2xl font-rubik">Contact and Discuss:</h1>
            <ul className='font-poppins'>
              <li>Initiate contact with service providers through our messaging system.</li>
              <li>Discuss your needs, availability, and project details.</li>
            </ul>
        </div>
    </div>
    <div className="Hit__Contents__row__2">
        <div className="Hit__Contents--1 flex flex-col gap-2">
            <h1 className="text-4xl font-semibold font-rubik">4</h1>
            <h1 className="text-2xl font-rubik">Scheduling Services:</h1>
            <ol className='font-poppins'>
              <li>Arrange service dates and times that work for you.</li>
              <li>Many providers offer flexible scheduling options.</li>
            </ol>
        </div>
        <div className="Hit__Contents--2 flex flex-col gap-2">
            <h1 className="text-4xl font-semibold font-rubik">5</h1>
            <h1 className="text-2xl font-rubik">Payment and Reviews:</h1>
            <ol className='font-poppins'>
              <li>Securely pay for services through various payment methods.</li>
              <li>Share your experience by leaving reviews and ratings.</li>
            </ol>
        </div>
        <div className="Hit__Contents--3 flex flex-col gap-2">
            <h1 className="text-4xl font-semibold font-rubik">6</h1>
            <h1 className="text-2xl font-rubik">Support and Safety:</h1>
            <ol className='font-poppins'>
              <li>Reach our support team if you need assistance.</li>
              <li>Our platform gives background checks and secure transactions.</li>
            </ol>
        </div>
    </div>
    </div>
    </section>
  )
}

export default HowItWorks
