// Initialize Lucide icons
lucide.createIcons();

// Page Navigation Logic
// Page Navigation Logic
function switchPage(pageId, btnElement) {
    // 1. Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('animate-fade-in');
    });

    // 2. Show target section
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('animate-fade-in');
    }

    // 3. Update active state in Sidebar
    // Clear all active states first
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active-nav', 'bg-hhg-50', 'text-hhg-900');
        item.classList.add('text-gray-600');
    });

    // If btnElement is passed, highlight it
    if (btnElement) {
        btnElement.classList.add('active-nav', 'bg-hhg-50', 'text-hhg-900');
        btnElement.classList.remove('text-gray-600');
    } else {
        // Fallback: try to find the button that triggers this pageId (mostly for parents or direct calls)
        // This is a simple heuristic; for sub-menus, passing 'this' is preferred.
        document.querySelectorAll('.nav-item').forEach(item => {
            const onclick = item.getAttribute('onclick');
            if (onclick && onclick.includes(`'${pageId}'`) && !onclick.includes('toggleMenu')) {
                item.classList.add('active-nav', 'bg-hhg-50', 'text-hhg-900');
                item.classList.remove('text-gray-600');
            }
        });
    }

    // 4. Update Header Title
    const iconMap = {
        'dashboard-overview': '業績儀表板 - 全集團概況',
        'dashboard-channel': '業績儀表板 - 通路細節',
        'dashboard-report': '業績儀表板 - 報表中心',
        'dashboard-analysis': '業績儀表板 - AI 數據解讀',
        'dashboard': '業績儀表板',
        'competitor': '競品追蹤區 - 價格監測',
        'competitor-campaigns': '競品追蹤區 - 活動與分析',
        'competitor-trends': '競品追蹤區 - 市場熱搜',
        'ecommerce-product-list': '電商營運中心 - 商品列表',
        'ecommerce-ai-copy': '電商營運中心 - 文案工作台',
        'ecommerce-campaigns': '電商營運中心 - 活動行事曆',
        'ecommerce': '電商營運中心',
        'work-tasks': '工作管理中心 - 我的任務',
        'work-projects': '工作管理中心 - 專案看板',
        'work-meetings': '工作管理中心 - 會議記錄',
        'work': '工作管理中心',
        'knowledge-base': '知識庫與文件 - 部門知識庫',
        'knowledge-repo': '知識庫與文件 - 文件倉庫',
        'knowledge-templates': '知識庫與文件 - 範本中心',
        'knowledge-feedback': '知識庫與文件 - 查無依據回報',
        'knowledge': '知識庫與文件',
        'approval-pending': '簽核中心 - 待簽核文件',
        'approval-history': '簽核中心 - 已處理文件',
        'approval-new': '簽核中心 - 發起新申請',
        'approval-internal-systems': '簽核與內部系統 - 內部系統',
        'approval': '各部門專區 - 簽核中心',
        'logistics': '各部門專區 - 物流與客服',
        'design-requests': '設計部專區 - 設計需求單',
        'design-assets': '設計部專區 - 素材資產庫',
        'design-guidelines': '設計部專區 - 品牌規範',
        'media-overview': '媒體部專區 - 廣告投放概覽',
        'media-budget': '媒體部專區 - 預算管理',
        'media-reports': '媒體部專區 - 成效報表',
        'finance-pnl': '財務部專區 - 營收損益表',
        'finance-reconciliation': '財務部專區 - 對帳單管理',
        'finance-claims': '財務部專區 - 費用請款',
        'management-overview': '經營管理專區 - 營運戰情室',
        'management-okr': '經營管理專區 - 目標管理',
        'management-hr': '經營管理專區 - 人力資源',
        'notifications': '通知中心',
        'settings': '使用者與權限'
    };

    document.getElementById('pageTitle').innerText = iconMap[pageId] || 'HHG OS';
}

// Sidebar Submenu Toggle
function toggleMenu(menuId, btn) {
    const menu = document.getElementById(menuId);
    if (!menu) return;

    // Toggle hidden class
    menu.classList.toggle('hidden');

    // Rotate arrow
    const arrow = btn.querySelector('.submenu-arrow');
    if (arrow) {
        arrow.classList.toggle('rotate-180');
    }
}

// Role Switching Logic
function switchRole(roleName) {
    document.getElementById('currentRole').innerText = `Role: ${roleName}`;
    document.getElementById('roleDisplay').innerText = `${roleName}視角`;

    // In a real app, this would trigger content filtering or API calls.
    // For now, we can perhaps show a toast or log it.
    console.log(`Switched to role: ${roleName}`);
}

// Toggle AI Assistant
const aiBtn = document.querySelector('button[title="AI 助手"]');
const aiWindow = document.getElementById('aiAssistant');
const closeAiBtn = aiWindow.querySelector('button');

aiBtn.addEventListener('click', () => {
    aiWindow.classList.toggle('hidden');
    aiWindow.classList.toggle('flex');
});

closeAiBtn.addEventListener('click', () => {
    aiWindow.classList.add('hidden');
    aiWindow.classList.remove('flex');
});

// Sidebar Mobile Toggle
const mobileToggle = document.getElementById('mobileSidebarToggle');
const sidebar = document.getElementById('sidebar');

mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
    sidebar.classList.toggle('fixed');
    sidebar.classList.toggle('inset-y-0');
    sidebar.classList.toggle('left-0');
});


// Re-run icons when DOM updates might happen (though in this simple SPA, initial load is enough usually)
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initDashboardChart();
    initCompetitorChart();
});

// --- Dashboard Chart Config ---
let gmvChartInstance = null;
let competitorChartInstance = null;

function initCompetitorChart() {
    const ctx = document.getElementById('competitorChart');
    if (!ctx) return;

    competitorChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Today'],
            datasets: [
                {
                    label: 'Persil',
                    data: [599, 599, 549, 599, 599],
                    borderColor: '#ffc107',
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    tension: 0.1
                },
                {
                    label: 'Ariel',
                    data: [550, 520, 499, 499, 499],
                    borderColor: '#3b82f6', // blue-500
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false } // Custom legend in HTML
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            scales: {
                y: {
                    grid: { color: '#f3f4f6' },
                    suggestedMin: 400
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function initDashboardChart() {
    const ctx = document.getElementById('gmvChart');
    if (!ctx) return;

    gmvChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['01/01', '01/02', '01/03', '01/04', '01/05', '01/06', '01/07', '01/08', '01/09', '01/10'],
            datasets: [{
                label: '每日業績 (GMV)',
                data: [120000, 150000, 180000, 140000, 200000, 220000, 195000, 240000, 280000, 250000],
                borderColor: '#ffc107', // hhg-500
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#ffc107',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#fff',
                    titleColor: '#1f2937',
                    bodyColor: '#1f2937',
                    borderColor: '#f3f4f6',
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'TWD' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9ca3af'
                    }
                },
                y: {
                    grid: {
                        color: '#f3f4f6',
                        borderDash: [5, 5]
                    },
                    ticks: {
                        color: '#9ca3af',
                        callback: function (value) {
                            return '$' + value / 1000 + 'k';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });
}

// --- Ecommerce Logic ---
function fillProductData(name) {
    document.getElementById('aiProductName').value = name;
    document.getElementById('aiProductFeatures').value = "強效去漬, 德國科技, 環保配方"; // Dummy default

    // Highlight effect
    const input = document.getElementById('aiProductName');
    input.classList.add('ring-2', 'ring-hhg-500');
    setTimeout(() => input.classList.remove('ring-2', 'ring-hhg-500'), 500);
}

function generateCopy() {
    const name = document.getElementById('aiProductName').value;
    const platform = document.getElementById('aiPlatform').value;
    const resultArea = document.getElementById('aiResultContent');

    if (!name) {
        alert("請先輸入或選擇商品！");
        return;
    }

    // Loading State
    resultArea.innerHTML = '<div class="flex items-center gap-2 text-hhg-600"><i data-lucide="loader-2" class="animate-spin w-4 h-4"></i> AI 正在撰寫文案中...</div>';

    setTimeout(() => {
        let content = "";

        if (platform === 'momo') {
            content = `【MOMO獨家】${name} \n\n🔥 本月強檔特惠！現貨下殺 $699 起 \n\n✅ 德國百萬家庭首選，深層潔淨不殘留\n✅ 獨家酵素配方，輕鬆瓦解頑強污漬\n✅ 環保省水，溫和不傷手\n\n⏰ 限時 24H 搶購！手慢無！\n👉 立即下單：https://momo.dm/xxxxxx\n\n#HHG #Persil #洗衣神隊友 #MOMO購物網`;
        } else if (platform === 'shopee') {
            content = `⚡️ 蝦皮超品日 | ${name} ⚡️\n\n領券再折 $50 💰 滿額免運送到家！\n\n💡 為什麼選我們？\n⭐ 官方直營，正品保證\n⭐ 快速出貨，不用等\n⭐ 萬人五星好評見證\n\n💬 聊聊領取神秘優惠碼！\n👇 下方連結買起來\nhttps://shopee.tw/product/xxxxxx\n\n#蝦皮購物 #洗衣精 #居家清潔 #限時特賣`;
        } else {
            content = `✨ 讓生活更有質感，從潔淨開始 ✨\n.\n.\n還在為衣服洗不乾淨煩惱嗎？😩\n${name} 帶給你前所未有的潔淨體驗！\n\n🌿 德國科技，深層洗淨\n🌿 呵護衣物，亮麗如新\n\n現在入手，即享新品優惠！😍\n🔗 主頁連結點起來！\n.\n.\n#LifeStyle #HHG #質感生活 #清潔好物 #開箱分享`;
        }

        resultArea.innerText = content;
    }, 1500);
}

// --- Work Management (Kanban) Logic ---
let tasks = [
    { id: 1, title: 'Persil 新年活動 Banner', desc: '需製作官網主視覺、FB 廣告圖尺寸，強調「除菌」與「新年優惠」。', tag: '設計需求', tagColor: 'bg-blue-100 text-blue-700', date: 'Jan 08', user: 'D', userBg: 'bg-purple-500', status: 'todo' },
    { id: 2, title: 'Q1 部門聚餐訂位', desc: '預算每人 $1000，地點：信義區。', tag: '行政', tagColor: 'bg-orange-100 text-orange-700', date: 'Jan 15', user: 'A', userBg: 'bg-gray-500', status: 'todo' },
    { id: 3, title: 'momo 38 女王節提報', desc: '確認各品牌主打品項、毛利結構試算、贈品庫存確認。', tag: '業務', tagColor: 'bg-green-100 text-green-700', date: 'Today', user: 'S', userBg: 'bg-blue-500', status: 'progress' },
    { id: 4, title: '週一週會報表整理', desc: '會議記錄已上傳至 Drive。', tag: '會議', tagColor: 'bg-gray-100 text-gray-600', date: 'Jan 02', user: 'U', userBg: 'bg-gray-400', status: 'done' }
];

function renderKanban() {
    const columns = {
        todo: document.getElementById('kanban-todo'),
        progress: document.getElementById('kanban-progress'),
        done: document.getElementById('kanban-done')
    };

    // Clear existing content
    for (let key in columns) {
        if (columns[key]) columns[key].innerHTML = '';
    }

    tasks.forEach(task => {
        const col = columns[task.status];
        if (!col) return;

        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer mb-3';
        card.draggable = true;
        card.dataset.id = task.id;

        // Add opacity for done items
        if (task.status === 'done') {
            card.classList.add('opacity-75', 'hover:opacity-100');
        } else if (task.status === 'progress') {
            card.classList.add('border-l-4', 'border-hhg-500');
            card.classList.remove('border-gray-200'); // Remove default border if overriding
        }

        // Drag Events
        card.addEventListener('dragstart', handleDragStart);

        const doneStyle = task.status === 'done' ? 'line-through text-gray-600' : 'text-gray-800';

        card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <span class="${task.tagColor} text-[10px] px-2 py-0.5 rounded font-bold">${task.tag}</span>
                <i data-lucide="${task.status === 'done' ? 'check-circle' : 'more-horizontal'}" class="w-4 h-4 ${task.status === 'done' ? 'text-green-500' : 'text-gray-400'} hover:text-gray-600"></i>
            </div>
            <h4 class="font-bold ${doneStyle} text-sm mb-1">${task.title}</h4>
            <p class="text-xs text-gray-500 line-clamp-2">${task.desc || ''}</p>
            <div class="mt-3 flex items-center justify-between">
                <div class="flex -space-x-2">
                    <div class="w-6 h-6 rounded-full ${task.userBg} text-white flex items-center justify-center text-[10px] border border-white shadow-sm">${task.user}</div>
                </div>
                <span class="text-[10px] items-center gap-1 flex ${task.date === 'Today' ? 'text-red-500 font-bold' : 'text-gray-400'}">
                    <i data-lucide="${task.date === 'Today' ? 'clock' : 'calendar'}" class="w-3 h-3"></i> ${task.date}
                </span>
            </div>
        `;
        col.appendChild(card);
    });

    // Re-init icons for new elements
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Drag & Drop Logic
let draggedTaskId = null;

function handleDragStart(e) {
    draggedTaskId = this.dataset.id;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggedTaskId);
    // Optional: Add ghost styling
    this.style.opacity = '0.4';
}

function handleDragOver(e) {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('bg-gray-200'); // Highlight column
}

function handleDragLeave(e) {
    this.classList.remove('bg-gray-200');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('bg-gray-200');

    // Find valid drop target status
    const targetId = this.id; // kanban-todo, kanban-progress, kanban-done
    let newStatus = '';

    if (targetId === 'kanban-todo') newStatus = 'todo';
    if (targetId === 'kanban-progress') newStatus = 'progress';
    if (targetId === 'kanban-done') newStatus = 'done';

    if (newStatus && draggedTaskId) {
        // Update data
        const taskIndex = tasks.findIndex(t => t.id == draggedTaskId);
        if (taskIndex > -1) {
            tasks[taskIndex].status = newStatus;
            renderKanban();
        }
    }
    draggedTaskId = null;
    this.style.opacity = '1'; // Reset
}

// Add listeners to columns
['kanban-todo', 'kanban-progress', 'kanban-done'].forEach(id => {
    const col = document.getElementById(id);
    if (col) {
        col.addEventListener('dragover', handleDragOver);
        col.addEventListener('dragleave', handleDragLeave);
        col.addEventListener('drop', handleDrop);
    }
});

// Init Work
renderKanban();

// Add Task Button Logic
const addTaskBtn = document.getElementById('addTaskBtn');
if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => {
        const newTask = {
            id: tasks.length + 1,
            title: '新任務 ' + (tasks.length + 1),
            desc: '請點擊編輯任務內容...',
            tag: '一般',
            tagColor: 'bg-gray-100 text-gray-600',
            date: 'Today',
            user: 'Me',
            userBg: 'bg-hhg-500',
            status: 'todo'
        };
        tasks.push(newTask);
        renderKanban();
        // Scroll to bottom of todo column
        const todoCol = document.getElementById('kanban-todo');
        setTimeout(() => {
            todoCol.scrollTop = todoCol.scrollHeight;
        }, 100);
    });
}


// --- Knowledge Base Logic ---
function openSopViewer(deptName) {
    // 1. Switch to SOP Viewer Section
    switchPage('sop-viewer');

    // 2. Update Title
    const title = document.getElementById('sopDeptTitle');
    if (title) title.innerText = `${deptName} SOP`;

    // 3. (Optional) Load specific tree data for department
    // In a real app, this would fetch JSON. Here we just show the static mock or toggle content.
    console.log(`Opening SOP for: ${deptName}`);
}


// --- Ecommerce Product Logic (Refactored) ---
const products = [
    { id: 101, name: 'Persil 寶瀅 全效能洗衣凝露 2.5L', stock: 1240, status: 'normal', stockColor: 'text-green-600' },
    { id: 102, name: 'Bref 妙力 懸掛式馬桶球 (海洋)', stock: 850, status: 'normal', stockColor: 'text-gray-600' },
    { id: 103, name: 'Pril 淨麗 小蘇打洗碗精 750ml', stock: 42, status: 'low', stockColor: 'text-red-500' },
    { id: 104, name: 'Combat 威滅 滅蟑隊 6入', stock: 2100, status: 'normal', stockColor: 'text-gray-600' }
];

function renderProducts() {
    const list = document.getElementById('ecommerce-product-list-body');
    if (!list) return;

    list.innerHTML = products.map(p => `
        <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 font-bold text-gray-700">${p.name}</td>
            <td class="px-6 py-4 text-right font-bold ${p.stockColor}">${p.stock}</td>
            <td class="px-6 py-4 text-right text-gray-600">$${Math.floor(Math.random() * 500 + 100)}</td>
            <td class="px-6 py-4 text-center">
                <span class="px-2 py-1 rounded text-xs font-bold ${p.status === 'low' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}">
                    ${p.status === 'low' ? 'Low Stock' : 'In Stock'}
                </span>
            </td>
            <td class="px-6 py-4 text-center">
                <button class="text-gray-400 hover:text-hhg-600"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
            </td>
        </tr>
    `).join('');

    // Re-init icons
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Call on init
renderProducts();


// --- Price Monitor Logic (Real-World) ---

// 1. Regex Tools for "Smart Parsing"
function parseUrlInfo(url) {
    let platform = 'Unknown';
    let brand = 'Unknown';

    if (url.includes('momoshop.com.tw')) platform = 'Momo';
    else if (url.includes('pchome.com.tw')) platform = 'PChome';
    else if (url.includes('shopee.tw')) platform = 'Shopee';

    // Simple heuristic for brand (in real world, this needs generic HTML scraping)
    // Here we just pretend to guess based on URL text if possible, or default to 'Auto-Detect'
    if (url.toLowerCase().includes('ariel')) brand = 'ARIEL';
    if (url.toLowerCase().includes('persil')) brand = 'Persil';
    if (url.toLowerCase().includes('orange')) brand = '橘子工坊';

    return { platform, brand };
}

// 2. Render Function
function renderPriceMonitor() {
    const list = document.getElementById('price-monitor-list');
    if (!list) return;

    // Use global data loaded from products.js
    const data = window.PRODUCT_DATA || [];

    if (data.length === 0) {
        list.innerHTML = `<tr><td colspan="7" class="text-center py-8 text-gray-400">目前沒有監測中的商品，請在上方新增連結。</td></tr>`;
        return;
    }

    list.innerHTML = data.map(item => {
        // 處理價格顯示 (相容舊格式與新物件格式)
        const currentPrice = typeof item.price === 'object' ? item.price.current : parseInt(item.price.replace(/\D/g, '') || 0);
        const originalPrice = typeof item.price === 'object' ? item.price.original : Math.floor(currentPrice * 1.2);
        const discount = typeof item.price === 'object' ? item.price.discount : 'N/A';
        const displayPrice = `$${currentPrice.toLocaleString()}`;
        const displayOriginalPrice = `$${originalPrice.toLocaleString()}`;

        return `
        <tr class="hover:bg-gray-50 transition-colors">
            <td class="px-4 py-3">
                <div class="w-12 h-12 rounded-lg border border-gray-200 overflow-hidden bg-white">
                    <img src="${item.img}" alt="Product" class="w-full h-full object-cover">
                </div>
            </td>
            <td class="px-4 py-3">
                <div class="flex items-center gap-1 mb-1">
                    <span class="text-xs font-bold text-hhg-600 bg-hhg-50 px-1.5 py-0.5 rounded">${item.brand || '品牌'}</span>
                    ${item.aiExtracted ? '<span class="text-[10px] bg-blue-100 text-blue-600 px-1 rounded flex items-center gap-0.5"><i data-lucide="eye" class="w-2.5 h-2.5"></i> AI 視覺</span>' : ''}
                </div>
                <div class="font-bold text-gray-900 line-clamp-2">${item.name}</div>
                <div class="text-xs text-gray-400 mt-1 hidden md:block">${item.platform} • ID: ${item.id}</div> 
            </td>
            <td class="px-4 py-3">
                <span class="px-2 py-1 rounded text-xs font-bold 
                    ${item.platform === 'Momo' ? 'bg-pink-100 text-pink-700' :
                item.platform === 'PChome' ? 'bg-red-100 text-red-700' :
                    'bg-orange-100 text-orange-700'}">
                    ${item.platform}
                </span>
            </td>
            <td class="px-4 py-3 text-right text-gray-400 line-through text-xs">${displayOriginalPrice}</td>
            <td class="px-4 py-3 text-right font-bold text-red-600 text-base">${displayPrice}</td>
            <td class="px-4 py-3 text-center">
                <div class="flex flex-col items-center">
                    <span class="inline-block px-2 py-0.5 border border-red-200 text-red-600 text-[10px] rounded mb-1">${item.promoType || '一般'}</span>
                    <span class="text-[10px] font-bold text-red-500">${discount !== '無折扣' ? discount : ''}</span>
                </div>
            </td>
            <td class="px-4 py-3 text-center">
                <button class="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </td>
        </tr>
    `}).join('');
}

// 3. Add Handler
function addPriceMonitor() {
    const urlInput = document.getElementById('monitorUrlInput');
    const platSelect = document.getElementById('monitorPlatformSelect');

    const url = urlInput.value.trim();
    if (!url) {
        alert('請輸入商品網址！');
        return;
    }

    const info = parseUrlInfo(url);
    const platform = platSelect.value === 'auto' ? info.platform : platSelect.value;

    // Create optimistic UI update
    const newItem = {
        id: Date.now(),
        platform: platform,
        name: `正在分析: ${url.substring(0, 30)}...`,
        price: "分析中...",
        promoType: "Scanning...",
        status: "pending",
        url: url,
        img: "https://placehold.co/50?text=..."
    };

    if (!window.PRODUCT_DATA) window.PRODUCT_DATA = [];
    window.PRODUCT_DATA.unshift(newItem);
    // Initial Rendering
    renderPriceMonitor();

    urlInput.value = '';

    // In a real app, this would trigger an API call to the backend worker
    console.log(`[System] Triggered Monitor for: ${url}`);
}


// Mock AI Analysis Function for Competitor Campaigns
function analyzeCampaign(id) {
    const analysisContainer = document.getElementById(`analysis-${id}`);
    if (!analysisContainer) return;

    // Toggle logic
    if (!analysisContainer.classList.contains('hidden')) {
        analysisContainer.classList.add('hidden');
        return;
    }

    // Show simulated loading or direct reveal
    // For MVP, we just reveal the pre-written content with a pulse
    analysisContainer.classList.remove('hidden');

    // Simulate "Typing" or "Loading" if it was empty (optional)
    // For now the HTML has the content or skeleton.

    if (id === 'c3') {
        // Example of dynamic injection for the 3rd item
        analysisContainer.innerHTML = `
            <div class="flex items-center gap-2 mb-2 text-hhg-700 font-bold text-sm">
                <i data-lucide="bot" class="w-4 h-4"></i> Gemini 策略分析
            </div>
            <p class="text-xs text-gray-700 leading-relaxed">
                <span class="font-bold">策略意圖：</span>利用「福袋」盲盒行銷創造社群話題與開箱流量，清理非熱銷品庫存。<br>
                <span class="font-bold">威脅程度：</span>🟡 中 (話題性高但實際銷量有限)<br>
                <span class="font-bold">建議對策：</span>加強社群操作，暗示我司「透明福袋」活動，強調內容物公開且超值。
            </p>
         `;
        // Re-init lucide icons for the injected content
        lucide.createIcons();
    } else if (id === 'c2') {
        // Replace skeleton with content after a slight delay
        setTimeout(() => {
            analysisContainer.innerHTML = `
                <div class="flex items-center gap-2 mb-2 text-hhg-700 font-bold text-sm">
                    <i data-lucide="bot" class="w-4 h-4"></i> Gemini 策略分析
                </div>
                <p class="text-xs text-gray-700 leading-relaxed">
                    <span class="font-bold">策略意圖：</span>以「超級新品週」強勢推廣新品，搭配蝦皮直播流量紅利。<br>
                    <span class="font-bold">威脅程度：</span>🔴 高 (新品定位直接衝擊我司主力)<br>
                    <span class="font-bold">建議對策：</span>啟動「舊客回購禮遇」，針對曾購買類似品項之會員發送 $100 新品折價券。
                </p>
             `;
            lucide.createIcons();
        }, 800); // 800ms simulated delay
    }
}


// Call on init (after renderProducts)
document.addEventListener('DOMContentLoaded', () => {
    // Wait a tick for products.js to load if using script tag approach
    setTimeout(renderPriceMonitor, 100);
});

// --- Data Analysis Logic ---
function performAiAnalysis() {
    const input = document.getElementById('aiAnalysisInput');
    const resultSection = document.getElementById('aiAnalysisResult');
    const btn = document.querySelector('button[onclick="performAiAnalysis()"]');

    if (!input.value.trim()) {
        alert("請輸入您想分析的問題！");
        return;
    }

    // 1. Loading State
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> AI 思考中...`;
    btn.classList.add('opacity-75', 'cursor-not-allowed');
    btn.disabled = true;

    // 2. Simulate Delay (1.5s)
    setTimeout(() => {
        // 3. Show Result
        resultSection.classList.remove('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Reset Button
        btn.innerHTML = `<i data-lucide="zap" class="w-4 h-4"></i> 重新 AI 分析`;
        btn.classList.remove('opacity-75', 'cursor-not-allowed');
        btn.disabled = false;

        // Re-init icons
        lucide.createIcons();
    }, 1500);
}

// --- Dynamic Calendar Logic (2026) ---
let currentCalDate = new Date('2026-01-01'); // Start showing Jan 2026

function initCalendar() {
    renderCalendar();
}

function changeMonth(delta) {
    currentCalDate.setMonth(currentCalDate.getMonth() + delta);
    renderCalendar();
}

function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const label = document.getElementById('currentMonthYear');

    if (!grid || !label) return; // Guard clause in case element missing

    const year = currentCalDate.getFullYear();
    const month = currentCalDate.getMonth();

    // Update Header
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    label.innerText = `${monthNames[month]} ${year}`;

    grid.innerHTML = '';

    // Calculate days
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Previous month padding
    for (let i = 0; i < firstDay; i++) {
        const cell = document.createElement('div');
        cell.className = 'border border-gray-100 p-1 text-xs text-gray-300 bg-gray-50/30';
        grid.appendChild(cell);
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
        const cell = document.createElement('div');
        cell.className = 'border border-gray-100 p-1 bg-white hover:bg-hhg-50 transition-colors relative min-h-[80px] group'; // Taller cells

        const dateNum = document.createElement('span');
        dateNum.className = 'text-gray-900 font-bold block mb-1 text-xs';
        dateNum.innerText = i;
        cell.appendChild(dateNum);

        // Mock Events based on date
        const event = getMockEvent(year, month, i);
        if (event) {
            const tag = document.createElement('div');
            tag.className = `${event.color} px-1 py-0.5 rounded text-[10px] mb-1 font-bold truncate cursor-pointer shadow-sm`;
            tag.innerText = event.title;
            tag.title = event.title; // Tooltip
            cell.appendChild(tag);
        }

        grid.appendChild(cell);
    }
}

// Mock Events Generator for Demo
function getMockEvent(year, month, day) {
    // 2026 Mock Data Logic
    // Jan (Month 0)
    if (month === 0 && day === 15) return { title: 'Momo 年貨節', color: 'bg-pink-100 text-pink-700' };
    if (month === 0 && day === 20) return { title: 'Shopee 過年不打烊', color: 'bg-orange-100 text-orange-700' };

    // Feb (Month 1)
    if (month === 1 && day === 5) return { title: 'PChome 開工大吉', color: 'bg-red-100 text-red-700' };
    if (month === 1 && day === 14) return { title: 'Momo 西洋情人節', color: 'bg-pink-100 text-pink-700' };

    // Mar (Month 2) - 38 Queen's Day
    if (month === 2 && day === 8) return { title: 'Momo 38 女王節', color: 'bg-pink-100 text-pink-700' };
    if (month === 2 && day === 18) return { title: 'Shopee 3.18 月中狂購', color: 'bg-orange-100 text-orange-700' };

    // Random filler for other months to show functionality
    if (day === 11) return { title: '雙11 暖身預備', color: 'bg-gray-100 text-gray-600' }; // Only Logic example
    if (day === 25) return { title: 'Pay Day Sale', color: 'bg-green-100 text-green-700' };

    return null;
}

// Initialize Calendar
document.addEventListener('DOMContentLoaded', () => {
    initCalendar();
});

