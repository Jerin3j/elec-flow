import React, { useEffect, useState } from 'react'
import Header from './User/User_Home/Header'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { Database } from '../Types/supaTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../Reducer/store'
import supabase from '../Config/supabaseClient'
import { PostgrestResponse } from '@supabase/supabase-js'
import { useDispatch } from 'react-redux'
import { setIds } from '../Reducer/Slices/chatSlice'

const Messages = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [messagesData, setMessagesData] = useState<Database['public']['Tables']['messages']['Row'][]>()
  const uuid = useSelector((state: RootState) => state.authUser.userDetails?.uuid); // take the uuid from user details
  const metadata = useSelector((state: RootState) => state.authUser.userDetails?.metadata); // take the uuid from user details
  console.log("MetaaData", metadata)
  useEffect(()=>{
    const fetchMessages = async() => {
      const messageResponseFrom: PostgrestResponse<Database['public']['Tables']['messages']['Row'][]> = await supabase
      .from('messages')
      .select()
      .eq('from', uuid).eq('is_chat', true)
      if(messageResponseFrom.error){
        console.log("Got error on fetching From_messages", messageResponseFrom.error)
      }else{
        console.log("Successfully get From_messages", messageResponseFrom.data)
      }
      const messageResponseTo: PostgrestResponse<Database['public']['Tables']['messages']['Row'][]> = await supabase
      .from('messages')
      .select()
      .eq('to', uuid).eq('is_chat', true)
      if(messageResponseTo.error){
        console.log("Got error on fetching To_messages", messageResponseTo.error)
      }else{
        console.log("Successfully get To_messages", messageResponseTo.data)
      }
      if(metadata){
        setMessagesData(messageResponseTo.data?.flat())
      }else{
        setMessagesData(messageResponseFrom.data?.flat())

      }
    }
    fetchMessages()
  },[])
  const reDirectChat = async(fromId: string | null)=>{
      const toId = uuid
      await dispatch(setIds({fromId, toId}))
      navigate('/chat')

  }
  return (
    <div className='Message'>
      <div className="Message__Mobile flex flex-col h-screen px-4 sm:px-1 lg:px-32 md:hidden">
      <div className="Message__Mobile--header py-1 flex justify-between border-b-2 ">
          <h1 className="text-3xl font-outfit">Messages</h1>
          <div className="Header__Comps flex gap-4 items-center">
          <Link to={'/your-profile'}>
           <CgProfile size={30} className='cursor-pointer'/>
          </Link>
          </div>
        </div>
        {messagesData?
          <div className="Message__Mobile--body flex flex-col gap-3 py-2">
          {messagesData.map((data, index)=>(
            <div key={index}
            onClick={()=>reDirectChat(data.from)}
             className="Message_box flex w-full py-2 px-1 border-b">
           <img className='serviceProvider-profile-pic rounded-full w-12 h-12 drop-shadow-xl' src={metadata? data.user_profile : data.sp_profile} alt={`portrait`}/>
           <div className="Message_box--text_items flex flex-col px-2 w-full">
           <div className="profile-pic__time flex justify-between">
            <h1 className="text-xl font-outfit">{metadata? data.username : data.spname}</h1>
            <h1 className='text- font-poppins text-neutral-400'>3 : 50 pm</h1>
           </div>
           <div className="message-text__online_stat flex justify-between">
            <h1 className="text-sm font-poppins w-1/4 truncate mt-1 ml-1 text-neutral-400">Hello, that's fine. I'll come today</h1>
            <div className="rounded-full bg-green-600 h-2 w-2 mr-4 mt-2"></div>
           </div>
           </div>
          </div>))}
          </div>:
          <div className="no-message-text">
           <h1>No messages</h1>
          </div>
        }
      </div>

        {/* Desktop View */}
      <div className="Message__Desktop  flex-col h-screen px-4 sm:px-1 lg:px-32 hidden md:flex">
        <div className="Message__Desktop--header py-3 flex justify-between border-b-2 ">
          <h1 className="text-6xl font-outfit">Messages</h1>
          <div className="Header__Comps flex gap-4 items-center">
          <Link to={'/your-profile'}>
           <CgProfile size={37} className='cursor-pointer'/>
          </Link>
          </div>
        </div>
        {messagesData?
          <div className="Message__Desktop--body flex flex-col gap-3 py-2">
          {messagesData.map((data, index)=>(
            <div key={index}
            onClick={()=>reDirectChat(data.from)}
             className="Message_box flex w-full py-2 px-1 border-b">
            <img className='serviceProvider-profile-pic rounded-full w-20 h-20  border-2 drop-shadow-xl' src={metadata? data.user_profile : data.sp_profile} alt={`portrait`}/>
           <div className="Message_box--text_items flex flex-auto flex-col px-4 w-72">
           <div className="profile-pic__time flex justify-between">
            <h1 className="text-3xl font-outfit">{metadata? data.username : data.spname}</h1>
            <h1 className='text-lg font-poppins text-neutral-400'>3 : 50 pm</h1>
           </div>
           <div className="message-text__online_stat flex justify-between">
            <h1 className="text-xl font-poppins w-1/4 truncate mt-1 ml-1 text-neutral-400">Hello, that's fine. I'll come today kdjwedewhjwhdwhfhfewhfehwiwhieiwehifhjhkhkkkkhkhkhkhkhkhkhkhcdsckakhffhwifiahfkfhjerinjermsjrofosjvndknvkfnkaknkekaknfena</h1>
            <div className="rounded-full bg-green-600 h-2 w-2 mr-4 mt-2"></div>
           </div>
           </div>
          </div>))}
          </div>:
          <div className="no-message-text">
           <h1 className='text-center'>No messages</h1>
          </div>
        }
        </div>
      </div>
  )
}

export default Messages
