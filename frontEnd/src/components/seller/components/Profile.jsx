import React from "react";
import { useSelector } from "react-redux";
export default function Profile() {
const details=useSelector(state=>state.sellerProfileDetails);
const address=details.address;
  return (
    <div className="profile-info" >
      <div className="pic">
        <img
          src={details. profilePhoto}
          alt="Not Available"
        />
      </div>
      <div id="sellerDetails">
        <div className="personal">
          <b  style={{ textTransform: "upperCase", fontSize: "1.5rem" }}>
            {details.name}
          </b>
          <br />
          <b id="sellerEmail">{details.email}</b>
          <br />
          <b>Contact no. {details.mobile.countryCode}{details.mobile.number}</b>
        </div>
        <b style={{ width: "inherit" }}>
          <hr />
        </b>
        <div id="address">
          <div>
            <strong>Shop Name:</strong>{" "}
            <span id="shopName">{address.shopName}</span>
          </div>
          <div>
            <strong>Pin Code:</strong> <span id="pinCode">{address.pinCode}</span>
          </div>
          <div>
            <strong>Village:</strong> <span id="vill">{address.vill}</span>
          </div>
          <div>
            <strong>City:</strong> <span id="city">{address.city}</span>
          </div>
          <div>
            <strong>District:</strong>{" "}
            <span id="district">{address.district}</span>
          </div>
          <div>
            <strong>State:</strong> <span id="state">{address.state}</span>
          </div>
          <div>
            <strong>Country:</strong> <span id="country">{address.country}</span>
          </div>
          <div>
            <strong>Location:</strong>
            <div>
              Latitude: <span id="latitude">{address.location.latitude}</span>
            </div>
            <div>
              Longitude: <span id="longitude">{address.location.longitude}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
