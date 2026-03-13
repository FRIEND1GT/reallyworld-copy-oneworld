import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export const themes = [
  { id: 'gold', name: 'Premium Gold', main: '#f59e0b', sec: '#ea580c', glow: 'rgba(245,158,11,0.5)' },
  { id: 'ruby', name: 'Ruby Red', main: '#ef4444', sec: '#b91c1c', glow: 'rgba(239,68,68,0.5)' },
  { id: 'sapphire', name: 'Sapphire Blue', main: '#3b82f6', sec: '#1d4ed8', glow: 'rgba(59,130,246,0.5)' },
  { id: 'emerald', name: 'Emerald Green', main: '#10b981', sec: '#047857', glow: 'rgba(16,185,129,0.5)' },
  { id: 'amethyst', name: 'Amethyst Purple', main: '#8b5cf6', sec: '#6d28d9', glow: 'rgba(139,92,246,0.5)' },
  { id: 'pink', name: 'Neon Pink', main: '#ec4899', sec: '#be185d', glow: 'rgba(236,72,153,0.5)' },
  { id: 'cyber', name: 'Cyberpunk', main: '#06b6d4', sec: '#3b82f6', glow: 'rgba(6,182,212,0.5)' },
  { id: 'crimson', name: 'Crimson', main: '#dc2626', sec: '#7f1d1d', glow: 'rgba(220,38,38,0.5)' },
  { id: 'ocean', name: 'Deep Ocean', main: '#0ea5e9', sec: '#0369a1', glow: 'rgba(14,165,233,0.5)' },
  { id: 'mono', name: 'Silver Chrome', main: '#e4e4e7', sec: '#71717a', glow: 'rgba(228,228,231,0.3)' },
];

const ThemeContext = createContext({
  theme: themes[0],
  setTheme: (id: string) => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState('gold');
  const theme = themes.find(t => t.id === themeId) || themes[0];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-main', theme.main);
    root.style.setProperty('--theme-sec', theme.sec);
    root.style.setProperty('--theme-glow', theme.glow);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
