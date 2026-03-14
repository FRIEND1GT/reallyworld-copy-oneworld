import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useSettings } from '../SettingsContext';

export default function LavaBackground() {
  const { enableShaders, isMobile } = useSettings();

  // Optimized: Reduced from 60 to 25 embers for better performance (10 for mobile)
  const embersCount = isMobile ? 10 : 25;
  const embers = useMemo(() => Array.from({ length: embersCount }).map(() => ({
    x: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 5 + 3,
    delay: Math.random() * 2,
    drift: Math.random() * 40 - 20,
  })), [isMobile, embersCount]);

  if (!enableShaders) {
    return (
      <div className="fixed inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.02)_0%,#050505_70%)]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[var(--theme-main)] blur-[150px] rounded-full mix-blend-screen opacity-10 transition-colors duration-1000" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[var(--theme-sec)] blur-[150px] rounded-full mix-blend-screen opacity-10 transition-colors duration-1000" />
        <div className="absolute inset-0 opacity-[0.01] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,#050505_70%)]"></div>
      
      {/* Subtle Mouse Parallax Container */}
      <motion.div
        style={{ x: 'calc(var(--mouse-x, 0) * 2px)', y: 'calc(var(--mouse-y, 0) * 2px)' }}
        className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
      >
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[var(--theme-main)] blur-[120px] rounded-full mix-blend-screen will-change-transform transition-colors duration-1000"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[var(--theme-sec)] blur-[120px] rounded-full mix-blend-screen will-change-transform transition-colors duration-1000"
        />
      </motion.div>
      
      {/* Optimized Floating Embers */}
      {embers.map((e, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[var(--theme-main)] shadow-[0_0_10px_var(--theme-glow)] will-change-transform transition-colors duration-1000"
          style={{ left: `${e.x}%`, width: e.size, height: e.size, bottom: '-10%' }}
          animate={{ 
            y: ['0vh', '-120vh'], 
            x: [0, e.drift, -e.drift, e.drift],
            opacity: [0, 1, 1, 0],
            scale: [0, 1.5, 1, 0]
          }}
          transition={{ duration: e.duration, repeat: Infinity, delay: e.delay, ease: "easeIn" }}
        />
      ))}

      {/* Sweeping Light Beam - Disabled on mobile for performance */}
      {!isMobile && (
        <motion.div 
          animate={{ x: ['-100vw', '200vw'] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 bottom-0 w-[30vw] bg-gradient-to-r from-transparent via-[var(--theme-main)] to-transparent opacity-10 skew-x-[-45deg] blur-[50px] will-change-transform transition-colors duration-1000"
        />
      )}
      
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );
}
