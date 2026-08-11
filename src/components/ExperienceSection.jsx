import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

export const ExperienceSection = () => {
  return (
    <section id="experience" style={{ padding: '6rem 0' }}>
      <div className="container">
        <ScrollReveal direction="up" delay={0}>
          <div className="section-tag">05 // EXPERIENCE & EDUCATION</div>
          <h2 className="section-title">
            Industry Internships & <span className="gradient-text">Academic Background</span>
          </h2>
          <p className="section-subtitle">
            Demonstrated history shipping features for AI robotics software while finishing my Engineering degree.
          </p>
        </ScrollReveal>

        <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'start' }}>
          {/* Work Experience Column */}
          <ScrollReveal direction="left" delay={100}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'var(--amber-subtle)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--amber-primary)',
                  }}
                >
                  <Briefcase size={20} />
                </div>
                <h3 style={{ fontSize: '1.4rem' }}>Work Experience</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {PORTFOLIO_DATA.workExperience.map((exp, i) => (
                  <div
                    key={i}
                    className="glass-card"
                    style={{
                      padding: '1.75rem',
                      borderLeft: '3px solid var(--amber-primary)',
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>{exp.role}</h4>
                        <div style={{ fontSize: '0.95rem', color: 'var(--amber-primary)', fontWeight: '600' }}>
                          {exp.company}
                        </div>
                      </div>
                      <span className="badge badge-amber">{exp.period}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.82rem', marginBottom: '1.2rem' }}>
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {exp.bullets.map((b, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                          <CheckCircle2 size={16} style={{ color: 'var(--amber-primary)', marginTop: '3px', flexShrink: 0 }} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Education Column */}
          <ScrollReveal direction="right" delay={200}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'var(--signal-green-subtle)',
                    border: '1px solid rgba(0, 136, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--signal-green)',
                  }}
                >
                  <GraduationCap size={20} />
                </div>
                <h3 style={{ fontSize: '1.4rem' }}>Education Timeline</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {PORTFOLIO_DATA.education.map((edu, i) => (
                  <div
                    key={i}
                    className="glass-card"
                    style={{
                      padding: '1.5rem',
                      borderLeft: '3px solid var(--signal-green)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{edu.degree}</h4>
                      <span className="badge badge-green">{edu.status}</span>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: 'var(--signal-green)', fontWeight: '500', marginBottom: '0.5rem' }}>
                      {edu.institution}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                      <span>{edu.location}</span>
                      <span className="mono" style={{ color: 'var(--text-main)', fontWeight: '600' }}>{edu.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
