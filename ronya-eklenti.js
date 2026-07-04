/* ============================================================
   RONYA KİMYA — EKLENTİ v4
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

  function buildOptions(q, item){
    var opts = [q.ans], guard = 0, c, r, cand;
    if (q.kind === 'group') {
      var all = ['1A','2A','3A','4A','5A','6A','7A','8A'];
      while (opts.length < 4) { c = all[Math.floor(Math.random()*8)]; if (opts.indexOf(c) === -1) opts.push(c); }
    } else if (q.kind === 'period') {
      while (opts.length < 4) { c = (1 + Math.floor(Math.random()*7)) + '. periyot'; if (opts.indexOf(c) === -1) opts.push(c); }
    } else if (q.kind === 'cmpn' || q.kind === 'cmpf') {
      // Önce aynı sınıftan (asit/baz/tuz/oksit) çeldirici dene — daha zor olur
      var same = COMPOUNDS.filter(function(x){ return x.c === item.cmp.c && x.f !== item.cmp.f; });
      var src2 = same.length >= 3 ? same : COMPOUNDS;
      while (opts.length < 4 && guard++ < 800) {
        r = src2[Math.floor(Math.random()*src2.length)];
        cand = q.kind === 'cmpn' ? r.n : pretty(r.f);
        if (cand && opts.indexOf(cand) === -1) opts.push(cand);
      }
      guard = 0;
      while (opts.length < 4 && guard++ < 800) {
        r = COMPOUNDS[Math.floor(Math.random()*COMPOUNDS.length)];
        cand = q.kind === 'cmpn' ? r.n : pretty(r.f);
        if (cand && opts.indexOf(cand) === -1) opts.push(cand);
      }
    } else {
      var src = qPool.length >= 4 ? qPool : ELS;
      while (opts.length < 4 && guard++ < 800) {
        r = src[Math.floor(Math.random()*src.length)];
        cand = q.kind === 'name' ? r.name : q.kind === 'sym' ? r.sym : (EL_DATA[r.n]||{}).conf;
        if (cand && opts.indexOf(cand) === -1) opts.push(cand);
      }
      guard = 0;
      while (opts.length < 4 && guard++ < 800) {
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
      if (w[el.n]) { delete w[el.n]; sset('rk_weak', w); }
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

  // --- Başlat ---
  function init(){
    try { enrichElements(); } catch (e) { /* sessiz */ }
    try { setupQuizUI(); } catch (e) { /* sessiz */ }
    try { setupMolFormula(); } catch (e) { /* sessiz */ }
    try { setupFlashcards(); } catch (e) { /* sessiz */ }
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
