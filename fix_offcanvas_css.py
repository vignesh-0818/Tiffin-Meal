import os

css_additions = """
/* Mobile Offcanvas Navigation Fixes */
@media (max-width: 991px) {
    .offcanvas-start {
        width: 300px !important;
        max-width: 100vw !important;
        z-index: 1050 !important;
    }
    
    .offcanvas-backdrop {
        opacity: 0.25 !important;
        z-index: 1045 !important;
    }
    
    .offcanvas-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid rgba(0,0,0,0.05);
    }
    
    [data-theme="dark"] .offcanvas-header {
        border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    
    .offcanvas-body {
        padding: 1rem 1.5rem;
    }
    
    .offcanvas-body .navbar-nav {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
        align-items: flex-start !important;
    }
    
    .offcanvas-body .nav-item {
        width: 100%;
    }
    
    .offcanvas-body .nav-link {
        padding: 0.75rem 0 !important;
        display: block;
        width: 100%;
        text-align: left;
    }
    
    [dir="rtl"] .offcanvas-body .nav-link {
        text-align: right;
    }
    
    .offcanvas-body .nav-actions {
        width: 100%;
        justify-content: flex-start;
        margin-top: 1.5rem !important;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(0,0,0,0.05);
    }
    
    [data-theme="dark"] .offcanvas-body .nav-actions {
        border-top: 1px solid rgba(255,255,255,0.05);
    }
}
"""

with open(r'c:\Users\vv356\Downloads\Tiffin & Meal\css\style.css', 'a', encoding='utf-8') as f:
    f.write(css_additions)

print("Appended offcanvas CSS fixes to style.css")
