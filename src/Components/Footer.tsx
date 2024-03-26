import React from 'react'
import { BsFacebook } from 'react-icons/bs'
import LogoSvg from '../Media/Logo/LogoSvg'
import Logo from '../Pages/Logo'
import { FaSquareFacebook, FaSquareGithub, FaSquareInstagram, FaSquareTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
<section className="Footer mt-24 ">
    <div className="md:mx-auto w-full bg-neutral-200 dark:bg-[#0c0c0c] p-4 py-5 md:py-7">
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:px-16 bg-transparent">
          <div className="mb-6 md:mb-0 bg-transparent flex flex-col items-center justify-center">
              <a href="#" className="flex items-center justify-center md:justify-normal bg-transparent">
                    <LogoSvg/>
                    <h1 className=' text-2xl font-poppins space-x-3 font-semibold bg-transparent'>elecFlow</h1>
              </a>
              <h1 className="ml-3  md:w-52 font-poppins text-center text-neutral-400 bg-transparent">Quickly Locate Reliable Electricians and Plumbers</h1>
          </div>
          <div className="Footer__Groups flex flex-col md:flex-row gap-5 md:gap-8 md:mt-5 bg-transparent">
          <div className='Group--1 bg-transparent'>
                  <h2 className="mb-2 md:mb-6 text-lg md:text-sm font-semibold text-gray-900 uppercase dark:text-white bg-transparent text-center">Contact Us</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium bg-transparent  flex flex-col items-center">
                      <li className="mb-2 md:mb-4 bg-transparent">
                          <a className="hover:underline bg-transparent">+1 (123) -456-789</a>
                      </li>
                      <li className='bg-transparent'>
                          <a className="hover:underline bg-transparent">elecflow@gmail.com</a>
                      </li>
                  </ul>
              </div>
              <div className='Group--2 bg-transparent'>
                  <h2 className="mb-2 md:mb-6 text-lg md:text-sm font-semibold text-gray-900 uppercase dark:text-white bg-transparent text-center">Services</h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium bg-transparent  flex flex-col items-center ">
                      <li className="mb-2 md:mb-4 bg-transparent">
                          <a className="hover:underline bg-transparent">Electrical</a>
                      </li>
                      <li className='bg-transparent'>
                          <a className="hover:underline bg-transparent">Plumbing</a>
                      </li>
                  </ul>
              </div>
              <div className='Footer__Group-3 bg-transparent'>
                  <h2 className="mb-2 md:mb-6 text-lg md:text-sm  font-semibold text-gray-900 uppercase dark:text-white bg-transparent text-center">Legal</h2>
                  <ul className="text-gray-500 font-medium bg-transparent flex flex-col items-center">
                     <li className="mb-2 md:mb-4 bg-transparent">
                          <a href="#" className="hover:underline bg-transparent">Report a Problem</a>
                      </li>
                      <li className="mb-2 md:mb-4 bg-transparent">
                          <a href="#" className="hover:underline bg-transparent">Privacy Policy</a>
                      </li>
                      <li className='mb-2 md:mb-4  bg-transparent'>
                          <a href="#" className="hover:underline bg-transparent">Terms &amp; Conditions</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr className="my-7 mt-5  border-gray-400 md:mx-auto dark:border-gray-700 md:my-8" />
      <div className="Social-media__icons flex flex-col md:flex-row items-center justify-between bg-transparent">
          <span className="text-sm text-gray-500 text-center dark:text-gray-400 bg-transparent">© 2023 <a href="/" className="hover:underline bg-transparent">ElecFlow™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0 bg-transparent">
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white bg-transparent">
                  <FaSquareFacebook/>
                  <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <FaSquareTwitter/>
                  <span className="sr-only">Twitter page</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <FaSquareGithub/>
                  <span className="sr-only">GitHub account</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  <FaSquareInstagram/>
                  <span className="sr-only">Instagram account</span>
              </a>
          </div>
      </div>
    </div>

    </section>
  )
}

export default Footer
