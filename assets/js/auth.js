/* ==========================================================================
   LearnSphere — auth.js
   Simulated authentication with localStorage guards
   Keys: studentLoggedIn, adminLoggedIn, learnsphere-user
   ========================================================================== */
(function () {
  'use strict';

  const doc = document;
  const win = window;
  const $ = (sel, ctx) => (ctx || doc).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || doc).querySelectorAll(sel));

  const KEYS = { student: 'studentLoggedIn', admin: 'adminLoggedIn', user: 'learnsphere-user' };

  function store() {
    try { return JSON.parse(localStorage.getItem(KEYS.user) || 'null'); } catch (e) { return null; }
  }
  function saveUser(data) {
    try { localStorage.setItem(KEYS.user, JSON.stringify(data)); } catch (e) { /* noop */ }
  }

  /* ----------------------------------------------------------------
     Helpers
  ---------------------------------------------------------------- */
  function setError(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    const fb = input.closest('.mb-3, .mb-4, .field-wrap, .form-floating, div');
    let tip = fb && fb.querySelector('.field-feedback');
    if (!tip && fb) {
      tip = doc.createElement('div');
      tip.className = 'field-feedback invalid';
      fb.appendChild(tip);
    }
    if (tip) { tip.textContent = message; tip.classList.add('invalid'); tip.classList.remove('valid'); }
  }
  function setSuccess(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const fb = input.closest('.mb-3, .mb-4, .field-wrap, .form-floating, div');
    const tip = fb && fb.querySelector('.field-feedback');
    if (tip) tip.textContent = '';
  }
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function validate(input) {
    const name = input.getAttribute('name') || input.id || '';
    const value = input.value.trim();
    let ok = true;
    if (input.hasAttribute('required') && !value) { setError(input, 'This field is required.'); ok = false; }
    else if (name.indexOf('email') !== -1 && value && !isEmail(value)) { setError(input, 'Please enter a valid email address.'); ok = false; }
    else if (name.indexOf('phone') !== -1 && value && !/^[+\d][\d\s-]{8,14}$/.test(value)) { setError(input, 'Please enter a valid phone number.'); ok = false; }
    else if (name === 'password' && value && value.length < 6) { setError(input, 'Password must be at least 6 characters.'); ok = false; }
    else if (name === 'confirm' && value && value !== (($('input[name="password"]') || {}).value || '')) { setError(input, 'Passwords do not match.'); ok = false; }
    else if (name.indexOf('accept') !== -1 && !input.checked) { setError(input, 'Please accept the terms to continue.'); ok = false; }
    else { setSuccess(input); }
    return ok;
  }

  function bindValidation(form) {
    if (!form) return;
    form.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('blur', function () { validate(input); });
      input.addEventListener('input', function () { if (input.classList.contains('is-invalid')) validate(input); });
    });
  }

  /* ----------------------------------------------------------------
     Customer login (login.html)
  ---------------------------------------------------------------- */
  const loginForm = $('[data-login-form]');
  if (loginForm) {
    bindValidation(loginForm);
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let ok = true;
      loginForm.querySelectorAll('input').forEach(function (input) { if (!validate(input)) ok = false; });
      if (!ok) return;
      const btn = loginForm.querySelector('[type="submit"]');
      if (btn) {
        btn.classList.add('is-loading');
        btn.innerHTML = '<span class="btn-spinner"></span> Signing in...';
      }
      setTimeout(function () {
        try { localStorage.setItem(KEYS.student, 'true'); } catch (err) { /* noop */ }
        saveUser({
          name: (($('input[name="name"]', loginForm) || {}).value || 'Student').trim(),
          email: (($('input[name="email"]', loginForm) || {}).value || '').trim()
        });
        win.location.href = 'student/index.html';
      }, 900);
    });
  }

  /* ----------------------------------------------------------------
     Student register (register.html)
  ---------------------------------------------------------------- */
  const regForm = $('[data-register-form]');
  if (regForm) {
    bindValidation(regForm);
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let ok = true;
      regForm.querySelectorAll('input, select').forEach(function (input) { if (!validate(input)) ok = false; });
      if (!ok) return;
      const btn = regForm.querySelector('[type="submit"]');
      if (btn) {
        btn.classList.add('is-loading');
        btn.innerHTML = '<span class="btn-spinner"></span> Creating account...';
      }
      setTimeout(function () {
        try { localStorage.setItem(KEYS.student, 'true'); } catch (err) { /* noop */ }
        saveUser({
          name: (($('input[name="name"]', regForm) || {}).value || 'Student').trim(),
          email: (($('input[name="email"]', regForm) || {}).value || '').trim()
        });
        win.location.href = 'student/index.html';
      }, 1000);
    });
  }

  /* ----------------------------------------------------------------
     Forgot password (forgot-password.html)
  ---------------------------------------------------------------- */
  const forgotForm = $('[data-forgot-form]');
  if (forgotForm) {
    bindValidation(forgotForm);
    forgotForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let ok = true;
      forgotForm.querySelectorAll('input').forEach(function (input) { if (!validate(input)) ok = false; });
      if (!ok) return;
      const btn = forgotForm.querySelector('[type="submit"]');
      if (btn) {
        btn.classList.add('is-loading');
        btn.innerHTML = '<span class="btn-spinner"></span> Sending link...';
      }
      const panel = $('[data-forgot-success]');
      setTimeout(function () {
        if (btn) {
          btn.classList.remove('is-loading');
          btn.innerHTML = '<i class="bi bi-envelope-check"></i> Send Reset Link';
        }
        forgotForm.style.display = 'none';
        if (panel) panel.style.display = 'block';
      }, 900);
    });
  }

  /* ----------------------------------------------------------------
     Admin login (admin-login.html)
  ---------------------------------------------------------------- */
  const adminForm = $('[data-admin-login-form]');
  if (adminForm) {
    bindValidation(adminForm);
    adminForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let ok = true;
      adminForm.querySelectorAll('input').forEach(function (input) { if (!validate(input)) ok = false; });
      if (!ok) return;
      const btn = adminForm.querySelector('[type="submit"]');
      if (btn) {
        btn.classList.add('is-loading');
        btn.innerHTML = '<span class="btn-spinner"></span> Signing in...';
      }
      setTimeout(function () {
        try { localStorage.setItem(KEYS.admin, 'true'); } catch (err) { /* noop */ }
        saveUser({ name: 'Admin', email: (($('input[name="email"]', adminForm) || {}).value || '').trim() });
        win.location.href = 'admin/index.html';
      }, 900);
    });
  }

  /* ----------------------------------------------------------------
     Admin register (admin-register.html)
  ---------------------------------------------------------------- */
  const adminRegForm = $('[data-admin-register-form]');
  if (adminRegForm) {
    bindValidation(adminRegForm);
    adminRegForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let ok = true;
      adminRegForm.querySelectorAll('input, select').forEach(function (input) { if (!validate(input)) ok = false; });
      if (!ok) return;
      const btn = adminRegForm.querySelector('[type="submit"]');
      if (btn) {
        btn.classList.add('is-loading');
        btn.innerHTML = '<span class="btn-spinner"></span> Creating account...';
      }
      setTimeout(function () {
        try { localStorage.setItem(KEYS.admin, 'true'); } catch (err) { /* noop */ }
        saveUser({ name: 'Admin', email: (($('input[name="email"]', adminRegForm) || {}).value || '').trim() });
        win.location.href = 'admin/index.html';
      }, 1000);
    });
  }

  /* ----------------------------------------------------------------
     Guards
  ---------------------------------------------------------------- */
  const guardEl = $('[data-guard]');
  if (guardEl) {
    const role = guardEl.getAttribute('data-guard'); // 'student' | 'admin'
    const logged = (function () {
      try { return localStorage.getItem(role === 'admin' ? KEYS.admin : KEYS.student) === 'true'; } catch (e) { return false; }
    })();
    if (!logged) {
      win.location.replace(role === 'admin' ? 'admin-login.html' : 'login.html');
    } else {
      const user = store();
      if (user) {
        $$('[data-user-name]').forEach(function (el) { el.textContent = user.name || 'Student'; });
        $$('[data-user-email]').forEach(function (el) { el.textContent = user.email || ''; });
        $$('[data-user-avatar]').forEach(function (el) {
          if (user.name) {
            const initials = user.name.split(' ').map(function (w) { return w.charAt(0); }).join('').toUpperCase().slice(0, 2);
            el.textContent = initials;
          }
        });
      }
    }
  }

  /* ----------------------------------------------------------------
     Logout
  ---------------------------------------------------------------- */
  doc.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-logout]');
    if (!btn) return;
    e.preventDefault();
    try { localStorage.removeItem(KEYS.student); } catch (err) { /* noop */ }
    try { localStorage.removeItem(KEYS.admin); } catch (err) { /* noop */ }
    const target = btn.getAttribute('data-logout');
    win.location.href = target || 'login.html';
  });
})();
