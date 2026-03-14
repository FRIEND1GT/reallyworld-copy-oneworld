import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function IdleOverlay() {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeout);
      if (isIdle) {
        setIsIdle(false);
        soundManager.play('success', 0.5); // Звук пробуждения
      }
      timeout = setTimeout(() => {
        setIsIdle(true);
      }, 60000); // 60 секунд = 1 минута
    };

    // Инициализация таймера при загрузке
    timeout = setTimeout(() => {
      setIsIdle(true);
    }, 60000);

    const handleActivity = () => {
      resetTimer();
    };

    // Отслеживаем любую активность
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [isIdle]);

  return (
    <AnimatePresence>
      {isIdle && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#050505]/80"
        >
          <div className="relative flex flex-col items-center p-8">
            {/* Анимация Zzz */}
            <div className="absolute -top-12 right-4 w-24 h-24 pointer-events-none">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    y: -60 - (i * 10), 
                    x: i % 2 === 0 ? 20 : -20,
                    scale: [0.5, 1.5, 2] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 1,
                    ease: "easeOut" 
                  }}
                  className="absolute text-3xl font-display font-black text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]"
                  style={{ left: `${i * 20}px`, bottom: `${i * 15}px` }}
                >
                  Z
                </motion.span>
              ))}
            </div>

            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [-5, 5, -5]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Moon size={80} className="text-blue-400 mb-8 drop-shadow-[0_0_30px_rgba(96,165,250,0.6)]" />
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-4 tracking-wider text-center drop-shadow-lg">
              ТЫ ЕЩЕ ТУТ?
            </h2>
            <p className="text-white/50 mb-10 text-lg text-center max-w-md">
              Кажется, ты уснул... Пошевели мышкой, чтобы проснуться.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
