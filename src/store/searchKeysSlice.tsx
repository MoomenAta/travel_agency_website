import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type searchKeys = {
    name : string,
    adate : string,
    ddate : string,
    rooms : number,
    adults : number,
    children : number,
    stars : number[],
    priceStart : number,
    priceEnd : number
}

const initialState : searchKeys = {
    name : '',
    adate : '',
    ddate : '',
    rooms : 1,
    adults : 1,
    children : 1,
    stars : [],
    priceStart : 10,
    priceEnd : 50
};

export const searchKeysSlice = createSlice({
    name : 'searchKeys',
    initialState,
    reducers : {
        update : (state , action : PayloadAction<searchKeys>) => {
            return {...action.payload}
        }
    }
})

export const { update } = searchKeysSlice.actions;
export default searchKeysSlice.reducer