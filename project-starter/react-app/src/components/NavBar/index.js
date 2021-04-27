import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from '../Searchbar'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="nav-container">
      <div>
        <div>
          <NavLink to="/portfolio" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div>
          <SearchBar />
        </div>
        <div>
          <NavLink to="/coinBrowser" exact={true} activeClassName="active">Coin Browser</NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
