import React, { useEffect, useState } from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import { FaX } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { RootState } from '../../../Reducer/store'
import { Database } from '../../../Types/supaTypes'
import { PostgrestResponse } from '@supabase/supabase-js'
import supabase from '../../../Config/supabaseClient'
import { Link } from 'react-router-dom'

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
        <div className="acc-preference__header flexjustify-center mt-8 relative w-full">
      <div className="breadcrumbs text-sm absolute left-5">
          <ul>
            <li>
              <Link to={'/'} className='inline-flex gap-2 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14" id="Home-3--Streamline-Core"><g id="Home-3--Streamline-Core"><path id="Vector" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M13.5 6.94c0.001 -0.1388 -0.027 -0.27628 -0.0821 -0.40368 -0.0551 -0.1274 -0.1361 -0.24194 -0.2379 -0.33632L7.00002 0.5 0.820023 6.2c-0.101775 0.09438 -0.182787 0.20892 -0.23788 0.33632S0.499084 6.8012 0.500023 6.94v5.56c0 0.2652 0.105357 0.5196 0.292893 0.7071s0.441894 0.2929 0.707104 0.2929H12.5c0.2652 0 0.5196 -0.1054 0.7071 -0.2929 0.1876 -0.1875 0.2929 -0.4419 0.2929 -0.7071V6.94Z" stroke-width="1"></path><path id="Vector_2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M7 13.5v-4" stroke-width="1"></path></g></svg>
                Home
              </Link>
            </li> 
            <li>
              <Link to={'/your-profile'} className='inline-flex gap-2 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14" id="Business-User-Curriculum--Streamline-Core"><g id="Business-User-Curriculum--Streamline-Core"><path id="Vector" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M4.09766 3.65061c0 0.63533 0.51503 1.15037 1.15036 1.15037 0.16062 0 0.31354 -0.03292 0.45241 -0.09237 0.41042 -0.17573 0.69796 -0.58328 0.69796 -1.058 0 -0.63533 -0.51504 -1.15037 -1.15037 -1.15037 -0.63533 0 -1.15036 0.51504 -1.15036 1.15037Z" stroke-width="1"></path><path id="Vector_2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M3.5 5.94004c0.18279 -0.34767 0.4397 -0.63502 0.74602 -0.83441 0.30632 -0.19939 0.65175 -0.30412 1.00309 -0.30412s0.69677 0.10473 1.00309 0.30412c0.30632 0.19939 0.56323 0.48674 0.74602 0.83441" stroke-width="1"></path><path id="Vector_3" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M12.5 12.5c0 0.2652 -0.1054 0.5196 -0.2929 0.7071s-0.4419 0.2929 -0.7071 0.2929h-9c-0.26522 0 -0.51957 -0.1054 -0.70711 -0.2929C1.60536 13.0196 1.5 12.7652 1.5 12.5v-11c0 -0.26522 0.10536 -0.51957 0.29289 -0.707107C1.98043 0.605357 2.23478 0.5 2.5 0.5H9L12.5 4v8.5Z" stroke-width="1"></path><path id="Vector 2531" stroke="#000000" stroke-linecap="round" d="M3.5 8.5h7" stroke-width="1"></path><path id="Vector 2532" stroke="#000000" stroke-linecap="round" d="M3.5 11h4" stroke-width="1"></path></g></svg>
                Profile
              </Link>
            </li> 
            <li>
              <Link to={''} onClick={()=>navigate(-1)} className="inline-flex gap-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="14" width="14" id="Wrench--Streamline-Core"><g id="Wrench--Streamline-Core"><path id="Union" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M13.4096 3.59643c-0.0193 -0.10479 -0.0604 -0.20435 -0.1207 -0.29222 -0.0603 -0.08786 -0.1384 -0.16206 -0.2293 -0.21778l-2 2c-0.0933 0.09678 -0.2051 0.17377 -0.3288 0.22635 -0.1237 0.05258 -0.2568 0.07968 -0.3912 0.07968 -0.1344 0 -0.2674 -0.0271 -0.39114 -0.07968 -0.12371 -0.05258 -0.23555 -0.12957 -0.32883 -0.22635l-0.76 -0.68c-0.18323 -0.18693 -0.28586 -0.43825 -0.28586 -0.7s0.10263 -0.51307 0.28586 -0.7l1.99997 -2c-0.0436 -0.102462 -0.1092 -0.194088 -0.1921 -0.268394 -0.083 -0.074305 -0.1812 -0.129475 -0.2879 -0.161605 -0.6978 -0.13916 -1.42068 -0.079592 -2.08631 0.171923 -0.66563 0.251515 -1.24727 0.684866 -1.6787 1.250726s-0.69531 1.24149 -0.7616 1.94996c-0.0621 0.66366 0.05153 1.33116 0.32834 1.9358L0.814623 11.2515C0.418454 11.6477 0.425024 12.292 0.82919 12.68l0.56078 0.5384c0.39114 0.3755 1.01029 0.3709 1.39578 -0.0105l5.42833 -5.36951c0.58712 0.24247 1.22666 0.3347 1.86042 0.26676 0.7007 -0.07512 1.3669 -0.34313 1.9244 -0.77423 0.5576 -0.43111 0.9846 -1.0084 1.2336 -1.6677 0.2491 -0.65929 0.3104 -1.37474 0.1771 -2.06679Z" stroke-width="1"></path></g></svg>
                Preferences
              </Link>
            </li>
          </ul>
        </div>
        <h1 className='font-poppins text-center font-bold text-2xl md:text-5xl mt-16  md:mt-auto text-[#010103] dark:text-[#F7F7F7]'>Account Preferences</h1>
        </div>
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
           className="appearance-none bg-transparent md:text-xl text-center border-none w-full text-gray-700 dark:text-[#F7F7F7] mr-3 py-1 px-2 leading-tight focus:outline-none font-lacto font-semibold" type="text" placeholder="******" aria-label="Password"/>
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
           className="appearance-none bg-transparent md:text-xl text-center border-none w-full text-gray-700 dark:text-[#F7F7F7] mr-3 py-1 px-2 leading-tight focus:outline-none font-lacto font-semibold" type="text" placeholder="******" aria-label="Password"/>
          <button className="flex-shrink- border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button"><FaX/></button>
        </div>
         {errors.confirmPass && <h1 className='text-red-500 text-xs'>This confirm password field is required</h1>}
         {newPassword != confirmPassword? <h1 className='text-red-700'>passwords are not matching!</h1> : null}
         </div>
      </div>
      ))}
      </div>
      <button onClick={handleSubmit(updateProfile)} className="btn bg-theme-100 hover:bg-theme-200 font-poppins mt-7 dark:text-[#F7F7F7]">Save Profile</button>
    
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
