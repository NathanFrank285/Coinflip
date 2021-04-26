import React from "react";
import LoginForm from "../auth/LoginForm"
import SignUpForm from "../auth/SignUpForm"
import "./splash.css"

const Splash = () => {
  return (
    <div className='splash-body'>
        <div className='splash-title'> Welcome to Coinflip. </div>
        <div className='splash-forms'>
            <div className='splash-login'> <LoginForm /> </div>
            <div className='splash-signup'> <SignUpForm /> </div>
        </div>
    </div>
  );
};

export default Splash;
