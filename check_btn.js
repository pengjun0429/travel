const fs = require('fs');
const files = ['index.html', 'en.html', 'jp.html', 'ko.html'];
const path = 'C:\\Users\\user\\Desktop\\程式碼\\tripweb\\';
const checkWords = ['共同編輯', '行程列表', '設定', '分享', '登出', '編輯食宿', '刪除這天', '新增景點', '新增一天', '旅程備忘錄', '今日行程路線', '住宿', '餐飲', '取消', '儲存', '關閉'];

files.forEach(f => {
    let c = fs.readFileSync(path + f, 'utf-8');
    let clean = c.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
    let found = checkWords.filter(w => clean.includes(w));
    if (found.length > 0) console.log(f + ': ' + found.join(', '));
});
