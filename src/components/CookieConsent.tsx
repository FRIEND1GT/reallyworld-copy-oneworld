import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show after a short delay so it pops up after bot check
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    soundManager.play('success', 0.5);
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-6 right-6 z-[100] max-w-[320px] bg-[#0a0a0a]/95 border border-white/10 p-5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <button 
            onClick={() => {
              soundManager.play('cancel', 0.4);
              setIsVisible(false);
            }}
            className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--theme-main)]/10 flex items-center justify-center shrink-0 mt-1 border border-[var(--theme-main)]/20 shadow-inner">
              <Cookie className="text-[var(--theme-main)]" size={20} />
            </div>
            <div>
              <h4 className="text-white font-bold mb-1 text-sm">Мы используем Cookies</h4>
              <p className="text-white/50 text-xs leading-relaxed mb-4">
                Этот сайт использует файлы cookie для улучшения пользовательского опыта и аналитики. Продолжая использовать сайт, вы соглашаетесь с нашей политикой.
              </p>
              <button 
                onClick={handleAccept}
                onMouseEnter={() => soundManager.play('hover', 0.2)}
                className="w-full py-2 bg-gradient-to-r from-[var(--theme-main)] to-[var(--theme-sec)] text-white text-sm font-bold rounded-lg transition-transform hover:scale-[1.02] shadow-[0_0_15px_var(--theme-glow)]"
              >
                Accept Cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
