import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import { useDispatch } from "react-redux";
import chatSlice from "./Slices/chatSlice";
import locationSlice from "./Slices/locationSlice";

const store = configureStore({
    reducer: {
        authUser: userSlice, // user data is available and it passes to authUser
        chatUsers: chatSlice,
        userLocation: locationSlice,
    }
})

export default store;
export const useAppDispatch = typeof store.dispatch 
export type RootState = ReturnType<typeof store.getState>;