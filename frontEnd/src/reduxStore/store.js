import {configureStore} from '@reduxjs/toolkit';
import animationReducer from './seller/sellerSlice';
export const store = configureStore({
    reducer:{
        animation:animationReducer,
    }
})