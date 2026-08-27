import React, { useState } from 'react';
import {
  FolderKanban,
  Wrench,
  User,
  FileText,
  Share2,
  Award,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  Save,
  Check,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ZoomIn,
} from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { ProjectEditorModal } from './ProjectEditorModal';
import { CertificateEditorModal } from './CertificateEditorModal';
import { cmsApi } from '../../services/cmsApi';

export const ContentManagerTab = ({ onFeedback }) => {
  const { data, setData, saveAndPublish, isSaving, resetToDefault } = usePortfolioData();
  const [cmsSection, setCmsSection] = useState('projects'); // 'projects' | 'certificates' | 'skills' | 'about' | 'resume' | 'socials'
  
  // Projects state
  const [editingProject, setEditingProject] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Certificates state
  const [editingCert, setEditingCert] = useState(null);
  const [isCertEditorOpen, setIsCertEditorOpen] = useState(false);

  // Upload states
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);

  // Skills state
  const [newSkillCat, setNewSkillCat] = useState('');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Advanced');
  const [selectedCatIdx, setSelectedCatIdx] = useState(0);

  // Projects CRUD
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setIsEditorOpen(true);
  };

  const handleOpenEditProject = (proj) => {
    setEditingProject(proj);
    setIsEditorOpen(true);
  };

  const handleSaveProject = (savedProj) => {
    const existing = data.projects || [];
    const idx = existing.findIndex((p) => p.id === savedProj.id);

    let updatedProjects;
    if (idx !== -1) {
      updatedProjects = [...existing];
      updatedProjects[idx] = savedProj;
    } else {
      updatedProjects = [savedProj, ...existing];
    }

    setData({ ...data, projects: updatedProjects });
    setIsEditorOpen(false);
    onFeedback('Project draft updated. Click "Publish Live Changes" to save to database.');
  };

  const handleDeleteProject = (id) => {
    if (window.confirm(`Delete project "${id}"?`)) {
      const updated = (data.projects || []).filter((p) => p.id !== id);
      setData({ ...data, projects: updated });
      onFeedback('Project removed from draft.');
    }
  };

  const handleMoveProject = (idx, direction) => {
    const projs = [...(data.projects || [])];
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= projs.length) return;

    const temp = projs[idx];
    projs[idx] = projs[targetIdx];
    projs[targetIdx] = temp;

    setData({ ...data, projects: projs });
  };

  // Certificates CRUD
  const handleOpenAddCert = () => {
    setEditingCert(null);
    setIsCertEditorOpen(true);
  };

  const handleOpenEditCert = (cert) => {
    setEditingCert(cert);
    setIsCertEditorOpen(true);
  };

  const handleSaveCert = (savedCert) => {
    const existing = data.certifications || [];
    const idx = existing.findIndex((c) => c.id === savedCert.id);

    let updatedCerts;
    if (idx !== -1) {
      updatedCerts = [...existing];
      updatedCerts[idx] = savedCert;
    } else {
      updatedCerts = [savedCert, ...existing];
    }

    setData({ ...data, certifications: updatedCerts });
    setIsCertEditorOpen(false);
    onFeedback('Certificate draft updated. Click "Publish Live Changes" to save to database.');
  };

  const handleDeleteCert = (id) => {
    if (window.confirm(`Delete certificate "${id}"?`)) {
      const updated = (data.certifications || []).filter((c) => c.id !== id);
      setData({ ...data, certifications: updated });
      onFeedback('Certificate removed from draft.');
    }
  };

  const handleMoveCert = (idx, direction) => {
    const certs = [...(data.certifications || [])];
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= certs.length) return;

    const temp = certs[idx];
    certs[idx] = certs[targetIdx];
    certs[targetIdx] = temp;

    setData({ ...data, certifications: certs });
  };

  // Resume / File Upload
  const handleUploadResume = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingResume(true);
    try {
      const res = await cmsApi.uploadFile(file);
      if (res.url) {
        setData({
          ...data,
          personal: { ...data.personal, resumePdf: res.url },
        });
        onFeedback(`Resume PDF uploaded: ${res.filename}`);
      }
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleUploadProfilePic = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingProfile(true);
    try {
      const res = await cmsApi.uploadFile(file);
      if (res.url) {
        setData({
          ...data,
          personal: { ...data.personal, profilePic: res.url },
        });
        onFeedback(`Profile image uploaded: ${res.filename}`);
      }
    } catch (err) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploadingProfile(false);
    }
  };

  // Skills Manager
  const handleAddSkillItem = () => {
    if (!newSkillName.trim()) return;
    const skillsCopy = [...(data.skills || [])];
    if (!skillsCopy[selectedCatIdx]) return;

    skillsCopy[selectedCatIdx].skills.push({
      name: newSkillName.trim(),
      level: newSkillLevel,
      icon: 'Code2',
    });

    setData({ ...data, skills: skillsCopy });
    setNewSkillName('');
  };

  const handleRemoveSkillItem = (catIdx, skillIdx) => {
    const skillsCopy = [...(data.skills || [])];
    skillsCopy[catIdx].skills.splice(skillIdx, 1);
    setData({ ...data, skills: skillsCopy });
  };

  const handleAddSkillCategory = () => {
    if (!newSkillCat.trim()) return;
    const skillsCopy = [...(data.skills || [])];
    skillsCopy.push({
      category: newSkillCat.trim(),
      skills: [],
    });
    setData({ ...data, skills: skillsCopy });
    setNewSkillCat('');
    setSelectedCatIdx(skillsCopy.length - 1);
  };

  // Global Publish
  const handlePublishAll = async () => {
    const res = await saveAndPublish(data);
    if (res.success) {
      onFeedback('🚀 All content changes saved to database & published live!');
    } else {
      onFeedback(`⚠️ Save failed: ${res.error || 'Server error'}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* CMS Sub-Navbar & Global Save Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#0E131A',
          padding: '0.65rem 1rem',
          borderRadius: '10px',
          border: '1px solid var(--border-color)',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto' }}>
          {[
            { id: 'projects', label: `Projects (${(data.projects || []).length})`, icon: FolderKanban },
            { id: 'certificates', label: `Certifications (${(data.certifications || []).length})`, icon: Award },
            { id: 'skills', label: 'Skills Stack', icon: Wrench },
            { id: 'about', label: 'About & Mission', icon: User },
            { id: 'resume', label: 'Resume & Assets', icon: FileText },
            { id: 'socials', label: 'Contact & Links', icon: Share2 },
          ].map((sec) => {
            const Icon = sec.icon;
            const active = cmsSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setCmsSection(sec.id)}
                className="mono"
                style={{
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  background: active ? 'rgba(79, 156, 255, 0.15)' : 'transparent',
                  border: active ? '1px solid var(--amber-primary)' : '1px solid transparent',
                  color: active ? 'var(--amber-primary)' : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={13} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={resetToDefault}
            className="btn btn-secondary"
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', gap: '0.3rem' }}
            title="Reset to default seed data"
          >
            <RotateCcw size={12} />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handlePublishAll}
            disabled={isSaving}
            className="btn btn-primary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.78rem', gap: '0.4rem' }}
          >
            <Save size={14} />
            <span>{isSaving ? 'Saving to Database...' : 'Publish Live Changes'}</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: PROJECTS */}
      {cmsSection === 'projects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--amber-primary)' }}>
              // PROJECTS DIRECTORY & DISPLAY REORDERING
            </span>
            <button onClick={handleOpenAddProject} className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', gap: '0.3rem' }}>
              <Plus size={13} />
              <span>Add New Project</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {(data.projects || []).map((proj, idx) => (
              <div
                key={proj.id || idx}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '0.85rem 1.15rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMoveProject(idx, -1)}
                      style={{ background: 'transparent', border: 'none', color: idx === 0 ? '#333' : 'var(--text-muted)', cursor: idx === 0 ? 'default' : 'pointer' }}
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      disabled={idx === (data.projects || []).length - 1}
                      onClick={() => handleMoveProject(idx, 1)}
                      style={{ background: 'transparent', border: 'none', color: idx === (data.projects || []).length - 1 ? '#333' : 'var(--text-muted)', cursor: idx === (data.projects || []).length - 1 ? 'default' : 'pointer' }}
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-main)' }}>{proj.title}</span>
                      <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--amber-primary)' }}>[{proj.category}]</span>
                      {proj.isFlagship && (
                        <span className="mono" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'rgba(0, 217, 165, 0.15)', color: 'var(--signal-green)' }}>
                          FLAGSHIP
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '600px' }}>
                      {proj.description}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button onClick={() => handleOpenEditProject(proj)} className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => handleDeleteProject(proj.id)} className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB: CERTIFICATIONS & CREDENTIALS */}
      {cmsSection === 'certificates' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--signal-green)' }}>
              // VERIFIED CREDENTIALS & INDUSTRY CERTIFICATIONS
            </span>
            <button onClick={handleOpenAddCert} className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', gap: '0.3rem' }}>
              <Plus size={13} />
              <span>Add New Certificate</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {(data.certifications || []).map((cert, idx) => (
              <div
                key={cert.id || idx}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '0.85rem 1.15rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMoveCert(idx, -1)}
                      style={{ background: 'transparent', border: 'none', color: idx === 0 ? '#333' : 'var(--text-muted)', cursor: idx === 0 ? 'default' : 'pointer' }}
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      disabled={idx === (data.certifications || []).length - 1}
                      onClick={() => handleMoveCert(idx, 1)}
                      style={{ background: 'transparent', border: 'none', color: idx === (data.certifications || []).length - 1 ? '#333' : 'var(--text-muted)', cursor: idx === (data.certifications || []).length - 1 ? 'default' : 'pointer' }}
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>

                  <div style={{ width: '45px', height: '45px', borderRadius: '6px', overflow: 'hidden', background: '#121820', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {cert.image ? (
                      <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    ) : (
                      <Award size={20} style={{ color: 'var(--amber-primary)' }} />
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-main)' }}>{cert.title}</span>
                      <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--signal-green)' }}>• {cert.issuer}</span>
                    </div>
                    <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                      {cert.date}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '600px' }}>
                      {cert.description}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button onClick={() => handleOpenEditCert(cert)} className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}>
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => handleDeleteCert(cert.id)} className="btn btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SKILLS */}
      {cmsSection === 'skills' && (
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.25rem' }}>
          {/* Categories Sidebar */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem' }}>
            <div className="mono" style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--amber-primary)', marginBottom: '0.75rem' }}>
              CATEGORIES
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
              {(data.skills || []).map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCatIdx(idx)}
                  className="mono"
                  style={{
                    textAlign: 'left',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    background: selectedCatIdx === idx ? 'rgba(79, 156, 255, 0.15)' : '#121820',
                    border: selectedCatIdx === idx ? '1px solid var(--amber-primary)' : '1px solid var(--border-color)',
                    color: selectedCatIdx === idx ? 'var(--amber-primary)' : 'var(--text-main)',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                  }}
                >
                  {cat.category} ({cat.skills.length})
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <input
                type="text"
                value={newSkillCat}
                onChange={(e) => setNewSkillCat(e.target.value)}
                placeholder="New Category..."
                style={{ flex: 1, padding: '0.35rem 0.6rem', background: '#0B0F14', border: '1px solid var(--border-color)', borderRadius: '4px', color: '#fff', fontSize: '0.75rem', outline: 'none' }}
              />
              <button onClick={handleAddSkillCategory} className="btn btn-secondary" style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}>
                <Plus size={12} />
              </button>
            </div>
          </div>

          {/* Skills within Selected Category */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem' }}>
            <div className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--signal-green)', marginBottom: '1rem' }}>
              // SKILLS IN: {data.skills?.[selectedCatIdx]?.category?.toUpperCase()}
            </div>

            {/* Add Skill Row */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Skill name (e.g. Next.js, Docker)..."
                style={{ flex: 1, padding: '0.5rem 0.75rem', background: '#121820', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
              />
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                style={{ padding: '0.5rem 0.75rem', background: '#121820', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
              >
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Familiar">Familiar</option>
              </select>
              <button onClick={handleAddSkillItem} className="btn btn-primary" style={{ padding: '0.5rem 0.9rem', fontSize: '0.78rem' }}>
                <Plus size={13} /> Add
              </button>
            </div>

            {/* Current Skills List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.65rem' }}>
              {(data.skills?.[selectedCatIdx]?.skills || []).map((skill, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    background: '#121820',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '0.6rem 0.85rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-main)' }}>{skill.name}</div>
                    <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--amber-primary)' }}>{skill.level}</div>
                  </div>
                  <Trash2
                    size={13}
                    style={{ color: '#EF4444', cursor: 'pointer' }}
                    onClick={() => handleRemoveSkillItem(selectedCatIdx, sIdx)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: ABOUT & MISSION */}
      {cmsSection === 'about' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.5rem' }}>
          <div className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--amber-primary)' }}>
            // PERSONAL PROFILE, TAGLINE & MISSION STATEMENTS
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>FULL NAME</label>
              <input
                type="text"
                value={data.personal?.fullName || ''}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, fullName: e.target.value } })}
                style={{ width: '100%', padding: '0.55rem 0.75rem', background: '#121820', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', outline: 'none', marginTop: '0.3rem' }}
              />
            </div>
            <div>
              <label className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>TAGLINE</label>
              <input
                type="text"
                value={data.personal?.tagline || ''}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, tagline: e.target.value } })}
                style={{ width: '100%', padding: '0.55rem 0.75rem', background: '#121820', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', outline: 'none', marginTop: '0.3rem' }}
              />
            </div>
          </div>

          <div>
            <label className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>MISSION STATEMENT</label>
            <input
              type="text"
              value={data.personal?.mission || ''}
              onChange={(e) => setData({ ...data, personal: { ...data.personal, mission: e.target.value } })}
              style={{ width: '100%', padding: '0.55rem 0.75rem', background: '#121820', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', outline: 'none', marginTop: '0.3rem' }}
            />
          </div>

          <div>
            <label className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>VISION STATEMENT</label>
            <input
              type="text"
              value={data.personal?.vision || ''}
              onChange={(e) => setData({ ...data, personal: { ...data.personal, vision: e.target.value } })}
              style={{ width: '100%', padding: '0.55rem 0.75rem', background: '#121820', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', outline: 'none', marginTop: '0.3rem' }}
            />
          </div>

          <div>
            <label className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>HERO INTRO PARAGRAPH</label>
            <textarea
              rows={3}
              value={data.personal?.introParagraph || ''}
              onChange={(e) => setData({ ...data, personal: { ...data.personal, introParagraph: e.target.value } })}
              style={{ width: '100%', padding: '0.55rem 0.75rem', background: '#121820', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', outline: 'none', resize: 'vertical', marginTop: '0.3rem' }}
            />
          </div>
        </div>
      )}

      {/* SUB-TAB 4: RESUME & ASSETS */}
      {cmsSection === 'resume' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          {/* Resume PDF Uploader */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--amber-primary)', marginBottom: '0.5rem' }}>
                // RESUME / CV PDF ASSET
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Upload a new PDF to update the download link across the Navbar, Terminal, and Contact sections.
              </p>

              <div style={{ background: '#121820', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>CURRENT PDF URL:</div>
                <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--signal-green)', wordBreak: 'break-all' }}>
                  {data.personal?.resumePdf}
                </div>
              </div>
            </div>

            <div>
              <input type="file" accept="application/pdf" onChange={handleUploadResume} id="resume-upload-input" style={{ display: 'none' }} />
              <label
                htmlFor="resume-upload-input"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', cursor: 'pointer', padding: '0.55rem 1rem' }}
              >
                <Upload size={14} />
                <span>{isUploadingResume ? 'Uploading PDF...' : 'Upload & Replace Resume PDF'}</span>
              </label>
            </div>
          </div>

          {/* Profile Picture Uploader */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--signal-green)', marginBottom: '0.5rem' }}>
                // PROFILE PICTURE AVATAR
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Upload a new avatar image to update the Hero section picture.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <img
                  src={data.personal?.profilePic}
                  alt="Profile"
                  style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div style={{ flex: 1 }}>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>CURRENT PIC URL:</div>
                  <div className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-main)', wordBreak: 'break-all' }}>
                    {data.personal?.profilePic}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <input type="file" accept="image/*" onChange={handleUploadProfilePic} id="pic-upload-input" style={{ display: 'none' }} />
              <label
                htmlFor="pic-upload-input"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', cursor: 'pointer', padding: '0.55rem 1rem' }}
              >
                <Upload size={14} />
                <span>{isUploadingProfile ? 'Uploading Picture...' : 'Upload & Replace Picture'}</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: CONTACT & SOCIALS */}
      {cmsSection === 'socials' && (
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--amber-primary)' }}>
            // DIRECT CONTACT & SOCIAL MEDIA LINKS
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PRIMARY EMAIL</label>
              <input
                type="email"
                value={data.personal?.email || ''}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, email: e.target.value } })}
                style={{ width: '100%', padding: '0.55rem 0.75rem', background: '#121820', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', outline: 'none', marginTop: '0.3rem' }}
              />
            </div>
            <div>
              <label className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PHONE NUMBER</label>
              <input
                type="text"
                value={data.personal?.phone || ''}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, phone: e.target.value } })}
                style={{ width: '100%', padding: '0.55rem 0.75rem', background: '#121820', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', outline: 'none', marginTop: '0.3rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>GITHUB PROFILE URL</label>
              <input
                type="text"
                value={data.personal?.github || ''}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, github: e.target.value } })}
                style={{ width: '100%', padding: '0.55rem 0.75rem', background: '#121820', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', outline: 'none', marginTop: '0.3rem' }}
              />
            </div>
            <div>
              <label className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>LINKEDIN PROFILE URL</label>
              <input
                type="text"
                value={data.personal?.linkedin || ''}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, linkedin: e.target.value } })}
                style={{ width: '100%', padding: '0.55rem 0.75rem', background: '#121820', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem', outline: 'none', marginTop: '0.3rem' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Project Editor Modal */}
      <ProjectEditorModal
        isOpen={isEditorOpen}
        project={editingProject}
        onSave={handleSaveProject}
        onClose={() => setIsEditorOpen(false)}
      />

      {/* Certificate Editor Modal */}
      <CertificateEditorModal
        isOpen={isCertEditorOpen}
        certificate={editingCert}
        onSave={handleSaveCert}
        onClose={() => setIsCertEditorOpen(false)}
      />
    </div>
  );
};
