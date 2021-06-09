import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import './LogoutButton.css'
import LogoutMan from '../../images/LogoutMan.png'

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <img src={LogoutMan} className='logout-image' alt="logout" onClick={onLogout} />;
};

export default LogoutButton;
