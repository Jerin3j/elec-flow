import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        authUser: userSlice,
    }
})

export default store;
export const useAppDispatch = typeof store.dispatch 
export type RootState = ReturnType<typeof store.getState>;