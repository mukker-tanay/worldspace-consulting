import React, { useState } from "react";
import "../styles/contact.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState({ message: "", success: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "", success: false });
    
    try {
      // Determine if we're in development or production
      const isDevelopment = window.location.hostname === "localhost";
      
      // Use different API URLs based on environment
      let apiUrl;
      if (isDevelopment) {
        // Use local PHP server URL for development
        apiUrl = "http://localhost:8000/contact.php";
      } else {
        // Use production URL
        apiUrl = "https://worldspace.net.in/contact.php";
      }
      
      // For development mode, implement a fallback if PHP server isn't running
      if (isDevelopment) {
        try {
          // Test if PHP server is accessible
          const testResponse = await fetch(apiUrl, { 
            method: 'OPTIONS',
            mode: 'cors'
          });
          
          if (!testResponse.ok) {
            throw new Error("PHP server not accessible");
          }
        } catch (err) {
          console.warn("PHP server not accessible, using development fallback");
          // Fallback for development - simulate a successful response
          setTimeout(() => {
            setStatus({
              message: "Your message has been sent successfully! (Development Fallback Mode)",
              success: true
            });
            setFormData({ name: "", email: "", phone: "", company: "", message: "" });
            setIsSubmitting(false);
          }, 1000);
          return; // Exit early - don't try to make the actual API call
        }
      }
      
      // Make the actual API call
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // Add CORS headers for development
          ...(isDevelopment ? { "Origin": "http://localhost:3000" } : {})
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      
      const data = await res.json();
      setStatus({ 
        message: data.message, 
        success: data.success 
      });
      
      // Clear form if submission was successful
      if (data.success) {
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      }
    } catch (err) {
      console.error("Form submission error:", err);
      
      // Check if we're in development mode
      if (window.location.hostname === "localhost") {
        setStatus({
          message: "Network error: " + (err.message || "Please try again later.") + 
                  " - Make sure your PHP server is running at http://localhost:8000 or use the start-dev.bat script.",
          success: false
        });
      } else {
        setStatus({
          message: "Network error: " + (err.message || "Please try again later."),
          success: false
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            Have questions or want to learn more about our services? 
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-container">
            {/* Contact Info */}
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p style={{ marginBottom: "25px" }}>
                We're here to answer any questions you might have about our services.
                Reach out to us using any of the methods below.
              </p>
              
              <div className="contact-detail">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4>Our Office</h4>
                  <p>10 Nilgiri, Indermohan Bhardwaj Marg<br />Alaknanda, New Delhi - 110019<br />India</p>
                </div>
              </div>
              
              <div className="contact-detail">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>info@worldspace.net.in</p>
                </div>
              </div>
              
              {/* Embedded Map */}
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.2972919959093!2d77.24533297617682!3d28.52931248733794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce170eed43e19%3A0xf25a3efdc0a82a29!2sNilgiri%2C%20Alaknanda%2C%20New%20Delhi%2C%20Delhi%20110019!5e0!3m2!1sen!2sin!4v1693666981234!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Worldspace Consulting Office Location"
                ></iframe>
              </div>
              
              <div style={{ textAlign: "center" }}>
                <a 
                  href="https://goo.gl/maps/rQCRJnyzq7vYYrL2A" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  <i className="fas fa-directions"></i>
                  Get Directions
                </a>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="contact-form">
              <h3>Send Us a Message</h3>
              <form onSubmit={handleSubmit} style={{width: '100%', boxSizing: 'border-box'}}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <i className="fas fa-user" style={{marginRight: '8px'}}></i>Your Name
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    value={formData.name}
                    className="form-control"
                    placeholder="John Doe" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <i className="fas fa-envelope" style={{marginRight: '8px'}}></i>Your Email
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    value={formData.email}
                    className="form-control"
                    placeholder="john@example.com" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <i className="fas fa-phone-alt" style={{marginRight: '8px'}}></i>Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone" 
                    value={formData.phone}
                    className="form-control"
                    placeholder="+91 9876543210" 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="company" className="form-label">
                    <i className="fas fa-building" style={{marginRight: '8px'}}></i>Company Name
                  </label>
                  <input 
                    type="text" 
                    id="company"
                    name="company" 
                    value={formData.company}
                    className="form-control"
                    placeholder="Your Company" 
                    onChange={handleChange} 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    <i className="fas fa-comment-alt" style={{marginRight: '8px'}}></i>Your Message
                  </label>
                  <textarea 
                    id="message"
                    name="message" 
                    value={formData.message}
                    className="form-control"
                    placeholder="How can we help you?" 
                    onChange={handleChange} 
                    rows="5"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{marginRight: '8px'}}></i>Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane" style={{marginRight: '8px'}}></i>Send Message
                    </>
                  )}
                </button>
              </form>
              
              {status.message && (
                <div className={`status-message ${status.success ? "success" : "error"}`}>
                  <i className={`fas ${status.success ? "fa-check-circle" : "fa-exclamation-circle"}`}></i>
                  {status.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;