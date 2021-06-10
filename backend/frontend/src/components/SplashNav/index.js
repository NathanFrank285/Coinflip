import React from 'react';
import { useDispatch } from "react-redux"
import { NavLink, useHistory } from 'react-router-dom';
import { login } from "../../store/session"
import YellowLogo from "../../images/YellowLogo.png";
import "./splashNav.css"

const SplashNav = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const loginDemoUser = async () => {
    await dispatch(login('demo@aa.io', 'password'))
    history.push("/portfolio")
  }

  return (
    <div className="splash-nav">
      <NavLink to="/" className="nav-home" exact={true} activeClassName="active">
        <img className='nav-logo' src={YellowLogo} alt='logo' />
      </NavLink>
      <div className="button-container">
        <button className="demo-btn" onClick={loginDemoUser}>
          Demo
        </button>
        <NavLink className="splash-btns" to='/login'>Login</NavLink>
        <NavLink className="splash-btns" to='/signUp'>Sign Up</NavLink>
      </div>
    </div>
  );
}

export default SplashNav;
