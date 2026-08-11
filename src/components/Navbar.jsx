import React, { useState, useEffect } from 'react';
import { Terminal, Download, Menu, X, Code, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Navbar = ({ onOpenTerminal, isLoaded = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = ['about', 'skills', 'projects', 'highlights', 'experience', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 220; // 220px offset for header & section alignment

      let current = '';
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'highlights', label: 'Highlights', href: '#highlights' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'certifications', label: 'Certs', href: '#certifications' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(10, 10, 10, 0.88)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: isActive ? 'var(--amber-primary)' : 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? '600' : '500',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '20px',
                  background: isActive ? 'rgba(79, 156, 255, 0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(79, 156, 255, 0.3)' : '1px solid transparent',
                  boxShadow: isActive ? '0 0 12px rgba(79, 156, 255, 0.2)' : 'none',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-main)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {isActive && (
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--amber-primary)',
                      boxShadow: '0 0 8px var(--amber-primary)',
                      display: 'inline-block',
                    }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* CLI Terminal Button */}
          <button
            onClick={onOpenTerminal}
            className="btn btn-secondary"
            title="Open Interactive CLI Terminal"
            style={{
              padding: '0.5rem 0.85rem',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              background: 'rgba(0, 229, 255, 0.08)',
              color: 'var(--amber-primary)',
            }}
          >
            <Terminal size={16} />
            <span style={{ display: 'none', minWidth: '0' }} className="terminal-text">
              &gt;_ CLI
            </span>
          </button>

          {/* Download Resume Button */}
          <a
            href={PORTFOLIO_DATA.personal.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <Download size={15} />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'none',
              padding: '0.5rem',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: isActive ? 'var(--amber-primary)' : 'var(--text-main)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: isActive ? '600' : '500',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(79, 156, 255, 0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(79, 156, 255, 0.3)' : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--amber-primary)',
                    }}
                  >
                    ● ACTIVE
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @media (min-width: 640px) {
          .terminal-text {
            display: inline !important;
          }
        }
      `}</style>
    </header>
  );
};
