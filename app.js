// app.js - To'liq Nima yeymiz? App

// ========== APP STATE ==========
let appState = {
    user: null,
    foods: [],
    cart: [],
    diamonds: 0,
    cashback: 0,
    language: 'uz',
    theme: 'light',
    spinCount: 0,
    streak: 0,
    level: 'Bronze'
};

// Translations
const translations = {
    uz: {
        greeting: "Assalomu alaykum!",
        todayEat: "Bugun nima yeymiz?",
        diamonds: "Olmos",
        cashback: "Cashback",
        search: "Taom izlash...",
        recommended: "Tavsiya etamiz",
        viewAll: "Barchasi",
        cart: "Savat",
        total: "Jami",
        checkout: "Buyurtma berish",
        spin: "AYLANTIRISH",
        rewardSpin: "AYLANTIRISH (20 olmos)",
        profile: "Profil",
        settings: "Sozlamalar",
        language: "Til",
        theme: "Mavzu",
        logout: "Chiqish",
        bronze: "Bronze",
        silver: "Kumush",
        gold: "Oltin",
        diamond: "Olmos"
    },
    ru: {
        greeting: "Ассаламу алейкум!",
        todayEat: "Что сегодня едим?",
        diamonds: "Алмазы",
        cashback: "Кэшбэк",
        search: "Поиск блюд...",
        recommended: "Рекомендуем",
        viewAll: "Все",
        cart: "Корзина",
        total: "Итого",
        checkout: "Заказать",
        spin: "ВРАЩАТЬ",
        rewardSpin: "ВРАЩАТЬ (20 алмазов)",
        profile: "Профиль",
        settings: "Настройки",
        language: "Язык",
        theme: "Тема",
        logout: "Выйти",
        bronze: "Бронза",
        silver: "Серебро",
        gold: "Золото",
        diamond: "Алмаз"
    }
};

// ========== INITIAL FOOD DATA ==========
const defaultFoods = [
    { id: 1, name: "Cheeseburger", nameRu: "Чизбургер", price: 18000, category: "Burger", cashback: 10, diamonds: 2, image: "🍔", quantity: 0 },
    { id: 2, name: "Lavash doner", nameRu: "Лаваш донер", price: 16000, category: "Lavash", cashback: 8, diamonds: 1, image: "🌯", quantity: 0 },
    { id: 3, name: "Osh", nameRu: "Плов", price: 22000, category: "Milliy", cashback: 12, diamonds: 3, image: "🍚", quantity: 0 },
    { id: 4, name: "Coca Cola", nameRu: "Кока-Кола", price: 8000, category: "Ichimlik", cashback: 5, diamonds: 0, image: "🥤", quantity: 0 },
    { id: 5, name: "Salat", nameRu: "Салат", price: 15000, category: "Salat", cashback: 7, diamonds: 1, image: "🥗", quantity: 0 },
    { id: 6, name: "Burger", nameRu: "Бургер", price: 25000, category: "Burger", cashback: 15, diamonds: 3, image: "🍔", quantity: 0 },
    { id: 7, name: "Somsa", nameRu: "Самса", price: 12000, category: "Milliy", cashback: 5, diamonds: 1, image: "🥟", quantity: 0 },
    { id: 8, name: "Pizza", nameRu: "Пицца", price: 35000, category: "Burger", cashback: 18, diamonds: 4, image: "🍕", quantity: 0 }
];

// ========== LOAD DATA FROM STORAGE ==========
function loadData() {
    const savedUser = localStorage.getItem('nimaUser');
    const savedFoods = localStorage.getItem('nimaFoods');
    const savedCart = localStorage.getItem('nimaCart');
    const savedDiamonds = localStorage.getItem('nimaDiamonds');
    const savedCashback = localStorage.getItem('nimaCashback');
    const savedLanguage = localStorage.getItem('nimaLanguage');
    const savedTheme = localStorage.getItem('nimaTheme');
    
    if (savedUser) appState.user = JSON.parse(savedUser);
    if (savedFoods) appState.foods = JSON.parse(savedFoods);
    else appState.foods = [...defaultFoods];
    if (savedCart) appState.cart = JSON.parse(savedCart);
    if (savedDiamonds) appState.diamonds = parseInt(savedDiamonds);
    if (savedCashback) appState.cashback = parseInt(savedCashback);
    if (savedLanguage) {
        appState.language = savedLanguage;
        document.getElementById('languageSelect').value = savedLanguage;
    }
    if (savedTheme) {
        appState.theme = savedTheme;
        document.getElementById('themeSelect').value = savedTheme;
        applyTheme(savedTheme);
    }
    
    updateLevel();
}

function saveData() {
    localStorage.setItem('nimaUser', JSON.stringify(appState.user));
    localStorage.setItem('nimaFoods', JSON.stringify(appState.foods));
    localStorage.setItem('nimaCart', JSON.stringify(appState.cart));
    localStorage.setItem('nimaDiamonds', appState.diamonds);
    localStorage.setItem('nimaCashback', appState.cashback);
    localStorage.setItem('nimaLanguage', appState.language);
    localStorage.setItem('nimaTheme', appState.theme);
}

// ========== UPDATE LEVEL ==========
function updateLevel() {
    const totalSpent = appState.diamonds * 10000;
    if (totalSpent >= 50000) appState.level = 'Diamond';
    else if (totalSpent >= 20000) appState.level = 'Gold';
    else if (totalSpent >= 5000) appState.level = 'Silver';
    else appState.level = 'Bronze';
    
    const levelNames = { uz: { Bronze: 'Bronze', Silver: 'Kumush', Gold: 'Oltin', Diamond: 'Olmos' }, ru: { Bronze: 'Бронза', Silver: 'Серебро', Gold: 'Золото', Diamond: 'Алмаз' } };
    return levelNames[appState.language][appState.level];
}

// ========== APPLY THEME ==========
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// ========== UPDATE UI ==========
function updateUI() {
    const t = translations[appState.language];
    
    document.getElementById('diamondCount').innerText = appState.diamonds;
    document.getElementById('cashbackBalance').innerText = appState.cashback;
    document.getElementById('profileDiamonds').innerText = appState.diamonds;
    document.getElementById('profileCashback').innerText = appState.cashback;
    document.getElementById('profileLevel').innerText = updateLevel();
    document.getElementById('rewardDiamonds').innerText = appState.diamonds;
    
    if (appState.user) {
        document.getElementById('greetingName').innerHTML = `${t.greeting} ${appState.user.fullName}`;
        document.getElementById('profileName').innerText = appState.user.fullName;
        document.getElementById('profilePhone').innerText = appState.user.phone;
    }
    
    updateCartUI();
    renderFoods();
    renderAdminFoods();
    renderLeaderboard();
    
    const rewardSpinBtn = document.getElementById('spinRewardWheel');
    if (rewardSpinBtn) {
        rewardSpinBtn.disabled = appState.diamonds < 20;
        rewardSpinBtn.innerHTML = `<i class="fas fa-gem"></i> ${t.rewardSpin}`;
    }
}

// ========== CART FUNCTIONS ==========
function updateCartUI() {
    const cartCount = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCashback = Math.floor(cartTotal * 0.05);
    const cartDiamonds = Math.floor(cartTotal / 10000);
    
    document.getElementById('cartCount').innerText = cartCount;
    document.getElementById('floatingCartCount').innerText = cartCount;
    document.getElementById('cartTotalPrice').innerHTML = `${cartTotal.toLocaleString()} so'm`;
    document.getElementById('cartCashback').innerHTML = `${cartCashback.toLocaleString()} so'm`;
    document.getElementById('cartDiamonds').innerHTML = cartDiamonds;
    
    const cartItemsDiv = document.getElementById('cartItems');
    if (cartItemsDiv) {
        if (appState.cart.length === 0 || appState.cart.every(i => i.quantity === 0)) {
            cartItemsDiv.innerHTML = '<div class="empty-cart">Savat bo\'sh</div>';
            return;
        }
        
        cartItemsDiv.innerHTML = appState.cart.filter(item => item.quantity > 0).map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-name">${appState.language === 'uz' ? item.name : item.nameRu || item.name}</span>
                    <span class="cart-item-price">${(item.price * item.quantity).toLocaleString()} so'm</span>
                </div>
                <div class="quantity-control">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `).join('');
    }
}

function updateQuantity(foodId, delta) {
    const food = appState.foods.find(f => f.id === foodId);
    if (!food) return;
    
    const cartItem = appState.cart.find(c => c.id === foodId);
    if (cartItem) {
        const newQty = cartItem.quantity + delta;
        if (newQty <= 0) {
            cartItem.quantity = 0;
            appState.cart = appState.cart.filter(c => c.quantity > 0);
        } else {
            cartItem.quantity = newQty;
        }
    } else if (delta > 0) {
        appState.cart.push({ ...food, quantity: 1 });
    }
    
    saveData();
    updateUI();
    renderFoods();
}

function addToCart(foodId) {
    updateQuantity(foodId, 1);
}

// ========== CHECKOUT ==========
function checkout() {
    if (appState.cart.length === 0 || appState.cart.every(i => i.quantity === 0)) {
        alert(appState.language === 'uz' ? 'Savat bo\'sh!' : 'Корзина пуста!');
        return;
    }
    
    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const earnedCashback = Math.floor(total * 0.05);
    const earnedDiamonds = Math.floor(total / 10000);
    
    appState.cashback += earnedCashback;
    appState.diamonds += earnedDiamonds;
    appState.spinCount++;
    appState.streak++;
    
    document.getElementById('streakCount').innerHTML = appState.streak;
    
    appState.cart = [];
    saveData();
    updateUI();
    
    alert(appState.language === 'uz' ? 
        `Buyurtma qabul qilindi!\n+${earnedCashback} so'm cashback\n+${earnedDiamonds} olmos` :
        `Заказ принят!\n+${earnedCashback} сум кэшбэк\n+${earnedDiamonds} алмазов`);
    
    renderFoods();
}

// ========== RENDER FOODS ==========
function renderFoods() {
    const activeCategory = document.querySelector('.category-item.active')?.dataset.category || 'all';
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    let filteredFoods = appState.foods.filter(food => {
        const matchesCategory = activeCategory === 'all' || food.category === activeCategory;
        const foodName = appState.language === 'uz' ? food.name.toLowerCase() : (food.nameRu || food.name).toLowerCase();
        const matchesSearch = foodName.includes(searchTerm);
        return matchesCategory && matchesSearch;
    });
    
    const recommendedDiv = document.getElementById('recommendedFoods');
    const menuDiv = document.getElementById('menuFoods');
    
    const renderFoodCard = (food) => {
        const cartItem = appState.cart.find(c => c.id === food.id);
        const quantity = cartItem ? cartItem.quantity : 0;
        const foodName = appState.language === 'uz' ? food.name : (food.nameRu || food.name);
        
        return `
            <div class="food-card">
                <div class="food-image">${food.image || '🍽️'}</div>
                <div class="food-info">
                    <h4>${foodName}</h4>
                    <div class="food-price">${food.price.toLocaleString()} so'm</div>
                    <div class="food-meta">
                        <span class="cashback-badge">${food.cashback}% cashback</span>
                        <span class="diamond-badge">+${food.diamonds} olmos</span>
                    </div>
                    <div class="quantity-control">
                        <button onclick="updateQuantity(${food.id}, -1)">-</button>
                        <span>${quantity}</span>
                        <button onclick="updateQuantity(${food.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    };
    
    if (recommendedDiv) recommendedDiv.innerHTML = filteredFoods.slice(0, 4).map(renderFoodCard).join('');
    if (menuDiv) menuDiv.innerHTML = filteredFoods.map(renderFoodCard).join('');
}

// ========== RENDER ADMIN FOODS ==========
function renderAdminFoods() {
    const adminList = document.getElementById('adminFoodsList');
    if (!adminList) return;
    
    adminList.innerHTML = appState.foods.map(food => `
        <div class="admin-food-item">
            <div>
                <strong>${food.name}</strong><br>
                <small>${food.price.toLocaleString()} so'm | ${food.category}</small>
            </div>
            <div>
                <button onclick="deleteFood(${food.id})" style="background:#ef4444; color:white; border:none; padding:8px 12px; border-radius:8px; margin-right:8px;">🗑️</button>
                <button onclick="editFood(${food.id})" style="background:#10b981; color:white; border:none; padding:8px 12px; border-radius:8px;">✏️</button>
            </div>
        </div>
    `).join('');
}

function deleteFood(id) {
    if (confirm('Rostdan ham o\'chirmoqchimisiz?')) {
        appState.foods = appState.foods.filter(f => f.id !== id);
        saveData();
        renderAdminFoods();
        renderFoods();
    }
}

function editFood(id) {
    const food = appState.foods.find(f => f.id === id);
    if (!food) return;
    
    const newName = prompt('Yangi nom:', food.name);
    const newPrice = prompt('Yangi narx:', food.price);
    if (newName && newPrice) {
        food.name = newName;
        food.price = parseInt(newPrice);
        saveData();
        renderAdminFoods();
        renderFoods();
    }
}

// ========== FOOD WHEEL ==========
let foodWheelCanvas, foodWheelCtx, foodWheelSegments = [];
let isSpinning = false;

function initFoodWheel() {
    foodWheelCanvas = document.getElementById('foodWheel');
    if (!foodWheelCanvas) return;
    foodWheelCtx = foodWheelCanvas.getContext('2d');
    
    const wheelFoods = appState.foods.slice(0, 8);
    foodWheelSegments = wheelFoods;
    drawFoodWheel();
}

function drawFoodWheel() {
    if (!foodWheelCtx || foodWheelSegments.length === 0) return;
    const size = 400;
    const center = size / 2;
    const radius = size / 2 - 10;
    const angleStep = (2 * Math.PI) / foodWheelSegments.length;
    
    foodWheelCtx.clearRect(0, 0, size, size);
    
    for (let i = 0; i < foodWheelSegments.length; i++) {
        const startAngle = i * angleStep;
        const endAngle = (i + 1) * angleStep;
        
        const colors = ['#10b981', '#059669', '#34d399', '#6ee7b7', '#a7f3d0', '#047857', '#065f46', '#d1fae5'];
        foodWheelCtx.beginPath();
        foodWheelCtx.fillStyle = colors[i % colors.length];
        foodWheelCtx.moveTo(center, center);
        foodWheelCtx.arc(center, center, radius, startAngle, endAngle);
        foodWheelCtx.fill();
        
        foodWheelCtx.save();
        foodWheelCtx.translate(center, center);
        foodWheelCtx.rotate(startAngle + angleStep / 2);
        foodWheelCtx.fillStyle = '#fff';
        foodWheelCtx.font = 'bold 14px Inter';
        const foodName = appState.language === 'uz' ? foodWheelSegments[i].name : (foodWheelSegments[i].nameRu || foodWheelSegments[i].name);
        foodWheelCtx.fillText(foodName.substring(0, 10), radius / 1.5, 5);
        foodWheelCtx.restore();
    }
}

function spinFoodWheel() {
    if (isSpinning) return;
    isSpinning = true;
    
    const spins = Math.floor(Math.random() * 20) + 30;
    let currentRotation = 0;
    let step = 0;
    
    function animate() {
        if (step >= spins) {
            const selectedIndex = Math.floor(Math.random() * foodWheelSegments.length);
            const selectedFood = foodWheelSegments[selectedIndex];
            const resultDiv = document.getElementById('rouletteResult');
            const t = translations[appState.language];
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = `
                <div style="text-align:center">
                    <i class="fas fa-utensils" style="font-size:40px; color:#10b981"></i>
                    <h3>${selectedFood.name}</h3>
                    <p>${selectedFood.price.toLocaleString()} so'm</p>
                    <button onclick="addToCart(${selectedFood.id})" style="background:#10b981; color:white; border:none; padding:12px 24px; border-radius:30px; margin-top:10px">
                        Savatga qo'shish
                    </button>
                </div>
            `;
            isSpinning = false;
            return;
        }
        
        currentRotation += 0.1;
        drawFoodWheelWithRotation(currentRotation);
        step++;
        requestAnimationFrame(animate);
    }
    
    animate();
}

function drawFoodWheelWithRotation(rotation) {
    if (!foodWheelCtx || foodWheelSegments.length === 0) return;
    const size = 400;
    const center = size / 2;
    const radius = size / 2 - 10;
    const angleStep = (2 * Math.PI) / foodWheelSegments.length;
    
    foodWheelCtx.clearRect(0, 0, size, size);
    
    for (let i = 0; i < foodWheelSegments.length; i++) {
        const startAngle = i * angleStep + rotation;
        const endAngle = (i + 1) * angleStep + rotation;
        
        const colors = ['#10b981', '#059669', '#34d399', '#6ee7b7', '#a7f3d0', '#047857', '#065f46', '#d1fae5'];
        foodWheelCtx.beginPath();
        foodWheelCtx.fillStyle = colors[i % colors.length];
        foodWheelCtx.moveTo(center, center);
        foodWheelCtx.arc(center, center, radius, startAngle, endAngle);
        foodWheelCtx.fill();
    }
}

// ========== REWARD WHEEL ==========
let rewardWheelCanvas, rewardWheelCtx;
const rewardSegments = [
    { name: "+5% Cashback", type: "cashback", value: 5 },
    { name: "+10 Olmos", type: "diamond", value: 10 },
    { name: "-10% Chegirma", type: "discount", value: 10 },
    { name: "+20 Olmos", type: "diamond", value: 20 },
    { name: "+15% Cashback", type: "cashback", value: 15 },
    { name: "Bepul Taom", type: "free", value: 1 }
];

function initRewardWheel() {
    rewardWheelCanvas = document.getElementById('rewardWheel');
    if (!rewardWheelCanvas) return;
    rewardWheelCtx = rewardWheelCanvas.getContext('2d');
    drawRewardWheel();
}

function drawRewardWheel() {
    if (!rewardWheelCtx) return;
    const size = 400;
    const center = size / 2;
    const radius = size / 2 - 10;
    const angleStep = (2 * Math.PI) / rewardSegments.length;
    
    rewardWheelCtx.clearRect(0, 0, size, size);
    
    for (let i = 0; i < rewardSegments.length; i++) {
        const startAngle = i * angleStep;
        const endAngle = (i + 1) * angleStep;
        
        const colors = ['#f59e0b', '#f97316', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];
        rewardWheelCtx.beginPath();
        rewardWheelCtx.fillStyle = colors[i % colors.length];
        rewardWheelCtx.moveTo(center, center);
        rewardWheelCtx.arc(center, center, radius, startAngle, endAngle);
        rewardWheelCtx.fill();
        
        rewardWheelCtx.save();
        rewardWheelCtx.translate(center, center);
        rewardWheelCtx.rotate(startAngle + angleStep / 2);
        rewardWheelCtx.fillStyle = '#fff';
        rewardWheelCtx.font = 'bold 12px Inter';
        rewardWheelCtx.fillText(rewardSegments[i].name.substring(0, 12), radius / 1.5, 5);
        rewardWheelCtx.restore();
    }
}

function spinRewardWheel() {
    if (appState.diamonds < 20) {
        alert(appState.language === 'uz' ? '20 olmos yetarli emas!' : 'Недостаточно алмазов!');
        return;
    }
    if (isSpinning) return;
    isSpinning = true;
    
    appState.diamonds -= 20;
    saveData();
    updateUI();
    
    const spins = Math.floor(Math.random() * 20) + 20;
    let step = 0;
    
    function animate() {
        if (step >= spins) {
            const selectedIndex = Math.floor(Math.random() * rewardSegments.length);
            const reward = rewardSegments[selectedIndex];
            
            if (reward.type === 'cashback') {
                appState.cashback += reward.value * 1000;
                alert(`+${reward.value}% Cashback qo'shildi!`);
            } else if (reward.type === 'diamond') {
                appState.diamonds += reward.value;
                alert(`+${reward.value} Olmos qo'shildi!`);
            } else if (reward.type === 'discount') {
                alert(`Keyingi buyurtmangizga ${reward.value}% chegirma!`);
            } else {
                alert("Bepul taom yutdingiz! Admin bilan bog'laning!");
            }
            
            saveData();
            updateUI();
            isSpinning = false;
            return;
        }
        
        step++;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ========== LEADERBOARD ==========
function renderLeaderboard() {
    const leaderboardDiv = document.getElementById('leaderboard');
    if (!leaderboardDiv) return;
    
    const users = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const leaderboardData = [...users, { name: appState.user?.fullName || 'Siz', diamonds: appState.diamonds }];
    const sorted = leaderboardData.sort((a, b) => b.diamonds - a.diamonds).slice(0, 5);
    
    leaderboardDiv.innerHTML = sorted.map((user, idx) => `
        <div class="leaderboard-item">
            <span class="rank">${idx + 1}</span>
            <span class="name">${user.name}</span>
            <span class="diamonds"><i class="fas fa-gem"></i> ${user.diamonds}</span>
        </div>
    `).join('');
}

function updateLeaderboard() {
    let users = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const existing = users.find(u => u.name === appState.user?.fullName);
    if (existing) {
        existing.diamonds = appState.diamonds;
    } else if (appState.user) {
        users.push({ name: appState.user.fullName, diamonds: appState.diamonds });
    }
    localStorage.setItem('leaderboard', JSON.stringify(users));
    renderLeaderboard();
}

// ========== NAVIGATION ==========
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.dataset.tab;
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.getElementById(`${tabId}Tab`).classList.add('active');
            
            if (tabId === 'roulette') {
                setTimeout(() => { initFoodWheel(); drawFoodWheel(); }, 100);
            } else if (tabId === 'rewards') {
                setTimeout(() => { initRewardWheel(); drawRewardWheel(); }, 100);
            }
        });
    });
}

// ========== EVENT LISTENERS ==========
function initEventListeners() {
    document.getElementById('registerBtn')?.addEventListener('click', () => {
        const fullName = document.getElementById('fullName').value;
        const phone = document.getElementById('phoneNumber').value;
        if (!fullName || !phone) {
            alert('Iltimos, barcha maydonlarni to\'ldiring!');
            return;
        }
        appState.user = { fullName, phone };
        saveData();
        document.getElementById('authScreen').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        updateUI();
    });
    
    document.getElementById('searchInput')?.addEventListener('input', () => renderFoods());
    document.getElementById('languageSelect')?.addEventListener('change', (e) => {
        appState.language = e.target.value;
        saveData();
        updateUI();
        renderFoods();
    });
    document.getElementById('themeSelect')?.addEventListener('change', (e) => {
        appState.theme = e.target.value;
        applyTheme(e.target.value);
        saveData();
    });
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
    document.getElementById('adminBtn')?.addEventListener('click', () => {
        document.getElementById('adminPanel').style.display = 'block';
    });
    document.getElementById('closeAdmin')?.addEventListener('click', () => {
        document.getElementById('adminPanel').style.display = 'none';
    });
    document.getElementById('foodForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const newFood = {
            id: Date.now(),
            name: document.getElementById('foodName').value,
            price: parseInt(document.getElementById('foodPrice').value),
            category: document.getElementById('foodCategory').value,
            cashback: parseInt(document.getElementById('foodCashback').value),
            diamonds: parseInt(document.getElementById('foodDiamonds').value),
            image: '🍽️',
            quantity: 0
        };
        appState.foods.push(newFood);
        saveData();
        renderAdminFoods();
        renderFoods();
        initFoodWheel();
        e.target.reset();
        alert('Taom qo\'shildi!');
    });
    document.getElementById('spinFoodWheel')?.addEventListener('click', spinFoodWheel);
    document.getElementById('spinRewardWheel')?.addEventListener('click', spinRewardWheel);
    document.getElementById('checkoutBtn')?.addEventListener('click', checkout);
    document.getElementById('cartFloatingBtn')?.addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.add('open');
        document.getElementById('cartOverlay').classList.add('open');
    });
    document.getElementById('closeCart')?.addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.remove('open');
        document.getElementById('cartOverlay').classList.remove('open');
    });
    document.getElementById('cartOverlay')?.addEventListener('click', () => {
        document.getElementById('cartSidebar').classList.remove('open');
        document.getElementById('cartOverlay').classList.remove('open');
    });
    
    document.querySelectorAll('.category-item').forEach(cat => {
        cat.addEventListener('click', () => {
            document.querySelectorAll('.category-item').forEach(c => c.classList.remove('active'));
            cat.classList.add('active');
            renderFoods();
        });
    });
}

// ========== SPLASH SCREEN ==========
function initSplash() {
    setTimeout(() => {
        const splash = document.getElementById('splashScreen');
        if (splash) {
            splash.style.display = 'none';
            if (appState.user) {
                document.getElementById('mainApp').style.display = 'block';
                updateUI();
            } else {
                document.getElementById('authScreen').style.display = 'flex';
            }
        }
    }, 3500);
}

// ========== INIT APP ==========
loadData();
initSplash();
initNavigation();
initEventListeners();
updateUI();
updateLeaderboard();
