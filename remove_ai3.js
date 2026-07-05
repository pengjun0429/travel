const fs = require('fs');
const path = 'C:\\Users\\user\\Desktop\\程式碼\\tripweb\\';

['index.html', 'jp.html', 'ko.html'].forEach(f => {
    let c = fs.readFileSync(path + f, 'utf-8');
    // Remove AI button by targeting the exact onclick handler
    c = c.replace(
        /<button\s+onclick="openAIPlanModal\(\)"[^>]*>[\s\S]*?<\/button>\s*\n/g,
        ''
    );
    fs.writeFileSync(path + f, c, 'utf-8');
    console.log(f + ' done');
});
