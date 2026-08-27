import React from 'react';
import { ShieldCheck, Cpu, Database, AlertCircle, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const HighlightsSection = () => {
  const { data: PORTFOLIO_DATA } = usePortfolioData();
  return (
    <section id="highlights" style={{ padding: '6rem 0', background: 'rgba(18, 24, 32, 0.6)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <ScrollReveal direction="up" delay={0}>
          <div className="section-tag">04 // ENGINEERING DEEP DIVES</div>
          <h2 className="section-title">
            What I've Actually Shipped, <span className="gradient-text">So Far.</span>
          </h2>
          <p className="section-subtitle">
            Detailed breakdowns of critical engineering challenges: concurrency locking and authentication hardening.
          </p>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {(PORTFOLIO_DATA.highlights || []).map((item, index) => (
            <ScrollReveal key={item.title} direction="up" delay={index * 150}>
              <div
                className="glass-card"
                style={{
                  padding: '2.5rem',
                  borderLeft: `4px solid ${index === 0 ? 'var(--amber-primary)' : 'var(--signal-green)'}`,
                }}
              >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <span className="mono" style={{ fontSize: '0.8rem', color: index === 0 ? 'var(--amber-primary)' : 'var(--signal-green)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    CASE STUDY 0{index + 1}
                  </span>
                  <h3 style={{ fontSize: '1.5rem', marginTop: '0.2rem' }}>{item.title}</h3>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>{item.subtitle}</div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {item.tags.map((t) => (
                    <span key={t} className={`badge ${index === 0 ? 'badge-amber' : 'badge-green'}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.5rem',
                  marginTop: '1.5rem',
                }}
                className="highlight-grid"
              >
                {/* Problem Box */}
                <div
                  style={{
                    background: 'rgba(11, 15, 20, 0.7)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EF4444', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.65rem' }}>
                    <AlertCircle size={16} />
                    <span>The Challenge / Bottleneck</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    {item.problem}
                  </p>
                </div>

                {/* Solution Box */}
                <div
                  style={{
                    background: 'rgba(11, 15, 20, 0.7)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--amber-primary)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.65rem' }}>
                    <Cpu size={16} />
                    <span>Technical Architecture</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    {item.solution}
                  </p>
                </div>

                {/* Impact Box */}
                <div
                  style={{
                    background: 'rgba(11, 15, 20, 0.7)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--signal-green)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.65rem' }}>
                    <ShieldCheck size={16} />
                    <span>Verified System Result</span>
                  </div>
                  <p style={{ color: 'var(--text-main)', fontWeight: '500', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    {item.impact}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .highlight-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
