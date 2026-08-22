import os, re
dir_path = r'c:\Users\vv356\Downloads\Tiffin & Meal'

html_files = [f for f in os.listdir(dir_path) if f.endswith('.html')]
modified = 0

for f in html_files:
    file_path = os.path.join(dir_path, f)
    content = open(file_path, 'r', encoding='utf-8').read()
    
    # Remove data-bs-toggle='offcanvas' and data-bs-target from navbar-toggler
    new_content = re.sub(r'(<button[^>]*class="[^"]*navbar-toggler[^"]*"[^>]*?)\s*data-bs-toggle="offcanvas"', r'\1', content)
    new_content = re.sub(r'(<button[^>]*class="[^"]*navbar-toggler[^"]*"[^>]*?)\s*data-bs-target="#offcanvasNavbar"', r'\1', new_content)
    
    # Remove aria-controls to be completely clean
    new_content = re.sub(r'(<button[^>]*class="[^"]*navbar-toggler[^"]*"[^>]*?)\s*aria-controls="offcanvasNavbar"', r'\1', new_content)

    # Also remove data-bs-dismiss='offcanvas' from close button
    new_content = re.sub(r'\s*data-bs-dismiss="offcanvas"', '', new_content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(new_content)
        modified += 1

print(f'Removed Bootstrap offcanvas attributes from {modified} HTML files')
