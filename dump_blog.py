import os, re
dir_path = r'c:\Users\vv356\Downloads\Tiffin & Meal'

for i in range(1, 5):
    f = f'blog-details-{i}.html'
    content = open(os.path.join(dir_path, f), 'r', encoding='utf-8').read()
    
    print(f'=== {f} ===')
    
    # Author section
    match = re.search(r'<!-- Author box -->(.*?)</div>\s*</div>\s*</div>', content, re.DOTALL)
    if match:
        author_box = match.group(1)
        img = re.search(r'<img[^>]+src="([^"]+)"', author_box)
        name = re.search(r'<h5[^>]*>(.*?)</h5>', author_box)
        print('Author image:', img.group(1) if img else 'None')
        print('Author name:', name.group(1) if name else 'None')
    else:
        print('Author box not found')
        
    # Related articles images
    related = re.findall(r'<!-- Related Article \d+ -->.*?<img[^>]+src="([^"]+)"', content, re.DOTALL)
    print('Related images:', related)
    print('\n')
