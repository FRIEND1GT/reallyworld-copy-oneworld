import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Copy, Check, Sparkles, BookOpen } from 'lucide-react';

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const copyIp = () => {
    navigator.clipboard.writeText('OneWorld.me');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: -50, scale: 0.95, rotateX: 10 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="flex flex-col items-center text-center max-w-5xl w-full gap-10 relative z-10 will-change-transform"
      style={{ perspective: 1000, transform: 'translate3d(calc(var(--mouse-x, 0) * -1.5px), calc(var(--mouse-y, 0) * -1.5px), 0)', transition: 'transform 0.1s ease-out' }}
    >
      <motion.div 
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white/90 text-sm font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all hover:bg-white/[0.08]"
      >
        <Sparkles size={16} className="text-[var(--theme-main)] animate-pulse" />
        <span>Новый сезон уже скоро</span>
      </motion.div>

      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[var(--theme-main)] blur-[120px] rounded-full mix-blend-screen -z-10"
        />
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="text-7xl md:text-9xl lg:text-[10rem] font-display font-black tracking-tighter text-white leading-[0.85] relative drop-shadow-2xl"
        >
          ЛУЧШИЙ <br/>
          <span className="relative inline-block mt-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-[var(--theme-main)] to-[var(--theme-sec)] drop-shadow-[0_0_60px_var(--theme-glow)] transition-all duration-700">
              ONEWORLD
            </span>
            {/* Continuous shine effect */}
            <motion.span 
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 mix-blend-overlay will-change-transform"
            />
          </span>
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg md:text-2xl text-white/60 max-w-3xl font-medium leading-relaxed tracking-wide"
      >
        Окунись в атмосферу настоящего выживания. Уникальные механики, стабильная экономика и отзывчивая администрация ждут тебя.
      </motion.p>

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
        className="mt-4 flex flex-col sm:flex-row gap-6 relative group"
      >
        <div className="relative group/btn1">
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--theme-main)] to-[var(--theme-sec)] rounded-[2rem] blur-xl opacity-50 group-hover/btn1:opacity-100 transition duration-500 group-hover/btn1:duration-200"></div>
          <button 
            onClick={copyIp} 
            className="relative flex items-center justify-center gap-4 px-10 py-5 rounded-[2rem] bg-[#0a0a0a] border border-white/10 text-white font-display font-black text-xl transition-all duration-500 hover:scale-[1.02] overflow-hidden w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-main)]/20 to-[var(--theme-sec)]/20 opacity-0 group-hover/btn1:opacity-100 transition-opacity duration-500"></div>
            
            <span className="relative z-10 flex items-center gap-4">
              {copied ? <Check size={28} className="text-emerald-400" /> : <Copy size={28} className="text-[var(--theme-main)]" />}
              <span className="tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                {copied ? 'IP СКОПИРОВАН' : 'НАЧАТЬ ИГРАТЬ'}
              </span>
            </span>
          </button>
        </div>

        <div className="relative group/btn2">
          <div className="absolute -inset-1 bg-white/10 rounded-[2rem] blur-xl opacity-0 group-hover/btn2:opacity-100 transition duration-500"></div>
          <a 
            href="https://oneworld-rules.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center gap-4 px-10 py-5 rounded-[2rem] bg-white/5 border border-white/10 text-white font-display font-black text-xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 overflow-hidden w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-3">
              <BookOpen size={28} className="text-white/70" />
              <span className="tracking-widest uppercase text-white/90">
                ПРАВИЛА
              </span>
            </span>
          </a>
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.5 }}
        className="mt-16 p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent max-w-3xl w-full relative overflow-hidden shadow-2xl group"
      >
        <div className="bg-[#050505]/90 rounded-[2.4rem] p-10 backdrop-blur-2xl border border-white/5 relative z-10 flex flex-col items-center gap-6">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-5 rounded-3xl bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.15)] will-change-transform"
          >
            <ShieldAlert size={48} />
          </motion.div>
          
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-3xl font-display font-black uppercase tracking-widest text-white drop-shadow-md">
              Сервер в разработке
            </h2>
            <p className="text-white/50 font-medium text-lg text-center max-w-lg">
              Мы готовим для вас нечто грандиозное. Следите за новостями в наших социальных сетях.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
