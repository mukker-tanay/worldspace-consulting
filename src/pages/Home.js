import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const [isVisible, setIsVisible] = useState({
    services: false,
    testimonials: false,
    stats: false,
    cta: false
  });
  
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const statsSectionRef = useRef(null);
  
  // Function to handle smooth scrolling
  const scrollToStats = () => {
    if (statsSectionRef.current) {
      statsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === servicesRef.current) {
            setIsVisible(prev => ({ ...prev, services: true }));
          } else if (entry.target === testimonialsRef.current) {
            setIsVisible(prev => ({ ...prev, testimonials: true }));
          } else if (entry.target === statsRef.current) {
            setIsVisible(prev => ({ ...prev, stats: true }));
          } else if (entry.target === ctaRef.current) {
            setIsVisible(prev => ({ ...prev, cta: true }));
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (servicesRef.current) observer.observe(servicesRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    
    return () => {
      if (servicesRef.current) observer.unobserve(servicesRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
      if (statsRef.current) observer.unobserve(statsRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  // Services data
  const services = [
    {
      icon: "fas fa-user-tie",
      title: "Confidential CXOs Search",
      description: "Discreet identification of visionary CXOs who can steer organizations toward long-term success."
    },
    {
      icon: "fas fa-building",
      title: "Contingent Mid Management",
      description: "Agile recruitment solutions designed for mid-level leadership roles critical to operational performance and growth."
    },
    {
      icon: "fas fa-chart-line",
      title: "Competition Mapping",
      description: "Actionable intelligence on competitor's structures, talent strategies, and leadership patterns."
    },
    {
      icon: "fas fa-balance-scale",
      title: "Compensation Benchmarking",
      description: "Precise market insights to help organizations build competitive pay frameworks."
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "Worldspace Consulting helped us identify and secure the right talent quickly. Their market insight and proactive approach made the hiring process effective.",
      author: "Devya Bhatnagar",
      position: "TA Lead, Bharti Airtel",
      image: "/images/testimonial1.jpg"
    },
    {
      quote: "Worldspace Consulting goes beyond resumes and job descriptions, uncovering the deeper qualities that matter most for mid and senior-level hiring.",
      author: "Suvro Rachaudhuri",
      position: "AVP HR, Parkway Pantai",
      image: "/images/testimonial2.jpg"
    },
    {
      quote: "Worldspace Consulting has been a trusted partner for years, offering clear vision, adaptability, and strong market understanding to consistently meet our hiring needs.",
      author: "Anyuta Dhir",
      position: "Director HR, Veolia",
      image: "/images/testimonial3.jpg"
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section 
        className="hero-section fullscreen-hero"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero_banner.svg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative' // Add position relative to properly position the scroll indicator
        }}
      >
        {/* Removed hero-overlay div completely */}
        <div className="hero-content animate-fadeIn" style={{ textShadow: '0px 1px 3px rgba(0,0,0,0.6)' }}>
          {/* Hero content here */}
        </div>
        <div className="scroll-indicator" onClick={scrollToStats}>
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={el => { statsRef.current = el; statsSectionRef.current = el; }}>
        <div className="container">
          <div className="section-title">
            <h2>Our Impact</h2>
            <p className="section-subtitle">
              With a proven track record of success, we've helped numerous organizations
              find and retain top talent across industries.
            </p>
          </div>
          <div className="stats-grid">
            <div className={`stat-card ${isVisible.stats ? 'animate-fadeIn' : ''}`} style={{animationDelay: '0.1s'}}>
              <div className="stat-content">
                <div className="stat-text">
                  <h3 className="stat-value">300+</h3>
                  <h4 className="stat-label">Successful<br/>Hires</h4>
                </div>
              </div>
            </div>
            
            <div className={`stat-card ${isVisible.stats ? 'animate-fadeIn' : ''}`} style={{animationDelay: '0.2s'}}>
              <div className="stat-content">
                <div className="stat-text">
                  <h3 className="stat-value">20+</h3>
                  <h4 className="stat-label">Client<br/>Partners</h4>
                </div>
              </div>
            </div>
            
            <div className={`stat-card ${isVisible.stats ? 'animate-fadeIn' : ''}`} style={{animationDelay: '0.3s'}}>
              <div className="stat-content">
                <div className="stat-text">
                  <h3 className="stat-value">95%</h3>
                  <h4 className="stat-label">Retention<br/>Rate</h4>
                </div>
              </div>
            </div>
            
            <div className={`stat-card ${isVisible.stats ? 'animate-fadeIn' : ''}`} style={{animationDelay: '0.4s'}}>
              <div className="stat-content">
                <div className="stat-text">
                  <h3 className="stat-value">10+</h3>
                  <br/>
                  <h4 className="stat-label">Years of Experience</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" ref={servicesRef}>
        <div className="container">
          <div className="section-title">
            <h2>What Do We Offer</h2>
            <p className="section-subtitle">
              We offer comprehensive HR solutions tailored to meet your organization's unique needs
            </p>
          </div>
          
          <div className="service-grid">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-card"
              >
                <div className="service-header">
                  <div className="service-icon">
                    <i className={service.icon}></i>
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                </div>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/services" className="services-cta-button">
              View All Services <i className="fas fa-arrow-right" style={{ marginLeft: "0.5rem" }}></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" ref={testimonialsRef}>
        <div className="container">
          <div className="section-title">
            <h2>What Our Clients Say</h2>
            <p className="section-subtitle">
              Don't just take our word for it <br /> Hear what our clients have to say about our services
            </p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`testimonial-card ${isVisible.testimonials ? 'animate-slideInUp' : ''}`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="testimonial-quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="testimonial-text">
                  {testimonial.quote}
                </p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author)}&background=2d46b9&color=fff&size=50`;
                      }}
                    />
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default Home;