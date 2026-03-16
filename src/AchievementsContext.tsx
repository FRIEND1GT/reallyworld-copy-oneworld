import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, X } from 'lucide-react';
import { soundManager } from './utils/sound';

export const ACHIEVEMENTS = [
  { id: 'bot_pass', title: 'Я не робот', description: 'Пройти проверку на бота', icon: '🤖' },
  { id: 'bot_fail', title: 'Подозрительный', description: 'Ошибиться в проверке на бота', icon: '🤨' },
  { id: 'bot_ban', title: 'Хакер', description: 'Получить бан на 5 минут', icon: '🚫' },
  { id: 'cookies', title: 'Сладкоежка', description: 'Принять файлы cookie', icon: '🍪' },
  { id: 'policy', title: 'Юрист', description: 'Открыть правила и политику сайта', icon: '📜' },
  { id: 'settings', title: 'Инженер', description: 'Открыть настройки', icon: '⚙️' },
  { id: 'optimize', title: 'Киберспортсмен', description: 'Включить максимальную производительность', icon: '⚡' },
  { id: 'theme_change', title: 'Дизайнер', description: 'Изменить тему оформления', icon: '🎨' },
  { id: 'theme_spam', title: 'Художник', description: 'Изменить тему 10 раз', icon: '🖌️' },
  { id: 'idea_open', title: 'Искатель идей', description: 'Открыть генератор идей', icon: '💡' },
  { id: 'idea_10', title: 'Мыслитель', description: 'Сгенерировать 10 идей', icon: '🧠' },
  { id: 'idea_50', title: 'Философ', description: 'Сгенерировать 50 идей', icon: '📚' },
  { id: 'idea_100', title: 'Безумец', description: 'Сгенерировать 100 идей', icon: '🤪' },
  { id: 'idea_666', title: 'Дитя тьмы', description: 'Наткнуться на идею #666', icon: '😈' },
  { id: 'idea_777', title: 'Счастливчик', description: 'Найти секретный промокод LACKY', icon: '🍀' },
  { id: 'nav_donate', title: 'Шопоголик', description: 'Зайти в раздел Донат', icon: '🛒' },
  { id: 'nav_online', title: 'Смотрящий', description: 'Зайти в раздел Онлайн', icon: '👁️' },
  { id: 'nav_contacts', title: 'Общительный', description: 'Зайти в раздел Контакты', icon: '💬' },
  { id: 'copy_ip', title: 'Готов играть', description: 'Скопировать IP сервера', icon: '🎮' },
  { id: 'buy_donate', title: 'Меценат', description: 'Нажать кнопку покупки доната', icon: '💎' },
  { id: 'first_promo', title: 'Скидочка', description: 'Применить первый промокод', icon: '🏷️' },
  { id: 'youtube_sub', title: 'Фанатик O_M_G_YT', description: 'Перейти на канал O_M_G_YT', icon: '📺' },
  { id: 'idle', title: 'АФК', description: 'Уснуть за экраном (появление заставки)', icon: '💤' },
  { id: 'click_10', title: 'Кликер', description: 'Сделать 10 кликов', icon: '🖱️' },
  { id: 'click_100', title: 'Маньяк', description: 'Сделать 100 кликов', icon: '🔥' },
  { id: 'click_500', title: 'Машина', description: 'Сделать 500 кликов', icon: '🦾' },
  { id: 'discord_join', title: 'Тусовщик', description: 'Перейти в Discord', icon: '🎧' },
  { id: 'telegram_join', title: 'Современный', description: 'Перейти в Telegram', icon: '✈️' },
  { id: 'close_modal', title: 'Отказник', description: 'Закрыть любое модальное окно', icon: '❌' },
  { id: 'secret_click', title: 'Сыщик', description: 'Кликнуть по логотипу ONE WORLD', icon: '🔍' },
  { id: 'scroll_bottom', title: 'Исследователь', description: 'Доскроллить до самого низа', icon: '⬇️' },
  { id: 'hover_spam', title: 'Нервный', description: 'Быстро водить мышкой', icon: '〰️' },
  { id: 'fast_read', title: 'Спидраннер', description: 'Закрыть правила быстрее чем за 2 секунды', icon: '⏱️' },
  { id: 'slow_read', title: 'Вдумчивый', description: 'Читать правила дольше 1 минуты', icon: '📖' },
  { id: 'night_owl', title: 'Сова', description: 'Зайти на сайт ночью', icon: '🦉' },
  { id: 'early_bird', title: 'Жаворонок', description: 'Зайти на сайт утром', icon: '🌅' },
  { id: 'weekend', title: 'Выходной', description: 'Зайти на сайт в выходной день', icon: '🎉' },
  { id: 'returner', title: 'Возвращенец', description: 'Зайти на сайт второй раз', icon: '👋' },
  { id: 'achievements_open', title: 'Коллекционер', description: 'Открыть окно достижений', icon: '🏆' },
  { id: 'all_achievements', title: 'Платина', description: 'Собрать все остальные достижения', icon: '👑' }
];

interface AchievementsContextType {
  unlocked: string[];
  unlockAchievement: (id: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export function AchievementsProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [recentUnlock, setRecentUnlock] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('unlocked_achievements');
    if (saved) {
      try {
        setUnlocked(JSON.parse(saved));
      } catch (e) {}
    }

    // Check time-based achievements
    const hour = new Date().getHours();
    const day = new Date().getDay();
    if (hour >= 0 && hour < 6) unlockAchievement('night_owl');
    if (hour >= 6 && hour < 12) unlockAchievement('early_bird');
    if (day === 0 || day === 6) unlockAchievement('weekend');

    // Check returner
    const visits = parseInt(localStorage.getItem('site_visits') || '0', 10);
    if (visits > 0) unlockAchievement('returner');
    localStorage.setItem('site_visits', (visits + 1).toString());
  }, []);

  const unlockAchievement = (id: string) => {
    setUnlocked(prev => {
      if (prev.includes(id)) return prev;
      
      const newUnlocked = [...prev, id];
      localStorage.setItem('unlocked_achievements', JSON.stringify(newUnlocked));
      
      // Show toast
      setRecentUnlock(id);
      soundManager.play('success', 0.8); // Play a nice sound
      
      setTimeout(() => {
        setRecentUnlock(null);
      }, 4000);

      // Check platinum
      if (newUnlocked.length === ACHIEVEMENTS.length - 1 && !newUnlocked.includes('all_achievements')) {
        setTimeout(() => unlockAchievement('all_achievements'), 1000);
      }

      return newUnlocked;
    });
  };

  const recentAchievement = ACHIEVEMENTS.find(a => a.id === recentUnlock);

  return (
    <AchievementsContext.Provider value={{ unlocked, unlockAchievement, isModalOpen, setIsModalOpen }}>
      {children}
      
      {/* Toast Notification */}
      <AnimatePresence>
        {recentAchievement && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[1000] bg-[#121212] border border-white/10 p-3 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-3 min-w-[280px] max-w-[320px]"
          >
            <div className="text-3xl flex-shrink-0 w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/5">
              {recentAchievement.icon}
            </div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-yellow-500/90 text-[10px] font-bold uppercase tracking-widest mb-0.5">Достижение открыто</p>
              <h4 className="text-white font-bold text-sm truncate">{recentAchievement.title}</h4>
              <p className="text-white/50 text-xs truncate mt-0.5">{recentAchievement.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AchievementsContext.Provider>
  );
}

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (!context) throw new Error('useAchievements must be used within AchievementsProvider');
  return context;
};
