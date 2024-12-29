import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

// Import images
import mood1 from '../images/mood1.jpg';
import mood2 from '../images/mood2.jpg';
import mood3 from '../images/mood3.jpg';
import mood4 from '../images/mood4.jpg';
import aiStylists from '../images/ai_stylists.gif';
import recommendations from '../images/recommendations.gif';
import reginald from '../images/reginald.png';
import eliza from '../images/eliza.png';
import lilia from '../images/lilia.png';
import subhrajit from '../images/subhrajit.jpg';
import ji from '../images/ji.jpg';
import dhairya from '../images/dhairya.jpg';


function Landing() {
  const [currentBoard, setCurrentBoard] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const moodBoards = [mood1, mood2, mood3, mood4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBoard((prev) => (prev + 1) % moodBoards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="landing">
      {/* Mood Board Container */}
      <div className="mood-board-container" aria-hidden="true">
        {moodBoards.map((src, index) => (
          <img
            key={index}
            src={src}
            alt=""
            className={`mood-board ${index === currentBoard ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="overlay" aria-hidden="true"></div>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Navigation */}
        <nav className="nav-wrapper">
          <div className="nav-content">
            <Link to="/" className="fashay">fashay</Link>
            
            <div className="nav-links">
              <a href="#features" className="nav-link">Features</a>
              <a href="#about" className="nav-link">Demo</a>
              <a href="#stylists" className="nav-link">Our Stylists</a>
              <a href="#team" className="nav-link">Team</a>
              
              <Link to="/login" className="btn-primary">
                Sign Up / Login
              </Link>
            </div>

            <button
              className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="menu-content">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">Demo</a>
            <a href="#stylists" className="nav-link">Our Stylists</a>
            <a href="#team" className="nav-link">Team</a>
            <Link to="/login" className="btn-primary">Login</Link>
          </div>
        </div>

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <section className="hero-section">
            <div className="mood-board-container" aria-hidden="true">
              {moodBoards.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt=""
                  className={`mood-board ${index === currentBoard ? 'active' : ''}`}
                />
              ))}
            </div>
            <div className="overlay"></div>
            <div className="section-content">
              <h1 className="hero-title">
                Style Smarter 
                <span>with</span> 
                <span>AI Stylists</span>
              </h1>

              <Link to="/login" className="btn-primary button-shine">
                Try Fashay Free
                <span className="arrow" aria-hidden="true">→</span>
              </Link>

              {/* Feature Tags */}
              <div className="feature-tags">
                <FeatureTag emoji="⚡" text="AI-Powered Styling" />
                <FeatureTag emoji="👔" text="Professional Insights" />
                <FeatureTag emoji="✨" text="Personalized Recommendations" />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="features-section">
            <div className="section-content">
              <h2>Why Choose Fashay?</h2>
              <p>Experience the future of fashion with our cutting-edge AI technology</p>
              
              <div className="features-grid">
                <FeatureCard
                  letter="a"
                  title="AI Stylists"
                  description="Personalized Guidance from AI Clones of Professional Stylists"
                />
                <FeatureCard
                  letter="s"
                  title="Smart Wardrobe"
                  description="Upload your existing clothes and get intelligent outfit combinations"
                />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="about-section">
            <div className="section-content">
              <h2>Democratizing Fashion with AI</h2>
              <p>Fashay combines artificial intelligence with insights from top stylists 
                 to make professional fashion guidance accessible to everyone.</p>
              
              <div className="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/780m2UvgGSE?autoplay=0&rel=0&modestbranding=1"
                  title="Fashay Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </section>

          {/* Stylists Section */}
          <section id="stylists" className="stylists-section">
            <div className="section-content">
              <h2>Our Fashion Experts</h2>
              <div className="stylists-grid">
                <StylistCard
                  name="Reginald Ferguson"
                  role="Fashion Geek & Style Consultant"
                  image={reginald}
                  link="https://www.nyfashiongeek.com/"
                />
                <StylistCard
                  name="Eliza Parilla"
                  role="Wardrobe Specialist"
                  image={eliza}
                  link="https://wardrobeboss.com/about"
                />
                <StylistCard
                  name="Lilia Dolinsky"
                  role="Fashion Stylist & Trend Expert"
                  image={lilia}
                  link="https://www.instagram.com/liliadolinsky"
                />
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section id="team" className="team-section">
            <div className="section-content">
              <h2>Meet the Team</h2>
              <div className="team-grid">
                <TeamMemberCard
                  name="Subhrajit Dey"
                  role="Chief Executive Officer"
                  image={subhrajit}
                  description="MSCS student at NYU specializing in AI, Computer Vision, and LLMs"
                  email="sd5963@nyu.edu"
                  linkedin="https://www.linkedin.com/in/subhrajitdey1206/"
                />
                <TeamMemberCard
                  name="Ji Seong Han"
                  role="Chief Operational Officer"
                  image={ji}
                  description="Digital designer and product manager with 10+ years of experience"
                  email="hello.uxdot@gmail.com"
                  linkedin="https://www.linkedin.com/in/greenji/"
                />
                <TeamMemberCard
                  name="Dhairyasheel Patil"
                  role="Chief Technology Officer"
                  image={dhairya}
                  description="MSCS student at NYU with expertise in Generative AI and ML"
                  email="dp3979@nyu.edu"
                  linkedin="https://www.linkedin.com/in/dhairyasheel-patil-1013b199/"
                />
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Floating Action Button */}
      <button className="fab" aria-label="Add new item">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
      </button>
    </div>
  );
}

function FeatureTag({ emoji, text }) {
  return (
    <div className="feature-tag">
      <span className="emoji" aria-hidden="true">{emoji}</span>
      {text}
    </div>
  );
}

function FeatureCard({ title, description, letter }) {
  return (
    <div className="feature-card">
      <div className="letter-icon">{letter}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function StylistCard({ name, role, image, link }) {
  return (
    <div className="stylist-card">
      <div className="image-container">
        <img src={image} alt={name} />
      </div>
      <h3>{name}</h3>
      <p>{role}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="website-link">
        Visit Website
        <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </a>
    </div>
  );
}

function TeamMemberCard({ name, role, image, description, email, linkedin }) {
  return (
    <div className="team-card">
      <div className="image-container">
        <img src={image} alt={name} />
      </div>
      <div className="content">
        <h3>{name}</h3>
        <p className="role">{role}</p>
        <p className="description">{description}</p>
        <div className="social-links">
          <a href={`mailto:${email}`} className="social-link email" aria-label={`Email ${name}`}>
            <svg className="icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin" aria-label={`${name}'s LinkedIn`}>
            <svg className="icon" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Landing;
