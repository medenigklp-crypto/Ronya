/* ============================================================
   RONYA KİMYA — EKLENTİ v12
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
      for (var m2 = 0; m2 < IUPAC_MULT.length; m2++) {
        if (prefix.indexOf(IUPAC_MULT[m2][0]) === 0) { prefix = prefix.slice(IUPAC_MULT[m2][0].length); break; }
      }
      var subMatch = null;
      for (var s2 = 0; s2 < IUPAC_SUBS.length; s2++) {
        if (prefix.indexOf(IUPAC_SUBS[s2][0]) === 0) { subMatch = IUPAC_SUBS[s2]; break; }
      }
      if (!subMatch) return { ok:false, error:'"' + prefix + '" tan\u0131nan bir grup ad\u0131 de\u011fil. Desteklenenler: metil, etil, propil, izopropil, b\u00fctil, izob\u00fctil, tersb\u00fctil.' };
      prefix = prefix.slice(subMatch[0].length);
      for (var li = 0; li < locants.length; li++)
        branches.push({ locant: locants[li], carbons: subMatch[1], special: subMatch[2] });
    }

    for (var bi = 0; bi < branches.length; bi++) {
      if (branches[bi].locant < 1 || branches[bi].locant > n)
        return { ok:false, error: branches[bi].locant + ' konumu ' + n + ' karbonlu zincirin d\u0131\u015f\u0131nda kal\u0131yor.' };
    }
    if (dbAt < 0 || dbAt > n - 2)
      return { ok:false, error: '\u00c7ift/\u00fc\u00e7l\u00fc ba\u011f konumu ge\u00e7ersiz.' };

    return { ok:true, n:n, kind:kind, dbAt:dbAt, branches:branches, properParent:properParent };
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
  // Ayrıştırılan isim IUPAC'a göre en düşük lokantlı mı? Değilse doğru adı döndürür.
  function checkCanonicalName(parsed){
    var canon = canonicalLocants(parsed.n, parsed.kind, parsed.dbAt, parsed.branches);
    if (!canon.changed) return null;
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

  // --- Başlat ---
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
  else init();
})();
