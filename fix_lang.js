const fs = require('fs');
const path = 'C:\\Users\\user\\Desktop\\程式碼\\tripweb\\';

// Language button config for each file
const configs = {
    'en.html': { lang: 'en', buttons: '中文', '日本語': true, '한국어': true },
    'ja.html': { lang: 'ja', buttons: '中文', 'English': true, '한국어': true },
    'ko.html': { lang: 'ko', buttons: '中文', '日本語': true, 'English': true },
    'index.html': { lang: 'zh', buttons: 'EN', '日': true, '한': true }
};

for (const [file, cfg] of Object.entries(configs)) {
    let c = fs.readFileSync(path + file, 'utf-8');
    
    // Update lang attribute
    if (cfg.lang === 'ja') c = c.replace('lang="zh-TW"', 'lang="ja"');
    else if (cfg.lang === 'ko') c = c.replace('lang="zh-TW"', 'lang="ko"');
    else if (cfg.lang === 'en') c = c.replace('lang="zh-TW"', 'lang="en"');
    
    // Replace the language button section
    // Find the button section and replace it
    const btnStart = 'onclick="switchLang';
    const btnEnd = '</button>';
    const btnSection = c.match(/onclick="switchLang[^<]*<\/button>\s*<button onclick="switchLang[^<]*<\/button>\s*<button onclick="switchLang[^<]*<\/button>/);
    
    if (btnSection) {
        const newBtns = [
            `onclick="switchLang('zh')" class="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg px-3 py-1.5 text-xs font-medium transition">中文</button>`,
            `onclick="switchLang('ja')" class="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg px-3 py-1.5 text-xs font-medium transition">日本語</button>`,
            `onclick="switchLang('ko')" class="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg px-3 py-1.5 text-xs font-medium transition">한국어</button>`
        ];
        c = c.replace(btnSection[0], newBtns.join('\n                    '));
    }
    
    // Update the redirect script
    if (cfg.lang === 'zh') {
        // Already has the multi-language redirect
    } else if (cfg.lang === 'en') {
        c = c.replace('var pages = { en: \'/en\', ja: \'/ja\', ko: \'/ko\' };', 'var pages = { en: \'/en\' };');
    } else if (cfg.lang === 'ja') {
        c = c.replace('var pages = { en: \'/en\', ja: \'/ja\', ko: \'/ko\' };', 'var pages = { ja: \'/ja\' };');
    } else if (cfg.lang === 'ko') {
        c = c.replace('var pages = { en: \'/en\', ja: \'/ja\', ko: \'/ko\' };', 'var pages = { ko: \'/ko\' };');
    }
    
    // Update switchLang function
    if (cfg.lang !== 'zh') {
        // Replace the redirect map
        c = c.replace(
            'const pages = { en: \'/en\', ja: \'/ja\', ko: \'/ko\' };',
            'const pages = { zh: \'/\', en: \'/en\', ja: \'/ja\', ko: \'/ko\' };'
        );
    }
    
    fs.writeFileSync(path + file, c, 'utf-8');
    console.log(file + ' done');
}
