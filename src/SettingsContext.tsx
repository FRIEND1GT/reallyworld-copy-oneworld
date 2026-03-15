import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  enableShaders: boolean;
  setEnableShaders: (v: boolean) => void;
  enableBlur: boolean;
  setEnableBlur: (v: boolean) => void;
  enableAnimations: boolean;
  setEnableAnimations: (v: boolean) => void;
  isMobile: boolean;
  optimizeAll: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [enableShaders, setEnableShaders] = useState(true);
  const [enableBlur, setEnableBlur] = useState(true);
  const [enableAnimations, setEnableAnimations] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const mobileCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);

    const saved = localStorage.getItem('app-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEnableShaders(parsed.enableShaders ?? true);
        setEnableBlur(parsed.enableBlur ?? true);
        setEnableAnimations(parsed.enableAnimations ?? true);
      } catch (e) {}
    } else if (mobileCheck) {
      // Auto-optimize for mobile on first visit
      setEnableShaders(false);
      setEnableBlur(false);
      setEnableAnimations(true); // Keep basic animations but maybe simplify them elsewhere
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify({ enableShaders, enableBlur, enableAnimations }));
    
    const root = document.documentElement;
    if (!enableBlur) root.classList.add('disable-blur');
    else root.classList.remove('disable-blur');

    if (!enableAnimations) root.classList.add('disable-animations');
    else root.classList.remove('disable-animations');
  }, [enableShaders, enableBlur, enableAnimations]);

  const optimizeAll = () => {
    setEnableShaders(false);
    setEnableBlur(false);
    setEnableAnimations(false);
  };

  return (
    <SettingsContext.Provider value={{ 
      enableShaders, setEnableShaders, 
      enableBlur, setEnableBlur, 
      enableAnimations, setEnableAnimations,
      isMobile,
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
