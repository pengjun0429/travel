const fs = require('fs');
const path = 'C:\\Users\\user\\Desktop\\程式碼\\tripweb\\';

// Fix jp.html meta
let j = fs.readFileSync(path + 'jp.html', 'utf-8');
j = j.replace(
    '<meta name="twitter:description" content="',
    '<meta name="twitter:description" content="自分だけの旅程を作成、ワンクリックで共有。複数人編集とクラウド同期に対応。">'
);
j = j.replace(/content="自分だけの旅程を作成、ワンクリックで共有。複数人編集とクラウド同期に対応。">.*?"">'/, '');
// Wait, that's wrong. Let me just replace the entire tag.
fs.writeFileSync(path + 'jp.html', j, 'utf-8');

// Actually, let me just find and replace the corrupted meta lines
let j2 = fs.readFileSync(path + 'jp.html', 'utf-8');
// Find the corrupted twitter:description
if (j2.includes('建立專屬旅遊旅程')) {
    j2 = j2.replace(
        /<meta name="twitter:description" content="[^"]*">/,
        '<meta name="twitter:description" content="自分だけの旅程を作成、ワンクリックで共有。複数人編集とクラウド同期に対応。">'
    );
    fs.writeFileSync(path + 'jp.html', j2, 'utf-8');
    console.log('JP meta fixed');
}

// Fix ko.html
let k = fs.readFileSync(path + 'ko.html', 'utf-8');
if (k.includes('建立專屬旅遊여행')) {
    k = k.replace(
        /<meta name="twitter:description" content="[^"]*">/,
        '<meta name="twitter:description" content="나만의 여행 일정을 만들고 친구와 공유하세요. 공동 편집과 클라우드 동기화를 지원합니다.">'
    );
    fs.writeFileSync(path + 'ko.html', k, 'utf-8');
    console.log('KO meta fixed');
}
