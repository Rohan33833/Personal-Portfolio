import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Activity,
  Users,
  FileDown,
  Mail,
  Terminal,
  Github,
  Globe,
  Lock,
  Download,
  RefreshCw,
  Trash2,
  X,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Eye,
  Send,
  Radio,
  Cpu,
  FolderKanban,
  Sparkles,
} from 'lucide-react';
import { ContentManagerTab } from './cms/ContentManagerTab';
import {
  getTelemetryData,
  getContactSubmissions,
  updateSubmissionStatus,
  fetchGitHubStats,
  exportAnalyticsJson,
  resetAnalyticsData,
} from '../utils/telemetry';
import { logoutAdminSession } from '../utils/cryptoAuth';

export const AdminConsoleModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [telemetry, setTelemetry] = useState(getTelemetryData());
  const [inbox, setInbox] = useState(getContactSubmissions());
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [githubStats, setGithubStats] = useState(null);
  const [loadingGithub, setLoadingGithub] = useState(false);
  const [uptimeSeconds, setUptimeSeconds] = useState(148);
  const [statusMessage, setStatusMessage] = useState('');

  // Auto-refresh telemetry & live session timer
  useEffect(() => {
    if (!isOpen) return;

    setTelemetry(getTelemetryData());
    setInbox(getContactSubmissions());

    const timer = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);

    // Initial GitHub stats load
    loadGithub();

    return () => clearInterval(timer);
  }, [isOpen]);

  const loadGithub = async () => {
    setLoadingGithub(true);
    const stats = await fetchGitHubStats('Rohan33833');
    setGithubStats(stats);
    setLoadingGithub(false);
  };

  const handleRefresh = () => {
    setTelemetry(getTelemetryData());
    setInbox(getContactSubmissions());
    loadGithub();
    showFeedback('Telemetry & metrics synchronized');
  };

  const handleLock = () => {
    logoutAdminSession();
    onClose();
  };

  const handleResetData = () => {
    if (window.confirm('Reset all local telemetry counters and contact inbox cache?')) {
      resetAnalyticsData();
      setTelemetry(getTelemetryData());
      setInbox(getContactSubmissions());
      showFeedback('Local telemetry cache reset to default baseline');
    }
  };

  const handleMarkStatus = (id, newStatus) => {
    const updated = updateSubmissionStatus(id, newStatus);
    setInbox(updated);
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, status: newStatus });
    }
  };

  const showFeedback = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const formatUptime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: 'rgba(5, 7, 10, 0.88)',
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
          maxWidth: '1100px',
          height: 'min(780px, 92vh)',
          background: '#0B0F14',
          border: '1px solid rgba(79, 156, 255, 0.45)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(79, 156, 255, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Schematic Grid Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(79, 156, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(79, 156, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Top Header Bar */}
        <div
          style={{
            background: 'rgba(18, 24, 32, 0.95)',
            borderBottom: '1px solid var(--border-color-glow)',
            padding: '0.85rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            zIndex: 2,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--signal-green)',
                boxShadow: '0 0 10px var(--signal-green)',
                animation: 'pulse 2s infinite',
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="mono" style={{ fontWeight: '700', fontSize: '0.92rem', color: 'var(--text-main)', letterSpacing: '0.05em' }}>
                  ADMIN // TELEMETRY & SYSTEM CONSOLE
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    background: 'rgba(0, 217, 165, 0.12)',
                    color: 'var(--signal-green)',
                    border: '1px solid rgba(0, 217, 165, 0.3)',
                  }}
                >
                  TLS 1.3 / SHA-256
                </span>
              </div>
              <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                HOST: rohan-core-node-01 • SESSION UPTIME: {formatUptime(uptimeSeconds)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {statusMessage && (
              <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--signal-green)', marginRight: '0.5rem' }}>
                ✓ {statusMessage}
              </span>
            )}
            <button
              onClick={handleRefresh}
              className="btn btn-secondary"
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', gap: '0.3rem' }}
              title="Refresh Metrics"
            >
              <RefreshCw size={13} className={loadingGithub ? 'animate-spin' : ''} />
              <span>Sync</span>
            </button>
            <button
              onClick={exportAnalyticsJson}
              className="btn btn-secondary"
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', gap: '0.3rem' }}
              title="Export Full JSON Telemetry Report"
            >
              <Download size={13} />
              <span>Export JSON</span>
            </button>
            <button
              onClick={handleLock}
              className="btn btn-secondary"
              style={{
                padding: '0.35rem 0.65rem',
                fontSize: '0.75rem',
                gap: '0.3rem',
                borderColor: 'rgba(239, 68, 68, 0.4)',
                color: '#EF4444',
              }}
              title="Lock Admin Console"
            >
              <Lock size={13} />
              <span>Lock</span>
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '0.3rem',
                marginLeft: '0.4rem',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            background: '#0E131A',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            padding: '0 1.25rem',
            gap: '0.5rem',
            overflowX: 'auto',
            zIndex: 2,
          }}
        >
          {[
            { id: 'overview', label: '01 // TELEMETRY OVERVIEW', icon: Activity },
            { id: 'cms', label: '02 // CMS CONTENT MANAGER', icon: FolderKanban },
            { id: 'inbox', label: `03 // INQUIRIES & INBOX (${inbox.filter(i => i.status === 'unread').length})`, icon: Mail },
            { id: 'cli_audit', label: '04 // CLI AUDIT & TRAIL', icon: Terminal },
            { id: 'github', label: '05 // GITHUB REPO STATS', icon: Github },
            { id: 'diagnostics', label: '06 // SYSTEM DIAGNOSTICS', icon: Cpu },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="mono"
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--amber-primary)' : '2px solid transparent',
                  color: isActive ? 'var(--amber-primary)' : 'var(--text-muted)',
                  padding: '0.75rem 0.9rem',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? '700' : '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition-fast)',
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div
          style={{
            flex: 1,
            padding: '1.25rem 1.5rem',
            overflowY: 'auto',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              {/* Top KPI Cards Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                }}
              >
                {/* Visits */}
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>TOTAL VISITS</span>
                    <Users size={16} style={{ color: 'var(--amber-primary)' }} />
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                    {(telemetry.baselineVisits || 3840).toLocaleString()}
                  </div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--signal-green)', marginTop: '0.2rem' }}>
                    ↑ +14.2% this week
                  </div>
                </div>

                {/* Unique Visitors */}
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>UNIQUE VISITORS</span>
                    <Globe size={16} style={{ color: 'var(--signal-green)' }} />
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                    {(telemetry.uniqueVisitors || 1240).toLocaleString()}
                  </div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Across 6 continents
                  </div>
                </div>

                {/* CV Downloads */}
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>CV / RESUME DOWNLOADS</span>
                    <FileDown size={16} style={{ color: 'var(--amber-primary)' }} />
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                    {(telemetry.resumeDownloads || 86).toLocaleString()}
                  </div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Last: {new Date(telemetry.lastCvDownload || Date.now()).toLocaleTimeString()}
                  </div>
                </div>

                {/* Inquiries */}
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>CAPTURED INQUIRIES</span>
                    <Mail size={16} style={{ color: 'var(--signal-green)' }} />
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                    {inbox.length}
                  </div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--amber-primary)', marginTop: '0.2rem' }}>
                    {inbox.filter(i => i.status === 'unread').length} unread messages
                  </div>
                </div>

                {/* CLI Commands */}
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>CLI COMMANDS RUN</span>
                    <Terminal size={16} style={{ color: 'var(--amber-primary)' }} />
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
                    {(telemetry.terminalCommandsRun || 320).toLocaleString()}
                  </div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Top: "help", "projects"
                  </div>
                </div>
              </div>

              {/* Middle Section: Weekly Traffic Chart & Breakdown */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '1rem',
                }}
              >
                {/* Traffic Frequency Chart */}
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--amber-primary)', marginBottom: '1rem' }}>
                    // WEEKLY TRAFFIC VELOCITY (SESSIONS)
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', gap: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    {[
                      { day: 'Mon', count: 480, height: 65 },
                      { day: 'Tue', count: 590, height: 80 },
                      { day: 'Wed', count: 720, height: 95 },
                      { day: 'Thu', count: 640, height: 85 },
                      { day: 'Fri', count: 810, height: 100 },
                      { day: 'Sat', count: 390, height: 50 },
                      { day: 'Sun', count: 450, height: 60 },
                    ].map((bar) => (
                      <div key={bar.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', height: '100%', justifyContent: 'flex-end' }}>
                        <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>{bar.count}</span>
                        <div
                          style={{
                            width: '100%',
                            height: `${bar.height}%`,
                            background: bar.day === 'Fri' ? 'var(--signal-green)' : 'rgba(79, 156, 255, 0.4)',
                            borderRadius: '3px',
                            border: bar.day === 'Fri' ? '1px solid var(--signal-green)' : '1px solid rgba(79, 156, 255, 0.6)',
                            transition: 'height 0.4s ease',
                          }}
                        />
                        <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{bar.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.6rem', textAlign: 'right' }}>
                    Peak activity on Fridays • Avg. duration: 3m 42s
                  </div>
                </div>

                {/* Referral Sources & Geolocation */}
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--signal-green)', marginBottom: '0.75rem' }}>
                    // TRAFFIC CHANNELS & SOURCES
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {Object.entries(telemetry.referrers || {}).map(([source, pct]) => (
                      <div key={source}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.2rem' }}>
                          <span style={{ color: 'var(--text-main)' }}>{source}</span>
                          <span className="mono" style={{ color: 'var(--amber-primary)' }}>{pct}%</span>
                        </div>
                        <div style={{ height: '5px', background: '#222', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: 'var(--amber-primary)' }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                    TOP REGIONS: US (34%), India (32%), UK (14%), Germany (9%)
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB: CMS CONTENT MANAGER */}
          {activeTab === 'cms' && (
            <ContentManagerTab onFeedback={showFeedback} />
          )}

          {/* TAB 2: INBOX & INQUIRIES */}
          {activeTab === 'inbox' && (
            <div style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1fr 1fr' : '1fr', gap: '1rem' }}>
              {/* Message List */}
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--amber-primary)' }}>
                    // CAPTURED PORTFOLIO INQUIRIES ({inbox.length})
                  </span>
                </div>

                {inbox.length === 0 ? (
                  <div className="mono" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-dim)' }}>
                    No contact form submissions recorded yet.
                  </div>
                ) : (
                  inbox.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (msg.status === 'unread') handleMarkStatus(msg.id, 'read');
                      }}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        background: selectedMessage?.id === msg.id ? 'rgba(79, 156, 255, 0.12)' : '#1A1F26',
                        border: selectedMessage?.id === msg.id ? '1px solid var(--amber-primary)' : '1px solid var(--border-color)',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {msg.status === 'unread' && (
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--signal-green)' }} />
                          )}
                          <span style={{ fontWeight: '600', fontSize: '0.88rem', color: 'var(--text-main)' }}>{msg.name}</span>
                        </div>
                        <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                          {new Date(msg.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem', fontWeight: '500' }}>
                        {msg.subject || 'Portfolio Inquiry'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {msg.message}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Reader / Detail */}
              {selectedMessage && (
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color-glow)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{selectedMessage.subject}</h4>
                        <div className="mono" style={{ fontSize: '0.78rem', color: 'var(--amber-primary)' }}>
                          From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                        </div>
                        <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                          Received: {new Date(selectedMessage.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedMessage(null)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div
                      style={{
                        background: '#0B0F14',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: 'var(--text-main)',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {selectedMessage.message}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem', justifyContent: 'flex-end' }}>
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                      className="btn btn-primary"
                      style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', gap: '0.4rem', textDecoration: 'none' }}
                    >
                      <Send size={14} />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CLI AUDIT & TRAIL */}
          {activeTab === 'cli_audit' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {/* Command Usage Breakdown */}
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '1.25rem',
                }}
              >
                <div className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--amber-primary)', marginBottom: '1rem' }}>
                  // CLI COMMAND EXECUTION FREQUENCY
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {Object.entries(telemetry.commandCounts || {}).map(([cmd, count]) => (
                    <div key={cmd} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0.6rem', background: '#1A1F26', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span className="mono" style={{ color: 'var(--signal-green)', fontSize: '0.82rem' }}>&gt; {cmd}</span>
                      <span className="mono" style={{ color: 'var(--text-main)', fontSize: '0.82rem', fontWeight: '700' }}>{count} runs</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Audit Log Stream */}
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--signal-green)', marginBottom: '1rem' }}>
                  // LIVE INTERACTION AUDIT STREAM
                </div>

                <div
                  style={{
                    flex: 1,
                    maxHeight: '360px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                  }}
                >
                  {(telemetry.auditLogs || []).map((log, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '0.4rem 0.6rem',
                        borderRadius: '4px',
                        background: '#0E131A',
                        borderLeft: '3px solid var(--amber-primary)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.68rem', marginBottom: '2px' }}>
                        <span>{log.action}</span>
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div style={{ color: 'var(--text-main)' }}>{log.details}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GITHUB REPO STATS */}
          {activeTab === 'github' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                }}
              >
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem' }}>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>TOTAL STARS</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#F59E0B' }}>★ {githubStats?.totalStars || 48}</div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Across public repos</div>
                </div>

                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem' }}>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>TOTAL FORKS</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--amber-primary)' }}>⑂ {githubStats?.totalForks || 26}</div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Community contributions</div>
                </div>

                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem' }}>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>PUBLIC REPOSITORIES</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--signal-green)' }}>{githubStats?.publicRepos || 18}</div>
                  <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>github.com/{githubStats?.username || 'Rohan33833'}</div>
                </div>
              </div>

              {/* Repos Grid */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem' }}>
                <div className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--amber-primary)', marginBottom: '1rem' }}>
                  // TOP FEATURED GITHUB REPOSITORIES
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                  {(githubStats?.topRepos || []).map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '1rem',
                        background: '#1A1F26',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '0.6rem',
                        transition: 'var(--transition-fast)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '0.9rem' }}>{repo.name}</span>
                        <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
                      </div>
                      <div style={{ display: 'flex', gap: '0.85rem', fontSize: '0.75rem', color: 'var(--text-dim)' }} className="mono">
                        <span style={{ color: 'var(--amber-primary)' }}>{repo.language}</span>
                        <span>★ {repo.stars}</span>
                        <span>⑂ {repo.forks}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM DIAGNOSTICS */}
          {activeTab === 'diagnostics' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem' }}>
                <div className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--amber-primary)', marginBottom: '1rem' }}>
                  // SYSTEM HEALTH & ENVIRONMENT
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Build Engine</span>
                    <span className="mono" style={{ color: 'var(--text-main)' }}>Vite 5.4 + React 18</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Encryption Standard</span>
                    <span className="mono" style={{ color: 'var(--signal-green)' }}>WebCrypto SHA-256</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Storage Layer</span>
                    <span className="mono" style={{ color: 'var(--text-main)' }}>LocalStorage + SessionStorage</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Three.js 3D Pipeline</span>
                    <span className="mono" style={{ color: 'var(--signal-green)' }}>Active (WebGL2)</span>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="mono" style={{ fontSize: '0.8rem', fontWeight: '700', color: '#EF4444', marginBottom: '0.6rem' }}>
                    // CACHE MANAGEMENT & PURGE
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    Reset local telemetry caches, flush test submissions, or download full JSON archive for offline storage.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={exportAnalyticsJson}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.78rem', justifyContent: 'center' }}
                  >
                    <Download size={14} />
                    <span>Export JSON</span>
                  </button>
                  <button
                    onClick={handleResetData}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.78rem', justifyContent: 'center', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444' }}
                  >
                    <Trash2 size={14} />
                    <span>Reset Cache</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
