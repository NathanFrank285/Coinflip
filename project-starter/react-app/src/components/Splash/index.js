import React from "react";
import LoginForm from "../auth/LoginForm"
import SignUpForm from "../auth/SignUpForm"
import DarkLogo from "../../images/DarkLogo.png"
import "./splash.css"

const Splash = () => {
  return (
    <div className='splash-body'>
        
        <img className='splash-logo' src={DarkLogo} alt='logo' />
        
        <div className='splash-title'> Welcome to Coinflip </div>
        <div className='splash-forms'>
            <div className='splash-login'> <LoginForm /> </div>
            <div className='splash-signup'> <SignUpForm /> </div>
        </div>
    </div>
  );
};

export default Splash;
