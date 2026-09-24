// auth.js - Authentication system for Customer and Admin
// Uses localStorage for demo data persistence
// Separate role management: 'customer' and 'admin'

// ============================================
// USER STORAGE
// ============================================

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem('tiffin_users')) || [];
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem('tiffin_users', JSON.stringify(users));
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('tiffin_current_user'));
    } catch {
        return null;
    }
}

function setCurrentUser(user) {
    localStorage.setItem('tiffin_current_user', JSON.stringify(user));
}

function logout() {
    localStorage.removeItem('tiffin_current_user');
    window.location.href = 'index.html';
}

// ============================================
// AUTH SUCCESS & FORM RESET HELPERS
// ============================================

let authSuccessTimer = null;

function showAuthSuccessMessage(form, messageText) {
    if (authSuccessTimer) {
        clearTimeout(authSuccessTimer);
        authSuccessTimer = null;
    }
    
    // Remove existing success messages to prevent duplicate messages
    document.querySelectorAll('.auth-success-message').forEach(el => el.remove());
    // Remove any notification toasts
    document.querySelectorAll('.notification-toast').forEach(el => el.remove());
    
    const msgEl = document.createElement('div');
    msgEl.className = 'alert alert-success auth-success-message text-center';
    msgEl.id = 'authSuccessMessage';
    msgEl.setAttribute('role', 'alert');
    msgEl.setAttribute('aria-live', 'polite');
    
    // Explicit styling for guaranteed high contrast and visibility
    msgEl.style.backgroundColor = '#d1e7dd';
    msgEl.style.color = '#0f5132';
    msgEl.style.border = '1px solid #badbcc';
    msgEl.style.borderRadius = '10px';
    msgEl.style.padding = '0.85rem 1.25rem';
    msgEl.style.marginBottom = '1.5rem';
    msgEl.style.fontWeight = '600';
    msgEl.style.fontSize = '1rem';
    msgEl.style.display = 'flex';
    msgEl.style.alignItems = 'center';
    msgEl.style.justifyContent = 'center';
    msgEl.style.gap = '0.6rem';
    msgEl.style.boxShadow = '0 4px 12px rgba(15, 81, 50, 0.08)';
    
    msgEl.innerHTML = `<i class="fas fa-check-circle me-1" style="color:#198754; font-size:1.15rem;"></i><span>${messageText}</span>`;
    
    // Insert before the form in the card, or prepend to card/body
    if (form && form.parentNode) {
        form.parentNode.insertBefore(msgEl, form);
    } else {
        const card = document.querySelector('.auth-card') || document.body;
        card.prepend(msgEl);
    }
    
    // Exactly 5 seconds (5000ms) then automatically remove
    authSuccessTimer = setTimeout(() => {
        if (msgEl.parentNode) {
            msgEl.remove();
        }
        authSuccessTimer = null;
    }, 5000);
}

function clearAndResetAuthForm(form) {
    if (!form) return;
    
    // 1. Native form reset
    try {
        form.reset();
    } catch (e) {
        // ignore
    }
    
    // 2. Explicitly clear all input, select, textarea elements
    const elements = form.querySelectorAll('input, select, textarea');
    elements.forEach(el => {
        const type = (el.type || '').toLowerCase();
        const tag = el.tagName.toLowerCase();
        
        if (tag === 'select') {
            el.selectedIndex = 0;
            el.value = '';
            const defaultOpt = el.querySelector('option[value=""], option[disabled]');
            if (defaultOpt) {
                defaultOpt.selected = true;
            }
        } else if (type === 'checkbox' || type === 'radio') {
            el.checked = false;
        } else if (type !== 'submit' && type !== 'button' && type !== 'reset' && type !== 'hidden') {
            el.value = '';
        }
        
        // Remove validation visual classes
        el.classList.remove('is-valid', 'is-invalid');
    });
    
    // 3. Reset password toggle state if changed
    const pwInputs = form.querySelectorAll('input.has-password-toggle, input[name*="password" i], input[placeholder*="password" i], #loginPassword, #regPassword, #regConfirm');
    pwInputs.forEach(input => {
        input.type = 'password';
    });
    const pwIcons = form.querySelectorAll('.toggle-password i, button[onclick*="togglePassword"] i, button[onclick*="Password"] i');
    pwIcons.forEach(icon => {
        icon.classList.remove('fa-eye-slash', 'bi-eye-slash');
        icon.classList.add('fa-eye', 'bi-eye');
    });
}

// ============================================
// CUSTOMER REGISTRATION
// ============================================
function handleCustomerRegister(e) {
    e.preventDefault();
    const form = e.target;
    
    const firstName = form.querySelector('[name="firstName"]')?.value.trim();
    const lastName = form.querySelector('[name="lastName"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();
    const address = form.querySelector('[name="address"]')?.value.trim();
    const pincode = form.querySelector('[name="pincode"]')?.value.trim();
    const dietary = form.querySelector('[name="dietary"]')?.value;
    const password = form.querySelector('[name="password"]')?.value;
    const confirmPassword = form.querySelector('[name="confirmPassword"]')?.value;
    
    // Validation
    if (!firstName) { showNotification('Please enter your first name.', 'error'); return; }
    if (!lastName) { showNotification('Please enter your last name.', 'error'); return; }
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) { showNotification('Please enter a valid email.', 'error'); return; }
    if (!phone || !/^\d{10}$/.test(phone)) { showNotification('Please enter a valid phone number.', 'error'); return; }
    if (!address) { showNotification('Please enter your address.', 'error'); return; }
    if (!pincode || pincode.length !== 6) { showNotification('Please enter a valid 6-digit pincode.', 'error'); return; }
    if (!dietary) { showNotification('Please select your dietary preference.', 'error'); return; }
    if (!password || password.length < 6) { showNotification('Password must be at least 6 characters.', 'error'); return; }
    if (password !== confirmPassword) { showNotification('Passwords do not match.', 'error'); return; }
    
    // Check if email already exists
    const users = getUsers();
    if (users.find(u => u.email === email)) {
        showNotification('An account with this email already exists.', 'error');
        return;
    }
    
    // Create user
    const newUser = {
        id: 'cust_' + Date.now(),
        role: 'customer',
        firstName,
        lastName,
        name: firstName + ' ' + lastName,
        email,
        phone,
        address,
        pincode,
        dietaryPreference: dietary,
        password, // In production, this would be hashed
        profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName + '+' + lastName)}&background=28a745&color=fff&size=200`,
        createdAt: new Date().toISOString(),
        subscription: null
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Show exact success message for exactly 5 seconds (5000ms)
    showAuthSuccessMessage(form, 'Thanks for signing up!');
    
    // Clear and reset the entire form immediately
    clearAndResetAuthForm(form);
    
    // Stay on the same page - do NOT redirect
}

// ============================================
// CUSTOMER LOGIN
// ============================================
function handleCustomerLogin(e) {
    e.preventDefault();
    const form = e.target;
    
    const email = form.querySelector('[name="email"]')?.value.trim();
    const password = form.querySelector('[name="password"]')?.value;
    const remember = form.querySelector('[name="remember"]')?.checked;
    
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        showNotification('Please enter a valid email.', 'error');
        return;
    }
    if (!password) {
        showNotification('Please enter your password.', 'error');
        return;
    }
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password && u.role === 'customer');
    
    if (!user) {
        showNotification('Invalid email or password.', 'error');
        return;
    }
    
    // Authenticate user
    setCurrentUser(user);
    
    // Handle remember me state without prefilling on refresh
    if (remember) {
        localStorage.setItem('tiffin_remembered_customer', email);
    } else {
        localStorage.removeItem('tiffin_remembered_customer');
    }
    
    // Show exact success message for exactly 5 seconds (5000ms)
    showAuthSuccessMessage(form, 'Thanks for logging in!');
    
    // Clear and reset all login fields immediately
    clearAndResetAuthForm(form);
    
    // Stay on the same page - do NOT redirect
}

// ============================================
// ADMIN REGISTRATION
// ============================================
function handleAdminRegister(e) {
    e.preventDefault();
    const form = e.target;
    
    const name = form.querySelector('[name="adminName"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();
    const password = form.querySelector('[name="password"]')?.value;
    const confirmPassword = form.querySelector('[name="confirmPassword"]')?.value;
    if (!name) { showNotification('Please enter your name.', 'error'); return; }
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) { showNotification('Please enter a valid email.', 'error'); return; }
    if (!phone || !/^\d{10}$/.test(phone)) { showNotification('Please enter a valid phone number.', 'error'); return; }
    if (!password || password.length < 6) { showNotification('Password must be at least 6 characters.', 'error'); return; }
    if (password !== confirmPassword) { showNotification('Passwords do not match.', 'error'); return; }
    
    const users = getUsers();
    if (users.find(u => u.email === email)) {
        showNotification('An account with this email already exists.', 'error');
        return;
    }
    
    const newAdmin = {
        id: 'admin_' + Date.now(),
        role: 'admin',
        name,
        email,
        phone,
        password,
        profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a1a2e&color=fff&size=200`,
        createdAt: new Date().toISOString()
    };
    
    users.push(newAdmin);
    saveUsers(users);
    
    showAuthSuccessMessage(form, 'Thanks for signing up!');
    clearAndResetAuthForm(form);
    // Stay on the same page - do NOT redirect
}

// ============================================
// ADMIN LOGIN
// ============================================
function handleAdminLogin(e) {
    e.preventDefault();
    const form = e.target;
    
    const email = form.querySelector('[name="email"]')?.value.trim();
    const password = form.querySelector('[name="password"]')?.value;
    const remember = form.querySelector('[name="remember"]')?.checked;
    
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        showNotification('Please enter a valid email.', 'error');
        return;
    }
    if (!password) {
        showNotification('Please enter your password.', 'error');
        return;
    }
    
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password && u.role === 'admin');
    
    if (!user) {
        showNotification('Invalid admin credentials.', 'error');
        return;
    }
    
    setCurrentUser(user);
    
    if (remember) {
        localStorage.setItem('tiffin_remembered_admin', email);
    } else {
        localStorage.removeItem('tiffin_remembered_admin');
    }
    
    showAuthSuccessMessage(form, 'Thanks for logging in!');
    clearAndResetAuthForm(form);
    // Stay on the same page - do NOT redirect
}


// ============================================
// DEMO AUTH (Google/Apple Sign-In)
// ============================================
function handleDemoGoogle(role) {
    showNotification('Google Sign-In is available in demo mode. Creating demo account...', 'info');
    
    setTimeout(() => {
        const users = getUsers();
        const demoEmail = role === 'admin' ? 'admin@google-demo.com' : 'user@google-demo.com';
        
        let user = users.find(u => u.email === demoEmail && u.role === role);
        
        if (!user) {
            user = {
                id: role + '_' + Date.now(),
                role: role,
                name: role === 'admin' ? 'Admin Google' : 'Google User',
                firstName: role === 'admin' ? 'Admin' : 'Google',
                lastName: role === 'admin' ? '' : 'User',
                email: demoEmail,
                phone: '9999999999',
                address: role === 'customer' ? '123 Demo Street, New Delhi' : '',
                pincode: role === 'customer' ? '110001' : '',
                dietaryPreference: role === 'customer' ? 'vegetarian' : '',
                password: 'demo123',
                profileImage: `https://ui-avatars.com/api/?name=Google+User&background=4285f4&color=fff&size=200`,
                createdAt: new Date().toISOString(),
                subscription: null
            };
            users.push(user);
            saveUsers(users);
        }
        
        setCurrentUser(user);
        showNotification('Google Sign-In successful!', 'success');
        
        setTimeout(() => {
            window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
        }, 1000);
    }, 1500);
}

function handleDemoApple(role) {
    showNotification('Apple Sign-In is available in demo mode. Creating demo account...', 'info');
    
    setTimeout(() => {
        const users = getUsers();
        const demoEmail = role === 'admin' ? 'admin@apple-demo.com' : 'user@apple-demo.com';
        
        let user = users.find(u => u.email === demoEmail && u.role === role);
        
        if (!user) {
            user = {
                id: role + '_' + Date.now(),
                role: role,
                name: role === 'admin' ? 'Admin Apple' : 'Apple User',
                firstName: role === 'admin' ? 'Admin' : 'Apple',
                lastName: role === 'admin' ? '' : 'User',
                email: demoEmail,
                phone: '8888888888',
                address: role === 'customer' ? '456 Demo Avenue, Mumbai' : '',
                pincode: role === 'customer' ? '400001' : '',
                dietaryPreference: role === 'customer' ? 'non-vegetarian' : '',
                password: 'demo123',
                profileImage: `https://ui-avatars.com/api/?name=Apple+User&background=000000&color=fff&size=200`,
                createdAt: new Date().toISOString(),
                subscription: null
            };
            users.push(user);
            saveUsers(users);
        }
        
        setCurrentUser(user);
        showNotification('Apple Sign-In successful!', 'success');
        
        setTimeout(() => {
            window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'customer-dashboard.html';
        }, 1000);
    }, 1500);
}

// ============================================
// ROLE GUARD
// ============================================
// Check if current user has the required role
// Redirects to appropriate login if not authorized

function requireAuth(role) {
    const user = getCurrentUser();
    if (!user) {
        if (role === 'admin') {
            window.location.href = 'admin-login.html';
            return null;
        }
        // For customer dashboard, do NOT redirect to login
        const users = getUsers();
        return users.find(u => u.role === 'customer') || null;
    }
    if (user.role !== role) {
        // Role mismatch
        if (role === 'admin') {
            window.location.href = 'admin-dashboard.html';
            return null;
        }
        return user;
    }
    return user;
}

// ============================================
// SEED DEMO DATA
// ============================================
// Creates initial demo accounts if none exist

function seedDemoData() {
    let users = getUsers();
    let modified = false;
    if (!users.find(u => u.email === 'rahul@demo.com')) {
        users.push({
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
            password: 'demo123',
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
        });
        modified = true;
    }
    if (!users.find(u => u.email === 'test@example.com')) {
        users.push({
            id: 'cust_test1',
            role: 'customer',
            firstName: 'Test',
            lastName: 'User',
            name: 'Test User',
            email: 'test@example.com',
            phone: '9876543211',
            address: '123 Demo Road, New Delhi',
            pincode: '110001',
            dietaryPreference: 'vegetarian',
            password: 'password123',
            profileImage: 'https://ui-avatars.com/api/?name=Test+User&background=28a745&color=fff&size=200',
            createdAt: '2024-01-15T10:00:00Z'
        });
        modified = true;
    }
    if (!users.find(u => u.email === 'admin@demo.com')) {
        users.push({
            id: 'admin_demo1',
            role: 'admin',
            name: 'Admin User',
            email: 'admin@demo.com',
            phone: '9123456789',
            password: 'admin123',
            profileImage: 'https://ui-avatars.com/api/?name=Admin+User&background=1a1a2e&color=fff&size=200',
            createdAt: '2024-01-01T10:00:00Z'
        });
        modified = true;
    }
    if (modified) {
        saveUsers(users);
    }
}

// Initialize demo data
seedDemoData();

// ============================================
// FORGOT PASSWORD (Demo)
// ============================================
function handleForgotPassword(e) {
    if (e) e.preventDefault();
    const form = e.target;
    const emailInput = form ? form.querySelector('[name="email"]') : document.getElementById('resetEmail');
    const email = emailInput ? emailInput.value.trim() : '';
    
    if (!email) {
        showNotification('Please enter your email address.', 'error');
        return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Check if the success message DOM element exists, else fallback to notification
    const successMsg = document.getElementById('successMessage');
    if (successMsg) {
        successMsg.classList.remove('d-none');
    } else {
        showNotification('Reset link sent successfully. Please check your email.', 'success');
    }
    
    console.log('Password reset requested for:', email);
}

// ============================================
// GENERAL FORM BINDING & REFRESH RESET
// ============================================

function initGeneralAuthForms() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm && !loginForm.dataset.authBound) {
        loginForm.dataset.authBound = 'true';
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = loginForm.querySelector('#loginEmail, [name="email"], input[type="email"]');
            const passInput = loginForm.querySelector('#loginPassword, [name="password"], input[type="password"]');
            const email = emailInput ? emailInput.value.trim() : '';
            const password = passInput ? passInput.value : '';
            
            if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                if (typeof showNotification === 'function') showNotification('Please enter a valid email.', 'error');
                return;
            }
            if (!password) {
                if (typeof showNotification === 'function') showNotification('Please enter your password.', 'error');
                return;
            }
            
            const users = getUsers();
            let user = users.find(u => u.email === email && u.password === password);
            if (!user) {
                if (typeof showNotification === 'function') showNotification('Invalid email or password.', 'error');
                return;
            }
            
            setCurrentUser(user);
            showAuthSuccessMessage(loginForm, 'Thanks for logging in!');
            clearAndResetAuthForm(loginForm);
        });
    }
    
    const regForm = document.getElementById('registerForm');
    if (regForm && !regForm.dataset.authBound) {
        regForm.dataset.authBound = 'true';
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = regForm.querySelector('#regName, [name="firstName"], [name="name"]');
            const emailInput = regForm.querySelector('#regEmail, [name="email"]');
            const phoneInput = regForm.querySelector('#regPhone, [name="phone"]');
            const dietSelect = regForm.querySelector('#regDiet, [name="dietary"]');
            const passInput = regForm.querySelector('#regPassword, [name="password"]');
            const confirmInput = regForm.querySelector('#regConfirm, [name="confirmPassword"]');
            const termsCheck = regForm.querySelector('#termsCheck, [type="checkbox"]');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const dietary = dietSelect ? dietSelect.value : 'Vegetarian';
            const password = passInput ? passInput.value : '';
            const confirmPassword = confirmInput ? confirmInput.value : '';
            
            if (!name) { if (typeof showNotification === 'function') showNotification('Please enter your name.', 'error'); return; }
            if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) { if (typeof showNotification === 'function') showNotification('Please enter a valid email.', 'error'); return; }
            if (!phone || !/^\d{10}$/.test(phone)) { if (typeof showNotification === 'function') showNotification('Please enter a valid phone number.', 'error'); return; }
            if (!password || password.length < 6) { if (typeof showNotification === 'function') showNotification('Password must be at least 6 characters.', 'error'); return; }
            if (password !== confirmPassword) { if (typeof showNotification === 'function') showNotification('Passwords do not match.', 'error'); return; }
            if (termsCheck && !termsCheck.checked) { if (typeof showNotification === 'function') showNotification('Please agree to the terms of service.', 'error'); return; }
            
            const users = getUsers();
            if (users.find(u => u.email === email)) {
                if (typeof showNotification === 'function') showNotification('An account with this email already exists.', 'error');
                return;
            }
            
            const newUser = {
                id: 'cust_' + Date.now(),
                role: 'customer',
                name,
                firstName: name.split(' ')[0],
                lastName: name.split(' ').slice(1).join(' ') || '',
                email,
                phone,
                dietaryPreference: dietary,
                password,
                profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=28a745&color=fff&size=200`,
                createdAt: new Date().toISOString(),
                subscription: null
            };
            
            users.push(newUser);
            saveUsers(users);
            
            showAuthSuccessMessage(regForm, 'Thanks for signing up!');
            clearAndResetAuthForm(regForm);
        });
    }
}

function initAuthPageReset() {
    // 1. Remove any leftover success messages on load or refresh
    document.querySelectorAll('.auth-success-message').forEach(el => el.remove());
    document.querySelectorAll('.notification-toast').forEach(el => el.remove());
    
    // 2. Clear all forms and their inputs on the page so refresh starts with an empty form
    document.querySelectorAll('form').forEach(form => {
        clearAndResetAuthForm(form);
    });
}

// Bind to DOM lifecycle events
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initGeneralAuthForms();
        initAuthPageReset();
    });
} else {
    initGeneralAuthForms();
    initAuthPageReset();
}

window.addEventListener('load', initAuthPageReset);
window.addEventListener('pageshow', initAuthPageReset);

