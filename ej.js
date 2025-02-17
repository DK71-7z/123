// 初始参与者列表
let participants = [
    "张三", "李四", "王五", "赵六", "陈七",
    "周八", "吴九", "郑十", "孙十一", "刘十二",
    "黄十三", "何十四", "林十五", "马十六"
];

// 中奖者存储对象
let winners = {};

function initialize() {
    const container = document.getElementById('participants-grid');
    container.innerHTML = participants
        .map(name => `<div class="participant">${name}</div>`)
        .join('');
}

function startLottery() {
    const btn = document.getElementById('start-btn');
    btn.disabled = true;
    
    const participantsDivs = document.querySelectorAll('.participant');
    let count = 0;
    const maxIterations = 30;
    
    const shuffle = setInterval(() => {
        participantsDivs.forEach(div => {
            div.style.background = '#3498db';
            div.classList.remove('winner');
        });
        
        const randomIndex = Math.floor(Math.random() * participants.length);
        participantsDivs[randomIndex].style.background = '#e74c3c';
        
        if (count++ >= maxIterations) {
            clearInterval(shuffle);
            selectWinner(participants[randomIndex]);
            btn.disabled = false;
        }
    }, 100);
}

function selectWinner(winner) {
    // 从参与者列表移除
    const index = participants.indexOf(winner);
    participants.splice(index, 1);
    
    // 添加到中奖名单
    const currentPrize = document.getElementById('current-prize').textContent;
    if (!winners[currentPrize]) winners[currentPrize] = [];
    winners[currentPrize].push(winner);
    
    updateWinnersList();
    initialize();
}

function updateWinnersList() {
    const list = document.getElementById('winners-list');
    list.innerHTML = Object.entries(winners)
        .map(([prize, names]) => `
            <div class="prize-winners">
                <h3>${prize}</h3>
                ${names.map(name => `<div class="winner-name">${name}</div>`).join('')}
            </div>
        `)
        .join('');
}

function reset() {
    participants = [
        "张三", "李四", "王五", "赵六", "陈七",
        "周八", "吴九", "郑十", "孙十一", "刘十二",
        "黄十三", "何十四", "林十五", "马十六"
    ];
    winners = {};
    initialize();
    updateWinnersList();
}

// 初始化页面
initialize();