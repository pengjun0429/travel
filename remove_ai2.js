const fs = require('fs');
const path = 'C:\\Users\\user\\Desktop\\程式碼\\tripweb\\';
const files = ['index.html', 'en.html', 'jp.html', 'ko.html'];

files.forEach(f => {
    let c = fs.readFileSync(path + f, 'utf-8');
    
    // Remove the AI button (starts with <button onclick="openAIPlanModal" and ends with </button>)
    c = c.replace(/<button onclick="openAIPlanModal\(\)"[\s\S]*?<\/button>\n/g, '');
    
    // Also remove the AI modal HTML section
    const modalStart = c.indexOf('<!-- AI Plan Modal -->');
    const modalEnd = c.indexOf('<!-- Privacy Editor Modal -->');
    if (modalStart > -1 && modalEnd > -1) {
        c = c.substring(0, modalStart) + c.substring(modalEnd);
    }
    // Try iOS Tutorial as fallback
    const modalStart2 = c.indexOf('<!-- AI Plan Modal -->');
    const modalEnd2 = c.indexOf('<!-- iOS Tutorial -->');
    if (modalStart2 > -1 && modalEnd2 > -1 && c.indexOf('<!-- Privacy Editor Modal -->') === -1) {
        c = c.substring(0, modalStart2) + c.substring(modalEnd2);
    }
    
    // Remove AI JS functions
    c = c.replace(/let aiPlanResult = null;[\s\S]*?async function applyAIPlan[\s\S]*?\n    }[\s\S]*?\n        aiPlanResult = null;\n    }/g, '');
    c = c.replace(/\n\n\s*\/\/ ===== AI PLANNING =====[\s\S]*?\n        aiPlanResult = null;\n        }/, '');
    
    fs.writeFileSync(path + f, c, 'utf-8');
    console.log(f + ' - AI removed');
});
