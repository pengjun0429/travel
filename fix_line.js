const fs = require('fs');
const path = 'C:\\Users\\user\\Desktop\\程式碼\\tripweb\\';

const loginHtml = `                    <div id="landing-login-buttons" class="flex items-center gap-3 text-sm text-slate-500 mt-2">
                        <button onclick="lineLogin()" class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl transition shadow-sm">
                            <i class="fa-brands fa-line text-lg"></i> Line Login
                        </button>
                        <span class="text-slate-600">or</span>
                        <div class="g_id_signin" data-type="standard" data-size="medium" data-theme="outline" data-text="signin_with" data-shape="rectangular"></div>
                    </div>`;

const files = ['index.html', 'ja.html', 'ko.html'];

for (const f of files) {
    let c = fs.readFileSync(path + f, 'utf-8');
    
    // Add login buttons div after landing-hero-user closing div
    c = c.replace('</div>\n                    <p class="text-slate-500 text-sm mt-6 animate-fade-in-up-delay-3">',
                  '</div>\n' + loginHtml + '\n                    <p class="text-slate-500 text-sm mt-6 animate-fade-in-up-delay-3">');
    
    // Add JS to show/hide login buttons
    c = c.replace(
        'document.getElementById(\'landing-hero-email\').textContent = \'Signed in as \' + currentUser.email;',
        'document.getElementById(\'landing-hero-email\').textContent = \'已使用 \' + currentUser.email + \' 登入\';'
    );
    
    // Add the login buttons hide/show if not already there
    if (!c.includes('landing-login-buttons')) {
        c = c.replace(
            'document.getElementById(\'landing-hero-email\').textContent = \'已使用 \' + currentUser.email + \' 登入\';',
            'document.getElementById(\'landing-hero-email\').textContent = \'已使用 \' + currentUser.email + \' 登入\';' +
            '\n                document.getElementById(\'landing-login-buttons\').classList.add(\'hidden\');'
        );
        c = c.replace(
            'document.getElementById(\'landing-hero-user\').classList.add(\'hidden\');',
            'document.getElementById(\'landing-hero-user\').classList.add(\'hidden\');\n                document.getElementById(\'landing-login-buttons\').classList.remove(\'hidden\');'
        );
    }
    
    fs.writeFileSync(path + f, c, 'utf-8');
    console.log(f + ' updated with Line login');
}
