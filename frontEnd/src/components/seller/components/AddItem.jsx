import React, { useState, useRef, useEffect } from "react";
import { addItem } from "../../../assets/api/seller/productApi";
export default function AddItem() {
  const [details, setDetails] = useState({
    name: "",
    model: "",
    category: "",
    price: "",
    description: "",
  });
  const addItemFormRef = useRef(null);
  const sbmtBtnRef= useRef(null);
  useEffect(() => {
    const addItemFormElement = addItemFormRef.current;
    const inputElements = addItemFormElement.querySelectorAll("label input");
    const submitBtn= sbmtBtnRef.current;
    const handleChange = (e) => {
      const {name,value}=e.target;
      setDetails((preDetails)=>({
        ...preDetails,
        [name]:value,
      }))
      console.log(details);
    };
    const handleSubmit = async(e)=>{
      e.preventDefault();
      await addItem(details);
      console.log(details);
    }
    if (addItemFormElement) {
      inputElements.forEach((input) => {
        input.addEventListener("change", handleChange);
      });
    }
    if(submitBtn){
      submitBtn.addEventListener('click',handleSubmit);
    }
    return () => {
      inputElements.forEach((input) => {
        input.removeEventListener("change", handleChange);
      });
      if(submitBtn){
        submitBtn.removeEventListener('click',handleSubmit);
      }
    };
  },[]);

  return (
    <div className="add-item-container">
      <form className="add-item-form" ref={addItemFormRef}>
        <label>
          <b>Name: </b>
          <input type="text" name="name" />
        </label>
        <label>
          <b>Model: </b>
          <input type="text" name="model" />
        </label>
        <label>
          <b>Category: </b>
          <input type="text" name="category" />
        </label>
        <label>
          <b>Price: </b>
          <input type="number" name="price" />
        </label>
        <label>
          <b>Description: </b>
          <input type="text" name="description" />
        </label>
        <button type="submit" className="save-btn" ref={sbmtBtnRef}>
          Save
        </button>
      </form>
    </div>
  );
}
