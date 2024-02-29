import React, { useEffect, useState } from 'react'
import { BiArrowToRight, BiSolidArrowToRight } from 'react-icons/bi'
import { ImArrowRight } from 'react-icons/im'
import SP_SideNav from './SP_SideNav'
import supabase from '../../../Config/supabaseClient'
import { Database } from '../../../Types/supaTypes'
import { PostgrestResponse } from '@supabase/supabase-js'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Reducer/store'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setIds } from '../../../Reducer/Slices/chatSlice'

const SP_Requests:React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [check, setCheck] = useState<boolean>(false)
  const [chatDetails, setChatDetails] = useState<any>()
  const [requests, getRequests] = useState<Database['public']['Tables']['messages']['Row'][]|null >()
  const [userData, setUserData] = useState<any >([])
  const uuid = useSelector((state: RootState) => state.authUser.userDetails?.uuid); // take the uuid from user details
  console.log("uuid fetching at sp_requests",uuid)
  console.log("check at sp_requests",check)

  const lsKey : any = Object.keys(localStorage)
  const lsValue :any= JSON.parse(localStorage.getItem(lsKey) || "")
    useEffect(()=>{
      const fetchData=async()=>{
        const {data, error} = await supabase
        .from('messages')
        .select()
        .eq('to', lsValue.user.id)
  
        if(error){
          console.log("Got an error in getRequests", error)
        }else{
          getRequests(data.flat())
          console.log("get requests done", data)
        }
        
        // get user details based on the requests `to uuid`
    //   const usersReponse: PostgrestResponse<Database['public']['Tables']['users']['Row'][] > = await supabase
    //     .from("users")
    //     .select()
    //     .eq('uuid', '5aca0478-72d8-498f-885b-29082a1ebf4a')
  
    //     if(usersReponse.error){
    //       console.log("Got an error in fetch users", usersReponse.error)
    //     }else{
    //       setUserData(usersReponse.data.flat())
    //       console.log("sommm", usersReponse.data);
       
    // }
  }
    fetchData()
   
  },[uuid])
  const chatTrue = async(fromId: string | null)=>{
    console.log("From id iss passing", fromId)
   try {
    const {data, error} = await supabase
    .from('messages')
    .update({is_chat: true})
    .eq('from', fromId)
    if(error){
      console.log("Error in updating chat boolean", error.message)
    }else{
      console.log("Successfully boolean true",data)
      const toId = uuid
      setCheck(true);
      await dispatch(setIds({fromId, toId}))
      navigate('/chat');
    }
   } catch (error) {
    console.log("unexpected error on request bool",error);
    
   }
  }
  const reDirectChat = async(isChat : boolean, fromId: string | null)=>{
    if(isChat){
      const toId = uuid
      await dispatch(setIds({fromId, toId}))
      navigate('/chat')

    }
  }

  console.log("some dataas", userData)
  return (
    <section className='Requests'>
   <div className="Requests_section h-1/2 flex flex-col">
      <h1 className="text-bold font-poppins text-2xl md:text-5xl font-bold text-center underline underline-offset-4">Requests</h1>
       <div className="User-Requests flex flex-col mt-6 md:mt-12 gap-3">
        {
          requests?.map(((reqs, id)=>(
         <div key={id} 
         onClick={()=>reDirectChat(reqs.is_chat,reqs.from)} 
         className="user-request relative flex justify-around h-24 md:h-20 rounded-lg md:mx-4 bg-blue-50 hover:bg-blue-100 cursor-pointer">
          <span className="LeftArrow absolute left-0 mt-6 bg-transparent">
            <ImArrowRight className='h-5 w-5 md:h-9 md:w-9 bg-transparent'/>
          </span>
          <div className="request__user__items flex flex-col md:flex-row items-start  md:items-stretch md:justify-center md:gap-40 bg-transparent">
            <div className="user-profile flex items-center gap-3 bg-transparent mt-4 md:mt-0">
            <img className='serviceProvider-profile rounded-full h-10 w-10 md:h-16 md:w-16 drop-shadow-xl' src="https://imgs.search.brave.com/BN_fhov3dztUsUTDPT0l446WqsYOYmdxKtg9hgpa45M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlZmFtb3VzcGVv/cGxlLmNvbS9wcm9m/aWxlcy90aHVtYnMv/amFjay1kb3JzZXkt/NjQ1MC0xLmpwZw" alt="" />
            <h1 className="text-xl md:text-3xl font-rubik capitalize bg-transparent">{reqs.username}</h1>
          </div>

          <div className="mobile__text_time flex bg-transparent items-center md:gap-40">
           <div className="user-request_text flex md:gap-2 items-center bg-transparent">
             <h1 className="text-bold font-rubik text-xl md:text-2xl bg-transparent hidden md:block">Request Text :</h1>
             <span className="connect-text_from-user text-neutral-400 font-lato md:text-xl bg-transparent ml-2 md:ml-auto truncate md:underline underline-offset-4">Hi, I want you to accept my connect!</span>
           </div>
          <h1 className="request-time font-rubik text-xs md:text-2xl bg-transparent opacity-0 lg:opacity-100">3:05pm</h1>
        {
          reqs.is_chat? ( 
          <input checked type='checkbox' className='checkbox checkbox-sm md:checkbox-md checkbox-accent absolute top-6 right-4 lg:sticky'/>
          ): ( //if clicks on checkbox it will disabled and grant the connection
          <input type='checkbox' onClick={e=>{chatTrue(reqs.from)}} className='checkbox checkbox-sm md:checkbox-md checkbox-accent absolute top-6 right-4 lg:sticky'/>
          )
        } 
        </div>
        </div>
      </div>
    )))}
       </div> 
      </div>
      <div className='underline underline-offset-4 bg-black'></div> 
    </section>
  )
}
  //  After clicking on User request redirect to /message page. then click btn to continue chat

export default SP_Requests
