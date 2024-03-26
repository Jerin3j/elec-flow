import React, { useEffect, useRef, useState } from 'react'
import { BsDatabase, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import supabase from '../../Config/supabaseClient'
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const SignIn:React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const rememberMe :React.MutableRefObject<any>= useRef('')

  const schema = yup.object({
    Email: yup.string().required("Email field is required").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/),
    Password: yup.string().max(8).min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .required('Password is required'),
  }).required();
  type FormData = yup.InferType<typeof schema>;

  const {register, handleSubmit, formState: { errors }} = useForm<FormData>({resolver: yupResolver(schema)})

  const navigate = useNavigate()

  const GoogleAuth =async ()=>{
    supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

   const signIn : SubmitHandler<any> = async ()=>{ 
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      if (error) {
        console.error('Error signing in:', error);
        alert(error.message)
      } else {
        console.log('Successfully signed in:', data.user);
        navigate('/')
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

   if(rememberMe.current.checked){
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
   }
  const forgotPassword = async () => {
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'account/reset-password',
    })
  };
  
  return (
    <section className='Sign-In'>
    <div className="signin flex flex-col md:flex-row flex-wrap items-center justify-evenly h-screen">
    <h1 className="text-3xl font-poppins font-bold md:hidden">Sign In</h1>
      <div className="sigin__image  relative">
        <img
          src={require('../../Media/signIn.png')}
          className="w-56 md:w-full"
          alt="Sample image" />
      </div>

      <div className="signin__form flex flex-col w-full md:w-1/4 px-4 md:px-0">
        <h1 className="hidden md:block text-4xl font-poppins font-bold">Sign In</h1>
        <div className="signin__form--inputs flex flex-col mt-6">
       <div className="Email_inp mb-6">
         <div className="email_input relative border rounded" data-te-input-wrapper-init>
            <input
              {...register("Email")}
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              className="peer block min-h-[auto] w-full select-none rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput2"
              placeholder="Email address" />
            <label
              htmlFor="exampleFormControlInput2"
              className={`${email? 'peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full bg-transparent peer-focus:w-28 left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary bg-[#F7F7F7]': 'pointer-events-none absolute w-full bg-transparent peer-focus:w-28 left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary bg-[#F7F7F7]'}`}
              >Email address
            </label>
          </div>
          {errors.Email && <h1 className='text-red-500 text-xs'>{`${errors.Email.message}`}</h1>}
          </div>
          <div className="password_inp mb-6">
            <div className="password__input--1 relative border rounded">
            <input
              {...register("Password")}
              maxLength={8}
              onChange={(e)=>setPassword(e.target.value)}
              type = {visible? "text" : "password"} unselectable='off' 
              className="peer block min-h-[auto] w-full select-none rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="pass"
              placeholder="Enter Password" />
            <label
              htmlFor="pass"
              className={`${password? `peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full bg-transparent peer-focus:w-20 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary` : 'pointer-events-none absolute w-full bg-transparent peer-focus:w-20 peer-focus:bg-transparent peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'}`}
              >Password
            </label>
            <span onClick={() => setVisible(!visible)} className="showPass absolute right-4 top-4 opacity-70">
            {visible ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}
            </span>
          </div>
          {errors.Password && <h1 className='text-red-500 text-xs'>{`${errors.Password.message}`}</h1>}
          </div>
          </div>
        <div className="signin__form--texts flex justify-between px-3 md:px-0">
          <div className="remember-checkbox flex items-center gap-1 md:gap-2">
            <input type="checkbox" id="check" ref={rememberMe} />
            <label htmlFor="check" className="cursor-pointer text-neutral-700 dark:text-neutral-200 text-sm md:text-base">Remember me</label>
          </div>
          <p 
          onClick={forgotPassword}
          className="transition duration-150 ease-in-out text-sm md:text-base text-blue-600 hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600 cursor-pointer">Forgot Password?</p>
        </div>
        <div className="signin__form--footer flex flex-col gap-3 mt-5">
        <button onClick={handleSubmit(signIn)} className="sigin__form--btn btn w-40 md:w-1/2 self-center select-none uppercase btn-accent hover:bg-theme-100 hover:drop-shadow-lg border-none cursor-pointer">Sign in</button>
          <h1 className="Or text-black dark:text-white text-center font-rubik md:text-lg font-semibold ">OR</h1>
          <div className="signup__form--sm-btns flex gap-7 justify-center items-center">
             <button onClick={GoogleAuth} className="sigin__form--btn mask mask-squircle uppercase shadow-xl border-none hover:drop-shadow-2x cursor-pointer">
             <img className='w-5 h-5 md:w-9 md:h-9 ' src="https://www.freepnglogos.com/uploads/google-favicon-logo-20.png" alt='google_logo'/>
             </button>
             <button className="sigin__form--btn mask mask-squircle uppercase text-black shadow-xl border-none hover:drop-shadow-2x cursor-pointer">
              <img className='w-4 h-4 md:w-7 md:h-7 drop-shadow-md' src="https://www.freepnglogos.com/uploads/facebook-logo-17.jpg" alt="fb_logo" />
             </button>
             <button className="sigin__form--btn mask mask-squircle uppercase text-black shadow-xl border-none hover:drop-shadow-2x cursor-pointer">
              <img className='w-4 h-4 md:w-8 md:h-8 drop-shadow-md' src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png" alt="gh_logo" />
             </button>
          </div>
          <span className='text-sm text-neutral-800 dark:text-white'>Are you willing to Sign in? Do
          <Link to={'/signup'}>
          <span className='text-blue-600 cursor-pointer'> Sign up</span>
          </Link>
          .</span>
        </div>
      </div>


    </div>
    </section>
  )
  }

export default SignIn
