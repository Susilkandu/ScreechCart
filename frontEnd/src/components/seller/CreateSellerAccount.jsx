import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../reduxStore/seller/sellerSlice";
import {useNavigate} from "react-router-dom";
import {
  saveInfo,
  sendOtpViaSms,
  verifyOtpAndCreateSellerAc,
} from "../../assets/api/seller/authApi";
import { toast } from "react-toastify";

export default function () {
  const navigate= useNavigate();
  const ulRef = useRef(null);
  const sendOtpBtnRef = useRef(null);
  const saveInfoRef = useRef(null);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.animation.isLoading);
  const [countryCode, setCountryCode] = useState("");
  const [mobile, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [responseStatus, setResponseStatus] = useState(false);
  const [verified, setVerified] = useState(false);
  const [Info, setInfo] = useState({
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
    password: "",
  });
  const sendOtpHandler =async()=>{
    dispatch(startLoading());
    const response = await sendOtpViaSms(countryCode, mobile);
    setResponseStatus(response.ackbool);
    dispatch(stopLoading());
  }
  const verifyOtpHandler = async ()=>{
    const response = await verifyOtpAndCreateSellerAc(
      countryCode,
      mobile,
      otp
    );
    if (response.ackbool == 1) {
      setVerified(true);
      localStorage.setItem("sToken", response.token);
    }
  }
  const saveInfoHandler = async () => {
    const response = await saveInfo(Info);
    if(response.ackbool==1){
      navigate('/sellerDashboard');
    }
    setResponseStatus(response.ackbool);
  };
  useEffect(() => {
    const saveInfoElement = ulRef.current;
    const sendOtpButton = sendOtpBtnRef.current;
    const saveInfobtn = saveInfoRef.current;
    if (saveInfoElement) {
      var saveInfoEachElement = saveInfoElement.querySelectorAll("li");
      let newInfo = {};
      var handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
          const [parentKey, childKey] = name.split(".");
          newInfo = {
            ...Info,
            [parentKey]: {
              ...Info[parentKey],
              [childKey]: value,
            },
          };
        } else {
          newInfo = {
            ...Info,
            [name]: value,
          };
        }
        setInfo(newInfo);
      };
    }
    if (saveInfoEachElement) {
      saveInfoEachElement.forEach((li) => {
        li.addEventListener("change", handleChange);
      });
    }

    // Cleanup function to remove event lsitener when component will unmount
    return () => {
      saveInfoEachElement.forEach((li) => {
        li.removeEventListener("change", handleChange);
      });
      if (sendOtpButton) {
        sendOtpButton.removeEventListener("click", sendOtpHandler);
      }
      if (saveInfoRef) {
        saveInfobtn.removeEventListener("click", saveInfoHandler);
      }
    };
  }, []);
  return (
    <form className="createSellerAccount-form">
      <center style={{ paddingBottom: "1rem" }}>
        <h3 style={{ color: "black" }}>Become ScreechCart Seller</h3>
        <div className="sendOtp-form-group">
          <center style={{ color: "#6a6666", paddingBottom: "0.8rem" }}>
            <span>We'll send you a 6-digit code to verify your number</span>
          </center>
          <select
            value={countryCode}
            onChange={(e) => {
              setCountryCode(e.target.value);
            }}
            className="countryList"
            required={true}
          >
            <option>Select</option>
            <option value={"+91"}>India</option>
            <option value={"+92"}>Pakistan</option>
            <option value={"+93"}>Nepal</option>
          </select>
          <input
            type="text"
            className="mobile"
            id="mobileNumber"
            value={mobile}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter mobile number"
            required={true}
          />
          {!responseStatus && (
            <button
              type="button"
              ref={sendOtpBtnRef}
              className="send-otp-btn"
              onClick={sendOtpHandler}
            >
              {isLoading ? (
                <span class="material-symbols-outlined waiting">settings</span>
              ) : (
                "Send Otp"
              )}
            </button>
          )}
          <br />
          {responseStatus && (
            <center className="otp-actions">
              <button onClick={sendOtpHandler}>Resend OTP</button>
              <input
                type="text"
                maxLength={6}
                minLength={6}
                className="otp-box"
                placeholder="Enter 6 digit OTP"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              ></input>
              <button
                onClick={verifyOtpHandler}
              >
                {verified ? "Verified" : "Verify OTP"}
              </button>
            </center>
          )}
        </div>
        <ul className="save-info" ref={ulRef}>
          <li>
            <input type="text" placeholder="Shop Owner" name="name" />
          </li>
          <li>
            <input type="email" placeholder="Email" name="email" />
          </li>
          <b>Address</b>
          <li>
            <input
              type="text"
              placeholder="Shop Name"
              name="address.shopName"
            />
          </li>
          <li>
            <input
              type="number"
              placeholder="Area Pin Code"
              name="address.pinCode"
            />
          </li>
          <li>
            <input type="text" placeholder="Village" name="address.vill" />
          </li>
          <li>
            <input type="text" placeholder="City" name="address.city" />
          </li>
          <li>
            <input type="text" placeholder="District" name="address.district" />
          </li>
          <li>
            <input type="text" placeholder="State" name="address.state" />
          </li>
          <li>
            <input type="text" placeholder="Country" name="address.country" />
          </li>
          <li>
            <input
              type="password"
              placeholder="Set New Password"
              name="password"
            />
          </li>
          <li>
            <input type="text" placeholder="Re Enter Password" />
          </li>
          <button
            type="button"
            ref={saveInfoRef}
            className="send-otp-btn save-info-btn"
            onClick={saveInfoHandler}
          >
            Save
          </button>
        </ul>
      </center>
    </form>
  );
}
