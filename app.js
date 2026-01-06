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
        'dashboard': '業績儀表板',
        'competitor': '競品追蹤區',
        'ecommerce': '電商營運中心',
        'work': '工作管理中心',
        'knowledge-base': '知識庫與文件 - 部門知識庫',
        'knowledge-repo': '知識庫與文件 - 文件倉庫',
        'knowledge-templates': '知識庫與文件 - 範本中心',
        'knowledge-feedback': '知識庫與文件 - 查無依據回報',
        'knowledge': '知識庫與文件',
        'approval': '簽核中心',
        'logistics': '物流與客服',
        'design': '設計部專區',
        'media': '媒體部專區',
        'finance': '財務部專區',
        'management': '經營管理專區',
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

