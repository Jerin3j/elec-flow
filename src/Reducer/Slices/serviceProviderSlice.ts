import { PayloadAction, createSlice } from "@reduxjs/toolkit"
export interface ServiceProvider{   //The auth user type to store
    uuid: string,
    email: string,
    checkuuid: string | null,
}

interface SProvider{
    spDetails: ServiceProvider | null   
}
const initialState: SProvider = {
    spDetails: null,
}
console.log("Cid",initialState.spDetails?.checkuuid);

export const UserSlice = createSlice({
    name: 'service-provider',
    initialState,
    reducers:{
        addProviderIdentity: (state, action : PayloadAction<ServiceProvider>)=>{
            state.spDetails = action.payload;
        },
        setCheckUuid: (state, action: PayloadAction<string | null>) => {
            if (state.spDetails) {
              state.spDetails.checkuuid = action.payload;
            }
        }
    },
})

console.log("initialState", initialState.spDetails);

export default  UserSlice.reducer
export const {addProviderIdentity} = UserSlice.actions