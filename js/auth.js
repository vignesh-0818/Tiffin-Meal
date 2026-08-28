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
    
    showNotification('Account created successfully! Please log in.', 'success');
    
    // Redirect to login after 1.5 seconds
    setTimeout(() => {
        window.location.href = 'customer-login.html';
    }, 1500);
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
    
    setCurrentUser(user);
    
    // Handle remember me
    if (remember) {
        localStorage.setItem('tiffin_remembered_customer', email);
    } else {
        localStorage.removeItem('tiffin_remembered_customer');
    }
    
    showNotification('Login successful!', 'success');
    
    setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl');
        if (returnUrl) {
            window.location.href = returnUrl;
        } else {
            window.location.href = 'customer-dashboard.html';
        }
    }, 1000);
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
    
    showNotification('Admin account created! Please log in.', 'success');
    
    setTimeout(() => {
        window.location.href = 'admin-login.html';
    }, 1500);
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
    
    showNotification('Admin login successful!', 'success');
    
    setTimeout(() => {
        window.location.href = 'admin-dashboard.html';
    }, 1000);
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
        window.location.href = role === 'admin' ? 'admin-login.html' : 'customer-login.html';
        return null;
    }
    if (user.role !== role) {
        // Role mismatch - redirect to appropriate dashboard
        if (user.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'customer-dashboard.html';
        }
        return null;
    }
    return user;
}

// ============================================
// SEED DEMO DATA
// ============================================
// Creates initial demo accounts if none exist

function seedDemoData() {
    const users = getUsers();
    if (users.length === 0) {
        const demoUsers = [
            {
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
            },
            {
                id: 'admin_demo1',
                role: 'admin',
                name: 'Admin User',
                email: 'admin@demo.com',
                phone: '9123456789',
                password: 'admin123',
                profileImage: 'https://ui-avatars.com/api/?name=Admin+User&background=1a1a2e&color=fff&size=200',
                createdAt: '2024-01-01T10:00:00Z'
            }
        ];
        saveUsers(demoUsers);
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
