/* ==========================================================================
   LearnSphere — darkmode.js
   Dark mode toggle with localStorage persistence
   Storage key: learnsphere-theme
   ========================================================================== */
(function () {
  'use strict';

  const STORAGE_KEY = 'learnsphere-theme';
  const root = document.documentElement;

  function currentTheme() {
    return root.getAttribute('data-theme') || 'light';
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const icon = btn.querySelector('i, .bi, svg');
      const light = btn.querySelector('[data-icon-light]');
      const dark = btn.querySelector('[data-icon-dark]');
      if (light) light.style.display = isDark ? 'none' : 'inline-block';
      if (dark) dark.style.display = isDark ? 'inline-block' : 'none';
      if (icon) btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });
    if (persist !== false) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* noop */ }
    }
    document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  }

  function toggleTheme() {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  }

  let stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* noop */ }
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(stored || (systemDark ? 'dark' : 'light'), stored === null);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-theme-toggle]');
    if (btn) {
      e.preventDefault();
      toggleTheme();
    }
  });
})();
