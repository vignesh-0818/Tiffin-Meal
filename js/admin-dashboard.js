// admin-dashboard.js - Admin Dashboard functionality

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const user = requireAuth('admin');
    if (!user) return;
    
    initTheme();
    initRTL();
    loadAdminProfile(user);
    loadAdminOverview();
    loadRevenueChart();
    loadOrdersChart();
    loadCustomerList();
    loadOrders();
    loadMessages();
    loadAdminSubscriptions();
    loadAdminMeals();
    loadAdminDeliveries();
    loadAdminPayments();
    initDashboardNav();
    initSidebarToggle();
    initSettings();
});

function initSettings() {
    const darkToggle = document.getElementById('dark-mode-toggle');
    if (darkToggle) {
        darkToggle.checked = document.body.classList.contains('dark-mode');
    }
    const rtlToggle = document.getElementById('rtl-toggle-cb');
    if (rtlToggle) {
        rtlToggle.checked = document.body.classList.contains('rtl');
    }
}

// ============================================
// SIDEBAR NAVIGATION
// ============================================
function initDashboardNav() {
    const links = document.querySelectorAll('.sidebar-nav .nav-link[data-section]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.dashboard-section').forEach(s => s.style.display = 'none');
            const target = document.getElementById('section-' + section);
            if (target) target.style.display = 'block';
            
            const titles = {
                'overview': 'Admin Overview',
                'analytics': 'Analytics',
                'users': 'Customer Management',
                'orders': 'Order Management',
                'messages': 'Messages',
                'subscriptions': 'Subscription Management',
                'profile': 'Admin Profile',
                'settings': 'Settings'
            };
            const titleEl = document.querySelector('.topbar-title h4');
            if (titleEl) titleEl.textContent = titles[section] || 'Admin Dashboard';
            
            closeSidebar();
        });
    });
}

function initSidebarToggle() {
    const toggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (toggle && sidebar) {
        toggle.addEventListener('click', () => sidebar.classList.toggle('active'));
    }
}

function closeSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (sidebar) sidebar.classList.remove('active');
}

// ============================================
// ADMIN PROFILE
// ============================================
function loadAdminProfile(user) {
    const sidebarImg = document.querySelector('.sidebar-profile img');
    const sidebarName = document.querySelector('.sidebar-profile .name');
    const sidebarRole = document.querySelector('.sidebar-profile .role');
    const topbarImg = document.querySelector('.admin-top-avatar');
    const topbarName = document.querySelector('.admin-top-name');
    if (sidebarImg) sidebarImg.src = user.profileImage;
    if (sidebarName) sidebarName.textContent = user.name;
    if (sidebarRole) sidebarRole.textContent = 'Administrator';
    if (topbarImg) topbarImg.src = user.profileImage;
    if (topbarName) topbarName.textContent = user.name;
    
    const profileImg = document.querySelector('.profile-image');
    const profileName = document.querySelector('.profile-name');
    const profileEmail = document.querySelector('.profile-email');
    if (profileImg) profileImg.src = user.profileImage;
    if (profileName) profileName.textContent = user.name;
    if (profileEmail) profileEmail.textContent = user.email;
}

// ============================================
// OVERVIEW STATS
// ============================================
function loadAdminOverview() {
    const users = getUsers();
    const customers = users.filter(u => u.role === 'customer');
    const activeSubs = customers.filter(u => u.subscription && u.subscription.status === 'active');
    
    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    
    setEl('total-customers', customers.length);
    setEl('active-subscriptions', activeSubs.length);
    setEl('total-orders', Math.floor(Math.random() * 500) + 200);
    setEl('total-revenue', '₹' + (activeSubs.length * 1499).toLocaleString());
    setEl('pending-deliveries', Math.floor(Math.random() * 30) + 10);
    setEl('completed-deliveries', Math.floor(Math.random() * 400) + 150);
}

// ============================================
// CHARTS (Simple CSS-based)
// ============================================
function loadRevenueChart() {
    const container = document.getElementById('revenue-chart');
    if (!container) return;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const values = [12000, 19000, 15000, 25000, 22000, 30000];
    const maxVal = Math.max(...values);
    
    container.innerHTML = `
        <div style="display:flex;align-items:flex-end;justify-content:space-around;height:250px;padding:1rem;">
            ${months.map((m, i) => `
                <div style="text-align:center;flex:1;">
                    <div style="height:${(values[i]/maxVal)*200}px;background:linear-gradient(to top,var(--primary),#4caf50);border-radius:6px 6px 0 0;margin:0 8px;transition:height 0.5s;min-width:30px;"></div>
                    <div style="margin-top:0.5rem;font-size:0.8rem;color:var(--text-secondary);">${m}</div>
                    <div style="font-size:0.75rem;color:var(--text-primary);font-weight:600;">₹${(values[i]/1000).toFixed(0)}k</div>
                </div>
            `).join('')}
        </div>
    `;
}

function loadOrdersChart() {
    const container = document.getElementById('orders-chart');
    if (!container) return;
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const values = [45, 52, 38, 61, 55, 70, 42];
    const maxVal = Math.max(...values);
    
    container.innerHTML = `
        <div style="display:flex;align-items:flex-end;justify-content:space-around;height:250px;padding:1rem;">
            ${days.map((d, i) => `
                <div style="text-align:center;flex:1;">
                    <div style="height:${(values[i]/maxVal)*200}px;background:linear-gradient(to top,var(--secondary),#ff8a50);border-radius:6px 6px 0 0;margin:0 6px;transition:height 0.5s;min-width:25px;"></div>
                    <div style="margin-top:0.5rem;font-size:0.8rem;color:var(--text-secondary);">${d}</div>
                    <div style="font-size:0.75rem;color:var(--text-primary);font-weight:600;">${values[i]}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// ============================================
// CUSTOMER LIST
// ============================================
function loadCustomerList() {
    const tbody = document.getElementById('customer-table-body');
    if (!tbody) return;
    
    const users = getUsers();
    const customers = users.filter(u => u.role === 'customer');
    
    if (customers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center" style="padding:2rem;color:var(--text-secondary);">No customers found</td></tr>';
        return;
    }
    
    tbody.innerHTML = customers.map(c => `
        <tr>
            <td>
                <div style="display:flex;align-items:center;gap:0.75rem;">
                    <img src="${c.profileImage}" alt="${c.name}" style="width:35px;height:35px;border-radius:50%;object-fit:cover;">
                    <span>${c.name}</span>
                </div>
            </td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
            <td>${c.subscription ? c.subscription.plan : 'No Plan'}</td>
            <td><span class="status-badge ${c.subscription?.status || 'cancelled'}">${c.subscription ? c.subscription.status : 'None'}</span></td>
            <td>${c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'}</td>
            <td>
                <button class="action-btn primary btn-sm" onclick="viewCustomer('${c.id}')"><i class="fas fa-eye"></i></button>
                <button class="action-btn danger btn-sm" onclick="deleteCustomer('${c.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function searchCustomers(query) {
    const rows = document.querySelectorAll('#customer-table-body tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
}

function filterCustomers(status) {
    const users = getUsers();
    const customers = users.filter(u => {
        if (u.role !== 'customer') return false;
        if (status === 'all') return true;
        return u.subscription?.status === status;
    });
    
    const tbody = document.getElementById('customer-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = customers.map(c => `
        <tr>
            <td>
                <div style="display:flex;align-items:center;gap:0.75rem;">
                    <img src="${c.profileImage}" alt="${c.name}" style="width:35px;height:35px;border-radius:50%;object-fit:cover;">
                    <span>${c.name}</span>
                </div>
            </td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
            <td>${c.subscription ? c.subscription.plan : 'No Plan'}</td>
            <td><span class="status-badge ${c.subscription?.status || 'cancelled'}">${c.subscription ? c.subscription.status : 'None'}</span></td>
            <td>${c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'}</td>
            <td>
                <button class="action-btn primary btn-sm" onclick="viewCustomer('${c.id}')"><i class="fas fa-eye"></i></button>
                <button class="action-btn danger btn-sm" onclick="deleteCustomer('${c.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function viewCustomer(id) {
    const users = getUsers();
    const customer = users.find(u => u.id === id);
    if (!customer) return;
    
    const modalBody = document.getElementById('customerViewModalBody');
    if (!modalBody) return;
    
    modalBody.innerHTML = `
        <img src="${customer.profileImage}" alt="${customer.name}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin-bottom:1rem;">
        <h4>${customer.name}</h4>
        <p class="text-muted">${customer.email}</p>
        <div class="text-start mt-4" style="background:var(--bg-secondary);padding:1rem;border-radius:8px;">
            <p class="mb-2"><strong>Phone:</strong> ${customer.phone}</p>
            <p class="mb-2"><strong>Address:</strong> ${customer.address || 'N/A'}</p>
            <p class="mb-2"><strong>Pincode:</strong> ${customer.pincode || 'N/A'}</p>
            <p class="mb-2"><strong>Dietary Preference:</strong> ${customer.dietaryPreference || 'N/A'}</p>
            <p class="mb-2"><strong>Subscription:</strong> ${customer.subscription ? customer.subscription.plan : 'None'}</p>
            <p class="mb-0"><strong>Status:</strong> <span class="status-badge ${customer.subscription?.status || 'cancelled'}">${customer.subscription ? customer.subscription.status : 'None'}</span></p>
        </div>
    `;
    
    const viewModal = new bootstrap.Modal(document.getElementById('customerViewModal'));
    viewModal.show();
}

function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        const users = getUsers().filter(u => u.id !== id);
        saveUsers(users);
        loadCustomerList();
        loadAdminOverview();
        showNotification('Customer deleted.', 'info');
    }
}

// ============================================
// ORDERS
// ============================================
function loadOrders() {
    const tbody = document.getElementById('orders-table-body');
    if (!tbody) return;
    
    const orders = generateDemoOrders();
    
    tbody.innerHTML = orders.map(o => `
        <tr id="order-row-${o.id}">
            <td><strong>${o.id}</strong></td>
            <td>${o.customer}</td>
            <td>${o.plan}</td>
            <td>${o.meal}</td>
            <td>${o.date}</td>
            <td>₹${o.amount}</td>
            <td><span class="status-badge ${o.status}">${o.statusLabel}</span></td>
            <td>
                <select class="form-select form-select-sm" style="width:auto;display:inline-block;" onchange="updateOrderStatus('${o.id}', this.value)">
                    <option value="pending" ${o.status==='pending'?'selected':''}>Pending</option>
                    <option value="confirmed" ${o.status==='confirmed'?'selected':''}>Confirmed</option>
                    <option value="preparing" ${o.status==='preparing'?'selected':''}>Preparing</option>
                    <option value="out-for-delivery" ${o.status==='out-for-delivery'?'selected':''}>Out for Delivery</option>
                    <option value="delivered" ${o.status==='delivered'?'selected':''}>Delivered</option>
                    <option value="cancelled" ${o.status==='cancelled'?'selected':''}>Cancelled</option>
                </select>
            </td>
        </tr>
    `).join('');
}

function generateDemoOrders() {
    const statuses = [
        { status: 'pending', statusLabel: 'Pending' },
        { status: 'confirmed', statusLabel: 'Confirmed' },
        { status: 'preparing', statusLabel: 'Preparing' },
        { status: 'out-for-delivery', statusLabel: 'Out for Delivery' },
        { status: 'delivered', statusLabel: 'Delivered' },
        { status: 'cancelled', statusLabel: 'Cancelled' }
    ];
    
    const meals = ['Dal Makhani + Rice', 'Chicken Curry + Naan', 'Paneer Tikka + Roti', 'Biryani + Raita', 'Rajma Chawal', 'Fish Fry + Rice'];
    const plans = ['Vegetarian Plan', 'Non-Vegetarian Plan', 'Diet Plan', 'Combo Plan'];
    const customers = ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Reddy', 'Vikram Singh', 'Google User'];
    
    return Array.from({ length: 12 }, (_, i) => {
        const s = statuses[i % statuses.length];
        return {
            id: 'ORD-' + (1000 + i),
            customer: customers[i % customers.length],
            plan: plans[i % plans.length],
            meal: meals[i % meals.length],
            date: `2024-01-${String(15 - i).padStart(2, '0')}`,
            amount: [1499, 1999, 1299, 2499][i % 4],
            status: s.status,
            statusLabel: s.statusLabel
        };
    });
}

function updateOrderStatus(orderId, status) {
    const labels = {
        'pending': 'Pending', 'confirmed': 'Confirmed', 'preparing': 'Preparing',
        'out-for-delivery': 'Out for Delivery', 'delivered': 'Delivered', 'cancelled': 'Cancelled'
    };
    const row = document.getElementById(`order-row-${orderId}`);
    if (row) {
        const badge = row.querySelector('.status-badge');
        if (badge) {
            badge.className = `status-badge ${status}`;
            badge.textContent = labels[status];
        }
    }
    showNotification(`Order ${orderId} updated to ${labels[status]}`, 'success');
}

function searchOrders(query) {
    const rows = document.querySelectorAll('#orders-table-body tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
}

function loadMessages() {
    const container = document.getElementById('messages-list');
    if (!container) return;
    
    const messages = [
        { id: 1, from: 'Rahul Sharma', email: 'rahul@demo.com', subject: 'Delivery Delay', message: 'My order was delayed by 30 minutes today. Can you please ensure timely delivery?', date: '2024-01-14', read: false },
        { id: 2, from: 'Priya Patel', email: 'priya@demo.com', subject: 'Menu Suggestion', message: 'I would love to see more South Indian options in the weekly menu. Thank you!', date: '2024-01-13', read: true },
        { id: 3, from: 'Amit Kumar', email: 'amit@demo.com', subject: 'Billing Query', message: 'I was charged twice for this month. Please check and refund.', date: '2024-01-12', read: false },
        { id: 4, from: 'Sneha Reddy', email: 'sneha@demo.com', subject: 'Allergy Info', message: 'Please note that I am allergic to peanuts. Kindly exclude them from my meals.', date: '2024-01-11', read: true },
        { id: 5, from: 'Vikram Singh', email: 'vikram@demo.com', subject: 'Subscription Change', message: 'I want to upgrade from Vegetarian to Combo plan. How do I proceed?', date: '2024-01-10', read: false }
    ];
    
    container.innerHTML = messages.map(m => `
        <div class="message-item" style="padding:1rem;border-bottom:1px solid var(--border-color);cursor:pointer;display:flex;gap:1rem;align-items:flex-start;${m.read ? 'opacity:0.7' : ''}" onclick="viewMessage(${m.id})">
            <div style="width:40px;height:40px;border-radius:50%;background:${m.read ? 'var(--bg-secondary)' : 'var(--primary-light)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="fas fa-envelope" style="color:${m.read ? 'var(--text-muted)' : 'var(--primary)'}"></i>
            </div>
            <div style="flex:1;min-width:0;">
                <div style="display:flex;justify-content:space-between;margin-bottom:0.25rem;">
                    <strong style="color:var(--text-primary);${!m.read ? 'font-weight:700' : ''}">${m.from}</strong>
                    <small style="color:var(--text-secondary)">${m.date}</small>
                </div>
                <div style="font-weight:500;color:var(--text-primary);margin-bottom:0.25rem;">${m.subject}</div>
                <div style="color:var(--text-secondary);font-size:0.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${m.message}</div>
            </div>
            <span class="status-badge ${m.read ? 'read' : 'unread'}" style="flex-shrink:0;">${m.read ? 'Read' : 'Unread'}</span>
        </div>
    `).join('');
}

function viewMessage(id) {
    showNotification('Message detail view - Demo feature', 'info');
}

function replyMessage(id) {
    showNotification('Reply sent! (Demo)', 'success');
}

// ============================================
// SUBSCRIPTIONS
// ============================================
function loadAdminSubscriptions() {
    const tbody = document.getElementById('subscriptions-table-body');
    if (!tbody) return;
    
    let users = getUsers();
    let hasPaused = users.some(u => u.role === 'customer' && u.subscription && u.subscription.status === 'paused');
    let hasCancelled = users.some(u => u.role === 'customer' && u.subscription && u.subscription.status === 'cancelled');

    if (!hasPaused || !hasCancelled) {
        if (!hasPaused) {
            users.push({
                id: 'cust_paused_demo',
                role: 'customer',
                name: 'Anjali Desai',
                email: 'anjali@demo.com',
                phone: '9876543111',
                profileImage: 'https://ui-avatars.com/api/?name=Anjali+Desai&background=f39c12&color=fff&size=200',
                createdAt: new Date().toISOString(),
                subscription: { plan: 'Diet Plan', price: 1299, status: 'paused', renewalDate: 'Paused' }
            });
        }
        if (!hasCancelled) {
            users.push({
                id: 'cust_cancelled_demo',
                role: 'customer',
                name: 'Karan Mehta',
                email: 'karan@demo.com',
                phone: '9876543000',
                profileImage: 'https://ui-avatars.com/api/?name=Karan+Mehta&background=dc3545&color=fff&size=200',
                createdAt: new Date().toISOString(),
                subscription: { plan: 'Combo Plan', price: 2499, status: 'cancelled', renewalDate: 'Cancelled' }
            });
        }
        saveUsers(users);
    }
    
    const subUsers = users.filter(u => u.role === 'customer' && u.subscription);
    
    if (subUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center" style="padding:2rem;color:var(--text-secondary);">No subscriptions found</td></tr>';
        return;
    }
    
    tbody.innerHTML = subUsers.map(u => `
        <tr>
            <td>${u.name}</td>
            <td>${u.subscription.plan}</td>
            <td>₹${u.subscription.price}/mo</td>
            <td><span class="status-badge ${u.subscription.status}">${u.subscription.status.charAt(0).toUpperCase() + u.subscription.status.slice(1)}</span></td>
            <td>${u.subscription.renewalDate}</td>
            <td>
                <button class="action-btn primary btn-sm" onclick="viewSubscriptionDetails('${u.id}')"><i class="fas fa-eye"></i></button>
            </td>
        </tr>
    `).join('');
}

function viewSubscriptionDetails(userId) {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const modalTitle = document.getElementById('customerViewModalLabel');
    if (modalTitle) modalTitle.textContent = "Subscription Details";

    const modalBody = document.getElementById('customerViewModalBody');
    if (modalBody) {
        let profileImg = user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=28a745&color=fff&size=200`;
        let joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A';
        let plan = user.subscription?.plan || 'N/A';
        let price = user.subscription?.price || 0;
        let status = user.subscription?.status || 'active';
        let renewalDate = user.subscription?.renewalDate || 'N/A';

        modalBody.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <img src="${profileImg}" class="rounded-circle" style="width:80px;height:80px;object-fit:cover;margin-bottom:1rem; border: 3px solid var(--primary-light);">
                <h5 style="margin-bottom:0.25rem;">${user.name}</h5>
                <div class="text-muted small">${user.email} | ${user.phone || 'N/A'}</div>
            </div>
            <div class="text-start p-3 rounded" style="background: var(--bg-secondary); border: 1px solid var(--border-color);">
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Plan:</span>
                    <span class="fw-bold">${plan}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Price:</span>
                    <span class="fw-bold">₹${price}/mo</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Status:</span>
                    <span class="status-badge ${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span class="text-muted">Renewal Date:</span>
                    <span class="fw-bold">${renewalDate}</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span class="text-muted">Customer Since:</span>
                    <span class="fw-bold">${joinDate}</span>
                </div>
            </div>
        `;
    }
    const modal = new bootstrap.Modal(document.getElementById('customerViewModal'));
    modal.show();
}

function filterSubscriptions(status, btn) {
    const rows = document.querySelectorAll('#subscriptions-table-body tr');
    const filterStatus = status.toLowerCase();
    
    rows.forEach(row => {
        if (filterStatus === 'all') {
            row.style.display = '';
        } else {
            const badge = row.querySelector('.status-badge');
            if (badge) {
                row.style.display = (badge.textContent.trim().toLowerCase() === filterStatus) ? '' : 'none';
            } else {
                row.style.display = 'none';
            }
        }
    });
    
    if (btn) {
        const buttons = btn.parentElement.querySelectorAll('button');
        buttons.forEach(b => {
            b.classList.remove('btn-primary', 'text-white');
            const text = b.textContent.trim().toLowerCase();
            if (text === 'all') b.classList.add('btn-outline-primary');
            if (text === 'active') b.classList.add('btn-outline-success');
            if (text === 'paused') b.classList.add('btn-outline-warning');
            if (text === 'cancelled') b.classList.add('btn-outline-danger');
        });
        
        btn.className = 'btn btn-sm btn-primary text-white';
    }
}

// ============================================
// SETTINGS
// ============================================
function toggleAdminSetting(setting) {
    showNotification(`${setting} setting updated!`, 'success');
}


// ============================================
// ADMIN NEW SECTIONS (Meals, Deliveries, Payments)
// ============================================
function loadAdminMeals() {
    const grid = document.getElementById('admin-meals-grid');
    if (!grid) return;
    
    let meals = JSON.parse(localStorage.getItem('adminMeals'));
    if (!meals) {
        meals = [
            { name: 'Vegetarian Thali', category: 'Vegetarian', orders: 124, status: 'Available', img: 'assets/images/menu/special-veg-thali.png' },
            { name: 'Chicken Curry Meal', category: 'Non-Vegetarian', orders: 89, status: 'Available', img: 'assets/images/menu/chicken-curry-meal.jpg' },
            { name: 'Paneer Tikka Combo', category: 'Vegetarian', orders: 156, status: 'Available', img: 'assets/images/menu/paneer-tikka-masala-roti.png' },
            { name: 'Diet Power Bowl', category: 'Diet Plan', orders: 45, status: 'Low Stock', img: 'assets/images/menu/diet-quinoa-power-bowl.png' }
        ];
        localStorage.setItem('adminMeals', JSON.stringify(meals));
    }
    
    grid.innerHTML = meals.map(m => `
        <div class="col-lg-3 col-md-6 mb-4">
            <div class="dashboard-card p-0 h-100 d-flex flex-column" style="overflow: hidden;">
                <img src="${m.img}" class="menu-card-img" alt="${m.name}" style="height: 180px; width: 100%; object-fit: cover;" onerror="this.src='assets/images/placeholder.jpg'">
                <div class="p-3 d-flex flex-column flex-grow-1">
                    <h6 class="fw-bold mb-1">${m.name}</h6>
                    <p class="text-secondary small mb-2">${m.category}</p>
                    <div class="d-flex justify-content-between align-items-center mt-auto pt-3">
                        <span class="badge ${m.status === 'Available' ? 'bg-success' : 'bg-warning'}">${m.status}</span>
                        <span class="small fw-bold">${m.orders} Orders</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function handleAddMeal() {
    const name = document.getElementById('mealName').value.trim();
    const category = document.getElementById('mealCategory').value;
    const status = document.getElementById('mealStatus').value;
    const img = document.getElementById('mealImg').value.trim();
    
    if (!name || !img) {
        alert('Please fill out all required fields.');
        return;
    }
    
    let meals = JSON.parse(localStorage.getItem('adminMeals')) || [];
    meals.push({ name, category, status, orders: 0, img });
    
    localStorage.setItem('adminMeals', JSON.stringify(meals));
    loadAdminMeals();
    
    const modalEl = document.getElementById('addMealModal');
    if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();
    }
    document.getElementById('addMealForm').reset();
}

function loadAdminDeliveries() {
    const tbody = document.getElementById('deliveries-table-body');
    if (!tbody) return;
    
    const deliveries = [
        { id: 'ORD-1011', customer: 'Rahul Sharma', area: 'Andheri West', meal: 'Vegetarian Thali', status: 'Out for Delivery' },
        { id: 'ORD-1012', customer: 'Priya Patel', area: 'Bandra East', meal: 'Chicken Curry Meal', status: 'Preparing' },
        { id: 'ORD-1013', customer: 'Amit Kumar', area: 'Powai', meal: 'Diet Power Bowl', status: 'Delivered' },
        { id: 'ORD-1014', customer: 'Sneha Reddy', area: 'Juhu', meal: 'Paneer Tikka Combo', status: 'Pending' }
    ];
    
    tbody.innerHTML = deliveries.map(d => `
        <tr id="delivery-row-${d.id}">
            <td><strong>${d.id}</strong></td>
            <td>${d.customer}</td>
            <td>${d.area}</td>
            <td>${d.meal}</td>
            <td><span id="delivery-status-${d.id}" class="badge ${d.status === 'Delivered' ? 'bg-success' : (d.status === 'Out for Delivery' ? 'bg-info' : 'bg-warning')}">${d.status}</span></td>
            <td><button class="btn btn-sm btn-outline-primary" onclick="assignDelivery('${d.id}')"><i class="fas fa-motorcycle"></i> Assign</button></td>
        </tr>
    `).join('');
}

function assignDelivery(id) {
    showNotification('Delivery ' + id + ' assigned successfully!', 'success');
    const badge = document.getElementById('delivery-status-' + id);
    if (badge) {
        badge.className = 'badge bg-info';
        badge.textContent = 'Out for Delivery';
    }
}

function loadAdminPayments() {
    const tbody = document.getElementById('payments-table-body');
    if (!tbody) return;
    
    const payments = [
        { id: 'TXN-9091', customer: 'Rahul Sharma', date: '2024-08-20', method: 'Credit Card', amount: 2499, status: 'Completed' },
        { id: 'TXN-9092', customer: 'Priya Patel', date: '2024-08-20', method: 'UPI', amount: 1499, status: 'Completed' },
        { id: 'TXN-9093', customer: 'Amit Kumar', date: '2024-08-19', method: 'Net Banking', amount: 1299, status: 'Pending' }
    ];
    
        tbody.innerHTML = payments.map(p => `
        <tr>
            <td><strong>${p.id}</strong></td>
            <td>${p.customer}</td>
            <td>${p.date}</td>
            <td>${p.method}</td>
            <td>₹${p.amount}</td>
            <td><span class="badge ${p.status === 'Completed' ? 'bg-success' : 'bg-warning'}">${p.status}</span></td>
        </tr>
    `).join('');
}
function generateCSVReport() {
    const csvRows = [];
    csvRows.push(['Type', 'Date', 'Amount', 'Status']);
    
    const totalRev = document.getElementById('total-revenue') ? document.getElementById('total-revenue').textContent : '0';
    const totalCust = document.getElementById('total-customers') ? document.getElementById('total-customers').textContent : '0';
    
    csvRows.push(['Total Revenue', new Date().toLocaleDateString(), totalRev, 'N/A']);
    csvRows.push(['Total Customers', new Date().toLocaleDateString(), totalCust, 'N/A']);
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tiffinbox_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
