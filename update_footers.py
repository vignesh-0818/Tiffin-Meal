import os, re

dir_path = r'c:\Users\vv356\Downloads\Tiffin & Meal'
index_content = open(os.path.join(dir_path, 'index.html'), 'r', encoding='utf-8').read()

footer_match = re.search(r'(<!-- ================= FOOTER ================= -->\s*<footer.*?>.*?</footer>)', index_content, re.DOTALL)
if not footer_match:
    footer_match = re.search(r'(<footer.*?>.*?</footer>)', index_content, re.DOTALL)

footer_html = footer_match.group(1)

html_files = [f for f in os.listdir(dir_path) if f.endswith('.html') and f != 'index.html']
replaced_files = []

for f in html_files:
    file_path = os.path.join(dir_path, f)
    content = open(file_path, 'r', encoding='utf-8').read()
    
    # Check if file has a footer
    if re.search(r'<footer.*?>.*?</footer>', content, re.DOTALL):
        new_content = re.sub(r'<!--\s*={5,}\s*FOOTER\s*={5,}\s*-->\s*<footer.*?>.*?</footer>', footer_html, content, flags=re.DOTALL)
        if new_content == content:
            new_content = re.sub(r'<footer.*?>.*?</footer>', footer_html, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(new_content)
            replaced_files.append(f)
    elif f == 'coming-soon.html':
        # Append before scripts
        new_content = re.sub(r'(<script src="https://cdn\.jsdelivr\.net/npm/bootstrap)', footer_html + r'\n    \1', content)
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(new_content)
            replaced_files.append(f)

print(f'Successfully updated footers in {len(replaced_files)} files: {replaced_files}')
