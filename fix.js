const fs = require('fs');
const file = 'c:/Users/vv356/Downloads/Tiffin & Meal/customer-dashboard.html';
let content = fs.readFileSync(file, 'utf8');

const fix = `<div class="stat-info">
<span class="stat-label">Today's Meal</span>
<span class="stat-value">--</span>
</div>
</div>
</div>
</section>

<!-- Weekly Menu Section -->

<!-- Subscription Section -->

<!-- Meal Preferences Section -->
`;

content = content.replace(/<!-- Delivery Section -->/, fix + '\n<!-- Delivery Section -->');
fs.writeFileSync(file, content);
console.log('Fixed');
