import os, re

dir_path = r'c:\Users\vv356\Downloads\Tiffin & Meal'
index_content = open(os.path.join(dir_path, 'index.html'), 'r', encoding='utf-8').read()
footer_match = re.search(r'(<!-- ================= FOOTER ================= -->\s*<footer.*?>.*?</footer>)', index_content, re.DOTALL)
footer_html = footer_match.group(1)

menu_path = os.path.join(dir_path, 'menu.html')
menu_content = open(menu_path, 'r', encoding='utf-8').read()

new_content = re.sub(r'<!-- Footer -->\s*<footer class="bg-dark text-white py-5">.*?<small class="text-light">.*?</small>', footer_html, menu_content, flags=re.DOTALL)

with open(menu_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
    
print("menu.html footer replaced successfully.")
