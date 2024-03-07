import React, { useState } from 'react'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import supabase from '../../Config/supabaseClient'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../Reducer/store'

const Register:React.FC = () => {

  const locName = useSelector((currentLocation: RootState)=> currentLocation.userLocation.LocDetails?.currentLocation)
  const [visible, setVisible] = useState<boolean>(false)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [phonenumber, setPhonenumber] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [ConfirmPassword, setConfirmPassword] = useState<string>('')
    const [job, setJob] = useState<any>()
    const navigate = useNavigate()

    async function Register() {
      try {
        const { data, error } = await supabase.auth.signUp({ 
          email,
          password,
          options: {
            data: {
             password, 
             job,
            }
          } 
        });
        console.log('User signed up:');
        navigate("/");
  
        // Get new user details
        const { data:{user}, } = await supabase.auth.getUser()
        let serviceProvider_uuid = user?.id
        console.log(serviceProvider_uuid)
        
        // Insert new user data to 'users' table with auth uuid
        const { data: InsertData, error: InsertError } = await supabase
          .from('service-providers')
          .insert([{ 'uuid': serviceProvider_uuid, 'first_name': firstName, 'last_name': lastName, email, password, phonenumber, job, location: locName }])
          .select();
  
          if (InsertError) {
            console.error('Error inserting provider data:', InsertError);
          } else {
            console.log('Inserted provider data:', InsertData);
          }
          
      } catch (error) {
        console.error('Signup failed:', error);
      }
    };
    console.log(job);
    
    return (
      <section className='Register'>
      <div className="register flex flex-col md:flex-row flex-wrap items-center justify-evenly py-4 md:py-0 md:h-screen">
      <h1 className="text-3xl font-poppins font-bold md:hidden">Register</h1>
      <h1 className="text-[10px] text-neutral-500 md:hidden">(only for service providers)</h1>
        <div className="register__image  relative">
          <img
            src={require('../../Media/signUp.png')}
            className="w-56 md:w-full"
            alt="Sample image" />
        </div>
  
        <div className="register__form flex flex-col md:w-1/3 ">
          <h1 className="hidden md:block text-4xl font-poppins font-bold">Register</h1>
      <h1 className="hidden md:block text-xs text-neutral-500 ml-1">(only for service providers)</h1>
          <div className="register__form--inputs flex flex-col mt-6 px-4 md:px-0">
            <div className="register_form--inputs-name flex sm:flex-col lg:flex-row w-full justify-between gap-3 md:gap-0">
              <div className="name--input-2 relative mb-6 border rounded">
              <input
              onChange={e=>setFirstName(e.target.value)}
                type="text"
                className="peer block min-h-[auto] w-1/3 md:w-72 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput2"
                placeholder="first name" />
              <label
                htmlFor="exampleFormControlInput2"
                className={`${firstName? 'peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full peer-focus:w-20 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary': 'pointer-events-none absolute w-full peer-focus:w-20 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'}`}
                >First name
              </label>
            </div>
            <div className="name--input-2 relative mb-6 border rounded">
              <input
                onChange={e=>setLastName(e.target.value)}
                type="text"
                className="peer block min-h-[auto] w-1/3 md:w-72 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput2"
                placeholder="last name" />
              <label
                htmlFor="exampleFormControlInput2"
                className={`${lastName? 'peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full peer-focus:w-20 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary': 'pointer-events-none absolute w-full peer-focus:w-20 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'}`}
                >Last name
              </label>
            </div>
            </div>
          <div className="email__input relative mb-6 border rounded">
              <input
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput2"
                placeholder="Enter your Email address" />
              <label
                htmlFor="exampleFormControlInput2"
                className={`${email? 'peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full peer-focus:w-28 left-3 peer-focus:bg-transparent top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary': 'pointer-events-none absolute w-full peer-focus:w-28 left-3 peer-focus:bg-transparent top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'}`}
                >Email address
              </label>
            </div>
            <div className="email__input relative mb-6 border rounded">
              <input
                onChange={(e)=>setPhonenumber(e.target.value)}
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlInput2"
                placeholder="Enter your phone number" />
              <label
                htmlFor="exampleFormControlInput2"
                className={`${phonenumber? 'peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full peer-focus:w-28 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary' : 'pointer-events-none absolute w-full peer-focus:w-28 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'}`}
                >Phone number
              </label>
            </div>
              <select onChange={(e)=>setJob(e.target.value)}
               className={`${job? 'text-neutral-900':'text-neutral-500'} block w-full selection: p-2 mb-6 border border-gray-200 rounded outline-0 py-3`}>
                <option selected disabled className='text-neutral-700'>Choose your job</option>
                <option className='text-neutral-600'>Electrician</option>
                <option className='text-neutral-600'>Plumber</option>
              </select>
          <div className="password__input--1 relative mb-6 border rounded">
              <input
                onChange={(e)=>setPassword(e.target.value)}
                type = {visible? "text" : "password"} unselectable='off' 
                className="peer block min-h-[auto] w-full select-none rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="pass"
                placeholder="Enter Password" />
              <label
                htmlFor="pass"
                className={`${password? `peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full peer-focus:w-20 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`: 'pointer-events-none absolute w-full peer-focus:w-20 peer-focus:bg-transparent peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8]`} left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'}`}
              >Password
              </label>
              <span onClick={() => setVisible(!visible)} className="showPass absolute right-4 top-4 opacity-70">
              {visible ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}
              </span>
            </div>
            <div className="password__input--2 relative mb-6 border rounded">
              <input
                onChange={(e)=>setConfirmPassword(e.target.value)}
                type = {visible? "text" : "password"}
                className="peer block min-h-[auto] w-full  select-none rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="pass"
                placeholder="Conform password" />
              <label
                htmlFor="pass"
                className={`${ConfirmPassword? `peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full peer-focus:w-36 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:text-primary  dark:text-neutral-200 dark:peer-focus:text-primary`: 'pointer-events-none absolute w-full peer-focus:w-36 peer-focus:bg-transparent peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:text-primary  dark:text-neutral-200 dark:peer-focus:text-primary'}`}
                >Confirm password
              </label>
              <span onClick={() => setVisible(!visible)} className="showPass absolute right-4 top-4 opacity-70">
                {visible ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}
                </span>
            </div>
          </div>
          <div className="register__form--texts flex justify-between px-3 md:px-0">
            <div className="remember-checkbox flex items-center gap-1 md:gap-2">
              <input type="checkbox" id="check" />
              <label htmlFor="check" className="cursor-pointer text-neutral-700 text-sm md:text-base">Remember me</label>
            </div>
            <p className="transition duration-150 ease-in-out text-sm md:text-base text-blue-600 hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600 cursor-pointer">Forgot Password?</p>
          </div>
          <div className="register__form--footer flex flex-col gap-3 mt-5">
          <button 
           onClick={Register}
           type='button'
           className="sigin__form--btn btn w-40 md:w-1/2 self-center select-none uppercase btn-accent hover:bg-theme-100 hover:drop-shadow-lg border-none cursor-pointer" data-te-ripple-init
           data-te-ripple-color="light"
           data-te-submit-btn-ref>
              Register
           </button>
            <h1 className="Or text-black text-center font-rubik md:text-lg font-semibold">OR</h1>
            <div className="register__form--sm-btns flex gap-7 justify-center items-center">
               <button className="sigin__form--btn mask mask-squircle uppercase shadow-xl border-none hover:drop-shadow-2x cursor-pointer">
               <img className='w-5 h-5 md:w-9 md:h-9 ' src="https://www.freepnglogos.com/uploads/google-favicon-logo-20.png" alt='google_logo'/>
               </button>
               <button className="sigin__form--btn mask mask-squircle uppercase text-black shadow-xl border-none hover:drop-shadow-2x cursor-pointer">
                <img className='w-4 h-4 md:w-7 md:h-7 drop-shadow-md' src="https://www.freepnglogos.com/uploads/facebook-logo-17.jpg" alt="fb_logo" />
               </button>
               <button className="sigin__form--btn mask mask-squircle uppercase text-black shadow-xl border-none hover:drop-shadow-2x cursor-pointer">
                <img className='w-4 h-4 md:w-8 md:h-8 drop-shadow-md' src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png" alt="gh_logo" />
               </button>
            </div>
            <span className='text-sm text-neutral-800 '>Alredy have an account?
            <Link to={'/signin'}><span className='text-blue-600 cursor-pointer'> Sign in</span></Link>
            .</span>
          </div>
        </div>
  
  
      </div>
      </section>
    )
  }
  

export default Register
