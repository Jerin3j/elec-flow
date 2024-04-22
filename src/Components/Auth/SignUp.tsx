import React, { useState } from 'react'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import supabase from '../../Config/supabaseClient';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { RootState } from '../../Reducer/store';
import { useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';

const SignUp:React.FC = () => {

  const [visible, setVisible] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phonenumber, setPhonenumber] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [ConfirmPassword, setConfirmPassword] = useState<string>('')
  const locName = useSelector((currentLocation: RootState)=> currentLocation.userLocation.LocDetails?.currentLocation)
  const navigate = useNavigate()

  const schema = yup.object({
    FirstName: yup.string().required("First Name is required"),
    LastName: yup.string().required("Last Name is required"),
    PhoneNumber: yup.number().required("Phone number is required").min(13, 'Phone Number must have 10 digits with +91'),
    Email: yup.string().required("Email is required").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/),
    Password: yup.string().max(8).min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .required('Password is required'),
    NPassword: yup.string().max(8).min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .required('Password is required'),
  }).required();
  type FormData = yup.InferType<typeof schema>;

  const {register, handleSubmit, formState: { errors }} = useForm<FormData>({resolver: yupResolver(schema)})

  const Sign_Up: SubmitHandler<any> = async()=> {
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email,
        password,
        options: {data: {password,}
      } 
      });

      // Get new user details
      const { data:{user}, } = await supabase.auth.getUser()
      let user_uuid = user?.id
      console.log(user_uuid);
      
      // Insert new user data to 'users' table with auth uuid
      const { data: InsertData, error: InsertError } = await supabase
        .from('users')
        .insert([{ 'uuid': user_uuid, 'first_name': firstName, 'last_name': lastName, phonenumber, email, password, location: locName}])
        .select();

        if (InsertError) {
          console.error('Error inserting user data:', InsertError);
        } else {
          console.log('Inserted user data:', InsertData);
          navigate('/')
          window.location.reload()
        }
        
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };
  
  const GoogleAuth = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
  
      if (error) {
        throw new Error("Authentication error: " + error.message);
      }
  
      const { data: {user}, error: userError } = await supabase.auth.getUser();
  
      if (userError) {
        throw new Error("Error fetching user details: " + userError.message);
      }
  
      // Extract user details
      const {  id, email, user_metadata }: any = user;
      const { full_name, avatar_url } = user_metadata || {};
  
      // Insert user details into the users table
      const { data: InsertData, error: InsertError } = await supabase
        .from('users')
        .insert([
          { 
            'uuid': user?.id,
            'email': email || '',
            'name': full_name || '',
            'profile_link': avatar_url || '',
          }
        ]);
  
      if (InsertError) {
        throw new Error("Error inserting user details: " + InsertError.message);
      }
  
      console.log("User signed in and details inserted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };
  

  async function GithubAuth() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }
  

  return (
    <section className='Sign-Up'>
    <div className="signup flex flex-col md:flex-row flex-wrap items-center justify-evenly py-4 md:py-4 md:h-screen">
    <h1 className="text-3xl font-poppins font-bold md:hidden">Sign Up</h1>
      <div className="signup__image relative">
        <img
          src={require('../../Media/signUp.png')}
          className="w-56 md:w-full"
          alt="Sample image" />
      </div>

      <div className="signup__form flex flex-col lg:w-1/3 ">
        <h1 className="hidden md:block text-4xl font-poppins font-bold">Sign Up</h1>

        <div className="signup__form--inputs flex flex-col mt-6 px-4 md:px-0">
          <div className="signup_form--inputs-name flex sm:flex-col lg:flex-row w-full justify-between gap-3 md:gap-0">
            <div className="firstname_inp mb-6">
            <div className="name--input- relative border rounded">
            <input
              {...register("FirstName")}
              onChange={(e)=>setFirstName(e.target.value)}
               type="text"
              className="peer block min-h-[auto] w-1/3 md:w-72 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput2"
              placeholder="first name" />
            <label
              htmlFor="exampleFormControlInput2"
              className={`${firstName? 'peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full peer-focus:w-20 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary': 'pointer-events-none  absolute w-full peer-focus:w-20 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'}`}
              >First name
            </label>
          </div>
          {errors.FirstName && <h1 className='text-red-500 text-xs'>{`${errors.FirstName.message}`}</h1>}
          </div>
          <div className="lastname_inp mb-6">
          <div className="name--input-2 relative border rounded">
            <input
              {...register("LastName")}
              onChange={(e)=>setLastName(e.target.value)}
              type="text"
              className= "peer block min-h-[auto] w-1/3 md:w-72 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput2"
              placeholder="last name" />
            <label
              htmlFor="exampleFormControlInput2"
              className={`${lastName ? 'peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full peer-focus:w-20 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary' : 'pointer-events-none absolute w-full peer-focus:w-20 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'}`}
              >Last name
            </label>
          </div>
          {errors.LastName && <h1 className='text-red-500 text-xs'>{`${errors.LastName.message}`}</h1>}
          </div>
        </div>
        <div className="email_inp mb-6">
        <div className="email__input relative border rounded">
            <input
              {...register("Email")}
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput2"
              placeholder="Enter your Email address" />
            <label
              htmlFor="exampleFormControlInput2"
              className={ `${email? 'peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full peer-focus:w-28 left-3 peer-focus:bg-transparent top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary' : 'pointer-events-none absolute w-full peer-focus:w-28 left-3 peer-focus:bg-transparent top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'}`}
              >Email address
            </label>
          </div>
          {errors.Email && <h1 className='text-red-500 text-xs'>{`${errors.Email.message}`}</h1>}
          </div>
          <div className="phonenumber_inp mb-6">
          <div className="phonenumber__input relative border rounded">
            <input
              {...register("PhoneNumber")}
              onChange={(e)=>setPhonenumber(e.target.value)}
              maxLength={13}
              minLength={13}
              defaultValue={'+91'}
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput2"
              placeholder="Enter your phone number" />
            <label
              htmlFor="exampleFormControlInput2"
              className={`${phonenumber? 'peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full peer-focus:w-28 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary bg-[#F7F7F7] dark:bg-transparent' : 'pointer-events-none absolute w-full peer-focus:w-28 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary bg-[#F7F7F7] dark:bg-[#0C1017]'}`}
              >Phone number
            </label>
          </div>
          {errors.PhoneNumber && <h1 className='text-red-500 text-xs'>{`${errors.PhoneNumber.message}`}</h1>}
          </div>
          <div className="password_inp-1 mb-6">
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
              className={`${password? `peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full peer-focus:w-20 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary`: 'pointer-events-none absolute w-full peer-focus:w-20 peer-focus:bg-transparent peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8]`} left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'}`}
              >Password
            </label>
            <span onClick={() => setVisible(!visible)} className="showPass absolute right-4 top-4 opacity-70">
            {visible ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}
            </span>
          </div>
          {errors.Password && <h1 className='text-red-500 text-xs'>{`${errors.Password.message}`}</h1>}
          </div>
          <div className="password_inp-2 mb-6">
           <div className="password__input--2 relative border rounded">
            <input
              {...register("NPassword")}
              maxLength={8}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              type = {visible? "text" : "password"}
              className="peer block min-h-[auto] w-full  select-none rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="pass"
              placeholder="Conform password" />
            <label
              htmlFor="pass"
              className={`${ConfirmPassword? `peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full peer-focus:w-36 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:text-primary  dark:text-neutral-200 dark:peer-focus:text-primary`: 'pointer-events-none absolute w-full peer-focus:w-36 peer-focus:bg-transparent peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:text-primary  dark:text-neutral-200 dark:peer-focus:text-primary'}`}
              >Conform password
            </label>
            <span onClick={() => setVisible(!visible)} className="showPass absolute right-4 top-4 opacity-70">
              {visible ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}
              </span>
          </div>
          {errors.NPassword && <h1 className='text-red-500 text-xs'>{`${errors.NPassword.message}`}</h1>}
          {password == ConfirmPassword? 
            null: (
              <i className='text-sm text-danger-600'>Your Password is not same!</i>
            )}
          </div>
        </div>
        <div className="signup__form--texts flex justify-between px-3 md:px-0">
          <div className="remember-checkbox flex items-center gap-1 md:gap-2">
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="cursor-pointer text-neutral-700 text-sm md:text-base dark:text-neutral-200">Remember me</label>
          </div>
        </div>
        <div className="signup__form--footer flex flex-col gap-3 mt-5">
        <button
         onClick={handleSubmit(Sign_Up)}
         type='button' 
         className="sigin__form--btn btn w-40 md:w-1/2 self-center select-none uppercase btn-accent hover:bg-theme-100 hover:drop-shadow-lg border-none cursor-pointer" data-te-ripple-init
         data-te-ripple-color="light"
         data-te-submit-btn-ref>
            Sign Up
         </button>
          <h1 className="Or text-black dark:text-white text-center font-rubik md:text-lg font-semibold">OR</h1>
          <div className="signup__form--sm-btns flex gap-7 justify-center items-center">
             <button
             onClick={GoogleAuth}
              className="sigin__form--btn mask mask-squircle uppercase shadow-xl border-none hover:drop-shadow-2x cursor-pointer">
             <img className='w-5 h-5 md:w-9 md:h-9 ' src="https://www.freepnglogos.com/uploads/google-favicon-logo-20.png" alt='google_logo'/>
             </button>
             <button className="sigin__form--btn mask mask-squircle uppercase text-black shadow-xl border-none hover:drop-shadow-2x cursor-pointer">
              <img className='w-4 h-4 md:w-7 md:h-7 drop-shadow-md' src="https://www.freepnglogos.com/uploads/facebook-logo-17.jpg" alt="fb_logo" />
             </button>
             <button
              onClick={GithubAuth}
              className="sigin__form--btn mask mask-squircle uppercase text-black shadow-xl border-none hover:drop-shadow-2x cursor-pointer">
              <img className='w-4 h-4 md:w-8 md:h-8 drop-shadow-md' src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png" alt="gh_logo" />
             </button>
          </div>
          <span className='text-sm text-neutral-800 dark:text-white'>Alredy have an account?
          <Link to={'/signin'}>
          <span className='text-blue-600 cursor-pointer'> Sign in</span>
          </Link>
          .</span>
        </div>
      </div>


    </div>
    </section>
  )
}

export default SignUp
