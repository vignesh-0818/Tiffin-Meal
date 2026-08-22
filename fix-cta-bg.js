const fs = require('fs');
const files = [
  'c:/Users/vv356/Downloads/Tiffin & Meal/index.html',
  'c:/Users/vv356/Downloads/Tiffin & Meal/pricing.html'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/style="background:#FFF7E6;color:#24302A;text-align:center;"/g, 'style="background:#FFFDF7;color:#24302A;text-align:center;"');
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
