/* ==========================================================================
   LearnSphere / TiffinBox — rtl.js
   RTL / LTR direction toggle with persistence
   Storage keys: direction, learnsphere-dir
   ========================================================================== */
(function () {
  'use strict';

  const STORAGE_KEY = 'direction';
  const ALT_KEY = 'learnsphere-dir';
  const root = document.documentElement;

  function currentDir() {
    return root.getAttribute('dir') || (document.body && document.body.classList.contains('rtl') ? 'rtl' : 'ltr');
  }

  function applyDir(dir, persist) {
    const isRtl = dir === 'rtl';
    root.setAttribute('dir', dir);
    root.setAttribute('lang', isRtl ? 'ar' : 'en');
    if (document.body) {
      document.body.classList.toggle('rtl', isRtl);
    }

    const nextAction = isRtl ? 'LTR' : 'RTL';
    const nextTitle = isRtl ? 'Switch to LTR' : 'Switch to RTL';

    document.querySelectorAll('.rtl-toggle-btn, .rtl-toggle, #rtl-toggle, [onclick*="toggleRTL"], [data-dir-toggle]').forEach((btn) => {
      const ltr = btn.querySelector('[data-icon-ltr]');
      const rtl = btn.querySelector('[data-icon-rtl]');
      if (ltr || rtl) {
        if (ltr) ltr.style.display = isRtl ? 'none' : 'inline-block';
        if (rtl) rtl.style.display = isRtl ? 'inline-block' : 'none';
      } else {
        btn.textContent = nextAction;
      }
      btn.setAttribute('aria-label', nextTitle);
      btn.setAttribute('title', nextTitle);
    });

    const rtlCb = document.getElementById('rtl-toggle-cb');
    if (rtlCb) {
      rtlCb.checked = isRtl;
    }

    if (persist !== false) {
      try { localStorage.setItem(STORAGE_KEY, dir); } catch (e) { /* noop */ }
      try { localStorage.setItem(ALT_KEY, dir); } catch (e) { /* noop */ }
    }
    document.dispatchEvent(new CustomEvent('dirchange', { detail: dir }));
  }

  function toggleDir() {
    applyDir(currentDir() === 'rtl' ? 'ltr' : 'rtl');
  }

  function initDir() {
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(ALT_KEY); } catch (e) { /* noop */ }
    applyDir(stored === 'rtl' ? 'rtl' : 'ltr', false);
  }

  // Early execution to prevent flash
  initDir();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDir);
  } else {
    initDir();
  }

  // Expose globally so inline onclick="toggleRTL()" and initRTL() work
  window.toggleRTL = toggleDir;
  window.initRTL = initDir;
  window.updateRTLIcon = function() {
    applyDir(currentDir(), false);
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-dir-toggle]');
    if (btn) {
      e.preventDefault();
      toggleDir();
    }
  });

  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY || e.key === ALT_KEY) {
      initDir();
    }
  });
})();
