import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function BlockTransition({ isTransitioning, onCovered, onComplete }: { isTransitioning: boolean, onCovered: () => void, onComplete: () => void }) {
  useEffect(() => {
    if (isTransitioning) {
      const t1 = setTimeout(onCovered, 600);
      const t2 = setTimeout(onComplete, 1600);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [isTransitioning, onCovered, onComplete]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Left Panel */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: ['-100%', '0%', '0%', '-100%'] }}
        transition={{
          times: [0, 0.35, 0.65, 1],
          duration: 1.6,
          ease: [0.76, 0, 0.24, 1]
        }}
        className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#050505] to-[#0a0a0a] border-r border-[var(--theme-main)]/30 shadow-[30px_0_50px_rgba(0,0,0,0.9)] will-change-transform"
      >
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--theme-main)] to-transparent opacity-50 transition-colors duration-500" />
      </motion.div>
      
      {/* Right Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: ['100%', '0%', '0%', '100%'] }}
        transition={{
          times: [0, 0.35, 0.65, 1],
          duration: 1.6,
          ease: [0.76, 0, 0.24, 1]
        }}
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#050505] to-[#0a0a0a] border-l border-[var(--theme-main)]/30 shadow-[-30px_0_50px_rgba(0,0,0,0.9)] will-change-transform"
      >
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--theme-main)] to-transparent opacity-50 transition-colors duration-500" />
      </motion.div>

      {/* Center Emblem */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -90 }}
        animate={{ 
          scale: [0, 1, 1, 0], 
          opacity: [0, 1, 1, 0],
          rotate: [-90, 0, 90, 180]
        }}
        transition={{
          times: [0, 0.35, 0.65, 1],
          duration: 1.6,
          ease: [0.76, 0, 0.24, 1]
        }}
        className="absolute z-10 w-32 h-32 flex items-center justify-center will-change-transform"
      >
        <div className="absolute inset-0 border border-[var(--theme-main)]/50 rotate-45 shadow-[0_0_30px_var(--theme-glow)] bg-[#050505]/50 backdrop-blur-sm transition-all duration-500" />
        <div className="absolute inset-4 border-2 border-[var(--theme-main)] rotate-45 shadow-[inset_0_0_20px_var(--theme-glow)] transition-all duration-500" />
        <div className="absolute inset-8 bg-[var(--theme-main)] rotate-45 blur-[10px] opacity-80 transition-colors duration-500" />
      </motion.div>
      
      {/* Flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          times: [0, 0.5, 1],
          duration: 0.8,
          delay: 0.2,
          ease: "circOut"
        }}
        className="absolute inset-0 bg-[var(--theme-main)]/10 mix-blend-screen pointer-events-none transition-colors duration-500"
      />
    </div>
  );
}
