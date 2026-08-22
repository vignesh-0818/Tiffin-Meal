import os, re
dir_path = r'c:\Users\vv356\Downloads\Tiffin & Meal'

index_path = os.path.join(dir_path, 'index.html')
menu_path = os.path.join(dir_path, 'menu.html')

index_content = open(index_path, 'r', encoding='utf-8').read()
menu_content = open(menu_path, 'r', encoding='utf-8').read()

menu_nav_match = re.search(r'(<!-- ================= NAVBAR ================= -->.*?</nav>)', menu_content, re.DOTALL)
if menu_nav_match:
    menu_nav = menu_nav_match.group(1)
    
    # Fix active state for index.html
    menu_nav = menu_nav.replace('href="menu.html" class="nav-link active"', 'href="menu.html" class="nav-link"')
    menu_nav = menu_nav.replace('href="#" role="button" class="nav-link dropdown-toggle"', 'href="#" role="button" class="nav-link dropdown-toggle active"')
    
    new_index = re.sub(r'(<!-- ================= NAVBAR ================= -->.*?</nav>)', menu_nav, index_content, flags=re.DOTALL)
    
    new_index = re.sub(r'<style>\s*/\*\s*Mobile Navbar Dropdown Fixes\s*\*/.*?</style>', '', new_index, flags=re.DOTALL)
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(new_index)
    print('index.html reverted to offcanvas')
else:
    print('navbar not found in menu.html')
