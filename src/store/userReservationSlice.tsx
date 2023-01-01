import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookingInterface , trip } from "../interfaces";
export interface userReservationState {
    reservation : bookingInterface[] | null,
    tripDetails : trip[] | null
} 
const initialState : userReservationState = {reservation : null , tripDetails : null};

export const getUserReservation = createAsyncThunk('user/userReservation' , async (id:number , {rejectWithValue})=>{
    try{
        let req = await fetch(`${process.env.REACT_APP_API_LINK}/booking/getUserBookedTrips.php` , {method : 'POST' , body : JSON.stringify({id : id})});
        if(!req.ok){
            throw Error('Server Error')
        }
        let res = await req.json();
        return res;
    }catch(e){
        return rejectWithValue(e);
    }
    
})
export const userReservationSlice = createSlice({
    name : 'userReservation',
    initialState,
    reducers : {
        updateUserReservation : (state , action)=>{
            if(state.reservation && state.tripDetails){
                return { reservation : state.reservation.filter(reservation => reservation.id !== action.payload.reservationId) ,
                tripDetails : state.tripDetails.filter(trip => trip.rowId !== action.payload.tripRowId) }
            }else{
                return {reservation : null , tripDetails : null}
            }
        }
    },
    extraReducers : builder =>{
        builder.addCase(getUserReservation.pending , (state , action )=>{
            return {reservation : null , tripDetails : null}
        })
        .addCase(getUserReservation.fulfilled , (state , action )=>{
            return {reservation : action.payload.booking , tripDetails : action.payload.booked_trips}
        })
        .addCase(getUserReservation.rejected , (state , action )=>{
            return {reservation : null , tripDetails : null}
        })
    }
})
export const {updateUserReservation} = userReservationSlice.actions;
export default userReservationSlice.reducer