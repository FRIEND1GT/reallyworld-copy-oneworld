import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageSquare, Mail, Globe, MapPin, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactsPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "6b6c9d34-560e-43a2-93a8-d6579ceadc7a");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: -50, scale: 0.95, rotateX: 10 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="w-full max-w-6xl flex flex-col items-center relative z-10 will-change-transform"
      style={{ perspective: 1000, transform: 'translate3d(calc(var(--mouse-x, 0) * -0.5px), calc(var(--mouse-y, 0) * -0.5px), 0)', transition: 'transform 0.1s ease-out' }}
    >
      <motion.h2 
        animate={{ textShadow: ['0px 0px 0px var(--theme-glow)', '0px 0px 30px var(--theme-glow)', '0px 0px 0px var(--theme-glow)'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-5xl md:text-7xl font-display font-black mb-10 text-center tracking-tighter text-white uppercase drop-shadow-2xl transition-all duration-500"
      >
        КОНТАКТЫ
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0a0a0a]/80 border border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl relative overflow-hidden group shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-main)]/10 blur-[80px] rounded-full pointer-events-none transition-colors duration-500" />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-display font-black text-white mb-6 drop-shadow-md">СВЯЗЬ С НАМИ</h3>
            <p className="text-white/50 font-medium text-lg mb-8 leading-relaxed">
              У вас есть вопросы, предложения или вы хотите приобрести донат напрямую? Свяжитесь с создателем проекта. Мы всегда открыты для общения и готовы помочь.
            </p>

            <div className="flex flex-col gap-6">
              <ContactItem icon={<Send />} title="Telegram" value="@idk_friends" link="https://t.me/Idk_friends" />
              <ContactItem icon={<MessageSquare />} title="Discord (Личный)" value="@idkfriends" link="https://discordapp.com/users/idkfriends" />
              <ContactItem icon={<Globe />} title="Discord Сервер" value="Присоединиться" link="https://discord.gg/CqzckKfV" />
            </div>
          </div>

          <div className="relative z-10 mt-10">
            <a 
              href="https://t.me/Idk_friends" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="relative flex items-center justify-center gap-3 w-full py-5 rounded-xl bg-gradient-to-r from-[var(--theme-main)] to-[var(--theme-sec)] text-white font-bold tracking-widest uppercase text-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_var(--theme-glow)] overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <Send size={20} className="relative z-10" />
                <span className="relative z-10 drop-shadow-md">Написать в Telegram</span>
              </button>
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0a0a0a]/80 border border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-main)]/5 to-transparent opacity-50 pointer-events-none" />
          
          <h3 className="text-3xl font-display font-black text-white mb-2 drop-shadow-md relative z-10">ОБРАТНАЯ СВЯЗЬ</h3>
          <p className="text-white/50 text-sm mb-6 relative z-10">Напишите о проблеме, оставьте отзыв или сообщите о баге, и мы его исправим.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10 flex-grow">
            <input type="hidden" name="subject" value="One World" />
            <input type="hidden" name="from_name" value="One World" />
            <div>
              <input 
                type="text" 
                name="name" 
                required 
                placeholder="Ваше имя" 
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--theme-main)]/50 transition-colors"
              />
            </div>
            <div>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="Ваш Email" 
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--theme-main)]/50 transition-colors"
              />
            </div>
            <div className="flex-grow">
              <textarea 
                name="message" 
                required 
                placeholder="Сообщение..." 
                className="w-full h-full min-h-[120px] bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--theme-main)]/50 transition-colors resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={formStatus === 'submitting'}
              className="mt-2 relative flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold tracking-widest uppercase text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {formStatus === 'idle' && (
                <>
                  <Mail size={18} className="text-[var(--theme-main)] group-hover:scale-110 transition-transform" />
                  <span>Отправить</span>
                </>
              )}
              {formStatus === 'submitting' && (
                <span className="animate-pulse">Отправка...</span>
              )}
              {formStatus === 'success' && (
                <>
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span className="text-emerald-500">Отправлено!</span>
                </>
              )}
              {formStatus === 'error' && (
                <>
                  <AlertCircle size={18} className="text-red-500" />
                  <span className="text-red-500">Ошибка отправки</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ContactItem({ icon, title, value, link }: { icon: React.ReactNode, title: string, value: string, link: string }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group">
      <div className="w-12 h-12 rounded-xl bg-[#050505] border border-white/10 flex items-center justify-center text-[var(--theme-main)] group-hover:scale-110 group-hover:shadow-[0_0_15px_var(--theme-glow)] transition-all duration-500">
        {icon}
      </div>
      <div>
        <div className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">{title}</div>
        <div className="text-lg font-bold text-white group-hover:text-[var(--theme-main)] transition-colors duration-500">{value}</div>
      </div>
    </a>
  );
}

function FaqCard({ question, answer }: { question: string, answer: string }) {
  return (
    <div className="bg-[#0a0a0a]/80 border border-white/10 rounded-[2rem] p-6 backdrop-blur-2xl shadow-[0_5px_20px_rgba(0,0,0,0.3)] hover:bg-white/5 transition-colors group">
      <h4 className="text-lg font-display font-black text-white mb-3 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[var(--theme-main)] shadow-[0_0_10px_var(--theme-glow)]" />
        {question}
      </h4>
      <p className="text-white/50 text-sm leading-relaxed font-medium pl-5 border-l border-white/10 group-hover:border-[var(--theme-main)]/50 transition-colors duration-500">
        {answer}
      </p>
    </div>
  );
}
