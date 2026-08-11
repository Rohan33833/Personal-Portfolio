import React, { useState } from 'react';
import { Award, ExternalLink, ZoomIn, X, Calendar, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

export const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" style={{ padding: '6rem 0', background: 'rgba(18, 24, 32, 0.4)' }}>
      <div className="container">
        <ScrollReveal direction="up" delay={0}>
          <div className="section-tag">06 // CREDENTIALS & CERTIFICATIONS</div>
          <h2 className="section-title">
            Verified Industry <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subtitle">
            Professional cloud architecting, AI software tooling, and enterprise technology job simulations. Click any credential to view the official certificate document.
          </p>
        </ScrollReveal>

        {/* Certifications Grid */}
        <div className="grid-2" style={{ gap: '2rem' }}>
          {PORTFOLIO_DATA.certifications.map((cert, idx) => (
            <ScrollReveal key={cert.id} direction="up" delay={idx * 120}>
              <div
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'center',
                  cursor: 'pointer',
                  height: '100%',
                }}
                onClick={() => setSelectedCert(cert)}
              >
                {/* Image Preview Thumbnail */}
                <div
                  style={{
                    width: '120px',
                    height: '90px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                    border: '1px solid var(--border-color)',
                    background: '#000',
                  }}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                    }}
                    className="cert-thumb"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(11, 15, 20, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--amber-primary)',
                      opacity: 0,
                      transition: 'opacity 0.2s ease',
                    }}
                    className="cert-overlay"
                  >
                    <ZoomIn size={24} />
                  </div>
                </div>

                {/* Text Meta */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <Award size={16} style={{ color: 'var(--amber-primary)' }} />
                    <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--amber-primary)', fontWeight: '600' }}>
                      {cert.issuer}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                    {cert.title}
                  </h3>

                  <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.65rem' }}>
                    {cert.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Calendar size={13} />
                      <span>Issued {cert.date}</span>
                    </div>
                    <span style={{ color: 'var(--signal-green)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <ShieldCheck size={13} />
                      Click to Zoom
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Modal Zoom Viewer */}
      {selectedCert && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setSelectedCert(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              background: 'var(--bg-surface-elevated)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1rem 1.5rem',
                background: 'rgba(11, 15, 20, 0.9)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>{selectedCert.title}</h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--amber-primary)' }}>{selectedCert.issuer} • Issued {selectedCert.date}</div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: 'none',
                  color: 'var(--text-main)',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* High Res Image Display */}
            <div
              style={{
                padding: '1.5rem',
                overflowY: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#080B0F',
              }}
            >
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
                }}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .glass-card:hover .cert-thumb {
          transform: scale(1.05);
        }
        .glass-card:hover .cert-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};
