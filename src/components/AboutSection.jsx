import React from 'react';
import { Target, Compass, Terminal, Cpu, Database, Server, Wrench } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection = () => {
  return (
    <section id="about" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        <ScrollReveal direction="up" delay={0}>
          <div className="section-tag">01 // ABOUT & PHILOSOPHY</div>
          <h2 className="section-title">
            Solving Real Operational Problems <span className="gradient-text">Under the Hood.</span>
          </h2>
          <p className="section-subtitle">
            Building systems designed for concurrency, security, and long-term production stability.
          </p>
        </ScrollReveal>

        {/* Mission & Vision Cards */}
        <div className="grid-2" style={{ marginBottom: '3rem' }}>
          <ScrollReveal direction="left" delay={100}>
            <div
              className="glass-card"
              style={{
                padding: '2rem',
                borderLeft: '4px solid var(--amber-primary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--amber-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--amber-primary)',
                  }}
                >
                  <Target size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem' }}>Mission Statement</h3>
              </div>
              <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                "{PORTFOLIO_DATA.personal.mission}"
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200}>
            <div
              className="glass-card"
              style={{
                padding: '2rem',
                borderLeft: '4px solid var(--signal-green)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'var(--signal-green-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--signal-green)',
                  }}
                >
                  <Compass size={20} />
                </div>
                <h3 style={{ fontSize: '1.25rem' }}>Vision Statement</h3>
              </div>
              <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                "{PORTFOLIO_DATA.personal.vision}"
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Full Bio & System Architectural Flow */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '2.5rem',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* Main About Text */}
          <ScrollReveal direction="up" delay={150}>
            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.2rem', color: 'var(--amber-primary)' }}>
                Full-Stack & Hardware Engineering Journey
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                {PORTFOLIO_DATA.personal.aboutParagraph}
              </p>
              <div
                style={{
                  background: 'rgba(11, 15, 20, 0.6)',
                  borderRadius: '10px',
                  padding: '1rem 1.25rem',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Terminal size={22} style={{ color: 'var(--signal-green)', flexShrink: 0 }} />
                <div className="mono" style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  Focus areas: Concurrency locking, SSO session security, WebSocket pipelines, ESC flight control.
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Hardware Blueprint & Stack Flow */}
          <ScrollReveal direction="up" delay={250}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-card" style={{ padding: '2rem', borderTop: '3px solid var(--amber-primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'var(--amber-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--amber-primary)',
                      }}
                    >
                      <Wrench size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>Custom Quadcopter Engineering</h4>
                      <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--amber-primary)' }}>Embedded Systems & Hardware</span>
                    </div>
                  </div>
                  <span className="badge badge-amber">Hardware Spec</span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Built a quadcopter drone from the bare frame up, tuning ESC pulse-width modulation, calibrating PID flight controller loops, and hand-soldering custom power distribution.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--amber-primary)' }}>FIRMWARE</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>Arduino C++ PID Loop</div>
                  </div>
                  <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--signal-green)' }}>HARDWARE</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>Custom ESC Wiring</div>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Cpu size={18} style={{ color: 'var(--amber-primary)' }} />
                  End-to-End Stack Map
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Layer 1 */}
                  <div
                    style={{
                      background: 'var(--bg-surface)',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--amber-primary)', marginBottom: '0.3rem' }}>
                      LAYER 01 // INTERFACE
                    </div>
                    <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>React, Flutter, Android Studio</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Responsive Web & Native Cross-Platform UIs</div>
                  </div>

                  {/* Layer 2 */}
                  <div
                    style={{
                      background: 'var(--bg-surface)',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--signal-green)', marginBottom: '0.3rem' }}>
                      LAYER 02 // LOGIC & REAL-TIME
                    </div>
                    <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>Node.js, Express, WebSockets, REST</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Event pipelines, JWT / SSO, Wake-Word audio API</div>
                  </div>

                  {/* Layer 3 */}
                  <div
                    style={{
                      background: 'var(--bg-surface)',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--amber-primary)', marginBottom: '0.3rem' }}>
                      LAYER 03 // DATA & PERSISTENCE
                    </div>
                    <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>PostgreSQL, Redis, MongoDB, Supabase</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Advisory locks, caching, atomic counters, document stores</div>
                  </div>

                  {/* Layer 4 */}
                  <div
                    style={{
                      background: 'var(--bg-surface)',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--signal-green)', marginBottom: '0.3rem' }}>
                      LAYER 04 // EMBEDDED HARDWARE
                    </div>
                    <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>Arduino / C++, ESC Flight Controller</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quadcopter frame assembly & PWM motor control</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
