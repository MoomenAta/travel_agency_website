import { createSlice, PayloadAction , createAsyncThunk } from "@reduxjs/toolkit";
import { trip } from "../interfaces";

export let getAllTrips = createAsyncThunk('getAllTrips',async()=>{
    try{
        let req = await fetch(`${process.env.REACT_APP_API_LINK}/routes/read.php`);
        if(!req.ok){
            throw Error('Response Error');
        }
        let res = await req.json();
        if(res) return res.data
    }
    catch(e){
        console.log(e);
    }

})

const initialState : trip[] = [];

export const dataSlice = createSlice({
    name : 'data',
    initialState,
    reducers : {
        setData : (state , action : PayloadAction<trip[]>)=>{return state = action.payload}
    },
    extraReducers: builder =>{
        builder.addCase( getAllTrips.pending , state =>{
            return [];
        })
        .addCase( getAllTrips.fulfilled , (state  ,action) =>{
            return action.payload;
        })
        .addCase( getAllTrips.rejected , state =>{
            return [];
        })
    }
})

export const { setData } = dataSlice.actions;
export default dataSlice.reducer