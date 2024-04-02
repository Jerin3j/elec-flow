import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../Reducer/store';
import { PostgrestResponse } from '@supabase/supabase-js';
import { Database } from '../../../Types/supaTypes';
import supabase from '../../../Config/supabaseClient';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setIds } from '../../../Reducer/Slices/chatSlice';
import { toast, ToastContainer } from 'react-toastify';


const SP_SideProfile = ({checkuuid, uuid, refOne, onUserClick, onClose}:any) => {
  const [username, setUsername] = useState<string | null>()
  const [user_profile, setUserProfile] = useState<string | null>()
  const [serviceProviderData, setServiceProviderData] = useState<Database['public']['Tables']['service-providers']['Row'][] | null>(null)
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // get authUser details from redux-state
  const [check, setCheck] = useState<any>()
  const navigate = useNavigate()    
  const dispatch = useDispatch()
  const imgSrc: any = useRef()
  console.log("img src", imgSrc.current?.src);
  
  useEffect(() => {
    async function fetchRecords() {
          const {data, error}: PostgrestResponse<Database['public']['Tables']['service-providers']['Row'][]>  = await supabase // Fetching auth user's row
           .from("service-providers")
           .select()
           .eq('uuid', checkuuid)

           if (error) {
           console.error('Error fetching data:', error);
         } else {
           setServiceProviderData(data.flat())
         }
        } 
       fetchRecords();
    }, [authUser]); // Ensure this effect runs when `supabase` changes
    
    useEffect(()=>{
      const fetchUsers = async()=>{
        const {data, error}: PostgrestResponse<Database['public']['Tables']['users']['Row'][] >  = await supabase // Fetching auth user's row
           .from("users")
           .select()
           .eq('uuid', uuid)
           if(error){
            console.log(error.message);
          }else{
            const name:any= data.flat().map(e=>`${e.first_name} ${e.last_name ? e.last_name : ''}`).join()
            const profilePics = data.flat().map(e => e.profilePicUrl).filter(Boolean);
            const profile_pic = profilePics.length > 0 ? profilePics.join() : 'https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg';
            setUsername(name)
            setUserProfile(profile_pic)
          }
      }
      fetchUsers()
    },[])
     //Click outside
     useEffect(() => {
      const handleOutsideClick = (e: any) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
          onClose()
          console.log("Clicked outside");
        } else {
          console.log("Clicked IN");
        }
      };
      document.addEventListener('click', handleOutsideClick, true);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }, [refOne, onClose]);


    const handleUserClick = (newCheckUuid: string) => {
      onUserClick(newCheckUuid); // Update the checkuuid with the new user's ID
    };

    useEffect(() => {
      async function fetchRecords() {
            const {data, error}: PostgrestResponse<any>  = await supabase // Fetching auth user's row
             .from("messages")
             .select('is_chat, to, from')
             .eq('to', checkuuid).eq('from',uuid)  //checking the selected service provider === logined user the select
  
             if (error) {
             console.error('Error fetching data:', error);
           } else {
            const chat = data.map(e=>e.is_chat)  //get the is_chat is true or false
            setCheck(chat[0])
          }
        } 
         fetchRecords();
        }, []); // Ensure this effect runs when `supabase` changes
        console.log("--data is chek",check)
    
      
    const handleSend = async (spname: string, spprofile: string) =>{
      const { data, error } = await supabase
        .from('messages')
        .select()
        .eq('from', uuid)
        .eq('to', checkuuid);
      
      if (error) {
        console.log("Error occurred while checking for existing record:", error.message);
      } else {
        // Check if the query returned any data
        if (data && data.length > 0) {
          alert("Connection request already send before. Please wait for the response.");
        } else {
          // If no record exists, perform the insert operation
          const { data: insertedData, error: insertError } = await supabase
            .from('messages')
            .insert([
              {
                from: uuid,
                to: checkuuid,
                is_chat: false,
                username,
                spname,
                user_profile,
                sp_profile: imgSrc.current?.src,
                created_at: new Date().toTimeString()
              }
            ]);
      
          if (insertError) {
            alert(`You are not Logined!, ${insertError.message}`);
          } else {
            toast("Connection Sent!");
          }
        }
      }
      
    }

    const redirectChat=(provider_id: string | null)=>{
      const toId = provider_id
      const fromId= uuid
      dispatch(setIds({fromId, toId}))
      navigate('/chat')
    }

 console.log("serviceProviderData ::",serviceProviderData);
 
 
  return (
    <div className="ServiceProvider_Side-Profile h-full w-full md:w-2/4 py-12 z-10 absolute right-0 border-2 drop-shadow-2xl bg-white dark:bg-slate-200 dark:text-[#0c0c0c]" ref={refOne}>
    {serviceProviderData?.map((provider)=>(
        <div className="Sp__Profile  flex flex-col justify-center items-center gap-10">
        <div className="serviceProvider__1">
         <img className='serviceProvider-profile-pic rounded-full w-40 h-40 md:h-52 md:w-52 drop-shadow-xl' ref={imgSrc} src={provider.profilePicUrl?provider.profilePicUrl: 'https://imgs.search.brave.com/L3Ui8AXfwSRP-j1GgdIlwYFiz5Gj1uz7b_yLJif3ErY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzdlL0NpcmNsZS1p/Y29ucy1wcm9maWxl/LnN2Zw.svg'} alt={`${provider.first_name} portrait`} />
        </div>
          <div className="Profile__contact_details flex flex-col items-center md:mt-0 gap-2 md:gap-3">
           <h1 className="SP__Name font-poppins text-2xl md:text-5xl font-bold capitalize">{provider.first_name+" "+provider.last_name}</h1>
           <h1 className="proffesion text-xl font-lato">Profession - {provider.job}</h1>
           <div className="location__name flex gap-1 items-center justify-center my-2">
            <img className='w-5 h-5 md:w-8 md:h-8' src={require('../../../Media/Icons/loactionIcon.png')}/>
            <h1 className="text-sm md:text-xl font-bold font-popp whitespace-nowrap">{provider.location}</h1>
          </div> 
          <div className="User-phone flex gap-3 justify-center items-center">
              <img className='w-5 h-5 md:w-8 md:h-8' src={require('../../../Media/Icons/phoneIcon.png')} alt="" />
              <h1 className="font-lacto md:text-xl font-semibold">{provider.phonenumber}</h1>
            </div>
            <div className="User-email flex gap-3 justify-center items-center ">
              <img className='w-5 h-5 md:w-8 md:h-8' src={require('../../../Media/Icons/gmailIcon.png')} alt="" />
              <h1 className="font-lato md:text-xl font-semibold">{provider.email}</h1>
            </div>
            <div className="SP__rating rating rating-md"> 
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked/>
              <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
            </div>
         </div>
         {check?
         <h1 onClick={()=>redirectChat(provider.uuid)} className='underline text-blue-400 hover:text-blue-600 text-xl md:text-2xl cursor-pointer'>Chat..</h1>
         :
         <h1 onClick={()=>handleSend(provider.first_name+" "+provider.last_name, imgSrc.current.src)} className='underline text-blue-400 hover:text-blue-600 text-xl md:text-2xl cursor-pointer'>Get Connect</h1>
         }<p className="text-xs md:text-sm text-neutral-500 absolute bottom-2 px-3 md:px-auto">If the service provider accept your connect then you will get an option to chat chat.</p>
         <button onClick={onClose} className="btn-xl md:btn absolute right-5 md:right-1 top-2">X</button>
        </div>
    ))}
    <ToastContainer theme='light' autoClose={1000} position="top-center"hideProgressBar={true}/>
  </div>
  )
}

export default SP_SideProfile;
