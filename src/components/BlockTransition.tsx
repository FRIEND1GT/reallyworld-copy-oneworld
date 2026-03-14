import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { soundManager } from '../utils/sound';
import { useSettings } from '../SettingsContext';

export default function BlockTransition({ isTransitioning, onCovered, onComplete }: { isTransitioning: boolean, onCovered: () => void, onComplete: () => void }) {
  const { isMobile } = useSettings();
  const columns = isMobile ? 3 : 5;

  useEffect(() => {
    if (isTransitioning) {
      soundManager.play('transition', 0.4);
      
      const t1 = setTimeout(onCovered, 600); // Trigger page change when fully covered
      const t2 = setTimeout(onComplete, 1400); // Total duration
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [isTransitioning, onCovered, onComplete]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[150] pointer-events-none flex">
      {Array.from({ length: columns }).map((_, i) => {
        // Calculate delay for a sweeping effect from left to right
        const delay = i * 0.08;
        
        return (
          <motion.div
            key={i}
            initial={{ y: '-100%' }}
            animate={{ y: ['-100%', '0%', '0%', '100%'] }}
            transition={{ 
              times: [0, 0.4, 0.6, 1], 
              duration: 1.2, 
              ease: [0.85, 0, 0.15, 1],
              delay: delay
            }}
            className="flex-1 h-full bg-[#050505] border-r border-white/5 relative overflow-hidden"
          >
            {/* Glow edge at the bottom of the block */}
            <motion.div 
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ times: [0, 0.4, 0.6, 1], duration: 1.2, delay: delay }}
              className="absolute bottom-0 left-0 right-0 h-2 bg-[var(--theme-main)] shadow-[0_0_40px_var(--theme-glow)]"
            />
            
            {/* Inner moving highlight */}
            <motion.div
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.2, delay: delay, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent skew-y-12"
            />
          </motion.div>
        );
      })}
    </div>
  );
}

