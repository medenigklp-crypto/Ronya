/* ============================================================
   RONYA KİMYA — SERVICE WORKER (çevrimdışı destek)
   KURULUM: Bu dosyayı repo köküne (index.html'in yanına) koy.
   Kayıt işlemi ronya-eklenti.js tarafından otomatik yapılır.
   Site HTTPS üzerinden sunulmalıdır (GitHub Pages uygundur).
   Strateji:
   • Sayfalar (HTML): önce ağ, çevrimdışıysa önbellek
     → güncellemeler her zaman gelir, internetsizken site açılır
   • Diğer dosyalar (JS/CSS/görsel/video): önce önbellek,
     arka planda tazeleme → hızlı ve çevrimdışı çalışır
   ============================================================ */
var CACHE = 'ronya-v1';

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // Çekirdek dosyalar: biri eksikse diğerleri yine de önbelleğe girsin
      return Promise.all(
        ['./', 'index.html', 'ronya-eklenti.js', 'manifest.json'].map(function (u) {
          return c.add(u).catch(function () {});
        })
      );
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; })
            .map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  // Sayfa gezinmeleri: önce ağ, olmazsa önbellek
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (r) {
        var cp = r.clone();
        caches.open(CACHE).then(function (c) { c.put(req, cp); });
        return r;
      }).catch(function () {
        return caches.match(req).then(function (m) {
          return m || caches.match('index.html');
        });
      })
    );
    return;
  }

  // Farklı alan adları (Google Fonts, CDN): ağ, olmazsa önbellek
  if (url.origin !== self.location.origin) {
    e.respondWith(
      fetch(req).then(function (r) {
        var cp = r.clone();
        caches.open(CACHE).then(function (c) { c.put(req, cp); });
        return r;
      }).catch(function () { return caches.match(req); })
    );
    return;
  }

  // Aynı alan adındaki dosyalar: önce önbellek, arka planda tazele
  e.respondWith(
    caches.match(req).then(function (m) {
      var refresh = fetch(req).then(function (r) {
        if (r && r.ok) {
          var cp = r.clone();
          caches.open(CACHE).then(function (c) { c.put(req, cp); });
        }
        return r;
      }).catch(function () {});
      return m || refresh;
    })
  );
});
