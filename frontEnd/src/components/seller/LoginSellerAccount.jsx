import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSellerAccount } from "../../assets/api/seller/authApi";
export default function LoginSellerAccount() {
  const navigate = useNavigate();
  const [mbl,setMbl]=useState('');
  const [psd,setPsd]=useState('');
  const loginHandler = async () => {
    const response = await loginSellerAccount(mbl, psd);
    if (response.ackbool == 1) {
      navigate("/sellerDashboard");
    }
  };
  const loginBtnRef = useRef(null);
  useEffect(() => {
    if (localStorage.getItem("sToken")) {
      navigate("/sellerDashboard");
    }
    const loginBtn = loginBtnRef.current;
    return () => {
      if (loginBtn) {
        loginBtn.removeEventListener("click", loginHandler);
      }
    };
  }, []);
  return (
    <div className="login-slr-form">
      <span className="material-symbols-outlined user-logo">person</span>
      <div className="userName">
        <span
          className="material-symbols-outlined usernameLogo"
          style={{ fontSize: "2rem" }}
        >
          person
        </span>
        <input type="text" onChange={(e)=>{setMbl(e.target.value)}} placeholder="username" min={10} max={10} />
      </div>
      <div className="password">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "2rem" }}
        >
          lock
        </span>
        <input type="password" onChange={(e)=>{setPsd(e.target.value)}} placeholder="password" />
      </div>
      <section className="login-btn-holder">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "2rem" }}
        >
          {" "}
          login
        </span>
        <button className="login-btn" ref={loginBtnRef} onClick={loginHandler}>
          Login
        </button>
      </section>
    </div>
  );
}
