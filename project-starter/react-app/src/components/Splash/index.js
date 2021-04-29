import React, { useState } from "react";
import LoginForm from "../auth/LoginForm"
import SignUpForm from "../auth/SignUpForm"
import DarkLogo from "../../images/DarkLogo.png"
import { useDispatch } from "react-redux"
import { login } from "../../store/session"
import "./splash.css"

const Splash = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('demo@aa.io')
  const [password, setPassword] = useState('password')

  const loginDemoUser = async() =>{
    return await dispatch(login(email, password))
  }

  return (
    <div className="splash-body">
      <img className="splash-logo" src={DarkLogo} alt="logo" />
      <img className="splash-logo-2" src={DarkLogo} alt="logo" />
      <div className="splash-title-container">
        <div className="splash-title"> Welcome to Coinflip </div>
        <div className="splash-subtitle">A CryptoTracker</div>
      </div>
      <div className="splash-forms">
        <div className="splash-login">
          <div>
            {" "}
            <LoginForm />{" "}
          </div>
          <div className="splash-demo">
            <div className="demo-label">Demo User Login</div>
            <button className="demo-btn" onClick={loginDemoUser}>
              Demo
            </button>
          </div>
        </div>
        <div className="splash-signup">
          {" "}
          <SignUpForm />{" "}
        </div>
      </div>
    </div>
  );
};

export default Splash;
