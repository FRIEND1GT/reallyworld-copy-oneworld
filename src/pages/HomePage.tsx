import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Sparkles, Copy, Check } from 'lucide-react';

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const copyIp = () => {
    navigator.clipboard.writeText('mc.reallyworld-copy.net');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      className="flex flex-col items-center text-center max-w-3xl w-full gap-8 relative"
    >
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-white/70 text-sm font-medium tracking-wide uppercase backdrop-blur-md shadow-xl"
      >
        <Sparkles size={16} className="text-indigo-400" />
        <span>Лучшая копия Риливорлд</span>
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl"
      >
        Добро пожаловать на <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 inline-block hover:scale-105 transition-transform duration-300">
          Наш Сервер
        </span>
      </motion.h1>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 mt-2"
      >
        <button 
          onClick={copyIp} 
          className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-indigo-500/20 border border-indigo-500/50 hover:bg-indigo-500 hover:border-indigo-400 text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] group"
        >
          {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} className="text-indigo-300 group-hover:text-white transition-colors" />}
          <span className="tracking-wide">{copied ? 'IP СКОПИРОВАН!' : 'СКОПИРОВАТЬ IP'}</span>
        </button>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-4 p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl max-w-xl w-full relative overflow-hidden group shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.05] to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <div className="flex flex-col items-center gap-4 relative z-10">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-4 rounded-full bg-red-500/10 border border-red-500/20"
          >
            <AlertTriangle className="text-red-400" size={32} />
          </motion.div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Важная информация</h2>
          <p className="text-lg text-white/60 text-center leading-relaxed">
            Важно донат покупать в тг - дс создаетеля <br/>
            <span className="font-mono bg-black/40 px-4 py-2 rounded-xl text-white mt-4 inline-block font-bold text-xl select-all border border-white/10 shadow-inner hover:bg-black/60 transition-colors">
              @Idk_friends
            </span>
          </p>
        </div>
      </motion.div>

      {/* Hidden promo code */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="absolute -bottom-24 text-xs text-white cursor-default tracking-widest font-bold bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20"
      >
        ПРОМОКОД НА СКИДКУ 20%: SECRET20
      </motion.div>
    </motion.div>
  );
}
