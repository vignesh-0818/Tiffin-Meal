import os, re

dir_path = r'c:\Users\vv356\Downloads\Tiffin & Meal'

updates = {
    'blog-details-1.html': 'assets/images/avatars/author_arjun.jpg',
    'blog-details-2.html': 'assets/images/avatars/author_priya.jpg',
    'blog-details-3.html': 'assets/images/avatars/author_meera.jpg',
    'blog-details-4.html': 'assets/images/avatars/author_rahul.jpg'
}

for filename, img_path in updates.items():
    filepath = os.path.join(dir_path, filename)
    if not os.path.exists(filepath): continue
    content = open(filepath, 'r', encoding='utf-8').read()
    
    def replace_author(match):
        box_content = match.group(0)
        # replace any image src in the author box
        new_box = re.sub(r'(<img[^>]+src=")[^"]+("[^>]*>)', r'\g<1>' + img_path + r'\2', box_content)
        return new_box
        
    content = re.sub(r'<!-- Author box -->.*?</div>\s*</div>\s*</div>', replace_author, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f'Fixed author image in {filename}')
