var TREND_DATA = {
  // [atomNo]: [radius_pm, ionization_kJ, electron_affinity_kJ]
  1:[53,1312,73], 2:[31,2372,-48], 3:[167,520,60], 4:[112,900,-48],
  5:[87,801,27], 6:[67,1086,122], 7:[56,1402,0], 8:[48,1314,141],
  9:[42,1681,328], 10:[38,2081,-48], 11:[190,496,53], 12:[160,738,-40],
  13:[143,578,42], 14:[117,787,134], 15:[98,1012,72], 16:[88,1000,200],
  17:[79,1251,349], 18:[71,1521,-96], 19:[243,419,48], 20:[194,590,2],
  21:[184,633,18], 22:[176,659,8], 23:[171,651,51], 24:[166,653,65],
  25:[161,717,0], 26:[156,762,16], 27:[152,760,64], 28:[149,737,112],
  29:[145,745,119], 30:[142,906,0], 31:[136,579,41], 32:[125,762,119],
  33:[114,947,78], 34:[103,941,195], 35:[94,1140,325], 36:[88,1351,-96],
  37:[265,403,47], 38:[219,550,5], 39:[212,600,30], 40:[206,640,41],
  41:[198,652,86], 42:[190,684,72], 43:[183,702,53], 44:[178,710,101],
  45:[173,720,110], 46:[169,805,54], 47:[165,731,126], 48:[161,868,-68],
  49:[167,558,29], 50:[145,709,107], 51:[133,834,103], 52:[123,869,190],
  53:[115,1008,295], 54:[108,1170,-77], 55:[298,376,46], 56:[253,503,14],
  // Lanthanides approximate
  57:[187,538,48], 58:[182,534,50], 59:[182,527,50], 60:[181,533,50],
  61:[183,540,50], 62:[180,545,50], 63:[208,547,50], 64:[180,593,50],
  65:[177,566,50], 66:[178,573,50], 67:[176,581,50], 68:[176,589,50],
  69:[190,597,50], 70:[176,603,50], 71:[174,524,50],
  72:[159,659,0], 73:[146,761,31], 74:[139,770,79], 75:[137,760,14],
  76:[135,840,106], 77:[136,880,151], 78:[139,870,205], 79:[144,890,223],
  80:[151,1007,-48], 81:[170,589,19], 82:[175,716,35], 83:[154,703,91],
  84:[168,812,183], 85:[202,920,270], 86:[220,1037,-68],
  87:[348,393,47], 88:[283,509,10],
  89:[195,499,34], 90:[179,587,112], 91:[163,568,53], 92:[156,598,51],
  93:[155,605,46], 94:[159,585,0], 95:[173,578,0], 96:[174,581,0],
  97:[170,601,0], 98:[186,608,0], 99:[186,619,0], 100:[200,627,0],
  101:[200,635,0], 102:[200,642,0], 103:[160,470,0]
};


var TREND_CONFIG = {
  radius: {
    label: 'Atom Yarıçapı',
    unit: 'pm',
    desc: 'Periyotta soldan sağa azalır (çekirdek yükü artar). Grupta yukarıdan aşağı artar (kabuk sayısı artar).',
    arrow_period: '→ Azalır',
    arrow_group: '↓ Artar',
    color_low: '#3b82f6', color_high: '#ef4444',
    getValue: function(el){ var d=TREND_DATA[el.n]; return d?d[0]:null; }
  },
  ionization: {
    label: 'İyonlaşma Enerjisi',
    unit: 'kJ/mol',
    desc: 'Periyotta soldan sağa artar (çekirdek yükü artar). Grupta yukarıdan aşağı azalır (elektron daha uzakta).',
    arrow_period: '→ Artar',
    arrow_group: '↓ Azalır',
    color_low: '#3b82f6', color_high: '#ef4444',
    getValue: function(el){ var d=TREND_DATA[el.n]; return d?d[1]:null; }
  },
  electron_affinity: {
    label: 'Elektron İlgisi',
    unit: 'kJ/mol',
    desc: 'Periyotta soldan sağa genellikle artar. Halojenler en yüksek elektron ilgisine sahiptir. Soy gazlar negatif (elektron almaz).',
    arrow_period: '→ Genellikle artar',
    arrow_group: '↓ Azalır',
    color_low: '#3b82f6', color_high: '#a855f7',
    getValue: function(el){ var d=TREND_DATA[el.n]; return d?d[2]:null; }
  },
  neg: {
    label: 'Elektronegatiflik',
    unit: '(Pauling)',
    desc: 'Periyotta soldan sağa artar. Grupta yukarıdan aşağı azalır. En yüksek: F (3.98). Soy gazların elektronegatifliği tanımsız.',
    arrow_period: '→ Artar',
    arrow_group: '↓ Azalır',
    color_low: '#3b82f6', color_high: '#ef4444',
    getValue: function(el){ var d=EL_DATA[el.n]; return (d&&d.neg!=null)?d.neg:null; }
  },
  metallic: {
    label: 'Metalik Aktiflik',
    unit: '',
    desc: 'Grupta yukarıdan aşağı artar (iyonlaşma enerjisi azalır). Periyotta sağdan sola artar. En aktif metal: Sezyum (Cs).',
    arrow_period: '← Artar',
    arrow_group: '↓ Artar',
    color_low: '#94a3b8', color_high: '#f59e0b',
    getValue: function(el){
      var d=TREND_DATA[el.n]; if(!d) return null;
      var cats=['Alkali Metal','Toprak Alkali Metal','Geçiş Metali','Post-Geçiş Metali','Metal'];
      if(cats.indexOf(el.cat)===-1) return null;
      return Math.round(3000/d[1]*100)/100;
    }
  },
  nonmetallic: {
    label: 'Ametalik Aktiflik',
    unit: '',
    desc: 'Periyotta soldan sağa artar. Grupta yukarıdan aşağı azalır. En aktif ametal: Flor (F).',
    arrow_period: '→ Artar',
    arrow_group: '↑ Artar',
    color_low: '#94a3b8', color_high: '#a855f7',
    getValue: function(el){
      var cats=['Ametal','Halojen','Yarı Metal'];
      if(cats.indexOf(el.cat)===-1) return null;
      var d=EL_DATA[el.n]; if(!d||d.neg==null) return null;
      return d.neg;
    }
  },
  melt_metal: {
    label: 'Metal Erime Noktası',
    unit: '°C',
    desc: 'Metalik bağ gücü belirler. Geçiş metalleri genellikle yüksek erime noktasına sahiptir. W (3422°C) en yüksek.',
    arrow_period: 'Geçiş metallerinde orta gruplarda maksimum',
    arrow_group: '—',
    color_low: '#3b82f6', color_high: '#ef4444',
    getValue: function(el){
      var cats=['Alkali Metal','Toprak Alkali Metal','Geçiş Metali','Post-Geçiş Metali','Metal'];
      if(cats.indexOf(el.cat)===-1) return null;
      var d=EL_DATA[el.n]; return (d&&d.melt!=null)?d.melt:null;
    }
  },
  boil_metal: {
    label: 'Metal Kaynama Noktası',
    unit: '°C',
    desc: 'Metalik bağ gücü ile ilişkili. W en yüksek kaynama noktasına sahiptir (5555°C).',
    arrow_period: 'Geçiş metallerinde yüksek',
    arrow_group: '—',
    color_low: '#3b82f6', color_high: '#ef4444',
    getValue: function(el){
      var cats=['Alkali Metal','Toprak Alkali Metal','Geçiş Metali','Post-Geçiş Metali','Metal'];
      if(cats.indexOf(el.cat)===-1) return null;
      var d=EL_DATA[el.n]; return (d&&d.boil!=null)?d.boil:null;
    }
  },
  melt_nonmetal: {
    label: 'Ametal Erime Noktası',
    unit: '°C',
    desc: 'Kovalent bağ gücüne bağlıdır. C (elmas) 3642°C ile en yüksek ametalli erime noktasına sahiptir.',
    arrow_period: '—',
    arrow_group: '—',
    color_low: '#3b82f6', color_high: '#34d399',
    getValue: function(el){
      var cats=['Ametal','Halojen','Yarı Metal','Soy Gaz'];
      if(cats.indexOf(el.cat)===-1) return null;
      var d=EL_DATA[el.n]; return (d&&d.melt!=null)?d.melt:null;
    }
  },
  boil_nonmetal: {
    label: 'Ametal Kaynama Noktası',
    unit: '°C',
    desc: 'London kuvvetleri belirleyicidir. Mol kütlesi arttıkça kaynama noktası artar.',
    arrow_period: '—',
    arrow_group: '↓ Artar (mol kütlesi artar)',
    color_low: '#3b82f6', color_high: '#34d399',
    getValue: function(el){
      var cats=['Ametal','Halojen','Yarı Metal','Soy Gaz'];
      if(cats.indexOf(el.cat)===-1) return null;
      var d=EL_DATA[el.n]; return (d&&d.boil!=null)?d.boil:null;
    }
  },
  base_moh: {
    label: 'M(OH)x Baz Kuvveti',
    unit: '',
    desc: 'M(OH)x bileşiklerinde: M nin iyonlaşma enerjisi düştükçe (metalik aktiflik arttıkça) baz kuvveti artar. Alkali metaller en güçlü baz oluşturur.\n\nPeriyotta soldan sağa: Baz kuvveti azalır → asit karakteri artar.\nGrupta yukarıdan aşağı: Baz kuvveti artar.',
    arrow_period: '← Baz kuvveti artar',
    arrow_group: '↓ Baz kuvveti artar',
    color_low: '#ef4444', color_high: '#3b82f6',
    getValue: function(el){
      var cats=['Alkali Metal','Toprak Alkali Metal','Geçiş Metali'];
      if(cats.indexOf(el.cat)===-1) return null;
      var d=TREND_DATA[el.n]; if(!d) return null;
      return Math.round(3000/d[1]*100)/100;
    }
  },
  acid_hxa: {
    label: 'HxA Asit Kuvveti',
    unit: '',
    desc: 'HxA asitlerinde (HF, HCl, HBr, HI, H₂S vb.): A nin elektronegatifliği arttıkça H-A bağı zayıflar → asit kuvveti artar.\n\nPeriyotta soldan sağa: Asit kuvveti artar.\nGrupta yukarıdan aşağı: Bağ enerjisi azalır → asit kuvveti artar (HI>HBr>HCl>HF).',
    arrow_period: '→ Asit kuvveti artar',
    arrow_group: '↓ Asit kuvveti artar (bağ zayıflar)',
    color_low: '#94a3b8', color_high: '#ef4444',
    getValue: function(el){
      var cats=['Ametal','Halojen'];
      if(cats.indexOf(el.cat)===-1) return null;
      var d=EL_DATA[el.n]; if(!d||d.neg==null) return null;
      return d.neg;
    }
  },
  acid_oxo_neg: {
    label: 'Oksiasit: Aynı O sayısı, farklı ametal',
    unit: '',
    desc: 'Oksiasitlerde oksijen sayısı aynıyken: Merkezde bulunan ametalin elektronegatifliği arttıkça asit kuvveti artar.\n\nÖrnek: HClO₃ > HBrO₃ > HIO₃\n(Cl en elektronegatif → en güçlü asit)',
    arrow_period: '→ Elektronegatiflik artar → Asit kuvveti artar',
    arrow_group: '↑ Elektronegatiflik artar → Asit kuvveti artar',
    color_low: '#94a3b8', color_high: '#ef4444',
    getValue: function(el){
      if(el.cat!=='Halojen'&&el.cat!=='Ametal') return null;
      var d=EL_DATA[el.n]; if(!d||d.neg==null) return null;
      return d.neg;
    }
  },
  acid_oxo_o: {
    label: 'Oksiasit: Aynı ametal, O sayısı artar',
    unit: '',
    desc: 'Aynı ametalin farklı oksiasitlerinde: Oksijen sayısı arttıkça merkez atomun yükseltgenme basamağı artar → H-O bağı daha polar → asit kuvveti artar.\n\nÖrnek: HClO₄ > HClO₃ > HClO₂ > HClO\n(O sayısı arttıkça asit kuvveti artar)',
    arrow_period: '—',
    arrow_group: '—',
    special: true,
    examples: [
      {name:'HClO (Hipokloröz asit)', o:1, strong:false},
      {name:'HClO₂ (Kloröz asit)', o:2, strong:false},
      {name:'HClO₃ (Klorik asit)', o:3, strong:true},
      {name:'HClO₄ (Perklorik asit)', o:4, strong:true},
      {name:'H₂SO₃ (Sülfiröz asit)', o:3, strong:false},
      {name:'H₂SO₄ (Sülfürik asit)', o:4, strong:true},
      {name:'HNO₂ (Nitröz asit)', o:2, strong:false},
      {name:'HNO₃ (Nitrik asit)', o:3, strong:true}
    ],
    getValue: function(el){ return null; }
  }
};
