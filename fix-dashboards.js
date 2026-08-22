const fs = require('fs');
const path = require('path');

const adminHtmlPath = 'c:/Users/vv356/Downloads/Tiffin & Meal/admin-dashboard.html';
let adminHtml = fs.readFileSync(adminHtmlPath, 'utf8');

// 1. Fix the 6 stat cards in admin-dashboard.html
// Replace col-lg-4 col-md-6 mb-4 with col-lg-3 col-md-6 mb-4 inside the stats-grid
let statsGridStart = adminHtml.indexOf('<div class="stats-grid row">');
let statsGridEnd = adminHtml.indexOf('</section>', statsGridStart);

if (statsGridStart !== -1 && statsGridEnd !== -1) {
    let statsSection = adminHtml.substring(statsGridStart, statsGridEnd);
    
    // Change grid to col-lg-3 (fits 4 items per row on large screens)
    statsSection = statsSection.replace(/col-lg-4 col-md-6/g, 'col-lg-3 col-md-6');
    
    // Add flex-shrink: 0; to the inline styles of all .stat-icon elements to prevent them from squishing
    statsSection = statsSection.replace(/class="stat-icon" style="([^"]*)"/g, 'class="stat-icon" style="$1 flex-shrink: 0;"');
    
    // Enforce d-flex align-items-center on the card just to be completely sure it acts as a row
    statsSection = statsSection.replace(/class="dashboard-card stat-card-dashboard h-100 m-0"/g, 'class="dashboard-card stat-card-dashboard h-100 m-0 d-flex align-items-center" style="flex-direction: row; gap: 1rem;"');
    
    adminHtml = adminHtml.substring(0, statsGridStart) + statsSection + adminHtml.substring(statsGridEnd);
}

// 2. Fix Header Buttons in admin-dashboard.html
// Replace the topbar-right buttons with properly formatted ones
let adminBtnReplaceRegex = /<button class="btn-icon" id="theme-toggle" onclick="toggleTheme\(\)">\s*<i class="fas fa-moon"><\/i>\s*<\/button>\s*<button class="btn-icon" id="rtl-toggle" onclick="toggleRTL\(\)">\s*<i class="fas fa-language"><\/i>\s*<\/button>\s*<button class="btn-icon" onclick="logout\(\)">\s*<i class="fas fa-sign-out-alt"><\/i> Logout\s*<\/button>/g;

let formattedAdminBtns = `
<button class="btn btn-outline-primary btn-sm fw-semibold d-inline-flex align-items-center justify-content-center" id="theme-toggle" onclick="toggleTheme()" style="width: 40px; height: 40px; border-radius: 50%;" title="Toggle Dark Mode">
    <i class="fas fa-moon"></i>
</button>
<button class="btn btn-outline-primary btn-sm fw-semibold d-inline-flex align-items-center justify-content-center" id="rtl-toggle" onclick="toggleRTL()" style="width: 40px; height: 40px; border-radius: 50%;" title="Toggle RTL">
    <i class="fas fa-language"></i>
</button>
<button class="btn btn-primary btn-sm fw-semibold d-inline-flex align-items-center justify-content-center px-3" onclick="logout()" style="height: 40px; border-radius: 20px;">
    <i class="fas fa-sign-out-alt me-2"></i> Logout
</button>
`;

// If regex doesn't match directly, let's just find the block manually
if (!adminBtnReplaceRegex.test(adminHtml)) {
    // Manually replace topbar-right content in admin-dashboard.html
    let topbarRightStart = adminHtml.indexOf('<div class="topbar-right">');
    let themeBtnStart = adminHtml.indexOf('<button class="btn-icon" id="theme-toggle"', topbarRightStart);
    let topbarRightEnd = adminHtml.indexOf('</div>', themeBtnStart);
    
    if (themeBtnStart !== -1) {
        adminHtml = adminHtml.substring(0, themeBtnStart) + formattedAdminBtns + '\n' + adminHtml.substring(topbarRightEnd);
    }
} else {
    adminHtml = adminHtml.replace(adminBtnReplaceRegex, formattedAdminBtns);
}

// Make topbar-right gap larger for better button spacing
adminHtml = adminHtml.replace('<div class="topbar-right">', '<div class="topbar-right" style="display: flex; gap: 0.5rem; align-items: center;">');

fs.writeFileSync(adminHtmlPath, adminHtml);

// 3. Fix Header Buttons in customer-dashboard.html
const custHtmlPath = 'c:/Users/vv356/Downloads/Tiffin & Meal/customer-dashboard.html';
let custHtml = fs.readFileSync(custHtmlPath, 'utf8');

// Remove existing theme/rtl buttons
let custThemeStart = custHtml.indexOf('<button class="theme-toggle btn btn-link text-dark"');
let custThemeEnd = custHtml.indexOf('</button>', custThemeStart) + 9;
let custRtlStart = custHtml.indexOf('<button class="rtl-toggle btn btn-link text-dark"');
let custRtlEnd = custHtml.indexOf('</button>', custRtlStart) + 9;

if (custThemeStart !== -1 && custRtlEnd !== -1) {
    let beforeBtns = custHtml.substring(0, custThemeStart);
    let afterBtns = custHtml.substring(custRtlEnd);
    
    let newCustBtns = `
<button class="theme-toggle btn btn-outline-primary btn-sm fw-semibold d-inline-flex align-items-center justify-content-center" onclick="toggleTheme()" style="width: 40px; height: 40px; border-radius: 50%;" title="Toggle Dark Mode">
    <i class="fas fa-moon"></i>
</button>
<button class="rtl-toggle btn btn-outline-primary btn-sm fw-semibold d-inline-flex align-items-center justify-content-center ms-2" onclick="toggleRTL()" style="width: 40px; height: 40px; border-radius: 50%;" title="Toggle RTL">
    <i class="fas fa-language"></i>
</button>
<button class="btn btn-primary btn-sm fw-semibold d-inline-flex align-items-center justify-content-center px-3 ms-2" onclick="logout()" style="height: 40px; border-radius: 20px;">
    <i class="fas fa-sign-out-alt me-2"></i> Logout
</button>
`;
    
    custHtml = beforeBtns + newCustBtns + afterBtns;
}

fs.writeFileSync(custHtmlPath, custHtml);
console.log("Success");
