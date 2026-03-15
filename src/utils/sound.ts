class SoundManager {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play(type: 'click' | 'hover' | 'transition' | 'success' | 'error' | 'buy' | 'cancel', volume = 0.5) {
    try {
      this.init();
      if (!this.ctx) return;

      // Уменьшаем громкость всех звуков в 2.5 - 3 раза по просьбе пользователя
      volume = volume * 0.35;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      switch (type) {
        case 'click':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(400, t);
          osc.frequency.exponentialRampToValueAtTime(300, t + 0.15);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(volume, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
          osc.start(t);
          osc.stop(t + 0.15);
          break;
        case 'hover':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(300, t);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(volume * 0.05, t + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
          osc.start(t);
          osc.stop(t + 0.1);
          break;
        case 'transition':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(200, t);
          osc.frequency.exponentialRampToValueAtTime(150, t + 0.8);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(volume * 0.15, t + 0.4);
          gain.gain.linearRampToValueAtTime(0, t + 0.8);
          osc.start(t);
          osc.stop(t + 0.8);
          break;
        case 'success':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(329.63, t); // E4
          osc.frequency.setValueAtTime(415.30, t + 0.15); // G#4
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(volume * 0.6, t + 0.1);
          gain.gain.setValueAtTime(volume * 0.6, t + 0.15);
          gain.gain.linearRampToValueAtTime(0, t + 0.5);
          osc.start(t);
          osc.stop(t + 0.5);
          break;
        case 'error':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(150, t);
          osc.frequency.exponentialRampToValueAtTime(100, t + 0.4);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(volume * 0.3, t + 0.1);
          gain.gain.linearRampToValueAtTime(0, t + 0.4);
          osc.start(t);
          osc.stop(t + 0.4);
          break;
        case 'buy':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523.25, t); // C5
          osc.frequency.setValueAtTime(659.25, t + 0.15); // E5
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(volume * 0.7, t + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
          osc.start(t);
          osc.stop(t + 0.6);
          break;
        case 'cancel':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(300, t);
          osc.frequency.exponentialRampToValueAtTime(200, t + 0.3);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(volume * 0.5, t + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
          osc.start(t);
          osc.stop(t + 0.3);
          break;
      }
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }
}

export const soundManager = new SoundManager();
