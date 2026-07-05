/* ============================================================
   RONYA KİMYA — SERVICE WORKER v2 (AĞ ÖNCELİKLİ)
   KURULUM: Bu dosyayı repo köküne (index.html'in yanına) koy,
   ESKİSİNİN ÜZERİNE YAZ. Kayıt işlemi ronya-eklenti.js
   tarafından otomatik yapılır.

   DEĞİŞİKLİK (v1 → v2): Önceki sürüm statik dosyalar (JS/CSS)
   için "önce önbellek" stratejisi kullanıyordu — bu yüzden
   güncellemeler bazen 1-2 sayfa yenilemesi sonra görünüyordu.
   Artık HER İSTEK önce internetten deneniyor; sadece çevrimdışı
   olduğunda önbelleğe düşülüyor. Böylece her güncelleme anında,
   TEK bir yenilemeyle görünür. Çevrimdışı çalışma özelliği
   aynen korunuyor.
   ============================================================ */
var CACHE = 'ronya-v2';

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
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

  e.respondWith(
    fetch(req).then(function (r) {
      if (r && r.ok) {
        var cp = r.clone();
        caches.open(CACHE).then(function (c) { c.put(req, cp); });
      }
      return r;
    }).catch(function () {
      return caches.match(req).then(function (m) {
        return m || (req.mode === 'navigate' ? caches.match('index.html') : undefined);
      });
    })
  );
});
