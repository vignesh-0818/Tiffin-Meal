import os

css_additions = """
/* ==============================================================
   Custom Mobile Navigation Menu (Replacing Bootstrap Offcanvas)
   ============================================================== */
.custom-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1040;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}
.custom-backdrop.show-custom {
    opacity: 1;
    visibility: visible;
}
body.menu-open-custom {
    overflow: hidden;
}

@media (max-width: 991px) {
    .offcanvas {
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 1050;
        display: flex;
        flex-direction: column;
        max-width: 100%;
        width: 300px !important;
        background-color: #fff;
        background-clip: padding-box;
        outline: 0;
        transition: transform 0.3s ease-in-out, visibility 0.3s ease-in-out !important;
        visibility: hidden;
        box-shadow: 0 0 15px rgba(0,0,0,0.1);
    }
    
    [data-theme="dark"] .offcanvas {
        background-color: #1e2124;
        color: #fff;
        box-shadow: 0 0 15px rgba(0,0,0,0.5);
    }
    
    /* Default LTR (slides from left) */
    .offcanvas-start {
        left: 0;
        border-right: 1px solid rgba(0,0,0,0.05);
        transform: translateX(-100%) !important;
    }
    
    /* RTL support (slides from right) */
    [dir="rtl"] .offcanvas-start {
        left: auto;
        right: 0;
        border-right: none;
        border-left: 1px solid rgba(0,0,0,0.05);
        transform: translateX(100%) !important;
    }

    .offcanvas.show-custom {
        transform: translateX(0) !important;
        visibility: visible !important;
    }

    .offcanvas-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.2rem 1.5rem;
        border-bottom: 1px solid rgba(0,0,0,0.05);
    }
    [data-theme="dark"] .offcanvas-header {
        border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    
    .btn-close {
        background-color: transparent;
        border: none;
        font-size: 1.5rem;
        line-height: 1;
        opacity: 0.5;
        cursor: pointer;
    }
    [data-theme="dark"] .btn-close {
        filter: invert(1) grayscale(100%) brightness(200%);
    }

    .offcanvas-body {
        padding: 1rem 1.5rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
    }

    .offcanvas-body .navbar-nav {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        width: 100%;
        margin-bottom: 1.5rem;
        padding-left: 0;
        list-style: none;
    }

    .offcanvas-body .nav-link {
        padding: 0.75rem 0;
        text-align: left;
        width: 100%;
        display: block;
        color: var(--text-color, #24302A);
        font-weight: 500;
        text-decoration: none;
    }
    [data-theme="dark"] .offcanvas-body .nav-link {
        color: #fff;
    }
    
    [dir="rtl"] .offcanvas-body .nav-link {
        text-align: right;
    }

    .offcanvas-body .nav-actions {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem !important;
        width: 100%;
        margin-top: 1rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(0,0,0,0.05);
    }
    [data-theme="dark"] .offcanvas-body .nav-actions {
        border-top: 1px solid rgba(255,255,255,0.05);
    }
    
    .offcanvas-body .nav-actions .btn {
        flex: 1 1 100%;
        margin-bottom: 0.25rem;
        text-align: center;
    }
    
    .offcanvas-body .nav-actions .theme-toggle-btn,
    .offcanvas-body .nav-actions .rtl-toggle-btn {
        flex: 0 0 auto;
        margin-bottom: 0.5rem;
    }
}
"""

with open(r'c:\Users\vv356\Downloads\Tiffin & Meal\css\style.css', 'a', encoding='utf-8') as f:
    f.write(css_additions)
print("CSS injected")
