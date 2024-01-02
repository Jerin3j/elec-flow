import React, { useEffect, useState } from 'react'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import supabase from '../../Config/supabaseClient'
import { useLocation } from 'react-router';


const ResetPassword : React.FC= () => {
  const location = useLocation();
  const [password, setPassword] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)

   const reset = async () =>{
    await supabase.auth.updateUser({ password: password })

}
  return (
    <div className="resetPassword">
    <div className="resetPassword__input relative mb-6 border rounded">
    <input
      onChange={(e)=>setPassword(e.target.value)}
      type = {visible? "text" : "password"} unselectable='off' 
      className="peer block min-h-[auto] w-full select-none rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      id="pass"
      placeholder="Enter Password" />
    <label
      htmlFor="pass"
      className="peer-valid:-translate-y-[1.15rem] peer-valid:scale-[0.8] pointer-events-none absolute w-full bg-transparent peer-focus:w-20 peer-focus:bg-transparent left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
      >Password
    </label>
    <span onClick={() => setVisible(!visible)} className="showPass absolute right-4 top-4 opacity-70">
    {visible ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}
    </span>
  </div>
  <button onClick={reset} className='btn-square'>Reset</button>
  </div>
  )
}

export default ResetPassword
