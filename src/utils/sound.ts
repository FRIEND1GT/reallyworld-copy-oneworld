// Sound utility for the application
const sounds = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  transition: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  error: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3',
};

class SoundManager {
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  play(soundName: keyof typeof sounds, volume: number = 0.5) {
    try {
      let audio = this.audioCache.get(soundName);
      if (!audio) {
        audio = new Audio(sounds[soundName]);
        this.audioCache.set(soundName, audio);
      }
      
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play().catch(e => console.warn('Audio playback failed:', e));
    } catch (e) {
      console.error('Sound error:', e);
    }
  }
}

export const soundManager = new SoundManager();
