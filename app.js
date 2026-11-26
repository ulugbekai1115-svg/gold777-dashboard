/* Gold 777 Mebel korxonasi — Dashboard */
(function () {
  'use strict';

  // ---------- helpers ----------
  const $ = (id) => document.getElementById(id);
  const fmt = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const svgNS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(svgNS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  const icon = (paths, cls = '') => `<svg viewBox="0 0 24 24" class="${cls}">${paths}</svg>`;

  // ---------- icons ----------
  const I = {
    home: '<path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    savdo: '<path d="M4 4h16v16H4z"/><path d="M8 4v4h8V4"/><path d="M8 13l2.5 2.5L16 10"/>',
    orders: '<rect x="5" y="3.5" width="14" height="18" rx="2"/><path d="M9 3.5h6v3H9z"/><path d="M9 11h6M9 15h6"/>',
    factory: '<circle cx="7.5" cy="6" r="2.2"/><path d="M4 21v-6.5a3.5 3.5 0 0 1 7 0V21"/><path d="M13 21v-7l4 2.5V14l4 2.5V21z"/><path d="M3 21h18"/>',
    warehouse: '<path d="M3 21V8.5L12 4l9 4.5V21"/><path d="M7 21v-8h10v8"/><path d="M7 17h10"/>',
    materials: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8"/><circle cx="12" cy="14" r="3.2"/><path d="M12 10.8V9M12 19v-1.8"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18.5 14a6.5 6.5 0 0 1 3 6"/>',
    truck: '<path d="M2 6h12v10H2z"/><path d="M14 9h4.5L22 12.5V16h-8"/><circle cx="6" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M14.8 9.2c-.5-.8-1.5-1.3-2.8-1.3-1.7 0-2.8.8-2.8 2s1 1.7 2.8 2.1c1.8.4 2.9 1 2.9 2.2s-1.2 2-2.9 2c-1.4 0-2.5-.6-3-1.5M12 6.2v1.7M12 16.2v1.6"/>',
    staff: '<circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M2.5 19a5.5 5.5 0 0 1 11 0"/><path d="M14 14.6a4.5 4.5 0 0 1 7.5 3.4"/>',
    reports: '<path d="M4 4v16h16"/><path d="M8 16v-4M12 16V8M16 16v-6M20 16V6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    chevR: '<path d="M9 6l6 6-6 6"/>',
    cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h3l2.4 11.5a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L21 7H6.3"/>',
    money: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><text x="12" y="15.6" text-anchor="middle" font-size="9" font-weight="800" fill="#fff" stroke="none" font-family="Arial">$</text>',
    trend: '<path d="M4 18l5-5 3.5 3.5L19 10"/><path d="M14.5 10H19v4.5"/>',
    register: '<rect x="3" y="9" width="18" height="11" rx="1.5"/><path d="M6 9V5h8v4"/><path d="M7 13h2M11 13h2M15 13h2M7 16h10"/>',
    team: '<circle cx="9" cy="8" r="3.3"/><path d="M3 19.5a6 6 0 0 1 12 0z" fill="#fff"/><circle cx="16.8" cy="9" r="2.6"/><path d="M15.2 13.6a5 5 0 0 1 6 5.9h-4.5"/>',
    clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 2.8h6v3H9z"/><path d="M9 11h6M9 15h6"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5l1.6 2.6 3-.7.7 3 2.6 1.6-1.4 2.9 1.4 2.9-2.6 1.6-.7 3-3-.7L12 21.5l-1.6-2.6-3 .7-.7-3-2.6-1.6L5.5 12 4.1 9.1l2.6-1.6.7-3 3 .7z"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.7 2.7L16.2 9.5"/>',
    van: '<path d="M2 6.5h11.5V16H2z"/><path d="M13.5 9.5h4.2L21.5 13v3h-8"/><circle cx="6" cy="17.3" r="1.9"/><circle cx="17.5" cy="17.3" r="1.9"/>',
    arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    supplier: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    kassa: '<rect x="2.5" y="6" width="19" height="13" rx="2"/><circle cx="12" cy="12.5" r="2.6"/><path d="M6 9.5v.01M18 15.5v.01"/>',
    expense: '<path d="M4 3h16v18l-3-2-3 2-2-2-2 2-3-2-3 2z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    loss: '<path d="M3 6l6 6 4-4 8 8"/><path d="M21 11v5h-5"/>',
  };

  // ---------- data ----------
  const MENU = [
    ['dashboard', 'Dashboard', I.home],
    ['savdo', 'Savdo', I.savdo],
    ['buyurtmalar', 'Buyurtmalar', I.orders, true],
    ['ishlab', 'Ishlab chiqarish', I.factory],
    ['ombor', 'Ombor', I.warehouse],
    ['materiallar', 'Materiallar', I.materials],
    ['taminotchilar', 'Ta’minotchilar', I.supplier],
    ['mijozlar', 'Mijozlar', I.users],
    ['yetkazib', 'Yetkazib berish', I.truck],
    ['kassa', 'Kassa', I.kassa],
    ['xarajatlar', 'Xarajatlar', I.expense],
    ['qarzdorlik', 'Qarzdorlik', I.coin],
    ['ziyon', 'Ziyonlar', I.loss],
    ['xodimlar', 'Xodimlar', I.staff],
    ['hisobotlar', 'Hisobotlar', I.reports],
    ['sozlamalar', 'Sozlamalar', I.settings],
  ];
  // menyuda ko'rinmaydigan ichki sahifalar: [sarlavha, ota bo'lim]
  const HIDDEN = {
    'top-sotilgan': ['Eng ko‘p sotilgan mahsulotlar', 'savdo'],
    'top-foydali': ['Eng foydali mahsulotlar', 'savdo'],
    'top-mijozlar': ['Eng yaxshi xaridor mijozlar', 'mijozlar'],
    'savdo-tahlil': ['Savdo tahlili', 'savdo'],
  };
  const SUBS = {
    kassa: 'Naqd, karta/terminal va Click/Payme — filiallar bo‘yicha',
    xarajatlar: 'Kategoriyalar bo‘yicha oylik limit va sarf',
    hisobotlar: 'Tahliliy hisobotlar',
    sozlamalar: 'Korxona va tizim sozlamalari',
    'savdo-tahlil': 'Kunlik grafik (sana oralig‘i) va oylar bo‘yicha taqqoslash',
  };
  const isPage = (k) => MENU.some((m) => m[0] === k) || k in HIDDEN;

  const KPIS = [
    { color: '#2f6fed', icon: I.cart, label: 'BUGUNGI SAVDO', value: 35780000, unit: 'so‘m', trend: '12.5%', note: 'kechagiga nisbatan' },
    { color: '#1fa463', icon: I.money, label: 'Oylik savdo', value: 845250000, unit: 'so‘m', trend: '18.3%', note: 'o‘tgan oyga nisbatan' },
    { color: '#8b46d8', icon: I.trend, label: 'Oylik sof foyda', value: 186750000, unit: 'so‘m', trend: '22.7%', note: 'o‘tgan oyga nisbatan' },
    { color: '#f5b000', icon: I.register, label: 'KASSA QOLDIG‘I', value: 42350000, unit: 'so‘m', split: [['Naqd:', 28300000], ['Karta/Click:', 14050000]] },
    { color: '#ef4f4f', icon: I.team, label: 'MIJOZLAR QARZDORLIGI', value: 128540000, unit: 'so‘m', trend: '8.6%', bad: true, note: 'o‘tgan oyga nisbatan' },
    { color: '#2aa7d6', icon: I.clipboard, label: 'FAOL BUYURTMALAR', value: 57, unit: 'ta', sum: 312450000 },
  ];

  const STATUSES = [
    { bg: '#eef4ff', fg: '#2f6fed', icon: I.clipboard, label: 'Yangi buyurtmalar', n: 12, sum: 45600000 },
    { bg: '#fff7e5', fg: '#f59e0b', icon: I.gear, label: 'Ishlab chiqarilmoqda', n: 18, sum: 98750000, fill: true },
    { bg: '#eef9f1', fg: '#22a356', icon: I.check, label: 'Tayyor', n: 9, sum: 36200000 },
    { bg: '#f3efff', fg: '#8b46d8', icon: I.van, label: 'Yetkazib berilmoqda', n: 7, sum: 22900000, fill: true },
    { bg: '#eaf8fb', fg: '#1ea5c9', icon: I.check, label: 'Topshirilgan (oy)', n: 32, sum: 184950000 },
  ];

  const MATERIALS = [
    ['MDF 16 mm (Kronospan)', 23, 50],
    ['Laminat 16 mm (Turk)', 18, 40],
    ['Laminat 18 mm (Turk)', 12, 30],
    ['Furnitura (Sharnir)', 45, 100],
    ['Furnitura (Yo‘naltsa)', 28, 80],
  ];

  const CASH = [
    ['Naqd pul tushum', '28 300 000'],
    ['Karta orqali tushum', '9 850 000'],
    ['Click/Payme tushum', '7 630 000'],
    ['Jami tushum', '45 780 000', 'green'],
    ['Naqd pul chiqim', '-12 950 000', 'red'],
    ['Kassa qoldig‘i', '42 350 000', 'blue'],
  ];

  // 30 kun: 24 Apr .. 23 May (mln so'm)
  const DAILY = [21, 30, 52, 27, 41, 29, 34, 30, 42, 33, 50, 35, 29, 54, 34, 43, 32, 58, 37, 30, 52, 39, 45, 42, 56, 36, 47, 52, 87, 82];
  const DAILY_START = new Date(2024, 3, 24);

  const MONTHS = ['Yan', 'Feb', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
  // [joriy yil, o'tgan yil] mln so'm
  const MONTHLY = [
    [520, 690], [935, 650], [615, 730], [460, 810], [700, 805], [565, 760],
    [535, 755], [400, 880], [345, 570], [320, 760], [600, 780], [440, 590],
  ];

  const CATEGORIES = [
    ['Oshxona mebellari', 34.5, '#4a7fd6'],
    ['Yotoqxona mebellari', 24.8, '#3dba73'],
    ['Shkaf-kupe', 18.7, '#9a55d6'],
    ['Detskiy mebellar', 11.6, '#f0a04a'],
    ['Ofis mebellari', 6.1, '#26b3cf'],
    ['Boshqalar', 4.3, '#9aa5b4'],
  ];

  // Dashboard jadvallari ichki sahifalardagi ma'lumotdan olinadi (tashqarida top-5, ichida top-20)
  const GP = window.G777Pages;
  const TOP_SOLD = () => GP.topSold().slice(0, 5).map((p) => [p.nomi, `${p.sotildi} dona`, fmt(p.tushum)]);
  const TOP_PROFIT = () => GP.topProfit().slice(0, 5).map((p) => [p.nomi, fmt(p.foyda), `${p.foizi}%`]);
  const DEBTORS = () =>
    [...GP.DEBTORS].sort((a, b) => b.jami - b.tolangan - (a.jami - a.tolangan)).slice(0, 5)
      .map((d) => [d.mijoz, fmt(d.jami - d.tolangan), `${Math.max(0, GP.overdue(d))} kun`]);
  const DELIVERIES = [
    ['B-0057', 'Rustamov A.', '24.05.2024', '8 750 000'],
    ['B-0052', 'Saidov B.', '25.05.2024', '6 200 000'],
    ['B-0049', 'Karimov D.', '26.05.2024', '7 900 000'],
    ['B-0046', 'Abdullaev O.', '27.05.2024', '5 400 000'],
    ['B-0043', 'Qosimov M.', '28.05.2024', '4 650 000'],
  ];

  // ---------- render: sidebar ----------
  function renderMenu(active) {
    $('menu').innerHTML = MENU.map(
      ([key, label, ic, chev]) => `
      <button class="menu-item${key === active ? ' active' : ''}" data-key="${key}" type="button">
        <svg viewBox="0 0 24 24">${ic}</svg>
        <span>${label}</span>
        ${chev ? `<svg viewBox="0 0 24 24" class="chev-r">${I.chevR}</svg>` : ''}
      </button>`,
    ).join('');
  }

  // ---------- filiallar va davr ----------
  const BRANCHES = [
    { id: 'all', name: 'Barcha filiallar', short: '', factor: 1, addr: '', boss: '', tel: '', staff: 42 },
    { id: 'chil', name: 'Chilonzor filiali (Bosh ofis)', short: 'Chilonzor', factor: 0.4, addr: 'Toshkent, Chilonzor, Bunyodkor ko‘ch. 7', boss: 'Karimov Sanjar', tel: '+998 90 123 77 70', staff: 17 },
    { id: 'yun', name: 'Yunusobod filiali', short: 'Yunusobod', factor: 0.27, addr: 'Toshkent, Yunusobod 4-kv, Amir Temur 108', boss: 'Aliyev Jamshid', tel: '+998 90 123 77 71', staff: 11 },
    { id: 'ser', name: 'Sergeli filiali', short: 'Sergeli', factor: 0.18, addr: 'Toshkent, Sergeli 7, Yangi Sergeli 21', boss: 'Rahmonov Otabek', tel: '+998 90 123 77 72', staff: 8 },
    { id: 'sam', name: 'Samarqand filiali', short: 'Samarqand', factor: 0.15, addr: 'Samarqand, Rudakiy ko‘ch. 45', boss: 'Normurodov Akbar', tel: '+998 90 123 77 73', staff: 6 },
  ];
  const PERIODS = [
    ['bugun', 'Bugun', 1],
    ['kecha', 'Kecha', 0.91],
    ['hafta', 'Shu hafta', 1.06],
    ['oy', 'Shu oy', 1],
    ['yil', 'Shu yil', 1.12],
  ];
  const state = {
    branch: BRANCHES[0],
    period: 'bugun',
    periodLabel: 'Bugun',
    periodFactor: 1,
    page: 'dashboard',
  };
  const factor = () => state.branch.factor * state.periodFactor;

  // ---------- modal / toast ----------
  let toastT;
  function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(() => (t.hidden = true), 2200);
  }
  let modalSubmit = null;
  function openModal(title, html, onSubmit, wide) {
    document.querySelector('.modal').classList.toggle('wide', !!wide);
    $('modal-title').textContent = title;
    $('modal-form').innerHTML = html;
    modalSubmit = onSubmit;
    $('modal').hidden = false;
    const first = $('modal-form').querySelector('input,select');
    if (first) first.focus();
  }
  const closeModal = () => ($('modal').hidden = true);
  $('modal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (modalSubmit) modalSubmit(new FormData(e.target));
    closeModal();
  });
  $('modal-close').addEventListener('click', closeModal);
  $('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal' || e.target.closest('[data-close]')) closeModal();
  });

  const pages = window.G777Pages.create({ I, fmt, toast, openModal, BRANCHES });

  function go(key) {
    if (!isPage(key)) key = 'dashboard';
    const changed = state.page !== key;
    state.page = key;
    const item = MENU.find((m) => m[0] === key);
    renderMenu(item ? key : HIDDEN[key][1]);
    closePanels();
    const isDash = key === 'dashboard';
    $('view-dashboard').hidden = !isDash;
    $('view-page').hidden = isDash;
    $('page-title').textContent = item ? item[1] : HIDDEN[key][0];
    const br = state.branch.short ? ` · ${state.branch.name}` : '';
    if (isDash) {
      $('page-subtitle').textContent = 'Korxona umumiy ko‘rsatkichlari' + br;
      renderDashboardData();
    } else {
      const p = pages.PAGES[key];
      $('page-subtitle').textContent = (SUBS[key] || (p ? p.sub : '')) + br;
      pages.renderPage(key, $('view-page'), state);
      if (changed) window.scrollTo(0, 0);
    }
    if (location.hash !== '#' + key) history.pushState(null, '', '#' + key);
  }
  const onHash = () => {
    const k = location.hash.slice(1) || 'dashboard';
    if (k !== state.page && isPage(k)) go(k);
  };
  addEventListener('hashchange', onHash);
  addEventListener('popstate', onHash);

  // mobil menyu
  function setSidebar(open) {
    document.querySelector('.sidebar').classList.toggle('open', open);
    let ov = document.querySelector('.sb-overlay');
    if (open && !ov) {
      ov = document.createElement('div');
      ov.className = 'sb-overlay';
      ov.addEventListener('click', () => setSidebar(false));
      document.body.appendChild(ov);
    } else if (!open && ov) ov.remove();
  }
  $('burger').addEventListener('click', () => setSidebar(true));

  document.addEventListener('click', (e) => {
    if (e.target.closest('.menu-item') || e.target.closest('[data-go]')) setSidebar(false);
    const m = e.target.closest('.menu-item');
    if (m) return go(m.dataset.key);
    const b = e.target.closest('[data-go]');
    if (b) return go(b.dataset.go);
  });

  // ---------- dropdown panellar ----------
  const PANELS = ['period-panel', 'branch-panel', 'notif-panel'];
  function closePanels(except) {
    PANELS.forEach((id) => {
      if (id !== except) $(id).hidden = true;
    });
  }
  function toggle(id) {
    const open = $(id).hidden;
    closePanels(id);
    $(id).hidden = !open;
  }
  document.addEventListener('mousedown', (e) => {
    if (!e.target.closest('.dd') && !e.target.closest('#company-btn')) closePanels();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePanels();
      closeModal();
    }
  });

  // filial
  function renderBranches() {
    $('branch-list').innerHTML = BRANCHES.map(
      (b) => `<button type="button" class="dd-item${b === state.branch ? ' active' : ''}" data-branch="${b.id}">
        <span class="br-ico">${b.short ? b.short.slice(0, 2).toUpperCase() : '★'}</span>
        <span>${b.name}<small>${b.short ? b.addr : 'Umumiy ko‘rsatkichlar'}</small></span>
        ${b === state.branch ? '<svg viewBox="0 0 24 24" class="check"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>' : ''}
      </button>`,
    ).join('');
  }
  $('user-btn').addEventListener('click', () => {
    renderBranches();
    toggle('branch-panel');
  });
  $('company-btn').addEventListener('click', () => {
    renderBranches();
    toggle('branch-panel');
  });
  $('branch-list').addEventListener('click', (e) => {
    const b = e.target.closest('[data-branch]');
    if (!b) return;
    state.branch = BRANCHES.find((x) => x.id === b.dataset.branch);
    $('company-text').textContent = state.branch.short ? `Gold 777 · ${state.branch.short}` : 'Gold 777 Mebel';
    closePanels();
    go(state.page);
    toast(`Filial: ${state.branch.name}`);
  });
  $('logout').addEventListener('click', () => {
    closePanels();
    toast('Tizimdan chiqish (namuna)');
  });

  // davr
  const pad2 = (n) => String(n).padStart(2, '0');
  const isoToUz = (v) => {
    const [y, m, d] = v.split('-');
    return `${d}.${m}.${y}`;
  };
  function renderPeriods() {
    $('period-list').innerHTML = PERIODS.map(
      ([id, label]) => `<button type="button" class="dd-item${state.period === id ? ' active' : ''}" data-period="${id}">${label}
        ${state.period === id ? '<svg viewBox="0 0 24 24" class="check"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>' : ''}</button>`,
    ).join('');
  }
  function setPeriod(id, label, f) {
    state.period = id;
    state.periodLabel = label;
    state.periodFactor = f;
    $('period-text').textContent = label;
    $('period-btn').classList.toggle('wide', id === 'range');
    closePanels();
    go(state.page);
  }
  $('period-btn').addEventListener('click', () => {
    renderPeriods();
    $('range-err').hidden = true;
    toggle('period-panel');
  });
  $('period-list').addEventListener('click', (e) => {
    const b = e.target.closest('[data-period]');
    if (!b) return;
    const p = PERIODS.find((x) => x[0] === b.dataset.period);
    setPeriod(p[0], p[1], p[2]);
  });
  document.querySelector('.range-quick').addEventListener('click', (e) => {
    const q = e.target.closest('[data-quick]');
    if (!q) return;
    const base = new Date(($('date-input').value || '2024-05-23') + 'T00:00');
    let from, to;
    if (q.dataset.quick === 'month') {
      from = new Date(base.getFullYear(), base.getMonth(), 1);
      to = new Date(base.getFullYear(), base.getMonth() + 1, 0);
    } else if (q.dataset.quick === 'prev') {
      from = new Date(base.getFullYear(), base.getMonth() - 1, 1);
      to = new Date(base.getFullYear(), base.getMonth(), 0);
    } else {
      to = base;
      from = new Date(base);
      from.setDate(from.getDate() - 6);
    }
    const iso = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
    $('range-from').value = iso(from);
    $('range-to').value = iso(to);
  });
  $('range-apply').addEventListener('click', () => {
    const a = $('range-from').value, b = $('range-to').value;
    const err = $('range-err');
    if (!a || !b) {
      err.textContent = 'Ikkala sanani ham tanlang.';
      err.hidden = false;
      return;
    }
    if (a > b) {
      err.textContent = '“Dan” sanasi “Gacha” sanasidan keyin bo‘lishi mumkin emas.';
      err.hidden = false;
      return;
    }
    const days = Math.round((new Date(b) - new Date(a)) / 86400000) + 1;
    const [ad, am] = isoToUz(a).split('.');
    const label = a.slice(0, 7) === b.slice(0, 7) ? `${ad}–${isoToUz(b)}` : `${ad}.${am} – ${isoToUz(b)}`;
    setPeriod('range', label, Math.min(1.25, Math.max(0.5, days / 30)));
    toast(`Davr: ${isoToUz(a)} – ${isoToUz(b)} (${days} kun)`);
  });

  // bildirishnomalar
  const NOTIFS = [
    ['#ef4f4f', 'MDF 16 mm tugab bormoqda', 'Qoldiq 23 dona, minimal 50 dona', '10 daqiqa oldin'],
    ['#f5b000', 'B-0054 buyurtma kechikmoqda', '2-sex, muddat 22.05.2024 edi', '35 daqiqa oldin'],
    ['#1fa463', 'Yangi to‘lov qabul qilindi', 'Saidov Akmal — 6 000 000 so‘m', '1 soat oldin'],
    ['#2f6fed', 'Yangi buyurtma B-0061', 'Xolmatov Sardor — Oshxona “LUX-1”', '2 soat oldin'],
    ['#8b46d8', 'B-0052 yo‘lga chiqdi', 'Haydovchi: Nurmatov Kamol', '3 soat oldin'],
  ];
  let notifRead = false;
  function renderNotifs() {
    $('notif-list').innerHTML = NOTIFS.map(
      ([c, t, d, time]) => `<div class="notif${notifRead ? ' read' : ''}"><span class="n-dot" style="background:${c}"></span><div><b>${t}</b><span>${d}</span><time>${time}</time></div></div>`,
    ).join('');
  }
  $('bell-btn').addEventListener('click', () => {
    renderNotifs();
    toggle('notif-panel');
  });
  $('notif-read').addEventListener('click', () => {
    notifRead = true;
    $('bell-badge').hidden = true;
    renderNotifs();
  });

  function renderDashboardData() {
    renderKpis();
    renderStatuses();
    renderCash();
    renderTables();
    drawCharts();
  }

  // dashboard: kartalar va "Barchasini ko'rish" ichki sahifalarga olib kiradi
  const KPI_GO = ['savdo', 'savdo-tahlil', 'top-foydali', 'kassa', 'qarzdorlik', 'buyurtmalar'];
  $('view-dashboard').addEventListener('click', (e) => {
    if (e.target.closest('select, .mini-select')) return;
    const pl = e.target.closest('[data-product]');
    if (pl) { e.preventDefault(); return pages.productDetail(pl.dataset.product); }
    const more = e.target.closest('[data-more]');
    if (more) { e.preventDefault(); return go(more.dataset.more); }
    const kpi = e.target.closest('.kpi');
    if (kpi) return go(KPI_GO[[...$('kpis').children].indexOf(kpi)]);
    if (e.target.closest('.status')) return go('buyurtmalar');
    if (e.target.closest('#cash')) return go('kassa');
    if (e.target.closest('.cg-link')) return go(e.target.closest('.cg-link').dataset.more);
  });

  // ---------- render: KPI ----------
  function renderKpis() {
    const f = factor();
    $('kpis').innerHTML = KPIS.map((k0) => {
      const k = { ...k0, value: k0.unit === 'ta' ? Math.round(k0.value * f) : k0.value * f };
      if (k.split) k.split = k.split.map(([l, v]) => [l, v * f]);
      if (k.sum) k.sum = k.sum * f;
      let foot = '';
      if (k.trend) {
        foot = `<div class="kpi-foot"><span class="trend ${k.bad ? 'bad' : 'up'}">${icon(I.arrowUp)}${k.trend}</span><span>${k.note}</span></div>`;
      } else if (k.split) {
        foot = `<div class="kpi-split">${k.split.map(([l, v]) => `<div><span class="l">${l}</span><b>${fmt(v)}</b></div>`).join('')}</div>`;
      } else if (k.sum) {
        foot = `<div class="kpi-sum">Summa: <b>${fmt(k.sum)} so‘m</b></div>`;
      }
      return `
      <div class="card kpi">
        <div class="kpi-top">
          <div class="kpi-icon" style="background:${k.color}"><svg viewBox="0 0 24 24">${k.icon}</svg></div>
          <div>
            <div class="kpi-label">${k.label}</div>
            <div class="kpi-value">${fmt(k.value)}</div>
            <div class="kpi-unit">${k.unit}</div>
          </div>
        </div>
        ${foot}
      </div>`;
    }).join('');
  }

  function renderStatuses() {
    $('status-grid').innerHTML = STATUSES.map(
      (s) => `
      <div class="status" style="background:${s.bg}">
        <svg viewBox="0 0 24 24" style="stroke:${s.fg};${s.fill ? `fill:${s.fg}` : ''}">${s.icon}</svg>
        <div class="status-label">${s.label}</div>
        <div class="status-num">${Math.round(s.n * factor())}<small>ta</small></div>
        <div class="status-sum">${fmt(s.sum * factor())} so‘m</div>
      </div>`,
    ).join('');
  }

  function renderCash() {
    const f = factor();
    $('cash').innerHTML = CASH.map(([k, v, c]) => {
      const n = Number(v.replace(/[^\d-]/g, '')) * f;
      return `<div class="cash-row ${c || ''}"><span class="k">${k}</span><span class="v">${fmt(n)}</span></div>`;
    }).join('');
  }

  function renderTables() {
    $('materials').innerHTML = MATERIALS.map(
      ([n, q, m]) => `<tr><td>${n}</td><td><span class="qbar"></span>${q} dona</td><td>${m} dona</td></tr>`,
    ).join('');
    const b = state.branch.short;
    const plink = (n) => `<a href="#" class="plink-d" data-product="${n.replace(/"/g, '&quot;')}">${n}</a>`;
    const sold = GP.topSold().filter((p) => !b || p.filial === b).slice(0, 5);
    const prof = GP.topProfit().filter((p) => !b || p.filial === b).slice(0, 5);
    const debt = [...GP.DEBTORS].filter((d) => !b || d.filial === b).sort((x, y) => y.jami - y.tolangan - (x.jami - x.tolangan)).slice(0, 5);
    $('top-sold').innerHTML = sold.map(
      (p, i) => `<tr><td class="n">${i + 1}</td><td>${plink(p.nomi)}</td><td class="r">${p.sotildi} dona</td><td class="r">${fmt(p.tushum)}</td></tr>`,
    ).join('');
    $('top-profit').innerHTML = prof.map(
      (p, i) => `<tr><td class="n">${i + 1}</td><td>${plink(p.nomi)}</td><td class="r">${fmt(p.foyda)}</td><td class="r">${p.foizi}%</td></tr>`,
    ).join('');
    $('debtors').innerHTML = debt.map((d) => `<tr><td>${d.mijoz}</td><td class="r">${fmt(d.jami - d.tolangan)}</td><td class="r">${Math.max(0, GP.overdue(d))} kun</td></tr>`).join('');
    $('deliveries').innerHTML = DELIVERIES.map(
      (r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td class="r">${r[3]}</td></tr>`,
    ).join('');
  }

  // ---------- tooltip ----------
  const tip = $('tooltip');
  function showTip(evt, html) {
    tip.innerHTML = html;
    tip.hidden = false;
    const r = tip.getBoundingClientRect();
    let x = evt.clientX + 12;
    if (x + r.width > innerWidth - 8) x = evt.clientX - r.width - 12;
    tip.style.left = x + 'px';
    tip.style.top = evt.clientY - r.height - 10 + 'px';
  }
  const hideTip = () => (tip.hidden = true);

  // ---------- line chart ----------
  function drawLine() {
    const box = $('line-chart');
    box.innerHTML = '';
    const days = Number($('days').value);
    const data = DAILY.slice(-days).map((v) => v * state.branch.factor);
    const start = new Date(DAILY_START);
    start.setDate(start.getDate() + (DAILY.length - data.length));
    const W = box.clientWidth, H = box.clientHeight;
    if (W < 120 || H < 60) return;
    const L = 28, R = 4, T = 14, B = 22;
    const iw = W - L - R, ih = H - T - B;
    const max = 100;
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}` }, box);
    const defs = el('defs', {}, svg);
    const g = el('linearGradient', { id: 'lg', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el('stop', { offset: 0, 'stop-color': '#4a7fe8', 'stop-opacity': 0.28 }, g);
    el('stop', { offset: 1, 'stop-color': '#4a7fe8', 'stop-opacity': 0.04 }, g);

    const t = el('text', { x: 0, y: T - 6, class: 'ax' }, svg);
    t.textContent = 'so‘m';
    [0, 20, 40, 60, 80, 100].forEach((v) => {
      const y = T + ih - (v / max) * ih;
      el('line', { x1: L, x2: W - R, y1: y, y2: y, class: 'grid-line' }, svg);
      const tx = el('text', { x: L - 8, y: y + 3, class: 'ax', 'text-anchor': 'end' }, svg);
      tx.textContent = v === 0 ? '0' : v + 'M';
    });

    const x = (i) => L + 6 + (i / (data.length - 1)) * (iw - 12);
    const y = (v) => T + ih - (v / max) * ih;
    const pts = data.map((v, i) => [x(i), y(v)]);
    const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    el('path', { d: `${line} L ${x(data.length - 1)} ${T + ih} L ${x(0)} ${T + ih} Z`, fill: 'url(#lg)' }, svg);
    el('path', { d: line, fill: 'none', stroke: '#3a6fe0', 'stroke-width': 1.6, 'stroke-linejoin': 'round' }, svg);

    const mon = ['Yan', 'Feb', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
    const step = days >= 30 ? 4 : days >= 14 ? 2 : 1;
    pts.forEach((p, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const label = `${d.getDate()} ${mon[d.getMonth()]}`;
      const c = el('circle', { cx: p[0], cy: p[1], r: 2.6, fill: '#3a6fe0', stroke: '#fff', 'stroke-width': 0.8 }, svg);
      const hit = el('circle', { cx: p[0], cy: p[1], r: 8, fill: 'transparent', style: 'cursor:pointer' }, svg);
      hit.addEventListener('mousemove', (e) => {
        c.setAttribute('r', 4.2);
        showTip(e, `${label}.2024<b>${fmt(data[i] * 1000000)} so‘m</b>`);
      });
      hit.addEventListener('mouseleave', () => {
        c.setAttribute('r', 2.6);
        hideTip();
      });
      if (i % step === 0 && i < pts.length - 1) {
        const tx = el('text', { x: p[0], y: H - 4, class: 'ax', 'text-anchor': 'middle' }, svg);
        tx.textContent = label;
      }
    });
  }

  // ---------- bar chart ----------
  function drawBars() {
    const box = $('bar-chart');
    box.innerHTML = '';
    const W = box.clientWidth, H = box.clientHeight;
    if (W < 120 || H < 60) return;
    const L = 34, R = 2, T = 26, B = 22;
    const iw = W - L - R, ih = H - T - B;
    const max = 1000;
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}` }, box);

    const t = el('text', { x: 0, y: 8, class: 'ax' }, svg);
    t.textContent = 'so‘m';
    // legend
    const lg = el('g', {}, svg);
    [['Joriy yil', '#3a6fe0', W - 136], ['O‘tgan yil', '#c3c9d3', W - 66]].forEach(([txt, c, lx]) => {
      el('circle', { cx: lx, cy: 4, r: 4, fill: c }, lg);
      const tx = el('text', { x: lx + 8, y: 7, class: 'ax', style: 'font-size:9.5px;fill:#1b2433' }, lg);
      tx.textContent = txt;
    });

    [0, 200, 400, 600, 800, 1000].forEach((v) => {
      const y = T + ih - (v / max) * ih;
      el('line', { x1: L, x2: W - R, y1: y, y2: y, class: 'grid-line' }, svg);
      const tx = el('text', { x: L - 10, y: y + 3, class: 'ax', 'text-anchor': 'end' }, svg);
      tx.textContent = v === 0 ? '0' : v === 1000 ? '1B' : v + 'M';
    });

    const gw = iw / 12;
    const bw = Math.max(2, Math.min(8, gw * 0.26));
    MONTHLY.map(([a, b]) => [a * state.branch.factor, b * state.branch.factor]).forEach(([cur, prev], i) => {
      const cx = L + gw * i + gw / 2;
      const bars = [
        [cx - bw - 1, cur, '#3a6fe0', 'Joriy yil'],
        [cx + 1, prev, '#c3c9d3', 'O‘tgan yil'],
      ];
      bars.forEach(([bx, v, c, name], j) => {
        const h = (v / max) * ih;
        const r = el('rect', { x: bx, y: T + ih - h, width: bw, height: h, fill: c, rx: 1 }, svg);
        // ikkinchi qatlam: o'tgan yil ustunida joriy yilning och ko'k qismi (dizayndagidek)
        if (j === 1 && cur < prev && i % 2 === 1) {
          el('rect', { x: bx, y: T + ih - h, width: bw, height: Math.min(h, ((prev - cur) / max) * ih * 0.35), fill: '#9fb7e8', rx: 1 }, svg);
        }
        r.style.cursor = 'pointer';
        r.addEventListener('mousemove', (e) => showTip(e, `${MONTHS[i]} · ${name}<b>${fmt(v * 1000000)} so‘m</b><span style="opacity:.7">Bosing — batafsil</span>`));
        r.addEventListener('click', (e) => {
          e.stopPropagation();
          hideTip();
          pages.monthDetail(i, state.branch.short);
        });
        r.addEventListener('mouseleave', hideTip);
      });
      const tx = el('text', { x: cx, y: H - 4, class: 'ax', 'text-anchor': 'middle' }, svg);
      tx.textContent = MONTHS[i];
    });
  }

  // ---------- donut ----------
  function drawDonut() {
    const box = $('donut');
    box.innerHTML = '';
    const S = 152, cx = S / 2, cy = S / 2, r = 62, sw = 22;
    const svg = el('svg', { viewBox: `0 0 ${S} ${S}` }, box);
    const C = 2 * Math.PI * r;
    let off = 0;
    CATEGORIES.forEach(([name, pct, color]) => {
      const len = (pct / 100) * C;
      const c = el('circle', {
        cx, cy, r,
        fill: 'none',
        stroke: color,
        'stroke-width': sw,
        'stroke-dasharray': `${len - 1.2} ${C - len + 1.2}`,
        'stroke-dashoffset': -off,
        transform: `rotate(-90 ${cx} ${cy})`,
        style: 'cursor:pointer;transition:stroke-width .15s',
      }, svg);
      c.addEventListener('mousemove', (e) => {
        c.setAttribute('stroke-width', sw + 4);
        showTip(e, `${name}<b>${pct}% · ${fmt((845250000 * state.branch.factor * pct) / 100)} so‘m</b>`);
      });
      c.addEventListener('mouseleave', () => {
        c.setAttribute('stroke-width', sw);
        hideTip();
      });
      off += len;
    });
    const center = document.createElement('div');
    center.className = 'donut-center';
    center.innerHTML = `<b>${fmt(845250000 * state.branch.factor)}</b><span>Jami</span>`;
    box.appendChild(center);

    $('legend').innerHTML = CATEGORIES.map(
      ([n, p, c]) => `<li><span class="dot" style="background:${c}"></span>${n}<b>${p.toFixed(1)}%</b></li>`,
    ).join('');
  }

  function drawCharts() {
    if ($('view-dashboard').hidden) return;
    drawLine();
    drawBars();
    drawDonut();
  }

  // ---------- top controls ----------
  $('date-input').addEventListener('change', (e) => {
    const v = e.target.value;
    if (!v) return;
    const [yy, mm, dd] = v.split('-');
    const s = `${dd}.${mm}.${yy}`;
    $('date-text').textContent = s;
    $('foot-date').textContent = s;
  });
  $('days').addEventListener('change', drawLine);
  $('refresh').addEventListener('click', () => {
    const b = $('refresh');
    b.classList.remove('spin');
    void b.offsetWidth;
    b.classList.add('spin');
    drawCharts();
  });

  let rt;
  addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(drawCharts, 120);
  });

  // ---------- init ----------
  renderTables();
  const start = location.hash.slice(1);
  go(isPage(start) ? start : 'dashboard');
})();
