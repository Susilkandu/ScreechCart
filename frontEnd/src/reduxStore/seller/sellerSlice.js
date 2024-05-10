import { createSlice } from "@reduxjs/toolkit";
const animationSlice = createSlice({
  name: "animation",
  initialState: {
    isLoading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    name: "",
    email: "",
    address: {
      shopName: "",
      pinCode: "",
      vill: "",
      city: "",
      district: "",
      state: "",
      country: "",
      location: {
        latitude: "",
        longitude: "",
      },
    },
  },
  reducers: {
    setProfileDetails: (state, action) => {   
      return action.payload;
    },
    deleteProfileDetails: () => {
      state = {};
    },
  },
});

export const { startLoading, stopLoading } = animationSlice.actions;
export const { setProfileDetails, deleteProfileDetails } = profileSlice.actions;
export const animationReducer = animationSlice.reducer;
export const sellerProfileReducer = profileSlice.reducer;
