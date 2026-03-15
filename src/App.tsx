import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Home, ShoppingCart, MessageCircle, Crown, Palette, Users } from 'lucide-react';

import LavaBackground from './components/LavaBackground';
import BlockTransition from './components/BlockTransition';
import BotCheck from './components/BotCheck';
import SettingsPanel from './components/SettingsPanel';
import IdleOverlay from './components/IdleOverlay';
import HomePage from './pages/HomePage';
import DonatePage from './pages/DonatePage';
import ContactsPage from './pages/ContactsPage';
import OnlinePage from './pages/OnlinePage';
import CookieConsent from './components/CookieConsent';
import PolicyModal from './components/PolicyModal';
import { ThemeProvider, useTheme, themes } from './ThemeContext';
import { SettingsProvider } from './SettingsContext';
import { soundManager } from './utils/sound';

function AppContent() {
  const [isVerified, setIsVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [targetPage, setTargetPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [online, setOnline] = useState(0); // Server is closed
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  useEffect(() => {
    if (!isVerified) return;

    // Subtle global parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVerified]);

  const handleNav = (page: string) => {
    if (page === currentPage || isTransitioning) return;
    soundManager.play('click', 0.5);
    setTargetPage(page);
    setIsTransitioning(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden relative selection:bg-[var(--theme-main)]/30 selection:text-[var(--theme-main)]">
      <AnimatePresence mode="wait">
        {!isVerified ? (
          <BotCheck key="bot-check" onComplete={() => setIsVerified(true)} />
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="relative min-h-screen flex flex-col"
          >
            <LavaBackground />
            <BlockTransition isTransitioning={isTransitioning} onCovered={() => setCurrentPage(targetPage)} onComplete={() => setIsTransitioning(false)} />
            
            <ThemeSwitcher />
            <SettingsPanel />
            <IdleOverlay />
            <CookieConsent />
            <PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />

            <div className="relative z-10 flex flex-col min-h-screen">
              <header className="p-4 sm:p-6 flex justify-between items-center relative z-40">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden lg:flex items-center gap-3 px-6 py-3"
                >
                  <h1 className="text-2xl font-display font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    ONE WORLD
                  </h1>
                </motion.div>

                <nav className="flex gap-2 bg-[#0a0a0a]/80 p-2 rounded-[1.5rem] border border-white/10 backdrop-blur-xl mx-auto lg:mx-0 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-x-auto max-w-full no-scrollbar relative">
                  <NavButton active={currentPage === 'home'} onClick={() => handleNav('home')} icon={<Home size={18} />} text="Главная" />
                  <NavButton active={currentPage === 'donate'} onClick={() => handleNav('donate')} icon={<ShoppingCart size={18} />} text="Донат" />
                  <NavButton active={currentPage === 'online'} onClick={() => handleNav('online')} icon={<Users size={18} />} text="Онлайн" />
                  <NavButton active={currentPage === 'contacts'} onClick={() => handleNav('contacts')} icon={<MessageCircle size={18} />} text="Контакты" />
                </nav>

                <motion.div 
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="hidden lg:flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                >
                  <Crown size={20} className="text-[var(--theme-main)] transition-colors duration-500 animate-pulse" />
                  <span className="text-sm font-medium text-white/70 tracking-widest uppercase">Онлайн: <span className="font-black text-white ml-1">{online.toLocaleString()}</span></span>
                </motion.div>
              </header>

              <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10">
                <AnimatePresence mode="wait">
                  {currentPage === 'home' && <HomePage key="home" />}
                  {currentPage === 'donate' && <DonatePage key="donate" />}
                  {currentPage === 'online' && <OnlinePage key="online" online={online} />}
                  {currentPage === 'contacts' && <ContactsPage key="contacts" />}
                </AnimatePresence>
              </main>

              <footer className="w-full flex justify-center pb-6 relative z-10">
                <button 
                  onClick={() => {
                    soundManager.play('click', 0.5);
                    setIsPolicyOpen(true);
                  }}
                  className="text-white/20 hover:text-white/50 text-xs font-medium uppercase tracking-widest transition-colors duration-300"
                >
                  Правила и политика сайта
                </button>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
        onClick={() => {
          soundManager.play('click', 0.5);
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => soundManager.play('hover', 0.2)}
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
      onMouseEnter={() => !active && soundManager.play('hover', 0.2)}
      className={`relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-500 overflow-hidden group ${
        active 
          ? 'text-white shadow-[0_0_30px_var(--theme-glow)]' 
          : 'text-white/50 hover:text-white hover:bg-white/5'
      }`}
    >
      {active && (
        <motion.div 
          layoutId="nav-active"
          className="absolute inset-0 bg-gradient-to-r from-[var(--theme-main)] to-[var(--theme-sec)] rounded-xl"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-3">
        {icon}
        <span className={`font-bold tracking-widest uppercase text-sm ${active ? 'text-white drop-shadow-md' : ''}`}>{text}</span>
      </span>
    </button>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </ThemeProvider>
  );
}
