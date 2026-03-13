import { motion } from 'motion/react';
import { Send, MessageSquare, Mail, Globe, MapPin, Phone } from 'lucide-react';

export default function ContactsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="w-full max-w-6xl flex flex-col items-center relative z-10 will-change-transform"
      style={{ transform: 'translate3d(calc(var(--mouse-x, 0) * -0.5px), calc(var(--mouse-y, 0) * -0.5px), 0)', transition: 'transform 0.1s ease-out' }}
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

        {/* FAQ / Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <FaqCard 
            question="Как купить донат?" 
            answer="Вы можете приобрести донат через наш магазин на сайте или написав напрямую создателю в Telegram для индивидуальных предложений."
          />
          <FaqCard 
            question="Когда открытие сервера?" 
            answer="Сервер находится в активной разработке. Следите за новостями в наших социальных сетях, чтобы не пропустить запуск нового сезона!"
          />
          <FaqCard 
            question="Как стать частью команды?" 
            answer="Мы всегда ищем талантливых строителей, модераторов и разработчиков. Оставьте заявку в нашем Discord сервере."
          />
          
          <div className="bg-[#0a0a0a]/80 border border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] mt-auto relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-main)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner text-[var(--theme-main)]">
                  <MessageSquare size={32} className="drop-shadow-[0_0_10px_currentColor]" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-black text-white mb-1">Сотрудничество</h4>
                  <p className="text-white/50 text-sm font-medium">Для ютуберов и стримеров</p>
                </div>
             </div>
          </div>
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
