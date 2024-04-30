import {createSlice} from '@reduxjs/toolkit';
export const animationSlice = createSlice({
    name:'animation',
    initialState:{
        isLoading:false
    },
    reducers:{
        startLoading:(state)=>{
            state.isLoading = true;
        },
        stopLoading:(state)=>{
            state.isLoading= false;
        },
    },
});

export const {startLoading,stopLoading}= animationSlice.actions;
export default animationSlice.reducer;