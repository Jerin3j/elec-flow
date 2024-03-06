import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface LocationDetails{   
    currentLocation: string | null,
    latitude: any,
    longitude: any

}
//State
interface LocDetails{
    LocDetails: LocationDetails | null   
}
const initialState: LocDetails = {
    LocDetails: null,
}
console.log("location slice:: ",initialState.LocDetails);

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers:{
        setCurrentLocation:(state, action: PayloadAction<string | null>) =>{
            if (state.LocDetails) {
                state.LocDetails = { ...state.LocDetails, currentLocation: action.payload }
            }
        },
        setLocationDetails:(state, action: PayloadAction<LocationDetails>)=>{
            state.LocDetails = action.payload
        }
    }
})
export default locationSlice.reducer
export const {setCurrentLocation, setLocationDetails} = locationSlice.actions