import os

js_additions = """
// ==============================================================
// Custom Mobile Navigation Menu (Replacing Bootstrap Offcanvas)
// ==============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Create backdrop element if it doesn't exist
    let backdrop = document.querySelector('.custom-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'custom-backdrop';
        document.body.appendChild(backdrop);
    }

    const offcanvasElements = document.querySelectorAll('.offcanvas');
    const togglers = document.querySelectorAll('.navbar-toggler');
    const closeBtns = document.querySelectorAll('.btn-close');
    const navLinks = document.querySelectorAll('.offcanvas-body .nav-link:not(.dropdown-toggle)');

    function openMenu(menu) {
        if (!menu) return;
        menu.classList.add('show-custom');
        backdrop.classList.add('show-custom');
        document.body.classList.add('menu-open-custom');
    }

    function closeAllMenus() {
        offcanvasElements.forEach(menu => menu.classList.remove('show-custom'));
        backdrop.classList.remove('show-custom');
        document.body.classList.remove('menu-open-custom');
    }

    togglers.forEach(toggler => {
        toggler.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Assume we're targeting the main offcanvasNavbar
            const targetMenu = document.getElementById('offcanvasNavbar');
            if (targetMenu) {
                if (targetMenu.classList.contains('show-custom')) {
                    closeAllMenus();
                } else {
                    openMenu(targetMenu);
                }
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeAllMenus();
        });
    });

    backdrop.addEventListener('click', () => {
        closeAllMenus();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeAllMenus();
        });
    });
});
"""

with open(r'c:\Users\vv356\Downloads\Tiffin & Meal\js\main.js', 'a', encoding='utf-8') as f:
    f.write(js_additions)
print("JS injected")
