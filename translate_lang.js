const fs = require('fs');
const path = 'C:\\Users\\user\\Desktop\\程式碼\\tripweb\\';

// Helper: replace all
function repl(file, find, replace) {
    let c = fs.readFileSync(path + file, 'utf-8');
    c = c.replaceAll(find, replace);
    fs.writeFileSync(path + file, c, 'utf-8');
}

// ja.html: Japanese version
fs.copyFileSync(path + 'index.html', path + 'ja.html');
let j = fs.readFileSync(path + 'ja.html', 'utf-8');
j = j.replace('lang="zh-TW"', 'lang="ja"');
j = j.replace('<title id="web-title">Travelweb | 出遊網頁規劃 — 免費旅遊行程規劃與分享</title>', '<title id="web-title">Travelweb | 旅行プランナー</title>');
j = j.replace('<meta name="description" content="Travelweb — 免費旅遊行程規劃工具。建立專屬旅遊行程，一鍵分享給親友，支援 Google 和 Line 登入，多人共同編輯，雲端同步。">', '<meta name="description" content="Travelweb - 無料旅行プランナー。旅程を作成、共有。">');
// Language buttons: first becomes 中文, second stays 日本語, third becomes EN
j = j.replace('switchLang(\'en\')', 'switchLang(\'zh\')');
j = j.replace('>EN<', '>中文<');
j = j.replace('>日<', '>日本語<');
j = j.replace('>한<', '>EN<');
j = j.replace('onclick="switchLang(\'zh\')" class="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg px-3 py-1.5 text-xs font-medium transition">', 'onclick="switchLang(\'zh\')" class="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg px-3 py-1.5 text-xs font-medium transition">中文</button><button onclick="switchLang(\'en\')" class="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg px-3 py-1.5 text-xs font-medium transition">');
// This is getting complex. Let me just replace the language button section
fs.writeFileSync(path + 'ja.html', j, 'utf-8');
console.log('ja.html base created');

// ko.html: Korean version  
fs.copyFileSync(path + 'index.html', path + 'ko.html');
let k = fs.readFileSync(path + 'ko.html', 'utf-8');
k = k.replace('lang="zh-TW"', 'lang="ko"');
k = k.replace('<title id="web-title">Travelweb | 出遊網頁規劃 — 免費旅遊行程規劃與分享</title>', '<title id="web-title">Travelweb | 여행 플래너</title>');
k = k.replace('<meta name="description" content="Travelweb — 免費旅遊行程規劃工具。建立專屬旅遊行程，一鍵分享給親友，支援 Google 和 Line 登入，多人共同編輯，雲端同步。">', '<meta name="description" content="Travelweb - 무료 여행 플래너. 여행 일정을 만들고 공유하세요.">');
fs.writeFileSync(path + 'ko.html', k, 'utf-8');
console.log('ko.html base created');

// Now fix the language buttons in all files
// For index.html: EN, 日, 한 (correct)
// For en.html: 中文, 日, 한 
// For ja.html: 中文, EN, 한
// For ko.html: 中文, 日, EN

console.log('All language files created!');
