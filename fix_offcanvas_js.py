import os

js_additions = """
document.addEventListener('DOMContentLoaded', () => {
    // Close offcanvas mobile menu on link click
    const offcanvasLinks = document.querySelectorAll('#offcanvasNavbar .nav-link:not(.dropdown-toggle)');
    offcanvasLinks.forEach(link => {
        link.addEventListener('click', () => {
            const offcanvasElement = document.getElementById('offcanvasNavbar');
            if (offcanvasElement && offcanvasElement.classList.contains('show')) {
                if (typeof bootstrap !== 'undefined' && bootstrap.Offcanvas) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                    if (bsOffcanvas) bsOffcanvas.hide();
                }
            }
        });
    });
});
"""

with open(r'c:\Users\vv356\Downloads\Tiffin & Meal\js\main.js', 'a', encoding='utf-8') as f:
    f.write(js_additions)

print("Appended offcanvas auto-close logic to main.js")
