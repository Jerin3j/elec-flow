import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import { useDispatch } from "react-redux";
import chatSlice from "./Slices/chatSlice";
import locationSlice from "./Slices/locationSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducerPersist = persistReducer(persistConfig, locationSlice)
const store = configureStore({
    reducer: {
        authUser: userSlice, // user data is available and it passes to authUser
        chatUsers: chatSlice,
        userLocation: reducerPersist,
    }
})

export default store;
export const persistor = persistStore(store)
export const useAppDispatch = typeof store.dispatch 
export type RootState = ReturnType<typeof store.getState>;