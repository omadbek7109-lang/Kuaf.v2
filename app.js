/* ═══════════════════════════════════════════
   NIMA YEYMIZ? — app.js v2.0
   Premium Wolt/Uzum Style
   ═══════════════════════════════════════════ */
'use strict';

/* ── STORAGE ── */
const SK = { USER:'ny2_user', FOODS:'ny2_foods', CART:'ny2_cart', REWARDS:'ny2_rewards', HIST:'ny2_hist', ORDERS:'ny2_orders', BONUS:'ny2_bonus', LANG:'ny2_lang', THEME:'ny2_theme', TOTAL_DIA:'ny2_total_dia' };
const ld = (k,fb=null)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):fb}catch{return fb}};
const sv = (k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};

/* ── TRANSLATIONS ── */
const TR = {
  uz:{
    greet_morning:'Xayrli tong',greet_day:'Xayrli kun',greet_evening:'Xayrli kech',
    search_ph:'Taom yoki kategoriya qidiring...',
    popular:'Mashhur taomlar',all_foods:'Barcha taomlar',
    daily_title:'Kunlik bonus',daily_sub:'💎 +1 olmos oling',
    daily_btn:'Olish',daily_done:'✅ Olindi',daily_claimed:'Bugungi bonus allaqachon olindi!',
    daily_success:'💎 +1 Olmos olindi!',
    cart_empty_title:'Savat bo\'sh',cart_empty_sub:'Taom qo\'shing',
    checkout:'Buyurtma berish 🚀',
    checkout_ok:'✅ Buyurtma berildi!',
    added:'savatga qo\'shildi',
    spin_no_dia:'💎 Olmos yetarli emas!',
    spin_win:'Tabriklaymiz!',spin_lose:'Omad kulmadi!',
    logout_confirm:'Haqiqatan ham chiqmoqchimisiz?',
    food_name_req:'Taom nomini kiriting!',food_price_req:'Narxni kiriting!',
    food_saved:'✅ Taom saqlandi!',food_deleted:'🗑️ Taom o\'chirildi',
    reward_saved:'✅ Sovrin saqlandi!',reward_deleted:'🗑️ Sovrin o\'chirildi',
    level_up:'darajaga ko\'tarildingiz!',
    name_err:'Iltimos, to\'liq ismingizni kiriting',
    phone_err:'Telefon raqam 9 ta raqamdan iborat bo\'lishi kerak',
    welcome:'ga xush kelibsiz! 🎉',
    orders_label:'buyurtma',
    you_label:' (Siz)',
    faq:[
      {q:'Qanday buyurtma beraman?',a:'Taomni tanlang, savatga qo\'shing va "Buyurtma berish" tugmasini bosing.'},
      {q:'💎 Olmoslar nima?',a:'Har 10 000 so\'m sarflashda 1 olmos beriladi. Olmoslar bilan ruletka o\'ynash mumkin.'},
      {q:'💰 Cashback qanday ishlaydi?',a:'Har bir buyurtmadan 3% cashback hisobingizga o\'tadi.'},
      {q:'Buyurtmani qanday olaman?',a:'Dars tugashiga 5 daqiqa qolganda zakaz bering, chiqishda ID aytib ovqatni oling.'},
    ],
    levels:{bronze:'Bronze',silver:'Silver',gold:'Gold',diamond:'Diamond'},
    next_level:'Keyingi: ',
  },
  ru:{
    greet_morning:'Доброе утро',greet_day:'Добрый день',greet_evening:'Добрый вечер',
    search_ph:'Поиск блюд или категорий...',
    popular:'Популярные блюда',all_foods:'Все блюда',
    daily_title:'Ежедневный бонус',daily_sub:'💎 Получите +1 алмазов',
    daily_btn:'Получить',daily_done:'✅ Получено',daily_claimed:'Бонус за сегодня уже получен!',
    daily_success:'💎 +1 Алмазов получено!',
    cart_empty_title:'Корзина пуста',cart_empty_sub:'Добавьте блюдо',
    checkout:'Оформить заказ 🚀',
    checkout_ok:'✅ Заказ оформлен!',
    added:'добавлено в корзину',
    spin_no_dia:'💎 Недостаточно алмазов!',
    spin_win:'Поздравляем!',spin_lose:'Не повезло!',
    logout_confirm:'Вы действительно хотите выйти?',
    food_name_req:'Введите название блюда!',food_price_req:'Введите цену!',
    food_saved:'✅ Блюдо сохранено!',food_deleted:'🗑️ Блюдо удалено',
    reward_saved:'✅ Приз сохранён!',reward_deleted:'🗑️ Приз удалён',
    level_up:'уровень достигнут!',
    name_err:'Пожалуйста, введите полное имя',
    phone_err:'Номер телефона должен состоять из 9 цифр',
    welcome:'добро пожаловать! 🎉',
    orders_label:'заказов',
    you_label:' (Вы)',
    faq:[
      {q:'Как сделать заказ?',a:'Выберите блюдо, добавьте в корзину и нажмите "Оформить заказ".'},
      {q:'💎 Что такое алмазы?',a:'За каждые 10 000 сум вы получаете 1 алмаз. Используйте в рулетке.'},
      {q:'💰 Как работает кэшбэк?',a:'С каждого заказа 3% возвращается на ваш счёт.'},
      {q:'Как получить заказ?',a:'За 5 минут до конца урока сделайте заказ, на выходе назовите ID.'},
    ],
    levels:{bronze:'Бронза',silver:'Серебро',gold:'Золото',diamond:'Алмаз'},
    next_level:'Далее: ',
  }
};

/* ── DEFAULT DATA ── */
const DEFAULT_FOODS = [
  {id:'f1',name:'Classic Burger',cat:'burger',desc:'Juicy beef patty, fresh lettuce, tomato, special sauce. Mazali va to\'yimli!',img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',price:35000},
  {id:'f2',name:'Margherita Pizza',cat:'pizza',desc:'Fresh mozzarella, tomato sauce, basil. Italian klassik!',img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',price:45000},
  {id:'f3',name:'Osh (Palov)',cat:'milliy',desc:'An\'anaviy o\'zbek oshi, qo\'y go\'shti va sabzavotlar bilan',img:'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80',price:28000},
  {id:'f4',name:'Lag\'mon',cat:'milliy',desc:'Qo\'lda tortilgan makaron, go\'sht va sabzavotlar bilan pishirilgan',img:'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80',price:22000},
  {id:'f5',name:'Fresh Orange Juice',cat:'ichimlik',desc:'Yangi siqilgan apelsin sharbati, vitaminlarga boy',img:'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',price:12000},
  {id:'f6',name:'Caesar Salad',cat:'salat',desc:'Romaine lettuce, croutons, parmesan, caesar dressing',img:'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80',price:18000},
  {id:'f7',name:'Chocolate Cake',cat:'shirinlik',desc:'Rich dark chocolate layer cake with ganache frosting',img:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',price:15000},
  {id:'f8',name:'Chicken Lavash',cat:'lavash',desc:'Grilled chicken, fresh vegetables, special sauce in lavash',img:'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80',price:20000},
  {id:'f9',name:'Samsa',cat:'milliy',desc:'Qo\'zichoq go\'shti va piyoz bilan to\'ldirilgan patir',img:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80',price:8000},
  {id:'f10',name:'Milkshake',cat:'ichimlik',desc:'Creamy vanilla, chocolate or strawberry milkshake',img:'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80',price:14000},
  {id:'f11',name:'Double Burger',cat:'burger',desc:'Double beef patty, cheese, bacon, special sauce',img:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80',price:48000},
  {id:'f12',name:'Pepperoni Pizza',cat:'pizza',desc:'Spicy pepperoni, mozzarella, tomato sauce',img:'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80',price:52000},
];

const DEFAULT_REWARDS = [
  {id:'r1',label:'💎 +5 Olmos',icon:'💎',color:'#00c566',type:'diamonds',value:5},
  {id:'r2',label:'💎 +10 Olmos',icon:'💎',color:'#009e52',type:'diamonds',value:10},
  {id:'r3',label:'💰 5% Cashback',icon:'💰',color:'#f39c12',type:'cashback',value:5},
  {id:'r4',label:'🏷️ 15% Chegirma',icon:'🏷️',color:'#e74c3c',type:'discount',value:15},
  {id:'r5',label:'🍔 Bepul Burger',icon:'🍔',color:'#e67e22',type:'food',value:1},
  {id:'r6',label:'💎 +3 Olmos',icon:'💎',color:'#3498db',type:'diamonds',value:3},
  {id:'r7',label:'💰 8% Cashback',icon:'💰',color:'#9b59b6',type:'cashback',value:8},
  {id:'r8',label:'😞 Omadsiz',icon:'😞',color:'#95a5a6',type:'none',value:0},
];

const DEFAULT_LB = [
  {name:'Azizbek T.',diamonds:284,orders:42},
  {name:'Malika R.',diamonds:231,orders:37},
  {name:'Jasur N.',diamonds:198,orders:31},
  {name:'Nilufar K.',diamonds:165,orders:28},
  {name:'Bobur S.',diamonds:142,orders:22},
  {name:'Zulfiya M.',diamonds:118,orders:19},
];

const LEVELS = [
  {name:'bronze',label:'Bronze',icon:'🥉',min:0,max:999},
  {name:'silver',label:'Silver',icon:'🥈',min:1000,max:4999},
  {name:'gold',label:'Gold',icon:'🥇',min:5000,max:19999},
  {name:'diamond',label:'Diamond',icon:'💎',min:20000,max:Infinity},
];

/* ── STATE ── */
let S = {
  user:null,foods:[],cart:[],rewards:[],hist:[],orders:[],
  page:'home',cat:'all',search:'',lang:'uz',theme:'light',
  spinning:false,editFoodId:null,editRewardId:null,
  fmQty:1,fmFood:null,totalDia:0,
  bannerIdx:0,bannerTimer:null,
};

/* ── HELPERS ── */
const $ = id => document.getElementById(id);
const t = k => (TR[S.lang]||TR.uz)[k]||(TR.uz[k]||k);
const calcDia = price => Math.floor(price/10000);
const calcCB = price => Math.floor(price*0.03);
const fmt = n => new Intl.NumberFormat('uz-UZ').format(n)+' so\'m';
const getLevel = dia => LEVELS.slice().reverse().find(l=>dia>=l.min)||LEVELS[0];
const getLevelLabel = (lvl,lang)=>(TR[lang]||TR.uz).levels[lvl.name]||lvl.label;

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
function init(){
  S.user=ld(SK.USER); S.foods=ld(SK.FOODS)||DEFAULT_FOODS;
  S.cart=ld(SK.CART)||[]; S.rewards=ld(SK.REWARDS)||DEFAULT_REWARDS;
  S.hist=ld(SK.HIST)||[]; S.orders=ld(SK.ORDERS)||[];
  S.lang=ld(SK.LANG)||'uz'; S.theme=ld(SK.THEME)||'light';
  S.totalDia=ld(SK.TOTAL_DIA)||0;
  applyTheme(S.theme);
  bindAll();
  splash();
}

/* ══════════════════════════════════════
   SPLASH
══════════════════════════════════════ */
function splash(){
  setTimeout(()=>{
    const el=$('splash');
    el.style.transition='opacity 0.5s ease, transform 0.5s ease';
    el.style.opacity='0'; el.style.transform='scale(1.05)';
    setTimeout(()=>{
      el.classList.add('hidden');
      S.user ? startApp() : showAuth();
    },500);
  },2800);
}

/* ══════════════════════════════════════
   AUTH
══════════════════════════════════════ */
function showAuth(){
  $('screen-auth').classList.remove('hidden');
}
function hideAuth(){
  $('screen-auth').style.opacity='0';
  $('screen-auth').style.transform='translateY(20px)';
  $('screen-auth').style.transition='opacity 0.4s,transform 0.4s';
  setTimeout(()=>$('screen-auth').classList.add('hidden'),400);
}

function handleRegister(){
  const name=$('inp-name').value.trim();
  const phone=$('inp-phone').value.replace(/\s/g,'');
  $('err-name').textContent=''; $('err-phone').textContent='';
  let ok=true;
  if(name.length<2){$('err-name').textContent=t('name_err');ok=false;}
  if(phone.length!==9||!/^\d+$/.test(phone)){$('err-phone').textContent=t('phone_err');ok=false;}
  if(!ok)return;
  S.user={id:Date.now()+'',name,phone:'+998'+phone,diamonds:10,xp:0,orderCount:0,createdAt:Date.now()};
  sv(SK.USER,S.user);
  const btn=$('btn-continue');
  btn.innerHTML='<span>✅ Muvaffaqiyatli!</span>';
  btn.style.background='#009e52';
  setTimeout(()=>{hideAuth();startApp();toast('🎉 '+S.user.name.split(' ')[0]+t('welcome'),'success');},700);
}

/* ══════════════════════════════════════
   APP START
══════════════════════════════════════ */
function startApp(){
  $('app').classList.remove('hidden');
  updateTopbar(); renderFoods(); updateCartBadge();
  checkBonus(); startBannerSlider();
  goPage('home');
}

/* ══════════════════════════════════════
   TOPBAR
══════════════════════════════════════ */
function updateTopbar(){
  if(!S.user)return;
  $('top-diamonds').textContent=S.user.diamonds;
  $('top-cashback').textContent='3%';
  $('avatar-letter').textContent=S.user.name[0].toUpperCase();
}

/* ══════════════════════════════════════
   NAVIGATION
══════════════════════════════════════ */
function goPage(pg){
  document.querySelectorAll('.page').forEach(p=>{p.classList.add('hidden');p.classList.remove('active')});
  const target=$('page-'+pg);
  if(target){target.classList.remove('hidden');target.classList.add('active');}
  document.querySelectorAll('.bnav-btn[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===pg));
  S.page=pg;
  if(pg==='home'){updateGreeting();renderFoods();}
  if(pg==='roulette'){drawWheel(S.wheelAngle||0);updateRouletteUI();}
  if(pg==='rewards'){renderRewardsPage();}
  if(pg==='profile'){renderProfilePage();}
}

/* ══════════════════════════════════════
   GREETING
══════════════════════════════════════ */
function updateGreeting(){
  if(!S.user)return;
  const h=new Date().getHours();
  const g=h<12?t('greet_morning'):h<18?t('greet_day'):t('greet_evening');
  $('greet-line').textContent=g+'!';
  $('greet-name').textContent=S.user.name.split(' ')[0];
  const lvl=getLevel(S.user.diamonds);
  $('greet-level-icon').textContent=lvl.icon;
  $('greet-level-text').textContent=getLevelLabel(lvl,S.lang);
}

/* ══════════════════════════════════════
   BANNER SLIDER
══════════════════════════════════════ */
function startBannerSlider(){
  const track=$('banner-track');
  const dotsWrap=$('banner-dots');
  const slides=track.querySelectorAll('.banner-slide');
  if(!slides.length)return;
  dotsWrap.innerHTML='';
  slides.forEach((_,i)=>{
    const d=document.createElement('span');
    if(i===0)d.classList.add('active');
    dotsWrap.appendChild(d);
  });
  clearInterval(S.bannerTimer);
  S.bannerTimer=setInterval(()=>{
    S.bannerIdx=(S.bannerIdx+1)%slides.length;
    slides[S.bannerIdx].scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'});
    dotsWrap.querySelectorAll('span').forEach((d,i)=>d.classList.toggle('active',i===S.bannerIdx));
  },3500);
}

/* ══════════════════════════════════════
   DAILY BONUS
══════════════════════════════════════ */
function checkBonus(){
  const today=new Date().toDateString();
  const btn=$('btn-daily');
  if(ld(SK.BONUS)===today){btn.textContent=t('daily_done');btn.disabled=true;}
  else{btn.textContent=t('daily_btn');btn.disabled=false;}
}
function claimBonus(){
  const today=new Date().toDateString();
  if(ld(SK.BONUS)===today){toast(t('daily_claimed'),'warning');return;}
  sv(SK.BONUS,today);
  addDiamonds(5); addXP(50);
  $('btn-daily').textContent=t('daily_done'); $('btn-daily').disabled=true;
  toast(t('daily_success'),'success'); triggerConfetti(); updateTopbar();
}

/* ══════════════════════════════════════
   FOOD RENDERING
══════════════════════════════════════ */
function renderFoods(){
  const grid=$('food-grid');
  const empty=$('empty-foods');
  if(!grid)return;
  let data=[...S.foods];
  if(S.cat!=='all') data=data.filter(f=>f.cat===S.cat);
  if(S.search){const q=S.search.toLowerCase();data=data.filter(f=>f.name.toLowerCase().includes(q)||f.cat.includes(q));}
  grid.innerHTML='';
  const title=$('sec-title');
  if(title) title.textContent=S.cat==='all'?t('popular'):S.cat;
  const count=$('sec-count');
  if(count) count.textContent=data.length+' ta';
  if(!data.length){empty.classList.remove('hidden');return;}
  empty.classList.add('hidden');
  data.forEach((food,i)=>{
    const dia=calcDia(food.price);
    const card=document.createElement('div');
    card.className='food-card';
    card.style.animationDelay=i*0.05+'s';
    card.innerHTML=`
      <div class="fc-img-wrap">
        <img class="fc-img" src="${food.img}" alt="${food.name}" loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'"/>
        <span class="fc-diamond-tag">💎 ${dia}</span>
      </div>
      <div class="fc-body">
        <div class="fc-name">${food.name}</div>
        <div class="fc-price">${fmt(food.price)}</div>
        <div class="fc-foot">
          <span class="fc-cashback">💰 3%</span>
          <button class="fc-add-btn" data-id="${food.id}" aria-label="Qo'shish">+</button>
        </div>
      </div>`;
    card.querySelector('.fc-img-wrap').addEventListener('click',()=>openFoodModal(food));
    card.querySelector('.fc-name').addEventListener('click',()=>openFoodModal(food));
    card.querySelector('.fc-add-btn').addEventListener('click',e=>{e.stopPropagation();addToCart(food.id);});
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════════
   FOOD MODAL
══════════════════════════════════════ */
function openFoodModal(food){
  S.fmFood=food; S.fmQty=1;
  $('fm-img').src=food.img;
  $('fm-img').onerror=()=>$('fm-img').src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80';
  $('fm-name').textContent=food.name;
  $('fm-desc').textContent=food.desc||'';
  $('fm-price').textContent=fmt(food.price);
  $('fm-cashback').textContent='💰 Cashback 3%';
  $('fm-diamonds').textContent='💎 +'+calcDia(food.price)+' olmos';
  $('fm-qty').textContent=1;
  $('btn-fm-add').textContent='Savatga qo\'shish — '+fmt(food.price);
  $('food-backdrop').classList.remove('hidden');
  const modal=$('food-modal');
  modal.classList.remove('hidden');
  requestAnimationFrame(()=>modal.classList.add('open'));
}
function closeFoodModal(){
  const modal=$('food-modal');
  modal.classList.remove('open');
  setTimeout(()=>{modal.classList.add('hidden');$('food-backdrop').classList.add('hidden');},350);
}
function updateFMQty(){
  $('fm-qty').textContent=S.fmQty;
  if(S.fmFood) $('btn-fm-add').textContent='Savatga qo\'shish — '+fmt(S.fmFood.price*S.fmQty);
}

/* ══════════════════════════════════════
   CART
══════════════════════════════════════ */
function addToCart(id){
  const food=S.foods.find(f=>f.id===id); if(!food)return;
  const ex=S.cart.find(i=>i.id===id);
  if(ex) ex.qty++;
  else S.cart.push({...food,qty:1});
  sv(SK.CART,S.cart); updateCartBadge();
  toast('🛒 '+food.name+' '+t('added'),'success');
  animateCartBadge();
}
function addToCartQty(id,qty=1){
  const food=S.foods.find(f=>f.id===id); if(!food)return;
  const ex=S.cart.find(i=>i.id===id);
  if(ex) ex.qty+=qty;
  else S.cart.push({...food,qty});
  sv(SK.CART,S.cart); updateCartBadge();
}
function removeFromCart(id){
  const i=S.cart.findIndex(x=>x.id===id); if(i===-1)return;
  if(S.cart[i].qty>1) S.cart[i].qty--;
  else S.cart.splice(i,1);
  sv(SK.CART,S.cart); updateCartBadge(); renderCartBody();
}
function updateCartBadge(){
  const total=S.cart.reduce((s,i)=>s+i.qty,0);
  const badge=$('cart-badge-nav');
  badge.textContent=total;
  badge.classList.toggle('hidden',total===0);
}
function animateCartBadge(){
  const badge=$('cart-badge-nav');
  badge.style.transform='scale(1.5)';
  setTimeout(()=>badge.style.transform='',200);
}

function openCart(){
  renderCartBody();
  const drawer=$('cart-drawer');
  const backdrop=$('cart-backdrop');
  drawer.classList.remove('hidden'); backdrop.classList.remove('hidden');
  requestAnimationFrame(()=>drawer.classList.add('open'));
}
function closeCart(){
  const drawer=$('cart-drawer');
  drawer.classList.remove('open');
  setTimeout(()=>{drawer.classList.add('hidden');$('cart-backdrop').classList.add('hidden');},400);
}
function renderCartBody(){
  const body=$('cart-body');
  const footer=$('cart-footer');
  const empty=$('cart-empty');
  body.innerHTML='';
  if(!S.cart.length){
    empty.innerHTML=`<div class="cart-empty-img">🛒</div><p>${t('cart_empty_title')}</p><span>${t('cart_empty_sub')}</span>`;
    body.appendChild(empty); footer.classList.add('hidden'); return;
  }
  footer.classList.remove('hidden');
  S.cart.forEach(item=>{
    const div=document.createElement('div');
    div.className='cart-item';
    div.innerHTML=`
      <img class="ci-img" src="${item.img}" alt="${item.name}"
        onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'"/>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">${fmt(item.price*item.qty)}</div>
      </div>
      <div class="ci-controls">
        <button class="qty-btn" data-id="${item.id}" data-act="remove">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" data-id="${item.id}" data-act="add">+</button>
      </div>`;
    body.appendChild(div);
  });
  const total=S.cart.reduce((s,i)=>s+i.price*i.qty,0);
  const dia=calcDia(total); const cb=calcCB(total);
  $('ct-total').textContent=fmt(total);
  $('ct-diamonds').textContent='+'+dia;
  $('ct-cashback').textContent=fmt(cb);
  $('btn-checkout').textContent=t('checkout');
}

function checkout(){
  if(!S.cart.length)return;
  const total=S.cart.reduce((s,i)=>s+i.price*i.qty,0);
  const dia=calcDia(total); const cb=calcCB(total);
  const xp=Math.floor(total/1000);
  S.orders.push({id:Date.now()+'',items:[...S.cart],total,dia,cb,date:new Date().toLocaleDateString(),ts:Date.now()});
  sv(SK.ORDERS,S.orders);
  addDiamonds(dia); addXP(xp);
  if(S.user){S.user.orderCount=(S.user.orderCount||0)+1; S.totalDia+=dia; sv(SK.TOTAL_DIA,S.totalDia); sv(SK.USER,S.user);}
  S.cart=[]; sv(SK.CART,S.cart);
  closeCart(); triggerConfetti();
  toast(t('checkout_ok')+' 💎+'+dia+' 💰'+fmt(cb),'success');
  updateTopbar(); updateCartBadge();
}

/* ══════════════════════════════════════
   USER STATS
══════════════════════════════════════ */
function addDiamonds(n){
  if(!S.user)return;
  const prev=S.user.diamonds; S.user.diamonds+=n;
  checkLevelUp(prev,S.user.diamonds);
  sv(SK.USER,S.user); updateTopbar();
}
function addXP(n){if(!S.user)return; S.user.xp=(S.user.xp||0)+n; sv(SK.USER,S.user);}
function checkLevelUp(prev,cur){
  const pLvl=getLevel(prev); const cLvl=getLevel(cur);
  if(cLvl.name!==pLvl.name) toast(getLevelLabel(cLvl,S.lang)+' '+t('level_up'),'success');
}

/* ══════════════════════════════════════
   ROULETTE — PREMIUM CRAZY TIME WHEEL
   FIXED: pointer at top = -PI/2
══════════════════════════════════════ */
let wheelAngle=0;
let audioCtx=null;
function getACtx(){if(!audioCtx){try{audioCtx=new(window.AudioContext||window.webkitAudioContext)();}catch{}}return audioCtx;}
function playTick(){
  const ctx=getACtx();if(!ctx)return;
  const o=ctx.createOscillator(),g=ctx.createGain();
  o.connect(g);g.connect(ctx.destination);
  o.frequency.value=600+Math.random()*500;
  g.gain.setValueAtTime(0.12,ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.04);
  o.start(ctx.currentTime);o.stop(ctx.currentTime+0.04);
}
function playWin(){
  const ctx=getACtx();if(!ctx)return;
  [523,659,784,1047].forEach((f,i)=>{
    const o=ctx.createOscillator(),g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);
    o.frequency.value=f;o.type='sine';
    const t0=ctx.currentTime+i*0.1;
    g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(0.25,t0+0.04);
    g.gain.exponentialRampToValueAtTime(0.001,t0+0.3);
    o.start(t0);o.stop(t0+0.35);
  });
}
function playLose(){
  const ctx=getACtx();if(!ctx)return;
  const o=ctx.createOscillator(),g=ctx.createGain();
  o.connect(g);g.connect(ctx.destination);
  o.frequency.value=180;o.type='sawtooth';
  g.gain.setValueAtTime(0.15,ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.5);
  o.start(ctx.currentTime);o.stop(ctx.currentTime+0.5);
}

function updateRouletteUI(){
  $('rou-diamond-count').textContent=S.user?S.user.diamonds:0;
  $('spin-label').textContent='SPIN';
}

function drawWheel(angle=0){
  const canvas=$('wheel-canvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const rewards=S.rewards; const n=rewards.length;
  const sa=(2*Math.PI)/n;
  const cx=canvas.width/2,cy=canvas.height/2,r=cx-8;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Outer decorative ring
  ctx.beginPath();ctx.arc(cx,cy,r+2,0,2*Math.PI);
  ctx.strokeStyle='rgba(0,197,102,0.4)';ctx.lineWidth=4;
  ctx.shadowBlur=16;ctx.shadowColor='#00c566';ctx.stroke();ctx.shadowBlur=0;

  rewards.forEach((rw,i)=>{
    const start=angle+i*sa, end=start+sa, mid=start+sa/2;
    // Slice
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,start,end);ctx.closePath();
    ctx.fillStyle=rw.color||'#00c566';ctx.fill();
    // Overlay
    const grad=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
    grad.addColorStop(0,'rgba(255,255,255,0.1)');grad.addColorStop(1,'rgba(0,0,0,0.2)');
    ctx.fillStyle=grad;ctx.fill();
    // Border
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,start,end);ctx.closePath();
    ctx.strokeStyle='rgba(255,255,255,0.6)';ctx.lineWidth=1.5;ctx.stroke();
    // Emoji
    ctx.save();ctx.translate(cx,cy);ctx.rotate(mid);
    ctx.font='18px serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.shadowBlur=4;ctx.shadowColor='rgba(0,0,0,0.5)';
    ctx.fillText(rw.icon,r*0.7,0);
    ctx.restore();
    // Label
    ctx.save();ctx.translate(cx,cy);ctx.rotate(mid);
    ctx.textAlign='right';ctx.font='bold 8px DM Sans,sans-serif';
    ctx.fillStyle='#fff';ctx.shadowBlur=2;ctx.shadowColor='rgba(0,0,0,0.8)';
    const lbl=rw.label.replace(/[💎💰🏷️🍔😞]/g,'').trim().substring(0,9);
    ctx.fillText(lbl,r*0.52,0);ctx.restore();
  });

  // Dots on rim
  for(let i=0;i<n*2;i++){
    const a=angle+(i*Math.PI)/n, dr=r+10;
    ctx.beginPath();ctx.arc(cx+Math.cos(a)*dr,cy+Math.sin(a)*dr,3,0,2*Math.PI);
    ctx.fillStyle=i%2===0?'#00c566':'#fff';
    ctx.shadowBlur=i%2===0?8:0;ctx.shadowColor='#00c566';ctx.fill();ctx.shadowBlur=0;
  }

  // Center circle
  const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,40);
  cg.addColorStop(0,'#fff');cg.addColorStop(1,'#f0f2f8');
  ctx.beginPath();ctx.arc(cx,cy,40,0,2*Math.PI);
  ctx.fillStyle=cg;
  ctx.shadowBlur=10;ctx.shadowColor='rgba(0,0,0,0.1)';ctx.fill();
  ctx.strokeStyle='#00c566';ctx.lineWidth=3;ctx.stroke();ctx.shadowBlur=0;
}

function spinWheel(){
  if(S.spinning)return;
  if(!S.user||S.user.diamonds<1){toast(t('spin_no_dia'),'error');return;}
  if(audioCtx&&audioCtx.state==='suspended')audioCtx.resume();
  S.spinning=true;
  $('wheel-center-btn').disabled=true;
  $('rou-result').classList.add('hidden');
  addDiamonds(-1);updateRouletteUI();

  const rewards=S.rewards,n=rewards.length;
  const sa=(2*Math.PI)/n;
  const winIdx=Math.floor(Math.random()*n);

  // FIXED: pointer at top = -PI/2
  // winIdx slice midpoint = (winIdx+0.5)*sa from start
  // We want angle + (winIdx+0.5)*sa = -PI/2 mod 2PI
  // target = -PI/2 - (winIdx+0.5)*sa - (wheelAngle % 2PI) + 2PI*k
  const extra=(8+Math.floor(Math.random()*5))*2*Math.PI;
  const norm=wheelAngle%(2*Math.PI);
  const winMid=(winIdx+0.5)*sa;
  let delta=-Math.PI/2-winMid-norm;
  while(delta<Math.PI*2) delta+=2*Math.PI;
  const target=wheelAngle+delta+extra;

  const dur=4500+Math.random()*1500;
  const t0=performance.now();
  const from=wheelAngle;
  let lastTick=0;

  function easeOut(t){return 1-Math.pow(1-t,3.8);}
  function frame(now){
    const el=(now-t0),prog=Math.min(el/dur,1);
    wheelAngle=from+(target-from)*easeOut(prog);
    drawWheel(wheelAngle);
    // Tick sound
    if(Math.abs(wheelAngle-lastTick)>0.3){playTick();lastTick=wheelAngle;flashPointer();}
    if(prog<1){requestAnimationFrame(frame);}
    else{
      wheelAngle=target;drawWheel(wheelAngle);
      S.spinning=false;$('wheel-center-btn').disabled=false;
      applyWheelReward(rewards[winIdx]);
    }
  }
  requestAnimationFrame(frame);
}

function flashPointer(){
  const p=document.querySelector('.wheel-pointer');if(!p)return;
  p.style.color='#fff';p.style.filter='drop-shadow(0 0 12px #fff)';
  setTimeout(()=>{p.style.color='var(--green)';p.style.filter='drop-shadow(0 4px 8px var(--green-glow))';},80);
}

function applyWheelReward(rw){
  const result=$('rou-result');
  const food=S.foods[Math.floor(Math.random()*S.foods.length)];
  $('result-img').src=food.img; $('result-img').onerror=()=>$('result-img').src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80';
  $('result-name').textContent=rw.type==='food'?food.name:rw.label;
  $('result-price').textContent=rw.type==='food'?fmt(food.price):rw.label;
  $('btn-result-cart').dataset.foodId=food.id;

  if(rw.type!=='none'){
    playWin();triggerConfetti();
    if(rw.type==='diamonds'){addDiamonds(rw.value);toast('💎 +'+rw.value+' olmos!','success');}
    else if(rw.type==='cashback'){toast('💰 +'+rw.value+'% cashback!','success');}
    else if(rw.type==='discount'){toast('🏷️ '+rw.value+'% chegirma!','success');}
    else if(rw.type==='food'){toast('🍔 Bepul taom!','success');}
    $('rou-result').querySelector('.result-congrats').textContent='🎉 '+t('spin_win');
  } else {
    playLose();
    $('rou-result').querySelector('.result-congrats').textContent='😞 '+t('spin_lose');
  }

  // Flash wheel
  const canvas=$('wheel-canvas');
  canvas.style.transition='box-shadow 0.3s';
  canvas.style.boxShadow=rw.type!=='none'?'0 0 60px rgba(0,197,102,0.6)':'0 0 30px rgba(231,76,60,0.4)';
  setTimeout(()=>canvas.style.boxShadow='',1200);

  // History
  S.hist.unshift({icon:rw.icon,label:rw.label,time:new Date().toLocaleTimeString()});
  if(S.hist.length>10)S.hist.pop();
  sv(SK.HIST,S.hist);renderRouletteHist();
  result.classList.remove('hidden');
  updateRouletteUI();
}

function renderRouletteHist(){
  const list=$('rou-hist-list');if(!list)return;
  list.innerHTML='';
  if(!S.hist.length){list.innerHTML='<p style="color:var(--text3);font-size:13px;text-align:center;padding:16px">Hali o\'yin yo\'q</p>';return;}
  S.hist.forEach(h=>{
    const d=document.createElement('div');d.className='hist-item';
    d.innerHTML=`<span class="hist-ico">${h.icon}</span><div class="hist-info"><div class="hist-name">${h.label}</div><div class="hist-time">${h.time}</div></div>`;
    list.appendChild(d);
  });
}

/* ══════════════════════════════════════
   REWARDS PAGE
══════════════════════════════════════ */
function renderRewardsPage(){
  if(!S.user)return;
  const u=S.user;
  const lvl=getLevel(u.diamonds);
  $('level-icon-big').textContent=lvl.icon;
  $('level-name-big').textContent=getLevelLabel(lvl,S.lang);
  const nextIdx=LEVELS.indexOf(lvl)+1;
  const next=LEVELS[nextIdx];
  $('level-sub').textContent=next?t('next_level')+getLevelLabel(next,S.lang):'MAX Level! 🏆';
  $('rew-diamonds').textContent=u.diamonds;
  const xpPct=Math.min(((u.xp||0)%1000)/10,100);
  $('xp-fill').style.width=xpPct+'%';
  $('xp-val').textContent=(u.xp||0)+' XP';
  $('xp-next').textContent=Math.ceil(((u.xp||0)+1)/1000)*1000+' XP';
  LEVELS.forEach(l=>{
    const el=$('lvl-'+l.name);
    if(el) el.classList.toggle('active-lvl',l.name===lvl.name);
  });
  renderLeaderboard();
}

function renderLeaderboard(){
  const lb=$('leaderboard');if(!lb)return;
  let data=[...DEFAULT_LB];
  if(S.user) data.push({name:S.user.name,diamonds:S.user.diamonds,orders:S.user.orderCount||0,isMe:true});
  data.sort((a,b)=>b.diamonds-a.diamonds);
  data=data.slice(0,10);
  lb.innerHTML='';
  const medals=['🥇','🥈','🥉'];
  data.forEach((item,i)=>{
    const d=document.createElement('div');
    d.className='lb-item'+(item.isMe?' me-item':'');
    d.style.animationDelay=i*0.04+'s';
    d.innerHTML=`
      <div class="lb-rank">${medals[i]||i+1}</div>
      <div class="lb-av">${item.name[0].toUpperCase()}</div>
      <div class="lb-info">
        <div class="lb-name">${item.name}${item.isMe?t('you_label'):''}</div>
        <div class="lb-orders">${item.orders} ${t('orders_label')}</div>
      </div>
      <div class="lb-dia">💎 ${item.diamonds}</div>`;
    lb.appendChild(d);
  });
}

/* ══════════════════════════════════════
   PROFILE PAGE
══════════════════════════════════════ */
function renderProfilePage(){
  if(!S.user)return;
  const u=S.user;
  const lvl=getLevel(u.diamonds);
  $('p-avatar-big').textContent=u.name[0].toUpperCase();
  $('p-name').textContent=u.name;
  $('p-phone').textContent=u.phone;
  $('p-level-tag').textContent=lvl.icon+' '+getLevelLabel(lvl,S.lang);
  $('ps-diamonds').textContent=u.diamonds;
  $('ps-cashback').textContent='3%';
  $('ps-orders').textContent=u.orderCount||0;
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===S.lang));
  document.querySelectorAll('.theme-btn').forEach(b=>b.classList.toggle('active',b.dataset.t===S.theme));
  renderFAQ();
}

function renderFAQ(){
  const list=$('faq-list');if(!list)return;
  list.innerHTML='';
  const faqs=t('faq');
  faqs.forEach(faq=>{
    const d=document.createElement('div');d.className='faq-item';
    d.innerHTML=`
      <div class="faq-q"><span>${faq.q}</span><span class="faq-chevron">▼</span></div>
      <div class="faq-a"><div class="faq-a-inner">${faq.a}</div></div>`;
    d.querySelector('.faq-q').addEventListener('click',()=>d.classList.toggle('open'));
    list.appendChild(d);
  });
}

/* ══════════════════════════════════════
   THEME & LANG
══════════════════════════════════════ */
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme',theme);
  S.theme=theme; sv(SK.THEME,theme);
  document.querySelectorAll('.theme-btn').forEach(b=>b.classList.toggle('active',b.dataset.t===theme));
}
function setLang(lang){
  S.lang=lang; sv(SK.LANG,lang);
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
  if(S.page==='home'){updateGreeting();renderFoods();}
  if(S.page==='profile'){renderProfilePage();}
  if(S.page==='rewards'){renderRewardsPage();}
}

/* ══════════════════════════════════════
   ADMIN PANEL
══════════════════════════════════════ */
function openAdmin(){
  $('adm-foods').textContent=S.foods.length;
  $('adm-orders').textContent=S.orders.length;
  $('adm-dia').textContent=S.totalDia;
  renderAdminFoods(); renderAdminRewards();
  const p=$('admin-panel'),b=$('admin-backdrop');
  p.classList.remove('hidden');b.classList.remove('hidden');
  requestAnimationFrame(()=>p.classList.add('open'));
}
function closeAdmin(){
  const p=$('admin-panel');
  p.classList.remove('open');
  setTimeout(()=>{p.classList.add('hidden');$('admin-backdrop').classList.add('hidden');},400);
}
function renderAdminFoods(){
  const list=$('adm-food-list');if(!list)return;list.innerHTML='';
  S.foods.forEach(f=>{
    const d=document.createElement('div');d.className='adm-food-item';
    d.innerHTML=`
      <img class="adm-food-img" src="${f.img}" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'"/>
      <div class="adm-food-info">
        <div class="adm-food-name">${f.name}</div>
        <div class="adm-food-price">${fmt(f.price)}</div>
        <div class="adm-food-cat">${f.cat}</div>
      </div>
      <div class="adm-food-acts">
        <button class="btn-edit" data-id="${f.id}">✏️ Edit</button>
        <button class="btn-del" data-id="${f.id}">🗑️ Del</button>
      </div>`;
    list.appendChild(d);
  });
}
function renderAdminRewards(){
  const list=$('adm-reward-list');if(!list)return;list.innerHTML='';
  S.rewards.forEach(r=>{
    const d=document.createElement('div');d.className='adm-food-item';
    d.innerHTML=`
      <div style="width:52px;height:52px;border-radius:50%;background:${r.color}22;border:2px solid ${r.color};display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${r.icon}</div>
      <div class="adm-food-info">
        <div class="adm-food-name">${r.label}</div>
        <div class="adm-food-price">${r.type} · ${r.value}</div>
      </div>
      <div class="adm-food-acts">
        <button class="btn-edit" data-rid="${r.id}">✏️</button>
        <button class="btn-del" data-rid="${r.id}">🗑️</button>
      </div>`;
    list.appendChild(d);
  });
}

/* ── FOOD FORM ── */
function openFoodForm(id=null){
  S.editFoodId=id;
  $('fform-title').textContent=id?'Taomni tahrirlash':'Taom qo\'shish';
  if(id){
    const f=S.foods.find(x=>x.id===id);if(!f)return;
    $('ff-name').value=f.name; $('ff-desc').value=f.desc||'';
    $('ff-img').value=f.img; $('ff-price').value=f.price; $('ff-cat').value=f.cat;
  } else {
    ['ff-name','ff-desc','ff-img','ff-price'].forEach(i=>$(i).value='');
    $('ff-cat').value='burger';
  }
  const s=$('food-form-sheet'),b=$('fform-backdrop');
  s.classList.remove('hidden');b.classList.remove('hidden');
  requestAnimationFrame(()=>s.classList.add('open'));
}
function closeFoodForm(){
  const s=$('food-form-sheet');s.classList.remove('open');
  setTimeout(()=>{s.classList.add('hidden');$('fform-backdrop').classList.add('hidden');},400);
  S.editFoodId=null;
}
function saveFoodForm(){
  const name=$('ff-name').value.trim();
  const price=parseInt($('ff-price').value)||0;
  if(!name){toast(t('food_name_req'),'error');return;}
  if(!price){toast(t('food_price_req'),'error');return;}
  const fd={name,desc:$('ff-desc').value.trim(),img:$('ff-img').value.trim()||'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',price,cat:$('ff-cat').value};
  if(S.editFoodId){
    const i=S.foods.findIndex(x=>x.id===S.editFoodId);
    if(i!==-1)S.foods[i]={...S.foods[i],...fd};
  } else {
    S.foods.push({id:'f'+Date.now(),...fd});
  }
  sv(SK.FOODS,S.foods);closeFoodForm();
  renderFoods();renderAdminFoods();
  $('adm-foods').textContent=S.foods.length;
  toast(t('food_saved'),'success');
}
function deleteFood(id){
  S.foods=S.foods.filter(f=>f.id!==id);sv(SK.FOODS,S.foods);
  renderFoods();renderAdminFoods();
  $('adm-foods').textContent=S.foods.length;
  toast(t('food_deleted'),'warning');
}

/* ══════════════════════════════════════
   TOAST
══════════════════════════════════════ */
function toast(msg,type='success',dur=3000){
  const wrap=$('toast-wrap');
  const icons={success:'✅',error:'❌',warning:'⚠️'};
  const el=document.createElement('div');
  el.className=`toast ${type}`;
  el.innerHTML=`<span>${icons[type]||'✅'}</span><span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(()=>{el.style.animation='toastOut 0.3s ease forwards';setTimeout(()=>el.remove(),300);},dur);
}

/* ══════════════════════════════════════
   CONFETTI
══════════════════════════════════════ */
function triggerConfetti(){
  const cv=$('confetti-cv');if(!cv)return;
  cv.width=innerWidth;cv.height=innerHeight;cv.classList.remove('hidden');
  const ctx=cv.getContext('2d');
  const colors=['#00c566','#009e52','#f39c12','#e74c3c','#3498db','#9b59b6','#fff','#ffd700'];
  const pieces=Array.from({length:100},()=>({
    x:Math.random()*cv.width,y:-10,
    w:5+Math.random()*9,h:3+Math.random()*5,
    c:colors[Math.floor(Math.random()*colors.length)],
    vx:(Math.random()-0.5)*7,vy:3+Math.random()*5,
    a:Math.random()*Math.PI*2,va:(Math.random()-0.5)*0.2,
  }));
  let frame=0;
  function draw(){
    ctx.clearRect(0,0,cv.width,cv.height);
    pieces.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.a+=p.va;p.vy+=0.08;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.fillStyle=p.c;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();});
    if(++frame<110)requestAnimationFrame(draw);else cv.classList.add('hidden');
  }
  requestAnimationFrame(draw);
}

/* ══════════════════════════════════════
   BIND ALL EVENTS
══════════════════════════════════════ */
function bindAll(){
  // Phone input format
  $('inp-phone')?.addEventListener('input',()=>{
    let v=$('inp-phone').value.replace(/\D/g,'').slice(0,9);
    let f='';
    if(v.length>0)f=v.slice(0,2);
    if(v.length>2)f+=' '+v.slice(2,5);
    if(v.length>5)f+=' '+v.slice(5,7);
    if(v.length>7)f+=' '+v.slice(7,9);
    $('inp-phone').value=f;
  });
  $('btn-continue')?.addEventListener('click',handleRegister);

  // Avatar → profile
  $('btn-avatar')?.addEventListener('click',()=>goPage('profile'));

  // Bottom nav
  document.querySelectorAll('.bnav-btn[data-page]').forEach(b=>b.addEventListener('click',()=>goPage(b.dataset.page)));
  $('nav-cart-btn')?.addEventListener('click',openCart);

  // Search
  $('search-inp')?.addEventListener('input',()=>{
    S.search=$('search-inp').value;
    $('s-clear').classList.toggle('hidden',!S.search);
    renderFoods();
  });
  $('s-clear')?.addEventListener('click',()=>{$('search-inp').value='';S.search='';$('s-clear').classList.add('hidden');renderFoods();});

  // Categories
  document.querySelectorAll('.cat-pill').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('.cat-pill').forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); S.cat=b.dataset.cat; renderFoods();
  }));

  // Daily bonus
  $('btn-daily')?.addEventListener('click',claimBonus);

  // Cart events
  $('cart-backdrop')?.addEventListener('click',closeCart);
  $('cart-close')?.addEventListener('click',closeCart);
  $('btn-checkout')?.addEventListener('click',checkout);
  $('cart-body')?.addEventListener('click',e=>{
    const btn=e.target.closest('.qty-btn');if(!btn)return;
    btn.dataset.act==='add'?addToCart(btn.dataset.id):removeFromCart(btn.dataset.id);
  });

  // Food modal
  $('food-backdrop')?.addEventListener('click',closeFoodModal);
  $('fm-close')?.addEventListener('click',closeFoodModal);
  $('fm-minus')?.addEventListener('click',()=>{if(S.fmQty>1){S.fmQty--;updateFMQty();}});
  $('fm-plus')?.addEventListener('click',()=>{S.fmQty++;updateFMQty();});
  $('btn-fm-add')?.addEventListener('click',()=>{
    if(!S.fmFood)return;
    addToCartQty(S.fmFood.id,S.fmQty);
    closeFoodModal();
    toast('🛒 '+S.fmFood.name+' x'+S.fmQty+' '+t('added'),'success');
  });

  // Roulette
  $('wheel-center-btn')?.addEventListener('click',spinWheel);
  $('btn-spin-again')?.addEventListener('click',()=>{$('rou-result').classList.add('hidden');spinWheel();});
  $('btn-result-cart')?.addEventListener('click',()=>{
    const id=$('btn-result-cart').dataset.foodId;
    if(id){addToCart(id);$('rou-result').classList.add('hidden');}
  });

  // Leaderboard tabs
  document.querySelectorAll('.lb-tab').forEach(tab=>tab.addEventListener('click',()=>{
    document.querySelectorAll('.lb-tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active'); renderLeaderboard();
  }));

  // Profile lang/theme
  document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
  document.querySelectorAll('.theme-btn').forEach(b=>b.addEventListener('click',()=>applyTheme(b.dataset.t)));

  // Logout
  $('btn-logout')?.addEventListener('click',()=>{
    if(confirm(t('logout_confirm'))){
      [SK.USER,SK.CART].forEach(k=>localStorage.removeItem(k));
      location.reload();
    }
  });

  // Admin
  $('btn-admin-open')?.addEventListener('click',openAdmin);
  $('admin-close')?.addEventListener('click',closeAdmin);
  $('admin-backdrop')?.addEventListener('click',closeAdmin);
  document.querySelectorAll('.adm-tab').forEach(tab=>tab.addEventListener('click',()=>{
    document.querySelectorAll('.adm-tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    $('adm-foods-panel').classList.toggle('hidden',tab.dataset.atab!=='foods');
    $('adm-roulette-panel').classList.toggle('hidden',tab.dataset.atab!=='roulette');
  }));
  $('btn-food-add')?.addEventListener('click',()=>openFoodForm());
  $('adm-food-list')?.addEventListener('click',e=>{
    const ed=e.target.closest('.btn-edit[data-id]');
    const dl=e.target.closest('.btn-del[data-id]');
    if(ed){closeAdmin();openFoodForm(ed.dataset.id);}
    if(dl)deleteFood(dl.dataset.id);
  });
  $('adm-reward-list')?.addEventListener('click',e=>{
    const dl=e.target.closest('.btn-del[data-rid]');
    if(dl){
      S.rewards=S.rewards.filter(r=>r.id!==dl.dataset.rid);
      sv(SK.REWARDS,S.rewards);renderAdminRewards();toast(t('reward_deleted'),'warning');
    }
  });

  // Food form
  $('fform-backdrop')?.addEventListener('click',closeFoodForm);
  $('fform-close')?.addEventListener('click',closeFoodForm);
  $('btn-fform-save')?.addEventListener('click',saveFoodForm);
}

/* ── START ── */
document.addEventListener('DOMContentLoaded',init);
