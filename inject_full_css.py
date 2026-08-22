import re
css_path = r'c:\Users\vv356\Downloads\Tiffin & Meal\css\style.css'
content = open(css_path, 'r', encoding='utf-8').read()

new_css = """
/* ==============================================================
   Custom Mobile Navigation Menu (Full Screen)
   ============================================================== */
body.menu-open-custom {
    overflow: hidden !important;
}

@media (max-width: 991px) {
    .offcanvas {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        bottom: 0 !important;
        right: 0 !important;
        z-index: 9999 !important;
        display: flex !important;
        flex-direction: column !important;
        width: 100vw !important;
        max-width: 100vw !important;
        height: 100vh !important;
        background-color: #ffffff !important;
        visibility: hidden;
        transform: translateY(-100%) !important;
        transition: transform 0.3s ease-in-out, visibility 0.3s ease-in-out !important;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
    }
    
    .offcanvas.show-custom {
        transform: translateY(0) !important;
        visibility: visible !important;
    }
    
    [data-theme="dark"] .offcanvas {
        background-color: #1e2124 !important;
        color: #ffffff !important;
    }
    
    .offcanvas-header {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 1.5rem 2rem !important;
        border-bottom: 1px solid rgba(0,0,0,0.05) !important;
        background: transparent !important;
    }
    [data-theme="dark"] .offcanvas-header {
        border-bottom: 1px solid rgba(255,255,255,0.05) !important;
    }
    
    .btn-close {
        background-color: transparent !important;
        border: none !important;
        font-size: 1.8rem !important;
        line-height: 1 !important;
        opacity: 0.7 !important;
        cursor: pointer !important;
        padding: 0 !important;
        margin: 0 !important;
    }
    [data-theme="dark"] .btn-close {
        filter: invert(1) grayscale(100%) brightness(200%) !important;
    }

    .offcanvas-body {
        padding: 2rem !important;
        overflow-y: auto !important;
        display: flex !important;
        flex-direction: column !important;
    }

    .offcanvas-body .navbar-nav {
        display: flex !important;
        flex-direction: column !important;
        gap: 1.5rem !important;
        width: 100% !important;
        margin-bottom: 2rem !important;
        padding-left: 0 !important;
        list-style: none !important;
    }

    .offcanvas-body .nav-link {
        padding: 0.5rem 0 !important;
        text-align: left !important;
        font-size: 1.5rem !important;
        width: 100% !important;
        display: block !important;
        color: var(--text-color, #24302A) !important;
        font-weight: 600 !important;
        text-decoration: none !important;
        border: none !important;
    }
    [data-theme="dark"] .offcanvas-body .nav-link {
        color: #ffffff !important;
    }
    
    [dir="rtl"] .offcanvas-body .nav-link {
        text-align: right !important;
    }

    .offcanvas-body .nav-actions {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: wrap !important;
        gap: 1rem !important;
        width: 100% !important;
        margin-top: auto !important;
        padding-top: 2rem !important;
        border-top: 1px solid rgba(0,0,0,0.05) !important;
    }
    [data-theme="dark"] .offcanvas-body .nav-actions {
        border-top: 1px solid rgba(255,255,255,0.05) !important;
    }
    
    .offcanvas-body .nav-actions .btn {
        flex: 1 1 100% !important;
        text-align: center !important;
        padding: 0.8rem !important;
        font-size: 1.1rem !important;
    }
    
    .offcanvas-body .nav-actions .theme-toggle-btn,
    .offcanvas-body .nav-actions .rtl-toggle-btn {
        flex: 0 0 auto !important;
    }
}
"""

new_content = re.sub(r'/\* ==============================================================\s*Custom Mobile Navigation Menu.*?$', new_css, content, flags=re.DOTALL)
with open(css_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Replaced custom CSS')
