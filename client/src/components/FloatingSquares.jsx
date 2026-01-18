import { motion } from 'framer-motion';

const FloatingSquares = () => {
  const squares = [
    { size: 120, left: '10%', delay: 0, duration: 28 },
    { size: 150, left: '25%', delay: 3, duration: 32 },
    { size: 130, left: '50%', delay: 6, duration: 30 },
    { size: 140, left: '70%', delay: 2, duration: 31 },
    { size: 125, left: '85%', delay: 4, duration: 29 },
    { size: 190, left: '40%', delay: 8, duration: 35 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {squares.map((square, index) => (
        <motion.div
          key={index}
          className="absolute rounded-3xl shadow-lg"
          style={{
            width: square.size,
            height: square.size,
            left: square.left,
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(184, 149, 106, 0.1) 100%)',
            backdropFilter: 'blur(6px)',
            border: '1.5px solid rgba(212, 175, 55, 0.25)',
            boxShadow: '0 6px 24px rgba(212, 175, 55, 0.15)',
          }}
          initial={{
            y: '100vh',
            rotate: 0,
            opacity: 0
          }}
          animate={{
            y: '-100vh',
            rotate: 360,
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: square.duration,
            delay: square.delay,
            repeat: Infinity,
            ease: 'linear',
            opacity: {
              duration: square.duration,
              times: [0, 0.1, 0.9, 1],
            }
          }}
        />
      ))}

      {/* Additional smaller animated squares for depth */}
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={`small-${index}`}
          className="absolute rounded-2xl shadow-md"
          style={{
            width: 70 + Math.random() * 35,
            height: 70 + Math.random() * 35,
            left: `${Math.random() * 90}%`,
            background: `linear-gradient(135deg, rgba(212, 175, 55, 0.18) 0%, rgba(184, 149, 106, 0.12) 100%)`,
            border: '1.5px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 4px 16px rgba(212, 175, 55, 0.15)',
          }}
          initial={{
            y: '100vh',
            rotate: 0,
            scale: 0.5,
          }}
          animate={{
            y: '-100vh',
            rotate: -180,
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 24 + Math.random() * 10,
            delay: Math.random() * 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingSquares;