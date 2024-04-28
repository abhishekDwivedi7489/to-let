import { createSlice } from "@reduxjs/toolkit";

 
const initialState = {
    home : null,
    room : null,
   
}

const homeSlice = createSlice({
    name : "Room",
    initialState,
    reducers:{
        setHome(state, action){
            state.home = action.payload
        },

        setRoom(state, action){
            state.room = action.payload
        }
    }
})

export const {setCategoryRoom, setHome, setRoom} = homeSlice.actions;
export default homeSlice.reducer;
