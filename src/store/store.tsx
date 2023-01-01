import { configureStore } from "@reduxjs/toolkit";
import  dataSlice from "./dataSlice";
import loginSlice from "./loginSlice";
import searchKeysSlice  from "./searchKeysSlice";
import toReserveSlice from "./toReserveTripsSlice";
import userReservationSlice from "./userReservationSlice";

export const store = configureStore({
    reducer :{
        login : loginSlice,
        searchKeys : searchKeysSlice,
        data : dataSlice,
        userReservation : userReservationSlice,
        toReserve : toReserveSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
