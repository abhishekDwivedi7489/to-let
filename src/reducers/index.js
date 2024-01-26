import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlices';
import profileReducer from '../slices/profileSlice';
import roomSlice from "../slices/roomSlice";
import homeSlice from "../slices/homeSlice"

const rootReducer = combineReducers({
   auth:authReducer,
   profile:profileReducer,
   home:roomSlice ,
   Room:homeSlice
});

export default rootReducer;