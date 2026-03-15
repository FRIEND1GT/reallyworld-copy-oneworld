import { useState } from 'react';
import { Settings, X, Monitor, Cpu, Eye, Zap, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings } from '../SettingsContext';
import { soundManager } from '../utils/sound';

export default function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    enableShaders, setEnableShaders, 
    enableBlur, setEnableBlur, 
    showFPS, setShowFPS,
    enableAnimations, setEnableAnimations,
    optimizeAll
  } = useSettings();

  const handleOpen = () => {
    soundManager.play('click', 0.5);
    setIsOpen(true);
  };

  const handleClose = () => {
    soundManager.play('click', 0.5);
    setIsOpen(false);
  };

  const handleOptimize = () => {
    soundManager.play('success', 0.5);
    optimizeAll();
  };

  return (
    <>
      <button 
        onClick={handleOpen}
        onMouseEnter={() => soundManager.play('hover', 0.2)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md hover:bg-white/10 transition-colors group shadow-lg"
      >
        <Settings className="text-white/70 group-hover:text-white transition-all group-hover:rotate-90 duration-500" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={handleClose}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
                  <Settings className="text-[var(--theme-main)]" />
                  Настройки
                </h3>
                <button onClick={handleClose} className="text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                  <X />
                </button>
              </div>

              <div className="space-y-3">
                <ToggleItem 
                  icon={<Monitor />} 
                  title="Шейдеры (Фон)" 
                  description="Отключите для повышения FPS" 
                  checked={enableShaders} 
                  onChange={setEnableShaders} 
                />
                <ToggleItem 
                  icon={<Activity />} 
                  title="Анимации" 
                  description="Плавные переходы и движения" 
                  checked={enableAnimations} 
                  onChange={setEnableAnimations} 
                />
                <ToggleItem 
                  icon={<Eye />} 
                  title="Размытие (Blur)" 
                  description="Красивые эффекты стекла" 
                  checked={enableBlur} 
                  onChange={setEnableBlur} 
                />
              </div>

              <div className="p-4 bg-[var(--theme-main)]/10 border border-[var(--theme-main)]/20 rounded-xl flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <Zap className="text-[var(--theme-main)] shrink-0" />
                  <p className="text-xs text-white/70 font-medium leading-relaxed">
                    Система оптимизации автоматически подстраивает рендеринг под ваше устройство. Отключение шейдеров значительно снизит нагрузку на видеокарту.
                  </p>
                </div>
                <button 
                  onClick={handleOptimize}
                  onMouseEnter={() => soundManager.play('hover', 0.2)}
                  className="w-full py-2 bg-[var(--theme-main)]/20 hover:bg-[var(--theme-main)]/40 text-[var(--theme-main)] font-bold rounded-lg transition-colors text-sm uppercase tracking-wider"
                >
                  Максимальная производительность
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ToggleItem({ icon, title, description, checked, onChange }: any) {
  const handleChange = () => {
    soundManager.play('click', 0.4);
    onChange(!checked);
  };

  return (
    <div 
      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group" 
      onClick={handleChange}
      onMouseEnter={() => soundManager.play('hover', 0.1)}
    >
      <div className="flex items-center gap-4">
        <div className="text-[var(--theme-main)] transition-colors duration-500">{icon}</div>
        <div>
          <div className="font-bold text-white text-sm">{title}</div>
          <div className="text-xs text-white/50">{description}</div>
        </div>
      </div>
      <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-[var(--theme-main)]' : 'bg-white/10'}`}>
        <motion.div 
          layout
          className="w-4 h-4 bg-white rounded-full shadow-md"
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </div>
  );
}
