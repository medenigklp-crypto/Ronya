/* ==========================================================================
   RONYA PORTAL — Faz 1: Ana Sayfa Platform Özellikleri
   (Carousel, Haftanın Sorusu, Fotoğraf Galerisi, Profesyonel Tasarım)
   Bu dosya ronya-eklenti.js'DEN SONRA yüklenmelidir:
   <script src="ronya-eklenti.js"></script>
   <script src="ronya-portal.js"></script>
   ========================================================================== */
(function(){
  'use strict';

  // ---------- GOOGLE E-TABLOSU BAĞLANTILARI (siz sadece Google Sheets'i güncelleyin, buraya dokunmayın) ----------
  var SHEET_URLS = {
    haftanin: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTTEHHIQxGqE8RHHHQnUXlk82n2KDwVKSFzqvtw7IM5FoUqO-IWh_Op61HmGjvyLLnPcelCBrDWG9ez/pub?gid=0&single=true&output=csv',
    carousel: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTTEHHIQxGqE8RHHHQnUXlk82n2KDwVKSFzqvtw7IM5FoUqO-IWh_Op61HmGjvyLLnPcelCBrDWG9ez/pub?gid=744491518&single=true&output=csv',
    galeri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTTEHHIQxGqE8RHHHQnUXlk82n2KDwVKSFzqvtw7IM5FoUqO-IWh_Op61HmGjvyLLnPcelCBrDWG9ez/pub?gid=298291630&single=true&output=csv'
  };

  // Tablo yüklenemezse (internet yok, henüz yayınlanmadı vb.) gösterilecek YEDEK içerik
  var CAROUSEL_SLIDES = [
    { emoji:'\u2696\ufe0f', title:'Kimyasal Denge Ünitesi Tamamlandı!', desc:'Denge, Asit-Baz ve Çözünürlük Dengesi — MEB konu anlatımı + 100+ çözümlü soru', nav:'denge2', color:'linear-gradient(135deg,#6366f1,#818cf8)' }
  ];
  var HAFTANIN_SORUSU = {
    tarih: '',
    soru: '',
    cevap: ''
  };
  var PHOTO_GALLERY = [];

  // ---------- CSV OKUMA VE AYRIŞTIRMA ----------
  function parseCSV(text){
    var rows = [];
    var row = [], field = '', inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i], next = text[i+1];
      if (inQuotes) {
        if (c === '"' && next === '"') { field += '"'; i++; }
        else if (c === '"') { inQuotes = false; }
        else { field += c; }
      } else {
        if (c === '"') inQuotes = true;
        else if (c === ',') { row.push(field); field = ''; }
        else if (c === '\n' || c === '\r') {
          if (c === '\r' && next === '\n') i++;
          row.push(field); field = '';
          if (row.length > 1 || row[0] !== '') rows.push(row);
          row = [];
        } else { field += c; }
      }
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    return rows;
  }
  function fetchCSV(url){
    return fetch(url).then(function(r){ return r.text(); }).then(parseCSV);
  }
  function loadHaftanin(){
    return fetchCSV(SHEET_URLS.haftanin).then(function(rows){
      var obj = {};
      rows.forEach(function(r){ if (r[0]) obj[r[0].trim()] = (r[1] || '').trim(); });
      if (obj.tarih || obj.soru) {
        HAFTANIN_SORUSU.tarih = obj.tarih || '';
        HAFTANIN_SORUSU.soru = obj.soru || '';
        HAFTANIN_SORUSU.cevap = obj.cevap || '';
      }
    }).catch(function(){ /* yedek içerik zaten hazır, sessizce geç */ });
  }
  function loadCarousel(){
    return fetchCSV(SHEET_URLS.carousel).then(function(rows){
      if (rows.length < 2) return;
      var headers = rows[0].map(function(h){ return h.trim().toLowerCase(); });
      var slides = [];
      for (var i = 1; i < rows.length; i++) {
        var r = rows[i]; if (!r[0]) continue;
        var obj = {};
        headers.forEach(function(h, hi){ obj[h] = (r[hi] || '').trim(); });
        if (obj.title) slides.push({
          emoji: obj.emoji || '\ud83d\udcda', title: obj.title, desc: obj.desc || '',
          nav: obj.nav || 'home', color: 'linear-gradient(135deg,' + (obj.color || '#6366f1') + ',' + (obj.color || '#6366f1') + 'aa)'
        });
      }
      if (slides.length) CAROUSEL_SLIDES = slides;
    }).catch(function(){});
  }
  function loadGaleri(){
    return fetchCSV(SHEET_URLS.galeri).then(function(rows){
      if (rows.length < 2) return;
      var headers = rows[0].map(function(h){ return h.trim().toLowerCase(); });
      var photos = [];
      for (var i = 1; i < rows.length; i++) {
        var r = rows[i]; if (!r[0]) continue;
        var obj = {};
        headers.forEach(function(h, hi){ obj[h] = (r[hi] || '').trim(); });
        if (obj.src) photos.push({ src: obj.src, caption: obj.caption || '' });
      }
      PHOTO_GALLERY = photos;
    }).catch(function(){});
  }

  // ---------- ALT YAPI (bunları değiştirmenize gerek yok) ----------

  function injectPortalCSS(){
    if (document.getElementById('ronya-portal-style')) return;
    var st = document.createElement('style');
    st.id = 'ronya-portal-style';
    st.textContent =
      '.rp-carousel{position:relative;width:100%;overflow:hidden;border-radius:18px;margin-bottom:22px;box-shadow:0 6px 24px rgba(0,0,0,.25);}' +
      '.rp-track{display:flex;transition:transform .45s cubic-bezier(.22,.61,.36,1);}' +
      '.rp-slide{flex:0 0 100%;min-height:170px;padding:26px 24px;display:flex;flex-direction:column;justify-content:center;cursor:pointer;color:#fff;}' +
      '.rp-slide-emoji{font-size:32px;margin-bottom:8px;}' +
      '.rp-slide-title{font-size:19px;font-weight:800;margin-bottom:6px;line-height:1.3;}' +
      '.rp-slide-desc{font-size:13px;opacity:.92;line-height:1.5;}' +
      '.rp-dots{position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:6px;}' +
      '.rp-dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.4);transition:all .25s;}' +
      '.rp-dot.active{background:#fff;width:20px;border-radius:4px;}' +
      '.rp-arrow{position:absolute;top:50%;transform:translateY(-50%);width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.25);color:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;cursor:pointer;z-index:2;backdrop-filter:blur(4px);}' +
      '.rp-arrow.left{left:10px;} .rp-arrow.right{right:10px;}' +
      '.rp-section-title{font-size:13px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:var(--tx3);margin:24px 0 10px;display:flex;align-items:center;gap:8px;}' +
      '.rp-section-title::after{content:"";flex:1;height:1px;background:var(--br);}' +
      '.rp-week-card{background:linear-gradient(135deg,rgba(245,158,11,.12),rgba(245,158,11,.03));border:1px solid rgba(245,158,11,.3);border-radius:16px;padding:20px;margin-bottom:10px;}' +
      '.rp-week-badge{display:inline-block;background:#f59e0b;color:#050510;font-size:10px;font-weight:800;padding:3px 10px;border-radius:100px;margin-bottom:10px;}' +
      '.rp-gallery{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;}' +
      '.rp-gallery img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;}' +
      '.rp-gallery-empty{font-size:12px;color:var(--tx3);text-align:center;padding:20px;border:1px dashed var(--br);border-radius:12px;}';
    document.head.appendChild(st);
  }

  var rpIdx = 0, rpTimer = null;
  function rpGoTo(i){
    var track = document.getElementById('rp-track');
    var dots = document.querySelectorAll('.rp-dot');
    if (!track) return;
    rpIdx = (i + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length;
    track.style.transform = 'translateX(-' + (rpIdx * 100) + '%)';
    dots.forEach(function(d, di){ d.classList.toggle('active', di === rpIdx); });
  }
  window.rpNext = function(){ rpGoTo(rpIdx + 1); };
  window.rpPrev = function(){ rpGoTo(rpIdx - 1); };
  window.rpGoSlide = function(i){ rpGoTo(i); resetRpTimer(); };
  window.rpSlideClick = function(nav){
    if (typeof window.nav === 'function') window.nav(nav);
  };
  function resetRpTimer(){
    if (rpTimer) clearInterval(rpTimer);
    rpTimer = setInterval(function(){ rpGoTo(rpIdx + 1); }, 5000);
  }

  function buildCarouselHtml(){
    if (!CAROUSEL_SLIDES.length) return '';
    var slidesHtml = CAROUSEL_SLIDES.map(function(s){
      return '<div class="rp-slide" style="background:' + s.color + '" onclick="rpSlideClick(\'' + s.nav + '\')">' +
        '<div class="rp-slide-emoji">' + s.emoji + '</div>' +
        '<div class="rp-slide-title">' + s.title + '</div>' +
        '<div class="rp-slide-desc">' + s.desc + '</div>' +
      '</div>';
    }).join('');
    var dotsHtml = CAROUSEL_SLIDES.map(function(_, i){
      return '<div class="rp-dot' + (i === 0 ? ' active' : '') + '" onclick="rpGoSlide(' + i + ')"></div>';
    }).join('');
    return '<div class="rp-carousel">' +
      '<div class="rp-arrow left" onclick="rpPrev()">\u2039</div>' +
      '<div class="rp-arrow right" onclick="rpNext()">\u203a</div>' +
      '<div class="rp-track" id="rp-track">' + slidesHtml + '</div>' +
      '<div class="rp-dots">' + dotsHtml + '</div>' +
    '</div>';
  }

  function buildWeekQuestionHtml(){
    if (!HAFTANIN_SORUSU || !HAFTANIN_SORUSU.soru) return '';
    return '<div class="rp-section-title">\ud83d\udd25 Haftanın Sorusu</div>' +
      '<div class="rp-week-card">' +
        '<span class="rp-week-badge">' + HAFTANIN_SORUSU.tarih + '</span>' +
        '<div style="font-size:14px;font-weight:600;color:#fff;line-height:1.7;margin-bottom:12px">' + HAFTANIN_SORUSU.soru + '</div>' +
        '<div onclick="rpToggleWeekAnswer()" style="cursor:pointer;text-align:center;font-size:12px;font-weight:700;color:#050510;background:#f59e0b;border-radius:8px;padding:9px">\ud83d\udc41\ufe0f Çözümü Göster</div>' +
        '<div id="rp-week-answer" style="display:none;margin-top:10px;font-size:13px;color:var(--tx2);line-height:1.8">' + HAFTANIN_SORUSU.cevap + '</div>' +
      '</div>';
  }
  window.rpToggleWeekAnswer = function(){
    var el = document.getElementById('rp-week-answer');
    if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
  };

  function buildGalleryHtml(){
    var html = '<div class="rp-section-title">\ud83d\udcf8 Bizden Kareler</div>';
    if (!PHOTO_GALLERY.length) {
      html += '<div class="rp-gallery-empty">Hen\u00fcz foto\u011fraf eklenmedi \u2014 ronya-portal.js i\u00e7indeki PHOTO_GALLERY listesine ekleyebilirsiniz.</div>';
    } else {
      html += '<div class="rp-gallery">' + PHOTO_GALLERY.map(function(p){
        return '<img src="' + p.src + '" alt="' + (p.caption || '') + '" loading="lazy">';
      }).join('') + '</div>';
    }
    return html;
  }

  function renderPortalHome(){
    var home = document.getElementById('s-home');
    if (!home || document.getElementById('rp-root')) return;
    var pw = home.querySelector('.pw');
    if (!pw) return;
    injectPortalCSS();
    var html = '<div id="rp-root">' + buildCarouselHtml() + buildWeekQuestionHtml() + buildGalleryHtml() + '</div>';
    // "Nereden Başlamalı" kartından ÖNCE ekle (varsa), yoksa en başa
    var guide = document.getElementById('home-guide');
    if (guide) {
      guide.insertAdjacentHTML('beforebegin', html);
    } else {
      pw.insertAdjacentHTML('afterbegin', html);
    }
    if (CAROUSEL_SLIDES.length > 1) resetRpTimer();
  }

  function tryRenderMultipleTimes(){
    // ronya-eklenti.js'in init()'i (menü/ana sayfa kurulumu) bittikten sonra çalışsın diye birka\u00e7 kez deniyoruz
    renderPortalHome();
    setTimeout(renderPortalHome, 400);
    setTimeout(renderPortalHome, 1000);
  }

  function initPortal(){
    // \u00d6nce Google E-Tablosu'ndan g\u00fcncel veriyi \u00e7ek, sonra sayfay\u0131 \u00e7iz
    Promise.all([loadHaftanin(), loadCarousel(), loadGaleri()]).then(tryRenderMultipleTimes).catch(tryRenderMultipleTimes);
    // Veri \u00e7ok yava\u015f gelirse/hi\u00e7 gelmezse bile en ge\u00e7 1sn sonra yedek i\u00e7erikle g\u00f6ster
    setTimeout(tryRenderMultipleTimes, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortal);
  } else {
    initPortal();
  }
})();
