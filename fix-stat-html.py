import re

with open('admin-dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

def replace_stat(match):
    icon_div = match.group(1)
    stat_info = match.group(2)
    
    # Extract p and h3
    p_match = re.search(r'<p.*?>.*?</p>', stat_info, re.DOTALL)
    h3_match = re.search(r'<h3.*?>.*?</h3>', stat_info, re.DOTALL)
    
    if not p_match or not h3_match:
        return match.group(0)
    
    p_tag = p_match.group(0)
    h3_tag = h3_match.group(0)
    
    new_html = f'''<div class="stat-card-dashboard m-0" style="display: flex; flex-direction: column; align-items: flex-start !important; gap: 8px !important;">
{p_tag}
<div style="display: flex; align-items: center; gap: 12px;">
{icon_div}
{h3_tag}
</div>
</div>'''
    return new_html

new_content = re.sub(
    r'<div class="stat-card-dashboard m-0">\s*(<div class="stat-icon flex-shrink-0" .*?</div>)\s*(<div class="stat-info">\s*<p.*?</p>\s*<h3.*?</h3>\s*</div>)\s*</div>',
    replace_stat,
    content,
    flags=re.DOTALL
)

with open('admin-dashboard.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated admin-dashboard.html")
