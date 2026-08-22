import os, re

dir_path = r'c:\Users\vv356\Downloads\Tiffin & Meal'

updates = {
    'blog-details-1.html': {
        'author_img': 'assets/images/avatars/author_arjun.jpg',
        'related_imgs': [
            'assets/images/menu/paneer-tikka-masala-roti.png',
            'assets/images/blog/home-cooked-tiffin.jpg'
        ]
    },
    'blog-details-2.html': {
        'author_img': 'assets/images/avatars/author_priya.jpg',
        'related_imgs': [
            'assets/images/menu/dal-makhani-jeera-rice.png',
            'assets/images/menu/special-veg-thali.png'
        ]
    },
    'blog-details-3.html': {
        'author_img': 'assets/images/avatars/author_meera.jpg',
        'related_imgs': [
            'assets/images/menu/hyderabadi-chicken-biryani.png',
            'assets/images/blog/indian-breakfast.jpg'
        ]
    },
    'blog-details-4.html': {
        'author_img': 'assets/images/avatars/author_rahul.jpg',
        'related_imgs': [
            'assets/images/blog/vegetarian-nutrition.jpg',
            'assets/images/menu/chole-kulche.jpg'
        ]
    }
}

for filename, data in updates.items():
    filepath = os.path.join(dir_path, filename)
    if not os.path.exists(filepath):
        print(f"Skipping {filename}, not found.")
        continue
        
    content = open(filepath, 'r', encoding='utf-8').read()
    
    # 1. Update Author Image (find the image inside the Author box)
    # The author box starts with <!-- Author box -->
    def replace_author(match):
        box_content = match.group(0)
        # replace the src of the image that has rounded-circle
        new_box = re.sub(r'(<img[^>]+src=")[^"]+("[^>]*rounded-circle[^>]*>)', r'\g<1>' + data['author_img'] + r'\2', box_content)
        return new_box
        
    content = re.sub(r'<!-- Author box -->.*?</div>\s*</div>\s*</div>', replace_author, content, flags=re.DOTALL)
    
    # 2. Update Related Articles Images
    # The related articles section starts with <!-- Related articles -->
    def replace_related(match):
        box_content = match.group(0)
        # Find all blog-img tags and replace their src sequentially
        imgs = re.finditer(r'(<img[^>]+class="[^"]*blog-img[^"]*"[^>]*src=")[^"]+("[^>]*>)', box_content)
        new_box = box_content
        for i, img_match in enumerate(imgs):
            if i < len(data['related_imgs']):
                old_str = img_match.group(0)
                new_str = img_match.group(1) + data['related_imgs'][i] + img_match.group(2)
                new_box = new_box.replace(old_str, new_str, 1)
        return new_box
        
    content = re.sub(r'<!-- Related articles -->.*?</section>', replace_related, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {filename}")
