import React, { useEffect, useState } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(() => {
            setShouldRender(false);
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 15;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      {/* Monogram Initials with Glow Pulse */}
      <div
        style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '0.05em',
          background: 'linear-gradient(135deg, #EDEDED 30%, var(--amber-primary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'monogramPulse 1.4s ease-in-out infinite alternate',
          marginBottom: '2rem',
        }}
      >
        Welcome to My Portfolio
      </div>

      {/* Progress Bar Track */}
      <div
        style={{
          width: '180px',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '999px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Animated Filling Bar */}
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--amber-primary), var(--signal-green))',
            borderRadius: '999px',
            boxShadow: '0 0 10px var(--amber-primary)',
            transition: 'width 0.15s ease-out',
          }}
        />
      </div>

      <style>{`
        @keyframes monogramPulse {
          0% { transform: scale(0.96); filter: drop-shadow(0 0 5px rgba(79, 156, 255, 0.3)); }
          100% { transform: scale(1.04); filter: drop-shadow(0 0 20px rgba(79, 156, 255, 0.8)); }
        }
      `}</style>
    </div>
  );
};
