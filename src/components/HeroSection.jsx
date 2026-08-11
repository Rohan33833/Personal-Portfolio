import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight, ShieldCheck, Terminal, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Hero3DCanvas } from './3d/Hero3DCanvas';

export const HeroSection = ({ onOpenTerminal, isLoaded = true }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % PORTFOLIO_DATA.personal.designations.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleCardMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: '8rem',
        paddingBottom: '4rem',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Interactive 3D WebGL Particle Field Background */}
      <Hero3DCanvas />
      {/* Subtle Background Glow Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 156, 255, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 217, 165, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Information & Bio */}
          <div>
            {/* Grand Name Reveal Banner */}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 7.5vw, 6.5rem)',
                fontWeight: '700',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                opacity: 1,
                transform: 'none',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              }}
            >
              <span className="gradient-text" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', display: 'inline-block', paddingRight: '0.2em' }}>Rohan Prajapati</span>
            </div>

            

            {/* Sub Headline */}
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
                lineHeight: 1.25,
                marginBottom: '1rem',
                color: 'var(--text-muted)',
                fontWeight: '600',
              }}
            >
              Building Systems From <span className="gradient-text">Schema to Shipped.</span>
            </h2>

            {/* Rotating Designation */}
            <div
              style={{
                height: '2.2rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span className="mono" style={{ color: 'var(--amber-primary)', fontSize: '1.2rem', fontWeight: '600' }}>
                &gt;&nbsp;{PORTFOLIO_DATA.personal.designations[titleIndex]}
              </span>
            </div>

            {/* Intro Paragraph */}
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '1.05rem',
                lineHeight: '1.7',
                marginBottom: '2rem',
                maxWidth: '620px',
              }}
            >
              {PORTFOLIO_DATA.personal.introParagraph}
            </p>

            {/* Location & Quick Meta */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '2rem',
                color: 'var(--text-dim)',
                fontSize: '0.88rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={15} style={{ color: 'var(--amber-primary)' }} />
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={15} style={{ color: 'var(--signal-green)' }} />
                <span>CS & Engg @ Universal College of Engg</span>
              </div>
            </div>

            {/* Call to Actions & Socials */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
              <a href="#projects" className="btn btn-primary">
                <span>View Shipped Systems</span>
                <ArrowRight size={16} />
              </a>

              <a href="#contact" className="btn btn-secondary">
                Let's Talk
              </a>

              <button
                onClick={onOpenTerminal}
                className="btn btn-outline-amber"
                style={{ padding: '0.75rem 1rem' }}
                title="Launch CLI"
              >
                <Terminal size={18} />
              </button>

              {/* Social Icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginLeft: '0.5rem' }}>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  style={{
                    color: 'var(--text-muted)',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--amber-primary)';
                    e.currentTarget.style.borderColor = 'var(--amber-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <Github size={18} />
                </a>

                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  style={{
                    color: 'var(--text-muted)',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--signal-green)';
                    e.currentTarget.style.borderColor = 'var(--signal-green)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <Linkedin size={18} />
                </a>

                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  aria-label="Email Address"
                  style={{
                    color: 'var(--text-muted)',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--amber-primary)';
                    e.currentTarget.style.borderColor = 'var(--amber-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Photo Card */}
          <div style={{ display: 'flex', justifyContent: 'center', perspective: '1000px' }}>
            <div
              onMouseMove={handleCardMouseMove}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '360px',
                transformStyle: 'preserve-3d',
                transform: isHovered
                  ? `translateY(${Math.min(scrollY * 0.08, 40) - 8}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.035)`
                  : `translateY(${Math.min(scrollY * 0.08, 40)}px) rotateX(0deg) rotateY(0deg) scale(1)`,
                transition: isHovered
                  ? 'transform 0.08s ease-out, box-shadow 0.3s ease'
                  : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                boxShadow: isHovered
                  ? '0 24px 48px -12px rgba(79, 156, 255, 0.38), 0 0 35px rgba(0, 217, 165, 0.28)'
                  : '0 12px 30px -10px rgba(0, 0, 0, 0.5)',
                borderRadius: '24px',
                cursor: 'pointer',
              }}
            >
              {/* Outer Glowing Border Frame */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, var(--amber-primary), transparent 45%, var(--signal-green))',
                  opacity: isHovered ? 0.95 : 0.6,
                  filter: isHovered ? 'blur(12px)' : 'blur(8px)',
                  transition: 'all 0.3s ease',
                  animation: 'borderPulseGlow 4s ease-in-out infinite alternate',
                }}
              />

              <div
                className="glass-card"
                style={{
                  padding: '12px',
                  borderRadius: '20px',
                  background: 'var(--bg-surface)',
                  border: isHovered ? '1px solid rgba(79, 156, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.12)',
                  position: 'relative',
                  transition: 'border-color 0.3s ease',
                }}
              >
                <img
                  src={PORTFOLIO_DATA.personal.profilePic}
                  alt={PORTFOLIO_DATA.personal.fullName}
                  style={{
                    width: '100%',
                    height: 'auto',
                    aspectRatio: '4/5',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    borderRadius: '14px',
                    display: 'block',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          opacity: scrollY > 100 ? 0 : 0.75,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--amber-primary)', letterSpacing: '0.08em' }}>
          SCROLL TO EXPLORE
        </span>
        <div
          style={{
            width: '16px',
            height: '26px',
            border: '2px solid rgba(0, 229, 255, 0.4)',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '4px',
          }}
        >
          <div
            style={{
              width: '3px',
              height: '6px',
              background: 'var(--amber-primary)',
              borderRadius: '2px',
              animation: 'scrollPulse 1.8s infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0% { transform: translateY(0); opacity: 1; }
          70% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }

        @keyframes borderPulseGlow {
          0% { opacity: 0.55; filter: blur(7px); }
          100% { opacity: 0.9; filter: blur(12px); }
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};
