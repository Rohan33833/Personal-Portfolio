import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#070A0E',
        borderTop: '1px solid var(--border-color)',
        padding: '3rem 0 2rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle RP Watermark */}
      <div
        className="mono"
        style={{
          position: 'absolute',
          right: '5%',
          bottom: '-15%',
          fontSize: '14rem',
          fontWeight: '900',
          color: 'rgba(232, 163, 61, 0.03)',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
          fontFamily: 'var(--font-heading)',
        }}
      >
        RP
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 0.85rem', fontSize: '0.82rem' }}
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Copyright & Subline */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '1.5rem',
            fontSize: '0.83rem',
            color: 'var(--text-dim)',
          }}
        >
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.fullName}. Built with React, Vite & Graphite/Amber CSS.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>GitHub</a>
            <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>LinkedIn</a>
            <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
