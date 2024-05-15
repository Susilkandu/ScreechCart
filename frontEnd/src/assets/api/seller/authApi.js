const baseUrl = "http://localhost:3000/seller";
import { Navigate } from 'react-router-dom';

import {toast} from 'react-toastify';
const token= localStorage.getItem('sToken');
 const sendOtpViaSms = async (countryCode, mobile) => {
  try {
    const response = await fetch(`${baseUrl}/sendOtpViaSms`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCode,
        mobile,
      }),
    });
    const responseData= await response.json();
    if (responseData.ackbool == 0) {
      return toast.error(responseData.message);
    } else {
      toast.success(responseData.message);
      return responseData;
    }
  } catch (error) {
    toast.error("Failed To Send");
    throw error;
  }
};
const verifyOtpAndCreateSellerAc = async (countryCode, mobile, otp) => {
  const response = await fetch(`${baseUrl}/verifyOtpAndCreateSellerAc`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      countryCode,
      mobile,
      otp,
    }),
  });
  const responseData= await response.json();
  if (responseData.ackbool == 0) {
    toast.error(responseData.message);
    throw new Error(responseData.message);
  } else {
    toast.success(responseData.message);
    return responseData;
  }
};
const saveInfo = async (data)=>{
 try {
    const response = await fetch(`${baseUrl}/saveInfo`,{
      method:'put',
      headers:{
        'Content-Type':'application/json',
        'Authorization':token,
      },
      body:JSON.stringify({
        ...data
      })
    });
  const responseData = await response.json();
  if(responseData.ackbool==0){
    toast.error(responseData.message);
  }else{
    toast.success(responseData.message);
    return responseData;
  }
 } catch (error) {
  toast.error("Failed to Save");
  throw(error);
 } 
}
const loginSellerAccount = async(mbl,psd)=>{
  try {
  const response = await fetch(`${baseUrl}/loginSellerAc`,{
    method:"Post",
    headers:{
      'Content-Type':"application/json",
    },
    body:JSON.stringify({
      mobile:mbl,
      password:psd
    }),
  });
  const responseData = await response.json();
  if(responseData.ackbool==0){
    toast.error(responseData.message);
  }
  else{
    toast.success(responseData.message);
    localStorage.setItem('sTokent',responseData.token);
    return responseData;
  }
  } catch (error) {
    toast.error('Some Error occured');
    throw (error);
  }
}
export {
  sendOtpViaSms,
  verifyOtpAndCreateSellerAc,
  saveInfo,
  loginSellerAccount
}