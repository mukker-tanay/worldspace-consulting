import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/services.css";
import "../styles/candidate-services.css";

function Services() {
  // State for active service tab
  const [activeTab, setActiveTab] = useState("cxos-search");
  // State for animation
  const [isVisible, setIsVisible] = useState({
    "stats-section": true,
    "services-title": true,
    "process-section": true,
    "industries-section": true,
    "candidate-services-section": true
  });
  // Refs for intersection observer
  const sectionRefs = useRef([]);

  // Intersection Observer setup
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section refs
    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    // Add specific observer for stats section
    const statsSection = document.getElementById('stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => {
      sectionRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
      if (statsSection) observer.unobserve(statsSection);
    };
  }, []);
  // Detailed services data
  const services = [
    {
      id: "cxos-search",
      icon: "fas fa-user-tie",
      title: "Confidential CXOs Search",
      description: "Discreet identification of visionary CXOs who can steer organizations toward long-term success.",
      detailedDescription: "Our confidential CXO search service ensures absolute privacy while targeting highly accomplished leaders. We leverage discreet networks, precise market insights, and rigorous evaluation processes to deliver executives who align with both strategic vision and cultural values.",
      features: [
        "Strict confidentiality for sensitive leadership movements",
        "Tailored search strategy for C-Suite hiring",
        "Rigorous evaluation and leadership competency assessments",
        "Deep industry connections across multiple sectors",
        "Seamless onboarding and post-hire support"
      ],
      stats: [
        { value: "96%", label: "Success Rate", description: "Our CXOs successfully lead transformational initiatives." },
        { value: "30 Days", label: "Average Time", description: "From engagement to shortlist presentation" }
      ],
      color: "#4e73df"
    },
    {
      id: "mid-management",
      icon: "fas fa-building",
      title: "Contingent Mid Management",
      description: "Agile recruitment solutions designed for mid-level leadership roles critical to operational performance and growth.",
      detailedDescription: "The contingent model ensures quick access to high-performing professionals without long-term commitments. Each placement is focused on striking the right balance between expertise, adaptability, and cultural fit.",
      features: [
        "Flexible hiring model for evolving business needs",
        "Access to a diverse pool of experienced professionals",
        "Strong focus on skill alignment and performance potential",
        "Comprehensive evaluations and reference validation",
        "Scalable recruitment tailored to organizational growth"
      ],
      stats: [
        { value: "500+", label: "Placements", description: "Successful placements in the last year" },
        { value: "92%", label: "Retention Rate", description: "Candidates remaining with clients beyond 1 year" }
      ],
      color: "#1cc88a"
    },
    {
      id: "competition-mapping",
      icon: "fas fa-chart-line",
      title: "Competition Mapping",
      description: "Actionable intelligence on competitors’ structures, talent strategies, and leadership patterns.",
      detailedDescription: "Competition mapping provides a clear perspective on how an organization compares to its peers. Reports are designed to strengthen workforce planning and support proactive talent strategies.",
      features: [
        "Mapping of leadership hierarchies and organizational structures",
        "Insights into succession planning and hiring trends",
        "Compensation comparisons across roles and sectors",
        "Customized, sector-specific reports",
        "Data-driven recommendations for strategic decision-making"
      ],
      stats: [
        { value: "100+", label: "Industry Reports", description: "Delivered across multiple sectors" },
        { value: "3 Weeks", label: "Average Time", description: "For a complete competitor analysis" }
      ],
      color: "#36b9cc"
    },
    {
      id: "compensation-benchmarking",
      icon: "fas fa-balance-scale",
      title: "Compensation Benchmarking",
      description: "Precise market insights to help organizations build competitive pay frameworks.",
      detailedDescription: "Benchmarking integrates validated industry data and market comparisons to ensure compensation structures are both attractive and equitable. Recommendations focus on balancing competitiveness with long-term retention.",
      features: [
        "Detailed analysis of salaries, benefits, and incentives",
        "Role-specific and sector-focused benchmarking",
        "Recommendations aligned with organizational objectives",
        "Support in developing transparent pay structures",
        "Retention strategies through competitive compensation models"
      ],
      stats: [
        { value: "92%", label: "Accuracy Rate", description: "Based on validated, multi-source compensation data" },
        { value: "10 Days", label: "Average Time", description: "To deliver customized reports" }
      ],
      color: "#e02360"
    },
    {
      id: "campus-outreach",
      icon: "fas fa-graduation-cap",
      title: "Campus Outreach",
      description: "Direct access to emerging talent from leading academic institutions.",
      detailedDescription: "Campus programs strengthen employer branding while creating a pipeline of graduates and postgraduates with strong technical and leadership potential. Engagement strategies are designed to connect organizations with the right young professionals.",
      features: [
        "Structured campus recruitment campaigns",
        "Engagement activities including workshops, talks, and competitions",
        "Screening and assessment tailored to fresh talent",
        "Access to premier institutes and diverse talent pools",
        "Employer branding initiatives to attract top graduates"
      ],
      stats: [
        { value: "500+", label: "Students Placed", description: "Through structured campus hiring drives" },
        { value: "7 Days", label: "Average Time", description: "From planning to on-campus engagement" }
      ],
      color: "#e74a3b"
    },
  ];

  // Our process steps
  const processSteps = [
    {
      icon: "fas fa-comments",
      title: "Consultation",
      description: "We begin with a thorough consultation to understand your organization's unique needs, culture, and objectives.",
      color: "#4e73df"
    },
    {
      icon: "fas fa-sitemap",
      title: "Strategy Development",
      description: "Our team develops a customized talent strategy aligned with your business goals and requirements.",
      color: "#1cc88a"
    },
    {
      icon: "fas fa-search",
      title: "Talent Search",
      description: "We implement our strategy using advanced sourcing techniques and our extensive professional network.",
      color: "#36b9cc"
    },
    {
      icon: "fas fa-user-check",
      title: "Evaluation & Selection",
      description: "Candidates are thoroughly assessed through our comprehensive evaluation process.",
      color: "#f6c23e"
    },
    {
      icon: "fas fa-handshake",
      title: "Successful Placement",
      description: "We facilitate the hiring process and ensure a smooth transition for both parties.",
      color: "#e74a3b"
    },
    {
      icon: "fas fa-chart-line",
      title: "Ongoing Support",
      description: "Our relationship continues with follow-up support to ensure long-term success.",
      color: "#4e73df"
    }
  ];

  // Custom Counter component for stats
  const Counter = ({ end, suffix = "+", duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const stepTime = Math.abs(Math.floor(duration / end));
    
    useEffect(() => {
      let timer;
      if (count < end) {
        timer = setTimeout(() => {
          setCount(prev => prev + 1);
        }, stepTime);
      }
      return () => clearTimeout(timer);
    }, [count, end, stepTime]);
    
    return <>{count}{suffix}</>;
  };

  // Stats for the counter section
  const stats = [
    { value: 500, label: "Successful Placements", icon: "fas fa-user-tie", suffix: "+" },
    { value: 95, label: "Retention Rate", icon: "fas fa-chart-line", suffix: "%" },
    { value: 50, label: "Client Partners", icon: "fas fa-handshake", suffix: "+" },
    { value: 10, label: "Years of Experience", icon: "fas fa-calendar-alt", suffix: "+" }
  ];
  
  // Industries we serve
  const industries = [
    { 
      name: "Technology & IT", 
      icon: "fas fa-laptop-code",
      description: "Supporting tech companies from startups to enterprise level organizations"
    },
    { 
      name: "Financial Services", 
      icon: "fas fa-chart-pie",
      description: "Servicing banks, insurance companies, and fintech innovators"
    },
    { 
      name: "Healthcare & Life Sciences", 
      icon: "fas fa-heartbeat",
      description: "Partnering with hospitals, pharmaceutical companies, and healthcare technology firms"
    },
    { 
      name: "Manufacturing", 
      icon: "fas fa-industry",
      description: "Serving traditional and advanced manufacturing organizations"
    },
    { 
      name: "Retail & Consumer", 
      icon: "fas fa-shopping-cart",
      description: "Supporting retail chains, consumer goods companies, and e-commerce businesses"
    },
    { 
      name: "Professional Services", 
      icon: "fas fa-briefcase",
      description: "Partnering with consulting firms, law practices, and other service providers"
    },
    { 
      name: "E-commerce, Internet & EdTech", 
      icon: "fas fa-globe",
      description: "Empowering digital-first businesses, online marketplaces, and education technology platforms"
    },
    { 
      name: "FMCG, Consumer Durables & Retail", 
      icon: "fas fa-box-open",
      description: "Partnering with fast-moving consumer goods, consumer durable brands, and retail leaders"
    },
    { 
      name: "Engineering & Infrastructure", 
      icon: "fas fa-hard-hat",
      description: "Supporting large-scale engineering projects, infrastructure development, and construction firms"
    },
    { 
      name: "IT Services & Product", 
      icon: "fas fa-server",
      description: "Serving both IT service providers and product-based technology companies"
    },
    { 
      name: "Banking, FinTech & Media", 
      icon: "fas fa-landmark",
      description: "Connecting talent across traditional banking, fintech innovators, and digital media platforms"
    },
    { 
      name: "Telecom & DTH", 
      icon: "fas fa-broadcast-tower",
      description: "Enabling telecom networks, infrastructure providers, and direct-to-home service companies"
    }
  ];


  return (
    <div className="services-page">
      

      

      {/* Services Overview with Tabs */}
      <section id="services-overview" className="section">
        <div className="container">
          
            <div className="section-title" ref={el => sectionRefs.current[0] = el} id="services-title">
              <h2 className={isVisible["services-title"] ? "animate-slideUp" : ""}>Our Services</h2>
            </div>
            <p className="section-subtitle">
              We provide end-to-end talent solutions tailored to meet the unique needs of your organization
            </p>
          
          {/* Service Tabs */}
          <div className="service-tabs">
            <div className="tabs-navigation">
              {services.map((service) => (
                <button 
                  key={service.id}
                  className={`tab-button ${activeTab === service.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(service.id)}
                  style={activeTab === service.id ? {borderColor: service.color} : {}}
                >
                  <i className={service.icon}></i>
                  <span>{service.title}</span>
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="tab-content">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className={`tab-pane ${activeTab === service.id ? 'active' : ''}`}
                >
                  <div className="tab-header" style={{background: `linear-gradient(135deg, ${service.color}, ${service.color}80)`}}>
                    <div className="tab-icon">
                      <i className={service.icon}></i>
                    </div>
                    <div className="tab-title">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="tab-body">
                    <p>{service.detailedDescription}</p>
                    
                    <div className="service-stats">
                      {service.stats.map((stat, idx) => (
                        <div key={idx} className="service-stat-card">
                          <h4>{stat.value}</h4>
                          <p className="stat-title">{stat.label}</p>
                          <p className="stat-desc">{stat.description}</p>
                        </div>
                      ))}
                    </div>
                    
                    <h4>Key Features:</h4>
                    <ul className="feature-list">
                      {service.features.map((feature, idx) => (
                        <li key={idx}>
                          <i className="fas fa-check-circle" style={{color: service.color}}></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Services */}
      <section className="candidate-services-section section" ref={el => sectionRefs.current[9] = el} id="candidate-services-section">
        <div className="container">
          <div className="section-title">
            <h2 className={isVisible["candidate-services-section"] ? "animate-slideUp" : ""}>Candidate Services</h2>
          </div>
          <p className="section-subtitle">
            We offer comprehensive career advancement services to help professionals achieve their career goals
          </p>
          
          <div className="candidate-services-list">
            <div className={`candidate-service ${isVisible["candidate-services-section"] ? "animate-fadeIn" : ""}`} style={{animationDelay: '0.1s'}}>
              <div className="service-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <div className="service-content">
                <h3>Candidate Consulting</h3>
                <p>Personalized career guidance and job search strategies tailored to your professional goals and aspirations. Our experienced consultants provide insights on industry trends, potential career paths, and development opportunities.</p>
              </div>
            </div>
            
            <div className={`candidate-service ${isVisible["candidate-services-section"] ? "animate-fadeIn" : ""}`} style={{animationDelay: '0.2s'}}>
              <div className="service-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <div className="service-content">
                <h3>Resume Writing</h3>
                <p>Professional resume development services that highlight your strengths, achievements, and potential. Our expert writers craft compelling, ATS-optimized resumes that increase your visibility to recruiters and hiring managers.</p>
              </div>
            </div>
            
            <div className={`candidate-service ${isVisible["candidate-services-section"] ? "animate-fadeIn" : ""}`} style={{animationDelay: '0.3s'}}>
              <div className="service-icon">
                <i className="fas fa-door-open"></i>
              </div>
              <div className="service-content">
                <h3>Outplacement</h3>
                <p>Comprehensive transition support for professionals experiencing career changes. We provide guidance on job search techniques, interview preparation, networking strategies, and emotional support throughout your career transition.</p>
              </div>
            </div>
            
            <div className={`candidate-service ${isVisible["candidate-services-section"] ? "animate-fadeIn" : ""}`} style={{animationDelay: '0.4s'}}>
              <div className="service-icon">
                <i className="fas fa-arrow-up"></i>
              </div>
              <div className="service-content">
                <h3>Premium Career Upgradation Services</h3>
                <p>Exclusive services designed to accelerate your career growth and secure premium opportunities. This includes executive coaching, personal branding, leadership development, and strategic positioning for high-value roles in your industry.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="process-section section" ref={el => sectionRefs.current[1] = el} id="process-section">
        <div className="container">
          <div className="section-title">
            <h2 className={isVisible["process-section"] ? "animate-slideUp" : ""}>Our Process</h2>
          </div>
          <p className="section-subtitle">
            We follow a structured approach to ensure successful talent acquisition and HR consulting outcomes
          </p>
          
          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <div 
                key={index} 
                className={`process-step ${isVisible["process-section"] ? "animate-fadeIn" : ""}`} 
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <div className="process-icon" style={{backgroundColor: step.color}}>
                  <i className={step.icon}></i>
                  <span className="step-number">{index + 1}</span>
                </div>
                <div className="process-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Industries We Serve */}
      <section className="industries-section section" ref={el => sectionRefs.current[8] = el} id="industries-section">
        <div className="container">
          <div className="section-title">
            <h2 className={isVisible["industries-section"] ? "animate-slideUp" : ""}>Industries We Serve</h2>
          </div>
          <p className="section-subtitle">
            We have expertise across a wide range of industries, providing specialized talent solutions for each sector
          </p>
          
          <div className="industries-grid">
            {industries.map((industry, index) => (
              <div 
                key={index} 
                className={`industry-card ${isVisible["industries-section"] ? "animate-fadeIn" : ""}`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="industry-icon">
                  <i className={industry.icon}></i>
                </div>
                <h3 className="industry-title">{industry.name}</h3>
                <p className="industry-description">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}

export default Services;
