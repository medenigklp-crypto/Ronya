/* ============================================================
   RONYA KİMYA — EKLENTİ v1
   1) Gerçek denklem dengeleyici (matris + Gauss eliminasyonu)
   2) 21–118 arası TAM element verisi (isim, EN, erime/kaynama,
      elektron dizilimi, kabuklar, açıklama)
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

  // --- Başlat ---
  function init(){ try { enrichElements(); } catch (e) { /* sessiz */ } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
