import React, { useEffect, useState } from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import { FaX } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { RootState } from '../../../Reducer/store'
import { Database } from '../../../Types/supaTypes'
import { PostgrestResponse } from '@supabase/supabase-js'
import supabase from '../../../Config/supabaseClient'

const AccountPrefrences:React.FC = () => {
  const [userData, setUserData] = useState<Database['public']['Tables']['users']['Row'][] | null>(null)
  const {register, handleSubmit,watch, formState: { errors }} = useForm()
  const [newEmail, setNewEmail] = useState<string>()
  const [newPassword, setNewPassword] = useState<string>()
  const [confirmPassword, setConfirmPassword] = useState<string>()
  const navigate = useNavigate()
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const uuid = useSelector((state: RootState) => state.authUser.userDetails?.uuid); // take the uuid from user details

  useEffect(() => {
    async function fetchRecords() {
        try {
          const {data, error}: PostgrestResponse<Database['public']['Tables']['users']['Row'][] >  = await supabase // Fetching auth user's row
           .from("users")
           .select()
           .eq('uuid',uuid)

           if (error) {
           console.error('Error fetching data:', error);
         } else {
           setUserData(data.flat())
         }
           } catch (error) {
             console.error('An unexpected error occurred:', error);
           }
        } 
       fetchRecords();
    }, [authUser, uuid]); // Ensure this effect runs when `supabase` changes
 
  const updateProfile : SubmitHandler<any> = async(data)=>{
    console.log(watch("newEmail"))
     try {
      const { data, error } = await supabase.auth.updateUser({email: newEmail, password: confirmPassword}) 
      console.log("User data updated!")
       if (error) {
        alert(error.message)
       console.error('Error updating email or password:', error);
     } else {
      const {error} = await supabase // Fetching auth user's row
      .from("users")
      .update({
       email: newEmail,
       password: confirmPassword,
     })
      .eq('uuid',uuid)

     }
       } catch (error) {
         console.error('An unexpected error occurred:', error);
       }
    
  }
  return (
    <form >
      <div className="Acc-Preference__User flex flex-col justify-start items-center gap-2 h-screen">
        <h1 className='font-poppins text-center font-bold text-2xl md:text-5xl text-[#010103] mt-12'>Account Preferences</h1>
       <div className="Acc_pref-ui flex flex-col md:flex-row md:gap-24 md:mt-16">
       <img
            src={require('../../../Media/signUp.png')}
            className="w-96 hidden md:block "
            alt="Sample image" />
      {userData?.map(user =>(
        <div className="Profile__contact_details flex flex-col items-center mt-10 md:mt-auto gap-2 md:gap-6">
        <div className="Edit__email flex flex-col items-center ">
        <h1 className='text-xl md:text-3xl font-rubik'> Your Email</h1>
        <div className={`flex border rounded py-2 ${errors.newEmail? `border-red-500`: 'border-cyan-500'}`}>
          <input defaultValue={`${user.email}`}
          {...register("newEmail", {required: true})}  
           onChange={(e)=>(setNewEmail(e.target.value))}
           className="appearance-none bg-transparent md:text-xl text-center border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none font-lacto font-semibold" type="email" placeholder="jeromejustin01@gmail.com" aria-label="Email address"/>
          <button className="flex-shrink- border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
         </div>
         {errors.newEmail && <h1 className='text-red-500 text-xs'>This field is required</h1>}
        </div>
        <div className="Edit__pass flex flex-col items-center ">
        <h1 className='text-xl md:text-3xl font-rubik'>Set A New Password</h1>
        <div className={`flex border rounded py-2 ${errors.newPass ? `border-red-500`: `border-cyan-500`}`}>
          <input 
          {...register("newPass", {required: true})} 
           onChange={(e)=>(setNewPassword(e.target.value))}
           className="appearance-none bg-transparent md:text-xl text-center border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none font-lacto font-semibold" type="text" placeholder="******" aria-label="Password"/>
          <button className="flex-shrink- border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
         </div>
         {errors.newPass && <h1 className='text-red-500 text-xs'>This password field is required</h1>}
        </div>
        <div className="Edit__email flex flex-col items-center ">
        <h1 className='text-xl md:text-3xl font-rubik'>Confirm New Password</h1>
        <div className={`flex border rounded py-2 ${ errors.confirmPass? `border-red-500`: ` border-cyan-500`}`}>
          <input
            {...register("confirmPass", {required: true})} 
            onChange={(e)=>(setConfirmPassword(e.target.value))}
           className="appearance-none bg-transparent md:text-xl text-center border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none font-lacto font-semibold" type="text" placeholder="******" aria-label="Password"/>
          <button className="flex-shrink- border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
        </div>
         {errors.confirmPass && <h1 className='text-red-500 text-xs'>This confirm password field is required</h1>}
         {newPassword != confirmPassword? <h1 className='text-red-700'>passwords are not matching!</h1> : null}
         </div>
      </div>
      ))}
      </div>
      <button onClick={handleSubmit(updateProfile)} className="btn bg-theme-100 hover:bg-theme-200 font-poppins mt-7">Save Profile</button>
    
      <div className="Boxes flex gap-5 md:gap-12 mt-7 md:mt-16 flex-col md:flex-row ">
        <div onClick={()=>navigate(-1)} className="Ac__Preferences border-2 border-green-600 rounded-lg w-96 md:w-56 px-2 md:px-0 flex justify-center items-center cursor-pointer hover:drop-shadow-xl hover:shadow-green-700">
        <img className='w-5 h-5 md:w-7 md:h-7' src={require('../../../Media/Icons/settingsIcon.png')} alt="Account Preferences" />
        <h1 className="font-lato font-semibold py-3 px-2 text-green-700 hover:text-green-900">Go to back</h1>
        </div>
      </div>
      </div>
    </form>
  )
}

export default AccountPrefrences
