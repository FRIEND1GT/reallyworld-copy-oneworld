import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Sparkles, Star, Shield, Zap, Swords, Flame, Skull, Ghost, Crown, Package, Gift, Box, Coins, Banknote, Gem } from 'lucide-react';
import LiquidButton from '../components/LiquidButton';

const ranks = [
  { name: 'VIP', price: 33, color: 'text-zinc-300', icon: Star, glow: 'group-hover:shadow-[0_0_40px_rgba(212,212,216,0.3)]' },
  { name: 'PREMIUM', price: 66, color: 'text-blue-400', icon: Shield, glow: 'group-hover:shadow-[0_0_40px_rgba(96,165,250,0.3)]' },
  { name: 'HOLY', price: 133, color: 'text-indigo-400', icon: Zap, glow: 'group-hover:shadow-[0_0_40px_rgba(129,140,248,0.3)]' },
  { name: 'TITAN', price: 233, color: 'text-violet-400', icon: Swords, glow: 'group-hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]' },
  { name: 'DRAGON', price: 333, color: 'text-orange-500', icon: Flame, glow: 'group-hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]', popular: true },
  { name: 'AVENGER', price: 499, color: 'text-rose-400', icon: Skull, glow: 'group-hover:shadow-[0_0_40px_rgba(251,113,133,0.3)]' },
  { name: 'PHANTOM', price: 666, color: 'text-red-400', icon: Ghost, glow: 'group-hover:shadow-[0_0_40px_rgba(248,113,113,0.3)]' },
  { name: 'SPONSOR', price: 999, color: 'text-amber-400', icon: Crown, glow: 'group-hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]' },
];

const cases = [
  { name: 'КЕЙС С ДОНАТОМ', price: 33, color: 'text-[var(--theme-main)]', icon: Package, glow: 'group-hover:shadow-[0_0_40px_var(--theme-glow)]' },
  { name: 'КЕЙС С ТИТУЛАМИ', price: 16, color: 'text-[var(--theme-sec)]', icon: Gift, glow: 'group-hover:shadow-[0_0_40px_var(--theme-glow)]' },
  { name: 'КЕЙС С МОНЕТАМИ', price: 26, color: 'text-yellow-400', icon: Box, glow: 'group-hover:shadow-[0_0_40px_rgba(250,204,21,0.3)]' },
];

const currency = [
  { name: '1000 МОНЕТ', price: 16, color: 'text-emerald-300', icon: Coins, glow: 'group-hover:shadow-[0_0_40px_rgba(110,231,183,0.3)]' },
  { name: '5000 МОНЕТ', price: 66, color: 'text-emerald-400', icon: Banknote, glow: 'group-hover:shadow-[0_0_40px_rgba(52,211,153,0.3)]' },
  { name: '10000 МОНЕТ', price: 116, color: 'text-emerald-500', icon: Gem, glow: 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]' },
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
        className="text-5xl md:text-7xl font-display font-black mb-10 text-center tracking-tighter text-white uppercase drop-shadow-2xl transition-all duration-500"
      >
        МАГАЗИН
      </motion.h2>

      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-[#0a0a0a]/80 border border-white/10 rounded-[2rem] p-6 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <h3 className="text-xl font-display font-black uppercase tracking-widest mb-6 flex items-center gap-3">
              <Sparkles className="text-[var(--theme-main)]" />
              Категории
            </h3>
            <div className="flex flex-col gap-3">
              <TabButton active={activeTab === 'ranks'} onClick={() => setActiveTab('ranks')} icon={<Crown size={20} />} text="Привилегии" />
              <TabButton active={activeTab === 'cases'} onClick={() => setActiveTab('cases')} icon={<Package size={20} />} text="Кейсы" />
              <TabButton active={activeTab === 'currency'} onClick={() => setActiveTab('currency')} icon={<Coins size={20} />} text="Валюта" />
            </div>
          </div>

          <div className="bg-[#0a0a0a]/80 border border-white/10 rounded-[2rem] p-6 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-main)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-xl font-display font-black uppercase tracking-widest mb-6 flex items-center gap-3 relative z-10">
              <Tag className="text-[var(--theme-main)]" />
              Промокод
            </h3>
            <div className="relative z-10">
              <div className="relative group/input">
                <div className={`absolute -inset-0.5 rounded-xl blur opacity-20 transition duration-500 ${isPromoValid ? 'bg-emerald-500 opacity-40' : 'bg-gradient-to-r from-[var(--theme-main)] to-[var(--theme-sec)] group-hover/input:opacity-40'}`}></div>
                <input 
                  type="text" 
                  placeholder="Введите код..." 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className={`relative w-full bg-[#050505] border rounded-xl py-4 pl-5 pr-12 text-white placeholder:text-white/30 focus:outline-none transition-colors uppercase font-bold tracking-wider ${isPromoValid ? 'border-emerald-500/50 focus:border-emerald-500' : 'border-white/10 focus:border-[var(--theme-main)]/50'}`}
                />
                <Tag size={20} className={`absolute right-5 top-1/2 -translate-y-1/2 transition-colors ${isPromoValid ? 'text-emerald-500' : 'text-white/30 group-focus-within/input:text-[var(--theme-main)]'}`} />
              </div>
              
              <AnimatePresence>
                {isPromoValid && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="text-emerald-400 text-sm font-bold flex items-center gap-2"
                  >
                    <Sparkles size={14} /> Промокод применен: {discountText}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="bg-[#0a0a0a]/80 border border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl min-h-[600px] shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {getItems().map((item, idx) => {
                  const Icon = item.icon;
                  const finalPrice = Math.floor(item.price * discount);
                  
                  return (
                      <motion.div
                      layout
                      initial={{ opacity: 0, x: idx % 2 === 0 ? -150 : 150, skewX: idx % 2 === 0 ? -5 : 5 }}
                      animate={{ opacity: 1, x: 0, skewX: 0 }}
                      exit={{ opacity: 0, x: idx % 2 === 0 ? 150 : -150, skewX: idx % 2 === 0 ? 5 : -5 }}
                      transition={{ type: "spring", stiffness: 250, damping: 25, delay: idx * 0.05 }}
                      key={item.name}
                      className={`relative bg-[#050505] border ${(item as any).popular ? 'border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.15)] scale-[1.02]' : 'border-white/10'} rounded-[2rem] p-6 flex flex-col items-center justify-between group transition-all duration-500 hover:border-white/20 hover:-translate-y-2 ${item.glow}`}
                    >
                      {(item as any).popular && (
                        <>
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.5)] z-20 animate-bounce">
                            Хит продаж
                          </div>
                          <FireEffect />
                        </>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] z-0" />
                      
                      <div className="relative z-10 flex flex-col items-center w-full">
                        <div className={`w-20 h-20 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner ${item.color}`}>
                          <Icon size={40} className="drop-shadow-[0_0_15px_currentColor]" />
                        </div>
                        
                        <h4 className={`text-2xl font-display font-black uppercase tracking-tight mb-8 text-center ${item.color} drop-shadow-md`}>
                          {item.name}
                        </h4>
                      </div>

                      <div className="w-full relative z-10">
                        <LiquidButton 
                          price={finalPrice} 
                          originalPrice={isPromoValid ? item.price : undefined}
                          itemName={item.name}
                          promoCode={isPromoValid ? upperPromo : undefined}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon, text }: { active: boolean, onClick: () => void, icon: React.ReactNode, text: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-500 overflow-hidden group w-full text-left ${
        active 
          ? 'text-white shadow-[0_0_30px_var(--theme-glow)]' 
          : 'text-white/50 hover:text-white hover:bg-white/5'
      }`}
    >
      {active && (
        <motion.div 
          layoutId="donate-tab-active"
          className="absolute inset-0 bg-gradient-to-r from-[var(--theme-main)] to-[var(--theme-sec)] rounded-xl"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-4">
        <div className={active ? 'text-white drop-shadow-md' : 'text-[var(--theme-main)] transition-colors duration-500 group-hover:drop-shadow-[0_0_10px_var(--theme-glow)]'}>
          {icon}
        </div>
        <span className={`font-bold tracking-widest uppercase text-sm ${active ? 'text-white drop-shadow-md' : ''}`}>{text}</span>
      </span>
    </button>
  );
}

function FireEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none z-0">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-orange-600/20 to-transparent mix-blend-screen" />
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-10px] w-6 h-6 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full mix-blend-screen blur-[6px]"
          style={{ left: `${5 + Math.random() * 90}%` }}
          initial={{ y: 0, opacity: 0, scale: 0.5 + Math.random() }}
          animate={{ 
            y: -150 - Math.random() * 150, 
            x: (Math.random() - 0.5) * 60,
            opacity: [0, 0.8, 0],
            scale: 0.1
          }}
          transition={{ 
            duration: 1 + Math.random() * 1.5, 
            repeat: Infinity, 
            delay: Math.random() * 2,
            ease: "easeIn"
          }}
        />
      ))}
    </div>
  );
}
