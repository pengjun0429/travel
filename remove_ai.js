const fs = require('fs');
const files = ['index.html', 'en.html', 'jp.html', 'ko.html'];
const path = 'C:\\Users\\user\\Desktop\\程式碼\\tripweb\\';

files.forEach(f => {
    let c = fs.readFileSync(path + f, 'utf-8');
    
    // Remove the AI button line
    c = c.replace(/<button onclick="openAIPlanModal\(\)".*?<\/button>\s*\n\s*/g, '');
    
    fs.writeFileSync(path + f, c, 'utf-8');
    console.log(f + ' - AI button removed');
});
