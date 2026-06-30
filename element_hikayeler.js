// element_hikayeler.js - Elementlerin Keşif Hikayeleri ve Genel Kültür Bilgileri

const ElementHikayeler = {
  // ========== KEŞİF HİKAYELERİ ==========
  
  stories: {
    H: {
      discoverer: "Henry Cavendish",
      year: 1766,
      story: "Cavendish, metalik asitlerin sülfürik asitle tepkimesinden elde ettiği 'yanıcı hava'yı hidrojen olarak adlandırdı. Adı Yunanca 'su oluşturan' anlamına gelir.",
      funFact: "Evrenin en bol elementidir. Güneş'in kütlesinin %73'ü hidrojendir."
    },
    He: {
      discoverer: "Pierre Janssen, Norman Lockyer",
      year: 1868,
      story: "Güneş tutulması sırasında güneş spektrumunda bilinmeyen bir sarı çizgi görüldü. Adı Yunanca 'güneş' (helios) kelimesinden gelir.",
      funFact: "Dünya atmosferinde çok az bulunur ama doğal gaz kaynaklarından elde edilir."
    },
    Li: {
      discoverer: "Johan August Arfwedson",
      year: 1817,
      story: "İsveçli kimyacı Arfwedson, petalit mineralini analiz ederken yeni bir element keşfetti. Adı Yunanca 'taş' (lithos) kelimesinden gelir.",
      funFact: "Lityum iyon pilleri modern elektronik cihazların vazgeçilmezidir."
    },
    C: {
      discoverer: "Antik çağlardan biliniyor",
      year: "Prehistorik",
      story: "Kömür, grafit ve elmas olarak antik çağlardan beri bilinir. 1772'de Lavoisier karbonu element olarak tanımladı.",
      funFact: "Karbon, 10 milyondan fazla bileşik oluşturabilir - organik kimyanın temelidir."
    },
    N: {
      discoverer: "Daniel Rutherford",
      year: 1772,
      story: "Rutherford, havanın yanmayan kısmını 'ruhsuz hava' olarak adlandırdı. Adı Yunanca 'soda oluşturan' anlamına gelir.",
      funFact: "Atmosferin %78'i azottur. DNA ve proteinlerin yapı taşıdır."
    },
    O: {
      discoverer: "Carl Wilhelm Scheele, Joseph Priestley",
      year: 1774,
      story: "Priestley, cıva oksitini ısıtarak oksijeni izole etti. Lavoisier elementi adlandırdı - Yunanca 'asit oluşturan' anlamına gelir.",
      funFact: "Dünya kabuğunun en bol elementidir. Yaşam için vazgeçilmezdir."
    },
    Fe: {
      discoverer: "Prehistorik",
      year: "MÖ 1200 civarı",
      story: "Demir Çağı (MÖ 1200) ile birlikte insanlık demiri kullanmaya başladı. Meteor demiri ilk kaynak oldu.",
      funFact: "Kanın kırmızı rengini veren hemoglobinin merkezinde demir atomu vardır."
    },
    Au: {
      discoverer: "Prehistorik",
      year: "MÖ 3000 civarı",
      story: "Altın, doğada elementel halde bulunur ve antik çağlardan beri bilinir. Mısır firavunları altını çok değerli buluyordu.",
      funFact: "Dünya üzerindeki tüm altın, iki Olimpik yüzme havuzunu doldurabilir."
    },
    Ag: {
      discoverer: "Prehistorik",
      year: "MÖ 3000 civarı",
      story: "Gümüş de doğada elementel halde bulunur. İnsanlık tarihinde altından sonra en değerli metal olmuştur.",
      funFact: "Gümüş, en iyi elektrik iletkenidir. Aynaların %90'ı gümüş kaplamalıdır."
    },
    U: {
      discoverer: "Martin Heinrich Klaproth",
      year: 1789,
      story: "Klaproth, uraninit mineralini analiz ederke keşfetti. Adı Uranüs gezegeninden gelir.",
      funFact: "Uranyum-235 nükleer reaktörlerde ve atom bombalarında kullanılır."
    },
    Pu: {
      discoverer: "Glenn T. Seaborg, McMillan, Abelson, Kennedy, Wahl",
      year: 1940,
      story: "1940'da Berkeley'de deutoryonlarla uranyum bombardıman edilerek sentezlendi. Adı Plüton gezegeninden gelir.",
      funFact: "Voyager uzay araçları plütonyum-238 ile çalışan RTG'ler kullanır."
    },
    Ra: {
      discoverer: "Marie Curie, Pierre Curie",
      year: 1898,
      story: "Curies, uranyum cevherlerini analiz ederken radyumu keşfetti. Adı Latince 'ışın' (radius) kelimesinden gelir.",
      funFact: "Marie Curie, radyum çalışmalarıyla iki Nobel Ödülü kazanan ilk kadındır."
    },
    Rn: {
      discoverer: "Friedrich Ernst Dorn",
      year: 1900,
      story: "Radyumun bozunma ürünü olarak keşfedildi. Adı 'radyumdan gelen' anlamına gelir.",
      funFact: "Radon, evlerdeki en önemli akciğer kanseri risk faktörlerinden biridir."
    },
    Ne: {
      discoverer: "William Ramsay, Morris Travers",
      year: 1898,
      story: "Sıvı havadan fraksiyonel damıtma ile izole edildi. Adı Yunanca 'yeni' (neos) kelimesinden gelir.",
      funFact: "Neon lambaları, tüp içindeki neon gazının elektrikle parlamasıyla çalışır."
    },
    Na: {
      discoverer: "Humphry Davy",
      year: 1807,
      story: "Davy, erimiş sodyum hidroksidi elektroliz ederek elementel sodyumu elde etti.",
      funFact: "Sodyum, deniz suyunda bol miktarda bulunur. Tuz (NaCl) yaşam için esastır."
    },
    Cl: {
      discoverer: "Carl Wilhelm Scheele",
      year: 1774,
      story: "Scheele, mangan dioksit ve hidroklorik asit tepkimesiyle klor gazını üretti.",
      funFact: "Birinci Dünya Savaşı'nda zehirli gaz olarak kullanıldı. Ama su arıtma için da hayati."
    },
    K: {
      discoverer: "Humphry Davy",
      year: 1807,
      story: "Davy, erimiş potasyum hidroksidi elektroliz ederek keşfetti. Adı 'pot ash' (potasyum külü) kelimesinden gelir.",
      funFact: "Potasyum, sinir iletimi ve kas kasılması için vazgeçilmezdir."
    },
    Ca: {
      discoverer: "Humphry Davy",
      year: 1808,
      story: "Davy, erimiş kalsiyum oksidi elektroliz ederek izole etti. Adı Latince 'kireç' (calx) kelimesinden gelir.",
      funFact: "İnsan vücudundaki en bol metaldir. Kemiklerin ve dişlerin temel yapı taşıdır."
    },
    Mg: {
      discoverer: "Joseph Black, Humphry Davy",
      year: 1808,
      story: "Black 'magnezyum' adını verdi, Davy elementi izole etti. Adı Magnesia bölgesinden gelir.",
      funFact: "Magnezyum, havai fişeklerde parlak beyaz ışık için kullanılır."
    },
    Al: {
      discoverer: "Hans Christian Ørsted, Friedrich Wöhler",
      year: 1825,
      story: "Ørsted ilk kez elde etti, Wöhler 1827'de saf alüminyum üretti. Adı 'alum' tuzundan gelir.",
      funFact: "19. yüzyılda alüminyum, altından daha değerliydi. Washington Anıtı'nın tepesinde alüminyum var."
    },
    Si: {
      discoverer: "Jöns Jacob Berzelius",
      year: 1824,
      story: "Berzelius, potasyum ve klorlu silisyum tepkimesiyle elde etti. Adı Latince 'silex' (çakmak taşı) kelimesinden gelir.",
      funFact: "Silisyum, bilgisayar çiplerinin temel malzemesidir. Kumun ana bileşenidir."
    },
    P: {
      discoverer: "Hennig Brand",
      year: 1669,
      story: "Brand, idrarını buharlaştırarak fosforu keşfetti - ilk kez bilinen bir elementi laboratuvarda üreten kişi oldu.",
      funFact: "Beyaz fosfor son derece yanıcıdır ve kibritlerde kullanılır."
    },
    S: {
      discoverer: "Antik çağlardan biliniyor",
      year: "Prehistorik",
      story: "Sülfür, antik çağlardan beri bilinir. Homer, 'sarı toprak' olarak bahsetmiştir.",
      funFact: "Sülfür, volkanik bölgelerde doğal olarak bulunur. Şarap yapımında sterilizasyon için kullanılır."
    },
    Cu: {
      discoverer: "Prehistorik",
      year: "MÖ 8000 civarı",
      story: "Bakır, insanlık tarafından kullanılan ilk metaldir. Bakır Çağı (MÖ 8000-3000) adını vermiştir.",
      funFact: "Bakır, doğal olarak antibakteriyeldir. Hastane yüzeylerinde bakır kaplama kullanılır."
    },
    Zn: {
      discoverer: "Hintli metalurjistler",
      year: "MÖ 1000 civarı",
      story: "Çinko, pirinç (bakır-çinko alaşımı) yapımında eski çağlardan beri kullanılmıştır.",
      funFact: "Çinko, vücuttaki 300'den fazla enzimin çalışması için gereklidir."
    },
    Hg: {
      discoverer: "Antik çağlardan biliniyor",
      year: "Prehistorik",
      story: "Cıva, Mısır mezarlarında bulunmuştur. Alimler uzun süre altına dönüştürülebilir sanmıştır.",
      funFact: "Cıva, oda sıcaklığında sıvı olan tek metaldir. Çok zehirlidir."
    },
    Pb: {
      discoverer: "Antik çağlardan biliniyor",
      year: "Prehistorik",
      story: "Kurşun, Roma İmparatorluğu'nda boru ve kozmetik için kullanıldı. 'Plumbum' Latince'de 'ağır' anlamına gelir.",
      funFact: "Kurşun zehirlenmesi, antik Roma'nın çöküşünde rol oynamış olabilir."
    },
    Ar: {
      discoverer: "Lord Rayleigh, William Ramsay",
      year: 1894,
      story: "Havadaki azottan daha ağır bir gaz keşfedildi. Adı Yunanca 'tembel' (argos) kelimesinden gelir.",
      funFact: "Argon, ampullerde kullanılır. Atmosferin %0.93'ü argondur."
    },
    Kr: {
      discoverer: "William Ramsay, Morris Travers",
      year: 1898,
      story: "Sıvı havadan fraksiyonel damıtma ile keşfedildi. Adı Yunanca 'gizli' (kryptos) kelimesinden gelir.",
      funFact: "Kripton, yüksek verimli floresan lambalarda kullanılır."
    },
    Xe: {
      discoverer: "William Ramsay, Morris Travers",
      year: 1898,
      story: "Sıvı havadan fraksiyonel damıtma ile keşfedildi. Adı Yunanca 'yabancı' (xenos) kelimesinden gelir.",
      funFact: "Ksenon, uzay araçlarında iyon motorlarında itici gaz olarak kullanılır."
    },
    I: {
      discoverer: "Bernard Courtois",
      year: 1811,
      story: "Courtois, deniz yosunundan külü asitlendirirken mor buhar gördü. Adı Yunanca 'mor' (iodes) kelimesinden gelir.",
      funFact: "İyot, tiroid bezinin çalışması için esastır. İyot eksikliği guatre yol açar."
    },
    F: {
      discoverer: "Henri Moissan",
      year: 1886,
      story: "Moissan, erimiş hidrojen potasyum florürü elektroliz ederek floru izole etti. Nobel Ödülü kazandı.",
      funFact: "Flor, en elektronegatif ve en reaktif elementtir. Neredeyse her şeyle tepkimeye girer."
    },
    Br: {
      discoverer: "Antoine Jérôme Balard",
      year: 1826,
      story: "Balard, deniz suyu tortusundan 'brom'u keşfetti. Adı Yunanca 'koku' (bromos) kelimesinden gelir.",
      funFact: "Brom, yangın söndürücülerde ve fotoğrafçılıkta kullanılır."
    },
    Ni: {
      discoverer: "Axel Fredrik Cronstedt",
      year: 1751,
      story: "Cronstedt, nikelinit mineralini analiz ederke keşfetti. Adı Alman 'kupfernickel' (şeytanın bakırı) kelimesinden gelir.",
      funFact: "5 sentlik madeni paraların %75'i nikeldir. Paslanmaz çelikte ana bileşendir."
    },
    Co: {
      discoverer: "Georg Brandt",
      year: 1735,
      story: "Brandt, kobaltit mineralini analiz ederke keşfetti. Adı Alman 'kobold' (yeraltı perisi) kelimesinden gelir.",
      funFact: "Kobalt, B12 vitamininin merkezinde bulunur. Mavi pigmentlerde kullanılır."
    },
    Mn: {
      discoverer: "Carl Wilhelm Scheele, Johan Gottlieb Gahn",
      year: 1774,
      story: "Scheele mangan dioksiti tanımladı, Gahn elementi izole etti. Adı Latince 'magnez' kelimesinden gelir.",
      funFact: "Mangan, çelik üretiminde vazgeçilmezdir. Pillerde de kullanılır."
    },
    Cr: {
      discoverer: "Louis Nicolas Vauquelin",
      year: 1797,
      story: "Vauquelin, krokoit mineralini analiz ederke keşfetti. Adı Yunanca 'renk' (chroma) kelimesinden gelir.",
      funFact: "Krom, paslanmaz çelik ve krom kaplamada kullanılır. Kromik asit çok güçlü oksitleyicidir."
    },
    W: {
      discoverer: "Juan José Elhuyar, Fausto Elhuyar",
      year: 1783,
      story: "İspanyol kardeşler, wolframit mineralini analiz ederke keşfetti. Adı İsveççe 'ağır taş' (tungsten) kelimesinden gelir.",
      funFact: "Tungsten, en yüksek erime noktasına sahip metaldir (3422°C). Ampul tellerinde kullanılır."
    },
    Mo: {
      discoverer: "Carl Wilhelm Scheele",
      year: 1778,
      story: "Scheele, molibdenit mineralini tanımladı. Adı Yunanca 'kurşun' (molybdos) kelimesinden gelir.",
      funFact: "Molibden, yüksek sıcaklık alaşımlarında kullanılır. Biyolojik olarak azot fiksasyonunda rol alır."
    },
    Ti: {
      discoverer: "William Gregor",
      year: 1791,
      story: "Gregor, ilmenit mineralini analiz ederke keşfetti. Adı Yunan Titanlarından gelir.",
      funFact: "Titanyum, en iyi güç/ağırlık oranına sahip metaldir. Protez ve implantlarda kullanılır."
    },
    Zr: {
      discoverer: "Martin Heinrich Klaproth",
      year: 1789,
      story: "Klaproth, zirkon mineralini analiz ederke keşfetti. Adı Arapça 'altın rengi' (zargun) kelimesinden gelir.",
      funFact: "Zirkonyum, nükleer reaktörlerde kullanılır. Yapay elmas taklidi olarak da bilinir."
    },
    Sn: {
      discoverer: "Prehistorik",
      year: "MÖ 3000 civarı",
      story: "Kalay, bronz çağından beri bilinir. Bakır-kalay alaşımı (bronz) devrim yaratmıştır.",
      funFact: "Teneke kutu aslında çeliktir, sadece kalay kaplamalıdır. Kalay 'hastalığı' soğukta parçalanır."
    },
    Sb: {
      discoverer: "Prehistorik",
      year: "Antik çağlar",
      story: "Antimon, antik Mısır'da kozmetik olarak kullanıldı. 'Antimon' adının kökeni belirsizdir.",
      funFact: "Antimon, ateşe dayanıklı alaşımlarda ve yarı iletkenlerde kullanılır."
    },
    Bi: {
      discoverer: "Claude François Geoffroy",
      year: 1753,
      story: "Geoffroy, bizmutu antimondan ayırt etti. Adı Almanca 'beyaz kitle' (Wismut) kelimesinden gelir.",
      funFact: "Bizmut, en diamanyetik elementtir. Manyetik alandan itilir. Kozmetik ve ilaçlarda kullanılır."
    },
    Cd: {
      discoverer: "Karl Samuel Leberecht Hermann, Friedrich Stromeyer",
      year: 1817,
      story: "Stromeyer, çinko cevherindeki saf olmayan oksidi analiz ederke keşfetti. Adı Latince 'kadmia' (çinko cevheri) kelimesinden gelir.",
      funFact: "Kadmiyum, Ni-Cd pillerde ve sarı pigmentlerde kullanılır. Çok zehirlidir."
    },
    Hf: {
      discoverer: "Dirk Coster, Georg von Hevesy",
      year: 1923,
      story: "Coster ve Hevesy, X-ışını spektroskopisi ile keşfetti. Adı Kopenhag'ın Latince adı 'Hafnia'dan gelir.",
      funFact: "Hafniyum, nükleer reaktör kontrol çubuklarında kullanılır. Titanyuma çok benzer."
    },
    Ta: {
      discoverer: "Anders Gustaf Ekeberg",
      year: 1802,
      story: "Ekeberg, tantolit mineralini analiz ederke keşfetti. Adı Yunan mitolojisindeki Tantalos'tan gelir.",
      funFact: "Tantal, asitlere karşı son derece dirençlidir. Cerrahi implantlarda kullanılır."
    },
    Re: {
      discoverer: "Walter Noddack, Ida Tacke, Otto Berg",
      year: 1925,
      story: "Alman ekibi, X-ışını spektroskopisi ile keşfetti. Adı Ren nehrinin Latince adı 'Rhenus'tan gelir.",
      funFact: "Renyum, en son keşfedilen doğal elementtir. Jet motorlarında kullanılır."
    },
    Os: {
      discoverer: "Smithson Tennant",
      year: 1803,
      story: "Tennant, platin cevherinin asidik çözeltisini analiz ederke keşfetti. Adı Yunanca 'koku' (osme) kelimesinden gelir.",
      funFact: "Osmiyum, en yoğun doğal elementtir (22.59 g/cm³). Kalem uçlarında kullanılır."
    },
    Ir: {
      discoverer: "Smithson Tennant",
      year: 1803,
      story: "Tennant, aynı platin cevheri analizinde iridyumu da keşfetti. Adı 'gökkuşağı' (iris) kelimesinden gelir.",
      funFact: "İridyum, en korozyona dirençli elementtir. Dinozorların yok olmasına dair kanıtlar içerir."
    },
    Pt: {
      discoverer: "Prehistorik (Güney Amerika'da)",
      year: "Prehistorik",
      story: "Platin, Güney Amerika'da prehistorik dönemden beri bilinir. Avrupalılar ilk başta 'değersiz gümüş' sandı.",
      funFact: "Platin, katalitik konvertörlerde kullanılır. Kimyasal olarak son derece inerttir."
    },
    Pd: {
      discoverer: "William Hyde Wollaston",
      year: 1803,
      story: "Wollaston, platin cevherini analiz ederke keşfetti. Adı asteroit Pallas'tan gelir.",
      funFact: "Palladyum, hidrojeni emebilir. Katalizörler ve elektronikte kullanılır."
    },
    Rh: {
      discoverer: "William Hyde Wollaston",
      year: 1803,
      story: "Wollaston, aynı platin cevheri analizinde rodyumu da keşfetti. Adı Yunanca 'gül' (rhodon) kelimesinden gelir.",
      funFact: "Rodyum, en yüksek yansıtma oranına sahip metaldir. Aynalarda kullanılır."
    },
    Ru: {
      discoverer: "Karl Ernst Claus",
      year: 1844,
      story: "Claus, Kazan Üniversitesi'nde platin cevherini analiz ederke keşfetti. Adı Rusya'nın Latince adı 'Ruthenia'dan gelir.",
      funFact: "Rutenyum, elektronik ve güneş pillerinde kullanılır."
    },
    B: {
      discoverer: "Joseph Louis Gay-Lussac, Louis Jacques Thénard, Humphry Davy",
      year: 1808,
      story: "Gay-Lussac ve Thénard, boraksı potasyumla tepkimeye sokarak keşfetti. Adı 'borax' (boraks) kelimesinden gelir.",
      funFact: "Bor, termal şoklara karşı dirençlidir. Bor karbürü, en sert maddelerden biridir."
    },
    Ga: {
      discoverer: "Paul-Émile Lecoq de Boisbaudran",
      year: 1875,
      story: "Boisbaudran, spektroskopik analizle keşfetti. Adı Fransa'nın Latince adı 'Gallia'dan gelir.",
      funFact: "Galyum, elinizde eriyebilir (erime noktası 29.76°C). LED'lerde kullanılır."
    },
    In: {
      discoverer: "Ferdinand Reich, Hieronymous Theodor Richter",
      year: 1863,
      story: "Reich ve Richter, çinko cevherini spektroskopik analizle keşfetti. Adı indigo mavisinden gelir.",
      funFact: "İndiyum, ITO (indiyum kalay oksit) olarak dokunmatik ekranlarda kullanılır."
    },
    Tl: {
      discoverer: "William Crookes",
      year: 1861,
      story: "Crookes, spektroskopik analizle keşfetti. Adı yeşil çizgisi (Yunanca 'thallos' = genç dal) nedeniyle verildi.",
      funFact: "Talyum, son derece zehirlidir. Bir zamanlar zehirli fare zehrinde kullanıldı."
    },
    Ge: {
      discoverer: "Clemens Winkler",
      year: 1886,
      story: "Winkler, argyrodit mineralini analiz ederke keşfetti. Adı Almanya'nın Latince adı 'Germania'dan gelir.",
      funFact: "Germanyum, ilk transistörün malzemesidir. Fiber optik kablolarda kullanılır."
    },
    As: {
      discoverer: "Albertus Magnus",
      year: "1250 civarı",
      story: "Albertus Magnus, arsenik sülfürü ısıtarak elementel arseniği elde etti. Adı Yunanca 'erkek' (arsenikos) kelimesinden gelir.",
      funFact: "Arsenik, tarihteki en ünlü zehirdir. Ama yarı iletkenlerde de kullanılır."
    },
    Se: {
      discoverer: "Jöns Jacob Berzelius",
      year: 1817,
      story: "Berzelius, kükürt fabrikası atıklarını analiz ederke keşfetti. Adı Yunan ay tanrıçası Selene'den gelir.",
      funFact: "Selenyum, fotokopi makinelerinde ve güneş pillerinde kullanılır."
    },
    Te: {
      discoverer: "Franz-Joseph Müller von Reichenstein",
      year: 1782,
      story: "Müller, altın cevherini analiz ederke keşfetti. Klaproth 1798'de elementi tanımladı. Adı 'Dünya' (tellus) kelimesinden gelir.",
      funFact: "Tellür, termoelektrik cihazlarda ve CD-RW'lerde kullanılır."
    },
    Po: {
      discoverer: "Marie Curie",
      year: 1898,
      story: "Marie Curie, uranyum cevherinde radyoaktif bir madde keşfetti. Adı Polonya'nın onuruna verildi.",
      funFact: "Polonyum, en zehirli maddelerden biridir. 1 mikrogram bile öldürücü olabilir."
    },
    At: {
      discoverer: "Dale R. Corson, K. A. R. MacKenzie, Emilio Segrè",
      year: 1940,
      story: "Berkeley'de alfa parçacıklarıyla bizmut bombardımanıyla sentezlendi. Adı Yunanca 'kararsız' (astatos) kelimesinden gelir.",
      funFact: "Astat, dünyada sadece 1 gram kadar bulunur. En nadir doğal elementtir."
    },
    Rn: {
      discoverer: "Friedrich Ernst Dorn",
      year: 1900,
      story: "Dorn, radyumun bozunma ürünü olarak keşfetti. Adı 'radyumdan gelen' anlamına gelir.",
      funFact: "Radon, evlerdeki en önemli akciğer kanseri risk faktörüdür."
    },
    Fr: {
      discoverer: "Marguerite Perey",
      year: 1939,
      story: "Perey, Fransa'da aktinyumun bozunma ürünü olarak keşfetti. Adı Fransa'nın onuruna verildi.",
      funFact: "Fransiyum, doğada sadece 20-30 gram kadar bulunur. En elektropozitif elementtir."
    },
    Ra: {
      discoverer: "Marie Curie, Pierre Curie",
      year: 1898,
      story: "Curies, uranyum cevherini analiz ederke keşfetti. Adı Latince 'ışın' (radius) kelimesinden gelir.",
      funFact: "Radyum, bir zamanlar saat kadranlarında ve kozmetikte kullanıldı. Çok zehirlidir."
    },
    Ac: {
      discoverer: "André-Louis Debierne",
      year: 1899,
      story: "Debierne, Curie'nin laboratuvarında çalışırken keşfetti. Adı Yunanca 'ışın' (aktis) kelimesinden gelir.",
      funFact: "Aktinyum, nötron kaynağı olarak kullanılır. Tıbbi tedavide de kullanılır."
    },
    Th: {
      discoverer: "Jöns Jacob Berzelius",
      year: 1828,
      story: "Berzelius, minerali analiz ederke keşfetti. Adı İskandinav gök tanrısı Thor'dan gelir.",
      funFact: "Toryum, nükleer reaktörlerde potansiyel yakıttır. Gaz lambalarında kullanıldı."
    },
    Pa: {
      discoverer: "Kasimir Fajans, Oswald Helmuth Göhring",
      year: 1913,
      story: "Fajans ve Göhring, uranyum bozunması ürünü olarak keşfetti. Adı 'ilk' (protos) + 'aktinyum' kelimelerinden gelir.",
      funFact: "Protaktinyum, nükleer silah potansiyeline sahiptir. Çok nadir bulunur."
    },
    U: {
      discoverer: "Martin Heinrich Klaproth",
      year: 1789,
      story: "Klaproth, uraninit mineralini analiz ederke keşfetti. Adı Uranüs gezegeninden gelir.",
      funFact: "Uranyum-235, nükleer reaktörlerde ve atom bombalarında kullanılır."
    },
    Np: {
      discoverer: "Edwin McMillan, Philip Abelson",
      year: 1940,
      story: "Berkeley'de nötron bombardımanıyla sentezlendi. Adı Neptün gezegeninden gelir.",
      funFact: "Neptünyum, ilk sentetik transuranyum elementidir."
    },
    Pu: {
      discoverer: "Glenn T. Seaborg, McMillan, Kennedy, Wahl",
      year: 1940,
      story: "Berkeley'de deutoryon bombardımanıyla sentezlendi. Adı Plüton gezegeninden gelir.",
      funFact: "Plütonyum-238, uzay araçlarında RTG'lerde kullanılır."
    },
    Am: {
      discoverer: "Glenn T. Seaborg, Ralph A. James, Leon O. Morgan, Albert Ghiorso",
      year: 1944,
      story: "Berkeley'de plütonyum bombardımanıyla sentezlendi. Adı Amerika'nın onuruna verildi.",
      funFact: "Amerikyum, duman dedektörlerinde kullanılır."
    },
    Cm: {
      discoverer: "Glenn T. Seaborg, Ralph A. James, Albert Ghiorso",
      year: 1944,
      story: "Berkeley'de plütonyum bombardımanıyla sentezlendi. Adı Marie ve Pierre Curie'nin onuruna verildi.",
      funFact: "Küriyum, uzay araçlarında RTG'lerde kullanılır."
    },
    Bk: {
      discoverer: "Glenn T. Seaborg, Stanley G. Thompson, Albert Ghiorso",
      year: 1949,
      story: "Berkeley'de amerikyum bombardımanıyla sentezlendi. Adı Berkeley'nin onuruna verildi.",
      funFact: "Berkelyum, sadece mikrogram miktarlarında üretilebilir."
    },
    Cf: {
      discoverer: "Glenn T. Seaborg, Stanley G. Thompson, Albert Ghiorso",
      year: 1950,
      story: "Berkeley'de küriyum bombardımanıyla sentezlendi. Adı Kaliforniya'nın onuruna verildi.",
      funFact: "Kaliforniyum, nötron kaynağı olarak kullanılır. Tıbbi tedavide de kullanılır."
    },
    Es: {
      discoverer: "Albert Ghiorso",
      year: 1952,
      story: "İlk hidrojen bombası denemesinin enkazında keşfedildi. Adı Einstein'ın onuruna verildi.",
      funFact: "Aynştaynyum, bilimsel araştırmalarda kullanılır."
    },
    Fm: {
      discoverer: "Albert Ghiorso",
      year: 1952,
      story: "İlk hidrojen bombası denemesinin enkazında keşfedildi. Adı Enrico Fermi'nin onuruna verildi.",
      funFact: "Fermiyum, bilimsel araştırmalarda kullanılır."
    },
    Md: {
      discoverer: "Albert Ghiorso",
      year: 1955,
      story: "Berkeley'de einstaynyum bombardımanıyla sentezlendi. Adı Dmitri Mendeleev'in onuruna verildi.",
      funFact: "Mendelevyum, bilimsel araştırmalarda kullanılır."
    },
    No: {
      discoverer: "Albert Ghiorso",
      year: 1958,
      story: "Berkeley'de küriyum bombardımanıyla sentezlendi. Adı Alfred Nobel'in onuruna verildi.",
      funFact: "Nobelyum, bilimsel araştırmalarda kullanılır."
    },
    Lr: {
      discoverer: "Albert Ghiorso",
      year: 1961,
      story: "Berkeley'de kaliforniyum bombardımanıyla sentezlendi. Adı Ernest Lawrence'ın onuruna verildi.",
      funFact: "Lawrensiyum, bilimsel araştırmalarda kullanılır."
    },
    Rf: {
      discoverer: "Joint Institute for Nuclear Research (Dubna)",
      year: 1964,
      story: "Dubna'da plütonyum bombardımanıyla sentezlendi. Adı Ernest Rutherford'ın onuruna verildi.",
      funFact: "Rutherfordyum, bilimsel araştırmalarda kullanılır."
    },
    Db: {
      discoverer: "Joint Institute for Nuclear Research (Dubna)",
      year: 1967,
      story: "Dubna'da amerikyum bombardımanıyla sentezlendi. Adı Niels Bohr'un onuruna verildi.",
      funFact: "Dubniyum, bilimsel araştırmalarda kullanılır."
    },
    Sg: {
      discoverer: "Lawrence Berkeley National Laboratory",
      year: 1974,
      story: "Berkeley'de oksijen iyonlarıyla kaliforniyum bombardımanıyla sentezlendi. Adı Glenn T. Seaborg'un onuruna verildi.",
      funFact: "Seaborgiyum, bilimsel araştırmalarda kullanılır."
    },
    Bh: {
      discoverer: "Gesellschaft für Schwerionenforschung (Darmstadt)",
      year: 1981,
      story: "Darmstadt'ta krom bombardımanıyla sentezlendi. Adı Niels Bohr'un onuruna verildi.",
      funFact: "Bohriyum, bilimsel araştırmalarda kullanılır."
    },
    Hs: {
      discoverer: "Gesellschaft für Schwerionenforschung (Darmstadt)",
      year: 1984,
      story: "Darmstadt'ta demir bombardımanıyla sentezlendi. Adı Hess eyaletinin onuruna verildi.",
      funFact: "Hassiyum, bilimsel araştırmalarda kullanılır."
    },
    Mt: {
      discoverer: "Gesellschaft für Schwerionenforschung (Darmstadt)",
      year: 1982,
      story: "Darmstadt'ta demir bombardımanıyla sentezlendi. Adı Lise Meitner'in onuruna verildi.",
      funFact: "Meitneriyum, bilimsel araştırmalarda kullanılır."
    },
    Ds: {
      discoverer: "Gesellschaft für Schwerionenforschung (Darmstadt)",
      year: 1994,
      story: "Darmstadt'ta nikel bombardımanıyla sentezlendi. Adı Alfred Darmstadt'ın onuruna verildi.",
      funFact: "Darmstadtiyum, bilimsel araştırmalarda kullanılır."
    },
    Rg: {
      discoverer: "Gesellschaft für Schwerionenforschung (Darmstadt)",
      year: 1994,
      story: "Darmstadt'ta nikel bombardımanıyla sentezlendi. Adı Wilhelm Röntgen'in onuruna verildi.",
      funFact: "Röntgeniyum, bilimsel araştırmalarda kullanılır."
    },
    Cn: {
      discoverer: "Gesellschaft für Schwerionenforschung (Darmstadt)",
      year: 1996,
      story: "Darmstadt'ta kurşun bombardımanıyla sentezlendi. Adı Nicolaus Copernicus'un onuruna verildi.",
      funFact: "Kopernikyum, bilimsel araştırmalarda kullanılır."
    },
    Nh: {
      discoverer: "RIKEN (Japonya)",
      year: 2004,
      story: "RIKEN'de çinko bombardımanıyla sentezlendi. Adı Japon 'Nihon' kelimesinden gelir.",
      funFact: "Nihoniyum, Japonya'da sentezlenen ilk elementtir."
    },
    Fl: {
      discoverer: "Joint Institute for Nuclear Research (Dubna)",
      year: 1998,
      story: "Dubna'da kurşun bombardımanıyla sentezlendi. Adı Flerov Laboratory'nin onuruna verildi.",
      funFact: "Fleroviyum, bilimsel araştırmalarda kullanılır."
    },
    Mc: {
      discoverer: "Joint Institute for Nuclear Research (Dubna)",
      year: 2003,
      story: "Dubna'da amerikyum bombardımanıyla sentezlendi. Adı Moskova bölgesinin onuruna verildi.",
      funFact: "Moskoviyum, bilimsel araştırmalarda kullanılır."
    },
    Lv: {
      discoverer: "Joint Institute for Nuclear Research (Dubna)",
      year: 2000,
      story: "Dubna'da kurşun bombardımanıyla sentezlendi. Adı Lawrence Livermore National Laboratory'nin onuruna verildi.",
      funFact: "Livermoriyum, bilimsel araştırmalarda kullanılır."
    },
    Ts: {
      discoverer: "Joint Institute for Nuclear Research (Dubna)",
      year: 2010,
      story: "Dubna'da berilyum bombardımanıyla sentezlendi. Adı Tennessee eyaletinin onuruna verildi.",
      funFact: "Tenesin, bilimsel araştırmalarda kullanılır."
    },
    Og: {
      discoverer: "Joint Institute for Nuclear Research (Dubna)",
      year: 2002,
      story: "Dubna'da kaliforniyum bombardımanıyla sentezlendi. Adı Rus fizikçi Yuri Oganessian'ın onuruna verildi.",
      funFact: "Oganesson, bilimsel araştırmalarda kullanılır. İlk kez bir elemente çalışan bir bilim insanının adı verildi."
    }
  },

  // ========== YARDIMCI FONKSİYONLAR ==========
  
  getStory(symbol) {
    return this.stories[symbol] || null;
  },

  hasStory(symbol) {
    return symbol in this.stories;
  },

  getAllStories() {
    return this.stories;
  },

  // Periyodik tablo için kullanım
  formatStoryHTML(symbol) {
    const story = this.getStory(symbol);
    if (!story) return '<p style="color:var(--tx2)">Bu element için hikaye henüz eklenmemiştir.</p>';
    
    return `
      <div style="padding:12px;background:rgba(99,102,241,0.08);border-radius:8px;margin-top:8px;">
        <p style="color:var(--tx2);font-size:12px;margin-bottom:4px;">
          <b>Keşfeden:</b> ${story.discoverer} <b>Yıl:</b> ${story.year}
        </p>
        <p style="color:var(--tx);font-size:13px;line-height:1.5;margin-bottom:8px;">${story.story}</p>
        <p style="color:var(--ac2);font-size:12px;font-style:italic;">💡 ${story.funFact}</p>
      </div>
    `;
  },

  // Rastgele hikaye
  getRandomStory() {
    const keys = Object.keys(this.stories);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return { symbol: randomKey, ...this.stories[randomKey] };
  },

  // Belirli bir yılda keşfedilenler
  getByYear(year) {
    return Object.entries(this.stories)
      .filter(([_, s]) => s.year == year)
      .map(([sym, s]) => ({ symbol: sym, ...s }));
  },

  // Belirli bir keşifçiye göre
  getByDiscoverer(name) {
    return Object.entries(this.stories)
      .filter(([_, s]) => s.discoverer.toLowerCase().includes(name.toLowerCase()))
      .map(([sym, s]) => ({ symbol: sym, ...s }));
  }
};

// Global olarak erişilebilir yap
if (typeof window !== 'undefined') {
  window.ElementHikayeler = ElementHikayeler;
}

