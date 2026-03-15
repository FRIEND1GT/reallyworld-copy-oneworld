import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, AlertTriangle, RefreshCw, Clock } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function BotCheck({ onComplete }: { onComplete: () => void, key?: React.Key }) {
  const [failed, setFailed] = useState(false);
  const [positions, setPositions] = useState<{x: number, y: number}[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [banUntil, setBanUntil] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const savedAttempts = parseInt(localStorage.getItem('botcheck_attempts') || '0', 10);
    const savedBan = parseInt(localStorage.getItem('botcheck_ban_until') || '0', 10);
    
    if (savedBan > Date.now()) {
      setBanUntil(savedBan);
    } else {
      if (savedBan !== 0) {
        localStorage.removeItem('botcheck_ban_until');
        localStorage.setItem('botcheck_attempts', '0');
        setAttempts(0);
      } else {
        setAttempts(savedAttempts);
      }
    }

    const newPositions = [
      { x: 10 + Math.random() * 15, y: 15 + Math.random() * 60 },
      { x: 40 + Math.random() * 15, y: 15 + Math.random() * 60 },
      { x: 70 + Math.random() * 15, y: 15 + Math.random() * 60 },
    ];
    setPositions(newPositions.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (!banUntil) return;
    
    const interval = setInterval(() => {
      const remaining = Math.ceil((banUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setBanUntil(null);
        setAttempts(0);
        localStorage.removeItem('botcheck_ban_until');
        localStorage.setItem('botcheck_attempts', '0');
        setFailed(false);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);
    
    setTimeLeft(Math.ceil((banUntil - Date.now()) / 1000));
    return () => clearInterval(interval);
  }, [banUntil]);

  const handleSuccess = () => {
    soundManager.play('success', 0.6);
    localStorage.removeItem('botcheck_attempts');
    onComplete();
  };

  const handleFail = () => {
    soundManager.play('error', 0.6);
    
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    localStorage.setItem('botcheck_attempts', newAttempts.toString());
    
    if (newAttempts >= 3) {
      const banTime = Date.now() + 5 * 60 * 1000; // 5 minutes
      setBanUntil(banTime);
      localStorage.setItem('botcheck_ban_until', banTime.toString());
    } else {
      setFailed(true);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
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
            {banUntil ? (
              <motion.div 
                key="banned"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-red-500/5"
              >
                <Clock className="w-16 h-16 text-red-500 mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse" />
                <h3 className="text-2xl font-display font-bold text-red-400 mb-2">Доступ ограничен</h3>
                <p className="text-white/70 mb-4 text-lg">Вы исчерпали все 3 попытки.</p>
                <div className="px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-white/50 text-sm mb-1 uppercase tracking-widest">Попробуйте позже</p>
                  <p className="text-3xl font-mono font-bold text-red-400">{formatTime(timeLeft)}</p>
                </div>
              </motion.div>
            ) : failed ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-red-500/5"
              >
                <AlertTriangle className="w-16 h-16 text-red-500 mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse" />
                <h3 className="text-2xl font-display font-bold text-red-400 mb-2">Ошибка проверки</h3>
                <p className="text-white/70 mb-2 text-lg">Простите, возможно вы бот!</p>
                <p className="text-white/40 mb-8 text-sm">Осталось попыток: {3 - attempts}</p>
                <button 
                  onClick={() => { soundManager.play('click', 0.5); window.location.reload(); }}
                  className="flex items-center gap-3 px-8 py-4 bg-red-500/20 hover:bg-red-500 border border-red-500/50 hover:border-red-500 text-white rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:scale-105"
                >
                  <RefreshCw size={20} /> Повторить
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
