import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from '../Searchbar'
import DarkLogo from "../../images/DarkLogo.png";
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="nav-container">
      <div className="nav-flex-container">
        <div className='nav-logo-container'>
          <NavLink to="/portfolio" className="nav-home" exact={true} activeClassName="active">
            <img className='nav-logo' src={DarkLogo} alt='logo' />
          </NavLink>
        </div>
        <div>
          <SearchBar />
        </div>
        <div className='nav-link-container'>
          <NavLink to="/coinBrowser" className="nav-link" exact={true} activeClassName="active">Coin Browser</NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
