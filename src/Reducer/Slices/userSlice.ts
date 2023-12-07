import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
export interface User{   //The auth user type to store
    id: number,
    email: string,
}
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
            state.userDetails = action.payload;
        }
    },
})

console.log("initialState", initialState.userDetails);

export default  UserSlice.reducer
export const {addUserIdentity} = UserSlice.actions