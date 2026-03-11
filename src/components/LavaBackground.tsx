import { motion } from 'motion/react';
import { useMemo } from 'react';

export default function LavaBackground() {
  const particles = useMemo(() => Array.from({ length: 50 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  })), []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#030303] pointer-events-none">
      <svg className="hidden">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -20" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>
      
      <div className="absolute inset-0 opacity-40" style={{ filter: 'url(#goo)' }}>
        {/* Lava blobs - deeper colors, smoother movement */}
        <motion.div
          animate={{
            x: ['0vw', '30vw', '-10vw', '0vw'],
            y: ['0vh', '20vh', '40vh', '0vh'],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-indigo-900/80 rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            x: ['0vw', '-30vw', '15vw', '0vw'],
            y: ['0vh', '-20vh', '30vh', '0vh'],
            scale: [1.1, 0.8, 1.3, 1.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[20%] right-[20%] w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] bg-rose-900/80 rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            x: ['0vw', '20vw', '-20vw', '0vw'],
            y: ['0vh', '-30vh', '-10vh', '0vh'],
            scale: [0.9, 1.2, 1, 0.9],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[40%] left-[40%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-violet-900/60 rounded-full mix-blend-screen"
        />
      </div>
      
      {/* Grid overlay for texture */}
      <div className="absolute inset-0 bg-grid opacity-50 mix-blend-overlay"></div>
      
      {/* Magical Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{
              top: `${p.y}%`,
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] opacity-80"></div>
    </div>
  );
}
