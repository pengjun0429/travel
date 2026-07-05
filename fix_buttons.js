const fs = require('fs');
const path = 'C:\\Users\\user\\Desktop\\程式碼\\tripweb\\';

// JP fix
let j = fs.readFileSync(path + 'jp.html', 'utf-8');
j = j.replaceAll('>共同編輯<', '>共同編集<');
j = j.replaceAll('>設定<', '>設定<');
j = j.replaceAll('>分享<', '>共有<');
j = j.replaceAll('>登出<', '>ログアウト<');
j = j.replaceAll('title="登出"', 'title="ログアウト"');
fs.writeFileSync(path + 'jp.html', j, 'utf-8');
console.log('JP button text fixed');

// KO fix
let k = fs.readFileSync(path + 'ko.html', 'utf-8');
k = k.replaceAll('>共同編輯<', '>공동 편집<');
k = k.replaceAll('>分享<', '>공유<');
k = k.replaceAll('>登出<', '>로그아웃<');
k = k.replaceAll('title="登出"', 'title="로그아웃"');
fs.writeFileSync(path + 'ko.html', k, 'utf-8');
console.log('KO button text fixed');
