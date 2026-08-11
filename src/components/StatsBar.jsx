import React, { useState, useEffect, useRef } from 'react';
import { Award, Layers, Cpu, GraduationCap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';

const AnimatedCounter = ({ targetValue, isBadge }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);

  useEffect(() => {
    if (isBadge) {
      setDisplayValue(targetValue);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const match = String(targetValue).match(/^([\d.]+)(.*)$/);
          if (!match) {
            setDisplayValue(targetValue);
            return;
          }

          const numericVal = parseFloat(match[1]);
          const suffix = match[2] || '';
          const hasDecimals = match[1].includes('.');
          const decimals = hasDecimals ? match[1].split('.')[1].length : 0;

          let startTime = null;
          const duration = 1600;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = (numericVal * easeOut).toFixed(decimals);

            setDisplayValue(`${current}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        } else {
          setDisplayValue('0');
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [targetValue, isBadge]);

  return <span ref={ref}>{displayValue}</span>;
};

export const StatsBar = () => {
  const getIcon = (idx) => {
    switch (idx) {
      case 0: return <GraduationCap size={22} style={{ color: 'var(--signal-green)' }} />;
      case 1: return <Award size={22} style={{ color: 'var(--amber-primary)' }} />;
      case 2: return <Layers size={22} style={{ color: 'var(--amber-primary)' }} />;
      case 3: return <Cpu size={22} style={{ color: 'var(--signal-green)' }} />;
      default: return null;
    }
  };

  return (
    <section style={{ padding: '1.5rem 0', position: 'relative', zIndex: 10 }}>
      <div className="container">
        <ScrollReveal direction="up" delay={0}>
          <div
            className="grid-4"
            style={{
              background: 'rgba(22, 22, 22, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem 2rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
          {PORTFOLIO_DATA.stats.map((stat, idx) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                padding: '0.5rem 0',
                borderRight: idx < PORTFOLIO_DATA.stats.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
              }}
              className="stat-item"
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: idx % 2 === 0 ? 'var(--signal-green-subtle)' : 'var(--amber-subtle)',
                  border: `1px solid ${idx % 2 === 0 ? 'rgba(0, 217, 165, 0.25)' : 'rgba(79, 156, 255, 0.25)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {getIcon(idx)}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                  <span
                    className="mono"
                    style={{
                      fontSize: stat.isBadge ? '1.4rem' : '1.8rem',
                      fontWeight: '800',
                      color: stat.isBadge ? 'var(--signal-green)' : 'var(--text-main)',
                      lineHeight: 1,
                    }}
                  >
                    <AnimatedCounter targetValue={stat.value} isBadge={stat.isBadge} />
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  {stat.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .stat-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            padding-bottom: 1rem;
          }
          .stat-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      `}</style>
    </section>
  );
};
