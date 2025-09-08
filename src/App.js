import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import "./App.css";
import "./styles/modern.css";
import "./styles/navbar.css"; // Add navbar styles last to ensure they override other styles

// Import Font Awesome
const FontAwesomeScript = () => {
  useEffect(() => {
    // Add Font Awesome script
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/js/all.min.js";
    script.integrity = "sha512-uKQ39gEGiyUJl4AI6L+ekBdGKpGw4xJ55+xyJG7YFlJokPNYegn9KwQ3P8A7aFQAUtUsAQHep+d/lrGqrbPIDQ==";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // Add Google Fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      // Clean up
      try {
        if (script && document.body.contains(script)) {
          document.body.removeChild(script);
        }
        if (link && document.head.contains(link)) {
          document.head.removeChild(link);
        }
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    };
  }, []);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <FontAwesomeScript />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;