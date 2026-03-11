import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Check } from 'lucide-react';

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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const textToCopy = `Товар: ${itemName}\n${promoCode ? `Промокод: ${promoCode}\n` : ''}Цена: ${price}₽\n\nПривет, я хочу купить донат!`;
    navigator.clipboard.writeText(textToCopy);
    
    setShowModal(true);
    
    // Close modal after 3.5 seconds and redirect
    setTimeout(() => {
      setShowModal(false);
      setTimeout(() => {
        window.open('https://t.me/Idk_friends', '_blank');
      }, 400); // Wait for exit animation to finish
    }, 3500);
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
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-sm w-full relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-indigo-500/20 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mb-6 relative z-10">
              <Check size={40} className="text-green-400" />
            </div>
            
            <h3 className="text-2xl font-black text-white mb-3 relative z-10">Текст скопирован!</h3>
            <p className="text-white/60 mb-8 relative z-10">
              Отправьте его создателю. Сейчас вы будете перенаправлены в Telegram...
            </p>
            
            <div className="w-full bg-white/5 rounded-full h-1.5 mb-2 relative z-10 overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.5, ease: "linear" }}
                className="h-full bg-indigo-500 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button 
        onClick={handleClick}
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
        
        {/* Liquid elements - hidden at bottom, rise on hover */}
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
