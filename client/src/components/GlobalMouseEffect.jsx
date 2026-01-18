import { useEffect, useState } from 'react';
import GoldenGlitter from './GoldenGlitter';

const GlobalMouseEffect = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showGlitter, setShowGlitter] = useState(false);
  const [glitterPos, setGlitterPos] = useState({ x: 0, y: 0 });
  const [lastGlitterTime, setLastGlitterTime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      setMousePos({ x, y });

      // Set CSS variables for global glow effect
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);

      // Trigger glitter particles with delay
      const now = Date.now();
      if (now - lastGlitterTime > 100) {
        setGlitterPos({ x, y });
        setShowGlitter(true);
        setLastGlitterTime(now);

        // Hide glitter after animation completes
        setTimeout(() => {
          setShowGlitter(false);
        }, 600);
      }
    };

    const handleMouseEnter = () => {
      document.body.style.setProperty('--glow-opacity', '1');
      document.body.classList.add('show-glow');
    };

    const handleMouseLeave = () => {
      document.body.style.setProperty('--glow-opacity', '0');
      document.body.classList.remove('show-glow');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [lastGlitterTime]);

  return (
    <>
      {showGlitter && (
        <GoldenGlitter x={glitterPos.x} y={glitterPos.y} count={6} />
      )}
    </>
  );
};

export default GlobalMouseEffect;
