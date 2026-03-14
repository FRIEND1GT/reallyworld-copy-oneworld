import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, AlertTriangle, RefreshCw } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function BotCheck({ onComplete }: { onComplete: () => void, key?: React.Key }) {
  const [failed, setFailed] = useState(false);
  const [positions, setPositions] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    // Generate 3 random positions for the buttons
    // We use 3 distinct columns to ensure they don't overlap
    const newPositions = [
      { x: 10 + Math.random() * 15, y: 15 + Math.random() * 60 }, // Left area
      { x: 40 + Math.random() * 15, y: 15 + Math.random() * 60 }, // Center area
      { x: 70 + Math.random() * 15, y: 15 + Math.random() * 60 }, // Right area
    ];
    // Shuffle the array so the checkmark (index 0) is in a random column
    setPositions(newPositions.sort(() => Math.random() - 0.5));
  }, []);

  const handleSuccess = () => {
    soundManager.play('success', 0.6);
    onComplete();
  };

  const handleFail = () => {
    soundManager.play('error', 0.6);
    setFailed(true);
  };

  if (positions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-[#030303] flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,#030303_60%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-grid" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-display font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 text-center px-4"
        >
          Подтвердите, что вы человек
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] bg-[#0a0a0a]/80 border border-white/10 rounded-[2rem] backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {failed ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-red-500/5"
              >
                <AlertTriangle className="w-16 h-16 text-red-500 mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse" />
                <h3 className="text-2xl font-display font-bold text-red-400 mb-2">Ошибка проверки</h3>
                <p className="text-white/70 mb-8 text-lg">Простите, возможно вы бот!</p>
                <button 
                  onClick={() => { soundManager.play('click', 0.5); window.location.reload(); }}
                  className="flex items-center gap-3 px-8 py-4 bg-red-500/20 hover:bg-red-500 border border-red-500/50 hover:border-red-500 text-white rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:scale-105"
                >
                  <RefreshCw size={20} /> Перезагрузить
                </button>
              </motion.div>
            ) : (
              <motion.div key="buttons" className="absolute inset-0" exit={{ opacity: 0, scale: 0.9 }}>
                {/* Checkmark (Correct) */}
                <button
                  onClick={handleSuccess}
                  onMouseEnter={() => soundManager.play('hover', 0.2)}
                  className="absolute w-16 h-16 bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] text-white/30 hover:text-emerald-400 group"
                  style={{ left: `${positions[0].x}%`, top: `${positions[0].y}%` }}
                >
                  <Check size={32} className="transition-transform group-hover:scale-110" />
                </button>

                {/* Cross 1 (Wrong) */}
                <button
                  onClick={handleFail}
                  onMouseEnter={() => soundManager.play('hover', 0.2)}
                  className="absolute w-16 h-16 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] text-white/30 hover:text-red-400 group"
                  style={{ left: `${positions[1].x}%`, top: `${positions[1].y}%` }}
                >
                  <X size={32} className="transition-transform group-hover:scale-110" />
                </button>

                {/* Cross 2 (Wrong) */}
                <button
                  onClick={handleFail}
                  onMouseEnter={() => soundManager.play('hover', 0.2)}
                  className="absolute w-16 h-16 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] text-white/30 hover:text-red-400 group"
                  style={{ left: `${positions[2].x}%`, top: `${positions[2].y}%` }}
                >
                  <X size={32} className="transition-transform group-hover:scale-110" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-sm font-medium text-white/40 tracking-wide uppercase"
        >
          Нажмите на галочку, чтобы продолжить
        </motion.p>
      </div>
    </motion.div>
  );
}
