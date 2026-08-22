const fs = require('fs');
const file = 'c:/Users/vv356/Downloads/Tiffin & Meal/customer-dashboard.html';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('<button class="btn btn-primary mt-2">Select Meals</button>', '<button class="btn btn-primary mt-2" onclick="window.location.href=\'menu.html\'">Select Meals</button>');

fs.writeFileSync(file, content);
console.log('Fixed button');
