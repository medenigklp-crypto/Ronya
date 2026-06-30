// validation.js - Ronya Kimya Giriş Doğrulama ve Hata Yönetimi

const Validation = {
  // ========== TEMEL KONTROLLER ==========
  
  isValidNumber(value) {
    if (value === '' || value === null || value === undefined) return false;
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
  },

  isPositiveNumber(value) {
    return this.isValidNumber(value) && parseFloat(value) > 0;
  },

  isNonNegative(value) {
    return this.isValidNumber(value) && parseFloat(value) >= 0;
  },

  isInteger(value) {
    return this.isValidNumber(value) && Number.isInteger(parseFloat(value));
  },

  isInRange(value, min, max) {
    return this.isValidNumber(value) && parseFloat(value) >= min && parseFloat(value) <= max;
  },

  // ========== KİMYASAL DOĞRULAMALAR ==========
  
  validateMolarMass(value) {
    const num = parseFloat(value);
    if (!this.isPositiveNumber(value)) {
      return { ok: false, msg: 'Mol kütlesi pozitif bir sayı olmalıdır' };
    }
    if (num > 1000) {
      return { ok: false, msg: 'Mol kütlesi çok yüksek (max 1000 g/mol)' };
    }
    return { ok: true };
  },

  validateMass(value) {
    if (!this.isNonNegative(value)) {
      return { ok: false, msg: 'Kütle 0 veya pozitif olmalıdır' };
    }
    if (parseFloat(value) > 1000000) {
      return { ok: false, msg: 'Kütle çok yüksek' };
    }
    return { ok: true };
  },

  validateVolume(value) {
    if (!this.isPositiveNumber(value)) {
      return { ok: false, msg: 'Hacim pozitif olmalıdır' };
    }
    return { ok: true };
  },

  validateConcentration(value) {
    if (!this.isNonNegative(value)) {
      return { ok: false, msg: 'Derişim 0 veya pozitif olmalıdır' };
    }
    return { ok: true };
  },

  validatePH(value) {
    if (!this.isValidNumber(value)) {
      return { ok: false, msg: 'Geçerli bir pH değeri girin' };
    }
    const ph = parseFloat(value);
    if (ph < 0 || ph > 14) {
      return { ok: false, msg: 'pH 0-14 aralığında olmalıdır' };
    }
    return { ok: true };
  },

  validateTemperature(value) {
    if (!this.isValidNumber(value)) {
      return { ok: false, msg: 'Geçerli bir sıcaklık girin' };
    }
    const temp = parseFloat(value);
    if (temp < -273.15) {
      return { ok: false, msg: 'Sıcaklık mutlak sıfırın altında olamaz' };
    }
    if (temp > 10000) {
      return { ok: false, msg: 'Sıcaklık çok yüksek' };
    }
    return { ok: true };
  },

  // ========== MOL HESAPLAYICI DOĞRULAMA ==========
  
  validateMolCalculator(inputs) {
    const errors = [];
    
    // En az bir değer girilmeli
    const hasValue = Object.values(inputs).some(v => v !== '' && v !== null);
    if (!hasValue) {
      return { ok: false, msg: 'En az bir değer girin', errors: ['En az bir alan doldurulmalı'] };
    }

    // Kütle kontrolü
    if (inputs.mass && !this.isNonNegative(inputs.mass)) {
      errors.push('Kütle geçersiz');
    }
    
    // Mol kütlesi kontrolü
    if (inputs.molarMass && !this.isPositiveNumber(inputs.molarMass)) {
      errors.push('Mol kütlesi pozitif olmalı');
    }
    
    // Mol sayısı kontrolü
    if (inputs.moles && !this.isNonNegative(inputs.moles)) {
      errors.push('Mol sayısı geçersiz');
    }
    
    // Hacim kontrolü
    if (inputs.volume && !this.isPositiveNumber(inputs.volume)) {
      errors.push('Hacim pozitif olmalı');
    }
    
    // Derişim kontrolü
    if (inputs.concentration && !this.isNonNegative(inputs.concentration)) {
      errors.push('Derişim geçersiz');
    }
    
    // Parçacık sayısı kontrolü
    if (inputs.particles && !this.isNonNegative(inputs.particles)) {
      errors.push('Parçacık sayısı geçersiz');
    }

    if (errors.length > 0) {
      return { ok: false, msg: errors[0], errors: errors };
    }
    
    return { ok: true };
  },

  // ========== KÇÇ DOĞRULAMA ==========
  
  validateKCC(inputs) {
    const errors = [];
    
    if (!this.isNonNegative(inputs.c1)) errors.push('İyon 1 derişimi geçersiz');
    if (!this.isPositiveNumber(inputs.z1)) errors.push('İyon 1 yükü pozitif olmalı');
    if (!this.isNonNegative(inputs.c2)) errors.push('İyon 2 derişimi geçersiz');
    if (!this.isPositiveNumber(inputs.z2)) errors.push('İyon 2 yükü pozitif olmalı');
    if (!this.isPositiveNumber(inputs.kcc)) errors.push('KÇÇ değeri pozitif olmalı');

    if (errors.length > 0) {
      return { ok: false, msg: errors[0], errors: errors };
    }
    
    return { ok: true };
  },

  // ========== HATA GÖSTERİMİ ==========
  
  showError(elementId, message, duration = 3000) {
    const el = document.getElementById(elementId);
    if (!el) {
      console.warn('Error element not found:', elementId);
      return;
    }
    
    el.textContent = '⚠️ ' + message;
    el.style.color = '#ef4444';
    el.style.display = 'block';
    el.style.padding = '8px 12px';
    el.style.background = 'rgba(239, 68, 68, 0.1)';
    el.style.borderRadius = '8px';
    el.style.marginTop = '8px';
    el.style.fontSize = '13px';
    
    if (duration > 0) {
      setTimeout(() => {
        el.style.display = 'none';
        el.textContent = '';
      }, duration);
    }
  },

  showSuccess(elementId, message, duration = 2000) {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    el.textContent = '✅ ' + message;
    el.style.color = '#22c55e';
    el.style.display = 'block';
    el.style.padding = '8px 12px';
    el.style.background = 'rgba(34, 197, 94, 0.1)';
    el.style.borderRadius = '8px';
    el.style.marginTop = '8px';
    el.style.fontSize = '13px';
    
    if (duration > 0) {
      setTimeout(() => {
        el.style.display = 'none';
      }, duration);
    }
  },

  clearError(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.style.display = 'none';
      el.textContent = '';
    }
  },

  // ========== GİRİŞ TEMİZLEME ==========
  
  sanitizeInput(value) {
    if (typeof value !== 'string') return value;
    // Sadece sayılar, nokta, virgül, e (bilimsel notasyon) ve eksi işareti
    return value.replace(/[^0-9.,eE\-]/g, '').replace(',', '.');
  },

  parseScientific(value) {
    if (typeof value !== 'string') return value;
    // 1.8×10⁻¹⁰ formatını 1.8e-10 formatına çevir
    return value.replace(/×10\^?([-\d]+)/g, 'e$1')
                .replace(/10\^([-\d]+)/g, '1e$1');
  }
};

// Global olarak erişilebilir yap
if (typeof window !== 'undefined') {
  window.Validation = Validation;
}

