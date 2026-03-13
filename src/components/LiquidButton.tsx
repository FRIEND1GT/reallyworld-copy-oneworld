import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Check, X, User, CreditCard, Send, Mail, ArrowRight, Copy } from 'lucide-react';

export default function LiquidButton({ 
  price, 
  originalPrice,
  itemName,
  promoCode
}: { 
  price: number, 
  originalPrice?: number,
  itemName: string,
  promoCode?: string
}) {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Modal states
  const [step, setStep] = useState<number | 'tg_success'>(1);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Base colors for the liquid effect depending on price
  let color1 = 'rgba(16, 185, 129, 0.8)'; // emerald
  let color2 = 'rgba(5, 150, 105, 0.6)';
  
  if (price >= 149) { color1 = 'rgba(59, 130, 246, 0.8)'; color2 = 'rgba(37, 99, 235, 0.6)'; } // blue
  if (price >= 399) { color1 = 'rgba(139, 92, 246, 0.8)'; color2 = 'rgba(109, 40, 217, 0.6)'; } // violet
  if (price >= 699) { color1 = 'rgba(239, 68, 68, 0.8)'; color2 = 'rgba(220, 38, 38, 0.6)'; } // red
  if (price >= 1499) { color1 = 'rgba(236, 72, 153, 0.8)'; color2 = 'rgba(219, 39, 119, 0.6)'; } // pink
  if (price >= 1999) { color1 = 'rgba(20, 184, 166, 0.8)'; color2 = 'rgba(13, 148, 136, 0.6)'; } // teal
  if (price >= 2999) { color1 = 'rgba(245, 158, 11, 0.8)'; color2 = 'rgba(217, 119, 6, 0.6)'; } // amber

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      setStep(1);
      setNickname('');
      setEmail('');
    }, 300);
  };

  const handleTgSubmit = () => {
    const textToCopy = `Ник: ${nickname}\nТовар: ${itemName}\nЦена: ${price}₽\n${promoCode ? `Промокод: ${promoCode}\n` : ''}\nПривет, я хочу купить донат ${itemName} за ${price}₽${promoCode ? ` с промокодом ${promoCode}` : ''}!`;
    navigator.clipboard.writeText(textToCopy);
    
    setStep('tg_success');
    
    setTimeout(() => {
      window.open('https://t.me/Idk_friends', '_blank');
      handleClose();
    }, 3500);
  };

  const handleMonoSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Отправка уведомления на email через Web3Forms
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Пользователю нужно будет заменить это
          subject: `Новая покупка: ${itemName} от ${nickname}`,
          from_name: 'OneWorld Store',
          message: `Новая заявка на покупку (Monobank)!\n\nНик: ${nickname}\nEmail: ${email}\nТовар: ${itemName}\nЦена: ${price}₽\nПромокод: ${promoCode || 'Нет'}`
        })
      });
    } catch (e) {
      console.error('Ошибка отправки email', e);
    }
    setIsSubmitting(false);
    setStep(4); // Переход к показу карты
  };

  const modalContent = (
    <AnimatePresence>
      {showModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col max-w-md w-full relative overflow-hidden"
          >
            {/* Close button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20"
            >
              <X size={20} />
            </button>

            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 w-full">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: NICKNAME */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <div className="w-12 h-12 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center mb-4">
                      <User className="text-indigo-400" size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Укажите ваш ник</h3>
                    <p className="text-white/50 text-sm mb-6">Введите никнейм, на который будет выдан донат</p>
                    
                    <input 
                      type="text" 
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Ваш ник в игре"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors mb-4"
                    />
                    
                    <button 
                      disabled={!nickname.trim()}
                      onClick={() => setStep(2)}
                      className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-white/5 disabled:text-white/30 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      Далее <ArrowRight size={18} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: PAYMENT METHOD */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-2xl flex items-center justify-center mb-4">
                      <CreditCard className="text-purple-400" size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Способ оплаты</h3>
                    <p className="text-white/50 text-sm mb-6">Выберите удобный для вас способ оплаты</p>
                    
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={handleTgSubmit}
                        className="w-full p-4 bg-[#2AABEE]/10 hover:bg-[#2AABEE]/20 border border-[#2AABEE]/30 rounded-xl flex items-center gap-4 transition-all group"
                      >
                        <div className="w-10 h-10 bg-[#2AABEE] rounded-full flex items-center justify-center text-white">
                          <Send size={18} className="-ml-1 mt-0.5" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-white group-hover:text-[#2AABEE] transition-colors">Telegram</div>
                          <div className="text-xs text-white/50">Быстрая оплата через создателя</div>
                        </div>
                      </button>

                      <button 
                        onClick={() => setStep(3)}
                        className="w-full p-4 bg-black hover:bg-zinc-900 border border-white/10 hover:border-white/20 rounded-xl flex items-center gap-4 transition-all group"
                      >
                        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-white">
                          <CreditCard size={18} />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-white">Monobank</div>
                          <div className="text-xs text-white/50">Перевод на карту (Украина)</div>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: MONOBANK EMAIL */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <div className="w-12 h-12 bg-zinc-800 border border-white/10 rounded-2xl flex items-center justify-center mb-4">
                      <Mail className="text-white/80" size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Укажите ваш Email</h3>
                    <p className="text-white/50 text-sm mb-6">Нам нужен ваш email, чтобы отправить уведомление о покупке создателю.</p>
                    
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors mb-4"
                    />
                    
                    <button 
                      disabled={!email.includes('@') || isSubmitting}
                      onClick={handleMonoSubmit}
                      className="w-full py-3 bg-white text-black hover:bg-gray-200 disabled:bg-white/10 disabled:text-white/30 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Отправка...' : 'Далее'} <ArrowRight size={18} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 4: MONOBANK CARD DETAILS */}
                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mb-4">
                      <CreditCard className="text-green-400" size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Оплата Monobank</h3>
                    <p className="text-white/70 mb-4">
                      Переведите <span className="font-bold text-green-400">{price}₽</span> на эту карту:
                    </p>
                    
                    <div className="w-full bg-black/50 border border-white/10 rounded-xl p-4 mb-6 relative group">
                      <div className="font-mono text-2xl tracking-[0.15em] text-white">
                        4874 0700 7097 3738
                      </div>
                      <button 
                        onClick={() => navigator.clipboard.writeText('4874070070973738')}
                        className="absolute top-2 right-2 p-2 bg-white/5 hover:bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Скопировать карту"
                      >
                        <Copy size={16} className="text-white/70" />
                      </button>
                    </div>

                    <p className="text-sm text-white/50 mb-6">
                      После успешного перевода, пожалуйста, отправьте скриншот чека создателю в Telegram.
                    </p>
                    
                    <button 
                      onClick={() => window.open('https://t.me/Idk_friends', '_blank')}
                      className="w-full py-3 bg-[#2AABEE] hover:bg-[#229ED9] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <Send size={18} /> Я оплатил, скинуть чек
                    </button>
                  </motion.div>
                )}

                {/* TG SUCCESS STEP */}
                {step === 'tg_success' && (
                  <motion.div key="tg_success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-4">
                    <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mb-6">
                      <Check size={40} className="text-green-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3">Текст скопирован!</h3>
                    <p className="text-white/60 mb-8">
                      Отправьте его создателю. Сейчас вы будете перенаправлены в Telegram...
                    </p>
                    <div className="w-full bg-white/5 rounded-full h-1.5 mb-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.5, ease: "linear" }}
                        className="h-full bg-indigo-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button 
        onClick={handleOpen}
        className="relative block w-full h-14 rounded-2xl font-bold text-white bg-[#0a0a0a] border border-white/10 overflow-hidden group transition-all hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
      >
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 drop-shadow-md">
          <ShoppingCart size={18} />
          {originalPrice && originalPrice !== price ? (
            <div className="flex items-center gap-2">
              <span className="line-through text-white/40 text-sm font-medium">{originalPrice}₽</span>
              <span className="text-green-400">{price}₽</span>
            </div>
          ) : (
            <span>{price}₽</span>
          )}
        </div>
        
        {/* Liquid elements */}
        <motion.div 
          className="absolute left-1/2 top-[50px] w-[200px] h-[200px] -translate-x-1/2 rounded-[40%] transition-all duration-500 group-hover:top-[-20px] opacity-60 mix-blend-screen"
          style={{ backgroundColor: color1 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute left-1/2 top-[55px] w-[210px] h-[210px] -translate-x-1/2 rounded-[45%] transition-all duration-500 group-hover:top-[-15px] opacity-60 mix-blend-screen"
          style={{ backgroundColor: color2 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </button>
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
