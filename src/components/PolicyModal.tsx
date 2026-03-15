import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function PolicyModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[#050505]/90 backdrop-blur-xl p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col w-full max-w-2xl relative overflow-hidden max-h-[85vh]"
          >
            <button 
              onClick={() => {
                soundManager.play('cancel', 0.4);
                onClose();
              }}
              className="absolute top-6 right-6 p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-colors z-20"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-inner">
                <FileText className="text-white/70" size={24} />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">
                Документация
              </h2>
            </div>

            <div className="overflow-y-auto custom-scrollbar pr-4 relative z-10 text-white/70 space-y-6 text-sm leading-relaxed">
              <section>
                <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-wider">1. Общие положения</h3>
                <p>Настоящий документ является официальной публичной офертой проекта «One World». Использование сайта, а также совершение любых покупок или пожертвований означает полное и безоговорочное согласие пользователя с условиями данного соглашения.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-wider">2. Политика возврата средств</h3>
                <p>Все денежные средства, переведенные в рамках проекта, классифицируются как добровольные пожертвования на развитие сервера.</p>
                <p className="mt-2 text-red-400 font-semibold">Возврат денежных средств после совершения транзакции строго не предусмотрен ни при каких обстоятельствах.</p>
                <p className="mt-2">Это правило распространяется на все случаи, включая, но не ограничиваясь: блокировку аккаунта за нарушение правил сервера, утрату доступа к аккаунту, вайп (сброс) игрового мира или полное закрытие проекта.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-wider">3. Территориальные ограничения</h3>
                <p>В связи с текущими юридическими и техническими ограничениями, <strong className="text-white">совершение покупок, пожертвований и использование платных функций с территории Российской Федерации (РФ) строго запрещено</strong>.</p>
                <p className="mt-2">Любые попытки обхода данной блокировки (в том числе с использованием VPN-сервисов) являются прямым нарушением настоящего соглашения и могут привести к перманентной блокировке аккаунта без возможности обжалования.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-wider">4. Отказ от ответственности</h3>
                <p>Все цифровые товары, привилегии и внутриигровая валюта предоставляются по принципу «как есть» (as is). Администрация проекта не несет ответственности за возможные технические сбои, перебои в работе хостинга или потерю виртуальных ценностей в результате непредвиденных игровых ошибок.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-wider">5. Политика Cookies</h3>
                <p>Наш сайт использует файлы cookie для обеспечения базовой функциональности, анализа трафика и сохранения пользовательских настроек. Продолжая использовать сайт после прохождения проверки безопасности, вы даете согласие на сбор и обработку данных файлов.</p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <button 
                onClick={() => {
                  soundManager.play('click', 0.5);
                  onClose();
                }}
                onMouseEnter={() => soundManager.play('hover', 0.2)}
                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all flex items-center justify-center uppercase tracking-widest text-sm"
              >
                Я ознакомлен
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
