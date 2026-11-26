/* Gold 777 — ichki bo'limlar (namuna ma'lumotlar) */
window.G777Pages = (function () {
  'use strict';

  const B = {
    // badge ranglari
    'Yangi': 'b-blue', 'Ishlab chiqarilmoqda': 'b-yellow', 'Tayyor': 'b-green', 'Yetkazilmoqda': 'b-purple', 'Topshirildi': 'b-teal',
    'To‘langan': 'b-green', 'Qisman': 'b-yellow', 'Nasiya': 'b-red', 'Qaytarilgan': 'b-gray',
    'Naqd': 'b-green', 'Karta': 'b-blue', 'Click/Payme': 'b-teal',
    'Yetarli': 'b-green', 'Kam qolgan': 'b-red', 'Tugagan': 'b-gray', 'Buyurtma berilgan': 'b-blue',
    'Kutilmoqda': 'b-yellow', 'Yo‘lda': 'b-purple', 'Yetkazildi': 'b-green', 'Kechikmoqda': 'b-red',
    'Muddatida': 'b-green', 'Muddati yaqin': 'b-yellow', 'Muddati o‘tgan': 'b-red',
    'Ishda': 'b-green', 'Ta‘tilda': 'b-yellow', 'Kasal': 'b-gray',
    'Faol': 'b-green', 'Doimiy': 'b-purple', 'Qarzdor': 'b-red',
    'Jarayonda': 'b-yellow', 'Kechikayotgan': 'b-red',
  };

  const BRANCH_ROWS = ['Chilonzor', 'Yunusobod', 'Sergeli', 'Samarqand'];

  const PAGES = {
    savdo: {
      title: 'Savdo',
      sub: 'Kunlik savdo va cheklar',
      kpis: [
        ['Bugungi savdo', 35780000, 'so‘m', '#2f6fed', 'cart'],
        ['Cheklar soni', 14, 'ta', '#1fa463', 'savdo'],
        ['O‘rtacha chek', 2555714, 'so‘m', '#8b46d8', 'trend'],
        ['Qaytarishlar', 1, 'ta', '#ef4f4f', 'coin'],
      ],
      table: 'Savdolar ro‘yxati',
      tabKey: 'tolov',
      tabs: ['Naqd', 'Karta', 'Click/Payme', 'Nasiya'],
      add: 'Yangi savdo',
      cols: [
        ['chek', 'Chek №', { strong: 1 }],
        ['sana', 'Sana', { muted: 1 }],
        ['mijoz', 'Mijoz', { form: 1 }],
        ['mahsulot', 'Mahsulot', { form: 1 }],
        ['filial', 'Filial'],
        ['tolov', 'To‘lov turi', { badge: 1, form: ['Naqd', 'Karta', 'Click/Payme', 'Nasiya'] }],
        ['summa', 'Summa', { money: 1, r: 1, form: 'number' }],
        ['holat', 'Holat', { badge: 1 }],
      ],
      rows: [
        ['S-1458', '23.05.2024 10:12', 'Rustamov Aziz', 'Oshxona mebeli “LUX-1”', 'Chilonzor', 'Karta', 6000000, 'To‘langan'],
        ['S-1457', '23.05.2024 09:48', 'Saidova Malika', 'Shkaf-kupe “Gold 2400”', 'Yunusobod', 'Naqd', 6000000, 'To‘langan'],
        ['S-1456', '23.05.2024 09:30', 'Karimov Dilshod', 'Yotoqxona “Classic”', 'Chilonzor', 'Nasiya', 6000000, 'Qisman'],
        ['S-1455', '22.05.2024 18:05', 'Abdullaev Oybek', 'Bolalar xonasi “Kids-1”', 'Sergeli', 'Click/Payme', 6000000, 'To‘langan'],
        ['S-1454', '22.05.2024 17:22', 'Qosimov Murod', 'Ofis mebeli “Optima”', 'Samarqand', 'Karta', 4400000, 'To‘langan'],
        ['S-1453', '22.05.2024 15:40', 'Jumanazarov Baxodir', 'Oshxona mebeli “Modern”', 'Chilonzor', 'Nasiya', 6000000, 'Nasiya'],
        ['S-1452', '22.05.2024 12:15', 'Mirzayeva Nargiza', 'Stol-stul to‘plami', 'Yunusobod', 'Naqd', 3200000, 'To‘langan'],
        ['S-1451', '21.05.2024 19:02', 'Tursunov Jasur', 'Yumshoq mebel “Comfort”', 'Sergeli', 'Karta', 7400000, 'Qaytarilgan'],
        ['S-1450', '21.05.2024 16:47', 'Ergasheva Dilnoza', 'Shkaf-kupe “Premium”', 'Samarqand', 'Click/Payme', 9800000, 'To‘langan'],
      ],
    },

    buyurtmalar: {
      title: 'Buyurtmalar',
      sub: 'Buyurtmalar va ularning holati',
      kpis: [
        ['Yangi buyurtmalar', 12, 'ta', '#2f6fed', 'orders'],
        ['Ishlab chiqarilmoqda', 18, 'ta', '#f5b000', 'gear'],
        ['Tayyor', 9, 'ta', '#1fa463', 'check'],
        ['Yetkazilmoqda', 7, 'ta', '#8b46d8', 'van'],
      ],
      table: 'Buyurtmalar ro‘yxati',
      tabKey: 'holat',
      tabs: ['Yangi', 'Ishlab chiqarilmoqda', 'Tayyor', 'Yetkazilmoqda', 'Topshirildi'],
      add: 'Yangi buyurtma',
      cols: [
        ['no', 'Buyurtma №', { strong: 1 }],
        ['mijoz', 'Mijoz', { form: 1 }],
        ['mahsulot', 'Mahsulot', { form: 1 }],
        ['filial', 'Filial'],
        ['sana', 'Qabul qilingan', { muted: 1 }],
        ['muddat', 'Topshirish', { form: 'date' }],
        ['summa', 'Summa', { money: 1, r: 1, form: 'number' }],
        ['tolangan', 'To‘langan', { money: 1, r: 1, form: 'number' }],
        ['holat', 'Holat', { badge: 1 }],
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
        ['B-0041', 'Yo‘ldosheva Sevara', 'Yotoqxona “Classic”', 'Samarqand', '02.05.2024', '18.05.2024', 13600000, 13600000, 'Topshirildi'],
      ],
    },

    ishlab: {
      title: 'Ishlab chiqarish',
      sub: 'Sexdagi buyurtmalar va bosqichlar',
      kpis: [
        ['Jarayonda', 18, 'ta', '#f5b000', 'factory'],
        ['Bugun tugaydi', 3, 'ta', '#1fa463', 'check'],
        ['Kechikayotgan', 2, 'ta', '#ef4f4f', 'orders'],
        ['Sex yuklamasi', 78, '%', '#2f6fed', 'reports'],
      ],
      table: 'Ishlab chiqarish rejasi',
      tabKey: 'holat',
      tabs: ['Jarayonda', 'Kechikayotgan', 'Tayyor'],
      add: 'Ishga tushirish',
      note: 'Bosqichlar: Kesish → Kromka → Teshish → Yig‘ish → Qadoqlash',
      cols: [
        ['no', 'Buyurtma №', { strong: 1, form: 1 }],
        ['mahsulot', 'Mahsulot', { form: 1 }],
        ['sex', 'Sex', { form: ['1-sex (Korpus)', '2-sex (Yumshoq)', '3-sex (Bo‘yoq)'] }],
        ['usta', 'Mas’ul usta', { form: 1 }],
        ['muddat', 'Muddat', { form: 'date' }],
        ['bosqich', 'Bosqich', { stage: 1 }],
        ['progress', 'Bajarildi', { progress: 1 }],
        ['holat', 'Holat', { badge: 1 }],
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
      title: 'Ombor',
      sub: 'Tayyor mahsulotlar qoldig‘i',
      kpis: [
        ['Mahsulot turlari', 46, 'ta', '#2f6fed', 'warehouse'],
        ['Jami qoldiq', 312, 'dona', '#1fa463', 'savdo'],
        ['Ombor qiymati', 1845600000, 'so‘m', '#8b46d8', 'coin'],
        ['Kam qolgan', 6, 'ta', '#ef4f4f', 'orders'],
      ],
      table: 'Ombordagi mahsulotlar',
      tabKey: 'kategoriya',
      tabs: ['Oshxona', 'Yotoqxona', 'Shkaf-kupe', 'Bolalar', 'Ofis', 'Yumshoq'],
      add: 'Mahsulot qo‘shish',
      cols: [
        ['kod', 'Kod', { muted: 1, form: 1 }],
        ['nomi', 'Mahsulot nomi', { strong: 1, form: 1 }],
        ['kategoriya', 'Kategoriya', { form: ['Oshxona', 'Yotoqxona', 'Shkaf-kupe', 'Bolalar', 'Ofis', 'Yumshoq'] }],
        ['qoldiq', 'Qoldiq', { r: 1, form: 'number', suffix: ' dona' }],
        ['narx', 'Sotuv narxi', { money: 1, r: 1, form: 'number' }],
        ['summa', 'Jami qiymat', { money: 1, r: 1, calc: (r) => r.qoldiq * r.narx }],
        ['holat', 'Holat', { badge: 1, calc: (r) => (r.qoldiq === 0 ? 'Tugagan' : r.qoldiq <= 3 ? 'Kam qolgan' : 'Yetarli') }],
      ],
      rows: [
        ['OSH-001', 'Oshxona mebeli “LUX-1”', 'Oshxona', 8, 6000000],
        ['OSH-002', 'Oshxona mebeli “Modern”', 'Oshxona', 5, 6000000],
        ['YOT-011', 'Yotoqxona “Classic”', 'Yotoqxona', 3, 6000000],
        ['YOT-012', 'Yotoqxona “Milano”', 'Yotoqxona', 6, 12900000],
        ['SHK-021', 'Shkaf-kupe “Gold 2400”', 'Shkaf-kupe', 11, 6000000],
        ['SHK-022', 'Shkaf-kupe “Premium”', 'Shkaf-kupe', 2, 9800000],
        ['BOL-031', 'Bolalar xonasi “Kids-1”', 'Bolalar', 4, 6000000],
        ['OFS-041', 'Ofis mebeli “Optima”', 'Ofis', 14, 4400000],
        ['YUM-051', 'Yumshoq mebel “Comfort”', 'Yumshoq', 0, 7400000],
      ],
    },

    materiallar: {
      title: 'Materiallar',
      sub: 'Xomashyo va furnitura qoldig‘i',
      kpis: [
        ['Material turlari', 128, 'ta', '#2f6fed', 'materials'],
        ['Kam qolgan', 5, 'ta', '#ef4f4f', 'orders'],
        ['Ombor qiymati', 286400000, 'so‘m', '#8b46d8', 'coin'],
        ['Shu oy kirim', 74300000, 'so‘m', '#1fa463', 'truck'],
      ],
      table: 'Materiallar ro‘yxati',
      tabKey: 'holat',
      tabs: ['Kam qolgan', 'Yetarli', 'Buyurtma berilgan'],
      add: 'Material kirimi',
      cols: [
        ['nomi', 'Material nomi', { strong: 1, form: 1 }],
        ['olchov', 'O‘lchov', { form: ['list', 'dona', 'metr', 'kg', 'komplekt'] }],
        ['qoldiq', 'Qoldiq', { r: 1, form: 'number' }],
        ['minimal', 'Minimal', { r: 1, form: 'number' }],
        ['narx', 'Narxi', { money: 1, r: 1, form: 'number' }],
        ['yetkazuvchi', 'Yetkazuvchi', { form: 1 }],
        ['holat', 'Holat', { badge: 1 }],
      ],
      rows: [
        ['MDF 16 mm (Kronospan)', 'list', 23, 50, 385000, 'Kronospan UZ', 'Kam qolgan'],
        ['Laminat 16 mm (Turk)', 'list', 18, 40, 420000, 'Kastamonu', 'Kam qolgan'],
        ['Laminat 18 mm (Turk)', 'list', 12, 30, 465000, 'Kastamonu', 'Buyurtma berilgan'],
        ['Furnitura (Sharnir)', 'dona', 45, 100, 18000, 'Blum Trade', 'Kam qolgan'],
        ['Furnitura (Yo‘naltsa)', 'komplekt', 28, 80, 65000, 'Blum Trade', 'Kam qolgan'],
        ['Kromka PVX 2 mm', 'metr', 1850, 500, 4500, 'Rehau Market', 'Yetarli'],
        ['DSP 16 mm', 'list', 96, 40, 310000, 'Kronospan UZ', 'Yetarli'],
        ['Velyur mato', 'metr', 140, 60, 72000, 'Tekstil Pro', 'Yetarli'],
        ['Porolon 40 mm', 'list', 38, 20, 145000, 'Foam City', 'Yetarli'],
      ],
    },

    mijozlar: {
      title: 'Mijozlar',
      sub: 'Mijozlar bazasi',
      kpis: [
        ['Jami mijozlar', 1248, 'ta', '#2f6fed', 'users'],
        ['Shu oy yangi', 46, 'ta', '#1fa463', 'trend'],
        ['Qarzdorlar', 37, 'ta', '#ef4f4f', 'coin'],
        ['Doimiy mijozlar', 312, 'ta', '#8b46d8', 'staff'],
      ],
      table: 'Mijozlar ro‘yxati',
      tabKey: 'holat',
      tabs: ['Faol', 'Doimiy', 'Qarzdor'],
      add: 'Yangi mijoz',
      cols: [
        ['ism', 'Mijoz', { avatar: 1, form: 1 }],
        ['tel', 'Telefon', { form: 1 }],
        ['manzil', 'Manzil', { muted: 1, form: 1 }],
        ['buyurtma', 'Buyurtmalar', { r: 1 }],
        ['xarid', 'Jami xarid', { money: 1, r: 1 }],
        ['qarz', 'Qarzi', { money: 1, r: 1, neg: 1 }],
        ['holat', 'Holat', { badge: 1 }],
      ],
      rows: [
        ['Abdullaev Oybek', '+998 90 112 34 56', 'Toshkent, Chilonzor 12', 4, 46200000, 18500000, 'Qarzdor'],
        ['Saidov Akmal', '+998 93 445 67 89', 'Toshkent, Yunusobod 7', 3, 31800000, 15200000, 'Qarzdor'],
        ['Karimov Dilshod', '+998 97 556 12 34', 'Toshkent, Sergeli 5', 2, 20650000, 12750000, 'Qarzdor'],
        ['Rustamov Aziz', '+998 99 778 90 12', 'Toshkent, Mirzo Ulug‘bek', 6, 64300000, 0, 'Doimiy'],
        ['Ergasheva Dilnoza', '+998 91 234 56 78', 'Samarqand, Registon 3', 5, 52100000, 0, 'Doimiy'],
        ['Mirzayeva Nargiza', '+998 94 321 65 87', 'Toshkent, Olmazor 9', 2, 15800000, 9600000, 'Qarzdor'],
        ['Tursunov Jasur', '+998 95 876 54 32', 'Toshkent, Yakkasaroy', 1, 7400000, 0, 'Faol'],
        ['Xolmatov Sardor', '+998 90 909 80 70', 'Toshkent, Shayxontohur', 1, 12400000, 0, 'Faol'],
      ],
    },

    yetkazib: {
      title: 'Yetkazib berish',
      sub: 'Yetkazib berish jadvali',
      kpis: [
        ['Bugungi yetkazish', 7, 'ta', '#2f6fed', 'truck'],
        ['Yo‘lda', 4, 'ta', '#8b46d8', 'van'],
        ['Yetkazildi (oy)', 32, 'ta', '#1fa463', 'check'],
        ['Haydovchilar', 5, 'nafar', '#f5b000', 'staff'],
      ],
      table: 'Yetkazib berishlar',
      tabKey: 'holat',
      tabs: ['Kutilmoqda', 'Yo‘lda', 'Yetkazildi', 'Kechikmoqda'],
      add: 'Yetkazish rejalash',
      cols: [
        ['no', 'Buyurtma №', { strong: 1, form: 1 }],
        ['mijoz', 'Mijoz', { form: 1 }],
        ['manzil', 'Manzil', { muted: 1, form: 1 }],
        ['haydovchi', 'Haydovchi', { form: ['Olimov Sherzod', 'Nurmatov Kamol', 'Bakirov Ulug‘bek', 'Rasulov Farrux', 'Tojiev Elyor'] }],
        ['sana', 'Sana', { form: 'date' }],
        ['vaqt', 'Vaqt', { form: 1 }],
        ['holat', 'Holat', { badge: 1 }],
      ],
      rows: [
        ['B-0057', 'Rustamov A.', 'Chilonzor 9-kv, 14-uy', 'Olimov Sherzod', '24.05.2024', '10:00–12:00', 'Kutilmoqda'],
        ['B-0052', 'Saidov B.', 'Yunusobod 4-kv, 22-uy', 'Nurmatov Kamol', '23.05.2024', '14:00–16:00', 'Yo‘lda'],
        ['B-0046', 'Abdullaev O.', 'Sergeli 7, 31-uy', 'Bakirov Ulug‘bek', '23.05.2024', '11:00–13:00', 'Yo‘lda'],
        ['B-0049', 'Karimov D.', 'Olmazor, Qorasaroy 18', 'Rasulov Farrux', '26.05.2024', '09:00–11:00', 'Kutilmoqda'],
        ['B-0043', 'Qosimov M.', 'Mirzo Ulug‘bek, Buyuk Ipak yo‘li 41', 'Tojiev Elyor', '22.05.2024', '15:00–17:00', 'Kechikmoqda'],
        ['B-0041', 'Yo‘ldosheva S.', 'Samarqand, Dagbit ko‘ch. 6', 'Olimov Sherzod', '18.05.2024', '10:00–12:00', 'Yetkazildi'],
        ['B-0039', 'Hasanov R.', 'Yakkasaroy, Shota Rustaveli 12', 'Nurmatov Kamol', '17.05.2024', '13:00–15:00', 'Yetkazildi'],
      ],
    },

    qarzdorlik: {
      title: 'Qarzdorlik',
      sub: 'Mijozlar qarzi va to‘lov muddatlari',
      kpis: [
        ['Jami qarz', 128540000, 'so‘m', '#ef4f4f', 'coin'],
        ['Muddati o‘tgan', 23400000, 'so‘m', '#f5b000', 'orders'],
        ['Shu oy undirilgan', 41200000, 'so‘m', '#1fa463', 'check'],
        ['Qarzdorlar', 37, 'ta', '#2f6fed', 'users'],
      ],
      table: 'Qarzdor mijozlar',
      tabKey: 'holat',
      tabs: ['Muddati o‘tgan', 'Muddati yaqin', 'Muddatida'],
      add: 'To‘lov qabul qilish',
      cols: [
        ['mijoz', 'Mijoz', { avatar: 1, form: 1 }],
        ['tel', 'Telefon', { muted: 1 }],
        ['buyurtma', 'Buyurtma'],
        ['jami', 'Jami summa', { money: 1, r: 1 }],
        ['tolangan', 'To‘langan', { money: 1, r: 1, pos: 1, form: 'number' }],
        ['qoldiq', 'Qoldiq', { money: 1, r: 1, neg: 1, calc: (r) => r.jami - r.tolangan }],
        ['muddat', 'To‘lov muddati'],
        ['holat', 'Holat', { badge: 1 }],
      ],
      rows: [
        ['Abdullaev Oybek', '+998 90 112 34 56', 'B-0031', 28500000, 10000000, '11.05.2024', 'Muddati o‘tgan'],
        ['Saidov Akmal', '+998 93 445 67 89', 'B-0036', 21200000, 6000000, '15.05.2024', 'Muddati o‘tgan'],
        ['Karimov Dilshod', '+998 97 556 12 34', 'B-0049', 20650000, 7900000, '28.05.2024', 'Muddati yaqin'],
        ['Mirzayeva Nargiza', '+998 94 321 65 87', 'B-0040', 15800000, 6200000, '26.05.2024', 'Muddati yaqin'],
        ['Jumanazarov Baxodir', '+998 88 765 43 21', 'S-1453', 14300000, 6000000, '12.05.2024', 'Muddati o‘tgan'],
        ['Nazarova Gulnora', '+998 90 345 12 98', 'B-0058', 15200000, 10000000, '15.06.2024', 'Muddatida'],
        ['Ismoilov Bekzod', '+998 93 600 70 80', 'B-0055', 21000000, 15000000, '20.06.2024', 'Muddatida'],
      ],
    },

    xodimlar: {
      title: 'Xodimlar',
      sub: 'Xodimlar va ish haqi',
      kpis: [
        ['Jami xodimlar', 42, 'nafar', '#2f6fed', 'staff'],
        ['Bugun ishda', 38, 'nafar', '#1fa463', 'check'],
        ['Ta‘tilda', 2, 'nafar', '#f5b000', 'users'],
        ['Oylik fondi', 186000000, 'so‘m', '#8b46d8', 'coin'],
      ],
      table: 'Xodimlar ro‘yxati',
      tabKey: 'holat',
      tabs: ['Ishda', 'Ta‘tilda', 'Kasal'],
      add: 'Xodim qo‘shish',
      cols: [
        ['fio', 'F.I.Sh', { avatar: 1, form: 1 }],
        ['lavozim', 'Lavozim', { form: ['Sotuvchi', 'Usta', 'Dizayner', 'Haydovchi', 'Omborchi', 'Buxgalter', 'Menejer'] }],
        ['filial', 'Filial'],
        ['tel', 'Telefon', { muted: 1, form: 1 }],
        ['qabul', 'Ishga kirgan', { muted: 1 }],
        ['oylik', 'Oylik', { money: 1, r: 1, form: 'number' }],
        ['holat', 'Holat', { badge: 1 }],
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
      ],
    },
  };

  function rowsOf(page) {
    return page.rows.map((arr) => {
      const keys = page.cols.filter((c) => !(c[2] && c[2].calc)).map((c) => c[0]);
      const o = {};
      keys.forEach((k, i) => (o[k] = arr[i]));
      return o;
    });
  }

  function create(ctx) {
    const { I, fmt, toast } = ctx;
    const st = {}; // har bir sahifa holati: {tab, q, rows}
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    const initials = (s) => s.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

    function kpiHtml(kpis, factor) {
      return `<div class="pkpis">${kpis
        .map(([label, v, unit, color, ic]) => {
          const val = unit === 'so‘m' ? v * factor : unit === '%' ? v : Math.max(0, Math.round(v * factor));
          return `<div class="card pkpi"><div class="kpi-icon" style="background:${color}"><svg viewBox="0 0 24 24">${I[ic] || I.orders}</svg></div>
          <div><div class="pkpi-label">${label}</div><div class="pkpi-value">${fmt(val)}<small>${unit}</small></div></div></div>`;
        })
        .join('')}</div>`;
    }

    function cell(c, r) {
      const [key, , o = {}] = c;
      let v = o.calc ? o.calc(r) : r[key];
      if (o.badge) return `<span class="badge ${B[v] || 'b-gray'}">${esc(v)}</span>`;
      if (o.stage) {
        return `<span class="stage" title="${['Kesish', 'Kromka', 'Teshish', 'Yig‘ish', 'Qadoqlash'][Math.min(4, v)]}">${[0, 1, 2, 3, 4]
          .map((i) => `<i class="${i < v ? 'on' : i === v ? 'cur' : ''}"></i>`)
          .join('')}</span>`;
      }
      if (o.progress) return `<span class="progress"><i style="width:${v}%"></i></span>${v}%`;
      if (o.avatar) return `<span class="avatar-s">${initials(v)}</span>${esc(v)}`;
      if (o.money) {
        if (o.neg && v > 0) return `<span class="neg">${fmt(v)}</span>`;
        if (o.pos) return `<span class="pos">${fmt(v)}</span>`;
        return fmt(v);
      }
      return esc(v) + (o.suffix || '');
    }

    function renderPage(key, root, state) {
      if (key === 'hisobotlar') return renderReports(root, state);
      if (key === 'sozlamalar') return renderSettings(root, state);
      const p = PAGES[key];
      if (!st[key]) st[key] = { tab: 'all', q: '', rows: rowsOf(p) };
      const s = st[key];
      const hasFilial = p.cols.some((c) => c[0] === 'filial');
      const branchShort = state.branch.short;

      root.innerHTML = `
        ${kpiHtml(p.kpis, state.branch.factor)}
        <div class="card panel">
          <div class="toolbar">
            <div class="card-title">${p.table.toUpperCase()}</div>
            <label class="search"><svg viewBox="0 0 24 24" class="i-sm"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><input type="search" placeholder="Qidirish..." value="${esc(s.q)}" data-role="q" /></label>
            <button class="btn" type="button" data-role="export"><svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>Excel</button>
            <button class="btn gold" type="button" data-role="add"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>${p.add}</button>
          </div>
          ${p.tabs ? `<div class="tabs" data-role="tabs"></div>` : ''}
          ${p.note ? `<div class="tabs" style="font-size:11.5px;color:var(--muted)">${p.note}</div>` : ''}
          <div class="dtable-wrap"><table class="dtable"><thead><tr>${p.cols
            .map((c) => `<th class="${c[2] && c[2].r ? 'r' : ''}">${c[1]}</th>`)
            .join('')}</tr></thead><tbody data-role="body"></tbody></table></div>
          <div class="pager"><span data-role="count"></span><span>${hasFilial && branchShort ? `Filial: ${branchShort}` : 'Barcha filiallar'}</span></div>
        </div>`;

      const body = root.querySelector('[data-role=body]');
      const draw = () => {
        const q = s.q.trim().toLowerCase();
        let list = s.rows;
        if (hasFilial && branchShort) list = list.filter((r) => r.filial === branchShort);
        const base = list;
        if (s.tab !== 'all') list = list.filter((r) => r[p.tabKey] === s.tab);
        if (q) list = list.filter((r) => p.cols.some((c) => String(c[2] && c[2].calc ? c[2].calc(r) : r[c[0]]).toLowerCase().includes(q)));
        body.innerHTML = list.length
          ? list
              .map((r) => `<tr>${p.cols.map((c) => `<td class="${[c[2] && c[2].r ? 'r' : '', c[2] && c[2].strong ? 'strong' : '', c[2] && c[2].muted ? 'muted' : ''].join(' ')}">${cell(c, r)}</td>`).join('')}</tr>`)
              .join('')
          : `<tr class="empty-row"><td colspan="${p.cols.length}">Ma’lumot topilmadi</td></tr>`;
        root.querySelector('[data-role=count]').textContent = `Ko‘rsatilmoqda: ${list.length} ta`;
        const tabsEl = root.querySelector('[data-role=tabs]');
        if (tabsEl) {
          const count = (t) => (t === 'all' ? base.length : base.filter((r) => r[p.tabKey] === t).length);
          tabsEl.innerHTML = ['all', ...p.tabs]
            .map((t) => `<button type="button" class="tab${s.tab === t ? ' active' : ''}" data-tab="${esc(t)}">${t === 'all' ? 'Hammasi' : esc(t)}<b>${count(t)}</b></button>`)
            .join('');
        }
      };
      draw();

      root.querySelector('[data-role=q]').addEventListener('input', (e) => {
        s.q = e.target.value;
        draw();
      });
      root.addEventListener('click', (e) => {
        const t = e.target.closest('[data-tab]');
        if (t) {
          s.tab = t.dataset.tab;
          draw();
        }
      });
      root.querySelector('[data-role=export]').addEventListener('click', () => exportCsv(p, s.rows));
      root.querySelector('[data-role=add]').addEventListener('click', () => openAdd(key, p, s, draw, state));
    }

    function exportCsv(p, rows) {
      const head = p.cols.map((c) => c[1]).join(';');
      const lines = rows.map((r) => p.cols.map((c) => String(c[2] && c[2].calc ? c[2].calc(r) : r[c[0]]).replace(/;/g, ',')).join(';'));
      const blob = new Blob(['﻿' + [head, ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${p.title}.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
      toast('Fayl yuklab olindi (Excel’da ochiladi)');
    }

    function openAdd(key, p, s, draw, state) {
      const fields = p.cols.filter((c) => c[2] && c[2].form);
      const html = `<div class="form-grid">${fields
        .map(([k, label, o]) => {
          if (Array.isArray(o.form)) return `<label class="fld">${label}<select name="${k}">${o.form.map((x) => `<option>${x}</option>`).join('')}</select></label>`;
          const type = o.form === 'number' ? 'number' : o.form === 'date' ? 'date' : 'text';
          return `<label class="fld">${label}<input name="${k}" type="${type}" ${type === 'number' ? 'min="0"' : ''} required /></label>`;
        })
        .join('')}</div>
        <div class="modal-foot"><button type="button" class="btn" data-close>Bekor qilish</button><button type="submit" class="btn gold">Saqlash</button></div>`;
      ctx.openModal(p.add, html, (fd) => {
        const row = {};
        p.cols.forEach(([k, , o = {}]) => {
          if (o.calc) return;
          let v = fd.get(k);
          if (v === null) {
            v = defaults(k, p, s, state);
          } else if (o.form === 'number') v = Number(v) || 0;
          else if (o.form === 'date' && v) {
            const [y, m, d] = v.split('-');
            v = `${d}.${m}.${y}`;
          }
          row[k] = v;
        });
        s.rows.unshift(row);
        s.tab = 'all';
        draw();
        toast('Saqlandi ✓');
      });
    }

    function defaults(k, p, s, state) {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const today = `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`;
      const next = (prefix) => {
        const nums = s.rows.map((r) => Number(String(r[k] || '').replace(/\D/g, ''))).filter(Boolean);
        return `${prefix}-${String(Math.max(0, ...nums) + 1).padStart(4, '0')}`;
      };
      switch (k) {
        case 'chek': return next('S');
        case 'no': return next('B');
        case 'sana': return p === PAGES.savdo ? `${today} ${pad(now.getHours())}:${pad(now.getMinutes())}` : today;
        case 'filial': return state.branch.short || 'Chilonzor';
        case 'holat': return p.tabs ? p.tabs[0] : 'Faol';
        case 'tolangan': return 0;
        case 'bosqich': return 0;
        case 'progress': return 0;
        case 'buyurtma': return p === PAGES.mijozlar ? 0 : '—';
        case 'xarid': case 'qarz': case 'jami': return 0;
        case 'qabul': return today;
        case 'tel': return '—';
        default: return '';
      }
    }

    function renderReports(root, state) {
      const f = state.branch.factor;
      const months = [['Yan', 520], ['Feb', 935], ['Mar', 615], ['Apr', 460], ['May', 700], ['Iyun', 565], ['Iyul', 535], ['Avg', 400], ['Sen', 345], ['Okt', 320], ['Noy', 600], ['Dek', 440]];
      const reports = [
        ['Savdo hisoboti', 'Kunlar, mahsulotlar va sotuvchilar kesimida savdo tahlili.', I.savdo],
        ['Foyda va zarar', 'Daromad, tannarx, xarajatlar va sof foyda hisoboti.', I.trend],
        ['Ombor hisoboti', 'Tayyor mahsulotlar qoldig‘i, kirim-chiqim harakati.', I.warehouse],
        ['Materiallar sarfi', 'Ishlab chiqarishda sarflangan xomashyo va furnitura.', I.materials],
        ['Qarzdorlik hisoboti', 'Mijozlar qarzi, to‘lov muddatlari va undirilgan summalar.', I.coin],
        ['Kassa hisoboti', 'Naqd, karta va Click/Payme bo‘yicha pul oqimi.', I.register],
      ];
      const max = Math.max(...months.map((m) => m[1]));
      root.innerHTML = `
        ${kpiHtml(
          [
            ['Yillik savdo', 6535000000, 'so‘m', '#2f6fed', 'reports'],
            ['Yillik sof foyda', 1438000000, 'so‘m', '#1fa463', 'trend'],
            ['Rentabellik', 22, '%', '#8b46d8', 'coin'],
            ['Buyurtmalar (yil)', 684, 'ta', '#f5b000', 'orders'],
          ],
          f,
        )}
        <div class="grid-2">
          <div class="card">
            <div class="card-title">OYLAR BO‘YICHA SAVDO (MLN SO‘M)</div>
            <div class="mini-bars" style="margin-bottom:22px">${months
              .map(([m, v]) => `<div style="height:${(v / max) * 100}%" title="${m}: ${fmt(v * f)} mln so‘m"><span>${m}</span></div>`)
              .join('')}</div>
          </div>
          <div class="card">
            <div class="card-title">FILIALLAR BO‘YICHA ULUSH (OY)</div>
            <table class="tbl" style="font-size:12px">
              <thead><tr><th>Filial</th><th class="r">Savdo</th><th class="r">Ulush</th></tr></thead>
              <tbody>${[['Chilonzor', 338100000, 40], ['Yunusobod', 228200000, 27], ['Sergeli', 152150000, 18], ['Samarqand', 126800000, 15]]
                .map(([n, v, p]) => `<tr><td>${n}</td><td class="r">${fmt(v)}</td><td class="r"><span class="progress" style="width:70px"><i style="width:${p * 2.2}%"></i></span>${p}%</td></tr>`)
                .join('')}</tbody>
            </table>
          </div>
        </div>
        <div class="grid-3">${reports
          .map(
            ([t, d, ic]) => `<div class="card report-card">
              <div class="kpi-icon" style="background:#f5efe3"><svg viewBox="0 0 24 24" style="stroke:#8d7142">${ic}</svg></div>
              <h4>${t}</h4><p>${d}</p>
              <div class="btns"><button class="btn" type="button" data-rep="${t}">Ko‘rish</button><button class="btn gold" type="button" data-rep="${t}"><svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>Yuklab olish</button></div>
            </div>`,
          )
          .join('')}</div>`;
      root.querySelectorAll('[data-rep]').forEach((b) => b.addEventListener('click', () => toast(`“${b.dataset.rep}” tayyorlanmoqda (namuna)`)));
    }

    function renderSettings(root, state) {
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
              <label class="fld full">Manzil<textarea>Toshkent sh., Chilonzor tumani, Bunyodkor ko‘chasi 7</textarea></label>
              <div class="fld full" style="flex-direction:row;justify-content:flex-end"><button class="btn gold" type="submit">Saqlash</button></div>
            </form>
          </div>
          <div class="card panel" style="margin-top:0">
            <div class="toolbar"><div class="card-title">TIZIM SOZLAMALARI</div></div>
            ${[
              ['Kam qolgan materiallar haqida ogohlantirish', 'Minimal miqdordan kam qolganda bildirishnoma', true],
              ['Qarz muddati eslatmasi', 'Muddatiga 3 kun qolganda mijozga SMS', true],
              ['Kunlik hisobot Telegram’ga', 'Har kuni 20:00 da rahbarga yuboriladi', false],
              ['Chekni avtomatik chop etish', 'Savdo yakunlanganda printerga yuboriladi', true],
              ['Ikki bosqichli kirish', 'Kirishda SMS kod so‘raladi', false],
            ]
              .map(
                ([t, d, on]) => `<div class="switch-row"><div>${t}<small>${d}</small></div><label class="sw"><input type="checkbox" ${on ? 'checked' : ''} /><span></span></label></div>`,
              )
              .join('')}
          </div>
        </div>
        <div class="card panel">
          <div class="toolbar"><div class="card-title">FILIALLAR</div><button class="btn gold" type="button" id="add-branch"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>Filial qo‘shish</button></div>
          <div class="dtable-wrap"><table class="dtable"><thead><tr><th>Filial</th><th>Manzil</th><th>Mas’ul</th><th>Telefon</th><th class="r">Xodimlar</th><th>Holat</th></tr></thead>
          <tbody>${ctx.BRANCHES.filter((b) => b.short)
            .map((b) => `<tr><td class="strong">${b.name}</td><td class="muted">${b.addr}</td><td>${b.boss}</td><td class="muted">${b.tel}</td><td class="r">${b.staff}</td><td><span class="badge b-green">Faol</span></td></tr>`)
            .join('')}</tbody></table></div>
        </div>
        <div class="card panel">
          <div class="toolbar"><div class="card-title">FOYDALANUVCHILAR VA ROLLAR</div></div>
          <div class="dtable-wrap"><table class="dtable"><thead><tr><th>Foydalanuvchi</th><th>Rol</th><th>Filial</th><th>Oxirgi kirish</th></tr></thead><tbody>
          ${[['Admin', 'Rahbar', 'Barcha filiallar', '23.05.2024 10:30'], ['Toshmatova Zarina', 'Buxgalter', 'Chilonzor', '23.05.2024 09:05'], ['Yusupova Madina', 'Sotuvchi', 'Yunusobod', '22.05.2024 18:40'], ['Qodirov Bobur', 'Omborchi', 'Samarqand', '21.05.2024 17:12']]
            .map((u) => `<tr><td><span class="avatar-s">${initials(u[0])}</span>${u[0]}</td><td><span class="badge b-purple">${u[1]}</span></td><td>${u[2]}</td><td class="muted">${u[3]}</td></tr>`)
            .join('')}
          </tbody></table></div>
        </div>`;
      root.querySelector('#company-form').addEventListener('submit', (e) => {
        e.preventDefault();
        toast('Sozlamalar saqlandi ✓');
      });
      root.querySelector('#add-branch').addEventListener('click', () => toast('Yangi filial qo‘shish (namuna)'));
    }

    return { renderPage, PAGES };
  }

  return { create, BRANCH_ROWS };
})();
