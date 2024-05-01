import React from "react";

export default function Profile() {
  return (
    <div className="profile-info">
      <div className="profile">
        <img
          src="https://th.bing.com/th/id/OIP.518KBNuR-t3O8zdFqIrR5gHaHa?pid=ImgDet&w=202&h=202&c=7"
          alt=""
        />
        <br />
        <b>Mr. Shivansh Muddal</b>
        <span>ShivanshMuddal96@gmail.com</span>
        <br />
        <span>Contact no. +916394521789</span>
        <div id="address">
          <div>
            <strong>Shop Name:</strong> <span id="shopName">Mangal Medical Store</span>
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
            <strong>District:</strong> <span id="district">Gautam Buddh Nagar</span>
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
