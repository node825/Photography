import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const GoldenGlitter = ({ x = 0, y = 0, count = 8 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: x + (Math.random() - 0.5) * 100,
      top: y + (Math.random() - 0.5) * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 0.6 + 0.4,
      delay: Math.random() * 0.1,
    }));
    setParticles(newParticles);
  }, [x, y, count]);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none"
          style={{
            left: `${particle.left}px`,
            top: `${particle.top}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, #D4AF37, #DAA520)`,
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.size * 2}px #D4AF37, 0 0 ${particle.size * 3}px rgba(212, 175, 55, 0.6)`,
            zIndex: 9999,
          }}
          initial={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          animate={{
            opacity: 0,
            scale: 0,
            y: -80 - Math.random() * 60,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  );
};

export default GoldenGlitter;
