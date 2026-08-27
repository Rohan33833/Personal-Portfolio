import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Upload,
  ExternalLink,
  Github,
  CheckCircle,
  AlertCircle,
  Eye,
  Sparkles,
  Code,
  Image as ImageIcon,
} from 'lucide-react';
import { cmsApi } from '../../services/cmsApi';

export const ProjectEditorModal = ({ isOpen, project, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    subtitle: '',
    category: 'Full-Stack',
    isFlagship: false,
    tech: [],
    description: '',
    highlights: [],
    github: 'https://github.com/Rohan33833',
    demoUrl: '',
    badge: '',
    imageUrl: '',
    icon: 'Code2',
  });

  const [techInput, setTechInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [activeView, setActiveView] = useState('form'); // 'form' | 'preview'

  useEffect(() => {
    if (project) {
      setFormData({
        id: project.id || '',
        title: project.title || '',
        subtitle: project.subtitle || '',
        category: project.category || 'Full-Stack',
        isFlagship: Boolean(project.isFlagship),
        tech: project.tech || [],
        description: project.description || '',
        highlights: project.highlights || [],
        github: project.github || 'https://github.com/Rohan33833',
        demoUrl: project.demoUrl || '',
        badge: project.badge || '',
        imageUrl: project.imageUrl || '',
        icon: project.icon || 'Code2',
      });
    } else {
      // New project defaults
      setFormData({
        id: `project-${Date.now()}`,
        title: '',
        subtitle: '',
        category: 'Full-Stack',
        isFlagship: false,
        tech: ['React', 'Node.js'],
        description: '',
        highlights: ['Engineered high-performance architecture.', 'Integrated real-time telemetry.'],
        github: 'https://github.com/Rohan33833',
        demoUrl: '',
        badge: 'New Release',
        imageUrl: '',
        icon: 'Code2',
      });
    }
    setErrors({});
    setUploadError('');
  }, [project, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.tech || formData.tech.length === 0) errs.tech = 'At least 1 technology tag is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddTech = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const val = techInput.trim();
      if (val && !formData.tech.includes(val)) {
        setFormData({ ...formData, tech: [...formData.tech, val] });
        setTechInput('');
      }
    }
  };

  const handleRemoveTech = (t) => {
    setFormData({ ...formData, tech: formData.tech.filter((item) => item !== t) });
  };

  const handleAddHighlight = () => {
    const val = highlightInput.trim();
    if (val) {
      setFormData({ ...formData, highlights: [...formData.highlights, val] });
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (idx) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== idx),
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      const res = await cmsApi.uploadFile(file);
      if (res.url) {
        setFormData({ ...formData, imageUrl: res.url });
      }
    } catch (err) {
      setUploadError(err.message || 'File upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const finalId =
      formData.id ||
      formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    onSave({ ...formData, id: finalId });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 600,
        background: 'rgba(5, 7, 10, 0.92)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          height: 'min(760px, 92vh)',
          background: '#0B0F14',
          border: '1px solid var(--border-color-glow)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(79, 156, 255, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            background: 'rgba(18, 24, 32, 0.95)',
            borderBottom: '1px solid var(--border-color)',
            padding: '0.85rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="mono" style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--amber-primary)' }}>
              {project ? `EDIT PROJECT // ${project.title}` : 'CMS // CREATE NEW PROJECT'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              type="button"
              onClick={() => setActiveView(activeView === 'form' ? 'preview' : 'form')}
              className="btn btn-secondary"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', gap: '0.3rem' }}
            >
              <Eye size={13} />
              <span>{activeView === 'form' ? 'Show Live Preview' : 'Back to Editor'}</span>
            </button>
            <button
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {activeView === 'preview' ? (
            /* Live Schematic Project Card Preview */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
              <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--signal-green)' }}>
                // LIVE COMPONENT PREVIEW (How this card will render on the live site)
              </div>

              <div
                style={{
                  width: '100%',
                  maxWidth: '520px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                {formData.imageUrl && (
                  <div style={{ width: '100%', height: '180px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)', background: '#161616' }}>
                    <img src={formData.imageUrl} alt={formData.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--amber-primary)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                      {formData.category} {formData.isFlagship && '• Flagship'}
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>{formData.title || 'Untitled Project'}</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {formData.subtitle || 'System subtitle'}
                    </div>
                  </div>
                  {formData.badge && (
                    <span
                      className="mono"
                      style={{
                        fontSize: '0.68rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background: 'rgba(0, 217, 165, 0.12)',
                        color: 'var(--signal-green)',
                        border: '1px solid rgba(0, 217, 165, 0.3)',
                      }}
                    >
                      {formData.badge}
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {formData.description || 'Project description overview will appear here.'}
                </p>

                {formData.highlights.length > 0 && (
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {formData.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                  {formData.tech.map((t) => (
                    <span
                      key={t}
                      className="mono"
                      style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.72rem',
                        color: 'var(--amber-primary)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  {formData.github && (
                    <a href={formData.github} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', textDecoration: 'none' }}>
                      <Github size={14} />
                      <span>Source</span>
                    </a>
                  )}
                  {formData.demoUrl && (
                    <a href={formData.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', textDecoration: 'none' }}>
                      <ExternalLink size={14} />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Main Form Editor */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    PROJECT TITLE *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Well Queue"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      background: '#121820',
                      border: errors.title ? '1px solid #EF4444' : '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                  {errors.title && <span style={{ fontSize: '0.72rem', color: '#EF4444' }}>{errors.title}</span>}
                </div>

                <div>
                  <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    CATEGORY
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      background: '#121820',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Embedded & Hardware">Embedded & Hardware</option>
                    <option value="AI & Robotics">AI & Robotics</option>
                    <option value="Systems & Cloud">Systems & Cloud</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  SUBTITLE / ONE-LINER
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Nationwide Healthcare Queue Management System"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    background: '#121820',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  FULL DESCRIPTION *
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe architecture, user problems solved, system behavior..."
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    background: '#121820',
                    border: errors.description ? '1px solid #EF4444' : '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-main)',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
                {errors.description && <span style={{ fontSize: '0.72rem', color: '#EF4444' }}>{errors.description}</span>}
              </div>

              {/* Tech Stack Tags Input */}
              <div>
                <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  TECHNOLOGIES * (Press Enter or Add to append)
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleAddTech}
                    placeholder="e.g. Flutter, PostgreSQL, Redis..."
                    style={{
                      flex: 1,
                      padding: '0.55rem 0.85rem',
                      background: '#121820',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                  <button type="button" onClick={handleAddTech} className="btn btn-secondary" style={{ padding: '0.55rem 0.85rem' }}>
                    <Plus size={14} /> Add
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {formData.tech.map((t) => (
                    <span
                      key={t}
                      className="mono"
                      style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px',
                        background: 'rgba(79, 156, 255, 0.15)',
                        border: '1px solid rgba(79, 156, 255, 0.3)',
                        color: 'var(--amber-primary)',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      {t}
                      <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleRemoveTech(t)} />
                    </span>
                  ))}
                </div>
                {errors.tech && <span style={{ fontSize: '0.72rem', color: '#EF4444' }}>{errors.tech}</span>}
              </div>

              {/* Highlights List Builder */}
              <div>
                <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  TECHNICAL HIGHLIGHTS (Bullet Points)
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    placeholder="e.g. Eliminated race conditions using PostgreSQL advisory locks."
                    style={{
                      flex: 1,
                      padding: '0.55rem 0.85rem',
                      background: '#121820',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                  <button type="button" onClick={handleAddHighlight} className="btn btn-secondary" style={{ padding: '0.55rem 0.85rem' }}>
                    <Plus size={14} /> Add
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {formData.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.45rem 0.75rem',
                        background: '#121820',
                        borderRadius: '6px',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.82rem',
                      }}
                    >
                      <span style={{ color: 'var(--text-main)', flex: 1 }}>• {h}</span>
                      <Trash2 size={13} style={{ color: '#EF4444', cursor: 'pointer', marginLeft: '0.5rem' }} onClick={() => handleRemoveHighlight(idx)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Image & Asset Upload */}
              <div style={{ background: '#121820', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--amber-primary)', display: 'block', marginBottom: '0.5rem' }}>
                  // PROJECT SCREENSHOT / MEDIA UPLOAD
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                    onChange={handleFileUpload}
                    id="project-img-upload"
                    style={{ display: 'none' }}
                  />
                  <label
                    htmlFor="project-img-upload"
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Upload size={14} />
                    <span>{isUploading ? 'Uploading...' : 'Upload Image File'}</span>
                  </label>

                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="Or enter image URL directly..."
                    style={{
                      flex: 1,
                      padding: '0.45rem 0.75rem',
                      background: '#0B0F14',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      color: 'var(--text-main)',
                      fontSize: '0.8rem',
                      outline: 'none',
                    }}
                  />
                </div>
                {uploadError && <div style={{ fontSize: '0.72rem', color: '#EF4444', marginTop: '0.4rem' }}>{uploadError}</div>}
              </div>

              {/* Links & Flags */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    GITHUB REPO URL
                  </label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/..."
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      background: '#121820',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    LIVE DEMO URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    placeholder="https://my-live-demo.com"
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      background: '#121820',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.isFlagship}
                    onChange={(e) => setFormData({ ...formData, isFlagship: e.target.checked })}
                    style={{ accentColor: 'var(--amber-primary)' }}
                  />
                  <span>Mark as Flagship Project</span>
                </label>

                <div>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Custom badge (e.g. Mobile Game)"
                    style={{
                      padding: '0.4rem 0.75rem',
                      background: '#121820',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      color: 'var(--text-main)',
                      fontSize: '0.8rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button type="button" onClick={onClose} className="btn btn-secondary" style={{ padding: '0.55rem 1.25rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.55rem 1.5rem' }}>
                  Save & Apply Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
