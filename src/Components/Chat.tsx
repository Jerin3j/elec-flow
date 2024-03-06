import React, { useEffect, useState } from 'react'
import { BiSolidPhoneCall } from 'react-icons/bi'
import { BsCalculator, BsPencil, BsPhoneFill, BsSend, BsSendFill } from 'react-icons/bs'
import { Database } from '../Types/supaTypes'
import { RootState } from '../Reducer/store'
import { useSelector } from 'react-redux'
import { PostgrestResponse } from '@supabase/supabase-js'
import supabase from '../Config/supabaseClient'
import { User } from '../Reducer/Slices/userSlice'
import { createClient } from '@supabase/supabase-js'
import userEvent from '@testing-library/user-event'

const Chat = () => {
   
  const from_id = useSelector((state: RootState) => state.chatUsers.chatDetails?.fromId)
  const to_id = useSelector((state: RootState) => state.chatUsers.chatDetails?.toId)
  const authUser = useSelector((state:RootState) => state.authUser.userDetails);
  const uuid : string = authUser && Array.isArray(authUser) && authUser.length > 0 ? authUser[0].id : null
  const [message, setMessage] = useState<string>()
  const [fromUserdata, setFromUserdata] = useState<Database['public']['Tables']['users']['Row'][] | null>() // user data
  const [toUserdata, setToUserdata] = useState<Database['public']['Tables']['service-providers']['Row'][] |  null>() //service provder data
  const [receivedMessage, setReceivedMessage] = useState<Database['public']['Tables']['messages']['Row'][] | null>()
  const [dbmessage, setDbMessage] = useState<Database['public']['Tables']['messages']['Row'][] | null>(null)
  console.log("uuidd", uuid);
  let metaData = useSelector((state:RootState) => state.authUser.userDetails?.metadata);
  
  useEffect(()=>{
    const fetchUsers=async()=>{
      const FromUserResponse:PostgrestResponse<Database['public']['Tables']['users']['Row'][] > = await supabase
      .from('users')
      .select()
      .eq('uuid',from_id)
      if(FromUserResponse.error){
        console.log("error in fetching users in chat",FromUserResponse.error)
      }else{
        setFromUserdata(FromUserResponse.data.flat())
      }

      const ToUserResponse :PostgrestResponse<Database['public']['Tables']['service-providers']['Row'][] > = await supabase
      .from('service-providers')
      .select()
      .eq('uuid','35cd6b02-9384-473f-b19a-2a5206950ce4')
      if(ToUserResponse.error){
        console.log("error in fetching users in chat",ToUserResponse.error)
      }else{
        setToUserdata(ToUserResponse.data.flat())
      }
    }
    fetchUsers()
  },[])

const handleSend = async () =>{
  const { data, error } = await supabase
    .from('messages')
    // .eq(message_id, "ran")
    .insert([{ from: uuid, to: "other-user-id", message, message_id: "ran", created_at: new Date().toTimeString() }]);
 if(error){
  console.log("error found : ", error.message); 
 }else{
  console.log("message send");
  }
}

useEffect(() => {
  const getMessage = async() =>{
    const { data, error } = await supabase
    .from('messages')
    .select()
    .eq(uuid, "other-user-id")

    if(error){
      console.log("error at receiving: ", error); 
    }else{
      setReceivedMessage(data.flat())
      console.log("message received", data);
    }
  }
  getMessage()
}, [])



useEffect(() => {
  const handleMessageChanges = (payload :any) => {
    console.log("Real-time message update:", payload);
    // Handle the real-time updates here
    setDbMessage((prevMessages) => (prevMessages ? [...prevMessages, payload.new] : [payload.new])) // set payload message
  };

  const subscription = supabase
  .channel('messages')
  .on('postgres_changes', { event: '*', schema: 'public' }, handleMessageChanges)
  .subscribe()
  return () => {
    // Unsubscribe when component unmounts
    subscription.unsubscribe();
    
  };
}, [message]);
  return (
    <>
    {
    metaData?(
      //chat with user
      fromUserdata?.map(((user)=>(
      <div className="Message flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen px-4">
      <div className="Header flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
         <div className="relative flex items-center space-x-4">
            <div className="relative profile__picture">
               {/* <span className="true__online absolute text-green-500 right-0 bottom-0">
                  <svg width="20" height="20">
                     <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                  </svg>
               </span> */}
            <img src={user.profilePicUrl? user.profilePicUrl : `https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg`} alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"/>
            </div>
            <div className="flex flex-col leading-tight">
               <div className="text-2xl mt-1 flex items-center">
                  <span className="text-gray-700 mr-3 capitalize">{user.first_name+" "+user.last_name}</span>
               </div>
               {/* <span className="text-lg text-gray-600">Plumber</span> */}
            </div>
         </div>
         <div className="call__option">
           <BiSolidPhoneCall size={35}/>
         </div>
      </div>
      <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch bg-blue-800">
           
            <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">
              Delivered 
            </div>
          </div>
          
          {dbmessage? 
          dbmessage.map((data, id)=>(
          <div key={id} className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">{data.message}</div>
            <div className="chat-footer opacity-50">
              Seen at 12:46
            </div>
          </div>
          ))

          :null}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
         <div className="relative flex">
           <div className="input_message__pencil__send flex bg-gray-200 rounded-lg w-full items-center">
           <BsPencil size={20} className='bg-transparent ml-4'/>
            <input
             onChange={(e)=>setMessage(e.target.value)}
             type="text" 
             placeholder="Write your message!" 
             className="w-full rounded-md focus:outline-none py-3 focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2  bg-gray-200"/>
           <BsSend 
            onClick={handleSend}
            size={20} 
            className='bg-transparent z-10 mr-2 md:mr-4'/>
           </div>
             <div className="Bottom__attachments items-center inset-y-0 hidden sm:flex">
               <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
               </button>
               <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
               </button>
               
            </div>
         </div>
      </div>
   </div>
   )))
    ):
    (
      //chat with service provider
      toUserdata?.map(((sp)=>(
    <div className="Message flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen px-4">
   <div className="Header flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <div className="relative flex items-center space-x-4">
         <div className="relative profile__picture">
            {/* <span className="true__online absolute text-green-500 right-0 bottom-0">
               <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
               </svg>
            </span> */}
         <img src={sp.profilePicUrl? sp.profilePicUrl : "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"} alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"/>
         </div>
         <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
               <span className="text-gray-700 mr-3">{sp.first_name+" "+sp.last_name}</span>
            </div>
            <span className="text-lg text-gray-600">{sp.job}</span>
         </div>
      </div>
      <div className="call__option">
        <BiSolidPhoneCall size={35}/>
      </div>
   </div>
   <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch bg-red-800">
  
           <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">os ok?</div>
            <div className="chat-footer opacity-50">
              Delivered
            </div>
          </div>
      {dbmessage?
      dbmessage.map((data,id)=>(
       <div key={id} className="chat chat-end">
         <div className="chat-image avatar">
           <div className="w-10 rounded-full">
             <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
           </div>
         </div>
         
         <div className="chat-bubble">{data.message}</div>
         <div className="chat-footer opacity-50">
          <time>{data.created_at.substring(0, 5)}</time>
         </div>
       </div>
       )):
       null}
   </div>
   <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex">
        <div className="input_message__pencil__send flex bg-gray-200 rounded-lg w-full items-center">
        <BsPencil size={20} className='bg-transparent ml-4'/>
           <input
             onChange={(e)=>setMessage(e.target.value)}
             type="text" 
             placeholder="Write your message!" 
             className="w-full rounded-md focus:outline-none py-3 focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2  bg-gray-200"/>
           <BsSend 
            onClick={handleSend}
            size={20} 
            className='bg-transparent z-10 mr-2 md:mr-4'/>
        </div>
          <div className="Bottom__attachments items-center inset-y-0 hidden sm:flex">
            <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
               </svg>
            </button>
            <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
               </svg>
            </button>
            
         </div>
      </div>
   </div>
</div>
)))
    )}
    </>

  )
}

export default Chat
