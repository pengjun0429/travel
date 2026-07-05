const fs = require('fs');
let c = fs.readFileSync('C:\\Users\\user\\Desktop\\程式碼\\tripweb\\en.html', 'utf-8');

const r = (f, t) => { c = c.replaceAll(f, t); };

// Landing page
r('用 Travelweb 規劃旅程', 'Plan Your Trip with Travelweb');
r('建立專屬的旅遊行程，一鍵分享給親友', 'Create your perfect itinerary and share it instantly');
r('所有人即時查看，輕鬆同步', 'Everyone sees it live, always in sync');
r('開始規劃旅程', 'Start Planning');
r('使用 Google 帳號快速登入', 'Quick login with Google');
r('進入我的行程', 'My Trips');
r('已使用 ', 'Signed in as ');
r('為什麼選擇 Travelweb？', 'Why Travelweb?');
r('讓規劃行程變得簡單、優雅、可分享', 'Simple, elegant, shareable trip planning');
r('專屬行程', 'Personal Trips');
r('登入後擁有個人獨立的旅遊行程，自由編輯每日景點、住宿、餐飲。', 'Create your own trips. Edit daily activities, hotels, and restaurants freely.');
r('一鍵分享', 'One-Click Share');
r('產生專屬網址分享給親友，訪客無需登入即可查看完整行程。', 'Generate a unique URL to share. Guests can view without logging in.');
r('雲端同步', 'Cloud Sync');
r('行程資料自動同步至雲端，隨時隨地更新，不怕遺失。', 'Auto-sync to the cloud. Update anywhere, never lose data.');
r('三步驟開始', 'Get Started in 3 Steps');
r('簡單三步，建立你的旅遊行程', 'Three simple steps to create your trip');
r('編輯行程', 'Edit Itinerary');
r('新增每日景點、住宿、美食，自由安排旅遊路線。', 'Add daily spots, hotels, food. Plan your route freely.');
r('分享網址', 'Share URL');
r('產生專屬網址分享給親友，大家都能看到完整行程。', 'Generate a unique URL. Everyone sees the full itinerary.');
r('用旅行，創造回憶。', 'Travel creates memories.');
r('隱私權政策', 'Privacy Policy');

// Trips view
r('我的行程', 'My Trips');
r('新增行程', 'New Trip');
r('免費版最多 5 個行程', 'Free plan: max 5 trips');
r('共用給我的', 'Shared With Me');
r('還沒有行程，建立你的第一個旅程吧！', 'No trips yet. Create your first one!');
r('新增第一個行程', 'Create First Trip');
r('載入中...', 'Loading...');
r('載入失敗', 'Load failed');
r('重試', 'Retry');
r('共用', 'Shared');
r('未設定日期', 'No date set');

// App view
r('訪客唯讀模式', 'Guest (Read-Only)');
r('行程列表', 'Back to Trips');
r('共同編輯管理', 'Manage Collaborators');
r('編輯食宿', 'Edit Stay and Food');
r('刪除這天', 'Delete This Day');
r('住宿 (Sleep)', 'Accommodation (Sleep)');
r('餐飲 (Eat)', 'Dining (Eat)');
r('今日行程路線', 'Route Today');
r('新增景點', 'Add Activity');
r('旅程備忘錄', 'Trip Notes');
r('新增景點/活動', 'Add Activity');
r('編輯景點', 'Edit Activity');
r('類型圖示', 'Icon');
r('標題 (景點名稱)', 'Title');
r('簡介/玩法建議', 'Description');
r('儲存變更', 'Save Changes');
r('儲存設定至雲端', 'Save to Cloud');
r('至少要保留一天', 'Keep at least 1 day');
r('尚無備忘錄資訊...', 'No notes yet...');
r('尚無景點行程，請點擊新增。', 'No activities yet. Click Add.');
r('無安排', 'Not arranged');
r('無特別安排', 'Not arranged');

// Modals
r('行程設定', 'Trip Settings');
r('旅遊行程標題名稱', 'Trip Title');
r('日期區間', 'Date Range');
r('帳號資訊', 'Account Info');
r('登入方式：', 'Login: ');
r('同 Email 的登入方式共用同一個行程帳號', 'Same email links all login methods');
r('新增共同編輯者（Google Email）', 'Add Collaborator (Email)');
r('共同編輯者清單', 'Collaborators');
r('尚無共同編輯者', 'No collaborators yet');
r('共同編輯者登入後即可編輯此行程', 'Collaborators can edit after logging in');
r('確定要刪除這個行程嗎？', 'Delete this trip?');

// iOS tutorial
r('加入主畫面', 'Add to Home Screen');
r('將 Travelweb 加入主畫面，像 App 一樣快速開啟', 'Add Travelweb to your home screen for quick access');
r('點擊下方「分享」按鈕', 'Tap the Share button');
r('在 Safari 底部選單中', 'In the Safari menu bar');
r('滑到下方，點「加入主畫面」', 'Scroll down, tap Add to Home Screen');
r('在分享選單中往下滑', 'In the share menu');
r('點右上角「加入」', 'Tap Add at the top right');
r('完成！從主畫面開啟', 'Done! Open from your home screen');
r('稍後再說', 'Not now');
r('知道了', 'Got it');

// Prompts and dialogs
r('回到行程列表？', 'Back to trip list?');
r('此操作無法復原。', 'This cannot be undone.');
r('請輸入有效的 Email', 'Enter a valid email');
r('僅擁有者可管理共同編輯者', 'Only the owner can manage collaborators');
r('請先登入', 'Please log in first');
r('請先登入以取得編輯權限', 'Log in to edit');
r('歡迎回來', 'Welcome back');
r('已登出', 'Logged out');
r('無法讀取 Google 登入資訊', 'Failed to read Google login info');
r('請先登入以同步至雲端', 'Log in to sync to cloud');
r('正在同步最新行程至雲端...', 'Syncing to cloud...');
r('雲端行程同步完成！', 'Cloud sync complete!');
r('雲端同步失敗，已儲存於本地。', 'Sync failed. Saved locally.');
r('行程已建立！', 'Trip created!');
r('行程已刪除', 'Trip deleted');
r('建立失敗', 'Create failed');
r('暫無詳細說明。', 'No details available.');
r('點擊左側行程中的景點', 'Click a spot on the left');
r('即可在此預覽與導航', 'to preview and navigate');
r('已複製專屬分享網址！', 'Share URL copied!');
r('尚無景點行程，請點擊新增。', 'No activities yet. Click Add.');
r('Line 登入失敗', 'Line login failed');

// Toast translations - exact matches only
c = c.replaceAll('showToast("請先登入")', 'showToast("Please log in first")');
c = c.replaceAll('showToast("請先登入以取得編輯權限")', 'showToast("Log in to edit")');
c = c.replaceAll('showToast("請先登入以同步至雲端")', 'showToast("Log in to sync")');
c = c.replaceAll('showToast("無法讀取 Google 登入資訊")', 'showToast("Failed to read Google login info")');
c = c.replaceAll('showToast("已登出")', 'showToast("Logged out")');
c = c.replaceAll('showToast("已同步至雲端")', 'showToast("Synced to cloud")');
c = c.replaceAll('showToast("已複製專屬分享網址！")', 'showToast("Share URL copied!")');
c = c.replaceAll('showToast("行程已建立！")', 'showToast("Trip created!")');
c = c.replaceAll('showToast("行程已刪除")', 'showToast("Trip deleted")');
c = c.replaceAll('showToast("標題不能為空")', 'showToast("Title is required")');
c = c.replaceAll('showToast("網路錯誤")', 'showToast("Network error")');
c = c.replaceAll('showToast("免費版最多 5 個行程")', 'showToast("Free plan: max 5 trips")');
c = c.replaceAll('showToast("請輸入有效的 Email")', 'showToast("Enter a valid email")');
c = c.replaceAll('showToast("僅擁有者可管理共同編輯者")', 'showToast("Only the owner can manage collaborators")');
c = c.replaceAll('showToast("已刪除")', 'showToast("Deleted")');
c = c.replaceAll('showToast("請先登入 Google 帳號")', 'showToast("Log in with Google")');
c = c.replaceAll('showToast("建立失敗")', 'showToast("Create failed")');
c = c.replaceAll('showToast("標題不能為空！")', 'showToast("Title is required!")');

// Day names in default data
c = c.replaceAll('title: "第一天"', 'title: "Day 1"');
c = c.replaceAll('title: "第二天"', 'title: "Day 2"');

// Default trip title
c = c.replaceAll('我的旅遊行程', 'My Trip');

// Delete buttons in trip cards  
c = c.replaceAll('title="刪除"', 'title="Delete"');

// Map panel
c = c.replaceAll('高德地圖導航', 'Amap Navigation');
c = c.replaceAll('Google 地圖搜尋', 'Google Maps');

// Line login button text
c = c.replaceAll('Line 登入', 'Line Login');

fs.writeFileSync('C:\\Users\\user\\Desktop\\程式碼\\tripweb\\en.html', c, 'utf-8');
console.log('Translation done');
