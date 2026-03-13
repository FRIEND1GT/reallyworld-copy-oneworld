import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  enableShaders: boolean;
  setEnableShaders: (v: boolean) => void;
  enableBlur: boolean;
  setEnableBlur: (v: boolean) => void;
  showFPS: boolean;
  setShowFPS: (v: boolean) => void;
  enableAnimations: boolean;
  setEnableAnimations: (v: boolean) => void;
  optimizeAll: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [enableShaders, setEnableShaders] = useState(true);
  const [enableBlur, setEnableBlur] = useState(true);
  const [showFPS, setShowFPS] = useState(false);
  const [enableAnimations, setEnableAnimations] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('app-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEnableShaders(parsed.enableShaders ?? true);
        setEnableBlur(parsed.enableBlur ?? true);
        setShowFPS(parsed.showFPS ?? false);
        setEnableAnimations(parsed.enableAnimations ?? true);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify({ enableShaders, enableBlur, showFPS, enableAnimations }));
    
    const root = document.documentElement;
    if (!enableBlur) root.classList.add('disable-blur');
    else root.classList.remove('disable-blur');

    if (!enableAnimations) root.classList.add('disable-animations');
    else root.classList.remove('disable-animations');
  }, [enableShaders, enableBlur, showFPS, enableAnimations]);

  const optimizeAll = () => {
    setEnableShaders(false);
    setEnableBlur(false);
    setEnableAnimations(false);
    setShowFPS(true);
  };

  return (
    <SettingsContext.Provider value={{ 
      enableShaders, setEnableShaders, 
      enableBlur, setEnableBlur, 
      showFPS, setShowFPS,
      enableAnimations, setEnableAnimations,
      optimizeAll
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
