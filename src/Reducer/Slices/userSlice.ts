import { PayloadAction, createSlice } from "@reduxjs/toolkit"
export interface User{   //The auth user type to store
    uuid: any,
    checkuuid: string | null,   //uuid of service provider profile
    metadata: string | null,
}
//State
interface UserState{
    userDetails: User | null   
}
const initialState: UserState = {
    userDetails: null,
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addUserIdentity: (state, action : PayloadAction<User>)=>{
                state.userDetails = action.payload
        },
        setAuthUuid: (state, action : PayloadAction<any>)=>{
            if (state.userDetails) {
                state.userDetails = { ...state.userDetails, uuid: action.payload}
            }
        },
        setCheckUuid: (state, action: PayloadAction<string | null>) => {
            if (state.userDetails) {
                state.userDetails = { ...state.userDetails, checkuuid: action.payload };; // get seperatly store uuid by type of string
            }
        },
        setMetaData:(state, action: PayloadAction<string | null>) =>{
            if (state.userDetails) {
                state.userDetails = { ...state.userDetails, metadata: action.payload }
            }
        },
        
        
    },
})

console.log("initialState", initialState.userDetails);

export default  UserSlice.reducer
export const {addUserIdentity, setAuthUuid, setCheckUuid, setMetaData} = UserSlice.actions