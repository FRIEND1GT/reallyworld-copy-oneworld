import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Sparkles, Star, Shield, Zap, Swords, Flame, Skull, Ghost, Crown, Package, Gift, Box, Coins, Banknote, Gem } from 'lucide-react';
import LiquidButton from '../components/LiquidButton';

const ranks = [
  { name: 'VIP', price: 99, color: 'text-zinc-300', icon: Star, glow: 'group-hover:shadow-[0_0_40px_rgba(212,212,216,0.2)]' },
  { name: 'PREMIUM', price: 199, color: 'text-blue-400', icon: Shield, glow: 'group-hover:shadow-[0_0_40px_rgba(96,165,250,0.2)]' },
  { name: 'HOLY', price: 399, color: 'text-indigo-400', icon: Zap, glow: 'group-hover:shadow-[0_0_40px_rgba(129,140,248,0.2)]' },
  { name: 'TITAN', price: 699, color: 'text-violet-400', icon: Swords, glow: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]' },
  { name: 'DRAGON', price: 999, color: 'text-fuchsia-400', icon: Flame, glow: 'group-hover:shadow-[0_0_40px_rgba(217,70,239,0.2)]' },
  { name: 'AVENGER', price: 1499, color: 'text-rose-400', icon: Skull, glow: 'group-hover:shadow-[0_0_40px_rgba(251,113,133,0.2)]' },
  { name: 'PHANTOM', price: 1999, color: 'text-red-400', icon: Ghost, glow: 'group-hover:shadow-[0_0_40px_rgba(248,113,113,0.2)]' },
  { name: 'SPONSOR', price: 2999, color: 'text-amber-400', icon: Crown, glow: 'group-hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]' },
];

const cases = [
  { name: 'КЕЙС С ДОНАТОМ', price: 99, color: 'text-[var(--theme-main)]', icon: Package, glow: 'group-hover:shadow-[0_0_40px_var(--theme-glow)]' },
  { name: 'КЕЙС С ТИТУЛАМИ', price: 49, color: 'text-[var(--theme-sec)]', icon: Gift, glow: 'group-hover:shadow-[0_0_40px_var(--theme-glow)]' },
  { name: 'КЕЙС С МОНЕТАМИ', price: 79, color: 'text-yellow-400', icon: Box, glow: 'group-hover:shadow-[0_0_40px_rgba(250,204,21,0.2)]' },
];

const currency = [
  { name: '1000 МОНЕТ', price: 50, color: 'text-emerald-300', icon: Coins, glow: 'group-hover:shadow-[0_0_40px_rgba(110,231,183,0.2)]' },
  { name: '5000 МОНЕТ', price: 200, color: 'text-emerald-400', icon: Banknote, glow: 'group-hover:shadow-[0_0_40px_rgba(52,211,153,0.2)]' },
  { name: '10000 МОНЕТ', price: 350, color: 'text-emerald-500', icon: Gem, glow: 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]' },
];

export default function DonatePage() {
  const [activeTab, setActiveTab] = useState<'ranks' | 'cases' | 'currency'>('ranks');
  const [promoCode, setPromoCode] = useState('');
  
  const upperPromo = promoCode.toUpperCase();
  let discount = 1;
  let discountText = '';
  
  if (upperPromo === 'SECRET20') { 
    discount = 0.8; 
    discountText = '-20%'; 
  } else if (upperPromo === 'O_M_G') { 
    discount = 0.7; 
    discountText = '-30%'; 
  }
  
  const isPromoValid = discount < 1;

  const getItems = () => {
    switch(activeTab) {
      case 'ranks': return ranks;
      case 'cases': return cases;
      case 'currency': return currency;
    }
  };

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
        className="text-5xl md:text-7xl font-black mb-10 text-center tracking-tight text-white uppercase drop-shadow-2xl transition-all duration-500"
      >
        МАГАЗИН
      </motion.h2>

      {/* Public Promo Banner */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.1 }}
        className="mb-10 w-full max-w-2xl bg-[#0a0a0a]/90 border border-[var(--theme-main)]/30 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_var(--theme-glow)] backdrop-blur-2xl relative overflow-hidden group transition-all duration-500"
      >
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--theme-main)]/10 to-transparent skew-x-12 pointer-events-none will-change-transform transition-colors duration-500"
        />
        
        <div className="flex items-center gap-5 text-center sm:text-left relative z-10">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="p-4 bg-[var(--theme-main)]/10 rounded-2xl border border-[var(--theme-main)]/30 shadow-[0_0_15px_var(--theme-glow)] transition-all duration-500"
          >
            <Sparkles className="text-[var(--theme-main)] transition-colors duration-500" size={32} />
          </motion.div>
          <div>
            <div className="font-black text-white text-2xl mb-1 uppercase tracking-wide">Специальное предложение</div>
            <div className="text-sm text-white/70 font-medium">
              Используй промокод <span className="text-[var(--theme-main)] font-mono font-bold bg-[var(--theme-main)]/10 px-2 py-0.5 rounded border border-[var(--theme-main)]/30 transition-colors duration-500">o_m_g</span> для скидки 30%
            </div>
          </div>
        </div>
        <button 
          onClick={() => setPromoCode('o_m_g')} 
          className="px-8 py-4 bg-[var(--theme-main)] hover:bg-[var(--theme-sec)] text-black rounded-xl font-black uppercase tracking-widest transition-all whitespace-nowrap relative z-10 shadow-[0_0_20px_var(--theme-glow)] hover:scale-105"
        >
          Применить
        </button>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 p-2 bg-[#0a0a0a]/80 border border-white/10 rounded-2xl backdrop-blur-2xl mb-10 shadow-2xl relative">
        <TabButton id="ranks" active={activeTab === 'ranks'} onClick={() => setActiveTab('ranks')}>Привилегии</TabButton>
        <TabButton id="cases" active={activeTab === 'cases'} onClick={() => setActiveTab('cases')}>Кейсы</TabButton>
        <TabButton id="currency" active={activeTab === 'currency'} onClick={() => setActiveTab('currency')}>Валюта</TabButton>
      </div>

      {/* Promo Code Input */}
      <div className="mb-12 flex items-center gap-3 w-full max-w-md">
        <div className="relative flex-grow group">
          <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[var(--theme-main)] transition-colors duration-500" size={20} />
          <input 
            type="text" 
            placeholder="ПРОМОКОД" 
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full bg-[#0a0a0a]/90 border-2 border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white font-bold placeholder:text-white/30 focus:outline-none focus:border-[var(--theme-main)]/50 transition-colors uppercase shadow-inner"
          />
        </div>
        <AnimatePresence>
          {isPromoValid && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: -20 }} 
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="px-6 py-4 rounded-2xl bg-[var(--theme-main)] text-black font-black text-lg whitespace-nowrap shadow-[0_0_20px_var(--theme-glow)] transition-colors duration-500"
            >
              {discountText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="w-full min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
          >
            {getItems().map((item, index) => {
              const finalPrice = Math.round(item.price * discount);
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.05 }}
                  className={`flex flex-col items-center p-8 rounded-[2rem] bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-2xl transition-all duration-500 group ${item.glow} hover:-translate-y-3 hover:bg-[#111] relative overflow-hidden`}
                >
                  {/* Optimized: Sweeping light only on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12 pointer-events-none" />
                  
                  <div className="flex flex-col items-center w-full relative z-10">
                    <h3 className={`text-2xl font-black mb-2 tracking-widest uppercase ${item.color} text-center drop-shadow-md transition-colors duration-500`}>
                      {item.name}
                    </h3>
                    <div className="flex-grow flex items-center justify-center my-8">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative">
                        {/* Optimized: Pulse only on hover */}
                        <div className={`absolute inset-0 rounded-full bg-current blur-xl opacity-0 group-hover:opacity-30 group-hover:animate-pulse transition-opacity duration-500 ${item.color}`} />
                        
                        <div className={`relative z-10 ${item.color} drop-shadow-[0_0_15px_currentColor] transition-colors duration-500`}>
                          <item.icon size={48} strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 w-full">
                    <LiquidButton 
                      price={finalPrice} 
                      originalPrice={item.price} 
                      itemName={item.name}
                      promoCode={isPromoValid ? promoCode : undefined}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="mt-20 p-8 rounded-3xl bg-[#0a0a0a]/80 border border-white/10 text-center text-white/50 max-w-2xl backdrop-blur-2xl text-sm font-medium shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[var(--theme-main)] to-transparent opacity-50 transition-colors duration-500" />
        Покупая донат, вы соглашаетесь с правилами сервера. Все средства идут на развитие проекта.
        <br/>
        <span className="text-white/80 mt-4 block text-base">Покупка только через <span className="text-[var(--theme-main)] font-bold transition-colors duration-500">@Idk_friends</span></span>
      </div>
    </motion.div>
  );
}

function TabButton({ active, onClick, children, id }: { active: boolean, onClick: () => void, children: React.ReactNode, id: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 ${
        active ? 'text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
      }`}
    >
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-gradient-to-r from-[var(--theme-main)] to-[var(--theme-sec)] rounded-xl shadow-[0_0_20px_var(--theme-glow)] transition-colors duration-500"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
      <span className="relative z-10 drop-shadow-md">{children}</span>
    </button>
  );
}
