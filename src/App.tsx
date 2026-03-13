import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Home, ShoppingCart, MessageCircle, Crown, Palette } from 'lucide-react';

import LavaBackground from './components/LavaBackground';
import BlockTransition from './components/BlockTransition';
import HomePage from './pages/HomePage';
import DonatePage from './pages/DonatePage';
import ContactsPage from './pages/ContactsPage';
import { ThemeProvider, useTheme, themes } from './ThemeContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [targetPage, setTargetPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [online, setOnline] = useState(1423);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnline(prev => Math.max(0, prev + Math.floor(Math.random() * 7) - 3));
    }, 4000);
    
    // Subtle global parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleNav = (page: string) => {
    if (page === currentPage || isTransitioning) return;
    setTargetPage(page);
    setIsTransitioning(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden relative selection:bg-[var(--theme-main)]/30 selection:text-[var(--theme-main)]">
      <LavaBackground />
      <BlockTransition isTransitioning={isTransitioning} onCovered={() => setCurrentPage(targetPage)} onComplete={() => setIsTransitioning(false)} />
      
      <ThemeSwitcher />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-4 sm:p-6 flex justify-between items-center relative z-40">
          <motion.div 
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md"
          >
            <Crown size={18} className="text-[var(--theme-main)] transition-colors duration-500" />
            <span className="text-sm font-medium text-white/70 tracking-wide">Онлайн: <span className="font-bold text-white">{online.toLocaleString()}</span></span>
          </motion.div>

          <nav className="flex gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/5 backdrop-blur-md mx-auto lg:mx-0 shadow-2xl">
            <NavButton active={currentPage === 'home'} onClick={() => handleNav('home')} icon={<Home size={18} />} text="Главная" />
            <NavButton active={currentPage === 'donate'} onClick={() => handleNav('donate')} icon={<ShoppingCart size={18} />} text="Донат" />
            <NavButton active={currentPage === 'contacts'} onClick={() => handleNav('contacts')} icon={<MessageCircle size={18} />} text="Контакты" />
          </nav>

          <div className="hidden lg:block w-[160px]"></div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10">
          <AnimatePresence mode="wait">
            {currentPage === 'home' && <HomePage key="home" />}
            {currentPage === 'donate' && <DonatePage key="donate" />}
            {currentPage === 'contacts' && <ContactsPage key="contacts" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl grid grid-cols-2 gap-2"
          >
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setIsOpen(false); }}
                className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${theme.id === t.id ? 'border-white scale-110 shadow-[0_0_15px_var(--theme-glow)]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                style={{ background: `linear-gradient(135deg, ${t.main}, ${t.sec})` }}
                title={t.name}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all shadow-lg hover:shadow-[0_0_20px_var(--theme-glow)]"
      >
        <Palette size={20} className="transition-colors duration-500" style={{ color: isOpen ? 'var(--theme-main)' : 'inherit' }} />
      </button>
    </div>
  );
}

function NavButton({ active, onClick, icon, text }: { active: boolean, onClick: () => void, icon: React.ReactNode, text: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-500 ${
        active 
          ? 'bg-gradient-to-r from-[var(--theme-main)] to-[var(--theme-sec)] text-white shadow-[0_0_20px_var(--theme-glow)]' 
          : 'text-white/50 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      <span className={`font-semibold tracking-wide text-sm ${active ? 'text-white drop-shadow-md' : ''}`}>{text}</span>
    </button>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
