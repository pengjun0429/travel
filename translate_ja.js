const fs = require('fs');
const path = 'C:\\Users\\user\\Desktop\\程式碼\\tripweb\\';

// ===== JAPANESE TRANSLATION =====
let j = fs.readFileSync(path + 'ja.html', 'utf-8');

// Meta
j = j.replace('<title id="web-title">Travelweb | 出遊網頁規劃 — 免費旅遊行程規劃與分享</title>', '<title id="web-title">Travelweb | 旅行プランナー — 無料で旅程を作成・共有</title>');
j = j.replace('出遊網頁規劃', '旅行プランナー');
j = j.replace('免費旅遊行程規劃工具。建立專屬旅遊行程，一鍵分享給親友，支援 Google 和 Line 登入，多人共同編輯，雲端同步。', '無料の旅行プランナー。旅程を作成し、ワンクリックで共有。Google/Lineログイン対応、複数人での編集、クラウド同期。');
j = j.replace('旅遊,行程,規劃,旅行,Travel,Itinerary,分享,雲端,共同編輯', '旅行,旅程,プラン,共有,クラウド,共同編集');

// Landing page hero
j = j.replace('用 Travelweb 規劃旅程', 'Travelweb で旅程を計画');
j = j.replace('建立專屬的旅遊行程，一鍵分享給親友', '自分だけの旅程を作成し、友達と共有');
j = j.replace('所有人即時查看，輕鬆同步', 'みんながリアルタイムで閲覧、簡単同期');
j = j.replace('開始規劃旅程', '旅程を始める');
j = j.replace('使用 Google 帳號快速登入', 'Google アカウントでログイン');
j = j.replace('進入我的行程', 'マイトリップ');
j = j.replace('已使用 ', 'ログイン中: ');
j = j.replace(' 登入', '');
j = j.replace('或', 'または');

// Features
j = j.replace('為什麼選擇 Travelweb？', 'なぜ Travelweb なのか？');
j = j.replace('讓規劃行程變得簡單、優雅、可分享', '旅程計画をシンプルに、エレガントに、共有可能に');
j = j.replace('專屬行程', '自分だけの旅程');
j = j.replace('登入後擁有個人獨立的旅遊行程，自由編輯每日景點、住宿、餐飲。', 'ログイン後、自分だけの旅程を作成。毎日の観光地、宿泊、食事を自由に編集。');
j = j.replace('一鍵分享', 'ワンクリック共有');
j = j.replace('產生專屬網址分享給親友，訪客無需登入即可查看完整行程。', '専用URLを生成して共有。ゲストはログイン不要で旅程を閲覧可能。');
j = j.replace('雲端同步', 'クラウド同期');
j = j.replace('行程資料自動同步至雲端，隨時隨地更新，不怕遺失。', '旅程データは自動でクラウド同期。どこでも更新可能、データ紛失の心配なし。');

// Steps
j = j.replace('三步驟開始', '3ステップで開始');
j = j.replace('簡單三步，建立你的旅遊行程', 'たった3ステップで旅程を作成');
j = j.replace('編輯行程', '旅程を編集');
j = j.replace('新增每日景點、住宿、美食，自由安排旅遊路線。', '毎日の観光地、宿泊、グルメを追加。ルートを自由に調整。');
j = j.replace('分享網址', 'URLを共有');
j = j.replace('產生專屬網址分享給親友，大家都能看到完整行程。', '専用URLを生成して共有。全員が旅程を確認可能。');

// Trips view
j = j.replace('我的行程', 'マイトリップ');
j = j.replace('新增行程', '新しい旅');
j = j.replace('免費版最多 5 個行程', '無料版: 最大5つ');
j = j.replace('共用給我的', '共有された旅');
j = j.replace('還沒有行程，建立你的第一個旅程吧！', 'まだ旅がありません。最初の旅を作成しましょう！');
j = j.replace('新增第一個行程', '最初の旅を作成');
j = j.replace('載入中...', '読み込み中...');
j = j.replace('載入失敗', '読み込み失敗');
j = j.replace('重試', '再試行');
j = j.replace('刪除', '削除');
j = j.replace('共用', '共有');
j = j.replace('未設定日期', '日付未設定');
j = j.replace('擁有者:', '所有者:');
j = j.replace('擁有者', '所有者');

// App view
j = j.replace('訪客唯讀模式', 'ゲスト (閲覧のみ)');
j = j.replace('行程列表', '旅の一覧');
j = j.replace('設定', '設定');
j = j.replace('分享', '共有');
j = j.replace('共同編輯', '共同編集');
j = j.replace('共同編輯管理', '共同編集者の管理');
j = j.replace('編輯食宿', '宿泊・食事を編集');
j = j.replace('刪除這天', 'この日を削除');
j = j.replace('住宿 (Sleep)', '宿泊');
j = j.replace('餐飲 (Eat)', '食事');
j = j.replace('今日行程路線', '今日のルート');
j = j.replace('新增景點', 'スポットを追加');
j = j.replace('旅程備忘錄', '旅のメモ');
j = j.replace('新增景點/活動', 'スポット/アクティビティ');
j = j.replace('編輯景點', 'スポットを編集');
j = j.replace('時間', '時間');
j = j.replace('類型圖示', 'アイコン');
j = j.replace('標題 (景點名稱)', 'タイトル');
j = j.replace('簡介/玩法建議', '説明');
j = j.replace('取消', 'キャンセル');
j = j.replace('儲存變更', '変更を保存');
j = j.replace('儲存設定至雲端', 'クラウドに保存');
j = j.replace('儲存', '保存');
j = j.replace('關閉', '閉じる');
j = j.replace('登出', 'ログアウト');
j = j.replace('行程名稱：', '旅の名前:');
j = j.replace('至少要保留一天', '最低1日必要です');
j = j.replace('尚無備忘錄資訊...', 'メモはまだありません...');
j = j.replace('尚無景點行程，請點擊新增。', 'アクティビティがありません。「追加」をクリックしてください。');
j = j.replace('無安排', '未設定');
j = j.replace('無特別安排', '未設定');
j = j.replace('回到行程列表？', '旅の一覧に戻りますか？');
j = j.replace('確定要刪除這個行程嗎？', 'この旅を削除しますか？');
j = j.replace('確定刪除？無法復原。', '削除しますか？元に戻せません。');
j = j.replace('此操作無法復原。', 'この操作は元に戻せません。');

// Modals
j = j.replace('行程設定', '旅の設定');
j = j.replace('旅遊行程標題名稱', '旅のタイトル');
j = j.replace('日期區間', '期間');
j = j.replace('帳號資訊', 'アカウント情報');
j = j.replace('登入方式：', 'ログイン方法: ');
j = j.replace('同 Email 的登入方式共用同一個行程帳號', '同じメールアドレスは同じ旅のアカウントに紐づきます');
j = j.replace('新增共同編輯者（Google Email）', '共同編集者を追加（メール）');
j = j.replace('行程擁有者', '旅の所有者');
j = j.replace('共同編輯者清單', '共同編集者一覧');
j = j.replace('尚無共同編輯者', '共同編集者はいません');
j = j.replace('共同編輯者登入後即可編輯此行程', '共同編集者はログイン後、編集可能になります');
j = j.replace('確定要移除', '削除しますか: ');
j = j.replace('的編輯權限？', ' の編集権限を?');

// Editor modal
j = j.replace('編輯今日資訊', '今日の情報を編集');
j = j.replace('住宿地點', '宿泊先');
j = j.replace('推薦美食/餐廳', 'おすすめグルメ/レストラン');
j = j.replace('旅程日記 / 注意事項', '旅のメモ / 注意事項');
j = j.replace('日期', '日付');

// Activity modal
j = j.replace('預設地標', 'デフォルト');
j = j.replace('飛機航班', 'フライト');
j = j.replace('高鐵/火車', '電車');
j = j.replace('包車/汽車', '車');
j = j.replace('遊船', '船');
j = j.replace('拍照景點', '写真スポット');
j = j.replace('餐飲', '食事');
j = j.replace('徒步', '徒歩');

// iOS tutorial
j = j.replace('加入主畫面', 'ホーム画面に追加');
j = j.replace('將 Travelweb 加入主畫面，像 App 一樣快速開啟', 'Travelweb をホーム画面に追加して、アプリのように素早く起動');
j = j.replace('點擊下方「分享」按鈕', '下部の「共有」ボタンをタップ');
j = j.replace('在 Safari 底部選單中', 'Safari のメニューから');
j = j.replace('滑到下方，點「加入主畫面」', '下にスクロールして「ホーム画面に追加」をタップ');
j = j.replace('在分享選單中往下滑', '共有メニューを下にスクロール');
j = j.replace('點右上角「加入」', '右上の「追加」をタップ');
j = j.replace('完成！從主畫面開啟', '完了！ホーム画面から開く');
j = j.replace('稍後再說', '後で');
j = j.replace('知道了', 'OK');

// Footer
j = j.replace('用旅行，創造回憶。', '旅が思い出を作る。');
j = j.replace('隱私權政策', 'プライバシーポリシー');
j = j.replace('返回首頁', 'トップに戻る');
j = j.replace('回首頁', 'トップに戻る');

// Toast messages (JS)
j = j.replace('showToast("請先登入")', 'showToast("ログインしてください")');
j = j.replace('showToast("請先登入以取得編輯權限")', 'showToast("編集するにはログインしてください")');
j = j.replace('showToast("歡迎', 'showToast("ようこそ');
j = j.replace('showToast("已登出")', 'showToast("ログアウトしました")');
j = j.replace('showToast("已同步至雲端")', 'showToast("クラウドに同期しました")');
j = j.replace('showToast("已複製專屬分享網址！")', 'showToast("共有URLをコピーしました！")');
j = j.replace('showToast("行程已建立！")', 'showToast("旅を作成しました！")');
j = j.replace('showToast("行程已刪除")', 'showToast("旅を削除しました")');
j = j.replace('showToast("標題不能為空")', 'showToast("タイトルは必須です")');
j = j.replace('showToast("網路錯誤")', 'showToast("ネットワークエラー")');
j = j.replace('showToast("請輸入有效的 Email")', 'showToast("有効なメールアドレスを入力してください")');
j = j.replace('showToast("僅擁有者可管理共同編輯者")', 'showToast("所有者のみが共同編集者を管理できます")');
j = j.replace('showToast("已刪除")', 'showToast("削除しました")');
j = j.replace('showToast("建立失敗")', 'showToast("作成失敗")');
j = j.replace('showToast("免費版最多 5 個行程")', 'showToast("無料版は最大5つまでです")');

// JavaScript texts
j = j.replace('「分享」', '"共有"');
j = j.replace('「加入主畫面」', '"ホーム画面に追加"');
j = j.replace('「加入」', '"追加"');

// Confirm dialogs
j = j.replace('回到行程列表？', '旅の一覧に戻りますか？');
j = j.replace('確定要刪除這個行程嗎？', 'この旅を削除しますか？');
j = j.replace('確定刪除？無法復原。', '削除しますか？元に戻せません。');
j = j.replace('確定要移除', '削除しますか: ');

// Day names in default data
j = j.replace('title: "第一天"', 'title: "Day 1"');
j = j.replace('title: "第二天"', 'title: "Day 2"');
j = j.replace('title: "第三天"', 'title: "Day 3"');
j = j.replace('title: "第四天"', 'title: "Day 4"');
j = j.replace('title: "第五天"', 'title: "Day 5"');
j = j.replace('title: "第六天"', 'title: "Day 6"');
j = j.replace('title: "第七天"', 'title: "Day 7"');

// Privacy editor
j = j.replace('編輯隱私權政策', 'プライバシーポリシーを編集');

fs.writeFileSync(path + 'ja.html', j, 'utf-8');
console.log('ja.html translated');
