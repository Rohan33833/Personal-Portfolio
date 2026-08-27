import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft, Shield, Lock, Check } from 'lucide-react';
import { isSecretTrigger, verifyAdminPasscode } from '../utils/cryptoAuth';
import { trackCommandExecution, trackResumeDownload } from '../utils/telemetry';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { cmsApi } from '../services/cmsApi';

export const InteractiveTerminal = ({ isOpen, onClose, onUnlockAdmin }) => {
  const { data: portfolioData } = usePortfolioData();
  const [input, setInput] = useState('');
  const [isAuthMode, setIsAuthMode] = useState(false);
  const [logs, setLogs] = useState([
    { type: 'system', text: 'Welcome to Rohan Prajapati Interactive System CLI [v1.0.4]' },
    { type: 'system', text: 'Type "help" or click a quick command below to get started.' },
  ]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [logs, isOpen, isAuthMode]);

  if (!isOpen) return null;

  const handleCommand = async (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    // IF TERMINAL IS IN AUTH/PASSWORD PROMPT MODE
    if (isAuthMode) {
      const maskedEcho = '•'.repeat(raw.length);
      const newLogs = [...logs, { type: 'user', text: `> ${maskedEcho}` }];
      
      // 1. Check server-side JWT auth first
      let isVerified = false;
      try {
        const loginRes = await cmsApi.login(raw);
        if (loginRes.success) {
          isVerified = true;
        }
      } catch {}

      // 2. Client-side fallback check
      if (!isVerified) {
        isVerified = await verifyAdminPasscode(raw);
      }

      if (isVerified) {
        if (!cmsApi.getToken()) {
          cmsApi.setToken(`client_auth_${Date.now()}`);
        }
        newLogs.push({
          type: 'success',
          text: `[AUTH GRANTED] Session token & server JWT verification successful.\n[CMS TELEMETRY MATRIX] Initializing Rohan Prajapati Admin Subsystem...`,
        });
        setLogs(newLogs);
        setInput('');
        setIsAuthMode(false);
        trackCommandExecution('admin_auth_success');
        
        // Short pause for dramatic CLI feel then open Admin console
        setTimeout(() => {
          if (onUnlockAdmin) onUnlockAdmin();
        }, 600);
      } else {
        newLogs.push({
          type: 'error',
          text: `[AUTH DENIED] Invalid passcode. Incident logged to security audit stream.\nReturning to standard shell prompt.`,
        });
        setLogs(newLogs);
        setInput('');
        setIsAuthMode(false);
        trackCommandExecution('admin_auth_failure');
      }
      return;
    }

    const cmd = raw.toLowerCase();
    const newLogs = [...logs, { type: 'user', text: `> ${raw}` }];

    // Check for inline secret syntax e.g. "sudo unlock <passcode>" or "admin <passcode>"
    const parts = raw.split(/\s+/);
    if (parts.length >= 2) {
      const commandPrefix = parts.slice(0, parts.length - 1).join(' ').toLowerCase();
      const possiblePasscode = parts[parts.length - 1];
      const isPrefixSecret = await isSecretTrigger(commandPrefix);

      if (isPrefixSecret) {
        let isVerified = false;
        try {
          const loginRes = await cmsApi.login(possiblePasscode);
          if (loginRes.success) isVerified = true;
        } catch {}

        if (!isVerified) {
          isVerified = await verifyAdminPasscode(possiblePasscode);
        }

        if (isVerified) {
          newLogs.push({
            type: 'success',
            text: `[AUTH GRANTED] Decrypting administrative telemetry & CMS...\nLaunching Admin Console.`,
          });
          setLogs(newLogs);
          setInput('');
          trackCommandExecution('admin_auth_success');
          setTimeout(() => {
            if (onUnlockAdmin) onUnlockAdmin();
          }, 600);
          return;
        }
      }
    }

    // Check for secret trigger keyword (e.g. "admin", "sudo unlock", "matrix", "root")
    const isSecret = await isSecretTrigger(cmd);
    if (isSecret) {
      newLogs.push({
        type: 'auth_prompt',
        text: `[SECURITY PROTOCOL] Restricted Administrator Telemetry & CMS Subsystem detected.\nEnter authorization passcode:`,
      });
      setLogs(newLogs);
      setInput('');
      setIsAuthMode(true);
      return;
    }

    // Standard CLI Commands
    trackCommandExecution(cmd);

    switch (cmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:\n  help        - Display command menu\n  bio         - Print Rohan's mission & introduction\n  skills      - List full technology stack\n  projects    - Summary of shipped applications\n  drone       - View Quadcopter hardware build details\n  highlights  - Deep dive into race condition & security fixes\n  contact     - Print email, phone, location & socials\n  cv          - Download / View PDF Resume\n  clear       - Clear terminal screen`,
        });
        break;

      case 'bio':
        newLogs.push({
          type: 'output',
          text: `FULL NAME: ${portfolioData.personal?.fullName || 'Rohan Prajapati'}\nMISSION: ${portfolioData.personal?.mission || ''}\nVISION: ${portfolioData.personal?.vision || ''}\n\n${portfolioData.personal?.introParagraph || ''}`,
        });
        break;

      case 'skills':
        const skillText = (portfolioData.skills || [])
          .map((g) => `${g.category.toUpperCase()}:\n  ${g.skills.map((s) => `${s.name} (${s.level})`).join(', ')}`)
          .join('\n\n');
        newLogs.push({ type: 'output', text: skillText });
        break;

      case 'projects':
        const projText = (portfolioData.projects || [])
          .map((p, i) => `[${i + 1}] ${p.title} (${p.category})\n    Tech: ${p.tech.join(', ')}\n    Highlights: ${p.highlights?.[0] || p.description}`)
          .join('\n\n');
        newLogs.push({ type: 'output', text: projText });
        break;

      case 'drone':
        newLogs.push({
          type: 'output',
          text: `HARDWARE SPECIFICATIONS:\n  Controller: Arduino / C++ custom firmware\n  Motor Controllers: Electronic Speed Controllers (ESCs) calibrated via PWM\n  Frame: Custom lightweight quadcopter frame\n  Capabilities: Manual RF flight, stable PID loop tuning, custom soldered distribution board.`,
        });
        break;

      case 'highlights':
        const highText = (portfolioData.highlights || [])
          .map((h) => `TITLE: ${h.title}\nCHALLENGE: ${h.problem}\nSOLUTION: ${h.solution}\nVERIFIED RESULT: ${h.impact}`)
          .join('\n\n---\n\n');
        newLogs.push({ type: 'output', text: highText });
        break;

      case 'contact':
        newLogs.push({
          type: 'output',
          text: `EMAIL: ${portfolioData.personal?.email}\nPHONE: ${portfolioData.personal?.phone}\nLOCATION: ${portfolioData.personal?.location}\nGITHUB: ${portfolioData.personal?.github}\nLINKEDIN: ${portfolioData.personal?.linkedin}`,
        });
        break;

      case 'cv':
        trackResumeDownload('CLI Terminal');
        window.open(portfolioData.personal?.resumePdf, '_blank');
        newLogs.push({ type: 'output', text: 'Opening Resume PDF in a new tab...' });
        break;

      case 'clear':
        setLogs([]);
        setInput('');
        return;

      default:
        newLogs.push({
          type: 'error',
          text: `Command not recognized: "${raw}". Type "help" for a list of valid commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInput('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '750px',
          height: 'min(520px, 85vh)',
          maxHeight: '85vh',
          background: '#0B0F14',
          border: isAuthMode ? '1px solid rgba(245, 158, 11, 0.6)' : '1px solid var(--border-color-glow)',
          borderRadius: '16px',
          boxShadow: isAuthMode
            ? '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(245, 158, 11, 0.25)'
            : '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(79, 156, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch',
          transition: 'all 0.3s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div
          style={{
            background: '#121820',
            padding: '0.75rem 1.25rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></div>
            <span
              className="mono"
              style={{
                fontSize: '0.85rem',
                color: isAuthMode ? '#F59E0B' : 'var(--amber-primary)',
                marginLeft: '0.5rem',
                fontWeight: '600',
              }}
            >
              {isAuthMode ? 'auth@restricted-gateway:#' : 'rohan@prajapati-dev:~$'}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Command Pills */}
        <div
          style={{
            padding: '0.6rem 1.25rem',
            background: '#0E131A',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
          }}
        >
          {['help', 'bio', 'skills', 'projects', 'drone', 'highlights', 'contact', 'cv', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="mono"
              style={{
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                background: 'rgba(79, 156, 255, 0.1)',
                border: '1px solid rgba(79, 156, 255, 0.25)',
                color: 'var(--amber-primary)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Console Body */}
        <div
          style={{
            flex: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem',
            lineHeight: 1.6,
          }}
        >
          {logs.map((log, index) => (
            <div key={index} style={{ whiteSpace: 'pre-wrap' }}>
              {log.type === 'user' && (
                <span style={{ color: 'var(--signal-green)', fontWeight: '600' }}>{log.text}</span>
              )}
              {log.type === 'system' && (
                <span style={{ color: 'var(--text-dim)' }}>{log.text}</span>
              )}
              {log.type === 'output' && (
                <span style={{ color: 'var(--text-main)' }}>{log.text}</span>
              )}
              {log.type === 'auth_prompt' && (
                <span style={{ color: '#F59E0B', fontWeight: '600' }}>{log.text}</span>
              )}
              {log.type === 'success' && (
                <span style={{ color: 'var(--signal-green)', fontWeight: '650' }}>{log.text}</span>
              )}
              {log.type === 'error' && (
                <span style={{ color: '#EF4444' }}>{log.text}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={onSubmit}
          style={{
            padding: '0.85rem 1.25rem',
            background: '#121820',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          {isAuthMode ? (
            <Lock size={15} style={{ color: '#F59E0B' }} />
          ) : (
            <span className="mono" style={{ color: 'var(--amber-primary)', fontWeight: '700' }}>
              &gt;
            </span>
          )}

          <input
            ref={inputRef}
            type={isAuthMode ? 'password' : 'text'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isAuthMode
                ? 'Enter admin passcode...'
                : "Type command ('help', 'projects', 'skills')..."
            }
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: isAuthMode ? '#F59E0B' : 'var(--text-main)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              outline: 'none',
              letterSpacing: isAuthMode ? '0.15em' : 'normal',
            }}
          />

          <button
            type="submit"
            style={{
              background: isAuthMode ? '#F59E0B' : 'var(--amber-primary)',
              border: 'none',
              color: '#0B0F14',
              borderRadius: '4px',
              padding: '0.35rem 0.65rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease',
            }}
          >
            <CornerDownLeft size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
