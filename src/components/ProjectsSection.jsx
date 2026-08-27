import React, { useState } from 'react';
import { 
  Github, ExternalLink, Activity, CreditCard, Cpu, ShieldAlert, MapPin, QrCode, MessageSquare, CheckCircle2, ChevronRight, X, Code2
} from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const ProjectsSection = () => {
  const { data: portfolioData } = usePortfolioData();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Full-Stack', 'Mobile', 'Embedded & Hardware'];

  const iconMap = {
    Activity, CreditCard, Cpu, ShieldAlert, MapPin, QrCode, MessageSquare, Code2
  };

  const renderProjectIcon = (iconName) => {
    const IconComp = iconMap[iconName] || Code2;
    return <IconComp size={22} />;
  };

  const projectsList = portfolioData.projects || [];
  const filteredProjects = activeFilter === 'All'
    ? projectsList
    : projectsList.filter(p => (p.category || '').toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="projects" style={{ padding: '6rem 0' }}>
      <div className="container">
        <ScrollReveal direction="up" delay={0}>
          <div className="section-tag">03 // FEATURED PROJECTS</div>
          <h2 className="section-title">
            Shipped Systems & <span className="gradient-text">Architectures</span>
          </h2>
          <p className="section-subtitle">
            Real-world applications built to solve operational inefficiencies, eliminate race conditions, and secure data flow.
          </p>
        </ScrollReveal>

        {/* Filter Buttons */}
        <ScrollReveal direction="up" delay={100}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '2.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '0.55rem 1.2rem',
                  borderRadius: 'var(--radius-full)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: activeFilter === cat ? '1px solid var(--amber-primary)' : '1px solid var(--border-color)',
                  background: activeFilter === cat ? 'var(--amber-subtle)' : 'var(--bg-surface)',
                  color: activeFilter === cat ? 'var(--amber-primary)' : 'var(--text-muted)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid-3" style={{ gap: '1.75rem' }}>
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} direction="up" delay={(idx % 3) * 120}>
              <div
                className="glass-card"
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
              <div>
                {/* Header Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'var(--amber-subtle)',
                      border: '1px solid rgba(0, 229, 255, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--amber-primary)',
                    }}
                  >
                    {renderProjectIcon(project.icon)}
                  </div>
                  <span className="badge badge-amber">{project.badge}</span>
                </div>

                {/* Title & Subtitle */}
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>{project.title}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--amber-primary)', fontWeight: '500', marginBottom: '0.85rem' }}>
                  {project.subtitle}
                </div>

                {/* Description */}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
                  {project.description}
                </p>

                {/* Highlights bullets */}
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {project.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.83rem', color: 'var(--text-main)' }}>
                      <CheckCircle2 size={14} style={{ color: 'var(--signal-green)', marginTop: '3px', flexShrink: 0 }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer: Tech Badges & GitHub Link */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                  {project.tech.map((t) => (
                    <span key={t} className="badge" style={{ fontSize: '0.72rem' }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setSelectedProject(project)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--amber-primary)',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: 0,
                    }}
                  >
                    <span>View Architecture</span>
                    <ChevronRight size={16} />
                  </button>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: '1.75rem',
              background: 'var(--bg-surface-elevated)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-amber">{selectedProject.badge}</span>
              <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--signal-green)' }}>
                {selectedProject.category}
              </span>
            </div>

            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>{selectedProject.title}</h2>
            <div style={{ color: 'var(--amber-primary)', fontWeight: '600', marginBottom: '1.2rem' }}>
              {selectedProject.subtitle}
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {selectedProject.description}
            </p>

            <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Technical Implementation Details:
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {selectedProject.highlights.map((h, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--signal-green)', marginTop: '2px', flexShrink: 0 }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {selectedProject.tech.map((t) => (
                <span key={t} className="badge badge-green">{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1 }}>
                <Github size={16} />
                <span>View Repository</span>
              </a>
              <button onClick={() => setSelectedProject(null)} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
