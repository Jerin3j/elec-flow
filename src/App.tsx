import React, { useEffect, useState } from 'react';
import Home from './Pages/Home';
import './App.css';
import { v2 as cloudinary } from 'cloudinary';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import Register from './Components/Auth/Register';
import ServiceProviders from './Components/ServiceProviders';
import Service_Providers from './Pages/Service_Providers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServiceProvider_Profile from './Components/Service Provider/ServiceProviderProfile-Edit/ServiceProvider_Profile';
import ElectriciansFAQ from './Components/User/User_Home/ElectriciansFAQ';
import PlumbersFAQ from './Components/PlumbersFAQ';
import UserProfile from './Components/UserProfile';
import EditYourProfile from './Components/User/Userprofile_Edit/EditYourProfile';
import supabase from './Config/supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { addUserIdentity, setAuthUuid, setMetaData } from './Reducer/Slices/userSlice';
import { setLocationDetails, changeIsEdited } from './Reducer/Slices/locationSlice';
import { RootState } from './Reducer/store';
import ResetPassword from './Components/Auth/ResetPassword';
import Chat from './Components/Chat';
import EditSp_Profile from './Components/Service Provider/ServiceProviderProfile-Edit/EditSp_Profile';
import SP_Requests from './Components/Service Provider/ServiceProvider_Home/SP_Requests';
import SP_Dashboard from './Components/Service Provider/ServiceProvider_Home/SP_Dashboard';
import AccountPrefrences from './Components/User/Userprofile_Edit/AccountPrefrences';
import Messages from './Components/Messages';
import NearbyProviders from './Components/NearbyProviders';
import BarLoader from './Components/BarLoader';
import NotFound from './Components/Statuses/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OfflineStat from './Components/Statuses/OfflineStat';
import ContactForm from './Components/ContactForm';
import YourProfile from './Components/User/Userprofile_Edit/YourProfile';
import { Helmet } from 'react-helmet';
import OurTeam from './Components/OurTeam';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // Redux state
  const authUser = useSelector((state: RootState) => state.authUser.userDetails); // Auth user details
  const LocDetails = useSelector((state: RootState) => state.userLocation.LocDetails); // Location details
  const isEdited = useSelector((state: RootState) => state.userLocation.isEdited); // Location edit flag

  console.log('Redux Data @App:', authUser);
  console.log('Location Data @App:', LocDetails);
  console.log('Is Location Edited? ', isEdited);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from Supabase
        const { data: { user }, error } = await supabase.auth.getUser();
        console.log("Gotcha user", user);
        
        if (error) {
          console.error('Error fetching user:', error.message);
          return;
        }

        if (user) {
          // Dispatch user details to Redux
          dispatch(addUserIdentity({ uuid: user.id, checkuuid: null, metadata: user.user_metadata?.job || null }));
          dispatch(setAuthUuid(user.id));

          // Set metadata if available
          if (user.user_metadata?.job) {
            dispatch(setMetaData(user.user_metadata.job));
          }

          // Alert if job is not selected (for service providers)
          if (user.user_metadata?.job === 0) {
            console.log('Service Provider Joined');
            alert(`You were not selected for a job! You signed up through ${user.app_metadata.provider}. Go to edit profile and add a job.`);
          } else {
            console.log('User Joined');
          }

          // Fetch and update user location if not edited
          if (!isEdited) {
            fetchUserLocation(user.id);
          }
        }
      } catch (error) {
        console.error('Error fetching user data at App:', error);
      } finally {
        setIsLoading(true); // Set loading to false
      }
    };

    // Fetch user location using Geolocation API
    const fetchUserLocation = async (userId: string) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch location name using OpenCage API
          const loc = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=ee4cd75f7d4f494ea9058692bc9f3359`;
          const response = await fetch(loc);
          const data = await response.json();
          const currentLocation = `${data.results[0].components?.road && data.results[0].components?.road}, ${data.results[0].components?.city}`;

          // Dispatch location details to Redux
          dispatch(setLocationDetails({ currentLocation, latitude, longitude }));

          // Update user location in Supabase
          await updateUserLocation(userId, currentLocation, latitude, longitude);

          // Update provider location if user is a service provider
          if (authUser?.metadata) {
            await updateProviderLocation(userId, currentLocation, latitude, longitude);
          }
        },
        (error) => {
          console.error('Error fetching location:', error.message);
        }
      );
    };

    // Update user location in Supabase
    const updateUserLocation = async (userId: string, location: string, latitude: number, longitude: number) => {
      const { error } = await supabase
        .from('users')
        .upsert({ uuid: userId, location, latitude, longitude }, { onConflict: 'uuid' });

      if (error) {
        console.error('Error updating user location:', error.message);
      } else {
        console.log('User location updated successfully');
      }
    };

    // Update provider location in Supabase
    const updateProviderLocation = async (userId: string, location: string, latitude: number, longitude: number) => {
      const { error } = await supabase
        .from('service-providers')
        .upsert({ uuid: userId, location, latitude, longitude }, { onConflict: 'uuid' });

      if (error) {
        console.error('Error updating provider location:', error.message);
      } else {
        console.log('Provider location updated successfully');
      }
    };

    fetchUserData();
  }, [dispatch, isEdited, authUser?.metadata]);

  return isLoading ? (
    <div className="App bg-[#F7F7F7] dark:bg-gradient-to-tr dark:from-[#000] dark:to-[#101720] text-[#0c0c0c] dark:text-[#F7F7F7]">
      <BrowserRouter>
        <Helmet>
          <title>ElecFlow - Connecting You with Local Electricians and Plumbers</title>
          <meta name="description" content="ElecFlow: Your ultimate solution for quick access to nearby plumbers and electricians. Say goodbye to service hassles with our user-friendly interface. Get your plumbing and electrical issues resolved promptly and efficiently." />
          <meta name="keywords" content="Emergency Plumbers, Licensed Electricians, Local Plumbing Services, Professional Electricians, 24/7 Plumbing Assistance, Reliable Electrical Contractors, Residential Plumbing Experts, Commercial Electrical Services, Affordable Plumbing Solutions, Experienced Electrician Near Me, Plumbing Repair Services, Electrical Installation Specialists, Certified Plumbers, Skilled Electricians in India, Plumbing Maintenance Contracts, Electrical Wiring Repair, Plumbing Renovation Experts, Electrical Safety Inspections, Drain Cleaning Services, Lighting Fixture Installation, elecflow, how to get nearby plumbers, how to get nearby electricians, electricians near me, plumbers near me, how to do myself, how to solve" />
          <meta name="author" content="Jerin Jerome Justin" />
          <meta property="og:title" content="ElecFlow - Connecting You with Local Electricians and Plumbers" />
          <meta property="og:description" content="ElecFlow - Solve your problems" />
          <meta property="og:image" content="https://imgs.search.brave.com/bnZyuhgmwqPlPu2hwWLe2qmTeizFXKoXudilZOceXbk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdDMu/ZGVwb3NpdHBob3Rv/cy5jb20vMTAzMjQ2/My8xNzc3Mi9pLzQ1/MC9kZXBvc2l0cGhv/dG9zXzE3NzcyMjQ1/NC1zdG9jay1waG90/by1wbHVtYmluZy1z/ZXJ2aWNlcy1wbHVt/YmVyLXdpdGgtd3Jl/bmNoLmpwZw" />
          <meta property="og:url" content="https://elec-flow-jerin3j.vercel.app/" />
          <meta name="twitter:title" content="ElecFlow - Connecting You with Local Electricians and Plumbers" />
          <meta name="twitter:description" content="ElecFlow - Solve your problems" />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="service-providers" element={<ServiceProviders />} />
          <Route path="nearby-providers" element={<NearbyProviders />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="contact" element={<ContactForm />} />
          <Route path="meetourteam" element={<OurTeam />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="sp-profile" element={<ServiceProvider_Profile />} />
          <Route path="sp-profile/edit" element={<EditSp_Profile />} />
          <Route path="elecflow-electricians" element={<ElectriciansFAQ />} />
          <Route path="elecflow-plumbers" element={<PlumbersFAQ />} />
          <Route path="user-profile" element={<UserProfile supabase={supabase} />} />
          <Route path="your-profile" element={<YourProfile />} />
          <Route path="your-profile/edit" element={<EditYourProfile />} />
          <Route path="your-profile/preferences" element={<AccountPrefrences />} />
          <Route path="requests" element={<SP_Requests />} />
          <Route path="dashboard" element={<SP_Dashboard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="messages" element={<Messages />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={800} hideProgressBar={true} limit={1} theme="light" className={'bg-transparent'} />
    </div>
  ) : (
    <BarLoader />
  );
};

export default App;