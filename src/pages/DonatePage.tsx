import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Sparkles } from 'lucide-react';
import NeonWater from '../components/NeonWater';
import LiquidButton from '../components/LiquidButton';

const ranks = [
  { name: 'VIP', price: 99, color: 'text-emerald-400', glow: 'group-hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]' },
  { name: 'PREMIUM', price: 199, color: 'text-blue-400', glow: 'group-hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]' },
  { name: 'HOLY', price: 399, color: 'text-violet-400', glow: 'group-hover:shadow-[0_0_30px_rgba(167,139,250,0.15)]' },
  { name: 'TITAN', price: 699, color: 'text-red-400', glow: 'group-hover:shadow-[0_0_30px_rgba(248,113,113,0.15)]' },
  { name: 'DRAGON', price: 999, color: 'text-pink-400', glow: 'group-hover:shadow-[0_0_30px_rgba(244,114,182,0.15)]' },
  { name: 'AVENGER', price: 1499, color: 'text-teal-400', glow: 'group-hover:shadow-[0_0_30px_rgba(45,212,191,0.15)]' },
  { name: 'PHANTOM', price: 1999, color: 'text-amber-400', glow: 'group-hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]' },
  { name: 'SPONSOR', price: 2999, color: 'text-rose-400', glow: 'group-hover:shadow-[0_0_30px_rgba(251,113,133,0.15)]' },
];

const cases = [
  { name: 'КЕЙС С ДОНАТОМ', price: 99, color: 'text-indigo-400', glow: 'group-hover:shadow-[0_0_30px_rgba(129,140,248,0.15)]' },
  { name: 'КЕЙС С ТИТУЛАМИ', price: 49, color: 'text-fuchsia-400', glow: 'group-hover:shadow-[0_0_30px_rgba(232,121,249,0.15)]' },
  { name: 'КЕЙС С МОНЕТАМИ', price: 79, color: 'text-yellow-400', glow: 'group-hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]' },
];

const currency = [
  { name: '1000 МОНЕТ', price: 50, color: 'text-yellow-300', glow: 'group-hover:shadow-[0_0_30px_rgba(253,224,71,0.15)]' },
  { name: '5000 МОНЕТ', price: 200, color: 'text-yellow-400', glow: 'group-hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]' },
  { name: '10000 МОНЕТ', price: 350, color: 'text-yellow-500', glow: 'group-hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]' },
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
    <>
    <NeonWater />
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl flex flex-col items-center relative z-10"
    >
      <h2 className="text-4xl md:text-5xl font-black mb-8 text-center uppercase tracking-widest text-white drop-shadow-lg">
        Магазин
      </h2>

      {/* Public Promo Banner */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8 w-full max-w-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(168,85,247,0.15)] backdrop-blur-md"
      >
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="p-3 bg-white/10 rounded-full">
            <Sparkles className="text-purple-400" size={24} />
          </div>
          <div>
            <div className="font-bold text-white text-lg">Специальное предложение!</div>
            <div className="text-sm text-white/70">
              Используй промокод <span className="text-purple-400 font-mono font-bold bg-purple-500/10 px-2 py-0.5 rounded">o_m_g</span> для скидки 30%
            </div>
          </div>
        </div>
        <button 
          onClick={() => setPromoCode('o_m_g')} 
          className="px-6 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-bold text-sm transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] whitespace-nowrap"
        >
          Применить
        </button>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl mb-10">
        <TabButton active={activeTab === 'ranks'} onClick={() => setActiveTab('ranks')}>Привилегии</TabButton>
        <TabButton active={activeTab === 'cases'} onClick={() => setActiveTab('cases')}>Кейсы</TabButton>
        <TabButton active={activeTab === 'currency'} onClick={() => setActiveTab('currency')}>Валюта</TabButton>
      </div>

      {/* Promo Code Input */}
      <div className="mb-10 flex items-center gap-3 w-full max-w-md">
        <div className="relative flex-grow">
          <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input 
            type="text" 
            placeholder="Промокод" 
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors uppercase"
          />
        </div>
        <AnimatePresence>
          {isPromoValid && (
            <motion.div 
              initial={{ opacity: 0, x: -10, width: 0 }} 
              animate={{ opacity: 1, x: 0, width: 'auto' }}
              exit={{ opacity: 0, x: -10, width: 0 }}
              className="px-4 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-bold text-sm whitespace-nowrap overflow-hidden"
            >
              {discountText} Активен
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className={`flex flex-col items-center p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl transition-all duration-500 group ${item.glow}`}
                >
                  <h3 className={`text-2xl font-black mb-2 tracking-wider ${item.color} drop-shadow-md group-hover:scale-105 transition-transform duration-500 text-center`}>
                    {item.name}
                  </h3>
                  <div className="flex-grow flex items-center justify-center my-8">
                    {/* Visual placeholder for item icon/image */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 shadow-inner flex items-center justify-center group-hover:rotate-6 transition-transform duration-500">
                      <div className={`w-10 h-10 rounded-full bg-current opacity-20 ${item.color}`} />
                    </div>
                  </div>
                  <LiquidButton 
                    price={finalPrice} 
                    originalPrice={item.price} 
                    itemName={item.name}
                    promoCode={isPromoValid ? promoCode : undefined}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="mt-16 p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center text-white/50 max-w-2xl backdrop-blur-md">
        Покупая донат, вы соглашаетесь с правилами сервера. Все средства идут на развитие проекта.
        <br/>
        <span className="text-white/80 font-medium mt-3 block">Покупка только через <span className="text-indigo-400">@Idk_friends</span></span>
      </div>
    </motion.div>
    </>
  );
}

function TabButton({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-300 ${
        active 
          ? 'bg-white/10 text-white shadow-lg' 
          : 'text-white/40 hover:text-white/80 hover:bg-white/5'
      }`}
    >
      {children}
    </button>
  );
}
