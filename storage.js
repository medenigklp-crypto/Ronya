// storage.js - Ronya Kimya Veri Saklama Sistemi
// Tüm test sonuçları, Pomodoro istatistikleri ve kullanıcı tercihleri burada saklanır

const RonyaStorage = {
  // ========== TEMEL FONKSİYONLAR ==========
  
  get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem('ronya_' + key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn('Storage get error:', e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem('ronya_' + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn('Storage set error:', e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem('ronya_' + key);
  },

  clear() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('ronya_'));
    keys.forEach(k => localStorage.removeItem(k));
  },

  // ========== TEST SONUÇLARI ==========
  
  saveTestResult(testType, score, total, details = {}) {
    const history = this.get('test_history', []);
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      dateFormatted: new Date().toLocaleDateString('tr-TR'),
      type: testType,
      score: score,
      total: total,
      percentage: Math.round((score / total) * 100),
      details: details
    };
    history.push(entry);
    this.set('test_history', history);
    
    // En yüksek puanı güncelle
    const bestKey = 'best_' + testType;
    const currentBest = this.get(bestKey, 0);
    if (entry.percentage > currentBest) {
      this.set(bestKey, entry.percentage);
    }
    return entry;
  },

  getTestHistory(testType = null) {
    const history = this.get('test_history', []);
    return testType ? history.filter(h => h.type === testType) : history;
  },

  getBestScore(testType) {
    return this.get('best_' + testType, 0);
  },

  getOverallStats() {
    const history = this.get('test_history', []);
    if (!history.length) return { totalTests: 0, avgScore: 0, bestScore: 0 };
    
    const percentages = history.map(h => h.percentage);
    return {
      totalTests: history.length,
      avgScore: Math.round(percentages.reduce((a,b) => a+b, 0) / percentages.length),
      bestScore: Math.max(...percentages),
      lastTest: history[history.length - 1]
    };
  },

  // ========== POMODORO İSTATİSTİKLERİ ==========
  
  savePomodoroSession(minutes, category = 'genel') {
    const today = new Date().toDateString();
    const stats = this.get('pomodoro_stats', {});
    
    if (!stats[today]) {
      stats[today] = { totalMinutes: 0, sessions: 0, categories: {} };
    }
    
    stats[today].totalMinutes += minutes;
    stats[today].sessions += 1;
    stats[today].categories[category] = (stats[today].categories[category] || 0) + minutes;
    
    // Haftalık toplam
    const weekKey = 'week_' + this.getWeekNumber();
    const weekStats = this.get('pomodoro_weekly', {});
    weekStats[weekKey] = (weekStats[weekKey] || 0) + minutes;
    this.set('pomodoro_weekly', weekStats);
    
    this.set('pomodoro_stats', stats);
    return stats[today];
  },

  getPomodoroToday() {
    const today = new Date().toDateString();
    const stats = this.get('pomodoro_stats', {});
    return stats[today] || { totalMinutes: 0, sessions: 0, categories: {} };
  },

  getPomodoroWeek() {
    const weekKey = 'week_' + this.getWeekNumber();
    const weekStats = this.get('pomodoro_weekly', {});
    return weekStats[weekKey] || 0;
  },

  getWeekNumber() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  },

  // ========== KULLANICI TERCİHLERİ ==========
  
  getPreference(key, defaultValue = null) {
    return this.get('pref_' + key, defaultValue);
  },

  setPreference(key, value) {
    return this.set('pref_' + key, value);
  },

  // Ses ayarları
  isSoundEnabled() {
    return this.getPreference('sound', true);
  },

  setSoundEnabled(enabled) {
    return this.setPreference('sound', enabled);
  },

  // Tema
  getTheme() {
    return this.getPreference('theme', 'dark');
  },

  // ========== ELEMENT TESTİ İSTATİSTİKLERİ ==========
  
  saveElementTestStats(element, correct) {
    const stats = this.get('element_stats', {});
    if (!stats[element]) {
      stats[element] = { correct: 0, wrong: 0, total: 0 };
    }
    stats[element][correct ? 'correct' : 'wrong'] += 1;
    stats[element].total += 1;
    this.set('element_stats', stats);
    return stats[element];
  },

  getElementStats(element) {
    const stats = this.get('element_stats', {});
    return stats[element] || { correct: 0, wrong: 0, total: 0 };
  },

  getWeakElements() {
    const stats = this.get('element_stats', {});
    return Object.entries(stats)
      .filter(([_, s]) => s.total > 0 && (s.correct / s.total) < 0.5)
      .map(([el, _]) => el);
  },

  // ========== FAVORİLER / SON KULLANILANLAR ==========
  
  addRecent(section, item) {
    const recents = this.get('recent_' + section, []);
    recents.unshift({ item, time: Date.now() });
    // Son 10'u tut
    this.set('recent_' + section, recents.slice(0, 10));
  },

  getRecents(section) {
    return this.get('recent_' + section, []);
  }
};

// Global olarak erişilebilir yap
if (typeof window !== 'undefined') {
  window.RonyaStorage = RonyaStorage;
}

