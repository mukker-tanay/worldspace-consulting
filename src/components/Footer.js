import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-col">
            <h3>Worldspace Consulting</h3>
            <p>
              Your trusted partner for HR and Talent Acquisition. Strengthening business performance and reputation through expert people management.
            </p>
          </div>
          
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/services">Services</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Contact Info</h3>
            <ul className="footer-links">
              <li>
                <i className="fas fa-map-marker-alt"></i> 10 Nilgiri, Indermohan Bhardwaj Marg, Alaknanda, New Delhi - 110019
              </li>
              <li>
                <i className="fas fa-envelope"></i> info@worldspace.net.in
              </li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Follow Us</h3>
            <div className="team-social">
              <a href="https://www.linkedin.com/company/worldspace-consulting" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Worldspace Consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
