import React from "react";
import { NavLink } from "react-router-dom";
import './Footer.css'

const Footer = () => {
    return (
      <div className="footer-container">
        <div className="footer-info">
          <div className="footer-name">Baylen Doss</div>
          <a href="https://github.com/baylend123" className="footer-links">
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/baylen-doss-6899541bb/"
            className="footer-links"
          >
            LinkedIn
          </a>
        </div>
        <div className="footer-info">
          <div className="footer-name">Nathan Frank</div>
          <a href="https://github.com/NathanFrank285" className="footer-links">
            Github
          </a>
          <a
            href="https://linkedin.com/in/nathan-frank-8a743568"
            className="footer-links"
          >
            LinkedIn
          </a>
        </div>
        <div className="footer-info">
          <div className="footer-name">Nishi Nelson</div>
          <a href="https://github.com/nishinelson" className="footer-links">
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/naalnishi-nelson-52468720b"
            className="footer-links"
          >
            LinkedIn
          </a>
        </div>
        <div className="footer-info">
          <div className="footer-name">Robert Burroughs</div>
          <a href="https://github.com/ClifDevelops" className="footer-links">
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/robert-burroughs-436300b7/"
            className="footer-links"
          >
            LinkedIn
          </a>
        </div>
      </div>
    );
}

export default Footer;