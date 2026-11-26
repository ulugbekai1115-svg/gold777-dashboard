/* Gold 777 — ichki bo'limlar (namuna ma'lumotlar) */
window.G777Pages = (function () {
  'use strict';

  // ================= YORDAMCHI =================
  const B = {
    'Yangi': 'b-blue', 'Ishlab chiqarilmoqda': 'b-yellow', 'Tayyor': 'b-green', 'Yetkazilmoqda': 'b-purple', 'Topshirildi': 'b-teal',
    'To‘langan': 'b-green', 'Qisman': 'b-yellow', 'Nasiya': 'b-red', 'Qaytarilgan': 'b-gray',
    'Naqd': 'b-green', 'Karta': 'b-blue', 'Terminal': 'b-blue', 'Click/Payme': 'b-teal', 'Bank o‘tkazma': 'b-purple',
    'Yetarli': 'b-green', 'Kam qolgan': 'b-red', 'Tugagan': 'b-gray', 'Buyurtma berilgan': 'b-blue',
    'Kutilmoqda': 'b-yellow', 'Yo‘lda': 'b-purple', 'Yetkazildi': 'b-green', 'Kechikmoqda': 'b-red',
    'Muddatida': 'b-green', 'Muddati yaqin': 'b-yellow', 'Muddati o‘tgan': 'b-red',
    'Ishda': 'b-green', 'Ta‘tilda': 'b-yellow', 'Kasal': 'b-gray',
    'Faol': 'b-green', 'Doimiy': 'b-purple', 'Qarzdor': 'b-red', 'To‘xtatilgan': 'b-gray',
    'Jarayonda': 'b-yellow', 'Kechikayotgan': 'b-red',
    'Yangi tovar': 'b-green', '30–59 kun': 'b-blue', '60–89 kun': 'b-yellow', '90+ kun': 'b-red',
    'Eskirgan (90+ kun)': 'b-red', 'Nuqsonli (tirnalgan)': 'b-yellow', 'Aksiya / chegirma': 'b-purple', 'Tannarxdan past sotildi': 'b-red',
    'Kirim': 'b-green', 'Chiqim': 'b-red',
    'Limit ichida': 'b-green', 'Limitga yaqin': 'b-yellow', 'Limitdan oshdi': 'b-red',
  };
  const BRANCH_ROWS = ['Chilonzor', 'Yunusobod', 'Sergeli', 'Samarqand'];
  const BRANCH_FACTOR = { Chilonzor: 0.4, Yunusobod: 0.27, Sergeli: 0.18, Samarqand: 0.15 };
  const CATS = ['Oshxona', 'Yotoqxona', 'Shkaf-kupe', 'Bolalar', 'Ofis', 'Yumshoq mebel', 'Stol-stul'];

  const pad = (n) => String(n).padStart(2, '0');
  const fmtS = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const toDate = (s) => {
    const m = String(s || '').match(/(\d{2})\.(\d{2})\.(\d{4})/);
    return m ? new Date(+m[3], +m[2] - 1, +m[1]) : null;
  };
  const uz = (d) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
  const REF = () => {
    const v = document.getElementById('date-input').value || '2024-05-23';
    const [y, m, d] = v.split('-').map(Number);
    return new Date(y, m - 1, d);
  };
  const daysBetween = (a, b) => Math.round((b - a) / 86400000);
  const daysBefore = (n) => {
    const d = new Date(2024, 4, 23);
    d.setDate(d.getDate() - n);
    return uz(d);
  };

  // ================= MAHSULOT KATALOGI =================
  // kod, nomi, kategoriya, material, o'lcham, tannarx, sotuv narxi, qoldiq, kirim sanasi, shu oy sotildi, filial
  const CATALOG = [
    ['OSH-001', 'Oshxona mebeli “LUX-1”', 'Oshxona', 'MDF + akril', '3.2 m', 4850000, 6000000, 8, '10.05.2024', 23, 'Chilonzor'],
    ['SHK-021', 'Shkaf-kupe “Gold 2400”', 'Shkaf-kupe', 'LDSP Kronospan', '240×220×60', 5500000, 6000000, 11, '02.05.2024', 18, 'Yunusobod'],
    ['YOT-011', 'Yotoqxona “Classic”', 'Yotoqxona', 'MDF', '6 predmet', 4560000, 6000000, 3, '28.03.2024', 15, 'Chilonzor'],
    ['OSH-002', 'Oshxona mebeli “Modern”', 'Oshxona', 'LDSP + oyna', '2.8 m', 4600000, 6000000, 5, '15.04.2024', 12, 'Sergeli'],
    ['BOL-031', 'Bolalar xonasi “Kids-1”', 'Bolalar', 'LDSP', '4 predmet', 5000000, 6000000, 4, '20.04.2024', 9, 'Yunusobod'],
    ['SHK-022', 'Shkaf-kupe “Premium”', 'Shkaf-kupe', 'MDF + oyna', '300×240×65', 5300000, 13400000, 2, '05.05.2024', 4, 'Chilonzor'],
    ['OFS-041', 'Ofis mebeli “Optima”', 'Ofis', 'LDSP', '8 ish o‘rni', 2305000, 2955000, 14, '25.04.2024', 15, 'Samarqand'],
    ['YOT-012', 'Yotoqxona “Milano”', 'Yotoqxona', 'MDF oq-oltin', '6 predmet', 9500000, 12900000, 6, '12.02.2024', 2, 'Chilonzor'],
    ['YUM-051', 'Yumshoq mebel “Comfort”', 'Yumshoq mebel', 'Velyur', '280×180', 5200000, 7400000, 4, '10.01.2024', 2, 'Sergeli'],
    ['STL-061', 'Ovqat stoli + 6 stul', 'Stol-stul', 'Yog‘och (bук)', '180×90', 2900000, 3990000, 1, '01.03.2024', 6, 'Chilonzor'],
    ['OFS-042', 'Ofis kreslosi “Boss”', 'Ofis', 'Eko-teri', '—', 850000, 1290000, 12, '18.05.2024', 20, 'Yunusobod'],
    ['BOL-032', 'Bolalar karavoti “Mini”', 'Bolalar', 'MDF', '160×80', 1400000, 1950000, 4, '22.02.2024', 5, 'Yunusobod'],
    ['SHK-023', 'Shkaf 2 eshikli “Lite”', 'Shkaf-kupe', 'LDSP', '100×200×55', 1900000, 2600000, 9, '14.04.2024', 8, 'Sergeli'],
    ['YUM-052', 'Divan “Venesiya”', 'Yumshoq mebel', 'Rogojka', '220×95', 3800000, 5300000, 3, '20.02.2024', 1, 'Yunusobod'],
    ['OSH-003', 'Oshxona “Provans”', 'Oshxona', 'Massiv + MDF', '3.6 m', 6200000, 8100000, 1, '18.12.2023', 0, 'Chilonzor'],
    ['YOT-013', 'Yotoqxona “Lorenzo”', 'Yotoqxona', 'MDF lak', '5 predmet', 7100000, 9600000, 2, '30.03.2024', 2, 'Samarqand'],
    ['STL-062', 'Jurnal stoli “Glass”', 'Stol-stul', 'Oyna + metall', '100×60', 420000, 690000, 15, '08.04.2024', 12, 'Samarqand'],
    ['OFS-043', 'Rahbar stoli “Executive”', 'Ofis', 'Shpon', '200×100', 4300000, 5900000, 2, '05.03.2024', 1, 'Chilonzor'],
    ['BOL-033', 'Bolalar shkafi “Teddy”', 'Bolalar', 'LDSP', '80×180', 1700000, 2350000, 5, '10.04.2024', 4, 'Sergeli'],
    ['YUM-053', 'Kreslo-krovat “Relax”', 'Yumshoq mebel', 'Velyur', '90×200', 1600000, 2250000, 6, '01.02.2024', 3, 'Samarqand'],
    ['SHK-024', 'Garderob “Elite”', 'Shkaf-kupe', 'MDF + oyna', '320×250', 8900000, 11800000, 1, '22.04.2024', 2, 'Chilonzor'],
    ['OSH-004', 'Oshxona burchagi “Mini”', 'Oshxona', 'LDSP', '1.8 m', 2100000, 2900000, 7, '11.05.2024', 6, 'Yunusobod'],
    ['YOT-014', 'Karavot “Siena”', 'Yotoqxona', 'MDF', '160×200', 2600000, 3500000, 4, '15.03.2024', 5, 'Sergeli'],
    ['STL-063', 'Kompyuter stoli “Study”', 'Stol-stul', 'LDSP', '120×60', 780000, 1150000, 10, '20.03.2024', 7, 'Samarqand'],
  ].map(([kod, nomi, kategoriya, material, olcham, tannarx, narx, qoldiq, kelgan, sotildi, filial]) => ({
    kod, nomi, kategoriya, material, olcham, tannarx, narx, qoldiq, kelgan, sotildi, filial,
  }));
  const byName = (n) => CATALOG.find((p) => p.nomi === n);

  const salesStats = () =>
    CATALOG.map((p) => ({
      ...p,
      birlik: p.narx - p.tannarx,
      tushum: p.narx * p.sotildi,
      foyda: (p.narx - p.tannarx) * p.sotildi,
      foizi: Math.round(((p.narx - p.tannarx) / p.narx) * 100),
    }));
  const topSold = () => salesStats().filter((p) => p.sotildi > 0).sort((a, b) => b.tushum - a.tushum);
  const topProfit = () => salesStats().filter((p) => p.sotildi > 0).sort((a, b) => b.foyda - a.foyda);

  // ================= QARZDORLAR =================
  const DEBT_BASE = [
    ['Abdullaev Oybek', 18500000, 12, 'Chilonzor'], ['Saidov Akmal', 15200000, 8, 'Yunusobod'], ['Karimov Dilshod', 12750000, 5, 'Chilonzor'],
    ['Mirzayeva Nargiza', 9600000, 3, 'Sergeli'], ['Jumanazarov Baxodir', 8300000, 11, 'Samarqand'], ['Tursunova Malika', 7900000, 34, 'Yunusobod'],
    ['Hasanov Rustam', 7400000, 41, 'Chilonzor'], ['Qodirov Sherzod', 6800000, 27, 'Sergeli'], ['Ergasheva Dilnoza', 6250000, 19, 'Samarqand'],
    ['Nazarov Ulug‘bek', 5900000, 2, 'Chilonzor'], ['Yusupov Jasur', 5600000, -4, 'Yunusobod'], ['Rahimova Sevara', 5200000, 23, 'Chilonzor'],
    ['Islomov Bekzod', 4950000, 15, 'Sergeli'], ['Xolmatova Gulnora', 4700000, -9, 'Samarqand'], ['Sobirov Anvar', 4300000, 52, 'Chilonzor'],
    ['Aliyeva Kamola', 4100000, 6, 'Yunusobod'], ['Tojiev Elyor', 3800000, -14, 'Sergeli'], ['Normatov Farrux', 3500000, 30, 'Samarqand'],
    ['Umarova Zarina', 3250000, 1, 'Chilonzor'], ['Bakirov Odil', 2900000, -2, 'Yunusobod'], ['Mamatqulov Sardor', 2600000, 9, 'Sergeli'],
    ['Raxmonova Madina', 2300000, -20, 'Chilonzor'], ['G‘aniyev Akbar', 1950000, 18, 'Samarqand'], ['Po‘latov Jahongir', 1600000, 4, 'Yunusobod'],
    ['Qosimova Nilufar', 1250000, -6, 'Chilonzor'],
  ];
  const DEBTORS = DEBT_BASE.map(([mijoz, qoldiq, kech, filial], i) => {
    const jami = Math.round((qoldiq * (1.4 + (i % 4) * 0.25)) / 100000) * 100000;
    return {
      mijoz,
      tel: `+998 9${i % 10} ${100 + i * 7} ${pad((i * 13) % 100)} ${pad((i * 29) % 100)}`,
      filial,
      buyurtma: `B-${pad(10 + i)}${i % 10}`.replace(/^B-(\d\d)(\d)$/, 'B-00$1'),
      jami,
      tolangan: jami - qoldiq,
      muddat: daysBefore(kech),
    };
  });

  // ================= XARAJATLAR =================
  const EXP_CATS = [
    ['Ijara', 18000000], ['Ish haqi', 186000000], ['Kommunal to‘lovlar', 9000000], ['Transport va yoqilg‘i', 12000000],
    ['Reklama va marketing', 8000000], ['Asbob-uskuna ta’miri', 5000000], ['Soliqlar', 42000000], ['Ofis xarajatlari', 3000000], ['Boshqa', 4000000],
  ];
  const EXPENSES = [
    ['02.05.2024', 'Ijara', 'Chilonzor', 8000000, 'May oyi ijara — bosh ofis'], ['02.05.2024', 'Ijara', 'Yunusobod', 5500000, 'May oyi ijara'],
    ['02.05.2024', 'Ijara', 'Sergeli', 3200000, 'May oyi ijara'], ['02.05.2024', 'Ijara', 'Samarqand', 2800000, 'May oyi ijara'],
    ['05.05.2024', 'Ish haqi', 'Chilonzor', 72000000, 'Aprel oyligi'], ['05.05.2024', 'Ish haqi', 'Yunusobod', 46000000, 'Aprel oyligi'],
    ['05.05.2024', 'Ish haqi', 'Sergeli', 31000000, 'Aprel oyligi'], ['05.05.2024', 'Ish haqi', 'Samarqand', 25000000, 'Aprel oyligi'],
    ['08.05.2024', 'Kommunal to‘lovlar', 'Chilonzor', 3400000, 'Elektr energiya (sex)'], ['08.05.2024', 'Kommunal to‘lovlar', 'Yunusobod', 1700000, 'Elektr, gaz, suv'],
    ['09.05.2024', 'Kommunal to‘lovlar', 'Sergeli', 1500000, 'Elektr, gaz, suv'], ['09.05.2024', 'Kommunal to‘lovlar', 'Samarqand', 1100000, 'Elektr, suv'],
    ['10.05.2024', 'Transport va yoqilg‘i', 'Chilonzor', 6200000, 'Yetkazish mashinalari yoqilg‘isi'], ['14.05.2024', 'Transport va yoqilg‘i', 'Yunusobod', 3900000, 'Yoqilg‘i'],
    ['17.05.2024', 'Transport va yoqilg‘i', 'Sergeli', 2600000, 'Gazel ta’miri'], ['12.05.2024', 'Reklama va marketing', 'Chilonzor', 4500000, 'Instagram/Telegram reklama'],
    ['15.05.2024', 'Reklama va marketing', 'Yunusobod', 1800000, 'Banner'], ['11.05.2024', 'Asbob-uskuna ta’miri', 'Chilonzor', 5800000, 'Raskroy stanogi ta’miri'],
    ['20.05.2024', 'Soliqlar', 'Chilonzor', 31500000, 'QQS va foyda solig‘i'], ['13.05.2024', 'Ofis xarajatlari', 'Chilonzor', 900000, 'Kanselyariya'],
    ['16.05.2024', 'Ofis xarajatlari', 'Samarqand', 650000, 'Printer kartriji'], ['18.05.2024', 'Boshqa', 'Yunusobod', 1200000, 'Mehmonlar uchun'],
  ].map(([sana, kategoriya, filial, summa, izoh]) => ({ sana, kategoriya, filial, summa, izoh }));
  const expState = { limits: Object.fromEntries(EXP_CATS) };

  // ================= KASSA =================
  // kun boshidagi qoldiq, naqd tushum, karta/terminal, click/payme, chiqim (jami korxona bo'yicha)
  const CASH_TOTAL = { boshi: 9520000, naqd: 28300000, karta: 9850000, click: 7630000, chiqim: 12950000 };
  const CASH_OPS = [
    ['09:12', 'Chilonzor', 'Kirim', 'Naqd', 6000000, 'S-1457 savdo'], ['09:30', 'Chilonzor', 'Kirim', 'Terminal', 3000000, 'S-1456 savdo (qisman)'],
    ['09:41', 'Yunusobod', 'Kirim', 'Naqd', 6000000, 'S-1457 savdo'], ['10:05', 'Sergeli', 'Chiqim', 'Naqd', 2600000, 'Gazel ta’miri'],
    ['10:12', 'Chilonzor', 'Kirim', 'Terminal', 6000000, 'S-1458 savdo'], ['10:40', 'Samarqand', 'Kirim', 'Click/Payme', 4400000, 'S-1454 savdo'],
    ['11:15', 'Yunusobod', 'Kirim', 'Click/Payme', 3230000, 'Qarz to‘lovi — Saidov Akmal'], ['11:50', 'Chilonzor', 'Chiqim', 'Naqd', 6200000, 'Yoqilg‘i'],
    ['12:20', 'Sergeli', 'Kirim', 'Naqd', 7300000, 'S-1449 savdo'], ['13:05', 'Samarqand', 'Kirim', 'Naqd', 9000000, 'Buyurtma oldindan to‘lov'],
    ['14:30', 'Chilonzor', 'Chiqim', 'Naqd', 4150000, 'Furnitura xaridi'], ['15:10', 'Yunusobod', 'Kirim', 'Terminal', 850000, 'Ofis kreslosi'],
  ].map(([vaqt, filial, turi, usul, summa, izoh]) => ({ vaqt, filial, turi, usul, summa, izoh }));

  // ================= ZIYONLAR (tarix) =================
  const LOSS_HISTORY = [
    ['20.05.2024', 'S-1449', 'Yumshoq mebel “Comfort”', 'Sergeli', 1, 5200000, 4500000, 'Eskirgan (90+ kun)'],
    ['18.05.2024', 'S-1441', 'Oshxona “Provans”', 'Chilonzor', 1, 6200000, 5400000, 'Eskirgan (90+ kun)'],
    ['16.05.2024', 'S-1436', 'Divan “Venesiya”', 'Yunusobod', 1, 3800000, 3300000, 'Eskirgan (90+ kun)'],
    ['14.05.2024', 'S-1430', 'Kreslo-krovat “Relax”', 'Samarqand', 2, 1600000, 1350000, 'Eskirgan (90+ kun)'],
    ['11.05.2024', 'S-1422', 'Yotoqxona “Milano”', 'Chilonzor', 1, 9500000, 8900000, 'Eskirgan (90+ kun)'],
    ['09.05.2024', 'S-1418', 'Shkaf 2 eshikli “Lite”', 'Sergeli', 1, 1900000, 1500000, 'Nuqsonli (tirnalgan)'],
    ['06.05.2024', 'S-1410', 'Bolalar karavoti “Mini”', 'Yunusobod', 1, 1400000, 1200000, 'Eskirgan (90+ kun)'],
    ['03.05.2024', 'S-1402', 'Ovqat stoli + 6 stul', 'Chilonzor', 1, 2900000, 2600000, 'Aksiya / chegirma'],
    ['02.05.2024', 'S-1398', 'Jurnal stoli “Glass”', 'Samarqand', 3, 420000, 380000, 'Nuqsonli (tirnalgan)'],
  ].map(([sana, chek, mahsulot, filial, soni, tannarx, narx, sabab]) => ({ sana, chek, mahsulot, filial, soni, tannarx, narx, sabab }));

  // ================= TA'MINOTCHILAR VA XARIDLAR =================
  const SUPPLIERS = [
    ['Kronospan UZ', 'Plita (MDF/LDSP)', 'Toshkent', 'Abdurahmonov Bobur', 12000000, 'Faol'],
    ['Kastamonu Trade', 'Plita (MDF/LDSP)', 'Toshkent', 'Yilmaz Mehmet', 6500000, 'Faol'],
    ['Egger Central Asia', 'Plita (MDF/LDSP)', 'Toshkent', 'Shults Andrey', 4200000, 'Faol'],
    ['Blum Trade', 'Furnitura', 'Toshkent', 'Karimova Dildora', 0, 'Faol'],
    ['Hettich Uzbekistan', 'Furnitura', 'Toshkent', 'Nazarov Ilhom', 2300000, 'Faol'],
    ['GTV Furnitura', 'Furnitura', 'Samarqand', 'Polatov Rustam', 900000, 'Faol'],
    ['Rehau Market', 'Kromka', 'Toshkent', 'Nurmatov Sanjar', 1800000, 'Faol'],
    ['Kromka Plus', 'Kromka', 'Namangan', 'Jo‘rayev Anvar', 0, 'Faol'],
    ['Tekstil Pro', 'Mato', 'Namangan', 'Hakimov Doniyor', 3500000, 'Kutilmoqda'],
    ['Velyur House', 'Mato', 'Andijon', 'Mirzayeva Gavhar', 1200000, 'Faol'],
    ['Foam City', 'Porolon', 'Andijon', 'Ismoilova Laylo', 0, 'Faol'],
    ['Glass Master', 'Oyna', 'Toshkent', 'Rasulov Akmal', 0, 'Faol'],
    ['Zerkalo Lux', 'Oyna', 'Samarqand', 'Usmonov Behruz', 650000, 'Faol'],
    ['Color Lak', 'Bo‘yoq va lak', 'Samarqand', 'Qurbonov Ilyos', 3000000, 'To‘xtatilgan'],
    ['Akfa Profil', 'Alyumin profil', 'Toshkent', 'Sodiqov Farhod', 0, 'Faol'],
    ['Metall Karkas', 'Metall karkas', 'Termiz', 'Xudoyberdiyev Oybek', 1500000, 'Faol'],
    ['Termiz Yog‘och', 'Yog‘och (massiv)', 'Termiz', 'Boboqulov Nodir', 2800000, 'Faol'],
    ['Denov Mebel Detal', 'Tayyor detal', 'Denov', 'Ergashev Sardor', 0, 'Faol'],
    ['Qadoq Servis', 'Qadoqlash', 'Toshkent', 'Rahimov Alisher', 0, 'Faol'],
    ['Shurup Bazar', 'Mahkamlagich', 'Toshkent', 'Ochilov Jamol', 300000, 'Faol'],
    ['Oltin Shpon', 'Shpon', 'Samarqand', 'Haydarov Botir', 0, 'Kutilmoqda'],
  ].map(([nomi, turi, shahar, masul, qarz, holat], i) => ({ nomi, turi, shahar, masul, qarz, holat, tel: `+998 9${i % 10} ${200 + i * 11} ${pad((i * 17) % 100)} ${pad((i * 31) % 100)}` }));

  const ITEM_BY_TYPE = {
    'Plita (MDF/LDSP)': [['MDF 16 mm', 'list', 385000], ['LDSP 16 mm', 'list', 310000], ['Laminat 18 mm', 'list', 465000]],
    'Furnitura': [['Sharnir (petlya)', 'dona', 18000], ['Yo‘naltiruvchi (komplekt)', 'komplekt', 65000], ['Dastak', 'dona', 22000]],
    'Kromka': [['Kromka PVX 2 mm', 'metr', 4500], ['Kromka PVX 0.4 mm', 'metr', 1800]],
    'Mato': [['Velyur mato', 'metr', 72000], ['Rogojka mato', 'metr', 64000]],
    'Porolon': [['Porolon 40 mm', 'list', 145000]],
    'Oyna': [['Oyna 4 mm', 'm²', 160000], ['Ko‘zgu 4 mm', 'm²', 210000]],
    'Bo‘yoq va lak': [['Poliuretan lak', 'litr', 98000]],
    'Alyumin profil': [['Kupe profili', 'metr', 56000]],
    'Metall karkas': [['Stol karkasi', 'dona', 240000]],
    'Yog‘och (massiv)': [['Buk taxta', 'm³', 6400000]],
    'Tayyor detal': [['Fasad (MDF bo‘yalgan)', 'm²', 420000]],
    'Qadoqlash': [['Stretch plyonka', 'rulon', 85000], ['Karton', 'list', 9000]],
    'Mahkamlagich': [['Konfirmat', 'quti', 38000]],
    'Shpon': [['Yong‘oq shponi', 'm²', 120000]],
  };
  // ta'minotchi kuchi (katta-kichik) — summani belgilaydi
  const SUP_WEIGHT = [9, 6, 4, 5, 3.4, 1.4, 3, 1.2, 4.2, 2.1, 2.6, 2.2, 1.1, 0.4, 1.8, 1.6, 3.6, 2.4, 0.9, 0.7, 0.5];
  const PURCHASES = [];
  SUPPLIERS.forEach((sp, si) => {
    const items = ITEM_BY_TYPE[sp.turi] || [['Material', 'dona', 50000]];
    BRANCH_ROWS.forEach((b, bi) => {
      const w = SUP_WEIGHT[si] * BRANCH_FACTOR[b] * (1 + ((si + bi) % 3) * 0.15);
      if (w < 0.15) return;
      items.forEach(([mat, ol, price], ii) => {
        const sum = Math.round((w * 1900000 * (ii === 0 ? 1 : 0.55)) / 100000) * 100000;
        if (sum <= 0) return;
        const soni = Math.max(1, Math.round(sum / price));
        PURCHASES.push({ sana: daysBefore(((si * 3 + bi * 5 + ii * 2) % 22) + 1), taminotchi: sp.nomi, filial: b, mahsulot: mat, olchov: ol, soni, narx: price, summa: soni * price });
      });
    });
  });

  // ================= MIJOZLAR (regionlar) =================
  const REGIONS = ['Termiz', 'Denov', 'Boysun', 'Oltinsoy', 'Yakkabog‘', 'Sherobod', 'Sho‘rchi', 'Toshkent'];
  const FIRST = ['Abdullaev Oybek', 'Saidov Akmal', 'Karimov Dilshod', 'Rustamov Aziz', 'Ergasheva Dilnoza', 'Mirzayeva Nargiza', 'Tursunov Jasur', 'Xolmatov Sardor',
    'Hasanov Rustam', 'Qodirov Sherzod', 'Nazarov Ulug‘bek', 'Yusupov Jasur', 'Rahimova Sevara', 'Islomov Bekzod', 'Sobirov Anvar', 'Aliyeva Kamola',
    'Normatov Farrux', 'Umarova Zarina', 'Bakirov Odil', 'Mamatqulov Sardor', 'Raxmonova Madina', 'G‘aniyev Akbar', 'Po‘latov Jahongir', 'Qosimova Nilufar',
    'Boboqulov Nodir', 'Xudoyberdiyeva Gulchehra', 'Eshmurodov Shavkat', 'Tog‘ayev Bahrom', 'Jo‘rayeva Mohira', 'Choriyev Asliddin', 'Murodov Ixtiyor', 'Safarova Dildora'];
  const CUSTOMERS = FIRST.map((ism, i) => {
    const debt = DEBTORS.find((d) => d.mijoz === ism);
    const xarid = Math.round(((64 - i * 1.7) * 1000000 * (1 + (i % 3) * 0.18)) / 100000) * 100000;
    const buyurtma = Math.max(1, Math.round(xarid / 9500000));
    return {
      ism,
      tel: `+998 9${(i * 3) % 10} ${300 + i * 9} ${pad((i * 23) % 100)} ${pad((i * 41) % 100)}`,
      region: REGIONS[(i * 5 + 2) % REGIONS.length],
      filial: debt ? debt.filial : BRANCH_ROWS[i % 4],
      buyurtma,
      xarid,
      qarz: debt ? debt.jami - debt.tolangan : 0,
      oxirgi: daysBefore((i * 4) % 60),
    };
  }).map((c) => ({ ...c, holat: c.qarz > 0 ? 'Qarzdor' : c.buyurtma >= 4 ? 'Doimiy' : 'Faol' }));

  // ================= KUNLIK / OYLIK SAVDO =================
  const DAILY = [21, 30, 52, 27, 41, 29, 34, 30, 42, 33, 50, 35, 29, 54, 34, 43, 32, 58, 37, 30, 52, 39, 45, 42, 56, 36, 47, 52, 87, 82];
  const DAILY_START = new Date(2024, 3, 24);
  function daySales(d) {
    const i = daysBetween(DAILY_START, d);
    if (i >= 0 && i < DAILY.length) return DAILY[i] * 1000000;
    const seed = d.getDate() * 37 + (d.getMonth() + 1) * 11 + d.getFullYear();
    return (22 + (seed % 33) + (d.getDay() === 6 ? 12 : 0)) * 1000000;
  }
  const MONTHS = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
  const MONTHLY = [[520, 690], [935, 650], [615, 730], [460, 810], [700, 805], [565, 760], [535, 755], [400, 880], [345, 570], [320, 760], [600, 780], [440, 590]];
  const CAT_SHARE = [['Oshxona', 34.5], ['Yotoqxona', 24.8], ['Shkaf-kupe', 18.7], ['Bolalar', 11.6], ['Ofis', 6.1], ['Boshqalar', 4.3]];

  // ================= SAHIFALAR =================
  const money = { money: 1, r: 1 };
  const CAT_GROUP = {
    key: 'kategoriya',
    title: 'GURUHLAR (KATEGORIYALAR) BO‘YICHA',
    line: (rs) => `${rs.reduce((a, r) => a + r.sotildi, 0)} dona · tushum ${fmtS(rs.reduce((a, r) => a + r.tushum, 0))}`,
    em: (rs) => `Foyda: ${fmtS(rs.reduce((a, r) => a + r.foyda, 0))} so‘m`,
    sortBy: (rs) => rs.reduce((a, r) => a + r.foyda, 0),
  };
  const PAGES = {
    savdo: {
      title: 'Savdo', sub: 'Kunlik savdo, tannarx va foyda',
      kpis: (list) => {
        const sum = list.filter((r) => r.holat !== 'Qaytarilgan');
        const t = sum.reduce((a, r) => a + r.soni * r.narx, 0);
        const f = sum.reduce((a, r) => a + r.soni * (r.narx - r.tannarx), 0);
        return [['Savdo summasi', t, 'so‘m', '#2f6fed', 'cart'], ['Foyda (tannarxdan)', f, 'so‘m', '#1fa463', 'trend'], ['Cheklar soni', sum.length, 'ta', '#8b46d8', 'savdo'], ['Qaytarishlar', list.length - sum.length, 'ta', '#ef4f4f', 'coin']];
      },
      table: 'Savdolar ro‘yxati', add: 'Yangi savdo',
      tabKey: 'tolov', tabs: ['Naqd', 'Terminal', 'Click/Payme', 'Nasiya'],
      dateKey: 'sana', dateLabel: 'Savdo sanasi',
      cols: [
        ['chek', 'Chek №', { strong: 1 }],
        ['sana', 'Sana', { muted: 1 }],
        ['mijoz', 'Mijoz', { form: 1 }],
        ['mahsulot', 'Mahsulot', { form: 'product', link: 1 }],
        ['filial', 'Filial', { form: 'branch' }],
        ['soni', 'Soni', { r: 1, form: 'number' }],
        ['tannarx', 'Tannarx', { ...money, muted: 1 }],
        ['narx', 'Sotuv narxi', { ...money, form: 'number' }],
        ['summa', 'Summa', { ...money, strong: 1, calc: (r) => r.soni * r.narx }],
        ['foyda', 'Foyda', { ...money, signed: 1, calc: (r) => r.soni * (r.narx - r.tannarx) }],
        ['tolov', 'To‘lov', { badge: 1, form: ['Naqd', 'Terminal', 'Click/Payme', 'Nasiya'] }],
        ['holat', 'Holat', { badge: 1 }],
      ],
      rows: [
        ['S-1458', '23.05.2024 10:12', 'Rustamov Aziz', 'Oshxona mebeli “LUX-1”', 'Chilonzor', 1, 4850000, 6000000, 'Terminal', 'To‘langan'],
        ['S-1457', '23.05.2024 09:48', 'Saidova Malika', 'Shkaf-kupe “Gold 2400”', 'Yunusobod', 1, 5500000, 6000000, 'Naqd', 'To‘langan'],
        ['S-1456', '23.05.2024 09:30', 'Karimov Dilshod', 'Yotoqxona “Classic”', 'Chilonzor', 1, 4560000, 6000000, 'Nasiya', 'Qisman'],
        ['S-1455', '22.05.2024 18:05', 'Abdullaev Oybek', 'Bolalar xonasi “Kids-1”', 'Sergeli', 1, 5000000, 6000000, 'Click/Payme', 'To‘langan'],
        ['S-1454', '22.05.2024 17:22', 'Qosimov Murod', 'Ofis mebeli “Optima”', 'Samarqand', 1, 2305000, 2955000, 'Terminal', 'To‘langan'],
        ['S-1453', '22.05.2024 15:40', 'Jumanazarov Baxodir', 'Oshxona mebeli “Modern”', 'Chilonzor', 1, 4600000, 6000000, 'Nasiya', 'Nasiya'],
        ['S-1452', '22.05.2024 12:15', 'Mirzayeva Nargiza', 'Ovqat stoli + 6 stul', 'Yunusobod', 1, 2900000, 3990000, 'Naqd', 'To‘langan'],
        ['S-1451', '21.05.2024 19:02', 'Tursunov Jasur', 'Yumshoq mebel “Comfort”', 'Sergeli', 1, 5200000, 7400000, 'Terminal', 'Qaytarilgan'],
        ['S-1450', '21.05.2024 16:47', 'Ergasheva Dilnoza', 'Shkaf-kupe “Premium”', 'Samarqand', 1, 5300000, 13400000, 'Click/Payme', 'To‘langan'],
        ['S-1449', '20.05.2024 12:20', 'Hasanov Rustam', 'Yumshoq mebel “Comfort”', 'Sergeli', 1, 5200000, 4500000, 'Naqd', 'To‘langan'],
        ['S-1448', '20.05.2024 11:02', 'Aliyeva Kamola', 'Ofis kreslosi “Boss”', 'Yunusobod', 3, 850000, 1290000, 'Naqd', 'To‘langan'],
      ],
    },

    buyurtmalar: {
      title: 'Buyurtmalar', sub: 'Buyurtmalar va ularning holati',
      kpis: [['Yangi buyurtmalar', 12, 'ta', '#2f6fed', 'orders'], ['Ishlab chiqarilmoqda', 18, 'ta', '#f5b000', 'gear'], ['Tayyor', 9, 'ta', '#1fa463', 'check'], ['Yetkazilmoqda', 7, 'ta', '#8b46d8', 'van']],
      table: 'Buyurtmalar ro‘yxati', add: 'Yangi buyurtma',
      tabKey: 'holat', tabs: ['Yangi', 'Ishlab chiqarilmoqda', 'Tayyor', 'Yetkazilmoqda', 'Topshirildi'],
      dateKey: 'sana', dateLabel: 'Qabul sanasi',
      cols: [
        ['no', 'Buyurtma №', { strong: 1 }], ['mijoz', 'Mijoz', { form: 1 }], ['mahsulot', 'Mahsulot', { form: 'product', link: 1 }],
        ['filial', 'Filial', { form: 'branch' }], ['sana', 'Qabul qilingan', { muted: 1 }], ['muddat', 'Topshirish', { form: 'date' }],
        ['summa', 'Summa', { ...money, form: 'number' }], ['tolangan', 'To‘langan', { ...money, form: 'number' }],
        ['qoldiq', 'Qoldiq', { ...money, neg: 1, calc: (r) => r.summa - r.tolangan }], ['holat', 'Holat', { badge: 1 }],
      ],
      rows: [
        ['B-0061', 'Xolmatov Sardor', 'Oshxona mebeli “LUX-1”', 'Chilonzor', '23.05.2024', '06.06.2024', 12400000, 5000000, 'Yangi'],
        ['B-0060', 'Saidov Akmal', 'Shkaf-kupe “Gold 2400”', 'Yunusobod', '22.05.2024', '04.06.2024', 8600000, 4000000, 'Yangi'],
        ['B-0058', 'Nazarova Gulnora', 'Yotoqxona “Classic”', 'Sergeli', '20.05.2024', '01.06.2024', 15200000, 10000000, 'Ishlab chiqarilmoqda'],
        ['B-0057', 'Rustamov A.', 'Oshxona mebeli “Modern”', 'Chilonzor', '15.05.2024', '24.05.2024', 8750000, 8750000, 'Tayyor'],
        ['B-0055', 'Ismoilov Bekzod', 'Ofis mebeli “Optima”', 'Samarqand', '14.05.2024', '28.05.2024', 21000000, 15000000, 'Ishlab chiqarilmoqda'],
        ['B-0052', 'Saidov B.', 'Bolalar xonasi “Kids-1”', 'Yunusobod', '12.05.2024', '25.05.2024', 6200000, 6200000, 'Yetkazilmoqda'],
        ['B-0049', 'Karimov D.', 'Shkaf-kupe “Premium”', 'Chilonzor', '10.05.2024', '26.05.2024', 7900000, 4000000, 'Tayyor'],
        ['B-0046', 'Abdullaev O.', 'Oshxona mebeli “LUX-1”', 'Sergeli', '08.05.2024', '27.05.2024', 5400000, 5400000, 'Yetkazilmoqda'],
        ['B-0043', 'Qosimov M.', 'Garderob “Elite”', 'Samarqand', '06.05.2024', '28.05.2024', 4650000, 2000000, 'Tayyor'],
        ['B-0041', 'Yo‘ldosheva Sevara', 'Yotoqxona “Classic”', 'Samarqand', '02.05.2024', '18.05.2024', 13600000, 13600000, 'Topshirildi'],
      ],
    },

    ishlab: {
      title: 'Ishlab chiqarish', sub: 'Sexdagi buyurtmalar va bosqichlar',
      kpis: [['Jarayonda', 18, 'ta', '#f5b000', 'factory'], ['Bugun tugaydi', 3, 'ta', '#1fa463', 'check'], ['Kechikayotgan', 2, 'ta', '#ef4f4f', 'orders'], ['Sex yuklamasi', 78, '%', '#2f6fed', 'reports']],
      table: 'Ishlab chiqarish rejasi', add: 'Ishga tushirish',
      tabKey: 'holat', tabs: ['Jarayonda', 'Kechikayotgan', 'Tayyor'],
      note: 'Bosqichlar: Kesish → Kromka → Teshish → Yig‘ish → Qadoqlash',
      cols: [
        ['no', 'Buyurtma №', { strong: 1, form: 1 }], ['mahsulot', 'Mahsulot', { form: 'product', link: 1 }],
        ['sex', 'Sex', { form: ['1-sex (Korpus)', '2-sex (Yumshoq)', '3-sex (Bo‘yoq)'] }], ['usta', 'Mas’ul usta', { form: 1 }],
        ['muddat', 'Muddat', { form: 'date' }], ['bosqich', 'Bosqich', { stage: 1 }], ['progress', 'Bajarildi', { progress: 1 }], ['holat', 'Holat', { badge: 1 }],
      ],
      rows: [
        ['B-0058', 'Yotoqxona “Classic”', '1-sex (Korpus)', 'Hamidov Rustam', '01.06.2024', 3, 65, 'Jarayonda'],
        ['B-0055', 'Ofis mebeli “Optima”', '1-sex (Korpus)', 'Ergashev Anvar', '28.05.2024', 2, 40, 'Jarayonda'],
        ['B-0054', 'Yumshoq mebel “Comfort”', '2-sex (Yumshoq)', 'Sobirov Ilhom', '22.05.2024', 3, 70, 'Kechikayotgan'],
        ['B-0053', 'Oshxona mebeli “LUX-1”', '3-sex (Bo‘yoq)', 'Hamidov Rustam', '25.05.2024', 4, 90, 'Jarayonda'],
        ['B-0051', 'Shkaf-kupe “Premium”', '1-sex (Korpus)', 'Ergashev Anvar', '21.05.2024', 2, 45, 'Kechikayotgan'],
        ['B-0050', 'Bolalar xonasi “Kids-1”', '1-sex (Korpus)', 'Rahimov Odil', '30.05.2024', 1, 20, 'Jarayonda'],
        ['B-0049', 'Shkaf-kupe “Premium”', '1-sex (Korpus)', 'Rahimov Odil', '26.05.2024', 5, 100, 'Tayyor'],
      ],
    },

    ombor: {
      title: 'Ombor', sub: 'Tayyor mahsulotlar — tannarxda, sotilmay turgan muddat bo‘yicha',
      kpis: (list) => {
        const qty = list.reduce((a, r) => a + r.qoldiq, 0);
        const cost = list.reduce((a, r) => a + r.qoldiq * r.tannarx, 0);
        const old = list.filter((r) => ageDays(r) >= 90).reduce((a, r) => a + r.qoldiq * r.tannarx, 0);
        return [['Jami qoldiq', qty, 'dona', '#2f6fed', 'warehouse'], ['Ombor qiymati (tannarxda)', cost, 'so‘m', '#8b46d8', 'coin'], ['Sotuv narxida', list.reduce((a, r) => a + r.qoldiq * r.narx, 0), 'so‘m', '#1fa463', 'trend'], ['90+ kun sotilmagan', old, 'so‘m', '#ef4f4f', 'orders']];
      },
      table: 'Ombordagi mahsulotlar', add: 'Mahsulot qo‘shish',
      tabs: [
        { label: 'Hammasi', fn: () => true },
        { label: '30 kungacha (yangi)', fn: (r) => ageDays(r) < 30 },
        { label: '30–59 kun', fn: (r) => ageDays(r) >= 30 && ageDays(r) < 60 },
        { label: '60–89 kun', fn: (r) => ageDays(r) >= 60 && ageDays(r) < 90 },
        { label: '90+ kun', fn: (r) => ageDays(r) >= 90 },
      ],
      selects: [{ key: 'kategoriya', label: 'Barcha kategoriyalar', options: CATS }],
      dateKey: 'kelgan', dateLabel: 'Kirim sanasi',
      note: 'Shablonlar: omborga kirgan kundan beri sotilmay turgan muddat. Sana oralig‘i bilan kirim sanasini ham tanlash mumkin.',
      rowClick: 'product',
      cols: [
        ['kod', 'Kod', { muted: 1, form: 1 }], ['nomi', 'Mahsulot nomi', { strong: 1, form: 1, link: 1 }],
        ['kategoriya', 'Kategoriya', { form: CATS }], ['filial', 'Filial', { form: 'branch' }],
        ['qoldiq', 'Qoldiq', { r: 1, form: 'number', suffix: ' dona' }],
        ['tannarx', 'Tannarx', { ...money, form: 'number' }], ['narx', 'Sotuv narxi', { ...money, form: 'number' }],
        ['qiymat', 'Qiymati (tannarxda)', { ...money, strong: 1, calc: (r) => r.qoldiq * r.tannarx }],
        ['kelgan', 'Kirim sanasi', { muted: 1, form: 'date' }],
        ['kun', 'Omborda', { r: 1, calc: (r) => ageDays(r), suffix: ' kun' }],
        ['muddat', 'Holat', { badge: 1, calc: (r) => { const d = ageDays(r); return d >= 90 ? '90+ kun' : d >= 60 ? '60–89 kun' : d >= 30 ? '30–59 kun' : 'Yangi tovar'; } }],
      ],
      rows: () => CATALOG.map((p) => ({ ...p })),
      totals: ['qoldiq', 'qiymat'],
    },

    materiallar: {
      title: 'Materiallar', sub: 'Xomashyo va furnitura qoldig‘i',
      kpis: [['Material turlari', 128, 'ta', '#2f6fed', 'materials'], ['Kam qolgan', 5, 'ta', '#ef4f4f', 'orders'], ['Ombor qiymati', 286400000, 'so‘m', '#8b46d8', 'coin'], ['Shu oy kirim', 74300000, 'so‘m', '#1fa463', 'truck']],
      table: 'Materiallar ro‘yxati', add: 'Material kirimi',
      tabKey: 'holat', tabs: ['Kam qolgan', 'Yetarli', 'Buyurtma berilgan'],
      cols: [
        ['nomi', 'Material nomi', { strong: 1, form: 1 }], ['olchov', 'O‘lchov', { form: ['list', 'dona', 'metr', 'kg', 'komplekt'] }],
        ['qoldiq', 'Qoldiq', { r: 1, form: 'number' }], ['minimal', 'Minimal', { r: 1, form: 'number' }],
        ['narx', 'Narxi', { ...money, form: 'number' }], ['qiymat', 'Qiymati', { ...money, calc: (r) => r.qoldiq * r.narx }],
        ['yetkazuvchi', 'Ta’minotchi', { form: 1 }], ['holat', 'Holat', { badge: 1 }],
      ],
      rows: [
        ['MDF 16 mm (Kronospan)', 'list', 23, 50, 385000, 'Kronospan UZ', 'Kam qolgan'],
        ['Laminat 16 mm (Turk)', 'list', 18, 40, 420000, 'Kastamonu Trade', 'Kam qolgan'],
        ['Laminat 18 mm (Turk)', 'list', 12, 30, 465000, 'Kastamonu Trade', 'Buyurtma berilgan'],
        ['Furnitura (Sharnir)', 'dona', 45, 100, 18000, 'Blum Trade', 'Kam qolgan'],
        ['Furnitura (Yo‘naltsa)', 'komplekt', 28, 80, 65000, 'Blum Trade', 'Kam qolgan'],
        ['Kromka PVX 2 mm', 'metr', 1850, 500, 4500, 'Rehau Market', 'Yetarli'],
        ['DSP 16 mm', 'list', 96, 40, 310000, 'Kronospan UZ', 'Yetarli'],
        ['Velyur mato', 'metr', 140, 60, 72000, 'Tekstil Pro', 'Yetarli'],
        ['Porolon 40 mm', 'list', 38, 20, 145000, 'Foam City', 'Yetarli'],
      ],
    },

    taminotchilar: {
      title: 'Ta’minotchilar', sub: 'Qaysi filial qaysi ta’minotchidan qancha tovar oldi — top 20',
      kpis: (list) => [
        ['Ta’minotchilar', list.filter((r) => r.summa > 0).length, 'ta', '#2f6fed', 'truck'],
        ['Xarid summasi (oy)', list.reduce((a, r) => a + r.summa, 0), 'so‘m', '#1fa463', 'cart'],
        ['Xarid qilingan', list.reduce((a, r) => a + r.soni, 0), 'birlik', '#8b46d8', 'warehouse'],
        ['Bizning qarzimiz', list.reduce((a, r) => a + r.qarz, 0), 'so‘m', '#ef4f4f', 'coin'],
      ],
      table: 'Ta’minotchilar reytingi (xarid summasi bo‘yicha)', rank: 1, rowClick: 'supplier', add: 'Ta’minotchi qo‘shish',
      tabKey: 'holat', tabs: ['Faol', 'Kutilmoqda', 'To‘xtatilgan'],
      selects: [{ key: 'turi', label: 'Barcha mahsulot turlari', options: Object.keys(ITEM_BY_TYPE) }],
      sorts: [
        { label: 'Xarid summasi bo‘yicha', fn: (a, b) => b.summa - a.summa },
        { label: 'Soni (birlik) bo‘yicha', fn: (a, b) => b.soni - a.soni },
        { label: 'Xaridlar soni bo‘yicha', fn: (a, b) => b.xaridlar - a.xaridlar },
        { label: 'Bizning qarz bo‘yicha', fn: (a, b) => b.qarz - a.qarz },
      ],
      dynamicFilial: 1, // filial bo'yicha xaridlardan qayta hisoblanadi
      dateKey: 'oxirgi', dateLabel: 'Xarid sanasi',
      note: 'Ta’minotchi ustiga bosing — qaysi filial qancha, nima va necha dona olgani ko‘rinadi.',
      cols: [
        ['nomi', 'Ta’minotchi', { strong: 1, form: 1 }], ['turi', 'Mahsulot turi', { form: Object.keys(ITEM_BY_TYPE) }], ['shahar', 'Shahar', { form: 1 }],
        ['masul', 'Mas’ul', { muted: 1, form: 1 }], ['xaridlar', 'Xaridlar', { r: 1, suffix: ' ta' }], ['soni', 'Olingan (birlik)', { r: 1 }],
        ['summa', 'Xarid summasi', { ...money, strong: 1 }], ['qarz', 'Bizning qarz', { ...money, neg: 1, form: 'number' }],
        ['oxirgi', 'Oxirgi xarid', { muted: 1 }], ['holat', 'Holat', { badge: 1 }],
      ],
      rows: () => SUPPLIERS.map((s) => ({ ...s })),
      totals: ['soni', 'summa', 'qarz'],
      limit: 20,
    },

    mijozlar: {
      title: 'Mijozlar', sub: 'Mijozlar bazasi — regionlar bo‘yicha',
      kpis: (list) => [
        ['Mijozlar', list.length, 'ta', '#2f6fed', 'users'],
        ['Jami xarid', list.reduce((a, r) => a + r.xarid, 0), 'so‘m', '#1fa463', 'cart'],
        ['Qarzdorlar', list.filter((r) => r.qarz > 0).length, 'ta', '#ef4f4f', 'coin'],
        ['Doimiy mijozlar', list.filter((r) => r.holat === 'Doimiy').length, 'ta', '#8b46d8', 'staff'],
      ],
      table: 'Mijozlar ro‘yxati', add: 'Yangi mijoz',
      tabKey: 'holat', tabs: ['Faol', 'Doimiy', 'Qarzdor'],
      selects: [{ key: 'region', label: 'Barcha regionlar', options: REGIONS }],
      group: { key: 'region', title: 'REGIONLAR BO‘YICHA MIJOZLAR', line: (rs) => `${rs.length} ta mijoz · xarid ${fmtS(rs.reduce((a, r) => a + r.xarid, 0))}`, em: (rs) => `Qarz: ${fmtS(rs.reduce((a, r) => a + r.qarz, 0))} so‘m`, sortBy: (rs) => rs.length },
      cols: [
        ['ism', 'Mijoz', { avatar: 1, form: 1 }], ['tel', 'Telefon', { muted: 1, form: 1 }], ['region', 'Region', { form: REGIONS }], ['filial', 'Filial', { form: 'branch' }],
        ['buyurtma', 'Buyurtmalar', { r: 1 }], ['xarid', 'Jami xarid', money], ['qarz', 'Qarzi', { ...money, neg: 1 }], ['oxirgi', 'Oxirgi xarid', { muted: 1 }], ['holat', 'Holat', { badge: 1 }],
      ],
      rows: () => CUSTOMERS.map((c) => ({ ...c })),
      totals: ['xarid', 'qarz'],
    },

    'top-mijozlar': {
      title: 'Eng yaxshi xaridor mijozlar', sub: 'Top 20 — eng ko‘p xarid qilganlar', parent: 'mijozlar',
      kpis: (list) => [
        ['Top mijozlar xaridi', list.reduce((a, r) => a + r.xarid, 0), 'so‘m', '#1fa463', 'cart'],
        ['Buyurtmalar', list.reduce((a, r) => a + r.buyurtma, 0), 'ta', '#2f6fed', 'orders'],
        ['O‘rtacha xarid', list.length ? list.reduce((a, r) => a + r.xarid, 0) / list.length : 0, 'so‘m', '#8b46d8', 'trend'],
        ['Ularning qarzi', list.reduce((a, r) => a + r.qarz, 0), 'so‘m', '#ef4f4f', 'coin'],
      ],
      table: 'Top 20 xaridor', rank: 1, limit: 20,
      selects: [{ key: 'region', label: 'Barcha regionlar', options: REGIONS }],
      sorts: [
        { label: 'Xarid summasi bo‘yicha', fn: (a, b) => b.xarid - a.xarid },
        { label: 'Buyurtmalar soni bo‘yicha', fn: (a, b) => b.buyurtma - a.buyurtma },
      ],
      group: { key: 'region', title: 'REGIONLAR BO‘YICHA', line: (rs) => `${rs.length} ta mijoz`, em: (rs) => `Xarid: ${fmtS(rs.reduce((a, r) => a + r.xarid, 0))} so‘m`, sortBy: (rs) => rs.reduce((a, r) => a + r.xarid, 0) },
      cols: [
        ['ism', 'Mijoz', { avatar: 1 }], ['tel', 'Telefon', { muted: 1 }], ['region', 'Region'], ['filial', 'Filial'],
        ['buyurtma', 'Buyurtmalar', { r: 1 }], ['xarid', 'Jami xarid', { ...money, strong: 1 }], ['ortacha', 'O‘rtacha chek', { ...money, calc: (r) => Math.round(r.xarid / r.buyurtma) }],
        ['qarz', 'Qarzi', { ...money, neg: 1 }], ['oxirgi', 'Oxirgi xarid', { muted: 1 }],
      ],
      rows: () => CUSTOMERS.map((c) => ({ ...c })),
      totals: ['buyurtma', 'xarid', 'qarz'],
    },

    yetkazib: {
      title: 'Yetkazib berish', sub: 'Yetkazib berish jadvali',
      kpis: [['Bugungi yetkazish', 7, 'ta', '#2f6fed', 'truck'], ['Yo‘lda', 4, 'ta', '#8b46d8', 'van'], ['Yetkazildi (oy)', 32, 'ta', '#1fa463', 'check'], ['Haydovchilar', 5, 'nafar', '#f5b000', 'staff']],
      table: 'Yetkazib berishlar', add: 'Yetkazish rejalash',
      tabKey: 'holat', tabs: ['Kutilmoqda', 'Yo‘lda', 'Yetkazildi', 'Kechikmoqda'],
      dateKey: 'sana', dateLabel: 'Yetkazish sanasi',
      cols: [
        ['no', 'Buyurtma №', { strong: 1, form: 1 }], ['mijoz', 'Mijoz', { form: 1 }], ['manzil', 'Manzil', { muted: 1, form: 1 }],
        ['haydovchi', 'Haydovchi', { form: ['Olimov Sherzod', 'Nurmatov Kamol', 'Bakirov Ulug‘bek', 'Rasulov Farrux', 'Tojiev Elyor'] }],
        ['sana', 'Sana', { form: 'date' }], ['vaqt', 'Vaqt', { form: 1 }], ['summa', 'Summa', money], ['holat', 'Holat', { badge: 1 }],
      ],
      rows: [
        ['B-0057', 'Rustamov A.', 'Chilonzor 9-kv, 14-uy', 'Olimov Sherzod', '24.05.2024', '10:00–12:00', 8750000, 'Kutilmoqda'],
        ['B-0052', 'Saidov B.', 'Yunusobod 4-kv, 22-uy', 'Nurmatov Kamol', '25.05.2024', '14:00–16:00', 6200000, 'Yo‘lda'],
        ['B-0049', 'Karimov D.', 'Olmazor, Qorasaroy 18', 'Rasulov Farrux', '26.05.2024', '09:00–11:00', 7900000, 'Kutilmoqda'],
        ['B-0046', 'Abdullaev O.', 'Sergeli 7, 31-uy', 'Bakirov Ulug‘bek', '27.05.2024', '11:00–13:00', 5400000, 'Kutilmoqda'],
        ['B-0043', 'Qosimov M.', 'Mirzo Ulug‘bek, Buyuk Ipak yo‘li 41', 'Tojiev Elyor', '28.05.2024', '15:00–17:00', 4650000, 'Kutilmoqda'],
        ['B-0044', 'Hasanov R.', 'Yakkasaroy, Shota Rustaveli 12', 'Nurmatov Kamol', '22.05.2024', '13:00–15:00', 3900000, 'Kechikmoqda'],
        ['B-0041', 'Yo‘ldosheva S.', 'Samarqand, Dagbit ko‘ch. 6', 'Olimov Sherzod', '18.05.2024', '10:00–12:00', 13600000, 'Yetkazildi'],
      ],
    },

    qarzdorlik: {
      title: 'Qarzdorlik', sub: 'Mijozlar qarzi — eng ko‘p kechiktirganlar yuqorida',
      kpis: (list) => [
        ['Jami qarz', list.reduce((a, r) => a + (r.jami - r.tolangan), 0), 'so‘m', '#ef4f4f', 'coin'],
        ['Muddati o‘tgan', list.filter((r) => overdue(r) > 0).reduce((a, r) => a + (r.jami - r.tolangan), 0), 'so‘m', '#f5b000', 'orders'],
        ['Qarzdorlar', list.length, 'ta', '#2f6fed', 'users'],
        ['Eng uzoq kechikish', Math.max(0, ...list.map(overdue)), 'kun', '#8b46d8', 'reports'],
      ],
      table: 'Qarzdor mijozlar', add: 'To‘lov qabul qilish', addPayment: 1,
      tabs: [
        { label: 'Hammasi', fn: () => true },
        { label: 'Muddati o‘tgan', fn: (r) => overdue(r) > 0 },
        { label: '30+ kun kechikkan', fn: (r) => overdue(r) >= 30 },
        { label: 'Muddati yaqin (7 kun)', fn: (r) => overdue(r) <= 0 && overdue(r) > -7 },
        { label: 'Muddatida', fn: (r) => overdue(r) <= -7 },
      ],
      sorts: [
        { label: 'Kechikish bo‘yicha', fn: (a, b) => overdue(b) - overdue(a) },
        { label: 'Qarz summasi bo‘yicha', fn: (a, b) => b.jami - b.tolangan - (a.jami - a.tolangan) },
      ],
      dateKey: 'muddat', dateLabel: 'To‘lov muddati',
      rank: 1,
      cols: [
        ['mijoz', 'Mijoz', { avatar: 1 }], ['tel', 'Telefon', { muted: 1 }], ['filial', 'Filial'], ['buyurtma', 'Buyurtma', { muted: 1 }],
        ['jami', 'Jami summa', money], ['tolangan', 'To‘langan', { ...money, pos: 1 }],
        ['qoldiq', 'Qarz qoldig‘i', { ...money, neg: 1, calc: (r) => r.jami - r.tolangan }],
        ['muddat', 'To‘lov muddati'], ['kech', 'Kechikish', { r: 1, calc: (r) => overdue(r), fmtv: (v) => (v > 0 ? `<span class="neg">${v} kun</span>` : `${-v} kun qoldi`) }],
        ['holat', 'Holat', { badge: 1, calc: (r) => { const o = overdue(r); return o > 0 ? 'Muddati o‘tgan' : o > -7 ? 'Muddati yaqin' : 'Muddatida'; } }],
      ],
      rows: () => DEBTORS.map((d) => ({ ...d })),
      totals: ['qoldiq'],
    },

    ziyon: {
      title: 'Ziyonlar', sub: 'Tannarxdan arzon sotilgan tovarlar — avtomatik hisoblanadi',
      kpis: (list) => [
        ['Jami ziyon', list.reduce((a, r) => a + lossOf(r), 0), 'so‘m', '#ef4f4f', 'trend'],
        ['Ziyon bilan sotilgan', list.reduce((a, r) => a + r.soni, 0), 'dona', '#f5b000', 'cart'],
        ['Eskirish sababli', list.filter((r) => r.sabab.startsWith('Eskirgan')).reduce((a, r) => a + lossOf(r), 0), 'so‘m', '#8b46d8', 'warehouse'],
        ['Ziyonli savdolar', list.length, 'ta', '#2f6fed', 'savdo'],
      ],
      table: 'Ziyon bilan sotilgan tovarlar',
      tabKey: 'sabab', tabs: ['Eskirgan (90+ kun)', 'Nuqsonli (tirnalgan)', 'Aksiya / chegirma', 'Tannarxdan past sotildi'],
      dateKey: 'sana', dateLabel: 'Sotilgan sana',
      note: 'Savdo bo‘limida tovar tannarxidan arzon sotilsa, u shu yerga avtomatik tushadi.',
      cols: [
        ['sana', 'Sana', { muted: 1 }], ['chek', 'Chek №', { strong: 1 }], ['mahsulot', 'Mahsulot', { link: 1 }],
        ['kategoriya', 'Kategoriya', { calc: (r) => (byName(r.mahsulot) || {}).kategoriya || '—' }], ['filial', 'Filial'],
        ['soni', 'Soni', { r: 1 }], ['tannarx', 'Tannarx', money], ['narx', 'Sotilgan narx', money],
        ['ziyon', 'Ziyon', { ...money, neg: 1, calc: (r) => lossOf(r) }], ['sabab', 'Sabab', { badge: 1 }],
      ],
      rows: null, // pastda savdodan avtomatik yig'iladi
      totals: ['ziyon'],
    },

    xodimlar: {
      title: 'Xodimlar', sub: 'Xodimlar va ish haqi',
      kpis: [['Jami xodimlar', 42, 'nafar', '#2f6fed', 'staff'], ['Bugun ishda', 38, 'nafar', '#1fa463', 'check'], ['Ta‘tilda', 2, 'nafar', '#f5b000', 'users'], ['Oylik fondi', 186000000, 'so‘m', '#8b46d8', 'coin']],
      table: 'Xodimlar ro‘yxati', add: 'Xodim qo‘shish',
      tabKey: 'holat', tabs: ['Ishda', 'Ta‘tilda', 'Kasal'],
      cols: [
        ['fio', 'F.I.Sh', { avatar: 1, form: 1 }], ['lavozim', 'Lavozim', { form: ['Sotuvchi', 'Usta', 'Dizayner', 'Haydovchi', 'Omborchi', 'Buxgalter', 'Menejer', 'Kassir'] }],
        ['filial', 'Filial', { form: 'branch' }], ['tel', 'Telefon', { muted: 1, form: 1 }], ['qabul', 'Ishga kirgan', { muted: 1 }],
        ['oylik', 'Oylik', { ...money, form: 'number' }], ['holat', 'Holat', { badge: 1 }],
      ],
      rows: [
        ['Hamidov Rustam', 'Usta', 'Chilonzor', '+998 90 111 22 33', '12.03.2019', 7500000, 'Ishda'],
        ['Ergashev Anvar', 'Usta', 'Chilonzor', '+998 93 222 33 44', '01.09.2020', 6800000, 'Ishda'],
        ['Sobirova Kamola', 'Dizayner', 'Yunusobod', '+998 97 333 44 55', '15.01.2021', 6500000, 'Ishda'],
        ['Olimov Sherzod', 'Haydovchi', 'Chilonzor', '+998 99 444 55 66', '10.06.2021', 4800000, 'Ishda'],
        ['Yusupova Madina', 'Sotuvchi', 'Yunusobod', '+998 91 555 66 77', '02.02.2022', 4500000, 'Ta‘tilda'],
        ['Rahimov Odil', 'Usta', 'Sergeli', '+998 94 666 77 88', '20.04.2022', 6200000, 'Ishda'],
        ['Qodirov Bobur', 'Omborchi', 'Samarqand', '+998 95 777 88 99', '05.07.2022', 4200000, 'Kasal'],
        ['Toshmatova Zarina', 'Buxgalter', 'Chilonzor', '+998 90 888 99 00', '11.11.2018', 8000000, 'Ishda'],
        ['Nurmatov Kamol', 'Haydovchi', 'Yunusobod', '+998 93 101 20 30', '14.09.2023', 4600000, 'Ishda'],
        ['Abdullayeva Shahnoza', 'Kassir', 'Samarqand', '+998 97 404 50 60', '01.03.2023', 4300000, 'Ishda'],
      ],
    },

    'top-sotilgan': {
      title: 'Eng ko‘p sotilgan mahsulotlar', sub: 'Shu oy — tannarx, sotuv narxi va foyda bilan', parent: 'savdo', noFilial: 0,
      kpis: (list) => [
        ['Sotilgan', list.reduce((a, r) => a + r.sotildi, 0), 'dona', '#2f6fed', 'cart'],
        ['Tushum', list.reduce((a, r) => a + r.tushum, 0), 'so‘m', '#8b46d8', 'savdo'],
        ['Tannarx', list.reduce((a, r) => a + r.tannarx * r.sotildi, 0), 'so‘m', '#f5b000', 'coin'],
        ['Foyda', list.reduce((a, r) => a + r.foyda, 0), 'so‘m', '#1fa463', 'trend'],
      ],
      table: 'Top mahsulotlar (sotuv summasi bo‘yicha)', rank: 1, rowClick: 'product', group: CAT_GROUP,
      selects: [{ key: 'kategoriya', label: 'Barcha kategoriyalar', options: CATS }],
      sorts: [
        { label: 'Sotuv summasi bo‘yicha', fn: (a, b) => b.tushum - a.tushum },
        { label: 'Soni bo‘yicha', fn: (a, b) => b.sotildi - a.sotildi },
        { label: 'Foyda bo‘yicha', fn: (a, b) => b.foyda - a.foyda },
      ],
      cols: productCols(),
      rows: () => topSold().slice(0, 20),
      totals: ['sotildi', 'tushum', 'foyda'],
    },

    'top-foydali': {
      title: 'Eng foydali mahsulotlar', sub: 'Shu oy — foyda tannarxdan hisoblangan', parent: 'savdo',
      kpis: (list) => [
        ['Jami foyda', list.reduce((a, r) => a + r.foyda, 0), 'so‘m', '#1fa463', 'trend'],
        ['Tushum', list.reduce((a, r) => a + r.tushum, 0), 'so‘m', '#2f6fed', 'savdo'],
        ['O‘rtacha rentabellik', list.length ? Math.round((list.reduce((a, r) => a + r.foyda, 0) / Math.max(1, list.reduce((a, r) => a + r.tushum, 0))) * 100) : 0, '%', '#8b46d8', 'reports'],
        ['Mahsulotlar', list.length, 'ta', '#f5b000', 'warehouse'],
      ],
      table: 'Top mahsulotlar (foyda bo‘yicha)', rank: 1, rowClick: 'product', group: CAT_GROUP,
      selects: [{ key: 'kategoriya', label: 'Barcha kategoriyalar', options: CATS }],
      sorts: [
        { label: 'Jami foyda bo‘yicha', fn: (a, b) => b.foyda - a.foyda },
        { label: 'Foyda % bo‘yicha', fn: (a, b) => b.foizi - a.foizi },
        { label: '1 dona foydasi bo‘yicha', fn: (a, b) => b.birlik - a.birlik },
      ],
      cols: productCols(),
      rows: () => topProfit().slice(0, 20),
      totals: ['sotildi', 'tushum', 'foyda'],
    },
  };

  function productCols() {
    return [
      ['nomi', 'Mahsulot', { strong: 1, link: 1 }], ['kategoriya', 'Kategoriya'], ['filial', 'Filial'],
      ['sotildi', 'Sotildi', { r: 1, suffix: ' dona' }], ['tannarx', 'Tannarx (1 dona)', money], ['narx', 'Sotuv narxi', money],
      ['birlik', '1 donadan foyda', { ...money, pos: 1 }], ['tushum', 'Tushum', money],
      ['foyda', 'Jami foyda', { ...money, pos: 1, strong: 1 }], ['foizi', 'Foyda %', { r: 1, suffix: '%' }],
    ];
  }

  function ageDays(r) {
    const d = toDate(r.kelgan);
    return d ? Math.max(0, daysBetween(d, REF())) : 0;
  }
  function overdue(r) {
    const d = toDate(r.muddat);
    return d ? daysBetween(d, REF()) : 0;
  }
  const lossOf = (r) => Math.max(0, (r.tannarx - r.narx) * r.soni);

  function rowsOf(page) {
    if (typeof page.rows === 'function') return page.rows();
    const keys = page.cols.filter((c) => !(c[2] && c[2].calc)).map((c) => c[0]);
    return page.rows.map((arr) => {
      const o = {};
      keys.forEach((k, i) => (o[k] = arr[i]));
      return o;
    });
  }

  // ================= RENDER =================
  function create(ctx) {
    const { I, fmt, toast } = ctx;
    const st = {};
    const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    const initials = (s) => String(s).split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
    const branchOpts = (sel) =>
      `<option value="">Barcha filiallar</option>${BRANCH_ROWS.map((b) => `<option ${b === sel ? 'selected' : ''}>${b}</option>`).join('')}`;

    // Savdo -> Ziyon avtomatik bog'lanish
    function lossRows() {
      const sales = ensure('savdo').rows
        .filter((r) => r.narx < r.tannarx && r.holat !== 'Qaytarilgan')
        .map((r) => {
          const hist = LOSS_HISTORY.find((h) => h.chek === r.chek);
          return { sana: String(r.sana).slice(0, 10), chek: r.chek, mahsulot: r.mahsulot, filial: r.filial, soni: r.soni, tannarx: r.tannarx, narx: r.narx, sabab: hist ? hist.sabab : 'Tannarxdan past sotildi' };
        });
      const cheks = new Set(sales.map((s) => s.chek));
      return [...sales, ...LOSS_HISTORY.filter((h) => !cheks.has(h.chek)).map((h) => ({ ...h }))];
    }

    function ensure(key) {
      if (!st[key]) {
        const p = PAGES[key];
        let rows = key === 'ziyon' ? [] : rowsOf(p);
        if (!p.noFilial && !p.dynamicFilial && !p.cols.some((c) => c[0] === 'filial')) {
          rows.forEach((r, i) => (r.filial = r.filial || BRANCH_ROWS[i % 4]));
          p.cols.splice(p.cols.length - 1, 0, ['filial', 'Filial']);
        }
        st[key] = { tab: 0, q: '', rows, filial: null, from: '', to: '', sel: {}, sort: 0 };
      }
      return st[key];
    }

    function kpiHtml(kpis, factor) {
      return `<div class="pkpis">${kpis
        .map(([label, v, unit, color, ic]) => {
          const val = factor === 1 || unit === '%' || unit === 'kun' ? v : unit === 'so‘m' ? v * factor : Math.max(0, Math.round(v * factor));
          return `<div class="card pkpi"><div class="kpi-icon" style="background:${color}"><svg viewBox="0 0 24 24">${I[ic] || I.orders}</svg></div>
          <div><div class="pkpi-label">${label}</div><div class="pkpi-value">${fmt(val)}<small>${unit}</small></div></div></div>`;
        })
        .join('')}</div>`;
    }

    const valOf = (c, r) => (c[2] && c[2].calc ? c[2].calc(r) : r[c[0]]);

    function cell(c, r, idx) {
      const [key, , o = {}] = c;
      if (key === '#') return idx + 1;
      const v = valOf(c, r);
      if (o.fmtv) return o.fmtv(v);
      if (o.badge) return `<span class="badge ${B[v] || 'b-gray'}">${esc(v)}</span>`;
      if (o.stage) return `<span class="stage">${[0, 1, 2, 3, 4].map((i) => `<i class="${i < v ? 'on' : i === v ? 'cur' : ''}"></i>`).join('')}</span>`;
      if (o.progress) return `<span class="progress"><i style="width:${v}%"></i></span>${v}%`;
      if (o.avatar) return `<span class="avatar-s">${initials(v)}</span>${esc(v)}`;
      if (o.link && byName(v)) return `<a href="#" class="plink" data-product="${esc(v)}">${esc(v)}</a>`;
      if (o.money) {
        if (o.signed) return v < 0 ? `<span class="neg">${fmt(v)}</span>` : `<span class="pos">${fmt(v)}</span>`;
        if (o.neg && v > 0) return `<span class="neg">${fmt(v)}</span>`;
        if (o.pos) return `<span class="pos">${fmt(v)}</span>`;
        return fmt(v);
      }
      return esc(v) + (o.suffix || '');
    }

    function renderPage(key, root, state) {
      root.onclick = null;
      if (key === 'hisobotlar') return renderReports(root, state);
      if (key === 'sozlamalar') return renderSettings(root, state);
      if (key === 'kassa') return renderCash(root, state);
      if (key === 'xarajatlar') return renderExpenses(root, state);
      if (key === 'savdo-tahlil') return renderSalesAnalysis(root, state);
      const p = PAGES[key];
      const s = ensure(key);
      if (key === 'ziyon') s.rows = lossRows();
      if (s.filial === null || s.globalBranch !== state.branch.short) {
        s.filial = state.branch.short;
        s.globalBranch = state.branch.short;
      }
      const isAdminAll = !state.branch.short; // filial tanlovi faqat umumiy (barcha filiallar) rejimida
      if (!isAdminAll) s.filial = state.branch.short;
      const tabs = p.tabs ? (typeof p.tabs[0] === 'object' ? p.tabs : [{ label: 'Hammasi', fn: () => true }, ...p.tabs.map((t) => ({ label: t, fn: (r) => valOf(p.cols.find((c) => c[0] === p.tabKey), r) === t }))]) : null;
      const cols = p.rank ? [['#', '№', { muted: 1 }], ...p.cols] : p.cols;

      root.innerHTML = `
        <div data-role="kpis"></div>
        <div data-role="group"></div>
        <div class="card panel">
          <div class="toolbar">
            <div class="card-title">${p.table.toUpperCase()}</div>
            <label class="search"><svg viewBox="0 0 24 24" class="i-sm"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><input type="search" placeholder="Qidirish..." value="${esc(s.q)}" data-role="q" /></label>
            ${p.add ? `<button class="btn" type="button" data-role="export"><svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>Excel</button>
            <button class="btn gold" type="button" data-role="add"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>${p.add}</button>` : `<button class="btn" type="button" data-role="export"><svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>Excel</button>`}
          </div>
          <div class="filters">
            ${p.noFilial ? '' : isAdminAll ? `<label class="fsel"><span>Filial</span><select data-role="filial">${branchOpts(s.filial)}</select></label>` : `<span class="fixed-branch">Filial: <b>${s.filial}</b></span>`}
            ${(p.selects || []).map((sl, i) => `<label class="fsel"><span>${sl.label.replace('Barcha ', '').replace(/^./, (c) => c.toUpperCase())}</span><select data-sel="${i}"><option value="">${sl.label}</option>${sl.options.map((o) => `<option ${s.sel[sl.key] === o ? 'selected' : ''}>${o}</option>`).join('')}</select></label>`).join('')}
            ${p.sorts ? `<label class="fsel"><span>Saralash</span><select data-role="sort">${p.sorts.map((so, i) => `<option value="${i}" ${s.sort === i ? 'selected' : ''}>${so.label}</option>`).join('')}</select></label>` : ''}
            ${p.dateKey ? `<label class="fsel"><span>${p.dateLabel}: dan</span><input type="date" data-role="from" value="${s.from}" /></label><label class="fsel"><span>gacha</span><input type="date" data-role="to" value="${s.to}" /></label><button type="button" class="link-btn" data-role="clear-date">Tozalash</button>` : ''}
          </div>
          ${tabs ? `<div class="tabs" data-role="tabs"></div>` : ''}
          ${p.note ? `<div class="note">${p.note}</div>` : ''}
          <div class="dtable-wrap"><table class="dtable"><thead><tr>${cols.map((c) => `<th class="${c[2] && c[2].r ? 'r' : ''}">${c[1]}</th>`).join('')}</tr></thead><tbody data-role="body"></tbody><tfoot data-role="foot"></tfoot></table></div>
          <div class="pager"><span data-role="count"></span><span data-role="branch"></span></div>
        </div>`;

      const body = root.querySelector('[data-role=body]');
      const draw = () => {
        const q = s.q.trim().toLowerCase();
        if (p.dynamicFilial) {
          const f = s.from ? new Date(s.from + 'T00:00') : null;
          const t = s.to ? new Date(s.to + 'T00:00') : null;
          s.rows.forEach((r) => {
            const ps = PURCHASES.filter((x) => x.taminotchi === r.nomi && (!s.filial || x.filial === s.filial) && (!f || toDate(x.sana) >= f) && (!t || toDate(x.sana) <= t));
            r.summa = ps.reduce((a, x) => a + x.summa, 0);
            r.soni = ps.reduce((a, x) => a + x.soni, 0);
            r.xaridlar = ps.length;
            r.oxirgi = ps.length ? uz(new Date(Math.max(...ps.map((x) => toDate(x.sana))))) : '—';
          });
        }
        let list = s.rows;
        if (!p.noFilial && !p.dynamicFilial && s.filial) list = list.filter((r) => r.filial === s.filial);
        (p.selects || []).forEach((sl) => {
          if (s.sel[sl.key]) list = list.filter((r) => r[sl.key] === s.sel[sl.key]);
        });
        if (p.dateKey && !p.dynamicFilial && (s.from || s.to)) {
          const f = s.from ? new Date(s.from + 'T00:00') : null;
          const t = s.to ? new Date(s.to + 'T00:00') : null;
          list = list.filter((r) => {
            const d = toDate(r[p.dateKey]);
            return d && (!f || d >= f) && (!t || d <= t);
          });
        }
        if (q) list = list.filter((r) => p.cols.some((c) => String(valOf(c, r)).toLowerCase().includes(q)));
        const base = list;
        if (tabs) list = list.filter(tabs[s.tab] ? tabs[s.tab].fn : () => true);
        if (p.sorts) list = [...list].sort(p.sorts[s.sort].fn);
        if (p.dynamicFilial && (s.filial || s.from || s.to)) list = list.filter((r) => r.summa > 0);
        if (p.limit) list = list.slice(0, p.limit);

        const kp = typeof p.kpis === 'function' ? p.kpis(list) : p.kpis;
        const factor = typeof p.kpis === 'function' ? 1 : s.filial ? BRANCH_FACTOR[s.filial] : 1;
        root.querySelector('[data-role=kpis]').innerHTML = kpiHtml(kp, factor);
        if (p.group) {
          const G = p.group;
          const g = {};
          // guruhlar kategoriya tanlovidan oldingi ro'yxat bo'yicha
          const src = s.sel[G.key] ? s.rows.filter((r) => (!s.filial || r.filial === s.filial)) : list;
          src.forEach((r) => (g[r[G.key]] = g[r[G.key]] || []).push(r));
          const arr = Object.entries(g).sort((a, b) => G.sortBy(b[1]) - G.sortBy(a[1]));
          root.querySelector('[data-role=group]').innerHTML = arr.length
            ? `<div class="card panel"><div class="toolbar"><div class="card-title">${G.title}</div><span class="muted" style="font-size:11.5px">Bosib filtrlang</span></div><div class="groups">${arr
                .map(([k, rs]) => `<button type="button" class="grp${s.sel[G.key] === k ? ' active' : ''}" data-grp="${esc(k)}" data-gkey="${G.key}"><b>${esc(k)}</b><span>${G.line(rs)}</span><em>${G.em(rs)}</em></button>`)
                .join('')}</div></div>`
            : '';
        }

        body.innerHTML = list.length
          ? list.map((r, i) => `<tr class="${p.rowClick ? 'clickable' : ''}" data-i="${s.rows.indexOf(r)}">${cols.map((c) => `<td class="${[c[2] && c[2].r ? 'r' : '', c[2] && c[2].strong ? 'strong' : '', c[2] && c[2].muted ? 'muted' : ''].join(' ')}">${cell(c, r, i)}</td>`).join('')}</tr>`).join('')
          : `<tr class="empty-row"><td colspan="${cols.length}">Ma’lumot topilmadi</td></tr>`;
        const foot = root.querySelector('[data-role=foot]');
        if (p.totals && list.length) {
          foot.innerHTML = `<tr>${cols.map((c, i) => {
            if (i === 0) return '<td class="strong">Jami</td>';
            if (!p.totals.includes(c[0])) return '<td></td>';
            const sum = list.reduce((a, r) => a + (Number(valOf(c, r)) || 0), 0);
            return `<td class="r strong">${fmt(sum)}${c[2] && c[2].suffix ? c[2].suffix : ''}</td>`;
          }).join('')}</tr>`;
        } else foot.innerHTML = '';
        root.querySelector('[data-role=count]').textContent = `Ko‘rsatilmoqda: ${list.length} ta`;
        root.querySelector('[data-role=branch]').textContent = p.noFilial ? '' : s.filial ? `Filial: ${s.filial}` : 'Barcha filiallar';
        const tabsEl = root.querySelector('[data-role=tabs]');
        if (tabsEl) tabsEl.innerHTML = tabs.map((t, i) => `<button type="button" class="tab${s.tab === i ? ' active' : ''}" data-tab="${i}">${esc(t.label)}<b>${base.filter(t.fn).length}</b></button>`).join('');
      };
      draw();

      root.querySelector('[data-role=q]').addEventListener('input', (e) => { s.q = e.target.value; draw(); });
      const fsel = root.querySelector('[data-role=filial]');
      if (fsel) fsel.addEventListener('change', (e) => { s.filial = e.target.value; draw(); });
      root.querySelectorAll('[data-sel]').forEach((el) => el.addEventListener('change', (e) => { s.sel[p.selects[+el.dataset.sel].key] = e.target.value; draw(); }));
      const so = root.querySelector('[data-role=sort]');
      if (so) so.addEventListener('change', (e) => { s.sort = +e.target.value; draw(); });
      ['from', 'to'].forEach((k) => {
        const el = root.querySelector(`[data-role=${k}]`);
        if (el) el.addEventListener('change', (e) => { s[k] = e.target.value; draw(); });
      });
      const cd = root.querySelector('[data-role=clear-date]');
      if (cd) cd.addEventListener('click', () => { s.from = s.to = ''; renderPage(key, root, state); });
      root.onclick = (e) => {
        const t = e.target.closest('[data-tab]');
        if (t) { s.tab = +t.dataset.tab; draw(); return; }
        const g = e.target.closest('[data-grp]');
        if (g) { const gk = g.dataset.gkey; s.sel[gk] = s.sel[gk] === g.dataset.grp ? '' : g.dataset.grp; renderPage(key, root, state); return; }
        const pl = e.target.closest('[data-product]');
        if (pl) { e.preventDefault(); productDetail(pl.dataset.product); return; }
        const tr = e.target.closest('tr.clickable');
        if (tr && p.rowClick === 'product') { const r = s.rows[+tr.dataset.i]; if (r) productDetail(r.nomi); }
        if (tr && p.rowClick === 'supplier') { const r = s.rows[+tr.dataset.i]; if (r) supplierDetail(r.nomi, s); }
      };
      root.querySelector('[data-role=export]').addEventListener('click', () => exportCsv(p, s.rows));
      const add = root.querySelector('[data-role=add]');
      if (add) add.addEventListener('click', () => (p.addPayment ? openPayment(s, draw) : openAdd(key, p, s, draw, state)));
    }

    // ---------- mahsulot batafsil ----------
    function productDetail(name) {
      const p = byName(name);
      if (!p) return;
      const age = ageDays(p);
      const unit = p.narx - p.tannarx;
      const row = (k, v, cls = '') => `<div class="dl-row"><span>${k}</span><b class="${cls}">${v}</b></div>`;
      const html = `<div class="pd">
        <div class="pd-head"><div class="pd-ico">${initials(p.kategoriya)}</div><div><div class="pd-cat">${p.kategoriya} · ${p.kod}</div><div class="pd-name">${esc(p.nomi)}</div></div></div>
        <div class="pd-grid">
          <div class="dl"><div class="dl-title">Mahsulot</div>
            ${row('Kategoriya', p.kategoriya)}${row('Material', p.material)}${row('O‘lchami', p.olcham)}${row('Filial (ombor)', p.filial)}${row('Kirim sanasi', p.kelgan)}${row('Omborda turibdi', age + ' kun', age >= 90 ? 'neg' : '')}
          </div>
          <div class="dl"><div class="dl-title">Narx va foyda (1 dona)</div>
            ${row('Tannarx', fmt(p.tannarx) + ' so‘m')}${row('Sotuv narxi', fmt(p.narx) + ' so‘m')}${row('1 donadan foyda', fmt(unit) + ' so‘m', 'pos')}${row('Foyda %', Math.round((unit / p.narx) * 100) + '%')}
          </div>
          <div class="dl"><div class="dl-title">Shu oy sotuv</div>
            ${row('Sotildi', p.sotildi + ' dona')}${row('Tushum', fmt(p.narx * p.sotildi) + ' so‘m')}${row('Tannarx jami', fmt(p.tannarx * p.sotildi) + ' so‘m')}${row('Jami foyda', fmt(unit * p.sotildi) + ' so‘m', 'pos')}
          </div>
          <div class="dl"><div class="dl-title">Ombor qoldig‘i</div>
            ${row('Qoldiq', p.qoldiq + ' dona')}${row('Tannarxda', fmt(p.qoldiq * p.tannarx) + ' so‘m')}${row('Sotuv narxida', fmt(p.qoldiq * p.narx) + ' so‘m')}${row('Kutilayotgan foyda', fmt(p.qoldiq * unit) + ' so‘m', 'pos')}
          </div>
        </div>
        <div class="pd-note">Misol: tannarxi ${fmt(p.tannarx)}, sotuv narxi ${fmt(p.narx)} — 1 donadan ${fmt(unit)} so‘m foyda. ${p.sotildi} dona sotilgani uchun jami ${fmt(unit * p.sotildi)} so‘m foyda.</div>
      </div>
      <div class="modal-foot"><button type="button" class="btn gold" data-close>Yopish</button></div>`;
      ctx.openModal('Mahsulot — batafsil', html, null, true);
    }

    // ---------- ta'minotchi batafsil ----------
    function supplierDetail(name, s) {
      const sp = SUPPLIERS.find((x) => x.nomi === name);
      const f = s.from ? new Date(s.from + 'T00:00') : null;
      const t = s.to ? new Date(s.to + 'T00:00') : null;
      const ps = PURCHASES.filter((x) => x.taminotchi === name && (!f || toDate(x.sana) >= f) && (!t || toDate(x.sana) <= t));
      const byB = BRANCH_ROWS.map((b) => {
        const l = ps.filter((x) => x.filial === b);
        return { b, n: l.length, soni: l.reduce((a, x) => a + x.soni, 0), summa: l.reduce((a, x) => a + x.summa, 0) };
      });
      const total = ps.reduce((a, x) => a + x.summa, 0);
      const list = s.filial ? ps.filter((x) => x.filial === s.filial) : ps;
      const html = `<div class="pd">
        <div class="pd-head"><div class="pd-ico">${initials(sp.nomi)}</div><div><div class="pd-cat">${sp.turi} · ${sp.shahar}</div><div class="pd-name">${esc(sp.nomi)}</div></div></div>
        <div class="dl-row"><span>Mas’ul / telefon</span><b>${esc(sp.masul)} · ${sp.tel}</b></div>
        <div class="dl-row"><span>Jami xarid (barcha filiallar)</span><b>${fmt(total)} so‘m</b></div>
        <div class="dl-row"><span>Bizning qarzimiz</span><b class="${sp.qarz ? 'neg' : 'pos'}">${fmt(sp.qarz)} so‘m</b></div>
        <div class="dl-title" style="margin-top:14px">Filiallar bo‘yicha — kim qancha oldi</div>
        <table class="dtable"><thead><tr><th>Filial</th><th class="r">Xaridlar</th><th class="r">Soni (birlik)</th><th class="r">Summa</th><th>Ulush</th></tr></thead><tbody>
        ${byB.map((r) => `<tr class="${s.filial === r.b ? 'sel' : ''}"><td class="strong">${r.b}</td><td class="r">${r.n}</td><td class="r">${fmt(r.soni)}</td><td class="r">${fmt(r.summa)}</td><td><span class="progress" style="width:80px"><i style="width:${total ? (r.summa / total) * 100 : 0}%"></i></span>${total ? Math.round((r.summa / total) * 100) : 0}%</td></tr>`).join('')}
        </tbody></table>
        <div class="dl-title" style="margin-top:14px">Xaridlar ${s.filial ? '— ' + s.filial : ''}</div>
        <table class="dtable"><thead><tr><th>Sana</th><th>Filial</th><th>Tovar</th><th class="r">Soni</th><th class="r">Narxi</th><th class="r">Summa</th></tr></thead><tbody>
        ${list.sort((a, b) => toDate(b.sana) - toDate(a.sana)).map((x) => `<tr><td class="muted">${x.sana}</td><td>${x.filial}</td><td>${esc(x.mahsulot)}</td><td class="r">${fmt(x.soni)} ${x.olchov}</td><td class="r">${fmt(x.narx)}</td><td class="r strong">${fmt(x.summa)}</td></tr>`).join('') || '<tr class="empty-row"><td colspan="6">Xarid yo‘q</td></tr>'}
        </tbody></table>
      </div><div class="modal-foot"><button type="button" class="btn gold" data-close>Yopish</button></div>`;
      ctx.openModal('Ta’minotchi — batafsil', html, null, true);
    }

    // ---------- oy batafsil (grafikdan) ----------
    function monthDetail(mi, branchShort) {
      const f = branchShort ? BRANCH_FACTOR[branchShort] : 1;
      const [cur, prev] = MONTHLY[mi].map((v) => v * 1000000 * f);
      const diff = cur - prev;
      const scale = cur / (845250000 * f || 1);
      const prods = topSold().map((p) => ({ ...p, q: Math.max(0, Math.round(p.sotildi * scale)) })).filter((p) => p.q > 0).slice(0, 10);
      const html = `<div class="pd">
        <div class="cmp">
          <div class="cmp-box"><span>${MONTHS[mi]} — joriy yil (2024)</span><b>${fmt(cur)} so‘m</b></div>
          <div class="cmp-box muted-box"><span>${MONTHS[mi]} — o‘tgan yil (2023)</span><b>${fmt(prev)} so‘m</b></div>
          <div class="cmp-box ${diff >= 0 ? 'up' : 'down'}"><span>Farq</span><b>${diff >= 0 ? '+' : ''}${fmt(diff)} (${diff >= 0 ? '+' : ''}${Math.round((diff / prev) * 100)}%)</b></div>
        </div>
        <div class="pd-grid">
          <div class="dl"><div class="dl-title">Savdo qayerdan keldi — filiallar</div>
            ${(branchShort ? [branchShort] : BRANCH_ROWS).map((b) => `<div class="dl-row"><span>${b}</span><b>${fmt(MONTHLY[mi][0] * 1000000 * BRANCH_FACTOR[b])} so‘m</b></div>`).join('')}
          </div>
          <div class="dl"><div class="dl-title">Kategoriyalar bo‘yicha</div>
            ${CAT_SHARE.map(([c, pc]) => `<div class="dl-row"><span>${c}</span><b>${fmt((cur * pc) / 100)} so‘m · ${pc}%</b></div>`).join('')}
          </div>
          <div class="dl"><div class="dl-title">To‘lov turlari</div>
            ${[['Naqd', 0.52], ['Terminal / karta', 0.21], ['Click / Payme', 0.15], ['Nasiya', 0.12]].map(([k, v]) => `<div class="dl-row"><span>${k}</span><b>${fmt(cur * v)} so‘m</b></div>`).join('')}
          </div>
          <div class="dl"><div class="dl-title">Ombordagi qoldiq (hozir)</div>
            ${CATS.map((c) => { const l = CATALOG.filter((p) => p.kategoriya === c && (!branchShort || p.filial === branchShort)); return `<div class="dl-row"><span>${c}</span><b>${l.reduce((a, p) => a + p.qoldiq, 0)} dona · ${fmt(l.reduce((a, p) => a + p.qoldiq * p.tannarx, 0))}</b></div>`; }).join('')}
          </div>
        </div>
        <div class="dl-title" style="margin-top:14px">Nima sotildi — top mahsulotlar (${MONTHS[mi]})</div>
        <table class="dtable"><thead><tr><th>Mahsulot</th><th>Kategoriya</th><th class="r">Sotildi</th><th class="r">Summa</th><th class="r">Foyda</th><th class="r">Qoldi</th></tr></thead><tbody>
        ${prods.map((p) => `<tr><td><a href="#" class="plink" data-product="${esc(p.nomi)}">${esc(p.nomi)}</a></td><td>${p.kategoriya}</td><td class="r">${p.q} dona</td><td class="r">${fmt(p.q * p.narx)}</td><td class="r pos">${fmt(p.q * (p.narx - p.tannarx))}</td><td class="r">${p.qoldiq} dona</td></tr>`).join('')}
        </tbody></table>
      </div><div class="modal-foot"><button type="button" class="btn gold" data-close>Yopish</button></div>`;
      ctx.openModal(`${MONTHS[mi]}: joriy yil va o‘tgan yil`, html, null, true);
    }

    // ---------- SAVDO TAHLILI (grafiklar ichi) ----------
    function renderSalesAnalysis(root, state) {
      const s = (st.tahlil = st.tahlil || { from: '2024-04-24', to: '2024-05-23', filial: null, g: null });
      if (s.filial === null || s.g !== state.branch.short) { s.filial = state.branch.short; s.g = state.branch.short; }
      const isAll = !state.branch.short;
      if (!isAll) s.filial = state.branch.short;
      const bf = s.filial ? BRANCH_FACTOR[s.filial] : 1;
      const from = new Date(s.from + 'T00:00');
      const to = new Date(s.to + 'T00:00');
      const days = [];
      for (let d = new Date(from); d <= to && days.length < 370; d.setDate(d.getDate() + 1)) days.push([new Date(d), daySales(d) * bf]);
      const total = days.reduce((a, d) => a + d[1], 0);
      const best = days.reduce((m, d) => (d[1] > m[1] ? d : m), days[0] || [from, 0]);
      const W = 1000, H = 260, L = 50, T = 20, Bm = 40;
      const max = Math.max(1, ...days.map((d) => d[1])) * 1.15;
      const x = (i) => L + (days.length <= 1 ? 0 : (i / (days.length - 1)) * (W - L - 20));
      const y = (v) => T + (H - T - Bm) - (v / max) * (H - T - Bm);
      const showLbl = days.length <= 45;
      const step = Math.ceil(days.length / 15);
      const line = days.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(d[1]).toFixed(1)}`).join(' ');
      const svg = `<svg viewBox="0 0 ${W} ${H}" class="big-chart">
        ${[0, 0.25, 0.5, 0.75, 1].map((k) => `<line x1="${L}" x2="${W - 10}" y1="${y(max * k)}" y2="${y(max * k)}" class="grid-line"/><text x="${L - 8}" y="${y(max * k) + 3}" class="ax" text-anchor="end">${Math.round((max * k) / 1e6)}M</text>`).join('')}
        <path d="${line} L ${x(days.length - 1)} ${y(0)} L ${x(0)} ${y(0)} Z" fill="rgba(58,111,224,.12)"/>
        <path d="${line}" fill="none" stroke="#3a6fe0" stroke-width="2"/>
        ${days.map((d, i) => `<circle cx="${x(i)}" cy="${y(d[1])}" r="3.2" fill="#3a6fe0"><title>${uz(d[0])}: ${fmt(d[1])} so‘m</title></circle>${showLbl && (i % step === 0 || i === days.length - 1) ? `<text x="${x(i)}" y="${y(d[1]) - 8}" class="ax val" text-anchor="middle">${Math.round(d[1] / 1e6)}M</text>` : ''}${i % step === 0 ? `<text x="${x(i)}" y="${H - 18}" class="ax" text-anchor="middle">${pad(d[0].getDate())}.${pad(d[0].getMonth() + 1)}</text>` : ''}`).join('')}
      </svg>`;
      root.innerHTML = `
        ${kpiHtml([['Davr savdosi', total, 'so‘m', '#2f6fed', 'trend'], ['Kunlik o‘rtacha', days.length ? total / days.length : 0, 'so‘m', '#1fa463', 'reports'], ['Eng yaxshi kun', best[1], 'so‘m', '#8b46d8', 'cart'], ['Kunlar', days.length, 'kun', '#f5b000', 'orders']], 1)}
        <div class="card panel">
          <div class="toolbar"><div class="card-title">KUNLIK SAVDO GRAFIGI (${uz(from)} — ${uz(to)})</div>
            <span class="muted" style="font-size:11.5px">Eng yaxshi kun: ${uz(best[0])}</span></div>
          <div class="filters">
            ${isAll ? `<label class="fsel"><span>Filial</span><select data-role="filial">${branchOpts(s.filial)}</select></label>` : `<span class="fixed-branch">Filial: <b>${s.filial}</b></span>`}
            <label class="fsel"><span>Dan</span><input type="date" data-role="from" value="${s.from}" /></label>
            <label class="fsel"><span>Gacha</span><input type="date" data-role="to" value="${s.to}" /></label>
            <span class="range-quick" style="margin:0">
              <button type="button" data-q="30">Oxirgi 30 kun</button><button type="button" data-q="m">Shu oy (1–31)</button><button type="button" data-q="pm">O‘tgan oy</button><button type="button" data-q="7">7 kun</button>
            </span>
          </div>
          <div style="padding:6px 16px 10px">${svg}</div>
        </div>
        <div class="card panel">
          <div class="toolbar"><div class="card-title">OYLAR BO‘YICHA SAVDO: JORIY YIL VA O‘TGAN YIL</div><span class="muted" style="font-size:11.5px">Oy ustiga bosing — savdo qayerdan kelgani, nima sotilgani va nima qolgani</span></div>
          <div class="dtable-wrap"><table class="dtable"><thead><tr><th>Oy</th><th class="r">Joriy yil (2024)</th><th class="r">O‘tgan yil (2023)</th><th class="r">Farq</th><th>Taqqoslash</th></tr></thead><tbody>
          ${MONTHLY.map(([c, pv], i) => { const cc = c * 1e6 * bf, pp = pv * 1e6 * bf, d = cc - pp; return `<tr class="clickable" data-m="${i}"><td class="strong">${MONTHS[i]}</td><td class="r strong">${fmt(cc)}</td><td class="r muted">${fmt(pp)}</td><td class="r ${d >= 0 ? 'pos' : 'neg'}">${d >= 0 ? '+' : ''}${fmt(d)} (${d >= 0 ? '+' : ''}${Math.round((d / pp) * 100)}%)</td><td><span class="cmpbar"><i class="c" style="width:${c / 10}%"></i><i class="p" style="width:${pv / 10}%"></i></span></td></tr>`; }).join('')}
          </tbody></table></div>
        </div>`;
      const rr = () => renderSalesAnalysis(root, state);
      const fs = root.querySelector('[data-role=filial]');
      if (fs) fs.addEventListener('change', (e) => { s.filial = e.target.value; rr(); });
      root.querySelector('[data-role=from]').addEventListener('change', (e) => { if (e.target.value) { s.from = e.target.value; if (s.from > s.to) s.to = s.from; rr(); } });
      root.querySelector('[data-role=to]').addEventListener('change', (e) => { if (e.target.value) { s.to = e.target.value; if (s.to < s.from) s.from = s.to; rr(); } });
      const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
      root.querySelectorAll('[data-q]').forEach((b) => b.addEventListener('click', () => {
        const r = REF();
        let a, z;
        if (b.dataset.q === 'm') { a = new Date(r.getFullYear(), r.getMonth(), 1); z = new Date(r.getFullYear(), r.getMonth() + 1, 0); }
        else if (b.dataset.q === 'pm') { a = new Date(r.getFullYear(), r.getMonth() - 1, 1); z = new Date(r.getFullYear(), r.getMonth(), 0); }
        else { z = r; a = new Date(r); a.setDate(a.getDate() - (+b.dataset.q - 1)); }
        s.from = iso(a); s.to = iso(z); rr();
      }));
      root.querySelectorAll('[data-m]').forEach((tr) => tr.addEventListener('click', () => monthDetail(+tr.dataset.m, s.filial)));
    }

    function exportCsv(p, rows) {
      const head = p.cols.map((c) => c[1]).join(';');
      const lines = rows.map((r) => p.cols.map((c) => String(valOf(c, r)).replace(/;/g, ',')).join(';'));
      const blob = new Blob(['﻿' + [head, ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${p.title}.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
      toast('Fayl yuklab olindi (Excel’da ochiladi)');
    }

    function fieldHtml(k, label, o, state) {
      if (o.form === 'product') return `<label class="fld">${label}<select name="${k}">${CATALOG.map((p) => `<option>${esc(p.nomi)}</option>`).join('')}</select></label>`;
      if (o.form === 'branch') return `<label class="fld">${label}<select name="${k}">${BRANCH_ROWS.map((b) => `<option ${b === state.branch.short ? 'selected' : ''}>${b}</option>`).join('')}</select></label>`;
      if (Array.isArray(o.form)) return `<label class="fld">${label}<select name="${k}">${o.form.map((x) => `<option>${x}</option>`).join('')}</select></label>`;
      const type = o.form === 'number' ? 'number' : o.form === 'date' ? 'date' : 'text';
      return `<label class="fld">${label}<input name="${k}" type="${type}" ${type === 'number' ? 'min="0"' : ''} required /></label>`;
    }

    function openAdd(key, p, s, draw, state) {
      const fields = p.cols.filter((c) => c[2] && c[2].form);
      const hint = key === 'savdo' ? '<div class="fld full hint-box">Tannarx mahsulotdan avtomatik olinadi. Sotuv narxi tannarxdan past bo‘lsa, savdo “Ziyonlar” bo‘limiga avtomatik tushadi.</div>' : '';
      const html = `<div class="form-grid">${fields.map(([k, label, o]) => fieldHtml(k, label, o, state)).join('')}${hint}</div>
        <div class="modal-foot"><button type="button" class="btn" data-close>Bekor qilish</button><button type="submit" class="btn gold">Saqlash</button></div>`;
      ctx.openModal(p.add, html, (fd) => {
        const row = {};
        p.cols.forEach(([k, , o = {}]) => {
          if (o.calc) return;
          let v = fd.get(k);
          if (v === null) v = defaults(k, key, p, s, state, row);
          else if (o.form === 'number') v = Number(v) || 0;
          else if (o.form === 'date' && v) { const [y, m, d] = v.split('-'); v = `${d}.${m}.${y}`; }
          row[k] = v;
        });
        if (key === 'ombor') Object.assign(row, { material: '—', olcham: '—', sotildi: 0 });
        s.rows.unshift(row);
        s.tab = 0;
        draw();
        if (key === 'savdo' && row.narx < row.tannarx) toast(`Ziyon: ${fmt((row.tannarx - row.narx) * row.soni)} so‘m — “Ziyonlar” bo‘limiga qo‘shildi`);
        else toast('Saqlandi ✓');
      });
    }

    function openPayment(s, draw) {
      const html = `<div class="form-grid">
        <label class="fld full">Mijoz<select name="i">${s.rows.map((r, i) => `<option value="${i}">${esc(r.mijoz)} — qarz ${fmt(r.jami - r.tolangan)}</option>`).join('')}</select></label>
        <label class="fld">Summa<input name="sum" type="number" min="1" required /></label>
        <label class="fld">To‘lov usuli<select name="usul"><option>Naqd</option><option>Terminal</option><option>Click/Payme</option></select></label>
      </div><div class="modal-foot"><button type="button" class="btn" data-close>Bekor qilish</button><button type="submit" class="btn gold">Qabul qilish</button></div>`;
      ctx.openModal('Qarz to‘lovini qabul qilish', html, (fd) => {
        const r = s.rows[+fd.get('i')];
        const sum = Math.min(Number(fd.get('sum')) || 0, r.jami - r.tolangan);
        r.tolangan += sum;
        if (r.jami - r.tolangan <= 0) s.rows.splice(s.rows.indexOf(r), 1);
        draw();
        toast(`${fmt(sum)} so‘m qabul qilindi ✓`);
      });
    }

    function defaults(k, key, p, s, state, row) {
      const now = REF();
      const today = uz(now);
      const next = (prefix) => {
        const nums = s.rows.map((r) => Number(String(r[k] || '').replace(/\D/g, ''))).filter(Boolean);
        return `${prefix}-${String(Math.max(0, ...nums) + 1).padStart(4, '0')}`;
      };
      switch (k) {
        case 'chek': return next('S');
        case 'no': return next('B');
        case 'sana': return key === 'savdo' ? `${today} ${pad(new Date().getHours())}:${pad(new Date().getMinutes())}` : today;
        case 'filial': return state.branch.short || 'Chilonzor';
        case 'tannarx': return (byName(row.mahsulot) || {}).tannarx || 0;
        case 'holat': return p.tabs && typeof p.tabs[0] === 'string' ? p.tabs[0] : 'Faol';
        case 'tolangan': case 'bosqich': case 'progress': case 'xarid': case 'qarz': case 'jami': return 0;
        case 'buyurtma': return 0;
        case 'qabul': case 'oxirgi': return today;
        case 'tel': return '—';
        default: return '';
      }
    }

    // ---------- KASSA ----------
    function renderCash(root, state) {
      const s = (st.kassa = st.kassa || { filial: null, g: null, usul: '', turi: '' });
      if (s.filial === null || s.g !== state.branch.short) { s.filial = state.branch.short; s.g = state.branch.short; }
      if (state.branch.short) s.filial = state.branch.short;
      const f = s.filial ? BRANCH_FACTOR[s.filial] : 1;
      const T = Object.fromEntries(Object.entries(CASH_TOTAL).map(([k, v]) => [k, v * f]));
      const kirim = T.naqd + T.karta + T.click;
      const qoldiq = T.boshi + kirim - T.chiqim;
      const naqdQ = T.boshi + T.naqd - T.chiqim;
      const rowsB = BRANCH_ROWS.map((b) => {
        const k = BRANCH_FACTOR[b];
        return { b, naqd: CASH_TOTAL.naqd * k, karta: CASH_TOTAL.karta * k, click: CASH_TOTAL.click * k, chiqim: CASH_TOTAL.chiqim * k, boshi: CASH_TOTAL.boshi * k };
      });
      root.innerHTML = `
        ${kpiHtml([['Kassa qoldig‘i', qoldiq, 'so‘m', '#f5b000', 'register'], ['Naqd pul (kassada)', naqdQ, 'so‘m', '#1fa463', 'money'], ['Karta / terminal', T.karta, 'so‘m', '#2f6fed', 'cart'], ['Click / Payme', T.click, 'so‘m', '#8b46d8', 'coin']], 1)}
        <div class="card panel">
          <div class="toolbar"><div class="card-title">KASSA — ${s.filial ? s.filial.toUpperCase() + ' FILIALI' : 'BARCHA FILIALLAR'} (BUGUN)</div></div>
          <div class="filters">${state.branch.short ? `<span class="fixed-branch">Filial: <b>${s.filial}</b></span>` : `<label class="fsel"><span>Filial</span><select data-role="filial">${branchOpts(s.filial)}</select></label>`}</div>
          <div class="cash-grid">
            ${[['Kun boshidagi qoldiq', T.boshi, ''], ['Naqd tushum', T.naqd, 'pos'], ['Karta / terminal tushum', T.karta, 'pos'], ['Click / Payme tushum', T.click, 'pos'], ['Jami tushum', kirim, 'pos'], ['Chiqim (xarajatlar)', -T.chiqim, 'neg'], ['Kassa qoldig‘i', qoldiq, 'blue']]
              .map(([k, v, c]) => `<div class="cg-item ${c}"><span>${k}</span><b>${fmt(v)}</b></div>`).join('')}
          </div>
        </div>
        <div class="card panel">
          <div class="toolbar"><div class="card-title">FILIALLAR BO‘YICHA KASSA</div></div>
          <div class="dtable-wrap"><table class="dtable"><thead><tr><th>Filial</th><th class="r">Kun boshi</th><th class="r">Naqd</th><th class="r">Karta / terminal</th><th class="r">Click / Payme</th><th class="r">Jami tushum</th><th class="r">Chiqim</th><th class="r">Qoldiq</th></tr></thead>
          <tbody>${rowsB.map((r) => `<tr class="clickable${s.filial === r.b ? ' sel' : ''}" data-b="${r.b}"><td class="strong">${r.b}</td><td class="r">${fmt(r.boshi)}</td><td class="r">${fmt(r.naqd)}</td><td class="r">${fmt(r.karta)}</td><td class="r">${fmt(r.click)}</td><td class="r pos">${fmt(r.naqd + r.karta + r.click)}</td><td class="r neg">-${fmt(r.chiqim)}</td><td class="r strong">${fmt(r.boshi + r.naqd + r.karta + r.click - r.chiqim)}</td></tr>`).join('')}</tbody>
          <tfoot><tr><td class="strong">Jami</td><td class="r strong">${fmt(CASH_TOTAL.boshi)}</td><td class="r strong">${fmt(CASH_TOTAL.naqd)}</td><td class="r strong">${fmt(CASH_TOTAL.karta)}</td><td class="r strong">${fmt(CASH_TOTAL.click)}</td><td class="r strong">${fmt(CASH_TOTAL.naqd + CASH_TOTAL.karta + CASH_TOTAL.click)}</td><td class="r strong">-${fmt(CASH_TOTAL.chiqim)}</td><td class="r strong">${fmt(CASH_TOTAL.boshi + CASH_TOTAL.naqd + CASH_TOTAL.karta + CASH_TOTAL.click - CASH_TOTAL.chiqim)}</td></tr></tfoot></table></div>
        </div>
        <div class="card panel">
          <div class="toolbar"><div class="card-title">BUGUNGI KASSA AMALLARI</div>
            <label class="fsel inline"><select data-role="turi"><option value="">Kirim va chiqim</option><option ${s.turi === 'Kirim' ? 'selected' : ''}>Kirim</option><option ${s.turi === 'Chiqim' ? 'selected' : ''}>Chiqim</option></select></label>
            <label class="fsel inline"><select data-role="usul"><option value="">Barcha usullar</option>${['Naqd', 'Terminal', 'Click/Payme'].map((u) => `<option ${s.usul === u ? 'selected' : ''}>${u}</option>`).join('')}</select></label>
          </div>
          <div class="dtable-wrap"><table class="dtable"><thead><tr><th>Vaqt</th><th>Filial</th><th>Turi</th><th>Usul</th><th>Izoh</th><th class="r">Summa</th></tr></thead><tbody>
          ${CASH_OPS.filter((o) => (!s.filial || o.filial === s.filial) && (!s.usul || o.usul === s.usul) && (!s.turi || o.turi === s.turi))
            .map((o) => `<tr><td class="muted">${o.vaqt}</td><td>${o.filial}</td><td><span class="badge ${B[o.turi]}">${o.turi}</span></td><td><span class="badge ${B[o.usul]}">${o.usul}</span></td><td>${esc(o.izoh)}</td><td class="r ${o.turi === 'Kirim' ? 'pos' : 'neg'}">${o.turi === 'Kirim' ? '+' : '-'}${fmt(o.summa)}</td></tr>`)
            .join('') || '<tr class="empty-row"><td colspan="6">Amallar yo‘q</td></tr>'}
          </tbody></table></div>
        </div>`;
      const rr = () => renderCash(root, state);
      const fsl = root.querySelector('[data-role=filial]');
      if (fsl) fsl.addEventListener('change', (e) => { s.filial = e.target.value; rr(); });
      root.querySelector('[data-role=turi]').addEventListener('change', (e) => { s.turi = e.target.value; rr(); });
      root.querySelector('[data-role=usul]').addEventListener('change', (e) => { s.usul = e.target.value; rr(); });
      if (!state.branch.short) root.querySelectorAll('[data-b]').forEach((tr) => tr.addEventListener('click', () => { s.filial = s.filial === tr.dataset.b ? '' : tr.dataset.b; rr(); }));
    }

    // ---------- XARAJATLAR ----------
    function renderExpenses(root, state) {
      const s = (st.xarajat = st.xarajat || { filial: null, g: null, rows: EXPENSES.map((e) => ({ ...e })), from: '', to: '' });
      if (s.filial === null || s.g !== state.branch.short) { s.filial = state.branch.short; s.g = state.branch.short; }
      if (state.branch.short) s.filial = state.branch.short;
      const lf = s.filial ? BRANCH_FACTOR[s.filial] : 1;
      const rows = s.rows.filter((r) => {
        if (s.filial && r.filial !== s.filial) return false;
        const d = toDate(r.sana);
        if (s.from && d < new Date(s.from + 'T00:00')) return false;
        if (s.to && d > new Date(s.to + 'T00:00')) return false;
        return true;
      });
      const cats = EXP_CATS.map(([k]) => {
        const limit = Math.round(expState.limits[k] * lf);
        const spent = rows.filter((r) => r.kategoriya === k).reduce((a, r) => a + r.summa, 0);
        const pct = limit ? Math.round((spent / limit) * 100) : 0;
        const holat = pct > 100 ? 'Limitdan oshdi' : pct >= 90 ? 'Limitga yaqin' : 'Limit ichida';
        return { k, limit, spent, pct, holat, diff: limit - spent };
      });
      const tl = cats.reduce((a, c) => a + c.limit, 0);
      const ts = cats.reduce((a, c) => a + c.spent, 0);
      const over = cats.filter((c) => c.pct > 100);
      root.innerHTML = `
        ${kpiHtml([['Oylik limit', tl, 'so‘m', '#2f6fed', 'orders'], ['Sarflandi', ts, 'so‘m', '#f5b000', 'coin'], [tl - ts >= 0 ? 'Tejaldi (qoldiq)' : 'Limitdan oshdi', Math.abs(tl - ts), 'so‘m', tl - ts >= 0 ? '#1fa463' : '#ef4f4f', 'trend'], ['Limitdan oshgan kategoriya', over.length, 'ta', '#ef4f4f', 'reports']], 1)}
        ${over.length ? `<div class="alert">⚠ Limitdan oshgan: ${over.map((c) => `<b>${c.k}</b> (+${fmt(-c.diff)} so‘m)`).join(', ')}</div>` : ''}
        <div class="card panel">
          <div class="toolbar"><div class="card-title">XARAJAT KATEGORIYALARI VA LIMITLAR (MAY)</div>
            <button class="btn gold" type="button" data-role="add"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Xarajat qo‘shish</button></div>
          <div class="filters">
            ${state.branch.short ? `<span class="fixed-branch">Filial: <b>${s.filial}</b></span>` : `<label class="fsel"><span>Filial</span><select data-role="filial">${branchOpts(s.filial)}</select></label>`}
            <label class="fsel"><span>Sana: dan</span><input type="date" data-role="from" value="${s.from}" /></label>
            <label class="fsel"><span>gacha</span><input type="date" data-role="to" value="${s.to}" /></label>
          </div>
          <div class="note">Kategoriya ustiga bosing — batafsil xarajatlar va limitni o‘zgartirish oynasi ochiladi.</div>
          <div class="dtable-wrap"><table class="dtable"><thead><tr><th>Kategoriya</th><th class="r">Limit</th><th class="r">Sarflandi</th><th>Ishlatildi</th><th class="r">Qoldiq / oshdi</th><th>Holat</th></tr></thead><tbody>
          ${cats.map((c) => `<tr class="clickable" data-cat="${esc(c.k)}"><td class="strong">${c.k}</td><td class="r">${fmt(c.limit)}</td><td class="r">${fmt(c.spent)}</td>
            <td><span class="progress ${c.pct > 100 ? 'over' : c.pct >= 90 ? 'near' : ''}"><i style="width:${Math.min(100, c.pct)}%"></i></span>${c.pct}%</td>
            <td class="r ${c.diff < 0 ? 'neg' : 'pos'}">${c.diff < 0 ? '+' + fmt(-c.diff) + ' oshdi' : fmt(c.diff) + ' tejaldi'}</td><td><span class="badge ${B[c.holat]}">${c.holat}</span></td></tr>`).join('')}
          </tbody><tfoot><tr><td class="strong">Jami</td><td class="r strong">${fmt(tl)}</td><td class="r strong">${fmt(ts)}</td><td></td><td class="r strong ${tl - ts < 0 ? 'neg' : 'pos'}">${fmt(tl - ts)}</td><td></td></tr></tfoot></table></div>
        </div>
        <div class="card panel">
          <div class="toolbar"><div class="card-title">OXIRGI XARAJATLAR</div></div>
          <div class="dtable-wrap"><table class="dtable"><thead><tr><th>Sana</th><th>Kategoriya</th><th>Filial</th><th>Izoh</th><th class="r">Summa</th></tr></thead><tbody>
          ${[...rows].sort((a, b) => toDate(b.sana) - toDate(a.sana)).map((r) => `<tr><td class="muted">${r.sana}</td><td>${r.kategoriya}</td><td>${r.filial}</td><td>${esc(r.izoh)}</td><td class="r neg">${fmt(r.summa)}</td></tr>`).join('') || '<tr class="empty-row"><td colspan="5">Xarajat yo‘q</td></tr>'}
          </tbody></table></div>
        </div>`;
      const rr = () => renderExpenses(root, state);
      const fsl = root.querySelector('[data-role=filial]');
      if (fsl) fsl.addEventListener('change', (e) => { s.filial = e.target.value; rr(); });
      root.querySelector('[data-role=from]').addEventListener('change', (e) => { s.from = e.target.value; rr(); });
      root.querySelector('[data-role=to]').addEventListener('change', (e) => { s.to = e.target.value; rr(); });
      root.querySelector('[data-role=add]').addEventListener('click', () => {
        const html = `<div class="form-grid">
          <label class="fld">Kategoriya<select name="kategoriya">${EXP_CATS.map(([k]) => `<option>${k}</option>`).join('')}</select></label>
          <label class="fld">Filial<select name="filial">${BRANCH_ROWS.map((b) => `<option ${b === s.filial ? 'selected' : ''}>${b}</option>`).join('')}</select></label>
          <label class="fld">Summa<input name="summa" type="number" min="1" required /></label>
          <label class="fld">Sana<input name="sana" type="date" value="2024-05-23" required /></label>
          <label class="fld full">Izoh<input name="izoh" type="text" /></label>
        </div><div class="modal-foot"><button type="button" class="btn" data-close>Bekor qilish</button><button type="submit" class="btn gold">Saqlash</button></div>`;
        ctx.openModal('Xarajat qo‘shish', html, (fd) => {
          const [y, m, d] = fd.get('sana').split('-');
          s.rows.unshift({ sana: `${d}.${m}.${y}`, kategoriya: fd.get('kategoriya'), filial: fd.get('filial'), summa: Number(fd.get('summa')) || 0, izoh: fd.get('izoh') || '—' });
          rr();
          const c = EXP_CATS.find(([k]) => k === fd.get('kategoriya'))[0];
          const spent = s.rows.filter((r) => r.kategoriya === c).reduce((a, r) => a + r.summa, 0);
          toast(spent > expState.limits[c] ? `⚠ “${c}” limitdan oshib ketdi!` : 'Xarajat saqlandi ✓');
        });
      });
      root.querySelectorAll('[data-cat]').forEach((tr) =>
        tr.addEventListener('click', () => {
          const c = cats.find((x) => x.k === tr.dataset.cat);
          const list = rows.filter((r) => r.kategoriya === c.k);
          const html = `<div class="pd">
            <div class="dl-row"><span>Oylik limit (umumiy)</span><b>${fmt(expState.limits[c.k])} so‘m</b></div>
            <div class="dl-row"><span>Sarflandi${s.filial ? ' (' + s.filial + ')' : ''}</span><b>${fmt(c.spent)} so‘m</b></div>
            <div class="dl-row"><span>Holat</span><b class="${c.diff < 0 ? 'neg' : 'pos'}">${c.holat} — ${c.diff < 0 ? fmt(-c.diff) + ' so‘m oshdi' : fmt(c.diff) + ' so‘m tejaldi'} (${c.pct}%)</b></div>
            <table class="dtable" style="margin-top:12px"><thead><tr><th>Sana</th><th>Filial</th><th>Izoh</th><th class="r">Summa</th></tr></thead><tbody>
            ${list.map((r) => `<tr><td class="muted">${r.sana}</td><td>${r.filial}</td><td>${esc(r.izoh)}</td><td class="r">${fmt(r.summa)}</td></tr>`).join('') || '<tr class="empty-row"><td colspan="4">Xarajat yo‘q</td></tr>'}
            </tbody></table>
            <label class="fld" style="margin-top:14px">Yangi oylik limit (so‘m)<input name="limit" type="number" min="0" value="${expState.limits[c.k]}" /></label>
          </div>
          <div class="modal-foot"><button type="button" class="btn" data-close>Yopish</button><button type="submit" class="btn gold">Limitni saqlash</button></div>`;
          ctx.openModal(`${c.k} — batafsil`, html, (fd) => {
            expState.limits[c.k] = Number(fd.get('limit')) || 0;
            rr();
            toast('Limit yangilandi ✓');
          });
        }),
      );
    }

    // ---------- HISOBOTLAR ----------
    function renderReports(root, state) {
      const f = state.branch.factor;
      const months = [['Yan', 520], ['Feb', 935], ['Mar', 615], ['Apr', 460], ['May', 700], ['Iyun', 565], ['Iyul', 535], ['Avg', 400], ['Sen', 345], ['Okt', 320], ['Noy', 600], ['Dek', 440]];
      const reports = [
        ['Savdo hisoboti', 'Kunlar, mahsulotlar va sotuvchilar kesimida savdo tahlili.', I.savdo, 'top-sotilgan'],
        ['Foyda va zarar', 'Tushum, tannarx, xarajatlar va sof foyda.', I.trend, 'top-foydali'],
        ['Ombor hisoboti', 'Tannarxdagi qoldiq, 30/60/90 kun sotilmagan tovarlar.', I.warehouse, 'ombor'],
        ['Ziyonlar hisoboti', 'Tannarxdan arzon sotilgan tovarlar va sabablari.', I.coin, 'ziyon'],
        ['Qarzdorlik hisoboti', 'Mijozlar qarzi, kechikish kunlari.', I.users, 'qarzdorlik'],
        ['Kassa hisoboti', 'Naqd, terminal va Click/Payme bo‘yicha pul oqimi.', I.register, 'kassa'],
        ['Xarajatlar hisoboti', 'Kategoriyalar bo‘yicha limit va sarf.', I.orders, 'xarajatlar'],
        ['Ta’minotchilar hisoboti', 'Xaridlar va ta’minotchilarga qarz.', I.truck, 'taminotchilar'],
        ['Materiallar sarfi', 'Xomashyo va furnitura qoldig‘i.', I.materials, 'materiallar'],
      ];
      const max = Math.max(...months.map((m) => m[1]));
      root.innerHTML = `
        ${kpiHtml([['Yillik savdo', 6535000000, 'so‘m', '#2f6fed', 'reports'], ['Yillik sof foyda', 1438000000, 'so‘m', '#1fa463', 'trend'], ['Rentabellik', 22, '%', '#8b46d8', 'coin'], ['Buyurtmalar (yil)', 684, 'ta', '#f5b000', 'orders']], f)}
        <div class="grid-2">
          <div class="card"><div class="card-title">OYLAR BO‘YICHA SAVDO (MLN SO‘M)</div>
            <div class="mini-bars" style="margin-bottom:22px">${months.map(([m, v]) => `<div style="height:${(v / max) * 100}%" title="${m}: ${fmt(v * f)} mln so‘m"><span>${m}</span></div>`).join('')}</div></div>
          <div class="card"><div class="card-title">FILIALLAR BO‘YICHA ULUSH (OY)</div>
            <table class="tbl" style="font-size:12px"><thead><tr><th>Filial</th><th class="r">Savdo</th><th class="r">Ulush</th></tr></thead>
            <tbody>${BRANCH_ROWS.map((n) => `<tr><td>${n}</td><td class="r">${fmt(845250000 * BRANCH_FACTOR[n])}</td><td class="r"><span class="progress" style="width:70px"><i style="width:${BRANCH_FACTOR[n] * 220}%"></i></span>${Math.round(BRANCH_FACTOR[n] * 100)}%</td></tr>`).join('')}</tbody></table></div>
        </div>
        <div class="grid-3">${reports.map(([t, d, ic, go]) => `<div class="card report-card">
            <div class="kpi-icon" style="background:#f5efe3"><svg viewBox="0 0 24 24" style="stroke:#8d7142">${ic}</svg></div>
            <h4>${t}</h4><p>${d}</p>
            <div class="btns"><button class="btn" type="button" data-go="${go}">Ko‘rish</button><button class="btn gold" type="button" data-rep="${t}"><svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>Yuklab olish</button></div>
          </div>`).join('')}</div>`;
      root.querySelectorAll('[data-rep]').forEach((b) => b.addEventListener('click', () => toast(`“${b.dataset.rep}” tayyorlanmoqda (namuna)`)));
    }

    // ---------- SOZLAMALAR ----------
    function renderSettings(root) {
      root.innerHTML = `
        <div class="grid-2" style="margin-top:0">
          <div class="card panel" style="margin-top:0">
            <div class="toolbar"><div class="card-title">KORXONA MA’LUMOTLARI</div></div>
            <form class="form-grid" id="company-form">
              <label class="fld full">Korxona nomi<input value="Gold 777 Mebel korxonasi" /></label>
              <label class="fld">Telefon<input value="+998 90 123 77 79" /></label>
              <label class="fld">Valyuta<select><option>so‘m (UZS)</option><option>AQSh dollari (USD)</option></select></label>
              <label class="fld">STIR (INN)<input value="305 123 456" /></label>
              <label class="fld">Ish vaqti<input value="09:00 – 19:00" /></label>
              <label class="fld">Eskirgan tovar chegarasi<select><option>90 kun</option><option>60 kun</option><option>120 kun</option></select></label>
              <label class="fld">Ziyonli savdoga ruxsat<select><option>Faqat rahbar tasdig‘i bilan</option><option>Ruxsat etilgan</option><option>Taqiqlangan</option></select></label>
              <label class="fld full">Manzil<textarea>Toshkent sh., Chilonzor tumani, Bunyodkor ko‘chasi 7</textarea></label>
              <div class="fld full" style="flex-direction:row;justify-content:flex-end"><button class="btn gold" type="submit">Saqlash</button></div>
            </form>
          </div>
          <div class="card panel" style="margin-top:0">
            <div class="toolbar"><div class="card-title">TIZIM SOZLAMALARI</div></div>
            ${[
              ['Kam qolgan materiallar haqida ogohlantirish', 'Minimal miqdordan kam qolganda bildirishnoma', true],
              ['Xarajat limiti oshganda ogohlantirish', 'Kategoriya limitining 90% va 100% da', true],
              ['Ziyonli savdo haqida xabar', 'Tannarxdan arzon sotilganda rahbarga', true],
              ['Qarz muddati eslatmasi', 'Muddatiga 3 kun qolganda mijozga SMS', true],
              ['Kunlik hisobot Telegram’ga', 'Har kuni 20:00 da rahbarga yuboriladi', false],
              ['Ikki bosqichli kirish', 'Kirishda SMS kod so‘raladi', false],
            ].map(([t, d, on]) => `<div class="switch-row"><div>${t}<small>${d}</small></div><label class="sw"><input type="checkbox" ${on ? 'checked' : ''} /><span></span></label></div>`).join('')}
          </div>
        </div>
        <div class="card panel">
          <div class="toolbar"><div class="card-title">FILIALLAR</div><button class="btn gold" type="button" id="add-branch"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Filial qo‘shish</button></div>
          <div class="dtable-wrap"><table class="dtable"><thead><tr><th>Filial</th><th>Manzil</th><th>Mas’ul</th><th>Telefon</th><th class="r">Xodimlar</th><th>Holat</th></tr></thead>
          <tbody>${ctx.BRANCHES.filter((b) => b.short).map((b) => `<tr><td class="strong">${b.name}</td><td class="muted">${b.addr}</td><td>${b.boss}</td><td class="muted">${b.tel}</td><td class="r">${b.staff}</td><td><span class="badge b-green">Faol</span></td></tr>`).join('')}</tbody></table></div>
        </div>
        <div class="card panel">
          <div class="toolbar"><div class="card-title">FOYDALANUVCHILAR VA ROLLAR</div></div>
          <div class="dtable-wrap"><table class="dtable"><thead><tr><th>Foydalanuvchi</th><th>Rol</th><th>Filial</th><th>Oxirgi kirish</th></tr></thead><tbody>
          ${[['Admin', 'Rahbar', 'Barcha filiallar', '23.05.2024 10:30'], ['Toshmatova Zarina', 'Buxgalter', 'Chilonzor', '23.05.2024 09:05'], ['Yusupova Madina', 'Sotuvchi', 'Yunusobod', '22.05.2024 18:40'], ['Abdullayeva Shahnoza', 'Kassir', 'Samarqand', '22.05.2024 18:02'], ['Qodirov Bobur', 'Omborchi', 'Samarqand', '21.05.2024 17:12']]
            .map((u) => `<tr><td><span class="avatar-s">${initials(u[0])}</span>${u[0]}</td><td><span class="badge b-purple">${u[1]}</span></td><td>${u[2]}</td><td class="muted">${u[3]}</td></tr>`).join('')}
          </tbody></table></div>
        </div>`;
      root.querySelector('#company-form').addEventListener('submit', (e) => { e.preventDefault(); toast('Sozlamalar saqlandi ✓'); });
      root.querySelector('#add-branch').addEventListener('click', () => toast('Yangi filial qo‘shish (namuna)'));
    }

    // modal ichidagi mahsulot havolalari
    document.addEventListener('click', (e) => {
      const pl = e.target.closest('#modal [data-product]');
      if (pl) { e.preventDefault(); productDetail(pl.dataset.product); }
    });

    return { renderPage, PAGES, productDetail, monthDetail };
  }

  return { create, BRANCH_ROWS, topSold, topProfit, DEBTORS, overdue, CASH_TOTAL, BRANCH_FACTOR };
})();
