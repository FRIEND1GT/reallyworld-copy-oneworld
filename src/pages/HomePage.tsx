import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Crown, Copy, Check, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const copyIp = () => {
    navigator.clipboard.writeText('mc.reallyworld-copy.net');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex flex-col items-center text-center max-w-4xl w-full gap-8 relative will-change-transform"
      style={{ transform: 'translate3d(calc(var(--mouse-x, 0) * -1px), calc(var(--mouse-y, 0) * -1px), 0)', transition: 'transform 0.1s ease-out' }}
    >
      <motion.div 
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--theme-main)]/10 border border-[var(--theme-main)]/30 text-[var(--theme-main)] text-sm font-bold tracking-wide shadow-[0_0_20px_var(--theme-glow)] transition-colors duration-500"
      >
        <Crown size={16} className="animate-pulse" />
        <span>Премиальный сервер</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.1 }}
        className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-[1.0] relative"
      >
        ЛУЧШАЯ КОПИЯ <br/>
        <span className="relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-[var(--theme-main)] to-[var(--theme-sec)] drop-shadow-[0_0_40px_var(--theme-glow)] transition-all duration-500">
            REALLYWORLD
          </span>
          {/* Continuous shine effect */}
          <motion.span 
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 mix-blend-overlay will-change-transform"
          />
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-xl text-white/70 max-w-2xl font-medium leading-relaxed"
      >
        Окунись в атмосферу настоящего выживания. Уникальные механики, стабильная экономика и отзывчивая администрация ждут тебя.
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
        className="mt-6"
      >
        <button 
          onClick={copyIp} 
          className="relative flex items-center justify-center gap-3 px-12 py-6 rounded-2xl bg-gradient-to-b from-[var(--theme-main)] to-[var(--theme-sec)] text-black font-black text-xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_var(--theme-glow)] group overflow-hidden border border-white/20"
        >
          {/* Fast sweeping shine on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] skew-x-12"></div>
          
          <span className="relative z-10 flex items-center gap-3">
            {copied ? <Check size={28} /> : <Copy size={28} />}
            <span className="tracking-widest uppercase">{copied ? 'IP СКОПИРОВАН' : 'НАЧАТЬ ИГРАТЬ'}</span>
          </span>
        </button>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.5 }}
        className="mt-12 p-8 rounded-[2rem] bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-xl max-w-2xl w-full relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] group"
      >
        {/* Animated border gradient */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--theme-glow)_360deg)] opacity-50 will-change-transform transition-colors duration-500"
        />
        <div className="absolute inset-[1px] bg-[#0a0a0a]/95 rounded-[2rem] backdrop-blur-3xl z-0"></div>
        
        <div className="flex flex-col items-center gap-4 relative z-10">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-4 rounded-2xl bg-red-500/10 text-red-500 mb-2 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)] will-change-transform"
          >
            <ShieldAlert size={36} />
          </motion.div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">Внимание, игроки</h2>
          <p className="text-white/70 text-center leading-relaxed font-medium">
            Покупка привилегий и товаров осуществляется <span className="text-[var(--theme-main)] font-bold transition-colors duration-500">исключительно</span> через официального создателя в Telegram.
          </p>
          <a 
            href="https://t.me/Idk_friends" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/[0.05] text-white font-bold hover:bg-white/[0.1] transition-all duration-300 border border-white/10 hover:border-[var(--theme-main)]/50 hover:shadow-[0_0_20px_var(--theme-glow)] group/btn"
          >
            Связаться с @Idk_friends <ChevronRight size={20} className="text-[var(--theme-main)] group-hover/btn:translate-x-2 transition-all duration-500" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
