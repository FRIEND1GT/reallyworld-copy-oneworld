import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { Home, ShoppingCart, MessageCircle, Users } from 'lucide-react';

import LavaBackground from './components/LavaBackground';
import BlockTransition from './components/BlockTransition';
import HomePage from './pages/HomePage';
import DonatePage from './pages/DonatePage';
import ContactsPage from './pages/ContactsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [targetPage, setTargetPage] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(true);

  const handleNav = (page: string) => {
    if (page === currentPage || isTransitioning) return;
    setTargetPage(page);
    setIsTransitioning(true);
  };

  const handleCovered = useCallback(() => {
    setCurrentPage(targetPage);
  }, [targetPage]);

  const handleComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans overflow-hidden relative selection:bg-indigo-500/30">
      <LavaBackground />
      
      <BlockTransition 
        isTransitioning={isTransitioning} 
        onCovered={handleCovered} 
        onComplete={handleComplete} 
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-4 sm:p-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5 relative z-40">
          <div className="hidden lg:flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 font-medium shadow-[0_0_15px_rgba(34,197,94,0.1)]">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-sm tracking-wide">Онлайн: <span className="font-bold">1,423</span></span>
          </div>

          <nav className="flex gap-2 sm:gap-6 bg-black/40 p-2 rounded-2xl border border-white/10 shadow-2xl mx-auto lg:mx-0">
            <NavButton 
              active={currentPage === 'home'} 
              onClick={() => handleNav('home')}
              icon={<Home size={18} />}
              text="Главная"
            />
            <NavButton 
              active={currentPage === 'donate'} 
              onClick={() => handleNav('donate')}
              icon={<ShoppingCart size={18} />}
              text="Донат"
            />
            <NavButton 
              active={currentPage === 'contacts'} 
              onClick={() => handleNav('contacts')}
              icon={<MessageCircle size={18} />}
              text="Контакты"
            />
          </nav>

          <div className="hidden lg:block w-[160px]"></div> {/* Spacer for flex balance */}
        </header>

        {/* Main Content */}
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

function NavButton({ active, onClick, icon, text }: { active: boolean, onClick: () => void, icon: React.ReactNode, text: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
        active 
          ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105' 
          : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-105'
      }`}
    >
      {icon}
      <span className="font-medium tracking-wide">{text}</span>
    </button>
  );
}
