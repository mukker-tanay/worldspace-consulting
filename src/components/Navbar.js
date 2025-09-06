import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css"; // Import custom navbar styles

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're on the homepage
      const isHomepage = location.pathname === '/';
      
      if (isHomepage) {
        // Show navbar after scrolling past 80vh on homepage
        if (window.scrollY > window.innerHeight * 0.5) {
          setIsVisible(true);
          setIsScrolled(true);
        } else {
          setIsVisible(false);
          setIsScrolled(false);
        }
      } else {
        // On other pages, always show navbar but apply scrolled styling
        setIsVisible(true);
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    // Set initial state
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Close menu when location changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Check if route is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""} ${isVisible ? "navbar-visible" : "navbar-hidden"}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <img 
            src={require("../images/logo Jpeg.png")} 
            alt="Worldspace Logo"
            className="navbar-logo" 
          />
          <span className="brand-text">Worldspace Consulting</span>
        </Link>
        
        <button 
          className="navbar-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </button>
        
        <ul className={`navbar-nav ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              style={{ color: "#094089", fontWeight: "600" }}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${isActive("/about") ? "active" : ""}`}
              style={{ color: "#094089", fontWeight: "600" }}
            >
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/services" 
              className={`nav-link ${isActive("/services") ? "active" : ""}`}
              style={{ color: "#094089", fontWeight: "600" }}
            >
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/contact" 
              className={`nav-link ${isActive("/contact") ? "active" : ""}`}
              style={{ color: "#094089", fontWeight: "600" }}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
