import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { BiSolidPhoneCall } from 'react-icons/bi'
import { BsCalculator, BsPencil, BsPhoneFill, BsSend, BsSendFill } from 'react-icons/bs'
import MsgObj, { Database } from '../Types/supaTypes'
import { RootState } from '../Reducer/store'
import { useSelector } from 'react-redux'
import { PostgrestResponse } from '@supabase/supabase-js'
import supabase from '../Config/supabaseClient'
import { User } from '../Reducer/Slices/userSlice'
import { createClient } from '@supabase/supabase-js'
import userEvent from '@testing-library/user-event'
import { subscribe } from 'diagnostics_channel'
import BarLoader from './BarLoader'
import { toast } from 'react-toastify'

interface MessageObj{
  text : string | null,
  timestamp: string | null
 }
const Chat = () => {
  const from_id = useSelector((state: RootState) => state.chatUsers.chatDetails?.fromId)
  const to_id = useSelector((state: RootState) => state.chatUsers.chatDetails?.toId)
  const uuid = useSelector((state: RootState)=> state.authUser.userDetails?.uuid)
  const [message, setMessage] = useState<MessageObj>()
  const [fromUserdata, setFromUserdata] = useState<Database['public']['Tables']['users']['Row'][] | null>() // user data
  const [toUserdata, setToUserdata] = useState<Database['public']['Tables']['service-providers']['Row'][] |  null>() //service provder data
  let [existingMessage, setExistingMessage] = useState<any>()
  const [receivedMessage, setReceivedMessage] = useState<Database['public']['Tables']['messages']['Row'][] | null>()
  const [dbmessage, setDbMessage] = useState<MsgObj[] | any[]>()
  const [messageId, setMessageId] = useState<string>()
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const inpRef = useRef<HTMLInputElement>(null)
  
  console.log("uuidd", uuid);
  console.group('uuids')
  console.log("from-uuid",from_id)
  console.log("to-uuid",to_id) 
  console.groupEnd()
  let metadata = useSelector((state:RootState) => state.authUser.userDetails?.metadata);
  console.log("Message..", message)
  console.log("Db message..", dbmessage)
  console.log("Sys time: ", Date.now().toString())
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
      .eq('uuid',to_id)
      if(ToUserResponse.error){
        console.log("error in fetching providers in chat",ToUserResponse.error)
      }else{
        setToUserdata(ToUserResponse.data.flat())
      }

      const ChatHistory :PostgrestResponse<any> = await supabase
      .from('messages')
      .select(' message_id, message')
      .eq('from',from_id).eq('to',to_id)

      if(ChatHistory.data){
        console.log("message id of ur chat : ", ChatHistory.data[0].message_id)
        setMessageId(ChatHistory.data[0].message_id)
        setDbMessage(ChatHistory.data?.[0]?.message)
        console.log("Chat Historii: ",ChatHistory.data.flat().map((m)=>m.message))
        console.log("Chat Histor22 ",ChatHistory.data?.[0]?.message)
        

      }
    }
    fetchUsers()
  },[from_id, to_id])

  const handleMsgChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
      setMessage({...message, text: e.target.value, timestamp:''})
  }
const handleSend = async () =>{
  try{
    let updatedMsgs= dbmessage || [];

    if (metadata) {
      updatedMsgs = [...(dbmessage || []), { sp_text: message?.text, timestamp: new Date().toLocaleTimeString().toLocaleLowerCase() }]
    } else {
      updatedMsgs = [...(dbmessage || []), { usr_text: message?.text, timestamp: new Date().toLocaleTimeString().toLocaleLowerCase() }]
      console.log("Updated array", updatedMsgs)
    }

    const { data, error } = await supabase
      .from('messages')
      .upsert([{ message: updatedMsgs, message_id: messageId}], { onConflict: 'message_id' });

    if (error) {
      console.log("Error found during upsert operation: ", error.message);
    } else {
      toast("Message sent successfully",{theme:'colored'});
      setDbMessage(updatedMsgs);
      if (inpRef.current) {
        inpRef.current.value = ''; // Clear the input field
      }
    }
  }
   catch (error) {
    console.log("Caught error in handleSend: ", error);
  }
 }

useEffect(() => {
  const handleMessageChanges = (payload :any) => {
    console.log("Real-time message update:", payload);
    // Handle the real-time updates here
    setDbMessage([ payload.new]) // set payload message
  };
  const RealTimeMessage = async()=>{
  const { data, error } = await supabase
    .from('messages')
    .select('message')
  const subscription = supabase
  .channel('messages')
  .on('postgres_changes', { event: 'INSERT', schema: 'public',table:'messages' }, payload=> {handleMessageChanges(payload)})
  .subscribe() 
  console.log("Subscription", subscription)
  return () => {
    // Unsubscribe when component unmounts
    subscription.unsubscribe();
    
  };
  }
  RealTimeMessage()
}, []);
  return (
    <>
    {
      isLoad? <BarLoader/>
      :
    metadata?(
      //chat with user
      fromUserdata?.map(((user)=>(
      <div className="Message flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen px-4 ">
      <div className="Left-Message flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
         <div className="relative flex items-center space-x-4">
            <div className="relative profile__picture">
            <img src={user.profilePicUrl? user.profilePicUrl : `https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg`} alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"/>
            </div>
            <div className="flex flex-col leading-tight">
               <div className="text-2xl mt-1 flex items-center">
                  <span className="text-gray-700 dark:text-white mr-3 capitalize">{user.first_name+" "+user.last_name}</span>
               </div>
               {/* <span className="text-lg text-gray-600">Plumber</span> */}
            </div>
         </div>
         <div className="call__option">
          <a href={`tel:+${user.phonenumber}`}>
          <svg className='fill-black dark:fill-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" height="35" width="35" id="Phone--Streamline-Core"><g id="Phone--Streamline-Core"><path id="Vector" fill="" d="M5.17 13.24a3.317 3.317 0 0 1 -4.161 -0.457l-0.468 -0.458a1.123 1.123 0 0 1 0 -1.57l1.986 -1.966a1.113 1.113 0 0 1 1.56 0 1.123 1.123 0 0 0 1.571 0l3.12 -3.12a1.103 1.103 0 0 0 0 -1.571 1.113 1.113 0 0 1 0 -1.56L10.756 0.56a1.123 1.123 0 0 1 1.57 0l0.458 0.468a3.318 3.318 0 0 1 0.458 4.16A30.103 30.103 0 0 1 5.17 13.24Z" stroke-width="1"></path></g></svg>
          </a>
         </div>
      </div>
      <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
           
      { dbmessage?
           dbmessage.map((msg)=>{
              if(msg?.sp_text || msg?.usr_text){
                return(
                  <>
           {msg?.usr_text?(
            <div className="chat chat-start">
             <div className="chat-image avatar">
              <div className="w-10 rounded-full mb-5">
                <img alt="Tailwind CSS chat bubble component" src={user.profilePicUrl? user.profilePicUrl : "https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg"} />
              </div>
            </div>
             <div className="chat-header">
             <div className="chat-bubble max-w-full">{msg?.usr_text}</div>
               <time className="text-xs opacity-50">{msg?.timestamp}</time>
             </div>
            {/* <div className="chat-footer opacity-50">Delivered </div> */}
          </div>
           ):null}
          {msg?.sp_text?(
            <div className="chat chat-end flex-1 items-center">
            <div className="chat-image avatar bg-transparent">
              <div className="w-10 rounded-full mb-5">
                <img alt="profile-pic" className='self-center' src='https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg' />
              </div>
            </div>
            
             <div className="chat-end opacity-50 bg-transparent">
             <div  className="chat-bubble max-w-full">{msg?.sp_text}</div>
             <time className='text-sm text-center'>{msg?.timestamp?.substring(0, 5)}</time>
            </div>
          </div>
          ): null}
          </>
            )}})
            :null
          }
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
         <div className="relative flex">
           <div className="input_message__pencil__send flex bg-gray-200 rounded-lg w-full items-center">
           <BsPencil size={20} className='bg-transparent ml-4 fill-[#0c0c0c]'/>
            <input
             onChange={(e)=>handleMsgChange(e)}
             onKeyDown={(e)=>{ if(e.key === 'Enter') handleSend()}}
             ref={inpRef}
             type="text" 
             placeholder={`Write your message to ${user.first_name+' '+user.last_name}!`}
             className="w-full rounded-md focus:outline-none py-3 focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2  bg-gray-200"/>
           <BsSend 
            onClick={handleSend}
            size={20} 
            className='bg-transparent z-10 mr-2 md:mr-4 fill-[#0c0c0c]'/>
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
         <img src={sp.profilePicUrl? sp.profilePicUrl : "https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg"} alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"/>
         </div>
         <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
               <span className="text-gray-700 dark:text-white mr-3">{sp.first_name+" "+sp.last_name}</span>
            </div>
            <span className="text-lg text-gray-600 dark:text-300">{sp.job}</span>
         </div>
      </div>
      <div className="call__option">
        <a href={`tel:+${sp.phonenumber}`}>
        <BiSolidPhoneCall size={35}/>
        </a>
      </div>
   </div>
   <div id="messages" className="flex flex-col space-y-4 p-3 mt-2 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
    {/* left side messages */}
           { dbmessage?
           dbmessage
            .map((msg, index)=>{
              if(msg?.sp_text || msg?.usr_text){
                return(
                  <>
           {msg?.sp_text?(
            <div className="chat chat-start">
             <div className="chat-image avatar">
              <div className="w-10 rounded-full mb-5">
                <img alt="Tailwind CSS chat bubble component" src={sp.profilePicUrl? sp.profilePicUrl : "https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg"} />
              </div>
            </div>
             <div className="chat-header">
             <div className="chat-bubble max-w-full">{msg?.sp_text}</div>
               <time className="text-xs opacity-50">{msg?.timestamp}</time>
             </div>
          </div>
           ):null}
          {msg?.usr_text?(
            <div className="chat chat-end flex-1 items-center">
            <div className="chat-image avatar bg-transparent">
              <div className="w-10 rounded-full mb-5">
                <img alt="profile-pic" className='self-center' src='https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg' />
              </div>
            </div>
            
             <div className="chat-end opacity-50 bg-transparent">
             <div  className="chat-bubble max-w-full">{msg?.usr_text}</div>
             <time className='text-sm text-center'>{msg?.timestamp?.substring(0, 5)}</time>
            </div>
          </div>
          ): null}
          </>
            )}})
            :null
          }
   </div>
   <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex">
        <div className="input_message__pencil__send flex bg-gray-200 rounded-lg w-full items-center">
        <BsPencil size={20} className='bg-transparent ml-4'/>
           <input
             onChange={(e)=>handleMsgChange(e)}
             onKeyDown={(e)=>{if(e.key==='Enter') handleSend()}}
             type="text" 
             placeholder="Write your message!" 
             className="w-full rounded-md focus:outline-none py-3 focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2  bg-gray-200"/>
           <BsSend 
            onClick={handleSend}
            size={20} 
            className='bg-transparent z-10 mr-2 md:mr-4  fill-[#0c0c0c] '/>
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
