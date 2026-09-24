// dashboard.js - Customer Dashboard functionality

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    let user = getCurrentUser();
    if (!user || user.role !== 'customer') {
        const users = getUsers();
        user = users.find(u => u.role === 'customer') || {
            id: 'cust_demo1',
            role: 'customer',
            firstName: 'Rahul',
            lastName: 'Sharma',
            name: 'Rahul Sharma',
            email: 'rahul@demo.com',
            phone: '9876543210',
            address: '42 MG Road, New Delhi',
            pincode: '110001',
            dietaryPreference: 'vegetarian',
            profileImage: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=28a745&color=fff&size=200',
            createdAt: '2024-01-15T10:00:00Z',
            subscription: {
                plan: 'Vegetarian Plan',
                price: 1499,
                status: 'active',
                startDate: '2024-01-15',
                nextBilling: '2024-02-15',
                renewalDate: '2024-02-15'
            }
        };
    }
    
    initTheme();
    initRTL();
    loadCustomerProfile(user);
    loadDashboardOverview(user);
    loadWeeklyMenu();
    loadSubscription(user);
    loadMealPreferences(user);
    loadDeliveryInfo(user);
    loadBilling(user);
    initDashboardNav();
    initSidebarToggle();
});

// ============================================
// SIDEBAR NAVIGATION
// ============================================
function initDashboardNav() {
    const links = document.querySelectorAll('.sidebar-nav .nav-link[data-section]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            
            // Update active nav
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            document.querySelectorAll('.dashboard-section').forEach(s => s.style.display = 'none');
            const target = document.getElementById('section-' + section);
            if (target) target.style.display = 'block';
            
            // Update topbar title
            const titles = {
                'overview': 'Dashboard Overview',
                'weekly-menu': 'Weekly Menu',
                'subscription': 'Subscription Management',
                'preferences': 'Meal Preferences',
                'delivery': 'Delivery Information',
                'billing': 'Billing & Invoices',
                'profile': 'My Profile',
                'settings': 'Settings'
            };
            const titleEl = document.querySelector('.topbar-title h4');
            if (titleEl) titleEl.textContent = titles[section] || 'Dashboard';
            
            // Close mobile sidebar
            closeSidebar();
        });
    });
}

// ============================================
// SIDEBAR TOGGLE (Mobile)
// ============================================
function initSidebarToggle() {
    const toggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
}

function closeSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (sidebar) sidebar.classList.remove('active');
}

// ============================================
// PROFILE
// ============================================

function loadCustomerProfile(user) {
    // Sidebar profile
    const sidebarImg = document.getElementById('sidebar-profile-img');
    const sidebarName = document.getElementById('sidebar-profile-name');
    if (sidebarImg && user.profileImage) sidebarImg.src = user.profileImage;
    if (sidebarName && user.name) sidebarName.textContent = user.name;
    
    // Topbar profile
    const topbarImg = document.getElementById('topbar-profile-img');
    const topbarName = document.getElementById('topbar-profile-name');
    if (topbarImg && user.profileImage) topbarImg.src = user.profileImage;
    if (topbarName && user.name) topbarName.textContent = user.name;
    
    // Profile section
    const profileImg = document.querySelector('.profile-image');
    const profileName = document.querySelector('.profile-name');
    const profileEmail = document.querySelector('.profile-email');
    const profilePhone = document.querySelector('.profile-phone');
    if (profileImg && user.profileImage) profileImg.src = user.profileImage;
    if (profileName && user.name) profileName.textContent = user.name;
    if (profileEmail && user.email) profileEmail.textContent = user.email;
    if (profilePhone && user.phone) profilePhone.textContent = user.phone;
}
// ============================================
// DASHBOARD OVERVIEW
// ============================================
function loadDashboardOverview(user) {
    const sub = user.subscription;
    
    // Update overview cards
    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    
    setEl('current-plan', sub ? sub.plan : 'No Plan');
    setEl('subscription-status', sub ? sub.status : 'Inactive');
    setEl('next-delivery', sub ? 'Tomorrow, 12:30 PM' : 'N/A');
    setEl('todays-meal', sub ? 'Dal Makhani with Jeera Rice' : 'N/A');
    
    // Upcoming meals list
    const upcomingEl = document.getElementById('upcoming-meals');
    if (upcomingEl && sub) {
        const meals = [
            { day: 'Tomorrow', meal: 'Paneer Butter Masala' },
            { day: 'Day After', meal: 'Chole Bhature' },
            { day: 'Thursday', meal: 'Rajma Chawal' }
        ];
        upcomingEl.innerHTML = meals.map(m => `
            <div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--border-color);">
                <span style="color:var(--text-secondary)">${m.day}</span>
                <span style="font-weight:500;color:var(--text-primary)">${m.meal}</span>
            </div>
        `).join('');
    }
}

// ============================================
// WEEKLY MENU
// ============================================
function loadWeeklyMenu() {
    const menuData = {
        'Monday': { meal: 'Dal Makhani + Jeera Rice + Salad', type: 'Vegetarian' },
        'Tuesday': { meal: 'Chicken Curry + Steamed Rice + Raita', type: 'Non-Vegetarian' },
        'Wednesday': { meal: 'Paneer Tikka Masala + Naan + Dal', type: 'Vegetarian' },
        'Thursday': { meal: 'Fish Fry + Lemon Rice + Sambar', type: 'Non-Vegetarian' },
        'Friday': { meal: 'Rajma Chawal + Papad + Pickle', type: 'Vegetarian' },
        'Saturday': { meal: 'Biryani + Raita + Mirchi Ka Salan', type: 'Combo' },
        'Sunday': { meal: 'Special Thali (Veg/Non-Veg)', type: 'Combo' }
    };
    
    const grid = document.getElementById('weekly-menu-grid');
    if (!grid) return;
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = new Date().getDay();
    const todayName = days[(today + 6) % 7]; // Adjust for Sunday=0
    
    grid.innerHTML = days.map(day => `
        <div class="day-card ${day === todayName ? 'today' : ''}">
            <div class="day-name">${day.substring(0, 3)}</div>
            <div class="day-meal">
                <strong>${menuData[day].meal.split('+')[0].trim()}</strong>
                <br><small style="color:var(--text-secondary)">${menuData[day].type}</small>
            </div>
        </div>
    `).join('');
}

// ============================================
// SUBSCRIPTION MANAGEMENT
// ============================================
function loadSubscription(user) {
    const sub = user.subscription;
    const container = document.getElementById('subscription-details');
    if (!container) return;
    
    if (!sub) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h5>No Active Subscription</h5>
                <p>Choose a plan to get started with fresh home-cooked meals!</p>
                <a href="plans.html" class="btn btn-primary-custom mt-3">View Plans</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="subscription-card">
            <span class="plan-badge">${sub.plan}</span>
            <div class="subscription-details">
                <div class="detail-item">
                    <div class="label">Current Plan</div>
                    <div class="value">${sub.plan}</div>
                </div>
                <div class="detail-item">
                    <div class="label">Status</div>
                    <div class="value"><span class="status-badge ${sub.status}">${sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}</span></div>
                </div>
                <div class="detail-item">
                    <div class="label">Monthly Price</div>
                    <div class="value">₹${sub.price}/month</div>
                </div>
                <div class="detail-item">
                    <div class="label">Billing Cycle</div>
                    <div class="value">Monthly</div>
                </div>
                <div class="detail-item">
                    <div class="label">Start Date</div>
                    <div class="value">${sub.startDate}</div>
                </div>
                <div class="detail-item">
                    <div class="label">Next Billing</div>
                    <div class="value">${sub.nextBilling}</div>
                </div>
            </div>
            <div style="margin-top:1.5rem;display:flex;gap:0.75rem;flex-wrap:wrap;">
                <button class="action-btn primary" onclick="changePlan()"><i class="fas fa-exchange-alt"></i> Change Plan</button>
                <button class="action-btn warning" onclick="pauseSubscription()"><i class="fas fa-pause"></i> Pause</button>
                <button class="action-btn outline" onclick="resumeSubscription()"><i class="fas fa-play"></i> Resume</button>
                <button class="action-btn danger" onclick="cancelSubscription()"><i class="fas fa-times"></i> Cancel</button>
            </div>
        </div>
    `;
}

function changePlan() {
    showNotification('Plan change feature - redirect to plans page', 'info');
    setTimeout(() => { window.location.href = 'plans.html'; }, 1000);
}

function pauseSubscription() {
    const user = getCurrentUser();
    if (user && user.subscription) {
        user.subscription.status = 'paused';
        setCurrentUser(user);
        // Also update in users array
        const users = getUsers();
        const idx = users.findIndex(u => u.id === user.id);
        if (idx !== -1) { users[idx] = user; saveUsers(users); }
        
        showNotification('Subscription paused successfully.', 'info');
        loadSubscription(user);
    }
}

function resumeSubscription() {
    const user = getCurrentUser();
    if (user && user.subscription) {
        user.subscription.status = 'active';
        setCurrentUser(user);
        const users = getUsers();
        const idx = users.findIndex(u => u.id === user.id);
        if (idx !== -1) { users[idx] = user; saveUsers(users); }
        
        showNotification('Subscription resumed successfully!', 'success');
        loadSubscription(user);
    }
}

function cancelSubscription() {
    if (confirm('Are you sure you want to cancel your subscription?')) {
        const user = getCurrentUser();
        if (user) {
            user.subscription = null;
            setCurrentUser(user);
            const users = getUsers();
            const idx = users.findIndex(u => u.id === user.id);
            if (idx !== -1) { users[idx] = user; saveUsers(users); }
            
            showNotification('Subscription cancelled.', 'info');
            loadSubscription(user);
            loadDashboardOverview(user);
        }
    }
}

// ============================================
// MEAL PREFERENCES
// ============================================
function loadMealPreferences(user) {
    const form = document.getElementById('preferences-form');
    if (!form) return;
    
    const setVal = (name, val) => { const el = form.querySelector(`[name="${name}"]`); if (el) el.value = val; };
    setVal('dietary', user.dietaryPreference || 'Vegetarian');
    setVal('allergies', user.allergies || '');
}

function savePreferences(e) {
    if (e) e.preventDefault();
    const form = e.target;
    const dietary = form.querySelector('[name="dietary"]')?.value;
    const allergies = form.querySelector('[name="allergies"]')?.value;
    
    const user = getCurrentUser();
    if (user) {
        user.dietaryPreference = dietary;
        user.allergies = allergies;
        user.mealPreferences = { dietary, allergies };
        setCurrentUser(user);
        const users = getUsers();
        const idx = users.findIndex(u => u.id === user.id);
        if (idx !== -1) { users[idx] = user; saveUsers(users); }
    }
    
    showNotification('Preferences saved successfully!', 'success');
}

// ============================================
// DELIVERY
// ============================================
function loadDeliveryInfo(user) {
    const addressEl = document.getElementById('delivery-address');
    const pincodeEl = document.getElementById('delivery-pincode');
    if (addressEl) addressEl.textContent = user.address || 'No address set';
    if (pincodeEl) pincodeEl.textContent = user.pincode || 'N/A';
}

function pauseDelivery() {
    showNotification('Delivery paused for this week.', 'info');
}

function resumeDelivery() {
    showNotification('Delivery resumed!', 'success');
}

// ============================================
// BILLING
// ============================================
function loadBilling(user) {
    const amountEl = document.getElementById('billing-amount');
    const nextBillingEl = document.getElementById('next-billing-date');
    if (amountEl) amountEl.textContent = user.subscription ? '₹' + user.subscription.price : '₹0';
    if (nextBillingEl) nextBillingEl.textContent = user.subscription ? user.subscription.nextBilling : 'N/A';

    const orders = getCustomerRecords('orders', user.id);
    const billing = getCustomerRecords('billing', user.id);
    const orderBody = document.getElementById('order-history-body');
    const billingBody = document.getElementById('billing-history-body');
    const formatAmount = amount => '₹' + Number(amount || 0).toLocaleString('en-IN');
    const formatDate = date => new Date(date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const itemSummary = items => (items || []).map(item => `${item.name} x${item.quantity} (${formatAmount(item.price)})`).join(', ');

    if (orderBody) {
        orderBody.innerHTML = orders.length ? orders.map(order => `
            <tr><td>${order.id || order.number}</td><td>${formatDate(order.createdAt)}</td><td>${itemSummary(order.items)}</td><td>${formatAmount(order.subtotal)}</td><td>${formatAmount(order.deliveryCharge)}</td><td>${formatAmount(order.total)}</td><td>${order.payment}<br><span class="status-badge active">${order.status}</span></td></tr>`).join('') :
            '<tr><td class="text-center text-muted py-4" colspan="7">No orders yet</td></tr>';
    }
    if (billingBody) {
        billingBody.innerHTML = billing.length ? billing.map(record => `
            <tr><td>${record.id}</td><td>${record.orderId}</td><td>${formatDate(record.createdAt)}</td><td>${itemSummary(record.items)}</td><td>${formatAmount(record.amount)}</td><td>${record.payment}<br><span class="status-badge active">${record.status}</span></td></tr>`).join('') :
            '<tr><td class="text-center text-muted py-4" colspan="5">No billing records yet</td></tr>';
    }
    
    // Payment history
    const historyEl = document.getElementById('payment-history');
    if (historyEl && user.subscription) {
        const history = [
            { date: '2024-01-15', amount: '₹' + user.subscription.price, status: 'Paid' },
            { date: '2023-12-15', amount: '₹' + user.subscription.price, status: 'Paid' },
            { date: '2023-11-15', amount: '₹' + user.subscription.price, status: 'Paid' }
        ];
        historyEl.innerHTML = history.map(h => `
            <tr>
                <td>${h.date}</td>
                <td>${h.amount}</td>
                <td><span class="status-badge active">${h.status}</span></td>
                <td><button class="action-btn primary btn-sm" onclick="downloadInvoice('${h.date}')"><i class="fas fa-download"></i> Invoice</button></td>
            </tr>
        `).join('');
    }
}

function downloadInvoice(date) {
    showNotification(`Generating invoice for ${date}... (Demo)`, 'info');
    // Create a simple text invoice for demo
    const user = getCurrentUser();
    if (!user) return;
    
    const invoice = `
========================================
        TIFIN & MEAL SUBSCRIPTION
========================================
Invoice Date: ${date}
Customer: ${user.name}
Email: ${user.email}
Plan: ${user.subscription?.plan || 'N/A'}
Amount: ${user.subscription ? '₹' + user.subscription.price : '₹0'}
Status: PAID
========================================
Thank you for your subscription!
========================================
    `.trim();
    
    const blob = new Blob([invoice], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Invoice downloaded!', 'success');
}

// ============================================
// PROFILE SAVE
// ============================================
function saveProfile(e) {
    if (e) e.preventDefault();
    const form = e.target;
    const user = getCurrentUser();
    if (!user) return;
    
    user.firstName = form.querySelector('[name="firstName"]')?.value.trim() || user.firstName;
    user.lastName = form.querySelector('[name="lastName"]')?.value.trim() || user.lastName;
    user.name = (user.firstName + ' ' + user.lastName).trim();
    user.phone = form.querySelector('[name="phone"]')?.value.trim() || user.phone;
    if (form.querySelector('[name="phone"]') && !/^\d{10}$/.test(user.phone)) {
        showNotification('Please enter a valid 10-digit phone number.', 'error');
        return;
    }
    user.address = form.querySelector('[name="address"]')?.value.trim() || user.address;
    user.pincode = form.querySelector('[name="pincode"]')?.value.trim() || user.pincode;
    user.dietaryPreference = form.querySelector('[name="dietary"]')?.value || user.dietaryPreference;
    user.profileImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=28a745&color=fff&size=200`;
    
    setCurrentUser(user);
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) { users[idx] = user; saveUsers(users); }
    
    loadCustomerProfile(user);
    showNotification('Profile updated successfully!', 'success');
}

// ============================================
// SETTINGS
// ============================================
function toggleSetting(setting) {
    showNotification(`${setting} setting updated!`, 'success');
}
