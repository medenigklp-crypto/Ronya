/* ==========================================================================
   RONYA PORTAL — Faz 1: Ana Sayfa Platform Özellikleri
   (Carousel, Haftanın Sorusu, Fotoğraf Galerisi, Profesyonel Tasarım)
   Bu dosya ronya-eklenti.js'DEN SONRA yüklenmelidir:
   <script src="ronya-eklenti.js"></script>
   <script src="ronya-portal.js"></script>
   ========================================================================== */
(function(){
  'use strict';

  // ---------- DÜZENLENEBİLİR İÇERİK (siz burayı güncelleyin) ----------

  // Ana sayfa carousel'i — istediğiniz kadar slayt ekleyin/çıkarın
  var CAROUSEL_SLIDES = [
    { emoji:'\u2696\ufe0f', title:'Kimyasal Denge Ünitesi Tamamlandı!', desc:'Denge, Asit-Baz ve Çözünürlük Dengesi — MEB konu anlatımı + 100+ çözümlü soru', nav:'denge2', color:'linear-gradient(135deg,#6366f1,#818cf8)' },
    { emoji:'\ud83d\udd0c', title:'Redoks Dengeleyici Yenilendi', desc:'48 örnek, adım adım yarı tepkime yöntemiyle', nav:'redoks', color:'linear-gradient(135deg,#f59e0b,#fbbf24)' },
    { emoji:'\ud83e\uddea', title:'Asit-Baz Dengesi', desc:'Suyun otoiyonizasyonu, pH/pOH, titrasyon — tam kapsamlı', nav:'asitbaz2', color:'linear-gradient(135deg,#34d399,#6ee7b7)' },
    { emoji:'\ud83e\udea8', title:'Çözünürlük Dengesi', desc:'Kçç hesaplamaları, ortak iyon etkisi, Le Chatelier', nav:'cozunurluk2', color:'linear-gradient(135deg,#a78bfa,#c4b5fd)' }
  ];

  // Haftanın sorusu — her hafta bu tek objeyi güncelleyin, yeter
  var HAFTANIN_SORUSU = {
    tarih: '14-20 Temmuz',
    soru: '0,1 M\u2019lık HF çözeltisinin oda koşullarında pH değeri kaçtır? (HF için oda koşullarında Ka=1×10\u207b\u2075)',
    cevap: 'Zayıf asit dengesi: Ka=x²/C (yaklaşıklık) → x²=10\u207b\u2075×0,1=10\u207b\u2076 → x=[H\u207a]=<b>0,001 M</b> → <b>pH=3</b>.'
  };

  // Fotoğraf galerisi — foto eklemek için: { src:'fotograf-linki.jpg', caption:'Açıklama' }
  // Şimdilik boş — GitHub'a fotoğraf yükleyip buraya link eklediğinizde otomatik görünür
  var PHOTO_GALLERY = [];

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

  function initPortal(){
    // ronya-eklenti.js'in init()'i (menü/ana sayfa kurulumu) bittikten sonra çalışsın diye geciktiriyoruz
    setTimeout(renderPortalHome, 400);
    setTimeout(renderPortalHome, 1000); // güvenlik için ikinci deneme (varsa gecikmeli base script'lerden sonra)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortal);
  } else {
    initPortal();
  }
})();

