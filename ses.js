// ses.js - Ronya Kimya Sesli Geri Bildirim Sistemi

const RonyaSound = {
  // Ses açık/kapalı
  enabled: true,
  
  // AudioContext (lazy init)
  ctx: null,
  
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Kullanıcı tercihini oku
    if (typeof RonyaStorage !== 'undefined') {
      this.enabled = RonyaStorage.isSoundEnabled();
    }
    return this.ctx;
  },

  // ========== TEMEL SES OLUŞTURMA ==========
  
  playTone(frequency, duration, type = 'sine', volume = 0.3) {
    if (!this.enabled) return;
    
    try {
      const ctx = this.init();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.value = frequency;
      
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Ses çalma hatası:', e);
    }
  },

  // ========== DOĞRU/YANLIŞ SESLERİ ==========
  
  correct() {
    // Hoş, yükselen iki ton (başarı hissi)
    this.playTone(523.25, 0.1, 'sine', 0.2); // Do
    setTimeout(() => this.playTone(659.25, 0.15, 'sine', 0.2), 100); // Mi
    setTimeout(() => this.playTone(783.99, 0.2, 'sine', 0.15), 200); // Sol
  },

  wrong() {
    // Alçalan, düşük ton (hata hissi)
    this.playTone(300, 0.15, 'sawtooth', 0.15);
    setTimeout(() => this.playTone(200, 0.2, 'sawtooth', 0.1), 100);
  },

  // ========== BİLDİRİM SESLERİ ==========
  
  success() {
    // Tamamlama/başarı sesi
    this.playTone(440, 0.1, 'sine', 0.2);
    setTimeout(() => this.playTone(554, 0.1, 'sine', 0.2), 100);
    setTimeout(() => this.playTone(659, 0.1, 'sine', 0.2), 200);
    setTimeout(() => this.playTone(880, 0.3, 'sine', 0.15), 300);
  },

  click() {
    // Hafif tıklama sesi
    this.playTone(800, 0.05, 'sine', 0.1);
  },

  notification() {
    // Bildirim zili
    this.playTone(600, 0.1, 'sine', 0.15);
    setTimeout(() => this.playTone(800, 0.2, 'sine', 0.15), 150);
  },

  timerComplete() {
    // Pomodoro/timer bitiş zili
    this.playTone(523, 0.2, 'sine', 0.2);
    setTimeout(() => this.playTone(659, 0.2, 'sine', 0.2), 200);
    setTimeout(() => this.playTone(784, 0.2, 'sine', 0.2), 400);
    setTimeout(() => this.playTone(1047, 0.4, 'sine', 0.2), 600);
  },

  // ========== AYARLAR ==========
  
  toggle() {
    this.enabled = !this.enabled;
    if (typeof RonyaStorage !== 'undefined') {
      RonyaStorage.setSoundEnabled(this.enabled);
    }
    return this.enabled;
  },

  isEnabled() {
    return this.enabled;
  },

  setEnabled(value) {
    this.enabled = value;
    if (typeof RonyaStorage !== 'undefined') {
      RonyaStorage.setSoundEnabled(value);
    }
  },

  // ========== TEST MODU İÇİN KOLAY KULLANIM ==========
  
  feedback(isCorrect) {
    if (isCorrect) {
      this.correct();
    } else {
      this.wrong();
    }
  }
};

// Global olarak erişilebilir yap
if (typeof window !== 'undefined') {
  window.RonyaSound = RonyaSound;
}

