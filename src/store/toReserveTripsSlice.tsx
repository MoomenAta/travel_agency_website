import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { surBooking } from "../interfaces";
let initialState : surBooking[] = [];
if(localStorage.getItem('toReserve')){
    let toReserve : surBooking[] = JSON.parse(localStorage.getItem('toReserve')!)
    let filteredToReserve = toReserve.filter(toReserve => {
        if(!toReserve.rowId || !toReserve.name ||  !toReserve.img ||  !toReserve.adate ||  !toReserve.ddate || !toReserve.price){
            return null;
        }else{
            return toReserve;
        }
    })
    initialState = filteredToReserve;
}
export const toReserveSlice = createSlice({
    name : 'toReserve',
    initialState,
    reducers : {
        setToReserve : (state , action : PayloadAction<surBooking[]>)=>{
            localStorage.setItem('toReserve',JSON.stringify(action.payload))
            return state = action.payload}
    }
})

export const { setToReserve } = toReserveSlice.actions;
export default toReserveSlice.reducer