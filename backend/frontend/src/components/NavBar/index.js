import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from '../Searchbar'
import YellowLogo from "../../images/YellowLogo.png";
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="nav-container">
      <div className="nav-flex-container">
        <div className='nav-logo-container'>
          <NavLink to="/portfolio" className="nav-home" exact={true} activeClassName="active">
            <img className='nav-logo' src={YellowLogo} alt='logo' />
          </NavLink>
        </div>
        <div className="search">
          <SearchBar />
        </div>
        <div className='nav-link-container'>
          <NavLink to="/coinBrowser" className="nav-link" exact={true} activeClassName="active">Coin Browser</NavLink>
        </div>
        <div className="logout-container">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
