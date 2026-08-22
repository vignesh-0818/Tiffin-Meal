const fs = require('fs');
const path = require('path');

const styleCssPath = 'c:/Users/vv356/Downloads/Tiffin & Meal/css/style.css';
const indexHtmlPath = 'c:/Users/vv356/Downloads/Tiffin & Meal/index.html';
const pricingHtmlPath = 'c:/Users/vv356/Downloads/Tiffin & Meal/pricing.html';

// 1. Add .cta-light-bg to style.css
let styleCss = fs.readFileSync(styleCssPath, 'utf8');
if (!styleCss.includes('.cta-light-bg')) {
    const cssToAdd = `
/* Light Warm CTA Background */
.cta-light-bg {
    background-color: #FFFDF7;
}
body.dark-mode .cta-light-bg {
    background-color: var(--bg-secondary) !important;
}
`;
    // Insert before the dark mode block or at the end
    styleCss += cssToAdd;
    fs.writeFileSync(styleCssPath, styleCss);
    console.log('Updated style.css with .cta-light-bg');
}

// 2. Update index.html
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
indexHtml = indexHtml.replace(
    /<section class="py-4 py-md-5" style="background:#FFFDF7;color:#24302A;text-align:center;">/g,
    '<section class="py-4 py-md-5 cta-light-bg" style="color:#24302A;text-align:center;">'
);
fs.writeFileSync(indexHtmlPath, indexHtml);
console.log('Updated index.html');

// 3. Update pricing.html
let pricingHtml = fs.readFileSync(pricingHtmlPath, 'utf8');
pricingHtml = pricingHtml.replace(
    /<section class="py-4 py-md-5" style="background:#FFFDF7;color:#24302A;text-align:center;">/g,
    '<section class="py-4 py-md-5 cta-light-bg" style="color:#24302A;text-align:center;">'
);
fs.writeFileSync(pricingHtmlPath, pricingHtml);
console.log('Updated pricing.html');
