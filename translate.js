const fs = require('fs');
let c = fs.readFileSync('C:\\Users\\user\\Desktop\\程式碼\\tripweb\\en.html', 'utf-8');
const r = (f, t) => { c = c.replaceAll(f, t); };

// Settings modal
r('行程設定', 'Trip Settings');
r('設定', 'Settings');
r('日期區間', 'Date Range');
r('帳號資訊', 'Account Info');
r('登入方式：', 'Login: ');

// Collab modal
r('共同編輯管理', 'Manage Collaborators');
r('共同編輯', 'Collaborate');
r('行程擁有者', 'Trip Owner');
r('共同編輯者清單', 'Collaborators');
r('尚無共同編輯者', 'No collaborators yet');
r('新增', 'Add');
r('關閉', 'Close');

// Share
r('分享', 'Share');
r('分享行程網址', 'Share Trip URL');

// Buttons
r('取消', 'Cancel');
r('儲存', 'Save');
r('儲存變更', 'Save Changes');
r('儲存設定至雲端', 'Save to Cloud');
r('登出', 'Logout');
r('編輯食宿', 'Edit Stay & Food');
r('刪除這天', 'Delete This Day');
r('新增景點', 'Add Activity');
r('新增一天', 'Add Day');
r('刪除', 'Delete');
r('重試', 'Retry');

// Collaborator messages
r('已邀請', 'Invited');
r('已移除', 'Removed');

// Guest badge
r('訪客唯讀', 'Guest');

// My trips
r('我的行程', 'My Trips');
r('新增行程', 'New Trip');
r('共用給我的', 'Shared With Me');
r('新增第一個行程', 'Create First Trip');
r('還沒有行程，建立你的第一個旅程吧！', 'No trips yet. Create your first one!');

// FAB labels
r('新增景點', 'Add Activity');
r('新增一天', 'Add Day');

// General text
r('尚無備忘錄資訊...', 'No notes yet...');
r('旅程備忘錄', 'Trip Notes');
r('今日行程路線', 'Route Today');
r('住宿 (Sleep)', 'Accommodation (Sleep)');
r('餐飲 (Eat)', 'Dining (Eat)');
r('無安排', 'Not arranged');
r('無特別安排', 'Not arranged');

// Day info modal
r('編輯今日資訊', 'Edit Day Info');
r('住宿地點', 'Accommodation');
r('推薦美食/餐廳', 'Food / Restaurant');
r('旅程日記 / 注意事項', 'Notes / Reminders');

// Activity modal
r('新增景點/活動', 'Add Activity');
r('編輯景點', 'Edit Activity');
r('類型圖示', 'Icon');
r('標題 (景點名稱)', 'Title');
r('簡介/玩法建議', 'Description');
r('預設地標', 'Default');
r('飛機航班', 'Flight');
r('高鐵/火車', 'Train');
r('包車/汽車', 'Car');
r('遊船', 'Boat');
r('拍照景點', 'Photo');
r('餐飲', 'Dining');
r('徒步', 'Walking');

// iOS
r('將 Travelweb 加入主畫面，像 App 一樣快速開啟', 'Add Travelweb to home screen');
r('點擊下方「分享」按鈕', 'Tap Share');
r('在 Safari 底部選單中', 'In Safari');

// Toast translations
c = c.replaceAll('showToast("請先登入")', 'showToast("Please log in first")');
c = c.replaceAll('showToast("請先登入以取得編輯權限")', 'showToast("Log in to edit")');
c = c.replaceAll('showToast("已登出")', 'showToast("Logged out")');
c = c.replaceAll('showToast("已同步至雲端")', 'showToast("Synced to cloud")');
c = c.replaceAll('showToast("已複製專屬分享網址！")', 'showToast("Share URL copied!")');
c = c.replaceAll('showToast("行程已建立！")', 'showToast("Trip created!")');
c = c.replaceAll('showToast("行程已刪除")', 'showToast("Trip deleted")');
c = c.replaceAll('showToast("標題不能為空")', 'showToast("Title is required")');
c = c.replaceAll('showToast("標題不能為空！")', 'showToast("Title is required!")');
c = c.replaceAll('showToast("網路錯誤")', 'showToast("Network error")');
c = c.replaceAll('showToast("請輸入有效的 Email")', 'showToast("Enter a valid email")');
c = c.replaceAll('showToast("僅擁有者可管理共同編輯者")', 'showToast("Owner only")');
c = c.replaceAll('showToast("已刪除")', 'showToast("Deleted")');
c = c.replaceAll('showToast("建立失敗")', 'showToast("Create failed")');
c = c.replaceAll('showToast("請先登入 Google 帳號")', 'showToast("Log in with Google")');
c = c.replaceAll('showToast("請先登入以同步至雲端")', 'showToast("Log in to sync")');
c = c.replaceAll('showToast("無法讀取 Google 登入資訊")', 'showToast("Failed to read Google login info")');
c = c.replaceAll('showToast("免費版最多 5 個行程")', 'showToast("Free plan: max 5 trips")');

// Prompt
c = c.replaceAll('prompt("行程名稱：', 'prompt("Trip name:');

// Line
r('Line 登入失敗', 'Line login failed');
r('Line 登入失敗：', 'Line login failed: ');

// Day names
c = c.replaceAll('title: "第一天"', 'title: "Day 1"');
c = c.replaceAll('title: "第二天"', 'title: "Day 2"');

fs.writeFileSync('C:\\Users\\user\\Desktop\\程式碼\\tripweb\\en.html', c, 'utf-8');
console.log('Translation complete!');
