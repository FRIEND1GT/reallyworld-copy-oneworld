import { useState, useEffect } from 'react';
import { useSettings } from '../SettingsContext';

export default function FPSCounter() {
  const { showFPS } = useSettings();
  const [fps, setFps] = useState(0);

  useEffect(() => {
    if (!showFPS) return;
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const loop = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [showFPS]);

  if (!showFPS) return null;

  return (
    <div className="fixed top-4 left-4 z-50 bg-black/80 text-green-400 font-mono text-xs px-2 py-1 rounded border border-green-500/30 pointer-events-none shadow-[0_0_10px_rgba(34,197,94,0.2)]">
      {fps} FPS
    </div>
  );
}
