/* ==========================================================================
   LearnSphere — rtl.js
   RTL / LTR direction toggle with persistence
   Storage key: learnsphere-dir
   ========================================================================== */
(function () {
  'use strict';

  const STORAGE_KEY = 'learnsphere-dir';
  const root = document.documentElement;

  function currentDir() {
    return root.getAttribute('dir') || 'ltr';
  }

  function applyDir(dir, persist) {
    root.setAttribute('dir', dir);
    document.querySelectorAll('[data-dir-toggle]').forEach((btn) => {
      const isRtl = dir === 'rtl';
      const ltr = btn.querySelector('[data-icon-ltr]');
      const rtl = btn.querySelector('[data-icon-rtl]');
      if (ltr) ltr.style.display = isRtl ? 'none' : 'inline-block';
      if (rtl) rtl.style.display = isRtl ? 'inline-block' : 'none';
      btn.setAttribute('aria-label', isRtl ? 'Switch to LTR' : 'Switch to RTL');
      btn.setAttribute('title', isRtl ? 'Switch to LTR' : 'Switch to RTL');
    });
    if (persist !== false) {
      try { localStorage.setItem(STORAGE_KEY, dir); } catch (e) { /* noop */ }
    }
    document.dispatchEvent(new CustomEvent('dirchange', { detail: dir }));
  }

  function toggleDir() {
    applyDir(currentDir() === 'rtl' ? 'ltr' : 'rtl');
  }

  let stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* noop */ }
  applyDir(stored === 'rtl' ? 'rtl' : 'ltr', stored === null);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-dir-toggle]');
    if (btn) {
      e.preventDefault();
      toggleDir();
    }
  });
})();
