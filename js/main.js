// main.js - Core functionality for the Tiffin & Meal Subscription website

// ============================================
// THEME MANAGEMENT
// ============================================
// Toggle between light and dark mode
// Stores preference in localStorage as 'theme'
// Adds/removes 'dark-mode' class on body
// Updates the theme toggle icon (sun/moon)
// Works across all pages

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    updateThemeIcon();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.body.classList.contains('dark-mode');
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });
}

// ============================================
// RTL MANAGEMENT
// ============================================
// Toggle RTL mode
// Stores preference in localStorage as 'direction'
// Adds/removes 'rtl' class on body
// Sets document direction

function initRTL() {
    const savedDir = localStorage.getItem('direction') || 'ltr';
    if (savedDir === 'rtl') {
        document.body.classList.add('rtl');
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    }
    updateRTLIcon();
}

function toggleRTL() {
    document.body.classList.toggle('rtl');
    const isRTL = document.body.classList.contains('rtl');
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', isRTL ? 'ar' : 'en');
    localStorage.setItem('direction', isRTL ? 'rtl' : 'ltr');
    updateRTLIcon();
}

function updateRTLIcon() {
    const isRTL = document.body.classList.contains('rtl');
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
        btn.innerHTML = isRTL ? '<i class="fas fa-align-left"></i>' : '<i class="fas fa-align-right"></i>';
        btn.title = isRTL ? 'Switch to LTR' : 'Switch to RTL';
    });
}

// ============================================
// MOBILE NAVIGATION
// ============================================
// Hamburger menu toggle - opens/closes mobile menu
// Close button closes the menu
// Clicking overlay closes the menu
// Does NOT open on scroll or swipe
// Menu slides in from the right (left in RTL)

function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (menu && overlay) {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (menu && overlay) {
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// HOME DROPDOWN (Mobile)
// ============================================
// Toggle mobile home dropdown
function toggleMobileDropdown(el) {
    const dropdown = el.nextElementSibling;
    if (dropdown) {
        dropdown.classList.toggle('active');
        const icon = el.querySelector('.dropdown-arrow');
        if (icon) icon.classList.toggle('rotated');
    }
}

// ============================================
// CART MANAGEMENT
// ============================================
function getCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(getCartStorageKey())) || { items: [] };
        const items = Array.isArray(saved.items) ? saved.items : [];
        return { items, count: items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0) };
    } catch {
        return { items: [], count: 0 };
    }
}

function saveCart(cart) {
    cart.count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem(getCartStorageKey(), JSON.stringify(cart));
    updateCartBadge();
    renderCartPanel();
}

function getCurrentCustomer() {
    try {
        const user = JSON.parse(localStorage.getItem('tiffin_current_user'));
        return user && user.role === 'customer' && user.id ? user : null;
    } catch {
        return null;
    }
}

function getCartStorageKey() {
    const customer = getCurrentCustomer();
    return customer ? `tiffin_cart_${customer.id}` : 'tiffin_guest_cart';
}

function getCustomerRecords(type, customerId) {
    if (!customerId) return [];
    try {
        return JSON.parse(localStorage.getItem(`tiffin_${type}_${customerId}`)) || [];
    } catch {
        return [];
    }
}

function saveCustomerRecords(type, customerId, records) {
    if (customerId) localStorage.setItem(`tiffin_${type}_${customerId}`, JSON.stringify(records));
}

let cartSourceElement = null;

function addToCart(item) {
    const cart = getCart();
    const source = cartSourceElement || document.activeElement;
    const activeCard = source && source.closest('.menu-card');
    const cuisine = activeCard && activeCard.querySelector('.card-body p.text-muted.small');
    const itemData = {
        ...item,
        price: Number(item.price),
        category: item.category || (activeCard && activeCard.dataset.category) || '',
        cuisine: item.cuisine || (cuisine && cuisine.textContent.trim()) || ''
    };
    const existing = cart.items.find(i => i.id === item.id);
    if (existing) {
        existing.quantity += (itemData.quantity || 1);
    } else {
        cart.items.push({ ...itemData, quantity: itemData.quantity || 1 });
    }
    saveCart(cart);
    cartSourceElement = null;
    showNotification(`${item.name} added to cart!`, 'success');
}

function removeFromCart(itemId) {
    const cart = getCart();
    cart.items = cart.items.filter(i => i.id !== itemId);
    saveCart(cart);
}

function changeCartQuantity(itemId, change) {
    const cart = getCart();
    const item = cart.items.find(i => i.id === itemId);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
        cart.items = cart.items.filter(i => i.id !== itemId);
    }
    saveCart(cart);
}

function updateCartBadge() {
    const cart = getCart();
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cart.count;
        el.style.display = cart.count > 0 ? 'inline-flex' : 'none';
    });
}

function formatCartPrice(amount) {
    return `₹${Number(amount || 0).toLocaleString('en-IN')}`;
}

function escapeCartText(value) {
    const element = document.createElement('span');
    element.textContent = value || '';
    return element.innerHTML;
}

function injectCartUI() {
    document.querySelectorAll('.nav-actions').forEach(actions => {
        if (actions.querySelector('.cart-nav-btn')) return;
        actions.insertAdjacentHTML('afterbegin', '<button aria-label="Open cart" class="cart-nav-btn" onclick="toggleCartPanel()" title="Cart" type="button"><i class="fas fa-shopping-bag"></i><span class="cart-count">0</span></button>');
    });

    if (!document.getElementById('cart-panel')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div class="cart-backdrop" id="cart-backdrop" onclick="toggleCartPanel(false)"></div>
            <aside aria-label="Shopping cart" aria-modal="true" class="cart-panel" id="cart-panel" role="dialog">
                <div class="cart-panel-header"><h2>Your Cart</h2><button aria-label="Close cart" class="cart-close-btn" onclick="toggleCartPanel(false)" type="button">&times;</button></div>
                <div class="cart-panel-items" id="cart-panel-items"></div>
                <div class="cart-panel-footer" id="cart-panel-footer"></div>
            </aside>`);
    }
    updateCartBadge();
    renderCartPanel();
}

function toggleCartPanel(forceOpen) {
    const panel = document.getElementById('cart-panel');
    const backdrop = document.getElementById('cart-backdrop');
    if (!panel || !backdrop) return;
    const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !panel.classList.contains('open');
    panel.classList.toggle('open', shouldOpen);
    backdrop.classList.toggle('open', shouldOpen);
    document.body.classList.toggle('cart-open', shouldOpen);
    if (shouldOpen) renderCartPanel();
}

function renderCartPanel() {
    const itemsContainer = document.getElementById('cart-panel-items');
    const footer = document.getElementById('cart-panel-footer');
    if (!itemsContainer || !footer) return;
    const cart = getCart();
    const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (!cart.items.length) {
        itemsContainer.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>Your cart is empty.</p><a class="btn btn-primary-custom" href="menu.html" onclick="toggleCartPanel(false)">Browse Menu</a></div>';
        footer.innerHTML = '';
        return;
    }
    itemsContainer.innerHTML = cart.items.map(item => `
        <article class="cart-line-item">
            <img alt="${escapeCartText(item.name)}" src="${escapeCartText(item.image)}">
            <div class="cart-line-copy"><h3>${escapeCartText(item.name)}</h3><p>${escapeCartText(item.cuisine || item.category || 'TiffinBox meal')}</p><span>${formatCartPrice(item.price)} each</span></div>
            <button aria-label="Remove ${escapeCartText(item.name)}" class="cart-remove-btn" onclick="removeFromCart('${escapeCartText(item.id)}')" type="button"><i class="fas fa-trash-alt"></i></button>
            <div class="cart-quantity"><button aria-label="Decrease quantity" onclick="changeCartQuantity('${escapeCartText(item.id)}', -1)" type="button">&minus;</button><span>${item.quantity}</span><button aria-label="Increase quantity" onclick="changeCartQuantity('${escapeCartText(item.id)}', 1)" type="button">+</button></div>
            <strong>${formatCartPrice(item.price * item.quantity)}</strong>
        </article>`).join('');
    footer.innerHTML = `<div class="cart-total"><span>Total</span><strong>${formatCartPrice(total)}</strong></div><a class="btn btn-warning w-100" href="checkout.html" onclick="toggleCartPanel(false)">Proceed to Checkout</a>`;
}

function initCheckoutPage() {
    const app = document.getElementById('checkout-app');
    if (!app) return;
    renderCheckoutPage();
}

function renderCheckoutPage() {
    const app = document.getElementById('checkout-app');
    if (!app) return;
    const cart = getCart();
    const customer = getCurrentCustomer();
    const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (!cart.items.length) {
        app.innerHTML = '<div class="checkout-empty text-center"><i class="fas fa-shopping-bag"></i><h1>Your cart is empty</h1><p>Add a meal before checking out.</p><a class="btn btn-primary-custom" href="menu.html">Browse Sample Menu</a></div>';
        return;
    }
    app.innerHTML = `
        <div class="checkout-grid">
            <form class="checkout-form" id="checkout-form">
                <h1>Checkout</h1>
                <p class="checkout-intro">Complete your delivery details to place a demo order.</p>
                <div class="checkout-fields">
                    <label>Customer name<input autocomplete="name" name="customerName" required type="text" value="${escapeCartText(customer ? customer.name : '')}"></label>
                    <label>Phone number<input autocomplete="tel" inputmode="tel" name="phone" pattern="[0-9+() -]{7,}" required type="tel" value="${escapeCartText(customer ? customer.phone : '')}"></label>
                    <label class="checkout-wide">Delivery address<textarea autocomplete="street-address" name="address" required rows="3">${escapeCartText(customer ? customer.address : '')}</textarea></label>
                </div>
                <fieldset class="payment-methods"><legend>Payment method</legend>
                    <label><input checked name="payment" type="radio" value="cod"> Cash on Delivery</label>
                    <label><input name="payment" type="radio" value="upi"> UPI</label>
                    <label><input name="payment" type="radio" value="paypal"> PayPal</label>
                    <label><input name="payment" type="radio" value="card"> Card</label>
                </fieldset>
                <div id="payment-details"></div>
                <button class="btn btn-warning btn-lg w-100" type="submit">Place Order <span>${formatCartPrice(total)}</span></button>
                <p class="checkout-demo-note">Demo checkout only. No payment details are stored or sent.</p>
            </form>
            <aside class="checkout-summary"><h2>Order Summary</h2>${checkoutItemsMarkup(cart.items)}<div class="checkout-grand-total"><span>Grand total</span><strong>${formatCartPrice(total)}</strong></div></aside>
        </div>`;
    const form = document.getElementById('checkout-form');
    form.querySelectorAll('input[name="payment"]').forEach(input => input.addEventListener('change', renderPaymentDetails));
    form.addEventListener('submit', submitDemoOrder);
    renderPaymentDetails();
}

function checkoutItemsMarkup(items) {
    return `<div class="checkout-summary-items">${items.map(item => `<div class="checkout-summary-item"><img alt="${escapeCartText(item.name)}" src="${escapeCartText(item.image)}"><div><h3>${escapeCartText(item.name)}</h3><span>${item.quantity} x ${formatCartPrice(item.price)}</span></div><strong>${formatCartPrice(item.quantity * item.price)}</strong></div>`).join('')}</div>`;
}

function renderPaymentDetails() {
    const details = document.getElementById('payment-details');
    const selected = document.querySelector('input[name="payment"]:checked');
    if (!details || !selected) return;
    const fields = {
        cod: '<div class="payment-detail"><strong>Cash on Delivery</strong><p>Pay the order total to the delivery partner when your meal arrives.</p></div>',
        upi: '<div class="payment-detail"><strong>UPI payment (demo)</strong><div class="upi-options"><label><input checked name="upiProvider" type="radio" value="Google Pay"> Google Pay</label><label><input name="upiProvider" type="radio" value="PhonePe"> PhonePe</label><label><input name="upiProvider" type="radio" value="Paytm"> Paytm</label></div><label>Your UPI ID<input autocomplete="off" name="upiId" placeholder="name@bank" required type="text"></label><p>Choose a provider and enter a demo UPI ID to simulate payment.</p></div>',
        paypal: '<div class="payment-detail paypal-detail"><strong><i class="fab fa-paypal"></i> PayPal (demo)</strong><label>PayPal email<input autocomplete="email" name="paypalEmail" placeholder="you@example.com" required type="email"></label><p>This simulates the PayPal handoff. No account will be charged.</p></div>',
        card: '<div class="payment-detail"><strong>Card payment (demo)</strong><div class="checkout-fields"><label class="checkout-wide">Cardholder name<input autocomplete="cc-name" name="cardholder" required type="text"></label><label class="checkout-wide">Card number<input autocomplete="cc-number" inputmode="numeric" maxlength="23" name="cardNumber" placeholder="1234 5678 9012 3456" required type="text"></label><label>Expiry date<input autocomplete="cc-exp" inputmode="numeric" maxlength="5" name="expiry" placeholder="MM/YY" required type="text"></label><label>CVV<input autocomplete="cc-csc" inputmode="numeric" maxlength="4" name="cvv" placeholder="123" required type="password"></label></div><p>Use test details only. Card information is never stored.</p></div>'
    };
    details.innerHTML = fields[selected.value];
    const cardNumber = details.querySelector('[name="cardNumber"]');
    const expiry = details.querySelector('[name="expiry"]');
    if (cardNumber) cardNumber.addEventListener('input', event => { event.target.value = event.target.value.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim(); });
    if (expiry) expiry.addEventListener('input', event => { const digits = event.target.value.replace(/\D/g, '').slice(0, 4); event.target.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits; });
}

function submitDemoOrder(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const payment = data.get('payment');
    if (payment === 'upi' && !/^[^\s@]+@[^\s@]+$/.test(data.get('upiId') || '')) return showNotification('Enter a valid UPI ID for this demo payment.', 'error');
    if (payment === 'card') {
        const cardNumber = (data.get('cardNumber') || '').replace(/\s/g, '');
        const expiry = data.get('expiry') || '';
        const cvv = data.get('cvv') || '';
        if (!/^\d{13,19}$/.test(cardNumber) || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) || !/^\d{3,4}$/.test(cvv)) return showNotification('Enter a valid demo card number, expiry date, and CVV.', 'error');
    }
    const cart = getCart();
    const customer = getCurrentCustomer();
    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryCharge = 0;
    const paymentMethod = payment === 'cod' ? 'Cash on Delivery' : payment === 'upi' ? `UPI - ${data.get('upiProvider')}` : payment === 'paypal' ? 'PayPal (demo)' : 'Card (demo)';
    const order = {
        number: `TB${Date.now().toString().slice(-8)}`,
        id: `ORD${Date.now().toString().slice(-8)}`,
        createdAt: new Date().toISOString(),
        items: cart.items,
        subtotal,
        deliveryCharge,
        total: subtotal + deliveryCharge,
        customer: { name: data.get('customerName'), phone: data.get('phone'), address: data.get('address') },
        payment: paymentMethod,
        status: payment === 'cod' ? 'Confirmed - Pay on delivery' : 'Paid - Demo'
    };
    if (customer) {
        const orders = getCustomerRecords('orders', customer.id);
        orders.unshift(order);
        saveCustomerRecords('orders', customer.id, orders);
        const billing = getCustomerRecords('billing', customer.id);
        billing.unshift({
            id: `INV${Date.now().toString().slice(-8)}`,
            orderId: order.id,
            createdAt: order.createdAt,
            items: order.items,
            amount: order.total,
            payment: order.payment,
            status: payment === 'cod' ? 'Payment due on delivery' : 'Paid - Demo'
        });
        saveCustomerRecords('billing', customer.id, billing);
    }
    saveCart({ items: [] });
    showOrderConfirmation(order);
}

function showOrderConfirmation(order) {
    const app = document.getElementById('checkout-app');
    if (!app) return;
    app.innerHTML = `<section class="order-confirmation text-center"><i class="fas fa-circle-check"></i><h1>Order Confirmed</h1><p>Your demo order <strong>${order.number}</strong> has been placed.</p><div class="order-confirmation-card"><p><strong>Payment:</strong> ${escapeCartText(order.payment)}</p><p><strong>Delivery to:</strong> ${escapeCartText(order.customer.name)}, ${escapeCartText(order.customer.phone)}</p>${checkoutItemsMarkup(order.items)}<div class="checkout-grand-total"><span>Total paid / due</span><strong>${formatCartPrice(order.total)}</strong></div></div><a class="btn btn-primary-custom" href="menu.html">Continue Shopping</a></section>`;
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
// Shows a toast notification
// type: 'success', 'error', 'info', 'warning'

function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification-toast').forEach(n => n.remove());
    
    const toast = document.createElement('div');
    toast.className = `notification-toast notification-${type}`;
    toast.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification-toast {
                position: fixed;
                top: 90px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                z-index: 9999;
                animation: slideInRight 0.3s ease;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                max-width: 400px;
                min-width: 250px;
            }
            .notification-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
            .notification-error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
            .notification-warning { background: #fff3cd; color: #856404; border: 1px solid #ffeeba; }
            .notification-info { background: #cce5ff; color: #004085; border: 1px solid #b8daff; }
            .notification-content { display: flex; align-items: center; gap: 0.75rem; }
            .notification-close { background: none; border: none; cursor: pointer; opacity: 0.7; font-size: 1rem; color: inherit; }
            .notification-close:hover { opacity: 1; }
            body.rtl .notification-toast { right: auto; left: 20px; animation-name: slideInLeft; }
            @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideInLeft { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

// ============================================
// PINCODE CHECKER
// ============================================
// Checks delivery availability for a pincode
// Available pincodes: 110001-110099 (Delhi), 400001-400099 (Mumbai), 
// 560001-560099 (Bangalore), 600001-600099 (Chennai), 
// 700001-700099 (Kolkata), 500001-500099 (Hyderabad),
// 380001-380099 (Ahmedabad), 411001-411099 (Pune)

function checkPincode(pincode) {
    if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
        return { available: false, message: 'Please enter a valid 6-digit pincode.' };
    }
    
    const prefix = parseInt(pincode.substring(0, 3));
    const availablePrefixes = [110, 400, 560, 600, 700, 500, 380, 411];
    
    if (availablePrefixes.includes(prefix)) {
        return { 
            available: true, 
            message: 'Great! Delivery is available in your area.',
            deliveryTime: '11:30 AM - 1:00 PM',
            deliveryDays: 'Monday to Saturday'
        };
    }
    
    return { 
        available: false, 
        message: 'Sorry, delivery is currently unavailable in this area. We are expanding soon!' 
    };
}

function handlePincodeCheck(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('pincode-input');
    const resultEl = document.getElementById('pincode-result');
    if (!input || !resultEl) return;
    
    const result = checkPincode(input.value.trim());
    resultEl.className = 'coverage-result ' + (result.available ? 'available' : 'unavailable');
    resultEl.style.display = 'block';
    resultEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:0.75rem;">
            <i class="fas ${result.available ? 'fa-check-circle' : 'fa-times-circle'}" style="font-size:1.5rem;"></i>
            <div>
                <strong>${result.message}</strong>
                ${result.available ? `<br><small>Delivery Time: ${result.deliveryTime} | ${result.deliveryDays}</small>` : ''}
            </div>
        </div>
    `;
}

// ============================================
// CONTACT FORM
// ============================================
function handleContactForm(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const subject = form.querySelector('[name="subject"]');
    const message = form.querySelector('[name="message"]');
    
    // Validation
    if (!name.value.trim()) { showNotification('Please enter your name.', 'error'); name.focus(); return; }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showNotification('Please enter a valid email.', 'error'); email.focus(); return; }
    if (!subject.value.trim()) { showNotification('Please enter a subject.', 'error'); subject.focus(); return; }
    if (!message.value.trim()) { showNotification('Please enter your message.', 'error'); message.focus(); return; }
    
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    form.reset();
}

// ============================================
// NEWSLETTER FORM
// ============================================
function handleNewsletter(e) {
    if (e) e.preventDefault();
    const form = e.target || e;
    const input = form.querySelector('input[type="email"]');
    if (!input || !input.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    showNotification('Successfully subscribed to our newsletter!', 'success');
    input.value = '';
}

// ============================================
// SEARCH FUNCTIONALITY (Blog)
// ============================================
function handleBlogSearch(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('blog-search');
    if (!input) return;
    const query = input.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.blog-card');
    let found = 0;
    
    cards.forEach(card => {
        const title = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
        const category = (card.querySelector('.blog-category')?.textContent || '').toLowerCase();
        const text = (card.querySelector('.card-text')?.textContent || '').toLowerCase();
        
        if (!query || title.includes(query) || category.includes(query) || text.includes(query)) {
            card.closest('.col').style.display = '';
            found++;
        } else {
            card.closest('.col').style.display = 'none';
        }
    });
    
    if (found === 0 && query) {
        showNotification('No articles found matching your search.', 'info');
    }
}

// ============================================
// BLOG FILTER
// ============================================
function filterBlog(category) {
    const cards = document.querySelectorAll('.blog-card');
    const btns = document.querySelectorAll('.blog-filter-btn');
    
    btns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    cards.forEach(card => {
        const cardCategory = card.querySelector('.blog-category')?.textContent?.toLowerCase() || '';
        if (category === 'all' || cardCategory === category.toLowerCase()) {
            card.closest('.col').style.display = '';
        } else {
            card.closest('.col').style.display = 'none';
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = this.getAttribute('href');
            if (target === '#') return;
            const element = document.querySelector(target);
            if (element) {
                e.preventDefault();
                const navHeight = document.querySelector('.main-navbar')?.offsetHeight || 0;
                window.scrollTo({
                    top: element.offsetTop - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.dataset.target || counter.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// ============================================
// FOOTER YEAR
// ============================================
function setFooterYear() {
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================
let currentTestimonial = 0;
function slideTestimonials(direction) {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;
    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;
    
    currentTestimonial += direction;
    if (currentTestimonial < 0) currentTestimonial = total - 1;
    if (currentTestimonial >= total) currentTestimonial = 0;
    
    const cardWidth = cards[0].offsetWidth + 24; // gap
    track.style.transform = `translateX(-${currentTestimonial * cardWidth}px)`;
}

// ============================================

// ============================================
// PUBLIC AUTH STATE
// ============================================
function checkPublicAuth() {
    try {
        const userStr = localStorage.getItem('tiffin_current_user');
        if (userStr) {
            const user = JSON.parse(userStr);
            const loginBtns = document.querySelectorAll('.nav-login-btn');
            const signupBtns = document.querySelectorAll('.nav-signup-btn');
            
            loginBtns.forEach(btn => {
                btn.textContent = 'Dashboard';
                btn.href = user.role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
                btn.classList.add('btn-primary-custom');
                btn.classList.remove('btn-outline-custom');
            });
            
            signupBtns.forEach(btn => {
                btn.textContent = 'Logout';
                btn.href = '#';
                btn.onclick = function(e) {
                    e.preventDefault();
                    localStorage.removeItem('tiffin_current_user');
                    window.location.reload();
                };
            });
        }
    } catch(e) {}
}

// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', event => {
        const button = event.target.closest('.menu-card button[onclick*="addToCart"]');
        if (button) cartSourceElement = button;
    }, true);
    initTheme();
    checkPublicAuth();
    initRTL();
    initScrollAnimations();
    initSmoothScroll();
    setFooterYear();
    initBackToTop();
    injectCartUI();
    updateCartBadge();
    initCheckoutPage();
    
    
    // Close mobile menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991) closeMobileMenu();
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.offcanvas .nav-link:not(.dropdown-toggle), .offcanvas .dropdown-item, .offcanvas .btn').forEach(link => {
        link.addEventListener('click', () => {
            const offcanvasEl = document.getElementById('offcanvasNavbar');
            if (offcanvasEl && window.innerWidth <= 991) {
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
                if (offcanvas) {
                    offcanvas.hide();
                }
            }
        });
    });
});

window.addEventListener('storage', event => {
    if (event.key && event.key.indexOf('tiffin_cart_') === 0) {
        updateCartBadge();
        renderCartPanel();
    }
});


// ==============================================================
// Custom Mobile Navigation Menu (Replacing Bootstrap Offcanvas)
// ==============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Create backdrop element if it doesn't exist
    let backdrop = document.querySelector('.custom-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'custom-backdrop';
        document.body.appendChild(backdrop);
    }

    const offcanvasElements = document.querySelectorAll('.offcanvas');
    const togglers = document.querySelectorAll('.navbar-toggler');
    const closeBtns = document.querySelectorAll('.btn-close');
    const navLinks = document.querySelectorAll('.offcanvas-body .nav-link:not(.dropdown-toggle)');

    function openMenu(menu) {
        if (!menu) return;
        menu.classList.add('show-custom');
        backdrop.classList.add('show-custom');
        document.body.classList.add('menu-open-custom');
    }

    function closeAllMenus() {
        offcanvasElements.forEach(menu => menu.classList.remove('show-custom'));
        backdrop.classList.remove('show-custom');
        document.body.classList.remove('menu-open-custom');
    }

    togglers.forEach(toggler => {
        toggler.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Assume we're targeting the main offcanvasNavbar
            const targetMenu = document.getElementById('offcanvasNavbar');
            if (targetMenu) {
                if (targetMenu.classList.contains('show-custom')) {
                    closeAllMenus();
                } else {
                    openMenu(targetMenu);
                }
            }
        });
    });

    // Use event delegation for offcanvas close buttons
    document.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('.offcanvas .btn-close');
        if (closeBtn) {
            e.preventDefault();
            e.stopPropagation();
            closeAllMenus();
        }
    });

    backdrop.addEventListener('click', () => {
        closeAllMenus();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeAllMenus();
        });
    });
});

// ============================================
// INLINE NEWSLETTER FORM (In-Page)
// ============================================
function handleInlineNewsletter(e) {
    if (e) e.preventDefault();
    const form = e.target || e;
    const input = form.querySelector('input[type="email"]');
    
    let msg = form.nextElementSibling;
    if (!msg || !msg.classList.contains('newsletter-msg')) {
        msg = document.createElement('div');
        msg.className = 'newsletter-msg mt-2 text-start';
        msg.style.fontSize = '0.9rem';
        msg.style.fontWeight = '500';
        form.parentNode.insertBefore(msg, form.nextSibling);
    }
    
    if (form.newsletterTimeout) {
        clearTimeout(form.newsletterTimeout);
    }
    
    msg.style.display = 'block';
    const isDarkBg = form.closest('.bg-primary') !== null || form.closest('.newsletter-section') !== null;
    const errorColor = isDarkBg ? '#ffc107' : '#dc3545';
    const successColor = isDarkBg ? '#ffffff' : '#198754';
    
    if (!input || !input.value.trim()) {
        msg.style.color = errorColor;
        msg.textContent = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        msg.style.color = errorColor;
        msg.textContent = 'Please enter a valid email address.';
    } else {
        msg.style.color = successColor;
        msg.textContent = 'Thank you for subscribing!';
        input.value = '';
    }
    
    form.newsletterTimeout = setTimeout(() => {
        msg.style.display = 'none';
    }, 5000);
}
