import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, Check, Send, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { recordContactSubmission } from '../utils/telemetry';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const ContactSection = () => {
  const { data: PORTFOLIO_DATA } = usePortfolioData();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to local telemetry inbox for admin viewing
    recordContactSubmission(formData);

    const mailtoUrl = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.location.href = mailtoUrl;

    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" style={{ padding: '6rem 0', position: 'relative' }}>
      <div className="container">
        <ScrollReveal direction="up" delay={0}>
          <div className="section-tag">07 // GET IN TOUCH</div>
          <h2 className="section-title">
            Let's <span className="gradient-text">Talk</span>
          </h2>
          <p className="section-subtitle">
            If you need a software engineer who can take a system from schema to shipped, drop me a message or connect directly.
          </p>
        </ScrollReveal>

        <div className="grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
          {/* Left Column: Direct Contact Details & Action Cards */}
          <ScrollReveal direction="left" delay={100}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>
                Rohan Prajapati
              </h3>
              <div className="mono" style={{ color: 'var(--amber-primary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                {PORTFOLIO_DATA.personal.tagline}
              </div>

              {/* Email Row */}
              <div
                style={{
                  background: 'var(--bg-surface)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      background: 'var(--amber-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--amber-primary)',
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>EMAIL ADDRESS</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>
                      {PORTFOLIO_DATA.personal.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="btn btn-secondary"
                  style={{ padding: '0.45rem 0.75rem', fontSize: '0.78rem' }}
                >
                  {copiedEmail ? <Check size={14} style={{ color: 'var(--signal-green)' }} /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone Row */}
              <div
                style={{
                  background: 'var(--bg-surface)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      background: 'var(--signal-green-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--signal-green)',
                    }}
                  >
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>PHONE NUMBER</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>
                      {PORTFOLIO_DATA.personal.phone}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  className="btn btn-secondary"
                  style={{ padding: '0.45rem 0.75rem', fontSize: '0.78rem' }}
                >
                  {copiedPhone ? <Check size={14} style={{ color: 'var(--signal-green)' }} /> : <Copy size={14} />}
                  <span>{copiedPhone ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Location Row */}
              <div
                style={{
                  background: 'var(--bg-surface)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                  }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>LOCATION</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)' }}>
                    {PORTFOLIO_DATA.personal.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Connect Card */}
            <div
              className="glass-card"
              style={{
                padding: '1.5rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>Direct Social Profiles:</div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Right Column: Contact Message Form */}
          <ScrollReveal direction="right" delay={200}>
            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} style={{ color: 'var(--amber-primary)' }} />
                Send a Direct Message
              </h3>

              {formSent ? (
                <div
                  style={{
                    background: 'var(--signal-green-subtle)',
                    border: '1px solid var(--signal-green)',
                    borderRadius: '12px',
                    padding: '2rem',
                    textAlign: 'center',
                    color: 'var(--signal-green)',
                  }}
                >
                  <Check size={40} style={{ margin: '0 auto 1rem auto' }} />
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--signal-green)' }}>Message Transmitted!</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    Thank you for reaching out. Rohan will review your message and respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-main)',
                        fontSize: '0.92rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      YOUR EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-main)',
                        fontSize: '0.92rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      SUBJECT / TOPIC
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Full-Stack Engineering Role / Project Inquiry"
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-main)',
                        fontSize: '0.92rem',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.83rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      MESSAGE BODY
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message details..."
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-main)',
                        fontSize: '0.92rem',
                        fontFamily: 'var(--font-body)',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.5rem', width: '100%' }}>
                    <Send size={16} />
                    <span>Transmit Message</span>
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
