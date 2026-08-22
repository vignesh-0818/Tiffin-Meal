/* ==========================================================================
   LearnSphere — dashboard.js
   Student + Admin dashboards: section switching, charts, tables, chat
   ========================================================================== */
(function () {
  'use strict';

  const doc = document;
  const win = window;
  const $ = (sel, ctx) => (ctx || doc).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || doc).querySelectorAll(sel));

  const STORAGE_KEY = 'learnsphere-dash-section';

  /* ----------------------------------------------------------------
     Chart.js theme-aware defaults
  ---------------------------------------------------------------- */
  if (win.Chart) {
    Chart.defaults.font.family = "'Inter', 'Segoe UI', sans-serif";
    Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#67798f';
    Chart.defaults.borderColor = 'rgba(150,170,200,0.15)';
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.boxWidth = 8;
    Chart.defaults.plugins.legend.labels.boxHeight = 8;
    Chart.defaults.plugins.tooltip.backgroundColor = '#0d0a1e';
    Chart.defaults.plugins.tooltip.padding = 12;
    Chart.defaults.plugins.tooltip.cornerRadius = 10;
    Chart.defaults.plugins.tooltip.titleFont.weight = '700';
  }

  const charts = [];

  function gridColor() { return 'rgba(150,170,200,0.14)'; }
  function labelColor() { return getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#67798f'; }

  function refreshChartTheme() {
    charts.forEach(function (chart) {
      if (!chart) return;
      if (chart.options.scales && chart.options.scales.x) {
        chart.options.scales.x.grid.color = gridColor();
        chart.options.scales.x.ticks.color = labelColor();
      }
      if (chart.options.scales && chart.options.scales.y) {
        chart.options.scales.y.grid.color = gridColor();
        chart.options.scales.y.ticks.color = labelColor();
      }
      chart.update('none');
    });
  }

  function makeChart(id, config) {
    const canvas = $(id);
    if (!canvas || !win.Chart) return null;
    const chart = new Chart(canvas, config);
    charts.push(chart);
    return chart;
  }

  function lineGradient(ctx, colorA, colorB, height) {
    const g = ctx.createLinearGradient(0, 0, 0, height || 280);
    g.addColorStop(0, colorA);
    g.addColorStop(1, colorB);
    return g;
  }

  /* ----------------------------------------------------------------
     Charts
  ---------------------------------------------------------------- */
  function initCharts() {
    // Revenue / admissions trend (admin + student overview)
    makeChart('#revenueChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Revenue (Rs.)',
          data: [120000, 148000, 132000, 171000, 159000, 193000, 182000, 216000, 198000, 247000, 231000, 286000],
          borderColor: '#7c3aed',
          backgroundColor: function (ctx) {
            return lineGradient(ctx.chart.ctx, 'rgba(124,58,237,0.28)', 'rgba(124,58,237,0)', 280);
          },
          fill: true, tension: 0.42, borderWidth: 3,
          pointRadius: 0, pointHoverRadius: 6, pointBackgroundColor: '#fff', pointBorderColor: '#7c3aed', pointBorderWidth: 3
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false } }, y: { ticks: { callback: function (v) { return 'Rs.' + (v / 1000) + 'k'; } } } }
      }
    });

    // New enrollments by month (student performance proxy for admin)
    makeChart('#enrollmentChart', {
      type: 'doughnut',
      data: {
        labels: ['Mathematics', 'Science', 'English', 'Physics', 'Others'],
        datasets: [{
          data: [32, 24, 18, 16, 10],
          backgroundColor: ['#7c3aed', '#06b6d4', '#14b8a6', '#f59e0b', '#f472b6'],
          borderWidth: 3, borderColor: 'rgba(255,255,255,0)'
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '68%', plugins: { legend: { position: 'bottom' } } }
    });

    // Subject performance (student) / top subjects (admin)
    makeChart('#subjectChart', {
      type: 'bar',
      data: {
        labels: ['Maths', 'Science', 'English', 'Physics', 'Chemistry', 'Biology'],
        datasets: [{
          label: 'Average Score (%)',
          data: [88, 84, 91, 82, 79, 85],
          backgroundColor: ['#a78bfa', '#22d3ee', '#5eead4', '#fbbf24', '#f9a8d4', '#7c3aed'],
          borderRadius: 8, borderSkipped: false
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false } }, y: { min: 0, max: 100, ticks: { callback: function (v) { return v + '%'; } } } }
      }
    });

    // Attendance rate (student + admin)
    makeChart('#attendanceChart', {
      type: 'doughnut',
      data: {
        labels: ['Present', 'Absent'],
        datasets: [{
          data: [92, 8],
          backgroundColor: ['#14b8a6', '#e9e4fa'],
          borderWidth: 3, borderColor: 'rgba(255,255,255,0)'
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom' } } }
    });

    // Weekly study hours (student)
    makeChart('#studyChart', {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Hours',
          data: [2, 2.5, 1.5, 3, 2, 4, 1],
          backgroundColor: 'rgba(124,58,237,0.75)',
          borderRadius: 6, borderSkipped: false
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false } }, y: { beginAtZero: true } }
      }
    });
  }

  win.addEventListener('themechange', refreshChartTheme);

  /* ----------------------------------------------------------------
     Dashboard section switching (SPA)
  ---------------------------------------------------------------- */
  function initSections() {
    const nav = $('[data-dash-nav]');
    if (!nav) return;

    function show(section) {
      if (!section) return;
      const links = $$('[data-dash-section]', nav);
      links.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('data-dash-section') === section);
      });
      $$('[data-dash-pane]').forEach(function (pane) {
        pane.style.display = pane.getAttribute('data-dash-pane') === section ? 'block' : 'none';
      });
      try { localStorage.setItem(STORAGE_KEY, section); } catch (e) { /* noop */ }
      const head = $('[data-dash-head]');
      if (head) head.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    nav.addEventListener('click', function (e) {
      const link = e.target.closest('[data-dash-section]');
      if (link) {
        e.preventDefault();
        show(link.getAttribute('data-dash-section'));
      }
    });

    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* noop */ }
    show(stored || 'dashboard');
  }

  /* ----------------------------------------------------------------
     Admin sidebar (mobile) toggle
  ---------------------------------------------------------------- */
  function initAdminSidebar() {
    const openBtn = $('[data-admin-open]');
    const closeBtn = $('[data-admin-close]');
    const sidebar = $('.admin-sidebar');
    const backdrop = $('.admin-sidebar-backdrop');
    if (!sidebar) return;
    function setOpen(open) {
      sidebar.classList.toggle('open', open);
      if (backdrop) backdrop.classList.toggle('show', open);
    }
    if (openBtn) openBtn.addEventListener('click', function () { setOpen(true); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });
    if (backdrop) backdrop.addEventListener('click', function () { setOpen(false); });
  }

  /* ----------------------------------------------------------------
     Admin table search
  ---------------------------------------------------------------- */
  function initTableSearch() {
    $$('[data-table-search]').forEach(function (input) {
      input.addEventListener('input', function () {
        const q = input.value.trim().toLowerCase();
        const table = $('[data-table-for="' + input.getAttribute('data-table-search') + '"]');
        if (!table) return;
        $$('tbody tr', table).forEach(function (row) {
          row.style.display = row.textContent.toLowerCase().indexOf(q) !== -1 ? '' : 'none';
        });
      });
    });
  }

  /* ----------------------------------------------------------------
     Messages chat switcher
  ---------------------------------------------------------------- */
  function initChat() {
    const threads = $$('[data-chat-thread]');
    if (!threads.length) return;
    const convo = $('[data-chat-convo]');
    const sender = $('[data-chat-sender]');
    const messages = $('[data-chat-messages]');
    const input = $('[data-chat-input]');
    const sendBtn = $('[data-chat-send]');

    const convoData = {
      student: [
        { from: 'them', text: 'Hi! I wanted to ask about the upcoming Mathematics test on Saturday.' },
        { from: 'me', text: 'Sure! The test covers quadratic equations and the practice sheet is available in Study Materials.' },
        { from: 'them', text: 'Perfect, thank you! Could we also schedule a doubt session this week?' },
        { from: 'me', text: 'Absolutely. I have a free slot on Thursday at 5 PM — I will send the invite shortly.' }
      ],
      parent: [
        { from: 'them', text: 'Could you share my daughter\u2019s attendance report for this month?' },
        { from: 'me', text: 'Of course. Her attendance is at 96% — she missed only one Science class last week.' },
        { from: 'them', text: 'That is great to hear. Thanks for the update!' }
      ],
      tutor: [
        { from: 'them', text: 'The new Chemistry worksheets are ready for the senior batch.' },
        { from: 'me', text: 'Great, please upload them to Study Materials and I will review them tonight.' },
        { from: 'them', text: 'Done! Also, three students asked for extra revision before the exam.' },
        { from: 'me', text: 'I will schedule a revision class for Friday evening and notify the batch.' }
      ]
    };

    function renderConvo(key) {
      const data = convoData[key] || convoData.student;
      if (sender) {
        sender.textContent = threads.find(function (t) { return t.getAttribute('data-chat-thread') === key; }) ? 
          $('[data-thread-name="' + key + '"]') ? $('[data-thread-name="' + key + '"]').textContent : key : key;
      }
      if (messages) {
        messages.innerHTML = data.map(function (m) {
          return '<div class="chat-bubble ' + (m.from === 'me' ? 'out' : 'in') + '"><span>' + m.text + '</span><div class="cb-meta">' +
            (m.from === 'me' ? 'You' : 'LearnSphere') + ' · 2:15 PM</div></div>';
        }).join('');
        messages.scrollTop = messages.scrollHeight;
      }
    }

    threads.forEach(function (thread) {
      thread.addEventListener('click', function () {
        threads.forEach(function (t) { t.classList.remove('active'); });
        thread.classList.add('active');
        renderConvo(thread.getAttribute('data-chat-thread'));
      });
    });

    function send() {
      if (!input || !input.value.trim()) return;
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble out';
      bubble.innerHTML = '<span>' + input.value.trim() + '</span><div class="cb-meta">You · Just now</div>';
      messages.appendChild(bubble);
      input.value = '';
      messages.scrollTop = messages.scrollHeight;
    }
    if (sendBtn) sendBtn.addEventListener('click', send);
    if (input) input.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(); });

    const first = threads[0];
    if (first) {
      first.classList.add('active');
      renderConvo(first.getAttribute('data-chat-thread'));
    } else if (convo) {
      renderConvo('student');
    }
  }

  /* ----------------------------------------------------------------
     Settings / profile forms
  ---------------------------------------------------------------- */
  function initSettings() {
    $$('[data-settings-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = form.querySelector('[type="submit"]');
        const original = btn ? btn.innerHTML : '';
        if (btn) {
          btn.classList.add('is-loading');
          btn.innerHTML = '<span class="btn-spinner"></span> Saving...';
        }
        const success = form.querySelector('[data-save-success]');
        setTimeout(function () {
          if (btn) {
            btn.classList.remove('is-loading');
            btn.innerHTML = '<i class="bi bi-check-lg"></i> Saved';
            setTimeout(function () { btn.innerHTML = original; }, 2600);
          }
          if (success) success.style.display = 'block';
        }, 800);
      });
    });
  }

  /* ----------------------------------------------------------------
     Quick actions: mark read / generic confirm
  ---------------------------------------------------------------- */
  function initQuickActions() {
    doc.addEventListener('click', function (e) {
      const mark = e.target.closest('[data-mark-read]');
      if (mark) {
        e.preventDefault();
        const item = mark.closest('.at-notif-item, .chat-thread, tr');
        if (item) item.classList.remove('unread');
        return;
      }
      const confirmBtn = e.target.closest('[data-confirm]');
      if (confirmBtn) {
        e.preventDefault();
        const row = confirmBtn.closest('tr');
        if (row) row.style.display = 'none';
      }
    });
  }

  /* ----------------------------------------------------------------
     Boot
  ---------------------------------------------------------------- */
  function init() {
    initCharts();
    initSections();
    initAdminSidebar();
    initTableSearch();
    initChat();
    initSettings();
    initQuickActions();
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
