import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    step : 1,
    home : null,
    editHome : false
}

const roomSlice = createSlice({
    name : "home",
    initialState,
    reducers:{
        setStep(state, action){
            state.step = action.payload;
        },
        setHome(state, action){
            state.home = action.payload
        },
        setEditHome(state, action){
            state.editHome = action.payload;
        },
        resetHomeState(state){
            state.step = 1
            state.home = null
            state.editHome = false
        }
    }
})

export const{setHome , setStep, setEditHome, resetHomeState} = roomSlice.actions;
export default roomSlice.reducer