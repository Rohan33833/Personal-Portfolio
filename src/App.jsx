import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsBar } from './components/StatsBar';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { HighlightsSection } from './components/HighlightsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CertificationsSection } from './components/CertificationsSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CursorSpotlight } from './components/CursorSpotlight';
import { LoadingScreen } from './components/LoadingScreen';
import { DevToolsGuard } from './components/DevToolsGuard';
import { Terminal, Command } from 'lucide-react';

export function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="portfolio-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <DevToolsGuard />
      <CursorSpotlight />

      <Navbar onOpenTerminal={() => setTerminalOpen(true)} isLoaded={isLoaded} />
      
      <main style={{ flex: 1 }}>
        <HeroSection onOpenTerminal={() => setTerminalOpen(true)} isLoaded={isLoaded} />
        <StatsBar />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <HighlightsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Global Floating CLI Command Palette Trigger Button */}
      <button
        onClick={() => setTerminalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.65rem 1.1rem',
          borderRadius: '9999px',
          background: 'rgba(22, 22, 22, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(79, 156, 255, 0.4)',
          color: 'var(--amber-primary)',
          fontSize: '0.85rem',
          fontWeight: '600',
          fontFamily: 'var(--font-mono)',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(79, 156, 255, 0.2)',
          transition: 'all 0.2s ease',
        }}
        className="floating-cli-btn"
      >
        <Terminal size={16} />
        <span>CLI</span>
        <span
          style={{
            background: 'rgba(79, 156, 255, 0.15)',
            color: 'var(--amber-primary)',
            padding: '0.15rem 0.4rem',
            borderRadius: '4px',
            fontSize: '0.72rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <Command size={10} />K
        </span>
      </button>

      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      <style>{`
        .floating-cli-btn:hover {
          transform: translateY(-2px) scale(1.04);
          border-color: var(--amber-primary);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(79, 156, 255, 0.35);
        }
      `}</style>
    </div>
  );
}

export default App;
