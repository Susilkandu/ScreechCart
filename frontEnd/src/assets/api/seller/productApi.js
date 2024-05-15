import {toast} from 'react-toastify';
const baseUrl = "http://localhost:3000/seller/item";
const token= localStorage.getItem('sToken');
const addItem = async (data)=>{
    try {
        console.log(data)
       const response = await fetch(`${baseUrl}/addItem`,{
         method:'post',
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
   export{
    addItem
   }