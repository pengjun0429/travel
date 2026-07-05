const fs = require('fs');
const path = 'C:\\Users\\user\\Desktop\\程式碼\\tripweb\\';

// JP fix
let j = fs.readFileSync(path + 'jp.html', 'utf-8');
j = j.replace(/用.*Travelweb.*規劃旅程/g, 'Travelweb で旅程を計画');
j = j.replace(/<meta name="twitter:title" content="Travelweb — 出遊網頁規劃">/, '<meta name="twitter:title" content="Travelweb | 旅行プランナー">');
j = j.replace(/<meta property="og:title" content="Travelweb — 旅行プランナー">/, '<meta property="og:title" content="Travelweb — 旅行プランナー">');
fs.writeFileSync(path + 'jp.html', j, 'utf-8');

// KO fix
let k = fs.readFileSync(path + 'ko.html', 'utf-8');
k = k.replace(/用.*Travelweb.*規劃旅程/g, 'Travelweb으로 여행 계획');
k = k.replace(/<meta name="twitter:title" content="Travelweb — 出遊網頁規劃">/, '<meta name="twitter:title" content="Travelweb — 여행 플래너">');
fs.writeFileSync(path + 'ko.html', k, 'utf-8');

console.log('Fixed');
