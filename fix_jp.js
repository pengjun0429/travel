const fs = require('fs');
const path = 'C:\\Users\\user\\Desktop\\程式碼\\tripweb\\';

// Fix jp.html
let jp = fs.readFileSync(path + 'jp.html', 'utf-8');
jp = jp.replace(/lang="ja"/g, 'lang="ja"');
jp = jp.replace(/switchLang\('ja'\)/g, "switchLang('jp')");
jp = jp.replace(/\/ja/g, '/jp');
jp = jp.replace(/'ja'/g, "'jp'");
fs.writeFileSync(path + 'jp.html', jp, 'utf-8');
console.log('jp.html updated');

// Fix language buttons and redirects in other files
const files = ['index.html', 'en.html', 'ko.html'];
files.forEach(f => {
    let c = fs.readFileSync(path + f, 'utf-8');
    c = c.replace(/switchLang\('ja'\)/g, "switchLang('jp')");
    c = c.replace(/'ja'/g, "'jp'");
    c = c.replace(/\/ja/g, '/jp');
    fs.writeFileSync(path + f, c, 'utf-8');
    console.log(f + ' updated');
});

console.log('Done!');
