/* ═══════════════════════════════════════════
   NIMA YEYMIZ? — app.js v4.0
   TUZATILGAN: 
   1. Baraban ishlaydi + kunlik 3 spin limiti
   2. 15 ta sof O'zbek milliy taomi (pitsa/burger yo'q)
   3. Cashback ishlatish tugmasi va Payme/Click
   4. Buyurtmalar tarixida 4 xonali ID va vaqt
   ═══════════════════════════════════════════ */
// ========== PASTKI NAVIGATSIYA TUGMALARINI TUZATISH ==========
document.querySelectorAll('.bnav').forEach(btn => {
  btn.removeEventListener('click', () => {});
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const page = btn.getAttribute('data-page');
    if (page) {
      console.log('Navigatsiya:', page);
      goPage(page);
    }
  });
});

// Savat tugmasiga alohida
const navCart = document.getElementById('nav-cart-btn');
if (navCart) {
  navCart.removeEventListener('click', openCart);
  navCart.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  });
} 
'use strict';

const SK = {
  USER: 'ny3_user',
  FOODS: 'ny3_foods',
  CART: 'ny3_cart',
  HIST: 'ny3_hist',
  ORDERS: 'ny3_orders',
  BONUS: 'ny3_bonus',
  SPINS: 'ny3_spins',
  LANG: 'ny3_lang',
  THEME: 'ny3_theme'
};

const ld = (k, fb = null) => {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : fb;
  } catch { return fb; }
};
const sv = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch { }
};
const $ = id => document.getElementById(id);
const fmt = n => new Intl.NumberFormat('uz-UZ').format(n) + " so'm";
const calcDia = p => Math.floor(p / 10000);
const calcCB = p => Math.floor(p * 0.03);
const genId = () => Math.floor(1000 + Math.random() * 9000); // 4 xonali ID (raqam)

/* ══════════════════════════════════════
   15 TA SOF O'ZBEK MILLIY TAOMI (pitsa/burger yo'q)
══════════════════════════════════════ */
const DEFAULT_FOODS = [
  // MILLIY TAOMLAR — 15 ta
  { id: 'm1', name: "Osh (Palov)", cat: 'milliy', desc: "An'anaviy o'zbek palovi, qo'y go'shti va sabzavotlar bilan.", img: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80', price: 28000 },
  { id: 'm2', name: "Lag'mon", cat: 'milliy', desc: "Qo'lda tortilgan makaron, go'sht va sabzavotlar bilan.", img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80', price: 22000 },
  { id: 'm3', name: "Somsa", cat: 'milliy', desc: "Tandirda pishgan go'shtli somsa.", img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80', price: 8000 },
  { id: 'm4', name: "Manti", cat: 'milliy', desc: "Bug'da pishirilgan katta manti, qatiq bilan.", img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80', price: 26000 },
  { id: 'm5', name: "Shurpa", cat: 'milliy', desc: "Qo'y go'shtidan qaynatilgan boy sho'rva.", img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80', price: 20000 },
  { id: 'm6', name: "Dimlama", cat: 'milliy', desc: "Sabzavot va go'sht damlab pishirilgan.", img: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80', price: 25000 },
  { id: 'm7', name: "Mastava", cat: 'milliy', desc: "Guruch va go'sht solingan milliy sho'rva.", img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80', price: 18000 },
  { id: 'm8', name: "Norin", cat: 'milliy', desc: "Qazi va go'sht bilan tayyorlanadigan norin.", img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80', price: 24000 },
  { id: 'm9', name: "Qozon Kabob", cat: 'milliy', desc: "Qozonda pishirilgan go'sht va kartoshka.", img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80', price: 30000 },
  { id: 'm10', name: "Chuchvara", cat: 'milliy', desc: "Kichkina go'shtli chuchvara, sho'rva yoki qatiq bilan.", img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80', price: 22000 },
  { id: 'm11', name: "Tandir Kabob", cat: 'milliy', desc: "Tandirda pishirilgan kabob, sabzavotlar bilan.", img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80', price: 35000 },
  { id: 'm12', name: "Kazin", cat: 'milliy', desc: "Quritilgan go'sht mahsuloti.", img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80', price: 45000 },
  { id: 'm13', name: "Halim", cat: 'milliy', desc: "Bug'doy va go'shtdan tayyorlangan boy taom.", img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80', price: 32000 },
  { id: 'm14', name: "Ko'k Choy", cat: 'ichimlik', desc: "O'zbek an'anaviy ko'k choy.", img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80', price: 5000 },
  { id: 'm15', name: "Tandir Non", cat: 'non', desc: "Tandirda yangi yopilgan o'zbek noni.", img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', price: 4000 },
  // QO'SHIMCHA MILLIY (to'liq 15 ta bo'lishi uchun)
  { id: 'm16', name: "Kashkari", cat: 'milliy', desc: "Go'shtli va sabzavotli qalin sho'rva.", img: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80', price: 27000 }
];

const LEVELS = [
  { name: 'bronze', label: 'Bronze', icon: '🥉', min: 0 },
  { name: 'silver', label: 'Silver', icon: '🥈', min: 50 },
  { name: 'gold', label: 'Gold', icon: '🥇', min: 200 },
  { name: 'diamond', label: 'Diamond', icon: '💎', min: 1000 },
];

const FAQUZ = [
  { q: "Qanday buyurtma beraman?", a: "Taomni tanlang, savatga qo'shing, Payme yoki Click bilan to'lang." },
  { q: "💎 Olmoslar nima?", a: "Har 10 000 so'm sarflashda 1 olmos beriladi." },
  { q: "💰 Cashback qanday ishlaydi?", a: "Har buyurtmadan 3% cashback yig'iladi. Keyingi buyurtmada chegirma sifatida ishlatish mumkin." },
  { q: "Kunlik ruletka necha marta?", a: "Har kuni 3 marta bepul aylantirish imkoniyati." },
  { q: "To'lov usullari qanday?", a: "Payme yoki Click orqali to'lov qilish mumkin." },
];

/* STATE */
let S = {
  user: null, foods: [], cart: [], hist: [], orders: [],
  page: 'home', cat: 'all', search: '', lang: 'uz', theme: 'light',
  spinning: false, fmFood: null, fmQty: 1,
  editFoodId: null, payMethod: 'payme',
  useCashback: false, bannerIdx: 0, bannerTimer: null,
  pendingOrderTotal: 0, wAngle: 0
};

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
function init() {
  S.user = ld(SK.USER);
  S.foods = ld(SK.FOODS) || DEFAULT_FOODS;
  S.cart = ld(SK.CART) || [];
  S.hist = ld(SK.HIST) || [];
  S.orders = ld(SK.ORDERS) || [];
  S.lang = ld(SK.LANG) || 'uz';
  S.theme = ld(SK.THEME) || 'light';
  applyTheme(S.theme);
  bindAll();
  splash();
}

/* SPLASH */
function splash() {
  setTimeout(() => {
    const el = $('splash');
    el.style.transition = 'opacity .5s ease,transform .5s ease';
    el.style.opacity = '0';
    el.style.transform = 'scale(1.04)';
    setTimeout(() => {
      el.classList.add('hidden');
      S.user ? startApp() : showAuth();
    }, 500);
  }, 2600);
}

function showAuth() { $('screen-auth').classList.remove('hidden'); }

function handleRegister() {
  const name = $('inp-name').value.trim();
  const phone = $('inp-phone').value.replace(/\s/g, '');
  $('err-name').textContent = '';
  $('err-phone').textContent = '';
  let ok = true;
  if (name.length < 2) { $('err-name').textContent = "Iltimos, to'liq ismingizni kiriting"; ok = false; }
  if (phone.length !== 9 || !/^\d+$/.test(phone)) { $('err-phone').textContent = "Telefon 9 raqamdan iborat bo'lishi kerak"; ok = false; }
  if (!ok) return;
  S.user = {
    id: Date.now() + '', name, phone: '+998' + phone,
    dia: 10, cashbackBalance: 0, xp: 0, orders: 0, createdAt: Date.now()
  };
  sv(SK.USER, S.user);
  const btn = $('btn-continue');
  btn.innerHTML = '<span>✅ Muvaffaqiyatli!</span>';
  btn.style.background = '#009e52';
  setTimeout(() => {
    $('screen-auth').classList.add('hidden');
    startApp();
    toast('Xush kelibsiz, ' + S.user.name.split(' ')[0] + '! 🎉', 'success');
  }, 700);
}

function startApp() {
  $('app').classList.remove('hidden');
  updateTopbar();
  renderFoods();
  updateCartBadge();
  checkBonus();
  startBannerSlider();
  goPage('home');
}

function updateTopbar() {
  if (!S.user) return;
  $('top-diamonds').textContent = S.user.dia;
  $('top-cashback').textContent = fmt(S.user.cashbackBalance || 0);
  $('avatar-letter').textContent = S.user.name[0].toUpperCase();
}

function goPage(pg) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.add('hidden');
    p.classList.remove('active');
  });
  const target = $('page-' + pg);
  if (target) { target.classList.remove('hidden'); target.classList.add('active'); }
  document.querySelectorAll('.bnav[data-page]').forEach(b => b.classList.toggle('active', b.dataset.page === pg));
  S.page = pg;
  if (pg === 'home') { updateGreeting(); renderFoods(); }
  if (pg === 'roulette') { drawWheel(S.wAngle || 0); updateSpinUI(); }
  if (pg === 'rewards') { renderRewards(); }
  if (pg === 'profile') { renderProfile(); }
  if (pg === 'orders') { renderOrders(); }
}

function updateGreeting() {
  if (!S.user) return;
  const h = new Date().getHours();
  const g = h < 12 ? 'Xayrli tong' : h < 18 ? 'Xayrli kun' : 'Xayrli kech';
  $('greet-line').textContent = g + '!';
  $('greet-name').textContent = S.user.name.split(' ')[0];
  const lvl = getLevel(S.user.dia);
  $('greet-badge').textContent = lvl.icon + ' ' + lvl.label;
}

function getLevel(d) { return LEVELS.slice().reverse().find(l => d >= l.min) || LEVELS[0]; }

function startBannerSlider() {
  const track = $('banner-track');
  const dots = $('banner-dots');
  const slides = track?.querySelectorAll('.banner-slide');
  if (!slides?.length) return;
  dots.innerHTML = '';
  slides.forEach((_, i) => {
    const d = document.createElement('span');
    if (i === 0) d.classList.add('active');
    dots.appendChild(d);
  });
  clearInterval(S.bannerTimer);
  S.bannerTimer = setInterval(() => {
    S.bannerIdx = (S.bannerIdx + 1) % slides.length;
    slides[S.bannerIdx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    dots.querySelectorAll('span').forEach((d, i) => d.classList.toggle('active', i === S.bannerIdx));
  }, 3500);
}

function checkBonus() {
  const today = new Date().toDateString();
  const btn = $('btn-daily');
  if (ld(SK.BONUS) === today) { btn.textContent = '✅ Olindi'; btn.disabled = true; }
  else { btn.textContent = 'Olish'; btn.disabled = false; }
}

function claimBonus() {
  const today = new Date().toDateString();
  if (ld(SK.BONUS) === today) { toast('Bugungi bonus allaqachon olindi!', 'warning'); return; }
  sv(SK.BONUS, today);
  addDia(5);
  addXP(50);
  $('btn-daily').textContent = '✅ Olindi';
  $('btn-daily').disabled = true;
  toast('💎 +5 Olmos olindi! Barakalla!', 'success');
  confetti();
  updateTopbar();
}

/* ══════════════════════════════════════
   FOODS — faqat milliy taomlar asosiy
══════════════════════════════════════ */
function renderFoods() {
  const grid = $('food-grid');
  const empty = $('empty-foods');
  if (!grid) return;
  let data = [...S.foods];
  if (S.cat !== 'all') data = data.filter(f => f.cat === S.cat);
  if (S.search) {
    const q = S.search.toLowerCase();
    data = data.filter(f => f.name.toLowerCase().includes(q) || f.cat.includes(q));
  }
  grid.innerHTML = '';
  $('sec-title').textContent = S.cat === 'all' ? 'Mashhur taomlar' : S.cat;
  $('sec-count').textContent = data.length + ' ta';
  if (!data.length) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  data.forEach((food, i) => {
    const dia = calcDia(food.price);
    const card = document.createElement('div');
    card.className = 'food-card';
    card.style.animationDelay = i * 0.04 + 's';
    card.innerHTML = `
      <div class="fc-img-wrap">
        <img class="fc-img" src="${food.img}" alt="${food.name}" loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'"/>
        <span class="fc-badge">💎 ${dia}</span>
      </div>
      <div class="fc-body">
        <div class="fc-name">${food.name}</div>
        <div class="fc-price">${fmt(food.price)}</div>
        <div class="fc-foot">
          <span class="fc-cb">💰 3%</span>
          <button class="fc-add" data-id="${food.id}" aria-label="Qo'shish">+</button>
        </div>
      </div>`;
    card.querySelector('.fc-img-wrap').addEventListener('click', () => openFoodModal(food));
    card.querySelector('.fc-name').addEventListener('click', () => openFoodModal(food));
    card.querySelector('.fc-add').addEventListener('click', e => { e.stopPropagation(); addToCart(food.id); });
    grid.appendChild(card);
  });
}

function openFoodModal(food) {
  S.fmFood = food;
  S.fmQty = 1;
  $('fm-img').src = food.img;
  $('fm-img').onerror = () => $('fm-img').src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80';
  $('fm-name').textContent = food.name;
  $('fm-desc').textContent = food.desc || '';
  $('fm-price').textContent = fmt(food.price);
  $('fm-cb').textContent = '💰 Cashback 3%';
  $('fm-dia').textContent = '💎 +' + calcDia(food.price) + ' olmos';
  $('fm-qty').textContent = 1;
  $('btn-fm-add').textContent = 'Savatga qo\'shish — ' + fmt(food.price);
  openDrawer('food-modal', 'food-backdrop');
}

function closeFoodModal() { closeDrawer('food-modal', 'food-backdrop'); }

function updateFMQty() {
  $('fm-qty').textContent = S.fmQty;
  if (S.fmFood) $('btn-fm-add').textContent = 'Savatga qo\'shish — ' + fmt(S.fmFood.price * S.fmQty);
}

/* ══════════════════════════════════════
   CART + CASHBACK ISHLATISH
══════════════════════════════════════ */
function addToCart(id, qty = 1) {
  const food = S.foods.find(f => f.id == id);
  if (!food) return;
  const ex = S.cart.find(i => i.id == id);
  if (ex) ex.qty += qty;
  else S.cart.push({ ...food, qty });
  sv(SK.CART, S.cart);
  updateCartBadge();
  toast('🛒 ' + food.name + ' savatga qo\'shildi', 'success');
  animBadge();
}

function removeFromCart(id) {
  const i = S.cart.findIndex(x => x.id == id);
  if (i === -1) return;
  if (S.cart[i].qty > 1) S.cart[i].qty--;
  else S.cart.splice(i, 1);
  sv(SK.CART, S.cart);
  updateCartBadge();
  renderCartBody();
}

function updateCartBadge() {
  const n = S.cart.reduce((s, i) => s + i.qty, 0);
  $('cart-badge-nav').textContent = n;
  $('cart-badge-nav').classList.toggle('hidden', n === 0);
}

function animBadge() {
  const b = $('cart-badge-nav');
  b.style.transform = 'scale(1.6)';
  setTimeout(() => b.style.transform = '', 200);
}

function openCart() {
  renderCartBody();
  openDrawer('cart-drawer', 'cart-backdrop');
}

function closeCart() { closeDrawer('cart-drawer', 'cart-backdrop'); }

function renderCartBody() {
  const body = $('cart-body');
  const footer = $('cart-footer');
  const cbSection = $('cashback-use-section');
  body.innerHTML = '';
  if (!S.cart.length) {
    body.innerHTML = `<div class="cart-empty-box"><div>🛒</div><p>Savat bo'sh</p><span>Taom qo'shing</span></div>`;
    footer.classList.add('hidden');
    cbSection.classList.add('hidden');
    return;
  }
  footer.classList.remove('hidden');
  S.cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img class="ci-img" src="${item.img}" alt="${item.name}"
        onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'"/>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">${fmt(item.price * item.qty)}</div>
      </div>
      <div class="ci-ctrl">
        <button class="qty-btn" data-id="${item.id}" data-act="remove">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn plus-btn" data-id="${item.id}" data-act="add">+</button>
      </div>`;
    body.appendChild(div);
  });

  const cbBal = S.user?.cashbackBalance || 0;
  if (cbBal > 0) {
    cbSection.classList.remove('hidden');
    $('cb-available-text').textContent = 'Mavjud: ' + fmt(cbBal);
    $('use-cashback-toggle').checked = S.useCashback;
  } else {
    cbSection.classList.add('hidden');
    S.useCashback = false;
  }
  updateCartTotals();
}

function updateCartTotals() {
  const subtotal = S.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cbBal = S.user?.cashbackBalance || 0;
  const cbDiscount = S.useCashback ? Math.min(cbBal, Math.floor(subtotal * 0.5)) : 0;
  const total = subtotal - cbDiscount;
  const dia = calcDia(total);
  const newCB = calcCB(total);

  $('ct-subtotal').textContent = fmt(subtotal);
  const savingRow = $('cs-saving');
  const savingEl = $('ct-saving');
  if (cbDiscount > 0) { savingRow.classList.remove('hidden'); savingEl.textContent = '-' + fmt(cbDiscount); }
  else savingRow.classList.add('hidden');
  $('ct-total').textContent = fmt(total);
  $('ct-diamonds').textContent = '+' + dia;
  $('ct-cashback').textContent = '+' + fmt(newCB);

  const cbDRow = $('cb-discount-row');
  const cbDAmt = $('cb-discount-amount');
  if (S.useCashback && cbDiscount > 0) {
    cbDRow.classList.remove('hidden');
    cbDAmt.textContent = '-' + fmt(cbDiscount);
  } else cbDRow.classList.add('hidden');
}

/* ══════════════════════════════════════
   PAYMENT (faqat Payme va Click)
══════════════════════════════════════ */
function openPayment() {
  if (!S.cart.length) return;
  const subtotal = S.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cbBal = S.user?.cashbackBalance || 0;
  const cbDiscount = S.useCashback ? Math.min(cbBal, Math.floor(subtotal * 0.5)) : 0;
  const total = subtotal - cbDiscount;
  S.pendingOrderTotal = total;
  $('pay-amount').textContent = fmt(total);
  setPayMethod('payme');
  openDrawer('pay-drawer', 'pay-backdrop');
}

function closePayment() { closeDrawer('pay-drawer', 'pay-backdrop'); }

function setPayMethod(method) {
  S.payMethod = method;
  ['payme', 'click'].forEach(m => {
    const btn = $('pm-' + m);
    const chk = $('check-' + m);
    if (btn) btn.classList.toggle('active', m === method);
    if (chk) chk.classList.toggle('hidden', m !== method);
  });
  const notes = {
    payme: 'Payme orqali to\'lov qilgach, buyurtmangiz avtomatik tasdiqlanadi.',
    click: 'Click ilovasi orqali tez va xavfsiz to\'lov.'
  };
  $('pay-note-text').textContent = notes[method] || '';
}

function confirmOrder() {
  const subtotal = S.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cbBal = S.user?.cashbackBalance || 0;
  const cbDiscount = S.useCashback ? Math.min(cbBal, Math.floor(subtotal * 0.5)) : 0;
  const total = subtotal - cbDiscount;
  const dia = calcDia(total);
  const newCB = calcCB(total);
  const xp = Math.floor(total / 1000);
  const orderId = '#' + genId(); // 4 xonali ID masalan #4721

  const order = {
    id: orderId,
    items: [...S.cart],
    subtotal: subtotal,
    cbDiscount: cbDiscount,
    total: total,
    dia: dia,
    newCB: newCB,
    method: S.payMethod,
    date: new Date().toLocaleDateString('uz-UZ'),
    time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
    ts: Date.now(),
    status: 'done'
  };
  S.orders.unshift(order);
  sv(SK.ORDERS, S.orders);
  addDia(dia);
  addXP(xp);
  if (S.user) {
    S.user.cashbackBalance = (S.user.cashbackBalance || 0) + newCB;
    if (S.useCashback) S.user.cashbackBalance = Math.max(0, (S.user.cashbackBalance || 0) - cbDiscount);
    S.user.orders = (S.user.orders || 0) + 1;
    sv(SK.USER, S.user);
  }
  S.useCashback = false;
  S.cart = [];
  sv(SK.CART, S.cart);
  closePayment();
  closeCart();
  confetti();
  updateTopbar();
  updateCartBadge();
  const methods = { payme: 'Payme', click: 'Click' };
  toast(`✅ Buyurtma berildi! ${methods[S.payMethod]} · 💎+${dia} · ID: ${orderId}`, 'success', 5000);
}

/* ══════════════════════════════════════
   USER STATS
══════════════════════════════════════ */
function addDia(n) {
  if (!S.user) return;
  S.user.dia = (S.user.dia || 0) + n;
  sv(SK.USER, S.user);
  updateTopbar();
}

function addXP(n) {
  if (!S.user) return;
  S.user.xp = (S.user.xp || 0) + n;
  sv(SK.USER, S.user);
}

/* ══════════════════════════════════════
   ROULETTE — KUNLIK 3 TA LIMIT + MILLIY TAOMLAR
══════════════════════════════════════ */
function getTodaySpins() {
  const data = ld(SK.SPINS) || { date: '', count: 0 };
  const today = new Date().toDateString();
  if (data.date !== today) return { date: today, count: 0 };
  return data;
}

function useSpin() {
  const s = getTodaySpins();
  s.count++;
  s.date = new Date().toDateString();
  sv(SK.SPINS, s);
}

function spinsLeft() { const s = getTodaySpins(); return Math.max(0, 3 - s.count); }

function updateSpinUI() {
  const left = spinsLeft();
  $('rou-spins-left').textContent = left;
  $('btn-spin').disabled = left === 0 || S.spinning;
  if (left === 0) { $('spin-txt').textContent = '✅ Tugadi'; }
  else { $('spin-txt').textContent = 'SPIN'; }
}

function drawWheel(angle = 0) {
  const canvas = $('wheel-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const wheelFoods = S.foods.filter(f => f.cat === 'milliy').slice(0, 8);
  if (wheelFoods.length < 2) wheelFoods.push(...S.foods.slice(0, 8));
  const n = wheelFoods.length;
  const sa = (2 * Math.PI) / n;
  const cx = canvas.width / 2, cy = canvas.height / 2, r = cx - 8;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const COLORS = ['#00c566', '#009e52', '#00a855', '#00d26a', '#007a40', '#00b85a', '#008a4a', '#00c060'];
  wheelFoods.forEach((food, i) => {
    const start = angle + i * sa, end = start + sa, mid = start + sa / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(mid);
    ctx.textAlign = 'right';
    ctx.font = 'bold 9px DM Sans,sans-serif';
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 2;
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    const shortName = food.name.substring(0, 9);
    ctx.fillText(shortName, r - 10, 4);
    ctx.restore();
  });
  const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 38);
  cg.addColorStop(0, '#fff');
  cg.addColorStop(1, '#f0f1f5');
  ctx.beginPath();
  ctx.arc(cx, cy, 38, 0, 2 * Math.PI);
  ctx.fillStyle = cg;
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.strokeStyle = '#00c566';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function spinWheel() {
  if (S.spinning) return;
  if (spinsLeft() <= 0) {
    toast('Bugunlik spinlar tugadi! Ertaga qaytib keling 😊', 'warning');
    return;
  }
  S.spinning = true;
  $('btn-spin').disabled = true;
  $('rou-result').classList.add('hidden');
  useSpin();
  updateSpinUI();

  const wheelFoods = S.foods.filter(f => f.cat === 'milliy').slice(0, 8);
  if (wheelFoods.length < 2) wheelFoods.push(...S.foods.slice(0, 8));
  const n = wheelFoods.length;
  const sa = (2 * Math.PI) / n;
  const winIdx = Math.floor(Math.random() * n);
  const extra = (7 + Math.floor(Math.random() * 5)) * 2 * Math.PI;
  const norm = S.wAngle % (2 * Math.PI);
  const winMid = (winIdx + 0.5) * sa;
  let delta = -Math.PI / 2 - winMid - norm;
  while (delta < Math.PI * 2) delta += 2 * Math.PI;
  const target = S.wAngle + delta + extra;
  const dur = 4000 + Math.random() * 1500;
  const t0 = performance.now();
  const from = S.wAngle;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3.8); }
  function frame(now) {
    const el = now - t0, prog = Math.min(el / dur, 1);
    S.wAngle = from + (target - from) * easeOut(prog);
    drawWheel(S.wAngle);
    if (prog < 1) {
      requestAnimationFrame(frame);
    } else {
      S.wAngle = target;
      drawWheel(S.wAngle);
      S.spinning = false;
      $('btn-spin').disabled = false;
      applyWinFood(wheelFoods[winIdx]);
      updateSpinUI();
    }
  }
  requestAnimationFrame(frame);
}

function applyWinFood(food) {
  $('result-title').textContent = '🎉 Tabriklaymiz!';
  $('result-img').src = food.img;
  $('result-img').onerror = () => $('result-img').src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80';
  $('result-name').textContent = food.name;
  $('result-desc').textContent = food.desc || '';
  $('btn-result-cart').dataset.foodId = food.id;
  confetti();
  toast('🎉 ' + food.name + ' yutdingiz! Savatga qo\'shing!', 'success');
  S.hist.unshift({ icon: '🥘', label: food.name, price: fmt(food.price), time: new Date().toLocaleTimeString() });
  if (S.hist.length > 10) S.hist.pop();
  sv(SK.HIST, S.hist);
  renderHist();
  $('rou-result').classList.remove('hidden');
}

function renderHist() {
  const list = $('rou-hist-list');
  if (!list) return;
  list.innerHTML = '';
  if (!S.hist.length) { list.innerHTML = '<p style="color:var(--text3);font-size:13px;text-align:center;padding:14px">Hali o\'yin yo\'q</p>'; return; }
  S.hist.forEach(h => {
    const d = document.createElement('div');
    d.className = 'hist-item';
    d.innerHTML = `<span class="hist-ico">${h.icon}</span><div><div class="hist-name">${h.label}</div><div class="hist-time">${h.time}</div></div>`;
    list.appendChild(d);
  });
}

/* ══════════════════════════════════════
   ORDERS PAGE (4 xonali ID bilan)
══════════════════════════════════════ */
function renderOrders() {
  const list = $('orders-list');
  const empty = $('empty-orders');
  if (!list) return;
  list.innerHTML = '';
  if (!S.orders.length) { empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  S.orders.forEach(order => {
    const card = document.createElement('div');
    card.className = 'order-card';
    const itemsPreview = order.items.slice(0, 3).map(i => `<span class="order-item-chip">${i.name} x${i.qty}</span>`).join('');
    const methodLabels = { payme: '💳 Payme', click: '🟠 Click' };
    card.innerHTML = `
      <div class="order-card-top">
        <span class="order-id">${order.id}</span>
        <span class="order-status status-done">✅ Bajarildi</span>
      </div>
      <div class="order-items-preview">${itemsPreview}${order.items.length > 3 ? `<span class="order-item-chip">+${order.items.length - 3} ta</span>` : ''}</div>
      <div class="order-card-bottom">
        <span class="order-meta">${order.date} · ${order.time || ''} · ${methodLabels[order.method] || order.method || ''}</span>
        <span class="order-total">${fmt(order.total)}</span>
      </div>
      <div class="order-rewards">
        <span class="order-reward-chip">💎 +${order.dia}</span>
        <span class="order-reward-chip">💰 +${fmt(order.newCB || 0)}</span>
        ${order.cbDiscount > 0 ? `<span class="order-reward-chip">✂️ -${fmt(order.cbDiscount)}</span>` : ''}
      </div>`;
    card.addEventListener('click', () => openOrderDetail(order));
    list.appendChild(card);
  });
}

function openOrderDetail(order) {
  const body = $('order-modal-body');
  const methodLabels = { payme: '💳 Payme', click: '🟠 Click' };
  body.innerHTML = `
    <div class="od-header">
      <div class="od-id">Buyurtma ${order.id}</div>
      <div class="od-date">📅 ${order.date} ${order.time ? '· ⏰ ' + order.time : ''}</div>
      <span class="od-method">${methodLabels[order.method] || order.method || '—'}</span>
    </div>
    <p class="od-items-title">Taomlar (${order.items.length} ta)</p>
    ${order.items.map(item => `
      <div class="od-item">
        <img class="od-item-img" src="${item.img}" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'" alt=""/>
        <div class="od-item-name">${item.name}<div class="od-item-qty">x${item.qty}</div></div>
        <span class="od-item-price">${fmt(item.price * item.qty)}</span>
      </div>`).join('')}
    <div class="od-totals">
      <div class="od-row"><span>Mahsulotlar:</span><span>${fmt(order.subtotal || order.total)}</span></div>
      ${order.cbDiscount > 0 ? `<div class="od-row green"><span>💰 Cashback chegirma:</span><span>-${fmt(order.cbDiscount)}</span></div>` : ''}
      <div class="od-row"><span><strong>Jami to'landi:</strong></span><span><strong>${fmt(order.total)}</strong></span></div>
      <div class="od-row green"><span>💎 Olmoslar:</span><span>+${order.dia}</span></div>
      <div class="od-row green"><span>💰 Yangi cashback:</span><span>+${fmt(order.newCB || 0)}</span></div>
    </div>`;
  openDrawer('order-modal', 'order-backdrop');
}

/* ══════════════════════════════════════
   REWARDS
══════════════════════════════════════ */
function renderRewards() {
  if (!S.user) return;
  const u = S.user;
  const lvl = getLevel(u.dia);
  $('lvl-icon').textContent = lvl.icon;
  $('lvl-name').textContent = lvl.label;
  const ni = LEVELS.indexOf(lvl) + 1;
  const next = LEVELS[ni];
  $('lvl-next').textContent = next ? 'Keyingi: ' + next.label : 'MAX Level! 🏆';
  $('rew-dia').textContent = u.dia;
  const xp = u.xp || 0;
  const xpPct = Math.min((xp % 1000) / 10, 100);
  $('xp-fill').style.width = xpPct + '%';
  $('xp-cur').textContent = xp + ' XP';
  $('xp-nxt').textContent = Math.ceil((xp + 1) / 1000) * 1000 + ' XP';
  LEVELS.forEach(l => {
    const el = $('lc-' + l.name);
    if (el) el.classList.toggle('active-lvl', l.name === lvl.name);
  });
}

/* ══════════════════════════════════════
   PROFILE
══════════════════════════════════════ */
function renderProfile() {
  if (!S.user) return;
  const u = S.user, lvl = getLevel(u.dia);
  $('p-avatar').textContent = u.name[0].toUpperCase();
  $('p-name').textContent = u.name;
  $('p-phone').textContent = u.phone;
  $('p-level').textContent = lvl.icon + ' ' + lvl.label;
  $('ps-dia').textContent = u.dia;
  $('ps-cb').textContent = fmt(u.cashbackBalance || 0).replace(" so'm", '');
  $('ps-ord').textContent = u.orders || 0;
  document.querySelectorAll('.sw-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === S.lang));
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.t === S.theme));
  renderFAQ();
}

function renderFAQ() {
  const list = $('faq-list');
  if (!list) return;
  list.innerHTML = '';
  const faqs = FAQUZ;
  faqs.forEach(faq => {
    const d = document.createElement('div');
    d.className = 'faq-item';
    d.innerHTML = `<div class="faq-q"><span>${faq.q}</span><span class="faq-chev">▼</span></div><div class="faq-a"><div class="faq-a-inner">${faq.a}</div></div>`;
    d.querySelector('.faq-q').addEventListener('click', () => d.classList.toggle('open'));
    list.appendChild(d);
  });
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  S.theme = t;
  sv(SK.THEME, t);
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.t === t));
}

function setLang(l) {
  S.lang = l;
  sv(SK.LANG, l);
  document.querySelectorAll('.sw-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
  if (S.page === 'home') { updateGreeting(); renderFoods(); }
  if (S.page === 'profile') renderProfile();
}

/* ══════════════════════════════════════
   DRAWER HELPERS
══════════════════════════════════════ */
function openDrawer(drawerId, backdropId) {
  const d = $(drawerId), b = $(backdropId);
  d.classList.remove('hidden');
  b.classList.remove('hidden');
  requestAnimationFrame(() => d.classList.add('open'));
}

function closeDrawer(drawerId, backdropId) {
  const d = $(drawerId);
  d.classList.remove('open');
  setTimeout(() => {
    d.classList.add('hidden');
    $(backdropId).classList.add('hidden');
  }, 380);
}

function toast(msg, type = 'success', dur = 3200) {
  const wrap = $('toast-wrap');
  const icons = { success: '✅', error: '❌', warning: '⚠️' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'tOut .3s ease forwards';
    setTimeout(() => el.remove(), 300);
  }, dur);
}

function confetti() {
  const cv = $('confetti-cv');
  if (!cv) return;
  cv.width = innerWidth;
  cv.height = innerHeight;
  cv.classList.remove('hidden');
  const ctx = cv.getContext('2d');
  const colors = ['#00c566', '#009e52', '#f39c12', '#e74c3c', '#3498db', '#fff', '#ffd700'];
  const pieces = Array.from({ length: 90 }, () => ({
    x: Math.random() * cv.width, y: -8,
    w: 5 + Math.random() * 8, h: 3 + Math.random() * 5,
    c: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - .5) * 7, vy: 3 + Math.random() * 5,
    a: Math.random() * Math.PI * 2, va: (Math.random() - .5) * 0.2,
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.a += p.va; p.vy += 0.08;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
      ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (++frame < 105) requestAnimationFrame(draw);
    else cv.classList.add('hidden');
  }
  requestAnimationFrame(draw);
}

/* ══════════════════════════════════════
   BIND ALL
══════════════════════════════════════ */
function bindAll() {
  $('inp-phone')?.addEventListener('input', () => {
    let v = $('inp-phone').value.replace(/\D/g, '').slice(0, 9);
    let f = '';
    if (v.length > 0) f = v.slice(0, 2);
    if (v.length > 2) f += ' ' + v.slice(2, 5);
    if (v.length > 5) f += ' ' + v.slice(5, 7);
    if (v.length > 7) f += ' ' + v.slice(7, 9);
    $('inp-phone').value = f;
  });
  $('btn-continue')?.addEventListener('click', handleRegister);
  $('btn-avatar')?.addEventListener('click', () => goPage('profile'));

  document.querySelectorAll('.bnav[data-page]').forEach(b => b.addEventListener('click', () => goPage(b.dataset.page)));
  $('nav-cart-btn')?.addEventListener('click', openCart);

  $('search-inp')?.addEventListener('input', () => {
    S.search = $('search-inp').value;
    $('s-clear').classList.toggle('hidden', !S.search);
    renderFoods();
  });
  $('s-clear')?.addEventListener('click', () => {
    $('search-inp').value = '';
    S.search = '';
    $('s-clear').classList.add('hidden');
    renderFoods();
  });

  document.querySelectorAll('.cat-pill').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.cat-pill').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    S.cat = b.dataset.cat;
    renderFoods();
  }));

  $('btn-daily')?.addEventListener('click', claimBonus);

  $('cart-backdrop')?.addEventListener('click', closeCart);
  $('cart-close')?.addEventListener('click', closeCart);
  $('cart-body')?.addEventListener('click', e => {
    const btn = e.target.closest('.qty-btn');
    if (!btn) return;
    if (btn.dataset.act === 'add') addToCart(btn.dataset.id);
    else removeFromCart(btn.dataset.id);
  });

  $('use-cashback-toggle')?.addEventListener('change', e => {
    S.useCashback = e.target.checked;
    updateCartTotals();
  });

  $('btn-pay')?.addEventListener('click', openPayment);

  $('pay-backdrop')?.addEventListener('click', closePayment);
  $('pay-close')?.addEventListener('click', closePayment);
  document.querySelectorAll('.pay-method').forEach(btn => btn.addEventListener('click', () => setPayMethod(btn.dataset.method)));
  $('btn-confirm-pay')?.addEventListener('click', confirmOrder);

  $('food-backdrop')?.addEventListener('click', closeFoodModal);
  $('fm-close')?.addEventListener('click', closeFoodModal);
  $('fm-minus')?.addEventListener('click', () => { if (S.fmQty > 1) { S.fmQty--; updateFMQty(); } });
  $('fm-plus')?.addEventListener('click', () => { S.fmQty++; updateFMQty(); });
  $('btn-fm-add')?.addEventListener('click', () => {
    if (!S.fmFood) return;
    addToCart(S.fmFood.id, S.fmQty);
    closeFoodModal();
  });

  $('btn-spin')?.addEventListener('click', spinWheel);
  $('btn-spin-again')?.addEventListener('click', () => { $('rou-result').classList.add('hidden'); spinWheel(); });
  $('btn-result-cart')?.addEventListener('click', () => {
    const id = $('btn-result-cart').dataset.foodId;
    if (id) { addToCart(id); $('rou-result').classList.add('hidden'); }
  });

  document.querySelectorAll('.lb-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  }));

  document.querySelectorAll('.sw-btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  document.querySelectorAll('.theme-btn').forEach(b => b.addEventListener('click', () => applyTheme(b.dataset.t)));
  $('go-orders')?.addEventListener('click', () => goPage('orders'));
  $('btn-logout')?.addEventListener('click', () => {
    if (confirm('Haqiqatan ham chiqmoqchimisiz?')) {
      [SK.USER, SK.CART].forEach(k => localStorage.removeItem(k));
      location.reload();
    }
  });

  $('order-backdrop')?.addEventListener('click', () => closeDrawer('order-modal', 'order-backdrop'));
  $('order-modal-close')?.addEventListener('click', () => closeDrawer('order-modal', 'order-backdrop'));
}

document.addEventListener('DOMContentLoaded', init);
