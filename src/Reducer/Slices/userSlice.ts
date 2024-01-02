import { PayloadAction, createSlice } from "@reduxjs/toolkit"
export interface User{   //The auth user type to store
    uuid: string,
    email: string,
    checkuuid: string | null,
}
interface UserState{
    userDetails: User | null   
}
const initialState: UserState = {
    userDetails: null,
}
console.log(initialState.userDetails?.uuid);

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addUserIdentity: (state, action : PayloadAction<User>)=>{
            state.userDetails = action.payload;
        },
        setCheckUuid: (state, action: PayloadAction<string | null>) => {
            if (state.userDetails) {
                state.userDetails = { ...state.userDetails, checkuuid: action.payload };; // get seperatly store uuid by type of string
            }
        }
        
    },
})

console.log("initialState", initialState.userDetails);

export default  UserSlice.reducer
export const {addUserIdentity, setCheckUuid} = UserSlice.actions