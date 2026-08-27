import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  ExternalLink,
  Award,
  Calendar,
  Eye,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { cmsApi } from '../../services/cmsApi';

export const CertificateEditorModal = ({ isOpen, certificate, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    issuer: '',
    date: '',
    description: '',
    image: '',
    verifyUrl: '',
  });

  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [activeView, setActiveView] = useState('form'); // 'form' | 'preview'

  useEffect(() => {
    if (certificate) {
      setFormData({
        id: certificate.id || '',
        title: certificate.title || '',
        issuer: certificate.issuer || '',
        date: certificate.date || '',
        description: certificate.description || '',
        image: certificate.image || '',
        verifyUrl: certificate.verifyUrl || '',
      });
    } else {
      setFormData({
        id: `cert-${Date.now()}`,
        title: '',
        issuer: '',
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        description: '',
        image: '',
        verifyUrl: '',
      });
    }
    setErrors({});
    setUploadError('');
  }, [certificate, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Certificate title is required';
    if (!formData.issuer.trim()) errs.issuer = 'Issuer / Organization is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File exceeds 10MB limit');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      const res = await cmsApi.uploadFile(file);
      if (res.url) {
        setFormData({ ...formData, image: res.url });
      }
    } catch (err) {
      setUploadError(err.message || 'Certificate upload failed');
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
          maxWidth: '800px',
          height: 'min(700px, 90vh)',
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
        {/* Modal Header */}
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
            <Award size={18} style={{ color: 'var(--amber-primary)' }} />
            <span className="mono" style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--amber-primary)' }}>
              {certificate ? `EDIT CREDENTIAL // ${certificate.title}` : 'CMS // ADD NEW CERTIFICATE'}
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
              <span>{activeView === 'form' ? 'Show Card Preview' : 'Back to Editor'}</span>
            </button>
            <button
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {activeView === 'preview' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', padding: '1rem 0' }}>
              <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--signal-green)' }}>
                // LIVE CERTIFICATE CARD PREVIEW
              </div>

              <div
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                {formData.image && (
                  <div style={{ width: '100%', height: '180px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)', background: '#121820' }}>
                    <img src={formData.image} alt={formData.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--amber-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--amber-primary)',
                    }}
                  >
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{formData.title || 'Untitled Certificate'}</h4>
                    <div className="mono" style={{ fontSize: '0.78rem', color: 'var(--amber-primary)' }}>
                      {formData.issuer || 'Issuing Authority'} • {formData.date || 'Date'}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {formData.description || 'Description of skills, architectural concepts, or technologies validated by this certification.'}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  CERTIFICATE TITLE *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AWS Academy Graduate – Cloud Architecting"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    background: '#121820',
                    border: errors.title ? '1px solid #EF4444' : '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
                {errors.title && <span style={{ fontSize: '0.72rem', color: '#EF4444' }}>{errors.title}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    ISSUER / ORGANIZATION *
                  </label>
                  <input
                    type="text"
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder="e.g. Amazon Web Services (AWS), Anthropic"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      background: '#121820',
                      border: errors.issuer ? '1px solid #EF4444' : '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                  {errors.issuer && <span style={{ fontSize: '0.72rem', color: '#EF4444' }}>{errors.issuer}</span>}
                </div>

                <div>
                  <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                    ISSUE DATE / TIMEFRAME
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. August 2026"
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      background: '#121820',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  DESCRIPTION *
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe competencies, frameworks, or system architectures demonstrated..."
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

              {/* Upload Certificate Image / Document */}
              <div style={{ background: '#121820', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--amber-primary)', display: 'block', marginBottom: '0.5rem' }}>
                  // CERTIFICATE DOCUMENT / BADGE IMAGE UPLOAD
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,application/pdf"
                    onChange={handleFileUpload}
                    id="cert-img-upload"
                    style={{ display: 'none' }}
                  />
                  <label
                    htmlFor="cert-img-upload"
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Upload size={14} />
                    <span>{isUploading ? 'Uploading...' : 'Upload File / Badge'}</span>
                  </label>

                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Or enter file path (e.g. certificate/AWS_Academy.jpg)..."
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

              <div>
                <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                  EXTERNAL VERIFICATION / BADGE URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.verifyUrl}
                  onChange={(e) => setFormData({ ...formData, verifyUrl: e.target.value })}
                  placeholder="https://credly.com/badges/... or verification URL"
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

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button type="button" onClick={onClose} className="btn btn-secondary" style={{ padding: '0.55rem 1.25rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.55rem 1.5rem' }}>
                  Save & Apply Credential
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
