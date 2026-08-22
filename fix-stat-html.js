const fs = require('fs');
const filePath = 'c:/Users/vv356/Downloads/Tiffin & Meal/admin-dashboard.html';
let html = fs.readFileSync(filePath, 'utf8');

let statsGridStart = html.indexOf('<div class="stats-grid row">');
let overviewEnd = html.indexOf('</section>', statsGridStart);

if (statsGridStart !== -1 && overviewEnd !== -1) {
    let statsSection = html.substring(statsGridStart, overviewEnd);
    
    // Remove the dashboard-card class, remove h-100 so it doesn't stretch vertically
    statsSection = statsSection.replace(/class="dashboard-card stat-card-dashboard h-100 m-0"/g, 'class="stat-card-dashboard m-0"');
    
    // Just in case it has d-flex align-items-center from earlier
    statsSection = statsSection.replace(/class="dashboard-card stat-card-dashboard h-100 m-0 d-flex align-items-center"/g, 'class="stat-card-dashboard m-0"');
    
    html = html.substring(0, statsGridStart) + statsSection + html.substring(overviewEnd);
    fs.writeFileSync(filePath, html);
    console.log('Fixed HTML wrapper for stat cards');
} else {
    console.log('Could not find stats grid');
}
