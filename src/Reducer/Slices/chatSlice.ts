import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface ChatUsers{   
    fromId: string | null,
    toId: string | null,
}
//State
interface ChatIds{
    chatDetails: ChatUsers | null   
}
const initialState: ChatIds = {
    chatDetails: null,
}
console.log("chat slice:: ",initialState.chatDetails);

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{
        setIds:(state, action: PayloadAction<ChatUsers>) =>{
                state.chatDetails = action.payload
        },
        // setToId:(state, action: PayloadAction<string | null>) =>{
        //     if (state.chatDetails) {
        //         state.chatDetails = { ...state.chatDetails, toId: action.payload }
        //     }
        // },
    }
})
export default chatSlice.reducer
export const {setIds} = chatSlice.actions