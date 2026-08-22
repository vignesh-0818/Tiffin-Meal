const fs = require('fs');
const filePath = 'c:/Users/vv356/Downloads/Tiffin & Meal/js/admin-dashboard.js';
let content = fs.readFileSync(filePath, 'utf8');

const badStart = content.indexOf('function replyMessage(id) {');
const nextGoodPart = content.indexOf('function filterSubscriptions');

if (badStart !== -1 && nextGoodPart !== -1) {
    const fixedContent = `function replyMessage(id) {
    showNotification('Reply sent! (Demo)', 'success');
}

// ============================================
// SUBSCRIPTIONS
// ============================================
function loadAdminSubscriptions() {
    const tbody = document.getElementById('subscriptions-table-body');
    if (!tbody) return;
    
    let users = getUsers();
    let hasPaused = users.some(u => u.role === 'customer' && u.subscription && u.subscription.status === 'paused');
    let hasCancelled = users.some(u => u.role === 'customer' && u.subscription && u.subscription.status === 'cancelled');

    if (!hasPaused || !hasCancelled) {
        if (!hasPaused) {
            users.push({
                id: 'cust_paused_demo',
                role: 'customer',
                name: 'Anjali Desai',
                email: 'anjali@demo.com',
                phone: '9876543111',
                profileImage: 'https://ui-avatars.com/api/?name=Anjali+Desai&background=f39c12&color=fff&size=200',
                createdAt: new Date().toISOString(),
                subscription: { plan: 'Diet Plan', price: 1299, status: 'paused', renewalDate: 'Paused' }
            });
        }
        if (!hasCancelled) {
            users.push({
                id: 'cust_cancelled_demo',
                role: 'customer',
                name: 'Karan Mehta',
                email: 'karan@demo.com',
                phone: '9876543000',
                profileImage: 'https://ui-avatars.com/api/?name=Karan+Mehta&background=dc3545&color=fff&size=200',
                createdAt: new Date().toISOString(),
                subscription: { plan: 'Combo Plan', price: 2499, status: 'cancelled', renewalDate: 'Cancelled' }
            });
        }
        saveUsers(users);
    }
    
    const subUsers = users.filter(u => u.role === 'customer' && u.subscription);
    
    if (subUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center" style="padding:2rem;color:var(--text-secondary);">No subscriptions found</td></tr>';
        return;
    }
    
    tbody.innerHTML = subUsers.map(u => \`
        <tr>
            <td>\${u.name}</td>
            <td>\${u.subscription.plan}</td>
            <td>₹\${u.subscription.price}/mo</td>
            <td><span class="status-badge \${u.subscription.status}">\${u.subscription.status.charAt(0).toUpperCase() + u.subscription.status.slice(1)}</span></td>
            <td>\${u.subscription.renewalDate}</td>
            <td>
                <button class="action-btn primary btn-sm" onclick="showNotification('Subscription details - Demo', 'info')"><i class="fas fa-eye"></i></button>
            </td>
        </tr>
    \`).join('');
}

`;

    content = content.substring(0, badStart) + fixedContent + content.substring(nextGoodPart);
    fs.writeFileSync(filePath, content);
    console.log('Fixed syntax error in admin-dashboard.js');
} else {
    console.log('Could not find markers to fix admin-dashboard.js');
}
