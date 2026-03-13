import { motion } from 'motion/react';
import { Send, MessageSquare } from 'lucide-react';

export default function ContactsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      className="flex flex-col items-center max-w-2xl w-full"
    >
      <motion.h2 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-black mb-12 text-center uppercase tracking-widest text-white drop-shadow-lg"
      >
        Связь с нами
      </motion.h2>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden shadow-2xl"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" 
        />

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <MessageSquare size={64} className="text-indigo-400 mb-6 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
        </motion.div>
        
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          Покупайте донат у создателя
        </h3>
        
        <p className="text-lg text-white/60 mb-8 max-w-md">
          Для приобретения привилегий, разбана или других услуг, пишите напрямую создателю проекта.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a 
            href="https://t.me/Idk_friends" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#0088cc]/20 hover:bg-[#0088cc]/40 border border-[#0088cc]/50 text-white font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,136,204,0.4)]"
          >
            <Send size={20} />
            Telegram: @Idk_friends
          </a>
          
          <div className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#5865F2]/20 border border-[#5865F2]/50 text-white font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(88,101,242,0.4)] cursor-pointer">
            <MessageSquare size={20} />
            Discord: @idkfriends
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
