import React from 'react';
import { 
  Code2, Smartphone, Tablet, Layout, Server, Network, Zap, Cpu,
  Database, FileText, Layers, Flame, Terminal, Shield, Lock, GitBranch, ShieldCheck, Key
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

export const SkillsSection = () => {
  const iconMap = {
    Code2, Smartphone, Tablet, Layout, Server, Network, Zap, Cpu,
    Database, FileText, Layers, Flame, Terminal, Shield, Lock, GitBranch, ShieldCheck, Key
  };

  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || Code2;
    return <IconComponent size={18} />;
  };

  return (
    <section id="skills" style={{ padding: '6rem 0', background: 'rgba(18, 24, 32, 0.4)' }}>
      <div className="container">
        <ScrollReveal direction="up" delay={0}>
          <div className="section-tag">02 // TECH STACK & CAPABILITIES</div>
          <h2 className="section-title">
            Battle-Tested Engineering <span className="gradient-text">Toolkit</span>
          </h2>
          <p className="section-subtitle">
            Spanning full-stack web and mobile development, database engineering, authentication security, and embedded hardware.
          </p>
        </ScrollReveal>

        <div className="grid-2" style={{ gap: '2rem' }}>
          {PORTFOLIO_DATA.skills.map((group, groupIdx) => (
            <ScrollReveal key={group.category} direction="up" delay={groupIdx * 120}>
              <div
                className="glass-card"
                style={{
                  padding: '2rem',
                  borderTop: `3px solid ${groupIdx % 2 === 0 ? 'var(--amber-primary)' : 'var(--signal-green)'}`,
                  height: '100%',
                }}
              >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  paddingBottom: '0.85rem',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>
                  {group.category}
                </h3>
                <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  0{groupIdx + 1} / 04
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.85rem' }}>
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.75rem 0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      transition: 'all 0.2s ease',
                    }}
                    className="skill-card"
                  >
                    <div
                      style={{
                        color: groupIdx % 2 === 0 ? 'var(--amber-primary)' : 'var(--signal-green)',
                        display: 'flex',
                      }}
                    >
                      {renderIcon(skill.icon)}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-main)', truncate: 'true' }}>
                        {skill.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        {skill.level}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
          ))}
        </div>
      </div>
      <style>{`
        .skill-card:hover {
          border-color: var(--amber-primary) !important;
          transform: translateY(-2px);
          background: rgba(26, 34, 45, 0.9) !important;
        }
      `}</style>
    </section>
  );
};
