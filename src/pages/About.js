import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";
import aboutMainImage from "../images/about main.png";

function About() {
  const [isVisible, setIsVisible] = useState({
    story: true,
    values: true,
    timeline: true,
    team: true,
    cta: false
  });
  
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);
  const teamRef = useRef(null);
  const ctaRef = useRef(null);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === storyRef.current) {
            setIsVisible(prev => ({ ...prev, story: true }));
          } else if (entry.target === valuesRef.current) {
            setIsVisible(prev => ({ ...prev, values: true }));
          } else if (entry.target === timelineRef.current) {
            setIsVisible(prev => ({ ...prev, timeline: true }));
          } else if (entry.target === teamRef.current) {
            setIsVisible(prev => ({ ...prev, team: true }));
          } else if (entry.target === ctaRef.current) {
            setIsVisible(prev => ({ ...prev, cta: true }));
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (storyRef.current) observer.observe(storyRef.current);
    if (valuesRef.current) observer.observe(valuesRef.current);
    if (timelineRef.current) observer.observe(timelineRef.current);
    if (teamRef.current) observer.observe(teamRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    
    return () => {
      if (storyRef.current) observer.unobserve(storyRef.current);
      if (valuesRef.current) observer.unobserve(valuesRef.current);
      if (timelineRef.current) observer.unobserve(timelineRef.current);
      if (teamRef.current) observer.unobserve(teamRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  // Founder data
  const founder = { 
    name: "Arvind Mukker", 
    role: "Founder & CEO", 
    img: "/images/arvind.jpg", 
    bio: "With over 14 years of startup hiring experience and more than 700 CXO hires, Arvind has developed unparalleled expertise in helping founders build exceptional leadership teams.",
    linkedin: "https://www.linkedin.com/in/arvindmukker/"
  };

  // Timeline data
  const timeline = [
    {
      year: "2011",
      title: "Worldspace Search Founded",
      description: "Founded with a focus on mid-management hiring across FMCG, Dairy, Consumer Durables, and Telecom sectors."
    },
    {
      year: "2012",
      title: "Introduction of Recruitment Automation",
      description: "Launched recruitment automation and parsing software to enhance client and candidate relationship management."
    },
    {
      year: "2013",
      title: "Top Performing Partner",
      description: "Recognized as the top-performing partner for Bharti Airtel, Samsung, Vodafone Idea, and Mother Dairy. Became one of the most searched and advertised recruitment agencies."
    },
    {
      year: "2014",
      title: "Talent Acquisition Solutions",
      description: "Implemented talent acquisition solutions for over 60 SME consulting companies, streamlining recruitment processes."
    },
    {
      year: "2015",
      title: "Executive Search & International Hiring",
      description: "Focused exclusively on executive search and international hiring. Successfully closed 25+ leadership mandates, including assignments in the US, UK, and SEA markets."
    },
    {
      year: "2017",
      title: "Consolidation & Growth",
      description: "Expanded expertise and strengthened operations, delivering executive search solutions to key clients while refining internal processes."
    },
    {
      year: "2018",
      title: "Strategic Hiatus",
      description: "A planned pause to evaluate market trends, enhance industry knowledge, and prepare for the next growth phase."
    },
    {
      year: "2025",
      title: "Rebuilding as Worldspace Consulting",
      description: "Rebranded as Worldspace Consulting, focusing on executive search, competition benchmarking, campus engagement, and recruitment process outsourcing (RPO)."
    }
  ];


  // Values data
  const values = [
    {
      icon: "fas fa-handshake",
      title: "Integrity",
      description: "We operate with complete transparency and honesty, building trust with both clients and candidates."
    },
    {
      icon: "fas fa-user-check",
      title: "Quality",
      description: "We're committed to excellence, focusing on quality matches rather than quantity of placements."
    },
    {
      icon: "fas fa-lightbulb",
      title: "Innovation",
      description: "We continuously adapt our approach to stay ahead of evolving talent acquisition challenges."
    },
    {
      icon: "fas fa-users",
      title: "Partnership",
      description: "We build long-term relationships, becoming an extension of your team rather than just a service provider."
    }
  ];

  return (
    <div className="about">
      {/* About Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content animate-fade-in">
          <h1>About Us</h1>
          <p>
            Get to know the team behind Worldspace Consulting and our journey to become 
            India's leading HR consultancy firm.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="story-section" ref={storyRef}>
        <div className="container">
          <div className="section-title">
            <h2>Our Story</h2>
          </div>
          <div className="story-grid">
            <div className={`story-text ${isVisible.story ? 'animate-slide-right' : ''}`}>
              <p>
                Worldspace Consulting helps businesses strengthen performance and reputation by managing critical HR and Talent Acquisition processes. We partner with clients to deliver efficient, people-focused solutions that drive growth and success.
              </p>
              <p>
                Our founder, <span className="story-highlight">Arvind Mukker</span>, having spent over two decades in corporate HR leadership roles, 
                saw an opportunity to create a consultancy that truly understood both sides of the hiring equation.
              </p>
              <p>
                We value commitment, confidentiality, and speed of execution. By combining expertise with a solution-driven approach, we identify the right talent, deliver within timelines, and create lasting value for our clients and candidates alike.
              </p>
            </div>
            <div className={`story-image ${isVisible.story ? 'animate-slide-left' : ''}`}>
              <img 
                src={aboutMainImage} 
                alt="Worldspace Consulting Office"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="values-section" ref={valuesRef}>
        <div className="container">
          <div className="section-title">
            <h2>Our Values</h2>
            <p className="section-subtitle">
              These core principles guide everything we do at Worldspace Consulting
            </p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={`value-card ${isVisible.values ? 'animate-slide-up' : ''}`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="value-icon">
                  <i className={value.icon}></i>
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section" ref={timelineRef}>
        <div className="container">
          <div className="section-title">
            <h2>Our Journey</h2>
          </div>
          <div className="timeline-container">
            {timeline.map((item, index) => (
              <div 
                key={index} 
                className={`timeline-item ${isVisible.timeline ? 'animate-slide-up' : ''}`}
                style={{animationDelay: `${index * 0.15}s`}}
              >
                <div className="timeline-dot">{item.year.slice(2)}</div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder-section" ref={teamRef}>
        <div className="container">
          <div className="section-title">
            <h2>Our Founder</h2>
            <p className="section-subtitle">
              Meet the visionary behind Worldspace Consulting
            </p>
          </div>
          <div className="founder-container">
            <div className={`founder-content ${isVisible.team ? 'animate-fade-in' : ''}`}>
              <div className="section-title-container">
                <h3 className="founder-title">Arvind Mukker<br/> Founder & CEO</h3>
              </div>
              <div className="founder-description">
                <p>
                  Arvind is an HR professional with 20+ years’ experience Heading HR Consulting business including HR Shared Services, Temporary Staffing, Mid-Management Hiring, Executive Search & Campus Hiring. His Core competency lies in Executive Search, Talent Mapping, Headhunting, Outplacements & HR-Tech implementation.
                </p>
                <p>
                  In his last Job stint, Arvind was Heading HR for an FMCG Company, He has worked in multiple Ecommerce companies as an Head of Talent Acquisition and led Talent Teams in Tier 1 Temporary Staffing & Executive Search Firms.
                </p>
                <p>
                  Arvind began his entrepreneurial journey in 2011 with Worldspace Search, later rebranding it as Worldspace Consulting. Today, he partners with organizations on Leadership Hiring, Campus Recruitment, and Talent Acquisition COEs.
                </p>
              </div>
            </div>
            <div className={`founder-image ${isVisible.team ? 'animate-fade-in' : ''}`}>
              <div className="founder-image-container">
                <img 
                  src="/images/arvind.jpg" 
                  alt="Arvind Mukker, Founder & CEO"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x800?text=Arvind+Mukker";
                  }}
                />
                <div className="founder-social-buttons">
                  <a href="https://www.linkedin.com/in/arvindmukker/" className="founder-social-button linkedin" aria-label="LinkedIn Profile">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="mailto:arvind@worldspace.net.in" className="founder-social-button email" aria-label="Email Arvind">
                    <i className="far fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
