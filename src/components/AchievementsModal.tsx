import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Lock } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useAchievements, ACHIEVEMENTS } from '../AchievementsContext';

export default function AchievementsModal() {
  const { isModalOpen, setIsModalOpen, unlocked, unlockAchievement } = useAchievements();

  if (!isModalOpen) return null;

  const handleClose = () => {
    soundManager.play('cancel', 0.4);
    setIsModalOpen(false);
    unlockAchievement('close_modal');
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[400] flex items-center justify-center bg-[#050505]/90 backdrop-blur-md p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center justify-center">
                <Trophy className="text-yellow-500" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-wider">Ачивки</h2>
                <p className="text-white/40 text-sm font-medium">Открыто: {unlocked.length} / {ACHIEVEMENTS.length}</p>
              </div>
            </div>
            
            <button 
              onClick={handleClose}
              className="text-white/40 hover:text-white transition-colors p-2 bg-white/5 hover:bg-white/10 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* Grid */}
          <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACHIEVEMENTS.map((ach) => {
                const isUnlocked = unlocked.includes(ach.id);
                return (
                  <div 
                    key={ach.id}
                    className={`relative p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                      isUnlocked 
                        ? 'bg-white/5 border-yellow-500/30 hover:border-yellow-500/60 shadow-[0_4px_20px_rgba(234,179,8,0.05)]' 
                        : 'bg-black/50 border-white/5 opacity-50 grayscale'
                    }`}
                  >
                    <div className="text-3xl shrink-0 mt-1">
                      {isUnlocked ? ach.icon : <Lock className="text-white/20" size={28} />}
                    </div>
                    <div>
                      <h4 className={`font-bold text-sm mb-1 uppercase tracking-wide ${isUnlocked ? 'text-yellow-500' : 'text-white/40'}`}>
                        {ach.title}
                      </h4>
                      <p className="text-white/60 text-xs leading-relaxed">
                        {isUnlocked ? ach.description : 'Скрытое достижение...'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
