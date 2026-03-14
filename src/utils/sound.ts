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
          osc.frequency.setValueAtTime(600, t);
          osc.frequency.exponentialRampToValueAtTime(300, t + 0.1);
          gain.gain.setValueAtTime(volume, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
          osc.start(t);
          osc.stop(t + 0.1);
          break;
        case 'hover':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, t);
          gain.gain.setValueAtTime(volume * 0.1, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
          osc.start(t);
          osc.stop(t + 0.05);
          break;
        case 'transition':
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(100, t);
          osc.frequency.exponentialRampToValueAtTime(10, t + 0.5);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(volume * 0.3, t + 0.2);
          gain.gain.linearRampToValueAtTime(0, t + 0.5);
          osc.start(t);
          osc.stop(t + 0.5);
          break;
        case 'success':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, t); // A4
          osc.frequency.setValueAtTime(554.37, t + 0.1); // C#5
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(volume, t + 0.05);
          gain.gain.setValueAtTime(volume, t + 0.1);
          gain.gain.linearRampToValueAtTime(0, t + 0.3);
          osc.start(t);
          osc.stop(t + 0.3);
          break;
        case 'error':
          osc.type = 'square';
          osc.frequency.setValueAtTime(150, t);
          osc.frequency.setValueAtTime(100, t + 0.15);
          gain.gain.setValueAtTime(volume * 0.3, t);
          gain.gain.setValueAtTime(0, t + 0.1);
          gain.gain.setValueAtTime(volume * 0.3, t + 0.15);
          gain.gain.linearRampToValueAtTime(0, t + 0.3);
          osc.start(t);
          osc.stop(t + 0.3);
          break;
        case 'buy':
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, t);
          osc.frequency.setValueAtTime(1760, t + 0.1);
          gain.gain.setValueAtTime(volume, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
          osc.start(t);
          osc.stop(t + 0.4);
          break;
        case 'cancel':
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(400, t);
          osc.frequency.exponentialRampToValueAtTime(200, t + 0.2);
          gain.gain.setValueAtTime(volume, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
          osc.start(t);
          osc.stop(t + 0.2);
          break;
      }
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }
}

export const soundManager = new SoundManager();
