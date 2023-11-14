import React from 'react'
import { Link } from 'react-router-dom'

const ServiceProviders:React.FC = () => {
  return (
    <section className='Service-Providers'>
      <div className="ServiceProviders flex flex-col gap-5 h-screen p-5">
        <div className="ServiceProviders__Text ml-3">
            <h1 className="text-5xl font-poppins font-bold text-center">Service Providers</h1>
        </div>
        <select className='ServiceProviders__Sort absolute right-7 top-6 border-2 rounded px-1 py-1' name="" id="" >
              <option disabled selected>Sort By</option>
              <option value="">Electricians</option>
              <option value="">Plumbers</option>
            </select>
            {/* Body */}
        <div className="ServiceProviders__List flex px-3 gap-4 items-center">
         <h1 className='capitalize font-rubik text-2xl'>1.</h1>
         <Link to={'/sp-profile'}>
          <img className='serviceProvider-profile rounded-full h-16 w-16 drop-shadow-xl' src="https://imgs.search.brave.com/BN_fhov3dztUsUTDPT0l446WqsYOYmdxKtg9hgpa45M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlZmFtb3VzcGVv/cGxlLmNvbS9wcm9m/aWxlcy90aHVtYnMv/amFjay1kb3JzZXkt/NjQ1MC0xLmpwZw" alt="" />
           </Link>
           <div className="ServiceProviders__List-name-email">
             <h1 className='text-3xl font-outfit'>John dae - electrician</h1>
             <h1 className='text-sm font-poppins text-neutral-600'>( johndae2@gmail.com )</h1>
            </div>
            <div className="rating ml-5">
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked/>
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            </div>
        </div>
        
      </div>
    </section>
  )
}

export default ServiceProviders
