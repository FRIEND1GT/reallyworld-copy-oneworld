import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function BlockTransition({ isTransitioning, onCovered, onComplete }: { isTransitioning: boolean, onCovered: () => void, onComplete: () => void }) {
  const cols = 24;
  const rows = 16;
  const total = cols * rows;

  useEffect(() => {
    if (isTransitioning) {
      // Wait for blocks to cover the screen before swapping content
      const t1 = setTimeout(onCovered, 800);
      // Wait for the full animation to finish
      const t2 = setTimeout(onComplete, 1800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [isTransitioning, onCovered, onComplete]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex flex-wrap" style={{ width: '100vw', height: '100vh' }}>
      {Array.from({ length: total }).map((_, i) => {
        const x = i % cols;
        const y = Math.floor(i / cols);
        // Build from top to bottom with a slight wave effect
        const delayIn = y * 0.025 + (x % 4) * 0.015;

        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0, rotateZ: -5 }}
            animate={{ 
              scale: [0, 1.1, 1.02, 1.02, 1.1, 0], 
              opacity: [0, 1, 1, 1, 1, 0],
              rotateZ: [-5, 0, 0, 0, 0, 5]
            }}
            transition={{
              times: [0, 0.2, 0.35, 0.65, 0.8, 1],
              duration: 1.4,
              delay: delayIn,
              ease: "easeInOut"
            }}
            className="bg-[#1a1a1a] border-t-[#2a2a2a] border-l-[#2a2a2a] border-b-[#0a0a0a] border-r-[#0a0a0a] border-[2px] shadow-lg"
            style={{ width: `${100/cols}vw`, height: `${100/rows}vh` }}
          />
        );
      })}
    </div>
  );
}
