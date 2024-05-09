import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
const profile=useSelector(state=>state.sellerProfileDetails);
const profileHandler=()=>{
  console.log(profile);
}

  return (
    <div className="profile-info" >
      <div className="pic">
        <img
          src="https://th.bing.com/th/id/OIP.518KBNuR-t3O8zdFqIrR5gHaHa?pid=ImgDet&w=202&h=202&c=7"
          alt=""
        />
      </div>
      <div id="sellerDetails">
        <div className="personal">
          <b onClick={profileHandler} style={{ textTransform: "upperCase", fontSize: "1.5rem" }}>
            Sushil Kandu
          </b>
          <br />
          <b id="sellerEmail">ShivanshMuddal96@gmail.com</b>
          <br />
          <b>Contact no. +916394521789</b>
        </div>
        <b style={{ width: "inherit" }}>
          <hr />
        </b>
        <div id="address">
      
          <div>
            <strong>Shop Name:</strong>{" "}
            <span id="shopName">Mangal Medical Store</span>
          </div>
          <div>
            <strong>Pin Code:</strong> <span id="pinCode">203201</span>
          </div>
          <div>
            <strong>Village:</strong> <span id="vill">Dankaur</span>
          </div>
          <div>
            <strong>City:</strong> <span id="city">Gautam Buddh Nagar</span>
          </div>
          <div>
            <strong>District:</strong>{" "}
            <span id="district">Gautam Buddh Nagar</span>
          </div>
          <div>
            <strong>State:</strong> <span id="state">Uttar Pradesh</span>
          </div>
          <div>
            <strong>Country:</strong> <span id="country">India</span>
          </div>
          <div>
            <strong>Location:</strong>
            <div>
              Latitude: <span id="latitude">1625.25</span>
            </div>
            <div>
              Longitude: <span id="longitude">155.25</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
