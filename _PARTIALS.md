# SparklePro — Shared Partials & Page Authoring Guide

Use this reference for EVERY page you create. Copy the exact markup blocks below.
Do not invent new classes. Use only the CSS classes already defined in `assets/css/style.css` and the components described in this guide.

## Global conventions
- Language: `en`, root `<html lang="en" dir="ltr">` (RTL is applied at runtime via JS `assets/js/rtl.js`).
- All images live under `assets/images/` and are WebP. Reuse the exact filenames listed below.
- Dark mode is applied automatically via `html[data-theme="dark"]` (toggled by `assets/js/darkmode.js`). You never toggle it manually; just use standard classes.
- Add `data-aos="fade-up"` (and `data-aos-delay="100/200/300"`) to reveal-on-scroll blocks.
- Use Bootstrap 5.3 grid: `container`, `row g-4`, `col-*`.
- Real, professional copy only. NO lorem ipsum, NO placeholder text, NO placeholder images.
- Buttons: `.btn .btn-primary`, `.btn-outline-primary`, `.btn-accent`, `.btn-white`, `.btn-lg`. Icons via Bootstrap Icons `<i class="bi bi-...">`.

## Shared <head> (copy exactly, change {TITLE}, {DESC}, {PAGE}, {IMAGE})

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{TITLE} | SparklePro — Cleaning Services</title>
<meta name="description" content="{DESC}">
<meta name="keywords" content="home cleaning, professional cleaners, deep cleaning, office cleaning, SparklePro">
<meta name="author" content="SparklePro">
<link rel="canonical" href="https://www.sparklepro.com/{PAGE}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="SparklePro">
<meta property="og:title" content="{TITLE}">
<meta property="og:description" content="{DESC}">
<meta property="og:image" content="https://www.sparklepro.com/{IMAGE}">
<meta property="og:url" content="https://www.sparklepro.com/{PAGE}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{TITLE}">
<meta name="twitter:description" content="{DESC}">
<meta name="twitter:image" content="https://www.sparklepro.com/{IMAGE}">
<link rel="icon" type="image/webp" href="assets/images/logo/logo-main.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/dark.css">
<link rel="stylesheet" href="assets/css/rtl.css">
<link rel="stylesheet" href="assets/css/responsive.css">
```

## Topbar (inner pages only — place before navbar)

```html
<div class="topbar d-none d-lg-block">
  <div class="container d-flex align-items-center justify-content-between">
    <div class="d-flex align-items-center gap-4">
      <span><i class="bi bi-telephone me-1"></i><a href="tel:+15550123456">+1 (555) 012-3456</a></span>
      <span><i class="bi bi-envelope me-1"></i><a href="mailto:hello@sparklepro.com">hello@sparklepro.com</a></span>
    </div>
    <div class="topbar-right">
      <span><i class="bi bi-clock me-1"></i>Mon–Sat: 8:00 AM – 8:00 PM</span>
      <a href="login.html"><i class="bi bi-person me-1"></i>Customer Login</a>
    </div>
  </div>
</div>
```

## Navbar (copy EXACTLY for all pages; set active class on current page link)

```html
<nav class="navbar navbar-expand-lg navbar-scrolled sticky-top" aria-label="Main navigation">
  <div class="container">
    <a class="navbar-brand" href="index.html">
      <span class="brand-logo"><img src="assets/images/logo/logo-main.webp" alt="SparklePro logo" width="44" height="44"></span>
      <span class="brand-text">Sparkle<span class="text-gradient">Pro</span></span>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation"><i class="bi bi-list fs-4"></i></button>
    <div class="collapse navbar-collapse" id="mainNav">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Home</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="index.html"><i class="bi bi-house-heart"></i>Home Cleaning</a></li>
            <li><a class="dropdown-item" href="home-cleaning.html"><i class="bi bi-buildings"></i>Commercial Cleaning</a></li>
          </ul>
        </li>
        <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="services.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">Services</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="service-details.html?s=residential"><i class="bi bi-house-heart"></i>Residential Cleaning</a></li>
            <li><a class="dropdown-item" href="service-details.html?s=apartment"><i class="bi bi-buildings"></i>Apartment Cleaning</a></li>
            <li><a class="dropdown-item" href="service-details.html?s=deep"><i class="bi bi-stars"></i>Deep Cleaning</a></li>
            <li><a class="dropdown-item" href="service-details.html?s=office"><i class="bi bi-briefcase"></i>Office Cleaning</a></li>
            <li><a class="dropdown-item" href="service-details.html?s=window"><i class="bi bi-window"></i>Window Cleaning</a></li>
            <li><a class="dropdown-item" href="service-details.html?s=carpet"><i class="bi bi-layers"></i>Carpet Cleaning</a></li>
            <li><a class="dropdown-item" href="services.html"><i class="bi bi-grid-3x3-gap"></i>All Services</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Pages</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="pricing.html"><i class="bi bi-tags"></i>Pricing Plans</a></li>
            <li><a class="dropdown-item" href="booking.html"><i class="bi bi-calendar-check"></i>Book Now</a></li>
            <li><a class="dropdown-item" href="gallery.html"><i class="bi bi-images"></i>Gallery</a></li>
            <li><a class="dropdown-item" href="team.html"><i class="bi bi-people"></i>Our Team</a></li>
            <li><a class="dropdown-item" href="testimonials.html"><i class="bi bi-chat-quote"></i>Testimonials</a></li>
            <li><a class="dropdown-item" href="faq.html"><i class="bi bi-question-circle"></i>FAQ</a></li>
            <li><a class="dropdown-item" href="careers.html"><i class="bi bi-briefcase"></i>Careers</a></li>
            <li><a class="dropdown-item" href="customer-dashboard.html"><i class="bi bi-person-circle"></i>My Dashboard</a></li>
            <li><a class="dropdown-item" href="admin/dashboard.html"><i class="bi bi-speedometer2"></i>Admin Panel</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="blog.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">Blog</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="blog.html"><i class="bi bi-newspaper"></i>Blog Listing</a></li>
            <li><a class="dropdown-item" href="blog-details-1.html"><i class="bi bi-file-text"></i>Home Cleaning Tips</a></li>
            <li><a class="dropdown-item" href="blog-details-2.html"><i class="bi bi-file-text"></i>Deep Cleaning & Air</a></li>
            <li><a class="dropdown-item" href="blog-details-3.html"><i class="bi bi-file-text"></i>Kitchen Checklist</a></li>
            <li><a class="dropdown-item" href="blog-details-4.html"><i class="bi bi-file-text"></i>Move-Out Guide</a></li>
          </ul>
        </li>
        <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
      </ul>
      <div class="nav-actions">
        <button class="nav-toggle" data-theme-toggle aria-label="Toggle dark mode" title="Toggle dark mode"><i class="bi bi-sun" data-icon-light></i><i class="bi bi-moon-stars d-none" data-icon-dark></i></button>
        <button class="nav-toggle" data-dir-toggle aria-label="Toggle RTL layout" title="Toggle RTL"><i class="bi bi-text-right" data-icon-ltr></i><i class="bi bi-text-left d-none" data-icon-rtl></i></button>
        <a href="booking.html" class="btn btn-primary d-none d-lg-inline-flex"><i class="bi bi-calendar-check"></i> Book Now</a>
      </div>
    </div>
  </div>
</nav>
```

## Page header (inner pages — breadcrumb)

```html
<header class="page-header">
  <div class="container">
    <span class="eyebrow"><i class="bi bi-{icon}"></i> {eyebrow text}</span>
    <h1>{Page title}</h1>
    <p class="page-header-sub">{one-line intro}</p>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html"><i class="bi bi-house"></i> Home</a></li>
        <li class="breadcrumb-item"><a href="{parent}">{parent}</a></li>
        <li class="breadcrumb-item active" aria-current="page">{current}</li>
      </ol>
    </nav>
  </div>
</header>
```

## Section scaffolding

```html
<section class="section" id="{id}">
  <div class="container">
    <div class="section-header" data-aos="fade-up">
      <span class="eyebrow"><i class="bi bi-stars"></i> {eyebrow}</span>
      <h2 class="section-title text-balance">{Heading with <span class="text-gradient">highlight</span>}</h2>
      <p>{subtitle}</p>
    </div>
    <div class="row g-4">... content ...</div>
  </div>
</section>
```

Alternate section backgrounds: `class="section bg-soft"`, `class="section bg-gradient-soft"`.

## Footer (copy EXACTLY, same on all pages)

```html
<footer class="footer">
  <div class="container">
    <div class="footer-top">
      <div class="row g-5">
        <div class="col-lg-4 col-md-6">
          <a class="footer-brand" href="index.html"><span class="brand-logo"><img src="assets/images/logo/logo-main.webp" alt="SparklePro logo" width="46" height="46"></span><span>SparklePro</span></a>
          <p class="footer-about">Premium home &amp; commercial cleaning since 2014. Vetted cleaners, eco-friendly products and a 100% satisfaction guarantee on every visit.</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" aria-label="X (Twitter)"><i class="bi bi-twitter-x"></i></a>
            <a href="#" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
        <div class="col-lg-2 col-md-6">
          <h5>Quick Links</h5>
          <ul class="footer-links">
            <li><a href="about.html"><i class="bi bi-chevron-right"></i>About Us</a></li>
            <li><a href="services.html"><i class="bi bi-chevron-right"></i>Our Services</a></li>
            <li><a href="pricing.html"><i class="bi bi-chevron-right"></i>Pricing Plans</a></li>
            <li><a href="team.html"><i class="bi bi-chevron-right"></i>Our Team</a></li>
            <li><a href="blog.html"><i class="bi bi-chevron-right"></i>Blog</a></li>
            <li><a href="careers.html"><i class="bi bi-chevron-right"></i>Careers</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-6">
          <h5>Top Services</h5>
          <ul class="footer-links">
            <li><a href="service-details.html?s=deep"><i class="bi bi-chevron-right"></i>Deep Cleaning</a></li>
            <li><a href="service-details.html?s=moveout"><i class="bi bi-chevron-right"></i>Move-Out Cleaning</a></li>
            <li><a href="service-details.html?s=office"><i class="bi bi-chevron-right"></i>Office Cleaning</a></li>
            <li><a href="service-details.html?s=carpet"><i class="bi bi-chevron-right"></i>Carpet Cleaning</a></li>
            <li><a href="service-details.html?s=window"><i class="bi bi-chevron-right"></i>Window Cleaning</a></li>
            <li><a href="service-details.html?s=disinfection"><i class="bi bi-chevron-right"></i>Disinfection</a></li>
          </ul>
        </div>
        <div class="col-lg-4 col-md-6">
          <h5>Contact &amp; Hours</h5>
          <ul class="footer-contact list-unstyled">
            <li><i class="bi bi-geo-alt"></i><span>221 Sparkle Avenue, Riverside, CA 92501</span></li>
            <li><i class="bi bi-telephone"></i><a href="tel:+15550123456">+1 (555) 012-3456</a></li>
            <li><i class="bi bi-envelope"></i><a href="mailto:hello@sparklepro.com">hello@sparklepro.com</a></li>
          </ul>
          <ul class="footer-hours">
            <li><span class="day">Monday – Friday</span><span class="time">8:00 AM – 8:00 PM</span></li>
            <li><span class="day">Saturday</span><span class="time">8:00 AM – 6:00 PM</span></li>
            <li><span class="day">Sunday</span><span class="time closed">Closed</span></li>
          </ul>
        </div>
      </div>
      <hr class="section-divider my-4 opacity-25">
      <div class="footer-newsletter">
        <div class="row align-items-center g-3">
          <div class="col-lg-6"><h5 class="mb-1">Get Cleaning Tips &amp; Offers</h5><p class="mb-0 small">Subscribe for seasonal checklists and exclusive discounts.</p></div>
          <div class="col-lg-6">
            <form id="newsletterFormFooter" class="input-group" novalidate>
              <label class="visually-hidden" for="footerEmail">Email address</label>
              <input type="email" class="form-control" id="footerEmail" placeholder="Your email address" required>
              <button type="submit" class="btn btn-primary" aria-label="Subscribe" data-loading="…"><i class="bi bi-send"></i></button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="row align-items-center g-3">
        <div class="col-md-6">© <span class="year-now">2026</span> SparklePro. All rights reserved.</div>
        <div class="col-md-6 text-md-end">
          <div class="fb-links">
            <a href="faq.html">FAQ</a><a href="contact.html">Contact</a><a href="login.html">Login</a><a href="404.html">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
```

## Closing scripts (copy EXACTLY before </body>)

```html
<!-- Back to top -->
<button class="back-to-top" aria-label="Back to top"><i class="bi bi-arrow-up"></i></button>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/purecounterjs@1.2.1/dist/purecounter_vanilla.js" defer></script>
<script src="assets/js/darkmode.js" defer></script>
<script src="assets/js/rtl.js" defer></script>
<script src="assets/js/main.js" defer></script>
```

## Available image library (exact paths)
- Hero: `assets/images/hero/hero-cleaning.webp`, `assets/images/hero/hero-commercial.webp`, `assets/images/hero/hero-about.webp`
- Services (use for service cards / details):
  - `assets/images/services/residential-cleaning.webp`, `apartment-cleaning.webp`, `deep-cleaning.webp`, `move-in-cleaning.webp`, `move-out-cleaning.webp`, `office-cleaning.webp`, `kitchen-cleaning.webp`, `bathroom-cleaning.webp`, `window-cleaning.webp`, `carpet-cleaning.webp`, `sofa-cleaning.webp`, `mattress-cleaning.webp`, `post-construction-cleaning.webp`, `disinfection.webp`, `eco-cleaning.webp`
- Gallery: `assets/images/gallery/gallery-living-room.webp`, `gallery-kitchen.webp`, `gallery-bathroom.webp`, `gallery-bedroom.webp`, `gallery-office.webp`, `gallery-window.webp`, `gallery-carpet.webp`, `gallery-apartment.webp`, `gallery-balcony.webp`, `gallery-lobby.webp`, `gallery-staircase.webp`, `gallery-storefront.webp`
- Team: `assets/images/team/team-01.webp` … `team-08.webp`
- Testimonial avatars: `assets/images/testimonials/customer-01.webp` … `customer-06.webp`
- Admin/dash avatars: `assets/images/avatars/avatar-01.webp` … `avatar-08.webp`
- Blog: `assets/images/blog/blog-home-cleaning-tips.webp`, `blog-deep-cleaning.webp`, `blog-kitchen-checklist.webp`, `blog-move-out-guide.webp`
- About: `assets/images/about/about-story.webp`, `about-mission.webp`, `about-certificate.webp`
- Pricing: `assets/images/pricing/pricing-starter.webp`, `pricing-standard.webp`, `pricing-premium.webp`
- FAQ: `assets/images/faq/faq-help.webp` — Contact: `assets/images/contact/contact-us.webp`
- Maintenance: `assets/images/maintenance/maintenance.webp` — 404: `assets/images/404/error-404.webp`
- Dashboard: `assets/images/dashboard/dashboard-welcome.webp` — Logo: `assets/images/logo/logo-main.webp`, `logo-dark.webp`

## Reusable component classes (from style.css)
- Cards: `card-premium`, `service-card`, `service-icon-card`, `blog-card`, `team-card`, `testimonial-card`, `pricing-card`, `counter-card`, `sidebar-widget`
- Icons: `icon-box`, `icon-box-sm`, `icon-box-lg` + `icon-blue`, `icon-accent`, `icon-teal`, `icon-gold`, `icon-pink`, `icon-gradient`
- Headings: `section-header`, `section-title`, `eyebrow` (+ `eyebrow-accent`, `eyebrow-teal`, `eyebrow-gold`)
- Lists: `list-check`, `list-dot`
- Badges: `badge-soft`, `badge-soft-accent`, `badge-soft-teal`, `badge-soft-gold`, `badge-soft-red`, `badge-soft-green`
- Timeline: `timeline` + `timeline-item`, `timeline-icon`, `timeline-date`, `timeline-title`, `timeline-text`
- Accordion: `accordion accordion-custom` (id unique per page)
- Gallery: `gallery-item` + `.gallery-overlay`, `.gallery-zoom`; filter: `filter-bar` + `filter-btn`; items use `glightbox` class
- Pagination: `pagination pagination-custom`
- CTA box: `cta-box` with `cta-content`
- Blog article: `article-body`, `article-toc`, `article-tags`, `article-nav`, `comment-item`
- Stats: `counter-card`, `counter-num`, `.purecounter` spans
- Booking: `booking-step`, `booking-pane`, `addon-card`, `time-slot`, `booking-summary`
- Customer dashboard: `dash-layout`, `dash-sidebar`, `dash-nav`, `stat-card`, `table-clean`, `track-steps`
- Swiper: `swiper swiper-testimonials` / `swiper-services` with `.swiper-pagination` and `.swiper-nav-btn.swiper-btn-prev/.swiper-btn-next`

## Interactive hooks handled by JS
- `#preloader` (required on every page), `.back-to-top` button, `.year-now` spans, `[data-theme-toggle]`, `[data-dir-toggle]`
- Forms with ids `contactForm`, `newsletterForm`, `commentForm`, `careerForm` get validation + loading + success automatically. Give submit buttons `data-loading="Text…"`.
- Booking: `#bookingForm` with `.booking-pane` steps, `.booking-next/.booking-prev` buttons, `.booking-step` progress, `.time-slot` slots, `.addon-card` checkboxes, `#svcSelect`, `#roomSelect`, `#bookingDate`, `#couponInput`, `#couponForm`, summary row ids `sumService/sumRooms/sumDate/sumTime/sumAddons/sumCoupon/sumTotal`.
- Service details dynamic: `service-details.html` reads `?s=slug` and fills `#sdImg, #sdBreadcrumb, #sdTitle, #sdTagline, #sdPrice, #sdDesc, #sdBenefits, #sdChecklist, #sdFaqs, #sdRelated, #sdCtaTitle` automatically. Write the page with these ids.

## Rules checklist
- No horizontal overflow: never set fixed pixel widths wider than the container; use `img-cover`, `object-fit`, aspect-ratio utilities.
- Every `<img>` needs meaningful `alt` text and `loading="lazy"` (hero images can load eagerly).
- Accessible: `aria-label` on icon-only buttons, `label` or `aria-label` on inputs, unique `id`s.
- Admin pages live in `admin/` folder: link assets as `../assets/...` and nav links as `dashboard.html`, etc.
