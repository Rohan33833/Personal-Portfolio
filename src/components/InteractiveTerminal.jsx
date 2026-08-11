import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft, Copy, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const InteractiveTerminal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([
    { type: 'system', text: 'Welcome to Rohan Prajapati Interactive System CLI [v1.0.4]' },
    { type: 'system', text: 'Type "help" or click a quick command below to get started.' }
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    const newLogs = [...logs, { type: 'user', text: `> ${cmdStr}` }];

    switch (cmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:\n  help        - Display command menu\n  bio         - Print Rohan's mission & introduction\n  skills      - List full technology stack\n  projects    - Summary of 7 shipped applications\n  drone       - View Quadcopter hardware build details\n  highlights  - Deep dive into race condition & security fixes\n  contact     - Print email, phone, location & socials\n  cv          - Download / View PDF Resume\n  clear       - Clear terminal screen`
        });
        break;

      case 'bio':
        newLogs.push({
          type: 'output',
          text: `FULL NAME: ${PORTFOLIO_DATA.personal.fullName}\nMISSION: ${PORTFOLIO_DATA.personal.mission}\nVISION: ${PORTFOLIO_DATA.personal.vision}\n\n${PORTFOLIO_DATA.personal.introParagraph}`
        });
        break;

      case 'skills':
        const skillText = PORTFOLIO_DATA.skills.map(g => `${g.category.toUpperCase()}:\n  ${g.skills.map(s => `${s.name} (${s.level})`).join(', ')}`).join('\n\n');
        newLogs.push({ type: 'output', text: skillText });
        break;

      case 'projects':
        const projText = PORTFOLIO_DATA.projects.map((p, i) => `[${i+1}] ${p.title} (${p.category})\n    Tech: ${p.tech.join(', ')}\n    Highlights: ${p.highlights[0]}`).join('\n\n');
        newLogs.push({ type: 'output', text: projText });
        break;

      case 'drone':
        newLogs.push({
          type: 'output',
          text: `HARDWARE SPECIFICATIONS:\n  Controller: Arduino / C++ custom firmware\n  Motor Controllers: Electronic Speed Controllers (ESCs) calibrated via PWM\n  Frame: Custom lightweight quadcopter frame\n  Capabilities: Manual RF flight, stable PID loop tuning, custom soldered distribution board.`
        });
        break;

      case 'highlights':
        const highText = PORTFOLIO_DATA.highlights.map(h => `TITLE: ${h.title}\nCHALLENGE: ${h.problem}\nSOLUTION: ${h.solution}\nVERIFIED RESULT: ${h.impact}`).join('\n\n---\n\n');
        newLogs.push({ type: 'output', text: highText });
        break;

      case 'contact':
        newLogs.push({
          type: 'output',
          text: `EMAIL: ${PORTFOLIO_DATA.personal.email}\nPHONE: ${PORTFOLIO_DATA.personal.phone}\nLOCATION: ${PORTFOLIO_DATA.personal.location}\nGITHUB: ${PORTFOLIO_DATA.personal.github}\nLINKEDIN: ${PORTFOLIO_DATA.personal.linkedin}`
        });
        break;

      case 'cv':
        window.open(PORTFOLIO_DATA.personal.resumePdf, '_blank');
        newLogs.push({ type: 'output', text: 'Opening Rohan_Prajapati_CV.pdf in a new tab...' });
        break;

      case 'clear':
        setLogs([]);
        return;

      default:
        newLogs.push({
          type: 'error',
          text: `Command not recognized: "${cmdStr}". Type "help" for a list of valid commands.`
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
          border: '1px solid var(--border-color-glow)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 229, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch',
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
            <span className="mono" style={{ fontSize: '0.85rem', color: 'var(--amber-primary)', marginLeft: '0.5rem', fontWeight: '600' }}>
              rohan@prajapati-dev:~$
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
                background: 'rgba(0, 229, 255, 0.1)',
                border: '1px solid rgba(0, 229, 255, 0.25)',
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
          <span className="mono" style={{ color: 'var(--amber-primary)', fontWeight: '700' }}>
            &gt;
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type command ('help', 'projects', 'skills')..."
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              background: 'var(--amber-primary)',
              border: 'none',
              color: '#0B0F14',
              borderRadius: '4px',
              padding: '0.35rem 0.65rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CornerDownLeft size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
