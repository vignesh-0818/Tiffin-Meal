/* ==========================================================================
   LearnSphere — main.js
   Front-end interactions + data-driven rendering
   ========================================================================== */
(function () {
  'use strict';

  const doc = document;
  const win = window;

  const $ = (sel, ctx) => (ctx || doc).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || doc).querySelectorAll(sel));

  const has = (sel) => $(sel) !== null;
  const addClass = (el, c) => el && el.classList.add(c);
  const removeClass = (el, c) => el && el.classList.remove(c);

  function esc(str) {
    const d = doc.createElement('div');
    d.textContent = String(str == null ? '' : str);
    return d.innerHTML;
  }

  function fmtMoney(n) {
    return Number(n).toLocaleString('en-IN');
  }

  function fmtDate(iso) {
    try {
      return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) { return iso; }
  }

  /* ----------------------------------------------------------------
     Preloader
  ---------------------------------------------------------------- */
  win.addEventListener('load', function () {
    const pre = $('#preloader');
    if (pre) setTimeout(() => addClass(pre, 'loaded'), 350);
  });
  setTimeout(function () {
    const pre = $('#preloader');
    if (pre && !pre.classList.contains('loaded')) addClass(pre, 'loaded');
  }, 4000);

  /* ----------------------------------------------------------------
     Navbar scroll state
  ---------------------------------------------------------------- */
  const navbar = $('.navbar');
  const overlayNav = $('.navbar-overlay');
  const navTarget = overlayNav || navbar;
  function onScrollNav() {
    if (navTarget) {
      if (win.scrollY > 40) addClass(navTarget, 'navbar-scrolled');
      else removeClass(navTarget, 'navbar-scrolled');
    }
  }
  onScrollNav();
  win.addEventListener('scroll', onScrollNav, { passive: true });

  /* ----------------------------------------------------------------
     Back to top
  ---------------------------------------------------------------- */
  const backTop = $('.back-to-top');
  function onScrollTop() {
    if (backTop) {
      if (win.scrollY > 500) addClass(backTop, 'show');
      else removeClass(backTop, 'show');
    }
  }
  onScrollTop();
  win.addEventListener('scroll', onScrollTop, { passive: true });
  if (backTop) {
    backTop.addEventListener('click', function (e) {
      e.preventDefault();
      win.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------------
     Active nav link highlighting
  ---------------------------------------------------------------- */
  (function () {
    const path = (win.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.navbar-nav .nav-link, .offcanvas .nav-link').forEach(function (link) {
      const href = (link.getAttribute('href') || '').split('?')[0].split('#')[0].toLowerCase();
      if (href && path && href === path) {
        addClass(link, 'active');
        const dd = link.closest('.dropdown');
        if (dd) {
          const toggle = dd.querySelector('.nav-link.dropdown-toggle');
          if (toggle) addClass(toggle, 'active');
        }
      }
    });
  })();

  /* ----------------------------------------------------------------
     Mobile offcanvas: dropdowns open as accordions
  ---------------------------------------------------------------- */
  const offcanvas = $('#mobileNav');
  if (offcanvas) {
    offcanvas.addEventListener('shown.bs.offcanvas', function () {
      offcanvas.querySelectorAll('.dropdown-toggle').forEach(function (toggle) {
        toggle.setAttribute('data-bs-toggle', 'collapse');
        toggle.setAttribute('data-bs-target', '#' + toggle.dataset.bsTargetMobile);
        const panel = $('#collapse-' + (toggle.dataset.bsTargetMobile || 'navCollapse'));
        if (panel) toggle.setAttribute('data-bs-target', '#' + panel.id);
      });
    });
  }

  /* ----------------------------------------------------------------
     Reveal-on-scroll + counters
  ---------------------------------------------------------------- */
  if ('IntersectionObserver' in win) {
    const revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          addClass(entry.target, 'aos-animate');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $$('[data-aos]').forEach(function (el) { revealObs.observe(el); });

    const countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countObs.unobserve(entry.target);
          animateCount(entry.target);
        }
      });
    }, { threshold: 0.4 });
    $$('[data-counter]').forEach(function (el) { countObs.observe(el); });
  } else {
    $$('[data-aos]').forEach(function (el) { addClass(el, 'aos-animate'); });
  }

  function animateCount(el) {
    const target = parseFloat(el.getAttribute('data-counter')) || 0;
    const duration = 1400;
    const start = performance.now();
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = (String(target).split('.')[1] || '').length;
    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ----------------------------------------------------------------
     Course card + grid rendering
  ---------------------------------------------------------------- */
  function courseCardHTML(course) {
    return '<article class="course-card card-premium" data-aos="fade-up">' +
      '<a class="course-img-wrap d-block" href="course-details.html?course=' + esc(course.slug) + '" aria-label="View ' + esc(course.title) + ' course">' +
        '<img class="course-img" src="' + esc(course.image) + '" alt="' + esc(course.alt || course.title) + '" loading="lazy">' +
        '<span class="course-cat">' + esc(course.category) + '</span>' +
      '</a>' +
      '<div class="course-body">' +
        '<span class="subject-chip mb-2"><i class="bi bi-book"></i>' + esc(course.title) + '</span>' +
        '<h3 class="course-title"><a href="course-details.html?course=' + esc(course.slug) + '">' + esc(course.title) + ' Classes</a></h3>' +
        '<p class="course-desc">' + esc(course.short) + '</p>' +
        '<ul class="course-meta">' +
          '<li><i class="bi bi-clock"></i>Duration: ' + esc(course.duration) + '</li>' +
          '<li><i class="bi bi-collection-play"></i>' + course.lessons + ' lessons</li>' +
          '<li><i class="bi bi-people"></i>' + course.students + '+ students</li>' +
          '<li><i class="bi bi-star-fill"></i>' + course.rating.toFixed(1) + ' rating</li>' +
        '</ul>' +
        '<div class="course-foot">' +
          '<span class="cm-price">Rs. ' + fmtMoney(course.price) + '/month</span>' +
          '<a class="course-link" href="course-details.html?course=' + esc(course.slug) + '">View Details <i class="bi bi-arrow-right"></i></a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function renderCourseGrid() {
    const grids = $$('[data-course-grid]');
    if (!grids.length || !win.LS_DATA) return;

    // course category filters (courses.html)
    const filters = $$('[data-course-filter]');
    if (filters.length) {
      filters.forEach(function (btn) {
        btn.addEventListener('click', function () {
          filters.forEach(function (b) { removeClass(b, 'active'); });
          addClass(btn, 'active');
          const cat = btn.getAttribute('data-filter') || 'All';
          grids.forEach(function (grid) {
            let list = win.LS_DATA.courses.slice();
            if (cat !== 'All') list = list.filter(function (c) { return c.category === cat; });
            const max = parseInt(grid.getAttribute('data-max') || '0', 10);
            if (max > 0) list = list.slice(0, max);
            grid.innerHTML = list.map(courseCardHTML).join('');
          });
        });
      });
    }

    grids.forEach(function (grid) {
      const max = parseInt(grid.getAttribute('data-max') || '0', 10);
      const cat = grid.getAttribute('data-category') || '';
      let list = win.LS_DATA.courses.slice();
      if (cat) list = list.filter(function (c) { return c.category === cat; });
      if (max > 0) list = list.slice(0, max);
      grid.innerHTML = list.map(courseCardHTML).join('');
    });
  }

  /* ----------------------------------------------------------------
     Tutor cards
  ---------------------------------------------------------------- */
  function tutorCardHTML(t) {
    return '<article class="tutor-card card-premium" data-aos="fade-up">' +
      '<div class="tutor-img-wrap">' +
        '<img class="tutor-img" src="' + esc(t.img) + '" alt="' + esc(t.name) + '" loading="lazy">' +
      '</div>' +
      '<div class="tutor-body">' +
        '<h3 class="tutor-name">' + esc(t.name) + '</h3>' +
        '<span class="tutor-subject"><i class="bi bi-mortarboard"></i>' + esc(t.subject) + '</span>' +
        '<span class="tutor-qual"><i class="bi bi-patch-check"></i>' + esc(t.qual) + ' · ' + t.experience + '+ yrs</span>' +
        '<p class="tutor-bio">' + esc(t.bio) + '</p>' +
        '<div class="tutor-specs">' + t.specs.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('') + '</div>' +
        '<div class="d-flex align-items-center justify-content-between">' +
          '<span class="badge-soft"><i class="bi bi-star-fill me-1"></i>' + t.rating.toFixed(1) + '</span>' +
          '<span class="small-muted"><i class="bi bi-people-fill me-1"></i>' + t.students + ' students</span>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function renderTutorGrid() {
    const grids = $$('[data-tutor-grid]');
    if (!grids.length || !win.LS_DATA) return;
    grids.forEach(function (grid) {
      const max = parseInt(grid.getAttribute('data-max') || '0', 10);
      let list = win.LS_DATA.tutors.slice();
      if (max > 0) list = list.slice(0, max);
      grid.innerHTML = list.map(tutorCardHTML).join('');
    });
  }

  /* ----------------------------------------------------------------
     Testimonials
  ---------------------------------------------------------------- */
  function testimonialCardHTML(t) {
    let stars = '';
    for (let i = 1; i <= 5; i += 1) {
      stars += '<i class="bi ' + (i <= t.stars ? 'bi-star-fill' : 'bi-star') + '"></i>';
    }
    return '<article class="testimonial-card card-premium" data-aos="fade-up">' +
      '<i class="bi bi-quote t-quote"></i>' +
      '<div class="t-stars">' + stars + '</div>' +
      '<p class="t-text">"' + esc(t.text) + '"</p>' +
      '<div class="t-author">' +
        '<img src="' + esc(t.img) + '" alt="' + esc(t.name) + '" loading="lazy">' +
        '<div><div class="t-name">' + esc(t.name) + '</div><div class="t-role">' + esc(t.role) + '</div></div>' +
      '</div>' +
    '</article>';
  }

  function renderTestimonials() {
    const grids = $$('[data-testimonial-grid]');
    if (!grids.length || !win.LS_DATA) return;
    grids.forEach(function (grid) {
      const max = parseInt(grid.getAttribute('data-max') || '0', 10);
      let list = win.LS_DATA.testimonials.slice();
      if (max > 0) list = list.slice(0, max);
      grid.innerHTML = list.map(testimonialCardHTML).join('');
    });
  }

  /* ----------------------------------------------------------------
     Blog grid + filters (blog.html)
  ---------------------------------------------------------------- */
  function blogCardHTML(p) {
    return '<article class="blog-card card-premium" data-aos="fade-up" data-category="' + esc(p.category) + '">' +
      '<a class="blog-img-wrap d-block" href="blog-details.html?post=' + esc(p.slug) + '" aria-label="Read ' + esc(p.title) + '">' +
        '<img class="blog-img" src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">' +
        '<span class="blog-cat">' + esc(p.category) + '</span>' +
      '</a>' +
      '<div class="blog-body">' +
        '<h3 class="blog-title"><a href="blog-details.html?post=' + esc(p.slug) + '">' + esc(p.title) + '</a></h3>' +
        '<p class="blog-excerpt">' + esc(p.excerpt) + '</p>' +
        '<div class="blog-meta">' +
          '<span><i class="bi bi-calendar3"></i> ' + fmtDate(p.date) + '</span>' +
          '<span class="blog-meta-sep"></span>' +
          '<span><i class="bi bi-clock"></i> ' + p.reading + ' min read</span>' +
          '<span class="blog-meta-sep"></span>' +
          '<a href="blog-details.html?post=' + esc(p.slug) + '">Read Article</a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function renderBlog() {
    const grid = $('[data-blog-grid]');
    const posts = (win.LS_DATA && win.LS_DATA.blog) || [];
    if (!grid) return;

    function currentFilter() {
      const active = $('[data-blog-filter].active');
      return active ? active.getAttribute('data-filter') || 'All' : 'All';
    }

    function render(filter, query) {
      query = (query || '').trim().toLowerCase();
      let list = posts.slice();
      if (filter && filter !== 'All') list = list.filter(function (p) { return p.category === filter; });
      if (query) {
        list = list.filter(function (p) {
          return (p.title + ' ' + p.excerpt + ' ' + p.category + ' ' + (p.tags || []).join(' ')).toLowerCase().indexOf(query) !== -1;
        });
      }
      const empty = $('[data-blog-empty]');
      if (list.length === 0) {
        grid.innerHTML = '';
        if (empty) empty.style.display = 'block';
        return;
      }
      if (empty) empty.style.display = 'none';
      grid.innerHTML = list.map(blogCardHTML).join('');
    }

    $$('[data-blog-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('[data-blog-filter]').forEach(function (b) { removeClass(b, 'active'); });
        addClass(btn, 'active');
        const search = $('[data-blog-search]');
        render(btn.getAttribute('data-filter'), search ? search.value : '');
      });
    });

    const search = $('[data-blog-search]');
    if (search) {
      search.addEventListener('input', function () {
        render(currentFilter(), search.value);
      });
    }

    render('All', '');
  }

  function renderBlogSidebar() {
    const posts = (win.LS_DATA && win.LS_DATA.blog) || [];
    if (!posts.length) return;

    // categories
    const catList = $('[data-blog-cat]');
    if (catList) {
      const cats = {};
      posts.forEach(function (p) { cats[p.category] = (cats[p.category] || 0) + 1; });
      catList.innerHTML = Object.keys(cats).map(function (c) {
        return '<li><a href="blog.html" data-cat-link="' + esc(c) + '"><i class="bi bi-chevron-right"></i>' + esc(c) + '<span class="count">' + cats[c] + '</span></a></li>';
      }).join('');
      $$('[data-cat-link]', catList).forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          const btn = $('[data-blog-filter][data-filter="' + a.getAttribute('data-cat-link') + '"]');
          if (btn) btn.click();
          const grid = $('[data-blog-grid]');
          if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }

    // tags
    const tagCloud = $('[data-blog-tag]');
    if (tagCloud) {
      const tags = {};
      posts.forEach(function (p) { (p.tags || []).forEach(function (t) { tags[t] = true; }); });
      tagCloud.innerHTML = Object.keys(tags).map(function (t) {
        return '<span class="tag" data-tag="' + esc(t) + '">' + esc(t) + '</span>';
      }).join('');
      $$('[data-tag]', tagCloud).forEach(function (tag) {
        tag.addEventListener('click', function () {
          const search = $('[data-blog-search]');
          if (search) {
            search.value = tag.getAttribute('data-tag');
            search.dispatchEvent(new Event('input'));
            const grid = $('[data-blog-grid]');
            if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }

    // recent posts
    const recent = $('[data-blog-recent]');
    if (recent) {
      recent.innerHTML = posts.slice(0, 3).map(function (p) {
        return '<div class="sidebar-post" data-post="' + esc(p.slug) + '">' +
          '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">' +
          '<div><h4 class="sp-title">' + esc(p.title) + '</h4>' +
          '<span class="sp-date"><i class="bi bi-calendar3"></i> ' + fmtDate(p.date) + '</span></div>' +
        '</div>';
      }).join('');
      $$('[data-post]', recent).forEach(function (item) {
        item.addEventListener('click', function () {
          win.location.href = 'blog-details.html?post=' + item.getAttribute('data-post');
        });
      });
    }
  }

  /* ----------------------------------------------------------------
     Blog details (blog-details.html?post=)
  ---------------------------------------------------------------- */
  function renderBlogDetails() {
    const wrap = $('[data-blog-details]');
    const posts = (win.LS_DATA && win.LS_DATA.blog) || [];
    if (!wrap) return;
    const params = new URLSearchParams(win.location.search);
    const slug = params.get('post') || (posts.length ? posts[0].slug : '');
    const post = posts.find(function (p) { return p.slug === slug; }) || posts[0];

    function contentHTML(block) {
      if (block.type === 'p') return '<p>' + esc(block.text) + '</p>';
      if (block.type === 'h2') return '<h2 id="' + esc(block.id || '') + '">' + esc(block.text) + '</h2>';
      if (block.type === 'h3') return '<h3>' + esc(block.text) + '</h3>';
      if (block.type === 'quote') return '<blockquote><i class="bi bi-quote"></i>' + esc(block.text) + '</blockquote>';
      if (block.type === 'list') {
        return '<ul>' + block.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
      }
      return '';
    }

    const headings = post.content.filter(function (b) { return b.type === 'h2'; });
    const toc = headings.length ? '<div class="article-toc" data-aos="fade-up"><div class="toc-title"><i class="bi bi-list-ul"></i> Table of Contents</div><ol>' +
      headings.map(function (h, i) { return '<li><a href="#' + esc(h.id || 'h-' + i) + '">' + esc(h.text) + '</a></li>'; }).join('') + '</ol></div>' : '';

    const idx = posts.findIndex(function (p) { return p.slug === post.slug; });
    const prev = idx > 0 ? posts[idx - 1] : null;
    const next = idx < posts.length - 1 ? posts[idx + 1] : null;

    let nav = '';
    if (prev || next) {
      nav = '<nav class="article-nav" aria-label="Article navigation">' +
        (prev ? '<a href="blog-details.html?post=' + esc(prev.slug) + '"><span class="an-label"><i class="bi bi-arrow-left"></i> Previous Article</span><span class="an-title">' + esc(prev.title) + '</span></a>' : '<a href="blog.html" style="pointer-events:none"></a>') +
        (next ? '<a href="blog-details.html?post=' + esc(next.slug) + '" class="text-end"><span class="an-label">Next Article <i class="bi bi-arrow-right"></i></span><span class="an-title">' + esc(next.title) + '</span></a>' : '<a href="blog.html" class="text-end" style="pointer-events:none"></a>') +
      '</nav>';
    }

    wrap.innerHTML =
      '<img class="blog-details-cover" src="' + esc(post.image) + '" alt="' + esc(post.title) + '" style="width:100%; border-radius:var(--r-lg); margin-bottom:2rem; box-shadow:var(--shadow-lg);">' +
      '<div class="d-flex align-items-center flex-wrap gap-3 mb-4">' +
        '<img src="' + esc(post.authorImg) + '" alt="' + esc(post.author) + '" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid var(--bg-white);box-shadow:var(--shadow-sm);">' +
        '<div><div class="fw-700" style="color:var(--text-primary)">' + esc(post.author) + '</div>' +
        '<div class="small-muted">' + esc(post.authorRole) + '</div></div>' +
        '<span class="badge-soft ms-auto"><i class="bi bi-calendar3 me-1"></i>' + fmtDate(post.date) + '</span>' +
        '<span class="badge-soft-accent"><i class="bi bi-clock me-1"></i>' + post.reading + ' min read</span>' +
      '</div>' +
      '<div class="article-body" data-aos="fade-up">' +
        post.content.slice(0, 1).map(contentHTML).join('') +
        toc +
        post.content.slice(1).map(contentHTML).join('') +
      '</div>' +
      '<div class="article-tags">' +
        '<span class="tag-label"><i class="bi bi-tags"></i> Tags:</span>' +
        (post.tags || []).map(function (t) { return '<span class="tag" data-detail-tag="' + esc(t) + '">' + esc(t) + '</span>'; }).join('') +
      '</div>' +
      nav;

    $$('[data-detail-tag]', wrap).forEach(function (tag) {
      tag.addEventListener('click', function () {
        win.location.href = 'blog.html';
      });
    });
  }

  /* ----------------------------------------------------------------
     Course details (course-details.html?course=)
  ---------------------------------------------------------------- */
  function renderCourseDetails() {
    const wrap = $('[data-course-details]');
    const courses = (win.LS_DATA && win.LS_DATA.courses) || [];
    const tutors = (win.LS_DATA && win.LS_DATA.tutors) || [];
    if (!wrap) return;
    const params = new URLSearchParams(win.location.search);
    const slug = params.get('course') || (courses.length ? courses[0].slug : '');
    const course = courses.find(function (c) { return c.slug === slug; }) || courses[0];

    doc.title = course.title + ' Classes | LearnSphere Tutoring Centre';

    const instructor = tutors.find(function (t) { return t.subject === course.title; }) || tutors[0];

    const curriculum = course.curriculum.map(function (wk, i) {
      return '<div class="accordion-item">' +
        '<h2 class="accordion-header"><button class="accordion-button ' + (i === 0 ? '' : 'collapsed') + '" type="button" data-bs-toggle="collapse" data-bs-target="#cur-' + i + '" aria-expanded="' + (i === 0 ? 'true' : 'false') + '">' +
          '<span class="me-2" style="color:var(--sp-primary)">' + esc(wk.week) + '</span>' + esc(wk.title) +
        '</button></h2>' +
        '<div id="cur-' + i + '" class="accordion-collapse collapse ' + (i === 0 ? 'show' : '') + '" data-bs-parent="#courseCurriculum">' +
          '<div class="accordion-body"><ul class="list-check">' + wk.items.map(function (it) { return '<li><i class="bi bi-check2"></i><span>' + esc(it) + '</span></li>'; }).join('') + '</ul></div>' +
        '</div>' +
      '</div>';
    }).join('');

    const schedule = course.schedule.map(function (s) {
      return '<tr><td><i class="bi bi-calendar-event me-2" style="color:var(--sp-primary)"></i>' + esc(s.day) + '</td><td>' + esc(s.time) + '</td></tr>';
    }).join('');

    const related = courses.filter(function (c) { return c.slug !== course.slug; }).slice(0, 3).map(courseCardHTML).join('');

    wrap.innerHTML =
      '<div class="row g-4">' +
        '<div class="col-lg-8">' +
          '<div class="card-premium p-4 p-lg-5 mb-4" data-aos="fade-up">' +
            '<img src="' + esc(course.image) + '" alt="' + esc(course.alt || course.title) + '" class="rounded-20 mb-4" style="width:100%;">' +
            '<div class="d-flex flex-wrap align-items-center gap-2 mb-3">' +
              '<span class="subject-chip"><i class="bi bi-book"></i>' + esc(course.title) + '</span>' +
              '<span class="class-badge"><i class="bi bi-mortarboard"></i>' + esc(course.level) + '</span>' +
              '<span class="badge-soft"><i class="bi bi-star-fill me-1"></i>' + course.rating.toFixed(1) + '</span>' +
            '</div>' +
            '<h1 class="h2 mb-3">' + esc(course.title) + ' Coaching</h1>' +
            '<div class="article-body">' + esc(course.desc) + '</div>' +
          '</div>' +

          '<div class="card-premium p-4 p-lg-5 mb-4" data-aos="fade-up">' +
            '<h3 class="mb-3"><i class="bi bi-check2-circle me-2" style="color:var(--sp-teal)"></i>What You Will Learn</h3>' +
            '<ul class="list-check">' + course.outcomes.map(function (o) { return '<li><i class="bi bi-check2"></i><span>' + esc(o) + '</span></li>'; }).join('') + '</ul>' +
          '</div>' +

          '<div class="card-premium p-4 p-lg-5 mb-4" data-aos="fade-up">' +
            '<h3 class="mb-3"><i class="bi bi-journal-check me-2" style="color:var(--sp-primary)"></i>Course Curriculum</h3>' +
            '<div class="accordion accordion-custom" id="courseCurriculum">' + curriculum + '</div>' +
          '</div>' +

          '<div class="card-premium p-4 p-lg-5 mb-4" data-aos="fade-up">' +
            '<h3 class="mb-3"><i class="bi bi-calendar-week me-2" style="color:var(--sp-accent)"></i>Weekly Class Schedule</h3>' +
            '<div class="card-tbl-wrap"><table class="table table-clean"><thead><tr><th>Day</th><th>Time</th></tr></thead><tbody>' + schedule + '</tbody></table></div>' +
          '</div>' +

          '<div class="card-premium p-4 p-lg-5 mb-4" data-aos="fade-up">' +
            '<h3 class="mb-3"><i class="bi bi-people me-2" style="color:var(--sp-teal)"></i>Meet Your Instructor</h3>' +
            '<div class="d-flex align-items-center gap-3 flex-wrap">' +
              '<img src="' + esc(instructor.img) + '" alt="' + esc(instructor.name) + '" style="width:76px;height:76px;border-radius:50%;object-fit:cover;box-shadow:var(--shadow-md);">' +
              '<div class="flex-grow-1"><div class="fw-800" style="color:var(--text-primary)">' + esc(instructor.name) + '</div>' +
              '<div class="text-primary-brand fw-700">' + esc(instructor.subject) + ' Expert</div>' +
              '<div class="small-muted"><i class="bi bi-patch-check me-1"></i>' + esc(instructor.qual) + ' · ' + instructor.experience + '+ years experience</div></div>' +
              '<span class="badge-soft"><i class="bi bi-star-fill me-1"></i>' + instructor.rating.toFixed(1) + '</span>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="col-lg-4">' +
          '<div class="sidebar-widget" data-aos="fade-up">' +
            '<h4 class="mb-3 fw-800">Course Fee</h4>' +
            '<div class="pricing-amount mb-3"><span class="currency">Rs.</span><span class="num">' + fmtMoney(course.price) + '</span><span class="period">/month</span></div>' +
            '<ul class="list-check mb-4">' +
              '<li><i class="bi bi-check2"></i><span>Duration: ' + esc(course.duration) + '</span></li>' +
              '<li><i class="bi bi-check2"></i><span>' + course.classes + ' classes / month</span></li>' +
              '<li><i class="bi bi-check2"></i><span>' + course.lessons + ' lessons total</span></li>' +
              '<li><i class="bi bi-check2"></i><span>' + course.students + '+ enrolled students</span></li>' +
              '<li><i class="bi bi-check2"></i><span>Weekly tests & report cards</span></li>' +
              '<li><i class="bi bi-check2"></i><span>Free study materials</span></li>' +
            '</ul>' +
            '<a href="register.html" class="btn btn-gradient btn-lg w-100 mb-3"><i class="bi bi-pencil-square"></i> Enroll Now</a>' +
            '<a href="contact.html" class="btn btn-outline-primary w-100"><i class="bi bi-chat-dots"></i> Book a Free Demo</a>' +
          '</div>' +
          '<div class="sidebar-widget" data-aos="fade-up">' +
            '<div class="d-flex align-items-center gap-3">' +
              '<div class="icon-box icon-gradient"><i class="bi bi-headset"></i></div>' +
              '<div><div class="fw-800" style="color:var(--text-primary)">Need help?</div>' +
              '<div class="small-muted">Call us at <a href="tel:+911141142222" class="fw-700">+91 114 114 2222</a></div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="mt-5">' +
        '<div class="section-header section-header--left mb-4"><span class="eyebrow"><i class="bi bi-grid"></i> More Subjects</span><h2 class="section-title">Explore Related Courses</h2></div>' +
        '<div class="row g-4">' + related + '</div>' +
      '</div>';
  }

  /* ----------------------------------------------------------------
     Pricing toggle
  ---------------------------------------------------------------- */
  function initPricing() {
    const toggle = $('[data-pricing-toggle]');
    if (!toggle) return;
    function apply(plan) {
      $$('[data-pt-option]', toggle).forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-plan') === plan);
      });
      $$('[data-price-monthly]').forEach(function (el) { el.style.display = plan === 'monthly' ? 'inline' : 'none'; });
      $$('[data-price-yearly]').forEach(function (el) { el.style.display = plan === 'yearly' ? 'inline' : 'none'; });
      $$('[data-price-period]').forEach(function (el) { el.textContent = plan === 'monthly' ? '/month' : '/year'; });
    }
    toggle.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-pt-option]');
      if (btn) apply(btn.getAttribute('data-plan'));
    });
    apply('monthly');
  }

  /* ----------------------------------------------------------------
     Countdown (coming-soon)
  ---------------------------------------------------------------- */
  function initCountdown() {
    const el = $('[data-countdown]');
    if (!el) return;
    const target = new Date(el.getAttribute('data-target') || '2026-12-31T00:00:00').getTime();
    const nums = {
      d: $('[data-cd="d"]'),
      h: $('[data-cd="h"]'),
      m: $('[data-cd="m"]'),
      s: $('[data-cd="s"]')
    };
    function tick() {
      let diff = target - Date.now();
      if (diff < 0) diff = 0;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      if (nums.d) nums.d.textContent = String(d).padStart(2, '0');
      if (nums.h) nums.h.textContent = String(h).padStart(2, '0');
      if (nums.m) nums.m.textContent = String(m).padStart(2, '0');
      if (nums.s) nums.s.textContent = String(s).padStart(2, '0');
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ----------------------------------------------------------------
     Forms (contact, newsletter, comment)
  ---------------------------------------------------------------- */
  function setError(input, message) {
    removeClass(input, 'is-valid');
    addClass(input, 'is-invalid');
    const fb = input.closest('.mb-3, .mb-4, .field-wrap, .form-floating, div');
    let tip = fb && fb.querySelector('.field-feedback');
    if (!tip && fb) {
      tip = doc.createElement('div');
      tip.className = 'field-feedback invalid';
      fb.appendChild(tip);
    }
    if (tip) { tip.textContent = message; addClass(tip, 'invalid'); removeClass(tip, 'valid'); }
  }
  function setSuccess(input) {
    removeClass(input, 'is-invalid');
    addClass(input, 'is-valid');
    const fb = input.closest('.mb-3, .mb-4, .field-wrap, .form-floating, div');
    const tip = fb && fb.querySelector('.field-feedback');
    if (tip) tip.textContent = '';
  }
  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function validateField(input) {
    const name = input.getAttribute('name') || input.id || '';
    const value = input.value.trim();
    const required = input.hasAttribute('required');
    let ok = true;
    if (required && !value) { setError(input, 'This field is required.'); ok = false; }
    else if (name.indexOf('email') !== -1 && value && !isEmail(value)) { setError(input, 'Please enter a valid email address.'); ok = false; }
    else if (name.indexOf('phone') !== -1 && value && !/^[+\d][\d\s-]{8,14}$/.test(value)) { setError(input, 'Please enter a valid phone number.'); ok = false; }
    else { setSuccess(input); }
    return ok;
  }

  function bindForm(formSel) {
    const form = $(formSel);
    if (!form) return;
    const submitBtn = form.querySelector('[type="submit"]');
    const success = form.querySelector('[data-form-success]');

    form.querySelectorAll('input, textarea, select').forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () { if (input.classList.contains('is-invalid')) validateField(input); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('input, textarea, select').forEach(function (input) {
        if (!validateField(input)) ok = false;
      });
      if (!ok) return;
      if (submitBtn) {
        addClass(submitBtn, 'is-loading');
        submitBtn.innerHTML = '<span class="btn-spinner"></span> Sending...';
      }
      setTimeout(function () {
        if (submitBtn) {
          removeClass(submitBtn, 'is-loading');
          submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> Message Sent';
          setTimeout(function () {
            submitBtn.innerHTML = submitBtn.getAttribute('data-default') || '<i class="bi bi-send"></i> Send Message';
          }, 3000);
        }
        form.reset();
        form.querySelectorAll('.is-valid, .is-invalid').forEach(function (el) { removeClass(el, 'is-valid'); removeClass(el, 'is-invalid'); });
        if (success) success.style.display = 'block';
      }, 900);
    });
  }

  bindForm('[data-contact-form]');
  bindForm('[data-comment-form]');
  bindForm('[data-newsletter]');
  bindForm('[data-enquiry-form]');

  /* ----------------------------------------------------------------
     Boot
  ---------------------------------------------------------------- */
  function init() {
    renderCourseGrid();
    renderTutorGrid();
    renderTestimonials();
    renderBlog();
    renderBlogSidebar();
    renderBlogDetails();
    renderCourseDetails();
    initPricing();
    initCountdown();
  }

  if (doc.readyState === 'loading') {
    doc.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
