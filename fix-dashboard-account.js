const fs = require('fs');

const adminHtmlPath = 'c:/Users/vv356/Downloads/Tiffin & Meal/admin-dashboard.html';
let adminHtml = fs.readFileSync(adminHtmlPath, 'utf8');

// 1. Remove the entire "Account" section from the Admin Dashboard Settings page
const accountStartString = '<!-- Account -->';
let accountStart = adminHtml.indexOf(accountStartString);

if (accountStart !== -1) {
    // Find the end of the section by looking for the closing div of dashboard-card mt-4
    // Or just look for </section> which is right after it
    let sectionEnd = adminHtml.indexOf('</section>', accountStart);
    if (sectionEnd !== -1) {
        adminHtml = adminHtml.substring(0, accountStart) + adminHtml.substring(sectionEnd);
    }
}

// 2. Fix the 6 statistic icons alignment
// The issue was likely due to bloated inline styles causing conflicts, or flex-shrink not taking effect correctly inside the inline string.
// We will extract ONLY the background and color from the inline style, and rely on the robust dashboard.css (.stat-icon) for exactly 50x50 perfect squares with flex-shrink: 0.

let statsGridStart = adminHtml.indexOf('<div class="stats-grid row">');
let statsGridEnd = adminHtml.indexOf('</section>', statsGridStart);

if (statsGridStart !== -1 && statsGridEnd !== -1) {
    let statsSection = adminHtml.substring(statsGridStart, statsGridEnd);
    
    // Replace the messy inline styles with just background and color
    statsSection = statsSection.replace(/class="stat-icon" style="([^"]*)"/g, (match, styleString) => {
        let bgMatch = styleString.match(/background:\s*([^;]+);/);
        let colorMatch = styleString.match(/color:\s*([^;]+);/);
        
        let bg = bgMatch ? bgMatch[1] : '';
        let color = colorMatch ? colorMatch[1] : '';
        
        return `class="stat-icon flex-shrink-0" style="background:${bg}; color:${color};"`;
    });
    
    // Also clean up the dashboard-card inline styles just in case
    statsSection = statsSection.replace(/class="dashboard-card stat-card-dashboard h-100 m-0 d-flex align-items-center" style="flex-direction: row; gap: 1rem;"/g, 'class="dashboard-card stat-card-dashboard h-100 m-0"');
    
    adminHtml = adminHtml.substring(0, statsGridStart) + statsSection + adminHtml.substring(statsGridEnd);
}

fs.writeFileSync(adminHtmlPath, adminHtml);
console.log('Fixed admin-dashboard.html');
