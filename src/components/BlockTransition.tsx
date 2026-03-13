import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function BlockTransition({ isTransitioning, onCovered, onComplete }: { isTransitioning: boolean, onCovered: () => void, onComplete: () => void }) {
  const [sparks, setSparks] = useState<{x: number, peakY: number, endY: number, left: string, delay: number, duration: number, size: number}[]>([]);

  useEffect(() => {
    if (isTransitioning) {
      // Generate sparks with physics (burst up/down, then fall)
      const newSparks = Array.from({ length: 80 }).map(() => {
        const startX = Math.random() * 100; // spawn anywhere along the horizontal line
        const driftX = (Math.random() - 0.5) * 300; // drift left/right
        const isUp = Math.random() > 0.5;
        const peakY = (isUp ? -1 : 1) * (50 + Math.random() * 250); // initial burst
        const endY = peakY + 300 + Math.random() * 300; // gravity pulls them down

        return {
          left: `${startX}%`,
          x: driftX,
          peakY,
          endY,
          delay: 0.35 + Math.random() * 0.05,
          duration: 0.6 + Math.random() * 0.4,
          size: 2 + Math.random() * 4
        };
      });
      setSparks(newSparks);

      // Much faster transition to prevent feeling "late"
      const t1 = setTimeout(onCovered, 350); 
      const t2 = setTimeout(onComplete, 1000); // slightly longer to let sparks fall
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [isTransitioning, onCovered, onComplete]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[150] pointer-events-none flex flex-col justify-between overflow-hidden">
      {/* Top Shutter */}
      <motion.div
        initial={{ height: '0%' }}
        animate={{ height: ['0%', '50.5%', '50.5%', '0%'] }}
        transition={{ times: [0, 0.35, 0.6, 1], duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
        className="w-full bg-[#050505] border-b-2 border-[var(--theme-main)] shadow-[0_20px_80px_var(--theme-glow)] relative z-10"
      />
      
      {/* Bottom Shutter */}
      <motion.div
        initial={{ height: '0%' }}
        animate={{ height: ['0%', '50.5%', '50.5%', '0%'] }}
        transition={{ times: [0, 0.35, 0.6, 1], duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
        className="w-full bg-[#050505] border-t-2 border-[var(--theme-main)] shadow-[0_-20px_80px_var(--theme-glow)] relative z-10"
      />

      {/* Center Impact Flash */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: [0, 1, 1, 0], scaleY: [0, 4, 2, 0], scaleX: [0.8, 1.1, 1, 0.8] }}
        transition={{ times: [0, 0.35, 0.5, 1], duration: 0.9, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 right-0 h-[3px] bg-white shadow-[0_0_60px_20px_var(--theme-glow)] z-20 -translate-y-1/2"
      />

      {/* Sparks with Gravity */}
      <div className="absolute top-1/2 left-0 right-0 h-0 z-30 -translate-y-1/2">
        {sparks.map((s, i) => (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{ 
              x: [0, s.x * 0.5, s.x], 
              y: [0, s.peakY, s.endY], 
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1, 0.5, 0]
            }}
            transition={{ 
              duration: s.duration, 
              delay: s.delay, 
              ease: ["easeOut", "easeIn"], // Fast out (explosion), accelerating in (gravity)
              times: [0, 0.4, 1]
            }}
            className="absolute bg-amber-400 rounded-full shadow-[0_0_15px_#fbbf24]"
            style={{ left: s.left, width: s.size, height: s.size }}
          />
        ))}
      </div>
    </div>
  );
}
