import React, { useEffect, useState } from 'react';

export const CursorSpotlight = () => {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.glass-card') ||
          target.style.cursor === 'pointer')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99,
        background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, rgba(79, 156, 255, ${isPointer ? 0.09 : 0.05}), rgba(0, 217, 165, ${isPointer ? 0.04 : 0.02}) 50%, transparent 80%)`,
        transition: 'background 0.15s ease',
      }}
    />
  );
};
