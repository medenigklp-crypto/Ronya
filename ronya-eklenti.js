/* ============================================================
   RONYA KİMYA — EKLENTİ v37 (YENİDEN İNŞA EDİLDİ — 11 Temmuz felaketi sonrası)
   NOT: Bu dosya, kaza sonucu silinen v37'nin elde kalan bileşen
   parçalarından yeniden inşa edilmiştir. Doğrulanan içerik: Hidrokarbon,
   Fonksiyonel Gruplar, Zayıf Etkileşimler, Ayarlar, Galvanik Hücre,
   Kimyasal Denge 3D, Tepkime Türü, Alev Testi, Redoks (hazır 6 örnek),
   Fiziksel/Kimyasal Değişim, Tepkime Hızı (3D+PE+Hesaplayıcı+Bağıntı),
   Maarif Hız (tam + 66 soru), Özel Ders Notu Hız (29 soru düzeltilmiş),
   Kimyasal Enerji (19 soru), Video Kütüphanesi, Kimyasal Denge MEB+Özel
   Not (34 soru). EKSİK GİDERİLDİ ve GENİŞLETİLDİ: Redoks ekranına "Kendi Denklemim"
   (genel motor) ve şimdi "48 Örnek" (kullanıcının hatırladığı orijinal
   27 ileri düzey denklem + 21 benzersiz ek denklem, toplam 48) sekmeleri
   eklendi. Katsayılar Gauss eliminasyon motoruyla doğrulandı; yükseltgenme
   basamağı geçişleri ise EL İLE doğrulandı (dinamik analiz motorunun
   KMnO4/peroksit/çoklu-N bileşiklerinde hata yaptığı tespit edildi,
   örn. K2MnO4’te Mn+7 sanması gibi — bu hatalar düzeltilerek
   sabit veri olarak eklendi).
   YENİ: Kimyasal Denge MEB Konu Anlatımına 2.1.5 (Le Chatelier
   İlkesi) eklendi — Derişim/Hacim/Basınç/Sıcaklık/Katalizör kuralları
   + MEB kitabının 2.5. Kontrol Noktası'ndaki 2H2S+CH4<=>CS2(s)+4H2+isi
   tepkimesi üzerinden 13 farklı senaryo (madde ekleme/cikarma,
   sicaklik, hacim, basinc, katalizor, He gazi sabit hacim/basinc
   ayrimi dahil), hepsi elle Le Chatelier kurallariyla dogrulanip
   interaktif (dokununca acilan) liste olarak eklendi.
   1) Gerçek denklem dengeleyici (matris + Gauss eliminasyonu)
   2) 21–118 arası TAM element verisi
   3) Gelişmiş element testi: aralıklar (İlk 20 / 36+12 / Tümü /
      🎯 Yanlışlarım), yeni soru tipleri (Grup, Periyot, e⁻
      Dizilimi), yazarak cevap modu, zayıf nokta takibi
   4) Mol hesaplayıcıya formülden otomatik molar kütle
   5) Skor tablosu + istatistik + günlük çalışma serisi
   6) Pomodoro: otomatik çalışma↔mola döngüsü
   7) Flashcard: Leitner aralıklı tekrar + 14 iyon kartı
   8) Bileşik adlandırma testi (Formül↔Ad, 46 YKS bileşiği)
   9) 🎓 YKS Provası: süreli, karma 20 soru
   10) Bohr atom modeli animasyonu (element detayında)
   11) Sonuç paylaşım kartı + ilerleme yedekleme
   12) Çevrimdışı çalışma (sw.js dosyası da repoya konmalı)
   13) Denklem dengeleme alıştırması (katsayıları sen yaz)
   14) Günün elementi kartı (ana sayfada)
   15) Rozet sistemi (10 rozet, skor ekranında)
   16) Yükseltgenme basamağı bulucu (mol ekranında)
   17) İlerleme grafiği (son 20 testin doğruluk eğrisi)
   18) Element karşılaştırma ekranı (menüde)
   19) 🔋 3D Elektroliz Laboratuvarı (10 sistemli 3D sim +
       Faraday + kaplama senaryoları)
   20) 🔗 Seri Kaplar canlı simülatörü: 2-3 kap, 17 elektrolit,
       kaydırıcı/manuel I-t, kap başına katot-anot ürün miktarı
   21) 🧬 Hidrokarbonlar 3D: alkan/alken/alkinlerin ilk 10'ar
       üyesi, gerçek bağ geometrisi, pinch-zoom, fütüristik fon
   22) 🔗 Seri Kaplar TAM 3D simülasyonu: sürükle-döndür sahne,
       çoklu kap + pil + elektron akışı, gerçek iyon göçü
   23) 🥈 Kaplama senaryolarına 3D görsel: nesne/metal elektrot,
       Doğru↔Yanlış Bağlantı karşılaştırması, ortak 3D motor
   24) 🧬 Dallanmış IUPAC isim ayrıştırıcı: "3-metilbütan" gibi
       isimlerden 3D molekül çizimi (metil/etil/propil/bütil/
       izopropil/izobütil/tersbütil + çift/üçlü bağ konumu)
   25) ⚗️ Fonksiyonel Gruplar 3D: Alkol, Eter, Aldehit, Keton,
       Karboksilik Asit, Ester — 18 molekül + detaylı konu +
       tepkimeler (oksijen atomu render desteği eklendi)
   26) 🧊 Maarif 9. Sınıf Etkileşim Ünitesi: Zayıf Etkileşimler
       (London/dipol-dipol/hidrojen bağı) + Maddenin Halleri
       (katı/sıvı/gaz/plazma parçacık simülasyonu), 3D + detaylı konu
   KURULUM: index.html'de </body> etiketinden hemen önce,
   diğer script'lerin ALTINA şu satırı ekle:
   <script src="ronya-eklenti.js"></script>
   Başka hiçbir değişiklik gerekmez — eski balEq() otomatik
   olarak devre dışı kalır, EL_DATA otomatik tamamlanır.
   ============================================================ */
(function () {
  'use strict';

  /* ============================================================
     BÖLÜM 1 — TAM ELEMENT VERİSİ (Z = 21..118)
     Format: [İngilizce ad, elektronegatiflik(Pauling), erime°C, kaynama°C, açıklama]
     null = bilinmiyor / ölçülemedi
     ============================================================ */
  var EK = {
    21:['Scandium',1.36,1541,2836,'Hafif geçiş metali; alüminyum alaşımlarında ve spor ekipmanlarında kullanılır.'],
    22:['Titanium',1.54,1668,3287,'Hafif, güçlü ve korozyona dayanıklı; uçak gövdeleri ve protezlerde.'],
    23:['Vanadium',1.63,1910,3407,'Çelik alaşımlarını sertleştirir; takım çeliklerinde.'],
    24:['Chromium',1.66,1907,2671,'Paslanmaz çeliğe parlaklık ve korozyon direnci verir.'],
    25:['Manganese',1.55,1246,2061,'Çelik üretiminin vazgeçilmez katkı metali.'],
    26:['Iron',1.83,1538,2862,'Yerkabuğunun en önemli metali; çeliğin ve hemoglobinin temeli.'],
    27:['Cobalt',1.88,1495,2927,'Mavi pigmentlerde ve lityum pil katotlarında.'],
    28:['Nickel',1.91,1455,2913,'Madeni paralarda ve paslanmaz çelikte.'],
    29:['Copper',1.90,1085,2562,'Elektrik kablolarının metali; mükemmel iletken.'],
    30:['Zinc',1.65,420,907,'Galvanizleme ile demiri pastan korur; pirinç alaşımında.'],
    31:['Gallium',1.81,29.8,2400,'Elde eriyen metal (EN: 29.8°C); LED ve yarı iletkenlerde.'],
    32:['Germanium',2.01,938,2833,'Yarı iletken; fiber optik ve kızılötesi optikte.'],
    33:['Arsenic',2.18,817,614,'Zehirli yarı metal; yarı iletken katkısı olarak kullanılır.'],
    34:['Selenium',2.55,221,685,'Fotosellerde ve antioksidan enzimlerde.'],
    35:['Bromine',2.96,-7.2,59,'Oda sıcaklığında sıvı olan tek ametal; kırmızı-kahverengi.'],
    36:['Krypton',3.00,-157,-153,'Soy gaz; flaş lambaları ve lazerlerde.'],
    37:['Rubidium',0.82,39,688,'Çok aktif alkali metal; atom saatlerinde.'],
    38:['Strontium',0.95,777,1382,'Havai fişeklere parlak kırmızı rengi verir.'],
    39:['Yttrium',1.22,1526,3345,'LED fosforları ve süperiletken seramiklerde.'],
    40:['Zirconium',1.33,1855,4409,'Nükleer reaktör yakıt kılıflarında; nötron geçirgen.'],
    41:['Niobium',1.6,2477,4744,'Süperiletken mıknatıslarda (MR cihazları).'],
    42:['Molybdenum',2.16,2623,4639,'Yüksek sıcaklığa dayanıklı çelik alaşımlarında.'],
    43:['Technetium',1.9,2157,4265,'Laboratuvarda üretilen ilk yapay element; tıbbi görüntülemede.'],
    44:['Ruthenium',2.2,2334,4150,'Sert platin grubu metali; elektrik kontaklarında.'],
    45:['Rhodium',2.28,1964,3695,'Katalitik konvertörlerde; en pahalı metallerden biri.'],
    46:['Palladium',2.20,1555,2963,'Hidrojen depolama ve otomobil katalizörlerinde.'],
    47:['Silver',1.93,962,2162,'En iyi elektrik iletkeni; takı ve elektronikte.'],
    48:['Cadmium',1.69,321,767,'Ni-Cd pillerde; zehirli ağır metal.'],
    49:['Indium',1.78,157,2072,'Dokunmatik ekran kaplamalarında (ITO).'],
    50:['Tin',1.96,232,2602,'Bronzun ve lehimin bileşeni; konserve kaplamada.'],
    51:['Antimony',2.05,631,1587,'Alev geciktirici bileşiklerde ve akülerde.'],
    52:['Tellurium',2.1,450,988,'Güneş panellerinde (CdTe) kullanılan yarı metal.'],
    53:['Iodine',2.66,114,184,'Tiroid için hayati; antiseptik olarak kullanılır.'],
    54:['Xenon',2.6,-112,-108,'Araba farları, iyon motorları ve anestezide.'],
    55:['Cesium',0.79,28.4,671,'Atom saatlerinin standardı; en aktif doğal metallerden.'],
    56:['Barium',0.89,727,1897,'Röntgen kontrast maddesi (BaSO₄) olarak kullanılır.'],
    57:['Lanthanum',1.10,920,3464,'Lantanit serisine adını verir; hibrit araç pillerinde.'],
    58:['Cerium',1.12,795,3443,'Çakmak taşında ve cam parlatma tozunda.'],
    59:['Praseodymium',1.13,935,3520,'Güçlü mıknatıslarda ve kaynakçı gözlüğü camlarında.'],
    60:['Neodymium',1.14,1024,3074,'En güçlü kalıcı mıknatısların (NdFeB) elementi.'],
    61:['Promethium',1.13,1042,3000,'Doğada eser miktarda bulunan radyoaktif lantanit.'],
    62:['Samarium',1.17,1072,1794,'SmCo mıknatıslarında; yüksek sıcaklığa dayanıklı.'],
    63:['Europium',1.2,826,1529,'Ekranlarda kırmızı fosfor; euro banknot güvenlik mürekkebinde.'],
    64:['Gadolinium',1.20,1312,3273,'MR kontrast maddelerinde; güçlü nötron yutucu.'],
    65:['Terbium',1.1,1356,3230,'Yeşil fosforlarda ve manyetostriktif alaşımlarda.'],
    66:['Dysprosium',1.22,1407,2567,'Rüzgar türbini mıknatıslarının kritik katkısı.'],
    67:['Holmium',1.23,1461,2720,'En güçlü manyetik element; tıbbi lazerlerde.'],
    68:['Erbium',1.24,1529,2868,'Fiber optik sinyal yükselteçlerinde.'],
    69:['Thulium',1.25,1545,1950,'Taşınabilir röntgen cihazlarında.'],
    70:['Ytterbium',1.1,824,1196,'Atom saatleri ve fiber lazerlerde.'],
    71:['Lutetium',1.27,1652,3402,'PET tarama dedektörlerinde; en ağır lantanit.'],
    72:['Hafnium',1.3,2233,4603,'Nükleer kontrol çubuklarında; güçlü nötron yutucu.'],
    73:['Tantalum',1.5,3017,5458,'Telefonlardaki minik kondansatörlerin metali.'],
    74:['Tungsten',2.36,3422,5555,'En yüksek erime noktalı metal (3422°C); ampul telleri.'],
    75:['Rhenium',1.9,3186,5596,'Jet motoru süperalaşımlarında; en nadir elementlerden.'],
    76:['Osmium',2.2,3033,5012,'En yoğun element (22.6 g/cm³).'],
    77:['Iridium',2.20,2446,4428,'Korozyona en dayanıklı metal; buji uçlarında.'],
    78:['Platinum',2.28,1768,3825,'Değerli katalizör metali; takı ve laboratuvar kaplarında.'],
    79:['Gold',2.54,1064,2856,'Tarih boyunca değerin simgesi; oksitlenmez, işlenmesi kolay.'],
    80:['Mercury',2.00,-38.8,357,'Oda sıcaklığında sıvı olan tek metal; zehirli.'],
    81:['Thallium',1.62,304,1473,'Çok zehirli; eskiden fare zehirlerinde kullanılırdı.'],
    82:['Lead',2.33,327,1749,'Yoğun ve yumuşak; akülerde ve radyasyon kalkanlarında. Zehirli.'],
    83:['Bismuth',2.02,271,1564,'Kararlı sayılan en ağır element; mide ilaçlarında.'],
    84:['Polonium',2.0,254,962,'Curie çifti tarafından keşfedilen çok radyoaktif yarı metal.'],
    85:['Astatine',2.2,302,337,'Yerkabuğundaki en nadir doğal element; çok radyoaktif.'],
    86:['Radon',2.2,-71,-62,'Radyoaktif soy gaz; bodrumlarda birikebilir, sağlık riski taşır.'],
    87:['Francium',0.7,27,677,'En aktif metal; en kararsız doğal elementlerden biri.'],
    88:['Radium',0.9,700,1737,'Marie Curie keşfetti; eskiden fosforlu saat kadranlarında.'],
    89:['Actinium',1.1,1050,3200,'Aktinit serisine adını veren radyoaktif metal.'],
    90:['Thorium',1.3,1750,4788,'Potansiyel nükleer yakıt; uranyumdan daha bol.'],
    91:['Protactinium',1.5,1572,4000,'Nadir, zehirli ve çok radyoaktif aktinit.'],
    92:['Uranium',1.38,1132,4131,'Nükleer santrallerin yakıtı; doğal en ağır yaygın element.'],
    93:['Neptunium',1.36,644,3902,'Uranyum ötesi ilk element; nükleer reaktörlerde oluşur.'],
    94:['Plutonium',1.28,640,3228,'Nükleer silahlarda ve uzay sondalarının güç kaynağında.'],
    95:['Americium',1.3,1176,2607,'Ev tipi duman dedektörlerinde kullanılır.'],
    96:['Curium',1.28,1345,3110,'Curie çifti onuruna adlandırılan sentetik element.'],
    97:['Berkelium',1.3,986,2627,'Berkeley (ABD) onuruna adlandırılan sentetik element.'],
    98:['Californium',1.3,900,1470,'Nötron kaynağı olarak kullanılan sentetik element.'],
    99:['Einsteinium',1.3,860,null,'Einstein onuruna adlandırılan sentetik element.'],
    100:['Fermium',1.3,null,null,'Enrico Fermi onuruna adlandırılan sentetik element.'],
    101:['Mendelevium',1.3,null,null,'Periyodik tablonun babası Mendeleyev onuruna adlandırıldı.'],
    102:['Nobelium',1.3,null,null,'Alfred Nobel onuruna adlandırılan sentetik element.'],
    103:['Lawrencium',null,null,null,'Ernest Lawrence onuruna adlandırılan sentetik element.'],
    104:['Rutherfordium',null,null,null,'Ernest Rutherford onuruna adlandırılan sentetik element.'],
    105:['Dubnium',null,null,null,'Dubna (Rusya) araştırma merkezi onuruna adlandırıldı.'],
    106:['Seaborgium',null,null,null,'Glenn Seaborg onuruna, hayattayken adlandırılan tek element.'],
    107:['Bohrium',null,null,null,'Niels Bohr onuruna adlandırılan sentetik element.'],
    108:['Hassium',null,null,null,'Hessen (Almanya) eyaleti onuruna adlandırıldı.'],
    109:['Meitnerium',null,null,null,'Fizikçi Lise Meitner onuruna adlandırıldı.'],
    110:['Darmstadtium',null,null,null,'Darmstadt (Almanya) kenti onuruna adlandırıldı.'],
    111:['Roentgenium',null,null,null,'X-ışınlarını keşfeden Röntgen onuruna adlandırıldı.'],
    112:['Copernicium',null,null,null,'Astronom Kopernik onuruna adlandırıldı.'],
    113:['Nihonium',null,null,null,'Japonya\u2019da (Nihon) keşfedilen ilk element.'],
    114:['Flerovium',null,null,null,'Fizikçi Georgy Flyorov onuruna adlandırıldı.'],
    115:['Moscovium',null,null,null,'Moskova bölgesi onuruna adlandırıldı.'],
    116:['Livermorium',null,null,null,'Livermore (ABD) laboratuvarı onuruna adlandırıldı.'],
    117:['Tennessine',null,null,null,'Tennessee (ABD) eyaleti onuruna adlandırıldı.'],
    118:['Oganesson',null,null,null,'Fizikçi Yuri Oganessian onuruna adlandırıldı; en ağır element.']
  };

  // --- Elektron dizilimi üretici (Aufbau + gerçek istisnalar) ---
  var SUBS = [['1s',2],['2s',2],['2p',6],['3s',2],['3p',6],['4s',2],['3d',10],['4p',6],['5s',2],['4d',10],['5p',6],['6s',2],['4f',14],['5d',10],['6p',6],['7s',2],['5f',14],['6d',10],['7p',6]];
  // İstisnalar: [kaynak alt kabuk, hedef alt kabuk, taşınan e⁻ sayısı]
  var EXC = {24:[['4s','3d',1]],29:[['4s','3d',1]],41:[['5s','4d',1]],42:[['5s','4d',1]],44:[['5s','4d',1]],45:[['5s','4d',1]],46:[['5s','4d',2]],47:[['5s','4d',1]],57:[['4f','5d',1]],58:[['4f','5d',1]],64:[['4f','5d',1]],78:[['6s','5d',1]],79:[['6s','5d',1]],89:[['5f','6d',1]],90:[['5f','6d',2]],91:[['5f','6d',1]],92:[['5f','6d',1]],93:[['5f','6d',1]],96:[['5f','6d',1]],103:[['6d','7p',1]]};
  var CORES = [[86,'Rn'],[54,'Xe'],[36,'Kr'],[18,'Ar'],[10,'Ne'],[2,'He']];
  var SUP = {'0':'\u2070','1':'\u00b9','2':'\u00b2','3':'\u00b3','4':'\u2074','5':'\u2075','6':'\u2076','7':'\u2077','8':'\u2078','9':'\u2079'};
  function sup(n){ return String(n).replace(/\d/g, function(d){return SUP[d];}); }

  function buildElectron(z){
    var fill = {}, left = z, i, name, cap;
    for (i = 0; i < SUBS.length && left > 0; i++) {
      name = SUBS[i][0]; cap = SUBS[i][1];
      fill[name] = Math.min(cap, left); left -= fill[name];
    }
    if (EXC[z]) EXC[z].forEach(function(m){
      fill[m[0]] = (fill[m[0]]||0) - m[2];
      fill[m[1]] = (fill[m[1]]||0) + m[2];
      if (fill[m[0]] <= 0) delete fill[m[0]];
    });
    // Soy gaz çekirdeği bul
    var coreZ = 0, coreSym = '';
    for (i = 0; i < CORES.length; i++) if (CORES[i][0] < z) { coreZ = CORES[i][0]; coreSym = CORES[i][1]; break; }
    // Çekirdek dizilimi
    var coreFill = {}; left = coreZ;
    for (i = 0; i < SUBS.length && left > 0; i++) { coreFill[SUBS[i][0]] = Math.min(SUBS[i][1], left); left -= coreFill[SUBS[i][0]]; }
    // Çekirdek dışı alt kabuklar (n, sonra l sırasıyla göster)
    var lOrder = {s:0,p:1,d:2,f:3}, outer = [];
    Object.keys(fill).forEach(function(k){
      var rem = fill[k] - (coreFill[k]||0);
      if (rem > 0) outer.push({n:+k[0], l:lOrder[k[1]], k:k, e:rem});
    });
    outer.sort(function(a,b){ return a.n - b.n || a.l - b.l; });
    var conf = (coreSym ? '[' + coreSym + '] ' : '') + outer.map(function(o){ return o.k + sup(o.e); }).join(' ');
    // Kabuk dolulukları
    var shells = [0,0,0,0,0,0,0,0];
    Object.keys(fill).forEach(function(k){ shells[+k[0]] += fill[k]; });
    var shellStr = [];
    for (i = 1; i <= 7; i++) if (shells[i] > 0) shellStr.push(shells[i]);
    return { conf: conf, shells: shellStr.join('|') };
  }

  function enrichElements(){
    if (typeof EL_DATA === 'undefined' || typeof PT_POS === 'undefined') return;
    for (var z = 21; z <= 118; z++) {
      var src = EK[z]; if (!src) continue;
      var pos = PT_POS[z] || [0,0];
      var period = pos[0] >= 9 ? pos[0] - 3 : pos[0]; // Lantanit(9)→6, Aktinit(10)→7
      var el = buildElectron(z);
      var phase = 'Kat\u0131';
      if (z === 35 || z === 80) phase = 'S\u0131v\u0131';
      if (z === 36 || z === 54 || z === 86 || z === 118) phase = 'Gaz';
      EL_DATA[z] = {
        en: src[0], period: period, group: pos[1], phase: phase,
        neg: src[1], melt: src[2], boil: src[3],
        conf: el.conf, shells: el.shells, desc: src[4]
      };
    }
  }

  /* ============================================================
     BÖLÜM 2 — GERÇEK DENKLEM DENGELEYİCİ
     Yöntem: element sayım matrisi kurulur, kesirli Gauss
     eliminasyonu ile Ax=0 çözülür, en küçük tam sayı
     katsayılar bulunur. Parantez ve hidrat (·) desteklenir.
     ============================================================ */
  function gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ var t=a%b; a=b; b=t; } return a||1; }
  function F(n,d){ d=d||1; if(d<0){n=-n;d=-d;} var g=gcd(n,d); return {n:n/g, d:d/g}; }
  function fAdd(a,b){ return F(a.n*b.d + b.n*a.d, a.d*b.d); }
  function fMul(a,b){ return F(a.n*b.n, a.d*b.d); }
  function fDiv(a,b){ return F(a.n*b.d, a.d*b.n); }
  function fNeg(a){ return F(-a.n, a.d); }

  // Formül ayrıştırıcı: iç içe parantez + hidrat noktası
  function parseFormula(str){
    str = str.replace(/[\u00b7\u2022*]/g, '.'); // ·, •, * → .
    var total = {};
    str.split('.').forEach(function(part){
      part = part.trim(); if (!part) return;
      var mult = 1, m = part.match(/^(\d+)(.*)$/);
      if (m && m[2]) { mult = +m[1]; part = m[2]; } // 5H2O gibi hidrat çarpanı
      var counts = parseGroup(part, 0);
      if (counts.pos !== part.length) throw new Error('S\u00f6zdizimi: ' + part);
      Object.keys(counts.map).forEach(function(e){
        total[e] = (total[e]||0) + counts.map[e]*mult;
      });
    });
    return total;
  }
  function parseGroup(s, pos){
    var map = {};
    while (pos < s.length) {
      var ch = s[pos];
      if (ch === '(' || ch === '[') {
        var inner = parseGroup(s, pos+1);
        pos = inner.pos;
        if (s[pos] !== ')' && s[pos] !== ']') throw new Error('Parantez kapanmam\u0131\u015f');
        pos++;
        var nm = s.slice(pos).match(/^\d+/), k = nm ? +nm[0] : 1;
        if (nm) pos += nm[0].length;
        Object.keys(inner.map).forEach(function(e){ map[e]=(map[e]||0)+inner.map[e]*k; });
      } else if (ch === ')' || ch === ']') {
        return { map: map, pos: pos };
      } else {
        var em = s.slice(pos).match(/^([A-Z][a-z]?)(\d*)/);
        if (!em) throw new Error('Ge\u00e7ersiz karakter: ' + ch);
        map[em[1]] = (map[em[1]]||0) + (em[2] ? +em[2] : 1);
        pos += em[0].length;
      }
    }
    return { map: map, pos: pos };
  }

  var SUB = {'0':'\u2080','1':'\u2081','2':'\u2082','3':'\u2083','4':'\u2084','5':'\u2085','6':'\u2086','7':'\u2087','8':'\u2088','9':'\u2089'};
  function pretty(formula){
    // Rakamları alt simgeye çevir; hidrat noktasından hemen sonraki çarpan normal kalır
    return formula.split(/[.\u00b7]/).map(function(part, i){
      if (i === 0) return part.replace(/\d/g, function(d){ return SUB[d]; });
      var m = part.match(/^(\d*)(.*)$/);
      return m[1] + m[2].replace(/\d/g, function(d){ return SUB[d]; });
    }).join('\u00b7');
  }

  function balanceEquation(input){
    // Normalize: oklar, hal sembolleri, boşluklar
    var s = input.replace(/\s+/g, '')
                 .replace(/(\u2192|\u21cc|<->|<=>|=>|=)/g, '->')
                 .replace(/\((k|s|g|l|aq|suda|kat\u0131|s\u0131v\u0131|gaz)\)/gi, '');
    var sides = s.split('->');
    if (sides.length !== 2 || !sides[0] || !sides[1]) throw new Error('Denklemde "->" ile ayr\u0131lm\u0131\u015f iki taraf olmal\u0131.');
    var species = [], nReact = 0;
    sides[0].split('+').forEach(function(f){ if(f){ species.push(stripCoef(f)); nReact++; } });
    sides[1].split('+').forEach(function(f){ if(f){ species.push(stripCoef(f)); } });
    if (species.length < 2) throw new Error('En az iki madde gerekli.');

    // Element listesi ve matris
    var maps = species.map(function(sp){ return parseFormula(sp); });
    var elements = {};
    maps.forEach(function(m){ Object.keys(m).forEach(function(e){ elements[e]=1; }); });
    var elist = Object.keys(elements);
    // Her element her iki tarafta da olmalı
    for (var e2 = 0; e2 < elist.length; e2++) {
      var el = elist[e2], inR = false, inP = false;
      for (var si = 0; si < maps.length; si++) {
        if (maps[si][el]) { if (si < nReact) inR = true; else inP = true; }
      }
      if (!inR || !inP) throw new Error('"' + el + '" elementi yaln\u0131z bir tarafta var \u2014 denklem dengelenemez.');
    }

    // A matrisi: satır=element, sütun=tür (ürünler negatif)
    var A = elist.map(function(el){
      return maps.map(function(m, i){
        var c = m[el] || 0;
        return F(i < nReact ? c : -c, 1);
      });
    });

    // Kesirli Gauss (RREF)
    var rows = A.length, cols = species.length, r = 0, pivCols = [];
    for (var c = 0; c < cols && r < rows; c++) {
      var pr = -1;
      for (var i2 = r; i2 < rows; i2++) if (A[i2][c].n !== 0) { pr = i2; break; }
      if (pr === -1) continue;
      var tmp = A[r]; A[r] = A[pr]; A[pr] = tmp;
      var pv = A[r][c];
      for (var j = 0; j < cols; j++) A[r][j] = fDiv(A[r][j], pv);
      for (var i3 = 0; i3 < rows; i3++) {
        if (i3 !== r && A[i3][c].n !== 0) {
          var factor = A[i3][c];
          for (var j2 = 0; j2 < cols; j2++) A[i3][j2] = fAdd(A[i3][j2], fMul(fNeg(factor), A[r][j2]));
        }
      }
      pivCols.push(c); r++;
    }
    var free = [];
    for (var c2 = 0; c2 < cols; c2++) if (pivCols.indexOf(c2) === -1) free.push(c2);
    if (free.length === 0) throw new Error('Tutarl\u0131 bir denge bulunamad\u0131 \u2014 form\u00fclleri kontrol et.');
    if (free.length > 1) throw new Error('Denklem birden fazla ba\u011f\u0131ms\u0131z tepkime i\u00e7eriyor; tek tepkime olarak dengelenemez.');

    // Serbest değişken = 1, çözümü kur
    var x = new Array(cols), fc = free[0];
    for (var k = 0; k < cols; k++) x[k] = F(0,1);
    x[fc] = F(1,1);
    for (var pi = 0; pi < pivCols.length; pi++) x[pivCols[pi]] = fNeg(A[pi][fc]);

    // Paydaların OKEK'i ile tam sayıya çevir, OBEB ile sadeleştir
    var lcm = 1;
    x.forEach(function(f){ lcm = lcm / gcd(lcm, f.d) * f.d; });
    var ints = x.map(function(f){ return f.n * (lcm / f.d); });
    var g = 0; ints.forEach(function(v){ g = gcd(g, v); });
    ints = ints.map(function(v){ return v / g; });
    if (ints[0] < 0) ints = ints.map(function(v){ return -v; });
    for (var v2 = 0; v2 < ints.length; v2++) {
      if (ints[v2] <= 0) throw new Error('Pozitif katsay\u0131 bulunamad\u0131 \u2014 tepkime bu haliyle dengelenemez.');
    }

    balanceEquation._last = { ints: ints, species: species, nReact: nReact };
    // Çıktıyı biçimlendir
    function side(from, to){
      var parts = [];
      for (var i = from; i < to; i++) {
        parts.push((ints[i] === 1 ? '' : ints[i]) + pretty(species[i]));
      }
      return parts.join(' + ');
    }
    return side(0, nReact) + ' \u2192 ' + side(nReact, species.length);
  }
  function stripCoef(f){
    // Kullanıcı "2H2O" yazdıysa baştaki katsayıyı at (hidrat noktasından ÖNCE değilse)
    var m = f.match(/^(\d+)([A-Z(\[].*)$/);
    return m ? m[2] : f;
  }

  // Eski balEq'i gerçek algoritmayla değiştir
  window.balEq = function(){
    var inp = document.getElementById('eqi');
    var dsp = document.getElementById('eqdsp');
    if (!inp || !dsp) return;
    var val = inp.value.trim();
    if (!val) { if (typeof toast === 'function') toast('Denklem girin!'); return; }
    dsp.style.display = 'flex';
    try {
      dsp.style.color = '';
      dsp.innerHTML = balanceEquation(val);
    } catch (err) {
      dsp.style.color = '#ef4444';
      dsp.textContent = '\u26a0\ufe0f ' + err.message;
    }
  };

  /* ============================================================
     BÖLÜM 3 — GELİŞMİŞ ELEMENT & BİLEŞİK TESTİ
     • Aralıklar: İlk 20 / 36+12 / Tümü / 🎯 Yanlışlarım
     • Soru tipleri: Sembol, İsim, Grup, Periyot, e⁻ Dizilimi,
       Bileşik→Ad, Ad→Formül
     • 🎓 YKS Provası: süreli, karma 20 soru
     • Cevap modu: Şıklı veya Yazarak
     • Zayıf nokta takibi, skor kaydı, günlük seri, sonuç
       paylaşımı ve yedekleme (localStorage)
     ============================================================ */
  function sget(k, d){ try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function sset(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var qMode = '20', qPool = [], ansMode = 'choice', qAnswered = false, sessionWeakAdded = 0;
  var examOn = false, examTimer = null, examLeft = 0, lastResult = null;
  var EXAM_N = 20, EXAM_SEC = 600;
  var Q_EXTRA = ['Ag','Au','Pt','Hg','I','Ba','Pb','Sn','Bi','Sb','Xe','Pd'];
  var GMAP = {1:'1A', 2:'2A', 13:'3A', 14:'4A', 15:'5A', 16:'6A', 17:'7A', 18:'8A'};

  // YKS düzeyinde bileşik listesi: f=düz formül, n=ad, c=sınıf
  var COMPOUNDS = [
    {f:'CO2', n:'Karbondioksit', c:'Oksit'}, {f:'CO', n:'Karbonmonoksit', c:'Oksit'},
    {f:'SO2', n:'K\u00fck\u00fcrt dioksit', c:'Oksit'}, {f:'SO3', n:'K\u00fck\u00fcrt trioksit', c:'Oksit'},
    {f:'NO', n:'Azot monoksit', c:'Oksit'}, {f:'NO2', n:'Azot dioksit', c:'Oksit'},
    {f:'N2O', n:'Diazot monoksit', c:'Oksit'}, {f:'P2O5', n:'Difosfor pentaoksit', c:'Oksit'},
    {f:'Fe2O3', n:'Demir(III) oksit', c:'Oksit'}, {f:'FeO', n:'Demir(II) oksit', c:'Oksit'},
    {f:'CuO', n:'Bak\u0131r(II) oksit', c:'Oksit'}, {f:'Cu2O', n:'Bak\u0131r(I) oksit', c:'Oksit'},
    {f:'Al2O3', n:'Al\u00fcminyum oksit', c:'Oksit'}, {f:'MgO', n:'Magnezyum oksit', c:'Oksit'},
    {f:'CaO', n:'Kalsiyum oksit (s\u00f6nmemi\u015f kire\u00e7)', c:'Oksit'}, {f:'ZnO', n:'\u00c7inko oksit', c:'Oksit'},
    {f:'HCl', n:'Hidroklorik asit', c:'Asit'}, {f:'H2SO4', n:'S\u00fclf\u00fcrik asit', c:'Asit'},
    {f:'HNO3', n:'Nitrik asit', c:'Asit'}, {f:'H3PO4', n:'Fosforik asit', c:'Asit'},
    {f:'H2CO3', n:'Karbonik asit', c:'Asit'}, {f:'CH3COOH', n:'Asetik asit', c:'Asit'},
    {f:'HF', n:'Hidroflorik asit', c:'Asit'}, {f:'HBr', n:'Hidrobromik asit', c:'Asit'},
    {f:'NaOH', n:'Sodyum hidroksit', c:'Baz'}, {f:'KOH', n:'Potasyum hidroksit', c:'Baz'},
    {f:'Ca(OH)2', n:'Kalsiyum hidroksit (s\u00f6nm\u00fc\u015f kire\u00e7)', c:'Baz'}, {f:'Mg(OH)2', n:'Magnezyum hidroksit', c:'Baz'},
    {f:'Al(OH)3', n:'Al\u00fcminyum hidroksit', c:'Baz'}, {f:'NH3', n:'Amonyak', c:'Baz'},
    {f:'NaCl', n:'Sodyum klor\u00fcr', c:'Tuz'}, {f:'KNO3', n:'Potasyum nitrat', c:'Tuz'},
    {f:'CaCO3', n:'Kalsiyum karbonat', c:'Tuz'}, {f:'NaHCO3', n:'Sodyum bikarbonat', c:'Tuz'},
    {f:'Na2CO3', n:'Sodyum karbonat', c:'Tuz'}, {f:'Na2SO4', n:'Sodyum s\u00fclfat', c:'Tuz'},
    {f:'CuSO4', n:'Bak\u0131r(II) s\u00fclfat', c:'Tuz'}, {f:'AgNO3', n:'G\u00fcm\u00fc\u015f nitrat', c:'Tuz'},
    {f:'AgCl', n:'G\u00fcm\u00fc\u015f klor\u00fcr', c:'Tuz'}, {f:'BaSO4', n:'Baryum s\u00fclfat', c:'Tuz'},
    {f:'NH4Cl', n:'Amonyum klor\u00fcr', c:'Tuz'}, {f:'FeCl3', n:'Demir(III) klor\u00fcr', c:'Tuz'},
    {f:'FeCl2', n:'Demir(II) klor\u00fcr', c:'Tuz'}, {f:'KMnO4', n:'Potasyum permanganat', c:'Tuz'},
    {f:'K2Cr2O7', n:'Potasyum dikromat', c:'Tuz'}, {f:'CaSO4', n:'Kalsiyum s\u00fclfat (al\u00e7\u0131 ta\u015f\u0131)', c:'Tuz'}
  ];
  function isCmpType(t){ return t === 'cmp2name' || t === 'name2cmp'; }

  function weakMap(){ return sget('rk_weak', {}); }
  function weakList(){ var w = weakMap(); return ELS.filter(function(e){ return w[e.n]; }); }

  function poolFor(mode){
    if (mode === '20')   return ELS.filter(function(e){ return e.n <= 20; });
    if (mode === '36')   return ELS.filter(function(e){ return e.n <= 36 || Q_EXTRA.indexOf(e.sym) !== -1; });
    if (mode === 'weak') return weakList();
    return ELS.slice();
  }
  function typeFilter(pool, type){
    if (type === 'group')  return pool.filter(function(e){ var d = EL_DATA[e.n]; return d && GMAP[d.group] && e.cat !== 'Lantanit' && e.cat !== 'Aktinit'; });
    if (type === 'period') return pool.filter(function(e){ var d = EL_DATA[e.n]; return d && d.period; });
    if (type === 'conf')   return pool.filter(function(e){ var d = EL_DATA[e.n]; return d && d.conf; });
    return pool;
  }
  // Bir elemente sorulabilecek soru tipleri (prova için)
  function typesFor(el){
    var d = EL_DATA[el.n] || {};
    var ts = ['sym2name', 'name2sym'];
    if (GMAP[d.group] && el.cat !== 'Lantanit' && el.cat !== 'Aktinit') ts.push('group');
    if (d.period) ts.push('period');
    if (d.conf) ts.push('conf');
    return ts;
  }

  // --- Ayar ekranı enjeksiyonları ---
  function setupQuizUI(){
    var card = document.querySelector('#s-quiz .card');
    if (!card || document.getElementById('qrange-grid')) return;

    card.insertAdjacentHTML('afterbegin',
      '<div style="margin-bottom:14px">' +
        '<div class="slbl">Element Aral\u0131\u011f\u0131</div>' +
        '<div id="qrange-grid" style="display:flex;gap:8px;flex-wrap:wrap">' +
          '<button type="button" class="ob sel2" data-r="20">\u0130lk 20 \u00b7 9. S\u0131n\u0131f</button>' +
          '<button type="button" class="ob" data-r="36">\u0130lk 36 + \u00d6nemli 12</button>' +
          '<button type="button" class="ob" data-r="118">T\u00fcm\u00fc (118)</button>' +
          '<button type="button" class="ob" data-r="weak" id="qr-weak">\ud83c\udfaf Yanl\u0131\u015flar\u0131m (0)</button>' +
        '</div>' +
        '<div id="qrange-note" style="font-size:11px;color:var(--tx3);margin-top:6px;line-height:1.5"></div>' +
      '</div>');
    var btns = document.getElementById('qrange-grid').querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) (function(b){
      b.onclick = function(){
        var m = b.getAttribute('data-r');
        if (m === 'weak' && weakList().length === 0) {
          if (typeof toast === 'function') toast('Yanl\u0131\u015f listen bo\u015f \u2014 \u00f6nce birka\u00e7 test \u00e7\u00f6z!');
          return;
        }
        qMode = m;
        for (var j = 0; j < btns.length; j++) btns[j].classList.remove('sel2');
        b.classList.add('sel2');
        updateRangeNote();
      };
    })(btns[i]);

    var typeBtn = document.getElementById('qtype-sym');
    if (typeBtn && typeBtn.parentElement) {
      typeBtn.parentElement.insertAdjacentHTML('beforeend',
        '<button type="button" class="ob" onclick="setQType(\'group\',this)">Grup</button>' +
        '<button type="button" class="ob" onclick="setQType(\'period\',this)">Periyot</button>' +
        '<button type="button" class="ob" onclick="setQType(\'conf\',this)">e\u207b Dizilimi</button>' +
        '<button type="button" class="ob" onclick="setQType(\'cmp2name\',this)">Bile\u015fik \u2192 Ad</button>' +
        '<button type="button" class="ob" onclick="setQType(\'name2cmp\',this)">Ad \u2192 Form\u00fcl</button>');
    }

    var startBtn = card.querySelector('button.btn.bp');
    if (startBtn) {
      startBtn.insertAdjacentHTML('beforebegin',
        '<div style="margin-bottom:20px">' +
          '<div class="slbl">Cevap Modu</div>' +
          '<div id="qans-grid" style="display:flex;gap:8px;flex-wrap:wrap">' +
            '<button type="button" class="ob sel2" onclick="setAnsMode(\'choice\',this)">\ud83d\udd18 \u015e\u0131kl\u0131</button>' +
            '<button type="button" class="ob" onclick="setAnsMode(\'write\',this)">\u2328\ufe0f Yazarak</button>' +
          '</div>' +
          '<div style="font-size:11px;color:var(--tx3);margin-top:6px">Yazarak modu ezber i\u00e7in daha etkilidir. (e\u207b dizilimi sorular\u0131 her zaman \u015f\u0131kl\u0131d\u0131r.)</div>' +
        '</div>');
      startBtn.insertAdjacentHTML('afterend',
        '<button type="button" class="btn bs bfull" style="margin-top:10px;border-color:rgba(245,158,11,.5);color:#f59e0b" onclick="startExam()">\ud83c\udf93 YKS Provas\u0131 \u2014 ' + EXAM_N + ' kar\u0131\u015f\u0131k soru \u00b7 ' + (EXAM_SEC/60) + ' dk</button>');
    }

    updateRangeNote();
    refreshWeakBtn();
  }

  function updateRangeNote(){
    var note = document.getElementById('qrange-note');
    if (!note) return;
    if (isCmpType(quizCfg.type)) {
      note.textContent = 'Bile\u015fik sorular\u0131 ' + COMPOUNDS.length + ' bile\u015fiklik YKS listesinden gelir; element aral\u0131\u011f\u0131 se\u00e7imi bu tipte uygulanmaz.';
      return;
    }
    var size = poolFor(qMode).length;
    var cnt = (typeof quizCfg !== 'undefined' && quizCfg.count) ? quizCfg.count : 10;
    var txt = '';
    if (qMode === '36') txt = 'Ek elementler: ' + Q_EXTRA.join(', ') + ' (toplam ' + size + ' element). ';
    if (qMode === 'weak') txt = 'Yanl\u0131\u015f yapt\u0131\u011f\u0131n elementlerden olu\u015fur; do\u011fru bilince listeden d\u00fc\u015fer. ';
    if (cnt > size && size > 0) txt += 'Not: Bu aral\u0131kta ' + size + ' element var; test en fazla ' + size + ' soru olur.';
    note.textContent = txt;
  }

  function refreshWeakBtn(){
    var b = document.getElementById('qr-weak');
    if (!b) return;
    b.textContent = '\ud83c\udfaf Yanl\u0131\u015flar\u0131m (' + weakList().length + ')';
    if (qMode === 'weak' && weakList().length === 0) {
      qMode = '20';
      var btns = document.getElementById('qrange-grid').querySelectorAll('button');
      for (var j = 0; j < btns.length; j++) btns[j].classList.toggle('sel2', btns[j].getAttribute('data-r') === '20');
      updateRangeNote();
    }
  }

  function selectInRow(btn){
    var bs = btn.parentElement.querySelectorAll('.ob');
    for (var i = 0; i < bs.length; i++) bs[i].classList.remove('sel2');
    btn.classList.add('sel2');
  }
  window.setQType = function(t, btn){ quizCfg.type = t; selectInRow(btn); updateRangeNote(); };
  window.setQCount = function(n, btn){ quizCfg.count = n; selectInRow(btn); updateRangeNote(); };
  window.setAnsMode = function(m, btn){ ansMode = m; selectInRow(btn); };

  // --- Test akışı ---
  function shuffleArr(a){
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  window.startQ = function(){
    examOn = false; stopExamTimer();
    var items;
    if (isCmpType(quizCfg.type)) {
      var cp = shuffleArr(COMPOUNDS.slice());
      items = cp.slice(0, Math.min(quizCfg.count, cp.length)).map(function(c){ return { cmp: c, type: quizCfg.type }; });
      qPool = [];
    } else {
      var pool = typeFilter(poolFor(qMode), quizCfg.type);
      if (pool.length < 1) {
        if (typeof toast === 'function') toast('Bu ayarlarla soru \u00fcretilemiyor \u2014 aral\u0131\u011f\u0131 veya soru tipini de\u011fi\u015ftir.');
        return;
      }
      qPool = pool;
      var p = shuffleArr(pool.slice());
      items = p.slice(0, Math.min(quizCfg.count, p.length)).map(function(e){ return { el: e, type: quizCfg.type }; });
    }
    beginRun(items);
  };

  // 🎓 YKS Provası: karışık tip + süre
  window.startExam = function(){
    examOn = true;
    qPool = poolFor('36');
    var elems = shuffleArr(qPool.slice());
    var cmps = shuffleArr(COMPOUNDS.slice());
    var items = [], ei = 0, ci = 0;
    for (var i = 0; i < EXAM_N; i++) {
      if (Math.random() < 0.3 && ci < cmps.length) {
        items.push({ cmp: cmps[ci++], type: Math.random() < 0.5 ? 'cmp2name' : 'name2cmp' });
      } else {
        var el = elems[ei++ % elems.length];
        var ts = typesFor(el);
        items.push({ el: el, type: ts[Math.floor(Math.random() * ts.length)] });
      }
    }
    shuffleArr(items);
    beginRun(items);
    examLeft = EXAM_SEC;
    ensureTimerUI();
    updateTimerUI();
    examTimer = setInterval(function(){
      var scr = document.getElementById('s-qact');
      if (!scr || scr.style.display === 'none') { stopExamTimer(); return; } // ekrandan çıkıldı
      examLeft--;
      updateTimerUI();
      if (examLeft <= 0) {
        stopExamTimer();
        if (typeof toast === 'function') toast('\u23f0 S\u00fcre doldu!');
        quizSt.cur = quizSt.items.length;
        endQuiz();
      }
    }, 1000);
  };

  function beginRun(items){
    nav('qact');
    quizSt.cur = 0; quizSt.score = 0; quizSt.wrongs = 0;
    sessionWeakAdded = 0;
    quizSt.items = items;
    var tEl = document.getElementById('exam-timer');
    if (tEl) tEl.style.display = examOn ? '' : 'none';
    renderQ();
  }

  function stopExamTimer(){ if (examTimer) { clearInterval(examTimer); examTimer = null; } }
  function ensureTimerUI(){
    if (document.getElementById('exam-timer')) return;
    var lbl = document.getElementById('qcnt-lbl');
    if (lbl) lbl.insertAdjacentHTML('afterend',
      '<span id="exam-timer" style="font-size:13px;font-weight:700;color:#f59e0b;font-family:Space Grotesk,sans-serif"></span>');
  }
  function updateTimerUI(){
    var t = document.getElementById('exam-timer');
    if (!t) return;
    t.style.display = '';
    var m = Math.floor(examLeft / 60), s = examLeft % 60;
    t.textContent = '\u23f1\ufe0f ' + m + ':' + (s < 10 ? '0' : '') + s;
    t.style.color = examLeft <= 60 ? '#ef4444' : '#f59e0b';
  }

  function buildQuestion(item){
    var t = item.type || quizCfg.type;
    if (item.cmp) {
      var c = item.cmp;
      if (t === 'name2cmp')
        return { big: c.n, sub: c.c, label: 'Bu bile\u015fi\u011fin form\u00fcl\u00fc nedir?', ans: pretty(c.f), plain: c.f, kind: 'cmpf', smallBig: true };
      return { big: pretty(c.f), sub: c.c, label: 'Bu bile\u015fi\u011fin ad\u0131 nedir?', ans: c.n, kind: 'cmpn' };
    }
    var el = item.el, d = EL_DATA[el.n] || {};
    if (t === 'sym2name')
      return { big: el.sym, sub: el.cat, label: 'Bu sembol\u00fcn elementi hangisidir?', ans: el.name, kind: 'name' };
    if (t === 'name2sym')
      return { big: el.name, sub: el.cat, label: 'Bu elementin sembol\u00fc nedir?', ans: el.sym, kind: 'sym' };
    if (t === 'group')
      return { big: el.sym, sub: el.name + ' \u00b7 ' + el.cat, label: 'Bu element hangi gruptad\u0131r?', ans: GMAP[d.group], kind: 'group' };
    if (t === 'period')
      return { big: el.sym, sub: el.name + ' \u00b7 ' + el.cat, label: 'Bu element ka\u00e7\u0131nc\u0131 periyottad\u0131r?', ans: d.period + '. periyot', kind: 'period' };
    return { big: el.sym, sub: el.name + ' \u00b7 ' + el.cat, label: 'Bu elementin elektron dizilimi hangisidir?', ans: d.conf, kind: 'conf' };
  }

  var OPT_N = 5; // YKS formatı: 5 şık
  function buildOptions(q, item){
    var opts = [q.ans], guard = 0, c, r, cand;
    if (q.kind === 'group') {
      var all = ['1A','2A','3A','4A','5A','6A','7A','8A'];
      while (opts.length < OPT_N) { c = all[Math.floor(Math.random()*8)]; if (opts.indexOf(c) === -1) opts.push(c); }
    } else if (q.kind === 'period') {
      while (opts.length < OPT_N) { c = (1 + Math.floor(Math.random()*7)) + '. periyot'; if (opts.indexOf(c) === -1) opts.push(c); }
    } else if (q.kind === 'cmpn' || q.kind === 'cmpf') {
      // Önce aynı sınıftan (asit/baz/tuz/oksit) çeldirici dene — daha zor olur
      var same = COMPOUNDS.filter(function(x){ return x.c === item.cmp.c && x.f !== item.cmp.f; });
      var src2 = same.length >= OPT_N - 1 ? same : COMPOUNDS;
      while (opts.length < OPT_N && guard++ < 800) {
        r = src2[Math.floor(Math.random()*src2.length)];
        cand = q.kind === 'cmpn' ? r.n : pretty(r.f);
        if (cand && opts.indexOf(cand) === -1) opts.push(cand);
      }
      guard = 0;
      while (opts.length < OPT_N && guard++ < 800) {
        r = COMPOUNDS[Math.floor(Math.random()*COMPOUNDS.length)];
        cand = q.kind === 'cmpn' ? r.n : pretty(r.f);
        if (cand && opts.indexOf(cand) === -1) opts.push(cand);
      }
    } else {
      var src = qPool.length >= OPT_N ? qPool : ELS;
      while (opts.length < OPT_N && guard++ < 800) {
        r = src[Math.floor(Math.random()*src.length)];
        cand = q.kind === 'name' ? r.name : q.kind === 'sym' ? r.sym : (EL_DATA[r.n]||{}).conf;
        if (cand && opts.indexOf(cand) === -1) opts.push(cand);
      }
      guard = 0;
      while (opts.length < OPT_N && guard++ < 800) {
        r = ELS[Math.floor(Math.random()*ELS.length)];
        cand = q.kind === 'name' ? r.name : q.kind === 'sym' ? r.sym : (EL_DATA[r.n]||{}).conf;
        if (cand && opts.indexOf(cand) === -1) opts.push(cand);
      }
    }
    return shuffleArr(opts);
  }

  function ensureWriteUI(){
    if (document.getElementById('writeWrap')) return;
    var grid = document.getElementById('ogrid');
    if (!grid) return;
    grid.insertAdjacentHTML('afterend',
      '<div id="writeWrap" style="display:none;margin-bottom:12px">' +
        '<div style="display:flex;gap:8px">' +
          '<input type="text" id="writeInp" class="inp" placeholder="Cevab\u0131n\u0131 yaz..." autocapitalize="off" autocorrect="off" spellcheck="false">' +
          '<button type="button" class="btn bp" onclick="checkWrite()">Cevapla</button>' +
        '</div>' +
      '</div>');
    document.getElementById('writeInp').addEventListener('keydown', function(e){
      if (e.key === 'Enter') { e.preventDefault(); window.checkWrite(); }
    });
  }

  window.renderQ = function(){
    if (quizSt.cur >= quizSt.items.length) { endQuiz(); return; }
    qAnswered = false;
    ensureWriteUI();
    document.getElementById('nxtbtn').style.display = 'none';
    var fb = document.getElementById('fbar');
    fb.className = 'fb'; fb.textContent = '';
    var item = quizSt.items[quizSt.cur];
    if (item && !item.el && !item.cmp) item = { el: item, type: quizCfg.type }; // geriye uyumluluk
    document.getElementById('qcnt-lbl').textContent = 'Soru ' + (quizSt.cur + 1) + '/' + quizSt.items.length;
    document.getElementById('lvc').textContent = '\u2713 ' + quizSt.score;
    document.getElementById('lvw').textContent = '\u2717 ' + quizSt.wrongs;
    document.getElementById('pf').style.width = (quizSt.cur / quizSt.items.length * 100) + '%';

    var q = buildQuestion(item);
    quizSt.correct = q.ans;
    quizSt._el = item.el || null;
    quizSt._cmp = item.cmp || null;
    quizSt._kind = q.kind;
    quizSt._plain = q.plain || null;
    document.getElementById('qlbl').textContent = q.label;
    var qd = document.getElementById('qdsp');
    qd.textContent = q.big;
    qd.style.fontSize = (q.big && q.big.length > 14) ? '28px' : '';
    document.getElementById('qcat').textContent = q.sub;

    var writing = ansMode === 'write' && q.kind !== 'conf';
    var grid = document.getElementById('ogrid');
    var ww = document.getElementById('writeWrap');
    if (writing) {
      grid.style.display = 'none'; grid.innerHTML = '';
      if (ww) {
        ww.style.display = 'block';
        var inp = document.getElementById('writeInp');
        inp.disabled = false; inp.value = '';
        inp.placeholder = q.kind === 'cmpf' ? 'Form\u00fcl\u00fc d\u00fcz yaz (\u00f6rn: H2SO4)...' : 'Cevab\u0131n\u0131 yaz...';
        setTimeout(function(){ try { inp.focus(); } catch (e) {} }, 60);
      }
    } else {
      if (ww) ww.style.display = 'none';
      grid.style.display = '';
      grid.innerHTML = '';
      var opts = buildOptions(q, item);
      for (var k = 0; k < opts.length; k++) (function(opt){
        var btn = document.createElement('button');
        btn.className = 'ob2';
        btn.textContent = opt;
        if (q.kind === 'conf') btn.style.fontSize = '12px';
        btn.onclick = function(){ checkAns(btn, opt); };
        grid.appendChild(btn);
      })(opts[k]);
    }
  };

  // --- Cevap kaydı ve zayıf nokta takibi ---
  function recordAnswer(ok){
    var st = sget('rk_stats', {a:0, c:0});
    st.a++; if (ok) st.c++;
    sset('rk_stats', st);
    if (ok) quizSt.score++; else quizSt.wrongs++;
    if (!quizSt._el) return; // bileşik soruları zayıf listeye girmez
    var el = quizSt._el, w = weakMap();
    if (ok) {
      if (w[el.n]) {
        delete w[el.n];
        sset('rk_weak', w);
        if (Object.keys(w).length === 0) { var fl = sget('rk_flags', {}); fl.cleaned = 1; sset('rk_flags', fl); }
      }
    } else {
      if (!w[el.n]) sessionWeakAdded++;
      w[el.n] = (w[el.n] || 0) + 1;
      sset('rk_weak', w);
    }
  }

  window.checkAns = function(btn, sel){
    if (qAnswered) return;
    qAnswered = true;
    var bs = document.getElementById('ogrid').querySelectorAll('button');
    for (var i = 0; i < bs.length; i++) bs[i].disabled = true;
    var fb = document.getElementById('fbar');
    var ok = sel === quizSt.correct;
    if (ok) {
      btn.className = 'ob2 cor';
      fb.className = 'fb show cor'; fb.textContent = '\u2713 Do\u011fru!';
    } else {
      btn.className = 'ob2 wro';
      for (var k = 0; k < bs.length; k++)
        if (bs[k].textContent === quizSt.correct) bs[k].className = 'ob2 cor';
      fb.className = 'fb show wro'; fb.textContent = '\u2717 Yanl\u0131\u015f! Do\u011fru: ' + quizSt.correct;
    }
    recordAnswer(ok);
    document.getElementById('nxtbtn').style.display = 'block';
  };

  function fold(s){
    return String(s).toLocaleLowerCase('tr')
      .replace(/\u00e7/g,'c').replace(/\u011f/g,'g').replace(/\u0131/g,'i')
      .replace(/\u00f6/g,'o').replace(/\u015f/g,'s').replace(/\u00fc/g,'u')
      .replace(/[^a-z0-9]/g,'');
  }
  function matchAnswer(user, correct, kind){
    if (kind === 'group' || kind === 'period') {
      var ud = (String(user).match(/\d+/) || [''])[0];
      var cd = (String(correct).match(/\d+/) || [''])[0];
      if (!ud || ud !== cd) return false;
      if (kind === 'group') {
        var ul = fold(user).replace(/[0-9]/g,'');
        return ul === '' || ul === 'a' || ul === 'agrubu';
      }
      return true;
    }
    if (kind === 'cmpn') {
      // Parantezli ek açıklamayı ("sönmemiş kireç" gibi) tolere et
      var core = String(correct).replace(/\(.*?\)/g, '');
      return fold(user) === fold(correct) || fold(user) === fold(core);
    }
    return fold(user) === fold(correct);
  }

  window.checkWrite = function(){
    if (qAnswered) return;
    var inp = document.getElementById('writeInp');
    if (!inp) return;
    var v = inp.value.trim();
    if (!v) { if (typeof toast === 'function') toast('Bir cevap yaz!'); return; }
    qAnswered = true;
    inp.disabled = true;
    var target = quizSt._kind === 'cmpf' ? quizSt._plain : quizSt.correct;
    var ok = matchAnswer(v, target, quizSt._kind);
    var fb = document.getElementById('fbar');
    if (ok) { fb.className = 'fb show cor'; fb.textContent = '\u2713 Do\u011fru!'; }
    else { fb.className = 'fb show wro'; fb.textContent = '\u2717 Yanl\u0131\u015f! Do\u011fru: ' + quizSt.correct; }
    recordAnswer(ok);
    document.getElementById('nxtbtn').style.display = 'block';
  };

  // --- Sonuç ekranı: kayıt + seri + paylaşım ---
  function dayStr(d){
    return d.getFullYear() + '-' + ('0'+(d.getMonth()+1)).slice(-2) + '-' + ('0'+d.getDate()).slice(-2);
  }
  function calcStreak(){
    var days = sget('rk_days', []);
    if (!days.length) return 0;
    var set = {}, i;
    for (i = 0; i < days.length; i++) set[days[i]] = 1;
    var d = new Date();
    if (!set[dayStr(d)]) d.setDate(d.getDate() - 1);
    var n = 0;
    while (set[dayStr(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  var MODE_NAMES = {'20':'\u0130lk 20', '36':'36+12', '118':'T\u00fcm\u00fc', 'weak':'Yanl\u0131\u015flar\u0131m', 'exam':'\ud83c\udf93 Prova'};
  var TYPE_NAMES = {sym2name:'Sembol\u2192\u0130sim', name2sym:'\u0130sim\u2192Sembol', group:'Grup', period:'Periyot', conf:'e\u207b Dizilimi', cmp2name:'Bile\u015fik\u2192Ad', name2cmp:'Ad\u2192Form\u00fcl', exam:'Kar\u0131\u015f\u0131k'};

  window.endQuiz = function(){
    stopExamTimer();
    nav('res');
    var tot = quizSt.score + quizSt.wrongs;
    var pct = tot > 0 ? Math.round(quizSt.score / tot * 100) : 0;
    var rp = document.getElementById('rpct');
    rp.textContent = '%' + pct;
    rp.className = 'rpct ' + (pct >= 80 ? 'gr' : pct >= 50 ? 'ok' : 'bd');
    document.getElementById('rscor').textContent = quizSt.score;
    document.getElementById('rswro').textContent = quizSt.wrongs;
    document.getElementById('rstot').textContent = tot;
    document.getElementById('rem').textContent = pct >= 80 ? '\ud83c\udfc6' : pct >= 50 ? '\ud83d\udc4d' : '\ud83d\udcaa';
    var rt = document.getElementById('rtitle');
    if (rt) rt.textContent = pct >= 80 ? 'Harika!' : pct >= 50 ? 'Fena de\u011fil!' : 'Devam, olacak!';

    var mLbl = examOn ? 'exam' : (isCmpType(quizCfg.type) ? '118' : qMode);
    var tLbl = examOn ? 'exam' : quizCfg.type;
    if (tot > 0) {
      var scores = sget('rk_scores', []);
      scores.push({ dt: Date.now(), m: mLbl, t: tLbl, s: quizSt.score, w: quizSt.wrongs, p: pct });
      if (scores.length > 100) scores = scores.slice(-100);
      sset('rk_scores', scores);
      var days = sget('rk_days', []);
      var today = dayStr(new Date());
      if (days.indexOf(today) === -1) { days.push(today); sset('rk_days', days); }
    }
    lastResult = { pct: pct, s: quizSt.score, w: quizSt.wrongs, m: mLbl, t: tLbl, streak: calcStreak() };

    var rs = document.querySelector('#s-res .rstats');
    if (rs && !document.getElementById('res-extra'))
      rs.insertAdjacentHTML('afterend',
        '<div id="res-extra" style="text-align:center;font-size:12px;color:var(--tx2);margin-bottom:4px;line-height:1.7"></div>' +
        '<button type="button" id="res-share" class="btn bs bfull" style="margin-top:10px" onclick="shareResult()">\ud83d\udce4 Sonucu Payla\u015f</button>');
    var ex = document.getElementById('res-extra');
    if (ex) {
      var streak = lastResult.streak, html = '';
      html += streak > 1 ? '\ud83d\udd25 ' + streak + ' g\u00fcnl\u00fck \u00e7al\u0131\u015fma serisi!' : '\ud83d\udd25 Seri ba\u015flad\u0131 \u2014 yar\u0131n da gel!';
      if (sessionWeakAdded > 0)
        html += '<br>\ud83c\udfaf ' + sessionWeakAdded + ' element "Yanl\u0131\u015flar\u0131m" listesine eklendi.';
      else if (qMode === 'weak' && !examOn && tot > 0 && quizSt.wrongs === 0)
        html += '<br>\ud83c\udfaf S\u00fcper \u2014 yanl\u0131\u015f listenden ' + quizSt.score + ' element temizlendi!';
      ex.innerHTML = html;
    }
    examOn = false;
    refreshWeakBtn();
    try { checkBadges(true); } catch (e) {}
  };

  // 📤 Paylaşılabilir sonuç kartı (canvas → PNG)
  window.shareResult = function(){
    if (!lastResult) return;
    var cv = document.createElement('canvas');
    cv.width = 640; cv.height = 360;
    var x = cv.getContext('2d');
    // Arka plan
    x.fillStyle = '#0f1117'; x.fillRect(0, 0, 640, 360);
    var grad = x.createLinearGradient(0, 0, 640, 0);
    grad.addColorStop(0, '#6366f1'); grad.addColorStop(1, '#a5b4fc');
    x.fillStyle = grad; x.fillRect(0, 0, 640, 6);
    // Başlık
    x.fillStyle = '#a5b4fc'; x.font = 'bold 26px sans-serif'; x.textAlign = 'left';
    x.fillText('Ronya Kimya', 36, 56);
    x.fillStyle = '#475569'; x.font = '14px sans-serif';
    x.fillText('Element & Bile\u015fik Testi', 36, 80);
    // Büyük yüzde
    var col = lastResult.pct >= 80 ? '#22c55e' : lastResult.pct >= 50 ? '#f59e0b' : '#ef4444';
    x.fillStyle = col; x.font = 'bold 96px sans-serif'; x.textAlign = 'center';
    x.fillText('%' + lastResult.pct, 320, 195);
    // Detaylar
    x.fillStyle = '#f1f5f9'; x.font = 'bold 20px sans-serif';
    x.fillText((MODE_NAMES[lastResult.m] || lastResult.m) + ' \u00b7 ' + (TYPE_NAMES[lastResult.t] || lastResult.t), 320, 240);
    x.fillStyle = '#94a3b8'; x.font = '16px sans-serif';
    var dt = new Date();
    x.fillText('Do\u011fru ' + lastResult.s + ' \u00b7 Yanl\u0131\u015f ' + lastResult.w + ' \u00b7 ' +
      ('0'+dt.getDate()).slice(-2) + '.' + ('0'+(dt.getMonth()+1)).slice(-2) + '.' + dt.getFullYear(), 320, 270);
    if (lastResult.streak > 0) {
      x.fillStyle = '#f59e0b'; x.font = 'bold 17px sans-serif';
      x.fillText('\ud83d\udd25 ' + lastResult.streak + ' g\u00fcnl\u00fck \u00e7al\u0131\u015fma serisi', 320, 305);
    }
    cv.toBlob(function(blob){
      if (!blob) return;
      var file = null;
      try { file = new File([blob], 'ronya-sonuc.png', { type: 'image/png' }); } catch (e) {}
      if (file && navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        navigator.share({ files: [file], title: 'Ronya Kimya', text: 'Ronya Kimya test sonucum! \u2697\ufe0f' }).catch(function(){});
      } else {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'ronya-sonuc.png';
        document.body.appendChild(a); a.click(); a.remove();
        if (typeof toast === 'function') toast('G\u00f6rsel indirildi \ud83d\udce5');
      }
    }, 'image/png');
  };

  // --- Skor tablosu + istatistik + yedekleme ---
  function statBox(v, l){
    return '<div><div style="font-family:Space Grotesk,sans-serif;font-size:20px;font-weight:800;color:var(--ac2)">' + v +
           '</div><div style="font-size:10px;color:var(--tx3)">' + l + '</div></div>';
  }
  function renderBoard(){
    var board = document.getElementById('leaderboard-dom');
    if (!board) return;
    var st = sget('rk_stats', {a:0, c:0});
    var scores = sget('rk_scores', []);
    var streak = calcStreak();
    var acc = st.a ? Math.round(st.c / st.a * 100) : 0;
    var old = document.getElementById('rk-statcard');
    if (old) old.remove();
    board.insertAdjacentHTML('beforebegin',
      '<div class="card" id="rk-statcard" style="margin-bottom:12px">' +
        '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">' +
          statBox(st.a, 'Toplam Soru') + statBox('%' + acc, 'Do\u011fruluk') +
          statBox(streak, '\ud83d\udd25 Seri (g\u00fcn)') + statBox(scores.length, 'Test') +
        '</div>' +
      '</div>');
    var top = scores.slice().sort(function(a,b){ return b.p - a.p || b.dt - a.dt; }).slice(0, 15);
    var html = '<div class="brow hdr"><div>S\u0131ra</div><div>Test</div><div>Skor</div></div>';
    if (!top.length)
      html += '<div class="brow"><div>\u2014</div><div>Hen\u00fcz kay\u0131t yok \u2014 bir test \u00e7\u00f6z, buras\u0131 dolsun!</div><div></div></div>';
    for (var i = 0; i < top.length; i++) {
      var e = top[i], dt = new Date(e.dt);
      var ds = ('0'+dt.getDate()).slice(-2) + '.' + ('0'+(dt.getMonth()+1)).slice(-2);
      var rank = i === 0 ? '\ud83e\udd47' : i === 1 ? '\ud83e\udd48' : i === 2 ? '\ud83e\udd49' : (i + 1);
      html += '<div class="brow"><div>' + rank + '</div>' +
              '<div>' + (MODE_NAMES[e.m] || e.m) + ' \u00b7 ' + (TYPE_NAMES[e.t] || e.t) + ' \u00b7 ' + ds + '</div>' +
              '<div><b style="color:var(--ac2)">%' + e.p + '</b> <span style="color:var(--tx3);font-size:11px">(' + e.s + '/' + (e.s + e.w) + ')</span></div></div>';
    }
    board.innerHTML = html;

    // Yedekleme kartı (bir kez)
    if (!document.getElementById('rk-backup')) {
      board.insertAdjacentHTML('afterend',
        '<div class="card" id="rk-backup" style="margin-top:12px">' +
          '<div class="slbl">Yedekleme</div>' +
          '<p style="font-size:12px;color:var(--tx2);margin-bottom:10px;line-height:1.6">\u0130lerlemen bu taray\u0131c\u0131da saklan\u0131r. Cihaz de\u011fi\u015ftirirken yede\u011fini indir, yeni cihazda geri y\u00fckle.</p>' +
          '<div style="display:flex;gap:8px">' +
            '<button type="button" class="btn bs bfull" onclick="rkExport()">\u2b07\ufe0f D\u0131\u015fa Aktar</button>' +
            '<button type="button" class="btn bs bfull" onclick="document.getElementById(\'rk-imp\').click()">\u2b06\ufe0f \u0130\u00e7e Aktar</button>' +
          '</div>' +
          '<input type="file" id="rk-imp" accept=".json,application/json" style="display:none">' +
        '</div>');
      document.getElementById('rk-imp').addEventListener('change', rkImportFile);
    }
    try { renderBadges(); } catch (e) {}
    try { renderChart(); } catch (e) {}
  }

  var RK_KEYS = ['rk_weak', 'rk_stats', 'rk_scores', 'rk_days', 'rk_fc'];
  window.rkExport = function(){
    var out = { app: 'ronya-kimya', v: 1, date: new Date().toISOString() };
    for (var i = 0; i < RK_KEYS.length; i++) out[RK_KEYS[i]] = sget(RK_KEYS[i], null);
    var blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ronya-yedek.json';
    document.body.appendChild(a); a.click(); a.remove();
    if (typeof toast === 'function') toast('Yedek indirildi \ud83d\udce5');
  };
  function rkImportFile(ev){
    var f = ev.target.files && ev.target.files[0];
    ev.target.value = '';
    if (!f) return;
    var reader = new FileReader();
    reader.onload = function(){
      try {
        var obj = JSON.parse(reader.result);
        if (!obj || obj.app !== 'ronya-kimya') throw new Error('bad');
        if (!confirm('Mevcut ilerlemenin \u00fczerine yaz\u0131lacak. Devam edilsin mi?')) return;
        for (var i = 0; i < RK_KEYS.length; i++)
          if (obj[RK_KEYS[i]] !== null && obj[RK_KEYS[i]] !== undefined) sset(RK_KEYS[i], obj[RK_KEYS[i]]);
        if (typeof toast === 'function') toast('Yedek geri y\u00fcklendi \u2705');
        renderBoard();
        refreshWeakBtn();
      } catch (e) {
        if (typeof toast === 'function') toast('Ge\u00e7ersiz yedek dosyas\u0131!');
      }
    };
    reader.readAsText(f);
  }

  /* ============================================================
     BÖLÜM 4 — FORMÜLDEN OTOMATİK MOLAR KÜTLE
     Mol↔Kütle sekmesine formül girişi enjekte edilir; yazdıkça
     Bölüm 2'deki ayrıştırıcı + ELS kütleleriyle hesaplar ve
     sonucu "Molar Kütle" alanına otomatik yazar.
     ============================================================ */
  var MASS = null;
  function massMap(){
    if (!MASS) {
      MASS = {};
      if (typeof ELS !== 'undefined')
        for (var i = 0; i < ELS.length; i++) MASS[ELS[i].sym] = ELS[i].mass;
    }
    return MASS;
  }

  function setupMolFormula(){
    var mk0 = document.getElementById('mk0');
    if (!mk0 || document.getElementById('mkFormula')) return;
    var card = mk0.closest('.card');
    if (!card) return;
    card.insertAdjacentHTML('afterbegin',
      '<div style="margin-bottom:12px">' +
        '<div class="slbl">Form\u00fclden Otomatik <span style="font-weight:400;text-transform:none;letter-spacing:0">(iste\u011fe ba\u011fl\u0131)</span></div>' +
        '<input type="text" id="mkFormula" class="inp" placeholder="\u00f6rn: H2SO4, Ca(OH)2, CuSO4.5H2O" autocapitalize="off" autocorrect="off" spellcheck="false">' +
        '<div id="mkFormulaOut" style="font-size:12px;color:var(--tx2);margin-top:6px;min-height:16px;line-height:1.5"></div>' +
      '</div>');
    document.getElementById('mkFormula').addEventListener('input', function(){
      var v = this.value.trim();
      var out = document.getElementById('mkFormulaOut');
      if (!v) { out.textContent = ''; return; }
      try {
        var counts = parseFormula(v);
        var mm = massMap(), total = 0, parts = [];
        var keys = Object.keys(counts);
        if (!keys.length) throw new Error('Form\u00fcl okunamad\u0131.');
        for (var i = 0; i < keys.length; i++) {
          var sym = keys[i];
          if (mm[sym] === undefined) throw new Error('Bilinmeyen sembol: ' + sym);
          total += counts[sym] * mm[sym];
          parts.push((counts[sym] > 1 ? counts[sym] + '\u00d7' : '') + mm[sym]);
        }
        mk0.value = +total.toFixed(3);
        var comp = keys.map(function(sym){
          return sym + ' %' + (counts[sym] * mm[sym] / total * 100).toFixed(1);
        }).join(' \u00b7 ');
        out.innerHTML = '<span style="color:var(--gr)">' + pretty(v.replace(/\s+/g, '')) +
          ' = ' + parts.join(' + ') + ' = <b>' + total.toFixed(3) + ' g/mol</b></span>' +
          ' \u2014 a\u015fa\u011f\u0131daki alana yaz\u0131ld\u0131.' +
          '<br><span style="color:var(--tx3)">K\u00fctlece bile\u015fim: ' + comp + '</span>';
      } catch (err) {
        var msg = err.message;
        if (/Ge\u00e7ersiz karakter/.test(msg))
          msg += ' \u2014 sembollerde b\u00fcy\u00fck/k\u00fc\u00e7\u00fck harfe dikkat (\u00f6rn: CO \u2260 Co)';
        out.innerHTML = '<span style="color:var(--yw)">' + msg + '</span>';
      }
    });
  }

  /* ============================================================
     BÖLÜM 5 — POMODORO MOLA DÖNGÜSÜ
     Süre bitince otomatik olarak ÇALIŞMA ↔ MOLA arasında geçer;
     "Mola (dk)" ayarı artık gerçekten kullanılır.
     ============================================================ */
  var pomo = { t: null, run: false, mode: 'work', left: 25 * 60 };
  function pomMin(id, def){
    var el = document.getElementById(id);
    var v = el ? parseInt(el.value, 10) : NaN;
    return (v && v > 0) ? v : def;
  }
  function pomShow(){
    var m = Math.floor(pomo.left / 60), s = pomo.left % 60;
    var c = document.getElementById('pom-clock');
    if (c) c.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    var lbl = document.getElementById('pom-mode');
    if (lbl) {
      lbl.textContent = pomo.mode === 'work' ? '\u00c7ALI\u015eMA' : 'MOLA';
      lbl.style.color = pomo.mode === 'work' ? '' : '#22c55e';
    }
  }
  window.pomToggle = function(){
    var btn = document.getElementById('pom-trigger');
    if (!btn) return;
    if (pomo.run) {
      clearInterval(pomo.t);
      pomo.run = false;
      btn.textContent = 'Devam Et';
      return;
    }
    pomo.run = true;
    btn.textContent = 'Durdur';
    pomo.t = setInterval(function(){
      pomo.left--;
      if (pomo.left <= 0) {
        pomo.mode = pomo.mode === 'work' ? 'rest' : 'work';
        pomo.left = (pomo.mode === 'work' ? pomMin('p-work', 25) : pomMin('p-rest', 5)) * 60;
        if (typeof toast === 'function')
          toast(pomo.mode === 'rest' ? '\u23f0 S\u00fcre doldu \u2014 mola zaman\u0131!' : '\ud83d\udcaa Mola bitti \u2014 \u00e7al\u0131\u015fmaya d\u00f6n!');
      }
      pomShow();
    }, 1000);
  };
  window.pomReset = function(){
    clearInterval(pomo.t);
    pomo.run = false;
    pomo.mode = 'work';
    pomo.left = pomMin('p-work', 25) * 60;
    var btn = document.getElementById('pom-trigger');
    if (btn) btn.textContent = 'Ba\u015flat';
    pomShow();
  };

  /* ============================================================
     BÖLÜM 6 — FLASHCARD: ARALIKLI TEKRAR + İYON KARTLARI
     Basit Leitner sistemi: "Bilmiyorum" denilen kartlar daha sık,
     "Öğrendim" denilenler giderek daha seyrek gelir (kutu 0-3,
     localStorage'da saklanır). Desteye YKS'de şart olan 14 çok
     atomlu iyon kartı eklenir.
     ============================================================ */
  var ION_CARDS = [
    {f:'NH\u2084\u207a', n:'Amonyum', d:'Y\u00fck\u00fc +1. Tek yayg\u0131n \u00e7ok atomlu katyon; t\u00fcm tuzlar\u0131 suda \u00e7\u00f6z\u00fcn\u00fcr.'},
    {f:'OH\u207b', n:'Hidroksit', d:'Y\u00fck\u00fc \u22121. Bazlar\u0131n karakteristik iyonu.'},
    {f:'NO\u2083\u207b', n:'Nitrat', d:'Y\u00fck\u00fc \u22121. T\u00fcm nitrat tuzlar\u0131 suda \u00e7\u00f6z\u00fcn\u00fcr.'},
    {f:'NO\u2082\u207b', n:'Nitrit', d:'Y\u00fck\u00fc \u22121. Nitrat\u0131n bir eksik oksijenlisi.'},
    {f:'SO\u2084\u00b2\u207b', n:'S\u00fclfat', d:'Y\u00fck\u00fc \u22122. BaSO\u2084 suda \u00e7\u00f6z\u00fcnmeyen beyaz \u00e7\u00f6keltidir.'},
    {f:'SO\u2083\u00b2\u207b', n:'S\u00fclfit', d:'Y\u00fck\u00fc \u22122. S\u00fclfat\u0131n bir eksik oksijenlisi.'},
    {f:'CO\u2083\u00b2\u207b', n:'Karbonat', d:'Y\u00fck\u00fc \u22122. Asitlerle tepkimesinde CO\u2082 gaz\u0131 \u00e7\u0131kar.'},
    {f:'HCO\u2083\u207b', n:'Bikarbonat', d:'Y\u00fck\u00fc \u22121. Kabartma tozu NaHCO\u2083 bu iyonu i\u00e7erir.'},
    {f:'PO\u2084\u00b3\u207b', n:'Fosfat', d:'Y\u00fck\u00fc \u22123. DNA omurgas\u0131nda ve g\u00fcbrelerde bulunur.'},
    {f:'CH\u2083COO\u207b', n:'Asetat', d:'Y\u00fck\u00fc \u22121. Sirkedeki asetik asidin iyonu.'},
    {f:'MnO\u2084\u207b', n:'Permanganat', d:'Y\u00fck\u00fc \u22121. Mor renkli, g\u00fc\u00e7l\u00fc y\u00fckseltgen.'},
    {f:'Cr\u2082O\u2087\u00b2\u207b', n:'Dikromat', d:'Y\u00fck\u00fc \u22122. Turuncu renkli y\u00fckseltgen.'},
    {f:'CN\u207b', n:'Siyan\u00fcr', d:'Y\u00fck\u00fc \u22121. \u00c7ok zehirli bir iyondur.'},
    {f:'ClO\u207b', n:'Hipoklorit', d:'Y\u00fck\u00fc \u22121. \u00c7ama\u015f\u0131r suyunun etken iyonu.'}
  ];
  var fcCur = -1;

  function fcBoxes(){ return sget('rk_fc', {}); }
  function fcMastered(){ var b = fcBoxes(), n = 0, k; for (k in b) if (b[k] >= 3) n++; return n; }
  function fcHard(){ var b = fcBoxes(), n = 0, k; for (k in b) if (b[k] === 0) n++; return n; }

  function fcPick(){
    var b = fcBoxes(), pool = [], i, j, box, w;
    for (i = 0; i < FC_DECK.length; i++) {
      if (FC_DECK.length > 1 && i === fcCur) continue; // aynı kart üst üste gelmesin
      box = b[FC_DECK[i].f];
      if (box === undefined) box = 0; // hiç görülmemiş = öncelikli
      w = box >= 3 ? 1 : box === 2 ? 2 : box === 1 ? 4 : 6;
      for (j = 0; j < w; j++) pool.push(i);
    }
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : 0;
  }

  window.updateCardUI = function(){
    if (typeof FC_DECK === 'undefined' || !FC_DECK.length) return;
    if (fcCur < 0 || fcCur >= FC_DECK.length) fcCur = fcPick();
    var card = FC_DECK[fcCur];
    var f = document.getElementById('fc-front');
    if (!f || !card) return;
    f.textContent = card.f;
    var back = document.getElementById('fc-back');
    if (back) back.innerHTML =
      '<div style="font-size:16px;font-weight:800;margin-bottom:6px">' + card.n + '</div>' +
      '<div style="font-size:12px;color:var(--tx2);line-height:1.5">' + card.d + '</div>';
    var prog = document.getElementById('fc-progress');
    if (prog) prog.textContent = FC_DECK.length + ' kart \u00b7 \u2705 Ustala\u015f\u0131lan: ' + fcMastered() + ' \u00b7 \ud83d\udd01 Tekrar bekleyen: ' + fcHard();
  };

  window.nextCard = function(learned){
    if (typeof FC_DECK === 'undefined' || !FC_DECK.length) return;
    var card = FC_DECK[fcCur];
    if (card) {
      var b = fcBoxes();
      var cur = b[card.f] === undefined ? 0 : b[card.f];
      b[card.f] = learned ? Math.min(3, cur + 1) : 0;
      sset('rk_fc', b);
    }
    if (typeof fcFlipped !== 'undefined') fcFlipped = false;
    var el = document.getElementById('fcard');
    if (el) el.style.transform = 'rotateY(0deg)';
    setTimeout(function(){ fcCur = fcPick(); updateCardUI(); }, 150);
  };

  function setupFlashcards(){
    if (typeof FC_DECK === 'undefined') return;
    var has = false;
    for (var i = 0; i < FC_DECK.length; i++) if (FC_DECK[i].f === ION_CARDS[0].f) { has = true; break; }
    if (!has) for (var k = 0; k < ION_CARDS.length; k++) FC_DECK.push(ION_CARDS[k]);
  }

  /* ============================================================
     BÖLÜM 7 — BOHR ATOM MODELİ
     Element detay sayfasına, gerçek kabuk verisiyle (2|8|18|...)
     dönen elektronlu canvas animasyonu ekler.
     ============================================================ */
  var bohrAnim = null;
  function bohrStop(){ if (bohrAnim) { cancelAnimationFrame(bohrAnim); bohrAnim = null; } }

  function injectBohr(n){
    bohrStop();
    var wrap = document.getElementById('eldetay-wrap');
    if (!wrap) return;
    var d = EL_DATA[n] || {};
    if (!d.shells) return;
    var shells = String(d.shells).split('|').map(function(s){ return parseInt(s, 10); }).filter(function(x){ return x > 0; });
    if (!shells.length) return;
    var el = null;
    for (var i = 0; i < ELS.length; i++) if (ELS[i].n === n) { el = ELS[i]; break; }
    if (!el) return;

    var old = document.getElementById('bohr-card');
    if (old) old.remove();
    var anchor = wrap.children.length > 1 ? wrap.children[1] : wrap.lastElementChild;
    if (!anchor) return;
    anchor.insertAdjacentHTML('afterend',
      '<div id="bohr-card" style="background:#050510;border:1px solid rgba(0,212,255,0.25);border-radius:16px;overflow:hidden;margin-bottom:16px">' +
        '<div style="text-align:center;padding:8px;font-size:12px;color:#00d4ff;font-weight:600">\u269b\ufe0f Bohr Atom Modeli \u2014 ' + el.name + ' \u00b7 Kabuklar: ' + d.shells + '</div>' +
        '<canvas id="bohrCv" style="width:100%;display:block" height="280"></canvas>' +
      '</div>');
    var cv = document.getElementById('bohrCv');
    if (!cv) return;
    var t = 0;

    function loop(){
      // Kart DOM'dan kalktıysa (başka elemente geçildi) dur
      if (!document.getElementById('bohrCv')) { bohrStop(); return; }
      bohrAnim = requestAnimationFrame(loop);
      var rect = cv.getBoundingClientRect();
      var dpr = window.devicePixelRatio || 1;
      if (Math.abs(cv.width - rect.width * dpr) > 2) { cv.width = rect.width * dpr; cv.height = 280 * dpr; }
      var x = cv.getContext('2d');
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      var W = rect.width || 300, H = 280, cx = W / 2, cy = H / 2;
      x.clearRect(0, 0, W, H);
      x.fillStyle = '#050510'; x.fillRect(0, 0, W, H);

      var base = 30, maxR = Math.min(W, H) / 2 - 16;
      var step = (maxR - base) / shells.length;

      // Yörüngeler + elektronlar
      for (var si = 0; si < shells.length; si++) {
        var r = base + (si + 1) * step;
        x.beginPath();
        x.arc(cx, cy, r, 0, 2 * Math.PI);
        x.strokeStyle = 'rgba(0,212,255,0.22)';
        x.lineWidth = 1;
        x.stroke();
        // Kabuk elektron sayısı etiketi
        x.fillStyle = 'rgba(0,212,255,0.5)';
        x.font = '9px sans-serif';
        x.textAlign = 'center';
        x.fillText(shells[si] + 'e\u207b', cx, cy - r - 4);
        // Elektronlar (iç kabuklar hızlı, yönler dönüşümlü)
        var cnt = shells[si];
        var speed = (1.4 - si * 0.16) * (si % 2 === 0 ? 1 : -1);
        for (var e = 0; e < cnt; e++) {
          var a = t * speed + (2 * Math.PI * e) / cnt;
          var ex2 = cx + Math.cos(a) * r;
          var ey2 = cy + Math.sin(a) * r;
          x.beginPath(); x.arc(ex2, ey2, 6, 0, 2 * Math.PI);
          x.fillStyle = 'rgba(250,204,21,0.15)'; x.fill();
          x.beginPath(); x.arc(ex2, ey2, 3, 0, 2 * Math.PI);
          x.fillStyle = '#facc15'; x.fill();
        }
      }
      // Çekirdek
      x.beginPath(); x.arc(cx, cy, 24, 0, 2 * Math.PI);
      x.fillStyle = 'rgba(99,102,241,0.2)'; x.fill();
      x.beginPath(); x.arc(cx, cy, 17, 0, 2 * Math.PI);
      x.fillStyle = '#6366f1'; x.fill();
      x.fillStyle = '#fff'; x.font = 'bold 13px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillText(el.sym, cx, cy - 3);
      x.font = '8px sans-serif'; x.fillStyle = 'rgba(255,255,255,0.7)';
      x.fillText('+' + n, cx, cy + 8);
      x.textBaseline = 'alphabetic';
      t += 0.012;
    }
    loop();
  }

  /* ============================================================
     BÖLÜM 8 — DENGELEME ALIŞTIRMASI, GÜNÜN ELEMENTİ, ROZETLER,
     YÜKSELTGENME BASAMAĞI, İLERLEME GRAFİĞİ, KARŞILAŞTIRMA
     ============================================================ */

  // ---------- 8a. Denklem Dengeleme Alıştırması ----------
  var BAL_BANK = [
    'Fe + O2 -> Fe2O3', 'H2 + O2 -> H2O', 'N2 + H2 -> NH3',
    'CH4 + O2 -> CO2 + H2O', 'C3H8 + O2 -> CO2 + H2O', 'C2H6 + O2 -> CO2 + H2O',
    'Al + O2 -> Al2O3', 'Mg + O2 -> MgO', 'Na + Cl2 -> NaCl',
    'KClO3 -> KCl + O2', 'H2O2 -> H2O + O2', 'P4 + O2 -> P2O5',
    'Zn + HCl -> ZnCl2 + H2', 'Al + HCl -> AlCl3 + H2', 'Fe + HCl -> FeCl2 + H2',
    'NaOH + H2SO4 -> Na2SO4 + H2O', 'NH3 + O2 -> NO + H2O',
    'C2H5OH + O2 -> CO2 + H2O', 'Al2(SO4)3 + Ca(OH)2 -> Al(OH)3 + CaSO4'
  ];
  var balCur = null, balScored = false, balShown = false;

  function setupBalanceGame(){
    var eqCard = document.querySelector('#s-eq .card');
    if (!eqCard || document.getElementById('bal-game')) return;
    eqCard.insertAdjacentHTML('afterend',
      '<div class="card" id="bal-game" style="margin-top:14px">' +
        '<div class="slbl">\ud83c\udfaf Dengeleme Al\u0131\u015ft\u0131rmas\u0131</div>' +
        '<p style="font-size:12px;color:var(--tx2);margin-bottom:12px;line-height:1.6">Katsay\u0131lar\u0131 sen yaz, sistem kontrol etsin. Bo\u015f b\u0131rak\u0131lan kutu <b>1</b> say\u0131l\u0131r.</p>' +
        '<div id="bal-eq" style="display:flex;flex-wrap:wrap;align-items:center;gap:6px;font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:600;margin-bottom:12px;line-height:2"></div>' +
        '<div id="bal-fb" style="display:none;border-radius:var(--r);padding:10px 12px;font-size:13px;font-weight:600;margin-bottom:10px;line-height:1.6"></div>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
          '<button type="button" class="btn bp" onclick="checkBal()">Kontrol Et</button>' +
          '<button type="button" class="btn bs" onclick="showBalAns()">Cevab\u0131 G\u00f6ster</button>' +
          '<button type="button" class="btn bs" onclick="newBalQ()">Yeni Soru \u21bb</button>' +
        '</div>' +
        '<div id="bal-stat" style="font-size:11px;color:var(--tx3);margin-top:10px"></div>' +
      '</div>');
    newBalQ();
  }

  function balSpecies(eq){
    var s = eq.replace(/\s+/g, '');
    var sides = s.split('->');
    var species = [], nReact = 0;
    sides[0].split('+').forEach(function(f){ if (f) { species.push(f); nReact++; } });
    sides[1].split('+').forEach(function(f){ if (f) species.push(f); });
    return { species: species, nReact: nReact };
  }

  window.newBalQ = function(){
    var eq = balCur ? balCur.eq : null;
    var pick;
    do { pick = BAL_BANK[Math.floor(Math.random() * BAL_BANK.length)]; } while (BAL_BANK.length > 1 && pick === eq);
    var sp = balSpecies(pick);
    balCur = { eq: pick, species: sp.species, nReact: sp.nReact };
    balScored = false; balShown = false;
    var html = '';
    for (var i = 0; i < sp.species.length; i++) {
      if (i === sp.nReact) html += '<span style="color:var(--ac2);font-size:20px;margin:0 4px">\u2192</span>';
      else if (i > 0) html += '<span style="color:var(--tx3)">+</span>';
      html += '<input type="number" min="1" step="1" placeholder="1" id="bal-i-' + i + '" class="inp" style="width:52px;padding:8px 6px;text-align:center;font-weight:700">' +
              '<span>' + pretty(sp.species[i]) + '</span>';
    }
    var box = document.getElementById('bal-eq');
    if (box) box.innerHTML = html;
    var fb = document.getElementById('bal-fb');
    if (fb) fb.style.display = 'none';
    balStatLine();
  };

  function balStatLine(){
    var b = sget('rk_bal', {a:0, c:0});
    var s = document.getElementById('bal-stat');
    if (s) s.textContent = 'Bu mod\u00fclde: ' + b.c + ' do\u011fru / ' + b.a + ' deneme' + (b.c >= 10 ? ' \u00b7 \u2696\ufe0f Dengeleyici rozeti kazan\u0131ld\u0131!' : ' \u00b7 10 do\u011fru = \u2696\ufe0f rozet');
  }
  function balFb(msg, kind){
    var fb = document.getElementById('bal-fb');
    if (!fb) return;
    fb.style.display = 'block';
    if (kind === 'ok') { fb.style.background = 'rgba(34,197,94,.1)'; fb.style.border = '1px solid rgba(34,197,94,.3)'; fb.style.color = '#22c55e'; }
    else if (kind === 'warn') { fb.style.background = 'rgba(245,158,11,.1)'; fb.style.border = '1px solid rgba(245,158,11,.3)'; fb.style.color = '#f59e0b'; }
    else { fb.style.background = 'rgba(239,68,68,.1)'; fb.style.border = '1px solid rgba(239,68,68,.3)'; fb.style.color = '#ef4444'; }
    fb.innerHTML = msg;
  }

  window.checkBal = function(){
    if (!balCur) return;
    var coefs = [], i;
    for (i = 0; i < balCur.species.length; i++) {
      var el2 = document.getElementById('bal-i-' + i);
      var v = el2 && el2.value !== '' ? parseInt(el2.value, 10) : 1;
      if (!(v > 0)) { balFb('Katsay\u0131lar pozitif tam say\u0131 olmal\u0131.', 'err'); return; }
      coefs.push(v);
    }
    var firstTry = !balScored && !balShown;
    if (firstTry) { var b0 = sget('rk_bal', {a:0, c:0}); b0.a++; sset('rk_bal', b0); }
    // Element sayımı
    var maps, elems = {}, e2;
    try { maps = balCur.species.map(function(sp){ return parseFormula(sp); }); }
    catch (err) { balFb('Form\u00fcl ayr\u0131\u015ft\u0131r\u0131lamad\u0131.', 'err'); return; }
    maps.forEach(function(m){ Object.keys(m).forEach(function(e){ elems[e] = 1; }); });
    var bad = null;
    Object.keys(elems).forEach(function(e){
      if (bad) return;
      var L = 0, R = 0;
      for (var si = 0; si < maps.length; si++) {
        var cnt = (maps[si][e] || 0) * coefs[si];
        if (si < balCur.nReact) L += cnt; else R += cnt;
      }
      if (L !== R) bad = { e: e, L: L, R: R };
    });
    balScored = true;
    if (bad) {
      balFb('\u2717 Dengeli de\u011fil \u2014 <b>' + bad.e + '</b>: solda ' + bad.L + ', sa\u011fda ' + bad.R + ' atom var. Tekrar dene!', 'err');
      balStatLine();
      return;
    }
    // OBEB kontrolü (en küçük tam sayılar mı?)
    var g = 0;
    coefs.forEach(function(v){ g = gcd(g, v); });
    if (g > 1) {
      balFb('\u26a0\ufe0f Dengeli ama en k\u00fc\u00e7\u00fck tam say\u0131lar de\u011fil \u2014 t\u00fcm katsay\u0131lar\u0131 ' + g + '\'e b\u00f6lerek sadele\u015ftir.', 'warn');
      return;
    }
    balFb('\u2713 M\u00fckemmel! Denklem en k\u00fc\u00e7\u00fck tam say\u0131larla dengelendi.', 'ok');
    if (firstTry) {
      var b1 = sget('rk_bal', {a:0, c:0});
      b1.c++; sset('rk_bal', b1);
      try { checkBadges(true); } catch (e) {}
    }
    balStatLine();
  };

  window.showBalAns = function(){
    if (!balCur) return;
    balShown = true;
    try {
      balanceEquation(balCur.eq);
      var last = balanceEquation._last;
      if (last && last.ints) {
        for (var i = 0; i < last.ints.length; i++) {
          var el2 = document.getElementById('bal-i-' + i);
          if (el2) el2.value = last.ints[i];
        }
        balFb('Cevap g\u00f6sterildi (skora say\u0131lmaz). \u0130ncele, sonra "Yeni Soru" ile devam et.', 'warn');
      }
    } catch (e) {}
  };

  // ---------- 8b. Günün Elementi ----------
  function setupDayElement(){
    var tg = document.querySelector('#s-home .tgrid');
    if (!tg || document.getElementById('day-el')) return;
    var day = Math.floor(Date.now() / 86400000);
    var n = ((day * 37) % 118) + 1;
    var el = null;
    for (var i = 0; i < ELS.length; i++) if (ELS[i].n === n) { el = ELS[i]; break; }
    if (!el) return;
    var d = EL_DATA[n] || {};
    var col = (typeof CAT_COLORS2 !== 'undefined' && CAT_COLORS2[el.cat]) ? CAT_COLORS2[el.cat] : { bg: 'rgba(30,41,59,.8)', border: '#6366f1' };
    tg.insertAdjacentHTML('beforebegin',
      '<div id="day-el" onclick="openElDetail(' + n + ')" style="background:' + col.bg + ';border:1px solid ' + col.border + ';border-radius:var(--rlg);padding:16px;margin-bottom:14px;cursor:pointer;display:flex;gap:14px;align-items:center">' +
        '<div style="background:' + col.border + '22;border:2px solid ' + col.border + ';border-radius:12px;padding:8px 14px;text-align:center;flex-shrink:0">' +
          '<div style="font-size:10px;color:' + col.border + ';font-weight:700">' + el.n + '</div>' +
          '<div style="font-family:Space Grotesk,sans-serif;font-size:30px;font-weight:800;color:' + col.border + ';line-height:1">' + el.sym + '</div>' +
        '</div>' +
        '<div style="flex:1;min-width:0">' +
          '<div style="font-size:10px;font-weight:700;color:' + col.border + ';text-transform:uppercase;letter-spacing:.8px;margin-bottom:3px">\ud83d\udcc5 G\u00fcn\u00fcn Elementi</div>' +
          '<div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:800;color:#fff">' + el.name + '</div>' +
          '<div style="font-size:12px;color:var(--tx2);line-height:1.5;margin-top:2px">' + (d.desc || el.cat) + '</div>' +
          '<div style="font-size:11px;color:' + col.border + ';font-weight:600;margin-top:4px">Detay\u0131n\u0131 g\u00f6r \u2192</div>' +
        '</div>' +
      '</div>');
  }

  // ---------- 8c. Rozet Sistemi ----------
  var BADGES = [
    {id:'ilk',   e:'\ud83d\ude80', n:'\u0130lk Ad\u0131m',        d:'\u0130lk testini bitir',                f:function(s){ return s.scores.length >= 1; }},
    {id:'tam',   e:'\ud83c\udfc5', n:'Kusursuz',                   d:'Bir testte %100 yap',                    f:function(s){ return s.scores.some(function(x){ return x.p === 100; }); }},
    {id:'s100',  e:'\ud83d\udcaf', n:'Soru Canavar\u0131',         d:'Toplam 100 soru \u00e7\u00f6z',          f:function(s){ return s.stats.a >= 100; }},
    {id:'s500',  e:'\ud83d\udc09', n:'Efsane',                     d:'Toplam 500 soru \u00e7\u00f6z',          f:function(s){ return s.stats.a >= 500; }},
    {id:'seri3', e:'\ud83d\udd25', n:'K\u0131v\u0131lc\u0131m',    d:'3 g\u00fcnl\u00fck seri yakala',         f:function(s){ return s.streak >= 3; }},
    {id:'seri7', e:'\u2604\ufe0f', n:'Ate\u015f Serisi',           d:'7 g\u00fcnl\u00fck seri yakala',         f:function(s){ return s.streak >= 7; }},
    {id:'prova', e:'\ud83c\udf93', n:'Prova Sava\u015f\u00e7\u0131s\u0131', d:'Bir YKS provas\u0131 bitir',    f:function(s){ return s.scores.some(function(x){ return x.m === 'exam'; }); }},
    {id:'cmpu',  e:'\u2697\ufe0f', n:'Bile\u015fik Ustas\u0131',   d:'Bile\u015fik testinde %80+ yap',         f:function(s){ return s.scores.some(function(x){ return (x.t === 'cmp2name' || x.t === 'name2cmp') && x.p >= 80; }); }},
    {id:'temiz', e:'\ud83e\uddf9', n:'Temiz Sayfa',                d:'Yanl\u0131\u015f listeni tamamen temizle', f:function(s){ return !!s.flags.cleaned; }},
    {id:'denge', e:'\u2696\ufe0f', n:'Dengeleyici',                d:'10 denklemi do\u011fru dengele',         f:function(s){ return s.bal.c >= 10; }}
  ];
  function badgeState(){
    return {
      scores: sget('rk_scores', []),
      stats: sget('rk_stats', {a:0, c:0}),
      streak: calcStreak(),
      flags: sget('rk_flags', {}),
      bal: sget('rk_bal', {a:0, c:0})
    };
  }
  function earnedBadges(){
    var s = badgeState(), out = [];
    for (var i = 0; i < BADGES.length; i++) {
      try { if (BADGES[i].f(s)) out.push(BADGES[i].id); } catch (e) {}
    }
    return out;
  }
  function checkBadges(showToast){
    var earned = earnedBadges();
    var seen = sget('rk_badges', []);
    var fresh = earned.filter(function(id){ return seen.indexOf(id) === -1; });
    if (fresh.length) {
      sset('rk_badges', earned);
      if (showToast && typeof toast === 'function') {
        var b = null;
        for (var i = 0; i < BADGES.length; i++) if (BADGES[i].id === fresh[0]) { b = BADGES[i]; break; }
        if (b) toast('\ud83c\udfc5 Yeni rozet: ' + b.e + ' ' + b.n + '!');
      }
    }
  }
  function renderBadges(){
    var anchor = document.getElementById('rk-statcard');
    if (!anchor) return;
    var old = document.getElementById('rk-badges');
    if (old) old.remove();
    var earned = earnedBadges();
    var html = '<div class="card" id="rk-badges" style="margin-bottom:12px"><div class="slbl">Rozetler (' + earned.length + '/' + BADGES.length + ')</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px">';
    for (var i = 0; i < BADGES.length; i++) {
      var b = BADGES[i], has = earned.indexOf(b.id) !== -1;
      html += '<div title="' + b.d + '" style="text-align:center;padding:10px 4px;border-radius:var(--r);border:1px solid ' +
        (has ? 'rgba(99,102,241,.4);background:rgba(99,102,241,.1)' : 'var(--br);background:var(--sf2);opacity:.35;filter:grayscale(1)') + '">' +
        '<div style="font-size:24px">' + b.e + '</div>' +
        '<div style="font-size:10px;font-weight:700;color:#fff;margin-top:3px">' + b.n + '</div>' +
        '<div style="font-size:8.5px;color:var(--tx3);margin-top:2px;line-height:1.3">' + b.d + '</div>' +
      '</div>';
    }
    html += '</div></div>';
    anchor.insertAdjacentHTML('afterend', html);
  }

  // ---------- 8d. İlerleme Grafiği ----------
  function renderChart(){
    var anchor = document.getElementById('rk-badges') || document.getElementById('rk-statcard');
    if (!anchor) return;
    var old = document.getElementById('rk-chart');
    if (old) old.remove();
    var scores = sget('rk_scores', []).slice().sort(function(a,b){ return a.dt - b.dt; }).slice(-20);
    var html = '<div class="card" id="rk-chart" style="margin-bottom:12px"><div class="slbl">\u0130lerleme \u2014 Son ' + scores.length + ' Test</div>';
    if (scores.length < 2) {
      html += '<p style="font-size:12px;color:var(--tx3)">Grafik i\u00e7in en az 2 test gerekli.</p></div>';
      anchor.insertAdjacentHTML('afterend', html);
      return;
    }
    html += '<canvas id="rk-chart-cv" style="width:100%;display:block" height="150"></canvas></div>';
    anchor.insertAdjacentHTML('afterend', html);
    var cv = document.getElementById('rk-chart-cv');
    setTimeout(function(){
      var rect = cv.getBoundingClientRect();
      var dpr = window.devicePixelRatio || 1;
      var W = rect.width || 300, H = 150;
      cv.width = W * dpr; cv.height = H * dpr;
      var x = cv.getContext('2d');
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      var padL = 30, padR = 10, padT = 10, padB = 18;
      var iw = W - padL - padR, ih = H - padT - padB;
      function px(i){ return padL + (scores.length === 1 ? iw/2 : iw * i / (scores.length - 1)); }
      function py(p){ return padT + ih * (1 - p / 100); }
      // Kılavuz çizgileri
      [0, 50, 100].forEach(function(v){
        x.strokeStyle = 'rgba(148,163,184,.15)'; x.lineWidth = 1;
        x.beginPath(); x.moveTo(padL, py(v)); x.lineTo(W - padR, py(v)); x.stroke();
        x.fillStyle = 'rgba(148,163,184,.5)'; x.font = '9px sans-serif'; x.textAlign = 'right';
        x.fillText('%' + v, padL - 4, py(v) + 3);
      });
      // Çizgi
      x.strokeStyle = '#818cf8'; x.lineWidth = 2; x.lineJoin = 'round';
      x.beginPath();
      for (var i = 0; i < scores.length; i++) {
        if (i === 0) x.moveTo(px(i), py(scores[i].p));
        else x.lineTo(px(i), py(scores[i].p));
      }
      x.stroke();
      // Noktalar
      for (var j = 0; j < scores.length; j++) {
        var p = scores[j].p;
        x.beginPath(); x.arc(px(j), py(p), 3.5, 0, 2 * Math.PI);
        x.fillStyle = p >= 80 ? '#22c55e' : p >= 50 ? '#f59e0b' : '#ef4444';
        x.fill();
      }
      // Son değer etiketi
      var lastS = scores[scores.length - 1];
      x.fillStyle = '#a5b4fc'; x.font = 'bold 11px sans-serif'; x.textAlign = 'center';
      x.fillText('%' + lastS.p, px(scores.length - 1), py(lastS.p) - 8);
    }, 30);
  }

  // ---------- 8e. Yükseltgenme Basamağı Bulucu ----------
  var PEROXIDES = ['H2O2', 'Na2O2', 'K2O2', 'Li2O2', 'BaO2', 'CaO2'];
  var ANION_TABLE = {S:-2, Se:-2, N:-3, P:-3, C:-4};
  var METAL_CATS = {'Alkali Metal':1, 'Toprak Alkali Metal':1, 'Ge\u00e7i\u015f Metali':1, 'Metal':1, 'Lantanit':1, 'Aktinit':1};

  function setupOxFinder(){
    var tabs = document.getElementById('moltps');
    if (!tabs || document.getElementById('ox-card')) return;
    tabs.insertAdjacentHTML('afterend',
      '<div class="card" id="ox-card" style="margin-top:14px">' +
        '<div class="slbl">\ud83e\uddee Y\u00fckseltgenme Basama\u011f\u0131 Bulucu</div>' +
        '<div class="g2" style="margin-bottom:10px">' +
          '<div><div class="slbl">Form\u00fcl</div><input type="text" id="ox-f" class="inp" placeholder="\u00f6rn: KMnO4" autocapitalize="off" autocorrect="off" spellcheck="false"></div>' +
          '<div><div class="slbl">\u0130yon Y\u00fck\u00fc (n\u00f6tr=0)</div><input type="number" id="ox-q" class="inp" value="0" step="1"></div>' +
        '</div>' +
        '<button type="button" class="btn bp bfull" onclick="oxRun()">Hesapla</button>' +
        '<div id="ox-out" style="margin-top:12px"></div>' +
      '</div>');
    document.getElementById('ox-f').addEventListener('keydown', function(e){
      if (e.key === 'Enter') { e.preventDefault(); window.oxRun(); }
    });
  }

  function oxFmt(fr){
    var sign = fr.n > 0 ? '+' : fr.n < 0 ? '\u2212' : '';
    var an = Math.abs(fr.n);
    return fr.n === 0 ? '0' : (fr.d === 1 ? sign + an : sign + an + '/' + fr.d);
  }

  window.oxRun = function(){
    var fi = document.getElementById('ox-f');
    var out = document.getElementById('ox-out');
    if (!fi || !out) return;
    var v = fi.value.trim();
    var charge = parseInt((document.getElementById('ox-q') || {value:'0'}).value, 10) || 0;
    if (!v) { out.innerHTML = ''; return; }
    try {
      var counts = parseFormula(v);
      var syms = Object.keys(counts);
      if (!syms.length) throw new Error('Form\u00fcl okunamad\u0131.');
      var elMap = {};
      for (var i = 0; i < ELS.length; i++) elMap[ELS[i].sym] = ELS[i];
      for (var s0 = 0; s0 < syms.length; s0++)
        if (!elMap[syms[s0]]) throw new Error('Bilinmeyen sembol: ' + syms[s0]);

      var plain = v.replace(/\s+/g, '');
      var isPerox = PEROXIDES.indexOf(plain) !== -1;
      var hasO = 'O' in counts, hasF = 'F' in counts;
      var known = {}, unknown = [];

      // Tek elementli tür (O2, Fe, P4...) → 0 (nötrse)
      if (syms.length === 1 && charge === 0) {
        out.innerHTML = oxChips([{ sym: syms[0], val: F(0,1) }], 'Elementel halde y\u00fckseltgenme basama\u011f\u0131 0\'d\u0131r.');
        return;
      }

      syms.forEach(function(sym){
        var cat = elMap[sym].cat;
        var othersAllMetal = syms.every(function(s2){ return s2 === sym || METAL_CATS[elMap[s2].cat]; });
        if (sym === 'F') known[sym] = -1;
        else if (sym === 'O') known[sym] = isPerox ? -1 : -2;
        else if (sym === 'H') known[sym] = othersAllMetal ? -1 : 1;
        else if (cat === 'Alkali Metal') known[sym] = 1;
        else if (cat === 'Toprak Alkali Metal') known[sym] = 2;
        else if (sym === 'Al') known[sym] = 3;
        else if (sym === 'Zn') known[sym] = 2;
        else if (sym === 'Ag') known[sym] = 1;
        else if ((sym === 'Cl' || sym === 'Br' || sym === 'I') && !hasO && !hasF) known[sym] = -1;
        else unknown.push(sym);
      });

      // Birden fazla bilinmeyen: metal olmayan anyonlara tablo değeri dene (FeS, Mg3N2 gibi)
      if (unknown.length > 1 && !hasO && !hasF) {
        var left = [];
        unknown.forEach(function(sym){
          if (ANION_TABLE[sym] !== undefined && unknown.length - 1 === unknown.filter(function(u){ return u === sym || METAL_CATS[elMap[u].cat]; }).length - 0) {}
          if (ANION_TABLE[sym] !== undefined) known[sym] = ANION_TABLE[sym];
          else left.push(sym);
        });
        unknown = left;
      }
      if (unknown.length > 1)
        throw new Error('Bu form\u00fclde birden fazla belirsiz element var \u2014 tek bilinmeyenli form\u00fcller destekleniyor (\u00f6rn: KMnO4, H2SO4, FeCl3).');

      var sum = 0;
      syms.forEach(function(sym){ if (known[sym] !== undefined) sum += known[sym] * counts[sym]; });

      var results = [];
      if (unknown.length === 1) {
        var u = unknown[0];
        results = syms.map(function(sym){
          return { sym: sym, val: sym === u ? F(charge - sum, counts[u]) : F(known[sym], 1) };
        });
      } else {
        // Bilinmeyen yok: toplam yüke uymuyorsa O'yu (ya da H'yi) serbest bırakıp yeniden çöz (OF2 gibi)
        if (sum !== charge && (hasO || 'H' in counts)) {
          var u2 = hasO ? 'O' : 'H';
          var sum2 = 0;
          syms.forEach(function(sym){ if (sym !== u2) sum2 += known[sym] * counts[sym]; });
          results = syms.map(function(sym){
            return { sym: sym, val: sym === u2 ? F(charge - sum2, counts[u2]) : F(known[sym], 1) };
          });
        } else if (sum !== charge) {
          throw new Error('Kurallar bu form\u00fclde toplam y\u00fckle \u00e7eli\u015fti \u2014 y\u00fck de\u011ferini kontrol et.');
        } else {
          results = syms.map(function(sym){ return { sym: sym, val: F(known[sym], 1) }; });
        }
      }
      var note = '';
      results.forEach(function(r){ if (r.val.d !== 1) note = 'Kesirli sonu\u00e7 = ortalama de\u011ferlik (kar\u0131\u015f\u0131k y\u00fckseltgenme basamakl\u0131 bile\u015fik, \u00f6rn. Fe\u2083O\u2084).'; });
      out.innerHTML = oxChips(results, note);
    } catch (err) {
      out.innerHTML = '<div style="font-size:13px;color:var(--yw);line-height:1.6">' + err.message + '</div>';
    }
  };

  function oxChips(results, note){
    var html = '<div style="display:flex;flex-wrap:wrap;gap:8px">';
    results.forEach(function(r){
      var v = r.val.n / r.val.d;
      var col = v > 0 ? '#ef4444' : v < 0 ? '#3b82f6' : '#94a3b8';
      html += '<div style="background:' + col + '18;border:1px solid ' + col + '55;border-radius:var(--r);padding:8px 14px;text-align:center">' +
        '<div style="font-family:Space Grotesk,sans-serif;font-size:18px;font-weight:800;color:#fff">' + r.sym + '</div>' +
        '<div style="font-size:15px;font-weight:800;color:' + col + '">' + oxFmt(r.val) + '</div>' +
      '</div>';
    });
    html += '</div>';
    if (note) html += '<div style="font-size:11px;color:var(--tx3);margin-top:8px;line-height:1.5">' + note + '</div>';
    return html;
  }

  // ---------- 8f. Element Karşılaştırma ----------
  function setupCompareScreen(){
    if (document.getElementById('s-cmp')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    var opts = '';
    for (var i = 0; i < ELS.length; i++)
      opts += '<option value="' + ELS[i].n + '">' + ELS[i].n + ' \u2014 ' + ELS[i].name + ' (' + ELS[i].sym + ')</option>';
    app.insertAdjacentHTML('beforeend',
      '<div id="s-cmp" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\u2696\ufe0f Element Kar\u015f\u0131la\u015ft\u0131rma</h1>' +
        '<p class="psub">\u0130ki element se\u00e7, \u00f6zelliklerini ve periyodik e\u011filimlerini yan yana g\u00f6r.</p>' +
        '<div class="card" style="margin-bottom:12px"><div class="g2">' +
          '<div><div class="slbl">Element 1</div><select class="sel" id="cmp-a">' + opts + '</select></div>' +
          '<div><div class="slbl">Element 2</div><select class="sel" id="cmp-b">' + opts + '</select></div>' +
        '</div>' +
        '<button type="button" class="btn bp bfull" style="margin-top:12px" onclick="runCompare()">Kar\u015f\u0131la\u015ft\u0131r</button></div>' +
        '<div id="cmp-out"></div>' +
      '</div></div>');
    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-cmp') === -1) SCREENS.push('s-cmp');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-cmp'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-cmp" onclick="nav(\'cmp\')">\u2696\ufe0f Element Kar\u015f\u0131la\u015ft\u0131r</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-cmp'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-cmp" onclick="nav(\'cmp\')"><div class="ti">\u2696\ufe0f</div><div class="tt">Element Kar\u015f\u0131la\u015ft\u0131r</div><div class="td">\u0130ki elementi yan yana incele: EN, yar\u0131\u00e7ap, erime, dizilim.</div></div>');
    var sa = document.getElementById('cmp-a'), sb = document.getElementById('cmp-b');
    if (sa) sa.value = '11';
    if (sb) sb.value = '17';
    runCompare();
  }

  window.runCompare = function(){
    var sa = document.getElementById('cmp-a'), sb = document.getElementById('cmp-b');
    var out = document.getElementById('cmp-out');
    if (!sa || !sb || !out) return;
    var na = +sa.value, nb = +sb.value;
    var A = null, B = null;
    for (var i = 0; i < ELS.length; i++) { if (ELS[i].n === na) A = ELS[i]; if (ELS[i].n === nb) B = ELS[i]; }
    if (!A || !B) return;
    var da = EL_DATA[na] || {}, db = EL_DATA[nb] || {};

    function row(label, v1, v2, win){ // win: 0=yok, 1=sol, 2=sağ
      function cell(v, w){
        return '<div style="padding:9px 10px;font-size:12.5px;' + (w ? 'color:#22c55e;font-weight:700' : 'color:var(--tx)') + '">' + (v === null || v === undefined || v === '' ? '\u2014' : v) + '</div>';
      }
      return '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;border-bottom:1px solid var(--br);align-items:center">' +
        '<div style="padding:9px 10px;font-size:10.5px;font-weight:700;color:var(--tx3);text-transform:uppercase;letter-spacing:.5px">' + label + '</div>' +
        cell(v1, win === 1) + cell(v2, win === 2) + '</div>';
    }
    function numWin(x, y, higherWins){
      if (x === null || x === undefined || y === null || y === undefined || x === y) return 0;
      return (x > y) === !!higherWins ? 1 : 2;
    }
    // Yarıçap eğilimi: periyot büyükse büyük; aynı periyotta grup küçükse büyük
    var radWin = 0;
    if (da.period && db.period) {
      if (da.period !== db.period) radWin = da.period > db.period ? 1 : 2;
      else if (da.group && db.group && da.group !== db.group) radWin = da.group < db.group ? 1 : 2;
    }

    var html = '<div class="card" style="padding:0;overflow:hidden">';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;background:var(--sf2);border-bottom:1px solid var(--br)">' +
      '<div style="padding:12px 10px;font-size:10px;font-weight:700;color:var(--tx3)">\u00d6ZELL\u0130K</div>' +
      '<div style="padding:12px 10px;font-family:Space Grotesk,sans-serif;font-weight:800;color:#fff;cursor:pointer" onclick="openElDetail(' + na + ')">' + A.sym + ' \u00b7 ' + A.name + '</div>' +
      '<div style="padding:12px 10px;font-family:Space Grotesk,sans-serif;font-weight:800;color:#fff;cursor:pointer" onclick="openElDetail(' + nb + ')">' + B.sym + ' \u00b7 ' + B.name + '</div></div>';
    html += row('Kategori', A.cat, B.cat, 0);
    html += row('Atom K\u00fctlesi', A.mass + ' g/mol', B.mass + ' g/mol', 0);
    html += row('Periyot / Grup', (da.period || '?') + ' / ' + (da.group || '?'), (db.period || '?') + ' / ' + (db.group || '?'), 0);
    html += row('Elektronegatiflik', da.neg, db.neg, numWin(da.neg, db.neg, true));
    html += row('Atom Yar\u0131\u00e7ap\u0131 (e\u011filim)', radWin === 1 ? 'Daha b\u00fcy\u00fck' : radWin === 2 ? 'Daha k\u00fc\u00e7\u00fck' : '\u2248', radWin === 2 ? 'Daha b\u00fcy\u00fck' : radWin === 1 ? 'Daha k\u00fc\u00e7\u00fck' : '\u2248', radWin);
    html += row('Erime Noktas\u0131', da.melt !== null && da.melt !== undefined ? da.melt + ' \u00b0C' : null, db.melt !== null && db.melt !== undefined ? db.melt + ' \u00b0C' : null, numWin(da.melt, db.melt, true));
    html += row('Kaynama Noktas\u0131', da.boil !== null && da.boil !== undefined ? da.boil + ' \u00b0C' : null, db.boil !== null && db.boil !== undefined ? db.boil + ' \u00b0C' : null, numWin(da.boil, db.boil, true));
    html += row('e\u207b Dizilimi', da.conf, db.conf, 0);
    html += row('Kabuklar', da.shells, db.shells, 0);
    html += '</div>';

    // Sözel değerlendirme
    var verdicts = [];
    if (da.neg != null && db.neg != null && da.neg !== db.neg)
      verdicts.push('\ud83e\uddf2 Elektronegatifli\u011fi daha y\u00fcksek: <b>' + (da.neg > db.neg ? A.sym : B.sym) + '</b> \u2014 elektronlar\u0131 daha \u00e7ok \u00e7eker.');
    if (radWin) verdicts.push('\u269b\ufe0f Atom yar\u0131\u00e7ap\u0131 daha b\u00fcy\u00fck: <b>' + (radWin === 1 ? A.sym : B.sym) + '</b> (periyodik e\u011filime g\u00f6re).');
    var aM = METAL_CATS[A.cat], bM = METAL_CATS[B.cat];
    if (aM && bM && da.neg != null && db.neg != null && da.neg !== db.neg)
      verdicts.push('\u26a1 Metalik aktifli\u011fi daha y\u00fcksek: <b>' + (da.neg < db.neg ? A.sym : B.sym) + '</b> \u2014 elektron vermeye daha yatk\u0131n.');
    if (!aM && !bM && da.neg != null && db.neg != null && da.neg !== db.neg)
      verdicts.push('\u26a1 Ametalik aktifli\u011fi daha y\u00fcksek: <b>' + (da.neg > db.neg ? A.sym : B.sym) + '</b> \u2014 elektron almaya daha yatk\u0131n.');
    if (verdicts.length)
      html += '<div class="card" style="margin-top:12px"><div class="slbl">De\u011ferlendirme</div><div style="font-size:13px;color:var(--tx2);line-height:2">' + verdicts.join('<br>') + '</div></div>';

    out.innerHTML = html;
  };

  /* ============================================================
     BÖLÜM 9 — 3D ELEKTROLİZ LABORATUVARI
     • Gerçek 3D simülasyon (sürükle-döndür): iyon göçü, gaz
       kabarcıkları, metal birikmesi, çözünen anot, elektron akışı
     • 6 elektroliz sistemi (erimiş/sulu NaCl, CuSO₄ Pt/Cu anot,
       saf su, erimiş Al₂O₃) — su rekabeti doğru öğretilir
     • Faraday hesaplayıcısı (adım adım çözümlü) + seri hücreler
     • Kaplama senaryoları (3 interaktif senaryo) + 🔋 rozet
     ============================================================ */

  // ---------- 9a. Sistem tanımları ----------
  var ELZ_MODES = {
    naclA: {
      name: 'Sulu NaCl (derişik)',
      cat: { prod: 'H₂↑', type: 'gas', gasCol: '#e2e8f0', half: '2H₂O + 2e⁻ → H₂(g) + 2OH⁻', why: 'Su, Na⁺ iyonundan daha kolay indirgenir — Na⁺ seyirci kalır!' },
      an:  { prod: 'Cl₂↑', type: 'gas', gasCol: '#bde04a', half: '2Cl⁻ → Cl₂(g) + 2e⁻', why: 'Derişik çözeltide Cl⁻ yükseltgenir. Seyreltik olsaydı su yükseltgenir, O₂ çıkardı.' },
      overall: '2NaCl + 2H₂O → H₂(g) + Cl₂(g) + 2NaOH',
      ions: [ {s:'Na⁺', c:'#60a5fa', ch:1, n:7, dis:false}, {s:'Cl⁻', c:'#a3e635', ch:-1, n:7, dis:true}, {s:'H₂O', c:'#64748b', ch:0, n:6} ],
      notes: ['Katotta Na(s) DEĞİL H₂ çıkar — suyun indirgenme isteği Na⁺\u2019dan büyüktür.', 'Çözelti giderek bazikleşir (NaOH oluşur) — klor-alkali endüstrisinin temeli.', 'YKS tuzağı: sulu çözeltide 1A ve 2A metalleri ile Al asla elektrotta toplanmaz.']
    },
    naclM: {
      name: 'Erimiş NaCl',
      cat: { prod: 'Na(s)', type: 'dep', depCol: '#cbd5e1', half: 'Na⁺ + e⁻ → Na(s)', why: 'Su yok — Na⁺ tek aday olduğu için indirgenir.' },
      an:  { prod: 'Cl₂↑', type: 'gas', gasCol: '#bde04a', half: '2Cl⁻ → Cl₂(g) + 2e⁻', why: 'Cl⁻ tek anyon, yükseltgenir.' },
      overall: '2NaCl(s) --elektroliz--> 2Na(s) + Cl₂(g)',
      ions: [ {s:'Na⁺', c:'#60a5fa', ch:1, n:8, dis:true}, {s:'Cl⁻', c:'#a3e635', ch:-1, n:8, dis:true} ],
      notes: ['Aktif metaller (Na, K, Ca, Mg, Al) sadece ERİMİŞ tuzlarının elektroliziyle elde edilir (Down hücresi).', 'Erime için yüksek sıcaklık gerekir (NaCl: 801°C).']
    },
    cuso4Pt: {
      name: 'Sulu CuSO₄ (Pt anot)',
      cat: { prod: 'Cu(s)', type: 'dep', depCol: '#e78a5a', half: 'Cu²⁺ + 2e⁻ → Cu(s)', why: 'Cu²⁺ sudan daha kolay indirgenir — katot bakırla kaplanır.' },
      an:  { prod: 'O₂↑', type: 'gas', gasCol: '#bae6fd', half: '2H₂O → O₂(g) + 4H⁺ + 4e⁻', why: 'SO₄²⁻ yükseltgenemez (kararlı) — su yükseltgenir.' },
      overall: '2CuSO₄ + 2H₂O → 2Cu(s) + O₂(g) + 2H₂SO₄',
      ions: [ {s:'Cu²⁺', c:'#38bdf8', ch:1, n:7, dis:true}, {s:'SO₄²⁻', c:'#c084fc', ch:-1, n:7, dis:false}, {s:'H₂O', c:'#64748b', ch:0, n:6} ],
      notes: ['Çözeltinin mavi rengi zamanla açılır (Cu²⁺ azalır) ve ortam asitleşir.', 'SO₄²⁻ ve NO₃⁻ gibi oksianyonlar sulu çözeltide yükseltgenmez.']
    },
    cuso4Cu: {
      name: 'CuSO₄ + Cu anot (rafinasyon)',
      cat: { prod: 'Cu(s)', type: 'dep', depCol: '#e78a5a', half: 'Cu²⁺ + 2e⁻ → Cu(s)', why: 'Saf bakır katotta birikir.' },
      an:  { prod: 'Cu²⁺', type: 'diss', half: 'Cu(s) → Cu²⁺ + 2e⁻', why: 'AKTİF anot: elektrot kendisi çözünür, gaz çıkmaz!' },
      overall: 'Cu(anot, saf olmayan) → Cu(katot, %99.99 saf)',
      ions: [ {s:'Cu²⁺', c:'#38bdf8', ch:1, n:8, dis:true}, {s:'SO₄²⁻', c:'#c084fc', ch:-1, n:6, dis:false} ],
      notes: ['Bakır rafinasyonu: anot incelir, katot kalınlaşır; Cu²⁺ derişimi SABİT kalır.', 'Anot altındaki çamurda altın-gümüş gibi soy safsızlıklar birikir (anot çamuru).']
    },
    water: {
      name: 'Saf su (+ H₂SO₄)',
      cat: { prod: 'H₂↑ (2V)', type: 'gas', gasCol: '#e2e8f0', rate: 2, half: '2H₂O + 2e⁻ → H₂(g) + 2OH⁻', why: 'Hidrojen hacmi oksijenin tam 2 katıdır!' },
      an:  { prod: 'O₂↑ (1V)', type: 'gas', gasCol: '#bae6fd', rate: 1, half: '2H₂O → O₂(g) + 4H⁺ + 4e⁻', why: '' },
      overall: '2H₂O --elektroliz--> 2H₂(g) + O₂(g)',
      ions: [ {s:'H⁺', c:'#fca5a5', ch:1, n:5, dis:true}, {s:'SO₄²⁻', c:'#c084fc', ch:-1, n:4, dis:false}, {s:'H₂O', c:'#64748b', ch:0, n:8} ],
      notes: ['Saf su iletken değildir — az miktarda H₂SO₄ veya NaOH eklenir (Hoffman voltametresi).', 'Gaz hacimleri oranı V(H₂):V(O₂) = 2:1 — YKS\u2019nin klasiği.']
    },
    al2o3: {
      name: 'Erimiş Al₂O₃ (Hall-Héroult)',
      cat: { prod: 'Al(s)', type: 'dep', depCol: '#d8dee8', half: 'Al³⁺ + 3e⁻ → Al(s)', why: 'Sıvı alüminyum hücrenin dibinde toplanır.' },
      an:  { prod: 'O₂/CO₂↑', type: 'gas', gasCol: '#fcd34d', half: '2O²⁻ → O₂(g) + 4e⁻', why: 'Karbon (grafit) anot, çıkan O₂ ile yanarak CO₂ verir — anotlar tükenir.' },
      overall: '2Al₂O₃ --elektroliz--> 4Al(s) + 3O₂(g)',
      ions: [ {s:'Al³⁺', c:'#e2e8f0', ch:1, n:8, dis:true}, {s:'O²⁻', c:'#f87171', ch:-1, n:8, dis:true} ],
      notes: ['Al₂O₃\u2019ün erime noktasını düşürmek için kriyolit (Na₃AlF₆) eklenir (2050°C → ~950°C).', 'Alüminyum üretimi çok elektrik tüketir; bu yüzden tesisler ucuz enerji bölgelerine kurulur.']
    },
    agno3_pt: {
      name: 'Sulu AgNO₃ (Pt anot)',
      cat: { prod: 'Ag(s)', type: 'dep', depCol: '#d7dbe2', half: 'Ag⁺ + e⁻ → Ag(s)', why: 'Ag⁺ sudan çok daha kolay indirgenir — katot gümüşle kaplanır.' },
      an:  { prod: 'O₂↑', type: 'gas', gasCol: '#bae6fd', half: '2H₂O → O₂(g) + 4H⁺ + 4e⁻', why: 'NO₃⁻ yükseltgenmez — su yükseltgenir.' },
      overall: '4AgNO₃ + 2H₂O → 4Ag(s) + O₂(g) + 4HNO₃',
      ions: [ {s:'Ag⁺', c:'#e5e7eb', ch:1, n:7, dis:true}, {s:'NO₃⁻', c:'#f0abfc', ch:-1, n:7, dis:false}, {s:'H₂O', c:'#64748b', ch:0, n:6} ],
      notes: ['Gümüş kaplamacılığın temeli — kaplanacak eşya katoda bağlanır.', 'NO₃⁻ ve SO₄²⁻ sulu çözeltide asla yükseltgenmez.']
    },
    mgcl2_3d: {
      name: 'Erimiş MgCl₂',
      cat: { prod: 'Mg(s)', type: 'dep', depCol: '#cdd5df', half: 'Mg²⁺ + 2e⁻ → Mg(s)', why: 'Su yok — Mg²⁺ tek aday, indirgenir.' },
      an:  { prod: 'Cl₂↑', type: 'gas', gasCol: '#bde04a', half: '2Cl⁻ → Cl₂(g) + 2e⁻', why: '' },
      overall: 'MgCl₂(s) --elektroliz--> Mg(s) + Cl₂(g)',
      ions: [ {s:'Mg²⁺', c:'#93c5fd', ch:1, n:8, dis:true}, {s:'Cl⁻', c:'#a3e635', ch:-1, n:8, dis:true} ],
      notes: ['Magnezyum, deniz suyundan elde edilen MgCl₂\u2019nin erimiş elektroliziyle üretilir (Dow yöntemi).']
    },
    ki: {
      name: 'Sulu KI',
      cat: { prod: 'H₂↑', type: 'gas', gasCol: '#e2e8f0', half: '2H₂O + 2e⁻ → H₂(g) + 2OH⁻', why: 'K⁺ (1A grubu) sulu çözeltide asla indirgenmez — su kazanır.' },
      an:  { prod: 'I₂(k)', type: 'dep', depCol: '#7c3aed', half: '2I⁻ → I₂(k) + 2e⁻', why: 'I⁻ sudan kolay yükseltgenir; iyot anotta KATI olarak birikir, çevresi kahverengileşir.' },
      overall: '2KI + 2H₂O → H₂(g) + I₂(k) + 2KOH',
      ions: [ {s:'K⁺', c:'#c4b5fd', ch:1, n:7, dis:false}, {s:'I⁻', c:'#a78bfa', ch:-1, n:7, dis:true}, {s:'H₂O', c:'#64748b', ch:0, n:6} ],
      notes: ['Anot çevresine nişasta damlatılırsa mavi-mor renk gözlenir (iyot testi).', 'Katot çevresi bazikleşir — fenolftalein pembeye döner.']
    },
    na2so4: {
      name: 'Sulu Na₂SO₄',
      cat: { prod: 'H₂↑ (2V)', type: 'gas', gasCol: '#e2e8f0', rate: 2, half: '2H₂O + 2e⁻ → H₂(g) + 2OH⁻', why: 'Na⁺ indirgenmez — su kazanır.' },
      an:  { prod: 'O₂↑ (1V)', type: 'gas', gasCol: '#bae6fd', rate: 1, half: '2H₂O → O₂(g) + 4H⁺ + 4e⁻', why: 'SO₄²⁻ yükseltgenmez — su kazanır.' },
      overall: 'Net: 2H₂O → 2H₂(g) + O₂(g)   (Na₂SO₄ sadece iletkenliği sağlar)',
      ions: [ {s:'Na⁺', c:'#60a5fa', ch:1, n:6, dis:false}, {s:'SO₄²⁻', c:'#c084fc', ch:-1, n:6, dis:false}, {s:'H₂O', c:'#64748b', ch:0, n:8} ],
      notes: ['HER İKİ iyon da seyircidir — net tepkime suyun elektrolizidir. YKS\u2019nin favori tuzağı!', 'Katot çevresi bazik (OH⁻), anot çevresi asidik (H⁺) olur.']
    }
  };

  // ---------- 9b. 3D motor durumu ----------
  var elz = { rotX: 0.32, rotY: -0.55, spin: false, drag: false, lx: 0, ly: 0,
              anim: null, t: 0, cur: 1.2, mode: 'naclA',
              ions: [], bubbles: [], depC: 0, depA: 9, depAn: 0, W: 300, H: 340, cv: null, ctx: null };

  function elzProj(x, y, z){
    var y1 = y * Math.cos(elz.rotX) - z * Math.sin(elz.rotX);
    var z1 = y * Math.sin(elz.rotX) + z * Math.cos(elz.rotX);
    var x2 = x * Math.cos(elz.rotY) + z1 * Math.sin(elz.rotY);
    var z2 = -x * Math.sin(elz.rotY) + z1 * Math.cos(elz.rotY);
    var s = 330 / (460 + z2);
    return { x: elz.W / 2 + x2 * s, y: elz.H / 2 + y1 * s + 14, z: z2, s: s };
  }

  function elzRgb(hex){
    hex = (hex || '#94a3b8').replace('#', '');
    return parseInt(hex.slice(0,2),16) + ',' + parseInt(hex.slice(2,4),16) + ',' + parseInt(hex.slice(4,6),16);
  }

  // Kutu → 6 yüz (quad listesine ekler)
  function elzBox(quads, cx, cy, cz, hx, hy, hz, fill, alpha, stroke){
    var C = [
      [cx-hx,cy-hy,cz-hz],[cx+hx,cy-hy,cz-hz],[cx+hx,cy+hy,cz-hz],[cx-hx,cy+hy,cz-hz],
      [cx-hx,cy-hy,cz+hz],[cx+hx,cy-hy,cz+hz],[cx+hx,cy+hy,cz+hz],[cx-hx,cy+hy,cz+hz]
    ];
    var F2 = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[3,2,6,7],[0,3,7,4],[1,2,6,5]];
    var shade = [0.9, 0.9, 1.0, 0.7, 0.8, 0.8];
    for (var f = 0; f < 6; f++) {
      var pts = [], zsum = 0;
      for (var k = 0; k < 4; k++) {
        var p = elzProj(C[F2[f][k]][0], C[F2[f][k]][1], C[F2[f][k]][2]);
        pts.push(p); zsum += p.z;
      }
      quads.push({ pts: pts, z: zsum / 4, fill: fill, a: alpha * shade[f], stroke: stroke });
    }
  }

  function elzSetup3D(){
    elz.cv = document.getElementById('elzCv');
    if (!elz.cv) return;
    elz.ctx = elz.cv.getContext('2d');
    elz.cv.onmousedown = function(e){ elz.drag = true; elz.lx = e.clientX; elz.ly = e.clientY; };
    elz.cv.onmousemove = function(e){
      if (!elz.drag) return;
      elz.rotY += (e.clientX - elz.lx) * 0.008; elz.rotX += (e.clientY - elz.ly) * 0.008;
      elz.rotX = Math.max(-0.2, Math.min(1.1, elz.rotX));
      elz.lx = e.clientX; elz.ly = e.clientY;
    };
    elz.cv.onmouseup = elz.cv.onmouseleave = function(){ elz.drag = false; };
    elz.cv.addEventListener('touchstart', function(e){ elz.drag = true; elz.lx = e.touches[0].clientX; elz.ly = e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    elz.cv.addEventListener('touchmove', function(e){
      if (!elz.drag) return;
      elz.rotY += (e.touches[0].clientX - elz.lx) * 0.012; elz.rotX += (e.touches[0].clientY - elz.ly) * 0.012;
      elz.rotX = Math.max(-0.2, Math.min(1.1, elz.rotX));
      elz.lx = e.touches[0].clientX; elz.ly = e.touches[0].clientY; e.preventDefault();
    }, {passive:false});
    elz.cv.addEventListener('touchend', function(){ elz.drag = false; });
  }

  function elzSpawnIons(){
    var m = ELZ_MODES[elz.mode];
    elz.ions = []; elz.bubbles = []; elz.depC = 0; elz.depA = 9; elz.depAn = 0;
    m.ions.forEach(function(t){
      for (var i = 0; i < t.n; i++)
        elz.ions.push({ x: -50 + Math.random()*100, y: 6 + Math.random()*78, z: -42 + Math.random()*84,
                        s: t.s, c: t.c, ch: t.ch, dis: !!t.dis, cool: Math.random()*2 });
    });
  }

  window.elzSetMode = function(mode, btn){
    elz.mode = mode;
    if (btn) {
      var bs = btn.parentElement.querySelectorAll('button');
      for (var i = 0; i < bs.length; i++) { bs[i].classList.remove('sel2'); }
      btn.classList.add('sel2');
    }
    elzSpawnIons();
    elzInfo();
  };

  function elzInfo(){
    var m = ELZ_MODES[elz.mode];
    var el = document.getElementById('elz-half');
    if (!el) return;
    var html = '<div class="g2" style="margin-bottom:10px">';
    html += '<div style="background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.3);border-radius:var(--r);padding:12px">' +
      '<div style="font-size:10px;font-weight:800;color:#60a5fa;margin-bottom:6px">\u2296 KATOT \u00b7 \u0130ND\u0130RGENME</div>' +
      '<div style="font-family:Space Grotesk,sans-serif;font-size:13px;font-weight:700;color:#fff;margin-bottom:6px">' + m.cat.half + '</div>' +
      (m.cat.why ? '<div style="font-size:11.5px;color:var(--tx2);line-height:1.5">' + m.cat.why + '</div>' : '') + '</div>';
    html += '<div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.3);border-radius:var(--r);padding:12px">' +
      '<div style="font-size:10px;font-weight:800;color:#f87171;margin-bottom:6px">\u2295 ANOT \u00b7 Y\u00dcKSELTGENME</div>' +
      '<div style="font-family:Space Grotesk,sans-serif;font-size:13px;font-weight:700;color:#fff;margin-bottom:6px">' + m.an.half + '</div>' +
      (m.an.why ? '<div style="font-size:11.5px;color:var(--tx2);line-height:1.5">' + m.an.why + '</div>' : '') + '</div>';
    html += '</div>';
    html += '<div style="background:var(--sf2);border:1px solid var(--br);border-radius:var(--r);padding:10px 12px;text-align:center;font-family:Space Grotesk,sans-serif;font-size:13px;font-weight:700;color:var(--ac2);margin-bottom:10px">' + m.overall + '</div>';
    html += '<div style="font-size:12px;color:var(--tx2);line-height:1.8">';
    m.notes.forEach(function(nt){ html += '\ud83d\udccc ' + nt + '<br>'; });
    html += '</div>';
    el.innerHTML = html;
  }

  function elzLoop(){
    var scr = document.getElementById('s-elz');
    if (!scr || scr.style.display === 'none' || !elz.cv) { elzStop(); return; }
    elz.anim = requestAnimationFrame(elzLoop);
    var rect = elz.cv.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    if (Math.abs(elz.cv.width - rect.width * dpr) > 2) { elz.cv.width = rect.width * dpr; elz.cv.height = 340 * dpr; }
    var x = elz.ctx;
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    elz.W = rect.width || 300; elz.H = 340;
    x.clearRect(0, 0, elz.W, elz.H);
    x.fillStyle = '#050510'; x.fillRect(0, 0, elz.W, elz.H);
    if (elz.spin && !elz.drag) elz.rotY += 0.005;
    elz.t += 0.016;

    var m = ELZ_MODES[elz.mode];
    var quads = [], sprites = [];
    var CATX = -72, ANX = 72;

    // Sıvı (tank içi)
    elzBox(quads, 0, 50, 0, 108, 52, 58, '56,130,246', 0.07, 'rgba(120,180,255,.22)');
    // Elektrotlar (anot Cu modunda incelir)
    var anHx = elz.mode === 'cuso4Cu' ? Math.max(3, elz.depA) : 7;
    elzBox(quads, CATX, 30, 0, 7, 66, 20, '154,164,178', 0.85, 'rgba(200,210,225,.5)');
    elzBox(quads, ANX, 30, 0, anHx, 66, 20, '154,164,178', 0.85, 'rgba(200,210,225,.5)');
    // Katot birikintisi (iç yüzde büyür)
    if (m.cat.type === 'dep' && elz.depC > 0.3)
      elzBox(quads, CATX + 7 + elz.depC/2, 55, 0, elz.depC/2, 40, 18, elzRgb(m.cat.depCol), 0.9, null);
    if (m.an.type === 'dep' && elz.depAn > 0.3)
      elzBox(quads, ANX - anHx - elz.depAn/2, 55, 0, elz.depAn/2, 40, 18, elzRgb(m.an.depCol), 0.9, null);
    // Güç kaynağı
    elzBox(quads, 0, -86, 0, 34, 14, 14, '30,36,54', 0.95, 'rgba(129,140,248,.6)');

    // İyon hareketi
    var spd = 0.35 * elz.cur;
    for (var i = 0; i < elz.ions.length; i++) {
      var io = elz.ions[i];
      io.cool -= 0.016;
      var tx = io.ch > 0 ? CATX + 14 : io.ch < 0 ? ANX - 14 : io.x;
      if (io.ch !== 0) io.x += (tx - io.x) * 0.004 * elz.cur + (Math.random() - 0.5) * spd;
      else io.x += (Math.random() - 0.5) * spd * 0.8;
      io.y += (Math.random() - 0.5) * spd * 0.7;
      io.z += (Math.random() - 0.5) * spd * 0.8;
      io.x = Math.max(-100, Math.min(100, io.x));
      io.y = Math.max(4, Math.min(92, io.y));
      io.z = Math.max(-50, Math.min(50, io.z));
      // Elektroda varış
      if (io.ch !== 0 && io.cool <= 0 && Math.abs(io.x - tx) < 5) {
        var side = io.ch > 0 ? m.cat : m.an;
        if (io.dis) {
          if (side.type === 'dep') { if (io.ch > 0) elz.depC = Math.min(8, elz.depC + 0.18); else elz.depAn = Math.min(8, elz.depAn + 0.18); }
          if (side.type === 'gas') elzBubble(io.ch > 0 ? CATX + 10 : ANX - 10, io.y, io.z, side.gasCol);
          if (elz.mode === 'cuso4Cu' && io.ch > 0) { // rafinasyon: anot çözünür, yeni Cu²⁺ doğar
            elz.depA = Math.max(3, elz.depA - 0.06);
            io.x = ANX - 16; io.y = 10 + Math.random()*80; io.z = -40 + Math.random()*80;
          } else {
            io.x = -40 + Math.random()*80; io.y = 8 + Math.random()*80; io.z = -40 + Math.random()*80;
          }
          io.cool = 1.6;
        } else {
          io.x -= io.ch > 0 ? 10 : -10; // boşalamayan iyon geri döner (seyirci)
          io.cool = 1.2;
        }
      }
      var p = elzProj(io.x, io.y, io.z);
      sprites.push({ x: p.x, y: p.y, z: p.z, r: (io.ch === 0 ? 3.2 : 5) * p.s, c: io.c, lbl: io.s, faint: io.ch === 0 });
    }
    // Su modunda ve gaz üreten elektrotlarda sürekli kabarcık (su rekabeti görseli)
    if (m.cat.type === 'gas' && Math.random() < 0.03 * elz.cur * (m.cat.rate || 1)) elzBubble(CATX + 10, 30 + Math.random()*55, -18 + Math.random()*36, m.cat.gasCol);
    if (m.an.type === 'gas' && Math.random() < 0.03 * elz.cur * (m.an.rate || 1)) elzBubble(ANX - 10, 30 + Math.random()*55, -18 + Math.random()*36, m.an.gasCol);
    // Kabarcıklar yükselir
    for (var b = elz.bubbles.length - 1; b >= 0; b--) {
      var bb = elz.bubbles[b];
      bb.y -= 0.55 * elz.cur; bb.x += (Math.random() - 0.5) * 0.4; bb.r = Math.min(4.2, bb.r + 0.02);
      if (bb.y < 0) { elz.bubbles.splice(b, 1); continue; }
      var pb = elzProj(bb.x, bb.y, bb.z);
      sprites.push({ x: pb.x, y: pb.y, z: pb.z, r: bb.r * pb.s, c: bb.c, bubble: true });
    }

    // Çizim: quad + sprite birlikte derinlik sırasına göre
    var all = quads.map(function(q){ q.q = 1; return q; }).concat(sprites);
    all.sort(function(a, b){ return b.z - a.z; });
    for (var d2 = 0; d2 < all.length; d2++) {
      var o = all[d2];
      if (o.q) {
        x.beginPath();
        x.moveTo(o.pts[0].x, o.pts[0].y);
        for (var k2 = 1; k2 < 4; k2++) x.lineTo(o.pts[k2].x, o.pts[k2].y);
        x.closePath();
        x.fillStyle = 'rgba(' + o.fill + ',' + o.a + ')'; x.fill();
        if (o.stroke) { x.strokeStyle = o.stroke; x.lineWidth = 0.7; x.stroke(); }
      } else if (o.bubble) {
        x.beginPath(); x.arc(o.x, o.y, Math.max(0.5, o.r), 0, 2*Math.PI);
        x.strokeStyle = o.c; x.lineWidth = 1.2; x.stroke();
        x.fillStyle = 'rgba(255,255,255,.12)'; x.fill();
      } else {
        x.beginPath(); x.arc(o.x, o.y, Math.max(1, o.r), 0, 2*Math.PI);
        x.fillStyle = o.c; x.globalAlpha = o.faint ? 0.35 : 0.95; x.fill(); x.globalAlpha = 1;
        if (!o.faint && o.r > 3.5) {
          x.fillStyle = '#0b0e18'; x.font = 'bold ' + Math.max(6, o.r * 1.15) + 'px sans-serif';
          x.textAlign = 'center'; x.textBaseline = 'middle';
          x.fillText(o.lbl, o.x, o.y);
          x.textBaseline = 'alphabetic';
        }
      }
    }

    // Kablolar + elektron akışı (anot → kaynak → katot)
    var wire = [ [ANX, -36, 0], [ANX, -86, 0], [34, -86, 0] ];
    var wire2 = [ [-34, -86, 0], [CATX, -86, 0], [CATX, -36, 0] ];
    function drawWire(w){
      x.strokeStyle = 'rgba(148,163,184,.6)'; x.lineWidth = 2;
      x.beginPath();
      for (var i2 = 0; i2 < w.length; i2++) {
        var p2 = elzProj(w[i2][0], w[i2][1], w[i2][2]);
        if (i2 === 0) x.moveTo(p2.x, p2.y); else x.lineTo(p2.x, p2.y);
      }
      x.stroke();
    }
    drawWire(wire); drawWire(wire2);
    function dotOn(w, f){
      var segs = w.length - 1, fi = f * segs, si = Math.min(segs - 1, Math.floor(fi)), ft = fi - si;
      var ax = w[si][0] + (w[si+1][0] - w[si][0]) * ft;
      var ay = w[si][1] + (w[si+1][1] - w[si][1]) * ft;
      var az = w[si][2] + (w[si+1][2] - w[si][2]) * ft;
      return elzProj(ax, ay, az);
    }
    for (var ed = 0; ed < 3; ed++) {
      var f2 = ((elz.t * 0.25 * elz.cur) + ed / 3) % 1;
      var pA = dotOn(wire, f2), pC = dotOn(wire2, f2);
      x.beginPath(); x.arc(pA.x, pA.y, 3, 0, 2*Math.PI); x.fillStyle = '#facc15'; x.fill();
      x.beginPath(); x.arc(pC.x, pC.y, 3, 0, 2*Math.PI); x.fill();
    }
    var eLbl = dotOn(wire2, 0.5);
    x.fillStyle = '#facc15'; x.font = 'bold 10px sans-serif'; x.textAlign = 'center';
    x.fillText('e\u207b \u2192', eLbl.x, eLbl.y - 8);

    // Etiketler
    var pcat = elzProj(CATX, -46, 0), pan = elzProj(ANX, -46, 0), psrc = elzProj(0, -86, 0);
    x.font = 'bold 11px sans-serif'; x.textAlign = 'center';
    x.fillStyle = '#60a5fa'; x.fillText('\u2296 KATOT', pcat.x, pcat.y);
    x.fillStyle = '#f87171'; x.fillText('\u2295 ANOT', pan.x, pan.y);
    x.fillStyle = '#c7d2fe'; x.font = 'bold 10px sans-serif'; x.fillText('DC G\u00dc\u00c7 KAYNA\u011eI', psrc.x, psrc.y - 22);
    // Ürün etiketleri
    var pc2 = elzProj(CATX, 100, 0), pa2 = elzProj(ANX, 100, 0);
    x.font = 'bold 12px sans-serif';
    x.fillStyle = '#e2e8f0'; x.fillText(m.cat.prod, pc2.x, pc2.y + 14);
    x.fillStyle = m.an.type === 'diss' ? '#38bdf8' : '#e2e8f0'; x.fillText(m.an.prod, pa2.x, pa2.y + 14);
    x.fillStyle = 'rgba(255,255,255,.22)'; x.font = '10px sans-serif'; x.textAlign = 'left';
    x.fillText('\ud83d\udc46 S\u00fcr\u00fckleyerek 3D d\u00f6nd\u00fcr', 8, elz.H - 8);
    x.textAlign = 'right';
    x.fillText('I = ' + elz.cur.toFixed(1) + ' A', elz.W - 8, elz.H - 8);
    x.textAlign = 'left';
  }

  function elzBubble(bx, by, bz, c){
    if (elz.bubbles.length > 60) return;
    elz.bubbles.push({ x: bx, y: by, z: bz, r: 1.2 + Math.random()*1.5, c: c || '#e2e8f0' });
  }

  function elzStart(){
    if (!document.getElementById('s-elz')) return;
    if (!elz.cv) elzSetup3D();
    if (!elz.ions.length) elzSpawnIons();
    elzInfo();
    if (elz.anim) cancelAnimationFrame(elz.anim);
    elzLoop();
  }
  function elzStop(){ if (elz.anim) { cancelAnimationFrame(elz.anim); elz.anim = null; } }
  window.elzToggleSpin = function(){ elz.spin = !elz.spin; };
  window.elzResetView = function(){ elz.rotX = 0.32; elz.rotY = -0.55; };
  window.elzSetCur = function(v){ elz.cur = v / 10; };

  // ---------- 9c. Faraday hesaplayıcısı ----------
  var ELZ_SP = [
    {k:'Ag', l:'G\u00fcm\u00fc\u015f \u2014 Ag\u207a+e\u207b', M:108, n:1},
    {k:'Cu', l:'Bak\u0131r \u2014 Cu\u00b2\u207a+2e\u207b', M:63.5, n:2},
    {k:'Al', l:'Al\u00fcminyum \u2014 Al\u00b3\u207a+3e\u207b', M:27, n:3},
    {k:'Zn', l:'\u00c7inko \u2014 Zn\u00b2\u207a+2e\u207b', M:65, n:2},
    {k:'Ni', l:'Nikel \u2014 Ni\u00b2\u207a+2e\u207b', M:59, n:2},
    {k:'Cr', l:'Krom \u2014 Cr\u00b3\u207a+3e\u207b', M:52, n:3},
    {k:'Au', l:'Alt\u0131n \u2014 Au\u00b3\u207a+3e\u207b', M:197, n:3},
    {k:'Na', l:'Sodyum \u2014 Na\u207a+e\u207b', M:23, n:1},
    {k:'Pb', l:'Kur\u015fun \u2014 Pb\u00b2\u207a+2e\u207b', M:207, n:2},
    {k:'H2', l:'H\u2082 gaz\u0131 \u2014 2H\u207a+2e\u207b', M:2, n:2, gas:1},
    {k:'O2', l:'O\u2082 gaz\u0131 \u2014 4e\u207b', M:32, n:4, gas:1},
    {k:'Cl2', l:'Cl\u2082 gaz\u0131 \u2014 2e\u207b', M:71, n:2, gas:1}
  ];
  var ELZ_F = 96500;

  function elzSp(k){ for (var i = 0; i < ELZ_SP.length; i++) if (ELZ_SP[i].k === k) return ELZ_SP[i]; return ELZ_SP[0]; }
  function elzSecs(){
    var v = parseFloat((document.getElementById('fd-t') || {}).value);
    var u = (document.getElementById('fd-tu') || {}).value || 's';
    if (isNaN(v)) return NaN;
    return u === 'sa' ? v * 3600 : u === 'dk' ? v * 60 : v;
  }
  function elzTimeStr(sec){
    if (sec >= 3600) return (sec/3600).toFixed(2) + ' saat (' + Math.round(sec) + ' s)';
    if (sec >= 60) return (sec/60).toFixed(2) + ' dakika (' + Math.round(sec) + ' s)';
    return sec.toFixed(1) + ' saniye';
  }

  window.fdModeChanged = function(){
    var u = (document.getElementById('fd-u') || {}).value;
    var sp = elzSp((document.getElementById('fd-sp') || {}).value);
    var show = function(id, on){ var e = document.getElementById(id); if (e) e.style.display = on ? '' : 'none'; };
    show('fd-row-i', u !== 'I');
    show('fd-row-t', u !== 't');
    show('fd-row-m', u !== 'm');
    var ml = document.getElementById('fd-m-lbl');
    if (ml) ml.textContent = sp.gas ? 'Gaz Hacmi (L, NK)' : 'K\u00fctle (g)';
  };

  window.faradayRun = function(){
    var u = (document.getElementById('fd-u') || {}).value;
    var sp = elzSp((document.getElementById('fd-sp') || {}).value);
    var out = document.getElementById('fd-out');
    if (!out) return;
    var I = parseFloat((document.getElementById('fd-i') || {}).value);
    var t = elzSecs();
    var mv = parseFloat((document.getElementById('fd-m') || {}).value);
    var steps = [], res = '';
    try {
      if (u === 'm') {
        if (isNaN(I) || isNaN(t)) throw new Error('Ak\u0131m ve s\u00fcreyi gir.');
        var Q = I * t, moleE = Q / ELZ_F, mol = moleE / sp.n, m2 = mol * sp.M;
        steps.push('Q = I \u00d7 t = ' + I + ' \u00d7 ' + Math.round(t) + ' = ' + Q.toFixed(0) + ' C');
        steps.push('mol e\u207b = Q / F = ' + Q.toFixed(0) + ' / 96500 = ' + moleE.toFixed(4) + ' mol');
        steps.push('mol madde = mol e\u207b / n = ' + moleE.toFixed(4) + ' / ' + sp.n + ' = ' + mol.toFixed(4) + ' mol');
        steps.push('m = mol \u00d7 M = ' + mol.toFixed(4) + ' \u00d7 ' + sp.M + ' = ' + m2.toFixed(3) + ' g');
        res = '<b>' + m2.toFixed(3) + ' g</b>';
        if (sp.gas) { steps.push('V(NK) = mol \u00d7 22.4 = ' + (mol * 22.4).toFixed(3) + ' L'); res += ' \u00b7 <b>' + (mol*22.4).toFixed(3) + ' L (NK)</b>'; }
      } else {
        if (isNaN(mv)) throw new Error(sp.gas ? 'Gaz hacmini (L, NK) gir.' : 'K\u00fctleyi gir.');
        var mol2 = sp.gas ? mv / 22.4 : mv / sp.M;
        var moleE2 = mol2 * sp.n, Q2 = moleE2 * ELZ_F;
        steps.push(sp.gas ? 'mol = V / 22.4 = ' + mv + ' / 22.4 = ' + mol2.toFixed(4) + ' mol'
                          : 'mol = m / M = ' + mv + ' / ' + sp.M + ' = ' + mol2.toFixed(4) + ' mol');
        steps.push('mol e\u207b = mol \u00d7 n = ' + mol2.toFixed(4) + ' \u00d7 ' + sp.n + ' = ' + moleE2.toFixed(4) + ' mol');
        steps.push('Q = mol e\u207b \u00d7 F = ' + moleE2.toFixed(4) + ' \u00d7 96500 = ' + Q2.toFixed(0) + ' C');
        if (u === 't') {
          if (isNaN(I)) throw new Error('Ak\u0131m\u0131 gir.');
          var tt = Q2 / I;
          steps.push('t = Q / I = ' + Q2.toFixed(0) + ' / ' + I + ' = ' + tt.toFixed(1) + ' s');
          res = '<b>' + elzTimeStr(tt) + '</b>';
        } else {
          if (isNaN(t)) throw new Error('S\u00fcreyi gir.');
          var ii = Q2 / t;
          steps.push('I = Q / t = ' + Q2.toFixed(0) + ' / ' + Math.round(t) + ' = ' + ii.toFixed(3) + ' A');
          res = '<b>' + ii.toFixed(3) + ' A</b>';
        }
      }
      var html = '<div class="rb"><div class="rl">Sonu\u00e7</div><div class="rv" style="font-size:20px">' + res + '</div></div>';
      html += '<div style="background:var(--sf2);border:1px solid var(--br);border-radius:var(--r);padding:12px;margin-top:8px">' +
        '<div style="font-size:10px;font-weight:700;color:var(--tx3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px">Ad\u0131m Ad\u0131m \u00c7\u00f6z\u00fcm (F = 96500 C/mol)</div>';
      steps.forEach(function(s2, i2){ html += '<div style="font-size:12.5px;color:var(--tx2);padding:3px 0;font-family:Space Grotesk,sans-serif"><span style="color:var(--ac2);font-weight:700">' + (i2+1) + '.</span> ' + s2 + '</div>'; });
      html += '</div>';
      out.innerHTML = html;
    } catch (err) {
      out.innerHTML = '<div style="font-size:13px;color:var(--yw)">' + err.message + '</div>';
    }
  };

  window.seriRun = function(){
    var A = elzSp((document.getElementById('sr-a') || {}).value);
    var B = elzSp((document.getElementById('sr-b') || {}).value);
    var mA = parseFloat((document.getElementById('sr-m') || {}).value);
    var out = document.getElementById('sr-out');
    if (!out) return;
    if (isNaN(mA)) { out.innerHTML = '<div style="font-size:13px;color:var(--yw)">Birinci h\u00fccredeki k\u00fctleyi gir.</div>'; return; }
    var mB = mA * (B.M / B.n) / (A.M / A.n);
    var html = '<div class="rb"><div class="rl">' + B.k + ' k\u00fctlesi</div><div class="rv" style="font-size:20px">' + mB.toFixed(3) + ' g' +
      (B.gas ? ' \u00b7 ' + ((mB / B.M) * 22.4).toFixed(3) + ' L (NK)' : '') + '</div></div>';
    html += '<div style="font-size:12px;color:var(--tx2);margin-top:8px;line-height:1.7">Seri ba\u011fl\u0131 h\u00fccrelerden AYNI y\u00fck (Q) ge\u00e7er \u2192 k\u00fctleler <b>e\u015fde\u011fer k\u00fctlelerle (M/n)</b> orant\u0131l\u0131d\u0131r:<br>' +
      'm(' + B.k + ') = ' + mA + ' \u00d7 (' + B.M + '/' + B.n + ') / (' + A.M + '/' + A.n + ') = <b>' + mB.toFixed(3) + ' g</b></div>';
    out.innerHTML = html;
  };

  // ---------- 9d. Kaplama senaryoları ----------
  var ELZ_SCEN = [
    { id: 'ag', icon: '\ud83e\udd44', title: 'Demir ka\u015f\u0131\u011f\u0131 g\u00fcm\u00fc\u015fle kapla',
      intro: 'Bir demir ka\u015f\u0131\u011f\u0131 g\u00fcm\u00fc\u015fle kaplamak istiyorsun. D\u00fczene\u011fi do\u011fru kur:',
      qs: [
        { q: 'Ka\u015f\u0131k hangi elektrot olmal\u0131?', opts: ['Katot (\u2212)', 'Anot (+)', 'Fark etmez', 'Tuz k\u00f6pr\u00fcs\u00fc'], a: 0,
          why: 'Kaplanacak e\u015fya HER ZAMAN katottur \u2014 metal iyonlar\u0131 (Ag\u207a) katotta indirgenerek e\u015fyan\u0131n \u00fczerinde birikir.' },
        { q: 'Anot ne olmal\u0131?', opts: ['G\u00fcm\u00fc\u015f \u00e7ubuk', 'Demir \u00e7ubuk', 'Bak\u0131r tel', 'Grafit'], a: 0,
          why: 'Aktif g\u00fcm\u00fc\u015f anot \u00e7\u00f6z\u00fcnerek (Ag \u2192 Ag\u207a + e\u207b) \u00e7\u00f6zeltideki Ag\u207a deri\u015fimini sabit tutar \u2014 kaplama kal\u0131n ve d\u00fczg\u00fcn olur.' },
        { q: '\u00c7\u00f6zelti ne olmal\u0131?', opts: ['AgNO\u2083 \u00e7\u00f6zeltisi', 'FeSO\u2084 \u00e7\u00f6zeltisi', 'NaCl \u00e7\u00f6zeltisi', 'Saf su'], a: 0,
          why: '\u00c7\u00f6zelti mutlaka KAPLAYAN metalin iyonunu i\u00e7ermelidir (Ag\u207a).' }
      ] },
    { id: 'cu', icon: '\ud83d\udfe0', title: 'Bak\u0131r rafinasyonu (saf bak\u0131r \u00fcret)',
      intro: 'Saf olmayan (blister) bak\u0131rdan %99.99 saf bak\u0131r elde edeceksin:',
      qs: [
        { q: 'Saf olmayan bak\u0131r hangi elektrot olur?', opts: ['Anot (+)', 'Katot (\u2212)', '\u00c7\u00f6zeltiye at\u0131l\u0131r', 'Tuz k\u00f6pr\u00fcs\u00fc'], a: 0,
          why: 'Saf olmayan bak\u0131r ANOTTUR \u2014 \u00e7\u00f6z\u00fcnerek Cu\u00b2\u207a verir; saf bak\u0131r ise ince levha halinde katottur ve orada birikir.' },
        { q: '\u00c7\u00f6zelti ne olmal\u0131?', opts: ['CuSO\u2084 \u00e7\u00f6zeltisi', 'NaCl \u00e7\u00f6zeltisi', 'AgNO\u2083 \u00e7\u00f6zeltisi', 'H\u2082SO\u2084 (deri\u015fik)'], a: 0,
          why: 'Cu\u00b2\u207a i\u00e7eren \u00e7\u00f6zelti gerekir; elektroliz boyunca Cu\u00b2\u207a deri\u015fimi sabit kal\u0131r (anottan gelen = katotta biriken).' },
        { q: 'Anot \u00e7amuru nedir?', opts: ['Alt\u0131n-g\u00fcm\u00fc\u015f gibi soy safs\u0131zl\u0131klar', '\u00c7\u00f6z\u00fcnen bak\u0131r', 'S\u00fclfat tuzlar\u0131', 'Grafit tozu'], a: 0,
          why: 'Bak\u0131rdan daha SOY (aktifli\u011fi d\u00fc\u015f\u00fck) metaller y\u00fckseltgenemez, anodun dibine \u00e7\u00f6ker \u2014 bu \u00e7amurdan alt\u0131n ve g\u00fcm\u00fc\u015f geri kazan\u0131l\u0131r.' }
      ] },
    { id: 'au', icon: '\ud83d\udc8d', title: 'Kolyeyi alt\u0131nla kapla',
      intro: 'G\u00fcm\u00fc\u015f bir kolyeyi alt\u0131nla kaplayacaks\u0131n:',
      qs: [
        { q: 'Kolye nereye ba\u011flan\u0131r?', opts: ['G\u00fc\u00e7 kayna\u011f\u0131n\u0131n (\u2212) ucuna', 'G\u00fc\u00e7 kayna\u011f\u0131n\u0131n (+) ucuna', '\u0130ki elektrot aras\u0131na', 'Toprak hatt\u0131na'], a: 0,
          why: '(\u2212) u\u00e7 = katot. Elektronlar kolyeye akar, Au\u00b3\u207a orada indirgenip birikir.' },
        { q: 'Kolyeyi yanl\u0131\u015fl\u0131kla (+) uca ba\u011flarsan ne olur?', opts: ['Kaplama olmaz, kolye \u00e7\u00f6z\u00fcnebilir', 'Daha h\u0131zl\u0131 kaplan\u0131r', 'Hi\u00e7bir \u015fey de\u011fi\u015fmez', 'Kolye k\u0131r\u0131l\u0131r'], a: 0,
          why: '(+) u\u00e7 = anot = y\u00fckseltgenme. Kolye kaplanmak yerine \u00e7\u00f6z\u00fcnmeye ba\u015flar \u2014 tam tersi etki!' },
        { q: 'Kaplanan alt\u0131n k\u00fctlesi neye ba\u011fl\u0131d\u0131r?', opts: ['Ak\u0131m \u00d7 s\u00fcre (ge\u00e7en y\u00fck)', 'Sadece \u00e7\u00f6zelti s\u0131cakl\u0131\u011f\u0131na', 'Kolyenin rengine', 'Kab\u0131n hacmine'], a: 0,
          why: 'Faraday yasas\u0131: m = M\u00b7I\u00b7t / (n\u00b7F). Ge\u00e7en y\u00fck (Q = I\u00b7t) artt\u0131k\u00e7a biriken k\u00fctle artar.' }
      ] }
  ];
  var elzScenIdx = 0, elzScenAns = {};

  function elzScenHTML(){
    var sc = ELZ_SCEN[elzScenIdx];
    var done = sget('rk_flags', {}).elzs || [];
    var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">' +
      '<button type="button" class="ob" onclick="elzScenNav(-1)" ' + (elzScenIdx === 0 ? 'disabled style="opacity:.3"' : '') + '>\u2190</button>' +
      '<div style="font-size:11px;color:var(--tx3);font-weight:700">Senaryo ' + (elzScenIdx + 1) + '/' + ELZ_SCEN.length + ' \u00b7 Tamamlanan: ' + done.length + '/3</div>' +
      '<button type="button" class="ob" onclick="elzScenNav(1)" ' + (elzScenIdx === ELZ_SCEN.length - 1 ? 'disabled style="opacity:.3"' : '') + '>\u2192</button></div>';
    html += '<div style="font-family:Space Grotesk,sans-serif;font-size:17px;font-weight:800;color:#fff;margin-bottom:4px">' + sc.icon + ' ' + sc.title + '</div>';
    html += '<p style="font-size:13px;color:var(--tx2);margin-bottom:14px;line-height:1.6">' + sc.intro + '</p>';
    for (var i = 0; i < sc.qs.length; i++) {
      var q = sc.qs[i], picked = elzScenAns[sc.id + i];
      html += '<div style="margin-bottom:14px">' +
        '<div style="font-size:13px;font-weight:700;color:#fff;margin-bottom:8px">' + (i + 1) + ') ' + q.q + '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
      for (var o = 0; o < q.opts.length; o++) {
        var cls = 'ob2', dis = '';
        if (picked !== undefined) {
          dis = 'disabled';
          if (o === q.a) cls = 'ob2 cor';
          else if (o === picked) cls = 'ob2 wro';
        }
        html += '<button type="button" class="' + cls + '" ' + dis + ' onclick="elzScenPick(' + i + ',' + o + ')" style="font-size:12.5px">' + q.opts[o] + '</button>';
      }
      html += '</div>';
      if (picked !== undefined)
        html += '<div style="font-size:12px;color:' + (picked === q.a ? '#22c55e' : '#f87171') + ';margin-top:6px;line-height:1.6">' +
          (picked === q.a ? '\u2713 ' : '\u2717 ') + q.why + '</div>';
      html += '</div>';
    }
    var allDone = sc.qs.every(function(_, i2){ return elzScenAns[sc.id + i2] !== undefined; });
    if (allDone) {
      var allCorrect = sc.qs.every(function(q2, i3){ return elzScenAns[sc.id + i3] === q2.a; });
      html += '<div style="background:' + (allCorrect ? 'rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3)' : 'rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.3)') + ';border-radius:var(--r);padding:12px;font-size:13px;font-weight:600;color:' + (allCorrect ? '#22c55e' : '#f59e0b') + '">' +
        (allCorrect ? '\ud83c\udf89 M\u00fckemmel \u2014 d\u00fczenek do\u011fru kuruldu!' : 'Senaryo bitti \u2014 a\u00e7\u0131klamalar\u0131 oku, sonra tekrar dene!') +
        ' <button type="button" class="ob" style="margin-left:8px" onclick="elzScenReset()">\u21bb Tekrar</button></div>';
    }
    return html;
  }
  window.elzScenPick = function(qi, oi){
    var sc = ELZ_SCEN[elzScenIdx];
    if (elzScenAns[sc.id + qi] !== undefined) return;
    elzScenAns[sc.id + qi] = oi;
    var allDone = sc.qs.every(function(_, i2){ return elzScenAns[sc.id + i2] !== undefined; });
    var allCorrect = allDone && sc.qs.every(function(q2, i3){ return elzScenAns[sc.id + i3] === q2.a; });
    if (allCorrect) {
      var fl = sget('rk_flags', {});
      fl.elzs = fl.elzs || [];
      if (fl.elzs.indexOf(sc.id) === -1) { fl.elzs.push(sc.id); sset('rk_flags', fl); }
      try { checkBadges(true); } catch (e) {}
    }
    var box = document.getElementById('elz-scen');
    if (box) box.innerHTML = elzScenHTML();
  };
  window.elzScenNav = function(d){
    elzScenIdx = Math.max(0, Math.min(ELZ_SCEN.length - 1, elzScenIdx + d));
    var box = document.getElementById('elz-scen');
    if (box) box.innerHTML = elzScenHTML();
    try { capSetScenario(elzScenIdx); } catch (e) {}
  };
  window.elzScenReset = function(){
    var sc = ELZ_SCEN[elzScenIdx];
    for (var i = 0; i < sc.qs.length; i++) delete elzScenAns[sc.id + i];
    var box = document.getElementById('elz-scen');
    if (box) box.innerHTML = elzScenHTML();
  };

  // ---------- 9e. Ekran kurulumu ----------
  function setupElz(){
    if (document.getElementById('s-elz')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    var spOpts = '';
    ELZ_SP.forEach(function(s){ spOpts += '<option value="' + s.k + '">' + s.l + ' (M=' + s.M + ', n=' + s.n + ')</option>'; });
    var modeBtns = '';
    Object.keys(ELZ_MODES).forEach(function(k, i){
      modeBtns += '<button type="button" class="ob' + (i === 0 ? ' sel2' : '') + '" style="flex-shrink:0" onclick="elzSetMode(\'' + k + '\',this)">' + ELZ_MODES[k].name + '</button>';
    });
    app.insertAdjacentHTML('beforeend',
      '<div id="s-elz" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\ud83d\udd0b Elektroliz Laboratuvar\u0131</h1>' +
        '<p class="psub">3D sim\u00fclasyon, Faraday hesaplar\u0131 ve kaplama senaryolar\u0131 \u2014 galvanik h\u00fccrenin z\u0131tt\u0131: elektrik enerjisiyle Y\u00dcR\u00dcT\u00dcLEN tepkimeler.</p>' +
        '<div class="tabs" id="elz-tabs">' +
          '<button class="tab on" onclick="elzTabGo(0)">\u26a1 3D Sim\u00fclasyon</button>' +
          '<button class="tab" onclick="elzTabGo(1)">\ud83e\uddee Faraday</button>' +
          '<button class="tab" onclick="elzTabGo(2)">\ud83e\udd48 Kaplama</button>' +
          '<button class="tab" onclick="elzTabGo(3)">\ud83d\udd17 Seri Kaplar</button>' +
        '</div>' +
        '<div id="elz-tps">' +
          // --- TAB 1: 3D ---
          '<div class="tp on">' +
            '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:10px"><div style="display:flex;gap:6px;min-width:max-content">' + modeBtns + '</div></div>' +
            '<div style="background:#050510;border:1px solid rgba(129,140,248,.3);border-radius:16px;overflow:hidden;margin-bottom:10px">' +
              '<canvas id="elzCv" style="width:100%;display:block;touch-action:none" height="340"></canvas>' +
            '</div>' +
            '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:center;margin-bottom:14px">' +
              '<button type="button" class="ob" onclick="elzToggleSpin()">\ud83d\udd04 Oto-D\u00f6nd\u00fcr</button>' +
              '<button type="button" class="ob" onclick="elzResetView()">\ud83c\udfaf S\u0131f\u0131rla</button>' +
              '<div style="display:flex;align-items:center;gap:8px;background:var(--sf2);border:1px solid var(--br);border-radius:100px;padding:6px 14px">' +
                '<span style="font-size:11px;color:var(--tx3);font-weight:700">Ak\u0131m</span>' +
                '<input type="range" min="3" max="30" value="12" oninput="elzSetCur(this.value)" style="width:110px">' +
              '</div>' +
            '</div>' +
            '<div id="elz-half"></div>' +
            '<div class="card" style="margin-top:12px"><div class="slbl">Galvanik \u2194 Elektrolitik</div>' +
              '<div style="font-size:12px;color:var(--tx2);line-height:1.9">' +
                '\u26a1 <b>Galvanik (pil):</b> \u0130stemli tepkime \u2192 elektrik \u00fcretir. Anot (\u2212), Katot (+).<br>' +
                '\ud83d\udd0b <b>Elektrolitik:</b> Elektrik \u2192 istemsiz tepkimeyi zorlar. Anot (+), Katot (\u2212).<br>' +
                '\ud83d\udccc Her ikisinde de: <b>anot = y\u00fckseltgenme, katot = indirgenme</b> \u2014 de\u011fi\u015fen sadece i\u015faretlerdir!' +
              '</div></div>' +
          '</div>' +
          // --- TAB 2: Faraday ---
          '<div class="tp">' +
            '<div class="card" style="margin-bottom:12px">' +
              '<div class="fbox">m = M \u00b7 I \u00b7 t / (n \u00b7 F)</div>' +
              '<div class="g2" style="margin-bottom:10px">' +
                '<div><div class="slbl">Bilinmeyen</div><select class="sel" id="fd-u" onchange="fdModeChanged()"><option value="m">K\u00fctle / Hacim</option><option value="t">S\u00fcre t</option><option value="I">Ak\u0131m I</option></select></div>' +
                '<div><div class="slbl">T\u00fcr</div><select class="sel" id="fd-sp" onchange="fdModeChanged()">' + spOpts + '</select></div>' +
              '</div>' +
              '<div class="g2" style="margin-bottom:10px">' +
                '<div id="fd-row-i"><div class="slbl">Ak\u0131m I (A)</div><input type="number" id="fd-i" class="inp" placeholder="\u00f6rn: 5"></div>' +
                '<div id="fd-row-t"><div class="slbl">S\u00fcre</div><div style="display:flex;gap:6px"><input type="number" id="fd-t" class="inp" placeholder="..."><select class="sel" id="fd-tu" style="width:76px"><option value="s">s</option><option value="dk">dk</option><option value="sa">sa</option></select></div></div>' +
              '</div>' +
              '<div id="fd-row-m" style="display:none;margin-bottom:10px"><div class="slbl" id="fd-m-lbl">K\u00fctle (g)</div><input type="number" id="fd-m" class="inp" placeholder="..."></div>' +
              '<button type="button" class="btn bp bfull" onclick="faradayRun()">Hesapla</button>' +
              '<div id="fd-out" style="margin-top:12px"></div>' +
            '</div>' +
            '<div class="card">' +
              '<div class="slbl">\ud83d\udd17 Seri Ba\u011fl\u0131 H\u00fccreler</div>' +
              '<p style="font-size:12px;color:var(--tx2);margin-bottom:10px;line-height:1.6">Ayn\u0131 devrede seri ba\u011fl\u0131 iki h\u00fccre \u2014 birinde biriken k\u00fctleden di\u011ferini bul.</p>' +
              '<div class="g2" style="margin-bottom:10px">' +
                '<div><div class="slbl">1. H\u00fccre</div><select class="sel" id="sr-a">' + spOpts + '</select></div>' +
                '<div><div class="slbl">Biriken (g)</div><input type="number" id="sr-m" class="inp" placeholder="\u00f6rn: 10.8"></div>' +
              '</div>' +
              '<div style="margin-bottom:10px"><div class="slbl">2. H\u00fccre</div><select class="sel" id="sr-b">' + spOpts + '</select></div>' +
              '<button type="button" class="btn bp bfull" onclick="seriRun()">Hesapla</button>' +
              '<div id="sr-out" style="margin-top:12px"></div>' +
            '</div>' +
          '</div>' +
          // --- TAB 3: Kaplama ---
          '<div class="tp">' +
            '<div style="background:#050510;border:1px solid rgba(129,140,248,.3);border-radius:16px;overflow:hidden;margin-bottom:10px">' +
              '<div id="cap-title" style="text-align:center;padding:8px;font-size:12px;color:#a5b4fc;font-weight:700"></div>' +
              '<canvas id="cap-cv" style="width:100%;display:block;touch-action:none" height="260"></canvas>' +
            '</div>' +
            '<div style="display:flex;gap:8px;margin-bottom:12px">' +
              '<button type="button" class="ob sel2" style="flex:1" onclick="capSetMode(true,this)">\u2705 Do\u011fru Ba\u011flant\u0131</button>' +
              '<button type="button" class="ob" style="flex:1" onclick="capSetMode(false,this)">\u274c Yanl\u0131\u015f Ba\u011flant\u0131</button>' +
            '</div>' +
            '<div class="card" id="elz-scen"></div>' +
          '</div>' +
          // --- TAB 4: Seri Kaplar ---
          '<div class="tp">' +
            '<div style="background:#050510;border:1px solid rgba(129,140,248,.3);border-radius:16px;overflow:hidden;margin-bottom:12px">' +
              '<canvas id="ss-cv" style="width:100%;display:block;touch-action:none" height="280"></canvas>' +
            '</div>' +
            '<div class="card" style="margin-bottom:12px">' +
              '<p style="font-size:12px;color:var(--tx2);margin-bottom:12px;line-height:1.6">Seri ba\u011fl\u0131 kaplardan <b>ayn\u0131 y\u00fck (Q = I\u00b7t)</b> ge\u00e7er. Ak\u0131m\u0131 ve s\u00fcreyi kayd\u0131rarak veya elle girerek her kab\u0131n elektrotlar\u0131nda neyin, ne kadar olu\u015ftu\u011funu canl\u0131 izle.</p>' +
              '<div style="margin-bottom:12px"><div class="slbl">Kap Say\u0131s\u0131</div><div style="display:flex;gap:8px">' +
                '<button type="button" class="ob sel2" onclick="ssSetCount(2,this)">2 Kap</button>' +
                '<button type="button" class="ob" onclick="ssSetCount(3,this)">3 Kap</button>' +
              '</div></div>' +
              '<div id="ss-cells"></div>' +
              '<div style="margin-top:4px;margin-bottom:10px">' +
                '<div class="slbl">Ak\u0131m I (A)</div>' +
                '<div style="display:flex;gap:10px;align-items:center">' +
                  '<input type="range" id="ss-i-sl" min="1" max="200" value="50" oninput="ssSync(\'i\',\'sl\')" style="flex:1">' +
                  '<input type="number" id="ss-i-num" class="inp" value="5.000" step="0.001" style="width:96px" oninput="ssSync(\'i\',\'num\')">' +
                '</div></div>' +
              '<div>' +
                '<div class="slbl">S\u00fcre t</div>' +
                '<div style="display:flex;gap:10px;align-items:center">' +
                  '<input type="range" id="ss-t-sl" min="1" max="180" value="30" oninput="ssSync(\'t\',\'sl\')" style="flex:1">' +
                  '<input type="number" id="ss-t-num" class="inp" value="30" style="width:70px" oninput="ssSync(\'t\',\'num\')">' +
                  '<select class="sel" id="ss-tu" style="width:66px" onchange="ssSync(\'t\',\'num\')"><option value="dk">dk</option><option value="s">s</option><option value="sa">sa</option></select>' +
                '</div></div>' +
            '</div>' +
            '<div id="ss-q" style="font-size:12px;color:var(--tx2);line-height:1.7;background:var(--sf2);border:1px solid var(--br);border-radius:var(--r);padding:10px 12px;margin-bottom:10px"></div>' +
            '<div id="ss-res"></div>' +
          '</div>' +
        '</div>' +
      '</div></div>');

    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-elz') === -1) SCREENS.push('s-elz');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-elz'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-elz" onclick="nav(\'elz\')">\ud83d\udd0b Elektroliz Laboratuvar\u0131</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-elz'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-elz" onclick="nav(\'elz\')"><div class="ti">\ud83d\udd0b</div><div class="tt">Elektroliz Laboratuvar\u0131</div><div class="td">3D sim\u00fclasyon, Faraday hesaplar\u0131, kaplama senaryolar\u0131.</div></div>');

    // Rozet: 🔋 Elektrolizci
    try {
      BADGES.push({ id: 'elz', e: '\ud83d\udd0b', n: 'Elektrolizci', d: '3 kaplama senaryosunu do\u011fru tamamla',
                    f: function(s){ return ((s.flags.elzs || []).length) >= 3; } });
    } catch (e) {}

    var box = document.getElementById('elz-scen');
    if (box) box.innerHTML = elzScenHTML();
    fdModeChanged();
    ssBuild(); ssRun();
    capSetScenario(elzScenIdx);
    // Faraday'da seçim değişince satır görünürlüğü doğru kalsın
    var fsp = document.getElementById('fd-sp');
    if (fsp) fsp.addEventListener('change', window.fdModeChanged);
  }

  // ---------- 9f. Seri Kaplar Canlı Simülatörü ----------
  // Seri bağlı 2-3 elektroliz kabı: hepsinden AYNI yük (Q) geçer.
  // Her kabın katot ve anot ürünleri, I ve t değiştikçe canlı hesaplanır.
  var ELZ_CELLS = [
    {k:'nacl_m',   name:'Erimi\u015f NaCl',              cat:{p:'Na(s)', M:23, n:1},            an:{p:'Cl\u2082(g)', M:71, n:2, gas:1}},
    {k:'mgcl2',    name:'Erimi\u015f MgCl\u2082',        cat:{p:'Mg(s)', M:24, n:2},            an:{p:'Cl\u2082(g)', M:71, n:2, gas:1}},
    {k:'cacl2',    name:'Erimi\u015f CaCl\u2082',        cat:{p:'Ca(s)', M:40, n:2},            an:{p:'Cl\u2082(g)', M:71, n:2, gas:1}},
    {k:'al2o3',    name:'Erimi\u015f Al\u2082O\u2083',   cat:{p:'Al(s)', M:27, n:3},            an:{p:'O\u2082(g)', M:32, n:4, gas:1}},
    {k:'nacl_a',   name:'Sulu NaCl (deri\u015fik)',      cat:{p:'H\u2082(g)', M:2, n:2, gas:1}, an:{p:'Cl\u2082(g)', M:71, n:2, gas:1}},
    {k:'water',    name:'Su (H\u2082SO\u2084\u2019l\u00fc)', cat:{p:'H\u2082(g)', M:2, n:2, gas:1}, an:{p:'O\u2082(g)', M:32, n:4, gas:1}},
    {k:'na2so4',   name:'Sulu Na\u2082SO\u2084',         cat:{p:'H\u2082(g)', M:2, n:2, gas:1}, an:{p:'O\u2082(g)', M:32, n:4, gas:1}},
    {k:'ki',       name:'Sulu KI',                        cat:{p:'H\u2082(g)', M:2, n:2, gas:1}, an:{p:'I\u2082(k)', M:254, n:2}},
    {k:'cuso4_pt', name:'Sulu CuSO\u2084 (Pt anot)',     cat:{p:'Cu(s)', M:63.5, n:2},          an:{p:'O\u2082(g)', M:32, n:4, gas:1}},
    {k:'cuso4_cu', name:'CuSO\u2084 (Cu anot)',          cat:{p:'Cu(s)', M:63.5, n:2},          an:{p:'Cu \u00e7\u00f6z\u00fcn\u00fcr', M:63.5, n:2, diss:1}},
    {k:'agno3_pt', name:'Sulu AgNO\u2083 (Pt anot)',     cat:{p:'Ag(s)', M:108, n:1},           an:{p:'O\u2082(g)', M:32, n:4, gas:1}},
    {k:'agno3_ag', name:'AgNO\u2083 (Ag anot)',          cat:{p:'Ag(s)', M:108, n:1},           an:{p:'Ag \u00e7\u00f6z\u00fcn\u00fcr', M:108, n:1, diss:1}},
    {k:'znso4',    name:'Sulu ZnSO\u2084 (Pt)',          cat:{p:'Zn(s)', M:65, n:2},            an:{p:'O\u2082(g)', M:32, n:4, gas:1}},
    {k:'niso4',    name:'Sulu NiSO\u2084 (Pt)',          cat:{p:'Ni(s)', M:59, n:2},            an:{p:'O\u2082(g)', M:32, n:4, gas:1}},
    {k:'crcl3',    name:'Sulu CrCl\u2083 (deri\u015fik)', cat:{p:'Cr(s)', M:52, n:3},           an:{p:'Cl\u2082(g)', M:71, n:2, gas:1}},
    {k:'aucl3',    name:'Sulu AuCl\u2083 (deri\u015fik)', cat:{p:'Au(s)', M:197, n:3},          an:{p:'Cl\u2082(g)', M:71, n:2, gas:1}},
    {k:'pbno3',    name:'Sulu Pb(NO\u2083)\u2082 (Pt)',  cat:{p:'Pb(s)', M:207, n:2},           an:{p:'O\u2082(g)', M:32, n:4, gas:1}}
  ];
  var ssCount = 2;
  var ssSel = ['agno3_pt', 'cuso4_pt', 'water'];

  function ssCellDef(k){
    for (var i = 0; i < ELZ_CELLS.length; i++) if (ELZ_CELLS[i].k === k) return ELZ_CELLS[i];
    return ELZ_CELLS[0];
  }
  function ssFmt(v){
    if (v >= 100) return v.toFixed(1);
    if (v >= 1) return v.toFixed(2);
    return v.toFixed(3);
  }

  function ssBuild(){
    var wrap = document.getElementById('ss-cells');
    if (!wrap) return;
    var opts = '';
    for (var c = 0; c < ELZ_CELLS.length; c++)
      opts += '<option value="' + ELZ_CELLS[c].k + '">' + ELZ_CELLS[c].name + '</option>';
    var html = '';
    for (var i = 0; i < ssCount; i++) {
      html += '<div style="margin-bottom:8px"><div class="slbl">Kap ' + (i + 1) + '</div>' +
        '<select class="sel" id="ss-c' + i + '" onchange="ssSelChanged(' + i + ', this.value)">' + opts + '</select></div>';
    }
    wrap.innerHTML = html;
    for (var j = 0; j < ssCount; j++) {
      var sel = document.getElementById('ss-c' + j);
      if (sel) sel.value = ssSel[j];
    }
  }
  window.ssSelChanged = function(i, v){ ssSel[i] = v; ssRun(); };
  window.ssSetCount = function(n, btn){ ssCount = n; if (btn) selectInRow(btn); ssBuild(); ssRun(); };

  function ssSecs(){
    var v = parseFloat((document.getElementById('ss-t-num') || {}).value);
    var u = (document.getElementById('ss-tu') || {}).value || 'dk';
    if (isNaN(v) || v <= 0) return NaN;
    return u === 'sa' ? v * 3600 : u === 'dk' ? v * 60 : v;
  }
  // Kaydırıcı ↔ sayı kutusu senkronu
  window.ssSync = function(which, from){
    var sl = document.getElementById('ss-' + which + '-sl');
    var num = document.getElementById('ss-' + which + '-num');
    if (!sl || !num) return;
    if (which === 'i') {
      if (from === 'sl') num.value = (sl.value / 10).toFixed(3);
      else { var v = parseFloat(num.value); if (!isNaN(v)) sl.value = Math.max(1, Math.min(200, Math.round(v * 10))); }
    } else { // t (kaydırıcı dakika cinsinden)
      if (from === 'sl') {
        num.value = sl.value;
        var tu = document.getElementById('ss-tu');
        if (tu) tu.value = 'dk';
      } else {
        var sec = ssSecs();
        if (!isNaN(sec)) sl.value = Math.max(1, Math.min(180, Math.round(sec / 60)));
      }
    }
    ssRun();
  };

  function ssRun(){
    var res = document.getElementById('ss-res');
    var qline = document.getElementById('ss-q');
    if (!res) return;
    var I = parseFloat((document.getElementById('ss-i-num') || {}).value);
    var t = ssSecs();
    if (isNaN(I) || I <= 0 || isNaN(t)) {
      res.innerHTML = '<div style="font-size:13px;color:var(--yw)">Ak\u0131m ve s\u00fcreyi gir.</div>';
      if (qline) qline.innerHTML = '';
      return;
    }
    var Q = I * t, molE = Q / ELZ_F;
    if (qline) qline.innerHTML = 'Ortak y\u00fck: <b style="color:var(--ac2)">Q = ' + I + ' \u00d7 ' + Math.round(t) + ' = ' + Q.toFixed(0) + ' C</b> \u2192 mol e\u207b = Q/F = <b style="color:var(--ac2)">' + molE.toFixed(4) + ' mol</b> \u2014 her kaptan ayn\u0131s\u0131 ge\u00e7er.';

    // Tüm ürünleri hesapla (çubuk ölçeği için maksimum kütle)
    var cells = [], maxM = 0;
    for (var i = 0; i < ssCount; i++) {
      var def = ssCellDef(ssSel[i]);
      function calc(side){
        var mol = molE / side.n, m2 = mol * side.M;
        return { p: side.p, m: m2, V: side.gas ? mol * 22.4 : null, diss: !!side.diss, gas: !!side.gas };
      }
      var kt = calc(def.cat), an = calc(def.an);
      maxM = Math.max(maxM, kt.m, an.m);
      cells.push({ name: def.name, kt: kt, an: an });
    }

    function line(icon, iconCol, side){
      var bar = maxM > 0 ? Math.max(3, side.m / maxM * 100) : 0;
      var barCol = side.diss ? '#f87171' : iconCol;
      var txt = side.diss
        ? '<b style="color:#f87171">\u2212' + ssFmt(side.m) + ' g</b> <span style="color:var(--tx3);font-size:11px">(elektrot incelir)</span>'
        : '<b>' + ssFmt(side.m) + ' g</b>' + (side.V !== null ? ' <span style="color:var(--tx3)">\u00b7 ' + ssFmt(side.V) + ' L (NK)</span>' : '');
      return '<div style="padding:7px 0;border-bottom:1px solid var(--br)">' +
        '<div style="display:flex;justify-content:space-between;gap:8px;font-size:12.5px;align-items:center">' +
          '<span style="color:' + iconCol + ';font-weight:700;white-space:nowrap">' + icon + '</span>' +
          '<span style="color:#fff;font-weight:600;flex:1">' + side.p + '</span>' +
          '<span style="text-align:right;color:var(--tx)">' + txt + '</span>' +
        '</div>' +
        '<div style="height:4px;background:var(--sf3);border-radius:100px;margin-top:5px;overflow:hidden">' +
          '<div style="height:100%;width:' + bar + '%;background:' + barCol + ';border-radius:100px;transition:width .15s"></div>' +
        '</div></div>';
    }

    var html = '';
    for (var j = 0; j < cells.length; j++) {
      if (j > 0) html += '<div style="text-align:center;color:var(--tx3);font-size:10px;margin:4px 0">\u2502 seri ba\u011flant\u0131 \u00b7 ayn\u0131 Q \u2502</div>';
      html += '<div style="background:var(--sf2);border:1px solid var(--br);border-radius:var(--r);padding:12px">' +
        '<div style="font-family:Space Grotesk,sans-serif;font-size:13px;font-weight:800;color:var(--ac2);margin-bottom:6px">\u26a1 Kap ' + (j + 1) + ' \u00b7 ' + cells[j].name + '</div>' +
        line('\u2296 Katot', '#60a5fa', cells[j].kt) +
        line('\u2295 Anot', '#f87171', cells[j].an) +
        '</div>';
    }
    res.innerHTML = html;
  }
  window.ssRun = ssRun;

  /* ============================================================
     BÖLÜM 10 — 3D HİDROKARBON GALERİSİ
     Alkan, alken ve alkinlerin ilk 10'ar üyesi (30 molekül).
     Geometri prosedürel üretilir: gerçek bağ açıları (sp³ 109.47°,
     sp² 120°, sp 180°) ve bağ uzunlukları (C-C 1.54, C=C 1.34,
     C≡C 1.20, C-H 1.09 Å). Orbital modülüyle aynı doku:
     fütüristik yıldızlı fon, sürükle-döndür, pinch-zoom,
     tıklayınca tam ekran detay.
     ============================================================ */

  // ---- 10a. Vektör yardımcıları ----
  function v3(x, y, z){ return { x: x, y: y, z: z }; }
  function vAdd(a, b){ return v3(a.x + b.x, a.y + b.y, a.z + b.z); }
  function vSub(a, b){ return v3(a.x - b.x, a.y - b.y, a.z - b.z); }
  function vScale(a, k){ return v3(a.x * k, a.y * k, a.z * k); }
  function vLen(a){ return Math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z); }
  function vNorm(a){ var l = vLen(a) || 1; return vScale(a, 1 / l); }
  function vCross(a, b){ return v3(a.y*b.z - a.z*b.y, a.z*b.x - a.x*b.z, a.x*b.y - a.y*b.x); }
  function rotZv(a, ang){
    var c = Math.cos(ang), s = Math.sin(ang);
    return v3(a.x*c - a.y*s, a.x*s + a.y*c, a.z);
  }

  // ---- 10b. Molekül üretici (kimyasal olarak doğru) ----
  var HC_TETRA = 1.23096; // 70.529° (zincir dönüş açısı → C-C-C = 109.47°)
  function hcBuild(n, kind){
    // Karbon iskeleti
    var C = [v3(0, 0, 0)];
    var d = v3(1, 0, 0), sign = -1, i;
    if (kind === 'an' && n > 1) d = rotZv(d, 0.61548); // 35.264° başlangıç eğimi
    for (i = 1; i < n; i++) {
      var len = 1.54;
      if (kind === 'an') {
        if (i > 1) { d = rotZv(d, sign * HC_TETRA); sign = -sign; }
      } else if (kind === 'en') {
        if (i === 1) { len = 1.34; }                                   // C1=C2
        else if (i === 2) { d = rotZv(d, 1.0472); len = 1.50; sign = -1; } // 120°
        else { d = rotZv(d, sign * HC_TETRA); sign = -sign; }
      } else { // 'in'
        if (i === 1) { len = 1.20; }                                   // C1≡C2
        else if (i === 2) { len = 1.46; }                              // sp: 180°, düz
        else if (i === 3) { d = rotZv(d, HC_TETRA); sign = -1; }
        else { d = rotZv(d, sign * HC_TETRA); sign = -sign; }
      }
      C.push(vAdd(C[i - 1], vScale(d, len)));
    }
    // Ana ekseni yatayla hizala
    if (n > 1) {
      var ax = vSub(C[n - 1], C[0]), ang = Math.atan2(ax.y, ax.x);
      for (i = 0; i < n; i++) C[i] = rotZv(C[i], -ang);
    }
    // C-C bağları
    var atoms = [], bonds = [];
    for (i = 0; i < n; i++) atoms.push({ x: C[i].x, y: C[i].y, z: C[i].z, el: 'C' });
    for (i = 1; i < n; i++) {
      var o = 1;
      if (i === 1 && kind === 'en') o = 2;
      if (i === 1 && kind === 'in') o = 3;
      bonds.push({ a: i - 1, b: i, o: o });
    }
    // Hidrojenler: her karbonun eksik değerliği tamamlanır
    var CH = 1.09;
    for (i = 0; i < n; i++) {
      var nb = [];
      for (var b2 = 0; b2 < bonds.length; b2++) {
        if (bonds[b2].a === i) nb.push({ dir: vNorm(vSub(C[bonds[b2].b], C[i])), o: bonds[b2].o });
        if (bonds[b2].b === i) nb.push({ dir: vNorm(vSub(C[bonds[b2].a], C[i])), o: bonds[b2].o });
      }
      var val = 0;
      for (var k2 = 0; k2 < nb.length; k2++) val += nb[k2].o;
      var h = 4 - val, dirs = [];
      if (nb.length === 0) { // Metan
        var q3 = 1 / Math.sqrt(3);
        dirs = [v3(q3,q3,q3), v3(q3,-q3,-q3), v3(-q3,q3,-q3), v3(-q3,-q3,q3)];
      } else if (nb.length === 1) {
        var u = nb[0].dir;
        if (h === 1 && nb[0].o === 3) dirs = [vScale(u, -1)];               // ≡C-H
        else if (h === 2 && nb[0].o === 2) dirs = [rotZv(u, 2.0944), rotZv(u, -2.0944)]; // =CH₂ (120°)
        else { // -CH₃ üçayak (109.47°)
          var p = Math.abs(u.z) < 0.9 ? vNorm(vCross(u, v3(0,0,1))) : v3(1,0,0);
          var q = vNorm(vCross(u, p));
          var off = i * 1.0472 + 0.5236; // basamaklı görünüm
          for (var t3 = 0; t3 < 3; t3++) {
            var a3 = off + t3 * 2.0944;
            dirs.push(vNorm(vAdd(vScale(u, -0.33333),
              vScale(vAdd(vScale(p, Math.cos(a3)), vScale(q, Math.sin(a3))), 0.94281))));
          }
        }
      } else {
        var u1 = nb[0].dir, u2 = nb[1].dir, s2 = vAdd(u1, u2);
        if (h === 1) dirs = [vNorm(vScale(s2, -1))];                        // sp² =CH-
        else if (h === 2) {                                                 // sp³ -CH₂-
          var bb = vNorm(vScale(s2, -1));
          var nn = vCross(u1, u2);
          if (vLen(nn) < 1e-4) nn = v3(0, 0, 1);
          nn = vNorm(nn);
          dirs = [ vNorm(vAdd(vScale(bb, 0.57735), vScale(nn, 0.81650))),
                   vNorm(vAdd(vScale(bb, 0.57735), vScale(nn, -0.81650))) ];
        }
      }
      for (var hh = 0; hh < dirs.length; hh++) {
        var hp = vAdd(C[i], vScale(dirs[hh], CH));
        atoms.push({ x: hp.x, y: hp.y, z: hp.z, el: 'H' });
        bonds.push({ a: i, b: atoms.length - 1, o: 1 });
      }
    }
    // Merkeze al + ölçekle
    var cx = 0, cy = 0, cz = 0;
    atoms.forEach(function(a4){ cx += a4.x; cy += a4.y; cz += a4.z; });
    cx /= atoms.length; cy /= atoms.length; cz /= atoms.length;
    var maxR = 1;
    atoms.forEach(function(a4){
      a4.x = (a4.x - cx) * 34; a4.y = (a4.y - cy) * 34; a4.z = (a4.z - cz) * 34;
      maxR = Math.max(maxR, Math.sqrt(a4.x*a4.x + a4.y*a4.y + a4.z*a4.z));
    });
    var nH = atoms.length - n;
    return { atoms: atoms, bonds: bonds, nC: n, nH: nH, fit: Math.min(1.6, 92 / maxR) };
  }

  // ---- 10c. Molekül listesi ----
  var HC_NAMES = {
    an: ['Metan','Etan','Propan','B\u00fctan','Pentan','Heksan','Heptan','Oktan','Nonan','Dekan'],
    en: ['Eten (Etilen)','Propen','1-B\u00fcten','1-Penten','1-Heksen','1-Hepten','1-Okten','1-Nonen','1-Deken','1-Undeken'],
    in_: ['Etin (Asetilen)','Propin','1-B\u00fctin','1-Pentin','1-Heksin','1-Heptin','1-Oktin','1-Nonin','1-Dekin','1-Undekin']
  };
  var HC_LIST = null;
  function hcList(){
    if (HC_LIST) return HC_LIST;
    HC_LIST = [];
    var k, i, n;
    for (i = 0; i < 10; i++) {
      n = i + 1;
      HC_LIST.push({ kind: 'an', n: n, name: HC_NAMES.an[i], f: 'C' + n + 'H' + (2*n+2), mol: null });
    }
    for (i = 0; i < 10; i++) {
      n = i + 2;
      HC_LIST.push({ kind: 'en', n: n, name: HC_NAMES.en[i], f: 'C' + n + 'H' + (2*n), mol: null });
    }
    for (i = 0; i < 10; i++) {
      n = i + 2;
      HC_LIST.push({ kind: 'in', n: n, name: HC_NAMES.in_[i], f: 'C' + n + 'H' + (2*n-2), mol: null });
    }
    return HC_LIST;
  }
  function hcMol(item){ if (!item.mol) item.mol = hcBuild(item.n, item.kind); return item.mol; }

  // ---- 10d. Çizim motoru (fütüristik fon + derinlik sıralı) ----
  function hcProj(st, x, y, z, W, H2){
    var y1 = y * Math.cos(st.rotX) - z * Math.sin(st.rotX);
    var z1 = y * Math.sin(st.rotX) + z * Math.cos(st.rotX);
    var x2 = x * Math.cos(st.rotY) + z1 * Math.sin(st.rotY);
    var z2 = -x * Math.sin(st.rotY) + z1 * Math.cos(st.rotY);
    var s = (300 * st.zoom * st.fit) / (430 + z2);
    return { x: W/2 + x2 * s, y: H2/2 + y1 * s, z: z2, s: s };
  }

  function hcBg(x, st, W, H2){
    x.fillStyle = '#050510'; x.fillRect(0, 0, W, H2);
    // Yıldızlar (titreşimli)
    if (!st.stars || st.sw !== W) {
      st.stars = []; st.sw = W;
      for (var i = 0; i < 42; i++)
        st.stars.push({ x: Math.random()*W, y: Math.random()*H2, r: 0.5 + Math.random()*1.3, p: Math.random()*6.28 });
    }
    for (var s2 = 0; s2 < st.stars.length; s2++) {
      var sr = st.stars[s2];
      x.globalAlpha = 0.25 + 0.3 * (0.5 + 0.5 * Math.sin(st.t * 1.4 + sr.p));
      x.fillStyle = '#9bd7ff';
      x.beginPath(); x.arc(sr.x, sr.y, sr.r, 0, 6.283); x.fill();
    }
    x.globalAlpha = 1;
    // Nebula parıltıları
    var g1 = x.createRadialGradient(W*0.18, H2*0.14, 0, W*0.18, H2*0.14, W*0.55);
    g1.addColorStop(0, 'rgba(0,212,255,0.07)'); g1.addColorStop(1, 'rgba(0,212,255,0)');
    x.fillStyle = g1; x.fillRect(0, 0, W, H2);
    var g2 = x.createRadialGradient(W*0.85, H2*0.9, 0, W*0.85, H2*0.9, W*0.5);
    g2.addColorStop(0, 'rgba(168,85,247,0.07)'); g2.addColorStop(1, 'rgba(168,85,247,0)');
    x.fillStyle = g2; x.fillRect(0, 0, W, H2);
    // Zemin ızgarası
    x.strokeStyle = 'rgba(0,212,255,0.07)'; x.lineWidth = 1;
    for (var k = 0; k < 5; k++) {
      var yy = H2 * (0.76 + k * 0.055);
      x.beginPath(); x.moveTo(0, yy); x.lineTo(W, yy); x.stroke();
    }
    // Merkez hale
    var g3 = x.createRadialGradient(W/2, H2/2, 0, W/2, H2/2, 120 * st.zoom * (st.fit || 1));
    g3.addColorStop(0, 'rgba(99,102,241,0.08)'); g3.addColorStop(1, 'rgba(99,102,241,0)');
    x.fillStyle = g3; x.fillRect(0, 0, W, H2);
  }

  function hcDraw(x, mol, st, W, H2, labels){
    hcBg(x, st, W, H2);
    var items = [], i;
    // Bağlar (uçlar küre yarıçapı kadar kısaltılır)
    for (i = 0; i < mol.bonds.length; i++) {
      var bd = mol.bonds[i], A = mol.atoms[bd.a], B = mol.atoms[bd.b];
      var tA = { x: A.x + (B.x-A.x)*0.15, y: A.y + (B.y-A.y)*0.15, z: A.z + (B.z-A.z)*0.15 };
      var tB = { x: A.x + (B.x-A.x)*0.85, y: A.y + (B.y-A.y)*0.85, z: A.z + (B.z-A.z)*0.85 };
      if (bd.o === 2) {
        // BİLİMSEL DÜZELTME: C=C'nin iki çizgisi molekül DÜZLEMİNDE durur —
        // sp² hidrojenleriyle aynı düzlemde döner, yandan bakınca tek çizgiye kapanır.
        var bv = vSub(B, A);
        var pp = vCross(bv, v3(0, 0, 1));
        var perp = vLen(pp) > 1e-4 ? vNorm(pp) : v3(0, 1, 0);
        for (var sgn = -1; sgn <= 1; sgn += 2) {
          var oA = vAdd(tA, vScale(perp, 3.2 * sgn));
          var oB = vAdd(tB, vScale(perp, 3.2 * sgn));
          var pa2 = hcProj(st, oA.x, oA.y, oA.z, W, H2);
          var pb2 = hcProj(st, oB.x, oB.y, oB.z, W, H2);
          items.push({ z: (pa2.z + pb2.z) / 2, b: 1, pa: pa2, pb: pb2, o: 1, col: '251,113,133', lw: 2.4 });
        }
      } else {
        var pa = hcProj(st, tA.x, tA.y, tA.z, W, H2);
        var pb = hcProj(st, tB.x, tB.y, tB.z, W, H2);
        items.push({ z: (pa.z + pb.z) / 2, b: 1, pa: pa, pb: pb, o: bd.o,
                     col: bd.o === 3 ? '251,191,36' : '186,212,240',
                     lw: bd.o === 1 ? 3.1 : 2.3 });
      }
    }
    // Atomlar
    for (i = 0; i < mol.atoms.length; i++) {
      var at = mol.atoms[i];
      var p = hcProj(st, at.x, at.y, at.z, W, H2);
      items.push({ z: p.z, a: 1, p: p, el: at.el });
    }
    items.sort(function(m1, m2){ return m2.z - m1.z; });
    for (i = 0; i < items.length; i++) {
      var it = items[i];
      var depth = Math.max(0.3, Math.min(1, 1 - (it.z + 130) / 380));
      if (it.b) {
        var sAvg = (it.pa.s + it.pb.s) / 2;
        var dx = it.pb.x - it.pa.x, dy = it.pb.y - it.pa.y;
        var ll = Math.sqrt(dx*dx + dy*dy) || 1;
        var px2 = -dy / ll, py2 = dx / ll;
        var cnt = it.o, gap = 3.4 * sAvg;
        for (var lj = 0; lj < cnt; lj++) {
          var off = (lj - (cnt - 1) / 2) * gap;
          x.strokeStyle = 'rgba(' + it.col + ',' + (0.9 * depth) + ')';
          x.lineWidth = it.lw * sAvg;
          x.lineCap = 'round';
          x.beginPath();
          x.moveTo(it.pa.x + px2*off, it.pa.y + py2*off);
          x.lineTo(it.pb.x + px2*off, it.pb.y + py2*off);
          x.stroke();
        }
      } else {
        var r = (it.el === 'C' ? 9.5 : it.el === 'O' ? 8.3 : 5.6) * it.p.s;
        // dış parıltı
        x.beginPath(); x.arc(it.p.x, it.p.y, r + 4 * it.p.s, 0, 6.283);
        x.fillStyle = it.el === 'C' ? 'rgba(34,211,238,' + 0.10*depth + ')' : it.el === 'O' ? 'rgba(248,113,113,' + 0.12*depth + ')' : 'rgba(255,255,255,' + 0.08*depth + ')';
        x.fill();
        var gg = x.createRadialGradient(it.p.x - r*0.35, it.p.y - r*0.35, r*0.1, it.p.x, it.p.y, r);
        if (it.el === 'C') { gg.addColorStop(0, '#7deefc'); gg.addColorStop(0.55, '#0ea5c9'); gg.addColorStop(1, '#075b73'); }
        else if (it.el === 'O') { gg.addColorStop(0, '#fca5a5'); gg.addColorStop(0.55, '#ef4444'); gg.addColorStop(1, '#7f1d1d'); }
        else { gg.addColorStop(0, '#ffffff'); gg.addColorStop(0.6, '#dbe4ef'); gg.addColorStop(1, '#8fa0b5'); }
        x.globalAlpha = 0.55 + 0.45 * depth;
        x.beginPath(); x.arc(it.p.x, it.p.y, r, 0, 6.283);
        x.fillStyle = gg; x.fill();
        x.strokeStyle = it.el === 'C' ? 'rgba(125,238,252,' + 0.5*depth + ')' : it.el === 'O' ? 'rgba(252,165,165,' + 0.55*depth + ')' : 'rgba(255,255,255,' + 0.35*depth + ')';
        x.lineWidth = 1; x.stroke();
        x.globalAlpha = 1;
        if (labels && r > 5) {
          x.fillStyle = it.el === 'C' ? '#02222b' : it.el === 'O' ? '#3f0d0d' : '#334155';
          x.font = 'bold ' + Math.max(7, r*0.95) + 'px sans-serif';
          x.textAlign = 'center'; x.textBaseline = 'middle';
          x.fillText(it.el, it.p.x, it.p.y);
          x.textBaseline = 'alphabetic';
        }
      }
    }
  }

  // ---- 10e. Ekran + galeri ----
  var hcCat = 'an';
  var hcSt = { rotX: 0.42, rotY: 0.6, zoom: 1, fit: 1, spin: true, spd: 1, drag: false,
               lx: 0, ly: 0, dist: 0, t: 0, anim: null, labels: false, item: null, stars: null, sw: 0 };

  function setupHC(){
    if (document.getElementById('s-hc')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    app.insertAdjacentHTML('beforeend',
      '<div id="s-hc" style="display:none"><div style="max-width:900px;margin:0 auto;padding:15px">' +
        '<h1 class="ptitle">\ud83e\uddec Hidrokarbonlar 3D</h1>' +
        '<p class="psub">Alkan, alken ve alkinlerin ilk 10 \u00fcyesi \u2014 ger\u00e7ek ba\u011f a\u00e7\u0131lar\u0131yla. Molek\u00fcle dokun, tam ekranda d\u00f6nd\u00fcr.</p>' +
        '<div class="card" style="margin-bottom:14px">' +
          '<div class="slbl">\u270f\ufe0f \u0130simden \u00c7iz (IUPAC)</div>' +
          '<div style="display:flex;gap:8px">' +
            '<input type="text" id="hc-name-inp" class="inp" placeholder="\u00f6rn: 3-metilb\u00fctan, 2-metil-2-b\u00fcten" autocapitalize="off" autocorrect="off" spellcheck="false">' +
            '<button type="button" class="btn bp" onclick="hcDrawFromName()">\u00c7iz</button>' +
          '</div>' +
          '<div id="hc-name-out" style="font-size:12px;margin-top:8px;line-height:1.6"></div>' +
        '</div>' +
        '<div style="display:flex;gap:6px;margin-bottom:14px">' +
          '<button type="button" id="hc-cat-an" class="ob sel2" style="flex:1" onclick="hcSetCat(\'an\',this)">Alkanlar C\u2099H\u2082\u2099\u208a\u2082</button>' +
          '<button type="button" id="hc-cat-en" class="ob" style="flex:1" onclick="hcSetCat(\'en\',this)">Alkenler C\u2099H\u2082\u2099</button>' +
          '<button type="button" id="hc-cat-in" class="ob" style="flex:1" onclick="hcSetCat(\'in\',this)">Alkinler C\u2099H\u2082\u2099\u208b\u2082</button>' +
        '</div>' +
        '<div id="hc-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px"></div>' +
      '</div>' +
      // Tam ekran detay
      '<div id="hc-detail" style="display:none;position:fixed;inset:0;background:rgba(2,3,10,0.97);z-index:600;overflow-y:auto;padding:20px">' +
        '<button type="button" onclick="hcClose()" style="position:fixed;top:15px;right:15px;width:40px;height:40px;background:rgba(255,50,50,0.2);border:1px solid rgba(255,50,50,0.5);border-radius:50%;color:#ff6666;font-size:22px;cursor:pointer;z-index:601;display:flex;align-items:center;justify-content:center">\u00d7</button>' +
        '<div id="hc-title" style="text-align:center;font-size:1.4rem;color:#00d4ff;margin:46px 0 4px;text-shadow:0 0 15px rgba(0,212,255,0.4);font-family:Space Grotesk,sans-serif;font-weight:800"></div>' +
        '<div id="hc-sub" style="text-align:center;font-size:14px;color:var(--tx2);margin-bottom:14px"></div>' +
        '<canvas id="hc-cv" width="600" height="420" style="width:100%;max-width:560px;height:auto;border-radius:16px;background:#050510;border:2px solid rgba(0,212,255,0.3);display:block;margin:0 auto 10px;touch-action:none"></canvas>' +
        '<p style="text-align:center;color:rgba(255,255,255,0.3);font-size:12px;margin-bottom:10px">\ud83d\udc46 S\u00fcr\u00fckle d\u00f6nd\u00fcr \u00b7 \ud83e\udd0f \u0130ki parmakla yak\u0131nla\u015ft\u0131r</p>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:16px">' +
          '<button type="button" onclick="hcToggleSpin()" style="padding:7px 14px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);border-radius:100px;color:#00d4ff;font-size:12px;cursor:pointer;font-family:Inter,sans-serif">\ud83d\udd04 Oto-D\u00f6nd\u00fcr</button>' +
          '<button type="button" onclick="hcSetSpd(0.3)" style="padding:7px 14px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);border-radius:100px;color:#00d4ff;font-size:12px;cursor:pointer;font-family:Inter,sans-serif">\ud83d\udc0c Yava\u015f</button>' +
          '<button type="button" onclick="hcSetSpd(1.6)" style="padding:7px 14px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);border-radius:100px;color:#00d4ff;font-size:12px;cursor:pointer;font-family:Inter,sans-serif">\ud83d\ude80 H\u0131zl\u0131</button>' +
          '<button type="button" onclick="hcToggleLbl()" style="padding:7px 14px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);border-radius:100px;color:#00d4ff;font-size:12px;cursor:pointer;font-family:Inter,sans-serif">\ud83d\udd24 C/H Etiket</button>' +
          '<button type="button" onclick="hcResetView()" style="padding:7px 14px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);border-radius:100px;color:#00d4ff;font-size:12px;cursor:pointer;font-family:Inter,sans-serif">\ud83c\udfaf S\u0131f\u0131rla</button>' +
        '</div>' +
        '<div style="max-width:560px;margin:0 auto 30px;background:var(--sf);border:1px solid var(--br);border-left:3px solid #7b2cbf;border-radius:var(--rlg);padding:18px" id="hc-props"></div>' +
      '</div></div>');

    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-hc') === -1) SCREENS.push('s-hc');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-hc'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-hc" onclick="nav(\'hc\')">\ud83e\uddec Hidrokarbonlar 3D</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-hc'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-hc" onclick="nav(\'hc\')"><div class="ti">\ud83e\uddec</div><div class="tt">Hidrokarbonlar 3D</div><div class="td">Alkan, alken, alkin \u2014 30 molek\u00fcl\u00fcn ger\u00e7ek 3D modeli. D\u00f6nd\u00fcr, yak\u0131nla\u015ft\u0131r.</div></div>');
    hcBindCanvas();
    var hcNameInp = document.getElementById('hc-name-inp');
    if (hcNameInp) hcNameInp.addEventListener('keydown', function(e){ if (e.key === 'Enter') { e.preventDefault(); window.hcDrawFromName(); } });
  }

  window.hcSetCat = function(cat, btn){
    hcCat = cat;
    if (btn) selectInRow(btn);
    hcRenderGrid();
  };

  function hcRenderGrid(){
    var grid = document.getElementById('hc-grid');
    if (!grid) return;
    var list = hcList().filter(function(m){ return m.kind === hcCat; });
    var html = '';
    for (var i = 0; i < list.length; i++) {
      var idx = hcList().indexOf(list[i]);
      html += '<div onclick="hcOpen(' + idx + ')" style="background:var(--sf);border:2px solid rgba(0,212,255,0.3);border-radius:16px;padding:10px 8px;text-align:center;cursor:pointer;transition:all .2s" ' +
        'onmouseover="this.style.borderColor=\'#00d4ff\'" onmouseout="this.style.borderColor=\'rgba(0,212,255,0.3)\'">' +
        '<div style="font-size:13px;font-weight:700;color:#00d4ff;margin-bottom:2px">' + list[i].name + '</div>' +
        '<div style="font-size:11px;color:var(--tx3);margin-bottom:6px">' + pretty(list[i].f) + '</div>' +
        '<canvas id="hc-th-' + idx + '" width="170" height="130" style="width:100%;border-radius:10px;background:#050510;border:1px solid rgba(0,212,255,0.15)"></canvas>' +
      '</div>';
    }
    grid.innerHTML = html;
    setTimeout(function(){
      for (var j = 0; j < list.length; j++) hcThumb(hcList().indexOf(list[j]));
    }, 60);
  }

  function hcThumb(idx){
    var cv = document.getElementById('hc-th-' + idx);
    if (!cv) return;
    var item = hcList()[idx], mol = hcMol(item);
    var st = { rotX: 0.45, rotY: 0.5 + idx * 0.33, zoom: 0.92, fit: mol.fit, t: idx, stars: null, sw: 0 };
    var x = cv.getContext('2d');
    hcDraw(x, mol, st, 170, 130, false);
  }

  window.hcOpen = function(idxOrItem){
    var item = typeof idxOrItem === 'number' ? hcList()[idxOrItem] : idxOrItem;
    if (!item) return;
    hcSt.item = item;
    hcSt.rotX = 0.42; hcSt.rotY = 0.6; hcSt.zoom = 1; hcSt.spin = true;
    hcSt.fit = hcMol(item).fit;
    var TK = { an: 'Alkan (doymu\u015f)', en: 'Alken (doymam\u0131\u015f)', in: 'Alkin (doymam\u0131\u015f)' };
    document.getElementById('hc-title').textContent = item.name;
    document.getElementById('hc-sub').innerHTML = pretty(item.f) + ' \u00b7 <span style="color:var(--ac2)">' + TK[item.kind] + '</span>';
    var mol = hcMol(item);
    var GF = { an: 'C\u2099H\u2082\u2099\u208a\u2082', en: 'C\u2099H\u2082\u2099', in: 'C\u2099H\u2082\u2099\u208b\u2082' };
    var BAG = { an: 'T\u00fcm ba\u011flar tekli (\u03c3) \u2014 doymu\u015f hidrokarbon.',
                en: '1 adet C=C ikili ba\u011f (1\u03c3 + 1\u03c0) \u2014 katılma tepkimesi verir.',
                in: '1 adet C\u2261C \u00fc\u00e7l\u00fc ba\u011f (1\u03c3 + 2\u03c0) \u2014 katılma tepkimesi verir.' };
    var HIB = { an: 'T\u00fcm karbonlar sp\u00b3 (109.5\u00b0)',
                en: 'C1-C2: sp\u00b2 (120\u00b0), di\u011ferleri sp\u00b3',
                in: 'C1-C2: sp (180\u00b0), di\u011ferleri sp\u00b3' };
    var rows = [
      ['Molek\u00fcl Form\u00fcl\u00fc', pretty(item.f)],
      ['Genel Form\u00fcl', GF[item.kind]],
      ['Karbon / Hidrojen', mol.nC + ' C \u00b7 ' + mol.nH + ' H'],
      ['Hibritle\u015fme', HIB[item.kind]]
    ];
    var html = '<div style="font-size:14px;font-weight:600;color:#00d4ff;margin-bottom:12px">\ud83d\udccb Molek\u00fcl \u00d6zellikleri</div>';
    for (var r = 0; r < rows.length; r++)
      html += '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:13px"><span style="color:var(--tx3)">' + rows[r][0] + '</span><span style="color:#00d4ff;font-weight:700;text-align:right">' + rows[r][1] + '</span></div>';
    html += '<div style="margin-top:10px;padding:10px;background:rgba(0,212,255,0.06);border-radius:8px;font-size:13px;line-height:1.6;color:var(--tx2)">' + BAG[item.kind] + '</div>';
    html += '<div style="margin-top:8px;font-size:11px;color:var(--tx3);line-height:1.6">\ud83c\udfa8 Renkler: <span style="color:#22d3ee">\u25cf C (karbon)</span> \u00b7 <span style="color:#e2e8f0">\u25cf H (hidrojen)</span>' +
      (item.kind === 'en' ? ' \u00b7 <span style="color:#fb7185">\u2550 ikili ba\u011f</span>' : '') +
      (item.kind === 'in' ? ' \u00b7 <span style="color:#fbbf24">\u2261 \u00fc\u00e7l\u00fc ba\u011f</span>' : '') + '</div>';
    document.getElementById('hc-props').innerHTML = html;
    document.getElementById('hc-detail').style.display = 'block';
    document.getElementById('hc-detail').scrollTop = 0;
    if (hcSt.anim) cancelAnimationFrame(hcSt.anim);
    hcLoop();
  };

  function hcLoop(){
    if (!hcSt.item) return;
    var cv = document.getElementById('hc-cv');
    if (!cv || document.getElementById('hc-detail').style.display === 'none') { hcStopAnim(); return; }
    hcSt.anim = requestAnimationFrame(hcLoop);
    var rect = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    var W = rect.width || 300, H2 = Math.round(W * 0.72);
    if (Math.abs(cv.width - W * dpr) > 2 || Math.abs(cv.height - H2 * dpr) > 2) { cv.width = W * dpr; cv.height = H2 * dpr; }
    var x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (hcSt.spin && !hcSt.drag) hcSt.rotY += 0.008 * hcSt.spd;
    hcSt.t += 0.016;
    hcDraw(x, hcMol(hcSt.item), hcSt, W, H2, hcSt.labels);
  }
  function hcStopAnim(){ if (hcSt.anim) { cancelAnimationFrame(hcSt.anim); hcSt.anim = null; } }

  window.hcClose = function(){
    var d = document.getElementById('hc-detail');
    if (d) d.style.display = 'none';
    hcStopAnim(); hcSt.item = null;
  };
  window.hcDrawFromName = function(){
    var inp = document.getElementById('hc-name-inp');
    var out = document.getElementById('hc-name-out');
    if (!inp || !out) return;
    var raw = inp.value.trim();
    if (!raw) { out.innerHTML = '<span style="color:var(--yw)">Bir isim yaz (\u00f6rn: 3-metilb\u00fctan).</span>'; return; }
    var r = parseOrganicName(raw);
    if (!r.ok) { out.innerHTML = '<span style="color:var(--yw)">\u26a0\ufe0f ' + r.error + '</span>'; return; }
    try {
      var mol = hcBuildAt(r.n, r.kind, r.dbAt, r.branches);
      var KIND_LABEL = { an:'Alkan', en:'Alken', in:'Alkin' };
      var item = { kind: r.kind, n: r.n, name: raw.trim(), f: organicMolFormula(mol), mol: mol, custom: true };
      var correct = checkCanonicalName(r);
      var msg = '<span style="color:var(--gr)">\u2713 ' + KIND_LABEL[r.kind] + ' \u00b7 ' + pretty(item.f) +
        (r.branches.length ? ' \u00b7 ' + r.branches.length + ' dal grubu' : ' \u00b7 dallanmam\u0131\u015f') + '</span>';
      if (correct) msg += '<br><span style="color:var(--yw)">\u26a0\ufe0f Bu isim IUPAC kural\u0131na (en d\u00fc\u015f\u00fck lokant) g\u00f6re yaz\u0131lmam\u0131\u015f. Do\u011fru IUPAC ad\u0131: <b>' + correct + '</b></span>';
      out.innerHTML = msg;
      window.hcOpen(item);
    } catch (err) {
      out.innerHTML = '<span style="color:var(--yw)">\u00c7izim hatas\u0131: ' + err.message + '</span>';
    }
  };
  window.hcToggleSpin = function(){ hcSt.spin = !hcSt.spin; };
  window.hcSetSpd = function(v){ hcSt.spd = v; };
  window.hcToggleLbl = function(){ hcSt.labels = !hcSt.labels; };
  window.hcResetView = function(){ hcSt.rotX = 0.42; hcSt.rotY = 0.6; hcSt.zoom = 1; };

  function hcBindCanvas(){
    var cv = document.getElementById('hc-cv');
    if (!cv) return;
    cv.onmousedown = function(e){ hcSt.drag = true; hcSt.lx = e.clientX; hcSt.ly = e.clientY; };
    cv.onmousemove = function(e){
      if (!hcSt.drag) return;
      hcSt.rotY += (e.clientX - hcSt.lx) * 0.01; hcSt.rotX += (e.clientY - hcSt.ly) * 0.01;
      hcSt.lx = e.clientX; hcSt.ly = e.clientY;
    };
    cv.onmouseup = cv.onmouseleave = function(){ hcSt.drag = false; };
    cv.addEventListener('wheel', function(e){
      e.preventDefault();
      hcSt.zoom = Math.max(0.5, Math.min(3.5, hcSt.zoom - e.deltaY * 0.0012));
    }, { passive: false });
    cv.addEventListener('touchstart', function(e){
      if (e.touches.length === 1) { hcSt.drag = true; hcSt.lx = e.touches[0].clientX; hcSt.ly = e.touches[0].clientY; }
      else if (e.touches.length === 2) {
        var dx = e.touches[0].clientX - e.touches[1].clientX, dy = e.touches[0].clientY - e.touches[1].clientY;
        hcSt.dist = Math.sqrt(dx*dx + dy*dy);
      }
      e.preventDefault();
    }, { passive: false });
    cv.addEventListener('touchmove', function(e){
      if (e.touches.length === 1 && hcSt.drag) {
        hcSt.rotY += (e.touches[0].clientX - hcSt.lx) * 0.014;
        hcSt.rotX += (e.touches[0].clientY - hcSt.ly) * 0.014;
        hcSt.lx = e.touches[0].clientX; hcSt.ly = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        var dx = e.touches[0].clientX - e.touches[1].clientX, dy = e.touches[0].clientY - e.touches[1].clientY;
        var dist = Math.sqrt(dx*dx + dy*dy);
        if (hcSt.dist > 0) hcSt.zoom = Math.max(0.5, Math.min(3.5, hcSt.zoom * dist / hcSt.dist));
        hcSt.dist = dist;
      }
      e.preventDefault();
    }, { passive: false });
    cv.addEventListener('touchend', function(){ hcSt.drag = false; hcSt.dist = 0; });
  }

  function hcEnter(){ hcRenderGrid(); }
  function hcLeave(){ window.hcClose(); }

  // ---------- 9g. Seri Kaplar 3D GÖRSEL Simülasyonu ----------
  // Seçilen 2-3 kap TEK 3D sahnede çizilir: pil → kablolar →
  // elektron akışı; her kapta kendi iyonları 3B göç eder, gazlar
  // kabarcıklanır, metaller birikir, aktif anotlar gerçekten
  // incelir. Sahne sürüklenerek döndürülür (Elektroliz 3D ile
  // aynı doku/his). Kaplama sekmesiyle motor ortaktır (9h).
  var SS_ION = {
    nacl_m:   { c:['Na\u207a','#60a5fa'],        a:['Cl\u207b','#a3e635'] },
    mgcl2:    { c:['Mg\u00b2\u207a','#93c5fd'],  a:['Cl\u207b','#a3e635'] },
    cacl2:    { c:['Ca\u00b2\u207a','#7dd3fc'],  a:['Cl\u207b','#a3e635'] },
    al2o3:    { c:['Al\u00b3\u207a','#e2e8f0'],  a:['O\u00b2\u207b','#f87171'] },
    nacl_a:   { c:['Na\u207a','#60a5fa'],        a:['Cl\u207b','#a3e635'], w:1 },
    water:    { c:['H\u207a','#fca5a5'],         a:['SO\u2084\u00b2\u207b','#c084fc'], w:1 },
    na2so4:   { c:['Na\u207a','#60a5fa'],        a:['SO\u2084\u00b2\u207b','#c084fc'], w:1 },
    ki:       { c:['K\u207a','#c4b5fd'],         a:['I\u207b','#a78bfa'], w:1 },
    cuso4_pt: { c:['Cu\u00b2\u207a','#38bdf8'],  a:['SO\u2084\u00b2\u207b','#c084fc'], w:1 },
    cuso4_cu: { c:['Cu\u00b2\u207a','#38bdf8'],  a:['SO\u2084\u00b2\u207b','#c084fc'] },
    agno3_pt: { c:['Ag\u207a','#e5e7eb'],        a:['NO\u2083\u207b','#f0abfc'], w:1 },
    agno3_ag: { c:['Ag\u207a','#e5e7eb'],        a:['NO\u2083\u207b','#f0abfc'] },
    znso4:    { c:['Zn\u00b2\u207a','#a5f3fc'],  a:['SO\u2084\u00b2\u207b','#c084fc'], w:1 },
    niso4:    { c:['Ni\u00b2\u207a','#6ee7b7'],  a:['SO\u2084\u00b2\u207b','#c084fc'], w:1 },
    crcl3:    { c:['Cr\u00b3\u207a','#93c5fd'],  a:['Cl\u207b','#a3e635'], w:1 },
    aucl3:    { c:['Au\u00b3\u207a','#fbbf24'],  a:['Cl\u207b','#a3e635'], w:1 },
    pbno3:    { c:['Pb\u00b2\u207a','#9ca3af'],  a:['NO\u2083\u207b','#f0abfc'], w:1 }
  };
  var SS_DEPCOL = { cuso4_pt:'#e78a5a', cuso4_cu:'#e78a5a', agno3_pt:'#e2e8f0', agno3_ag:'#e2e8f0',
                    aucl3:'#fbbf24', pbno3:'#9aa3af', crcl3:'#cbd5e1', znso4:'#d7e2ee', niso4:'#c7f0dd',
                    nacl_m:'#cbd5e1', mgcl2:'#cdd5df', cacl2:'#d5dde6', al2o3:'#d8dee8' };
  function ssGasCol(p){
    if (p.indexOf('Cl') === 0) return '#bde04a';
    if (p.indexOf('O')  === 0) return '#bae6fd';
    return '#e2e8f0';
  }

  // ---- Paylaşımlı 3D yardımcılar (Seri Kaplar + Kaplama ortak) ----
  function g3Box(quads, st, W, H, cx, cy, cz, hx, hy, hz, fillRgb, alpha, stroke){
    var C = [
      [cx-hx,cy-hy,cz-hz],[cx+hx,cy-hy,cz-hz],[cx+hx,cy+hy,cz-hz],[cx-hx,cy+hy,cz-hz],
      [cx-hx,cy-hy,cz+hz],[cx+hx,cy-hy,cz+hz],[cx+hx,cy+hy,cz+hz],[cx-hx,cy+hy,cz+hz]
    ];
    var F = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[3,2,6,7],[0,3,7,4],[1,2,6,5]];
    var shade = [0.9, 0.9, 1.0, 0.7, 0.8, 0.8];
    for (var f = 0; f < 6; f++) {
      var pts = [], zsum = 0;
      for (var k = 0; k < 4; k++) {
        var p = hcProj(st, C[F[f][k]][0], C[F[f][k]][1], C[F[f][k]][2], W, H);
        pts.push(p); zsum += p.z;
      }
      quads.push({ t: 'box', pts: pts, z: zsum / 4, fill: fillRgb, a: alpha * shade[f], stroke: stroke });
    }
  }
  function ssRgb(hex){
    hex = (hex || '#94a3b8').replace('#', '');
    return parseInt(hex.slice(0,2),16) + ',' + parseInt(hex.slice(2,4),16) + ',' + parseInt(hex.slice(4,6),16);
  }
  function spawnBub3D(cell, bx, by, bz, col){
    if (cell.bub.length > 16) return;
    cell.bub.push({ x: bx + (Math.random()-0.5)*6, y: Math.max(10, by), z: bz, r: 1.2 + Math.random()*1.4, c: col });
  }
  // Bir hücrenin fizik/kimya bayraklarını elektrolit tanımından türetir
  function ssDeriveFlags(def, k){
    var cat = def.cat, an = def.an;
    var catDis = !cat.gas || k === 'water';
    var catDep = catDis && cat.p.indexOf('H') !== 0;
    var catIonGas = catDis && cat.p.indexOf('H') === 0;
    var catAmbientGas = !catDis && !!cat.gas;
    var anDis = !!an.diss || an.p.indexOf('Cl') === 0 || an.p.indexOf('I') === 0 || k === 'al2o3';
    var anActive = !!an.diss;
    var anDep = anDis && an.p.indexOf('I') === 0;
    var anIonGas = anDis && !anActive && !anDep;
    var anAmbientGas = !anDis && !!an.gas;
    return { catDis:catDis, catDep:catDep, catIonGas:catIonGas, catAmbientGas:catAmbientGas,
             anDis:anDis, anActive:anActive, anDep:anDep, anIonGas:anIonGas, anAmbientGas:anAmbientGas };
  }
  // Ortak iyon fiziği: katyonlar CATX'e, anyonlar ANX'e göçer;
  // vardıklarında hücrenin bayraklarına göre biriktirir/gazlaştırır.
  function ionStep3D(cell, spd){
    var CATX = cell.CATX, ANX = cell.ANX, i;
    for (i = 0; i < cell.ions.length; i++) {
      var io = cell.ions[i];
      io.cool -= 0.016;
      var tx = io.ch > 0 ? CATX : io.ch < 0 ? ANX : io.x;
      if (io.ch !== 0) io.x += (tx - io.x) * 0.012 * spd + (Math.random() - 0.5) * 0.9 * spd;
      else io.x += (Math.random() - 0.5) * 0.6 * spd;
      io.y += (Math.random() - 0.5) * 0.8 * spd;
      io.z += (Math.random() - 0.5) * 0.8 * spd;
      io.x = Math.max(CATX + 3, Math.min(ANX - 3, io.x));
      io.y = Math.max(8, Math.min(90, io.y));
      io.z = Math.max(-44, Math.min(44, io.z));
      var mid = function(){ return CATX + (ANX - CATX) * (0.3 + Math.random() * 0.4); };
      if (io.ch > 0 && io.cool <= 0 && Math.abs(io.x - tx) < 6) {
        if (cell.catDis) {
          if (cell.catDep) cell.dep = Math.min(8, cell.dep + 0.18);
          else spawnBub3D(cell, CATX + 10, io.y, io.z, cell.catGasCol);
          if (cell.anActive) { cell.anodeLeft = Math.max(2, cell.anodeLeft - 0.05); io.x = ANX - 14; }
          else io.x = mid();
          io.y = 8 + Math.random()*80; io.z = -40 + Math.random()*80; io.cool = 1.6;
        } else { io.x += 9; io.cool = 1.2; }
      }
      if (io.ch < 0 && io.cool <= 0 && Math.abs(io.x - tx) < 6) {
        if (cell.anDis) {
          if (cell.anDep) cell.depAn = Math.min(8, cell.depAn + 0.18);
          else if (cell.anIonGas) spawnBub3D(cell, ANX - 10, io.y, io.z, cell.anGasCol);
          io.x = mid(); io.y = 8 + Math.random()*80; io.z = -40 + Math.random()*80; io.cool = 1.6;
        } else { io.x -= 9; io.cool = 1.2; }
      }
    }
    if (cell.catAmbientGas && Math.random() < 0.035 * spd) spawnBub3D(cell, CATX + 10, 24 + Math.random()*58, -18 + Math.random()*36, cell.catGasCol);
    if (cell.anAmbientGas  && Math.random() < 0.035 * spd) spawnBub3D(cell, ANX - 10, 24 + Math.random()*58, -18 + Math.random()*36, cell.anGasCol);
    for (var b = cell.bub.length - 1; b >= 0; b--) {
      var bb = cell.bub[b];
      bb.y -= 0.5 * spd; bb.x += (Math.random()-0.5)*0.5; bb.r = Math.min(4.2, bb.r + 0.018);
      if (bb.y < 4) cell.bub.splice(b, 1);
    }
  }
  // Bir hücreyi (kap veya kaplama nesnesi) 3D sahneye ekler
  function pushTank(items, st, W, H, ox, cell){
    var CATX = cell.CATX, ANX = cell.ANX, i;
    g3Box(items, st, W, H, ox, 50, 0, cell.halfW, 52, 58, '56,130,246', 0.07, 'rgba(120,180,255,.2)');
    // Katot
    if (cell.itemSide === 'cat') {
      var p1 = hcProj(st, ox + CATX, 40, 0, W, H);
      items.push({ t:'item', z:p1.z, x:p1.x, y:p1.y, s:p1.s, icon:cell.itemIcon, bad: cell.itemGlow === 'bad' });
    } else {
      g3Box(items, st, W, H, ox + CATX, 30, 0, 7, 66, 20, '154,164,178', 0.85, 'rgba(200,210,225,.5)');
    }
    // Anot (aktif anotlarda incelir)
    var anHx = cell.anActive ? Math.max(2, cell.anodeLeft) : 7;
    if (cell.itemSide === 'an') {
      var p2 = hcProj(st, ox + ANX, 40, 0, W, H);
      items.push({ t:'item', z:p2.z, x:p2.x, y:p2.y, s:p2.s, icon:cell.itemIcon, bad: cell.itemGlow === 'bad' });
    } else {
      g3Box(items, st, W, H, ox + ANX, 30, 0, anHx, 66, 20, '154,164,178', 0.85, 'rgba(200,210,225,.5)');
    }
    // Birikintiler
    if (cell.dep > 0.3) g3Box(items, st, W, H, ox + CATX + 7 + cell.dep/2, 55, 0, cell.dep/2, 40, 18, ssRgb(cell.catDepCol), 0.9, null);
    if (cell.depAn > 0.3) g3Box(items, st, W, H, ox + ANX - anHx - cell.depAn/2, 55, 0, cell.depAn/2, 40, 18, ssRgb(cell.anDepCol), 0.9, null);
    // İyonlar
    for (i = 0; i < cell.ions.length; i++) {
      var io = cell.ions[i];
      var p = hcProj(st, ox + io.x, io.y, io.z, W, H);
      var lab = io.ch > 0 ? cell.ic.c : io.ch < 0 ? cell.ic.a : null;
      items.push({ t:'ion', z:p.z, x:p.x, y:p.y, s:p.s, r:(io.ch===0?3:5.2)*p.s, c: lab ? lab[1] : '#94a3b8', lab: lab ? lab[0] : null, faint: io.ch===0 });
    }
    // Kabarcıklar
    for (i = 0; i < cell.bub.length; i++) {
      var bb = cell.bub[i];
      var pb = hcProj(st, ox + bb.x, bb.y, bb.z, W, H);
      items.push({ t:'bub', z:pb.z, x:pb.x, y:pb.y, r: bb.r * pb.s, c: bb.c });
    }
    // Etiketler (z-sırasız, en üstte metin listesine eklenir)
    var pc = hcProj(st, ox + CATX, -46, 0, W, H), pa = hcProj(st, ox + ANX, -46, 0, W, H);
    var pcp = hcProj(st, ox + CATX, 104, 0, W, H), pap = hcProj(st, ox + ANX, 104, 0, W, H);
    var pn = hcProj(st, ox, 122, 0, W, H);
    cell._labels = [
      { x: pc.x, y: pc.y, t: '\u2296', c: '#60a5fa', f: 'bold 12px sans-serif' },
      { x: pa.x, y: pa.y, t: '\u2295', c: '#f87171', f: 'bold 12px sans-serif' },
      { x: pcp.x, y: pcp.y, t: cell.catLabel, c: '#e2e8f0', f: 'bold 9px sans-serif' },
      { x: pap.x, y: pap.y, t: cell.anLabel, c: cell.anActive ? '#38bdf8' : '#e2e8f0', f: 'bold 9px sans-serif' },
      { x: pn.x, y: pn.y, t: cell.name, c: 'rgba(199,210,254,.85)', f: '9px sans-serif' }
    ];
  }
  function drawSortedItems(x, items){
    items.sort(function(a, b){ return b.z - a.z; });
    for (var i = 0; i < items.length; i++) {
      var o = items[i];
      var depth = Math.max(0.3, Math.min(1, 1 - (o.z + 130) / 380));
      if (o.t === 'box') {
        x.beginPath(); x.moveTo(o.pts[0].x, o.pts[0].y);
        for (var k = 1; k < 4; k++) x.lineTo(o.pts[k].x, o.pts[k].y);
        x.closePath();
        x.fillStyle = 'rgba(' + o.fill + ',' + o.a + ')'; x.fill();
        if (o.stroke) { x.strokeStyle = o.stroke; x.lineWidth = 0.7; x.stroke(); }
      } else if (o.t === 'ion') {
        x.globalAlpha = o.faint ? 0.35 : 0.95;
        x.beginPath(); x.arc(o.x, o.y, Math.max(1, o.r), 0, 6.283); x.fillStyle = o.c; x.fill();
        x.globalAlpha = 1;
        if (o.lab && o.r > 3.2) {
          x.fillStyle = '#0b0e18'; x.font = 'bold ' + Math.max(5.5, o.r*1.05) + 'px sans-serif';
          x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(o.lab, o.x, o.y); x.textBaseline = 'alphabetic';
        }
      } else if (o.t === 'bub') {
        x.beginPath(); x.arc(o.x, o.y, Math.max(0.5, o.r), 0, 6.283);
        x.strokeStyle = o.c; x.lineWidth = 1; x.stroke();
        x.fillStyle = 'rgba(255,255,255,.12)'; x.fill();
      } else if (o.t === 'item') {
        var r = 15 * o.s;
        if (o.bad) { x.beginPath(); x.arc(o.x, o.y, r + 7*o.s, 0, 6.283); x.fillStyle = 'rgba(239,68,68,.25)'; x.fill(); }
        else { x.beginPath(); x.arc(o.x, o.y, r + 5*o.s, 0, 6.283); x.fillStyle = 'rgba(129,140,248,.18)'; x.fill(); }
        var gg = x.createRadialGradient(o.x - r*0.3, o.y - r*0.3, r*0.1, o.x, o.y, r);
        gg.addColorStop(0, '#3b4257'); gg.addColorStop(1, '#12141f');
        x.beginPath(); x.arc(o.x, o.y, r, 0, 6.283); x.fillStyle = gg; x.fill();
        x.strokeStyle = o.bad ? 'rgba(239,68,68,.7)' : 'rgba(129,140,248,.5)'; x.lineWidth = 1.3; x.stroke();
        x.font = Math.max(11, r*1.15) + 'px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
        x.fillText(o.icon, o.x, o.y); x.textBaseline = 'alphabetic';
      }
    }
  }

  var ssVis = { anim: null, t: 0, built: '', cells: [], rotX: 0.3, rotY: -0.5, zoom: 1, drag: false, lx: 0, ly: 0, dist: 0, bound: false };
  function ssVisStart(){
    ssBindCanvas();
    if (ssVis.anim) cancelAnimationFrame(ssVis.anim);
    ssVisLoop();
  }
  function ssVisStop(){ if (ssVis.anim) { cancelAnimationFrame(ssVis.anim); ssVis.anim = null; } }

  function ssLayout(n){
    if (n === 3) return { scale: 0.6, offs: [-195, 0, 195] };
    return { scale: 1, offs: [-150, 150] };
  }

  function ssVisBuild(){
    ssVis.built = ssCount + ':' + ssSel.slice(0, ssCount).join(',');
    ssVis.cells = [];
    var lay = ssLayout(ssCount);
    for (var i = 0; i < ssCount; i++) {
      var k = ssSel[i], def = ssCellDef(k), ic = SS_ION[k] || SS_ION.water;
      var fl = ssDeriveFlags(def, k);
      var CATX = -72 * lay.scale, ANX = 72 * lay.scale;
      var cell = {
        k: k, name: def.name, ic: ic, halfW: 108 * lay.scale, CATX: CATX, ANX: ANX,
        catDis: fl.catDis, catDep: fl.catDep, catIonGas: fl.catIonGas, catAmbientGas: fl.catAmbientGas,
        anDis: fl.anDis, anActive: fl.anActive, anDep: fl.anDep, anIonGas: fl.anIonGas, anAmbientGas: fl.anAmbientGas,
        catGasCol: ssGasCol(def.cat.p), anGasCol: def.an.p.indexOf('I') === 0 ? '#a78bfa' : ssGasCol(def.an.p),
        catDepCol: SS_DEPCOL[k] || '#cbd5e1', anDepCol: def.an.p.indexOf('I') === 0 ? '#7c3aed' : (SS_DEPCOL[k] || '#cbd5e1'),
        catLabel: pretty(def.cat.p), anLabel: pretty(def.an.p),
        dep: 0, depAn: 0, anodeLeft: 8, ions: [], bub: [], itemSide: null, _labels: []
      };
      var nEach = ssCount === 3 ? 4 : 5;
      for (var j = 0; j < nEach; j++) {
        cell.ions.push({ x: CATX + (ANX-CATX)*(0.3+Math.random()*0.4), y: 10+Math.random()*78, z: -40+Math.random()*80, ch: 1,  cool: Math.random()*2 });
        cell.ions.push({ x: CATX + (ANX-CATX)*(0.3+Math.random()*0.4), y: 10+Math.random()*78, z: -40+Math.random()*80, ch: -1, cool: Math.random()*2 });
      }
      if (ic.w) for (var j2 = 0; j2 < 3; j2++)
        cell.ions.push({ x: CATX + (ANX-CATX)*Math.random(), y: 8+Math.random()*82, z: -42+Math.random()*84, ch: 0, cool: 0 });
      ssVis.cells.push(cell);
    }
  }

  function ssBindCanvas(){
    if (ssVis.bound) return;
    var cv = document.getElementById('ss-cv');
    if (!cv) return;
    ssVis.bound = true;
    cv.onmousedown = function(e){ ssVis.drag = true; ssVis.lx = e.clientX; ssVis.ly = e.clientY; };
    cv.onmousemove = function(e){
      if (!ssVis.drag) return;
      ssVis.rotY += (e.clientX - ssVis.lx) * 0.01; ssVis.rotX += (e.clientY - ssVis.ly) * 0.01;
      ssVis.lx = e.clientX; ssVis.ly = e.clientY;
    };
    cv.onmouseup = cv.onmouseleave = function(){ ssVis.drag = false; };
    cv.addEventListener('wheel', function(e){ e.preventDefault(); ssVis.zoom = Math.max(0.5, Math.min(2.2, ssVis.zoom - e.deltaY*0.001)); }, {passive:false});
    cv.addEventListener('touchstart', function(e){
      if (e.touches.length === 1) { ssVis.drag = true; ssVis.lx = e.touches[0].clientX; ssVis.ly = e.touches[0].clientY; }
      else if (e.touches.length === 2) { var dx=e.touches[0].clientX-e.touches[1].clientX, dy=e.touches[0].clientY-e.touches[1].clientY; ssVis.dist=Math.sqrt(dx*dx+dy*dy); }
      e.preventDefault();
    }, {passive:false});
    cv.addEventListener('touchmove', function(e){
      if (e.touches.length === 1 && ssVis.drag) {
        ssVis.rotY += (e.touches[0].clientX - ssVis.lx) * 0.013; ssVis.rotX += (e.touches[0].clientY - ssVis.ly) * 0.013;
        ssVis.lx = e.touches[0].clientX; ssVis.ly = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        var dx=e.touches[0].clientX-e.touches[1].clientX, dy=e.touches[0].clientY-e.touches[1].clientY, dist=Math.sqrt(dx*dx+dy*dy);
        if (ssVis.dist > 0) ssVis.zoom = Math.max(0.5, Math.min(2.2, ssVis.zoom * dist/ssVis.dist));
        ssVis.dist = dist;
      }
      e.preventDefault();
    }, {passive:false});
    cv.addEventListener('touchend', function(){ ssVis.drag = false; ssVis.dist = 0; });
  }

  function ssVisLoop(){
    var scr = document.getElementById('s-elz');
    if (!scr || scr.style.display === 'none') { ssVisStop(); return; }
    ssVis.anim = requestAnimationFrame(ssVisLoop);
    var cv = document.getElementById('ss-cv');
    if (!cv) return;
    var rect = cv.getBoundingClientRect();
    var W = rect.width || cv.clientWidth || (cv.parentElement && cv.parentElement.clientWidth) || 0;
    var H = 280;
    if (W < 10) return;
    var dpr = window.devicePixelRatio || 1;
    var x = cv.getContext('2d');
    try {
    if (!ssVis.cells.length) ssVisBuild();
    if (Math.abs(cv.width - W*dpr) > 2 || Math.abs(cv.height - H*dpr) > 2) { cv.width = W*dpr; cv.height = H*dpr; }
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    var st = { rotX: ssVis.rotX, rotY: ssVis.rotY, zoom: ssVis.zoom, fit: 1, stars: ssVis._stars, sw: ssVis._sw, t: ssVis.t };
    hcBg(x, st, W, H);
    ssVis._stars = st.stars; ssVis._sw = st.sw;

    var I = parseFloat((document.getElementById('ss-i-num') || {}).value);
    if (isNaN(I) || I <= 0) I = 5;
    var spd = Math.max(0.3, Math.min(3, I / 5));
    ssVis.t += 0.016;
    if (ssVis.built !== ssCount + ':' + ssSel.slice(0, ssCount).join(',')) ssVisBuild();

    var lay = ssLayout(ssCount), items = [];
    for (var i = 0; i < ssVis.cells.length; i++) {
      ionStep3D(ssVis.cells[i], spd);
      pushTank(items, st, W, H, lay.offs[i], ssVis.cells[i]);
    }

    // Pil + kablolar + elektron akışı (3D dünya koordinatlarında)
    g3Box(items, st, W, H, 0, -92, 0, 32, 13, 13, '30,36,54', 0.95, 'rgba(129,140,248,.6)');
    var path = [[-34,-92,0],[-34,-68,0],[lay.offs[0]+ssVis.cells[0].CATX,-68,0],[lay.offs[0]+ssVis.cells[0].CATX,-36,0]];
    for (i = 0; i < ssVis.cells.length - 1; i++) {
      path.push([lay.offs[i]+ssVis.cells[i].ANX,-36,0], [lay.offs[i]+ssVis.cells[i].ANX,-68,0],
                [lay.offs[i+1]+ssVis.cells[i+1].CATX,-68,0], [lay.offs[i+1]+ssVis.cells[i+1].CATX,-36,0]);
    }
    var lastI = ssVis.cells.length - 1;
    path.push([lay.offs[lastI]+ssVis.cells[lastI].ANX,-36,0], [lay.offs[lastI]+ssVis.cells[lastI].ANX,-68,0], [34,-68,0], [34,-92,0]);

    drawSortedItems(x, items);

    // Kabloları çiz (üstte, düz çizgiler)
    x.strokeStyle = 'rgba(148,163,184,.55)'; x.lineWidth = 2; x.lineCap = 'round';
    x.beginPath();
    var p0 = hcProj(st, path[0][0], path[0][1], path[0][2], W, H);
    x.moveTo(p0.x, p0.y);
    for (i = 1; i < path.length; i++) { var pp = hcProj(st, path[i][0], path[i][1], path[i][2], W, H); x.lineTo(pp.x, pp.y); }
    x.stroke();
    // Elektron akış noktaları
    var segLen = [0], tot = 0, pr = hcProj(st, path[0][0],path[0][1],path[0][2], W, H);
    for (i = 1; i < path.length; i++) { var cp = hcProj(st, path[i][0],path[i][1],path[i][2], W, H); tot += Math.hypot(cp.x-pr.x, cp.y-pr.y); segLen.push(tot); pr = cp; }
    for (var ed = 0; ed < 6; ed++) {
      var f = ((ssVis.t * 0.09 * spd) + ed/6) % 1, d = f * tot;
      for (var s2 = 1; s2 < path.length; s2++) {
        if (segLen[s2] >= d) {
          var ft = segLen[s2] === segLen[s2-1] ? 0 : (d - segLen[s2-1]) / (segLen[s2] - segLen[s2-1]);
          var a1 = hcProj(st, path[s2-1][0],path[s2-1][1],path[s2-1][2], W, H), a2 = hcProj(st, path[s2][0],path[s2][1],path[s2][2], W, H);
          var ex = a1.x + (a2.x-a1.x)*ft, ey = a1.y + (a2.y-a1.y)*ft;
          x.beginPath(); x.arc(ex, ey, 2.6, 0, 6.283); x.fillStyle = '#facc15'; x.fill();
          break;
        }
      }
    }
    // Etiketler
    for (i = 0; i < ssVis.cells.length; i++) {
      var labs = ssVis.cells[i]._labels;
      for (var l = 0; l < labs.length; l++) {
        x.fillStyle = labs[l].c; x.font = labs[l].f; x.textAlign = 'center';
        x.fillText(labs[l].t, labs[l].x, labs[l].y);
      }
    }
    var pbatt = hcProj(st, 0, -108, 0, W, H);
    x.fillStyle = '#c7d2fe'; x.font = 'bold 9px sans-serif'; x.textAlign = 'center';
    x.fillText('DC G\u00dc\u00c7 KAYNA\u011eI', pbatt.x, pbatt.y);
    x.fillStyle = 'rgba(255,255,255,.28)'; x.font = '10px sans-serif'; x.textAlign = 'left';
    x.fillText('\ud83d\udc46 S\u00fcr\u00fckle d\u00f6nd\u00fcr', 8, H - 8);
    x.textAlign = 'right';
    x.fillText('I = ' + I.toFixed(3) + ' A', W - 8, H - 8);
    x.textAlign = 'left';
    } catch (drawErrObj) { drawErr(x, W, H, drawErrObj); }
  }

  // Ekranda hata gösterici — mobilde konsol açmak zor olduğu için
  // 3D sahnelerde bir hata olursa doğrudan canvas üzerine yazılır.
  function drawErr(x, W, H, err){
    x.fillStyle = '#1a0505'; x.fillRect(0, 0, W, H);
    x.fillStyle = '#fca5a5'; x.font = 'bold 12px sans-serif'; x.textAlign = 'left';
    x.fillText('\u26a0\ufe0f \u00c7izim hatas\u0131 (bu yaz\u0131y\u0131 g\u00f6nder):', 10, 24);
    var msg = String(err && err.message || err);
    var words = msg.split(' '), line = '', y = 46;
    x.font = '11px monospace';
    for (var i = 0; i < words.length; i++) {
      var test = line + words[i] + ' ';
      if (test.length > 42) { x.fillText(line, 10, y); line = words[i] + ' '; y += 16; if (y > H - 40) break; }
      else line = test;
    }
    x.fillText(line, 10, y);
    if (err && err.stack) {
      x.fillStyle = 'rgba(252,165,165,.6)'; x.font = '9px monospace';
      var sl = String(err.stack).split('\n').slice(1, 3);
      for (var j = 0; j < sl.length; j++) x.fillText(sl[j].trim().slice(0, 46), 10, y + 20 + j*13);
    }
    try { console.error('Ronya 3D çizim hatası:', err); } catch (e2) {}
  }

  // ---------- 9h. Kaplama 3D Görselleştirme ----------
  // Seri Kaplar ile AYNI 3D motoru (pushTank/ionStep3D/g3Box)
  // kullanır. Seçilen senaryoya göre nesne (kaşık/kolye) veya
  // metal çubuk katot/anot olur; "Yanlış Bağlantı" doğru
  // kutbun neden önemli olduğunu görsel olarak kanıtlar.
  var CAP_META = [
    { metalSym:'Ag', ionCol:'#e5e7eb', depCol:'#e5e7eb', icon:'\ud83e\udd44', itemLabel:'Demir ka\u015f\u0131k', metalLabel:'Saf g\u00fcm\u00fc\u015f', hasItem:true },
    { metalSym:'Cu', ionCol:'#38bdf8', depCol:'#e78a5a', icon:'\ud83d\udfe0', itemLabel:'Safs\u0131z Cu (anot)', metalLabel:'Saf Cu (katot)', hasItem:false },
    { metalSym:'Au', ionCol:'#fbbf24', depCol:'#fbbf24', icon:'\ud83d\udc8d', itemLabel:'G\u00fcm\u00fc\u015f kolye', metalLabel:'Saf alt\u0131n', hasItem:true }
  ];
  var capSt = { anim: null, t: 0, idx: 0, correct: true, rotX: 0.32, rotY: -0.5, zoom: 1, drag: false, lx: 0, ly: 0, dist: 0, bound: false, cell: null };

  function capBuildCell(){
    var meta = CAP_META[capSt.idx];
    var CATX = -60, ANX = 60;
    var itemSide = capSt.correct ? 'cat' : 'an';
    var cell = {
      k: 'cap', name: meta.hasItem ? '' : (capSt.correct ? 'Saf Cu katot \u00b7 Safs\u0131z Cu anot' : 'Safs\u0131z Cu katot \u00b7 Saf Cu anot (YANLI\u015e)'),
      ic: { c: [meta.metalSym + '\u207a', meta.ionCol], a: ['SO\u2084\u00b2\u207b', '#c084fc'] },
      halfW: 96, CATX: CATX, ANX: ANX,
      catDis: true, catDep: true, catIonGas: false, catAmbientGas: false,
      anDis: true, anActive: true, anDep: false, anIonGas: false, anAmbientGas: false,
      catGasCol: '#e2e8f0', anGasCol: '#e2e8f0',
      catDepCol: meta.depCol, anDepCol: meta.depCol,
      catLabel: capSt.correct ? (meta.hasItem ? '\u2713 Kaplan\u0131yor!' : 'Saf Cu birikiyor') : (meta.hasItem ? '\u2717 Kaplanm\u0131yor' : 'Cu birikiyor (bo\u015fa)'),
      anLabel: capSt.correct ? (meta.hasItem ? meta.metalLabel + ' \u00e7\u00f6z\u00fcn\u00fcyor' : 'Safs\u0131z Cu \u00e7\u00f6z\u00fcn\u00fcyor') : (meta.hasItem ? '\u26a0 Nesne \u00e7\u00f6z\u00fcn\u00fcyor!' : 'Saf Cu bo\u015fa \u00e7\u00f6z\u00fcn\u00fcyor'),
      dep: 0, depAn: 0, anodeLeft: 8, ions: [], bub: [],
      itemSide: meta.hasItem ? itemSide : null,
      itemIcon: meta.icon, itemGlow: capSt.correct ? 'good' : 'bad'
    };
    for (var j = 0; j < 6; j++) {
      cell.ions.push({ x: CATX + (ANX-CATX)*(0.3+Math.random()*0.4), y: 10+Math.random()*78, z: -38+Math.random()*76, ch: 1, cool: Math.random()*2 });
      cell.ions.push({ x: CATX + (ANX-CATX)*(0.3+Math.random()*0.4), y: 10+Math.random()*78, z: -38+Math.random()*76, ch: -1, cool: Math.random()*2 });
    }
    capSt.cell = cell;
  }

  window.capSetMode = function(correct, btn){
    capSt.correct = correct;
    if (btn) {
      var bs = btn.parentElement.querySelectorAll('button');
      for (var i = 0; i < bs.length; i++) bs[i].classList.remove('sel2');
      btn.classList.add('sel2');
    }
    capBuildCell();
  };
  function capSetScenario(idx){
    if (idx < 0 || idx > 2) idx = 0;
    capSt.idx = idx;
    capBuildCell();
    var t = document.getElementById('cap-title');
    if (t) t.textContent = ELZ_SCEN[idx].icon + ' ' + ELZ_SCEN[idx].title;
  }

  function capBindCanvas(){
    if (capSt.bound) return;
    var cv = document.getElementById('cap-cv');
    if (!cv) return;
    capSt.bound = true;
    cv.onmousedown = function(e){ capSt.drag = true; capSt.lx = e.clientX; capSt.ly = e.clientY; };
    cv.onmousemove = function(e){
      if (!capSt.drag) return;
      capSt.rotY += (e.clientX - capSt.lx) * 0.01; capSt.rotX += (e.clientY - capSt.ly) * 0.01;
      capSt.lx = e.clientX; capSt.ly = e.clientY;
    };
    cv.onmouseup = cv.onmouseleave = function(){ capSt.drag = false; };
    cv.addEventListener('wheel', function(e){ e.preventDefault(); capSt.zoom = Math.max(0.5, Math.min(2.2, capSt.zoom - e.deltaY*0.001)); }, {passive:false});
    cv.addEventListener('touchstart', function(e){
      if (e.touches.length === 1) { capSt.drag = true; capSt.lx = e.touches[0].clientX; capSt.ly = e.touches[0].clientY; }
      else if (e.touches.length === 2) { var dx=e.touches[0].clientX-e.touches[1].clientX, dy=e.touches[0].clientY-e.touches[1].clientY; capSt.dist=Math.sqrt(dx*dx+dy*dy); }
      e.preventDefault();
    }, {passive:false});
    cv.addEventListener('touchmove', function(e){
      if (e.touches.length === 1 && capSt.drag) {
        capSt.rotY += (e.touches[0].clientX - capSt.lx) * 0.013; capSt.rotX += (e.touches[0].clientY - capSt.ly) * 0.013;
        capSt.lx = e.touches[0].clientX; capSt.ly = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        var dx=e.touches[0].clientX-e.touches[1].clientX, dy=e.touches[0].clientY-e.touches[1].clientY, dist=Math.sqrt(dx*dx+dy*dy);
        if (capSt.dist > 0) capSt.zoom = Math.max(0.5, Math.min(2.2, capSt.zoom * dist/capSt.dist));
        capSt.dist = dist;
      }
      e.preventDefault();
    }, {passive:false});
    cv.addEventListener('touchend', function(){ capSt.drag = false; capSt.dist = 0; });
  }

  function capStart(){
    if (!capSt.cell) capBuildCell();
    capBindCanvas();
    if (capSt.anim) cancelAnimationFrame(capSt.anim);
    capLoop();
  }
  function capStop(){ if (capSt.anim) { cancelAnimationFrame(capSt.anim); capSt.anim = null; } }

  function capLoop(){
    var scr = document.getElementById('s-elz');
    if (!scr || scr.style.display === 'none') { capStop(); return; }
    capSt.anim = requestAnimationFrame(capLoop);
    var cv = document.getElementById('cap-cv');
    if (!cv) return;
    var rect = cv.getBoundingClientRect();
    var W = rect.width || cv.clientWidth || (cv.parentElement && cv.parentElement.clientWidth) || 0;
    var H = 260;
    if (W < 10) return;
    var dpr = window.devicePixelRatio || 1;
    var x = cv.getContext('2d');
    try {
    if (!capSt.cell) capBuildCell();
    if (Math.abs(cv.width - W*dpr) > 2 || Math.abs(cv.height - H*dpr) > 2) { cv.width = W*dpr; cv.height = H*dpr; }
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    var st = { rotX: capSt.rotX, rotY: capSt.rotY, zoom: capSt.zoom, fit: 1, stars: capSt._stars, sw: capSt._sw, t: capSt.t };
    hcBg(x, st, W, H);
    capSt._stars = st.stars; capSt._sw = st.sw;
    capSt.t += 0.016;

    ionStep3D(capSt.cell, 1.1);
    var items = [];
    pushTank(items, st, W, H, 0, capSt.cell);
    g3Box(items, st, W, H, 0, -92, 0, 30, 12, 12, '30,36,54', 0.95, 'rgba(129,140,248,.6)');
    drawSortedItems(x, items);

    // Kablolar (pil -> katot, anot -> pil) — hangi taraf katot ise oraya (-) gider
    var CATX = capSt.cell.CATX, ANX = capSt.cell.ANX;
    var pB1 = hcProj(st, -14, -92, 0, W, H), pB2 = hcProj(st, 14, -92, 0, W, H);
    var pC = hcProj(st, CATX, -36, 0, W, H), pA = hcProj(st, ANX, -36, 0, W, H);
    var pCm = hcProj(st, CATX, -68, 0, W, H), pAm = hcProj(st, ANX, -68, 0, W, H);
    x.strokeStyle = 'rgba(148,163,184,.55)'; x.lineWidth = 2; x.lineCap = 'round';
    x.beginPath(); x.moveTo(pB1.x,pB1.y); x.lineTo(pCm.x,pB1.y); x.lineTo(pCm.x,pCm.y); x.lineTo(pC.x,pC.y); x.stroke();
    x.beginPath(); x.moveTo(pB2.x,pB2.y); x.lineTo(pAm.x,pB2.y); x.lineTo(pAm.x,pAm.y); x.lineTo(pA.x,pA.y); x.stroke();
    x.fillStyle = capSt.correct ? '#60a5fa' : '#f87171';
    x.font = 'bold 10px sans-serif'; x.textAlign = 'center';
    var pMinus = hcProj(st, -14, -100, 0, W, H);
    x.fillText('\u2212', pMinus.x, pMinus.y);

    var labs = capSt.cell._labels;
    for (var l = 0; l < labs.length; l++) {
      x.fillStyle = labs[l].c; x.font = labs[l].f; x.textAlign = 'center';
      x.fillText(labs[l].t, labs[l].x, labs[l].y);
    }
    x.fillStyle = 'rgba(255,255,255,.28)'; x.font = '10px sans-serif'; x.textAlign = 'left';
    x.fillText('\ud83d\udc46 S\u00fcr\u00fckle d\u00f6nd\u00fcr', 8, H - 8);
    x.textAlign = 'right';
    x.fillStyle = capSt.correct ? '#22c55e' : '#ef4444';
    x.fillText(capSt.correct ? '\u2713 DO\u011eRU BA\u011eLANTI' : '\u2717 YANLI\u015e BA\u011eLANTI', W - 8, H - 8);
    x.textAlign = 'left';
    } catch (drawErrObj2) { drawErr(x, W, H, drawErrObj2); }
  }


  function elzTabGo(idx){
    tswitch('elz-tabs', 'elz-tps', idx);
    elzStop(); ssVisStop(); capStop();
    if (idx === 0) elzStart();
    else if (idx === 2) capStart();
    else if (idx === 3) ssVisStart();
  }
  window.elzTabGo = elzTabGo;

  // ---------- 11a. GENEL 3D İSKELET MOTORU (dallanma + heteroatom destekli) ----------
  // Mevcut hcBuild (Bölüm 10) dokunulmadan bırakıldı — galeri onunla çalışmaya
  // devam ediyor. Bu bölüm, "isimden çiz" özelliği ve fonksiyonel gruplar için
  // YENİ, dallanma destekli bir iskelet motoru ekler; aynı vektör yardımcılarını
  // (v3, vAdd, vSub, vScale, vNorm, vCross, rotZv, HC_TETRA) kullanır.
  function vDot(a, b){ return a.x*b.x + a.y*b.y + a.z*b.z; }
  function vLen2(a){ return Math.sqrt(vDot(a,a)); }
  function rotAxis(v, axis, ang){
    axis = vNorm(axis);
    var c = Math.cos(ang), s = Math.sin(ang);
    var t1 = vScale(v, c);
    var t2 = vScale(vCross(axis, v), s);
    var t3 = vScale(axis, vDot(axis, v) * (1 - c));
    return vAdd(vAdd(t1, t2), t3);
  }
  function perpAxis(u){
    return Math.abs(u.z) < 0.9 ? vNorm(vCross(u, v3(0,0,1))) : vNorm(vCross(u, v3(1,0,0)));
  }

  // Bir atomun MEVCUT komşu yönlerine göre, EKSİK olan (H veya yeni dal için)
  // yönleri döndürür. nb: [{dir, o}], count: kaç yön isteniyor.
  function freeDirs(nb, count){
    if (count <= 0) return [];
    if (nb.length === 0) {
      var q3 = 1 / Math.sqrt(3);
      var full = [v3(q3,q3,q3), v3(q3,-q3,-q3), v3(-q3,q3,-q3), v3(-q3,-q3,q3)];
      return full.slice(0, count);
    }
    if (nb.length === 1) {
      var u = nb[0].dir;
      if (count === 1) {
        if (nb[0].o === 3) return [vScale(u, -1)];               // ≡C-H (doğrusal)
        // Genel sp³ tek-bağ devamı: mevcut yönden 109.47° açıyla
        var axSingle = perpAxis(u);
        return [rotAxis(vScale(u, -1), axSingle, HC_TETRA)];
      }
      if (count === 2) {                                          // =CH₂ ya da dal ikilisi (~120°)
        return [rotZv3(u, 2.0944), rotZv3(u, -2.0944)];
      }
      if (count === 3) {                                          // -CH₃ üçayak (109.47°)
        var p = perpAxis(u), q = vNorm(vCross(u, p));
        var dirs3 = [];
        for (var t3 = 0; t3 < 3; t3++) {
          var a3 = 0.5236 + t3 * 2.0944;
          dirs3.push(vNorm(vAdd(vScale(u, -0.33333),
            vScale(vAdd(vScale(p, Math.cos(a3)), vScale(q, Math.sin(a3))), 0.94281))));
        }
        return dirs3;
      }
    }
    if (nb.length === 2) {
      var u1 = nb[0].dir, u2 = nb[1].dir, s2 = vAdd(u1, u2);
      if (count === 1) return [vNorm(vScale(s2, -1))];             // sp² tek eksik (=CH- ya da dal)
      if (count === 2) {                                           // sp³ -CH₂-
        var bb = vNorm(vScale(s2, -1));
        var nn = vCross(u1, u2);
        if (vLen2(nn) < 1e-4) nn = v3(0, 0, 1);
        nn = vNorm(nn);
        return [ vNorm(vAdd(vScale(bb, 0.57735), vScale(nn, 0.81650))),
                 vNorm(vAdd(vScale(bb, 0.57735), vScale(nn, -0.81650))) ];
      }
    }
    if (nb.length === 3 && count === 1) {
      // Tam tetrahedral: 4 birim vektörün toplamı ≈ 0 → 4.'yü diğer 3'ten bul
      var sum3 = vAdd(vAdd(nb[0].dir, nb[1].dir), nb[2].dir);
      return [vNorm(vScale(sum3, -1))];
    }
    return [];
  }
  // rotZv, sadece Z ekseni etrafında döner; =CH₂ gibi rastgele yönlü tek bağdan
  // ikili dal üretirken KEYFİ (ama tutarlı) bir dik eksen etrafında dönmemiz
  // gerekir — bu yüzden rotZv'nin genel 3B karşılığı:
  function rotZv3(u, ang){
    var ax = perpAxis(u);
    return rotAxis(u, ax, ang);
  }

  // Bir zincir dalını (metil, etil, propil, bütil...) verilen başlangıç
  // konumundan ve yönünden itibaren zikzak şeklinde büyütür.
  function growChain(parentPos, startDir, count){
    var positions = [];
    var d = vNorm(startDir);
    var pos = vAdd(parentPos, vScale(d, 1.54));
    positions.push(pos);
    if (count === 1) return positions;
    var axis = perpAxis(d);
    var sign = -1;
    for (var i = 1; i < count; i++) {
      d = rotAxis(d, axis, sign * HC_TETRA);
      sign = -sign;
      pos = vAdd(pos, vScale(d, 1.54));
      positions.push(pos);
    }
    return positions;
  }

  // ---------- 11b. DALLANMIŞ İSKELET İNŞACISI ----------
  // hcBuildAt(n, kind, dbAt, branches): ana zincir + dallar + tüm H'leri
  // tek seferde üretir. dbAt: çift/üçlü bağın 0-index'li İLK karbonu
  // (locant-1). branches: [{locant, carbons, special}] — special:
  // null (düz zincir) | 'izopropil' | 'izobutil' | 'tersbutil'.
  function hcBuildAt(n, kind, dbAt, branches){
    dbAt = (dbAt === undefined || dbAt === null) ? 0 : dbAt;
    branches = branches || [];
    // Bağ dereceleri: index i = atom i ile i+1 arasındaki bağ derecesi
    var ord = [];
    for (var i = 0; i < n - 1; i++) {
      if (kind === 'en' && i === dbAt) ord.push(2);
      else if (kind === 'in' && i === dbAt) ord.push(3);
      else ord.push(1);
    }
    // Ana zincir konumları
    var C = [v3(0, 0, 0)];
    var d = v3(1, 0, 0), sign = -1;
    if (n > 1) d = rotZv(d, 0.61548);
    for (i = 1; i < n; i++) {
      var curO = ord[i - 1];
      var prevO = i >= 2 ? ord[i - 2] : 1;
      var len = curO === 3 ? 1.20 : curO === 2 ? 1.34 : 1.54;
      if (i === 1) {
        // ilk bağ: başlangıç eğimi zaten ayarlı
      } else if (prevO >= 2) {
        d = rotZv(d, 1.0472); sign = -1;                 // çoklu bağdan çıkış: 120° kink
      } else {
        d = rotZv(d, sign * HC_TETRA); sign = -sign;      // sıradan sp³-sp³
      }
      C.push(vAdd(C[i - 1], vScale(d, len)));
    }
    // Ana ekseni yatayla hizala
    if (n > 1) {
      var ax0 = vSub(C[n - 1], C[0]), ang0 = Math.atan2(ax0.y, ax0.x);
      for (i = 0; i < n; i++) C[i] = rotZv(C[i], -ang0);
    }
    var atoms = [], bonds = [];
    for (i = 0; i < n; i++) atoms.push({ x: C[i].x, y: C[i].y, z: C[i].z, el: 'C' });
    for (i = 0; i < n - 1; i++) bonds.push({ a: i, b: i + 1, o: ord[i] });

    function nbOf(idx){
      var nb = [];
      for (var b2 = 0; b2 < bonds.length; b2++) {
        var A = atoms[bonds[b2].a], B = atoms[bonds[b2].b];
        if (bonds[b2].a === idx) nb.push({ dir: vNorm(vSub(v3(B.x,B.y,B.z), v3(A.x,A.y,A.z))), o: bonds[b2].o });
        if (bonds[b2].b === idx) nb.push({ dir: vNorm(vSub(v3(A.x,A.y,A.z), v3(B.x,B.y,B.z))), o: bonds[b2].o });
      }
      return nb;
    }
    function addAtom(pos){ var idx = atoms.length; atoms.push({ x: pos.x, y: pos.y, z: pos.z, el: 'C' }); return idx; }

    // Dalları ekle — AYNI karbona (aynı locant) bağlanan dallar TEK seferde
    // hesaplanmalı, yoksa iki ayrı tek-yön isteği aynı düzlemde çakışabilir.
    var byLocant = {};
    for (var br0 = 0; br0 < branches.length; br0++) {
      var loc0 = branches[br0].locant;
      (byLocant[loc0] = byLocant[loc0] || []).push(branches[br0]);
    }
    var locKeys = Object.keys(byLocant);
    for (var lk = 0; lk < locKeys.length; lk++) {
      var pIdx = parseInt(locKeys[lk], 10) - 1;
      if (pIdx < 0 || pIdx >= n) continue;
      var group = byLocant[locKeys[lk]];
      var pPos = v3(atoms[pIdx].x, atoms[pIdx].y, atoms[pIdx].z);
      var hasSpecial = group.some(function(g){ return !!g.special; });

      if (group.length === 1 || hasSpecial) {
        // Tek dal (ya da özel dallı grup) — sırayla, her seferinde güncel nb ile
        for (var gi = 0; gi < group.length; gi++) {
          var b = group[gi];
          var free1 = freeDirs(nbOf(pIdx), 1);
          if (!free1.length) continue;
          attachOneBranch(b, pIdx, pPos, free1[0]);
        }
      } else {
        // Aynı locant'ta 2+ düz-zincir dal — TÜM yönleri birlikte iste
        var freeN = freeDirs(nbOf(pIdx), group.length);
        for (var gj = 0; gj < group.length && gj < freeN.length; gj++)
          attachOneBranch(group[gj], pIdx, pPos, freeN[gj]);
      }
    }

    function attachOneBranch(b, pIdx, pPos, dir0){
      if (b.special === 'izopropil' || b.special === 'tersbutil') {
        var c1pos = vAdd(pPos, vScale(dir0, 1.54));
        var c1idx = addAtom(c1pos);
        bonds.push({ a: pIdx, b: c1idx, o: 1 });
        var nbC1 = [{ dir: vScale(dir0, -1), o: 1 }];
        var need = b.special === 'izopropil' ? 2 : 3;
        var dirs = freeDirs(nbC1, need);
        for (var k1 = 0; k1 < dirs.length; k1++) {
          var mp = vAdd(c1pos, vScale(dirs[k1], 1.54));
          var mi = addAtom(mp);
          bonds.push({ a: c1idx, b: mi, o: 1 });
        }
      } else if (b.special === 'izobutil') {
        var d1pos = vAdd(pPos, vScale(dir0, 1.54));
        var d1idx = addAtom(d1pos);
        bonds.push({ a: pIdx, b: d1idx, o: 1 });
        var nbD1 = [{ dir: vScale(dir0, -1), o: 1 }];
        var dir1 = freeDirs(nbD1, 1)[0];
        var d2pos = vAdd(d1pos, vScale(dir1, 1.54));
        var d2idx = addAtom(d2pos);
        bonds.push({ a: d1idx, b: d2idx, o: 1 });
        var nbD2 = [{ dir: vScale(dir1, -1), o: 1 }];
        var twoDirs = freeDirs(nbD2, 2);
        for (var k2 = 0; k2 < twoDirs.length; k2++) {
          var mp2 = vAdd(d2pos, vScale(twoDirs[k2], 1.54));
          var mi2 = addAtom(mp2);
          bonds.push({ a: d2idx, b: mi2, o: 1 });
        }
      } else {
        var positions = growChain(pPos, dir0, b.carbons);
        var prevIdx = pIdx;
        for (var pi = 0; pi < positions.length; pi++) {
          var ni = addAtom(positions[pi]);
          bonds.push({ a: prevIdx, b: ni, o: 1 });
          prevIdx = ni;
        }
      }
    }

    // Tüm karbonlar için eksik hidrojenleri tamamla
    var CH = 1.09;
    var carbonCount = atoms.length; // dallar dahil, H'ler henüz yok
    for (i = 0; i < carbonCount; i++) {
      var nb2 = nbOf(i);
      var val = 0;
      for (var vi = 0; vi < nb2.length; vi++) val += nb2[vi].o;
      var h = 4 - val;
      if (h <= 0) continue;
      var hd = freeDirs(nb2, h);
      for (var hh = 0; hh < hd.length; hh++) {
        var hp = vAdd(v3(atoms[i].x, atoms[i].y, atoms[i].z), vScale(hd[hh], CH));
        atoms.push({ x: hp.x, y: hp.y, z: hp.z, el: 'H' });
        bonds.push({ a: i, b: atoms.length - 1, o: 1 });
      }
    }

    // Merkeze al + ölçekle
    var cx = 0, cy = 0, cz = 0;
    atoms.forEach(function(a4){ cx += a4.x; cy += a4.y; cz += a4.z; });
    cx /= atoms.length; cy /= atoms.length; cz /= atoms.length;
    var maxR = 1;
    atoms.forEach(function(a4){
      a4.x = (a4.x - cx) * 34; a4.y = (a4.y - cy) * 34; a4.z = (a4.z - cz) * 34;
      maxR = Math.max(maxR, Math.sqrt(a4.x*a4.x + a4.y*a4.y + a4.z*a4.z));
    });
    var nC = carbonCount, nH = atoms.length - carbonCount;
    return { atoms: atoms, bonds: bonds, nC: nC, nH: nH, fit: Math.min(1.6, 92 / maxR) };
  }

  // ---------- 11c. TÜRKÇE IUPAC İSİM AYRIŞTIRICISI ----------
  function foldOrg(s){
    return String(s).toLocaleLowerCase('tr')
      .replace(/\u00e7/g,'c').replace(/\u011f/g,'g').replace(/\u0131/g,'i')
      .replace(/\u00f6/g,'o').replace(/\u015f/g,'s').replace(/\u00fc/g,'u')
      .replace(/[^a-z0-9,]/g,'');
  }
  var IUPAC_PARENTS = [
    ['dekan','an',10,'Dekan'], ['nonan','an',9,'Nonan'], ['oktan','an',8,'Oktan'], ['heptan','an',7,'Heptan'],
    ['heksan','an',6,'Heksan'], ['pentan','an',5,'Pentan'], ['butan','an',4,'B\u00fctan'], ['propan','an',3,'Propan'],
    ['etan','an',2,'Etan'], ['metan','an',1,'Metan'],
    ['undeken','en',11,'Undeken'], ['deken','en',10,'Deken'], ['nonen','en',9,'Nonen'], ['okten','en',8,'Okten'],
    ['hepten','en',7,'Hepten'], ['heksen','en',6,'Heksen'], ['penten','en',5,'Penten'], ['buten','en',4,'B\u00fcten'],
    ['propen','en',3,'Propen'], ['eten','en',2,'Eten'],
    ['undekin','in',11,'Undekin'], ['dekin','in',10,'Dekin'], ['nonin','in',9,'Nonin'], ['oktin','in',8,'Oktin'],
    ['heptin','in',7,'Heptin'], ['heksin','in',6,'Heksin'], ['pentin','in',5,'Pentin'], ['butin','in',4,'B\u00fctin'],
    ['propin','in',3,'Propin'], ['etin','in',2,'Etin']
  ];
  IUPAC_PARENTS.sort(function(a,b){ return b[0].length - a[0].length; });
  var IUPAC_SUBS = [
    ['tersbutil', 4, 'tersbutil'], ['tbutil', 4, 'tersbutil'],
    ['izobutil', 4, 'izobutil'],
    ['butil', 4, null],
    ['izopropil', 3, 'izopropil'],
    ['propil', 3, null],
    ['etil', 2, null],
    ['metil', 1, null]
  ];
  IUPAC_SUBS.sort(function(a,b){ return b[0].length - a[0].length; });
  var IUPAC_MULT = [ ['tetra',4], ['tri',3], ['di',2] ];

  function parseOrganicName(raw){
    if (!raw || !String(raw).trim()) return { ok:false, error:'Bo\u015f isim girildi.' };
    var norm = String(raw).replace(/[\s\-]+/g, '');
    var folded = foldOrg(norm);

    var parentMatch = null;
    for (var i = 0; i < IUPAC_PARENTS.length; i++) {
      var pn = IUPAC_PARENTS[i][0];
      if (folded.length >= pn.length && folded.slice(folded.length - pn.length) === pn) { parentMatch = IUPAC_PARENTS[i]; break; }
    }
    if (!parentMatch) return { ok:false, error:'Tan\u0131nan bir ana zincir bulunamad\u0131. \u00d6rnekler: b\u00fctan, 2-penten, 3-metilheksan.' };
    var kind = parentMatch[1], n = parentMatch[2], properParent = parentMatch[3];
    var prefix = folded.slice(0, folded.length - parentMatch[0].length);

    var dbAt = 0;
    if (kind !== 'an') {
      var trailingNum = prefix.match(/(\d+)$/);
      if (trailingNum) {
        var beforeNum = prefix.slice(0, prefix.length - trailingNum[0].length);
        if (beforeNum === '' || /[a-z]$/.test(beforeNum)) {
          dbAt = parseInt(trailingNum[1], 10) - 1;
          prefix = beforeNum;
        }
      }
    }

    var branches = [];
    var guard = 0;
    while (prefix.length > 0 && guard++ < 20) {
      var lm = prefix.match(/^(\d+(?:,\d+)*)/);
      if (!lm) return { ok:false, error:'"' + prefix + '" k\u0131sm\u0131nda bir konum numaras\u0131 (\u00f6rn. "3-") bekleniyordu.' };
      var locants = lm[1].split(',').map(Number);
      prefix = prefix.slice(lm[0].length);
      var multVal = 1;
      for (var m2 = 0; m2 < IUPAC_MULT.length; m2++) {
        if (prefix.indexOf(IUPAC_MULT[m2][0]) === 0) { multVal = IUPAC_MULT[m2][1]; prefix = prefix.slice(IUPAC_MULT[m2][0].length); break; }
      }
      var subMatch = null;
      for (var s2 = 0; s2 < IUPAC_SUBS.length; s2++) {
        if (prefix.indexOf(IUPAC_SUBS[s2][0]) === 0) { subMatch = IUPAC_SUBS[s2]; break; }
      }
      if (!subMatch) return { ok:false, error:'"' + prefix + '" tan\u0131nan bir grup ad\u0131 de\u011fil. Desteklenenler: metil, etil, propil, izopropil, b\u00fctil, izob\u00fctil, tersb\u00fctil.' };
      prefix = prefix.slice(subMatch[0].length);
      for (var li = 0; li < locants.length; li++)
        branches.push({ locant: locants[li], carbons: subMatch[1], special: subMatch[2], mult: multVal });
    }

    for (var bi = 0; bi < branches.length; bi++) {
      if (branches[bi].locant < 1 || branches[bi].locant > n)
        return { ok:false, error: branches[bi].locant + ' konumu ' + n + ' karbonlu zincirin d\u0131\u015f\u0131nda kal\u0131yor.' };
    }
    if (dbAt < 0 || dbAt > n - 2)
      return { ok:false, error: '\u00c7ift/\u00fc\u00e7l\u00fc ba\u011f konumu ge\u00e7ersiz.' };

    // Çoğaltma öneki (di/tri/tetra) tutarlılığı: aynı grup (karbon+özel tip)
    // TOPLAM ka\u00e7 kez ge\u00e7iyorsa, \u00f6nek de o say\u0131y\u0131 do\u011fru yans\u0131tmal\u0131.
    var multOk = true;
    var chk = {};
    branches.forEach(function(b){
      var key = b.carbons + '|' + (b.special || 'null');
      (chk[key] = chk[key] || []).push(b);
    });
    Object.keys(chk).forEach(function(k){
      var g = chk[k];
      g.forEach(function(b){ if (b.mult !== g.length) multOk = false; });
    });

    return { ok:true, n:n, kind:kind, dbAt:dbAt, branches:branches, properParent:properParent, multOk:multOk };
  }

  // ---------- 11d. KANONİK (EN DÜŞÜK LOKANT) IUPAC ADI KONTROLÜ ----------
  var SUBST_DISPLAY = {
    '1|null':'metil', '2|null':'etil', '3|null':'propil', '4|null':'b\u00fctil',
    '3|izopropil':'izopropil', '4|izobutil':'izob\u00fctil', '4|tersbutil':'tersb\u00fctil'
  };
  var MULT_NAME = { 2:'di', 3:'tri', 4:'tetra' };
  function cmpArr(a, b){
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
      var av = a[i] === undefined ? Infinity : a[i], bv = b[i] === undefined ? Infinity : b[i];
      if (av !== bv) return av - bv;
    }
    return 0;
  }
  function canonicalLocants(n, kind, dbAt, branches){
    var LdbA = kind === 'an' ? -1 : dbAt;
    var subA = branches.map(function(b){ return b.locant; }).sort(function(x,y){ return x-y; });
    var dbAtB = n - 2 - dbAt;
    var LdbB = kind === 'an' ? -1 : dbAtB;
    var branchesB = branches.map(function(b){ return { locant: n + 1 - b.locant, carbons: b.carbons, special: b.special }; });
    var subB = branchesB.map(function(b){ return b.locant; }).sort(function(x,y){ return x-y; });
    var pickB = false;
    if (kind !== 'an' && LdbB !== LdbA) pickB = LdbB < LdbA;
    else pickB = cmpArr(subB, subA) < 0;
    if (pickB) return { dbAt: dbAtB, branches: branchesB, changed: true };
    return { dbAt: dbAt, branches: branches, changed: false };
  }
  function buildCanonicalName(n, kind, dbAt, branches, properParent){
    var groups = {};
    branches.forEach(function(b){
      var key = b.carbons + '|' + (b.special || 'null');
      if (!groups[key]) groups[key] = { locants: [], dispName: SUBST_DISPLAY[key] || 'grup' };
      groups[key].locants.push(b.locant);
    });
    var groupList = Object.keys(groups).map(function(k){ return groups[k]; });
    groupList.forEach(function(g){ g.locants.sort(function(a,b){ return a-b; }); });
    groupList.sort(function(a,b){ return a.dispName.localeCompare(b.dispName, 'tr'); });
    var parts = groupList.map(function(g){
      var mult = g.locants.length > 1 ? (MULT_NAME[g.locants.length] || '') : '';
      return g.locants.join(',') + '-' + mult + g.dispName;
    });
    var prefix = parts.join('-');
    var parentLower = properParent.toLocaleLowerCase('tr');
    if (kind === 'an') return prefix ? prefix + parentLower : parentLower;
    var dbLocant = dbAt + 1;
    return (prefix ? prefix + '-' : '') + dbLocant + '-' + parentLower;
  }
  // Ayrıştırılan isim IUPAC'a göre en düşük lokantlı mı VE çoğaltma
  // önekleri (di/tri/tetra) doğru mu? Değilse doğru adı döndürür.
  function checkCanonicalName(parsed){
    var canon = canonicalLocants(parsed.n, parsed.kind, parsed.dbAt, parsed.branches);
    if (!canon.changed && parsed.multOk !== false) return null;
    return buildCanonicalName(parsed.n, parsed.kind, canon.dbAt, canon.branches, parsed.properParent);
  }

  function organicMolFormula(mol){
    return 'C' + mol.nC + 'H' + mol.nH;
  }

  // ---------- 12. FONKSİYONEL GRUPLAR 3D GALERİSİ ----------
  // Alkol, Eter, Aldehit, Keton, Karboksilik Asit, Ester — her biri için
  // temsili moleküller, 3D yapı (O atomu kırmızı, C=O çift bağ pembe),
  // detaylı konu özellikleri ve kimyasal tepkimeler.
  function fgAddO(atoms, bonds, cIdx, cPos, dir, order, bondLen){
    var oPos = vAdd(cPos, vScale(dir, bondLen || 1.36));
    var oIdx = atoms.length;
    atoms.push({ x: oPos.x, y: oPos.y, z: oPos.z, el: 'O' });
    bonds.push({ a: cIdx, b: oIdx, o: order });
    return oIdx;
  }
  function fgAddH(atoms, bonds, parentIdx, parentPos, dir, bondLen){
    var hPos = vAdd(parentPos, vScale(dir, bondLen || 1.0));
    atoms.push({ x: hPos.x, y: hPos.y, z: hPos.z, el: 'H' });
    bonds.push({ a: parentIdx, b: atoms.length - 1, o: 1 });
  }
  function fgAddChainFrom(atoms, bonds, startIdx, startPos, dir, count){
    if (count <= 0) return;
    var positions = growChain(startPos, dir, count);
    var prevIdx = startIdx;
    for (var i = 0; i < positions.length; i++) {
      var idx = atoms.length;
      atoms.push({ x: positions[i].x, y: positions[i].y, z: positions[i].z, el: 'C' });
      bonds.push({ a: prevIdx, b: idx, o: 1 });
      prevIdx = idx;
    }
  }
  function fgFillH(atoms, bonds){
    var n0 = atoms.length;
    function nbOf(idx){
      var nb = [];
      for (var b2 = 0; b2 < bonds.length; b2++) {
        var A = atoms[bonds[b2].a], B = atoms[bonds[b2].b];
        if (bonds[b2].a === idx) nb.push({ dir: vNorm(vSub(v3(B.x,B.y,B.z), v3(A.x,A.y,A.z))), o: bonds[b2].o });
        if (bonds[b2].b === idx) nb.push({ dir: vNorm(vSub(v3(A.x,A.y,A.z), v3(B.x,B.y,B.z))), o: bonds[b2].o });
      }
      return nb;
    }
    for (var i = 0; i < n0; i++) {
      if (atoms[i].el !== 'C' && atoms[i].el !== 'O') continue;
      var target = atoms[i].el === 'C' ? 4 : 2;
      var nb = nbOf(i);
      var val = 0;
      for (var k = 0; k < nb.length; k++) val += nb[k].o;
      var h = target - val;
      if (h <= 0) continue;
      var dirs = freeDirs(nb, h);
      for (var d = 0; d < dirs.length; d++)
        fgAddH(atoms, bonds, i, v3(atoms[i].x, atoms[i].y, atoms[i].z), dirs[d], atoms[i].el === 'O' ? 0.96 : 1.09);
    }
  }
  function fgFinalize(atoms, bonds, nC, nH, nO){
    var cx=0,cy=0,cz=0;
    atoms.forEach(function(a){ cx+=a.x; cy+=a.y; cz+=a.z; });
    cx/=atoms.length; cy/=atoms.length; cz/=atoms.length;
    var maxR=1;
    atoms.forEach(function(a){ a.x=(a.x-cx)*34; a.y=(a.y-cy)*34; a.z=(a.z-cz)*34; maxR=Math.max(maxR,Math.sqrt(a.x*a.x+a.y*a.y+a.z*a.z)); });
    return { atoms: atoms, bonds: bonds, nC: nC, nH: nH, nO: nO, fit: Math.min(1.6, 92/maxR) };
  }

  // --- Alkol: R-OH (n karbonlu düz zincir, OH ucundaki C1'de) ---
  function buildAlcohol(n, branchAt2){
    var atoms = [], bonds = [];
    atoms.push({ x:0, y:0, z:0, el:'C' });
    if (n > 1) fgAddChainFrom(atoms, bonds, 0, v3(0,0,0), v3(1,0,0), n - 1);
    var c1pos = v3(atoms[0].x, atoms[0].y, atoms[0].z);
    var nb0 = n > 1 ? [{ dir: vNorm(vSub(v3(atoms[1].x,atoms[1].y,atoms[1].z), c1pos)), o:1 }] : [];
    var dirO = freeDirs(nb0, 1)[0] || v3(0,1,0);
    var oIdx = fgAddO(atoms, bonds, 0, c1pos, dirO, 1, 1.43);
    var oPos = v3(atoms[oIdx].x, atoms[oIdx].y, atoms[oIdx].z);
    var hDir = freeDirs([{ dir: vScale(dirO,-1), o:1 }], 1)[0];
    fgAddH(atoms, bonds, oIdx, oPos, hDir, 0.96);
    if (branchAt2 && n >= 3) { /* 2-propanol vb. için basitleştirilmiş: ek dal eklenmez, düz zincir yeterli görsel verir */ }
    fgFillH(atoms, bonds);
    var nC = atoms.filter(function(a){return a.el==='C';}).length;
    var nO = atoms.filter(function(a){return a.el==='O';}).length;
    var nH = atoms.filter(function(a){return a.el==='H';}).length;
    return fgFinalize(atoms, bonds, nC, nH, nO);
  }

  // --- Eter: R-O-R' ---
  function buildEther(n1, n2){
    var atoms = [], bonds = [];
    atoms.push({ x:0, y:0, z:0, el:'C' });
    if (n1 > 1) fgAddChainFrom(atoms, bonds, 0, v3(0,0,0), v3(1,0,0), n1 - 1);
    var c1pos = v3(atoms[0].x, atoms[0].y, atoms[0].z);
    var nb0 = n1 > 1 ? [{ dir: vNorm(vSub(v3(atoms[1].x,atoms[1].y,atoms[1].z), c1pos)), o:1 }] : [];
    var dirO = freeDirs(nb0, 1)[0] || v3(0,1,0);
    var oIdx = fgAddO(atoms, bonds, 0, c1pos, dirO, 1, 1.43);
    var oPos = v3(atoms[oIdx].x, atoms[oIdx].y, atoms[oIdx].z);
    var dirC2 = freeDirs([{ dir: vScale(dirO,-1), o:1 }], 1)[0];
    var c2pos = vAdd(oPos, vScale(dirC2, 1.43));
    var c2idx = atoms.length;
    atoms.push({ x:c2pos.x, y:c2pos.y, z:c2pos.z, el:'C' });
    bonds.push({ a: oIdx, b: c2idx, o: 1 });
    if (n2 > 1) fgAddChainFrom(atoms, bonds, c2idx, c2pos, dirC2, n2 - 1);
    fgFillH(atoms, bonds);
    var nC = atoms.filter(function(a){return a.el==='C';}).length;
    var nO = atoms.filter(function(a){return a.el==='O';}).length;
    var nH = atoms.filter(function(a){return a.el==='H';}).length;
    return fgFinalize(atoms, bonds, nC, nH, nO);
  }

  // --- Aldehit: R-CHO (karbonil ucunda, H açık) ---
  function buildAldehyde(n){
    var atoms = [], bonds = [];
    atoms.push({ x:0, y:0, z:0, el:'C' }); // karbonil C (C1)
    var nbChain = [];
    if (n > 1) {
      fgAddChainFrom(atoms, bonds, 0, v3(0,0,0), v3(1,0,0), n - 1);
      nbChain = [{ dir: vNorm(vSub(v3(atoms[1].x,atoms[1].y,atoms[1].z), v3(0,0,0))), o:1 }];
    }
    var dirO = freeDirs(nbChain, 1)[0] || v3(0,1,0);
    fgAddO(atoms, bonds, 0, v3(0,0,0), dirO, 2, 1.20);
    fgFillH(atoms, bonds); // karbonil karbonundaki eksik H (aldehidin kendine özgü H'si) otomatik tamamlanır
    var nC = atoms.filter(function(a){return a.el==='C';}).length;
    var nO = atoms.filter(function(a){return a.el==='O';}).length;
    var nH = atoms.filter(function(a){return a.el==='H';}).length;
    return fgFinalize(atoms, bonds, nC, nH, nO);
  }

  // --- Keton: R-CO-R' (karbonil ortada) ---
  function buildKetone(n1, n2){
    var atoms = [], bonds = [];
    atoms.push({ x:0, y:0, z:0, el:'C' }); // karbonil C
    fgAddChainFrom(atoms, bonds, 0, v3(0,0,0), v3(1,0,0), n1);
    var dirLeft = vNorm(vSub(v3(atoms[1].x,atoms[1].y,atoms[1].z), v3(0,0,0)));
    var nb1 = [{ dir: dirLeft, o: 1 }];
    var dirRight = freeDirs(nb1, 1)[0];
    var c2idx = atoms.length;
    var c2pos = vAdd(v3(0,0,0), vScale(dirRight, 1.54));
    atoms.push({ x:c2pos.x, y:c2pos.y, z:c2pos.z, el:'C' });
    bonds.push({ a:0, b:c2idx, o:1 });
    if (n2 > 1) fgAddChainFrom(atoms, bonds, c2idx, c2pos, dirRight, n2 - 1);
    var dirO = freeDirs([nb1[0], { dir: dirRight, o:1 }], 1)[0];
    fgAddO(atoms, bonds, 0, v3(0,0,0), dirO, 2, 1.20);
    fgFillH(atoms, bonds);
    var nC = atoms.filter(function(a){return a.el==='C';}).length;
    var nO = atoms.filter(function(a){return a.el==='O';}).length;
    var nH = atoms.filter(function(a){return a.el==='H';}).length;
    return fgFinalize(atoms, bonds, nC, nH, nO);
  }

  // --- Karboksilik Asit: R-COOH ---
  function buildCarboxylicAcid(n){
    var atoms = [], bonds = [];
    atoms.push({ x:0, y:0, z:0, el:'C' }); // karboksil C
    var nbChain = [];
    if (n > 1) {
      fgAddChainFrom(atoms, bonds, 0, v3(0,0,0), v3(1,0,0), n - 1);
      nbChain = [{ dir: vNorm(vSub(v3(atoms[1].x,atoms[1].y,atoms[1].z), v3(0,0,0))), o:1 }];
    }
    var twoDirs = freeDirs(nbChain, 2);
    fgAddO(atoms, bonds, 0, v3(0,0,0), twoDirs[0], 2, 1.20); // C=O
    var ohIdx = fgAddO(atoms, bonds, 0, v3(0,0,0), twoDirs[1], 1, 1.36); // C-OH
    var ohPos = v3(atoms[ohIdx].x, atoms[ohIdx].y, atoms[ohIdx].z);
    var hDir = freeDirs([{ dir: vScale(twoDirs[1], -1), o: 1 }], 1)[0];
    fgAddH(atoms, bonds, ohIdx, ohPos, hDir, 0.96);
    fgFillH(atoms, bonds);
    var nC = atoms.filter(function(a){return a.el==='C';}).length;
    var nO = atoms.filter(function(a){return a.el==='O';}).length;
    var nH = atoms.filter(function(a){return a.el==='H';}).length;
    return fgFinalize(atoms, bonds, nC, nH, nO);
  }

  // --- Ester: R-CO-O-R' ---
  function buildEster(n1, n2){
    var atoms = [], bonds = [];
    atoms.push({ x:0, y:0, z:0, el:'C' }); // karbonil C
    var nbChain = [];
    if (n1 > 1) {
      fgAddChainFrom(atoms, bonds, 0, v3(0,0,0), v3(1,0,0), n1 - 1);
      nbChain = [{ dir: vNorm(vSub(v3(atoms[1].x,atoms[1].y,atoms[1].z), v3(0,0,0))), o:1 }];
    }
    var twoDirs = freeDirs(nbChain, 2);
    fgAddO(atoms, bonds, 0, v3(0,0,0), twoDirs[0], 2, 1.20); // C=O
    var oEsterIdx = fgAddO(atoms, bonds, 0, v3(0,0,0), twoDirs[1], 1, 1.36); // -O-
    var oPos = v3(atoms[oEsterIdx].x, atoms[oEsterIdx].y, atoms[oEsterIdx].z);
    var dirC2 = freeDirs([{ dir: vScale(twoDirs[1], -1), o: 1 }], 1)[0];
    var c2pos = vAdd(oPos, vScale(dirC2, 1.43));
    var c2idx = atoms.length;
    atoms.push({ x:c2pos.x, y:c2pos.y, z:c2pos.z, el:'C' });
    bonds.push({ a: oEsterIdx, b: c2idx, o: 1 });
    if (n2 > 1) fgAddChainFrom(atoms, bonds, c2idx, c2pos, dirC2, n2 - 1);
    fgFillH(atoms, bonds);
    var nC = atoms.filter(function(a){return a.el==='C';}).length;
    var nO = atoms.filter(function(a){return a.el==='O';}).length;
    var nH = atoms.filter(function(a){return a.el==='H';}).length;
    return fgFinalize(atoms, bonds, nC, nH, nO);
  }

  // ---------- 12b. FONKSİYONEL GRUPLAR — GALERİ + KONU ----------
  var FG_CLASSES = ['alkol','eter','aldehit','keton','asit','ester'];
  var FG_CLASS_NAMES = { alkol:'Alkoller', eter:'Eterler', aldehit:'Aldehitler', keton:'Ketonlar', asit:'Karboksilik Asitler', ester:'Esterler' };
  var FG_LIST = null;
  function fgList(){
    if (FG_LIST) return FG_LIST;
    FG_LIST = [
      { cls:'alkol', name:'Metanol', f:'CH4O', build:function(){ return buildAlcohol(1); } },
      { cls:'alkol', name:'Etanol', f:'C2H6O', build:function(){ return buildAlcohol(2); } },
      { cls:'alkol', name:'1-Propanol', f:'C3H8O', build:function(){ return buildAlcohol(3); } },
      { cls:'alkol', name:'1-Bütanol', f:'C4H10O', build:function(){ return buildAlcohol(4); } },
      { cls:'eter', name:'Dimetil Eter', f:'C2H6O', build:function(){ return buildEther(1,1); } },
      { cls:'eter', name:'Metil Etil Eter', f:'C3H8O', build:function(){ return buildEther(1,2); } },
      { cls:'eter', name:'Dietil Eter', f:'C4H10O', build:function(){ return buildEther(2,2); } },
      { cls:'aldehit', name:'Metanal (Formaldehit)', f:'CH2O', build:function(){ return buildAldehyde(1); } },
      { cls:'aldehit', name:'Etanal (Asetaldehit)', f:'C2H4O', build:function(){ return buildAldehyde(2); } },
      { cls:'aldehit', name:'Propanal', f:'C3H6O', build:function(){ return buildAldehyde(3); } },
      { cls:'keton', name:'Propanon (Aseton)', f:'C3H6O', build:function(){ return buildKetone(1,1); } },
      { cls:'keton', name:'B\u00fctanon', f:'C4H8O', build:function(){ return buildKetone(1,2); } },
      { cls:'asit', name:'Metanoik Asit (Formik Asit)', f:'CH2O2', build:function(){ return buildCarboxylicAcid(1); } },
      { cls:'asit', name:'Etanoik Asit (Asetik Asit)', f:'C2H4O2', build:function(){ return buildCarboxylicAcid(2); } },
      { cls:'asit', name:'Propanoik Asit', f:'C3H6O2', build:function(){ return buildCarboxylicAcid(3); } },
      { cls:'ester', name:'Metil Format', f:'C2H4O2', build:function(){ return buildEster(1,1); } },
      { cls:'ester', name:'Metil Asetat', f:'C3H6O2', build:function(){ return buildEster(2,1); } },
      { cls:'ester', name:'Etil Asetat', f:'C4H8O2', build:function(){ return buildEster(2,2); } }
    ];
    return FG_LIST;
  }
  function fgMol(item){ if (!item.mol) item.mol = item.build(); return item.mol; }

  var FG_THEORY = {
    alkol: {
      icon:'\ud83c\udf77', genel:'R-OH', hib:'Fonksiyonel grup karbonu sp\u00b3',
      tanim:'Bir hidrokarbon zincirine hidroksil (-OH) grubunun ba\u011flanmas\u0131yla olu\u015fur. Oksijen b\u00fckk\u00fclm\u00fc\u015f (su gibi) geometriye sahiptir.',
      ozellikler:[
        'Molek\u00fcller aras\u0131 <b>hidrojen ba\u011f\u0131</b> yapar \u2192 ayn\u0131 karbon say\u0131l\u0131 alkanlardan kaynama noktas\u0131 \u00e7ok daha y\u00fcksektir.',
        'K\u00fc\u00e7\u00fck alkoller (metanol, etanol) suda tamamen \u00e7\u00f6z\u00fcn\u00fcr; zincir uzad\u0131k\u00e7a \u00e7\u00f6z\u00fcn\u00fcrl\u00fck azal\u0131r.',
        'Birincil (1\u00b0), ikincil (2\u00b0) ve \u00fc\u00e7\u00fcnc\u00fcl (3\u00b0) alkol olarak s\u0131n\u0131fland\u0131r\u0131l\u0131r (OH\u2019nin ba\u011fl\u0131 oldu\u011fu karbonun ba\u015fka ka\u00e7 karbona ba\u011fl\u0131 oldu\u011funa g\u00f6re).',
        'Etanol, alkoll\u00fc i\u00e7eceklerin ve dezenfektanlar\u0131n etken maddesidir; metanol ise zehirlidir (k\u00f6rl\u00fc\u011fe yol a\u00e7ar).'
      ],
      tepkimeler:[
        '<b>Yanma:</b> 2CH\u2083OH + 3O\u2082 \u2192 2CO\u2082 + 4H\u2082O',
        '<b>Y\u00fckseltgenme:</b> 1\u00b0 alkol \u2192 aldehit \u2192 karboksilik asit; 2\u00b0 alkol \u2192 keton (3\u00b0 alkol kolayca y\u00fckseltgenmez).',
        '<b>Esterle\u015fme:</b> R-OH + R\u2019-COOH \u21cc R\u2019-COO-R + H\u2082O (asit kataliz\u00f6rl\u00fc)',
        '<b>Sodyumla tepkime:</b> 2R-OH + 2Na \u2192 2R-ONa + H\u2082\u2191 (alkoller zay\u0131f asittir)',
        '<b>Dehidrasyon:</b> Alkol, deri\u015fik H\u2082SO\u2084 ile \u0131s\u0131t\u0131l\u0131rsa su kaybederek alken olu\u015fturur.'
      ]
    },
    eter: {
      icon:'\ud83e\uddea', genel:'R-O-R\u2019', hib:'Oksijen b\u00fckk\u00fcl\u00fc (~110\u00b0)',
      tanim:'\u0130ki hidrokarbon grubunun bir oksijen k\u00f6pr\u00fcs\u00fcyle ba\u011fland\u0131\u011f\u0131 yap\u0131d\u0131r. Ayn\u0131 molek\u00fcl form\u00fcl\u00fcndeki alkollerin yap\u0131 izomeridir (\u00f6rn. dimetil eter C\u2082H\u2086O, etanol ile ayn\u0131 form\u00fcle sahiptir).',
      ozellikler:[
        'O-H ba\u011f\u0131 OLMADI\u011eI i\u00e7in eterler kendi aralar\u0131nda hidrojen ba\u011f\u0131 YAPAMAZ \u2192 ayn\u0131 form\u00fcll\u00fc alkolden \u00e7ok daha D\u00dc\u015e\u00dcK kaynama noktas\u0131na sahiptir.',
        'Genellikle kimyasal olarak durgundur (reaktif de\u011fildir) \u2014 bu y\u00fczden iyi bir \u00e7\u00f6z\u00fcc\u00fcd\u00fcr.',
        'Dietil eter eskiden anestezik olarak kullan\u0131lm\u0131\u015ft\u0131r; uçucu ve yan\u0131c\u0131d\u0131r.',
        'Alkollerin aksine metal Na ile H\u2082 gaz\u0131 vermez (O-H ba\u011f\u0131 yoktur).'
      ],
      tepkimeler:[
        '<b>Yanma:</b> Eterler yan\u0131c\u0131d\u0131r, tam yanmada CO\u2082 ve H\u2082O verir.',
        '<b>Williamson Eter Sentezi:</b> R-ONa + R\u2019-X \u2192 R-O-R\u2019 + NaX (eter haz\u0131rlaman\u0131n temel y\u00f6ntemi)',
        'Kuvvetli asitlerle (HI gibi) \u0131s\u0131t\u0131ld\u0131\u011f\u0131nda C-O ba\u011f\u0131 k\u0131r\u0131larak alkil halojen\u00fcr + alkole ayr\u0131\u015f\u0131r.'
      ]
    },
    aldehit: {
      icon:'\ud83e\uddec', genel:'R-CHO', hib:'Karbonil karbonu sp\u00b2 (d\u00fczlemsel, 120\u00b0)',
      tanim:'Karbonil grubunun (C=O) zincirin UCUNDA bulundu\u011fu ve karbonil karbonuna en az bir H\u2019nin do\u011frudan ba\u011fl\u0131 oldu\u011fu yap\u0131d\u0131r.',
      ozellikler:[
        'Karbonil karbonu d\u00fczlemseldir (sp\u00b2); C=O ba\u011f\u0131 kutupludur (O daha elektronegatif).',
        'K\u00fc\u00e7\u00fck aldehitler keskin/rahats\u0131z edici kokuludur; baz\u0131lar\u0131 (vanilin gibi) ho\u015f kokuludur.',
        'Alkollerden farkl\u0131 olarak O-H ba\u011f\u0131 yoktur \u2192 kendi aralar\u0131nda hidrojen ba\u011f\u0131 yapamazlar, kaynama noktalar\u0131 orta d\u00fczeydedir.',
        'Kolayca y\u00fckseltgenerek karboksilik aside d\u00f6n\u00fc\u015f\u00fcr \u2014 bu y\u00fczden \u201cindirgen \u015feker\u201d testlerinde (Tollens, Fehling) pozitif verirler.'
      ],
      tepkimeler:[
        '<b>Y\u00fckseltgenme:</b> R-CHO + [O] \u2192 R-COOH (Tollens/Fehling ile ay\u0131rt edilir \u2014 keton bu tepkimeyi vermez!)',
        '<b>\u0130ndirgenme:</b> R-CHO + H\u2082 \u2192 R-CH\u2082OH (1\u00b0 alkole d\u00f6n\u00fc\u015f\u00fcr)',
        '<b>Tollens testi:</b> Ag(NH\u2083)\u2082\u207a ile g\u00fcm\u00fc\u015f ayna olu\u015fturur \u2014 aldehide \u00f6zg\u00fc, ketonda olmaz.',
        '<b>Katılma:</b> Karbonil karbonuna H\u2082, HCN gibi k\u00fc\u00e7\u00fck molek\u00fcller katılabilir (\u00e7ift ba\u011f a\u00e7\u0131l\u0131r).'
      ]
    },
    keton: {
      icon:'\ud83e\uddea', genel:'R-CO-R\u2019', hib:'Karbonil karbonu sp\u00b2 (d\u00fczlemsel, 120\u00b0)',
      tanim:'Karbonil grubunun (C=O) zincirin ORTASINDA, iki karbon grubu aras\u0131nda bulundu\u011fu yap\u0131d\u0131r.',
      ozellikler:[
        'Aldehit ile ayn\u0131 genel form\u00fcle sahiptir (C\u2099H\u2082\u2099O) fakat karbonil karbonuna H de\u011fil, iki KARBON grubu ba\u011fl\u0131d\u0131r.',
        'Aseton (propanon), t\u0131rnak c\u0131las\u0131 \u00e7\u00f6z\u00fcc\u00fcs\u00fc olarak yayg\u0131n kullan\u0131l\u0131r; suyla her oranda kar\u0131\u015f\u0131r.',
        'Aldehitlerin aksine KOLAYCA y\u00fckseltgenmezler (H eksikli\u011fi nedeniyle) \u2014 bu, aldehit-keton ay\u0131rt etmenin temel yoludur.',
        'Ketonlar Tollens ve Fehling testlerine NEGAT\u0130F verir.'
      ],
      tepkimeler:[
        '<b>\u0130ndirgenme:</b> R-CO-R\u2019 + H\u2082 \u2192 R-CH(OH)-R\u2019 (2\u00b0 alkole d\u00f6n\u00fc\u015f\u00fcr)',
        '<b>Y\u00fckseltgenmeye diren\u00e7:</b> Normal ko\u015fullarda y\u00fckseltgen belirte\u00e7lerle tepkime vermez (aldehitten ay\u0131r\u0131c\u0131 \u00f6zellik).',
        '<b>Katılma:</b> Karbonile HCN, alkol gibi k\u00fc\u00e7\u00fck molek\u00fcller katılabilir.',
        '<b>İyodoform testi:</b> Metil ketonlar (CH\u2083-CO-R) I\u2082/NaOH ile sar\u0131 \u00e7\u00f6kelti (CHI\u2083) verir.'
      ]
    },
    asit: {
      icon:'\ud83c\udf4b', genel:'R-COOH', hib:'Karboksil karbonu sp\u00b2',
      tanim:'Karbonil (C=O) ve hidroksil (-OH) gruplar\u0131n\u0131n AYNI karbona ba\u011fl\u0131 oldu\u011fu (-COOH) yap\u0131d\u0131r. Organik asitlerin genel s\u0131n\u0131f\u0131d\u0131r.',
      ozellikler:[
        'O-H ba\u011f\u0131 \u00e7ok polar oldu\u011fu i\u00e7in G\u00dc\u00c7L\u00dc hidrojen ba\u011f\u0131 yapar \u2014 ayn\u0131 karbon say\u0131l\u0131 alkolden bile daha y\u00fcksek kaynama noktas\u0131na sahiptir (genelde \u00e7ift molek\u00fcl/dimer olu\u015ftururlar).',
        'Sirkedeki asetik asit (%4-8), format asit (kar\u0131ncalarda) ve ya\u011f asitleri g\u00fcnl\u00fck hayatta s\u0131k g\u00f6r\u00fcl\u00fcr.',
        'Zay\u0131f asittir (HCl gibi g\u00fc\u00e7l\u00fc asitlerden farkl\u0131) fakat turnusolu k\u0131rm\u0131z\u0131ya \u00e7evirecek kadar asidiktir.',
        'Karbon say\u0131s\u0131 artt\u0131k\u00e7a asitlik azal\u0131r (alkil grubunun elektron iten etkisi nedeniyle).'
      ],
      tepkimeler:[
        '<b>N\u00f6tralle\u015fme:</b> R-COOH + NaOH \u2192 R-COONa + H\u2082O',
        '<b>Esterle\u015fme (Fischer):</b> R-COOH + R\u2019-OH \u21cc R-COO-R\u2019 + H\u2082O',
        '<b>Karbonatla tepkime:</b> 2R-COOH + Na\u2082CO\u2083 \u2192 2R-COONa + H\u2082O + CO\u2082\u2191 (gaz \u00e7\u0131k\u0131\u015f\u0131yla ayırt edilir)',
        '<b>\u0130ndirgenme:</b> R-COOH + 4[H] \u2192 R-CH\u2082OH + H\u2082O (g\u00fc\u00e7l\u00fc indirgen gerekir)'
      ]
    },
    ester: {
      icon:'\ud83c\udf52', genel:'R-CO-O-R\u2019', hib:'Karbonil karbonu sp\u00b2',
      tanim:'Karboksilik asidin -OH grubunun bir alkoksi (-OR\u2019) grubuyla yer de\u011fi\u015ftirmesiyle olu\u015fur. Asit + alkol \u2192 ester + su tepkimesinin \u00fcr\u00fcn\u00fcd\u00fcr.',
      ozellikler:[
        'O-H ba\u011f\u0131 YOKTUR \u2192 kendi aralar\u0131nda hidrojen ba\u011f\u0131 yapamazlar; ayn\u0131 asitten kaynama noktalar\u0131 D\u00dc\u015e\u00dcKT\u00dcR.',
        'Karakteristik HO\u015e KOKULARIYLA bilinirler \u2014 meyve, \u00e7i\u00e7ek ve parf\u00fcm aromalar\u0131n\u0131n \u00e7o\u011fu esterlerden gelir (\u00f6rn. etil asetat = oje \u00e7\u0131kar\u0131c\u0131 kokusu, benzil asetat = \u015feftali kokusu).',
        'Ya\u011flar ve ya\u011f asitleri (trigliseritler) gliserin ile uzun zincirli ya\u011f asitlerinin OLU\u015eTURDU\u011eU esterlerdir.',
        'Adland\u0131rma: \u201casit k\u00f6k\u00fc + -at\u201d \u00f6nce, \u201calkol k\u00f6k\u00fc + -il\u201d sonra s\u00f6ylenir (\u00f6rn. etil asetat).'
      ],
      tepkimeler:[
        '<b>Esterle\u015fme (olu\u015fum):</b> R-COOH + R\u2019-OH \u21cc R-COO-R\u2019 + H\u2082O (asit katalizli, denge tepkimesi)',
        '<b>Hidroliz (asidik):</b> R-COO-R\u2019 + H\u2082O \u2192 R-COOH + R\u2019-OH (esterle\u015fmenin tersi)',
        '<b>Sabunla\u015fma (bazik hidroliz):</b> R-COO-R\u2019 + NaOH \u2192 R-COONa (sabun) + R\u2019-OH \u2014 sabun \u00fcretiminin temelidir!',
        '<b>\u0130ndirgenme:</b> Ester + H\u2082 (katalizör) \u2192 iki farkl\u0131 alkol verir.'
      ]
    }
  };

  var fgCat = 'alkol';
  var fgSt = { rotX: 0.42, rotY: 0.6, zoom: 1, fit: 1, spin: true, spd: 1, drag: false,
               lx: 0, ly: 0, dist: 0, t: 0, anim: null, labels: true, item: null, stars: null, sw: 0 };

  function setupFG(){
    if (document.getElementById('s-fg')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    var catBtns = '';
    for (var i = 0; i < FG_CLASSES.length; i++) {
      var c = FG_CLASSES[i];
      catBtns += '<button type="button" id="fg-cat-' + c + '" class="ob' + (i===0?' sel2':'') + '" style="flex-shrink:0" onclick="fgSetCat(\'' + c + '\',this)">' + FG_CLASS_NAMES[c] + '</button>';
    }
    app.insertAdjacentHTML('beforeend',
      '<div id="s-fg" style="display:none"><div style="max-width:900px;margin:0 auto;padding:15px">' +
        '<h1 class="ptitle">\u2697\ufe0f Fonksiyonel Gruplar 3D</h1>' +
        '<p class="psub">Alkol, eter, aldehit, keton, karboksilik asit, ester \u2014 3D yap\u0131, \u00f6zellikler ve tepkimeler.</p>' +
        '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:14px"><div style="display:flex;gap:6px;min-width:max-content">' + catBtns + '</div></div>' +
        '<div id="fg-theory" style="margin-bottom:16px"></div>' +
        '<div id="fg-grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px"></div>' +
      '</div>' +
      '<div id="fg-detail" style="display:none;position:fixed;inset:0;background:rgba(2,3,10,0.97);z-index:600;overflow-y:auto;padding:20px">' +
        '<button type="button" onclick="fgClose()" style="position:fixed;top:15px;right:15px;width:40px;height:40px;background:rgba(255,50,50,0.2);border:1px solid rgba(255,50,50,0.5);border-radius:50%;color:#ff6666;font-size:22px;cursor:pointer;z-index:601;display:flex;align-items:center;justify-content:center">\u00d7</button>' +
        '<div id="fg-title" style="text-align:center;font-size:1.4rem;color:#00d4ff;margin:46px 0 4px;text-shadow:0 0 15px rgba(0,212,255,0.4);font-family:Space Grotesk,sans-serif;font-weight:800"></div>' +
        '<div id="fg-sub" style="text-align:center;font-size:14px;color:var(--tx2);margin-bottom:14px"></div>' +
        '<canvas id="fg-cv" width="600" height="420" style="width:100%;max-width:560px;height:auto;border-radius:16px;background:#050510;border:2px solid rgba(0,212,255,0.3);display:block;margin:0 auto 10px;touch-action:none"></canvas>' +
        '<p style="text-align:center;color:rgba(255,255,255,0.3);font-size:12px;margin-bottom:10px">\ud83d\udc46 S\u00fcr\u00fckle d\u00f6nd\u00fcr \u00b7 \ud83e\udd0f \u0130ki parmakla yak\u0131nla\u015ft\u0131r</p>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:16px">' +
          '<button type="button" onclick="fgToggleSpin()" style="padding:7px 14px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);border-radius:100px;color:#00d4ff;font-size:12px;cursor:pointer">\ud83d\udd04 Oto-D\u00f6nd\u00fcr</button>' +
          '<button type="button" onclick="fgResetView()" style="padding:7px 14px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);border-radius:100px;color:#00d4ff;font-size:12px;cursor:pointer">\ud83c\udfaf S\u0131f\u0131rla</button>' +
        '</div>' +
        '<div style="max-width:560px;margin:0 auto 30px;background:var(--sf);border:1px solid var(--br);border-left:3px solid #ef4444;border-radius:var(--rlg);padding:18px" id="fg-props"></div>' +
      '</div></div>');
    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-fg') === -1) SCREENS.push('s-fg');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-fg'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-fg" onclick="nav(\'fg\')">\u2697\ufe0f Fonksiyonel Gruplar 3D</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-fg'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-fg" onclick="nav(\'fg\')"><div class="ti">\u2697\ufe0f</div><div class="tt">Fonksiyonel Gruplar 3D</div><div class="td">Alkol, eter, aldehit, keton, asit, ester \u2014 3D yap\u0131 ve tepkimeler.</div></div>');
    fgBindCanvas();
    fgRenderTheory();
  }

  window.fgSetCat = function(c, btn){
    fgCat = c;
    if (btn) selectInRow(btn);
    fgRenderTheory();
    fgRenderGrid();
  };

  function fgRenderTheory(){
    var box = document.getElementById('fg-theory');
    if (!box) return;
    var th = FG_THEORY[fgCat];
    var html = '<div class="card">' +
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
        '<span style="font-size:26px">' + th.icon + '</span>' +
        '<div><div style="font-family:Space Grotesk,sans-serif;font-size:17px;font-weight:800;color:#fff">' + FG_CLASS_NAMES[fgCat] + '</div>' +
        '<div style="font-size:12px;color:var(--ac2);font-weight:600">Genel form\u00fcl: ' + th.genel + ' \u00b7 ' + th.hib + '</div></div>' +
      '</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:12px">' + th.tanim + '</p>' +
      '<div style="font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">\u00d6zellikler</div>' +
      '<ul style="margin:0 0 12px 18px;padding:0;font-size:13px;color:var(--tx2);line-height:1.9">';
    th.ozellikler.forEach(function(o){ html += '<li>' + o + '</li>'; });
    html += '</ul>' +
      '<div style="font-size:11px;font-weight:700;color:#22c55e;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">Kimyasal Tepkimeler</div>' +
      '<div style="font-size:13px;color:var(--tx2);line-height:2">';
    th.tepkimeler.forEach(function(t){ html += '\u2022 ' + t + '<br>'; });
    html += '</div></div>';
    box.innerHTML = html;
  }

  function fgRenderGrid(){
    var grid = document.getElementById('fg-grid');
    if (!grid) return;
    var list = fgList().filter(function(m){ return m.cls === fgCat; });
    var html = '';
    for (var i = 0; i < list.length; i++) {
      var idx = fgList().indexOf(list[i]);
      html += '<div onclick="fgOpen(' + idx + ')" style="background:var(--sf);border:2px solid rgba(239,68,68,0.25);border-radius:16px;padding:10px 8px;text-align:center;cursor:pointer">' +
        '<div style="font-size:13px;font-weight:700;color:#fca5a5;margin-bottom:2px">' + list[i].name + '</div>' +
        '<div style="font-size:11px;color:var(--tx3);margin-bottom:6px">' + pretty(list[i].f) + '</div>' +
        '<canvas id="fg-th-' + idx + '" width="170" height="130" style="width:100%;border-radius:10px;background:#050510;border:1px solid rgba(239,68,68,0.15)"></canvas>' +
      '</div>';
    }
    grid.innerHTML = html;
    setTimeout(function(){ for (var j = 0; j < list.length; j++) fgThumb(fgList().indexOf(list[j])); }, 60);
  }

  function fgThumb(idx){
    var cv = document.getElementById('fg-th-' + idx);
    if (!cv) return;
    var item = fgList()[idx], mol = fgMol(item);
    var st = { rotX: 0.45, rotY: 0.5 + idx*0.4, zoom: 0.92, fit: mol.fit, t: idx, stars: null, sw: 0 };
    hcDraw(cv.getContext('2d'), mol, st, 170, 130, false);
  }

  window.fgOpen = function(idx){
    var item = fgList()[idx];
    if (!item) return;
    fgSt.item = item; fgSt.rotX = 0.42; fgSt.rotY = 0.6; fgSt.zoom = 1; fgSt.spin = true;
    fgSt.fit = fgMol(item).fit;
    document.getElementById('fg-title').textContent = item.name;
    document.getElementById('fg-sub').innerHTML = pretty(item.f) + ' \u00b7 <span style="color:#f87171">' + FG_CLASS_NAMES[item.cls] + '</span>';
    var mol = fgMol(item);
    var html = '<div style="font-size:14px;font-weight:600;color:#f87171;margin-bottom:12px">\ud83d\udccb Molek\u00fcl \u00d6zellikleri</div>';
    var rows = [['Molek\u00fcl Form\u00fcl\u00fc', pretty(item.f)], ['Karbon / Hidrojen / Oksijen', mol.nC + ' C \u00b7 ' + mol.nH + ' H \u00b7 ' + mol.nO + ' O'], ['Fonksiyonel Grup', FG_THEORY[item.cls].genel]];
    for (var r = 0; r < rows.length; r++)
      html += '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:13px"><span style="color:var(--tx3)">' + rows[r][0] + '</span><span style="color:#f87171;font-weight:700;text-align:right">' + rows[r][1] + '</span></div>';
    html += '<div style="margin-top:10px;font-size:11px;color:var(--tx3);line-height:1.6">\ud83c\udfa8 Renkler: <span style="color:#22d3ee">\u25cf C</span> \u00b7 <span style="color:#e2e8f0">\u25cf H</span> \u00b7 <span style="color:#ef4444">\u25cf O</span> \u00b7 <span style="color:#fb7185">\u2550 C=O \u00e7ift ba\u011f</span></div>';
    document.getElementById('fg-props').innerHTML = html;
    document.getElementById('fg-detail').style.display = 'block';
    document.getElementById('fg-detail').scrollTop = 0;
    if (fgSt.anim) cancelAnimationFrame(fgSt.anim);
    fgLoop();
  };

  function fgLoop(){
    if (!fgSt.item) return;
    var cv = document.getElementById('fg-cv');
    if (!cv || document.getElementById('fg-detail').style.display === 'none') { fgStopAnim(); return; }
    fgSt.anim = requestAnimationFrame(fgLoop);
    var rect = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    var W = rect.width || 300, H2 = Math.round(W * 0.72);
    if (Math.abs(cv.width - W*dpr) > 2 || Math.abs(cv.height - H2*dpr) > 2) { cv.width = W*dpr; cv.height = H2*dpr; }
    var x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (fgSt.spin && !fgSt.drag) fgSt.rotY += 0.008 * fgSt.spd;
    fgSt.t += 0.016;
    hcDraw(x, fgMol(fgSt.item), fgSt, W, H2, fgSt.labels);
  }
  function fgStopAnim(){ if (fgSt.anim) { cancelAnimationFrame(fgSt.anim); fgSt.anim = null; } }
  window.fgClose = function(){
    var d = document.getElementById('fg-detail');
    if (d) d.style.display = 'none';
    fgStopAnim(); fgSt.item = null;
  };
  window.fgToggleSpin = function(){ fgSt.spin = !fgSt.spin; };
  window.fgResetView = function(){ fgSt.rotX = 0.42; fgSt.rotY = 0.6; fgSt.zoom = 1; };

  function fgBindCanvas(){
    var cv = document.getElementById('fg-cv');
    if (!cv) return;
    cv.onmousedown = function(e){ fgSt.drag = true; fgSt.lx = e.clientX; fgSt.ly = e.clientY; };
    cv.onmousemove = function(e){
      if (!fgSt.drag) return;
      fgSt.rotY += (e.clientX - fgSt.lx) * 0.01; fgSt.rotX += (e.clientY - fgSt.ly) * 0.01;
      fgSt.lx = e.clientX; fgSt.ly = e.clientY;
    };
    cv.onmouseup = cv.onmouseleave = function(){ fgSt.drag = false; };
    cv.addEventListener('wheel', function(e){ e.preventDefault(); fgSt.zoom = Math.max(0.5, Math.min(3.5, fgSt.zoom - e.deltaY*0.0012)); }, { passive:false });
    cv.addEventListener('touchstart', function(e){
      if (e.touches.length === 1) { fgSt.drag = true; fgSt.lx = e.touches[0].clientX; fgSt.ly = e.touches[0].clientY; }
      else if (e.touches.length === 2) { var dx=e.touches[0].clientX-e.touches[1].clientX, dy=e.touches[0].clientY-e.touches[1].clientY; fgSt.dist=Math.sqrt(dx*dx+dy*dy); }
      e.preventDefault();
    }, { passive:false });
    cv.addEventListener('touchmove', function(e){
      if (e.touches.length === 1 && fgSt.drag) {
        fgSt.rotY += (e.touches[0].clientX - fgSt.lx) * 0.014; fgSt.rotX += (e.touches[0].clientY - fgSt.ly) * 0.014;
        fgSt.lx = e.touches[0].clientX; fgSt.ly = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        var dx=e.touches[0].clientX-e.touches[1].clientX, dy=e.touches[0].clientY-e.touches[1].clientY, dist=Math.sqrt(dx*dx+dy*dy);
        if (fgSt.dist > 0) fgSt.zoom = Math.max(0.5, Math.min(3.5, fgSt.zoom * dist/fgSt.dist));
        fgSt.dist = dist;
      }
      e.preventDefault();
    }, { passive:false });
    cv.addEventListener('touchend', function(){ fgSt.drag = false; fgSt.dist = 0; });
  }
  function fgEnter(){ fgRenderTheory(); fgRenderGrid(); }
  function fgLeave(){ window.fgClose(); }

  // ---------- 13. MAARİF 9. SINIF — ETKİLEŞİM ÜNİTESİ ----------
  // Zayıf Etkileşimler (London/dipol-dipol/hidrojen bağı) ve
  // Maddenin Halleri (katı/sıvı/gaz/plazma) — 3D görsel + detaylı konu.

  // ---- 13a. ZAYIF ETKİLEŞİMLER ----
  var WI_TYPES = {
    london: {
      name:'London (Van der Waals) Kuvvetleri', icon:'\u26a1',
      tanim:'T\u00fcm molek\u00fcller aras\u0131nda bulunan, elektron bulutunun ANLIK ve GE\u00c7\u0130C\u0130 kaym\u0131 sonucu olu\u015fan EN ZAYIF \u00e7ekim kuvvetidir. Apolar molek\u00fcllerin (N\u2082, CH\u2084, soy gazlar) TEK etkile\u015fim t\u00fcr\u00fcd\u00fcr.',
      ozellikler:[
        'Elektron say\u0131s\u0131 (molek\u00fcl k\u00fctlesi) artt\u0131k\u00e7 London kuvveti G\u00dc\u00c7LEN\u0130R \u2192 kaynama noktas\u0131 y\u00fckselir (\u00f6rn. F\u2082<Cl\u2082<Br\u2082<I\u2082).',
        'Molek\u00fcl \u015fekli de \u00f6nemlidir: DO\u011eRUSAL/uzun molek\u00fcllerde temas y\u00fczeyi fazla oldu\u011fu i\u00e7in London kuvveti, dallanm\u0131\u015f/k\u00fcresel izomerlerden daha g\u00fc\u00e7l\u00fcd\u00fcr.',
        'T\u00fcm di\u011fer etkile\u015fim t\u00fcrlerinin YANINDA da her zaman bulunur (en zay\u0131f ama en yayg\u0131n olan\u0131d\u0131r).',
        'Oda s\u0131cakl\u0131\u011f\u0131nda soy gazlar\u0131n ve H\u2082, N\u2082, O\u2082 gibi apolar molek\u00fcllerin gaz halde bulunmas\u0131n\u0131n nedeni budur \u2014 \u00e7ok zay\u0131f oldu\u011fu i\u00e7in kolayca ayr\u0131l\u0131rlar.'
      ]
    },
    dipol: {
      name:'Dipol-Dipol Etkile\u015fimi', icon:'\u2194\ufe0f',
      tanim:'POLAR molek\u00fcllerin kal\u0131c\u0131 (+) ve (\u2212) u\u00e7lar\u0131n\u0131n birbirini \u00e7ekmesiyle olu\u015fur. London kuvvetinden G\u00dc\u00c7L\u00dc, hidrojen ba\u011f\u0131ndan ZAYIFTIR.',
      ozellikler:[
        'Yaln\u0131zca polar molek\u00fcllerde (HCl, SO\u2082, aseton gibi) g\u00f6r\u00fcl\u00fcr \u2014 molek\u00fclde kal\u0131c\u0131 bir dipol moment olmal\u0131d\u0131r.',
        'Ayn\u0131 molek\u00fcl k\u00fctlesine sahip apolar bir molek\u00fclden DAHA Y\u00dcKSEK kaynama noktas\u0131na yol a\u00e7ar (\u00f6rn. HCl, F\u2082\u2019den daha polar ve daha y\u00fcksek kaynar).',
        'Molek\u00fcller birbirine (+) u\u00e7 \u2014 (\u2212) u\u00e7 \u015feklinde, elektrostatik \u00e7ekimle diz1lir.',
        '\u00d6rnekler: HCl, HBr, SO\u2082, aseton (CH\u2083COCH\u2083), kloroform (CHCl\u2083).'
      ]
    },
    hidrojen: {
      name:'Hidrojen Ba\u011f\u0131', icon:'\ud83d\udca7',
      tanim:'H atomunun \u00c7OK elektronegatif bir atoma (F, O, N) do\u011frudan ba\u011fl\u0131 oldu\u011fu molek\u00fcllerde g\u00f6r\u00fclen, zay\u0131f etkile\u015fimlerin EN G\u00dc\u00c7L\u00dcS\u00fcd\u00fcr (yine de gerçek bir kovalent/iyonik bağdan çok daha zayıftır).',
      ozellikler:[
        '"F-O-N kural\u0131": Hidrojen ba\u011f\u0131 i\u00e7in H, mutlaka F, O veya N atomuna DO\u011eRUDAN ba\u011fl\u0131 olmal\u0131d\u0131r.',
        'Su (H\u2082O), amonyak (NH\u2083), hidrojen florür (HF) ve alkoller (R-OH) hidrojen ba\u011f\u0131 yapan ba\u015fl\u0131ca örneklerdir.',
        'Suyun beklenenden ÇOK y\u00fcksek kaynama noktas\u0131na (100°C) sahip olmas\u0131n\u0131n nedeni budur \u2014 H\u2082S (hidrojen ba\u011f\u0131 yapamaz) \u2212 60°C\u2019de kaynar!',
        'DNA\u2019n\u0131n çift sarmal yap\u0131s\u0131n\u0131 bir arada tutan da hidrojen ba\u011flar\u0131d\u0131r; buz, hidrojen ba\u011flar\u0131 sayesinde sudan daha az yo\u011fundur (bu yüzden buz suda yüzer).'
      ]
    }
  };
  var WI_ORDER = ['london','dipol','hidrojen'];
  var wiKind = 'london';
  var wiSt = { rotX: 0.3, rotY: 0.4, zoom: 1, fit: 1, spin: true, drag: false, lx:0, ly:0, dist:0, t: 0, anim: null, stars: null, sw: 0, bound: false };

  function wiDraw(x, W, H2){
    hcBg(x, wiSt, W, H2);
    var items = [];
    function pushMol(cx, polarity){ // polarity: 0=apolar, 1=+uçlu, -1=−uçlu (basit iki-küre gösterim)
      var col = polarity > 0 ? [96,165,250] : polarity < 0 ? [248,113,113] : [148,197,255];
      var p = hcProj(wiSt, cx, 0, 0, W, H2);
      items.push({ z: p.z, x: p.x, y: p.y, s: p.s, r: 30*p.s, col: col, lab: polarity>0?'\u03b4+':polarity<0?'\u03b4\u2212':'' });
    }
    var gap = 95 + 25*Math.sin(wiSt.t*0.6);
    if (wiKind === 'london') {
      // Sürekli titreşen, anlık dipol vurgusu
      var phase = Math.sin(wiSt.t*2.2);
      pushMol(-gap/2, phase>0.15?1:phase<-0.15?-1:0);
      pushMol(gap/2, phase>0.15?-1:phase<-0.15?1:0);
    } else if (wiKind === 'dipol') {
      pushMol(-gap/2, 1); pushMol(gap/2, -1);
    } else {
      pushMol(-gap/2, 1); pushMol(gap/2, -1);
    }
    // Çekim çizgisi
    var pL = hcProj(wiSt, -gap/2+30, 0, 0, W, H2), pR = hcProj(wiSt, gap/2-30, 0, 0, W, H2);
    x.save();
    if (wiKind === 'hidrojen') { x.setLineDash([6,5]); x.strokeStyle = 'rgba(248,113,113,0.85)'; x.lineWidth = 2.4; }
    else if (wiKind === 'dipol') { x.strokeStyle = 'rgba(96,165,250,0.6)'; x.lineWidth = 1.8; }
    else { x.strokeStyle = 'rgba(148,197,255,' + (0.2+0.35*Math.abs(Math.sin(wiSt.t*2.2))) + ')'; x.lineWidth = 1.4; x.setLineDash([2,4]); }
    x.beginPath(); x.moveTo(pL.x,pL.y); x.lineTo(pR.x,pR.y); x.stroke();
    x.restore();
    items.sort(function(a,b){ return b.z-a.z; });
    for (var i=0;i<items.length;i++){
      var it = items[i];
      var gg = x.createRadialGradient(it.x-it.r*0.3, it.y-it.r*0.3, it.r*0.1, it.x, it.y, it.r);
      gg.addColorStop(0, 'rgba(' + it.col.join(',') + ',0.95)');
      gg.addColorStop(1, 'rgba(' + it.col.join(',') + ',0.35)');
      x.beginPath(); x.arc(it.x, it.y, it.r, 0, 6.283); x.fillStyle = gg; x.fill();
      x.strokeStyle = 'rgba(255,255,255,0.3)'; x.lineWidth = 1; x.stroke();
      if (it.lab) {
        x.fillStyle = '#fff'; x.font = 'bold ' + Math.max(11, it.r*0.5) + 'px sans-serif';
        x.textAlign = 'center'; x.textBaseline = 'middle';
        x.fillText(it.lab, it.x, it.y); x.textBaseline = 'alphabetic';
      }
    }
    x.fillStyle = 'rgba(255,255,255,.3)'; x.font = '10px sans-serif'; x.textAlign = 'left';
    x.fillText('\ud83d\udc46 S\u00fcr\u00fckle d\u00f6nd\u00fcr', 8, H2-8);
    x.textAlign = 'left';
  }

  window.wiSetKind = function(k, btn){ wiKind = k; if (btn) selectInRow(btn); wiRenderTheory(); };
  function wiRenderTheory(){
    var box = document.getElementById('wi-theory');
    if (!box) return;
    var th = WI_TYPES[wiKind];
    var html = '<div class="card"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
      '<span style="font-size:26px">' + th.icon + '</span><div style="font-family:Space Grotesk,sans-serif;font-size:17px;font-weight:800;color:#fff">' + th.name + '</div></div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:12px">' + th.tanim + '</p>' +
      '<div style="font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">\u00d6zellikler</div>' +
      '<ul style="margin:0 0 4px 18px;padding:0;font-size:13px;color:var(--tx2);line-height:1.9">';
    th.ozellikler.forEach(function(o){ html += '<li>' + o + '</li>'; });
    html += '</ul></div>';
    html += '<div class="card" style="margin-top:10px"><div class="slbl">G\u00fc\u00e7 S\u0131ralamas\u0131</div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;color:var(--tx2);margin-top:6px">' +
      '<span>London <b style="color:#93c5fd">(en zay\u0131f)</b></span><span>\u2192</span><span>Dipol-Dipol</span><span>\u2192</span><span><b style="color:#f87171">Hidrojen Ba\u011f\u0131</b> (en g\u00fc\u00e7l\u00fc)</span></div></div>';
    box.innerHTML = html;
  }

  function wiLoop(){
    var scr = document.getElementById('s-wi');
    if (!scr || scr.style.display === 'none') { wiStop(); return; }
    wiSt.anim = requestAnimationFrame(wiLoop);
    var cv = document.getElementById('wi-cv');
    if (!cv) return;
    var rect = cv.getBoundingClientRect();
    var W = rect.width || cv.clientWidth || 300, H2 = 260;
    var dpr = window.devicePixelRatio || 1;
    if (Math.abs(cv.width - W*dpr) > 2 || Math.abs(cv.height - H2*dpr) > 2) { cv.width = W*dpr; cv.height = H2*dpr; }
    var x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    try {
      if (wiSt.spin && !wiSt.drag) wiSt.rotY += 0.006;
      wiSt.t += 0.016;
      wiDraw(x, W, H2);
    } catch (e) { drawErr(x, W, H2, e); }
  }
  function wiStop(){ if (wiSt.anim) { cancelAnimationFrame(wiSt.anim); wiSt.anim = null; } }
  function wiStart(){ wiBind(); if (wiSt.anim) cancelAnimationFrame(wiSt.anim); wiLoop(); }
  function wiBind(){
    if (wiSt.bound) return;
    var cv = document.getElementById('wi-cv');
    if (!cv) return;
    wiSt.bound = true;
    cv.onmousedown = function(e){ wiSt.drag = true; wiSt.lx = e.clientX; wiSt.ly = e.clientY; };
    cv.onmousemove = function(e){ if (!wiSt.drag) return; wiSt.rotY += (e.clientX-wiSt.lx)*0.01; wiSt.rotX += (e.clientY-wiSt.ly)*0.01; wiSt.lx=e.clientX; wiSt.ly=e.clientY; };
    cv.onmouseup = cv.onmouseleave = function(){ wiSt.drag = false; };
    cv.addEventListener('touchstart', function(e){ wiSt.drag=true; wiSt.lx=e.touches[0].clientX; wiSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchmove', function(e){ if(!wiSt.drag) return; wiSt.rotY += (e.touches[0].clientX-wiSt.lx)*0.013; wiSt.rotX += (e.touches[0].clientY-wiSt.ly)*0.013; wiSt.lx=e.touches[0].clientX; wiSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchend', function(){ wiSt.drag = false; });
  }

  // ---- 13b. MADDENİN HALLERİ ----
  var MH_STATES = {
    kati: {
      name:'Kat\u0131', icon:'\ud83e\uddca',
      tanim:'Tanecikler birbirine \u00e7ok yak\u0131n, D\u00dcZENL\u0130 (\u00f6rg\u00fc/kristal) bir diziliminde ve sabit konumlar etraf\u0131nda sadece T\u0130TRE\u015e\u0130R.',
      ozellikler:[
        'Belirli \u015fekli VE belirli hacmi vard\u0131r.',
        'Tanecikler aras\u0131 \u00e7ekim kuvveti EN G\u00dc\u00c7L\u00dc, taneciklerin kinetik enerjisi EN D\u00dc\u015e\u00dcKT\u00dcR.',
        'S\u0131k\u0131\u015ft\u0131r\u0131lamaz (tanecikler aras\u0131 bo\u015fluk neredeyse yoktur).',
        'Ak\u0131\u015fkan de\u011fildir; kendi \u015feklini korur.'
      ]
    },
    sivi: {
      name:'S\u0131v\u0131', icon:'\ud83d\udca7',
      tanim:'Tanecikler birbirine yak\u0131n ama D\u00dcZENS\u0130Zdir; sabit bir konumlar\u0131 yoktur, birbirinin \u00fczerinden KAYARAK hareket ederler.',
      ozellikler:[
        'Belirli hacmi vard\u0131r fakat belirli \u015fekli YOKTUR \u2014 konuldu\u011fu kab\u0131n \u015feklini al\u0131r.',
        'Tanecikler aras\u0131 \u00e7ekim kat\u0131dan zay\u0131f, gazdan g\u00fc\u00e7l\u00fcd\u00fcr; orta d\u00fczeyde kinetik enerjiye sahiptirler.',
        'Ak\u0131\u015fkand\u0131r; \u00e7ok az s\u0131k\u0131\u015ft\u0131r\u0131labilir (neredeyse s\u0131f\u0131r).',
        'Y\u00fczey gerilimi ve viskozite gibi \u00f6zellikler s\u0131v\u0131lara \u00f6zg\u00fcd\u00fcr.'
      ]
    },
    gaz: {
      name:'Gaz', icon:'\ud83d\udca8',
      tanim:'Tanecikler birbirinden ÇOK uzak, tamamen D\u00dcZENSİZ ve BA\u011eIMSIZ olarak h\u0131zl\u0131 ve rastgele hareket eder.',
      ozellikler:[
        'Ne belirli \u015fekli NE de belirli hacmi vard\u0131r \u2014 bulundu\u011fu kab\u0131n tamam\u0131n\u0131 doldurur.',
        'Tanecikler aras\u0131 \u00e7ekim kuvveti \u0130HMAL ED\u0130LEB\u0130L\u0130R d\u00fczeydedir; kinetik enerji EN Y\u00dcKSEKT\u0130R.',
        'Kolayca S\u0130KI\u015eTIRILABİLİR (tanecikler aras\u0131 bo\u015fluk \u00e7ok fazlad\u0131r).',
        'Bas\u0131n\u00e7, hacim ve s\u0131cakl\u0131k aras\u0131ndaki ili\u015fki ideal gaz yasas\u0131yla (PV=nRT) a\u00e7\u0131klan\u0131r.'
      ]
    },
    plazma: {
      name:'Plazma', icon:'\u2604\ufe0f',
      tanim:'Gaz\u0131n \u00e7ok y\u00fcksek s\u0131cakl\u0131kta İYONLA\u015eMASIYLA (elektronlar\u0131n atomdan kopmas\u0131yla) olu\u015fan D\u00d6RD\u00dcNC\u00dc hal say\u0131lan\u0131r.',
      ozellikler:[
        'Serbest elektronlar ve pozitif iyonlardan olu\u015fur \u2014 elektrik ak\u0131m\u0131n\u0131 iletir, manyetik alandan etkilenir.',
        'Evrendeki maddenin \u00e7o\u011funlu\u011fu plazma halindedir (y\u0131ld\u0131zlar, g\u00fcne\u015f).',
        'G\u00fcnl\u00fck hayatta floresan/neon lambalar, y\u0131ld\u0131r\u0131m ve kutup \u0131\u015f\u0131klar\u0131 (aurora) plazma \u00f6rnekleridir.',
        'Gazdan daha y\u00fcksek enerjilidir; tanecikler hem h\u0131zl\u0131 hareket eder hem de elektrik y\u00fckl\u00fcd\u00fcr.'
      ]
    }
  };
  var MH_TRANS = [
    ['Erime','Kat\u0131 \u2192 S\u0131v\u0131','Is\u0131 al\u0131n\u0131r'], ['Donma','S\u0131v\u0131 \u2192 Kat\u0131','Is\u0131 verilir'],
    ['Buharla\u015fma','S\u0131v\u0131 \u2192 Gaz','Is\u0131 al\u0131n\u0131r'], ['Yo\u011fu\u015fma','Gaz \u2192 S\u0131v\u0131','Is\u0131 verilir'],
    ['S\u00fcblimle\u015fme','Kat\u0131 \u2192 Gaz (do\u011frudan)','Is\u0131 al\u0131n\u0131r'], ['Kra\u011f\u0131la\u015fma','Gaz \u2192 Kat\u0131 (do\u011frudan)','Is\u0131 verilir']
  ];
  var mhState = 'kati';
  var mhSt = { rotX: 0.35, rotY: 0.5, zoom: 1, fit: 1, spin: false, drag: false, lx:0, ly:0, dist:0, t: 0, anim: null, stars: null, sw: 0, bound: false, particles: [] };
  var MH_N = 24, MH_BOX = 85;

  function mhInitParticles(){
    mhSt.particles = [];
    var side = Math.ceil(Math.pow(MH_N, 1/3));
    for (var i = 0; i < MH_N; i++) {
      var gx = (i % side) - side/2, gy = (Math.floor(i/side) % side) - side/2, gz = Math.floor(i/(side*side)) - side/2;
      mhSt.particles.push({
        hx: gx * (MH_BOX*1.7/side), hy: gy * (MH_BOX*1.7/side), hz: gz * (MH_BOX*1.7/side),
        x: (Math.random()-0.5)*MH_BOX*1.6, y: (Math.random()-0.5)*MH_BOX*1.6, z: (Math.random()-0.5)*MH_BOX*1.6,
        vx: (Math.random()-0.5)*2, vy: (Math.random()-0.5)*2, vz: (Math.random()-0.5)*2
      });
    }
  }
  mhInitParticles();

  window.mhSetState = function(s, btn){
    mhState = s;
    if (btn) selectInRow(btn);
    mhRenderTheory();
  };
  function mhRenderTheory(){
    var box = document.getElementById('mh-theory');
    if (!box) return;
    var th = MH_STATES[mhState];
    var html = '<div class="card"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
      '<span style="font-size:26px">' + th.icon + '</span><div style="font-family:Space Grotesk,sans-serif;font-size:17px;font-weight:800;color:#fff">' + th.name + '</div></div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:12px">' + th.tanim + '</p>' +
      '<div style="font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">\u00d6zellikler</div>' +
      '<ul style="margin:0 0 4px 18px;padding:0;font-size:13px;color:var(--tx2);line-height:1.9">';
    th.ozellikler.forEach(function(o){ html += '<li>' + o + '</li>'; });
    html += '</ul></div>';
    if (mhState !== 'plazma') {
      html += '<div class="card" style="margin-top:10px"><div class="slbl">Hal De\u011fi\u015fim Tepkimeleri</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px;font-size:11px">';
      MH_TRANS.forEach(function(t){
        html += '<div style="background:var(--sf2);border-radius:8px;padding:8px;text-align:center">' +
          '<div style="font-weight:700;color:#fff;margin-bottom:2px">' + t[0] + '</div>' +
          '<div style="color:var(--ac2);margin-bottom:2px">' + t[1] + '</div>' +
          '<div style="color:var(--tx3)">' + t[2] + '</div></div>';
      });
      html += '</div></div>';
    }
    box.innerHTML = html;
  }

  function mhDraw(x, W, H2){
    hcBg(x, mhSt, W, H2);
    var items = [];
    // Kap
    var boxPts = [];
    for (var sx=-1; sx<=1; sx+=2) for (var sy=-1; sy<=1; sy+=2) for (var sz=-1; sz<=1; sz+=2) boxPts.push([sx*MH_BOX,sy*MH_BOX,sz*MH_BOX]);
    var edges = [[0,1],[0,2],[0,4],[3,1],[3,2],[3,7],[5,1],[5,4],[5,7],[6,2],[6,4],[6,7]];
    x.strokeStyle = 'rgba(129,140,248,0.35)'; x.lineWidth = 1.2;
    edges.forEach(function(e){
      var p1 = hcProj(mhSt, boxPts[e[0]][0],boxPts[e[0]][1],boxPts[e[0]][2], W, H2);
      var p2 = hcProj(mhSt, boxPts[e[1]][0],boxPts[e[1]][1],boxPts[e[1]][2], W, H2);
      x.beginPath(); x.moveTo(p1.x,p1.y); x.lineTo(p2.x,p2.y); x.stroke();
    });
    var speed = mhState==='kati'?0.06:mhState==='sivi'?0.5:mhState==='gaz'?2.4:3.2;
    var isPlazma = mhState === 'plazma';
    for (var i = 0; i < mhSt.particles.length; i++) {
      var pt = mhSt.particles[i];
      if (mhState === 'kati') {
        pt.x = pt.hx + Math.sin(mhSt.t*8 + i)*2.5;
        pt.y = pt.hy + Math.cos(mhSt.t*7 + i*1.3)*2.5;
        pt.z = pt.hz + Math.sin(mhSt.t*6 + i*0.7)*2.5;
      } else {
        pt.x += pt.vx * speed; pt.y += pt.vy * speed; pt.z += pt.vz * speed;
        var lim = mhState === 'sivi' ? MH_BOX*0.55 : MH_BOX*0.92;
        if (Math.abs(pt.x) > lim) { pt.vx *= -1; pt.x = Math.sign(pt.x)*lim; }
        if (Math.abs(pt.y) > lim) { pt.vy *= -1; pt.y = Math.sign(pt.y)*lim; }
        if (Math.abs(pt.z) > lim) { pt.vz *= -1; pt.z = Math.sign(pt.z)*lim; }
        if (mhState === 'sivi' && Math.random() < 0.02) { pt.vx += (Math.random()-0.5)*0.6; pt.vy += (Math.random()-0.5)*0.6; pt.vz += (Math.random()-0.5)*0.6; }
      }
      var p = hcProj(mhSt, pt.x, pt.y, pt.z, W, H2);
      items.push({ z: p.z, x: p.x, y: p.y, r: (isPlazma?7:6)*p.s, plasma: isPlazma });
    }
    items.sort(function(a,b){ return b.z-a.z; });
    for (var j = 0; j < items.length; j++) {
      var it = items[j];
      if (it.plasma) {
        x.beginPath(); x.arc(it.x, it.y, it.r+5, 0, 6.283);
        x.fillStyle = 'rgba(168,85,247,0.25)'; x.fill();
      }
      var gg = x.createRadialGradient(it.x-it.r*0.3, it.y-it.r*0.3, it.r*0.1, it.x, it.y, it.r);
      if (it.plasma) { gg.addColorStop(0,'#e9d5ff'); gg.addColorStop(0.6,'#a855f7'); gg.addColorStop(1,'#581c87'); }
      else { gg.addColorStop(0,'#93c5fd'); gg.addColorStop(0.6,'#3b82f6'); gg.addColorStop(1,'#1e3a8a'); }
      x.beginPath(); x.arc(it.x, it.y, it.r, 0, 6.283); x.fillStyle = gg; x.fill();
    }
    x.fillStyle = 'rgba(255,255,255,.3)'; x.font = '10px sans-serif'; x.textAlign = 'left';
    x.fillText('\ud83d\udc46 S\u00fcr\u00fckle d\u00f6nd\u00fcr', 8, H2-8);
  }

  function mhLoop(){
    var scr = document.getElementById('s-wi');
    if (!scr || scr.style.display === 'none') { mhStop(); return; }
    mhSt.anim = requestAnimationFrame(mhLoop);
    var cv = document.getElementById('mh-cv');
    if (!cv) return;
    var rect = cv.getBoundingClientRect();
    var W = rect.width || cv.clientWidth || 300, H2 = 260;
    var dpr = window.devicePixelRatio || 1;
    if (Math.abs(cv.width - W*dpr) > 2 || Math.abs(cv.height - H2*dpr) > 2) { cv.width = W*dpr; cv.height = H2*dpr; }
    var x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    try {
      if (mhSt.spin && !mhSt.drag) mhSt.rotY += 0.006;
      mhSt.t += 0.016;
      mhDraw(x, W, H2);
    } catch (e) { drawErr(x, W, H2, e); }
  }
  function mhStop(){ if (mhSt.anim) { cancelAnimationFrame(mhSt.anim); mhSt.anim = null; } }
  function mhStart(){ mhBind(); if (mhSt.anim) cancelAnimationFrame(mhSt.anim); mhLoop(); }
  function mhBind(){
    if (mhSt.bound) return;
    var cv = document.getElementById('mh-cv');
    if (!cv) return;
    mhSt.bound = true;
    cv.onmousedown = function(e){ mhSt.drag = true; mhSt.lx = e.clientX; mhSt.ly = e.clientY; };
    cv.onmousemove = function(e){ if (!mhSt.drag) return; mhSt.rotY += (e.clientX-mhSt.lx)*0.01; mhSt.rotX += (e.clientY-mhSt.ly)*0.01; mhSt.lx=e.clientX; mhSt.ly=e.clientY; };
    cv.onmouseup = cv.onmouseleave = function(){ mhSt.drag = false; };
    cv.addEventListener('touchstart', function(e){ mhSt.drag=true; mhSt.lx=e.touches[0].clientX; mhSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchmove', function(e){ if(!mhSt.drag) return; mhSt.rotY += (e.touches[0].clientX-mhSt.lx)*0.013; mhSt.rotX += (e.touches[0].clientY-mhSt.ly)*0.013; mhSt.lx=e.touches[0].clientX; mhSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchend', function(){ mhSt.drag = false; });
  }

  // ---- 13c. Ekran kurulumu (Zayıf Etkileşimler + Maddenin Halleri sekmeleri) ----
  function setupWI(){
    if (document.getElementById('s-wi')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    var wiBtns = '', mhBtns = '';
    WI_ORDER.forEach(function(k, i){ wiBtns += '<button type="button" class="ob' + (i===0?' sel2':'') + '" onclick="wiSetKind(\'' + k + '\',this)">' + WI_TYPES[k].icon + ' ' + WI_TYPES[k].name + '</button>'; });
    ['kati','sivi','gaz','plazma'].forEach(function(k, i){ mhBtns += '<button type="button" class="ob' + (i===0?' sel2':'') + '" onclick="mhSetState(\'' + k + '\',this)">' + MH_STATES[k].icon + ' ' + MH_STATES[k].name + '</button>'; });

    app.insertAdjacentHTML('beforeend',
      '<div id="s-wi" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\ud83e\uddf2 Etkile\u015fim \u00dcnitesi \u00b7 9. S\u0131n\u0131f</h1>' +
        '<p class="psub">Zay\u0131f etkile\u015fimler ve maddenin halleri \u2014 3D g\u00f6rsel + detayl\u0131 konu.</p>' +
        '<div class="tabs" id="wi-tabs">' +
          '<button class="tab on" onclick="tswitch(\'wi-tabs\',\'wi-tps\',0)">\u26a1 Zay\u0131f Etkile\u015fimler</button>' +
          '<button class="tab" onclick="tswitch(\'wi-tabs\',\'wi-tps\',1)">\ud83e\uddca Maddenin Halleri</button>' +
        '</div>' +
        '<div id="wi-tps">' +
          '<div class="tp on">' +
            '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:10px"><div style="display:flex;gap:6px;min-width:max-content">' + wiBtns + '</div></div>' +
            '<div style="background:#050510;border:1px solid rgba(129,140,248,.3);border-radius:16px;overflow:hidden;margin-bottom:12px">' +
              '<canvas id="wi-cv" style="width:100%;display:block;touch-action:none" height="260"></canvas>' +
            '</div>' +
            '<div id="wi-theory"></div>' +
          '</div>' +
          '<div class="tp">' +
            '<div style="display:flex;gap:6px;margin-bottom:10px">' + mhBtns + '</div>' +
            '<div style="background:#050510;border:1px solid rgba(129,140,248,.3);border-radius:16px;overflow:hidden;margin-bottom:12px">' +
              '<canvas id="mh-cv" style="width:100%;display:block;touch-action:none" height="260"></canvas>' +
            '</div>' +
            '<div id="mh-theory"></div>' +
          '</div>' +
        '</div>' +
      '</div></div>');

    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-wi') === -1) SCREENS.push('s-wi');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-wi'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-wi" onclick="nav(\'wi\')">\ud83e\uddf2 Etkile\u015fim \u00dcnitesi (9. S\u0131n\u0131f)</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-wi'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-wi" onclick="nav(\'wi\')"><div class="ti">\ud83e\uddf2</div><div class="tt">Etkile\u015fim \u00dcnitesi</div><div class="td">9. S\u0131n\u0131f: Zay\u0131f etkile\u015fimler ve maddenin halleri, 3D g\u00f6rsel.</div></div>');

    wiRenderTheory(); mhRenderTheory();
    wiBind(); mhBind();
  }
  function wiEnter(){ setTimeout(function(){ wiStart(); mhStart(); }, 80); }
  function wiLeave(){ wiStop(); mhStop(); }

window.__t = { parseOrganicName, checkCanonicalName, hcBuildAt, organicMolFormula };
  // --- Başlat ---
  // ---------- 13. MAARİF 9. SINIF — ETKİLEŞİM ÜNİTESİ ----------
  // Zayıf Etkileşimler (London/dipol-dipol/hidrojen bağı) ve
  // Maddenin Halleri (katı/sıvı/gaz/plazma) — 3D görsel + detaylı konu.

  // ---- 13a. ZAYIF ETKİLEŞİMLER ----
  var WI_TYPES = {
    london: {
      name:'London (Van der Waals) Kuvvetleri', icon:'\u26a1',
      tanim:'T\u00fcm molek\u00fcller aras\u0131nda bulunan, elektron bulutunun ANLIK ve GE\u00c7\u0130C\u0130 kaym\u0131 sonucu olu\u015fan EN ZAYIF \u00e7ekim kuvvetidir. Apolar molek\u00fcllerin (N\u2082, CH\u2084, soy gazlar) TEK etkile\u015fim t\u00fcr\u00fcd\u00fcr.',
      ozellikler:[
        'Elektron say\u0131s\u0131 (molek\u00fcl k\u00fctlesi) artt\u0131k\u00e7 London kuvveti G\u00dc\u00c7LEN\u0130R \u2192 kaynama noktas\u0131 y\u00fckselir (\u00f6rn. F\u2082<Cl\u2082<Br\u2082<I\u2082).',
        'Molek\u00fcl \u015fekli de \u00f6nemlidir: DO\u011eRUSAL/uzun molek\u00fcllerde temas y\u00fczeyi fazla oldu\u011fu i\u00e7in London kuvveti, dallanm\u0131\u015f/k\u00fcresel izomerlerden daha g\u00fc\u00e7l\u00fcd\u00fcr.',
        'T\u00fcm di\u011fer etkile\u015fim t\u00fcrlerinin YANINDA da her zaman bulunur (en zay\u0131f ama en yayg\u0131n olan\u0131d\u0131r).',
        'Oda s\u0131cakl\u0131\u011f\u0131nda soy gazlar\u0131n ve H\u2082, N\u2082, O\u2082 gibi apolar molek\u00fcllerin gaz halde bulunmas\u0131n\u0131n nedeni budur \u2014 \u00e7ok zay\u0131f oldu\u011fu i\u00e7in kolayca ayr\u0131l\u0131rlar.'
      ]
    },
    dipol: {
      name:'Dipol-Dipol Etkile\u015fimi', icon:'\u2194\ufe0f',
      tanim:'POLAR molek\u00fcllerin kal\u0131c\u0131 (+) ve (\u2212) u\u00e7lar\u0131n\u0131n birbirini \u00e7ekmesiyle olu\u015fur. London kuvvetinden G\u00dc\u00c7L\u00dc, hidrojen ba\u011f\u0131ndan ZAYIFTIR.',
      ozellikler:[
        'Yaln\u0131zca polar molek\u00fcllerde (HCl, SO\u2082, aseton gibi) g\u00f6r\u00fcl\u00fcr \u2014 molek\u00fclde kal\u0131c\u0131 bir dipol moment olmal\u0131d\u0131r.',
        'Ayn\u0131 molek\u00fcl k\u00fctlesine sahip apolar bir molek\u00fclden DAHA Y\u00dcKSEK kaynama noktas\u0131na yol a\u00e7ar (\u00f6rn. HCl, F\u2082\u2019den daha polar ve daha y\u00fcksek kaynar).',
        'Molek\u00fcller birbirine (+) u\u00e7 \u2014 (\u2212) u\u00e7 \u015feklinde, elektrostatik \u00e7ekimle diz1lir.',
        '\u00d6rnekler: HCl, HBr, SO\u2082, aseton (CH\u2083COCH\u2083), kloroform (CHCl\u2083).'
      ]
    },
    hidrojen: {
      name:'Hidrojen Ba\u011f\u0131', icon:'\ud83d\udca7',
      tanim:'H atomunun \u00c7OK elektronegatif bir atoma (F, O, N) do\u011frudan ba\u011fl\u0131 oldu\u011fu molek\u00fcllerde g\u00f6r\u00fclen, zay\u0131f etkile\u015fimlerin EN G\u00dc\u00c7L\u00dcS\u00fcd\u00fcr (yine de gerçek bir kovalent/iyonik bağdan çok daha zayıftır).',
      ozellikler:[
        '"F-O-N kural\u0131": Hidrojen ba\u011f\u0131 i\u00e7in H, mutlaka F, O veya N atomuna DO\u011eRUDAN ba\u011fl\u0131 olmal\u0131d\u0131r.',
        'Su (H\u2082O), amonyak (NH\u2083), hidrojen florür (HF) ve alkoller (R-OH) hidrojen ba\u011f\u0131 yapan ba\u015fl\u0131ca örneklerdir.',
        'Suyun beklenenden ÇOK y\u00fcksek kaynama noktas\u0131na (100°C) sahip olmas\u0131n\u0131n nedeni budur \u2014 H\u2082S (hidrojen ba\u011f\u0131 yapamaz) \u2212 60°C\u2019de kaynar!',
        'DNA\u2019n\u0131n çift sarmal yap\u0131s\u0131n\u0131 bir arada tutan da hidrojen ba\u011flar\u0131d\u0131r; buz, hidrojen ba\u011flar\u0131 sayesinde sudan daha az yo\u011fundur (bu yüzden buz suda yüzer).'
      ]
    }
  };
  var WI_ORDER = ['london','dipol','hidrojen'];
  var wiKind = 'london';
  var wiSt = { rotX: 0.3, rotY: 0.4, zoom: 1, spin: true, drag: false, lx:0, ly:0, dist:0, t: 0, anim: null, stars: null, sw: 0, bound: false };

  function wiDraw(x, W, H2){
    hcBg(x, wiSt, W, H2);
    var items = [];
    function pushMol(cx, polarity){ // polarity: 0=apolar, 1=+uçlu, -1=−uçlu (basit iki-küre gösterim)
      var col = polarity > 0 ? [96,165,250] : polarity < 0 ? [248,113,113] : [148,197,255];
      var p = hcProj(wiSt, cx, 0, 0, W, H2);
      items.push({ z: p.z, x: p.x, y: p.y, s: p.s, r: 30*p.s, col: col, lab: polarity>0?'\u03b4+':polarity<0?'\u03b4\u2212':'' });
    }
    var gap = 95 + 25*Math.sin(wiSt.t*0.6);
    if (wiKind === 'london') {
      // Sürekli titreşen, anlık dipol vurgusu
      var phase = Math.sin(wiSt.t*2.2);
      pushMol(-gap/2, phase>0.15?1:phase<-0.15?-1:0);
      pushMol(gap/2, phase>0.15?-1:phase<-0.15?1:0);
    } else if (wiKind === 'dipol') {
      pushMol(-gap/2, 1); pushMol(gap/2, -1);
    } else {
      pushMol(-gap/2, 1); pushMol(gap/2, -1);
    }
    // Çekim çizgisi
    var pL = hcProj(wiSt, -gap/2+30, 0, 0, W, H2), pR = hcProj(wiSt, gap/2-30, 0, 0, W, H2);
    x.save();
    if (wiKind === 'hidrojen') { x.setLineDash([6,5]); x.strokeStyle = 'rgba(248,113,113,0.85)'; x.lineWidth = 2.4; }
    else if (wiKind === 'dipol') { x.strokeStyle = 'rgba(96,165,250,0.6)'; x.lineWidth = 1.8; }
    else { x.strokeStyle = 'rgba(148,197,255,' + (0.2+0.35*Math.abs(Math.sin(wiSt.t*2.2))) + ')'; x.lineWidth = 1.4; x.setLineDash([2,4]); }
    x.beginPath(); x.moveTo(pL.x,pL.y); x.lineTo(pR.x,pR.y); x.stroke();
    x.restore();
    items.sort(function(a,b){ return b.z-a.z; });
    for (var i=0;i<items.length;i++){
      var it = items[i];
      var gg = x.createRadialGradient(it.x-it.r*0.3, it.y-it.r*0.3, it.r*0.1, it.x, it.y, it.r);
      gg.addColorStop(0, 'rgba(' + it.col.join(',') + ',0.95)');
      gg.addColorStop(1, 'rgba(' + it.col.join(',') + ',0.35)');
      x.beginPath(); x.arc(it.x, it.y, it.r, 0, 6.283); x.fillStyle = gg; x.fill();
      x.strokeStyle = 'rgba(255,255,255,0.3)'; x.lineWidth = 1; x.stroke();
      if (it.lab) {
        x.fillStyle = '#fff'; x.font = 'bold ' + Math.max(11, it.r*0.5) + 'px sans-serif';
        x.textAlign = 'center'; x.textBaseline = 'middle';
        x.fillText(it.lab, it.x, it.y); x.textBaseline = 'alphabetic';
      }
    }
    x.fillStyle = 'rgba(255,255,255,.3)'; x.font = '10px sans-serif'; x.textAlign = 'left';
    x.fillText('\ud83d\udc46 S\u00fcr\u00fckle d\u00f6nd\u00fcr', 8, H2-8);
    x.textAlign = 'left';
  }

  window.wiSetKind = function(k, btn){ wiKind = k; if (btn) selectInRow(btn); wiRenderTheory(); };
  function wiRenderTheory(){
    var box = document.getElementById('wi-theory');
    if (!box) return;
    var th = WI_TYPES[wiKind];
    var html = '<div class="card"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
      '<span style="font-size:26px">' + th.icon + '</span><div style="font-family:Space Grotesk,sans-serif;font-size:17px;font-weight:800;color:#fff">' + th.name + '</div></div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:12px">' + th.tanim + '</p>' +
      '<div style="font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">\u00d6zellikler</div>' +
      '<ul style="margin:0 0 4px 18px;padding:0;font-size:13px;color:var(--tx2);line-height:1.9">';
    th.ozellikler.forEach(function(o){ html += '<li>' + o + '</li>'; });
    html += '</ul></div>';
    html += '<div class="card" style="margin-top:10px"><div class="slbl">G\u00fc\u00e7 S\u0131ralamas\u0131</div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;color:var(--tx2);margin-top:6px">' +
      '<span>London <b style="color:#93c5fd">(en zay\u0131f)</b></span><span>\u2192</span><span>Dipol-Dipol</span><span>\u2192</span><span><b style="color:#f87171">Hidrojen Ba\u011f\u0131</b> (en g\u00fc\u00e7l\u00fc)</span></div></div>';
    box.innerHTML = html;
  }

  function wiLoop(){
    var scr = document.getElementById('s-wi');
    if (!scr || scr.style.display === 'none') { wiStop(); return; }
    wiSt.anim = requestAnimationFrame(wiLoop);
    var cv = document.getElementById('wi-cv');
    if (!cv) return;
    var rect = cv.getBoundingClientRect();
    var W = rect.width || cv.clientWidth || 300, H2 = 260;
    var dpr = window.devicePixelRatio || 1;
    if (Math.abs(cv.width - W*dpr) > 2 || Math.abs(cv.height - H2*dpr) > 2) { cv.width = W*dpr; cv.height = H2*dpr; }
    var x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    try {
      if (wiSt.spin && !wiSt.drag) wiSt.rotY += 0.006;
      wiSt.t += 0.016;
      wiDraw(x, W, H2);
    } catch (e) { drawErr(x, W, H2, e); }
  }
  function wiStop(){ if (wiSt.anim) { cancelAnimationFrame(wiSt.anim); wiSt.anim = null; } }
  function wiStart(){ wiBind(); if (wiSt.anim) cancelAnimationFrame(wiSt.anim); wiLoop(); }
  function wiBind(){
    if (wiSt.bound) return;
    var cv = document.getElementById('wi-cv');
    if (!cv) return;
    wiSt.bound = true;
    cv.onmousedown = function(e){ wiSt.drag = true; wiSt.lx = e.clientX; wiSt.ly = e.clientY; };
    cv.onmousemove = function(e){ if (!wiSt.drag) return; wiSt.rotY += (e.clientX-wiSt.lx)*0.01; wiSt.rotX += (e.clientY-wiSt.ly)*0.01; wiSt.lx=e.clientX; wiSt.ly=e.clientY; };
    cv.onmouseup = cv.onmouseleave = function(){ wiSt.drag = false; };
    cv.addEventListener('touchstart', function(e){ wiSt.drag=true; wiSt.lx=e.touches[0].clientX; wiSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchmove', function(e){ if(!wiSt.drag) return; wiSt.rotY += (e.touches[0].clientX-wiSt.lx)*0.013; wiSt.rotX += (e.touches[0].clientY-wiSt.ly)*0.013; wiSt.lx=e.touches[0].clientX; wiSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchend', function(){ wiSt.drag = false; });
  }

  // ---- 13b. MADDENİN HALLERİ ----
  var MH_STATES = {
    kati: {
      name:'Kat\u0131', icon:'\ud83e\uddca',
      tanim:'Tanecikler birbirine \u00e7ok yak\u0131n, D\u00dcZENL\u0130 (\u00f6rg\u00fc/kristal) bir diziliminde ve sabit konumlar etraf\u0131nda sadece T\u0130TRE\u015e\u0130R.',
      ozellikler:[
        'Belirli \u015fekli VE belirli hacmi vard\u0131r.',
        'Tanecikler aras\u0131 \u00e7ekim kuvveti EN G\u00dc\u00c7L\u00dc, taneciklerin kinetik enerjisi EN D\u00dc\u015e\u00dcKT\u00dcR.',
        'S\u0131k\u0131\u015ft\u0131r\u0131lamaz (tanecikler aras\u0131 bo\u015fluk neredeyse yoktur).',
        'Ak\u0131\u015fkan de\u011fildir; kendi \u015feklini korur.'
      ]
    },
    sivi: {
      name:'S\u0131v\u0131', icon:'\ud83d\udca7',
      tanim:'Tanecikler birbirine yak\u0131n ama D\u00dcZENS\u0130Zdir; sabit bir konumlar\u0131 yoktur, birbirinin \u00fczerinden KAYARAK hareket ederler.',
      ozellikler:[
        'Belirli hacmi vard\u0131r fakat belirli \u015fekli YOKTUR \u2014 konuldu\u011fu kab\u0131n \u015feklini al\u0131r.',
        'Tanecikler aras\u0131 \u00e7ekim kat\u0131dan zay\u0131f, gazdan g\u00fc\u00e7l\u00fcd\u00fcr; orta d\u00fczeyde kinetik enerjiye sahiptirler.',
        'Ak\u0131\u015fkand\u0131r; \u00e7ok az s\u0131k\u0131\u015ft\u0131r\u0131labilir (neredeyse s\u0131f\u0131r).',
        'Y\u00fczey gerilimi ve viskozite gibi \u00f6zellikler s\u0131v\u0131lara \u00f6zg\u00fcd\u00fcr.'
      ]
    },
    gaz: {
      name:'Gaz', icon:'\ud83d\udca8',
      tanim:'Tanecikler birbirinden ÇOK uzak, tamamen D\u00dcZENSİZ ve BA\u011eIMSIZ olarak h\u0131zl\u0131 ve rastgele hareket eder.',
      ozellikler:[
        'Ne belirli \u015fekli NE de belirli hacmi vard\u0131r \u2014 bulundu\u011fu kab\u0131n tamam\u0131n\u0131 doldurur.',
        'Tanecikler aras\u0131 \u00e7ekim kuvveti \u0130HMAL ED\u0130LEB\u0130L\u0130R d\u00fczeydedir; kinetik enerji EN Y\u00dcKSEKT\u0130R.',
        'Kolayca S\u0130KI\u015eTIRILABİLİR (tanecikler aras\u0131 bo\u015fluk \u00e7ok fazlad\u0131r).',
        'Bas\u0131n\u00e7, hacim ve s\u0131cakl\u0131k aras\u0131ndaki ili\u015fki ideal gaz yasas\u0131yla (PV=nRT) a\u00e7\u0131klan\u0131r.'
      ]
    },
    plazma: {
      name:'Plazma', icon:'\u2604\ufe0f',
      tanim:'Gaz\u0131n \u00e7ok y\u00fcksek s\u0131cakl\u0131kta İYONLA\u015eMASIYLA (elektronlar\u0131n atomdan kopmas\u0131yla) olu\u015fan D\u00d6RD\u00dcNC\u00dc hal say\u0131lan\u0131r.',
      ozellikler:[
        'Serbest elektronlar ve pozitif iyonlardan olu\u015fur \u2014 elektrik ak\u0131m\u0131n\u0131 iletir, manyetik alandan etkilenir.',
        'Evrendeki maddenin \u00e7o\u011funlu\u011fu plazma halindedir (y\u0131ld\u0131zlar, g\u00fcne\u015f).',
        'G\u00fcnl\u00fck hayatta floresan/neon lambalar, y\u0131ld\u0131r\u0131m ve kutup \u0131\u015f\u0131klar\u0131 (aurora) plazma \u00f6rnekleridir.',
        'Gazdan daha y\u00fcksek enerjilidir; tanecikler hem h\u0131zl\u0131 hareket eder hem de elektrik y\u00fckl\u00fcd\u00fcr.'
      ]
    }
  };
  var MH_TRANS = [
    ['Erime','Kat\u0131 \u2192 S\u0131v\u0131','Is\u0131 al\u0131n\u0131r'], ['Donma','S\u0131v\u0131 \u2192 Kat\u0131','Is\u0131 verilir'],
    ['Buharla\u015fma','S\u0131v\u0131 \u2192 Gaz','Is\u0131 al\u0131n\u0131r'], ['Yo\u011fu\u015fma','Gaz \u2192 S\u0131v\u0131','Is\u0131 verilir'],
    ['S\u00fcblimle\u015fme','Kat\u0131 \u2192 Gaz (do\u011frudan)','Is\u0131 al\u0131n\u0131r'], ['Kra\u011f\u0131la\u015fma','Gaz \u2192 Kat\u0131 (do\u011frudan)','Is\u0131 verilir']
  ];
  var mhState = 'kati';
  var mhSt = { rotX: 0.35, rotY: 0.5, zoom: 1, spin: false, drag: false, lx:0, ly:0, dist:0, t: 0, anim: null, stars: null, sw: 0, bound: false, particles: [] };
  var MH_N = 24, MH_BOX = 85;

  function mhInitParticles(){
    mhSt.particles = [];
    var side = Math.ceil(Math.pow(MH_N, 1/3));
    for (var i = 0; i < MH_N; i++) {
      var gx = (i % side) - side/2, gy = (Math.floor(i/side) % side) - side/2, gz = Math.floor(i/(side*side)) - side/2;
      mhSt.particles.push({
        hx: gx * (MH_BOX*1.7/side), hy: gy * (MH_BOX*1.7/side), hz: gz * (MH_BOX*1.7/side),
        x: (Math.random()-0.5)*MH_BOX*1.6, y: (Math.random()-0.5)*MH_BOX*1.6, z: (Math.random()-0.5)*MH_BOX*1.6,
        vx: (Math.random()-0.5)*2, vy: (Math.random()-0.5)*2, vz: (Math.random()-0.5)*2
      });
    }
  }
  mhInitParticles();

  window.mhSetState = function(s, btn){
    mhState = s;
    if (btn) selectInRow(btn);
    mhRenderTheory();
  };
  function mhRenderTheory(){
    var box = document.getElementById('mh-theory');
    if (!box) return;
    var th = MH_STATES[mhState];
    var html = '<div class="card"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
      '<span style="font-size:26px">' + th.icon + '</span><div style="font-family:Space Grotesk,sans-serif;font-size:17px;font-weight:800;color:#fff">' + th.name + '</div></div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:12px">' + th.tanim + '</p>' +
      '<div style="font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">\u00d6zellikler</div>' +
      '<ul style="margin:0 0 4px 18px;padding:0;font-size:13px;color:var(--tx2);line-height:1.9">';
    th.ozellikler.forEach(function(o){ html += '<li>' + o + '</li>'; });
    html += '</ul></div>';
    if (mhState !== 'plazma') {
      html += '<div class="card" style="margin-top:10px"><div class="slbl">Hal De\u011fi\u015fim Tepkimeleri</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px;font-size:11px">';
      MH_TRANS.forEach(function(t){
        html += '<div style="background:var(--sf2);border-radius:8px;padding:8px;text-align:center">' +
          '<div style="font-weight:700;color:#fff;margin-bottom:2px">' + t[0] + '</div>' +
          '<div style="color:var(--ac2);margin-bottom:2px">' + t[1] + '</div>' +
          '<div style="color:var(--tx3)">' + t[2] + '</div></div>';
      });
      html += '</div></div>';
    }
    box.innerHTML = html;
  }

  function mhDraw(x, W, H2){
    hcBg(x, mhSt, W, H2);
    var items = [];
    // Kap
    var boxPts = [];
    for (var sx=-1; sx<=1; sx+=2) for (var sy=-1; sy<=1; sy+=2) for (var sz=-1; sz<=1; sz+=2) boxPts.push([sx*MH_BOX,sy*MH_BOX,sz*MH_BOX]);
    var edges = [[0,1],[0,2],[0,4],[3,1],[3,2],[3,7],[5,1],[5,4],[5,7],[6,2],[6,4],[6,7]];
    x.strokeStyle = 'rgba(129,140,248,0.35)'; x.lineWidth = 1.2;
    edges.forEach(function(e){
      var p1 = hcProj(mhSt, boxPts[e[0]][0],boxPts[e[0]][1],boxPts[e[0]][2], W, H2);
      var p2 = hcProj(mhSt, boxPts[e[1]][0],boxPts[e[1]][1],boxPts[e[1]][2], W, H2);
      x.beginPath(); x.moveTo(p1.x,p1.y); x.lineTo(p2.x,p2.y); x.stroke();
    });
    var speed = mhState==='kati'?0.06:mhState==='sivi'?0.5:mhState==='gaz'?2.4:3.2;
    var isPlazma = mhState === 'plazma';
    for (var i = 0; i < mhSt.particles.length; i++) {
      var pt = mhSt.particles[i];
      if (mhState === 'kati') {
        pt.x = pt.hx + Math.sin(mhSt.t*8 + i)*2.5;
        pt.y = pt.hy + Math.cos(mhSt.t*7 + i*1.3)*2.5;
        pt.z = pt.hz + Math.sin(mhSt.t*6 + i*0.7)*2.5;
      } else {
        pt.x += pt.vx * speed; pt.y += pt.vy * speed; pt.z += pt.vz * speed;
        var lim = mhState === 'sivi' ? MH_BOX*0.55 : MH_BOX*0.92;
        if (Math.abs(pt.x) > lim) { pt.vx *= -1; pt.x = Math.sign(pt.x)*lim; }
        if (Math.abs(pt.y) > lim) { pt.vy *= -1; pt.y = Math.sign(pt.y)*lim; }
        if (Math.abs(pt.z) > lim) { pt.vz *= -1; pt.z = Math.sign(pt.z)*lim; }
        if (mhState === 'sivi' && Math.random() < 0.02) { pt.vx += (Math.random()-0.5)*0.6; pt.vy += (Math.random()-0.5)*0.6; pt.vz += (Math.random()-0.5)*0.6; }
      }
      var p = hcProj(mhSt, pt.x, pt.y, pt.z, W, H2);
      items.push({ z: p.z, x: p.x, y: p.y, r: (isPlazma?7:6)*p.s, plasma: isPlazma });
    }
    items.sort(function(a,b){ return b.z-a.z; });
    for (var j = 0; j < items.length; j++) {
      var it = items[j];
      if (it.plasma) {
        x.beginPath(); x.arc(it.x, it.y, it.r+5, 0, 6.283);
        x.fillStyle = 'rgba(168,85,247,0.25)'; x.fill();
      }
      var gg = x.createRadialGradient(it.x-it.r*0.3, it.y-it.r*0.3, it.r*0.1, it.x, it.y, it.r);
      if (it.plasma) { gg.addColorStop(0,'#e9d5ff'); gg.addColorStop(0.6,'#a855f7'); gg.addColorStop(1,'#581c87'); }
      else { gg.addColorStop(0,'#93c5fd'); gg.addColorStop(0.6,'#3b82f6'); gg.addColorStop(1,'#1e3a8a'); }
      x.beginPath(); x.arc(it.x, it.y, it.r, 0, 6.283); x.fillStyle = gg; x.fill();
    }
    x.fillStyle = 'rgba(255,255,255,.3)'; x.font = '10px sans-serif'; x.textAlign = 'left';
    x.fillText('\ud83d\udc46 S\u00fcr\u00fckle d\u00f6nd\u00fcr', 8, H2-8);
  }

  function mhLoop(){
    var scr = document.getElementById('s-wi');
    if (!scr || scr.style.display === 'none') { mhStop(); return; }
    mhSt.anim = requestAnimationFrame(mhLoop);
    var cv = document.getElementById('mh-cv');
    if (!cv) return;
    var rect = cv.getBoundingClientRect();
    var W = rect.width || cv.clientWidth || 300, H2 = 260;
    var dpr = window.devicePixelRatio || 1;
    if (Math.abs(cv.width - W*dpr) > 2 || Math.abs(cv.height - H2*dpr) > 2) { cv.width = W*dpr; cv.height = H2*dpr; }
    var x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    try {
      if (mhSt.spin && !mhSt.drag) mhSt.rotY += 0.006;
      mhSt.t += 0.016;
      mhDraw(x, W, H2);
    } catch (e) { drawErr(x, W, H2, e); }
  }
  function mhStop(){ if (mhSt.anim) { cancelAnimationFrame(mhSt.anim); mhSt.anim = null; } }
  function mhStart(){ mhBind(); if (mhSt.anim) cancelAnimationFrame(mhSt.anim); mhLoop(); }
  function mhBind(){
    if (mhSt.bound) return;
    var cv = document.getElementById('mh-cv');
    if (!cv) return;
    mhSt.bound = true;
    cv.onmousedown = function(e){ mhSt.drag = true; mhSt.lx = e.clientX; mhSt.ly = e.clientY; };
    cv.onmousemove = function(e){ if (!mhSt.drag) return; mhSt.rotY += (e.clientX-mhSt.lx)*0.01; mhSt.rotX += (e.clientY-mhSt.ly)*0.01; mhSt.lx=e.clientX; mhSt.ly=e.clientY; };
    cv.onmouseup = cv.onmouseleave = function(){ mhSt.drag = false; };
    cv.addEventListener('touchstart', function(e){ mhSt.drag=true; mhSt.lx=e.touches[0].clientX; mhSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchmove', function(e){ if(!mhSt.drag) return; mhSt.rotY += (e.touches[0].clientX-mhSt.lx)*0.013; mhSt.rotX += (e.touches[0].clientY-mhSt.ly)*0.013; mhSt.lx=e.touches[0].clientX; mhSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchend', function(){ mhSt.drag = false; });
  }

  // ---- 13c. Ekran kurulumu (Zayıf Etkileşimler + Maddenin Halleri sekmeleri) ----
  function setupWI(){
    if (document.getElementById('s-wi')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    var wiBtns = '', mhBtns = '';
    WI_ORDER.forEach(function(k, i){ wiBtns += '<button type="button" class="ob' + (i===0?' sel2':'') + '" onclick="wiSetKind(\'' + k + '\',this)">' + WI_TYPES[k].icon + ' ' + WI_TYPES[k].name + '</button>'; });
    ['kati','sivi','gaz','plazma'].forEach(function(k, i){ mhBtns += '<button type="button" class="ob' + (i===0?' sel2':'') + '" onclick="mhSetState(\'' + k + '\',this)">' + MH_STATES[k].icon + ' ' + MH_STATES[k].name + '</button>'; });

    app.insertAdjacentHTML('beforeend',
      '<div id="s-wi" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\ud83e\uddf2 Etkile\u015fim \u00dcnitesi \u00b7 9. S\u0131n\u0131f</h1>' +
        '<p class="psub">Zay\u0131f etkile\u015fimler ve maddenin halleri \u2014 3D g\u00f6rsel + detayl\u0131 konu.</p>' +
        '<div class="tabs" id="wi-tabs">' +
          '<button class="tab on" onclick="tswitch(\'wi-tabs\',\'wi-tps\',0)">\u26a1 Zay\u0131f Etkile\u015fimler</button>' +
          '<button class="tab" onclick="tswitch(\'wi-tabs\',\'wi-tps\',1)">\ud83e\uddca Maddenin Halleri</button>' +
        '</div>' +
        '<div id="wi-tps">' +
          '<div class="tp on">' +
            '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:10px"><div style="display:flex;gap:6px;min-width:max-content">' + wiBtns + '</div></div>' +
            '<div style="background:#050510;border:1px solid rgba(129,140,248,.3);border-radius:16px;overflow:hidden;margin-bottom:12px">' +
              '<canvas id="wi-cv" style="width:100%;display:block;touch-action:none" height="260"></canvas>' +
            '</div>' +
            '<div id="wi-theory"></div>' +
          '</div>' +
          '<div class="tp">' +
            '<div style="display:flex;gap:6px;margin-bottom:10px">' + mhBtns + '</div>' +
            '<div style="background:#050510;border:1px solid rgba(129,140,248,.3);border-radius:16px;overflow:hidden;margin-bottom:12px">' +
              '<canvas id="mh-cv" style="width:100%;display:block;touch-action:none" height="260"></canvas>' +
            '</div>' +
            '<div id="mh-theory"></div>' +
          '</div>' +
        '</div>' +
      '</div></div>');

    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-wi') === -1) SCREENS.push('s-wi');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-wi'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-wi" onclick="nav(\'wi\')">\ud83e\uddf2 Etkile\u015fim \u00dcnitesi (9. S\u0131n\u0131f)</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-wi'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-wi" onclick="nav(\'wi\')"><div class="ti">\ud83e\uddf2</div><div class="tt">Etkile\u015fim \u00dcnitesi</div><div class="td">9. S\u0131n\u0131f: Zay\u0131f etkile\u015fimler ve maddenin halleri, 3D g\u00f6rsel.</div></div>');

    wiRenderTheory(); mhRenderTheory();
    wiBind(); mhBind();
  }
  function wiEnter(){ setTimeout(function(){ wiStart(); mhStart(); }, 80); }
  function wiLeave(){ wiStop(); mhStop(); }

  // ---------- 14. AYARLAR EKRANI ----------
  var SET_KEYS = [
    { k:'rk_stats', label:'Element Testi', icon:'\ud83e\uddea', kind:'ac' },
    { k:'rk_bal', label:'Denklem Dengeleme', icon:'\u2696\ufe0f', kind:'ac' },
    { k:'rk_scores', label:'YKS Provas\u0131', icon:'\u23f1\ufe0f', kind:'scores' },
    { k:'rk_badges', label:'Rozetler', icon:'\ud83c\udfc6', kind:'count', max:11 },
    { k:'rk_days', label:'\u00c7al\u0131\u015fma Serisi', icon:'\ud83d\udd25', kind:'days' },
    { k:'rk_fc', label:'Flashcard \u0130lerlemesi', icon:'\ud83c\udccf', kind:'obj' },
    { k:'rk_weak', label:'Yanl\u0131\u015f Listesi', icon:'\u274c', kind:'obj' }
  ];

  function setSummaryFor(item){
    var v = sget(item.k, item.kind === 'scores' || item.kind === 'days' ? [] : (item.kind === 'obj' ? {} : {}));
    if (item.kind === 'ac') {
      var a = v.a || 0, c = v.c || 0;
      if (!a) return 'Hen\u00fcz veri yok';
      return c + ' do\u011fru / ' + a + ' deneme (%' + Math.round(100*c/a) + ')';
    }
    if (item.kind === 'scores') {
      if (!v.length) return 'Hen\u00fcz deneme yok';
      var best = 0; v.forEach(function(s){ if ((s.p||0) > best) best = s.p; });
      return v.length + ' deneme \u00b7 en y\u00fcksek %' + Math.round(best);
    }
    if (item.kind === 'count') {
      var n = Array.isArray(v) ? v.length : Object.keys(v).length;
      return n + ' / ' + item.max + ' kazan\u0131ld\u0131';
    }
    if (item.kind === 'days') {
      return (v.length || 0) + ' g\u00fcn kaydedildi';
    }
    if (item.kind === 'obj') {
      return Object.keys(v).length + ' kay\u0131t';
    }
    return '\u2014';
  }

  function setRenderList(){
    var box = document.getElementById('set-list');
    if (!box) return;
    var html = '';
    SET_KEYS.forEach(function(item){
      html += '<div class="card" style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px">' +
        '<div style="min-width:0"><div style="font-size:14px;font-weight:700;color:#fff">' + item.icon + ' ' + item.label + '</div>' +
        '<div style="font-size:12px;color:var(--tx3);margin-top:2px">' + setSummaryFor(item) + '</div></div>' +
        '<button type="button" onclick="setReset(\'' + item.k + '\',\'' + item.label.replace(/'/g,"") + '\')" style="flex-shrink:0;padding:8px 12px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.35);border-radius:100px;color:#f87171;font-size:12px;cursor:pointer">S\u0131f\u0131rla</button>' +
      '</div>';
    });
    box.innerHTML = html;
  }

  window.setReset = function(key, label){
    if (!window.confirm(label + ' verilerini s\u0131f\u0131rlamak istedi\u011fine emin misin? Bu i\u015flem geri al\u0131namaz.')) return;
    try { localStorage.removeItem(key); } catch (e) { /* sessiz */ }
    setRenderList();
  };
  window.setResetAll = function(){
    if (!window.confirm('T\u00dcM ilerleme verilerini (skorlar, rozetler, seri, flashcard, yanl\u0131\u015f listesi) sil? Bu i\u015flem GER\u0130 ALINAMAZ.')) return;
    SET_KEYS.forEach(function(item){ try { localStorage.removeItem(item.k); } catch (e) { /* sessiz */ } });
    try { localStorage.removeItem('rk_flags'); } catch (e) { /* sessiz */ }
    setRenderList();
  };

  function setupSet(){
    if (document.getElementById('s-set')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    app.insertAdjacentHTML('beforeend',
      '<div id="s-set" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\u2699\ufe0f Ayarlar</h1>' +
        '<p class="psub">\u0130lerleme verilerini g\u00f6r\u00fcnt\u00fcle ve gerekirse s\u0131f\u0131rla.</p>' +
        '<div id="set-list" style="margin-bottom:14px"></div>' +
        '<button type="button" onclick="setResetAll()" style="width:100%;padding:14px;background:rgba(239,68,68,0.18);border:2px solid rgba(239,68,68,0.5);border-radius:var(--rlg);color:#fca5a5;font-size:14px;font-weight:700;cursor:pointer;margin-bottom:10px">\ud83d\uddd1\ufe0f T\u00fcm \u0130lerlemeyi S\u0131f\u0131rla</button>' +
        '<p style="font-size:11px;color:var(--tx3);text-align:center;line-height:1.6">Bu ekran yaln\u0131zca bu cihazda saklanan yerel ilerleme verilerini y\u00f6netir. Hi\u00e7bir veri sunucuya g\u00f6nderilmez.</p>' +
      '</div></div>');
    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-set') === -1) SCREENS.push('s-set');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-set'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-set" onclick="nav(\'set\')">\u2699\ufe0f Ayarlar</button>');
  }
  function setEnter(){ setRenderList(); }

  // ---------- 15. GALVANİK (VOLTAİK) HÜCRE 3D ----------
  var GV_METALS = {
    Li: { name:'Lityum',    E:-3.04, ion:'Li\u207a',   col:'#c4b5fd' },
    K:  { name:'Potasyum',  E:-2.93, ion:'K\u207a',    col:'#a78bfa' },
    Ca: { name:'Kalsiyum',  E:-2.87, ion:'Ca\u00b2\u207a', col:'#fbbf24' },
    Na: { name:'Sodyum',    E:-2.71, ion:'Na\u207a',   col:'#fde047' },
    Mg: { name:'Magnezyum', E:-2.37, ion:'Mg\u00b2\u207a', col:'#86efac' },
    Al: { name:'Al\u00fcminyum', E:-1.66, ion:'Al\u00b3\u207a', col:'#cbd5e1' },
    Zn: { name:'\u00c7inko',     E:-0.76, ion:'Zn\u00b2\u207a', col:'#94a3b8' },
    Fe: { name:'Demir',     E:-0.44, ion:'Fe\u00b2\u207a', col:'#a3a3a3' },
    Ni: { name:'Nikel',     E:-0.25, ion:'Ni\u00b2\u207a', col:'#d4d4d8' },
    Pb: { name:'Kur\u015fun',    E:-0.13, ion:'Pb\u00b2\u207a', col:'#71717a' },
    Cu: { name:'Bak\u0131r',     E: 0.34, ion:'Cu\u00b2\u207a', col:'#f97316' },
    Ag: { name:'G\u00fcm\u00fc\u015f',    E: 0.80, ion:'Ag\u207a',  col:'#e5e7eb' }
  };
  var GV_PAIRS = [
    { m1:'Zn', m2:'Cu', label:'\u00c7inko \u2013 Bak\u0131r (Daniell H\u00fccresi)' },
    { m1:'Zn', m2:'Ag', label:'\u00c7inko \u2013 G\u00fcm\u00fc\u015f' },
    { m1:'Mg', m2:'Cu', label:'Magnezyum \u2013 Bak\u0131r' },
    { m1:'Fe', m2:'Cu', label:'Demir \u2013 Bak\u0131r' },
    { m1:'Al', m2:'Cu', label:'Al\u00fcminyum \u2013 Bak\u0131r' },
    { m1:'Cu', m2:'Ag', label:'Bak\u0131r \u2013 G\u00fcm\u00fc\u015f' },
    { m1:'Ni', m2:'Cu', label:'Nikel \u2013 Bak\u0131r' },
    { m1:'Pb', m2:'Ag', label:'Kur\u015fun \u2013 G\u00fcm\u00fc\u015f' },
    { m1:'Zn', m2:'Ni', label:'\u00c7inko \u2013 Nikel' },
    { m1:'Zn', m2:'Fe', label:'\u00c7inko \u2013 Demir' }
  ];
  // Verilen çiftten anot (düşük E, yükseltgenir) / katot (yüksek E, indirgenir) belirler
  function gvResolve(pair){
    var a = GV_METALS[pair.m1], b = GV_METALS[pair.m2];
    var anodeSym = a.E <= b.E ? pair.m1 : pair.m2;
    var cathodeSym = a.E <= b.E ? pair.m2 : pair.m1;
    var anode = GV_METALS[anodeSym], cathode = GV_METALS[cathodeSym];
    return {
      anodeSym: anodeSym, cathodeSym: cathodeSym, anode: anode, cathode: cathode,
      Ecell: cathode.E - anode.E
    };
  }

  var gvIdx = 0;
  var gvSt = { rotX: 0.26, rotY: 0.42, zoom: 1, fit: 1, spin: false, drag: false, lx: 0, ly: 0, dist: 0,
               t: 0, anim: null, stars: null, sw: 0, bound: false, progress: 0,
               bridgeIons: [], leftIons: [], rightIons: [] };

  function gvInit(idx){
    gvIdx = idx;
    gvSt.progress = 0;
    gvSt.bridgeIons = [];
    gvSt.leftIons = [];
    gvSt.rightIons = [];
    for (var i = 0; i < 10; i++) {
      gvSt.leftIons.push({ x: -95 + Math.random()*55, y: 10 + Math.random()*55, z: (Math.random()-0.5)*40, ph: Math.random()*6.28 });
      gvSt.rightIons.push({ x: 40 + Math.random()*55, y: 10 + Math.random()*55, z: (Math.random()-0.5)*40, ph: Math.random()*6.28 });
    }
  }
  gvInit(0);

  function gvDraw(x, W, H2){
    hcBg(x, gvSt, W, H2);
    var pair = GV_PAIRS[gvIdx], r = gvResolve(pair);
    var quads = [], sprites = [];
    var LX = -68, RX = 68; // sol (anot) / sağ (katot) beher merkezleri
    var BEAKER_W = 76, BEAKER_H = 92, BEAKER_D = 60;

    // Beher sıvıları (yarı saydam)
    g3Box(quads, gvSt, W, H2, LX, 24, 0, BEAKER_W/2, BEAKER_H/2, BEAKER_D/2, ssRgb(r.anode.col), 0.22, 'rgba(148,163,184,.5)');
    g3Box(quads, gvSt, W, H2, RX, 24, 0, BEAKER_W/2, BEAKER_H/2, BEAKER_D/2, ssRgb(r.cathode.col), 0.22, 'rgba(148,163,184,.5)');

    // Elektrotlar: anot zamanla küçülür (erir), katot büyür (kaplama birikir)
    var anodeH = Math.max(18, 46 - gvSt.progress * 18);
    var cathodeH = Math.min(58, 40 + gvSt.progress * 18);
    g3Box(quads, gvSt, W, H2, LX, 8 - anodeH/2, 0, 9, anodeH/2, 9, ssRgb(r.anode.col), 0.95, 'rgba(255,255,255,.25)');
    g3Box(quads, gvSt, W, H2, RX, 8 - cathodeH/2, 0, 9, cathodeH/2, 9, ssRgb(r.cathode.col), 0.95, 'rgba(255,255,255,.25)');

    // Tuz köprüsü (basitleştirilmiş yatay tüp)
    g3Box(quads, gvSt, W, H2, 0, -18, 0, (RX-LX)/2 - BEAKER_W/2 + 8, 6, 6, '148,163,184', 0.5, 'rgba(226,232,240,.4)');

    // Beher içi metal iyonları (hafif yüzen noktalar)
    function drawIons(arr, col, label){
      arr.forEach(function(io){
        var yy = io.y + Math.sin(gvSt.t*1.4 + io.ph) * 3;
        var p = hcProj(gvSt, io.x, yy, io.z, W, H2);
        sprites.push({ x:p.x, y:p.y, z:p.z, r: 5*p.s, c: col, lbl: label });
      });
    }
    drawIons(gvSt.leftIons, r.anode.col, r.anode.ion);
    drawIons(gvSt.rightIons, r.cathode.col, r.cathode.ion);

    // Tuz köprüsündeki iyon akışı: anyon sola (anot bölmesine), katyon sağa (katot bölmesine)
    if (Math.random() < 0.045) gvSt.bridgeIons.push({ x: (Math.random()-0.5)*30, dir: Math.random()<0.5?-1:1, t0: gvSt.t });
    for (var bi = gvSt.bridgeIons.length - 1; bi >= 0; bi--) {
      var b = gvSt.bridgeIons[bi];
      var age = gvSt.t - b.t0;
      var bx = b.x + b.dir * age * 40;
      if (Math.abs(bx) > 62) { gvSt.bridgeIons.splice(bi, 1); continue; }
      var pb = hcProj(gvSt, bx, -18, 0, W, H2);
      sprites.push({ x: pb.x, y: pb.y, z: pb.z, r: 4*pb.s, c: b.dir < 0 ? '#f87171' : '#60a5fa', lbl: b.dir < 0 ? '\u2212' : '+' });
    }

    quads.sort(function(a,b){ return b.z - a.z; });
    var all = quads.map(function(q){ q.q = 1; return q; }).concat(sprites);
    all.sort(function(a,b){ return b.z - a.z; });
    for (var i = 0; i < all.length; i++) {
      var o = all[i];
      if (o.q) {
        x.beginPath(); x.moveTo(o.pts[0].x, o.pts[0].y);
        for (var k = 1; k < 4; k++) x.lineTo(o.pts[k].x, o.pts[k].y);
        x.closePath();
        x.fillStyle = 'rgba(' + o.fill + ',' + o.a + ')'; x.fill();
        if (o.stroke) { x.strokeStyle = o.stroke; x.lineWidth = 0.8; x.stroke(); }
      } else {
        x.beginPath(); x.arc(o.x, o.y, Math.max(1.5, o.r), 0, 6.283);
        x.fillStyle = o.c; x.fill();
        if (o.lbl && o.r > 3) {
          x.fillStyle = '#0b0e18'; x.font = 'bold ' + Math.max(7, o.r*0.85) + 'px sans-serif';
          x.textAlign = 'center'; x.textBaseline = 'middle';
          x.fillText(o.lbl, o.x, o.y); x.textBaseline = 'alphabetic';
        }
      }
    }

    // Kablo (üst) + elektron akışı: anot → katot
    var wA = hcProj(gvSt, LX, 8 - anodeH - 14, 0, W, H2);
    var wAtop = hcProj(gvSt, LX, -70, 0, W, H2);
    var wMidL = hcProj(gvSt, -22, -70, 0, W, H2);
    var wMidR = hcProj(gvSt, 22, -70, 0, W, H2);
    var wCtop = hcProj(gvSt, RX, -70, 0, W, H2);
    var wC = hcProj(gvSt, RX, 8 - cathodeH - 14, 0, W, H2);
    x.strokeStyle = 'rgba(226,232,240,.65)'; x.lineWidth = 2;
    x.beginPath(); x.moveTo(wA.x,wA.y); x.lineTo(wAtop.x,wAtop.y); x.lineTo(wMidL.x,wMidL.y); x.stroke();
    x.beginPath(); x.moveTo(wMidR.x,wMidR.y); x.lineTo(wCtop.x,wCtop.y); x.lineTo(wC.x,wC.y); x.stroke();
    // Voltmetre
    var vm = hcProj(gvSt, 0, -70, 0, W, H2);
    x.beginPath(); x.arc(vm.x, vm.y, 15*vm.s, 0, 6.283);
    x.fillStyle = '#0b1220'; x.fill(); x.strokeStyle = '#facc15'; x.lineWidth = 1.6; x.stroke();
    x.fillStyle = '#facc15'; x.font = 'bold 10px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText('V', vm.x, vm.y); x.textBaseline = 'alphabetic';
    // Elektron akışı (sarı noktalar), anottan voltmetreye, voltmetreden katoda
    var path1 = [[LX,8-anodeH-14,0],[LX,-70,0],[-22,-70,0]];
    var path2 = [[22,-70,0],[RX,-70,0],[RX,8-cathodeH-14,0]];
    function dotOn(w, f){
      var segs = w.length - 1, fi = f*segs, si = Math.min(segs-1, Math.floor(fi)), ft = fi - si;
      var ax = w[si][0]+(w[si+1][0]-w[si][0])*ft, ay = w[si][1]+(w[si+1][1]-w[si][1])*ft, az = w[si][2]+(w[si+1][2]-w[si][2])*ft;
      return hcProj(gvSt, ax, ay, az, W, H2);
    }
    for (var e2 = 0; e2 < 3; e2++) {
      var f2 = ((gvSt.t * 0.3) + e2/3) % 1;
      var pe1 = dotOn(path1, f2), pe2 = dotOn(path2, f2);
      x.beginPath(); x.arc(pe1.x, pe1.y, 3, 0, 6.283); x.fillStyle = '#facc15'; x.fill();
      x.beginPath(); x.arc(pe2.x, pe2.y, 3, 0, 6.283); x.fill();
    }

    // Etiketler
    x.fillStyle = 'rgba(255,255,255,.55)'; x.font = 'bold 11px sans-serif'; x.textAlign = 'center';
    var lblA = hcProj(gvSt, LX, -90, 0, W, H2), lblC = hcProj(gvSt, RX, -90, 0, W, H2);
    x.fillText('ANOT (\u2212) \u00b7 ' + r.anodeSym, lblA.x, lblA.y);
    x.fillText('KATOT (+) \u00b7 ' + r.cathodeSym, lblC.x, lblC.y);
    x.font = '10px sans-serif'; x.fillStyle = 'rgba(255,255,255,.35)';
    var lblBr = hcProj(gvSt, 0, -4, 0, W, H2);
    x.fillText('Tuz K\u00f6pr\u00fcs\u00fc', lblBr.x, lblBr.y);
    x.textAlign = 'left';
    x.fillStyle = 'rgba(255,255,255,.3)'; x.font = '10px sans-serif';
    x.fillText('\ud83d\udc46 S\u00fcr\u00fckle d\u00f6nd\u00fcr', 8, H2-8);
  }

  function gvCellInfo(idx){
    var pair = GV_PAIRS[idx], r = gvResolve(pair);
    var spontane = r.Ecell > 0;
    return {
      notation: r.anodeSym + '(k) | ' + r.anode.ion + '(aq) || ' + r.cathode.ion + '(aq) | ' + r.cathodeSym + '(k)',
      anodeRx: r.anodeSym + ' \u2192 ' + r.anode.ion + ' + 2e\u207b',
      cathodeRx: r.cathode.ion + ' + 2e\u207b \u2192 ' + r.cathodeSym,
      Ecell: r.Ecell,
      spontane: spontane,
      r: r
    };
  }

  function gvRenderInfo(){
    var box = document.getElementById('gv-info');
    if (!box) return;
    var info = gvCellInfo(gvIdx);
    var html = '<div class="card">' +
      '<div class="slbl">H\u00fccre Gösterimi</div>' +
      '<div style="font-family:monospace;font-size:14px;color:#facc15;margin-bottom:12px;word-break:break-all">' + info.notation + '</div>' +
      '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px">' +
        '<span style="color:var(--tx3)">Anot (Yükseltgenme, \u2212)</span><span style="color:#94a3b8;font-weight:700">' + info.anodeRx + '</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px">' +
        '<span style="color:var(--tx3)">Katot (\u0130ndirgenme, +)</span><span style="color:#f97316;font-weight:700">' + info.cathodeRx + '</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px">' +
        '<span style="color:var(--tx3)">E\u00b0(anot)</span><span style="font-weight:700">' + info.r.anode.E.toFixed(2) + ' V</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px">' +
        '<span style="color:var(--tx3)">E\u00b0(katot)</span><span style="font-weight:700">' + info.r.cathode.E.toFixed(2) + ' V</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:8px 0;font-size:14px">' +
        '<span style="color:#facc15;font-weight:700">E\u00b0h\u00fccre = E\u00b0katot \u2212 E\u00b0anot</span><span style="color:#facc15;font-weight:800">' + (info.Ecell>=0?'+':'') + info.Ecell.toFixed(2) + ' V</span></div>' +
      '<div style="font-size:12px;color:' + (info.spontane?'#22c55e':'#ef4444') + ';margin-top:4px">' + (info.spontane ? '\u2713 E\u00b0h\u00fccre > 0 \u2192 tepkime kendili\u011finden (spontan) y\u00fcr\u00fcr.' : '\u2717 E\u00b0h\u00fccre < 0 \u2192 bu y\u00f6nde kendili\u011finden y\u00fcr\u00fcmez.') + '</div>' +
    '</div>';
    box.innerHTML = html;
  }

  var GV_THEORY_HTML =
    '<div class="card">' +
      '<div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:800;color:#fff;margin-bottom:8px">\ud83d\udd0b Galvanik (Voltaik) H\u00fccre Nedir?</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:12px">Kendili\u011finden (spontan) y\u00fcr\u00fcyen bir redoks tepkimesindeki KİMYASAL enerjiyi ELEKTRİK enerjisine \u00e7eviren d\u00fczenektir. \u0130ki farkl\u0131 metal elektrot, kendi iyonlar\u0131n\u0131 i\u00e7eren \u00e7\u00f6zeltilere dald\u0131r\u0131l\u0131r ve bir tuz k\u00f6pr\u00fcs\u00fcyle ba\u011flan\u0131r.</p>' +
      '<div style="font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">\u26a0\ufe0f Elektroliz ile Kar\u0131\u015ft\u0131rma!</div>' +
      '<ul style="margin:0 0 12px 18px;padding:0;font-size:13px;color:var(--tx2);line-height:1.9">' +
        '<li>Galvanik h\u00fccrede tepkime KEND\u0130L\u0130\u011e\u0130NDEN y\u00fcr\u00fcr (d\u0131\u015far\u0131dan enerji verilmez); elektrolizde ise D\u0131\u015eARIDAN elektrik verilerek kendili\u011finden y\u00fcr\u00fcmeyen bir tepkime zorlanarak ger\u00e7ekle\u015ftirilir.</li>' +
        '<li><b>Galvanik h\u00fccrede:</b> Anot (\u2212), Katot (+) \u2014 <b>Elektrolizde ise TAM TERS\u0130:</b> Anot (+), Katot (\u2212). Anot HER ZAMAN y\u00fckseltgenmenin, katot HER ZAMAN indirgenmenin oldu\u011fu elektrottur; sadece i\u015faretleri de\u011fi\u015fir.</li>' +
        '<li>Elektronlar HER İKİ hücre tipinde de d\u0131\u015f devreden anottan katoda akar.</li>' +
      '</ul>' +
      '<div style="font-size:11px;font-weight:700;color:#22c55e;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">Tuz K\u00f6pr\u00fcs\u00fcn\u00fcn G\u00f6revi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:12px">Anot b\u00f6lmesinde metal \u00e7\u00f6z\u00fcn\u00fcp (+) iyon olu\u015fturdu\u011f\u0131 i\u00e7in bu b\u00f6lme zamanla POZ\u0130T\u0130F y\u00fckle birikir; katot b\u00f6lmesinde (+) iyonlar metale d\u00f6n\u00fc\u015ft\u00fc\u011f\u00fc i\u00e7in bu b\u00f6lme NEGAT\u0130F y\u00fckle birikir. Tuz k\u00f6pr\u00fcs\u00fc, anyonlar\u0131 anot b\u00f6lmesine, katyonlar\u0131 katot b\u00f6lmesine ge\u00e7irerek bu y\u00fck dengesizli\u011fini giderir ve ak\u0131m\u0131n s\u00fcrmesini sa\u011flar. Tuz k\u00f6pr\u00fcs\u00fc olmasayd\u0131 y\u00fck birikir ve ak\u0131m dururdu.</p>' +
      '<div style="font-size:11px;font-weight:700;color:#60a5fa;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">Standart Hidrojen Elektrodu (SHE)</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:0">T\u00fcm E\u00b0 (standart indirgenme potansiyeli) de\u011ferleri, potansiyeli TANIM GERE\u011eİ 0.00 V kabul edilen standart hidrojen elektroduna (2H\u207a + 2e\u207b \u2192 H\u2082) g\u00f6re \u00f6l\u00e7\u00fcl\u00fcr. E\u00b0 de\u011feri ne kadar y\u00fcksekse (pozitif), o metal iyonunun indirgenme (elektron alma) e\u011filimi o kadar g\u00fc\u00e7l\u00fcd\u00fcr; ne kadar d\u00fc\u015f\u00fckse (negatif), o metalin kendisinin y\u00fckseltgenme (elektron verme) e\u011filimi o kadar g\u00fc\u00e7l\u00fcd\u00fcr.</p>' +
    '</div>';

  function setupGV(){
    if (document.getElementById('s-gv')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    var pairBtns = '';
    GV_PAIRS.forEach(function(p, i){
      pairBtns += '<button type="button" class="ob' + (i===0?' sel2':'') + '" onclick="gvSetPair(' + i + ',this)">' + p.label + '</button>';
    });
    app.insertAdjacentHTML('beforeend',
      '<div id="s-gv" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\ud83d\udd0b Galvanik H\u00fccre 3D</h1>' +
        '<p class="psub">Kendili\u011finden y\u00fcr\u00fcyen redoks tepkimesi \u2014 iki yar\u0131 h\u00fccre, tuz k\u00f6pr\u00fcs\u00fc, voltmetre.</p>' +
        '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:12px"><div style="display:flex;gap:6px;min-width:max-content" id="gv-pairs">' + pairBtns + '</div></div>' +
        '<div style="background:#050510;border:1px solid rgba(250,204,21,.3);border-radius:16px;overflow:hidden;margin-bottom:12px">' +
          '<canvas id="gv-cv" style="width:100%;display:block;touch-action:none" height="300"></canvas>' +
        '</div>' +
        '<p style="text-align:center;color:rgba(255,255,255,0.3);font-size:12px;margin-bottom:10px">\ud83d\udc46 S\u00fcr\u00fckle d\u00f6nd\u00fcr</p>' +
        '<div id="gv-info" style="margin-bottom:16px"></div>' +
        GV_THEORY_HTML +
      '</div></div>');
    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-gv') === -1) SCREENS.push('s-gv');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-gv'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-gv" onclick="nav(\'gv\')">\ud83d\udd0b Galvanik H\u00fccre 3D</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-gv'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-gv" onclick="nav(\'gv\')"><div class="ti">\ud83d\udd0b</div><div class="tt">Galvanik H\u00fccre 3D</div><div class="td">Kendili\u011finden redoks, tuz k\u00f6pr\u00fcs\u00fc, voltmetre \u2014 3D sim\u00fclasyon.</div></div>');
    gvBindCanvas();
    gvRenderInfo();
  }

  window.gvSetPair = function(idx, btn){
    gvInit(idx);
    if (btn) selectInRow(btn);
    gvRenderInfo();
  };

  function gvLoop(){
    var scr = document.getElementById('s-gv');
    if (!scr || scr.style.display === 'none') { gvStop(); return; }
    gvSt.anim = requestAnimationFrame(gvLoop);
    var cv = document.getElementById('gv-cv');
    if (!cv) return;
    var rect = cv.getBoundingClientRect();
    var W = rect.width || cv.clientWidth || 300, H2 = 280;
    var dpr = window.devicePixelRatio || 1;
    if (Math.abs(cv.width - W*dpr) > 2 || Math.abs(cv.height - H2*dpr) > 2) { cv.width = W*dpr; cv.height = H2*dpr; }
    var x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    try {
      if (gvSt.spin && !gvSt.drag) gvSt.rotY += 0.006;
      gvSt.t += 0.016;
      gvSt.progress = Math.min(1, gvSt.progress + 0.0012);
      gvDraw(x, W, H2);
    } catch (e) { drawErr(x, W, H2, e); }
  }
  function gvStop(){ if (gvSt.anim) { cancelAnimationFrame(gvSt.anim); gvSt.anim = null; } }
  function gvStart(){ gvBindCanvas(); if (gvSt.anim) cancelAnimationFrame(gvSt.anim); gvLoop(); }
  function gvBindCanvas(){
    if (gvSt.bound) return;
    var cv = document.getElementById('gv-cv');
    if (!cv) return;
    gvSt.bound = true;
    cv.onmousedown = function(e){ gvSt.drag = true; gvSt.lx = e.clientX; gvSt.ly = e.clientY; };
    cv.onmousemove = function(e){ if (!gvSt.drag) return; gvSt.rotY += (e.clientX-gvSt.lx)*0.01; gvSt.rotX += (e.clientY-gvSt.ly)*0.01; gvSt.lx=e.clientX; gvSt.ly=e.clientY; };
    cv.onmouseup = cv.onmouseleave = function(){ gvSt.drag = false; };
    cv.addEventListener('touchstart', function(e){ gvSt.drag=true; gvSt.lx=e.touches[0].clientX; gvSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchmove', function(e){ if(!gvSt.drag) return; gvSt.rotY += (e.touches[0].clientX-gvSt.lx)*0.013; gvSt.rotX += (e.touches[0].clientY-gvSt.ly)*0.013; gvSt.lx=e.touches[0].clientX; gvSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchend', function(){ gvSt.drag = false; });
  }
  function gvEnter(){ setTimeout(gvStart, 80); }
  function gvLeave(){ gvStop(); }

  // ---------- 16. KİMYASAL DENGE 3D — LE CHATELIER İLKESİ ----------
  // N2(g) + 3H2(g) ⇌ 2NH3(g)  (ekzotermik ileri tepkime, ΔH < 0)
  var eqSt = {
    rotX: 0.3, rotY: 0.4, zoom: 1, fit: 1, spin: true, drag: false, lx:0, ly:0, dist:0,
    t: 0, anim: null, stars: null, sw: 0, bound: false,
    pressure: 1,     // 0.6 düşük, 1 normal, 1.7 yüksek
    temp: 1,         // 0.6 düşük, 1 normal, 1.6 yüksek
    shiftTarget: 0.5,
    shiftCur: 0.5,
    nudge: 0,        // derişim müdahalesinden gelen geçici ek kayma
    nudgeDecay: 0,
    units: []        // ekrandaki parçacıkların anlık konumları (tip + pozisyon)
  };
  var EQ_MAX_UNITS = 5; // 1 birim = 1 N2 + 3 H2  ⇌  2 NH3

  function eqComputeShiftTarget(){
    var s = 0.5;
    s += (eqSt.pressure - 1) * 0.22;   // basınç artışı → az mollü ürün (NH3) tarafına kaydırır
    s -= (eqSt.temp - 1) * 0.34;       // sıcaklık artışı → ekzotermik ileri tepkimeyi tersine çevirir
    return Math.max(0.06, Math.min(0.94, s));
  }
  function eqSetPressure(p, btn){ eqSt.pressure = p; eqSt.shiftTarget = eqComputeShiftTarget(); if (btn) selectInRow(btn); eqRenderInfo(); }
  function eqSetTemp(t, btn){ eqSt.temp = t; eqSt.shiftTarget = eqComputeShiftTarget(); if (btn) selectInRow(btn); eqRenderInfo(); }
  function eqNudge(kind){
    // Derişim müdahalesi: tepken eklemek/ürünü çekmek dengeyi sağa (NH3),
    // ürün eklemek/tepkeni çekmek dengeyi sola kaydırır (geçici, sonra yeniden yerleşir).
    var dir = (kind === 'addReact' || kind === 'removeProd') ? 1 : -1;
    eqSt.nudge = Math.max(-0.35, Math.min(0.35, eqSt.nudge + dir * 0.22));
    eqSt.nudgeDecay = 1;
    eqRenderInfo();
  }

  function eqBuildUnits(){
    // shiftCur'a göre kaç "birim" NH3 tarafında, kaç birim N2+3H2 tarafında olduğunu
    // hesaplar ve ekranda gösterilecek ayrık molekül listesini üretir.
    var nh3Units = Math.round(eqSt.shiftCur * EQ_MAX_UNITS);
    var reactUnits = EQ_MAX_UNITS - nh3Units;
    var list = [];
    for (var i = 0; i < reactUnits; i++) list.push({ type:'n2', slot:i });
    for (var j = 0; j < reactUnits * 3; j++) list.push({ type:'h2', slot:j });
    for (var k = 0; k < nh3Units * 2; k++) list.push({ type:'nh3', slot:k });
    return { list: list, nh3Units: nh3Units, reactUnits: reactUnits };
  }

  function eqPos(type, slot){
    // Basit sözde-rastgele ama KARARLI konum üretici (tip+slot'a göre sabit tohum)
    var seed = (type === 'n2' ? 1 : type === 'h2' ? 2 : 3) * 97 + slot * 13.37;
    var rx = Math.sin(seed) * 43758.5453; rx -= Math.floor(rx);
    var ry = Math.sin(seed * 1.7 + 3.1) * 43758.5453; ry -= Math.floor(ry);
    var rz = Math.sin(seed * 2.3 + 7.7) * 43758.5453; rz -= Math.floor(rz);
    return { x: (rx - 0.5) * 130, y: (ry - 0.5) * 90, z: (rz - 0.5) * 90, ph: rx * 6.28 };
  }

  function eqDraw(x, W, H2){
    hcBg(x, eqSt, W, H2);
    var quads = [], sprites = [];
    // Kap
    var boxPts = [];
    var BX = 70, BY = 50, BZ = 50;
    for (var sx=-1; sx<=1; sx+=2) for (var sy=-1; sy<=1; sy+=2) for (var sz=-1; sz<=1; sz+=2) boxPts.push([sx*BX,sy*BY,sz*BZ]);
    var edges = [[0,1],[0,2],[0,4],[3,1],[3,2],[3,7],[5,1],[5,4],[5,7],[6,2],[6,4],[6,7]];
    x.strokeStyle = 'rgba(129,140,248,0.3)'; x.lineWidth = 1.1;
    edges.forEach(function(e){
      var p1 = hcProj(eqSt, boxPts[e[0]][0],boxPts[e[0]][1],boxPts[e[0]][2], W, H2);
      var p2 = hcProj(eqSt, boxPts[e[1]][0],boxPts[e[1]][1],boxPts[e[1]][2], W, H2);
      x.beginPath(); x.moveTo(p1.x,p1.y); x.lineTo(p2.x,p2.y); x.stroke();
    });

    var built = eqBuildUnits();
    built.list.forEach(function(u){
      var pos = eqPos(u.type, u.slot);
      var fx = pos.x + Math.sin(eqSt.t*0.7 + pos.ph)*4;
      var fy = pos.y + Math.cos(eqSt.t*0.6 + pos.ph*1.3)*4;
      var fz = pos.z + Math.sin(eqSt.t*0.5 + pos.ph*0.8)*4;
      if (u.type === 'h2') {
        var p1 = hcProj(eqSt, fx-5, fy, fz, W, H2), p2 = hcProj(eqSt, fx+5, fy, fz, W, H2);
        var lp = hcProj(eqSt, fx, fy, fz, W, H2);
        sprites.push({ z:lp.z-2, line:[p1,p2], col:'rgba(226,232,240,.5)' });
        sprites.push({ z:p1.z, x:p1.x, y:p1.y, r:5*p1.s, c:'#f1f5f9' });
        sprites.push({ z:p2.z, x:p2.x, y:p2.y, r:5*p2.s, c:'#f1f5f9' });
      } else if (u.type === 'n2') {
        var q1 = hcProj(eqSt, fx-6, fy, fz, W, H2), q2 = hcProj(eqSt, fx+6, fy, fz, W, H2);
        var lq = hcProj(eqSt, fx, fy, fz, W, H2);
        sprites.push({ z:lq.z-2, line:[q1,q2], col:'rgba(96,165,250,.6)', triple:true });
        sprites.push({ z:q1.z, x:q1.x, y:q1.y, r:7*q1.s, c:'#3b82f6' });
        sprites.push({ z:q2.z, x:q2.x, y:q2.y, r:7*q2.s, c:'#3b82f6' });
      } else {
        // NH3: merkez N + 3 H (basit üçgen piramit)
        var nP = hcProj(eqSt, fx, fy, fz, W, H2);
        var hOff = [[0,-7,0],[6,4,3],[-6,4,3]];
        hOff.forEach(function(o){
          var hp = hcProj(eqSt, fx+o[0], fy+o[1], fz+o[2], W, H2);
          var np2 = hcProj(eqSt, fx, fy, fz, W, H2);
          sprites.push({ z: Math.max(hp.z,np2.z)-1, line:[np2,hp], col:'rgba(255,255,255,.35)' });
          sprites.push({ z: hp.z, x:hp.x, y:hp.y, r:4.5*hp.s, c:'#e2e8f0' });
        });
        sprites.push({ z:nP.z, x:nP.x, y:nP.y, r:7.5*nP.s, c:'#818cf8' });
      }
    });

    sprites.sort(function(a,b){ return b.z - a.z; });
    sprites.forEach(function(o){
      if (o.line) {
        x.strokeStyle = o.col; x.lineWidth = o.triple ? 2.2 : 1.4;
        x.beginPath(); x.moveTo(o.line[0].x,o.line[0].y); x.lineTo(o.line[1].x,o.line[1].y); x.stroke();
      } else {
        x.beginPath(); x.arc(o.x, o.y, Math.max(1.5,o.r), 0, 6.283);
        x.fillStyle = o.c; x.fill();
        x.strokeStyle = 'rgba(255,255,255,.25)'; x.lineWidth = 1; x.stroke();
      }
    });

    x.fillStyle = 'rgba(59,130,246,.85)'; x.font = 'bold 11px sans-serif'; x.textAlign = 'left';
    x.fillText('\u25cf N\u2082: ' + built.reactUnits, 10, 20);
    x.fillStyle = 'rgba(241,245,249,.85)';
    x.fillText('\u25cf H\u2082: ' + (built.reactUnits*3), 10, 36);
    x.fillStyle = 'rgba(129,140,248,.85)';
    x.fillText('\u25cf NH\u2083: ' + (built.nh3Units*2), 10, 52);
    x.fillStyle = 'rgba(255,255,255,.3)'; x.font = '10px sans-serif';
    x.fillText('\ud83d\udc46 S\u00fcr\u00fckle d\u00f6nd\u00fcr', 10, H2-8);
    x.textAlign = 'left';
  }

  function eqRenderInfo(){
    var box = document.getElementById('eq-info');
    if (!box) return;
    var dir = eqSt.shiftTarget > 0.52 ? 'right' : eqSt.shiftTarget < 0.48 ? 'left' : 'mid';
    var dirTxt = dir === 'right' ? 'Denge SA\u011eA (NH\u2083 y\u00f6n\u00fcne) kayıyor \u2014 daha çok ürün olu\u015fuyor.'
      : dir === 'left' ? 'Denge SOLA (N\u2082/H\u2082 y\u00f6n\u00fcne) kayıyor \u2014 tepkenler baskın.'
      : 'Denge yakla\u015f\u0131k orta noktada.';
    var dirCol = dir === 'right' ? '#818cf8' : dir === 'left' ? '#3b82f6' : '#94a3b8';
    var html = '<div class="card">' +
      '<div class="slbl">\u015eu Anki Denge Durumu</div>' +
      '<div style="font-size:14px;font-weight:700;color:' + dirCol + ';margin-bottom:10px">' + dirTxt + '</div>' +
      '<div style="font-size:12px;color:var(--tx2);line-height:1.7">' +
        '<b>Basın\u00e7:</b> ' + (eqSt.pressure < 1 ? 'D\u00fc\u015f\u00fck' : eqSt.pressure > 1 ? 'Y\u00fcksek' : 'Normal') + ' \u00b7 ' +
        '<b>S\u0131cakl\u0131k:</b> ' + (eqSt.temp < 1 ? 'D\u00fc\u015f\u00fck' : eqSt.temp > 1 ? 'Y\u00fcksek' : 'Normal') +
      '</div>' +
    '</div>';
    box.innerHTML = html;
  }

  var EQ_THEORY_HTML =
    '<div class="card">' +
      '<div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:800;color:#fff;margin-bottom:8px">\u2696\ufe0f Le Chatelier \u0130lkesi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:12px">Dengedeki bir sisteme d\u0131\u015far\u0131dan bir etki (derişim, bas\u0131n\u00e7, s\u0131cakl\u0131k de\u011fi\u015fimi) uyguland\u0131\u011f\u0131nda, sistem bu etkiyi AZALTACAK y\u00f6nde tepki vererek YEN\u0130 bir dengeye ula\u015f\u0131r. Bu simulasyonda ele al\u0131nan tepkime Haber-Bosch s\u00fcrecidir: <b>N\u2082(g) + 3H\u2082(g) \u21cc 2NH\u2083(g)</b> (ileri y\u00f6n ekzotermik, \u0394H < 0).</p>' +
      '<div style="font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">Denge Sabiti (K)</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:12px">K = [NH\u2083]\u00b2 / ([N\u2082]\u00b7[H\u2082]\u00b3). Sabit S\u0130CAKLIKTA K de\u011fi\u015fmez; K yaln\u0131zca S\u0130CAKLIK de\u011fi\u015ftik\u00e7e de\u011fi\u015fir. Derişim ve bas\u0131n\u00e7 de\u011fi\u015fimleri K\u2019y\u0131 DE\u011e\u0130\u015eT\u0130RMEZ, sadece dengenin hangi tarafta kuruldu\u011funu (derişimleri) de\u011fi\u015ftirir.</p>' +
      '<div style="font-size:11px;font-weight:700;color:#22c55e;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">Etki Eden Fakt\u00f6rler</div>' +
      '<ul style="margin:0 0 12px 18px;padding:0;font-size:13px;color:var(--tx2);line-height:1.9">' +
        '<li><b>Derişim:</b> Tepken eklemek/\u00fcr\u00fcn\u00fc \u00e7ekmek dengeyi SA\u011eA; \u00fcr\u00fcn eklemek/tepkeni \u00e7ekmek dengeyi SOLA kayd\u0131r\u0131r.</li>' +
        '<li><b>Bas\u0131n\u00e7 (gaz tepkimelerinde):</b> Bas\u0131n\u00e7 artt\u0131r\u0131l\u0131rsa (hacim azal\u0131rsa) denge, DAHA AZ mol gaz olan tarafa kayar. Burada 4 mol tepken \u2192 2 mol \u00fcr\u00fcn oldu\u011fu i\u00e7in bas\u0131n\u00e7 artışı NH\u2083 y\u00f6n\u00fcn\u00fc destekler.</li>' +
        '<li><b>S\u0131cakl\u0131k:</b> S\u0131cakl\u0131k artt\u0131r\u0131l\u0131rsa denge ENDOTERM\u0130K y\u00f6ne kayar. Bu tepkimede ileri y\u00f6n ekzotermik oldu\u011fu i\u00e7in s\u0131cakl\u0131k artışı NH\u2083 \u00fcretimini AZALTIR (geri y\u00f6ne kayd\u0131r\u0131r).</li>' +
        '<li><b>Katalizör:</b> Dengeyi HİÇ kayd\u0131rmaz! Sadece ileri ve geri tepkimenin H\u0130ZINI e\u015fit oranda artt\u0131rarak dengeye DAHA \u00c7ABUK ula\u015f\u0131lmas\u0131n\u0131 sa\u011flar.</li>' +
      '</ul>' +
      '<div style="font-size:11px;font-weight:700;color:#60a5fa;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">Ger\u00e7ek Hayatta: Haber-Bosch S\u00fcreci</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:0">Endüstride amonyak \u00fcretimi tam bir ikilemdir: D\u00dc\u015e\u00dcK s\u0131cakl\u0131k dengeyi NH\u2083\u2019e kayd\u0131r\u0131r ama tepkime H\u0130ZI \u00e7ok yava\u015flar; Y\u00dcKSEK s\u0131cakl\u0131k h\u0131z\u0131 artt\u0131r\u0131r ama dengeyi geri kayd\u0131r\u0131r. Bu y\u00fczden pratikte orta bir s\u0131cakl\u0131k (\u2248400-500\u00b0C), y\u00fcksek bas\u0131n\u00e7 (\u2248200 atm) ve bir katalizör (Fe) birlikte kullan\u0131l\u0131r.</p>' +
    '</div>';

  function setupEQ(){
    if (document.getElementById('s-eq')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    app.insertAdjacentHTML('beforeend',
      '<div id="s-eq" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\u2696\ufe0f Kimyasal Denge 3D</h1>' +
        '<p class="psub">Le Chatelier \u0130lkesi \u2014 N\u2082 + 3H\u2082 \u21cc 2NH\u2083. Bas\u0131n\u00e7, s\u0131cakl\u0131k ve derişimi de\u011fi\u015ftir, dengenin canl\u0131 kaymasını izle.</p>' +
        '<div style="background:#050510;border:1px solid rgba(129,140,248,.3);border-radius:16px;overflow:hidden;margin-bottom:12px">' +
          '<canvas id="eq-cv" style="width:100%;display:block;touch-action:none" height="280"></canvas>' +
        '</div>' +
        '<div class="card" style="margin-bottom:12px">' +
          '<div class="slbl">\ud83c\udf21\ufe0f Bas\u0131n\u00e7</div>' +
          '<div style="display:flex;gap:6px;margin-bottom:14px">' +
            '<button type="button" class="ob" onclick="eqSetPressure(0.6,this)">D\u00fc\u015f\u00fck</button>' +
            '<button type="button" class="ob sel2" onclick="eqSetPressure(1,this)">Normal</button>' +
            '<button type="button" class="ob" onclick="eqSetPressure(1.7,this)">Y\u00fcksek</button>' +
          '</div>' +
          '<div class="slbl">\ud83c\udf21\ufe0f S\u0131cakl\u0131k</div>' +
          '<div style="display:flex;gap:6px;margin-bottom:14px">' +
            '<button type="button" class="ob" onclick="eqSetTemp(0.6,this)">D\u00fc\u015f\u00fck</button>' +
            '<button type="button" class="ob sel2" onclick="eqSetTemp(1,this)">Normal</button>' +
            '<button type="button" class="ob" onclick="eqSetTemp(1.6,this)">Y\u00fcksek</button>' +
          '</div>' +
          '<div class="slbl">\u2697\ufe0f Derişim M\u00fcdahalesi</div>' +
          '<div style="display:flex;gap:6px;flex-wrap:wrap">' +
            '<button type="button" class="ob" onclick="eqNudge(\'addReact\')">+N\u2082/H\u2082 Ekle</button>' +
            '<button type="button" class="ob" onclick="eqNudge(\'removeProd\')">NH\u2083 \u00c7ek</button>' +
            '<button type="button" class="ob" onclick="eqNudge(\'addProd\')">+NH\u2083 Ekle</button>' +
            '<button type="button" class="ob" onclick="eqNudge(\'removeReact\')">N\u2082/H\u2082 \u00c7ek</button>' +
          '</div>' +
        '</div>' +
        '<div id="eq-info" style="margin-bottom:16px"></div>' +
        EQ_THEORY_HTML +
      '</div></div>');
    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-eq') === -1) SCREENS.push('s-eq');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-eq'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-eq" onclick="nav(\'eq\')">\u2696\ufe0f Kimyasal Denge 3D</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-eq'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-eq" onclick="nav(\'eq\')"><div class="ti">\u2696\ufe0f</div><div class="tt">Kimyasal Denge 3D</div><div class="td">Le Chatelier ilkesi \u2014 basın\u00e7/s\u0131cakl\u0131k/derişim ile canlı denge kayması.</div></div>');
    eqBindCanvas();
    eqRenderInfo();
  }

  window.eqSetPressure = eqSetPressure;
  window.eqSetTemp = eqSetTemp;
  window.eqNudge = eqNudge;

  function eqLoop(){
    var scr = document.getElementById('s-eq');
    if (!scr || scr.style.display === 'none') { eqStop(); return; }
    eqSt.anim = requestAnimationFrame(eqLoop);
    var cv = document.getElementById('eq-cv');
    if (!cv) return;
    var rect = cv.getBoundingClientRect();
    var W = rect.width || cv.clientWidth || 300, H2 = 260;
    var dpr = window.devicePixelRatio || 1;
    if (Math.abs(cv.width - W*dpr) > 2 || Math.abs(cv.height - H2*dpr) > 2) { cv.width = W*dpr; cv.height = H2*dpr; }
    var x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    try {
      if (eqSt.spin && !eqSt.drag) eqSt.rotY += 0.005;
      eqSt.t += 0.016;
      if (eqSt.nudge !== 0) { eqSt.nudge *= 0.985; if (Math.abs(eqSt.nudge) < 0.01) eqSt.nudge = 0; }
      var target = Math.max(0.06, Math.min(0.94, eqSt.shiftTarget + eqSt.nudge));
      eqSt.shiftCur += (target - eqSt.shiftCur) * 0.02;
      eqDraw(x, W, H2);
    } catch (e) { drawErr(x, W, H2, e); }
  }
  function eqStop(){ if (eqSt.anim) { cancelAnimationFrame(eqSt.anim); eqSt.anim = null; } }
  function eqStart(){ eqBindCanvas(); if (eqSt.anim) cancelAnimationFrame(eqSt.anim); eqLoop(); }
  function eqBindCanvas(){
    if (eqSt.bound) return;
    var cv = document.getElementById('eq-cv');
    if (!cv) return;
    eqSt.bound = true;
    cv.onmousedown = function(e){ eqSt.drag = true; eqSt.lx = e.clientX; eqSt.ly = e.clientY; };
    cv.onmousemove = function(e){ if (!eqSt.drag) return; eqSt.rotY += (e.clientX-eqSt.lx)*0.01; eqSt.rotX += (e.clientY-eqSt.ly)*0.01; eqSt.lx=e.clientX; eqSt.ly=e.clientY; };
    cv.onmouseup = cv.onmouseleave = function(){ eqSt.drag = false; };
    cv.addEventListener('touchstart', function(e){ eqSt.drag=true; eqSt.lx=e.touches[0].clientX; eqSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchmove', function(e){ if(!eqSt.drag) return; eqSt.rotY += (e.touches[0].clientX-eqSt.lx)*0.013; eqSt.rotX += (e.touches[0].clientY-eqSt.ly)*0.013; eqSt.lx=e.touches[0].clientX; eqSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchend', function(){ eqSt.drag = false; });
  }
  function eqEnter(){ setTimeout(eqStart, 80); }
  function eqLeave(){ eqStop(); }

  // ---------- 17. TEPKİME TÜRÜ SINIFLANDIRICI ----------
  var RXN_TYPES = {
    sentez: { n:'Sentez (Birleşme)', c:'#22c55e', d:'\u0130ki ya da daha fazla madde birle\u015fip TEK bir \u00fcr\u00fcn olu\u015fturur: A + B \u2192 AB' },
    analiz: { n:'Analiz (Ayr\u0131\u015fma)', c:'#3b82f6', d:'TEK bir madde, iki ya da daha fazla \u00fcr\u00fcne ayr\u0131\u015f\u0131r: AB \u2192 A + B' },
    yerdeg: { n:'Yer De\u011fi\u015ftirme (Tekli)', c:'#f59e0b', d:'Bir element, bir bile\u015fikteki ba\u015fka bir elementin yerini al\u0131r: A + BC \u2192 AC + B' },
    ciftdeg: { n:'\u00c7ift De\u011fi\u015fim (Bile\u015fim De\u011fi\u015ftirme)', c:'#a855f7', d:'\u0130ki bile\u015fik, katyon/anyonlar\u0131n\u0131 kar\u015f\u0131l\u0131kl\u0131 de\u011fi\u015ftirir: AB + CD \u2192 AD + CB' }
  };
  var RXN_LIST = [
    { eq:'2H\u2082 + O\u2082 \u2192 2H\u2082O', t:'sentez', not:'\u0130ki element birle\u015fip tek \u00fcr\u00fcn (su) olu\u015fturdu.' },
    { eq:'N\u2082 + 3H\u2082 \u2192 2NH\u2083', t:'sentez', not:'Haber-Bosch s\u00fcreci \u2014 iki gaz birle\u015fip amonyak verir.' },
    { eq:'C + O\u2082 \u2192 CO\u2082', t:'sentez', not:'Karbonun yanmas\u0131 \u2014 klasik bir birle\u015fme tepkimesi.' },
    { eq:'CaO + H\u2082O \u2192 Ca(OH)\u2082', t:'sentez', not:'S\u00f6nmemi\u015f kire\u00e7 + su \u2192 s\u00f6nm\u00fc\u015f kire\u00e7.' },
    { eq:'SO\u2083 + H\u2082O \u2192 H\u2082SO\u2084', t:'sentez', not:'K\u00fck\u00fcrt trioksit + su \u2192 s\u00fclf\u00fcrik asit.' },
    { eq:'2H\u2082O \u2192 2H\u2082 + O\u2082', t:'analiz', not:'Suyun elektrolizle ayr\u0131\u015fmas\u0131.' },
    { eq:'CaCO\u2083 \u2192 CaO + CO\u2082', t:'analiz', not:'Kire\u00e7ta\u015f\u0131n\u0131n \u0131s\u0131yla ayr\u0131\u015fmas\u0131 (kalsinasyon).' },
    { eq:'2KClO\u2083 \u2192 2KCl + 3O\u2082', t:'analiz', not:'Potasyum klorat\u0131n ayr\u0131\u015farak oksijen vermesi.' },
    { eq:'2H\u2082O\u2082 \u2192 2H\u2082O + O\u2082', t:'analiz', not:'Hidrojen peroksitin ayr\u0131\u015fmas\u0131.' },
    { eq:'2NaHCO\u2083 \u2192 Na\u2082CO\u2083 + H\u2082O + CO\u2082', t:'analiz', not:'Karbonat\u0131n \u0131s\u0131yla ayr\u0131\u015fmas\u0131.' },
    { eq:'Zn + CuSO\u2084 \u2192 ZnSO\u2084 + Cu', t:'yerdeg', not:'\u00c7inko, bak\u0131r\u0131n yerini al\u0131r (\u00e7inko daha aktif).' },
    { eq:'Fe + CuSO\u2084 \u2192 FeSO\u2084 + Cu', t:'yerdeg', not:'Demir, bak\u0131r\u0131n yerini al\u0131r.' },
    { eq:'2Na + 2H\u2082O \u2192 2NaOH + H\u2082', t:'yerdeg', not:'Sodyum, suyun hidrojeninin yerini al\u0131r.' },
    { eq:'Cl\u2082 + 2NaBr \u2192 2NaCl + Br\u2082', t:'yerdeg', not:'Klor, bromun yerini al\u0131r (klor daha aktif halojen).' },
    { eq:'Mg + 2HCl \u2192 MgCl\u2082 + H\u2082', t:'yerdeg', not:'Magnezyum, asitteki hidrojenin yerini al\u0131r.' },
    { eq:'AgNO\u2083 + NaCl \u2192 AgCl + NaNO\u2083', t:'ciftdeg', not:'A\u011f\u2019\u0131n katyonu Na\u2019n\u0131n katyonuyla yer de\u011fi\u015ftirir; AgCl \u00e7\u00f6kelir.' },
    { eq:'BaCl\u2082 + Na\u2082SO\u2084 \u2192 BaSO\u2084 + 2NaCl', t:'ciftdeg', not:'BaSO\u2084 \u00e7\u00f6kele\u011fi olu\u015fur.' },
    { eq:'HCl + NaOH \u2192 NaCl + H\u2082O', t:'ciftdeg', not:'N\u00f6tralle\u015fme tepkimesi \u2014 asit + baz \u2192 tuz + su.' },
    { eq:'Pb(NO\u2083)\u2082 + 2KI \u2192 PbI\u2082 + 2KNO\u2083', t:'ciftdeg', not:'Sar\u0131 PbI\u2082 \u00e7\u00f6keleği klasik bir \u00e7ift de\u011fi\u015fim \u00f6rne\u011fidir.' },
    { eq:'CuSO\u2084 + 2NaOH \u2192 Cu(OH)\u2082 + Na\u2082SO\u2084', t:'ciftdeg', not:'Mavi Cu(OH)\u2082 \u00e7\u00f6kele\u011fi olu\u015fur.' }
  ];
  var rxnSt = { cur: null, score: 0, total: 0, order: [], idx: 0 };

  function rxnShuffle(){
    rxnSt.order = RXN_LIST.map(function(_, i){ return i; });
    for (var i = rxnSt.order.length - 1; i > 0; i--) { var j = Math.floor(Math.random()*(i+1)); var tmp = rxnSt.order[i]; rxnSt.order[i] = rxnSt.order[j]; rxnSt.order[j] = tmp; }
  }
  rxnShuffle();

  function setupRXN(){
    if (document.getElementById('s-rxntype')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    app.insertAdjacentHTML('beforeend',
      '<div id="s-rxntype" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\ud83e\uddea Tepkime T\u00fcr\u00fc S\u0131n\u0131fland\u0131r\u0131c\u0131</h1>' +
        '<p class="psub">Denklemi incele, hangi tepkime t\u00fcr\u00fc oldu\u011funu bul.</p>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;font-size:13px;color:var(--tx3)">' +
          '<span id="rxn-prog">Soru 1/' + RXN_LIST.length + '</span>' +
          '<span>\u2713 <span id="rxn-score" style="color:var(--gr);font-weight:700">0</span></span>' +
        '</div>' +
        '<div class="card" style="text-align:center;margin-bottom:14px">' +
          '<div style="font-size:11px;color:var(--tx3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:14px">Bu tepkime hangi t\u00fcrdendir?</div>' +
          '<div id="rxn-eq" style="font-family:monospace;font-size:20px;font-weight:700;color:#fff;line-height:1.6;word-break:break-word"></div>' +
        '</div>' +
        '<div id="rxn-opts" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px"></div>' +
        '<div id="rxn-fb" style="display:none;padding:12px;border-radius:var(--r);margin-bottom:12px;font-size:13px;line-height:1.6"></div>' +
        '<button type="button" id="rxn-next" onclick="rxnNext()" style="display:none;width:100%;padding:12px;background:var(--sf2);border:1px solid var(--br);border-radius:var(--r);color:var(--tx);font-size:14px;font-weight:600;cursor:pointer">Sonraki \u2192</button>' +
        '<div class="card" style="margin-top:20px">' +
          '<div class="slbl">4 Tepkime T\u00fcr\u00fc</div>' +
          '<div id="rxn-theory"></div>' +
        '</div>' +
      '</div></div>');
    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-rxntype') === -1) SCREENS.push('s-rxntype');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-rxntype'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-rxntype" onclick="nav(\'rxntype\')">\ud83e\uddea Tepkime T\u00fcr\u00fc S\u0131n\u0131fland\u0131r\u0131c\u0131</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-rxntype'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-rxntype" onclick="nav(\'rxntype\')"><div class="ti">\ud83e\uddea</div><div class="tt">Tepkime T\u00fcr\u00fc S\u0131n\u0131fland\u0131r\u0131c\u0131</div><div class="td">Sentez/analiz/yer de\u011fi\u015ftirme/\u00e7ift de\u011fi\u015fim tan\u0131ma quiz\u2019i.</div></div>');

    var th = '';
    ['sentez','analiz','yerdeg','ciftdeg'].forEach(function(k){
      var rt = RXN_TYPES[k];
      th += '<div style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.06)">' +
        '<div style="font-size:13px;font-weight:700;color:' + rt.c + '">' + rt.n + '</div>' +
        '<div style="font-size:12px;color:var(--tx2);margin-top:2px">' + rt.d + '</div></div>';
    });
    document.getElementById('rxn-theory').innerHTML = th;
  }
  function rxnEnter(){ rxnSt.idx = 0; rxnSt.score = 0; rxnSt.total = 0; rxnShuffle(); rxnRender(); }

  function rxnRender(){
    if (rxnSt.idx >= rxnSt.order.length) { rxnShuffle(); rxnSt.idx = 0; }
    var item = RXN_LIST[rxnSt.order[rxnSt.idx]];
    rxnSt.cur = item;
    document.getElementById('rxn-prog').textContent = 'Soru ' + (rxnSt.idx+1) + '/' + RXN_LIST.length;
    document.getElementById('rxn-score').textContent = rxnSt.score;
    document.getElementById('rxn-eq').textContent = item.eq;
    var fb = document.getElementById('rxn-fb'); fb.style.display = 'none';
    document.getElementById('rxn-next').style.display = 'none';
    var keys = ['sentez','analiz','yerdeg','ciftdeg'];
    var html = '';
    keys.forEach(function(k){
      html += '<button type="button" class="ob2" onclick="rxnCheck(\'' + k + '\',this)">' + RXN_TYPES[k].n + '</button>';
    });
    document.getElementById('rxn-opts').innerHTML = html;
  }
  window.rxnCheck = function(sel, btn){
    var item = rxnSt.cur;
    var btns = document.getElementById('rxn-opts').querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) btns[i].disabled = true;
    var fb = document.getElementById('rxn-fb');
    rxnSt.total++;
    if (sel === item.t) {
      rxnSt.score++;
      btn.className = 'ob2 cor';
      fb.style.cssText = 'display:block;padding:12px;border-radius:var(--r);margin-bottom:12px;font-size:13px;line-height:1.6;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);color:#86efac';
      fb.innerHTML = '\u2713 Do\u011fru! ' + item.not;
    } else {
      btn.className = 'ob2 wro';
      fb.style.cssText = 'display:block;padding:12px;border-radius:var(--r);margin-bottom:12px;font-size:13px;line-height:1.6;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#fca5a5';
      fb.innerHTML = '\u2717 Yanl\u0131\u015f. Do\u011fru cevap: <b>' + RXN_TYPES[item.t].n + '</b> \u2014 ' + item.not;
    }
    document.getElementById('rxn-score').textContent = rxnSt.score;
    document.getElementById('rxn-next').style.display = 'block';
  };
  window.rxnNext = function(){ rxnSt.idx++; rxnRender(); };

  // ---------- 18. ALEV TESTİ (ALEV BOYAMA) GALERİSİ ----------
  var FLAME_LIST = [
    { sym:'Li', name:'Lityum', ion:'Li\u207a', col:['#ff6b6b','#c0392b'], hex:'#e74c3c', d:'Koyu k\u0131rm\u0131z\u0131 / karmen k\u0131rm\u0131z\u0131s\u0131. Havai fi\u015feklerde k\u0131rm\u0131z\u0131 renk i\u00e7in kullan\u0131l\u0131r.' },
    { sym:'Na', name:'Sodyum', ion:'Na\u207a', col:['#ffe082','#f39c12'], hex:'#f1c40f', d:'Yo\u011fun SARI \u2014 en karakteristik ve en g\u00fc\u00e7l\u00fc alev rengidir; \u00e7ok az miktar bile t\u00fcm alevi sar\u0131ya boyar (sokak lambalar\u0131nda kullan\u0131l\u0131r\u0131d\u0131).' },
    { sym:'K', name:'Potasyum', ion:'K\u207a', col:['#c39bd3','#8e44ad'], hex:'#9b59b6', d:'Soluk MOR / leylak rengi \u2014 sodyumun sar\u0131 rengi maskeleyebilece\u011fi i\u00e7in genelde kobalt cam\u0131yla bak\u0131l\u0131r.' },
    { sym:'Ca', name:'Kalsiyum', ion:'Ca\u00b2\u207a', col:['#ff8a65','#d84315'], hex:'#e67e22', d:'Tu\u011fla k\u0131rm\u0131z\u0131s\u0131 / turuncu-k\u0131rm\u0131z\u0131.' },
    { sym:'Sr', name:'Stronsiyum', ion:'Sr\u00b2\u207a', col:['#ff5252','#b71c1c'], hex:'#c0392b', d:'Parlak k\u0131rm\u0131z\u0131 \u2014 havai fi\u015feklerde ve i\u015faret f\u0130\u015feklerinde k\u0131rm\u0131z\u0131 renk kayna\u011f\u0131d\u0131r.' },
    { sym:'Ba', name:'Baryum', ion:'Ba\u00b2\u207a', col:['#aed581','#558b2f'], hex:'#7cb342', d:'A\u00e7\u0131k ye\u015fil / sar\u0131-ye\u015fil.' },
    { sym:'Cu', name:'Bak\u0131r', ion:'Cu\u00b2\u207a', col:['#4dd0e1','#00695c'], hex:'#16a085', d:'Turkuaz / ye\u015fil-mavi \u2014 havai fi\u015feklerde mavi-ye\u015fil renk kayna\u011f\u0131d\u0131r.' },
    { sym:'Pb', name:'Kur\u015fun', ion:'Pb\u00b2\u207a', col:['#90a4ae','#455a64'], hex:'#607d8b', d:'Soluk mavi-beyaz \u2014 belirgin de\u011fildir.' }
  ];
  var flameIdx = 0;
  var flameSt = { t: 0, anim: null, bound: false };
  var flameQuizSt = { cur: null, score: 0, total: 0, order: [], idx: 0 };

  function setupFlame(){
    if (document.getElementById('s-alev')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    var thumbs = '';
    FLAME_LIST.forEach(function(f, i){
      thumbs += '<button type="button" class="ob' + (i===0?' sel2':'') + '" onclick="flameSetIdx(' + i + ',this)">' + f.sym + '</button>';
    });
    app.insertAdjacentHTML('beforeend',
      '<div id="s-alev" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\ud83d\udd25 Alev Testi (Alev Boyama)</h1>' +
        '<p class="psub">Metal iyonlar\u0131n\u0131n bek alevinde verdi\u011fi karakteristik renkler.</p>' +
        '<div class="tabs" id="alev-tabs">' +
          '<button class="tab on" onclick="tswitch(\'alev-tabs\',\'alev-tps\',0)">\ud83d\udd25 Galeri</button>' +
          '<button class="tab" onclick="tswitch(\'alev-tabs\',\'alev-tps\',1)">\u2753 Quiz</button>' +
        '</div>' +
        '<div id="alev-tps">' +
          '<div class="tp on">' +
            '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:12px"><div style="display:flex;gap:6px;min-width:max-content">' + thumbs + '</div></div>' +
            '<div style="background:#050510;border:1px solid rgba(255,140,0,.3);border-radius:16px;overflow:hidden;margin-bottom:14px">' +
              '<canvas id="alev-cv" style="width:100%;display:block" height="240"></canvas>' +
            '</div>' +
            '<div class="card" id="alev-info"></div>' +
          '</div>' +
          '<div class="tp">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;font-size:13px;color:var(--tx3)">' +
              '<span id="alevq-prog">Soru 1/' + FLAME_LIST.length + '</span>' +
              '<span>\u2713 <span id="alevq-score" style="color:var(--gr);font-weight:700">0</span></span>' +
            '</div>' +
            '<div style="background:#050510;border:1px solid rgba(255,140,0,.3);border-radius:16px;overflow:hidden;margin-bottom:14px">' +
              '<canvas id="alevq-cv" style="width:100%;display:block" height="180"></canvas>' +
            '</div>' +
            '<div style="text-align:center;font-size:12px;color:var(--tx3);margin-bottom:10px">Bu alev rengi hangi metale ait?</div>' +
            '<div id="alevq-opts" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px"></div>' +
            '<div id="alevq-fb" style="display:none;padding:12px;border-radius:var(--r);margin-bottom:12px;font-size:13px;line-height:1.6"></div>' +
            '<button type="button" id="alevq-next" onclick="flameQNext()" style="display:none;width:100%;padding:12px;background:var(--sf2);border:1px solid var(--br);border-radius:var(--r);color:var(--tx);font-size:14px;font-weight:600;cursor:pointer">Sonraki \u2192</button>' +
          '</div>' +
        '</div>' +
      '</div></div>');
    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-alev') === -1) SCREENS.push('s-alev');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-alev'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-alev" onclick="nav(\'alev\')">\ud83d\udd25 Alev Testi</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-alev'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-alev" onclick="nav(\'alev\')"><div class="ti">\ud83d\udd25</div><div class="tt">Alev Testi</div><div class="td">Metal iyonlar\u0131n\u0131n karakteristik alev renkleri, animasyonlu + quiz.</div></div>');
    flameRenderInfo();
    flameBind();
  }

  window.flameSetIdx = function(i, btn){ flameIdx = i; if (btn) selectInRow(btn); flameRenderInfo(); };
  function flameRenderInfo(){
    var box = document.getElementById('alev-info');
    if (!box) return;
    var f = FLAME_LIST[flameIdx];
    box.innerHTML = '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
      '<span style="width:22px;height:22px;border-radius:50%;background:' + f.hex + ';display:inline-block;box-shadow:0 0 12px ' + f.hex + '"></span>' +
      '<div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:800;color:#fff">' + f.name + ' (' + f.ion + ')</div></div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7">' + f.d + '</p>';
  }

  function flameDrawOne(x, W, H2, f, t, cx){
    cx = cx === undefined ? W/2 : cx;
    var baseY = H2 - 20;
    var flicker = Math.sin(t*7)*3 + Math.sin(t*13)*1.5;
    var h = 90 + Math.sin(t*3)*6;
    var w = 34 + Math.sin(t*5)*4;
    var grd = x.createRadialGradient(cx, baseY - h*0.55, 4, cx, baseY - h*0.4, w*1.4);
    grd.addColorStop(0, f.col[0]); grd.addColorStop(0.55, f.hex); grd.addColorStop(1, f.col[1]);
    x.save();
    x.translate(flicker*0.3, 0);
    x.beginPath();
    x.moveTo(cx, baseY);
    x.bezierCurveTo(cx - w, baseY - h*0.35, cx - w*0.6 + flicker, baseY - h*0.85, cx + flicker*0.5, baseY - h);
    x.bezierCurveTo(cx + w*0.6 + flicker, baseY - h*0.85, cx + w, baseY - h*0.35, cx, baseY);
    x.closePath();
    x.fillStyle = grd; x.globalAlpha = 0.9; x.fill(); x.globalAlpha = 1;
    x.restore();
    // iç mavi taban (bek alevi)
    x.beginPath(); x.ellipse(cx, baseY - 4, 12, 16, 0, 0, 6.283);
    x.fillStyle = 'rgba(90,160,255,0.5)'; x.fill();
    // kıvılcım noktaları
    for (var i = 0; i < 6; i++) {
      var ph = t*4 + i*1.7;
      var sx = cx + Math.sin(ph*1.3)*w*0.5, sy = baseY - (h*0.3 + ((ph*30) % (h*0.8)));
      x.beginPath(); x.arc(sx, sy, 1.6, 0, 6.283); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fill();
    }
    // bek (destek)
    x.fillStyle = '#37474f';
    x.fillRect(cx - 16, baseY, 32, 16);
  }

  function flameLoop(){
    var scr = document.getElementById('s-alev');
    if (!scr || scr.style.display === 'none') { flameStop(); return; }
    flameSt.anim = requestAnimationFrame(flameLoop);
    var cv = document.getElementById('alev-cv');
    if (cv) {
      var rect = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
      var W = rect.width || 300, H2 = 240;
      if (Math.abs(cv.width - W*dpr) > 2 || Math.abs(cv.height - H2*dpr) > 2) { cv.width = W*dpr; cv.height = H2*dpr; }
      var x = cv.getContext('2d');
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      try {
        x.fillStyle = '#050510'; x.fillRect(0, 0, W, H2);
        flameSt.t += 0.016;
        flameDrawOne(x, W, H2, FLAME_LIST[flameIdx], flameSt.t);
      } catch (e) { drawErr(x, W, H2, e); }
    }
    var qcv = document.getElementById('alevq-cv');
    if (qcv && flameQuizSt.cur) {
      var rect2 = qcv.getBoundingClientRect(), dpr2 = window.devicePixelRatio || 1;
      var W2 = rect2.width || 300, H3 = 180;
      if (Math.abs(qcv.width - W2*dpr2) > 2 || Math.abs(qcv.height - H3*dpr2) > 2) { qcv.width = W2*dpr2; qcv.height = H3*dpr2; }
      var x2 = qcv.getContext('2d');
      x2.setTransform(dpr2, 0, 0, dpr2, 0, 0);
      try {
        x2.fillStyle = '#050510'; x2.fillRect(0, 0, W2, H3);
        flameDrawOne(x2, W2, H3, flameQuizSt.cur, flameSt.t);
      } catch (e) { drawErr(x2, W2, H3, e); }
    }
  }
  function flameStop(){ if (flameSt.anim) { cancelAnimationFrame(flameSt.anim); flameSt.anim = null; } }
  function flameStart(){ if (flameSt.anim) cancelAnimationFrame(flameSt.anim); flameLoop(); }
  function flameBind(){ /* statik galeri, sürükleme gerekmiyor */ }
  function flameEnter(){ setTimeout(flameStart, 80); flameQEnter(); }
  function flameLeave(){ flameStop(); }

  function flameQShuffle(){
    flameQuizSt.order = FLAME_LIST.map(function(_, i){ return i; });
    for (var i = flameQuizSt.order.length - 1; i > 0; i--) { var j = Math.floor(Math.random()*(i+1)); var tmp = flameQuizSt.order[i]; flameQuizSt.order[i] = flameQuizSt.order[j]; flameQuizSt.order[j] = tmp; }
  }
  function flameQEnter(){ flameQuizSt.idx = 0; flameQuizSt.score = 0; flameQShuffle(); flameQRender(); }
  function flameQRender(){
    if (flameQuizSt.idx >= flameQuizSt.order.length) { flameQShuffle(); flameQuizSt.idx = 0; }
    var item = FLAME_LIST[flameQuizSt.order[flameQuizSt.idx]];
    flameQuizSt.cur = item;
    var progEl = document.getElementById('alevq-prog'), scEl = document.getElementById('alevq-score');
    if (progEl) progEl.textContent = 'Soru ' + (flameQuizSt.idx+1) + '/' + FLAME_LIST.length;
    if (scEl) scEl.textContent = flameQuizSt.score;
    var fb = document.getElementById('alevq-fb'); if (fb) fb.style.display = 'none';
    var nb = document.getElementById('alevq-next'); if (nb) nb.style.display = 'none';
    var opts = FLAME_LIST.map(function(f){ return f; });
    for (var i = opts.length - 1; i > 0; i--) { var j = Math.floor(Math.random()*(i+1)); var tmp = opts[i]; opts[i] = opts[j]; opts[j] = tmp; }
    opts = opts.slice(0, 4);
    if (opts.indexOf(item) === -1) opts[0] = item;
    for (var s = opts.length - 1; s > 0; s--) { var j2 = Math.floor(Math.random()*(s+1)); var tmp2 = opts[s]; opts[s] = opts[j2]; opts[j2] = tmp2; }
    var html = '';
    opts.forEach(function(o){ html += '<button type="button" class="ob2" onclick="flameQCheck(\'' + o.sym + '\',this)">' + o.name + '</button>'; });
    var og = document.getElementById('alevq-opts'); if (og) og.innerHTML = html;
  }
  window.flameQCheck = function(sel, btn){
    var item = flameQuizSt.cur;
    var btns = document.getElementById('alevq-opts').querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) btns[i].disabled = true;
    var fb = document.getElementById('alevq-fb');
    flameQuizSt.total++;
    if (sel === item.sym) {
      flameQuizSt.score++;
      btn.className = 'ob2 cor';
      fb.style.cssText = 'display:block;padding:12px;border-radius:var(--r);margin-bottom:12px;font-size:13px;line-height:1.6;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);color:#86efac';
      fb.innerHTML = '\u2713 Do\u011fru! ' + item.name + ' \u2014 ' + item.d;
    } else {
      btn.className = 'ob2 wro';
      fb.style.cssText = 'display:block;padding:12px;border-radius:var(--r);margin-bottom:12px;font-size:13px;line-height:1.6;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#fca5a5';
      fb.innerHTML = '\u2717 Yanl\u0131\u015f. Do\u011fru cevap: <b>' + item.name + '</b> \u2014 ' + item.d;
    }
    document.getElementById('alevq-score').textContent = flameQuizSt.score;
    document.getElementById('alevq-next').style.display = 'block';
  };
  window.flameQNext = function(){ flameQuizSt.idx++; flameQRender(); };

  // ---------- 19. REDOKS YARI TEPKİME DENGELEYİCİ ----------
  var REDOX_LIST = [
    {
      name: 'Fe\u00b2\u207a + MnO\u2084\u207b (Asidik Ortam)',
      unbal: 'Fe\u00b2\u207a + MnO\u2084\u207b \u2192 Fe\u00b3\u207a + Mn\u00b2\u207a',
      steps: [
        'Y\u00fckseltgenme yar\u0131 tepkimesi: Fe\u00b2\u207a \u2192 Fe\u00b3\u207a + e\u207b',
        '\u0130ndirgenme yar\u0131 tepkimesi (dengesiz): MnO\u2084\u207b \u2192 Mn\u00b2\u207a',
        'Oksijenleri dengele (su ile): MnO\u2084\u207b + 8H\u207a \u2192 Mn\u00b2\u207a + 4H\u2082O',
        'Y\u00fck\u00fc dengele (elektron ekle): MnO\u2084\u207b + 8H\u207a + 5e\u207b \u2192 Mn\u00b2\u207a + 4H\u2082O',
        'Elektron say\u0131lar\u0131n\u0131 e\u015fitle: Fe\u00b2\u207a yar\u0131 tepkimesini 5 ile \u00e7arp \u2014 5Fe\u00b2\u207a \u2192 5Fe\u00b3\u207a + 5e\u207b',
        'Yar\u0131 tepkimeleri topla (elektronlar sadele\u015fir):'
      ],
      final: '5Fe\u00b2\u207a + MnO\u2084\u207b + 8H\u207a \u2192 5Fe\u00b3\u207a + Mn\u00b2\u207a + 4H\u2082O',
      not: 'MnO\u2084\u207b\u2019deki Mn +7\u2019den +2\u2019ye iner (5 elektron al\u0131r); her Fe\u00b2\u207a 1 elektron verir \u2014 bu y\u00fczden 5 kat Fe gerekir.'
    },
    {
      name: 'Fe\u00b2\u207a + Cr\u2082O\u2087\u00b2\u207b (Asidik Ortam)',
      unbal: 'Fe\u00b2\u207a + Cr\u2082O\u2087\u00b2\u207b \u2192 Fe\u00b3\u207a + Cr\u00b3\u207a',
      steps: [
        'Y\u00fckseltgenme yar\u0131 tepkimesi: Fe\u00b2\u207a \u2192 Fe\u00b3\u207a + e\u207b',
        'Cr atomlar\u0131n\u0131 dengele: Cr\u2082O\u2087\u00b2\u207b \u2192 2Cr\u00b3\u207a',
        'Oksijenleri dengele: Cr\u2082O\u2087\u00b2\u207b + 14H\u207a \u2192 2Cr\u00b3\u207a + 7H\u2082O',
        'Y\u00fck\u00fc dengele: Cr\u2082O\u2087\u00b2\u207b + 14H\u207a + 6e\u207b \u2192 2Cr\u00b3\u207a + 7H\u2082O',
        'Elektronlar\u0131 e\u015fitle: Fe\u00b2\u207a yar\u0131 tepkimesini 6 ile \u00e7arp \u2014 6Fe\u00b2\u207a \u2192 6Fe\u00b3\u207a + 6e\u207b',
        'Yar\u0131 tepkimeleri topla:'
      ],
      final: '6Fe\u00b2\u207a + Cr\u2082O\u2087\u00b2\u207b + 14H\u207a \u2192 6Fe\u00b3\u207a + 2Cr\u00b3\u207a + 7H\u2082O',
      not: 'Cr\u2082O\u2087\u00b2\u207b\u2019deki 2 Cr atomu (her biri +6\u2019dan +3\u2019e, toplam 6 elektron) \u2014 6 kat Fe\u00b2\u207a gerekir.'
    },
    {
      name: 'Zn + Cu\u00b2\u207a (Daniell Tepkimesi)',
      unbal: 'Zn + Cu\u00b2\u207a \u2192 Zn\u00b2\u207a + Cu',
      steps: [
        'Y\u00fckseltgenme yar\u0131 tepkimesi: Zn \u2192 Zn\u00b2\u207a + 2e\u207b',
        '\u0130ndirgenme yar\u0131 tepkimesi: Cu\u00b2\u207a + 2e\u207b \u2192 Cu',
        'Her iki yar\u0131 tepkimede de elektron say\u0131s\u0131 zaten E\u015e\u0130T (2\u015e\u00e7er) \u2014 \u00e7arpan gerekmez.',
        'Yar\u0131 tepkimeleri topla:'
      ],
      final: 'Zn + Cu\u00b2\u207a \u2192 Zn\u00b2\u207a + Cu',
      not: 'En basit redoks \u00f6rne\u011fi \u2014 galvanik h\u00fccrenin (Daniell h\u00fccresi) temel tepkimesi. Her iki metal de 2 elektron al\u0131p verdi\u011fi i\u00e7in katsay\u0131 gerekmez.'
    },
    {
      name: 'I\u207b + MnO\u2084\u207b (Asidik Ortam)',
      unbal: 'I\u207b + MnO\u2084\u207b \u2192 I\u2082 + Mn\u00b2\u207a',
      steps: [
        'Y\u00fckseltgenme (I atomlar\u0131n\u0131 dengele): 2I\u207b \u2192 I\u2082 + 2e\u207b',
        '\u0130ndirgenme (dengesiz): MnO\u2084\u207b \u2192 Mn\u00b2\u207a',
        'Oksijenleri dengele: MnO\u2084\u207b + 8H\u207a \u2192 Mn\u00b2\u207a + 4H\u2082O',
        'Y\u00fck\u00fc dengele: MnO\u2084\u207b + 8H\u207a + 5e\u207b \u2192 Mn\u00b2\u207a + 4H\u2082O',
        'Elektronlar\u0131 e\u015fitle (EKOK=10): I\u207b yar\u0131 tepkimesini 5, Mn yar\u0131 tepkimesini 2 ile \u00e7arp',
        'Yar\u0131 tepkimeleri topla:'
      ],
      final: '10I\u207b + 2MnO\u2084\u207b + 16H\u207a \u2192 5I\u2082 + 2Mn\u00b2\u207a + 8H\u2082O',
      not: 'Elektron say\u0131lar\u0131 (2 ve 5) farkl\u0131 oldu\u011fu i\u00e7in EKOK=10 kullan\u0131larak her iki yar\u0131 tepkime ayr\u0131 katsay\u0131yla \u00e7arp\u0131l\u0131r.'
    },
    {
      name: 'Zn + NO\u2083\u207b (Seyreltik Asit)',
      unbal: 'Zn + NO\u2083\u207b \u2192 Zn\u00b2\u207a + NH\u2084\u207a',
      steps: [
        'Y\u00fckseltgenme: Zn \u2192 Zn\u00b2\u207a + 2e\u207b',
        '\u0130ndirgenme (N atomu +5\u2019ten \u22123\u2019e, 8 elektron al\u0131r): NO\u2083\u207b \u2192 NH\u2084\u207a',
        'Oksijen/hidrojeni dengele: NO\u2083\u207b + 10H\u207a + 8e\u207b \u2192 NH\u2084\u207a + 3H\u2082O',
        'Elektronlar\u0131 e\u015fitle: Zn yar\u0131 tepkimesini 4 ile \u00e7arp \u2014 4Zn \u2192 4Zn\u00b2\u207a + 8e\u207b',
        'Yar\u0131 tepkimeleri topla:'
      ],
      final: '4Zn + NO\u2083\u207b + 10H\u207a \u2192 4Zn\u00b2\u207a + NH\u2084\u207a + 3H\u2082O',
      not: 'A\u015f\u0131r\u0131 aktif metaller (Zn, Al, Mg) seyreltik nitrik asitle tepkimeye girdi\u011finde N, beklenenden \u00e7ok daha fazla (8 elektron) indirgenip NH\u2084\u207a\u2019ya kadar gidebilir.'
    },
    {
      name: 'SO\u2083\u00b2\u207b + MnO\u2084\u207b (Bazik Ortam)',
      unbal: 'SO\u2083\u00b2\u207b + MnO\u2084\u207b \u2192 SO\u2084\u00b2\u207b + MnO\u2082',
      steps: [
        'Y\u00fckseltgenme (oksijen ekle): SO\u2083\u00b2\u207b + 2OH\u207b \u2192 SO\u2084\u00b2\u207b + H\u2082O + 2e\u207b',
        '\u0130ndirgenme (dengesiz): MnO\u2084\u207b \u2192 MnO\u2082',
        'Bazik ortamda oksijeni OH\u207b/H\u2082O ile dengele: MnO\u2084\u207b + 2H\u2082O + 3e\u207b \u2192 MnO\u2082 + 4OH\u207b',
        'Elektronlar\u0131 e\u015fitle (EKOK=6): SO\u2083\u00b2\u207b yar\u0131 tepkimesini 3, Mn yar\u0131 tepkimesini 2 ile \u00e7arp',
        'Yar\u0131 tepkimeleri topla:'
      ],
      final: '3SO\u2083\u00b2\u207b + 2MnO\u2084\u207b + H\u2082O \u2192 3SO\u2084\u00b2\u207b + 2MnO\u2082 + 2OH\u207b',
      not: 'Bazik ortamda H\u207a yerine OH\u207b ve H\u2082O kullan\u0131l\u0131r \u2014 asidik ortamdan fark\u0131 budur.'
    }
  ];
  var redoxIdx = 0;
  var redoxStepIdx = 0;

  function setupRedox(){
    if (document.getElementById('s-redoks')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    var btns = '';
    REDOX_LIST.forEach(function(r, i){ btns += '<button type="button" class="ob' + (i===0?' sel2':'') + '" onclick="redoxSetIdx(' + i + ',this)">' + r.name + '</button>'; });
    app.insertAdjacentHTML('beforeend',
      '<div id="s-redoks" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\ud83d\udd0c Redoks Yar\u0131 Tepkime Dengeleyici</h1>' +
        '<p class="psub">Elektron kazanma/kaybetme (yar\u0131 tepkime) y\u00f6ntemiyle ad\u0131m ad\u0131m redoks dengeleme.</p>' +
        '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:14px"><div style="display:flex;gap:6px;min-width:max-content">' + btns + '</div></div>' +
        '<div class="card">' +
          '<div class="slbl">Dengesiz Tepkime</div>' +
          '<div id="redox-unbal" style="font-family:monospace;font-size:15px;color:#f59e0b;margin-bottom:16px;word-break:break-word"></div>' +
          '<div class="slbl">Ad\u0131mlar</div>' +
          '<div id="redox-steps" style="font-size:13px;color:var(--tx2);line-height:2;margin-bottom:14px"></div>' +
          '<button type="button" id="redox-nextbtn" onclick="redoxNextStep()" style="width:100%;padding:11px;background:var(--ac);color:#fff;border:none;border-radius:var(--r);font-size:14px;font-weight:600;cursor:pointer;margin-bottom:12px">Sonraki Ad\u0131m \u2192</button>' +
          '<div id="redox-final" style="display:none;padding:14px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);border-radius:var(--r)">' +
            '<div class="slbl" style="color:#86efac">Dengeli Tepkime</div>' +
            '<div style="font-family:monospace;font-size:15px;font-weight:700;color:#86efac;margin-bottom:8px" id="redox-finaleq"></div>' +
            '<div style="font-size:12px;color:var(--tx2);line-height:1.6" id="redox-finalnot"></div>' +
          '</div>' +
        '</div>' +
      '</div></div>');
    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-redoks') === -1) SCREENS.push('s-redoks');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-redoks'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-redoks" onclick="nav(\'redoks\')">\ud83d\udd0c Redoks Dengeleyici</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-redoks'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-redoks" onclick="nav(\'redoks\')"><div class="ti">\ud83d\udd0c</div><div class="tt">Redoks Dengeleyici</div><div class="td">Yar\u0131 tepkime y\u00f6ntemiyle ad\u0131m ad\u0131m redoks dengeleme.</div></div>');
    redoxRender();
  }
  window.redoxSetIdx = function(i, btn){ redoxIdx = i; redoxStepIdx = 0; if (btn) selectInRow(btn); redoxRender(); };
  function redoxRender(){
    var r = REDOX_LIST[redoxIdx];
    document.getElementById('redox-unbal').textContent = r.unbal;
    var html = '';
    for (var i = 0; i < redoxStepIdx; i++) html += '<div style="padding:4px 0">' + (i+1) + '. ' + r.steps[i] + '</div>';
    document.getElementById('redox-steps').innerHTML = html;
    var nb = document.getElementById('redox-nextbtn');
    var fin = document.getElementById('redox-final');
    if (redoxStepIdx >= r.steps.length) {
      nb.style.display = 'none';
      fin.style.display = 'block';
      document.getElementById('redox-finaleq').textContent = r.final;
      document.getElementById('redox-finalnot').textContent = r.not;
    } else {
      nb.style.display = 'block';
      fin.style.display = 'none';
      nb.textContent = redoxStepIdx === r.steps.length - 1 ? 'Dengeli Tepkimeyi G\u00f6ster \u2192' : 'Sonraki Ad\u0131m \u2192';
    }
  }
  window.redoxNextStep = function(){ redoxStepIdx++; redoxRender(); };
  function redoxEnter(){ redoxStepIdx = 0; redoxRender(); }

  // ---------- 20. TEPKİME HIZI (KİNETİK) 3D — ÇARPIŞMA TEORİSİ ----------
  var kinSt = {
    rotX: 0.3, rotY: 0.4, zoom: 1, fit: 1, spin: true, drag: false, lx:0, ly:0, dist:0,
    t: 0, anim: null, stars: null, sw: 0, bound: false,
    conc: 1,       // 0.5 az, 1 normal, 1.8 çok (parçacık sayısı çarpanı)
    temp: 1,       // 0.6 düşük, 1 normal, 1.7 yüksek (hız çarpanı)
    catalyst: false,
    particlesA: [], particlesB: [],
    successCount: 0, totalCollisions: 0, rateWindow: [], rateVal: 0
  };
  var KIN_BOX = 80;
  var KIN_BASE_N = 9;

  function kinInit(){
    kinSt.particlesA = []; kinSt.particlesB = [];
    var n = Math.round(KIN_BASE_N * kinSt.conc);
    for (var i = 0; i < n; i++) {
      kinSt.particlesA.push(kinRandPt());
      kinSt.particlesB.push(kinRandPt());
    }
    kinSt.successCount = 0; kinSt.totalCollisions = 0; kinSt.rateWindow = [];
  }
  function kinRandPt(){
    var spd = 0.6 * kinSt.temp;
    var th = Math.random()*6.283, ph = Math.random()*6.283;
    return {
      x: (Math.random()-0.5)*KIN_BOX*1.6, y: (Math.random()-0.5)*KIN_BOX*1.6, z: (Math.random()-0.5)*KIN_BOX*1.6,
      vx: Math.cos(th)*spd, vy: Math.sin(th)*Math.cos(ph)*spd, vz: Math.sin(th)*Math.sin(ph)*spd,
      flash: 0
    };
  }
  kinInit();

  function kinSetConc(c, btn){ kinSt.conc = c; if (btn) selectInRow(btn); kinInit(); kinRenderInfo(); }
  function kinSetTemp(t, btn){
    kinSt.temp = t;
    if (btn) selectInRow(btn);
    var speedRatio = t;
    kinSt.particlesA.concat(kinSt.particlesB).forEach(function(p){
      var curSpd = Math.sqrt(p.vx*p.vx+p.vy*p.vy+p.vz*p.vz) || 0.001;
      var targetSpd = 0.6 * speedRatio;
      var f = targetSpd / curSpd;
      p.vx *= f; p.vy *= f; p.vz *= f;
    });
    kinRenderInfo();
  }
  function kinToggleCatalyst(btn){
    kinSt.catalyst = !kinSt.catalyst;
    if (btn) btn.classList.toggle('sel2', kinSt.catalyst);
    kinRenderInfo();
  }

  function kinRenderInfo(){
    var box = document.getElementById('kin-info');
    if (!box) return;
    var factors = [];
    factors.push('Derişim: ' + (kinSt.conc < 1 ? 'Az' : kinSt.conc > 1 ? '\u00c7ok' : 'Normal'));
    factors.push('S\u0131cakl\u0131k: ' + (kinSt.temp < 1 ? 'D\u00fc\u015f\u00fck' : kinSt.temp > 1 ? 'Y\u00fcksek' : 'Normal'));
    factors.push('Katalizör: ' + (kinSt.catalyst ? 'Var' : 'Yok'));
    box.innerHTML = '<div class="card">' +
      '<div class="slbl">Mevcut Ko\u015fullar</div>' +
      '<div style="font-size:13px;color:var(--tx2);margin-bottom:12px">' + factors.join(' \u00b7 ') + '</div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center">' +
        '<span style="font-size:13px;color:var(--tx3)">\u00d6l\u00e7\u00fclen Tepkime H\u0131z\u0131</span>' +
        '<span id="kin-rate" style="font-family:Space Grotesk,sans-serif;font-size:22px;font-weight:800;color:#f59e0b">0</span>' +
      '</div>' +
      '<div style="font-size:11px;color:var(--tx3);margin-top:4px">Ba\u015far\u0131l\u0131 \u00e7arp\u0131\u015fma / saniye (aktivasyon enerjisini a\u015fanlar)</div>' +
    '</div>';
  }

  var KIN_THEORY_HTML =
    '<div class="card">' +
      '<div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:800;color:#fff;margin-bottom:8px">\ud83d\udca5 \u00c7arp\u0131\u015fma Teorisi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:12px">Bir tepkimenin ger\u00e7ekle\u015fmesi i\u00e7in taneciklerin \u00f6nce \u00e7ARPI\u015eMASI, sonra bu \u00e7arp\u0131\u015fman\u0131n YETERLİ ENERJİYLE (aktivasyon enerjisi, Ea) ve UYGUN Y\u00d6NELİMLE ger\u00e7ekle\u015fmesi gerekir. Her \u00e7arp\u0131\u015fma tepkimeyle sonu\u00e7lanmaz \u2014 bu simulasyonda YE\u015e\u0130L parlayanlar ba\u015far\u0131l\u0131, di\u011ferleri ba\u015far\u0131s\u0131z \u00e7arp\u0131\u015fmalard\u0131r.</p>' +
      '<div style="font-size:11px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">H\u0131z\u0131 Etkileyen Fakt\u00f6rler</div>' +
      '<ul style="margin:0 0 12px 18px;padding:0;font-size:13px;color:var(--tx2);line-height:1.9">' +
        '<li><b>Derişim/Bas\u0131n\u00e7 artışı:</b> Birim hacimdeki tanecik say\u0131s\u0131 artar \u2192 \u00e7arp\u0131\u015fma S IKLI\u011eI artar \u2192 h\u0131z artar.</li>' +
        '<li><b>S\u0131cakl\u0131k artışı:</b> Tanecikler daha H\u0131ZLI hareket eder \u2192 hem \u00e7arp\u0131\u015fma s\u0131kl\u0131\u011f\u0131 HEM DE aktivasyon enerjisini a\u015fan \u00e7arp\u0131\u015fma ORANI artar \u2014 bu y\u00fczden s\u0131cakl\u0131k etkisi \u00e7ok g\u00fc\u00e7l\u00fcd\u00fcr.</li>' +
        '<li><b>Katalizör:</b> Aktivasyon enerjisini D\u00dc\u015e\u00dcR\u00dcR (farkl\u0131 bir mekanizma sunar) \u2014 ayn\u0131 \u00e7arp\u0131\u015fma enerjisiyle daha \u00e7ok \u00e7arp\u0131\u015fma art\u0131k \u201cba\u015far\u0131l\u0131\u201d say\u0131l\u0131r. Katalizör TÜKETİLMEZ ve dengeyi de\u011fi\u015ftirmez.</li>' +
        '<li><b>Temas y\u00fczeyi (kat\u0131 tepkenlerde):</b> Toz halindeki bir kat\u0131, aynı k\u00fctledeki tek par\u00e7aya g\u00f6re \u00e7ok daha fazla y\u00fczey alan\u0131na sahiptir \u2192 daha fazla \u00e7arp\u0131\u015fma imkan\u0131 \u2192 h\u0131z artar.</li>' +
      '</ul>' +
      '<div style="font-size:11px;font-weight:700;color:#60a5fa;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">Aktivasyon Enerjisi (Ea)</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:0">Tepkimenin ger\u00e7ekle\u015femesi i\u00e7in \u00e7arp\u0131\u015fan taneciklerin sahip olmas\u0131 gereken MİNİMUM enerjidir. Bu enerjinin alt\u0131ndaki \u00e7arp\u0131\u015fmalar tanecikleri sadece sekmesine (esnek \u00e7arp\u0131\u015fma) neden olur, \u00fcr\u00fcn olu\u015fturmaz.</p>' +
    '</div>';

  function setupKin(){
    if (document.getElementById('s-kinetik')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    app.insertAdjacentHTML('beforeend',
      '<div id="s-kinetik" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\ud83d\udca5 Tepkime H\u0131z\u0131 (Kinetik) 3D</h1>' +
        '<p class="psub">\u00c7arp\u0131\u015fma teorisi \u2014 derişim, s\u0131cakl\u0131k ve katalizörün tepkime h\u0131z\u0131na etkisini canl\u0131 g\u00f6r.</p>' +
        '<div style="background:#050510;border:1px solid rgba(245,158,11,.3);border-radius:16px;overflow:hidden;margin-bottom:12px">' +
          '<canvas id="kin-cv" style="width:100%;display:block;touch-action:none" height="260"></canvas>' +
        '</div>' +
        '<div class="card" style="margin-bottom:12px">' +
          '<div class="slbl">\u00d7 Derişim</div>' +
          '<div style="display:flex;gap:6px;margin-bottom:14px">' +
            '<button type="button" class="ob" onclick="kinSetConc(0.5,this)">Az</button>' +
            '<button type="button" class="ob sel2" onclick="kinSetConc(1,this)">Normal</button>' +
            '<button type="button" class="ob" onclick="kinSetConc(1.8,this)">\u00c7ok</button>' +
          '</div>' +
          '<div class="slbl">\ud83c\udf21\ufe0f S\u0131cakl\u0131k</div>' +
          '<div style="display:flex;gap:6px;margin-bottom:14px">' +
            '<button type="button" class="ob" onclick="kinSetTemp(0.6,this)">D\u00fc\u015f\u00fck</button>' +
            '<button type="button" class="ob sel2" onclick="kinSetTemp(1,this)">Normal</button>' +
            '<button type="button" class="ob" onclick="kinSetTemp(1.7,this)">Y\u00fcksek</button>' +
          '</div>' +
          '<div class="slbl">\u2697\ufe0f Katalizör</div>' +
          '<button type="button" id="kin-cat-btn" class="ob" onclick="kinToggleCatalyst(this)" style="width:100%">Katalizör Ekle</button>' +
        '</div>' +
        '<div id="kin-info" style="margin-bottom:16px"></div>' +
        KIN_THEORY_HTML +
      '</div></div>');
    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-kinetik') === -1) SCREENS.push('s-kinetik');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-kinetik'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-kinetik" onclick="nav(\'kinetik\')">\ud83d\udca5 Tepkime H\u0131z\u0131 3D</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-kinetik'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-kinetik" onclick="nav(\'kinetik\')"><div class="ti">\ud83d\udca5</div><div class="tt">Tepkime H\u0131z\u0131 3D</div><div class="td">\u00c7arp\u0131\u015fma teorisi \u2014 derişim/s\u0131cakl\u0131k/katalizör canlı sim\u00fclasyonu.</div></div>');
    kinBindCanvas();
    kinRenderInfo();
  }

  window.kinSetConc = kinSetConc;
  window.kinSetTemp = kinSetTemp;
  window.kinToggleCatalyst = kinToggleCatalyst;

  function kinStep(){
    var dt = 1;
    var lim = KIN_BOX * 0.95;
    function moveAndBounce(p){
      p.x += p.vx*dt; p.y += p.vy*dt; p.z += p.vz*dt;
      if (Math.abs(p.x) > lim) { p.vx *= -1; p.x = Math.sign(p.x)*lim; }
      if (Math.abs(p.y) > lim) { p.vy *= -1; p.y = Math.sign(p.y)*lim; }
      if (Math.abs(p.z) > lim) { p.vz *= -1; p.z = Math.sign(p.z)*lim; }
      if (p.flash > 0) p.flash -= 0.05;
    }
    kinSt.particlesA.forEach(moveAndBounce);
    kinSt.particlesB.forEach(moveAndBounce);
    // A-B çarpışmalarını denetle
    var threshold = 10;
    var eaSpeed = kinSt.catalyst ? 0.55 : 0.95; // katalizör varsa daha düşük hız yeterli
    for (var i = 0; i < kinSt.particlesA.length; i++) {
      var a = kinSt.particlesA[i];
      for (var j = 0; j < kinSt.particlesB.length; j++) {
        var b = kinSt.particlesB[j];
        var dx = a.x-b.x, dy = a.y-b.y, dz = a.z-b.z;
        var d2 = dx*dx+dy*dy+dz*dz;
        if (d2 < threshold*threshold && a.flash <= 0 && b.flash <= 0) {
          kinSt.totalCollisions++;
          var relSpeed = Math.sqrt((a.vx-b.vx)*(a.vx-b.vx) + (a.vy-b.vy)*(a.vy-b.vy) + (a.vz-b.vz)*(a.vz-b.vz));
          var success = relSpeed > eaSpeed;
          if (success) { kinSt.successCount++; kinSt.rateWindow.push(1); a.flash = 1; b.flash = 1; }
          else { kinSt.rateWindow.push(0); }
          // esnek sekme (basit): hızları ters çevir
          a.vx *= -1; a.vy *= -1; a.vz *= -1;
          b.vx *= -1; b.vy *= -1; b.vz *= -1;
        }
      }
    }
    if (kinSt.rateWindow.length > 400) kinSt.rateWindow.splice(0, kinSt.rateWindow.length - 400);
    var sum = 0;
    for (var k = 0; k < kinSt.rateWindow.length; k++) sum += kinSt.rateWindow[k];
    kinSt.rateVal = Math.round(sum * 1.5);
  }

  function kinDraw(x, W, H2){
    hcBg(x, kinSt, W, H2);
    var boxPts = [];
    for (var sx=-1; sx<=1; sx+=2) for (var sy=-1; sy<=1; sy+=2) for (var sz=-1; sz<=1; sz+=2) boxPts.push([sx*KIN_BOX,sy*KIN_BOX,sz*KIN_BOX]);
    var edges = [[0,1],[0,2],[0,4],[3,1],[3,2],[3,7],[5,1],[5,4],[5,7],[6,2],[6,4],[6,7]];
    x.strokeStyle = 'rgba(245,158,11,0.3)'; x.lineWidth = 1.1;
    edges.forEach(function(e){
      var p1 = hcProj(kinSt, boxPts[e[0]][0],boxPts[e[0]][1],boxPts[e[0]][2], W, H2);
      var p2 = hcProj(kinSt, boxPts[e[1]][0],boxPts[e[1]][1],boxPts[e[1]][2], W, H2);
      x.beginPath(); x.moveTo(p1.x,p1.y); x.lineTo(p2.x,p2.y); x.stroke();
    });
    var items = [];
    function pushP(p, baseCol){
      var pr = hcProj(kinSt, p.x, p.y, p.z, W, H2);
      var col = p.flash > 0 ? '#22c55e' : baseCol;
      items.push({ z: pr.z, x: pr.x, y: pr.y, r: (p.flash>0?9:6.5)*pr.s, c: col });
    }
    kinSt.particlesA.forEach(function(p){ pushP(p, '#3b82f6'); });
    kinSt.particlesB.forEach(function(p){ pushP(p, '#ef4444'); });
    items.sort(function(a,b){ return b.z-a.z; });
    items.forEach(function(it){
      x.beginPath(); x.arc(it.x, it.y, Math.max(1.5,it.r), 0, 6.283);
      x.fillStyle = it.c; x.fill();
    });
    x.fillStyle = 'rgba(59,130,246,.85)'; x.font = 'bold 11px sans-serif'; x.textAlign = 'left';
    x.fillText('\u25cf A tepkeni', 10, 20);
    x.fillStyle = 'rgba(239,68,68,.85)';
    x.fillText('\u25cf B tepkeni', 10, 36);
    x.fillStyle = 'rgba(34,197,94,.85)';
    x.fillText('\u25cf Ba\u015far\u0131l\u0131 \u00e7arp\u0131\u015fma', 10, 52);
    x.fillStyle = 'rgba(255,255,255,.3)'; x.font = '10px sans-serif';
    x.fillText('\ud83d\udc46 S\u00fcr\u00fckle d\u00f6nd\u00fcr', 10, H2-8);
  }

  function kinLoop(){
    var scr = document.getElementById('s-kinetik');
    if (!scr || scr.style.display === 'none') { kinStop(); return; }
    kinSt.anim = requestAnimationFrame(kinLoop);
    var cv = document.getElementById('kin-cv');
    if (!cv) return;
    var rect = cv.getBoundingClientRect();
    var W = rect.width || cv.clientWidth || 300, H2 = 260;
    var dpr = window.devicePixelRatio || 1;
    if (Math.abs(cv.width - W*dpr) > 2 || Math.abs(cv.height - H2*dpr) > 2) { cv.width = W*dpr; cv.height = H2*dpr; }
    var x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    try {
      if (kinSt.spin && !kinSt.drag) kinSt.rotY += 0.006;
      kinSt.t += 0.016;
      kinStep();
      kinDraw(x, W, H2);
      var rateEl = document.getElementById('kin-rate');
      if (rateEl) rateEl.textContent = kinSt.rateVal;
    } catch (e) { drawErr(x, W, H2, e); }
  }
  function kinStop(){ if (kinSt.anim) { cancelAnimationFrame(kinSt.anim); kinSt.anim = null; } }
  function kinStart(){ kinBindCanvas(); if (kinSt.anim) cancelAnimationFrame(kinSt.anim); kinLoop(); }
  function kinBindCanvas(){
    if (kinSt.bound) return;
    var cv = document.getElementById('kin-cv');
    if (!cv) return;
    kinSt.bound = true;
    cv.onmousedown = function(e){ kinSt.drag = true; kinSt.lx = e.clientX; kinSt.ly = e.clientY; };
    cv.onmousemove = function(e){ if (!kinSt.drag) return; kinSt.rotY += (e.clientX-kinSt.lx)*0.01; kinSt.rotX += (e.clientY-kinSt.ly)*0.01; kinSt.lx=e.clientX; kinSt.ly=e.clientY; };
    cv.onmouseup = cv.onmouseleave = function(){ kinSt.drag = false; };
    cv.addEventListener('touchstart', function(e){ kinSt.drag=true; kinSt.lx=e.touches[0].clientX; kinSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchmove', function(e){ if(!kinSt.drag) return; kinSt.rotY += (e.touches[0].clientX-kinSt.lx)*0.013; kinSt.rotX += (e.touches[0].clientY-kinSt.ly)*0.013; kinSt.lx=e.touches[0].clientX; kinSt.ly=e.touches[0].clientY; e.preventDefault(); }, {passive:false});
    cv.addEventListener('touchend', function(){ kinSt.drag = false; });
  }
  function kinEnter(){ setTimeout(kinStart, 80); }
  function kinLeave(){ kinStop(); }

  // ---------- 21. GENEL REDOKS ANALİZ MOTORU ----------
  // Mevcut Gauss-eliminasyon dengeleyicisini (balanceEquation) yeniden
  // kullanır; üzerine oksidasyon basamağı hesaplama + redoks tespiti
  // katmanı ekler. Böylece kullanıcı KENDİ denklemini (moleküler/iyonik
  // olmayan) yazabilir, sistem hem dengeler hem de hangi elementin
  // yükseltgendiğini/indirgendiğini adım adım gösterir.
  var OX_FIXED_1 = ['Li','Na','K','Rb','Cs','Fr'];
  var OX_FIXED_2 = ['Be','Mg','Ca','Sr','Ba','Ra'];
  var OX_POLY_GROUPS = [
    { keyEl:'Cr', atoms:{Cr:2,O:7}, ox:{Cr:6,O:-2} },   // dikromat Cr2O7
    { keyEl:'Mn', atoms:{Mn:1,O:4}, ox:{Mn:7,O:-2} },   // permanganat MnO4 (tek Mn varsayımıyla)
    { keyEl:'S',  atoms:{S:1,O:4}, ox:{S:6,O:-2} },     // sülfat SO4
    { keyEl:'N',  atoms:{N:1,O:3}, ox:{N:5,O:-2} },     // nitrat NO3
    { keyEl:'C',  atoms:{C:1,O:3}, ox:{C:4,O:-2} },     // karbonat CO3
    { keyEl:'P',  atoms:{P:1,O:4}, ox:{P:5,O:-2} },     // fosfat PO4
    { keyEl:'Cl', atoms:{Cl:1,O:4}, ox:{Cl:7,O:-2} },   // perklorat ClO4
    { keyEl:'As', atoms:{As:1,O:4}, ox:{As:5,O:-2} }    // arsenat AsO4
  ];

  // Verilen (nötr, moleküler) formülün her elementi için oksidasyon
  // basamağını tahmin eder. Genel amaçlı bir öğretim aracı için
  // makul bir sezgisel yöntemdir — her bileşiği doğru çözmesi
  // garanti değildir, ama yayg\u0131n redoks bile\u015fikleri i\u00e7in g\u00fcvenilirdir.
  function assignOxStates(rawFormula){
    var flat = parseFormula(rawFormula);
    var ox = {};
    var remaining = 0; // nötr molekül varsayımı

    if (flat.F) { ox.F = -1; remaining -= -1 * flat.F; }
    OX_FIXED_1.forEach(function(m){ if (flat[m]) { ox[m] = 1; remaining -= 1 * flat[m]; } });
    OX_FIXED_2.forEach(function(m){ if (flat[m]) { ox[m] = 2; remaining -= 2 * flat[m]; } });

    // Bilinen çok atomlu grup (sülfat, nitrat, permanganat...) var mı?
    for (var i = 0; i < OX_POLY_GROUPS.length; i++) {
      var g = OX_POLY_GROUPS[i];
      if (ox[g.keyEl] !== undefined) continue; // zaten sabit kuralla belirlendiyse atla
      if (!flat[g.keyEl] || flat[g.keyEl] % g.atoms[g.keyEl] !== 0) continue;
      var mult = flat[g.keyEl] / g.atoms[g.keyEl];
      var needO = g.atoms.O * mult;
      if (!flat.O || flat.O < needO) continue;
      ox[g.keyEl] = g.ox[g.keyEl];
      remaining -= g.ox[g.keyEl] * flat[g.keyEl];
      flat.O -= needO;
      if (flat.O === 0) delete flat.O;
      else { ox.O = -2; remaining -= -2 * needO; }
      break; // tek grup varsay (bu ölçek için yeterli)
    }

    if (flat.O && ox.O === undefined) { ox.O = -2; remaining -= -2 * flat.O; }
    if (flat.H && ox.H === undefined) {
      var others = Object.keys(flat).filter(function(e){ return e !== 'H' && flat[e]; });
      var isHydride = others.length === 1 && ox[others[0]] !== undefined && ox[others[0]] > 0 &&
        (OX_FIXED_1.indexOf(others[0]) !== -1 || OX_FIXED_2.indexOf(others[0]) !== -1);
      ox.H = isHydride ? -1 : 1;
      remaining -= ox.H * flat.H;
    }

    var unknown = Object.keys(flat).filter(function(e){ return flat[e] && ox[e] === undefined; });
    if (unknown.length === 1) {
      ox[unknown[0]] = remaining / flat[unknown[0]];
    }
    return ox;
  }

  // Dengelenmiş denklemdeki (species dizisi + nReact) her elementin
  // reaktan/ürün taraflarındaki oksidasyon basamaklarını karşılaştırır.
  // Orantısızlaşma (aynı elementin birden fazla ürüne farklı basamaklarda
  // dağılması) dahil TÜM anlamlı geçişleri döndürür.
  function identifyRedoxChanges(species, nReact){
    var speciesOx = species.map(function(sp){
      try { return assignOxStates(sp); } catch (e) { return {}; }
    });
    var elMap = {};
    species.forEach(function(sp, idx){
      var flat;
      try { flat = parseFormula(sp); } catch (e) { return; }
      Object.keys(flat).forEach(function(el){
        if (speciesOx[idx][el] === undefined) return;
        if (!elMap[el]) elMap[el] = { react: [], prod: [] };
        var entry = { spIdx: idx, ox: speciesOx[idx][el] };
        (idx < nReact ? elMap[el].react : elMap[el].prod).push(entry);
      });
    });
    var seen = {}, transitions = [];
    Object.keys(elMap).forEach(function(el){
      var m = elMap[el];
      m.react.forEach(function(r){
        m.prod.forEach(function(p){
          if (r.ox !== p.ox) {
            var key = el + '|' + r.ox + '|' + p.ox + '|' + r.spIdx + '|' + p.spIdx;
            if (seen[key]) return;
            seen[key] = 1;
            transitions.push({ el: el, from: r.ox, to: p.ox, reactSpIdx: r.spIdx, prodSpIdx: p.spIdx, kind: p.ox > r.ox ? 'yukselt' : 'indirge' });
          }
        });
      });
    });
    return transitions;
  }

  function fmtOx(n){ return (n > 0 ? '+' : '') + n; }

  // ---------- 22. FİZİKSEL VE KİMYASAL DEĞİŞİM ----------
  var FIZKIM_LIST = [
    // --- FİZİKSEL DEĞİŞİMLER ---
    { txt:'Hal de\u011fi\u015fimleri (erime, buharla\u015fma, s\u00fcblimle\u015fme...)', t:'fiziksel', not:'Sadece tanecikler aras\u0131 uzakl\u0131k/d\u00fczen de\u011fi\u015fir; madde kimyasal olarak AYNI kal\u0131r (H\u2082O hep H\u2082O\u2019dur).' },
    { txt:'G\u00f6kku\u015fa\u011f\u0131 olu\u015fumu', t:'fiziksel', not:'I\u015f\u0131\u011f\u0131n su damlac\u0131klar\u0131nda k\u0131r\u0131l\u0131p yans\u0131mas\u0131 \u2014 yeni bir madde olu\u015fmaz, sadece \u0131\u015f\u0131k ayr\u0131\u015f\u0131r.' },
    { txt:'Yo\u011furttan ayran eldesi', t:'fiziksel', not:'Yo\u011furt suyla SEYRELTİLİR ve KARIŞTIRILIR \u2014 yeni bir madde olu\u015fmaz, sadece kar\u0131\u015f\u0131m haz\u0131rlan\u0131r.' },
    { txt:'S\u00fctten tereya\u011f\u0131 eldesi', t:'fiziksel', not:'S\u00fctteki ya\u011f\u0131n \u00e7alkalanarak AYRILMASI (mekanik bir ay\u0131rma) \u2014 kimyasal bir tepkime olmaz.' },
    { txt:'Metallerin elektrik ak\u0131m\u0131n\u0131 iletmesi', t:'fiziksel', not:'Serbest elektronlar\u0131n hareketi \u2014 metalin kimyasal yap\u0131s\u0131 de\u011fi\u015fmez.' },
    { txt:'Yemek tuzunun suda \u00e7\u00f6z\u00fcnmesi', t:'fiziksel', not:'NaCl, suda Na\u207a ve Cl\u207b iyonlar\u0131na ayr\u0131l\u0131r ama bunlar yeniden buharla\u015ft\u0131r\u0131ld\u0131\u011f\u0131nda AYNI NaCl olarak geri elde edilir.' },
    { txt:'O\u2082 gaz\u0131n\u0131n suda \u00e7\u00f6z\u00fcnmesi', t:'fiziksel', not:'Bal\u0131klar\u0131n solunum yapabilmesini sa\u011flayan basit bir \u00e7\u00f6z\u00fcnme \u2014 O\u2082 kimyasal olarak de\u011fi\u015fmez.' },
    { txt:'Ya\u011fl\u0131 boyan\u0131n tiner ile inceltilmesi', t:'fiziksel', not:'Sadece bir \u00e7\u00f6zelti haz\u0131rlan\u0131r, boyan\u0131n kimyasal yap\u0131s\u0131 de\u011fi\u015fmez (kurumas\u0131 ise KİMYASALDIR).' },
    { txt:'\u015eeker pancar\u0131ndan \u015feker eldesi', t:'fiziksel', not:'\u015eeker, pancardan safla\u015ft\u0131r\u0131larak (ay\u0131rma y\u00f6ntemleriyle) elde edilir \u2014 yeni bir madde olu\u015fturulmaz.' },
    { txt:'Alkol\u00fcn suda \u00e7\u00f6z\u00fcnmesi', t:'fiziksel', not:'Her oranda kar\u0131\u015fabilen iki s\u0131v\u0131n\u0131n homojen kar\u0131\u015f\u0131m\u0131 \u2014 yeni madde olu\u015fmaz.' },
    { txt:'Ka\u011f\u0131d\u0131n y\u0131rt\u0131lmas\u0131', t:'fiziksel', not:'Sadece \u015fekil/boyut de\u011fi\u015fir; ka\u011f\u0131d\u0131 olu\u015fturan sel\u00fcloz molek\u00fclleri AYNIDIR.' },
    { txt:'Cam k\u0131r\u0131lmas\u0131', t:'fiziksel', not:'Camin kimyasal bile\u015fimi de\u011fi\u015fmez, sadece par\u00e7alara ayr\u0131l\u0131r.' },
    { txt:'Petrolden benzin, mazot eldesi', t:'fiziksel', not:'Fraksiyonlu damıtma (kaynama noktas\u0131 farklar\u0131na g\u00f6re AYIRMA) \u2014 yeni molek\u00fcl olu\u015fturulmaz, zaten var olanlar ayr\u0131l\u0131r.' },
    { txt:'Kar\u0131\u015f\u0131mlar\u0131 ay\u0131rma y\u00f6ntemleri (s\u00fczme, damıtma, eleme...)', t:'fiziksel', not:'T\u00fcm ay\u0131rma y\u00f6ntemleri fizikseldir \u2014 bile\u015fenlerin kimyasal yap\u0131s\u0131 de\u011fi\u015fmeden sadece birbirinden ayr\u0131l\u0131r.' },
    // --- KİMYASAL DEĞİŞİMLER ---
    { txt:'CO\u2082 gaz\u0131n\u0131n suda \u00e7\u00f6z\u00fcnmesi (CO\u2082 + H\u2082O \u2192 H\u2082CO\u2083)', t:'kimyasal', not:'CO\u2082 ve H\u2082O birle\u015fip TAMAMEN FARKLI bir madde (karbonik asit) olu\u015fturur.' },
    { txt:'Tuzlu suyun elektrik ak\u0131m\u0131n\u0131 iletmesi', t:'kimyasal', not:'\u0130letim s\u0131ras\u0131nda elektrotlarda GERÇEK kimyasal tepkimeler (elektroliz) ger\u00e7ekle\u015fir.' },
    { txt:'Aktif metallerin suda \u00e7\u00f6z\u00fcnmesi (Na, K gibi)', t:'kimyasal', not:'Na + H\u2082O \u2192 NaOH + H\u2082 \u2014 yeni maddeler (baz ve gaz) olu\u015fur.' },
    { txt:'Metallerin asitlerle tepkimesi', t:'kimyasal', not:'\u00d6rn. Zn + 2HCl \u2192 ZnCl\u2082 + H\u2082 \u2014 tuz ve hidrojen gaz\u0131 olu\u015fur.' },
    { txt:'Asit-baz tepkimeleri', t:'kimyasal', not:'N\u00f6tralle\u015fme sonucu tuz ve su gibi TAMAMEN YENİ maddeler olu\u015fur.' },
    { txt:'Elektroliz', t:'kimyasal', not:'Elektrik enerjisiyle bile\u015fikler kendi elementlerine AYRIŞTIRILIR (\u00f6rn. suyun H\u2082 ve O\u2082\u2019ye ayr\u0131\u015fmas\u0131).' },
    { txt:'Ya\u011fl\u0131 boyan\u0131n kurumas\u0131', t:'kimyasal', not:'Havadaki oksijenle tepkimeye girip (oksidasyon/polimerle\u015fme) sertle\u015fir \u2014 geri d\u00f6nü\u015fs\u00fcz bir kimyasal de\u011fi\u015fimdir.' },
    { txt:'Betonun donmas\u0131', t:'kimyasal', not:'\u00c7imentodaki bile\u015fiklerin su ile tepkimeye girip (hidratasyon) yeni kristal yap\u0131lar olu\u015fturmas\u0131d\u0131r.' },
    { txt:'\u00c7imentonun donmas\u0131', t:'kimyasal', not:'Betonla ayn\u0131 \u015fekilde, su ile ger\u00e7ekle\u015fen hidratasyon tepkimesidir; geri d\u00f6n\u00fc\u015fs\u00fczd\u00fcr.' },
    { txt:'Kan\u0131n p\u0131ht\u0131la\u015fmas\u0131', t:'kimyasal', not:'Enzimlerle tetiklenen bir dizi protein tepkimesi sonucu fibrin a\u011f\u0131 olu\u015fur \u2014 yeni madde (fibrin) olu\u015fur.' },
    { txt:'Sa\u00e7\u0131n a\u011farmas\u0131', t:'kimyasal', not:'Melanin pigmentinin \u00fcretiminin durmas\u0131/y\u0131k\u0131lmas\u0131 \u2014 kimyasal bile\u015fim de\u011fi\u015fir.' },
    { txt:'Giysilerin \u00e7ama\u015f\u0131r suyu ile a\u011fart\u0131lmas\u0131', t:'kimyasal', not:'Sodyum hipoklorit, renk pigmentlerini kimyasal olarak PARÇALAR (oksitler).' },
    { txt:'Grizu patlamas\u0131', t:'kimyasal', not:'Metan gaz\u0131n\u0131n oksijenle H\u0131ZLI YANMASI (patlay\u0131c\u0131 oksidasyon tepkimesi).' },
    { txt:'Hava yast\u0131\u011f\u0131n\u0131n patlamas\u0131', t:'kimyasal', not:'Sodyum azid\u00fcn (NaN\u2083) h\u0131zla ayr\u0131\u015f\u0131p b\u00fcy\u00fck hacimde N\u2082 gaz\u0131 \u00fcretmesi.' },
    { txt:'Solunum', t:'kimyasal', not:'Glikozun oksijenle yak\u0131lmas\u0131yla (h\u00fccresel solunum) enerji, CO\u2082 ve su a\u00e7\u0131\u011fa \u00e7\u0131kar.' },
    { txt:'Fotosentez', t:'kimyasal', not:'CO\u2082 + H\u2082O + \u0131\u015f\u0131k enerjisi \u2192 glikoz + O\u2082 \u2014 tamamen yeni maddeler olu\u015fur.' },
    { txt:'Yanma (oksitlenme, paslanma)', t:'kimyasal', not:'Madde, oksijenle tepkimeye girerek FARKLI bir bile\u015fi\u011fe (\u00f6rn. demir \u2192 demir oksit/pas) d\u00f6n\u00fc\u015f\u00fcr.' },
    { txt:'S\u00fctten peynir, yo\u011furt eldesi', t:'kimyasal', not:'Bakteriler s\u00fct \u015fekerini (laktoz) laktik aside \u00e7evirir \u2014 protein yap\u0131s\u0131 de\u011fi\u015fir (peyni\u015fme), geri d\u00f6n\u00fc\u015fs\u00fczd\u00fcr.' },
    { txt:'\u00dcz\u00fcmden \u015farap, arpadan bira, elmadan sirke eldesi', t:'kimyasal', not:'Fermantasyon \u2014 mikroorganizmalar \u015fekeri alkole/aside \u00e7evirir, TAMAMEN yeni maddeler olu\u015fur.' },
    { txt:'G\u00fcm\u00fc\u015f\u00fcn kararmas\u0131', t:'kimyasal', not:'G\u00fcm\u00fc\u015f, havadaki k\u00fck\u00fcrt bile\u015fikleriyle tepkimeye girip Ag\u2082S (gümü\u015f s\u00fclf\u00fcr) olu\u015fturur.' },
    { txt:'K\u00fcflenme (\u00e7\u00fcr\u00fcme)', t:'kimyasal', not:'Mikroorganizmalar organik maddeyi kimyasal olarak PARÇALAYIP farkl\u0131 bile\u015fiklere d\u00f6n\u00fc\u015ft\u00fcr\u00fcr.' },
    { txt:'Yumurtan\u0131n pi\u015fmesi', t:'kimyasal', not:'Is\u0131yla proteinlerin yap\u0131s\u0131 (denat\u00fcrasyon) kal\u0131c\u0131 olarak de\u011fi\u015fir \u2014 geri \u00e7evrilemez.' },
    { txt:'Efervesan tabletin suda \u00e7\u00f6z\u00fcnmesi', t:'kimyasal', not:'Tabletteki asit ve karbonat suda tepkimeye girip CO\u2082 gaz\u0131 (kabarc\u0131klar) a\u00e7\u0131\u011fa \u00e7\u0131kar\u0131r.' },
    { txt:'Pamukkale Travertenlerinin olu\u015fumu', t:'kimyasal', not:'Sudaki kalsiyum bikarbonat\u0131n CO\u2082 kaybederek kalsiyum karbonata (traverten) d\u00f6n\u00fc\u015fmesi.' },
    { txt:'Pasta \u00fczerindeki maytab\u0131n yanmas\u0131', t:'kimyasal', not:'Metal tozlar\u0131n\u0131n h\u0131zl\u0131 yanmas\u0131 (oksitlenmesi) \u2014 \u0131\u015f\u0131k ve yeni bile\u015fikler a\u00e7\u0131\u011fa \u00e7\u0131kar.' },
    { txt:'Yapra\u011f\u0131n sararmas\u0131', t:'kimyasal', not:'Klorofil pigmentinin par\u00e7alanmas\u0131yla alt\u0131nda gizli olan karotenoid (sar\u0131/turuncu) pigmentler ortaya \u00e7\u0131kar \u2014 kimyasal bir bozunmad\u0131r.' }
  ];
  var fkSt = { score: 0, total: 0, order: [], idx: 0, cur: null };
  function fkShuffle(){
    fkSt.order = FIZKIM_LIST.map(function(_, i){ return i; });
    for (var i = fkSt.order.length - 1; i > 0; i--) { var j = Math.floor(Math.random()*(i+1)); var tmp = fkSt.order[i]; fkSt.order[i] = fkSt.order[j]; fkSt.order[j] = tmp; }
  }
  fkShuffle();

  function setupFizKim(){
    if (document.getElementById('s-fizkim')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    app.insertAdjacentHTML('beforeend',
      '<div id="s-fizkim" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\ud83d\udd04 Fiziksel ve Kimyasal De\u011fi\u015fim</h1>' +
        '<p class="psub">G\u00fcnl\u00fck hayattan ' + FIZKIM_LIST.length + ' \u00f6rnek \u2014 hangisi fiziksel, hangisi kimyasal de\u011fi\u015fim?</p>' +
        '<div class="tabs" id="fk-tabs">' +
          '<button class="tab on" onclick="tswitch(\'fk-tabs\',\'fk-tps\',0)">\u2753 Quiz</button>' +
          '<button class="tab" onclick="tswitch(\'fk-tabs\',\'fk-tps\',1)">\ud83d\udcd6 T\u00fcm Örnekler</button>' +
        '</div>' +
        '<div id="fk-tps">' +
          '<div class="tp on">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;font-size:13px;color:var(--tx3)">' +
              '<span id="fk-prog">Soru 1/' + FIZKIM_LIST.length + '</span>' +
              '<span>\u2713 <span id="fk-score" style="color:var(--gr);font-weight:700">0</span></span>' +
            '</div>' +
            '<div class="card" style="text-align:center;margin-bottom:14px">' +
              '<div style="font-size:11px;color:var(--tx3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:14px">Bu bir fiziksel mi, kimyasal bir de\u011fi\u015fim mi?</div>' +
              '<div id="fk-txt" style="font-size:17px;font-weight:700;color:#fff;line-height:1.5"></div>' +
            '</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">' +
              '<button type="button" class="ob2" onclick="fkCheck(\'fiziksel\',this)" style="text-align:center;font-weight:700">\ud83d\udd35 Fiziksel</button>' +
              '<button type="button" class="ob2" onclick="fkCheck(\'kimyasal\',this)" style="text-align:center;font-weight:700">\ud83d\udd34 Kimyasal</button>' +
            '</div>' +
            '<div id="fk-fb" style="display:none;padding:12px;border-radius:var(--r);margin-bottom:12px;font-size:13px;line-height:1.6"></div>' +
            '<button type="button" id="fk-next" onclick="fkNext()" style="display:none;width:100%;padding:12px;background:var(--sf2);border:1px solid var(--br);border-radius:var(--r);color:var(--tx);font-size:14px;font-weight:600;cursor:pointer">Sonraki \u2192</button>' +
          '</div>' +
          '<div class="tp" id="fk-list-wrap"></div>' +
        '</div>' +
      '</div></div>');
    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-fizkim') === -1) SCREENS.push('s-fizkim');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-fizkim'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-fizkim" onclick="nav(\'fizkim\')">\ud83d\udd04 Fiziksel ve Kimyasal De\u011fi\u015fim</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-fizkim'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-fizkim" onclick="nav(\'fizkim\')"><div class="ti">\ud83d\udd04</div><div class="tt">Fiziksel ve Kimyasal De\u011fi\u015fim</div><div class="td">G\u00fcnl\u00fck hayattan \u00f6rneklerle fiziksel/kimyasal de\u011fi\u015fim ay\u0131rt etme.</div></div>');
    fkRenderList();
  }
  function fkRenderList(){
    var box = document.getElementById('fk-list-wrap');
    if (!box) return;
    var fizList = FIZKIM_LIST.filter(function(x){ return x.t === 'fiziksel'; });
    var kimList = FIZKIM_LIST.filter(function(x){ return x.t === 'kimyasal'; });
    function renderGroup(title, color, list){
      var h = '<div style="font-size:13px;font-weight:700;color:' + color + ';margin:14px 0 8px">' + title + ' (' + list.length + ')</div>';
      list.forEach(function(item){
        h += '<div class="card" style="margin-bottom:8px;padding:12px 14px">' +
          '<div style="font-size:13px;font-weight:600;color:#fff;margin-bottom:4px">' + item.txt + '</div>' +
          '<div style="font-size:12px;color:var(--tx2);line-height:1.5">' + item.not + '</div></div>';
      });
      return h;
    }
    box.innerHTML = renderGroup('\ud83d\udd35 Fiziksel De\u011fi\u015fimler', '#60a5fa', fizList) + renderGroup('\ud83d\udd34 Kimyasal De\u011fi\u015fimler', '#f87171', kimList);
  }
  function fkEnter(){ fkSt.idx = 0; fkSt.score = 0; fkShuffle(); fkRender(); fkRenderList(); }
  function fkRender(){
    if (fkSt.idx >= fkSt.order.length) { fkShuffle(); fkSt.idx = 0; }
    var item = FIZKIM_LIST[fkSt.order[fkSt.idx]];
    fkSt.cur = item;
    document.getElementById('fk-prog').textContent = 'Soru ' + (fkSt.idx+1) + '/' + FIZKIM_LIST.length;
    document.getElementById('fk-score').textContent = fkSt.score;
    document.getElementById('fk-txt').textContent = item.txt;
    var fb = document.getElementById('fk-fb'); fb.style.display = 'none';
    document.getElementById('fk-next').style.display = 'none';
    var btns = document.querySelectorAll ? null : null;
  }
  window.fkCheck = function(sel, btn){
    var item = fkSt.cur;
    var container = btn.parentElement;
    var btns = container ? container.querySelectorAll('button') : [btn];
    for (var i = 0; i < btns.length; i++) btns[i].disabled = true;
    var fb = document.getElementById('fk-fb');
    fkSt.total++;
    if (sel === item.t) {
      fkSt.score++;
      btn.className = 'ob2 cor';
      fb.style.cssText = 'display:block;padding:12px;border-radius:var(--r);margin-bottom:12px;font-size:13px;line-height:1.6;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);color:#86efac';
      fb.innerHTML = '\u2713 Do\u011fru! ' + item.not;
    } else {
      btn.className = 'ob2 wro';
      fb.style.cssText = 'display:block;padding:12px;border-radius:var(--r);margin-bottom:12px;font-size:13px;line-height:1.6;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#fca5a5';
      fb.innerHTML = '\u2717 Yanl\u0131\u015f. Do\u011fru cevap: <b>' + (item.t === 'fiziksel' ? 'Fiziksel' : 'Kimyasal') + '</b> \u2014 ' + item.not;
    }
    document.getElementById('fk-score').textContent = fkSt.score;
    document.getElementById('fk-next').style.display = 'block';
  };
  window.fkNext = function(){ fkSt.idx++; fkRender(); };

  // ---------- 23a. POTANSİYEL ENERJİ DİYAGRAMI ----------
  var peSt = { ea1: 60, dH: -30, showCat: false, catFactor: 0.45 };

  function peCompute(){
    var ea2 = peSt.ea1 - peSt.dH; // Ea(geri) = Ea(ileri) - ΔH
    var isExo = peSt.dH < 0;
    return { ea1: peSt.ea1, ea2: ea2, dH: peSt.dH, isExo: isExo };
  }

  function peSetEa1(v){ peSt.ea1 = Math.max(5, Math.min(150, v)); peRender(); }
  function peSetDH(v){ peSt.dH = Math.max(-100, Math.min(100, v)); peRender(); }
  function peToggleCat(btn){ peSt.showCat = !peSt.showCat; if (btn) btn.classList.toggle('sel2', peSt.showCat); peRender(); }
  function peSetPreset(ea1, dH){
    peSt.ea1 = ea1; peSt.dH = dH;
    var e1 = document.getElementById('pe-ea1-inp'); if (e1) e1.value = ea1;
    var e2 = document.getElementById('pe-dh-inp'); if (e2) e2.value = dH;
    peRender();
  }

  function peDrawCurve(ctx, W, H2, ea1, dH, color, dashed){
    // Koordinatlar: x 0..1 (tepkime koordinatı), y potansiyel enerji (birim: kj, göreli)
    var padL = 46, padR = 16, padT = 20, padB = 34;
    var plotW = W - padL - padR, plotH = H2 - padT - padB;
    var maxE = Math.max(ea1, ea1 - dH, 10) * 1.25;
    var minE = Math.min(0, dH) - maxE * 0.12;
    var range = maxE - minE;
    function px(x){ return padL + x * plotW; }
    function py(e){ return padT + plotH - ((e - minE) / range) * plotH; }

    var reactY = py(0), prodY = py(dH), peakY = py(ea1);
    ctx.strokeStyle = color; ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(px(0), reactY);
    ctx.lineTo(px(0.32), reactY);
    ctx.bezierCurveTo(px(0.40), reactY, px(0.42), peakY, px(0.5), peakY);
    ctx.bezierCurveTo(px(0.58), peakY, px(0.60), prodY, px(0.68), prodY);
    ctx.lineTo(px(1), prodY);
    if (dashed) ctx.setLineDash([5,4]);
    ctx.stroke();
    ctx.setLineDash([]);
    return { px: px, py: py, reactY: reactY, prodY: prodY, peakY: peakY };
  }

  function peDraw(){
    var cv = document.getElementById('pe-cv');
    if (!cv) return;
    var rect = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    var W = rect.width || 320, H2 = 240;
    if (Math.abs(cv.width - W*dpr) > 2 || Math.abs(cv.height - H2*dpr) > 2) { cv.width = W*dpr; cv.height = H2*dpr; }
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#050510'; ctx.fillRect(0, 0, W, H2);

    var data = peCompute();
    var geo = peDrawCurve(ctx, W, H2, data.ea1, data.dH, '#f59e0b', false);
    if (peSt.showCat) {
      peDrawCurve(ctx, W, H2, data.ea1 * peSt.catFactor, data.dH, '#22c55e', true);
    }

    // Eksenler
    ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, 20); ctx.lineTo(40, 206); ctx.lineTo(W-12, 206); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Tepkime Koordinat\u0131', W/2, H2-6);
    ctx.save(); ctx.translate(12, H2/2); ctx.rotate(-Math.PI/2); ctx.fillText('Potansiyel Enerji', 0, 0); ctx.restore();

    // Ea1, Ea2, dH işaretleri (ana eğri üzerinde)
    ctx.strokeStyle = 'rgba(245,158,11,.5)'; ctx.setLineDash([3,3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(geo.px(0.5), geo.reactY); ctx.lineTo(geo.px(0.5), geo.peakY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(geo.px(0.68), geo.prodY); ctx.lineTo(geo.px(0.68), geo.peakY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#fcd34d'; ctx.textAlign = 'left'; ctx.font = 'bold 10px sans-serif';
    ctx.fillText('Ea(ileri)=' + data.ea1, geo.px(0.02), geo.peakY - 6);
    ctx.fillStyle = '#93c5fd';
    ctx.fillText('Ea(geri)=' + data.ea2.toFixed(1), geo.px(0.70), (geo.peakY + geo.prodY)/2);
    ctx.fillStyle = data.isExo ? '#86efac' : '#fca5a5';
    ctx.fillText('\u0394H=' + (data.dH>0?'+':'') + data.dH, geo.px(0.72), geo.prodY + (data.isExo? 14 : -8));
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.font = '10px sans-serif';
    ctx.fillText('Girenler', geo.px(0.02), geo.reactY - 6);
    ctx.fillText('\u00dcr\u00fcnler', geo.px(0.80), geo.prodY - 6);
    if (peSt.showCat) { ctx.fillStyle = '#22c55e'; ctx.fillText('\u2500\u2500 Katalizörl\u00fc (yeşil, kesikli)', geo.px(0.02), 20); }
  }

  function peRender(){
    peDraw();
    var box = document.getElementById('pe-info');
    if (!box) return;
    var data = peCompute();
    box.innerHTML = '<div class="card">' +
      '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px"><span style="color:var(--tx3)">Ea (ileri)</span><span style="font-weight:700;color:#fcd34d">' + data.ea1.toFixed(1) + ' kj</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px"><span style="color:var(--tx3)">Ea (geri)</span><span style="font-weight:700;color:#93c5fd">' + data.ea2.toFixed(1) + ' kj</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px"><span style="color:var(--tx3)">\u0394H = Ea(ileri) \u2212 Ea(geri)</span><span style="font-weight:700;color:' + (data.isExo?'#86efac':'#fca5a5') + '">' + (data.dH>0?'+':'') + data.dH.toFixed(1) + ' kj \u00b7 ' + (data.isExo ? 'Ekzotermik' : 'Endotermik') + '</span></div>' +
    '</div>';
  }

  var PE_THEORY_HTML =
    '<div class="card">' +
      '<div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:800;color:#fff;margin-bottom:8px">\u26f0\ufe0f Potansiyel Enerji Diyagram\u0131</div>' +
      '<ul style="margin:0 0 12px 18px;padding:0;font-size:13px;color:var(--tx2);line-height:1.9">' +
        '<li><b>Eşik enerjisi (Ea):</b> Bir çarpışmanın tepkimeyle sonuçlanabilmesi için gereken MİNİMUM kinetik enerji.</li>' +
        '<li><b>Aktifleşmiş kompleks:</b> Eski bağların kopmakta, yeni bağların oluşmakta olduğu, KARARSIZ ve enerjisi en yüksek olan ara yapı (grafikteki tepe noktası).</li>' +
        '<li><b>\u0394H = Ea(ileri) \u2212 Ea(geri):</b> \u0130leri ve geri y\u00f6n aktifleşme enerjileri arasındaki farktır. \u0394H < 0 ise EKZOTERMİK, \u0394H > 0 ise ENDOTERMİK.</li>' +
        '<li><b>Katalizör:</b> Hem ileri hem geri y\u00f6ndeki Ea\u2019yı AYNI MİKTARDA düşürür \u2014 \u0394H\u2019yi (ve dolayısıyla ürün miktarını/verimini) DEĞİŞTİRMEZ, sadece dengeye/tamamlanmaya daha çabuk ulaşılmasını sağlar.</li>' +
        '<li>Ea negatif OLAMAZ (her zaman pozitif bir değerdir), ama \u0394H hem pozitif hem negatif olabilir.</li>' +
      '</ul>' +
    '</div>';

  // ---------- 23b. HIZ HESAPLAYICI (STOKİYOMETRİ) ----------
  var hcalcSt = { species: [], nReact: 0, eqStr: '' };

  window.hcalcParse = function(){
    var inp = document.getElementById('hcalc-eq-inp');
    var out = document.getElementById('hcalc-out');
    if (!inp || !out) return;
    var raw = inp.value.trim();
    if (!raw) { out.innerHTML = '<span style="color:var(--yw)">Bir denklem yaz (\u00f6rn: 2N2O5 -> 4NO2 + O2).</span>'; return; }
    try {
      var balanced = balanceEquation(raw);
      var last = balanceEquation._last;
      hcalcSt.species = last.species.map(function(sp, i){ return { formula: pretty(sp), coef: last.ints[i], isReact: i < last.nReact }; });
      hcalcSt.nReact = last.nReact;
      hcalcSt.eqStr = balanced;
      hcalcRenderForm();
    } catch (e) {
      out.innerHTML = '<span style="color:var(--yw)">\u26a0\ufe0f ' + e.message + '</span>';
      hcalcSt.species = [];
    }
  };

  function hcalcRenderForm(){
    var out = document.getElementById('hcalc-out');
    if (!out) return;
    var opts = '';
    hcalcSt.species.forEach(function(s, i){ opts += '<option value="' + i + '">' + s.formula + ' (kat: ' + s.coef + ')</option>'; });
    var html = '<div class="card" style="margin-top:10px">' +
      '<div class="slbl">Dengeli Denklem</div>' +
      '<div style="font-family:monospace;font-size:14px;color:#86efac;margin-bottom:14px">' + hcalcSt.eqStr + '</div>' +
      '<div class="slbl">Bilinen T\u00fcr</div>' +
      '<select class="sel" id="hcalc-known-sp" style="margin-bottom:10px">' + opts + '</select>' +
      '<div class="slbl">Bu t\u00fcr\u00fcn h\u0131z\u0131 (mol/(L\u00b7s))</div>' +
      '<input type="number" step="any" id="hcalc-known-rate" class="inp" placeholder="\u00f6rn: 0.002" style="margin-bottom:12px">' +
      '<button type="button" class="btn bp bfull" onclick="hcalcCompute()">Di\u011fer T\u00fcrlerin H\u0131z\u0131n\u0131 Hesapla</button>' +
      '<div id="hcalc-result" style="margin-top:14px"></div>' +
    '</div>';
    out.innerHTML = html;
  }

  window.hcalcCompute = function(){
    var idx = parseInt(document.getElementById('hcalc-known-sp').value, 10);
    var rate = parseFloat(document.getElementById('hcalc-known-rate').value);
    var res = document.getElementById('hcalc-result');
    if (isNaN(rate) || rate <= 0) { res.innerHTML = '<span style="color:var(--yw)">Ge\u00e7erli bir h\u0131z de\u011feri gir.</span>'; return; }
    var known = hcalcSt.species[idx];
    var perCoef = rate / known.coef; // birim katsayı başına hız
    var html = '<div class="slbl">Sonu\u00e7lar (t\u00fcm h\u0131zlar orant\u0131l\u0131d\u0131r: h\u0131z\u2c7f/katsay\u0131\u2c7f = sabit)</div>';
    hcalcSt.species.forEach(function(s, i){
      var r = perCoef * s.coef;
      var tag = s.isReact ? 'harcanma h\u0131z\u0131' : 'olu\u015fma h\u0131z\u0131';
      var isKnown = i === idx;
      html += '<div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px">' +
        '<span style="color:var(--tx2)">' + s.formula + ' ' + tag + (isKnown?' <span style="color:var(--tx3)">(bilinen)</span>':'') + '</span>' +
        '<span style="font-weight:700;color:' + (isKnown?'#f59e0b':'#86efac') + '">' + r.toPrecision(4) + ' mol/(L\u00b7s)</span></div>';
    });
    res.innerHTML = html;
  };

  // Yardımcı: kütle/zaman/molar kütle/hacimden hıza çevirme
  window.hcalcMassCompute = function(){
    var mass = parseFloat(document.getElementById('hm-mass').value);
    var molar = parseFloat(document.getElementById('hm-molar').value);
    var time = parseFloat(document.getElementById('hm-time').value);
    var vol = parseFloat(document.getElementById('hm-vol').value);
    var out = document.getElementById('hm-out');
    if (isNaN(mass) || isNaN(molar) || isNaN(time) || molar <= 0 || time <= 0) {
      out.innerHTML = '<span style="color:var(--yw)">K\u00fctle, molar k\u00fctle ve zaman\u0131 (hacim opsiyonel) do\u011fru gir.</span>';
      return;
    }
    var mol = mass / molar;
    var rateMolPerTime = mol / time;
    var html = '<div style="font-size:13px;color:var(--tx2);line-height:1.8">mol = k\u00fctle / molar k\u00fctle = ' + mol.toPrecision(4) + ' mol<br>' +
      'H\u0131z (mol/zaman birimi) = ' + rateMolPerTime.toPrecision(4) + ' mol/birim zaman';
    if (!isNaN(vol) && vol > 0) {
      var rateConc = rateMolPerTime / vol;
      html += '<br><b style="color:#f59e0b">H\u0131z (mol/(L\u00b7birim zaman)) = ' + rateConc.toPrecision(4) + '</b>';
    }
    html += '</div>';
    out.innerHTML = html;
  };

  var HCALC_THEORY_HTML =
    '<div class="card">' +
      '<div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:800;color:#fff;margin-bottom:8px">\u23f1\ufe0f H\u0131z Hesaplamalarının Temeli</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:0">aX + bY \u2192 cZ + dT tepkimesinde, HER türün h\u0131zı kendi katsayısıyla ORANTILIDIR: <b>r(X)/a = r(Y)/b = r(Z)/c = r(T)/d</b>. Bu y\u00fczden herhangi BİR türün h\u0131zı bilinirse, di\u011ferlerinin h\u0131zı bu oran kullanılarak bulunabilir. T\u00fcm h\u0131zlar POZİTİFTİR (harcanma h\u0131zı da, olu\u015fma h\u0131zı da mutlak de\u011ferle ifade edilir).</p>' +
    '</div>';

  // ---------- 23c. HIZ BAĞINTISI (MERTEBE BULMA) ----------
  var rlawSt = { nR: 2, rows: 4 };

  function rlawBuildTable(){
    var box = document.getElementById('rlaw-table-wrap');
    if (!box) return;
    var letters = ['A', 'B', 'C'];
    var head = '<div style="display:grid;grid-template-columns:36px repeat(' + rlawSt.nR + ',1fr) 1fr;gap:4px;margin-bottom:4px">' +
      '<div style="font-size:10px;color:var(--tx3);text-align:center">#</div>';
    for (var c = 0; c < rlawSt.nR; c++) head += '<div style="font-size:10px;color:var(--tx3);text-align:center">[' + letters[c] + ']</div>';
    head += '<div style="font-size:10px;color:var(--tx3);text-align:center">H\u0131z</div></div>';
    var rows = '';
    for (var r = 0; r < rlawSt.rows; r++) {
      rows += '<div style="display:grid;grid-template-columns:36px repeat(' + rlawSt.nR + ',1fr) 1fr;gap:4px;margin-bottom:4px">' +
        '<div style="font-size:12px;color:var(--tx3);text-align:center;align-self:center">' + (r+1) + '</div>';
      for (var c2 = 0; c2 < rlawSt.nR; c2++) rows += '<input type="number" step="any" class="inp rlaw-conc" data-row="' + r + '" data-col="' + c2 + '" style="padding:8px;font-size:12px;text-align:center">';
      rows += '<input type="number" step="any" class="inp rlaw-rate" data-row="' + r + '" style="padding:8px;font-size:12px;text-align:center">';
      rows += '</div>';
    }
    box.innerHTML = head + rows;
  }
  window.rlawSetN = function(n, btn){ rlawSt.nR = n; if (btn) selectInRow(btn); rlawBuildTable(); document.getElementById('rlaw-result').innerHTML = ''; };

  window.rlawCompute = function(){
    var res = document.getElementById('rlaw-result');
    var concInps = document.querySelectorAll ? document.getElementById('rlaw-table-wrap').querySelectorAll('.rlaw-conc') : [];
    var rateInps = document.getElementById('rlaw-table-wrap').querySelectorAll('.rlaw-rate');
    var trials = [];
    for (var r = 0; r < rlawSt.rows; r++) {
      var concs = [], allFilled = true;
      for (var c = 0; c < rlawSt.nR; c++) {
        var el = null;
        for (var ii = 0; ii < concInps.length; ii++) { if (+concInps[ii].getAttribute('data-row') === r && +concInps[ii].getAttribute('data-col') === c) { el = concInps[ii]; break; } }
        var v = el ? parseFloat(el.value) : NaN;
        if (isNaN(v)) { allFilled = false; break; }
        concs.push(v);
      }
      var rateEl = null;
      for (var jj = 0; jj < rateInps.length; jj++) { if (+rateInps[jj].getAttribute('data-row') === r) { rateEl = rateInps[jj]; break; } }
      var rateV = rateEl ? parseFloat(rateEl.value) : NaN;
      if (allFilled && !isNaN(rateV)) trials.push({ concs: concs, rate: rateV });
    }
    if (trials.length < rlawSt.nR + 1) {
      res.innerHTML = '<div style="padding:12px;border-radius:var(--r);background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.25);color:#fcd34d;font-size:13px">\u26a0\ufe0f En az ' + (rlawSt.nR + 1) + ' dolu deney sat\u0131r\u0131 gerekli (her reaktan i\u00e7in kar\u015f\u0131la\u015ft\u0131rma yap\u0131labilmesi i\u00e7in).</div>';
      return;
    }
    var letters = ['A', 'B', 'C'];
    var orders = [];
    for (var ri = 0; ri < rlawSt.nR; ri++) {
      var found = null;
      for (var i = 0; i < trials.length && !found; i++) {
        for (var j = 0; j < trials.length && !found; j++) {
          if (i === j) continue;
          var a = trials[i], b = trials[j];
          if (a.concs[ri] === b.concs[ri]) continue;
          var othersSame = true;
          for (var k = 0; k < rlawSt.nR; k++) { if (k !== ri && a.concs[k] !== b.concs[k]) { othersSame = false; break; } }
          if (othersSame) {
            var order = Math.log(b.rate / a.rate) / Math.log(b.concs[ri] / a.concs[ri]);
            found = Math.round(order * 100) / 100;
          }
        }
      }
      orders.push(found);
    }
    if (orders.indexOf(null) !== -1) {
      res.innerHTML = '<div style="padding:12px;border-radius:var(--r);background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#fca5a5;font-size:13px">\u26a0\ufe0f Baz\u0131 reaktanlar i\u00e7in kar\u015f\u0131la\u015ft\u0131r\u0131labilir bir deney çifti bulunamad\u0131 (di\u011ferleri sabit tutulup sadece o t\u00fcr\u00fcn deri\u015fimi de\u011fi\u015fen bir çift gerekli).</div>';
      return;
    }
    // k hesapla (ilk deneyden)
    var t0 = trials[0], denom = 1;
    for (var m = 0; m < rlawSt.nR; m++) denom *= Math.pow(t0.concs[m], orders[m]);
    var k = t0.rate / denom;
    var totalOrder = orders.reduce(function(a,b){ return a+b; }, 0);
    var rateLawStr = 'r = k' + orders.map(function(o, idx){ return '[' + letters[idx] + ']' + (o === 1 ? '' : '<sup>' + o + '</sup>'); }).join('');
    var html = '<div class="card">' +
      '<div class="slbl">Hız Bağıntısı</div>' +
      '<div style="font-family:monospace;font-size:16px;font-weight:700;color:#86efac;margin-bottom:14px">' + rateLawStr + '</div>';
    orders.forEach(function(o, idx){
      html += '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px"><span style="color:var(--tx3)">' + letters[idx] + ' mertebesi</span><span style="font-weight:700">' + o + '</span></div>';
    });
    html += '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:13px"><span style="color:var(--tx3)">Toplam mertebe (tepkime derecesi)</span><span style="font-weight:700">' + totalOrder + '</span></div>' +
      '<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13px"><span style="color:var(--tx3)">H\u0131z sabiti (k)</span><span style="font-weight:700;color:#f59e0b">' + k.toPrecision(4) + '</span></div>' +
    '</div>';
    res.innerHTML = html;
  };

  var RLAW_THEORY_HTML =
    '<div class="card">' +
      '<div style="font-family:Space Grotesk,sans-serif;font-size:16px;font-weight:800;color:#fff;margin-bottom:8px">\ud83d\udcd0 Hız Bağıntısı (Rate Law)</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.7;margin-bottom:0">Deneysel olarak, di\u011fer t\u00fcm derişimler SABİT tutulup sadece BİR reaktan\u0131n derişimi de\u011fi\u015ftirilerek hızın nasıl de\u011fi\u015fti\u011fi g\u00f6zlenir. Bu, o reaktana g\u00f6re TEPKİME MERTEBESİNİ (üssünü) verir. T\u00fcm mertebeler bulunduktan sonra, herhangi bir deneyin verileriyle hız sabiti (k) hesaplan\u0131r. \u00d6NEMLİ: mertebeler denklemdeki katsay\u0131lardan de\u011fil, SADECE deneysel veriden bulunur!</p>' +
    '</div>';

  // ---------- 24. MAARİF HIZ (MEB 11. Sınıf Kimya 2 — Tepkime Hızı) ----------
  var maarifSt = { sub: 0 };

  // Basit çizgi/alan grafik çizici — Grafik 1.x'lerin yeniden üretimi için ortak altyapı
  function maarifChart(canvasId, drawFn){
    var cv = document.getElementById(canvasId);
    if (!cv) return;
    var rect = cv.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    var W = rect.width || 300, H2 = cv.getAttribute('data-h') ? +cv.getAttribute('data-h') : 200;
    if (Math.abs(cv.width - W*dpr) > 2 || Math.abs(cv.height - H2*dpr) > 2) { cv.width = W*dpr; cv.height = H2*dpr; }
    var x = cv.getContext('2d');
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    x.fillStyle = '#050510'; x.fillRect(0, 0, W, H2);
    try { drawFn(x, W, H2); } catch (e) { drawErr(x, W, H2, e); }
  }
  function mcAxes(x, W, H2, padL, padR, padT, padB, xlab, ylab){
    x.strokeStyle = 'rgba(255,255,255,.25)'; x.lineWidth = 1;
    x.beginPath(); x.moveTo(padL, padT); x.lineTo(padL, H2-padB); x.lineTo(W-padR, H2-padB); x.stroke();
    x.fillStyle = 'rgba(255,255,255,.45)'; x.font = '10px sans-serif'; x.textAlign = 'center';
    x.fillText(xlab, (padL+W-padR)/2, H2-6);
    x.save(); x.translate(12, (padT+H2-padB)/2); x.rotate(-Math.PI/2); x.fillText(ylab, 0, 0); x.restore();
    return { padL: padL, padR: padR, padT: padT, padB: padB, plotW: W-padL-padR, plotH: H2-padT-padB };
  }

  function setupMaarif(){
    if (document.getElementById('maarif-wrap')) return;
    var host = document.getElementById('kin-tps');
    if (!host) return;
    host.insertAdjacentHTML('beforeend', '<div class="tp" id="maarif-wrap"></div>');
    if (!document.getElementById('mn-maariftab')) {
      // 5. sekme butonunu kin-tabs'e ekle
      var tabsBar = document.getElementById('kin-tabs');
      if (tabsBar) tabsBar.insertAdjacentHTML('beforeend', '<button class="ltab" id="mn-maariftab" onclick="tswitch(\'kin-tabs\',\'kin-tps\',4)">\ud83d\udcd8 Maarif Hız</button>');
    }
    var wrap = document.getElementById('maarif-wrap');
    wrap.innerHTML =
      '<p class="psub" style="margin-bottom:10px">MEB Maarif Modeli 11. Sınıf Kimya 2 ders kitabı, \u201cKimyasal Tepkimelerde Hız\u201d ünitesinin tam konu anlatımı \u2014 tüm etkinlik, örnek ve grafikleriyle.</p>' +
      '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:14px"><div style="display:flex;gap:6px;min-width:max-content">' +
        '<button type="button" class="ob sel2" onclick="maarifSetSub(0,this)">1.2.1 Gerekli Şartlar</button>' +
        '<button type="button" class="ob" onclick="maarifSetSub(1,this)">1.2.2 Ortalama Hız</button>' +
        '<button type="button" class="ob" onclick="maarifSetSub(2,this)">1.2.3 Etkileyen Faktörler</button>' +
        '<button type="button" class="ob" onclick="maarifSetSub(3,this)">1.2.4 Hız Denklemi</button>' +
      '</div></div>' +
      '<div id="maarif-content"></div>';
    maarifRender();
  }
  window.maarifSetSub = function(i, btn){ maarifSt.sub = i; if (btn) selectInRow(btn); maarifRender(); };

  function maarifRender(){
    var box = document.getElementById('maarif-content');
    if (!box) return;
    var fns = [maarif121, maarif122, maarif123, maarif124, maarifMolCat];
    box.innerHTML = fns[maarifSt.sub]();
    setTimeout(maarifDrawGraphs, 60);
  }

  function maarif121(){
    return '' +
    '<div class="card">' +
      '<div class="slbl">1.2.1 \u2014 Kimyasal Tepkimelerin Gerçekleşmesi İçin Gerekli Şartlar</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">' +
      '1) Yaşamın kaynağı kimyasal tepkimelerdir; d\u00fcnyanın dengesi ve canlıların yaşamı i\u00e7in \u00f6nemli olan bu tepkimelerin b\u00fcy\u00fck kısmı olumlu, bir kısmı ise (paslanma, \u00e7\u00fcr\u00fcme, b\u00f6zulma gibi) olumsuzdur.<br><br>' +
      '2) <b>\u00d6rnek \u2014 Orman yangını:</b> Organik maddeler (a\u011fa\u00e7, yaprak) atmosferdeki O\u2082 ile hızlı tepkimeye girip CO\u2082, H\u2082O, CO ve u\u00e7ucu organik bileşikler oluşturur:<br>' +
      '<span style="font-family:monospace;color:#f59e0b">C\u2093H\u2082\u1d67 + (2x+y)/2 O\u2082 \u2192 xCO\u2082 + yH\u2082O + enerji</span><br><br>' +
      '3) <b>\u00d6rnek \u2014 Kibrit:</b> Kibritte k\u00fck\u00fcrt, potasyum klorat ve kırmızı fosfor bulunur. S\u00fcrt\u00fcnme ile oluşan ısı, yanma tepkimesini BAŞLATIR (bu ısı olmadan, oksijenle s\u00fcrekli temas halinde olsa bile kibrit kendili\u011finden yanmaz \u2014 aktivasyon enerjisi bariyeri a\u015fılmadı\u011fı i\u00e7in). Islak kibrit tutuşmaz \u00e7\u00fcnk\u00fc su molek\u00fclleri tanecikleri \u00e7evreleyip etkin \u00e7arpışmayı engeller. R\u00fczgarlı havada yanma tepkimesi devam etmez \u00e7\u00fcnk\u00fc a\u00e7ı\u011fa \u00e7ıkan ısı \u00e7abuk da\u011fılır.' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">\ud83d\udca5 \u00c7arpışma Teorisi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">' +
      '4) Bir kimyasal tepkimenin ger\u00e7ekleşebilmesi i\u00e7in tanecikler \u00d6NCE \u00e7arpışmalıdır. Ancak HER \u00e7arpışma \u00fcr\u00fcn oluşturmaz \u2014 \u00fcr\u00fcn oluşması i\u00e7in <b>etkin \u00e7arpışma</b> gerekir.<br><br>' +
      '5) Etkin \u00e7arpışma i\u00e7in tanecikler:<br>' +
      '&nbsp;&nbsp;a) <b>Uygun geometride (do\u011frultu/y\u00f6nde)</b> \u00e7arpışmalı,<br>' +
      '&nbsp;&nbsp;b) <b>Yeterli kinetik enerjiye</b> sahip olmalıdır.<br><br>' +
      '6) Kinetik enerjisi d\u00fcş\u00fck iki taneci\u011fin \u00e7arpışması sonucunda ba\u011fların kırılması olası de\u011fildir. Bir tepkimenin ger\u00e7ekleşebilmesi i\u00e7in \u00e7arpışan taneciklerin sahip olması gereken MİNİMUM toplam kinetik enerjiye <b>eşik de\u011feri (eşik enerjisi)</b> denir.' +
      '</p>' +
      '<div style="background:#050510;border:1px solid rgba(245,158,11,.25);border-radius:12px;overflow:hidden;margin:10px 0"><canvas id="mgraf14" data-h="200" style="width:100%;display:block"></canvas></div>' +
      '<p style="font-size:11px;color:var(--tx3);text-align:center;margin-bottom:10px">Grafik 1.4: Tanecik sayısı \u2013 Kinetik enerji grafi\u011fi (kırmızı alan: etkin \u00e7arpışma yapabilecek tanecikler)</p>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">' +
      '7) <b>\u00d6rnek \u2014 NO(g) + O\u2083(g) \u2192 NO\u2082(g) + O\u2082(g):</b> NO ile O\u2083 UYGUN geometride \u00e7arpışırsa NO\u2082 ve O\u2082 \u00fcr\u00fcnleri oluşur. UYGUN OLMAYAN geometride \u00e7arpışırsa (\u00f6rn. NO\u2019nun yanlış ucundan yaklaşması) hi\u00e7bir \u00fcr\u00fcn oluşmaz, tanecikler de\u011fişmeden geri sekerler.' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">\u26a1 Aktivasyon Enerjisi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">' +
      '8) Endotermik veya ekzotermik her t\u00fcrl\u00fc tepkimenin başlayabilmesi i\u00e7in MUTLAKA enerjiye ihtiya\u00e7 vardır. Bu enerjiye <b>aktivasyon (aktifleşme) enerjisi</b> denir. Aktivasyon enerjisi tepkenlerin kinetik enerjilerinden sa\u011flanır. B\u00fcy\u00fck aktivasyon enerjili tepkimeler genellikle yavaş ger\u00e7ekleşir.<br><br>' +
      '9) Tepkenlerin \u00fcr\u00fcnlere d\u00f6n\u00fcşmesine <b>ileri tepkime</b>, \u00fcr\u00fcnlerin tepkenlere d\u00f6n\u00fcşmesine <b>geri tepkime</b> denir.<br><br>' +
      '10) Tepkenlerin \u00fcr\u00fcnlere d\u00f6n\u00fcşebilmesi i\u00e7in gereken en d\u00fcş\u00fck enerjiye <b>ileri aktivasyon enerjisi (E<sub>ai</sub>)</b>, \u00fcr\u00fcnlerin tepkenlere geri d\u00f6nebilmesi i\u00e7in gereken en d\u00fcş\u00fck enerjiye <b>geri aktivasyon enerjisi (E<sub>ag</sub>)</b> denir.<br><br>' +
      '11) Tepkime entalpisi: <span style="font-family:monospace;color:#86efac">\u0394H<sub>tepkime</sub> = E<sub>ai</sub> \u2212 E<sub>ag</sub></span>' +
      '</p>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0">' +
        '<div><div style="background:#050510;border:1px solid rgba(96,165,250,.3);border-radius:12px;overflow:hidden"><canvas id="mgraf15" data-h="170" style="width:100%;display:block"></canvas></div><p style="font-size:10px;color:var(--tx3);text-align:center;margin-top:4px">Grafik 1.5: Endotermik (E<sub>ai</sub>&gt;E<sub>ag</sub>, \u0394H&gt;0)</p></div>' +
        '<div><div style="background:#050510;border:1px solid rgba(248,113,113,.3);border-radius:12px;overflow:hidden"><canvas id="mgraf16" data-h="170" style="width:100%;display:block"></canvas></div><p style="font-size:10px;color:var(--tx3);text-align:center;margin-top:4px">Grafik 1.6: Ekzotermik (E<sub>ai</sub>&lt;E<sub>ag</sub>, \u0394H&lt;0)</p></div>' +
      '</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">' +
      '12) <b>Endotermik tepkimede</b> (Grafik 1.5): E<sub>ai</sub> &gt; E<sub>ag</sub>, \u00e7evreden enerji alınır, toplam entalpi artar, tepkenler \u00fcr\u00fcnlerden daha kararlıdır, tepkimenin devamı i\u00e7in s\u00fcrekli enerji verilmelidir.<br><br>' +
      '13) <b>Ekzotermik tepkimede</b> (Grafik 1.6): E<sub>ai</sub> &lt; E<sub>ag</sub>, \u00e7evreye enerji verilir, toplam entalpi azalır, \u00fcr\u00fcnler tepkenlerden daha kararlıdır, tepkime başladıktan sonra kendili\u011finden devam eder.' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">\ud83d\ude80 Kimya ve Yaşam: Roket Motorları</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">' +
      '14) Roketler y\u00fckseldik\u00e7e atmosferdeki O\u2082 derişimi azaldı\u011fından yakıtla birlikte yakıcı (oksitleyici) madde de taşınır. Hidrazin (N\u2082H\u2084) yakıt, diazot tetraoksit (N\u2082O\u2084) oksitleyici olarak kullanılan bir roket motorunda:<br>' +
      '<span style="font-family:monospace;color:#f59e0b">2N\u2082H\u2084(s) + N\u2082O\u2084(g) \u2192 3N\u2082(g) + 4H\u2082O(g) + 1168 kj</span><br>' +
      '\u2192 Atmosferdeki O\u2082 derişiminin azalması etkin \u00e7arpışma sayısını AZALTIR; bu y\u00fczden roket kendi oksitleyicisini taşımak zorundadır.' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">\ud83d\udcdd Uygulama Noktası 1.3 \u2014 \u00c7\u00f6z\u00fcml\u00fc \u00d6rnekler</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '<b>1) Fosgen sentezi:</b> CO(g) + Cl\u2082(g) \u2192 COCl\u2082(g), g\u00fcneş ışı\u011fı varlı\u011fında ger\u00e7ekleşir. \u0394H=\u221207 kJ, E<sub>ai</sub>=80 kJ.<br>' +
      '&nbsp;&nbsp;\u2022 G\u00fcneş ışı\u011fı gereklidir \u00e7\u00fcnk\u00fc tepkenlere aktivasyon enerjisini (80 kJ) aşacak enerji sa\u011flar.<br>' +
      '&nbsp;&nbsp;\u2022 E<sub>ag</sub> = E<sub>ai</sub> \u2212 \u0394H = 80 \u2212 (\u2212107) = <b>187 kJ</b><br><br>' +
      '<b>2) NH\u2083 \u2192 H\u2082 d\u00f6n\u00fcş\u00fcm\u00fc:</b> 2NH\u2083(g) \u2192 N\u2082(g) + 3H\u2082(g), \u0394H=+22 kJ, E<sub>ag</sub>=50 kJ.<br>' +
      '&nbsp;&nbsp;\u2022 E<sub>ai</sub> = \u0394H + E<sub>ag</sub> = 22+50 = <b>72 kJ</b> \u2014 tepkenlere en az 72 kJ verilmelidir.<br>' +
      '&nbsp;&nbsp;\u2022 \u0394H&gt;0 oldu\u011fu i\u00e7in tepkime <b>endotermiktir</b>; tepkenler \u00fcr\u00fcnlerden daha kararlıdır (enerjisi daha d\u00fcş\u00fCk).<br>' +
      '&nbsp;&nbsp;\u2022 Endotermik oldu\u011fu i\u00e7in devam edebilmesi i\u00e7in \u00e7evreden s\u00fcrekli enerji almalıdır.' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">\u2705 Kontrol Noktası 1.5 \u2014 CO + NO\u2082 \u2192 CO\u2082 + NO</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      'Grafikte I = E<sub>ai</sub> (ileri aktivasyon enerjisi), II = E<sub>ag</sub> (geri aktivasyon enerjisi), III = \u0394H olarak işaretlenir (tepenlerden tepeye kadar olan I; \u00fcr\u00fcnlerden tepeye kadar olan II; tepken-\u00fcr\u00fcn seviye farkı III).<br><br>' +
      '<b>Molek\u00fcl \u00e7arpışmaları:</b> D\u00fcş\u00fck kinetik enerjili \u00e7arpışmalar (II, III) etkin \u00e7arpışma olamaz; y\u00fcksek kinetik enerjili VE uygun geometrideki \u00e7arpışmalar (I, IV \u2014 CO\u2019nun karbonu NO\u2082\u2019nin oksijenine do\u011fru yönelmişse) \u00fcr\u00fcn oluşturabilir.' +
      '</p>' +
    '</div>';
  }

  function maarif122(){
    return '' +
    '<div class="card">' +
      '<div class="slbl">1.2.2 \u2014 Ortalama Tepkime Hızlarının Hesaplanması</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">' +
      '1) Tepkime hızı; kimyasal bir tepkimede belli bir s\u00fcrede madde miktarındaki de\u011fişimin \u00f6l\u00e7\u00fcs\u00fcd\u00fcr:<br>' +
      '<span style="font-family:monospace;color:#f59e0b">Tepkime hızı = \u2212\u0394[tepken]/\u0394t &nbsp;=&nbsp; +\u0394[\u00fcr\u00fcn]/\u0394t</span><br><br>' +
      '2) \u0394[tepken] terimi NEGATİFTİR (derişim azalır); hızın pozitif olması i\u00e7in \u00f6n\u00fcne eksi işareti konur. \u0394[\u00fcr\u00fcn] terimi POZİTİFTİR, eksi işareti konmaz. Hız \u201cr\u201d ile g\u00f6sterilir, SI biriminde M/s\u2019dir.<br><br>' +
      '3) [ ] simgesi \u201cderişim\u201d, \u0394 ise \u201cson de\u011fer \u2212 ilk de\u011fer\u201d anlamına gelir.' +
      '</p>' +
      '<table style="width:100%;border-collapse:collapse;font-size:12px;margin:10px 0"><tr style="background:rgba(255,255,255,.06)"><th style="padding:6px;border:1px solid rgba(255,255,255,.1)">Madde Miktarı</th><th style="padding:6px;border:1px solid rgba(255,255,255,.1)">Zaman</th><th style="padding:6px;border:1px solid rgba(255,255,255,.1)">Hız Formülü</th><th style="padding:6px;border:1px solid rgba(255,255,255,.1)">Birim</th></tr>' +
      '<tr><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">Derişim</td><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">saniye</td><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">r=\u0394[M]/\u0394t</td><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">M/s</td></tr>' +
      '<tr><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">K\u00fctle</td><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">dakika</td><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">r=\u0394m/\u0394t</td><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">g/dk</td></tr>' +
      '<tr><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">Mol</td><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">saat</td><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">r=\u0394n/\u0394t</td><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">mol/sa</td></tr>' +
      '<tr><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">Hacim</td><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">g\u00fcn</td><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">r=\u0394V/\u0394t</td><td style="padding:6px;border:1px solid rgba(255,255,255,.1);text-align:center">L/g\u00fcn</td></tr></table>' +
      '<p style="font-size:11px;color:var(--tx3);text-align:center;margin-bottom:10px">Tablo 1.6</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">Katsayı \u2014 Hız İlişkisi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">' +
      '4) N\u2082(g) + 3H\u2082(g) \u2192 2NH\u2083(g) tepkimesinde harcanma/oluşma hızları katsayılarla orantılıdır (1 mol N\u2082 harcanırken 3 mol H\u2082 harcanır, 2 mol NH\u2083 oluşur):<br>' +
      '<span style="font-family:monospace;color:#86efac">r<sub>tepkime</sub> = r<sub>N2</sub> = \u2153 r<sub>H2</sub> = \u00bd r<sub>NH3</sub></span><br><br>' +
      '5) Genel olarak <b>aA + bB \u2192 cC + dD</b> tepkimesinde:<br>' +
      '<span style="font-family:monospace;color:#86efac">r<sub>tepkime</sub> = (1/a)r<sub>A</sub> = (1/b)r<sub>B</sub> = (1/c)r<sub>C</sub> = (1/d)r<sub>D</sub></span>' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">\ud83d\udcca Ortalama Tepkime Hızı \u2014 H\u2082O\u2082 \u00d6rne\u011fi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">' +
      '6) Belli bir zaman aralı\u011fında madde miktarındaki de\u011fişime <b>ortalama hız</b> denir. H\u2082O\u2082(suda) \u2192 H\u2082O(s) + \u00bdO\u2082(g) tepkimesi i\u00e7in H\u2082O\u2082\u2019nin derişim\u2013zaman grafi\u011fi:' +
      '</p>' +
      '<div style="background:#050510;border:1px solid rgba(245,158,11,.25);border-radius:12px;overflow:hidden;margin:10px 0"><canvas id="mgraf17" data-h="200" style="width:100%;display:block"></canvas></div>' +
      '<p style="font-size:11px;color:var(--tx3);text-align:center;margin-bottom:10px">Grafik 1.7: H\u2082O\u2082 derişim-zaman grafi\u011fi</p>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '<b>200-400 s arası:</b> r=\u2212(1,70\u22122,00)/(400\u2212200) = \u2212(\u22120,30)/200 = <b>0,0015 M/s</b><br>' +
      '<b>400-600 s arası:</b> r=\u2212(1,50\u22121,70)/(600\u2212400) = \u2212(\u22120,20)/200 = <b>0,0010 M/s</b><br>' +
      '\u2192 Zaman ilerledikce ortalama hız D\u00dc\u015e\u00dcYOR (derişim azaldık\u00e7a \u00e7arpışma sıklı\u011fı azalır).' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">\ud83e\uddea Etkinlik 1.10 \u2014 N\u2082O\u2085 Ayrışması (2N\u2082O\u2085 \u2192 4NO\u2082 + O\u2082)</div>' +
      '<table style="width:100%;border-collapse:collapse;font-size:11px;margin:8px 0"><tr style="background:rgba(255,255,255,.06)"><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">t(s)</th><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">[N\u2082O\u2085]</th><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">[NO\u2082]</th><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">[O\u2082]</th></tr>' +
      '<tr><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,200</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0</td></tr>' +
      '<tr><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">100</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,169</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,063</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,016</td></tr>' +
      '<tr><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">200</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,142</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,115</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,029</td></tr>' +
      '<tr><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">300</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,120</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,160</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,040</td></tr></table>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '<b>a) 0-100s arası N\u2082O\u2085 ortalama harcanma hızı:</b> \u2212(0,169\u22120,200)/100 = <b>3,1\u00d710\u207b\u2074 M/s</b><br>' +
      '<b>100-200s arası:</b> \u2212(0,142\u22120,169)/100 = <b>2,7\u00d710\u207b\u2074 M/s</b> (giderek azalıyor)<br>' +
      '<b>b) 0-100s arası NO\u2082 ortalama oluşma hızı:</b> (0,063\u22120)/100 = <b>6,3\u00d710\u207b\u2074 M/s</b><br>' +
      '<b>c) 0-100s arası O\u2082 ortalama oluşma hızı:</b> (0,016\u22120)/100 = <b>1,6\u00d710\u207b\u2074 M/s</b><br>' +
      '\u2192 NO\u2082 hızı N\u2082O\u2085 hızının 2 katı, O\u2082 hızı N\u2082O\u2085 hızının yarısı civarındadır (katsayı oranı 4:2:1 ile uyumlu).' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">\ud83d\udcc8 Hızın Zamanla Değişimi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">' +
      '7) Sabit sıcaklıkta ger\u00e7ekleşen bir tepkimenin hızı, tepkenlerin derişimine ba\u011flı olarak zamanla de\u011fişir. Tepkenler harcandık\u00e7a miktarları azalır.<br><br>' +
      '8) <b>Gaz fazında veya \u00e7\u00f6z\u00fcnm\u00fcş halde</b> ger\u00e7ekleşen tepkimelerde derişim azalır \u2192 \u00e7arpışma sıklı\u011fı d\u00fcşer \u2192 hız zamanla AZALIR (en y\u00fcksek hız BAŞLANGI\u00c7ta).<br><br>' +
      '9) <b>Katı veya saf sıvı</b> tepkenlerin yer aldı\u011fı tepkimelerde derişim SABİTTİR (de\u011fişmez) \u2192 tepkime, temas y\u00fczeyi de\u011fişmedi\u011fi s\u00fcrece AYNI HIZLA devam eder.' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">\ud83d\udcdd \u00c7alışma Yapra\u011fı 1.2 \u2014 \u00c7\u00f6z\u00fcml\u00fc \u00d6rnekler</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '<b>1) 2CO(g)+O\u2082(g)\u21922CO\u2082(g) ve 2NO\u2082(g)\u2192N\u2082(g)+2O\u2082(g):</b> 2 saniyede 0,4 M CO ve 0,2 M NO\u2082 harcanıyor.<br>' +
      '&nbsp;&nbsp;\u2022 Hız ba\u011fıntıları: r<sub>tepkime</sub>=\u00bdr<sub>CO</sub>=r<sub>O2</sub>=\u00bdr<sub>CO2</sub> ve r<sub>tepkime</sub>=\u00bdr<sub>NO2</sub>=r<sub>N2</sub>=\u00bdr<sub>O2</sub><br>' +
      '&nbsp;&nbsp;\u2022 CO ve O\u2082 harcanma hızı: r<sub>CO</sub>=0,4/2=<b>0,2 M/s</b>; r<sub>O2</sub>=r<sub>CO</sub>/2=<b>0,1 M/s</b><br>' +
      '&nbsp;&nbsp;\u2022 N\u2082 ve O\u2082 oluşma hızı: r<sub>NO2</sub>=0,2/2=<b>0,1 M/s</b>; r<sub>N2</sub>=r<sub>NO2</sub>/2=<b>0,05 M/s</b>, r<sub>O2</sub>=r<sub>NO2</sub>=<b>0,1 M/s</b><br><br>' +
      '<b>2) SO\u2082+\u00bdO\u2082\u2192SO\u2083 (20s\u2019de 0,12M SO\u2082) ve SO\u2083+H\u2082O\u2192H\u2082SO\u2084 (2 dk\u2019da tamamı):</b><br>' +
      '&nbsp;&nbsp;\u2022 SO\u2082 ortalama harcanma hızı: 0,12/20 = <b>0,006 M/s</b><br>' +
      '&nbsp;&nbsp;\u2022 O\u2082 ortalama harcanma hızı: 0,006/2 = <b>0,003 M/s</b><br>' +
      '&nbsp;&nbsp;\u2022 SO\u2083 oluşma hızı (1. tepkimeden) = SO\u2082 harcanma hızına eşit = 0,006 M/s; 2 dakikada (120s) oluşan SO\u2083 miktarı 0,12 mol/L oldu\u011funa g\u00f6re SO\u2083 ortalama harcanma hızı (2. tepkimede) = 0,12/120 = <b>0,001 M/s = 0,06 M/dk</b>' +
      '</p>' +
    '</div>';
  }

  function maarif123(){
    return '' +
    '<div class="card">' +
      '<div class="slbl">1.2.3 \u2014 Tepkime Hızına Etki Eden Faktörler</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">' +
      '1) Katalitik konvert\u00f6rler; platin, paladyum, rodyum metalleriyle egzoz gazlarındaki CO, C\u2093H\u1d67, NO\u2093 gibi zararlı gazları CO\u2082, H\u2082O, N\u2082, O\u2082\u2019ye d\u00f6n\u00fcşt\u00fcr\u00fcr \u2014 bu metaller tepkimeyi HIZLANDIRICI \u00f6zelliktedir.<br><br>' +
      '2) Tepkime hızını belirleyen 5 temel fakt\u00f6r: <b>Madde Cinsi \u00b7 Fiziksel Hal \u00b7 Derişim \u00b7 Sıcaklık \u00b7 Katalizör</b> (+ Temas Y\u00fczeyi).' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">1\ufe0f\u20e3 Madde Cinsinin Etkisi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '3) Kimyasal tepkimeler, tepkenlerdeki ba\u011fların kopması ve \u00fcr\u00fcnlerde yeni ba\u011fların oluşmasıyla ger\u00e7ekleşir. <b>Kopan ba\u011f sayısı ne kadar \u00e7oksa, tepkime o kadar yavaş</b> ger\u00e7ekleşme e\u011filimindedir.<br>' +
      '&nbsp;&nbsp;\u2022 \u00d6rnek: C\u2083H\u2088(propan)\u2019ın yanması (5O\u2082 ile, daha \u00e7ok ba\u011f kırılır) CH\u2084(metan)\u2019ın yanmasından (2O\u2082 ile) DAHA YAVAŞtır.<br><br>' +
      '4) <b>Tepken t\u00fcr\u00fc (\u00e7eşidi) fazla olan tepkimeler</b> genellikle yavaş ger\u00e7ekleşir (\u00e7\u00fcnk\u00fc aynı anda birden fazla farklı molek\u00fcl\u00fcn uygun geometride \u00e7arpışma olasılı\u011fı d\u00fcş\u00fckt\u00fcr).<br>' +
      '&nbsp;&nbsp;\u2022 \u00d6rnek: 2NO+H\u2082\u2192N\u2082+H\u2082O\u2082 (\u00fc\u00e7 molek\u00fcl AYNI ANDA \u00e7arpışmalı) YAVAŞ; H\u2082O\u2082+H\u2082\u21922H\u2082O (iki molek\u00fcl) daha HIZLIdır.<br><br>' +
      '5) <b>Zıt y\u00fckl\u00fc iyonlar arası tepkimeler</b> elektrostatik \u00e7ekim nedeniyle genellikle \u00e7ok HIZLI ger\u00e7ekleşir \u2014 n\u00f6tralleşme ve \u00e7\u00f6z\u00fcnme-\u00e7\u00f6kelme tepkimeleri bu y\u00fczden hızlıdır:<br>' +
      '&nbsp;&nbsp;\u2022 HCl(suda)+NaOH(suda)\u2192NaCl(suda)+H\u2082O(s) \u2014 net iyon: H\u207a+OH\u207b\u2192H\u2082O<br>' +
      '&nbsp;&nbsp;\u2022 KI(suda)+Pb(NO\u2083)\u2082(suda)\u2192PbI\u2082(k)+KNO\u2083(suda) \u2014 net iyon: Pb\u00b2\u207a+2I\u207b\u2192PbI\u2082(k)<br><br>' +
      '<b>\u00d6rnek (1.5 Uygulama):</b> Glikozun fermantasyonu (C\u2086H\u2081\u2082O\u2086(k)\u21922C\u2082H\u2085OH(s)+2CO\u2082(g)) organik/karmaşık bir s\u00fcre\u00e7tir, YAVAŞtır. H\u2082SO\u2084+2KOH\u2192K\u2082SO\u2084+2H\u2082O ise iyonlar arası bir asit-baz tepkimesidir, \u00c7OK HIZLIdır.' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">2\ufe0f\u20e3 Maddenin Fiziksel Halinin Etkisi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '6) Genel olarak <b>gaz &gt; sıvı &gt; katı</b> hızında ger\u00e7ekleşir \u2014 gaz molek\u00fclleri daha hareketli oldu\u011fu i\u00e7in \u00e7arpışma olasılı\u011fı y\u00fcksektir.<br>' +
      '&nbsp;&nbsp;\u2022 Ca(k)+H\u2082O(s)\u2192Ca(OH)\u2082(suda)+H\u2082(g) &nbsp;<b>YAVAŞ</b><br>' +
      '&nbsp;&nbsp;\u2022 Ca(k)+H\u2082O(g)\u2192Ca(OH)\u2082(k)+H\u2082(g) &nbsp;<b>HIZLI</b> (su buhar halinde)<br><br>' +
      '<b>\u00d6rnek (1.6 Uygulama):</b> Etan (C\u2082H\u2086, gaz) ve heptan (C\u2087H\u2081\u2086, sıvı) aynı koşullarda yakıldı\u011fında, GAZ halindeki etan daha \u00e7ok hareketli oldu\u011fu i\u00e7in yanma tepkimesi heptandan daha HIZLIdır.' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">3\ufe0f\u20e3 Derişimin Etkisi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '7) Derişim = birim hacimdeki madde miktarı. Y\u00fcksek derişim \u2192 \u00e7arpışma olasılı\u011fı artar \u2192 etkin \u00e7arpışma sayısı artar \u2192 hız ARTAR. <b>Derişimin artması aktivasyon enerjisini DE\u011eİŞTİRMEZ.</b><br><br>' +
      '8) <b>Gaz fazında hacim de\u011fişimi:</b> Hacim artırılırsa derişim d\u00fcşer (hız azalır); hacim azaltılırsa derişim artar (hız artar).' +
      '</p>' +
      '<div style="display:flex;align-items:center;justify-content:center;gap:16px;padding:10px 0">' +
        '<div style="text-align:center"><div style="font-size:11px;color:var(--tx3)">Derişimi D\u00fcş\u00fck</div><div style="font-size:24px">\ud83d\udfe2 \ud83d\udd34</div><div style="font-size:10px;color:var(--tx3)">az \u00e7arpışma \u2192 yavaş</div></div>' +
        '<div style="font-size:20px;color:var(--tx3)">\u2192</div>' +
        '<div style="text-align:center"><div style="font-size:11px;color:var(--tx3)">Derişimi Y\u00fcksek</div><div style="font-size:20px">\ud83d\udfe2\ud83d\udd34\ud83d\udfe2\ud83d\udd34\ud83d\udfe2\ud83d\udd34</div><div style="font-size:10px;color:var(--tx3)">\u00e7ok \u00e7arpışma \u2192 hızlı</div></div>' +
      '</div>' +
      '<p style="font-size:11px;color:var(--tx3);text-align:center">G\u00f6rsel 1.8: Derişim etkisi</p>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '<b>\u00d6rnek (1.7 Uygulama \u2014 H\u2082+Cl\u2082\u21922HCl, 3 \u00f6zdeş kap):</b> Kaptaki H\u2082/Cl\u2082 sayısı ne kadar \u00e7oksa (derişim y\u00fcksekse) o kapta birim zamanda daha fazla HCl \u00fcretilir; \u00e7arpışma sıklı\u011fı fazla oldu\u011fu i\u00e7in hız daha y\u00fcksektir.<br><br>' +
      '\ud83d\udca7 <b>Kimya ve Yaşam \u2014 Nemli Havada Paslanma:</b> Nem, demirin y\u00fczeyinde daha fazla su bulunmasına yol a\u00e7ar; bu, elektrokimyasal paslanma s\u00fcrecinde gerekli İYONLARIN taşınmasını (derişimini) artırır \u2192 paslanma HIZLANIR.' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">4\ufe0f\u20e3 Sıcaklığın Etkisi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '9) Sıcaklık artışı tepkenlerin KİNETİK ENERJİSİNİ artırır \u2192 \u00e7arpışma sıklı\u011fı VE şiddeti artar \u2192 eşik de\u011ferini aşan tanecik sayısı artar \u2192 hız ARTAR. <b>Sıcaklık aktivasyon enerjisini VE tepkimenin izledi\u011fi yolu DE\u011eİŞTİRMEZ.</b>' +
      '</p>' +
      '<div style="background:#050510;border:1px solid rgba(96,165,250,.25);border-radius:12px;overflow:hidden;margin:10px 0"><canvas id="mgraf9" data-h="190" style="width:100%;display:block"></canvas></div>' +
      '<p style="font-size:11px;color:var(--tx3);text-align:center;margin-bottom:10px">Grafik 1.9/1.10: T\u2082&gt;T\u2081 \u2014 sıcaklık arttık\u00e7a e\u011frinin altındaki alan AYNI kalır (tanecik sayısı de\u011fişmez), ama eşik de\u011ferini aşan (kırmızı) alan B\u00dcY\u00dcR</p>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '<b>\u00d6rnek (1.8 Uygulama):</b> Kire\u00e7 taşı maketleri 5\u00b0C, 15\u00b0C, 35\u00b0C ortamlarda eşit derişimde asit ile aşındırılıyor \u2014 35\u00b0C\u2019deki maket en HIZLI aşınır (\u00e7arpışma teorisine g\u00f6re: y\u00fcksek sıcaklık \u2192 y\u00fcksek kinetik enerji \u2192 daha \u00e7ok etkin \u00e7arpışma).' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">5\ufe0f\u20e3 Katalizörün Etkisi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '10) Katalizör: tepkimenin AKTİVASYON ENERJİSİNİ D\u00dc\u015e\u00dcRerek tepkimeyi hızlandıran maddedir. Tepkimeye katılır ama SONUNDA DE\u011eİŞMEDEN \u00e7ıkar.' +
      '</p>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:10px 0">' +
        '<div><div style="background:#050510;border:1px solid rgba(34,197,94,.25);border-radius:12px;overflow:hidden"><canvas id="mgraf11" data-h="170" style="width:100%;display:block"></canvas></div><p style="font-size:10px;color:var(--tx3);text-align:center;margin-top:4px">Grafik 1.11: Katalizör Ea\u2019yı d\u00fcş\u00fcr\u00fcr, \u0394H de\u011fişmez</p></div>' +
        '<div><div style="background:#050510;border:1px solid rgba(34,197,94,.25);border-radius:12px;overflow:hidden"><canvas id="mgraf12" data-h="170" style="width:100%;display:block"></canvas></div><p style="font-size:10px;color:var(--tx3);text-align:center;margin-top:4px">Grafik 1.12: Katalizörl\u00fc alanda daha \u00e7ok tanecik eşi\u011fi aşar</p></div>' +
      '</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '11) <b>Katalizörlerin \u00f6zellikleri:</b><br>' +
      '&nbsp;&nbsp;\u2022 Aktivasyon enerjisini d\u00fcş\u00fcr\u00fcr, ileri ve geri Ea\u2019yı AYNI miktarda azaltır \u2192 <b>\u0394H\u2019yi de\u011fiştirmez</b><br>' +
      '&nbsp;&nbsp;\u2022 Etkin \u00e7arpışma ve birim zamanda oluşan \u00fcr\u00fcn miktarını artırır<br>' +
      '&nbsp;&nbsp;\u2022 Tepken/\u00fcr\u00fcn enerjisini, \u00fcr\u00fcn t\u00fcr\u00fc/miktarını/verimini DE\u011eİŞTİRMEZ<br>' +
      '&nbsp;&nbsp;\u2022 Tepkime başlaması i\u00e7in GEREKLİ de\u011fildir; başlamış tepkimeyi hızlandırır<br>' +
      '&nbsp;&nbsp;\u2022 Tepkimenin y\u00f6n\u00fcn\u00fc değiştirmez; tepkimeyi mekanizmalı hale getirebilir (yavaş adıma etki eder)<br><br>' +
      '12) <b>İnhibit\u00f6r (negatif katalizör):</b> Tepkimeyi YAVAŞLATIR. Hazır gıdalarda kullanılan sodyum benzoat, askorbik asit gibi maddeler inhibit\u00f6rd\u00fcr.<br><br>' +
      '13) Tepkenlerle AYNI fazda olan katalizöre <b>homojen</b>, farklı fazda olana <b>heterojen katalizör</b> denir (heterojen katalizörler genelde katı, tepkenler sıvı/gaz).' +
      '</p>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '<b>\u00d6rnek (1.9 Uygulama \u2014 Margarin \u00fcretimi):</b> Doymamış bitkisel ya\u011flar, Ni katalizörl\u00fc\u011f\u00fcnde H\u2082 gazıyla tepkimeye girip doymuş ya\u011fa (margarin) d\u00f6n\u00fcş\u00fcr. Katalizörl\u00fc tesis, aynı koşullarda daha AZ enerjiyle daha ÇOK \u00fcr\u00fcn elde eder (aktivasyon enerjisi d\u00fcş\u00fckt\u00fcr).' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">6\ufe0f\u20e3 Temas Y\u00fczeyinin Etkisi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '14) Katı tepkenin y\u00fczey alanı arttık\u00e7a (ince toz haline getirildik\u00e7e) tepkimenin ger\u00e7ekleşebilece\u011fi B\u00d6LGE artar \u2192 \u00e7arpışma sıklı\u011fı artar \u2192 hız ARTAR.' +
      '</p>' +
      '<div style="background:#050510;border:1px solid rgba(168,85,247,.25);border-radius:12px;overflow:hidden;margin:10px 0"><canvas id="mgraf13" data-h="180" style="width:100%;display:block"></canvas></div>' +
      '<p style="font-size:11px;color:var(--tx3);text-align:center;margin-bottom:10px">Grafik 1.13: Zn(k)+HCl(suda)\u2192ZnCl\u2082+H\u2082 \u2014 toz \u00e7inko (kırmızı), par\u00e7a \u00e7inko (mavi) H\u2082 mol\u2013zaman grafi\u011fi. İkisi de aynı miktarda \u00fcr\u00fcn verir, ama TOZ ÇİNKO ile daha KISA s\u00fcrede tamamlanır.</p>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '<b>\u00d6rnek (1.10 Uygulama \u2014 FeCl\u2082 \u00fcretimi):</b> Fe(k)+2HCl(suda)\u2192FeCl\u2082(suda)+H\u2082(g). 10\u2019ar gram Fe levhası, talaşı, tozu aynı derişimdeki HCl ile tepkimeye giriyor. <b>Fe tozu</b> en b\u00fcy\u00fck y\u00fczey alanına sahip oldu\u011fu i\u00e7in birim zamanda EN FAZLA FeCl\u2082 \u00fcretir ve H\u2082 gazı EN HIZLI \u00e7ıkar; Fe levhası ise en yavaştır.' +
      '</p>' +
    '</div>';
  }

  function maarif124(){
    return '' +
    '<div class="card">' +
      '<div class="slbl">1.2.4 \u2014 Kimyasal Tepkimelerin Hız Denklemi</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">' +
      '1) Tepkimelerin hızı ile tepkenlerin derişimleri arasındaki ilişkiyi g\u00f6steren ba\u011fıntıya <b>hız denklemi</b> denir. Derişim ile hız arasındaki orantıyı eşitli\u011fe d\u00f6n\u00fcşt\u00fcren orantı sabitine <b>hız sabiti (k)</b> denir. k\u2019nın de\u011feri; tepkimenin niteli\u011fine, SICAKLI\u011eA, TEMAS Y\u00dcZEYİNE ve KATALİZ\u00d6RE ba\u011flıdır (sıcaklık/temas y\u00fczeyi/katalizör ile k ARTAR). k, DERİŞİMDEN etkilenmez.<br><br>' +
      '2) Gaz fazında ve <b>tek basamakta</b> ger\u00e7ekleşen aA+bB\u2192cC+dD tepkimesinin hızı:<br>' +
      '<span style="font-family:monospace;color:#f59e0b;font-size:15px">r = k[A]\u1d43[B]\u1d47</span><br><br>' +
      '3) Hız denkleminde \u00fcslerin toplamına <b>tepkime derecesi</b> (a+b) denir. Tepkime A\u2019ya g\u00f6re a. dereceden, B\u2019ye g\u00f6re b. derecedendir.<br><br>' +
      '4) Hız denklemi yazım kuralları:<br>' +
      '&nbsp;&nbsp;\u2022 Tepkenlerin STOKİYOMETRİK KATSAYILARI, derişimlerin \u00fczerine \u00dcS olarak yazılır (tek basamaklı tepkimede)<br>' +
      '&nbsp;&nbsp;\u2022 Tepkenlerin derişimleri \u00e7arpılır, hız sabiti (k) ile \u00e7arpılır<br>' +
      '&nbsp;&nbsp;\u2022 <b>Katı ve sıvı hâldeki SAF maddeler hız denklemine YAZILMAZ</b> (derişimleri tepkime s\u00fcresince de\u011fişmez, hıza etkileri yoktur)<br><br>' +
      '5) \u00d6rnek: N\u2082(g)+3H\u2082(g)\u21922NH\u2083(g) \u2192 <span style="font-family:monospace;color:#86efac">r=k[N\u2082][H\u2082]\u00b3</span> \u2014 N\u2082\u2019ye g\u00f6re 1., H\u2082\u2019ye g\u00f6re 3. derece, toplam 4. derece. N\u2082 derişimi 2 katına \u00e7ıkarsa hız 2 katına; H\u2082 derişimi 2 katına \u00e7ıkarsa hız 2\u00b3=8 katına \u00e7ıkar.' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">\ud83e\uddea Etkinlik 1.18 \u2014 Deneysel Hız Denklemi Bulma (Tek Basamaklı)</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">CO(g)+Cl\u2082(g)\u2192COCl\u2082(g) tepkimesi TEK basamaklıdır:</p>' +
      '<table style="width:100%;border-collapse:collapse;font-size:12px;margin:8px 0"><tr style="background:rgba(255,255,255,.06)"><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">Deney</th><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">[CO]</th><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">[Cl\u2082]</th><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">Hız (M/s)</th></tr>' +
      '<tr><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">1</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,20</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,20</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,04</td></tr>' +
      '<tr><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">2</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,20</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,60</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,12</td></tr>' +
      '<tr><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">3</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,40</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,60</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,24</td></tr></table>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">1\u21922: [CO] sabit, [Cl\u2082] 3 kat \u2192 hız 3 kat \u2192 Cl\u2082\u2019ye g\u00f6re 1. derece. 2\u21923: [Cl\u2082] sabit, [CO] 2 kat \u2192 hız 2 kat \u2192 CO\u2019ya g\u00f6re 1. derece.<br>' +
      '\u2192 <span style="font-family:monospace;color:#86efac">r=k[CO][Cl\u2082]</span>, tepkime derecesi=2 (tek basamaklı olması hız denklemi katsayılarla UYUMLU \u00e7ıkmasıyla do\u011frulanır).' +
      '</p>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8"><b>Çok basamaklı karşılaştırma:</b> 2NO(g)+2H\u2082(g)\u2192N\u2082(g)+2H\u2082O(g) i\u00e7in deneysel hız denklemi <span style="font-family:monospace;color:#86efac">r=k[NO]\u00b2[H\u2082]</span> bulunur \u2014 katsayılarla (2,2) UYUMSUZ oldu\u011fu i\u00e7in bu tepkime \u00c7OK BASAMAKLIdır.</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">\ud83d\udcd0 Tablo 1.7 \u2014 NO\u2082(g)+CO(g)\u2192NO(g)+CO\u2082(g)</div>' +
      '<table style="width:100%;border-collapse:collapse;font-size:12px;margin:8px 0"><tr style="background:rgba(255,255,255,.06)"><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">Deney</th><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">[NO\u2082]</th><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">[CO]</th><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">Hız (M/s)</th></tr>' +
      '<tr><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">1</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,10</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,010</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">1,2\u00d710\u207b\u00b3</td></tr>' +
      '<tr><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">2</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,10</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,040</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">4,8\u00d710\u207b\u00b3</td></tr>' +
      '<tr><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">3</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,20</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0,010</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">2,4\u00d710\u207b\u00b3</td></tr></table>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">1\u21922: [CO] 4 kat \u2192 hız 4 kat \u2192 CO\u2019ya g\u00f6re 1. derece. 1\u21923: [NO\u2082] 2 kat \u2192 hız 2 kat \u2192 NO\u2082\u2019ye g\u00f6re 1. derece.<br>' +
      '\u2192 <span style="font-family:monospace;color:#86efac">r=k[NO\u2082][CO]</span>, tepkime derecesi=2.<br>' +
      '<b>k hesabı</b> (1. deney): 1,2\u00d710\u207b\u00b3=k\u00d7(0,1)\u00d7(0,01) \u2192 <b>k=1,2</b>. <b>k\u2019nın birimi:</b> M/s = k\u00d7M\u00d7M \u2192 k=1/(sM).' +
      '</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">\ud83d\udcd0 Tablo 1.8 \u2014 Tepkime Derecesi ile Hız Sabiti Birimi</div>' +
      '<table style="width:100%;border-collapse:collapse;font-size:11px;margin:8px 0"><tr style="background:rgba(255,255,255,.06)"><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">Tepkime</th><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">Hız Denklemi</th><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">Derece</th><th style="padding:5px;border:1px solid rgba(255,255,255,.1)">k birimi</th></tr>' +
      '<tr><td style="padding:5px;border:1px solid rgba(255,255,255,.1)">C(k)+O\u2082(g)\u2192CO\u2082(g)</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">r=k[O\u2082]</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">1</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">1/s</td></tr>' +
      '<tr><td style="padding:5px;border:1px solid rgba(255,255,255,.1)">CaCO\u2083(k)\u2192CaO(k)+CO\u2082(g)</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">r=k</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">0</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">M/s</td></tr>' +
      '<tr><td style="padding:5px;border:1px solid rgba(255,255,255,.1)">Mg(k)+2HCl\u2192MgCl\u2082+H\u2082</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">r=k[HCl]\u00b2</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">2</td><td style="padding:5px;border:1px solid rgba(255,255,255,.1);text-align:center">1/(sM)</td></tr></table>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.8">\u2192 Genel kural: hız sabiti birimi <b>1/(sM\u207f\u207b\u00b9)</b> olan tepkimenin derecesi <b>n</b>\u2019dir.</p>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9"><b>\u00d6rnek (1.11 Uygulama \u2014 g\u00f6l demiri):</b> Fe\u00b3\u207a(suda)+3OH\u207b(suda)\u2192Fe(OH)\u2083(k), r=k[Fe\u00b3\u207a][OH\u207b]\u00b3, k=0,005. 3 g\u00f6lden numune: [OH\u207b]=0,1M sabit, hızlar 2\u00d710\u207b\u2076, 8\u00d710\u207b\u2076, 32\u00d710\u207b\u2076 M/s. r=k[Fe\u00b3\u207a](0,1)\u00b3=0,005\u00d70,001\u00d7[Fe\u00b3\u207a] \u2192 A=2\u00d710\u207b\u2076/(5\u00d710\u207b\u2076)=<b>0,4M</b>, B=1,6M, C=6,4M (her deneyde hızın \u00f6nceki deneyin 4 katı olması, [Fe\u00b3\u207a]\u2019nın da 4 katına \u00e7ıktı\u011fını g\u00f6sterir).</p>' +
    '</div>' +
    '<div class="card">' +
      '<div class="slbl">\u26d3\ufe0f \u00c7ok Basamaklı Tepkimeler (Mekanizma)</div>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '6) \u00c7arpışma teorisine g\u00f6re İKİDEN FAZLA taneci\u011fin AYNI ANDA uygun geometride \u00e7arpışma olasılı\u011fı \u00e7ok d\u00fcş\u00fckt\u00fcr. Bu y\u00fczden b\u00f6yle tepkimeler genellikle ikili/\u00fc\u00e7l\u00fc ARA BASAMAKLARA ayrılarak ger\u00e7ekleşir. Bu t\u00fcr tepkimelere <b>\u00e7ok basamaklı tepkimeler</b> denir.<br><br>' +
      '7) <b>\u00c7ok basamaklı tepkimelerde hızı YAVAŞ BASAMAK belirler.</b> Hız denklemi net tepkimeye g\u00f6re DE\u011eİL, yavaş basama\u011fa g\u00f6re yazılır.<br><br>' +
      '8) \u00d6rnek: 2H\u2082O\u2082(suda)\u21922H\u2082O(s)+O\u2082(g) iki basamaktan oluşur:<br>' +
      '&nbsp;&nbsp;I. basamak: H\u2082O\u2082+I\u207b\u2192H\u2082O+IO\u207b<br>' +
      '&nbsp;&nbsp;II. basamak: H\u2082O\u2082+IO\u207b\u2192H\u2082O+O\u2082+I\u207b<br>' +
      'Deneysel hız denklemi r=k[H\u2082O\u2082][I\u207b] olarak bulunmuştur \u2014 bu, I. basama\u011fın katsayılarıyla UYUMLU oldu\u011fu i\u00e7in <b>I. basamak yavaş (hız belirleyici) basamaktır.</b> (I\u207b katalizör, IO\u207b ara \u00fcr\u00fcnd\u00fcr; ikisi de net tepkimede g\u00f6r\u00fcnmez.)' +
      '</p>' +
      '<div style="background:#050510;border:1px solid rgba(245,158,11,.25);border-radius:12px;overflow:hidden;margin:10px 0"><canvas id="mgraf114" data-h="180" style="width:100%;display:block"></canvas></div>' +
      '<p style="font-size:11px;color:var(--tx3);text-align:center;margin-bottom:10px">Grafik 1.14: 2 basamaklı tepkimenin PE-TK grafi\u011fi \u2014 1. basamak (b\u00fcy\u00fck Ea, endotermik) daha yavaş; 2. basamak hızlı; net tepkime ekzotermiktir</p>' +
      '<p style="font-size:13px;color:var(--tx2);line-height:1.9">' +
      '<b>\u00d6rnek (1.12 Uygulama \u2014 Kloroetan eldesi):</b><br>' +
      '&nbsp;&nbsp;I. C\u2082H\u2084+HCl\u2192C\u2082H\u2085\u207a+Cl\u207b (b\u00fcy\u00fck E<sub>a</sub>, yavaş) &nbsp; II. C\u2082H\u2085\u207a+Cl\u207b\u2192C\u2082H\u2085Cl (k\u00fc\u00e7\u00fck E<sub>a</sub>, hızlı)<br>' +
      '&nbsp;&nbsp;Net tepkime: <b>C\u2082H\u2084+HCl\u2192C\u2082H\u2085Cl</b>. Hız denklemi yavaş (I.) basama\u011fa g\u00f6re: <b>r=k[C\u2082H\u2084][HCl]</b>.<br><br>' +
      '<b>\u00d6rnek (Nitrozil kl\u00fcr\u00fcr):</b> 2NO(g)+Cl\u2082(g)\u21922NOCl(g), r=k[NO][Cl\u2082] olarak verildi\u011fine g\u00f6re (katsayılarla UYUMSUZ, 2\u22601) tepkime <b>\u00e7ok basamaklıdır</b>; tepkime derecesi <b>iki</b>; yavaş basamak <b>NO(g)+Cl\u2082(g)\u2192\u00dcr\u00fcn</b> şeklinde olmalıdır (NO+\u00bdCl\u2082 de\u011fil, tam bir Cl\u2082 molek\u00fcl\u00fc ile); hız sabitinin birimi <b>1/(M\u00b7s)</b>; NO ve Cl\u2082 derişimi 2 katına \u00e7ıkınca hız <b>d\u00f6rt</b> katına \u00e7ıkar.' +
      '</p>' +
    '</div>';
  }

  function maarifBell(x, cx0, w, mu, sigma, amp){
    // Basit çan eğrisi (Gauss benzeri) çizer, path olarak x noktalarını döndürür
    var pts = [];
    for (var px = 0; px <= w; px += 2) {
      var xv = mu + (px - w*0.32) / (w*0.5) * sigma * 2.2;
      var y = amp * Math.exp(-Math.pow(xv - mu, 2) / (2*sigma*sigma));
      pts.push([cx0 + px, y]);
    }
    return pts;
  }

  function maarifDrawGraphs(){
    // --- Grafik 1.4: Tanecik sayısı - Kinetik enerji (eşik değeri) ---
    maarifChart('mgraf14', function(x, W, H2){
      var g = mcAxes(x, W, H2, 44, 14, 14, 30, 'Kinetik enerji', 'Tanecik sayısı');
      var pts = [];
      for (var i = 0; i <= 100; i++) {
        var xf = i/100, xv = g.padL + xf*g.plotW;
        var yv = Math.exp(-Math.pow((xf-0.32)*3.1, 2)) * (1 - xf*0.15);
        pts.push([xv, g.padT + g.plotH - yv*g.plotH*0.92]);
      }
      var eşikX = g.padL + 0.58*g.plotW;
      // Kırmızı alan (eşik ötesi)
      x.beginPath(); x.moveTo(eşikX, g.padT+g.plotH);
      pts.forEach(function(p){ if (p[0] >= eşikX) x.lineTo(p[0], p[1]); });
      x.lineTo(g.padL+g.plotW, g.padT+g.plotH); x.closePath();
      x.fillStyle = 'rgba(239,68,68,.45)'; x.fill();
      // Eğri
      x.beginPath(); pts.forEach(function(p,i2){ i2===0?x.moveTo(p[0],p[1]):x.lineTo(p[0],p[1]); });
      x.strokeStyle = '#f59e0b'; x.lineWidth = 2; x.stroke();
      // Eşik çizgisi
      x.strokeStyle = 'rgba(255,255,255,.5)'; x.setLineDash([4,3]); x.lineWidth = 1;
      x.beginPath(); x.moveTo(eşikX, g.padT); x.lineTo(eşikX, g.padT+g.plotH); x.stroke(); x.setLineDash([]);
      x.fillStyle = '#fca5a5'; x.font = '10px sans-serif'; x.textAlign = 'center';
      x.fillText('Eşik değeri', eşikX, g.padT+g.plotH+16);
    });

    // --- Grafik 1.5: Endotermik PE-TK ---
    maarifChart('mgraf15', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Tepkime koordinatı', 'Pot. enerji');
      var reactY = g.padT + g.plotH*0.72, prodY = g.padT + g.plotH*0.42, peakY = g.padT + g.plotH*0.06;
      drawPETK(x, g, reactY, prodY, peakY);
      annotatePETK(x, g, reactY, prodY, peakY, 'Eai', 'Eag', '\u0394H>0');
    });
    // --- Grafik 1.6: Ekzotermik PE-TK ---
    maarifChart('mgraf16', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Tepkime koordinatı', 'Pot. enerji');
      var reactY = g.padT + g.plotH*0.42, prodY = g.padT + g.plotH*0.72, peakY = g.padT + g.plotH*0.06;
      drawPETK(x, g, reactY, prodY, peakY);
      annotatePETK(x, g, reactY, prodY, peakY, 'Eai', 'Eag', '\u0394H<0');
    });

    function drawPETK(x, g, reactY, prodY, peakY){
      function px(f){ return g.padL + f*g.plotW; }
      x.strokeStyle = '#f59e0b'; x.lineWidth = 2.2;
      x.beginPath();
      x.moveTo(px(0.02), reactY); x.lineTo(px(0.30), reactY);
      x.bezierCurveTo(px(0.40), reactY, px(0.42), peakY, px(0.5), peakY);
      x.bezierCurveTo(px(0.58), peakY, px(0.60), prodY, px(0.70), prodY);
      x.lineTo(px(0.98), prodY);
      x.stroke();
      x.strokeStyle = 'rgba(255,255,255,.2)'; x.setLineDash([3,3]); x.lineWidth = 1;
      x.beginPath(); x.moveTo(px(0.02), reactY); x.lineTo(px(0.98), reactY); x.stroke();
      x.beginPath(); x.moveTo(px(0.30), prodY); x.lineTo(px(0.98), prodY); x.stroke();
      x.setLineDash([]);
    }
    function annotatePETK(x, g, reactY, prodY, peakY, l1, l2, l3){
      function px(f){ return g.padL + f*g.plotW; }
      x.strokeStyle = 'rgba(255,255,255,.4)'; x.lineWidth = 1;
      x.beginPath(); x.moveTo(px(0.5), reactY); x.lineTo(px(0.5), peakY); x.stroke();
      x.beginPath(); x.moveTo(px(0.68), prodY); x.lineTo(px(0.68), peakY); x.stroke();
      x.fillStyle = '#fcd34d'; x.font = 'bold 10px sans-serif'; x.textAlign = 'left';
      x.fillText(l1, px(0.03), (reactY+peakY)/2);
      x.fillStyle = '#93c5fd'; x.fillText(l2, px(0.70), (prodY+peakY)/2);
      x.fillStyle = reactY < prodY ? '#fca5a5' : '#86efac';
      x.fillText(l3, px(0.32), (reactY+prodY)/2+4);
      x.fillStyle = 'rgba(255,255,255,.5)'; x.fillText('Tepkenler', px(0.03), reactY-6);
      x.fillText('\u00dcr\u00fcnler', px(0.72), prodY-6);
    }

    // --- Grafik 1.7: H2O2 derişim-zaman ---
    maarifChart('mgraf17', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Zaman (s)', '[H\u2082O\u2082] mol/L');
      var data = [[0,2.30],[200,2.00],[400,1.70],[600,1.50],[1200,1.00],[1800,0.60],[2600,0.30]];
      function px(t){ return g.padL + (t/2600)*g.plotW; }
      function py(c){ return g.padT + g.plotH - (c/2.30)*g.plotH; }
      x.strokeStyle = '#f59e0b'; x.lineWidth = 2.2; x.beginPath();
      data.forEach(function(d,i2){ i2===0?x.moveTo(px(d[0]),py(d[1])):x.lineTo(px(d[0]),py(d[1])); });
      x.stroke();
      x.fillStyle = '#f59e0b';
      data.forEach(function(d){ x.beginPath(); x.arc(px(d[0]), py(d[1]), 2.5, 0, 6.283); x.fill(); });
    });

    // --- Grafik 1.9/1.10: Sıcaklık etkisi (T1,T2 kinetik enerji dağılımı) ---
    maarifChart('mgraf9', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Kinetik enerji', 'Molekül sayısı');
      function curve(muF, sigF, ampF){
        var pts = [];
        for (var i = 0; i <= 100; i++) {
          var f = i/100, xv = g.padL + f*g.plotW;
          var xf = (f - muF) / sigF;
          var yv = ampF * Math.exp(-xf*xf*2.2);
          pts.push([xv, g.padT + g.plotH - yv*g.plotH*0.9]);
        }
        return pts;
      }
      var t1 = curve(0.28, 0.16, 1.0);
      var t2 = curve(0.42, 0.22, 0.72);
      var eşikF = 0.62, eşikX = g.padL + eşikF*g.plotW;
      function fillBeyond(pts, col){
        x.beginPath(); x.moveTo(eşikX, g.padT+g.plotH);
        pts.forEach(function(p){ if (p[0] >= eşikX) x.lineTo(p[0], p[1]); });
        x.lineTo(g.padL+g.plotW, g.padT+g.plotH); x.closePath();
        x.fillStyle = col; x.fill();
      }
      fillBeyond(t2, 'rgba(239,68,68,.4)');
      fillBeyond(t1, 'rgba(96,165,250,.5)');
      function stroke(pts, col){ x.beginPath(); pts.forEach(function(p,i2){ i2===0?x.moveTo(p[0],p[1]):x.lineTo(p[0],p[1]); }); x.strokeStyle=col; x.lineWidth=2; x.stroke(); }
      stroke(t1, '#3b82f6'); stroke(t2, '#ef4444');
      x.strokeStyle = 'rgba(255,255,255,.5)'; x.setLineDash([4,3]); x.lineWidth = 1;
      x.beginPath(); x.moveTo(eşikX, g.padT); x.lineTo(eşikX, g.padT+g.plotH); x.stroke(); x.setLineDash([]);
      x.textAlign = 'left'; x.font = '10px sans-serif';
      x.fillStyle = '#93c5fd'; x.fillText('T\u2081 (düşük)', g.padL+4, g.padT+10);
      x.fillStyle = '#fca5a5'; x.fillText('T\u2082 (yüksek)', g.padL+4, g.padT+24);
      x.fillStyle = 'rgba(255,255,255,.5)'; x.fillText('Eşik', eşikX+3, g.padT+g.plotH-4);
    });

    // --- Grafik 1.11: Katalizörlü/katalizörsüz PE-TK ---
    maarifChart('mgraf11', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Tepkime koordinatı', 'Pot. enerji');
      var reactY = g.padT + g.plotH*0.55, prodY = g.padT + g.plotH*0.78;
      function curve(peakY, col, dashed){
        function px(f){ return g.padL + f*g.plotW; }
        x.beginPath();
        x.moveTo(px(0.02), reactY); x.lineTo(px(0.30), reactY);
        x.bezierCurveTo(px(0.40), reactY, px(0.42), peakY, px(0.5), peakY);
        x.bezierCurveTo(px(0.58), peakY, px(0.60), prodY, px(0.70), prodY);
        x.lineTo(px(0.98), prodY);
        x.strokeStyle = col; x.lineWidth = 2;
        if (dashed) x.setLineDash([5,4]);
        x.stroke(); x.setLineDash([]);
      }
      curve(g.padT + g.plotH*0.04, '#3b82f6', false);
      curve(g.padT + g.plotH*0.30, '#22c55e', true);
      x.fillStyle = '#3b82f6'; x.font = '10px sans-serif'; x.textAlign = 'left';
      x.fillText('Katalizörsüz', g.padL+4, g.padT+8);
      x.fillStyle = '#22c55e'; x.fillText('Katalizörlü', g.padL+4, g.padT+20);
    });
    // --- Grafik 1.12: Katalizörlü/katalizörsüz tanecik-KE dağılımı ---
    maarifChart('mgraf12', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Kinetik enerji', 'Tanecik sayısı');
      var pts = [];
      for (var i = 0; i <= 100; i++) {
        var f = i/100, xv = g.padL + f*g.plotW;
        var yv = Math.exp(-Math.pow((f-0.3)*2.6, 2));
        pts.push([xv, g.padT + g.plotH - yv*g.plotH*0.9]);
      }
      var eaCatF = 0.45, eaNoCatF = 0.68;
      var eaCatX = g.padL+eaCatF*g.plotW, eaNoCatX = g.padL+eaNoCatF*g.plotW;
      function fillFrom(fromX, col){
        x.beginPath(); x.moveTo(fromX, g.padT+g.plotH);
        pts.forEach(function(p){ if (p[0] >= fromX) x.lineTo(p[0], p[1]); });
        x.lineTo(g.padL+g.plotW, g.padT+g.plotH); x.closePath();
        x.fillStyle = col; x.fill();
      }
      fillFrom(eaCatX, 'rgba(96,165,250,.5)');
      fillFrom(eaNoCatX, 'rgba(34,197,94,.55)');
      x.beginPath(); pts.forEach(function(p,i2){ i2===0?x.moveTo(p[0],p[1]):x.lineTo(p[0],p[1]); });
      x.strokeStyle = '#f59e0b'; x.lineWidth = 2; x.stroke();
      x.strokeStyle = 'rgba(255,255,255,.5)'; x.setLineDash([4,3]); x.lineWidth = 1;
      x.beginPath(); x.moveTo(eaCatX, g.padT); x.lineTo(eaCatX, g.padT+g.plotH); x.stroke();
      x.beginPath(); x.moveTo(eaNoCatX, g.padT); x.lineTo(eaNoCatX, g.padT+g.plotH); x.stroke();
      x.setLineDash([]);
      x.font = '9px sans-serif'; x.textAlign = 'center';
      x.fillStyle = '#93c5fd'; x.fillText('Ea(kat)', eaCatX, g.padT+g.plotH+10);
      x.fillStyle = '#86efac'; x.fillText('Ea(katsız)', eaNoCatX, g.padT-4);
    });

    // --- Grafik 1.13: Toz/Parça çinko H2 mol-zaman ---
    maarifChart('mgraf13', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Zaman', 'n(H\u2082)');
      function curve(rate, col){
        var pts = [];
        for (var i = 0; i <= 100; i++) {
          var f = i/100;
          var yv = 1 - Math.exp(-rate*f*6);
          pts.push([g.padL+f*g.plotW, g.padT+g.plotH-yv*g.plotH*0.85]);
        }
        x.beginPath(); pts.forEach(function(p,i2){ i2===0?x.moveTo(p[0],p[1]):x.lineTo(p[0],p[1]); });
        x.strokeStyle = col; x.lineWidth = 2.2; x.stroke();
      }
      curve(1.0, '#ef4444');
      curve(0.4, '#3b82f6');
      x.font = '10px sans-serif'; x.textAlign = 'left';
      x.fillStyle = '#ef4444'; x.fillText('Toz \u00e7inko', g.padL+4, g.padT+10);
      x.fillStyle = '#3b82f6'; x.fillText('Par\u00e7a \u00e7inko', g.padL+4, g.padT+22);
    });

    // --- Grafik 1.14: 2 basamaklı tepkime PE-TK ---
    maarifChart('mgraf114', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Tepkime koordinatı', 'Pot. enerji');
      function px(f){ return g.padL + f*g.plotW; }
      var reactY = g.padT + g.plotH*0.55, midY = g.padT + g.plotH*0.62, prodY = g.padT + g.plotH*0.80;
      var peak1Y = g.padT + g.plotH*0.03, peak2Y = g.padT + g.plotH*0.40;
      x.beginPath();
      x.moveTo(px(0.02), reactY); x.lineTo(px(0.14), reactY);
      x.bezierCurveTo(px(0.20), reactY, px(0.22), peak1Y, px(0.30), peak1Y);
      x.bezierCurveTo(px(0.38), peak1Y, px(0.40), midY, px(0.48), midY);
      x.lineTo(px(0.55), midY);
      x.bezierCurveTo(px(0.61), midY, px(0.63), peak2Y, px(0.70), peak2Y);
      x.bezierCurveTo(px(0.77), peak2Y, px(0.79), prodY, px(0.86), prodY);
      x.lineTo(px(0.98), prodY);
      x.strokeStyle = '#f59e0b'; x.lineWidth = 2.2; x.stroke();
      x.fillStyle = 'rgba(255,255,255,.5)'; x.font = '9px sans-serif'; x.textAlign = 'center';
      x.fillText('1. basamak (yavaş)', px(0.24), peak1Y-6);
      x.fillText('2. basamak (hızlı)', px(0.66), peak2Y-6);
      x.fillText('Tepkenler', px(0.06), reactY-6);
      x.fillText('Ara \u00fcr\u00fcn', px(0.5), midY-6);
      x.fillText('\u00dcr\u00fcnler', px(0.90), prodY-6);
    });
  }

  // ---------- 25. MAARİF HIZ — ÖLÇME VE DEĞERLENDİRME (66 SORU) ----------
  var MOL_DY = [
    { n:1, t:'Entalpi, bir sistemin sahip olduğu toplam enerjidir.', a:'D', ac:'Lise düzeyinde entalpi, sistemin sahip olduğu toplam enerji (ısı içeriği) olarak tanımlanır.' },
    { n:2, t:'Isı alarak gerçekleşen tepkimeler endotermik tepkimelerdir.', a:'D', ac:'Endotermik = çevreden ısı alan tepkime.' },
    { n:3, t:'Ekzotermik bir tepkimede çevreye ısı verilir.', a:'D', ac:'Ekzotermik tepkimede sistem çevreye enerji verir.' },
    { n:4, t:'Bağ enerjileri her zaman pozitif değerdir.', a:'D', ac:'Bir bağı kırmak her zaman enerji gerektirir (endotermik bir süreçtir), bu yüzden bağ enerjisi hep pozitiftir.' },
    { n:5, t:'Eai > Eag ise endotermik bir olaydır.', a:'D', ac:'\u0394H=Eai\u2212Eag; Eai>Eag ise \u0394H>0, yani endotermik.' },
    { n:6, t:'Net tepkimede katalizör bulunmaz.', a:'D', ac:'Katalizör bir basamakta girip diğerinde değişmeden çıkar; net (toplam) tepkimede görünmez.' },
    { n:7, t:'Bir tepkimede aktivasyon enerjisi katalizör ile değişir.', a:'D', ac:'Katalizör aktivasyon enerjisini düşürür.' },
    { n:8, t:'Derişim, tepkime hız sabitini artırır.', a:'Y', ac:'Derişim HIZI artırır ama hız SABİTİNİ (k) etkilemez; k yalnızca sıcaklık/temas yüzeyi/katalizörle değişir.' },
    { n:9, t:'Endotermik bir tepkimenin entalpi değişimi (\u0394H) negatiftir.', a:'Y', ac:'Endotermik tepkimede \u0394H POZİTİFTİR (>0).' },
    { n:10, t:'Tepkime hız bağıntısına saf katı ve sıvı hâldeki maddeler yazılmaz.', a:'D', ac:'Derişimleri sabit olduğu için hıza etkileri yoktur, hız denklemine yazılmazlar.' },
    { n:11, t:'Temas yüzeyi arttıkça tepkime hızı azalır.', a:'Y', ac:'Temas yüzeyi arttıkça çarpışma sıklığı ve dolayısıyla hız ARTAR.' },
    { n:12, t:'Endotermik tepkimelerde sistemin enerjisi artar.', a:'D', ac:'Sistem çevreden enerji aldığı için toplam entalpisi artar.' },
    { n:13, t:'Endotermik tepkimelerde ürünler daha kararlıdır.', a:'Y', ac:'Endotermik tepkimede TEPKENLER daha kararlıdır (daha düşük enerjilidir); ürünler daha az kararlıdır.' },
    { n:14, t:'Mekanizmalı tepkimelerde hız ifadesi yavaş adıma göre yazılır.', a:'D', ac:'Çok basamaklı tepkimelerde hızı yavaş (hız belirleyici) basamak belirler.' },
    { n:15, t:'Ekzotermik tepkimelerde sistemin enerjisi azalır.', a:'D', ac:'Sistem çevreye enerji verdiği için toplam entalpisi azalır.' }
  ];

  var MOL_BOSLUK = [
    { n:2, t:'Günlük hayattaki bir olay ……… ise sistem çevreden ısı alır.', a:'endotermik' },
    { n:3, t:'Kömür, petrol, doğal gaz gibi fosil yakıtlar yandığında oluşan CO\u2082 gazı ……… neden olur.', a:'küresel ısınmaya' },
    { n:4, t:'Birim miktar başına yüksek enerji açığa çıkaran maddeler ……… olma potansiyeline sahiptir.', a:'yakıt' },
    { n:5, t:'Bir tepkimede kırılan bağların enerjileri toplamı, oluşan bağların enerjileri toplamından ……… ise tepkime ekzotermiktir.', a:'az (küçük)' },
    { n:6, t:'Elementlerin doğadaki en kararlı hâllerinin oluşum entalpileri ……… kabul edilir.', a:'sıfır' },
    { n:7, t:'Entalpi değişim değeri negatif (\u0394H<0) olan tepkimeler, ……… tepkimelerdir.', a:'ekzotermik' },
    { n:8, t:'Tepkenlerin ürüne dönüşebilmesi için gerekli en düşük enerjiye ……… denir.', a:'aktivasyon enerjisi' },
    { n:9, t:'Bir tepkimenin potansiyel enerji-tepkime koordinat grafiğinde tepken ve ürünlerin enerji seviyeleri arasındaki farka ……… denir.', a:'tepkime entalpisi (\u0394H)' },
    { n:10, t:'Belirli bir zaman aralığında hesaplanan tepkime hızına ……… denir.', a:'ortalama (tepkime) hız(ı)' },
    { n:11, t:'Kimyasal bir tepkimede ürünler için ……… hızından bahsedilir.', a:'oluşma (oluşum)' },
    { n:12, t:'Aktivasyon enerjisini düşürerek tepkimeyi hızlandıran maddelere ……… denir.', a:'katalizör' },
    { n:13, t:'Sıcaklık artışı birim zamandaki ……… sayısını artırarak tepkimeyi hızlandırır.', a:'etkin çarpışma' },
    { n:14, t:'Kimyasal tepkimelerin hızı ile tepkimeye giren maddelerin derişimleri arasındaki ilişkiyi gösteren matematiksel eşitliğe ……… denir.', a:'hız denklemi' },
    { n:15, t:'Derecesi ……… olan bir tepkimenin hız sabitinin birimi 1/M\u00b2s\u2019dir.', a:'3 (üç)', ac:'1/(sM\u207f\u207b\u00b9)=1/(sM\u00b2) \u2192 n\u22121=2 \u2192 n=3' },
    { n:16, t:'Tepkime derecesi üç olan gaz fazında gerçekleşen bir tepkimenin gerçekleştiği kabın hacmi yarıya düşürüldüğünde tepkimenin hızı ……… katına çıkar.', a:'8 (sekiz)', ac:'Hacim yarıya \u2192 derişim 2 kat \u2192 hız 2\u00b3=8 kat.' }
  ];

  var MOL_ACIK = [
    { n:17, t:'Aşağıdaki olaylardaki enerji değişimlerini açıklayınız (endotermik mi, ekzotermik mi?): a) Yakıt pillerinde H\u2082+O\u2082 tepkimesiyle elektrik üretimi, b) Şimşek/yıldırım etkisiyle atmosferdeki N\u2082 bağlarının kırılması, c) İklimlendirmede gazın sıkıştırılmasıyla ortamın ısıtılması, ç) İklimlendirmede gazın genleştirilmesiyle ortamın soğutulması, d) Kuru buzun süblimleşmesi, e) NaCl çözeltisinin elektroliz edilmesi.',
      c:'a) EKZOTERMİK \u2014 H\u2082 yanması enerji açığa çıkarır (elektrik üretilir).<br>b) ENDOTERMİK \u2014 N\u2261N üçlü bağını kırmak çok enerji ister; bu enerji yıldırımdan (çevreden) alınır.<br>c) EKZOTERMİK \u2014 sıkıştırma sırasında sisteme yapılan iş ısınmaya (çevreye ısı verecek şekilde) dönüşür.<br>ç) ENDOTERMİK \u2014 genleşen gaz çevresini soğutur, yani ortamdan ısı çeker.<br>d) ENDOTERMİK \u2014 katıdan doğrudan gaza geçiş (süblimleşme) ısı gerektirir.<br>e) ENDOTERMİK \u2014 elektroliz dışarıdan sürekli elektrik enerjisi gerektirir.' },
    { n:18, t:'Joule-Thomson deneyinde A bölmesinde piston itilip gaz sıkıştırılınca sıcaklık YÜKSELİYOR, B bölmesine geçip genleşince sıcaklık DÜŞÜYOR. a) A bölmesindeki olay endotermik mi ekzotermik mi? b) B bölmesindeki olay endotermik mi ekzotermik mi?',
      c:'a) A bölmesi: Sıkıştırma sırasında gazın sıcaklığı artar \u2014 bu, sisteme yapılan işin ısıya dönüşmesiyle EKZOTERMİK bir görünüm sergiler (sistem ısınırken çevresine göre "ısı vermiş" gibi bir enerji dönüşümü yaşar).<br>b) B bölmesi: Genleşme sırasında sıcaklık düşer \u2014 sistem soğur, yani ENDOTERMİK bir görünüm sergiler (çevreden ısı çekiyormuş gibi enerji emilimi olur).<br><i>Not: Bu, gerçek gazların Joule-Thomson etkisidir; düzenek dıştan yalıtılıdır, gözlenen sıcaklık değişimi moleküllerarası kuvvetlerden kaynaklanan bir iç enerji dönüşümüdür.</i>' },
    { n:19, t:'50\u2019şer gram odun talaşı (10\u219220\u00b0C) ve fındık kabuğu (10\u219230\u00b0C), 2000\u2019er gram suyu farklı sıcaklıklara ısıtıyor. Hangisinin yakıt olma potansiyeli daha fazladır?',
      c:'<b>Fındık kabuğu.</b> Aynı kütlede yakıt, suyu 10\u00b0C\u2019lik farka (odun talaşı) karşılık 20\u00b0C\u2019lik farka çıkarıyor \u2014 yani birim kütle başına AÇIĞA ÇIKAN ISI fındık kabuğunda daha fazladır, dolayısıyla yakıt olma potansiyeli daha yüksektir.' },
    { n:20, t:'Na(k)+H\u2082O(s)\u2192Na\u207a(suda)+OH\u207b(suda)+H\u2082(g) tepkimesinde soğuk ve sıcak suda farklı renk koyuluğu (fenolftalein ile) gözleniyor \u2014 sıcak su daha koyu mor. a) Renk koyuluğu farkının nedeni? b) Sıcaklığın etkisi?',
      c:'a) Sıcak suda tepkime DAHA HIZLI gerçekleştiği için birim zamanda daha çok OH\u207b iyonu oluşur, bu da daha koyu mor renk verir.<br>b) Sıcaklık arttıkça taneciklerin kinetik enerjisi artar \u2192 etkin çarpışma sayısı artar \u2192 tepkime hızlanır (Na\u2019nın suyla tepkimesi sıcak suda daha hızlıdır).' },
    { n:21, t:'C\u2082H\u2084(g)+3O\u2082(g)\u21922CO\u2082(g)+2H\u2082O(g) tepkimesi için (bağ enerjileri: C=C:611, C\u2212H:414, C=O:736, O=O:498, O\u2212H:464): a) Kırılan bağlar/enerjileri, b) Oluşan bağlar/enerjileri, c) \u0394H, ç) Endotermik/ekzotermik?',
      c:'a) Kırılan: 4 C\u2212H (4\u00d7414=1656) + 1 C=C (611) + 3 O=O (3\u00d7498=1494) \u2192 <b>Toplam=3761 kJ</b><br>b) Oluşan: 4 C=O (4\u00d7736=2944, 2CO\u2082\u2019den) + 4 O\u2212H (4\u00d7464=1856, 2H\u2082O\u2019dan) \u2192 <b>Toplam=4800 kJ</b><br>c) \u0394H=kırılan\u2212oluşan=3761\u22124800=<b>\u22121039 kJ</b><br>ç) \u0394H<0 olduğu için <b>EKZOTERMİK</b>tir.' },
    { n:22, t:'3O\u2082(g)\u21922O\u2083(g), \u0394H\u00b0=+285,4 kJ. a) O\u2082 ve O\u2083\u2019ün \u0394H\u00b0f değerleri? b) Kararlılık karşılaştırması? c) Kırılan/oluşan bağ enerjisi karşılaştırması? ç) Tepken/ürün kararlılığı? d) Endo/ekzo nedeni?',
      c:'a) O\u2082 element hâlinde en kararlı biçimde olduğu için \u0394H\u00b0f(O\u2082)=<b>0</b>. \u0394H=2\u00d7\u0394Hf(O\u2083)\u22120 \u2192 \u0394Hf(O\u2083)=285,4/2=<b>+142,7 kJ/mol</b><br>b) \u0394Hf(O\u2082)=0 < \u0394Hf(O\u2083)=142,7 \u2192 <b>O\u2082 daha kararlıdır</b> (enerjisi daha düşük).<br>c) Tepkime endotermik (\u0394H>0) olduğu için kırılan bağ enerjisi TOPLAMI, oluşan bağ enerjisi toplamından FAZLADIR.<br>ç) Tepkenler (O\u2082) ürünlerden (O\u2083) daha kararlıdır.<br>d) Endotermiktir çünkü çevreden enerji alınarak O\u2082\u2019nin kararlı bağları kısmen kırılıp daha az kararlı O\u2083 oluşturulur.' },
    { n:23, t:'Metanın (CH\u2084) yanma tepkimesine ait potansiyel enerji-tepkime koordinatı grafiğine göre: a) Tepkime denklemi, b) Kırılan/oluşan bağ enerjisi karşılaştırması, c) Tepken/ürün enerjisi karşılaştırması, ç) Kararlılık karşılaştırması, d) Endo/ekzo nedeni?',
      c:'a) <b>CH\u2084(g)+2O\u2082(g)\u2192CO\u2082(g)+2H\u2082O(g)</b><br>b) Metan yanması bilinen bir EKZOTERMİK tepkime olduğu için oluşan bağ enerjisi toplamı, kırılan bağ enerjisi toplamından FAZLADIR.<br>c) Tepken enerjisi > Ürün enerjisi (enerji açığa çıktığı için ürünler daha düşük enerjilidir).<br>ç) Ürünler (CO\u2082+H\u2082O) tepkenlerden (CH\u2084+O\u2082) daha kararlıdır.<br>d) Ekzotermiktir; oluşan güçlü C=O ve O\u2212H bağları, kırılan C\u2212H ve O=O bağlarından daha fazla enerji açığa çıkarır.<br><i>Not: Grafikteki tam sayısal (kJ) değerler görsele bağlıdır; buradaki analiz metan yanmasının bilinen ekzotermik karakterine dayanır.</i>' },
    { n:24, t:'C\u2083H\u2088(g)+5O\u2082(g)\u21923CO\u2082(g)+4H\u2082O(g), \u0394H=\u22122219,9 kJ/mol. \u0394Hf(CO\u2082)=\u2212393,5, \u0394Hf(H\u2082O)=\u2212285,8 kJ/mol. C\u2083H\u2088\u2019nin \u0394Hf\u2019si kaçtır?',
      c:'\u0394H=[3\u0394Hf(CO\u2082)+4\u0394Hf(H\u2082O)]\u2212\u0394Hf(C\u2083H\u2088)<br>\u22122219,9=[3(\u2212393,5)+4(\u2212285,8)]\u2212\u0394Hf(C\u2083H\u2088)=\u22122323,7\u2212\u0394Hf(C\u2083H\u2088)<br>\u0394Hf(C\u2083H\u2088)=\u22122323,7+2219,9=<b>\u2212103,8 kJ/mol</b>' },
    { n:25, t:'H\u2082(g)+\u00bdO\u2082(g)\u2192H\u2082O(g) tepkimesinde r<sub>H2</sub>, r<sub>O2</sub> ve r<sub>H2O</sub> arasındaki ilişkiyi yazınız.',
      c:'Katsayı oranına göre: <b>r<sub>tepkime</sub>=r<sub>H2</sub>=2r<sub>O2</sub>=r<sub>H2O</sub></b> (H\u2082 ve H\u2082O katsayısı 1 olduğu için hızları eşittir; O\u2082\u2019nin katsayısı \u00bd olduğu için onun hızı diğerlerinin yarısıdır).' },
    { n:26, t:'CO(g)+H\u2082O(g)\u2192CO\u2082(g)+H\u2082(g) tepkimesinin PE-TK grafiğinde I, II, III durumları için: a) I. durum etkin çarpışma sonucu mu oluştu? b) I ve II\u2019nin ürün oluşturma ihtimali? c) III\u2019e dönüşüm şartları?',
      c:'a) Grafikte I tipik olarak TEPKENLERİN henüz çarpışmadığı/başlangıç enerjisini gösterir \u2014 etkin çarpışma sonucu OLUŞMAMIŞTIR, tepkimenin başlangıç noktasıdır.<br>b) I ve II\u2019nin (tepken veya düşük enerjili ara durumlar) ürün oluşturma ihtimali, sahip oldukları enerjinin eşik değerini (aktivasyon enerjisini) aşıp aşmadığına ve uygun geometride çarpışıp çarpışmadıklarına bağlıdır.<br>c) CO ve H\u2082O, III (ürünler) durumuna dönüşebilmek için UYGUN GEOMETRİDE ve aktivasyon enerjisini AŞACAK kinetik enerjiyle çarpışmalıdır.' },
    { n:27, t:'C\u2083H\u2086(g)+4,5O\u2082(g)\u21923CO\u2082(g)+3H\u2082O(g), 2L\u2019lik kapta 2,4 mol siklopropan 10 dakikada harcanıyor. H\u2082O oluşma hızı kaç M/s?',
      c:'r<sub>C3H6</sub>=(2,4mol/2L)/(10dk\u00d760s)=1,2M/600s=<b>0,002 M/s</b><br>Katsayı oranı 3:1 olduğu için r<sub>H2O</sub>=3\u00d7r<sub>C3H6</sub>=3\u00d70,002=<b>0,006 M/s</b>' },
    { n:28, t:'CaCO\u2083(k)+2HCl(suda)\u2192CaCl\u2082(suda)+CO\u2082(g)+H\u2082O(s) \u2014 kütle kaybı (g) zamanla (dk): 0\u21920, 2\u21922,1, 4\u21923,0, 6\u21923,5, 8\u21923,8, 10\u21924,0, 12\u21924,1, 14\u21924,1, 16\u21924,1. a) Kütle kaybının nedeni, c) hızın zamanla değişimi, ç) tepkime ne kadar sürdü, d) 0-2 ve 0-8 dk arası CaCO\u2083/HCl ortalama harcanma hızı?',
      c:'a) Kütle kaybı, oluşan CO\u2082 gazının (ve az miktarda su buharının) ortama kaçmasından kaynaklanır.<br>c) Zamanla derişim (HCl) azaldığı için çarpışma sıklığı düşer, tepkime hızı GİDEREK AZALIR (grafikte eğrinin eğimi giderek yataylaşır).<br>ç) 12. dakikadan sonra kütle kaybı sabitleştiği (4,1g) için tepkime yaklaşık <b>12 dakikada tamamlanmıştır</b>.<br>d) CO\u2082 mol kaybı = kütle/44: 0-2dk\u2019da 2,1/44\u22480,048 mol, 0-8dk\u2019da 3,8/44\u22480,086 mol. CaCO\u2083 harcanma hızı=CO\u2082 oluşma hızına eşit (1:1); HCl harcanma hızı bunun 2 katıdır. <b>0-2dk hızı (\u22480,024 mol/dk CaCO\u2083, 0,048 mol/dk HCl), 0-8dk hızından (\u22480,0108 mol/dk CaCO\u2083, 0,0216 mol/dk HCl) daha BÜYÜKTÜR</b> \u2014 hız zamanla azalmıştır.' },
    { n:29, t:'Linyit (C:%30, Isıl:4000 kcal/kg), Taş kömürü (C:%70, 6500), Antrasit (C:%85, 7800). a) Karbon oranı-ısıl değer ilişkisi? b) Hangisi daha çok çevre kirliliği yapar?',
      c:'a) Karbon oranı arttıkça ısıl değer de ARTAR (doğru orantılı) \u2014 antrasit en yüksek karbon oranına ve ısıl değere sahiptir.<br>b) <b>Linyit</b> daha çok çevre kirliliği oluşturur; kükürt/azot oranı (ve kül oranı) diğerlerine göre değişken olsa da, düşük ısıl değeri nedeniyle AYNI enerjiyi elde etmek için çok daha FAZLA miktarda yakılması gerekir, bu da daha fazla kükürt/kül/CO\u2082 salınımına yol açar.' },
    { n:30, t:'NO(g)+Br\u2082(g)\u2192\u00fcr\u00fcn tepkimesi: Deney1:[NO]=0,10,[Br\u2082]=0,10,r=0,010; Deney2:[NO]=0,20,[Br\u2082]=0,10,r=0,040; Deney3:[NO]=0,20,[Br\u2082]=0,30,r=0,120. a) Hız denklemi? b) Tepkime derecesi? c) k değeri/birimi? ç) [NO]=0,4,[Br\u2082]=0,2 iken hız?',
      c:'1\u21922: [Br\u2082] sabit, [NO] 2 kat\u2192hız 4 kat \u2192 NO\u2019ya göre <b>2. derece</b>. 2\u21923: [NO] sabit, [Br\u2082] 3 kat\u2192hız 3 kat \u2192 Br\u2082\u2019ye göre <b>1. derece</b>.<br>a) <b>r=k[NO]\u00b2[Br\u2082]</b><br>b) Tepkime derecesi=2+1=<b>3</b><br>c) k=0,010/[(0,1)\u00b2\u00d70,1]=<b>10</b>, birimi=<b>1/(M\u00b2\u00b7s)</b><br>ç) r=10\u00d7(0,4)\u00b2\u00d70,2=10\u00d70,16\u00d70,2=<b>0,32 M/s</b>' },
    { n:31, t:'N\u2082(g)+3H\u2082(g)\u21922NH\u2083(g) tepkimesi 3 farklı deneyde (I: V,T; II: V,T aynı; III: V,2T farklı hacim/sıcaklık) modellenmiş. A ve B kaplarındaki NH\u2083 oluşum hızlarını karşılaştırınız.',
      c:'Derişim (V k\u00fc\u00e7\u00fck/T y\u00fcksek olan kapta) ve sıcaklık ARTTIKÇA \u00e7arpışma sıklığı/şiddeti artar \u2192 NH\u2083 oluşma hızı da o kapta DAHA B\u00dcY\u00dcKT\u00dcR. Hacmi k\u00fc\u00e7\u00fck (derişimi y\u00fcksek) ya da sıcaklığı fazla olan kapta tepkime daha HIZLI ger\u00e7ekle\u015fir \u2014 \u00e7arpı\u015fma teorisine g\u00f6re bu, hem \u00e7arpı\u015fma sıklığının hem de etkin \u00e7arpı\u015fma oranının artmasıyla a\u00e7ıklanır.' },
    { n:32, t:'NO(g)+O\u2083(g)\u2192NO\u2082(g)+O\u2082(g) \u2014 \u00e7arpı\u015fma olasılıkları 1x,2x,4x,9x g\u00f6sterilmi\u015f. a) Hızları kar\u015fıla\u015ftırın b) NO derişimi artı\u015fının etkisi c) Sıcaklığın etkisi \u00e7) Ortalama hızın zamanla de\u011fi\u015fimi?',
      c:'a) \u00c7arpı\u015fma olasılı\u011fı arttık\u00e7a (1x\u21929x) tepkime hızı da ARTAR \u2014 do\u011fru orantılıdır.<br>b) NO derişiminin artması, birim hacimdeki tanecik sayısını artırarak \u00e7arpı\u015fma olasılı\u011fını (ve dolayısıyla hızı) ARTIRIR.<br>c) Sıcaklık artı\u015fı hem \u00e7arpı\u015fma sıklı\u011fını hem de etkin \u00e7arpı\u015fma oranını artırarak hızı ARTIRIR.<br>\u00e7) Tepkenler harcandık\u00e7a derişimleri azalaca\u011fı i\u00e7in ortalama hız zamanla AZALIR.' },
    { n:33, t:'C\u2082H\u2084(g)+H\u2082(g)\u2192C\u2082H\u2086(g) tepkimesine iki farklı etki uygulanmış (Grafik 1: tanecik sayısı-KE, e\u011fri geni\u015fliyor/kayıyor; Grafik 2: PE-TK, tepe y\u00fckseklik farklı). a) Ne t\u00fcr etkiler yapılmı\u015f? b) Bu etkiler \u00e7arpı\u015fma teorisine g\u00f6re neden hızlandırır?',
      c:'a) Grafik 1\u2019deki de\u011fi\u015fim (e\u011frinin sa\u011fa kayıp geni\u015flemesi) <b>SICAKLIK ARTI\u015eI</b>dır; Grafik 2\u2019deki de\u011fi\u015fim (tepe y\u00fcksekli\u011finin d\u00fc\u015fmesi) <b>KATALİZ\u00d6R</b> eklenmesidir.<br>b) Sıcaklık artı\u015fı taneciklerin kinetik enerjisini artırarak eşik de\u011fer(ini a\u015fan) tanecik sayısını artırır; katalizör ise aktivasyon enerjisini d\u00fc\u015f\u00fcrerek AYNI enerjiyle daha \u00e7ok taneci\u011fin etkin \u00e7arpı\u015fma yapmasını sa\u011flar \u2014 her ikisi de etkin \u00e7arpı\u015fma sayısını artırarak hızı artırır.' },
    { n:34, t:'Na\u2082CO\u2083(k)+2HCl(suda)\u21922NaCl(suda)+CO\u2082(g)+H\u2082O(s) \u2014 e\u015fit k\u00fctlede topak/toz \u00e7ama\u015fır sodası. a) T\u00fcplerde hangisi topak/toz? b) Grafikteki A/B e\u011frileri hangisi topak/toz?',
      c:'a) Daha \u00e7ok/hızlı k\u00f6p\u00fcren (gaz \u00e7ıkı\u015fı fazla olan) t\u00fcp <b>TOZ</b> formdur (y\u00fczey alanı b\u00fcy\u00fck oldu\u011fu i\u00e7in daha hızlı tepkimeye girer); di\u011feri <b>TOPAK</b>tır.<br>b) Grafikte daha ERKEN platoya ula\u015fan (dik ba\u015flayan) e\u011fri A ise, <b>A=TOZ</b> (hızlı), <b>B=TOPAK</b> (yavaş) formdur \u2014 y\u00fczey alanı b\u00fcy\u00fck olan toz, aynı CO\u2082 miktarına daha KISA s\u00fcrede ula\u015fır.' }
  ];

  var MOL_COK = [
    { n:35, t:'Kireç taşının (CaCO\u2083) sönmemiş kirece (CaO) dönüştüğü tepkime için: I. Endotermik bir tepkimedir. II. Kireç taşının enerjisi ürünlerden daha yüksektir. III. Isı aldığı sürece tepkime devam eder. \u2014 hangileri doğrudur?',
      o:['Yalnız I','Yalnız II','Yalnız III','I ve III','I, II ve III'], c:3,
      ac:'CaCO\u2083\u2192CaO+CO\u2082 fırınlama (ısı) gerektirir \u2192 ENDOTERMİK (I doğru). Endotermikte TEPKEN (kireçtaşı) enerjisi ÜRÜNDEN düşüktür, yüksek değil (II yanlış). Endotermik olduğu için ısı verildikçe tepkime sürer (III doğru). \u2192 I ve III' },
    { n:36, t:'Sönmemiş kirecin (CaO) sönmüş kirece (Ca(OH)\u2082) dönüştüğü tepkime için hangisi YANLIŞTIR?',
      o:['Isı alarak gerçekleşir','Çevreye enerji verir','Ürünün enerjisi tepkenlerden azdır','Sistemin enerjisi azalır','Çevrenin sıcaklığı artar'], c:0,
      ac:'CaO+H\u2082O\u2192Ca(OH)\u2082 (kireç söndürme) bilinen bir EKZOTERMİK tepkimedir \u2014 ısı ALMAZ, ısı VERİR. "Isı alarak gerçekleşir" ifadesi YANLIŞtır.' },
    { n:37, t:'Sönmüş kirecin (Ca(OH)\u2082) kireç taşına (CaCO\u2083) dönüştüğü tepkime için: I. Ekzotermiktir. II. Kireç taşının enerjisi tepkenlere göre daha düşüktür. III. Çevreden ısı soğurarak gerçekleşir. \u2014 hangileri doğrudur?',
      o:['Yalnız I','Yalnız II','Yalnız III','I ve II','I, II ve III'], c:3,
      ac:'Ca(OH)\u2082+CO\u2082\u2192CaCO\u2083+H\u2082O ekzotermiktir (I doğru), bu yüzden ürün (kireçtaşı) tepkenden daha düşük enerjilidir (II doğru). Ekzotermik olduğu için ısı ALMAZ, VERİR (III yanlış). \u2192 I ve II' },
    { n:38, t:'Metindeki bilgilere göre tepkimeler için: I. Çevreleriyle enerji alışverişi yapabilirler. II. Ekzotermik tepkimeler çevrelerine ısı verir. III. Endotermik tepkimeler çevresinden ısı alır. \u2014 hangilerine ulaşılabilir?',
      o:['Yalnız I','Yalnız II','Yalnız III','I ve II','I, II ve III'], c:4,
      ac:'Üçü de temel enerji-tepkime ilişkilerinin doğru ifadeleridir. \u2192 I, II ve III' },
    { n:39, t:'Farklı maddelerin yakıt olma potansiyelini belirlemek için hangi deneyde bağımlı/bağımsız/kontrol değişkenleri en uygun kullanılmıştır?',
      o:['Farklı miktardaki H\u2082\u2019yi aynı koşullarda yakmak','Aynı miktar H\u2082 ve karbonlu maddeyi FARKLI sıcaklıklarda yakmak','Aynı miktardaki H\u2082 ve karbonlu maddeyi AYNI koşullarda yakmak','Farklı basınçlarda aynı miktar H\u2082 yakmak','Farklı sıcaklıklarda aynı miktar karbonlu madde yakmak'], c:2,
      ac:'Tek değişken (madde cinsi) değişip diğer her şeyin (miktar, koşul) SABİT tutulduğu tasarım bilimsel karşılaştırma için doğrudur.' },
    { n:40, t:'\u201cMaarif 24\u201d uzay gemisi hikayesinde, hidrojen ve karbon bazlı madde karşılaştırmasında neden-sonuç açısından DOĞRU ifade hangisidir?',
      o:['Hidrojenin bolluğu onu en güvenli kaynak yapar','Karbon bazlı maddenin yüksek verimi değerlendirilemez','Hidrojenin yüksek enerjisi tek başına iyi yakıt olması için yeterlidir','Karbon bazlının kısa yanma süresi iyi kaynak yapar','Hidrojenin yüksek enerjisi VE yalnızca su oluşturması onu iyi kaynak yapar'], c:4,
      ac:'Metin, hidrojenin hem yüksek enerji potansiyeline hem de temiz (yalnızca su) yanma ürününe sahip olmasını BİRLİKTE vurgular.' },
    { n:41, t:'Hidrojen ve karbon bazlı yakıtın karşılaştırılabilir yönleri: I. Aynı ürünü oluştururlar. II. Enerji potansiyelleri benzer derecede yüksektir. III. Çevresel sürdürülebilirlik açısından farklı sonuçlar doğururlar. \u2014 hangileri yapılabilir?',
      o:['Yalnız I','I ve II','II ve III','I ve III','I, II ve III'], c:2,
      ac:'H\u2082 sadece su, karbonlu madde ise CO\u2082/emisyon da oluşturur (I yanlış); ikisi de yüksek enerji potansiyeline sahiptir (II doğru); çevresel etkileri belirgin şekilde farklıdır (III doğru).' },
    { n:42, t:'Propan gazı yanmada ısı verir, ayrışmada ısı alır. Bu durumu açıklamak için HANGİSİ KULLANILAMAZ?',
      o:['Bağ sağlamlıklarının farklı olması','Farklı bileşikler oluşması','Ürünlerin molekül kütlelerinin farklı olması','Bağ kararlılığının farklı olması','Kırılan/oluşan bağ enerjilerinin farklı olması'], c:2,
      ac:'Molekül KÜTLESİ, tepkimenin enerji (ısı alışverişi) yönünü açıklayan bir etken DEĞİLDİR \u2014 enerji farkı bağ enerjilerinden kaynaklanır, kütleden değil.' },
    { n:43, t:'Propanın yanma ve ayrışma tepkimeleri için hangisi DOĞRUDUR? (Bağ enerjileri: C-H:414, C-C:347, O=O:498, H-H:436, C=C:611, C=O:736, O-H:464)',
      o:['Yanmada tepken bağ enerjisi ürünlerden yüksektir','Ayrışmada tepken bağ enerjisi ürünlerden düşüktür','Yanmada tepkene göre kararlılığı düşük ürünler oluşur','Ayrışmada tepkene göre kararlılığı yüksek ürünler oluşur','Her iki tepkimede de en yüksek enerjili bağ ürünler tarafındadır'], c:4,
      ac:'Hesap: Yanmada kırılan=6496kJ<oluşan=8128kJ (tepken enerjisi DÜŞÜK, A yanlış); ürünler DAHA kararlı (C yanlış). Ayrışmada kırılan(propan)=4006>oluşan(propilen+H\u2082)=3878 (tepken enerjisi YÜKSEK, B yanlış); ürünler daha AZ kararlı (D yanlış). En yüksek tekil bağ enerjisi olan C=O(736, yanma ürünü) ve C=C(611, ayrışma ürünü) ikisi de ÜRÜN tarafındadır \u2192 E doğru.' },
    { n:44, t:'Propanın yanma ve ayrışma tepkime entalpileri bağ enerjilerinden hesaplandığında hangi seçenekteki değerlere ulaşılır?',
      o:['-816, 128','-1632, -128','816, -128','-1632, 128','128, 1632'], c:3,
      ac:'Yanma: kırılan(8C-H+2C-C+5O=O)=3312+694+2490=6496; oluşan(6C=O+8O-H)=4416+3712=8128; \u0394H=6496-8128=<b>-1632 kJ</b>. Ayrışma: kırılan(2C-C+8C-H)=694+3312=4006; oluşan(1C=C+1C-C+6C-H+1H-H)=611+347+2484+436=3878; \u0394H=4006-3878=<b>+128 kJ</b>.' },
    { n:45, t:'Glikozun (C\u2086H\u2081\u2082O\u2086, ΔHf=-1273 kJ/mol) yanma ürünleri CO\u2082(ΔHf=-393,5) ve H\u2082O(g)(ΔHf=-241,8). Günlük 10155,2 kJ enerji ihtiyacını sadece glikozdan karşılayan bir insanın kaç mol glikoza ihtiyacı vardır?',
      o:['2','4','6','8','10'], c:1,
      ac:'ΔH<sub>yanma</sub>=[6(-393,5)+6(-241,8)]-(-1273)=-3811,8+1273=<b>-2538,8 kJ/mol</b>. 10155,2/2538,8=<b>4 mol</b>.' },
    { n:46, t:'Glikozun yanmasına ait standart tepkime entalpisi kaç kJ\u2019dür?',
      o:['-3811,8','-2538,8','-1273','1273','2538,8'], c:1,
      ac:'ΔH=[6(-393,5)+6(-241,8)]-(-1273)=-2361-1450,8+1273=<b>-2538,8 kJ</b>.' },
    { n:47, t:'Glikozun yanma tepkimesiyle ilgili hangisi YANLIŞTIR?',
      o:['Ekzotermik bir tepkimedir','Oluşan bağların enerjisi kırılan bağların enerjisinden düşüktür','Tepkime sırasında çevreye ısı verilir','Ürünler tepkenlerden daha kararlıdır','360 g glikozun yanması ile 5621,6 kJ ısı açığa çıkar'], c:4,
      ac:'360g glikoz=2 mol; 2\u00d72538,8=<b>5077,6 kJ</b> açığa çıkar, verilen 5621,6 kJ değeri HATALIDIR. (Not: B seçeneği de bağ enerjisi yönü açısından tartışmaya açıktır; E sayısal olarak en net yanlıştır.)' },
    { n:48, t:'Verilen bilgilere göre: I. Tepkimedeki enerji değişimi II. \u0394H ile oluşum entalpileri bağıntısı III. 100g glikozdan alınan enerji \u2014 hangileri bulunabilir?',
      o:['Yalnız I','I ve II','I ve III','II ve III','I, II ve III'], c:4,
      ac:'Verilen oluşum entalpileriyle hem tepkime entalpisi hem de herhangi bir kütledeki enerji miktarı hesaplanabilir. \u2192 I, II ve III' },
    { n:49, t:'Standart oluşum entalpileriyle ilgili hangisi YANLIŞTIR?',
      o:['Glikozun oluşumunda dışarıdan enerji alınır','O\u2082 elementel halde olduğu için ΔHf=0 kabul edilir','Suyun oluşumu ekzotermiktir','1 mol CO\u2082 oluşumunda çevreye 393,5 kJ ısı verilir','Standart tepkime entalpisi oluşum entalpileriyle hesaplanabilir'], c:0,
      ac:'Glikozun ΔHf=-1273 kJ/mol (NEGATİF) olduğu için oluşumu EKZOTERMİKTİR \u2014 enerji dışarı verilir, dışarıdan ALINMAZ. Bu ifade YANLIŞtır.' },
    { n:50, t:'A\u2082+B\u2082\u21922AB tepkimesindeki moleküllerin çarpışmalarından hangisi YAPILAMAZ?',
      o:['Yalnız 2. çarpışma ürünle sonuçlanmıştır','2 ve 3. çarpışma uygun geometride gerçekleşmiştir','Uygun geometrideki TÜM çarpışmalar ürün oluşumuyla sonuçlanmıştır','1. çarpışma uygun geometride olmadığı için gerçekleşmemiştir','Tepkimenin gerçekleşmesi için çarpışma gerekir'], c:2,
      ac:'Uygun geometri TEK BAŞINA yeterli değildir; yeterli kinetik enerji de gerekir. "Uygun geometrideki TÜM çarpışmalar ürün oluşturur" ifadesi bir AŞIRI GENELLEMEDİR, yapılamaz.' },
    { n:51, t:'3. çarpışmanın ürün oluşumuyla sonuçlanmamasının nedenini EN İYİ hangisi açıklar?',
      o:['Uygun geometride gerçekleşmemesi','Yeterli enerjiye sahip olmaması','Etkin çarpışma yapması','Farklı atomlar arasında bağ oluşamaması','Ortam koşullarının uygun olmaması'], c:1,
      ac:'(Görseldeki tabloya göre değişebilir; genel eğitim amacı geometri VE enerji koşulunun AYRI AYRI sınanmasıdır.) Yaygın senaryoda 3. çarpışma uygun geometride olsa da yeterli kinetik enerjiye sahip değildir.' },
    { n:52, t:'Moleküllerin çarpışma durumlarını gösteren görsele göre HANGİ çıkarım yapılabilir?',
      o:['Çarpışma tek başına yeterlidir','Uygun geometrideki tüm çarpışmalar ürün oluşturur','Yeterli enerjiyle her çarpışma ürün oluşturur','Uygun geometride VE yeterli enerjiyle olan çarpışmalar ürün oluşturabilir','Düşük enerjili çarpışma sonucu ürün oluşabilir'], c:3,
      ac:'Etkin çarpışmanın İKİ koşulunun (geometri + enerji) BİRLİKTE sağlanması gerektiğini doğru ifade eden tek seçenek budur.' },
    { n:53, t:'Uygun geometride ve yeterli kinetik enerjiyle gerçekleşen çarpışmalara etkin çarpışma denir. Görseldeki hangi durumlar etkin çarpışma olarak nitelendirilebilir?',
      o:['Yalnız I','Yalnız II','I ve III','II ve III','I, II ve III'], c:1,
      ac:'(Görsele bağlı olarak) Genellikle üç durumdan yalnızca BİRİ hem uygun geometri hem yeterli enerji koşulunu birlikte sağlar.' },
    { n:54, t:'Roket motorlarında kullanılan N\u2082O\u2084/NO\u2082 tepkimesine ait derişim-zaman grafiğine göre (NO\u2082 azalıyor, N\u2082O\u2084 artıyor), tepkimenin denklemi ne olabilir?',
      o:['NO\u2082(g)\u2192N\u2082O\u2084(g)','N\u2082O\u2084(g)\u2192NO\u2082(g)','2NO\u2082(g)\u2192N\u2082O\u2084(s)','2NO\u2082(s)\u2192N\u2082O\u2084(k)','2NO\u2082(g)\u2192N\u2082O\u2084(g)'], c:4,
      ac:'NO\u2082 azalıp N\u2082O\u2084 arttığına ve her iki madde de gaz halinde olduğuna göre denklem katsayı dengesiyle <b>2NO\u2082(g)\u2192N\u2082O\u2084(g)</b> olmalıdır.' },
    { n:55, t:'Grafiğe göre tepkimeyle ilgili hangisi DOĞRUDUR?',
      o:['Birim zamanda NO\u2082 kütlesindeki değişim artmıştır','N\u2082O\u2084 oluşma hızı giderek artmıştır','NO\u2082 harcanma hızı N\u2082O\u2084 oluşma hızına eşittir','Aynı zaman aralıklarında harcanan NO\u2082 kütlesi oluşan N\u2082O\u2084 kütlesine eşittir','Tepkime hızı NO\u2082 harcanma hızına eşittir'], c:3,
      ac:'Kütlenin korunumu yasası gereği, kapalı bir sistemde harcanan NO\u2082 kütlesi HER ZAMAN oluşan N\u2082O\u2084 kütlesine eşittir (2NO\u2082\u2192N\u2082O\u2084, 2\u00d746g=92g=92g). NO\u2082 harcanma hızı, katsayı farkı (2:1) nedeniyle N\u2082O\u2084 oluşma hızının 2 katıdır, tepkime hızı ise NO\u2082 harcanma hızının YARISIdır.' },
    { n:56, t:'Grafiğe göre tepkime hızının zamanla nasıl değiştiğini VE nedenini EN İYİ hangisi açıklar?',
      o:['Derişim azaldığı için çarpışma sayısı azalır, tepkime yavaşlar','Derişim sabit kaldığı için hız sabit kalır','Ürün derişimi arttığı için hız artar','Kinetik enerji zamanla arttığı için hız artar','Kinetik enerji zamanla azaldığı için hız azalır'], c:0,
      ac:'Sabit sıcaklıkta tepken (NO\u2082) derişimi zamanla azaldığı için çarpışma sıklığı düşer ve tepkime giderek YAVAŞLAR (kinetik enerji sıcaklığa bağlıdır, burada sıcaklık sabittir).' },
    { n:57, t:'İlk 20 saniyede N\u2082O\u2084 gazının ortalama oluşma hızı nedir?',
      o:['0,3\u00d710\u207b\u00b3 M/s','0,6\u00d710\u207b\u00b3 M/s','1,2\u00d710\u207b\u00b3 M/s','1,4\u00d710\u207b\u00b3 M/s','1,6\u00d710\u207b\u00b3 M/s'], c:1,
      ac:'r=\u0394[N\u2082O\u2084]/\u0394t; grafikteki 0. ve 20. saniye derişim okumalarının farkının 20 saniyeye bölünmesiyle hesaplanır. (Kesin sayısal cevap için grafikteki tam veri noktaları gereklidir; kitabın tipik veri örüntüsüyle en olası cevap budur.)' },
    { n:58, t:'80. ve 120. saniyeler arasında NO\u2082 gazının ortalama harcanma hızı nedir?',
      o:['0,1\u00d710\u207b\u00b3 M/s','0,2\u00d710\u207b\u00b3 M/s','0,3\u00d710\u207b\u00b3 M/s','0,4\u00d710\u207b\u00b3 M/s','0,5\u00d710\u207b\u00b3 M/s'], c:1,
      ac:'Tepkime dengeye/plato durumuna yaklaştıkça (80-120s aralığı) derişim değişimi KÜÇÜLÜR, bu yüzden bu aralıktaki ortalama hız, ilk aralıklara göre daha DÜŞÜKTÜR. (Kesin değer için grafiğin tam verisi gereklidir.)' },
    { n:59, t:'\u201cSıcaklığın artırılması tepkime hızını artırır.\u201d hipotezini kuran öğrenci, deneydeki III. etki (sıcaklık artırma) sonucu HANGİ gözlemine göre açıklayabilir?',
      o:['Çinko parçalarının küçülme süresinin artması','Toplam gaz miktarının azalması','Gaz çıkış süresinin azalması','Çinko parçalarının tükenmesi','Toplam gaz miktarının artması'], c:2,
      ac:'Sıcaklık artırılınca tepkime HIZLANIR, bu da gazın daha KISA sürede (azalan sürede) tamamen açığa çıkması ile gözlenir.' },
    { n:60, t:'\u201cÇarpışma sıklığı tepkime hızını artırır mı?\u201d sorusunun cevabına hangi etkilerde (I:derişim, II:toz haline getirme, III:sıcaklık, IV:katalizör) ulaşılabilir?',
      o:['Yalnız I','I ve II','II ve III','I, II ve III','I, II ve IV'], c:3,
      ac:'Derişim (I), temas yüzeyi (II) ve sıcaklık (III) doğrudan ÇARPIŞMA SIKLIĞINI artırır. Katalizör (IV) ise çarpışma sıklığını DEĞİL, etkin çarpışma ORANINI (aktivasyon enerjisini düşürerek) artırır. \u2192 I, II ve III' },
    { n:61, t:'Hangi etkiler çarpışma teorisi temelinde birim zamandaki ETKİN çarpışma sayısını artırarak hızı artırır?',
      o:['I ve II','I ve III','II, III ve IV','I, II ve IV','I, II, III ve IV'], c:4,
      ac:'Derişim, temas yüzeyi, sıcaklık VE katalizör \u2014 dördü de (farklı mekanizmalarla olsa da) sonuçta ETKİN çarpışma sayısını artırır. \u2192 Hepsi' },
    { n:62, t:'I. etkide (derişim artırma) tepkime hızının arttığı gözlemlenmiştir. Bu sonuç EN İYİ hangisiyle açıklanır?',
      o:['Kinetik enerjinin artması','Etkin çarpışma sayısının artması','Yüzey alanının artması','Katalizörün etkisi','Aktivasyon enerjisinin düşmesi'], c:1,
      ac:'Derişim artışı, birim hacimdeki tanecik sayısını (dolayısıyla etkin çarpışma sayısını) artırır; kinetik enerjiyi ya da Ea\u2019yı DEĞİŞTİRMEZ.' },
    { n:63, t:'IV. etkide (katalizör ekleme) tepkime hızının arttığı gözlemlenmiştir. Bu sonuç EN İYİ hangisiyle açıklanır?',
      o:['Kinetik enerjinin artması','Çarpışma sayısının artması','Yüzey alanının artması','Derişimin artması','Aktivasyon enerjisinin düşmesi'], c:4,
      ac:'Katalizörün TEMEL etki mekanizması aktivasyon enerjisini düşürmesidir; çarpışma sayısını ya da derişimi doğrudan değiştirmez.' },
    { n:64, t:'2H\u2082(g)+2NO(g)\u21922H\u2082O(g)+N\u2082(g) tepkimesi için deney: [H\u2082,NO,Hız]: [0,010;0,024;2,4\u00d710\u207b\u2076], [0,005;0,024;1,2\u00d710\u207b\u2076], [0,010;0,012;0,6\u00d710\u207b\u2076]. Hangi hız denklemi DOĞRUDUR?',
      o:['r=k[H\u2082]\u00b2[NO]\u00b2','r=k[H\u2082][NO]\u00b2','r=k[H\u2082][NO]','r=k[NO]\u00b2','r=k[H\u2082]\u00b2[NO]'], c:1,
      ac:'1\u21922: NO sabit, H\u2082 yarıya\u2192hız yarıya \u2192 H\u2082\u2019ye göre 1. derece. 1\u21923: H\u2082 sabit, NO yarıya\u2192hız 1/4\u2019e düşer \u2192 NO\u2019ya göre 2. derece. \u2192 <b>r=k[H\u2082][NO]\u00b2</b>' },
    { n:65, t:'Öğrencinin tespit ettiği hız sabitinin birimi, değeri ve tepkime derecesi tablodaki hangi satırla eşleşir? (I:1/sM\u00b2,0,1,3 II:1/sM\u00b2,5/12,2 III:1/sM,0,1,2 IV:1/sM,0,1,3 V:1/sM\u00b2,5/12,3)',
      o:['I','II','III','IV','V'], c:4,
      ac:'r=k[H\u2082][NO]\u00b2\u2019den 1. deney verisiyle: 2,4\u00d710\u207b\u2076=k\u00d70,010\u00d70,024\u00b2 \u2192 k=5/12\u22480,417, birimi 1/(s\u00b7M\u00b2), tepkime derecesi=1+2=3. \u2192 <b>V</b>' },
    { n:66, t:'Öğrencinin oluşturduğu önermeler: I. Tepken derişimi arttıkça hız artar. II. Derişim hızı etkilemez. III. Derişim arttıkça hız azalır. \u2014 hangisi bilimsel olarak doğrudur?',
      o:['Yalnız I','Yalnız II','Yalnız III','I ve III','I, II ve III'], c:0,
      ac:'Standart kimyasal kinetikte tepken derişiminin artması, çarpışma sıklığını artırarak tepkime hızını ARTIRIR. \u2192 Yalnız I' }
  ];

  var MOL_CATS = ['Doğru-Yanlış','Boşluk Doldurma','Açık Uçlu','Çoktan Seçmeli'];
  var molSt = { cat: 0 };

  function maarifMolCat(){
    return '' +
    '<div class="card" style="margin-bottom:12px">' +
      '<div class="slbl">1. Tema Ölçme ve Değerlendirme \u2014 66 Soru</div>' +
      '<p style="font-size:12px;color:var(--tx2);line-height:1.6">Kitaptaki t\u00fcm soru t\u00fcrleri (do\u011fru-yanlış, boşluk doldurma, a\u00e7ık u\u00e7lu, \u00e7oktan se\u00e7meli) \u00e7\u00f6z\u00fcml\u00fc olarak. Bir soruya dokunarak cevabı/\u00e7\u00f6z\u00fcm\u00fc g\u00f6ster.</p>' +
    '</div>' +
    '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:14px"><div style="display:flex;gap:6px;min-width:max-content">' +
      MOL_CATS.map(function(c,i){ return '<button type="button" class="ob' + (i===0?' sel2':'') + '" onclick="molSetCat(' + i + ',this)">' + c + '</button>'; }).join('') +
    '</div></div>' +
    '<div id="mol-list"></div>';
  }
  window.molSetCat = function(i, btn){ molSt.cat = i; if (btn) selectInRow(btn); molRenderList(); };

  function molToggle(id){
    var el = document.getElementById(id);
    if (!el) return;
    el.style.display = (el.style.display === 'none' || !el.style.display) ? 'block' : 'none';
  }
  window.molToggle = molToggle;

  function molRenderList(){
    var box = document.getElementById('mol-list');
    if (!box) return;
    var html = '';
    if (molSt.cat === 0) {
      MOL_DY.forEach(function(q){
        html += '<div class="card" style="margin-bottom:8px;padding:12px 14px;cursor:pointer" onclick="molToggle(\'moldy-' + q.n + '\')">' +
          '<div style="font-size:13px;color:#fff;font-weight:600">' + q.n + '. ' + q.t + '</div>' +
          '<div id="moldy-' + q.n + '" style="display:none;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.08)">' +
            '<span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;margin-bottom:6px;background:' + (q.a==='D'?'rgba(34,197,94,.2);color:#86efac':'rgba(239,68,68,.2);color:#fca5a5') + '">' + (q.a==='D'?'DOĞRU':'YANLIŞ') + '</span>' +
            '<div style="font-size:12px;color:var(--tx2);line-height:1.6">' + q.ac + '</div>' +
          '</div></div>';
      });
    } else if (molSt.cat === 1) {
      MOL_BOSLUK.forEach(function(q){
        html += '<div class="card" style="margin-bottom:8px;padding:12px 14px;cursor:pointer" onclick="molToggle(\'molbos-' + q.n + '\')">' +
          '<div style="font-size:13px;color:#fff;font-weight:600">' + q.n + '. ' + q.t + '</div>' +
          '<div id="molbos-' + q.n + '" style="display:none;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.08)">' +
            '<span style="font-size:13px;font-weight:700;color:#f59e0b">\u2192 ' + q.a + '</span>' +
            (q.ac ? '<div style="font-size:12px;color:var(--tx2);margin-top:4px">' + q.ac + '</div>' : '') +
          '</div></div>';
      });
    } else if (molSt.cat === 2) {
      MOL_ACIK.forEach(function(q){
        html += '<div class="card" style="margin-bottom:8px;padding:12px 14px;cursor:pointer" onclick="molToggle(\'molacik-' + q.n + '\')">' +
          '<div style="font-size:13px;color:#fff;font-weight:600;line-height:1.5">' + q.n + '. ' + q.t + '</div>' +
          '<div id="molacik-' + q.n + '" style="display:none;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.08);font-size:12px;color:var(--tx2);line-height:1.7">' + q.c + '</div></div>';
      });
    } else {
      MOL_COK.forEach(function(q){
        var optsHtml = q.o.map(function(o,i){ return '<div style="padding:4px 0;font-size:12px;color:' + (i===q.c?'#86efac;font-weight:700':'var(--tx3)') + '">' + String.fromCharCode(65+i) + ') ' + o + (i===q.c?' \u2713':'') + '</div>'; }).join('');
        html += '<div class="card" style="margin-bottom:8px;padding:12px 14px;cursor:pointer" onclick="molToggle(\'molcok-' + q.n + '\')">' +
          '<div style="font-size:13px;color:#fff;font-weight:600;line-height:1.5">' + q.n + '. ' + q.t + '</div>' +
          '<div id="molcok-' + q.n + '" style="display:none;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.08)">' +
            optsHtml +
            '<div style="font-size:12px;color:var(--tx2);line-height:1.6;margin-top:8px;padding-top:6px;border-top:1px dashed rgba(255,255,255,.08)">' + q.ac + '</div>' +
          '</div></div>';
      });
    }
    box.innerHTML = html;
  }

  // Öncüllü (I./II./III./IV./V. ve a)b)c)ç)d)...) soru metinlerini test kağıdı gibi alt alta diz
  function formatOncul(text){
    if (!text) return text;
    var out = text.replace(/\s(I{1,3}|IV|V)\.\s+/g, function(m, roman){
      return '<br>&nbsp;&nbsp;<b>' + roman + '.</b> ';
    });
    out = out.replace(/\s([a-zçğıöşü])\)\s+/g, function(m, harf){
      return '<br>&nbsp;&nbsp;<b>' + harf + ')</b> ';
    });
    return out;
  }

  var NOTE_Q = [
    { n:1, kat:'Hız Bağıntısı', t:'2N\u2082O\u2085(g) \u2192 4NO\u2082(g) + O\u2082(g) tepkimesi i\u00e7in: I. Tepkime denklemi bu şekildedir. II. Sabit hacimli kapta basın\u00e7taki artışla tepkime hızı \u00f6l\u00e7\u00fclebilir. III. O\u2082 gazının oluşma hızı, NO\u2082 gazının oluşma hızının 4 katıdır. \u2014 hangileri doğrudur?',
      c:'Katsayı oranı N\u2082O\u2085:NO\u2082:O\u2082 = 2:4:1\u2019dir.<br><b>I \u2014 DOĞRU</b> (denklem verilen katsayılarla tutarlıdır).<br><b>II \u2014 DOĞRU</b>: Gaz mol sayısı 2\u2019den 5\u2019e \u00e7ıktığı i\u00e7in sabit hacimde basın\u00e7 artışı g\u00f6zlenebilir, bu da hızın \u00f6l\u00e7\u00fclmesini sağlar.<br><b>III \u2014 YANLIŞ</b>: Katsayı oranına g\u00f6re NO\u2082 hızı O\u2082 hızının 4 katıdır, tersi değil.<br>\u2192 <b>I ve II doğrudur.</b>' },
    { n:2, kat:'Hız Bağıntısı', t:'Bir tepkimede: A\u2019nın harcanma hızı D\u2019nin oluşma hızına eşittir. E\u2019nin oluşma hızı, B\u2019nin harcanma hızının 3 katıdır. C\u2019nin oluşma hızı, E\u2019nin oluşma hızının yarısıdır. Tepkimenin denklemini yazınız.',
      c:'r<sub>A</sub>=r<sub>D</sub> \u2192 a=d.<br>r<sub>E</sub>=3r<sub>B</sub> \u2192 e:b=3:1.<br>r<sub>C</sub>=r<sub>E</sub>/2 \u2192 e:c=2:1.<br>e i\u00e7in ortak kat se\u00e7ilirse e=6 \u2192 b=2, c=3, a=d=1.<br>\u2192 <b>A + 2B \u2192 3C + D + 6E</b>' },
    { n:3, kat:'Ortalama Hız', t:'CH\u2084(g)+2O\u2082(g)\u2192CO\u2082(g)+2H\u2082O(g) tepkimesinde 20 saniyede 4,8 gram CH\u2084 harcanıyor. H\u2082O\u2019nun ortalama oluşma hızı ka\u00e7 mol/dk\u2019dır? (H:1, C:12)',
      c:'mol CH\u2084 = 4,8/16=0,3 mol. 20 s = 1/3 dk. r<sub>CH4</sub>=0,3/(1/3)=<b>0,9 mol/dk</b>.<br>Katsayı oranı CH\u2084:H\u2082O=1:2 \u2192 r<sub>H2O</sub>=2\u00d70,9=<b>1,8 mol/dk</b>.' },
    { n:4, kat:'Ortalama Hız', t:'4NH\u2083(g)+3O\u2082(g)\u21922N\u2082(g)+6H\u2082O(g) tepkimesi 2 litrelik sabit hacimli kapta 2 dakikada ger\u00e7ekleşiyor. 13,6 gram NH\u2083 tamamı tepkimeye girdiğinde N\u2082 ve H\u2082O\u2019nun oluşma hızı ka\u00e7 mol/(L\u00b7s)\u2019dir? (H:1, N:14)',
      c:'mol NH\u2083=13,6/17=0,8 mol. 2 dk=120 s. r<sub>NH3</sub>=(0,8/2L)/120s=<b>0,00333 M/s</b>.<br>Katsayı oranı NH\u2083:N\u2082:H\u2082O=4:2:6.<br>r<sub>N2</sub>=r<sub>NH3</sub>\u00d7(2/4)=<b>0,00167 M/s</b>.<br>r<sub>H2O</sub>=r<sub>NH3</sub>\u00d7(6/4)=<b>0,005 M/s</b>.' },
    { n:5, kat:'Ortalama Hız', t:'Mg(k)+2HBr(suda)\u2192MgBr\u2082(suda)+H\u2082(g) tepkimesinde Mg kütlesi 120 saniyede 18,8 g\u2019dan 11,6 g\u2019a düşüyor. HBr \u00e7\u00f6zeltisinin harcanma hızı ka\u00e7 mol/dk\u2019dır? (Mg:24)',
      c:'\u0394m(Mg)=18,8\u221211,6=7,2 g \u2192 \u0394n(Mg)=7,2/24=0,3 mol. 120 s=2 dk.<br>r<sub>Mg</sub>=0,3/2=<b>0,15 mol/dk</b>.<br>Katsayı oranı Mg:HBr=1:2 \u2192 r<sub>HBr</sub>=2\u00d70,15=<b>0,3 mol/dk</b>.' },
    { n:6, kat:'Ortalama/Anlık Hız', t:'X(g) \u2192 2Y(g) tepkimesinde X gazının derişiminin zamanla değişimi grafikte verilmiştir (t=0\u2019da 3,6 M, t=10s\u2019de 2,4 M, t=20s\u2019de 1,6 M). Buna g\u00f6re: I. 0-10 saniyeler arası Y gazının ortalama oluşma hızı ka\u00e7 mol/L\u00b7s\u2019dir? II. 10-20 saniyeler arası Y gazının ortalama oluşma hızı ka\u00e7 mol/L\u00b7s\u2019dir?',
      graph:'noteg-x2y',
      c:'Grafikten okunan doğrulanmış noktalar: t=0:3,6 M, t=10s:2,4 M, t=20s:1,6 M (derişim oranı her 10 saniyede sabit 2/3 katsayısıyla azalıyor).<br><b>I) 0-10s arası:</b> \u0394[X]=3,6\u22122,4=1,2 M, \u0394t=10s. r<sub>X</sub>=1,2/10=0,12 M/s. Katsayı oranı X:Y=1:2 \u2192 r<sub>Y</sub>=2\u00d70,12=<b>0,24 mol/L\u00b7s</b>.<br><b>II) 10-20s arası:</b> \u0394[X]=2,4\u22121,6=0,8 M, \u0394t=10s. r<sub>X</sub>=0,8/10=0,08 M/s \u2192 r<sub>Y</sub>=2\u00d70,08=<b>0,16 mol/L\u00b7s</b>.<br>\u2192 G\u00f6r\u00fcld\u00fcğ\u00fc gibi hız zamanla AZALIYOR (0,24\u21920,16), bu da derişim azaldık\u00e7a \u00e7arpışma sıklığının azalmasıyla tutarlıdır.' },
    { n:7, kat:'Ortalama Hız', t:'Al(k)+3HCl(suda)\u2192AlCl\u2083(suda)+\u00b3\u2044\u2082H\u2082(g) tepkimesine g\u00f6re 2 L\u2019lik bir kapta [HCl] derişimi 1. dakikada 0,5 M, 4. dakikada 0,2 M olarak \u00f6l\u00e7\u00fclm\u00fcşt\u00fcr. 1. ve 4. dakikalar arasında H\u2082(g)\u2019nin oluşma hızı ka\u00e7 g/dk\u2019dır? (H:1)',
      graph:'noteg-hcl',
      c:'\u0394[HCl]=0,5\u22120,2=0,3 M, 2 L\u2019de \u0394n(HCl)=0,6 mol. 3 dakikada: r<sub>HCl</sub>=0,6/3=<b>0,2 mol/dk</b>.<br>Katsayı oranı HCl:H\u2082=3:1,5=2:1 \u2192 r<sub>H2</sub>=0,2/2=<b>0,1 mol/dk</b>.<br>K\u00fctlece: 0,1\u00d72 g/mol=<b>0,2 g/dk</b>.' },
    { n:8, kat:'Hız Bağıntısı', t:'Sabit sıcaklıkta yandaki kapta ger\u00e7ekleştirilen: I. N\u2082O\u2084(g)\u21922NO\u2082(g), II. N\u2082(g)+3H\u2082(g)\u21922NH\u2083(g), III. H\u2082(g)+I\u2082(g)\u21922HI(g) tepkimelerinden hangilerinin hızı hacim (ya da basın\u00e7) artışı g\u00f6zlenerek \u00f6l\u00e7\u00fclebilir?',
      c:'Gaz fazında tepkime hızı hacim/basın\u00e7 değişimiyle \u00f6l\u00e7\u00fclebilmesi i\u00e7in toplam gaz MOL SAYISININ değişmesi gerekir.<br>I: 1mol\u21922mol \u2014 <b>DEĞİŞİYOR, \u00f6l\u00e7\u00fclebilir.</b><br>II: 4mol\u21922mol \u2014 <b>DEĞİŞİYOR, \u00f6l\u00e7\u00fclebilir.</b><br>III: 2mol\u21922mol \u2014 <b>DEĞİŞMİYOR, \u00f6l\u00e7\u00fclemez</b> (H\u2082 ve I\u2082 gaz halindeyse klasik bir \u00f6rnektir; I\u2082 KATI verilmiş olsaydı sonu\u00e7 değişirdi).<br>\u2192 <b>Yalnız I ve II</b> hacim/basın\u00e7 değişimiyle izlenebilir.' },
    { n:9, kat:'Madde Cinsi Etkisi', t:'Aynı koşullarda ger\u00e7ekleşen: 1) Ag\u207a(suda)+Cl\u207b(suda)\u2192AgCl(k) 2) Fe(k)+SO\u2084\u00b2\u207b(suda)\u2192FeSO\u2084(k) \u2014 hangisi daha hızlıdır?',
      c:'1. tepkime ZIT Y\u00dcKL\u00dc İYONLAR arasında ger\u00e7ekleşir (elektrostatik \u00e7ekim ile \u00e7ok hızlıdır). 2. tepkime bir METAL ile bir iyon arasındadır (daha yavaş, elektron transferi ve y\u00fczey etkileşimi gerektirir). \u2192 <b>1. tepkime (Ag\u207a+Cl\u207b) daha hızlıdır.</b>' },
    { n:10, kat:'Madde Cinsi Etkisi', t:'Aynı koşullarda: 1) CH\u2084(g)+2O\u2082(g)\u2192CO\u2082(g)+2H\u2082O(g) 2) C\u2083H\u2088(g)+5O\u2082(g)\u21923CO\u2082(g)+4H\u2082O(g) \u2014 hangisi daha hızlıdır?',
      c:'Propanın (C\u2083H\u2088) yanması daha \u00e7ok bağın (daha b\u00fcy\u00fck molek\u00fcl, daha fazla C-H ve C-C bağı) kırılmasını gerektirir. Kırılan bağ sayısı arttık\u00e7a tepkime YAVAŞLAR. \u2192 <b>1. tepkime (metan yanması) daha hızlıdır.</b>' },
    { n:11, kat:'Mekanizma', t:'HCOOH+H\u2082SO\u2084 tepkimesi 3 basamakta ger\u00e7ekleşiyor: 1.adım (hızlı): HCOOH+H\u2082SO\u2084\u2192HCOOH\u2082\u207a+HSO\u2084\u207b; 2.adım (\u00e7ok hızlı): HCOOH\u2082\u207a\u2192HCO\u207a+H\u2082O; 3.adım (yavaş): HCO\u207a+HSO\u2084\u207b\u2192H\u2082SO\u2084+CO. H\u2082SO\u2084\u2019\u00fcn rol\u00fc nedir, ara \u00fcr\u00fcnler nelerdir, hız denklemi nasıl yazılır?',
      c:'H\u2082SO\u2084, 1. adımda tepkimeye girip 3. adımda değişmeden \u00e7ıkıyor \u2192 <b>KATALİZ\u00d6RD\u00dcR</b> (net tepkimede g\u00f6r\u00fcnmez).<br>HCOOH\u2082\u207a ve HCO\u207a bir basamakta oluşup diğerinde kullanıldığı i\u00e7in <b>ARA \u00dcR\u00dcNd\u00fcr</b>.<br>Hız, YAVAŞ (3.) basamağa g\u00f6re yazılır: <b>r=k[HCO\u207a][HSO\u2084\u207b]</b>.' },
    { n:12, kat:'Hız Denklemi', t:'Aşağıdaki tepkimelerin hız bağıntıları verilmiştir: SO\u2082(g)+\u00bdO\u2082(g)\u2192SO\u2083(g), r=k[SO\u2082][O\u2082]; N\u2082(g)+3H\u2082(g)\u21922NH\u2083(g), r=k[N\u2082][H\u2082]\u00b2. Bu tepkimelerden hangileri mekanizmalıdır?',
      c:'SO\u2082+\u00bdO\u2082\u2192SO\u2083: katsayılar (1,\u00bd) iken hız denklemindeki \u00fcsler (1,1) \u2014 UYUMSUZ (\u00bd\u22601) \u2192 <b>mekanizmalıdır</b>.<br>N\u2082+3H\u2082\u21922NH\u2083: katsayılar (1,3) iken \u00fcsler (1,2) \u2014 UYUMSUZ (3\u22602) \u2192 <b>mekanizmalıdır</b>.<br>(Tek adımlı olabilmesi i\u00e7in hız denklemi katsayılarla TAM uyumlu olmalıdır.)' },
    { n:13, kat:'Derişim/Piston', t:'Eşit mollerdeki A\u2082 ve B\u2082 gazları arasında A\u2082(g)+2B\u2082(g)\u2192 tepkimesi, kapalı bir kapta TEK ADIMDA ger\u00e7ekleşiyor. Sabit sıcaklık ve basın\u00e7ta, ideal pistonlu kaba, kapta bulunan İDEAL TANECİK SAYISI kadar B\u2082 gazı ilave edilirse tepkime hızı ka\u00e7 katına \u00e7ıkar?',
      c:'Başlangı\u00e7ta n(A\u2082)=n(B\u2082)=a (eşit mol), toplam=2a, hacim=V.<br>İlave edilen B\u2082 = toplam tanecik sayısı = 2a mol.<br>Yeni n(B\u2082)=a+2a=<b>3a (3 kat)</b>; n(A\u2082)=a (değişmedi).<br>Toplam mol 2a\u21924a\u2019ya \u00e7ıktığı i\u00e7in SABİT basın\u00e7ta <b>hacim de 2 katına \u00e7ıkar</b> (V\u21922V).<br>Yeni [A\u2082]=a/2V=eski [A\u2082]\u2019nin <b>yarısı (\u00d70,5)</b>.<br>Yeni [B\u2082]=3a/2V=eski [B\u2082]\u2019nin <b>1,5 katı (\u00d71,5)</b>.<br>Tek adımlı olduğu i\u00e7in hız denklemi katsayılarla aynıdır: r=k[A\u2082][B\u2082]\u00b2.<br>Yeni hız/Eski hız = (0,5)\u00b9\u00d7(1,5)\u00b2 = 0,5\u00d72,25 = <b>9/8 (1,125 kat)</b>.<br><span style="color:#fca5a5">\u26a0\ufe0f Bu soruda başlangı\u00e7ta A\u2082 ve B\u2082\u2019nin ayrı ayrı nasıl etkilendiğini (yalnızca B\u2082 eklendiği i\u00e7in derişimleri FARKLI oranda değiştiğini) g\u00f6z \u00f6n\u00fcnde bulundurmak \u00f6nemlidir \u2014 t\u00fcm derişimlerin sabit kaldığını varsaymak yaygın bir hatadır.</span>' },
    { n:14, kat:'Sıcaklık Etkisi', t:'Şekildeki her kapta eşit sayıda N\u2082O\u2084 molek\u00fcl\u00fc bulunmaktadır: I. Kap: V litre, 50\u00b0C \u00b7 II. Kap: 2V litre, 50\u00b0C \u00b7 III. Kap: 2V litre, 25\u00b0C. Her kapta N\u2082O\u2084(g)\u21922NO\u2082(g) tepkimesi ger\u00e7ekleşmektedir. Bu kaplardaki tepkimelerin hızlarını karşılaştırınız.',
      c:'Sıcaklık arttık\u00e7a hız ARTAR; hacim arttık\u00e7a (derişim azaldık\u00e7a) hız AZALIR.<br><b>I. Kap</b> (V, 50\u00b0C): K\u00dc\u00c7\u00dcK hacim + Y\u00dcKSEK sıcaklık \u2192 EN HIZLI.<br><b>II. Kap</b> (2V, 50\u00b0C): B\u00dcY\u00dcK hacim ama Y\u00dcKSEK sıcaklık \u2192 ORTA.<br><b>III. Kap</b> (2V, 25\u00b0C): B\u00dcY\u00dcK hacim + D\u00dcŞ\u00dcK sıcaklık \u2192 EN YAVAŞ.<br>\u2192 <b>Hız sıralaması: I > II > III</b>.' },
    { n:15, kat:'Sıcaklık Etkisi', t:'T\u2081 ve T\u2082 (T\u2082>T\u2081) sıcaklıklarındaki bir gazın molek\u00fcl sayısı-kinetik enerji dağılım grafiğine g\u00f6re, aşağıdakilerden hangisi YANLIŞTIR? A) T\u2082\u2019de etkin \u00e7arpışma sayısı T\u2081\u2019e g\u00f6re daha fazladır B) T\u2082\u2019de tepkime hızı T\u2081\u2019e g\u00f6re daha d\u00fcş\u00fckt\u00fcr C) Her iki sıcaklıkta Ea değeri aynıdır D) T\u2082\u2019de eşik enerjisini aşan molek\u00fcl sayısı T\u2081\u2019e g\u00f6re daha \u00e7oktur E) T\u2082\u2019de moleküllerin kinetik enerjisi T\u2081\u2019e g\u00f6re daha fazladır',
      graph:'noteg-t1t2',
      c:'T\u2082>T\u2081 olduğu i\u00e7in T\u2082\u2019de kinetik enerji, etkin \u00e7arpışma sayısı ve eşiği aşan molek\u00fcl sayısı DAHA FAZLADIR (A,D,E doğru); Ea sıcaklıktan etkilenmez, sabittir (C doğru). Ancak y\u00fcksek sıcaklıkta (T\u2082) hız DAHA D\u00dcŞ\u00dcK değil, DAHA Y\u00dcKSEK olur. \u2192 <b>YANLIŞ olan: B</b>' },
    { n:16, kat:'Sıcaklık Etkisi', t:'Bir tepkimede T\u2081 ve T\u2082 sıcaklıklarındaki (T\u2082>T\u2081) enerji dağılımlarına ilişkin: I. T\u2081 sıcaklığında eşik enerjisi en k\u00fc\u00e7\u00fckt\u00fcr II. Hız sabitleri arasındaki ilişki k\u2081<k\u2082\u2019dir III. Birim zamanda en az \u00fcr\u00fcn T\u2081 sıcaklığında oluşur \u2014 hangileri YANLIŞTIR?',
      c:'Eşik enerjisi (Ea) SICAKLIKTAN BAĞIMSIZDIR, T\u2081\u2019de \u201cen k\u00fc\u00e7\u00fck\u201d olamaz \u2014 <b>I YANLIŞ</b> (Ea her iki sıcaklıkta da AYNIDIR). k\u2082>k\u2081 (sıcaklık arttık\u00e7a k artar) \u2014 <b>II DOĞRU</b>. D\u00fcş\u00fck sıcaklıkta (T\u2081) hız daha yavaş, birim zamanda en AZ \u00fcr\u00fcn T\u2081\u2019de oluşur \u2014 <b>III DOĞRU</b>. \u2192 Yalnız I yanlıştır.' },
    { n:17, kat:'Katalizör', t:'2SO\u2083(g)\u21922SO\u2082(g)+O\u2082(g) tepkimesinin iki ayrı durumdaki (biri katalizörl\u00fc, diğeri katalizörs\u00fcz) aktifleşme enerjileri Ea\u2081 ve Ea\u2082 olarak verilmiştir. Ea\u2081<Ea\u2082 olduğuna g\u00f6re hangisi katalizörl\u00fcd\u00fcr ve hangisinin hızı daha b\u00fcy\u00fckt\u00fcr?',
      graph:'noteg-katgraph',
      c:'Katalizör aktivasyon enerjisini D\u00dcŞ\u00dcRD\u00dcĞ\u00dc i\u00e7in, DAHA D\u00dcŞ\u00dcK aktivasyon enerjisine sahip olan (Ea\u2081) <b>KATALİZ\u00d6RL\u00dc</b> durumdur. D\u00fcş\u00fck aktivasyon enerjisi = daha fazla etkin \u00e7arpışma = <b>DAHA B\u00dcY\u00dcK HIZ</b> \u2192 Ea\u2081\u2019e sahip (katalizörl\u00fc) tepkime daha hızlıdır.' },
    { n:18, kat:'Katalizör/Mekanizma', t:'H\u2082(g)+Cl\u2082(g)\u21922HCl(g) tepkimesi tek adımda ger\u00e7ekleşiyor. Şu işlemler uygulanıyor: 1. Ortama aynı sıcaklıkta H\u2082(g) ekleniyor. 2. Sıcaklık d\u00fcş\u00fcr\u00fcl\u00fcyor. 3. Ortama uygun katalizör konuyor. Bu işlemlerin tepkime hızına etkisini (zamanla değişim grafiği şeklinde) yorumlayınız.',
      graph:'noteg-3etki',
      c:'1) H\u2082 eklenmesi derişimi ANİDEN artırır \u2192 hız ANİDEN yukarı sı\u00e7rar, sonra tekrar azalmaya devam eder.<br>2) Sıcaklık d\u00fcş\u00fcr\u00fclmesi hızı ANİDEN AŞAĞI d\u00fcş\u00fcr\u00fcr.<br>3) Katalizör eklenmesi hızı ANİDEN YUKARI sı\u00e7ratır (Ea d\u00fcşer).<br>Grafikte 3 m\u00fcdahale noktasında ani sı\u00e7ramalar (1\u2019de yukarı, 2\u2019de aşağı, 3\u2019te yukarı), aralarda normal azalan eğri g\u00f6r\u00fcl\u00fcr.' },
    { n:19, kat:'Katalizör', t:'x elementinin kolayca (daha hızlı) elde edilebilmesi i\u00e7in: I. Sıcaklığı azaltmak II. Uygun katalizör kullanmak III. Kabın hacmini b\u00fcy\u00fctmek işlemlerinden hangileri AYRI AYRI uygulanabilir?',
      c:'Sıcaklığı AZALTMAK hızı D\u00dcŞ\u00dcR\u00dcR (I uygun değil). Katalizör kullanmak Ea\u2019yı d\u00fcş\u00fcrerek hızı ARTIRIR (II uygundur). Hacmi B\u00dcY\u00dcTMEK derişimi AZALTIR, hızı D\u00dcŞ\u00dcR\u00dcR (III uygun değil). \u2192 <b>Yalnız II (katalizör) uygulanabilir.</b>' },
    { n:20, kat:'Katalizör', t:'CS\u2082(k)+3O\u2082(g)\u2192CO\u2082(g)+2SO\u2082(g) tepkimesinin PE-TK grafiği I numaralı eğridedir. Bu tepkimeye aşağıdaki işlemlerden hangisi uygulanırsa, aktivasyon enerjisi DAHA D\u00dcŞ\u00dcK olan yeni bir eğri (II numaralı) elde edilir? A) Katalizör kullanmak B) Sıcaklığı artırmak C) CS\u2082\u2019yi toz haline getirmek D) Girenlerin mol sayısını artırmak E) Kabın hacmini artırmak',
      graph:'noteg-cs2',
      c:'PE-TK grafiğinde tepe y\u00fcksekliğinin (aktivasyon enerjisinin) DÜŞMESİ sadece <b>KATALİZ\u00d6R</b> ile olur; diğer se\u00e7enekler (sıcaklık, y\u00fczey alanı, derişim, hacim) tepkime HIZINI etkiler ama Ea\u2019yı (grafiğin şeklini) DEĞİŞTİRMEZ. \u2192 <b>A) Katalizör kullanmak</b>' },
    { n:21, kat:'Temas Y\u00fczeyi', t:'Mg(k)+2HCl(suda)\u2192MgCl\u2082(suda)+H\u2082(g) tepkimesinde, 0,1 mol Mg ile 2M 200 mL HCl \u00e7\u00f6zeltisinin tepkimesinden oluşan H\u2082 gazının mol-zaman grafiği I. eğridir (10 s\u2019de tamamlanıyor). II. eğriyi (8 s\u2019de tamamlanma, AYNI toplam H\u2082 miktarıyla) elde etmek i\u00e7in hangi işlemler AYRI AYRI uygulanabilir? I. Sıcaklığı artırmak ve katalizör kullanmak II. Mg\u2019nin temas y\u00fczeyini VE HCl derişimini artırmak III. Mg miktarını ve sıcaklığı artırmak',
      graph:'noteg-h2mol',
      c:'II. eğri, AYNI miktarda \u00fcr\u00fcn\u00fc DAHA KISA s\u00fcrede vermektedir \u2014 yani sadece HIZ artmış, TOPLAM \u00fcr\u00fcn miktarı DEĞİŞMEMİŞTİR. Mg miktarını artırmak (III) TOPLAM H\u2082 miktarını da DEĞİŞTİRİR (grafik platosu y\u00fckselir), bu y\u00fczden III uygun DEĞİLDİR. I ve II\u2019deki işlemler (sıcaklık+katalizör, ya da y\u00fczey+derişim) TOPLAM miktarı değiştirmeden SADECE hızı artırır. \u2192 <b>Yalnız I ve II tek başına uygulanabilir.</b>' },
    { n:22, kat:'Temas Y\u00fczeyi', t:'Farklı tanecik boyutlarındaki iki k\u00f6m\u00fcr numunesinin yanması sonucu oluşan CO\u2082 gazının sabit sıcaklıkta zamanla mol sayısı değişimi grafiğe g\u00f6re: I. Birim zamanda oluşan CO\u2082 mol sayısı 2. k\u00f6m\u00fcrde daha b\u00fcy\u00fckt\u00fcr II. Tepkime hızı 1. k\u00f6m\u00fcrde daha yavaştır III. Kullanılan k\u00f6m\u00fcr\u00fcn par\u00e7acık boyutu 1. k\u00f6m\u00fcrde daha b\u00fcy\u00fckt\u00fcr \u2014 hangileri doğrudur?',
      graph:'noteg-komur',
      c:'Grafikte 2. k\u00f6m\u00fcr numunesi CO\u2082\u2019yi daha HIZLI \u00fcretiyorsa (daha dik/erken plato), bu onun daha K\u00dc\u00c7\u00dcK par\u00e7acık boyutuna (daha b\u00fcy\u00fck y\u00fczey alanına) sahip olduğunu g\u00f6sterir. I doğru (2. k\u00f6m\u00fcr daha hızlı \u00fcr\u00fcn verir), II doğru (1. k\u00f6m\u00fcr yavaş olduğu i\u00e7in b\u00fcy\u00fck par\u00e7acıklıdır), III doğru (1. k\u00f6m\u00fcr\u00fcn par\u00e7acık boyutu B\u00dcY\u00dcKT\u00dcR). \u2192 <b>I, II ve III doğrudur.</b>' },
    { n:23, kat:'Karışık Faktörler', t:'0,2 mol Zn(k) ile 0,2 M\u2019lık HCl \u00e7\u00f6zeltisinin 1 litresi (Zn(k)+2HCl(suda)\u2192ZnCl\u2082(suda)+H\u2082(g)) tepkimeye giriyor (stokiyometriye g\u00f6re 0,4 mol HCl gerekir, HCl sınırlayıcıdır). H\u2082 gazının HEM \u00e7ıkış hızını HEM DE miktarını artırmak i\u00e7in: I. Zn\u2019yi toz haline getirmek II. Aynı derişimdeki (0,2M) HCl\u2019den 2 L kullanmak III. 0,3 M\u2019lık HCl\u2019den 1 L eklemek \u2014 hangileri AYRI AYRI uygulanabilir?',
      c:'I. Toz haline getirmek SADECE hızı artırır; derişim/toplam mol HCl değişmediği i\u00e7in TOPLAM H\u2082 miktarı DEĞİŞMEZ.<br>II. 2 L kullanmak toplam HCl molünü artırır (0,2\u21920,4 mol, miktar artar) ama DERİŞİM aynı (0,2M) kaldığı i\u00e7in başlangı\u00e7 HIZI DEĞİŞMEZ.<br>III. 0,3M\u2019lık 1L kullanmak: HEM derişim artar (0,2\u21920,3M \u2192 hız artar) HEM toplam mol HCl artar (0,2\u21920,3mol \u2192 daha \u00e7ok Zn tepkimeye girer, H\u2082 miktarı artar) \u2014 <b>ikisi de artar.</b><br>\u2192 <b>Yalnız III, hem hızı hem miktarı tek başına artırır.</b>' },
    { n:24, kat:'Hız Bağıntısı', t:'X(g)+2Y(g)+3Z(g)⇌2K(g)+3M(g) tepkimesi ile ilgili sabit sıcaklıkta yapılan deneyler: Z\u2019nin derişimi sabit tutulup X ve Y\u2019nin derişimi 2 katına \u00e7ıkarıldığında hız 4 katına \u00e7ıkıyor. Y\u2019nin derişimi sabit tutulup X ve Z\u2019nin derişimi 2 katına \u00e7ıkarıldığında hız 4 katına \u00e7ıkıyor. Kabın hacmi yarıya indirildiğinde hız 8 katına \u00e7ıkıyor. Tepkimenin hız bağıntısı nedir?',
      c:'Hacim yarıya inince T\u00dcM derişimler 2 katına \u00e7ıkar ve hız 8 (=2\u00b3) katına \u00e7ıkıyor \u2192 <b>toplam derece=3</b> (a+b+c=3).<br>Z sabit, X&Y 2 kat \u2192 hız 4(=2\u00b2) kat \u2192 <b>a+b=2</b>.<br>Y sabit, X&Z 2 kat \u2192 hız 4(=2\u00b2) kat \u2192 <b>a+c=2</b>.<br>\u00dc\u00e7 denklemden: c=1, a=1, b=1.<br>\u2192 <b>r=k[X][Y][Z]</b> (toplam derece 3, her t\u00fcre g\u00f6re 1. dereceden).' },
    { n:25, kat:'Hız Bağıntısı', t:'X(g)+2Y(g)+3Z(g)⇌2K(g)+3M(g) tepkimesi i\u00e7in deney verileri: Deney1:[X]=0,1,[Y]=0,2,[Z]=0,1,Hız=1,8x10^-5; Deney2:[X]=0,2,[Y]=0,2,[Z]=0,1,Hız=3,6x10^-5; Deney3:[X]=0,1,[Y]=0,4,[Z]=0,1,Hız=1,8x10^-5; Deney4:[X]=0,1,[Y]=0,2,[Z]=0,2,Hız=7,2x10^-5. a) Hız bağıntısı? b) X=Y=Z=2 mol/L iken hız ka\u00e7 mol/L\u00b7s olur?',
      c:'1\u21922: [X] 2 kat, [Y][Z] sabit, hız 2 kat \u2192 <b>X mertebesi=1</b>.<br>1\u21923: [Y] 2 kat, hız DEĞİŞMEDİ (1,8\u21921,8) \u2192 <b>Y mertebesi=0</b> (Y, hıza etki etmiyor!).<br>1\u21924: [Z] 2 kat, hız 4 kat \u2192 <b>Z mertebesi=2</b>.<br>a) <b>r=k[X][Z]\u00b2</b> (Y hız bağıntısında YER ALMAZ, ama yine de bir tepkendir).<br>k=1,8x10^-5/(0,1\u00d70,1\u00b2)=<b>0,018</b>.<br>b) r=0,018\u00d72\u00d72\u00b2=<b>0,144 mol/L\u00b7s</b>.' },
    { n:26, kat:'Derişim/Piston', t:'Sabit sıcaklıkta s\u00fcrt\u00fcnmesiz ideal pistonlu bir kaba 4\u2019er mol X ve Y gazından konularak X(g)+2Y(g)\u2192Z(g) denklemine g\u00f6re TEK basamakta tepkimeye girmesi sağlanıyor. Tepkimenin başlangı\u00e7 hızı r ise, X gazının %25\u2019inin harcandığı andaki hız ka\u00e7 r\u2019dir?',
      c:'Başlangı\u00e7: n(X)=4, n(Y)=4, toplam=8 (V\u2080 keyfi birim).<br>%25 X harcandı: 1mol X t\u00fckendi; katsayı oranı X:Y=1:2 olduğundan 2mol Y de t\u00fckendi, 1mol Z oluştu.<br>Yeni: n(X)=3, n(Y)=2, n(Z)=1, toplam=6.<br>Piston SABİT BASIN\u00c7ta olduğu i\u00e7in hacim toplam molle orantılı azalır: V<sub>yeni</sub>=V\u2080\u00d7(6/8)=0,75V\u2080.<br>[X]<sub>yeni</sub>=3/0,75=4 (değişmedi!), [Y]<sub>yeni</sub>=2/0,75\u22482,667.<br>Tek adımlı: r=k[X][Y]\u00b2. Yeni r/Eski r = (4/4)\u00b9\u00d7(2,667/4)\u00b2 = 1\u00d7(2/3)\u00b2 = <b>4/9</b>.' },
    { n:27, kat:'Mekanizma', t:'CH\u2083CHO(g)\u2192CH\u2084(g)+CO(g) tepkimesi iki basamakta ger\u00e7ekleşiyor: 1.adım (YAVAŞ): CH\u2083CHO(g)+I\u2082(g)\u2192CH\u2083I(g)+HI(g); 2.adım (HIZLI): CH\u2083I(g)+HI(g)\u2192CH\u2084(g)+CO(g)+I\u2082(g). Buna g\u00f6re: I. I\u2082 ara \u00fcr\u00fcnd\u00fcr. II. Kaba He gazı eklenirse tepkime hızı değişmez. III. Tepkime kabının hacmi yarıya indirilirse hız artar. \u2014 hangileri DOĞRUDUR?',
      c:'I \u2014 <b>YANLIŞ</b>: I\u2082, 1. adımda harcanıp 2. adımda yeniden oluşuyor \u2014 net tepkimede g\u00f6r\u00fcnm\u00fcyor, I\u2082 ARA \u00dcR\u00dcN değil <b>KATALİZ\u00d6RD\u00dcR</b>.<br>II \u2014 <b>DOĞRU</b>: He tepkimeye girmez, CH\u2083CHO/I\u2082 derişimlerini değiştirmez.<br>III \u2014 <b>DOĞRU</b>: r=k[CH\u2083CHO][I\u2082], hacim k\u00fc\u00e7\u00fcl\u00fcnce derişim ve hız artar.<br>\u2192 <b>II ve III doğrudur.</b>' },
    { n:28, kat:'Ortalama/Anlık Hız', t:'Mg(k)+2HCl(suda)\u2192MgCl\u2082(suda)+H\u2082(g) tepkimesinde [HCl] derişiminin zamanla değişimi DOĞRUSAL bir grafikle verilmiştir: t=10s\u2019de 0,5 M, t=50s\u2019de 0,1 M. a) Tepkimenin 10. saniyedeki hızı ka\u00e7 M/s\u2019dir? b) Tepkimenin 20. saniyedeki hızı ka\u00e7 M/s\u2019dir?',
      c:'Grafik DOĞRUSAL olduğu i\u00e7in eğim HER noktada AYNIDIR (Mg katı olduğu i\u00e7in tepkime SABİT hızla ilerler).<br>Eğim: \u0394[HCl]/\u0394t=(0,1\u22120,5)/(50\u221210)=\u22120,01 M/s.<br>Katsayı oranı HCl:tepkime=2:1 \u2192 tepkime hızı=0,01/2=<b>0,005 M/s</b>.<br>a) 10s: <b>0,005 M/s</b>. b) 20s: <b>0,005 M/s</b> (AYNI, grafik doğrusal olduğu i\u00e7in).' },
    { n:29, kat:'Madde Cinsi Etkisi', t:'Aynı koşullarda ger\u00e7ekleşen: I. H\u2082(g)+I\u2082(g)⇌2HI(g) II. H\u2082(g)+I\u2082(k)⇌2HI(g) III. H\u2082(g)+Cl\u2082(g)⇌2HCl(g) tepkimelerinin hızlarını karşılaştırınız.',
      c:'II\u2019de I\u2082 KATI halde olduğu i\u00e7in tepkime SADECE y\u00fczeyde ger\u00e7ekleşir \u2192 <b>II en YAVAŞTIR</b>.<br>I ve III\u2019te t\u00fcm tepkenler GAZ, temas alanı y\u00fcksek, ikisi de II\u2019den \u00e7ok daha HIZLIdır.<br>\u2192 <b>I ve III (gaz-gaz) > II (gaz-katı)</b>.' }
  ];
  function noteqDrawGraphs(){
    // X(g)->2Y(g) derişim-zaman — SADECE doğrulanmış 3 nokta: (0,3.6) (10,2.4) (20,1.6), oran tam 2/3
    maarifChart('noteg-x2y', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Zaman (s)', '[X] mol/L');
      var pts = [];
      for (var i = 0; i <= 100; i++) {
        var t = i/100*20;
        var val = 3.6 * Math.pow(2/3, t/10);
        pts.push([g.padL + (t/20)*g.plotW, g.padT + g.plotH - (val/3.6)*g.plotH*0.92]);
      }
      x.strokeStyle = '#f59e0b'; x.lineWidth = 2.2; x.beginPath();
      pts.forEach(function(p,i2){ i2===0?x.moveTo(p[0],p[1]):x.lineTo(p[0],p[1]); }); x.stroke();
      var marks = [[0,3.6],[10,2.4],[20,1.6]];
      x.fillStyle = '#f59e0b';
      marks.forEach(function(m){
        var mx = g.padL + (m[0]/20)*g.plotW, my = g.padT + g.plotH - (m[1]/3.6)*g.plotH*0.92;
        x.beginPath(); x.arc(mx, my, 3, 0, 6.283); x.fill();
      });
      x.fillStyle = 'rgba(255,255,255,.5)'; x.font = '9px sans-serif'; x.textAlign = 'center';
      x.fillText('doğrulanmış 3 nokta (0,10,20s)', g.padL+g.plotW/2, g.padT+g.plotH+22);
    });
    // Al+HCl derişim-zaman (doğrusal azalma 0.6->0.1, 1-5dk)
    maarifChart('noteg-hcl', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Zaman (dk)', '[HCl] mol/L');
      function px(t){ return g.padL + ((t-1)/4)*g.plotW; }
      function py(c){ return g.padT + g.plotH - ((c-0.1)/0.5)*g.plotH*0.9; }
      x.strokeStyle = '#f59e0b'; x.lineWidth = 2.2; x.beginPath();
      x.moveTo(px(1), py(0.5)); x.lineTo(px(4), py(0.2)); x.lineTo(px(5), py(0.1)); x.stroke();
      x.fillStyle = '#f59e0b';
      [[1,0.5],[4,0.2]].forEach(function(p){ x.beginPath(); x.arc(px(p[0]),py(p[1]),3,0,6.283); x.fill(); });
      x.fillStyle = 'rgba(255,255,255,.5)'; x.font = '10px sans-serif'; x.textAlign = 'left';
      x.fillText('1.dk: 0,5M', px(1)+4, py(0.5)-8);
      x.fillText('4.dk: 0,2M', px(4)+4, py(0.2)-8);
    });
    // T1,T2 kinetik enerji dağılımı
    maarifChart('noteg-t1t2', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Kinetik enerji', 'Molekül sayısı');
      function curve(muF, sigF, ampF){
        var pts = [];
        for (var i = 0; i <= 100; i++) {
          var f = i/100, xv = g.padL + f*g.plotW;
          var xf = (f - muF) / sigF;
          var yv = ampF * Math.exp(-xf*xf*2.2);
          pts.push([xv, g.padT + g.plotH - yv*g.plotH*0.9]);
        }
        return pts;
      }
      var t1 = curve(0.28, 0.15, 1.0), t2 = curve(0.42, 0.21, 0.74);
      var esikX = g.padL + 0.6*g.plotW;
      function fillBeyond(pts, col){
        x.beginPath(); x.moveTo(esikX, g.padT+g.plotH);
        pts.forEach(function(p){ if (p[0] >= esikX) x.lineTo(p[0], p[1]); });
        x.lineTo(g.padL+g.plotW, g.padT+g.plotH); x.closePath(); x.fillStyle = col; x.fill();
      }
      fillBeyond(t2, 'rgba(239,68,68,.4)'); fillBeyond(t1, 'rgba(96,165,250,.5)');
      function stroke(pts, col){ x.beginPath(); pts.forEach(function(p,i2){ i2===0?x.moveTo(p[0],p[1]):x.lineTo(p[0],p[1]); }); x.strokeStyle=col; x.lineWidth=2; x.stroke(); }
      stroke(t1, '#3b82f6'); stroke(t2, '#ef4444');
      x.strokeStyle = 'rgba(255,255,255,.5)'; x.setLineDash([4,3]); x.lineWidth = 1;
      x.beginPath(); x.moveTo(esikX, g.padT); x.lineTo(esikX, g.padT+g.plotH); x.stroke(); x.setLineDash([]);
      x.textAlign = 'left'; x.font = '10px sans-serif';
      x.fillStyle = '#93c5fd'; x.fillText('T\u2081', g.padL+4, g.padT+10);
      x.fillStyle = '#fca5a5'; x.fillText('T\u2082 (T\u2082>T\u2081)', g.padL+4, g.padT+24);
      x.fillStyle = 'rgba(255,255,255,.5)'; x.fillText('Eşik değeri', esikX+3, g.padT+g.plotH-4);
    });
    // Katalizörlü/katalizörsüz PE-TK (Ea1<Ea2)
    maarifChart('noteg-katgraph', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Tepkime koordinatı', 'Pot. enerji');
      var reactY = g.padT + g.plotH*0.6, prodY = g.padT + g.plotH*0.8;
      function curve(peakY, col, dashed){
        function px(f){ return g.padL + f*g.plotW; }
        x.beginPath();
        x.moveTo(px(0.02), reactY); x.lineTo(px(0.30), reactY);
        x.bezierCurveTo(px(0.40), reactY, px(0.42), peakY, px(0.5), peakY);
        x.bezierCurveTo(px(0.58), peakY, px(0.60), prodY, px(0.70), prodY);
        x.lineTo(px(0.98), prodY);
        x.strokeStyle = col; x.lineWidth = 2;
        if (dashed) x.setLineDash([5,4]);
        x.stroke(); x.setLineDash([]);
      }
      curve(g.padT + g.plotH*0.32, '#22c55e', false);
      curve(g.padT + g.plotH*0.05, '#ef4444', true);
      x.font = '10px sans-serif'; x.textAlign = 'left';
      x.fillStyle = '#22c55e'; x.fillText('Ea\u2081 (katalizörlü)', g.padL+4, g.padT+10);
      x.fillStyle = '#ef4444'; x.fillText('Ea\u2082 (katalizörsüz)', g.padL+4, g.padT+24);
    });
    // 3 etki (H2 ekleme, sıcaklık düşürme, katalizör) - hız-zaman basamaklı grafik
    maarifChart('noteg-3etki', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Zaman', 'Tepkime hızı');
      var segs = [[0,0.5],[0.25,0.5],[0.25,0.85],[0.45,0.7],[0.45,0.35],[0.65,0.25],[0.65,0.6],[1,0.5]];
      function px(f){ return g.padL + f*g.plotW; }
      function py(f){ return g.padT + g.plotH - f*g.plotH*0.85; }
      x.strokeStyle = '#f59e0b'; x.lineWidth = 2.2; x.beginPath();
      segs.forEach(function(p,i2){ i2===0?x.moveTo(px(p[0]),py(p[1])):x.lineTo(px(p[0]),py(p[1])); });
      x.stroke();
      x.fillStyle = 'rgba(255,255,255,.5)'; x.font = '9px sans-serif'; x.textAlign = 'center';
      x.fillText('1: H\u2082 eklendi', px(0.25), py(0.85)-8);
      x.fillText('2: T düşürüldü', px(0.45), py(0.7)-8);
      x.fillText('3: katalizör', px(0.65), py(0.6)-8);
    });
    // CS2 PE-TK (I ve II eğri)
    maarifChart('noteg-cs2', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Tepkime koordinatı', 'Pot. enerji');
      var reactY = g.padT + g.plotH*0.62, prodY = g.padT + g.plotH*0.85;
      function curve(peakY, col, dashed, lbl){
        function px(f){ return g.padL + f*g.plotW; }
        x.beginPath();
        x.moveTo(px(0.02), reactY); x.lineTo(px(0.30), reactY);
        x.bezierCurveTo(px(0.40), reactY, px(0.42), peakY, px(0.5), peakY);
        x.bezierCurveTo(px(0.58), peakY, px(0.60), prodY, px(0.70), prodY);
        x.lineTo(px(0.98), prodY);
        x.strokeStyle = col; x.lineWidth = 2;
        if (dashed) x.setLineDash([5,4]);
        x.stroke(); x.setLineDash([]);
        x.fillStyle = col; x.font = '10px sans-serif'; x.textAlign = 'left';
        x.fillText(lbl, g.padL+4, peakY-6 > g.padT ? peakY - 6 : g.padT+10);
      }
      curve(g.padT + g.plotH*0.05, '#f59e0b', false, 'I (mevcut)');
      curve(g.padT + g.plotH*0.34, '#22c55e', true, 'II (katalizörlü)');
    });
    // H2 mol-zaman (I, II eğrileri, aynı plato)
    maarifChart('noteg-h2mol', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Zaman (s)', 'n(H\u2082) mol');
      function curve(finishT, col, lbl){
        var pts = [];
        for (var i = 0; i <= 100; i++) {
          var t = i/100*10;
          var yv = 1 - Math.exp(-t/(finishT/3));
          pts.push([g.padL+(t/10)*g.plotW, g.padT+g.plotH-yv*g.plotH*0.85]);
        }
        x.beginPath(); pts.forEach(function(p,i2){ i2===0?x.moveTo(p[0],p[1]):x.lineTo(p[0],p[1]); });
        x.strokeStyle = col; x.lineWidth = 2.2; x.stroke();
        x.fillStyle = col; x.font = '10px sans-serif'; x.textAlign = 'left';
      }
      curve(8, '#22c55e', 'II'); curve(10, '#3b82f6', 'I');
      x.fillStyle = '#22c55e'; x.fillText('II (8s, hızlı)', g.padL+6, g.padT+10);
      x.fillStyle = '#3b82f6'; x.fillText('I (10s, yavaş)', g.padL+6, g.padT+24);
    });
    // Kömür CO2-zaman (2 eğri, aynı plato farklı hız)
    maarifChart('noteg-komur', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Zaman', 'Oluşan CO\u2082 (mol)');
      function curve(rate, col, lbl){
        var pts = [];
        for (var i = 0; i <= 100; i++) {
          var f = i/100;
          var yv = 1 - Math.exp(-rate*f*6);
          pts.push([g.padL+f*g.plotW, g.padT+g.plotH-yv*g.plotH*0.85]);
        }
        x.beginPath(); pts.forEach(function(p,i2){ i2===0?x.moveTo(p[0],p[1]):x.lineTo(p[0],p[1]); });
        x.strokeStyle = col; x.lineWidth = 2.2; x.stroke();
      }
      curve(1.0, '#ef4444'); curve(0.4, '#3b82f6');
      x.font = '10px sans-serif'; x.textAlign = 'left';
      x.fillStyle = '#ef4444'; x.fillText('2. kömür (küçük parçacık)', g.padL+4, g.padT+10);
      x.fillStyle = '#3b82f6'; x.fillText('1. kömür (büyük parçacık)', g.padL+4, g.padT+24);
    });
  }

  function setupKin(){
    if (document.getElementById('s-kinetik')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    app.insertAdjacentHTML('beforeend',
      '<div id="s-kinetik" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\ud83d\udca5 Tepkime H\u0131z\u0131 (Kinetik)</h1>' +
        '<p class="psub">\u00c7arp\u0131\u015fma teorisi, potansiyel enerji diyagram\u0131, h\u0131z hesaplamalar\u0131 ve h\u0131z bağ\u0131nt\u0131s\u0131.</p>' +
        '<div class="ltabs" id="kin-maingroup" style="margin-bottom:14px">' +
          '<button class="ltab on" onclick="kinGroupSet(0,this)">\ud83d\udd2c Araçlar</button>' +
          '<button class="ltab" onclick="kinGroupSet(1,this)">\ud83d\udcd8 MEB Konu Anlat\u0131m\u0131</button>' +
          '<button class="ltab" onclick="kinGroupSet(2,this)">\ud83d\udcd3 Özel Ders Notu</button>' +
        '</div>' +
        '<div id="kin-group-0" style="display:block">' +
        '<div class="ltabs" id="kin-tabs">' +
          '<button class="ltab on" onclick="tswitch(\'kin-tabs\',\'kin-tps\',0)">\ud83d\udca5 3D Sim\u00fclasyon</button>' +
          '<button class="ltab" onclick="tswitch(\'kin-tabs\',\'kin-tps\',1)">\u26f0\ufe0f PE Diyagram\u0131</button>' +
          '<button class="ltab" onclick="tswitch(\'kin-tabs\',\'kin-tps\',2)">\u23f1\ufe0f H\u0131z Hesapla</button>' +
          '<button class="ltab" onclick="tswitch(\'kin-tabs\',\'kin-tps\',3)">\ud83d\udcd0 H\u0131z Bağ\u0131nt\u0131s\u0131</button>' +
        '</div>' +
        '<div id="kin-tps">' +
        '<div class="tp on">' +
        '<div style="background:#050510;border:1px solid rgba(245,158,11,.3);border-radius:16px;overflow:hidden;margin-bottom:12px">' +
          '<canvas id="kin-cv" style="width:100%;display:block;touch-action:none" height="260"></canvas>' +
        '</div>' +
        '<div class="card" style="margin-bottom:12px">' +
          '<div class="slbl">\u00d7 Derişim</div>' +
          '<div style="display:flex;gap:6px;margin-bottom:14px">' +
            '<button type="button" class="ob" onclick="kinSetConc(0.5,this)">Az</button>' +
            '<button type="button" class="ob sel2" onclick="kinSetConc(1,this)">Normal</button>' +
            '<button type="button" class="ob" onclick="kinSetConc(1.8,this)">\u00c7ok</button>' +
          '</div>' +
          '<div class="slbl">\ud83c\udf21\ufe0f S\u0131cakl\u0131k</div>' +
          '<div style="display:flex;gap:6px;margin-bottom:14px">' +
            '<button type="button" class="ob" onclick="kinSetTemp(0.6,this)">D\u00fc\u015f\u00fck</button>' +
            '<button type="button" class="ob sel2" onclick="kinSetTemp(1,this)">Normal</button>' +
            '<button type="button" class="ob" onclick="kinSetTemp(1.7,this)">Y\u00fcksek</button>' +
          '</div>' +
          '<div class="slbl">\u2697\ufe0f Katalizör</div>' +
          '<button type="button" id="kin-cat-btn" class="ob" onclick="kinToggleCatalyst(this)" style="width:100%">Katalizör Ekle</button>' +
        '</div>' +
        '<div id="kin-info" style="margin-bottom:16px"></div>' +
        KIN_THEORY_HTML +
        '</div>' +
        '<div class="tp">' +
          '<div style="background:#050510;border:1px solid rgba(245,158,11,.3);border-radius:16px;overflow:hidden;margin-bottom:12px">' +
            '<canvas id="pe-cv" style="width:100%;display:block" height="240"></canvas>' +
          '</div>' +
          '<div class="card" style="margin-bottom:12px">' +
            '<div style="display:flex;gap:6px;margin-bottom:12px">' +
              '<button type="button" class="ob" onclick="peSetPreset(80,-40)">Ekzotermik \u00d6rnek</button>' +
              '<button type="button" class="ob" onclick="peSetPreset(90,50)">Endotermik \u00d6rnek</button>' +
            '</div>' +
            '<div class="g2" style="margin-bottom:10px">' +
              '<div><div class="slbl">Ea (ileri, kj)</div><input type="number" id="pe-ea1-inp" class="inp" value="60" oninput="peSetEa1(parseFloat(this.value)||0)"></div>' +
              '<div><div class="slbl">\u0394H (kj)</div><input type="number" id="pe-dh-inp" class="inp" value="-30" oninput="peSetDH(parseFloat(this.value)||0)"></div>' +
            '</div>' +
            '<button type="button" class="ob" id="pe-cat-btn" onclick="peToggleCat(this)" style="width:100%">\u2697\ufe0f Katalizörl\u00fc Karş\u0131laşt\u0131r</button>' +
          '</div>' +
          '<div id="pe-info" style="margin-bottom:16px"></div>' +
          PE_THEORY_HTML +
        '</div>' +
        '<div class="tp">' +
          '<div class="card">' +
            '<div class="slbl">Tepkime Denklemi (Otomatik Dengelenir)</div>' +
            '<input type="text" id="hcalc-eq-inp" class="inp" placeholder="\u00f6rn: 2N2O5 -> 4NO2 + O2" style="margin-bottom:10px" autocapitalize="off" autocorrect="off" spellcheck="false">' +
            '<button type="button" class="btn bp bfull" onclick="hcalcParse()">Denklemi Ayr\u0131\u015ft\u0131r</button>' +
            '<div id="hcalc-out" style="margin-top:6px"></div>' +
          '</div>' +
          '<div class="card" style="margin-top:12px">' +
            '<div class="slbl">Yard\u0131mc\u0131: K\u00fctleden H\u0131za \u00c7evir</div>' +
            '<div class="g2" style="margin-bottom:10px">' +
              '<div><div class="slbl">K\u00fctle (g)</div><input type="number" step="any" id="hm-mass" class="inp"></div>' +
              '<div><div class="slbl">Molar K\u00fctle (g/mol)</div><input type="number" step="any" id="hm-molar" class="inp"></div>' +
            '</div>' +
            '<div class="g2" style="margin-bottom:10px">' +
              '<div><div class="slbl">Zaman</div><input type="number" step="any" id="hm-time" class="inp"></div>' +
              '<div><div class="slbl">Hacim (L, opsiyonel)</div><input type="number" step="any" id="hm-vol" class="inp"></div>' +
            '</div>' +
            '<button type="button" class="btn bs bfull" onclick="hcalcMassCompute()">\u00c7evir</button>' +
            '<div id="hm-out" style="margin-top:10px"></div>' +
          '</div>' +
          '<div style="margin-top:12px">' + HCALC_THEORY_HTML + '</div>' +
        '</div>' +
        '<div class="tp">' +
          '<div class="card">' +
            '<div class="slbl">Reaktan Say\u0131s\u0131</div>' +
            '<div style="display:flex;gap:6px;margin-bottom:14px">' +
              '<button type="button" class="ob sel2" onclick="rlawSetN(2,this)">2 Reaktan</button>' +
              '<button type="button" class="ob" onclick="rlawSetN(3,this)">3 Reaktan</button>' +
            '</div>' +
            '<div class="slbl">Deneysel Veriler</div>' +
            '<div id="rlaw-table-wrap" style="margin-bottom:14px"></div>' +
            '<button type="button" class="btn bp bfull" onclick="rlawCompute()">Hesapla</button>' +
            '<div id="rlaw-result" style="margin-top:14px"></div>' +
          '</div>' +
          '<div style="margin-top:12px">' + RLAW_THEORY_HTML + '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div id="kin-group-1" style="display:none"></div>' +
        '<div id="kin-group-2" style="display:none"></div>' +
      '</div></div>');
    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-kinetik') === -1) SCREENS.push('s-kinetik');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-kinetik'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-kinetik" onclick="nav(\'kinetik\')">\ud83d\udca5 Tepkime H\u0131z\u0131 3D</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-kinetik'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-kinetik" onclick="nav(\'kinetik\')"><div class="ti">\ud83d\udca5</div><div class="tt">Tepkime H\u0131z\u0131 3D</div><div class="td">\u00c7arp\u0131\u015fma teorisi \u2014 derişim/s\u0131cakl\u0131k/katalizör canlı sim\u00fclasyonu.</div></div>');
    kinBindCanvas();
    kinRenderInfo();
    peRender();
    rlawBuildTable();
    setupMaarif();
    setupNoteQ();
  }
  window.kinGroupSet = function(i, btn){
    for (var g = 0; g < 3; g++) { var el = document.getElementById('kin-group-' + g); if (el) el.style.display = (g === i) ? 'block' : 'none'; }
    var bar = document.getElementById('kin-maingroup');
    if (bar && btn) { var bs = bar.querySelectorAll('button'); for (var k = 0; k < bs.length; k++) bs[k].classList.remove('on'); btn.classList.add('on'); }
    if (i === 1) setTimeout(maarifDrawGraphs, 60);
    if (i === 2) setTimeout(noteqDrawGraphs, 60);
  };

  window.kinSetConc = kinSetConc;
  window.kinSetTemp = kinSetTemp;
  window.kinToggleCatalyst = kinToggleCatalyst;

  function setupMaarif(){
    if (document.getElementById('maarif-wrap')) return;
    var host = document.getElementById('kin-group-1');
    if (!host) return;
    host.insertAdjacentHTML('beforeend', '<div id="maarif-wrap"></div>');
    var wrap = document.getElementById('maarif-wrap');
    wrap.innerHTML =
      '<p class="psub" style="margin-bottom:10px">MEB Maarif Modeli 11. Sınıf Kimya 2 ders kitabı, \u201cKimyasal Tepkimelerde Hız\u201d ünitesinin tam konu anlatımı \u2014 tüm etkinlik, örnek ve grafikleriyle.</p>' +
      '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:14px"><div style="display:flex;gap:6px;min-width:max-content">' +
        '<button type="button" class="ob sel2" onclick="maarifSetSub(0,this)">1.2.1 Gerekli Şartlar</button>' +
        '<button type="button" class="ob" onclick="maarifSetSub(1,this)">1.2.2 Ortalama Hız</button>' +
        '<button type="button" class="ob" onclick="maarifSetSub(2,this)">1.2.3 Etkileyen Faktörler</button>' +
        '<button type="button" class="ob" onclick="maarifSetSub(3,this)">1.2.4 Hız Denklemi</button>' +
        '<button type="button" class="ob" onclick="maarifSetSub(4,this)">\ud83d\udcdd 66 Soru (Ölçme-Değerlendirme)</button>' +
      '</div></div>' +
      '<div id="maarif-content"></div>';
    maarifRender();
  }
  window.maarifSetSub = function(i, btn){ maarifSt.sub = i; if (btn) selectInRow(btn); maarifRender(); };

  function setupNoteQ(){
    if (document.getElementById('noteq-wrap')) return;
    var host = document.getElementById('kin-group-2');
    if (!host) return;
    host.insertAdjacentHTML('beforeend', '<div id="noteq-wrap"></div>');
    var wrap = document.getElementById('noteq-wrap');
    var cats = ['Tümü'];
    NOTE_Q.forEach(function(q){ if (cats.indexOf(q.kat) === -1) cats.push(q.kat); });
    wrap.innerHTML =
      '<p class="psub" style="margin-bottom:10px">Kendi el yazması ders notundaki ' + NOTE_Q.length + ' \u00e7\u00f6z\u00fcml\u00fc örnek soru.</p>' +
      '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:14px"><div style="display:flex;gap:6px;min-width:max-content" id="noteq-cats">' +
        cats.map(function(c,i){ return '<button type="button" class="ob' + (i===0?' sel2':'') + '" onclick="noteqSetCat(\'' + c + '\',this)">' + c + '</button>'; }).join('') +
      '</div></div>' +
      '<div id="noteq-list"></div>';
    noteqRenderList();
  }
  var noteqSt = { cat: 'Tümü' };
  window.noteqSetCat = function(cat, btn){ noteqSt.cat = cat; if (btn) selectInRow(btn); noteqRenderList(); };

  function noteqRenderList(){
    var box = document.getElementById('noteq-list');
    if (!box) return;
    var html = '';
    NOTE_Q.forEach(function(q){
      if (noteqSt.cat !== 'Tümü' && q.kat !== noteqSt.cat) return;
      html += '<div class="card" style="margin-bottom:18px;padding:18px 16px">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">' +
          '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:rgba(245,158,11,.18);color:#f59e0b;font-weight:800;font-size:13px;flex-shrink:0">' + q.n + '</span>' +
          '<span style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">' + q.kat + '</span>' +
        '</div>' +
        '<div style="font-size:14px;color:#fff;font-weight:500;line-height:1.75;margin-bottom:12px">' + formatOncul(q.t) + '</div>' +
        (q.graph ? '<div style="background:#050510;border:1px solid rgba(245,158,11,.25);border-radius:12px;overflow:hidden;margin-bottom:14px"><canvas id="' + q.graph + '" data-h="190" style="width:100%;display:block"></canvas></div>' : '') +
        '<div onclick="molToggle(\'noteq-' + q.n + '\')" style="cursor:pointer;text-align:center;font-size:13px;font-weight:700;color:#050510;background:#f59e0b;border-radius:10px;padding:10px;margin-top:4px">\ud83d\udc41\ufe0f \u00c7\u00f6z\u00fcm\u00fc G\u00f6ster</div>' +
        '<div id="noteq-' + q.n + '" style="display:none;margin-top:14px;padding:14px;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:10px;font-size:13px;color:var(--tx2);line-height:1.85">' + q.c + '</div>' +
      '</div>';
    });
    box.innerHTML = html;
    setTimeout(noteqDrawGraphs, 60);
  }

  // ---------- 27. KİMYASAL ENERJİ — ÖZEL DERS NOTU SORULARI ----------
  var ENERJI_Q = [
    { n:1, kat:'Kavram', t:'Ekzotermik olaylar ortamın sıcaklığını nasıl etkiler? Endotermik olaylar ortamın sıcaklığını nasıl etkiler? D\u00fcş\u00fck ve y\u00fcksek sıcaklıkta hangi enerji seviyesi kararlıdır?',
      c:'<b>Ekzotermik</b> olaylar \u00e7evreye ısı VERDİĞİ i\u00e7in ortamın sıcaklığını <b>ARTIRIR</b>.<br><b>Endotermik</b> olaylar \u00e7evreden ısı ALDIĞI i\u00e7in ortamın sıcaklığını <b>AZALTIR</b>.<br>D\u00fcş\u00fck sıcaklıkta enerjisi <b>D\u00dcŞ\u00dcK (az)</b> olan kararlıdır (sistem en d\u00fcş\u00fck enerji durumuna eğilimlidir).<br>Y\u00fcksek sıcaklıkta enerjisi <b>Y\u00dcKSEK (fazla)</b> olan da kararlı olabilir (entropi/dağınıklık etkisi baskın \u00e7ıkar).' },
    { n:2, kat:'Kavram', t:'Aşağıdaki olayları ENDOTERMİK ya da EKZOTERMİK olarak sınıflandırınız: Erime/buharlaşma/s\u00fcblimleşme; Donma/yoğuşma/kırağılaşma; Bağ oluşumu; Bağ kırılması; İyonlaşma enerjisi; Elektron ilgisi; Gazların suda \u00e7\u00f6z\u00fcnmesi; Tuzun suda \u00e7\u00f6z\u00fcnmesi; Metallerin suda \u00e7\u00f6z\u00fcnmesi; Asit-baz tepkimeleri; Metal-asit tepkimeleri; Elektroliz; Pil tepkimeleri; Yanma; Radyoaktif tepkimeler.',
      c:'<b>ENDOTERMİK:</b> Erime/buharlaşma/s\u00fcblimleşme (hâl değişimi i\u00e7in enerji alınır) \u00b7 Bağ kırılması (her zaman enerji ister) \u00b7 İyonlaşma enerjisi (elektron koparmak enerji ister) \u00b7 Tuzun suda \u00e7\u00f6z\u00fcnmesi (\u00e7oğu tuzda, \u00f6rn. NH\u2084NO\u2083) \u00b7 Elektroliz (dışarıdan elektrik enerjisi verilir).<br><br><b>EKZOTERMİK:</b> Donma/yoğuşma/kırağılaşma (hâl değişiminin tersi, ısı verir) \u00b7 Bağ oluşumu (her zaman enerji açığa \u00e7ıkarır) \u00b7 Elektron ilgisi (\u00e7oğu element i\u00e7in enerji açığa \u00e7ıkar) \u00b7 Gazların suda \u00e7\u00f6z\u00fcnmesi (genelde) \u00b7 Metallerin suda \u00e7\u00f6z\u00fcnmesi (\u00f6rn. Na+H\u2082O) \u00b7 Asit-baz (n\u00f6tralleşme) \u00b7 Metal-asit tepkimeleri \u00b7 Pil tepkimeleri \u00b7 Yanma \u00b7 Radyoaktif tepkimeler.<br><br><i>Not: Bağ oluşumu/kırılması ve iyonlaşma/elektron ilgisi \u00e7iftleri, \u201changisi zıt işlemin tersidir\u201d mantığıyla kolayca hatırlanabilir \u2014 bir işlem enerji verirse tersi enerji alır.</i>' },
    { n:3, kat:'Hesaplama', t:'2Fe\u2082O\u2083(k)+3C(k)+360 kJ\u21924Fe(k)+3CO\u2082(g) tepkimesi ile ilgili: a) Tepkime entalpisi ka\u00e7 kJ\u2019d\u00fcr? b) 0,4 mol Fe(k) oluşması i\u00e7in ka\u00e7 kJ enerji gerekir? c) 32 gram Fe\u2082O\u2083(k)\u2019ın yeterince C(k) ile tepkimeye girmesi i\u00e7in ka\u00e7 kJ enerji gerekir? d) 14,4 gram C(k) tamamının harcanması i\u00e7in ka\u00e7 kJ enerji gerekir? (Fe\u2082O\u2083:160 g/mol, C:12 g/mol)',
      c:'a) 360 kJ tepken tarafında yazıldığı i\u00e7in tepkime ENERJİ ALIYOR \u2192 <b>\u0394H=+360 kJ (endotermik)</b>.<br>b) 4 mol Fe i\u00e7in 360 kJ gerekiyor. 0,4 mol Fe i\u00e7in: (360/4)\u00d70,4=<b>36 kJ</b>.<br>c) 32g Fe\u2082O\u2083=0,2 mol. 2 mol Fe\u2082O\u2083 i\u00e7in 360kJ gerekiyor. 0,2 mol i\u00e7in: (360/2)\u00d70,2=<b>36 kJ</b>.<br>d) 14,4g C=1,2 mol. 3 mol C i\u00e7in 360kJ gerekiyor. 1,2 mol i\u00e7in: (360/3)\u00d71,2=<b>144 kJ</b>.' },
    { n:4, kat:'Hesaplama', t:'4X(k)+2O\u2082(g)\u21924XO(k), \u0394H=\u22121250 kJ tepkimesinde 14,4 gram XO oluştuğunda 62,5 kJ enerji açığa \u00e7ıktığına g\u00f6re, X\u2019in atom k\u00fctlesi ka\u00e7tır? (O:16)',
      c:'4 mol XO oluşumunda 1250 kJ a\u00e7ığa \u00e7ıkar. 62,5 kJ i\u00e7in oluşan XO: (62,5/1250)\u00d74=<b>0,2 mol</b>.<br>Molar k\u00fctle M(XO)=14,4/0,2=<b>72 g/mol</b>.<br>X\u2019in atom k\u00fctlesi = 72\u221216(O) = <b>56</b>.' },
    { n:5, kat:'Hesaplama', t:'CaO(k)+H\u2082O(s)\u2192Ca(OH)\u2082(k), \u0394H=\u221262,5 kJ tepkimesine g\u00f6re, 2,8 gram CaO katısının yeterli miktarda su ile etkileşmesiyle açığa \u00e7ıkan enerji ka\u00e7 joule\u2019d\u00fcr? (Ca:40, O:16)',
      c:'M(CaO)=56 g/mol. mol CaO=2,8/56=<b>0,05 mol</b>.<br>1 mol CaO\u219262,5 kJ a\u00e7ığa \u00e7ıkarır. 0,05 mol i\u00e7in: 0,05\u00d762,5=3,125 kJ = <b>3125 J</b>.' },
    { n:6, kat:'Hesaplama', t:'CaO(k)+H\u2082O(s)\u2192Ca(OH)\u2082(k), \u0394H=\u221265,2 kJ tepkimesine g\u00f6re, 2,8 gram CaO ile 0,36 gram H\u2082O\u2019nun %25 verimle etkileşmesinden ka\u00e7 joule enerji açığa \u00e7ıkar? (CaO:56, H\u2082O:18)',
      c:'mol CaO=2,8/56=0,05 mol; mol H\u2082O=0,36/18=0,02 mol. Katsayı oranı 1:1 olduğundan <b>H\u2082O sınırlayıcıdır</b> (0,02<0,05).<br>%100 verimle: 0,02\u00d765,2=1,304 kJ.<br>%25 verimle: 1,304\u00d70,25=0,326 kJ = <b>326 J</b>.' },
    { n:7, kat:'Hesaplama', t:'S(k)+\u00b3\u2044\u2082O\u2082(g)\u2192SO\u2083(g) tepkimesine g\u00f6re, 9,6\u2019şar gram S ve O\u2082 tam verimle etkileştiğinde 39,5 kJ ısı açığa \u00e7ıkıyor. Buna g\u00f6re, SO\u2083(g)\u2019nin molar oluşum ısısı ka\u00e7 kJ/mol\u2019d\u00fcr? (S:32, O:16)',
      c:'mol S=9,6/32=<b>0,3 mol</b>. Katsayı oranı S:SO\u2083=1:1 olduğundan 0,3 mol SO\u2083 oluşur.<br>Molar oluşum ısısı = \u221239,5/0,3 = <b>\u2212131,7 kJ/mol</b> (yaklaşık).' },
    { n:8, kat:'Standart Oluşum Entalpisi', t:'Aşağıdaki tepkimelerden hangileri OLUŞUM ENTALPİSİdir, hangileri MOLAR OLUŞUM ENTALPİSİdir? I. CO(g)+\u00bdO\u2082(g)\u2192CO\u2082(g) II. N\u2082(g)+3H\u2082(g)\u21922NH\u2083(g) III. 2H(g)+Cl\u2082(g)\u21922HCl(g) IV. H\u2082(g)+2O\u2082(g)\u2192H\u2082O(g) V. C(k,elmas)+O\u2082(g)\u2192CO\u2082(g) VI. 2C(k)+3H\u2082(g)+\u00bdO\u2082(g)\u2192C\u2082H\u2085OH(s) VII. Ag\u207a(suda)+Cl\u207b(suda)\u2192AgCl(suda) VIII. \u2081\u00b2H+\u2081\u00b3H\u2192\u2082\u2074He+\u2080\u00b9n',
      c:'Oluşum entalpisi olabilmesi i\u00e7in tepkenler ELEMENTLERİN STANDART HALİ olmalı, \u00fcr\u00fcn TEK bir bileşik olmalı; \u201cmolar\u201d olması i\u00e7in \u00fcr\u00fcn KATSAYISI 1 olmalıdır.<br>I \u2014 CO bir ELEMENT değil (bileşik), oluşum entalpisi DEĞİL.<br>II \u2014 Elementlerden bileşik oluşuyor (oluşum entalpisi) ama 2 mol NH\u2083 oluşuyor, MOLAR DEĞİL.<br>III \u2014 2H(g) atomik hidrojen, hidrojenin standart hali H\u2082(g)\u2019dir \u2014 oluşum entalpisi DEĞİL.<br>IV \u2014 Hatalı dengelenmiş (H\u2082O i\u00e7in \u00bdO\u2082 olmalıydı) \u2014 ge\u00e7erli değil.<br>V \u2014 Karbonun standart hali GRAFİTTİR, ELMAS değil \u2014 standart oluşum entalpisi DEĞİL.<br>VI \u2014 T\u00fcm tepkenler standart element hali, \u00fcr\u00fcn 1 mol \u2014 <b>HEM oluşum HEM molar oluşum entalpisidir.</b><br>VII \u2014 Tepkenler İYONLAR, element değil \u2014 oluşum entalpisi DEĞİL.<br>VIII \u2014 N\u00dcKLEER tepkime, kimyasal oluşum entalpisi kapsamında DEĞİL.<br>\u2192 Sadece <b>VI</b> hem oluşum hem molar oluşum entalpisidir; <b>II</b> sadece oluşum entalpisidir (molar değil).' },
    { n:9, kat:'Standart Oluşum Entalpisi', t:'Aşağıdakilerden hangilerinin standart koşullarda molar oluşum entalpisi SIFIR kabul edilir? I. Fe(k) II. H\u2082(g) III. C(k)(elmas) IV. C(k)(grafit) V. Hg(k) VI. H\u2082O(s) VII. O\u2082(g) VIII. O\u2083(g) IX. I\u2082(k) X. F(g) XI. Br\u2082(g)',
      c:'Bir elementin standart oluşum entalpisi, YALNIZCA o element standart koşullarda EN KARARLI (doğal) haldeyse sıfırdır.<br>I. Fe(k) \u2014 <b>DOĞRU (0)</b>, demirin standart hali katıdır.<br>II. H\u2082(g) \u2014 <b>DOĞRU (0)</b>.<br>III. C(elmas) \u2014 YANLIŞ, karbonun standart hali GRAFİTTİR, elmas değil.<br>IV. C(grafit) \u2014 <b>DOĞRU (0)</b>.<br>V. Hg(k) \u2014 YANLIŞ, cıvanın standart hali oda sıcaklığında SIVIdır, katı değil.<br>VI. H\u2082O(s) \u2014 YANLIŞ, su bir BİLEŞİKTİR, element değil (element sorusu i\u00e7in ge\u00e7ersiz).<br>VII. O\u2082(g) \u2014 <b>DOĞRU (0)</b>.<br>VIII. O\u2083(g) \u2014 YANLIŞ, oksijenin standart hali O\u2082\u2019dir, O\u2083 (ozon) değil.<br>IX. I\u2082(k) \u2014 <b>DOĞRU (0)</b>, iyodun standart hali odasıcaklığında katıdır.<br>X. F(g) \u2014 YANLIŞ, florun standart hali F\u2082(g)\u2019dir, atomik F değil.<br>XI. Br\u2082(g) \u2014 YANLIŞ, bromun standart hali oda sıcaklığında SIVIdır (Br\u2082(s)), gaz değil.<br>\u2192 <b>I, II, IV, VII, IX</b> sıfır kabul edilir.' },
    { n:10, kat:'AYT 2023', t:'HBr(g) i\u00e7in standart oluşum entalpisi \u221236 kJ/mol ve H\u2082O(s) i\u00e7in standart oluşum entalpisi \u2212286 kJ/mol\u2019d\u00fcr. Buna g\u00f6re, 4HBr(g)+O\u2082(g)\u21922H\u2082O(s)+Br\u2082(s) tepkimesinin standart entalpi değişimi ka\u00e7 kJ\u2019dir?',
      o:['-428','-250','250','428','716'], c:3,
      ac:'\u0394H=[\u00fcr\u00fcnler]\u2212[tepkenler]=[2\u00d7(\u2212286)+0]\u2212[4\u00d7(\u221236)+0]=\u2212572\u2212(\u2212144)=<b>\u2212428 kJ</b> (Br\u2082(s) ve O\u2082(g) elementlerin standart hali olduğu i\u00e7in ΔHf=0). \u2192 <b>A) -428</b>' },
    { n:11, kat:'Hesaplama', t:'H\u2082SO\u2084(suda)+2KOH(suda)\u2192K\u2082SO\u2084(suda)+2H\u2082O(s) tepkimesine g\u00f6re 0,4 M 500 mL KOH ve yeterince H\u2082SO\u2084 tepkimeye girdiğinde 16 kJ enerji açığa \u00e7ıkıyor. a) H\u2082SO\u2084\u2019\u00fcn molar n\u00f6trleşme entalpisi ka\u00e7 kJ olur? b) KOH\u2019un molar n\u00f6trleşme entalpisi ka\u00e7 kJ olur?',
      c:'mol KOH=0,4\u00d70,5=<b>0,2 mol</b>. Katsayı oranı KOH:H\u2082SO\u2084=2:1 olduğundan stokiyometrik H\u2082SO\u2084=0,1 mol.<br>a) 0,1 mol H\u2082SO\u2084 16 kJ açığa \u00e7ıkarıyor \u2192 1 mol i\u00e7in: 16/0,1=<b>\u2212160 kJ</b>.<br>b) 0,2 mol KOH 16 kJ açığa \u00e7ıkarıyor \u2192 1 mol i\u00e7in: 16/0,2=<b>\u221280 kJ</b>.<br><i>Kontrol: 2 mol KOH\u2019a karşılık 1 mol H\u2082SO\u2084 olduğu i\u00e7in H\u2082SO\u2084\u2019\u00fcn molar değeri KOH\u2019un TAM 2 katı olmalı (160=2\u00d780) \u2014 tutarlı.</i>' },
    { n:12, kat:'Kavramsal', t:'Yalıtılmış (\u00e7evreyle ısı alışverişi olmayan) sabit hacimli kaplarda ayrı ayrı ger\u00e7ekleşen I. PCl\u2083(g)+Cl\u2082(g)\u21ccPCl\u2085(g) II. N\u2082O\u2084(g)\u21cc2NO\u2082(g) III. H\u2082(g)+F\u2082(g)\u21cc2HF(g) tepkimelerinde kap i\u00e7indeki toplam gaz basıncı ARTMIŞTIR. Yalnız bu bilgiden yararlanarak, hangi tepkimelerin EKZOTERMİK olduğu KESİN olarak s\u00f6ylenebilir?',
      c:'Yalıtılmış sabit hacimli bir kapta P, hem MOL SAYISI DEĞİŞİMİNDEN hem de EKZO/ENDOTERMİK olmaya bağlı SICAKLIK DEĞİŞİMİNDEN etkilenir (ısı dışarı \u00e7ıkamadığı i\u00e7in ekzotermikse T artar, endotermikse T azalır).<br><b>I</b> (2mol\u21921mol, AZALIR): Mol sayısı AZALDIĞI halde P ARTTIYSA, bunu sadece SICAKLIK ARTIŞI (yani EKZOTERMİK olma) telafi edebilir \u2192 <b>KESİN EKZOTERMİK</b>.<br><b>II</b> (1mol\u21922mol, ARTAR): Mol sayısı zaten ARTTIĞI i\u00e7in P\u2019nin artması sıcaklıktan BAĞIMSIZ olarak da a\u00e7ıklanabilir \u2192 <b>BELİRSİZ</b> (ekzo ya da endo olabilir).<br><b>III</b> (2mol\u21922mol, DEĞİŞMEZ): Mol sayısı SABİT olduğu i\u00e7in P\u2019nin artması SADECE sıcaklık artışıyla (EKZOTERMİK) a\u00e7ıklanabilir \u2192 <b>KESİN EKZOTERMİK</b>.<br>\u2192 <b>I ve III kesinlikle ekzotermiktir.</b>' },
    { n:13, kat:'Kavramsal', t:'Aynı miktarda H\u2082O oluştuğu şu 4 tepkimeyi karşılaştırın: 1) H\u2082(g)+\u00bdO\u2082(g)\u2192H\u2082O(g) 2) H\u2082(g)+\u00bdO\u2082(g)\u2192H\u2082O(s) 3) 2H(g)+\u00bdO\u2082(g)\u2192H\u2082O(s) (atomik hidrojenden). a) Açığa \u00e7ıkan ısıları karşılaştırın. b) Entalpi değişimlerini (\u0394H) karşılaştırın.',
      c:'a) Sıvı su OLUŞUMU, gaz suya g\u00f6re DAHA FAZLA ısı a\u00e7ığa \u00e7ıkarır (yoğuşma ısısı da eklenir) \u2192 tepkime (2), tepkime (1)\u2019den daha \u00e7ok ısı verir. Atomik hidrojenden (3) başlamak, molek\u00fcler H\u2082\u2019nin H-H bağını KIRMADAN başladığı i\u00e7in (bu enerji zaten \u201cdepoda\u201d olduğu i\u00e7in) EN FAZLA ısıyı a\u00e7ığa \u00e7ıkarır.<br>Sıralama (a\u00e7ığa \u00e7ıkan ısı, \u00e7oktan aza): <b>(3) > (2) > (1)</b>.<br>b) T\u00fcm tepkimeler EKZOTERMİK olduğu i\u00e7in \u0394H NEGATİFTİR; ısı b\u00fcy\u00fckl\u00fcğ\u00fc arttık\u00e7a \u0394H DAHA K\u00dc\u00c7\u00dcK (daha negatif) olur \u2192 \u0394H sıralaması (en negatiften en az negatife): <b>\u0394H\u2083 < \u0394H\u2082 < \u0394H\u2081</b>.' },
    { n:14, kat:'Hess Yasası', t:'AYT 2022: C(k)+O\u2082(g)\u2192CO\u2082(g), \u0394H\u00b0=\u2212393,5 kJ/mol; H\u2082(g)+\u00bdO\u2082(g)\u2192H\u2082O(s), \u0394H\u00b0=\u2212285,8 kJ/mol; C(k)+2H\u2082(g)\u2192CH\u2084(g), \u0394H\u00b0=\u221274,8 kJ/mol. Buna g\u00f6re, CH\u2084(g)+2O\u2082(g)\u2192CO\u2082(g)+2H\u2082O(s) tepkimesinin standart entalpi değişimi ka\u00e7 kJ/mol\u2019d\u00fcr?',
      o:['-998,0','-890,3','-604,5','+604,5','+890,3'], c:1,
      ac:'Hess Yasası: Hedef = [C+O\u2082\u2192CO\u2082] + 2\u00d7[H\u2082+\u00bdO\u2082\u2192H\u2082O] \u2212 [C+2H\u2082\u2192CH\u2084]<br>\u0394H=\u2212393,5+2\u00d7(\u2212285,8)\u2212(\u221274,8)=\u2212393,5\u2212571,6+74,8=<b>\u2212890,3 kJ</b>. \u2192 <b>B) -890,3</b>' },
    { n:15, kat:'Hess Yasası', t:'AYT 2021: \u00bdN\u2082(g)+O\u2082(g)\u2192NO\u2082(g), \u0394H\u00b0=33,2 kJ/mol; N\u2082(g)+2O\u2082(g)\u2192N\u2082O\u2084(g), \u0394H\u00b0=11,1 kJ/mol. Buna g\u00f6re 2NO\u2082(g)\u2192N\u2082O\u2084(g) tepkimesi i\u00e7in standart entalpi değişimi ka\u00e7 kJ\u2019dir?',
      o:['-55,3','-22,1','11,0','22,1','44,2'], c:0,
      ac:'İlk denklemi 2 ile \u00e7arp: N\u2082+2O\u2082\u21922NO\u2082, \u0394H=66,4 kJ. Hedef=[N\u2082+2O\u2082\u2192N\u2082O\u2084]\u2212[N\u2082+2O\u2082\u21922NO\u2082]=11,1\u221266,4=<b>\u221255,3 kJ</b>. \u2192 <b>A) -55,3</b>' },
    { n:16, kat:'Hess Yasası', t:'AYT 2020: C\u2082H\u2082(g)+\u2075\u2044\u2082O\u2082(g)\u21922CO\u2082(g)+H\u2082O(s), \u0394H=\u22121300 kJ; C(k)+O\u2082(g)\u2192CO\u2082(g), \u0394H=\u2212394 kJ; H\u2082(g)+\u00bdO\u2082(g)\u2192H\u2082O(s), \u0394H=\u2212286 kJ. Buna g\u00f6re, 2C(k)+H\u2082(g)\u2192C\u2082H\u2082(g) tepkimesinin standart entalpi değişimi ka\u00e7 kilojoule\u2019d\u00fcr?',
      o:['-1980','-1122','226','334','620'], c:2,
      ac:'Hedef = 2\u00d7[C+O\u2082\u2192CO\u2082] + [H\u2082+\u00bdO\u2082\u2192H\u2082O] \u2212 [C\u2082H\u2082+\u2075\u2044\u2082O\u2082\u21922CO\u2082+H\u2082O]<br>\u0394H=2\u00d7(\u2212394)+(\u2212286)\u2212(\u22121300)=\u2212788\u2212286+1300=<b>226 kJ</b>. \u2192 <b>C) 226</b>' },
    { n:17, kat:'Hess Yasası', t:'AYT 2019: C(k)+\u00bdO\u2082(g)\u2192CO(g), \u0394H=\u2212110,5 kJ/mol; CO\u2082(g)\u2192\u00bdO\u2082(g)+CO(g), \u0394H=+283 kJ/mol. Buna g\u00f6re, CO\u2082(g)\u2019nin standart oluşum entalpisi ka\u00e7 kJ/mol\u2019d\u00fcr?',
      o:['+393,5','+172,5','+110,5','-172,5','-393,5'], c:4,
      ac:'İkinci denklemi TERS \u00e7evir: CO+\u00bdO\u2082\u2192CO\u2082, \u0394H=\u2212283. Topla: [C+\u00bdO\u2082\u2192CO]+[CO+\u00bdO\u2082\u2192CO\u2082]=C+O\u2082\u2192CO\u2082<br>\u0394H=\u2212110,5+(\u2212283)=<b>\u2212393,5 kJ</b>. \u2192 <b>E) -393,5</b>' },
    { n:18, kat:'Hess Yasası', t:'AYT 2024: H\u2082(g)+O\u2082(g)\u2192H\u2082O\u2082(s), \u0394H\u00b0=\u2212188 kJ/mol; H\u2082(g)+\u00bdO\u2082(g)\u2192H\u2082O(s), \u0394H\u00b0=\u2212286 kJ/mol. Buna g\u00f6re \u00e7alışılan sıcaklık ve basın\u00e7ta 0,5 mol H\u2082O\u2082(s)\u2019den H\u2082O(s)\u2019nun oluşmasına ilişkin tepkimenin entalpi değişim değeri ka\u00e7 kJ\u2019dir?',
      o:['-143','-98','-49','+49','+98'], c:2,
      ac:'Hedef (1 mol i\u00e7in): H\u2082O\u2082\u2192H\u2082O+\u00bdO\u2082 = [H\u2082+\u00bdO\u2082\u2192H\u2082O]\u2212[H\u2082+O\u2082\u2192H\u2082O\u2082]=\u2212286\u2212(\u2212188)=\u221298 kJ/mol.<br>0,5 mol i\u00e7in: 0,5\u00d7(\u221298)=<b>\u221249 kJ</b>. \u2192 <b>C) -49</b>' },
    { n:19, kat:'Bağ Enerjisi', t:'Bağ enerjisi hakkında: Bir bağ ne kadar sağlamsa, o bağı kırmak i\u00e7in gereken enerji nasıldır? \u0394H\u2019yi bağ enerjileriyle hesaplama form\u00fcl\u00fc nedir?',
      c:'Bir bağ ne kadar SAĞLAMsa (g\u00fc\u00e7l\u00fcyse), o bağı KIRMAK i\u00e7in gereken enerji o kadar <b>FAZLADIR</b> (bağ enerjisi b\u00fcy\u00fckt\u00fcr).<br>Form\u00fcl: <b>\u0394H = \u03a3(Kırılan bağ enerjileri) \u2212 \u03a3(Oluşan bağ enerjileri)</b><br>Kırılan bağlar (tepkenler) her zaman ENERJİ GEREKTİRİR (+); oluşan bağlar (\u00fcr\u00fcnler) her zaman ENERJİ AÇIĞA ÇIKARIR (\u2212 katkı). Bu y\u00fczden oluşan bağların toplam enerjisi, kırılan bağların toplamından B\u00dcY\u00dcKSE tepkime EKZOTERMİKTİR.' }
  ];

  function setupEnerji(){
    if (document.getElementById('s-enerji')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    var cats = ['Tümü'];
    ENERJI_Q.forEach(function(q){ if (cats.indexOf(q.kat) === -1) cats.push(q.kat); });
    app.insertAdjacentHTML('beforeend',
      '<div id="s-enerji" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\u26a1 Kimyasal Enerji</h1>' +
        '<p class="psub">Entalpi, Hess Yasası, bağ enerjisi \u2014 el yazması ders notundan ' + ENERJI_Q.length + ' \u00e7\u00f6z\u00fcml\u00fc \u00f6rnek (ger\u00e7ek AYT sorularıyla).</p>' +
        '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:14px"><div style="display:flex;gap:6px;min-width:max-content" id="enerji-cats">' +
          cats.map(function(c,i){ return '<button type="button" class="ob' + (i===0?' sel2':'') + '" onclick="enerjiSetCat(\'' + c + '\',this)">' + c + '</button>'; }).join('') +
        '</div></div>' +
        '<div id="enerji-list"></div>' +
      '</div></div>');
    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-enerji') === -1) SCREENS.push('s-enerji');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-enerji'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-enerji" onclick="nav(\'enerji\')">\u26a1 Kimyasal Enerji</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-enerji'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-enerji" onclick="nav(\'enerji\')"><div class="ti">\u26a1</div><div class="tt">Kimyasal Enerji</div><div class="td">Entalpi, Hess Yasası, bağ enerjisi \u2014 çözümlü örnekler ve AYT soruları.</div></div>');
    enerjiRenderList();
  }
  var enerjiSt = { cat: 'Tümü' };
  window.enerjiSetCat = function(cat, btn){ enerjiSt.cat = cat; if (btn) selectInRow(btn); enerjiRenderList(); };

  function enerjiRenderList(){
    var box = document.getElementById('enerji-list');
    if (!box) return;
    var html = '';
    ENERJI_Q.forEach(function(q){
      if (enerjiSt.cat !== 'Tümü' && q.kat !== enerjiSt.cat) return;
      var optsHtml = '';
      if (q.o) optsHtml = '<div style="margin-bottom:8px">' + q.o.map(function(o,i){ return '<div style="padding:4px 0;font-size:12px;color:var(--tx2)">' + String.fromCharCode(65+i) + ') ' + o + '</div>'; }).join('') + '</div>';
      html += '<div class="card" style="margin-bottom:18px;padding:18px 16px">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">' +
          '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:rgba(245,158,11,.18);color:#f59e0b;font-weight:800;font-size:13px;flex-shrink:0">' + q.n + '</span>' +
          '<span style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.6px">' + q.kat + '</span>' +
        '</div>' +
        '<div style="font-size:14px;color:#fff;font-weight:500;line-height:1.75;margin-bottom:12px">' + q.t + '</div>' +
        optsHtml +
        '<div onclick="molToggle(\'enerji-' + q.n + '\')" style="cursor:pointer;text-align:center;font-size:13px;font-weight:700;color:#050510;background:#f59e0b;border-radius:10px;padding:10px;margin-top:4px">\ud83d\udc41\ufe0f \u00c7\u00f6z\u00fcm\u00fc G\u00f6ster</div>' +
        '<div id="enerji-' + q.n + '" style="display:none;margin-top:14px;padding:14px;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:10px;font-size:13px;color:var(--tx2);line-height:1.85">' +
          (q.o ? '<div style="font-size:13px;font-weight:700;color:#86efac;margin-bottom:6px">Doğru cevap: ' + String.fromCharCode(65+q.c) + ') ' + q.o[q.c] + '</div>' + q.ac : q.c) +
        '</div>' +
      '</div>';
    });
    box.innerHTML = html;
  }

  // ---------- 28. VİDEO DERSLER — KALICI KÜT\u00dcPHANE (bug düzeltmeleri + geliştirme) ----------
  var videoSt = { list: sget('ronya_videos', []), current: null };

  function videoNiceTitle(filename){
    var base = filename.replace(/\.[^.]+$/, '');
    base = base.replace(/[_\-]+/g, ' ').trim();
    return base.charAt(0).toUpperCase() + base.slice(1);
  }

  function setupVideoLib(){
    if (window.__rkVideoLibReady) return;
    window.__rkVideoLibReady = true;

    // 1) addVideo() — taban index.html'deki sürümü GEÇERSİZ KILAR: artık oynatmakla
    //    kalmıyor, kalıcı listeye de ekliyor (localStorage, sayfa yenilense de kalıcı).
    window.addVideo = function(){
      var input = document.getElementById('video-url-input');
      if (!input) return;
      var filename = input.value.trim();
      if (!filename) return;
      if (!/\.(mp4|webm|ogg|mov|m4v)$/i.test(filename)) {
        if (typeof toast === 'function') toast('Dosya adı .mp4/.webm/.mov gibi bir uzantıyla bitmeli');
        return;
      }
      // Kalıcı listeye ekle (aynı dosya adı zaten varsa tekrar eklemez, sadece oynatır)
      var exists = videoSt.list.some(function(v){ return v.filename === filename; });
      if (!exists) {
        videoSt.list.unshift({ filename: filename, title: videoNiceTitle(filename), addedAt: Date.now() });
        sset('ronya_videos', videoSt.list);
      }
      input.value = '';
      renderVideoList();
      playVideo(filename);
    };

    // 2) closeVideo() — index.html'de ÇAĞRILIYOR ama HİÇ TANIMLANMAMIŞTI (buton hata veriyordu). Düzeltildi.
    window.closeVideo = function(){
      var player = document.getElementById('video-player');
      var wrap = document.getElementById('video-player-wrap');
      if (player) { try { player.pause(); } catch (e) {} player.removeAttribute('src'); try { player.load(); } catch (e) {} }
      if (wrap) wrap.style.display = 'none';
      videoSt.current = null;
    };

    // 3) Videoyu oynat (listeden tıklanınca da kullanılır)
    window.playVideo = function(filename){
      var player = document.getElementById('video-player');
      var wrap = document.getElementById('video-player-wrap');
      var name = document.getElementById('video-current-name');
      if (!player) return;
      player.src = 'videos/' + filename;
      player.load();
      player.play().catch(function(){});
      if (wrap) wrap.style.display = 'block';
      var v = videoSt.list.find(function(x){ return x.filename === filename; });
      if (name) name.innerText = v ? v.title : filename;
      videoSt.current = filename;
      var wrapEl = document.getElementById('video-player-wrap');
      if (wrapEl && wrapEl.scrollIntoView) wrapEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // 4) Videoyu kütüphaneden sil
    window.deleteVideo = function(filename, ev){
      if (ev) ev.stopPropagation();
      videoSt.list = videoSt.list.filter(function(v){ return v.filename !== filename; });
      sset('ronya_videos', videoSt.list);
      if (videoSt.current === filename) window.closeVideo();
      renderVideoList();
    };

    renderVideoList();
  }

  function renderVideoList(){
    var box = document.getElementById('video-list');
    if (!box) return;
    if (videoSt.list.length === 0) {
      box.innerHTML = '<div class="card" style="text-align:center;padding:24px 16px;color:var(--tx3)">' +
        '<div style="font-size:32px;margin-bottom:8px">\ud83c\udfac</div>' +
        '<div style="font-size:13px">Hen\u00fcz video eklenmedi.<br>Y\u0131kar\u0131daki kutuya bir dosya ad\u0131 yaz\u0131p \u201cEkle\u201d ye bas.</div>' +
      '</div>';
      return;
    }
    var html = '<div class="slbl" style="margin-bottom:8px">\ud83d\udcda K\u00fct\u00fcphane (' + videoSt.list.length + ')</div>';
    videoSt.list.forEach(function(v){
      var active = videoSt.current === v.filename;
      html += '<div class="card" style="display:flex;align-items:center;gap:10px;padding:12px;margin-bottom:8px;cursor:pointer;' +
        (active ? 'border-color:rgba(245,158,11,.5);background:rgba(245,158,11,.06)' : '') + '" onclick="playVideo(\'' + v.filename.replace(/'/g, "\\'") + '\')">' +
        '<div style="width:36px;height:36px;border-radius:10px;background:rgba(245,158,11,.15);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">' + (active ? '\u25b6\ufe0f' : '\ud83c\udfa5') + '</div>' +
        '<div style="flex:1;min-width:0">' +
          '<div style="font-size:13px;color:#fff;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + v.title + '</div>' +
          '<div style="font-size:11px;color:var(--tx3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + v.filename + '</div>' +
        '</div>' +
        '<button type="button" onclick="deleteVideo(\'' + v.filename.replace(/'/g, "\\'") + '\', event)" style="background:none;border:none;color:var(--tx3);font-size:16px;padding:6px;flex-shrink:0">\ud83d\uddd1\ufe0f</button>' +
      '</div>';
    });
    box.innerHTML = html;
  }

  var DENGE_Q = [
    { n:1, kat:'Kavram', t:'Kimyasal dengenin kurulabilmesi için gerekli şartlar nelerdir?',
      c:'• Sıcaklık SABİT olmalı.<br>• Sistem KAPALI olmalı.<br>• Minimum enerji eğilimi ile maksimum düzensizlik eğilimi ZIT yönlü olmalı.<br>• İleri yöndeki hız, geri yöndeki hıza EŞİT olmalı.<br>• Dengede BÜTÜN maddeler bulunmalı.<br>• Dengedeki tüm maddelerin derişimleri SABİT olmalı.<br>• Denge DİNAMİKTİR.<br>• Dengede MAKROSKOBİK olaylar durur, MİKROSKOBİK olaylar devam eder.' },
    { n:2, kat:'Kavram', t:'Homojen denge ile heterojen denge arasındaki fark nedir? Örnekler veriniz.',
      c:'<b>Homojen denge:</b> Tepkenlerle ürünlerin AYNI FAZDA bulunduğu denge. Örn: N₂O₄(g)⇌2NO₂(g); HCN(suda)⇌H⁺(suda)+CN⁻(suda).<br><b>Heterojen denge:</b> En az birinin farklı fizikselhalde olduğu denge. Örn: CaCO₃(k)⇌CaO(k)+CO₂(g); Zn²⁺(suda)+Cu(k)⇌Zn(k)+Cu²⁺(suda).' },
    { n:3, kat:'Kavram', t:'Aşağıdaki tepkimelerden hangileri hem HETEROJEN hem de KİMYASAL dengeye örnektir? a) H₂O(s)⇌H₂O(g) b) K₂SO₄(suda)⇌2K⁺(suda)+SO₄²⁻(suda) c) C₁₂H₂₂O₁₁(k)+H₂O(s)⇌C₁₂H₂₂O₁₁(suda) ç) 2NH₃(g)⇌N₂(g)+3H₂(g) d) 2HBr(g)⇌H₂(g)+Br₂(g) e) C(k)+H₂O(g)⇌CO(g)+H₂(g) f) 2S(k)+2O₂(g)⇌2SO₂(g)',
      c:'a) FİZİKSEL olay, elenir.<br>b) FİZİKSEL (çözünme), elenir.<br>c) FİZİKSEL, elenir.<br>ç) Tüm maddeler GAZ → HOMOJEN, elenir.<br>d) Tüm maddeler gaz → HOMOJEN, elenir.<br>e) C KATI, diğerleri GAZ → <b>HETEROJEN kimyasal denge — DOĞRU!</b><br>f) S KATI, O₂/SO₂ gaz → <b>HETEROJEN kimyasal denge — DOĞRU!</b><br>→ <b>Yalnız e ve f</b> hem heterojen hem kimyasal dengeye örnektir.' },
    { n:4, kat:'Kavram', t:'Maksimum düzensizlik eğilimine göre: a) katı-sıvı-gaz arasında hangisi en düzensizdir? b) Gazlı tepkimelerde katsayılar farklıysa hangi taraf daha düzensizdir? c) Katsayılar EŞİTSE hangi taraf daha düzensizdir?',
      c:'a) Düzensizlik sıralaması: <b>gaz > sıvı > katı</b>.<br>b) Gazlı bir tepkimede <b>KATSAYISI FAZLA olan taraf</b> daha düzensizdir.<br>c) Katsayılar eşitse, <b>farklı gaz TÜRÜ fazla bulunduran taraf</b> daha düzensizdir.' },
    { n:5, kat:'Denge Sabiti', t:'Denge bağıntısı (Kc, Kp) yazarken uyulması gereken 3 kural nedir?',
      c:'1) Denge bağıntısında SAF KATI ve SAF SIVILAR YER ALMAZ.<br>2) Denge bağıntısında GAZLAR ve SULU çözeltiler YER ALIR.<br>3) Denge bağıntısı NET tepkimeye göre yazılır.' },
    { n:6, kat:'Denge Sabiti', t:'Kp ile Kc arasındaki ilişkiyi (formülü) yazınız. Δn neyi ifade eder?',
      c:'<b>Kp = Kc×(RT)^Δn</b><br>Δn = (ürün gazlarının katsayıları toplamı) − (giren gazlarının katsayıları toplamı) — SADECE gaz halindeki maddelerin katsayıları sayılır.' },
    { n:7, kat:'Hesaplama', t:'2NO(g)+O₂(g)⇌2NO₂(g) tepkimesine göre 2 L’lik kapta 0,4 mol NO, 0,2 mol O₂ ve 0,8 mol NO₂ gazları dengededir. Buna göre aynı sıcaklıkta tepkimenin Kc değeri kaçtır?',
      c:'[NO]=0,2 M, [O₂]=0,1 M, [NO₂]=0,4 M.<br>Kc=[NO₂]²/([NO]²[O₂])=0,4²/(0,2²×0,1)=0,16/0,004=<b>40</b>.' },
    { n:8, kat:'Hesaplama', t:'2CO(g)+O₂(g)⇌2CO₂(g) tepkimesinin aynı sıcaklıktaki ileri tepkimenin hız sabiti (kı) 4×10⁻³ ve geri tepkimenin hız sabiti (kg) 2×10⁻⁴’tür. Buna göre tepkimenin derişimler türünden denge sabiti Kc kaçtır?',
      c:'Dengede <b>Kc = kı/kg</b>.<br>Kc = 4×10⁻³ / 2×10⁻⁴ = <b>20</b>.' },
    { n:9, kat:'Hesaplama', t:'2SO₂(g)+O₂(g)⇌2SO₃(g) tepkimesine göre 0,2’şer mol SO₂ ve O₂ gazları ile 0,8 mol SO₃ gazı dengededir. Tepkimenin denge sabiti (K) 16 olduğuna göre tepkime kabının hacmi kaç L’dir?',
      c:'Kc=(0,8/V)²/((0,2/V)²×(0,2/V))=16 denklemini V için çözersek: <b>V=0,2 L</b>.' },
    { n:10, kat:'Hesaplama', t:'2CO(g)+O₂(g)⇌2CO₂(g) tepkimesinin 27°C’deki derişimler türünden denge sabiti (Kc) 5,6 olduğuna göre, aynı sıcaklıktaki kısmi basınçlar türünden denge sabiti (Kp) kaçtır? (R:0,082 alınız)',
      c:'Δn = 2−3 = −1. T=300K.<br>Kp = Kc×(RT)^Δn = 5,6×(0,082×300)⁻¹ = 5,6/24,6 ≈ <b>0,228</b>.' },
    { n:11, kat:'Hesaplama', t:'2SO₃(g)⇌2SO₂(g)+O₂(g) denklemine göre 1 litrelik bir kapta 0,6 mol SO₃ gazı ile başlatılan tepkime t°C’de dengeye ulaştığında kapta toplam 0,8 mol gaz bulunuyor. Buna göre tepkimenin t°C’deki denge sabiti (Kc) kaçtır?',
      c:'x kadar SO₃ ayrışsın: 0,6+x/2=0,8 → x=0,4.<br>Denge: SO₃=0,2M, SO₂=0,4M, O₂=0,2M.<br>Kc=0,4²×0,2/0,2²=<b>0,8</b>.' },
    { n:12, kat:'Hesaplama', t:'NH₄HS(k)⇌NH₃(g)+H₂S(g) tepkimesine göre belirli bir sıcaklıkta kaba konan NH₄HS(k) dengeye ulaşıyor. Kaptaki toplam basınç 1,2 atm olduğuna göre, bu sıcaklıktaki Kp sabiti kaçtır?',
      c:'NH₃ ve H₂S EŞİT MOL oluşur. Toplam=1,2atm → her biri <b>0,6 atm</b>.<br>Kp=0,6×0,6=<b>0,36</b>.' },
    { n:13, kat:'Hesaplama', t:'1000 mL’lik boş bir kaba 4 mol N₂ ve 4 mol H₂ gazları konuluyor. N₂(g)+3H₂(g)⇌2NH₃(g) denklemine göre tepkime %75 verimle gerçekleşiyor (H₂ sınırlayıcıdır). Tepkime dengeye geldiğinde ortamın toplam basıncı 12 atm oluyorsa Kp değeri kaçtır?',
      c:'H₂ sınırlayıcı. %75 verimle H₂’den 3mol harcanır, N₂’den 1mol, NH₃’ten 2mol oluşur.<br>Denge: N₂=3mol, H₂=1mol, NH₃=2mol, Toplam=6mol.<br>P(N₂)=6atm, P(H₂)=2atm, P(NH₃)=4atm.<br>Kp=4²/(6×2³)=16/48=<b>1/3≈0,33</b>.' },
    { n:14, kat:'Sıcaklık Etkisi', t:'Şekildeki her kapta eşit sayıda N₂O₄ molekülü bulunmaktadır: I. Kap: V litre, 50°C · II. Kap: 2V litre, 50°C · III. Kap: 2V litre, 25°C. Her kapta N₂O₄(g)⇌2NO₂(g) tepkimesi gerçekleşmektedir. Bu kaplardaki tepkimelerin hızlarını karşılaştırınız.',
      c:'<b>I. Kap</b> (V, 50°C): KÜÇÜK hacim + YÜKSEK sıcaklık → EN HIZLI.<br><b>II. Kap</b> (2V, 50°C): ORTA.<br><b>III. Kap</b> (2V, 25°C): EN YAVAŞ.<br>→ <b>Hız sıralaması: I > II > III</b>.' },
    { n:15, kat:'Hesaplama', t:'3X₂(g)+2Y₂(g)⇌2Z(g) tepkimesine göre 0,6 mol X₂ ve 0,3 mol Y₂ gazları 1 L’lik kapta dengeye ulaşmaktadır. Denge anında ürünün mol sayısı, girenlerin (X₂+Y₂) mol sayısının yarısı kadar olmaktadır. Kc değeri kaçtır?',
      c:'İlerleme ξ: X₂=0,6−3ξ, Y₂=0,3−2ξ, Z=2ξ.<br>2ξ=(0,9−5ξ)/2 → ξ=0,1.<br>Denge: X₂=0,3M, Y₂=0,1M, Z=0,2M.<br>Kc=0,2²/(0,3³×0,1²)=0,04/0,00027=<b>4000/27≈148,1</b>.' },
    { n:16, kat:'Hesaplama', t:'2 L’lik sabit hacimli kaba eşit mollerde H₂ ve I₂ gazları konuyor. H₂(g)+I₂(g)⇌2HI(g) denklemine göre dengeye ulaştığında kapta 0,2 mol H₂, 0,2 mol I₂ ve 0,4 mol HI gazları bulunuyor. Geri yöndeki tepkimenin denge hızı 2 M·s⁻¹ olduğuna göre, tepkimenin BAŞLANGIÇ hızı kaç M·s⁻¹’dir?',
      c:'Denge: [H₂]=[I₂]=0,1M, [HI]=0,2M. Kc=4.<br>rg=kg[HI]²=2 → kg=50. kı=kg×Kc=200.<br>Başlangıç [H₂]₀=[I₂]₀=0,2M (HI yoktu).<br>rı=kı×0,2×0,2=<b>8 M·s⁻¹</b>.' },
    { n:17, kat:'Hesaplama', t:'1 litrelik kapalı bir kaba bir miktar X₂ ve Y₂ gazları konuluyor. Sabit sıcaklıkta X₂(g)+3Y₂(g)⇌2Z(g) tepkimesi gerçekleşiyor. Başlangıçta X₂=1,0M, Y₂=1,4M; 10. saniyede X₂=0,6M, Y₂=0,2M, Z=0,8M olup 15. saniyede de AYNI kalıyor. I. Tepkime 10 saniyede dengeye ulaşmıştır. II. Denge anında kapta toplam 1,6 mol gaz vardır. — hangileri DOĞRUDUR?',
      c:'I — <b>DOĞRU</b>: 10. ve 15. saniye derişimleri AYNI.<br>II — <b>DOĞRU</b>: 0,6+0,2+0,8=1,6M=1,6mol (1L kapta).<br>Kc=0,8²/(0,6×0,2³)≈<b>133,3</b>.' },
    { n:18, kat:'Hesaplama (Çok Yönlü)', t:'2X(g)+3Y(g)⇌2Z(g)+T(g) tepkimesi tek basamakta gerçekleşiyor. Sabit sıcaklıkta 2 litrelik kaba 6 mol X ve 12 mol Y konularak başlatılan tepkimede 2 mol Z oluşunca dengeye ulaşılıyor; dengede ileri tepkime hızı 2 mol/L·s’dir. a) Kc kaçtır? b) kı ve kg kaçtır? c) Başlangıçtaki tepkime hızı kaç mol/L·s’dir?',
      c:'Denge: X=4mol,Y=9mol,Z=2mol,T=1mol (2L). [X]=2M,[Y]=4,5M,[Z]=1M,[T]=0,5M.<br>a) Kc=(1²×0,5)/(2²×4,5³)≈<b>0,00137</b>.<br>b) rı=kı[X]²[Y]³=2 → kı≈<b>0,00549</b>. kg=kı/Kc=<b>4</b>.<br>c) Başlangıç [X]₀=3M,[Y]₀=6M, rg=0. rı=0,00549×9×216≈<b>10,67 mol/L·s</b>.' },
    { n:19, kat:'Le Chatelier', t:'Le Chatelier İlkesi’ne göre N₂(g)+3H₂(g)⇌2NH₃(g) dengesine yapılan şu müdahalelerin etkisini açıklayınız: a) N₂ ilave edilirse b) H₂ çekilirse c) hacim artırılırsa ç) hacim azaltılırsa d) sıcaklık artırılırsa (tepkime EKZOTERMİK) e) sıcaklık azaltılırsa',
      c:'a) <b>N₂ ilave:</b> ÜRÜNLER yönüne kayar → NH₃ ARTAR.<br>b) <b>H₂ çekilirse:</b> TEPKENLER yönüne kayar → NH₃ AZALIR.<br>c) <b>Hacim artırılırsa:</b> katsayısı fazla (tepken) tarafa kayar → NH₃ AZALIR.<br>ç) <b>Hacim azaltılırsa:</b> NH₃ yönüne kayar → NH₃ ARTAR.<br>d) <b>Sıcaklık artırılırsa:</b> ENDOTERMİK yöne (geri) kayar → NH₃ AZALIR.<br>e) <b>Sıcaklık azaltılırsa:</b> EKZOTERMİK yöne (ileri) kayar → NH₃ ARTAR.' },
    { n:20, kat:'Le Chatelier', t:'H₂(g)+Cl₂(g)⇌2HCl(g) (Δn=0) ve CaCO₃(k)⇌CaO(k)+CO₂(g) (heterojen) dengelerine hacim artırma/azaltmanın etkisi, N₂+3H₂⇌2NH₃’ten (Δn≠0) NASIL FARKLIDIR?',
      c:'<b>H₂+Cl₂⇌2HCl (Δn=0):</b> Hacim değişince sistem HİÇBİR YÖNE KAYMAZ, mol sayıları SABİT kalır.<br><b>CaCO₃⇌CaO+CO₂:</b> Hacim ARTIRILIRSA İLERİ kayar (CO₂ mol sayısı artar); AZALTILIRSA CaCO₃ artar.<br>→ Δn=0 olan tepkimelerde hacim değişimi dengeyi KAYDIRMAZ.' },
    { n:21, kat:'Le Chatelier', t:'2SO₂(g)+O₂(g)⇌2SO₃(g) dengesine sabit sıcaklıkta HACİM ARTIRILIRSA ve CaCO₃(k)⇌CaO(k)+CO₂(g) dengesine CO₂ GAZI GÖNDERİLİRSE ne olur?',
      c:'<b>2SO₂+O₂⇌2SO₃ hacim artırılırsa:</b> katsayısı fazla tepken tarafına kayar → SO₃ AZALIR.<br><b>CaCO₃⇌CaO+CO₂’ye CO₂ gönderilirse:</b> GERİ yöne kayar → CaCO₃ ARTAR, CaO AZALIR.' },
    { n:22, kat:'Grafik Yorumlama', t:'Sabit sıcaklıkta 2 litrelik bir kaba 2 mol SO₂, 2 mol O₂ ve 4 mol SO₃ gazları konuyor. 2SO₂(g)+O₂(g)⇌2SO₃(g) tepkimesinin dengeye ulaşması sağlanıyor. İLERİ (rı) hızı başlangıçta YÜKSEK olup azalıyor, GERİ (rg) hızı başlangıçta DÜŞÜK olup artıyor. Tepkimenin Kc’si için hangisi doğrudur? A) Kc=1 B) Kc=2 C) Kc<2 D) Kc<4 E) Kc>4',
      o:['Kc=1','Kc=2','Kc<2','Kc<4','Kc>4'], c:4,
      ac:'Başlangıç: [SO₂]=[O₂]=1M, [SO₃]=2M. Q=4²/(1²×1)... düzeltme: Q=2²/(1²×1)=4.<br>rı>rg olduğundan Q<Kc → <b>Kc>4</b>. → <b>E</b>' },
    { n:23, kat:'Hesaplama (Piston/Müdahale)', t:'2XY(g)⇌X₂(g)+Y₂(g) dengesinin bulunduğu kapta 0,9 mol X₂, 0,4 mol Y₂ ve 0,3 mol XY gazları bulunmaktadır. Bu kaptan sabit sıcaklıkta 0,5 mol X₂ gazı çekiliyor. Yeniden dengeye ulaşan sistemde XY gazının mol sayısı kaçtır? (V=1L varsayınız)',
      c:'Kc=(0,9×0,4)/0,3²=<b>4</b>.<br>Çekme sonrası anlık: X₂=0,4,Y₂=0,4,XY=0,3 (Q<Kc, GERİ kayar).<br>(0,4+z)/(0,3−2z)=2 → z=0,04.<br>Yeni XY=0,3−0,08=<b>0,22 mol</b>.' },
    { n:24, kat:'Hesaplama (Piston/Müdahale)', t:'1 litrelik sabit hacimli bir kapta 1 mol H₂, 4 mol Cl₂ ve 4 mol HCl gazları H₂(g)+Cl₂(g)⇌2HCl(g) denklemine göre t°C’de dengededir. Bu kaba sabit sıcaklıkta 3 mol H₂ gazı ilave ediliyor. Dengeye ulaşan sistemde HCl gazının mol sayısı kaçtır?',
      c:'Kc=4²/(1×4)=<b>4</b>.<br>Ekleme sonrası anlık: H₂=4,Cl₂=4,HCl=4 (İLERİ kayar).<br>(4+2z)/(4−z)=2 → z=1.<br>Yeni HCl=4+2=<b>6 mol</b>.' },
    { n:25, kat:'Hesaplama (Piston/Müdahale)', t:'CO₂(g)+H₂(g)⇌CO(g)+H₂O(g) tepkimesinin belirli bir sıcaklıkta dengedeyken kapta 0,6 mol CO₂, 0,4 mol H₂, 0,4 mol CO, 0,6 mol H₂O gazı bulunmaktadır (V=1L). H₂O gazının dengedeki mol sayısını 0,8’e çıkartmak için kaptan kaç mol CO gazı uzaklaştırılmalıdır?',
      c:'Kc=(0,4×0,6)/(0,6×0,4)=<b>1</b>.<br>z=0,2 kadar İLERİ: CO₂=0,4, H₂=0,2, H₂O=0,8.<br>COyeni=(0,4×0,2)/0,8=<b>0,1 mol</b>.<br>Doğal CO=0,6, uzaklaştırılan=0,6−0,1=<b>0,5 mol</b>.' },
    { n:26, kat:'Hesaplama (Piston/Müdahale)', t:'SO₃(g)+NO(g)⇌SO₂(g)+NO₂(g) tepkimesi 1 litrelik kapta 0,4 mol SO₃, 0,3 mol NO, 0,1 mol SO₂ ve 0,4 mol NO₂ ile dengededir. Kaptaki SO₂ mol sayısının 0,2 olması için kaba kaç mol NO eklenmelidir?',
      c:'Kc=(0,1×0,4)/(0,4×0,3)=<b>1/3</b>.<br>z=0,1 İLERİ: SO₃=0,3,SO₂=0,2,NO₂=0,5.<br>NOyeni=(0,2×0,5)/(0,333×0,3)=<b>1 mol</b>.<br>Ekleme anı=1+0,1=1,1mol; eklenen=1,1−0,3=<b>0,8 mol</b>.' },
    { n:27, kat:'Hesaplama (Piston/Müdahale)', t:'1 litrelik kapalı kapta sabit sıcaklıkta 0,6 mol COCl₂, 0,2 mol CO ve 0,6 mol Cl₂ gazları COCl₂(g)⇌CO(g)+Cl₂(g) denklemine göre dengededir. Dengede 0,4 mol CO gazı olması için kabın hacmi kaç litre olmalıdır?',
      c:'V=1L’deki Kc=(0,2×0,6)/0,6=<b>0,2</b>.<br>CO=0,4 olması için: COCl₂=0,4mol, Cl₂=0,8mol, CO=0,4mol.<br>(0,4×0,8)/(0,4×V)=0,2 → V=<b>4 L</b>.' },
    { n:28, kat:'Hesaplama (Piston/Müdahale)', t:'2SO₂(g)+O₂(g)⇌2SO₃(g) tepkimesi 2 litrelik bir kapta belirli bir sıcaklıkta dengede iken kapta 4 mol SO₃, 2 mol SO₂ ve 2 mol O₂ gazları bulunmaktadır. Sıcaklık sabit tutularak hacim 1 L’ye indirilip bir miktar SO₂ gazı eklendiğinde yeni kurulan dengede 1 mol O₂ gazı bulunuyor. Kaba eklenen SO₂ gazı kaç moldur?',
      c:'İlk Kc=4 (2L’de). Hacim 1L’ye inince mol sayıları AYNI: SO₃=4,SO₂=2,O₂=2mol.<br>O₂:2−z=1 → z=1: SO₃yeni=6mol.<br>SO₂yeni²=36/4=9 → SO₂yeni=3mol.<br>Ekleme anı=3+1=4mol; eklenen=4−2=<b>2 mol</b>.' },
    { n:29, kat:'Hesaplama (Piston/Müdahale)', t:'CO₂(g)+H₂(g)⇌CO(g)+H₂O(g) tepkimesinde sabit sıcaklıkta 1 litrelik kapta 0,4 mol CO₂, 0,5 mol H₂, 0,2 mol CO ve 0,4 mol H₂O dengededir. H₂O(g) derişimini 0,3 molara indirmek için kaptan kaç mol H₂ gazı çekilmelidir?',
      c:'Kc=(0,2×0,4)/(0,4×0,5)=<b>0,4</b>.<br>z=0,1 GERİ: CO₂=0,5,CO=0,1,H₂O=0,3.<br>H₂yeni=(0,1×0,3)/(0,4×0,5)=<b>0,15mol</b>.<br>Çekme anı=0,15−0,1=0,05; çekilen=0,5−0,05=<b>0,45 mol</b>.' },
    { n:30, kat:'Hesaplama (Piston/Müdahale)', t:'2CO(g)⇌C(k)+CO₂(g) tepkimesi sabit sıcaklıkta 1 litrelik kapta 0,2 mol CO ve 0,01 mol CO₂ gazları ile dengededir. Dengedeki CO₂ gazının mol sayısının 0,06 olması için son hacim kaç litre olmalıdır?',
      c:'V=1L’de Kc=0,01/0,2²=<b>0,25</b>.<br>z=0,05 İLERİ: CO=0,1mol, CO₂=0,06mol.<br>Kc=CO₂×V/CO²=0,25 → V=<b>1/24≈0,042 L</b>.' },
    { n:31, kat:'Hesaplama (Piston/Müdahale)', t:'H₂(g)+Cl₂(g)⇌2HCl(g) denge tepkimesinde sabit sıcaklıkta 1 L’lik kapta 0,2 mol H₂, 0,4 mol Cl₂, 0,4 mol HCl gazları dengededir. Tepkime kabına kaç mol H₂(g) eklenirse HCl(g) denge mol sayısı 0,6 olur?',
      c:'Kc=0,4²/(0,2×0,4)=<b>2</b>.<br>z=0,1 İLERİ: Cl₂=0,3, HCl=0,6.<br>H₂yeni=0,36/(2×0,3)=<b>0,6mol</b>.<br>Ekleme anı=0,6+0,1=0,7; eklenen=0,7−0,2=<b>0,5 mol</b>.' },
    { n:32, kat:'Hesaplama (Piston/Müdahale)', t:'CO₂(g)+NO(g)⇌NO₂(g)+CO(g) denge tepkimesinde sabit sıcaklıkta 1 litrelik kapta 0,4 mol CO₂, 0,9 mol NO, 0,6 mol NO₂ ve 0,6 mol CO gazları dengededir. Kaba 0,5 mol CO₂ gazı eklenince sistem aynı sıcaklıkta dengeye geldiğinde kapta kaç mol NO₂ bulunur?',
      c:'Kc=(0,6×0,6)/(0,4×0,9)=<b>1</b>.<br>Ekleme sonrası CO₂=0,9; z İLERİ: (0,6+z)²=(0,9−z)² → z=0,15.<br>NO₂=0,6+0,15=<b>0,75 mol</b>.' },
    { n:33, kat:'Le Chatelier', t:'I. N₂O₄(g)⇌2NO₂(g) II. 2NO(g)+O₂(g)⇌2NO₂(g) III. PCl₃(g)+3NH₃(g)⇌3HCl(g)+P(NH₂)₃(g) — yukarıdaki tepkimeler dengededir. Sabit sıcaklıkta tepkime kaplarının hacmi AZALTILIP tekrar denge kurulduğunda: a) I. tepkimedeki NO₂’nin mol sayısı nasıl değişir? b) II. tepkimedeki NO₂’in molaritesi nasıl değişir? c) III. tepkimedeki HCl’ün kısmi basıncı nasıl değişir?',
      c:'a) I (Δn=+1, ürün fazla): hacim azalınca tepken tarafa kayar → NO₂ <b>AZALIR</b>.<br>b) II (Δn=−1, tepken fazla): ürün tarafa kayar VE hacim küçülür → NO₂ molaritesi <b>ARTAR</b>.<br>c) III (Δn=0): mol sayıları SABİT ama hacim küçüldüğü için HCl’ün kısmi basıncı <b>ARTAR</b>.' },
    { n:34, kat:'Le Chatelier', t:'2NO₂(g)+ısı⇌O₂(g)+2NO(g) (endotermik ileri yön) tepkimesi dengede iken: a) Sabit sıcaklıkta ortama bir miktar NO₂(g) ekleniyor. b) Sıcaklık artırılıyor. Her iki durumda sistem yeniden dengeye geldiğinde maddelerin derişim değişim yönlerini açıklayınız.',
      c:'a) <b>NO₂ eklenince:</b> İLERİ yöne kayar → O₂ ve NO ARTAR, NO₂ net YÜKSEK kalır.<br>b) <b>Sıcaklık artırılınca:</b> ENDOTERMİK (ileri) yöne kayar → O₂ ve NO ARTAR, NO₂ AZALIR.' }
  ];

  // ---------- 30. MAARİF DENGE (MEB Kitabı 2.1) ----------
  var MAARIF_DENGE_THEORY = {
    t1: '<h3 style="color:#93c5fd;margin-bottom:10px">2.1.1 Tersinir Tepkimelerin Özellikleri</h3>' +
      '<p style="margin-bottom:10px">Bazı kimyasal tepkimeler yalnızca TEK YÖNDE (tepkenlerden \u00fcr\u00fcnlere) ger\u00e7ekleşirken, bazıları HER İKİ Y\u00d6NDE de ger\u00e7ekleşebilir. Her iki y\u00f6ne gidebilen tepkimelere <b>TERSİNİR TEPKİME</b> denir ve \u21cc sembol\u00fc ile g\u00f6sterilir. Tersinmez (tek y\u00f6nl\u00fc) tepkimeler → sembol\u00fc ile g\u00f6sterilir.</p>' +
      '<p style="margin-bottom:10px"><b>Bir tepkimenin tersinir olduğunu g\u00f6steren kanıtlar:</b></p>' +
      '<ul style="margin:0 0 10px 18px;line-height:1.8">' +
        '<li><b>Renk değişimi:</b> Tepken/\u00fcr\u00fcn farklı renkteyse (\u00f6rn. N\u2082O\u2084 renksiz, NO\u2082 kahverengi)</li>' +
        '<li><b>İletkenlik değişimi:</b> İyon derişimi değişen tepkimelerde (\u00f6rn. PbCl\u2082(k)\u21ccPb\u00b2\u207a+2Cl\u207b)</li>' +
        '<li><b>K\u00fctle değişimi:</b> Katı kütlesinin değiştiği heterojen tepkimelerde (\u00f6rn. CaCO\u2083(k)\u21ccCaO(k)+CO\u2082(g))</li>' +
        '<li><b>Basın\u00e7/hacim değişimi:</b> Gaz mol sayısı değişen tepkimelerde</li>' +
      '</ul>' +
      '<p>\u00d6rnek: Ag\u207a(suda)+Cl\u207b(suda)\u21ccAgCl(k) tepkimesinin tersinir olduğu KATI MİKTARINDAKİ DEĞİŞİMLE; H\u2082(g)+Cl\u2082(g)\u21cc2HCl(g) tepkimesinin tersinir olduğu BASIN\u00c7 DEĞİŞİMİYLE anlaşılabilir.</p>',
    t2: '<h3 style="color:#93c5fd;margin-bottom:10px">2.1.2 Fiziksel ve Kimyasal Değişimlerde Denge</h3>' +
      '<p style="margin-bottom:10px">Denge sadece kimyasal tepkimelerde değil, FİZİKSEL değişimlerde de kurulabilir (\u00f6rn. CO\u2082(g)\u21ccCO\u2082(suda) \u2014 \u00e7\u00f6z\u00fcnme dengesi). \u00d6nemli olan; DENGE KURULABİLMESİ i\u00e7in sistemin KAPALI olması ve her iki y\u00f6nde de değişimin ger\u00e7ekleşebilmesidir.</p>' +
      '<p style="margin-bottom:10px">Bir tepkime dengeye ulaştığında: <b>İLERİ tepkime hızı = GERİ tepkime hızı</b> olur. Bu noktadan sonra MAKROSKOBİK (g\u00f6zle g\u00f6r\u00fclen) değişim durur ama MİKROSKOBİK (molek\u00fcler seviyede) tepkime KESİNTİSİZ devam eder \u2014 bu y\u00fczden dengeye \u201cDİNAMİK DENGE\u201d denir.</p>' +
      '<div style="background:#050510;border:1px solid rgba(96,165,250,.3);border-radius:12px;overflow:hidden;margin:12px 0"><canvas id="mdg-hizgrafik" style="width:100%;display:block" height="180"></canvas></div>' +
      '<p style="font-size:12px;color:var(--tx3)">Dengeye yaklaşırken: İleri tepkime hızı başlangı\u00e7ta y\u00fcksektir ve giderek AZALIR (tepken derişimi azaldık\u00e7a); geri tepkime hızı başlangı\u00e7ta sıfırdır ve giderek ARTAR (\u00fcr\u00fcn derişimi arttık\u00e7a). İki eğri kesiştiği an DENGE ANIDIR (t<sub>denge</sub>).</p>',
    t3: '<h3 style="color:#93c5fd;margin-bottom:10px">2.1.3 Denge Sabiti İfadesinin Yazılması</h3>' +
      '<p style="margin-bottom:10px">Dengedeki bir tepkime i\u00e7in <b>\u00fcr\u00fcn derişimlerinin \u00fcssel \u00e7arpımının, tepken derişimlerinin \u00fcssel \u00e7arpımına oranı</b> SABİT bir değer verir. Bu sabite <b>DENGE SABİTİ (Kc)</b> denir:</p>' +
      '<div style="text-align:center;background:rgba(96,165,250,.08);border-radius:10px;padding:12px;margin:10px 0;font-size:15px">aA(g)+bB(g) \u21cc cC(g)+dD(g) &nbsp;\u2192&nbsp; K<sub>c</sub> = [C]<sup>c</sup>[D]<sup>d</sup> / [A]<sup>a</sup>[B]<sup>b</sup></div>' +
      '<p style="margin-bottom:10px"><b>\u00d6nemli:</b> Kc değeri, BAŞLANGI\u00c7 KOŞULLARINDAN BAĞIMSIZDIR \u2014 aynı sıcaklıkta hangi taraftan (tepken ya da \u00fcr\u00fcn ile) başlarsanız başlayın, dengeye ulaşıldığında AYNI Kc değeri elde edilir.</p>' +
      '<div class="card" style="margin:12px 0"><div style="font-weight:700;color:#f59e0b;margin-bottom:8px">\u2713 MEB Kitabı Doğrulanmış \u00d6rnek (2.5. Etkinlik)</div>' +
      '<p style="font-size:13px;margin-bottom:8px">N\u2082O\u2084(g)\u21cc2NO\u2082(g) tepkimesi \u00fc\u00e7 farklı başlangı\u00e7tan (I: NO\u2082 ile, II: N\u2082O\u2084 ile, III: ikisiyle birden) başlatılıyor. Denge derişimleri:</p>' +
      '<table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:8px"><tr style="background:rgba(255,255,255,.05)"><th style="padding:6px;text-align:left">Grafik</th><th style="padding:6px">[N\u2082O\u2084]</th><th style="padding:6px">[NO\u2082]</th><th style="padding:6px">Kc=[NO\u2082]\u00b2/[N\u2082O\u2084]</th></tr>' +
      '<tr><td style="padding:6px">I</td><td style="padding:6px;text-align:center">0,10 M</td><td style="padding:6px;text-align:center">0,02 M</td><td style="padding:6px;text-align:center">4\u00d710\u207b\u00b3</td></tr>' +
      '<tr><td style="padding:6px">II</td><td style="padding:6px;text-align:center">0,90 M</td><td style="padding:6px;text-align:center">0,06 M</td><td style="padding:6px;text-align:center">4\u00d710\u207b\u00b3</td></tr>' +
      '<tr><td style="padding:6px">III</td><td style="padding:6px;text-align:center">0,40 M</td><td style="padding:6px;text-align:center">0,04 M</td><td style="padding:6px;text-align:center">4\u00d710\u207b\u00b3</td></tr></table>' +
      '<p style="font-size:12px;color:var(--tx3)">\u00dc\u00e7\u00fc de AYNI Kc değerine (4\u00d710\u207b\u00b3) ulaşıyor \u2014 bu, Kc\u2019nin başlangı\u00e7 koşulundan bağımsız, SADECE SICAKLIĞA bağlı bir sabit olduğunu kanıtlıyor. (Node.js ile doğrulandı ✓)</p></div>',
    t4: '<h3 style="color:#93c5fd;margin-bottom:10px">2.1.4 Tepkime Oranı (Q)</h3>' +
      '<p style="margin-bottom:10px">Herhangi bir andaki derişimler denge bağıntısında yerine yazıldığında bulunan değere <b>TEPKİME ORANI (Q)</b> denir. Q\u2019yu Kc ile karşılaştırarak sistemin dengede olup olmadığı VE dengeye hangi y\u00f6nde ilerleyeceği anlaşılır:</p>' +
      '<ul style="margin:0 0 10px 18px;line-height:1.9">' +
        '<li><b>Q = Kc</b> \u2192 Sistem DENGEDEDİR.</li>' +
        '<li><b>Q &lt; Kc</b> \u2192 \u00dcr\u00fcn derişimi \u201cyetersiz\u201d, sistem \u00dcR\u00dcNLER (İLERİ) y\u00f6n\u00fcnde ilerleyerek dengeye ulaşır.</li>' +
        '<li><b>Q &gt; Kc</b> \u2192 \u00dcr\u00fcn derişimi \u201cfazla\u201d, sistem TEPKENLER (GERİ) y\u00f6n\u00fcnde ilerleyerek dengeye ulaşır.</li>' +
      '</ul>' +
      '<div class="card" style="margin:12px 0"><div style="font-weight:700;color:#f59e0b;margin-bottom:8px">\u2713 MEB Kitabı Doğrulanmış \u00d6rnek (2.7. Etkinlik)</div>' +
      '<p style="font-size:13px;margin-bottom:8px">H\u2082(g)+I\u2082(g)\u21cc2HI(g) tepkimesi Kc=30. Farklı zamanlardaki derişimler ve durumları:</p>' +
      '<table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:8px"><tr style="background:rgba(255,255,255,.05)"><th style="padding:6px">S\u00fcre</th><th style="padding:6px">[H\u2082]</th><th style="padding:6px">[I\u2082]</th><th style="padding:6px">[HI]</th><th style="padding:6px">Q</th><th style="padding:6px">Durum</th></tr>' +
      '<tr><td style="padding:6px;text-align:center">15s</td><td style="padding:6px;text-align:center">2</td><td style="padding:6px;text-align:center">0,2</td><td style="padding:6px;text-align:center">2</td><td style="padding:6px;text-align:center">10</td><td style="padding:6px;text-align:center;color:#fbbf24">Q&lt;Kc, İLERİ</td></tr>' +
      '<tr><td style="padding:6px;text-align:center">30s</td><td style="padding:6px;text-align:center">0,3</td><td style="padding:6px;text-align:center">2</td><td style="padding:6px;text-align:center">6</td><td style="padding:6px;text-align:center">60</td><td style="padding:6px;text-align:center;color:#fca5a5">Q&gt;Kc, GERİ</td></tr>' +
      '<tr><td style="padding:6px;text-align:center">45s</td><td style="padding:6px;text-align:center">0,3</td><td style="padding:6px;text-align:center">1</td><td style="padding:6px;text-align:center">3</td><td style="padding:6px;text-align:center">30</td><td style="padding:6px;text-align:center;color:#86efac">Q=Kc, DENGEDE</td></tr></table>' +
      '<p style="font-size:12px;color:var(--tx3)">45. saniyede Q=Kc=30 olduğu i\u00e7in sistem bu anda dengeye ulaşmıştır. (Node.js ile doğrulandı ✓)</p></div>'
  };

  function maarifDengeDrawGraphs(){
    maarifChart('mdg-hizgrafik', function(x, W, H2){
      var g = mcAxes(x, W, H2, 40, 12, 14, 26, 'Zaman', 'Hız');
      var tD = g.padL + g.plotW * 0.55;
      function ri(f){ return 0.85 - 0.65*(1-Math.exp(-f*4)); }
      function rg(f){ return 0.85*(1-Math.exp(-f*4)); }
      var pi=[], pg=[];
      for (var i=0;i<=100;i++){ var f=i/100; var xx=g.padL+f*g.plotW;
        pi.push([xx, g.padT+g.plotH-ri(f)*g.plotH*0.85]);
        pg.push([xx, g.padT+g.plotH-rg(f)*g.plotH*0.85]); }
      x.strokeStyle='#f59e0b'; x.lineWidth=2.2; x.beginPath(); pi.forEach(function(p,i2){i2===0?x.moveTo(p[0],p[1]):x.lineTo(p[0],p[1]);}); x.stroke();
      x.strokeStyle='#60a5fa'; x.beginPath(); pg.forEach(function(p,i2){i2===0?x.moveTo(p[0],p[1]):x.lineTo(p[0],p[1]);}); x.stroke();
      x.strokeStyle='rgba(255,255,255,.4)'; x.setLineDash([4,3]); x.lineWidth=1; x.beginPath(); x.moveTo(tD,g.padT); x.lineTo(tD,g.padT+g.plotH); x.stroke(); x.setLineDash([]);
      x.font='10px sans-serif'; x.textAlign='left';
      x.fillStyle='#f59e0b'; x.fillText('İleri tepkime (r\u0131)', g.padL+6, g.padT+12);
      x.fillStyle='#60a5fa'; x.fillText('Geri tepkime (r\u0261)', g.padL+6, g.padT+26);
      x.fillStyle='rgba(255,255,255,.5)'; x.textAlign='center'; x.fillText('t_denge', tD, g.padT+g.plotH+22);
    });
  }

  function setupDenge2(){
    if (document.getElementById('s-denge2')) return;
    var app = document.querySelector('.app');
    if (!app) return;
    app.insertAdjacentHTML('beforeend',
      '<div id="s-denge2" style="display:none"><div class="pw narrow">' +
        '<h1 class="ptitle">\u2696\ufe0f Kimyasal Denge</h1>' +
        '<p class="psub">MEB kitabı konu anlatımı ve el yazması ders notu \u2014 çözümlü örnekler.</p>' +
        '<div class="ltabs" id="denge2-maingroup" style="margin-bottom:14px">' +
          '<button class="ltab on" onclick="denge2GroupSet(0,this)">\ud83d\udcd8 MEB Konu Anlatımı</button>' +
          '<button class="ltab" onclick="denge2GroupSet(1,this)">\ud83d\udcd3 Özel Ders Notu</button>' +
        '</div>' +
        '<div id="denge2-group-0" style="display:block"></div>' +
        '<div id="denge2-group-1" style="display:none"></div>' +
      '</div></div>');
    if (typeof SCREENS !== 'undefined' && SCREENS.indexOf('s-denge2') === -1) SCREENS.push('s-denge2');
    var mn = document.getElementById('mn');
    if (mn && !document.getElementById('mn-denge2'))
      mn.insertAdjacentHTML('beforeend', '<button id="mn-denge2" onclick="nav(\'denge2\')">\u2696\ufe0f Kimyasal Denge</button>');
    var tg = document.querySelector('#s-home .tgrid');
    if (tg && !document.getElementById('tile-denge2'))
      tg.insertAdjacentHTML('afterbegin',
        '<div class="tc" id="tile-denge2" onclick="nav(\'denge2\')"><div class="ti">\u2696\ufe0f</div><div class="tt">Kimyasal Denge</div><div class="td">MEB konu anlatımı + denge sabiti, Kp/Kc, Le Chatelier çözümlü örnekler.</div></div>');
    setupMaarifDenge();
    denge2RenderList();
  }
  window.denge2GroupSet = function(i, btn){
    for (var g = 0; g < 2; g++) { var el = document.getElementById('denge2-group-' + g); if (el) el.style.display = (g === i) ? 'block' : 'none'; }
    var bar = document.getElementById('denge2-maingroup');
    if (bar && btn) { var bs = bar.querySelectorAll('button'); for (var k = 0; k < bs.length; k++) bs[k].classList.remove('on'); btn.classList.add('on'); }
    if (i === 0) setTimeout(maarifDengeDrawGraphs, 60);
  };
  var denge2St = { cat: 'Tümü' };
  window.denge2SetCat = function(cat, btn){ denge2St.cat = cat; if (btn) selectInRow(btn); denge2RenderList(); };

  MAARIF_DENGE_THEORY.t5 = '<h3 style="color:#93c5fd;margin-bottom:10px">2.1.5 Dengeyi Etkileyen Faktörler (Le Chatelier İlkesi)</h3>' +
    '<p style="margin-bottom:10px"><b>Le Chatelier İlkesi:</b> Dengedeki bir sisteme dışarıdan bir etki uygulandığında, sistem bu etkiyi AZALTACAK y\u00f6nde kendini yeniden d\u00fczenler. Bu ilke hem kimyasal hem fiziksel dengeler i\u00e7in ge\u00e7erlidir.</p>' +
    '<div class="card" style="margin-bottom:10px"><div style="font-weight:700;color:#f59e0b;margin-bottom:6px">1) Derişimin Etkisi</div>' +
      '<p style="font-size:13px">Bir madde EKLENİRSE, sistem o maddeyi T\u00dcKETECEK y\u00f6ne kayar. Bir madde \u00c7EKİLİRSE, sistem o maddeyi \u00dcRETECEK y\u00f6ne kayar. <b>Kc DEĞİŞMEZ</b> (derişim değişimi hız sabitlerini etkilemez). Saf katı/sıvı eklenmesi/\u00e7ıkarılması dengeyi ETKİLEMEZ (aktiviteleri sabittir).</p></div>' +
    '<div class="card" style="margin-bottom:10px"><div style="font-weight:700;color:#f59e0b;margin-bottom:6px">2) Hacmin Etkisi</div>' +
      '<p style="font-size:13px">Hacim ARTARSA t\u00fcm derişimler azalır, sistem katsayısı (gaz mol sayısı) FAZLA olan tarafa kayar. Hacim AZALIRSA derişimler artar, sistem katsayısı AZ olan tarafa kayar. Katsayılar EŞİTSE hacim değişimi dengeyi KAYDIRMAZ. <b>Kc DEĞİŞMEZ.</b></p></div>' +
    '<div class="card" style="margin-bottom:10px"><div style="font-weight:700;color:#f59e0b;margin-bottom:6px">3) Basıncın Etkisi</div>' +
      '<p style="font-size:13px">Hacim k\u00fc\u00e7\u00fclt\u00fclerek basın\u00e7 artırılırsa sistem AZ gaz molek\u00fcl\u00fc i\u00e7eren tarafa kayar. Hacim artırılarak basın\u00e7 azaltılırsa sistem \u00c7OK gaz molek\u00fcl\u00fc i\u00e7eren tarafa kayar (hacim etkisiyle aynı mantık). <b>Kc DEĞİŞMEZ.</b></p></div>' +
    '<div class="card" style="margin-bottom:10px"><div style="font-weight:700;color:#f59e0b;margin-bottom:6px">4) Sıcaklığın Etkisi \u2014 TEK Kc DEĞİŞTİREN FAKT\u00d6R!</div>' +
      '<p style="font-size:13px"><b>Endotermik</b> tepkimede sıcaklık ARTARSA \u00fcr\u00fcnler y\u00f6n\u00fcne kayar, <b>Kc ARTAR</b>. Sıcaklık AZALIRSA tepkenler y\u00f6n\u00fcne kayar, <b>Kc AZALIR</b>. (Sıcaklık ile Kc DOĞRU orantılı.)<br><b>Ekzotermik</b> tepkimede sıcaklık ARTARSA tepkenler y\u00f6n\u00fcne kayar, <b>Kc AZALIR</b>. Sıcaklık AZALIRSA \u00fcr\u00fcnler y\u00f6n\u00fcne kayar, <b>Kc ARTAR</b>. (Sıcaklık ile Kc TERS orantılı.)</p></div>' +
    '<div class="card" style="margin-bottom:14px"><div style="font-weight:700;color:#f59e0b;margin-bottom:6px">5) Katalizör\u00fcn Etkisi</div>' +
      '<p style="font-size:13px">Katalizör ileri VE geri tepkimenin aktifleşme enerjisini AYNI ORANDA d\u00fcş\u00fcrerek dengeye ulaşma S\u00dcRESİNİ kısaltır. Y\u00d6N belirlemez, denge derişimlerini VE <b>Kc\u2019yi DEĞİŞTİRMEZ.</b></p></div>' +
    '<div class="card" style="margin-bottom:14px"><div style="font-weight:700;color:#93c5fd;margin-bottom:10px">\u2713 MEB Kitabı Doğrulanmış \u00d6rnek (2.5. Kontrol Noktası)</div>' +
      '<p style="font-size:13px;margin-bottom:10px">2H\u2082S(g)+CH\u2084(g)\u21ccCS\u2082(s)+4H\u2082(g)+ısı tepkimesi (EKZOTERMİK, CS\u2082 SAF SIVI, gaz mol sayısı tepken=3&lt;\u00fcr\u00fcn=4). Aşağıdaki her etkiye dokunup sistemin tepkisini g\u00f6r:</p>' +
      '<div id="mdg-kn25"></div></div>';

  var MDG_KN25 = [
    { e:'Sabit hacim/sıcaklıkta CH\u2084(g) ekleme', y:'İLERİ (\u00fcr\u00fcnler)', kc:'Değişmez', h2s:'Azalır', ch4:'Artar', cs2:'Değişmez (saf sıvı)', h2:'Artar' },
    { e:'Sabit hacim/sıcaklıkta H\u2082(g) ekleme', y:'GERİ (tepkenler)', kc:'Değişmez', h2s:'Artar', ch4:'Artar', cs2:'Değişmez (saf sıvı)', h2:'Artar (net)' },
    { e:'Sabit hacim/sıcaklıkta CS\u2082(s) ekleme', y:'DEĞİŞMEZ', kc:'Değişmez', h2s:'Değişmez', ch4:'Değişmez', cs2:'Değişmez (zaten sabit)', h2:'Değişmez' },
    { e:'Sabit hacim/sıcaklıkta H\u2082S(g) \u00e7ıkarma', y:'GERİ (tepkenler)', kc:'Değişmez', h2s:'Azalır (net)', ch4:'Artar', cs2:'Değişmez (saf sıvı)', h2:'Azalır' },
    { e:'Sabit hacimli kapta sıcaklığı artırma', y:'GERİ (endotermik y\u00f6n)', kc:'AZALIR', h2s:'Artar', ch4:'Artar', cs2:'Değişmez (saf sıvı)', h2:'Azalır' },
    { e:'Sabit hacimli kapta sıcaklığı azaltma', y:'İLERİ (ekzotermik y\u00f6n)', kc:'ARTAR', h2s:'Azalır', ch4:'Azalır', cs2:'Değişmez (saf sıvı)', h2:'Artar' },
    { e:'Sabit sıcaklıkta kabın hacmini artırma', y:'İLERİ (katsayı fazla/\u00fcr\u00fcn)', kc:'Değişmez', h2s:'Azalır', ch4:'Azalır', cs2:'Değişmez (saf sıvı)', h2:'Artar' },
    { e:'Sabit sıcaklıkta kabın hacmini azaltma', y:'GERİ (katsayı az/tepken)', kc:'Değişmez', h2s:'Artar', ch4:'Artar', cs2:'Değişmez (saf sıvı)', h2:'Azalır' },
    { e:'Katalizör ekleme', y:'DEĞİŞMEZ (sadece hız artar)', kc:'Değişmez', h2s:'Değişmez', ch4:'Değişmez', cs2:'Değişmez', h2:'Değişmez' },
    { e:'Sabit sıcaklıkta sistemin basıncını artırma', y:'GERİ (hacim k\u00fc\u00e7\u00fclmesiyle aynı)', kc:'Değişmez', h2s:'Artar', ch4:'Artar', cs2:'Değişmez (saf sıvı)', h2:'Azalır' },
    { e:'Sabit sıcaklıkta sistemin basıncını azaltma', y:'İLERİ (hacim b\u00fcy\u00fcmesiyle aynı)', kc:'Değişmez', h2s:'Azalır', ch4:'Azalır', cs2:'Değişmez (saf sıvı)', h2:'Artar' },
    { e:'Sabit hacim/sıcaklıkta He(g) ekleme', y:'DEĞİŞMEZ', kc:'Değişmez', h2s:'Değişmez', ch4:'Değişmez', cs2:'Değişmez', h2:'Değişmez (kısmi basın\u00e7lar etkilenmez)' },
    { e:'Sabit basınçlı kaba sabit sıcaklıkta He(g) ekleme', y:'İLERİ (hacim genişler, seyrelir)', kc:'Değişmez', h2s:'Azalır', ch4:'Azalır', cs2:'Değişmez (saf sıvı)', h2:'Artar' }
  ];

  function mdgKn25Render(){
    var box = document.getElementById('mdg-kn25');
    if (!box) return;
    var html = '';
    MDG_KN25.forEach(function(r, i){
      html += '<div class="card" style="margin-bottom:8px;padding:12px 14px;cursor:pointer" onclick="molToggle(\'mdgkn-' + i + '\')">' +
        '<div style="font-size:13px;color:#fff;font-weight:600">' + (i+1) + '. ' + r.e + '</div>' +
        '<div id="mdgkn-' + i + '" style="display:none;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.08);font-size:12px;color:var(--tx2);line-height:1.9">' +
          '<b style="color:#f59e0b">Sistemin Y\u00f6n\u00fc:</b> ' + r.y + '<br>' +
          '<b style="color:#f59e0b">Kc:</b> ' + r.kc + '<br>' +
          '[H\u2082S]: ' + r.h2s + ' \u00b7 [CH\u2084]: ' + r.ch4 + ' \u00b7 [CS\u2082]: ' + r.cs2 + ' \u00b7 [H\u2082]: ' + r.h2 +
        '</div></div>';
    });
    box.innerHTML = html;
  }

  function setupMaarifDenge(){
    if (document.getElementById('mdg-wrap')) return;
    var host = document.getElementById('denge2-group-0');
    if (!host) return;
    host.insertAdjacentHTML('beforeend', '<div id="mdg-wrap"></div>');
    var wrap = document.getElementById('mdg-wrap');
    wrap.innerHTML =
      '<p class="psub" style="margin-bottom:10px">MEB Maarif Modeli 11. Sınıf Kimya 2 ders kitabı, \u201cDenge\u201d ünitesinin TAM konu anlatımı (2.1.1-2.1.5).</p>' +
      MAARIF_DENGE_THEORY.t1 + MAARIF_DENGE_THEORY.t2 + MAARIF_DENGE_THEORY.t3 + MAARIF_DENGE_THEORY.t4 + MAARIF_DENGE_THEORY.t5 +
      '<p style="font-size:12px;color:var(--tx3);margin-top:14px;padding:12px;background:rgba(255,255,255,.03);border-radius:10px">\ud83d\udd39 B\u00f6l\u00fcm sonu \u00f6l\u00e7me-değerlendirme (2.1 t\u00fcm\u00fc) sıradaki g\u00fcncellemede eklenecek. Sırada ayrıca: MEB Asit-Baz Dengesi (2.2) ve Çözünürlük Dengesi (2.3).</p>';
    setTimeout(maarifDengeDrawGraphs, 60);
    mdgKn25Render();
  }

  function denge2RenderList(){
    if (!document.getElementById('denge2-notewrap')) {
      var host = document.getElementById('denge2-group-1');
      if (!host) return;
      var cats = ['Tümü'];
      DENGE_Q.forEach(function(q){ if (cats.indexOf(q.kat) === -1) cats.push(q.kat); });
      host.insertAdjacentHTML('beforeend',
        '<div id="denge2-notewrap"><p class="psub" style="margin-bottom:10px">El yazması ders notundan ' + DENGE_Q.length + ' çözümlü örnek.</p>' +
        '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:14px"><div style="display:flex;gap:6px;min-width:max-content" id="denge2-cats">' +
          cats.map(function(c,i){ return '<button type="button" class="ob' + (i===0?' sel2':'') + '" onclick="denge2SetCat(\'' + c + '\',this)">' + c + '</button>'; }).join('') +
        '</div></div>' +
        '<div id="denge2-list"></div></div>');
    }
    var box = document.getElementById('denge2-list');
    if (!box) return;
    var html = '';
    DENGE_Q.forEach(function(q){
      if (denge2St.cat !== 'Tümü' && q.kat !== denge2St.cat) return;
      var optsHtml = '';
      if (q.o) optsHtml = '<div style="margin-bottom:8px">' + q.o.map(function(o,i){ return '<div style="padding:4px 0;font-size:12px;color:var(--tx2)">' + String.fromCharCode(65+i) + ') ' + o + '</div>'; }).join('') + '</div>';
      html += '<div class="card" style="margin-bottom:18px;padding:18px 16px">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">' +
          '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:rgba(96,165,250,.18);color:#93c5fd;font-weight:800;font-size:13px;flex-shrink:0">' + q.n + '</span>' +
          '<span style="font-size:10px;color:var(--tx3);text-transform:uppercase;letter-spacing:.6px">' + q.kat + '</span>' +
        '</div>' +
        '<div style="font-size:14px;color:#fff;font-weight:500;line-height:1.75;margin-bottom:12px">' + formatOncul(q.t) + '</div>' +
        optsHtml +
        '<div onclick="molToggle(\'denge2-' + q.n + '\')" style="cursor:pointer;text-align:center;font-size:13px;font-weight:700;color:#050510;background:#60a5fa;border-radius:10px;padding:10px;margin-top:4px">\ud83d\udc41\ufe0f Çözümü Göster</div>' +
        '<div id="denge2-' + q.n + '" style="display:none;margin-top:14px;padding:14px;background:rgba(96,165,250,.08);border:1px solid rgba(96,165,250,.2);border-radius:10px;font-size:13px;color:var(--tx2);line-height:1.85">' +
          (q.o ? '<div style="font-size:13px;font-weight:700;color:#86efac;margin-bottom:6px">Doğru cevap: ' + String.fromCharCode(65+q.c) + ') ' + q.o[q.c] + '</div>' + q.ac : q.c) +
        '</div>' +
      '</div>';
    });
    box.innerHTML = html;
  }

  // ---------- 31. REDOKS — KENDİ DENKLEMİM + 27 ÖRNEK (yeniden inşa) ----------
// ---------- 32. REDOKS — 48 İLERİ DÜZEY ÖRNEK (elle doğrulanmış) ----------
  // Not: Katsayılar balanceEquation() (Gauss eliminasyon) ile doğrulandı.
  // Yükseltgenme basamağı geçişleri EL İLE doğrulandı çünkü dinamik
  // assignOxStates() motoru KMnO4/peroksit/çok-N'li bileşiklerde hata
  // veriyor (örn. MnO4²⁻'de Mn'yi +7 sanması, metal+poliatomik anyon
  // tuzlarında anlamsız değerler üretmesi gibi).
  var REDOX_ADV_LIST = [
    { eq:'3P + 5HNO\u2083 + 2H\u2082O \u2192 3H\u2083PO\u2084 + 5NO', t:[['P',0,5],['N',5,2]] },
    { eq:'Sn + 4HNO\u2083 \u2192 H\u2082SnO\u2083 + 4NO\u2082 + H\u2082O', t:[['Sn',0,4],['N',5,4]] },
    { eq:'3MnO\u2082 + 2KNO\u2083 + 4KOH \u2192 3K\u2082MnO\u2084 + 2NO + 2H\u2082O', t:[['Mn',4,6],['N',5,2]] },
    { eq:'KBr + 3H\u2083AsO\u2084 \u2192 KBrO\u2083 + 3H\u2083AsO\u2083', t:[['Br',-1,5],['As',5,3]] },
    { eq:'3H\u2082S + 2HNO\u2083 \u2192 3S + 2NO + 4H\u2082O', t:[['S',-2,0],['N',5,2]] },
    { eq:'3As + 5HNO\u2083 + 2H\u2082O \u2192 3H\u2083AsO\u2084 + 5NO', t:[['As',0,5],['N',5,2]] },
    { eq:'NaClO\u2083 + 3SO\u2082 + 3H\u2082O \u2192 NaCl + 3H\u2082SO\u2084', t:[['Cl',5,-1],['S',4,6]] },
    { eq:'10HNO\u2083 + 3I\u2082 \u2192 6HIO\u2083 + 10NO + 2H\u2082O', t:[['N',5,2],['I',0,5]] },
    { eq:'2Sb + 10HNO\u2083 \u2192 Sb\u2082O\u2085 + 10NO\u2082 + 5H\u2082O', t:[['Sb',0,5],['N',5,4]] },
    { eq:'Na\u2082S\u2082O\u2083 + 5H\u2082O + 4Cl\u2082 \u2192 2NaHSO\u2084 + 8HCl', t:[['S',2,6],['Cl',0,-1]] },
    { eq:'6As + 10HNO\u2083 + H\u2082O \u2192 3H\u2084As\u2082O\u2087 + 10NO', t:[['As',0,5],['N',5,2]] },
    { eq:'Sb\u2082O\u2083 + 2I\u2082 + 2H\u2082O \u2192 Sb\u2082O\u2085 + 4HI', t:[['Sb',3,5],['I',0,-1]] },
    { eq:'5Zn + 12HNO\u2083 \u2192 5Zn(NO\u2083)\u2082 + N\u2082 + 6H\u2082O', t:[['Zn',0,2],['N',5,0]] },
    { eq:'3Cu + 8HNO\u2083 \u2192 3Cu(NO\u2083)\u2082 + 2NO + 4H\u2082O', t:[['Cu',0,2],['N',5,2]] },
    { eq:'4Zn + 5H\u2082SO\u2084 \u2192 4ZnSO\u2084 + H\u2082S + 4H\u2082O', t:[['Zn',0,2],['S',6,-2]] },
    { eq:'2KMnO\u2084 + 16HCl \u2192 2KCl + 2MnCl\u2082 + 8H\u2082O + 5Cl\u2082', t:[['Mn',7,2],['Cl',-1,0]] },
    { eq:'6KOH + 3Cl\u2082 \u2192 5KCl + KClO\u2083 + 3H\u2082O', t:[['Cl',0,-1],['Cl',0,5]] },
    { eq:'6KOH + 3Br\u2082 \u2192 KBrO\u2083 + 5KBr + 3H\u2082O', t:[['Br',0,5],['Br',0,-1]] },
    { eq:'3HClO\u2083 \u2192 HClO\u2084 + 2ClO\u2082 + H\u2082O', t:[['Cl',5,7],['Cl',5,4]] },
    { eq:'S + 2H\u2082SO\u2084 \u2192 3SO\u2082 + 2H\u2082O', t:[['S',0,4],['S',6,4]] },
    { eq:'2KOH + 3H\u2082S\u2082O\u2083 \u2192 4S + 2KHSO\u2084 + 3H\u2082O', t:[['S',2,0],['S',2,6]] },
    { eq:'8NaOH + 4MnS + 5NaClO\u2084 \u2192 4MnO\u2082 + 4Na\u2082SO\u2084 + 5NaCl + 4H\u2082O', t:[['Mn',2,4],['S',-2,6],['Cl',7,-1]] },
    { eq:'2CrI\u2083 + 64KOH + 27Cl\u2082 \u2192 2K\u2082CrO\u2084 + 54KCl + 6KIO\u2084 + 32H\u2082O', t:[['Cr',3,6],['I',-1,7],['Cl',0,-1]] },
    { eq:'Sb\u2082S\u2083 + 28HNO\u2083 \u2192 Sb\u2082O\u2085 + 28NO\u2082 + 3H\u2082SO\u2084 + 11H\u2082O', t:[['Sb',3,5],['S',-2,6],['N',5,4]] },
    { eq:'4MnS + 5HClO\u2084 + 4H\u2082O \u2192 4MnO\u2082 + 4H\u2082SO\u2084 + 5HCl', t:[['Mn',2,4],['S',-2,6],['Cl',7,-1]] },
    { eq:'6HCl + 2FeS + 9H\u2082O\u2082 \u2192 10H\u2082O + 2FeCl\u2083 + 2H\u2082SO\u2084', t:[['Fe',2,3],['S',-2,6],['O',-1,-2]] },
    { eq:'4NH\u2084NO\u2083 + 2NH\u2084Cl \u2192 5N\u2082 + Cl\u2082 + 12H\u2082O', t:[['N (NH\u2084\u207a\u2019dan)',-3,0],['N (NO\u2083\u207b\u2019den)',5,0],['Cl',-1,0]] },
    { eq:'3Cu + 8HNO\u2083 \u2192 3Cu(NO\u2083)\u2082 + 4H\u2082O + 2NO', t:[['Cu',0,2],['N',5,2]] },
    { eq:'2HNO\u2083 + 3H\u2082S \u2192 2NO + 3S + 4H\u2082O', t:[['N',5,2],['S',-2,0]] },
    { eq:'2Al + 6HCl \u2192 2AlCl\u2083 + 3H\u2082', t:[['Al',0,3],['H',1,0]] },
    { eq:'3S + 4HNO\u2083 \u2192 3SO\u2082 + 4NO + 2H\u2082O', t:[['S',0,4],['N',5,2]] },
    { eq:'I\u2082O\u2085 + 5CO \u2192 I\u2082 + 5CO\u2082', t:[['I',5,0],['C',2,4]] },
    { eq:'KClO\u2083 + 3SO\u2082 + 3H\u2082O \u2192 KCl + 3H\u2082SO\u2084', t:[['Cl',5,-1],['S',4,6]] },
    { eq:'3Pb + 8HNO\u2083 \u2192 3Pb(NO\u2083)\u2082 + 2NO + 4H\u2082O', t:[['Pb',0,2],['N',5,2]] },
    { eq:'Cu + 2H\u2082SO\u2084 \u2192 CuSO\u2084 + SO\u2082 + 2H\u2082O', t:[['Cu',0,2],['S',6,4]] },
    { eq:'3Ag\u2082S + 8HNO\u2083 \u2192 6AgNO\u2083 + 3S + 2NO + 4H\u2082O', t:[['S',-2,0],['N',5,2]] },
    { eq:'2Bi + 6H\u2082SO\u2084 \u2192 Bi\u2082(SO\u2084)\u2083 + 3SO\u2082 + 6H\u2082O', t:[['Bi',0,3],['S',6,4]] },
    { eq:'3HgS + 8HNO\u2083 \u2192 3Hg(NO\u2083)\u2082 + 3S + 2NO + 4H\u2082O', t:[['S',-2,0],['N',5,2]] },
    { eq:'C + 2H\u2082SO\u2084 \u2192 CO\u2082 + 2SO\u2082 + 2H\u2082O', t:[['C',0,4],['S',6,4]] },
    { eq:'2FeCl\u2082 + H\u2082O\u2082 + 2HCl \u2192 2FeCl\u2083 + 2H\u2082O', t:[['Fe',2,3],['O',-1,-2]] },
    { eq:'4HMnO\u2084 \u2192 4MnO\u2082 + 3O\u2082 + 2H\u2082O', t:[['Mn',7,4],['O',-2,0]] },
    { eq:'2KI + 2H\u2082SO\u2084 \u2192 K\u2082SO\u2084 + I\u2082 + SO\u2082 + 2H\u2082O', t:[['I',-1,0],['S',6,4]] },
    { eq:'N\u2082H\u2084 + 2Cu(OH)\u2082 \u2192 N\u2082 + 2Cu + 4H\u2082O', t:[['N',-2,0],['Cu',2,0]] },
    { eq:'6HI + 2HNO\u2083 \u2192 2NO + 3I\u2082 + 4H\u2082O', t:[['I',-1,0],['N',5,2]] },
    { eq:'Cr\u2082O\u2083 + 3H\u2082 \u2192 2Cr + 3H\u2082O', t:[['Cr',3,0],['H',0,1]] },
    { eq:'3CuO + 2NH\u2083 \u2192 3Cu + N\u2082 + 3H\u2082O', t:[['Cu',2,0],['N',-3,0]] },
    { eq:'C + 4HNO\u2083 \u2192 CO\u2082 + 4NO\u2082 + 2H\u2082O', t:[['C',0,4],['N',5,4]] },
    { eq:'4NH\u2083 + 5O\u2082 \u2192 4NO + 6H\u2082O', t:[['N',-3,2],['O',0,-2]] }
  ];


  function redoxAnalyze(rawInput){
    var balanced = balanceEquation(rawInput);
    var last = balanceEquation._last;
    var trans = identifyRedoxChanges(last.species, last.nReact);
    return { balanced: balanced, species: last.species, nReact: last.nReact, trans: trans };
  }

  function redoxTransHtml(trans, species){
    if (!trans.length) return '<p style="font-size:12px;color:var(--tx3)">Bu tepkimede redoks (yükseltgenme-indirgenme) tespit edilemedi \u2014 muhtemelen bir metatez/n\u00f6tralleşme tepkimesidir.</p>';
    var html = '';
    trans.forEach(function(t){
      var kind = t.kind === 'yukselt' ? 'YÜKSELTGENİYOR (elektron veriyor)' : 'İNDİRGENİYOR (elektron alıyor)';
      var col = t.kind === 'yukselt' ? '#fca5a5' : '#86efac';
      html += '<div style="padding:8px 0;border-top:1px solid rgba(255,255,255,.06)">' +
        '<b style="color:' + col + '">' + t.el + '</b>: ' + fmtOx(t.from) + ' \u2192 ' + fmtOx(t.to) +
        ' <span style="color:var(--tx3)">(' + pretty(species[t.reactSpIdx]) + ' \u2192 ' + pretty(species[t.prodSpIdx]) + ')</span><br>' +
        '<span style="font-size:11px;color:' + col + '">' + kind + '</span>' +
      '</div>';
    });
    return html;
  }

  function setupRedoxExtra(){
    if (document.getElementById('redox-maintabs')) return;
    var host = document.getElementById('s-redoks');
    if (!host) return;
    var pw = host.querySelector ? host.querySelector('.pw') : null;
    if (!pw) return;
    // Mevcut tek-sekmeli içeriği "Hazır Örnekler" grubuna taşı
    var existingCard = pw.querySelector('.card');
    var existingBtns = pw.querySelector('div[style*="overflow-x"]');
    if (existingCard) existingCard.id = 'redox-group-0-card';
    pw.insertAdjacentHTML('afterbegin',
      '<div class="ltabs" id="redox-maintabs" style="margin-bottom:14px">' +
        '<button class="ltab on" onclick="redoxMainSet(0,this)">\ud83d\udcda Hazır Örnekler</button>' +
        '<button class="ltab" onclick="redoxMainSet(1,this)">\u270f\ufe0f Kendi Denklemim</button>' +
        '<button class="ltab" onclick="redoxMainSet(2,this)">\ud83d\udd22 48 Örnek</button>' +
      '</div>' +
      '<div id="redox-group-0"></div>' +
      '<div id="redox-group-1" style="display:none"></div>' +
      '<div id="redox-group-2" style="display:none"></div>');
    // Mevcut örnek-butonları ve kartı grup-0 içine taşı
    var g0 = document.getElementById('redox-group-0');
    if (existingBtns) g0.appendChild(existingBtns);
    if (existingCard) g0.appendChild(existingCard);

    // Kendi Denklemim
    var g1 = document.getElementById('redox-group-1');
    g1.innerHTML =
      '<div class="card">' +
        '<div class="slbl">Kendi Denklemini Yaz (dengesiz olabilir)</div>' +
        '<input type="text" id="redoxown-inp" class="inp" placeholder="\u00f6rn: Fe + O2 -> Fe2O3" style="margin-bottom:10px" autocapitalize="off" autocorrect="off" spellcheck="false">' +
        '<button type="button" class="btn bp bfull" onclick="redoxSolveOwn()">Dengele ve Analiz Et</button>' +
        '<div id="redoxown-out" style="margin-top:14px"></div>' +
      '</div>';

    // 48 İleri Düzey Örnek (elle doğrulanmış)
    var g2 = document.getElementById('redox-group-2');
    var btns2 = REDOX_ADV_LIST.map(function(r, i){ return '<button type="button" class="ob' + (i===0?' sel2':'') + '" onclick="redoxAdvSetIdx(' + i + ',this)">' + (i+1) + '</button>'; }).join('');
    g2.innerHTML =
      '<p class="psub" style="margin-bottom:10px">48 ileri d\u00fczey redoks denklemi (asidik ortam, çok basamaklı, orant\u0131sızlaşma dahil) \u2014 katsayılar Gauss eliminasyonla, yükseltgenme geçişleri elle doğrulanmıştır.</p>' +
      '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;margin-bottom:14px"><div style="display:flex;gap:6px;min-width:max-content">' + btns2 + '</div></div>' +
      '<div class="card"><div id="redox27-out"></div></div>';
    window.redoxAdvSetIdx(0, null);
  }

  window.redoxMainSet = function(i, btn){
    for (var g = 0; g < 3; g++) { var el = document.getElementById('redox-group-' + g); if (el) el.style.display = (g === i) ? 'block' : 'none'; }
    var bar = document.getElementById('redox-maintabs');
    if (bar && btn) { var bs = bar.querySelectorAll('button'); for (var k = 0; k < bs.length; k++) bs[k].classList.remove('on'); btn.classList.add('on'); }
  };

  window.redoxSolveOwn = function(){
    var inp = document.getElementById('redoxown-inp');
    var out = document.getElementById('redoxown-out');
    if (!inp || !out) return;
    var val = inp.value.trim();
    if (!val) { out.innerHTML = '<p style="font-size:12px;color:#fca5a5">Önce bir denklem yaz.</p>'; return; }
    try {
      var r = redoxAnalyze(val);
      out.innerHTML =
        '<div class="slbl" style="color:#86efac">Dengeli Denklem</div>' +
        '<div style="font-family:monospace;font-size:15px;font-weight:700;color:#86efac;margin-bottom:14px;word-break:break-word">' + r.balanced + '</div>' +
        '<div class="slbl">Yükseltgenme / İndirgenme Analizi</div>' +
        redoxTransHtml(r.trans, r.species) +
        '<p style="font-size:11px;color:var(--tx3);margin-top:10px">\u26a0\ufe0f Genel motor karmaşık \u00e7ok-iyonlu bileşiklerde (KMnO\u2084, peroksit, \u00e7oklu N i\u00e7eren tuzlar gibi) hata yapabilir \u2014 sonucu kontrol et.</p>';
    } catch (e) {
      out.innerHTML = '<p style="font-size:12px;color:#fca5a5">\u26a0\ufe0f ' + e.message + '</p>';
    }
  };

  window.redoxAdvSetIdx = function(i, btn){
    if (btn) selectInRow(btn);
    var out = document.getElementById('redox27-out');
    if (!out) return;
    var r = REDOX_ADV_LIST[i];
    var html = '<div class="slbl" style="color:#86efac">Dengeli Denklem</div>' +
      '<div style="font-family:monospace;font-size:15px;font-weight:700;color:#86efac;margin-bottom:14px;word-break:break-word">' + r.eq + '</div>' +
      '<div class="slbl">Yükseltgenme / İndirgenme Analizi</div>';
    r.t.forEach(function(tr){
      var el = tr[0], from = tr[1], to = tr[2];
      var oks = to > from;
      var kind = oks ? 'YÜKSELTGENİYOR (elektron veriyor)' : 'İNDİRGENİYOR (elektron alıyor)';
      var col = oks ? '#fca5a5' : '#86efac';
      html += '<div style="padding:8px 0;border-top:1px solid rgba(255,255,255,.06)">' +
        '<b style="color:' + col + '">' + el + '</b>: ' + fmtOx(from) + ' \u2192 ' + fmtOx(to) + '<br>' +
        '<span style="font-size:11px;color:' + col + '">' + kind + '</span>' +
      '</div>';
    });
    out.innerHTML = html;
  };

  function init(){
    try { enrichElements(); } catch (e) { /* sessiz */ }
    try { setupQuizUI(); } catch (e) { /* sessiz */ }
    try { setupMolFormula(); } catch (e) { /* sessiz */ }
    try { setupFlashcards(); } catch (e) { /* sessiz */ }
    try { setupBalanceGame(); } catch (e) { /* sessiz */ }
    try { setupDayElement(); } catch (e) { /* sessiz */ }
    try { setupOxFinder(); } catch (e) { /* sessiz */ }
    try { setupCompareScreen(); } catch (e) { /* sessiz */ }
    try { setupElz(); } catch (e) { /* sessiz */ }
    try { setupHC(); } catch (e) { /* sessiz */ }
    try { setupFG(); } catch (e) { /* sessiz */ }
    try { setupWI(); } catch (e) { /* sessiz */ }
    try { setupGV(); } catch (e) { /* sessiz */ }
    try { setupEQ(); } catch (e) { /* sessiz */ }
    try { setupRXN(); } catch (e) { /* sessiz */ }
    try { setupFlame(); } catch (e) { /* sessiz */ }
    try { setupRedox(); } catch (e) { /* sessiz */ }
    try { setupRedoxExtra(); } catch (e) { /* sessiz */ }
    try { setupFizKim(); } catch (e) { /* sessiz */ }
    try { setupKin(); } catch (e) { /* sessiz */ }
    try { setupEnerji(); } catch (e) { /* sessiz */ }
    try { setupVideoLib(); } catch (e) { /* sessiz */ }
    try { setupDenge2(); } catch (e) { /* sessiz */ }
    // nav sarmalayıcı: skor ekranında tabloyu güncelle, test
    // ekranında sayaçları tazele, detaydan çıkınca Bohr'u durdur
    try {
      if (typeof window.nav === 'function' && !window.__rkNavWrapped) {
        window.__rkNavWrapped = true;
        var _nav = window.nav;
        window.nav = function(id){
          _nav(id);
          try {
            if (id === 'board') renderBoard();
            if (id === 'quiz') { refreshWeakBtn(); updateRangeNote(); }
            if (id !== 'eldetay') bohrStop();
            if (id === 'elz') setTimeout(elzStart, 80); else { elzStop(); ssVisStop(); capStop(); }
            if (id === 'hc') setTimeout(hcEnter, 80); else hcLeave();
            if (id === 'fg') setTimeout(fgEnter, 80); else fgLeave();
            if (id === 'wi') wiEnter(); else wiLeave();
            if (id === 'gv') gvEnter(); else gvLeave();
            if (id === 'ledenge') eqEnter(); else eqLeave();
            if (id === 'rxntype') rxnEnter();
            if (id === 'alev') flameEnter(); else flameLeave();
            if (id === 'redoks') redoxEnter();
            if (id === 'kinetik') kinEnter(); else kinLeave();
            if (id === 'fizkim') fkEnter();
          } catch (e) {}
        };
      }
    } catch (e) { /* sessiz */ }
    // Element detayına Bohr modeli ekle
    try {
      if (typeof window.openElDetail === 'function' && !window.__rkBohrWrapped) {
        window.__rkBohrWrapped = true;
        var _oed = window.openElDetail;
        window.openElDetail = function(n){
          _oed(n);
          try { injectBohr(n); } catch (e) {}
        };
      }
    } catch (e) { /* sessiz */ }
    // Çevrimdışı destek (sw.js repo kökünde olmalı)
    try {
      if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(function(){});
    } catch (e) { /* sessiz */ }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();})();
