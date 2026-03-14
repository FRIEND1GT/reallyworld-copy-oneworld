import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Check, X, User, CreditCard, Send, Mail, ArrowRight, Copy } from 'lucide-react';
import { soundManager } from '../utils/sound';

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
  
  const [step, setStep] = useState<number | 'tg_success'>(1);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Premium Gold/Amber colors
  let color1 = 'rgba(245, 158, 11, 0.8)'; // amber-500
  let color2 = 'rgba(217, 119, 6, 0.6)'; // amber-600
  
  if (price >= 149) { color1 = 'rgba(59, 130, 246, 0.8)'; color2 = 'rgba(37, 99, 235, 0.6)'; } 
  if (price >= 399) { color1 = 'rgba(139, 92, 246, 0.8)'; color2 = 'rgba(109, 40, 217, 0.6)'; } 
  if (price >= 699) { color1 = 'rgba(217, 70, 239, 0.8)'; color2 = 'rgba(192, 38, 211, 0.6)'; } 
  if (price >= 1499) { color1 = 'rgba(244, 63, 94, 0.8)'; color2 = 'rgba(225, 29, 72, 0.6)'; } 
  if (price >= 2999) { color1 = 'rgba(245, 158, 11, 0.9)'; color2 = 'rgba(234, 88, 12, 0.8)'; } 

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    soundManager.play('click', 0.5);
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
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '6b6c9d34-560e-43a2-93a8-d6579ceadc7a',
          subject: `Новая покупка: ${itemName} от ${nickname}`,
          from_name: 'OneWorld Store',
          message: `Новая заявка на покупку (Monobank)!\n\nНик: ${nickname}\nEmail: ${email}\nТовар: ${itemName}\nЦена: ${price}₽\nПромокод: ${promoCode || 'Нет'}`
        })
      });
    } catch (e) {
      console.error('Ошибка отправки email', e);
    }
    setIsSubmitting(false);
    setStep(4);
  };

  const modalContent = (
    <AnimatePresence>
      {showModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]/90 backdrop-blur-xl p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-2xl flex flex-col max-w-md w-full relative overflow-hidden"
          >
            {/* Close button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-colors z-20"
            >
              <X size={20} />
            </button>

            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-amber-500/10 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 w-full">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: NICKNAME */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-6">
                      <User className="text-amber-500" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Укажите ваш ник</h3>
                    <p className="text-white/50 text-sm mb-8">Введите никнейм, на который будет выдан донат</p>
                    
                    <input 
                      type="text" 
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Ваш ник в игре"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors mb-6 shadow-inner"
                    />
                    
                    <button 
                      disabled={!nickname.trim()}
                      onClick={() => setStep(2)}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-white/5 disabled:to-white/5 disabled:text-white/30 text-black rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)] disabled:shadow-none"
                    >
                      Далее <ArrowRight size={20} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: PAYMENT METHOD */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-6">
                      <CreditCard className="text-amber-500" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Способ оплаты</h3>
                    <p className="text-white/50 text-sm mb-8">Выберите удобный для вас способ оплаты</p>
                    
                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={handleTgSubmit}
                        className="w-full p-5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-2xl flex items-center gap-5 transition-all group"
                      >
                        <div className="w-12 h-12 bg-[#2AABEE] rounded-full flex items-center justify-center text-white">
                          <Send size={20} className="-ml-1 mt-0.5" />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-white text-lg">Telegram</div>
                          <div className="text-sm text-white/50">Быстрая оплата через создателя</div>
                        </div>
                      </button>

                      <button 
                        onClick={() => setStep(3)}
                        className="w-full p-5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-2xl flex items-center gap-5 transition-all group"
                      >
                        <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white border border-white/10">
                          <CreditCard size={20} />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-white text-lg">Monobank</div>
                          <div className="text-sm text-white/50">Перевод на карту (Украина)</div>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: MONOBANK EMAIL */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                    <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-6">
                      <Mail className="text-amber-500" size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Укажите ваш Email</h3>
                    <p className="text-white/50 text-sm mb-8">Нам нужен ваш email, чтобы отправить уведомление о покупке создателю.</p>
                    
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-colors mb-6 shadow-inner"
                    />
                    
                    <button 
                      disabled={!email.includes('@') || isSubmitting}
                      onClick={handleMonoSubmit}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-white/5 disabled:to-white/5 disabled:text-white/30 text-black rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.2)] disabled:shadow-none"
                    >
                      {isSubmitting ? 'Отправка...' : 'Далее'} <ArrowRight size={20} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 4: MONOBANK CARD DETAILS */}
                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mb-6">
                      <CreditCard className="text-amber-500" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Оплата Monobank</h3>
                    <p className="text-white/70 mb-6 text-lg">
                      Переведите <span className="font-bold text-amber-500">{price}₽</span> на эту карту:
                    </p>
                    
                    <div className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-8 relative group shadow-inner">
                      <div className="font-mono text-2xl tracking-[0.15em] text-white">
                        4874 0700 7097 3738
                      </div>
                      <button 
                        onClick={() => navigator.clipboard.writeText('4874070070973738')}
                        className="absolute top-3 right-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Скопировать карту"
                      >
                        <Copy size={20} className="text-white/70" />
                      </button>
                    </div>

                    <p className="text-sm text-white/50 mb-8">
                      После успешного перевода, пожалуйста, отправьте скриншот чека создателю в Telegram.
                    </p>
                    
                    <button 
                      onClick={() => window.open('https://t.me/Idk_friends', '_blank')}
                      className="w-full py-4 bg-[#2AABEE] hover:bg-[#229ED9] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3"
                    >
                      <Send size={20} /> Я оплатил, скинуть чек
                    </button>
                  </motion.div>
                )}

                {/* TG SUCCESS STEP */}
                {step === 'tg_success' && (
                  <motion.div key="tg_success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-6">
                    <div className="w-24 h-24 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mb-8">
                      <Check size={48} className="text-amber-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Текст скопирован!</h3>
                    <p className="text-white/60 mb-10 text-lg">
                      Отправьте его создателю. Сейчас вы будете перенаправлены в Telegram...
                    </p>
                    <div className="w-full bg-white/5 rounded-full h-1.5 mb-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.5, ease: "linear" }}
                        className="h-full bg-amber-500 rounded-full"
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
        className="relative w-full h-14 overflow-hidden rounded-2xl group bg-[#050505] border border-white/10 transition-all duration-500 hover:border-transparent hover:shadow-[0_0_40px_var(--theme-glow)] active:scale-95"
      >
        {/* Background Fill Animation (Slides in from left) */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-[var(--theme-main)] to-[var(--theme-sec)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
        
        {/* Shine effect that sweeps across after the fill */}
        <div className="absolute inset-0 -translate-x-[150%] group-hover:animate-[shimmer_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />

        <div className="relative z-10 flex items-center justify-between px-6 h-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30 group-hover:bg-white/20 transition-all duration-300">
              <ShoppingCart size={16} className="text-white/70 group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="font-display font-bold tracking-wider uppercase text-sm text-white/70 group-hover:text-white transition-colors duration-300">
              Купить
            </span>
          </div>

          <div className="flex items-center gap-3">
            {originalPrice && originalPrice !== price && (
              <span className="text-sm font-medium text-white/40 line-through decoration-red-500/50">
                {originalPrice}₽
              </span>
            )}
            <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-black text-white group-hover:bg-white/20 group-hover:border-white/30 transition-all duration-300 shadow-inner">
              {price}₽
            </div>
          </div>
        </div>
      </button>
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
