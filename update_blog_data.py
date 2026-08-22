import os

js_path = r'c:\Users\vv356\Downloads\Tiffin & Meal\js\blog-data.js'
content = open(js_path, 'r', encoding='utf-8').read()

content = content.replace('author: "Arjun Mehta",', 'author: "Arjun Mehta",\n    authorImage: "assets/images/avatars/author_arjun.jpg",')
content = content.replace('author: "Priya Sharma",', 'author: "Priya Sharma",\n    authorImage: "assets/images/avatars/author_priya.jpg",')
content = content.replace('author: "Dr. Meera Patel",', 'author: "Dr. Meera Patel",\n    authorImage: "assets/images/avatars/author_meera.jpg",')
content = content.replace('author: "Rahul Verma",', 'author: "Rahul Verma",\n    authorImage: "assets/images/avatars/author_rahul.jpg",')

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated blog-data.js')
