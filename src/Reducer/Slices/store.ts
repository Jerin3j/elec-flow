import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { useDispatch } from "react-redux";
import serviceProviderSlice from "./serviceProviderSlice";

const store = configureStore({
    reducer: {
        authUser: userSlice || serviceProviderSlice , // user or service-provider data is available and it passes to authUser

    }
})

export default store;
export const useAppDispatch = typeof store.dispatch 
export type RootState = ReturnType<typeof store.getState>;