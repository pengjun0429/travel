const fs = require('fs');
const path = 'C:\\Users\\user\\Desktop\\程式碼\\tripweb\\';

let k = fs.readFileSync(path + 'ko.html', 'utf-8');

// Meta
k = k.replace('<title id="web-title">Travelweb | 出遊網頁規劃 — 免費旅遊行程規劃與分享</title>', '<title id="web-title">Travelweb | 여행 플래너 — 무료 여행 일정 만들기</title>');
k = k.replace('出遊網頁規劃', '여행 플래너');
k = k.replace('免費旅遊行程規劃工具。建立專屬旅遊行程，一鍵分享給親友，支援 Google 和 Line 登入，多人共同編輯，雲端同步。', '무료 여행 플래너. 여행 일정을 만들고 클릭 한 번으로 공유. Google/Line 로그인, 공동 편집, 클라우드 동기화 지원.');
k = k.replace('旅遊,行程,規劃,旅行,Travel,Itinerary,分享,雲端,共同編輯', '여행,일정,플랜,공유,클라우드,공동편집');

// Landing page hero
k = k.replace('用 Travelweb 規劃旅程', 'Travelweb으로 여행 계획');
k = k.replace('建立專屬的旅遊行程，一鍵分享給親友', '나만의 여행 일정을 만들고 친구와 공유');
k = k.replace('所有人即時查看，輕鬆同步', '모두가 실시간으로 확인, 간편한 동기화');
k = k.replace('開始規劃旅程', '여행 계획 시작');
k = k.replace('使用 Google 帳號快速登入', 'Google 계정으로 빠른 로그인');
k = k.replace('進入我的行程', '내 여행');
k = k.replace('已使用 ', '로그인: ');
k = k.replace(' 登入', '');
k = k.replace('或', '또는');

// Features
k = k.replace('為什麼選擇 Travelweb？', '왜 Travelweb 인가요?');
k = k.replace('讓規劃行程變得簡單、優雅、可分享', '여행 계획을 간단하고 우아하게, 공유 가능하게');
k = k.replace('專屬行程', '나만의 여행');
k = k.replace('登入後擁有個人獨立的旅遊行程，自由編輯每日景點、住宿、餐飲。', '로그인 후 나만의 여행 일정을 만들고, 매일의 관광지, 숙소, 음식을 자유롭게 편집하세요.');
k = k.replace('一鍵分享', '원클릭 공유');
k = k.replace('產生專屬網址分享給親友，訪客無需登入即可查看完整行程。', '전용 URL을 생성하여 공유. 게스트는 로그인 없이 전체 일정을 볼 수 있습니다.');
k = k.replace('雲端同步', '클라우드 동기화');
k = k.replace('行程資料自動同步至雲端，隨時隨地更新，不怕遺失。', '여행 데이터는 자동으로 클라우드 동기화. 언제 어디서나 업데이트, 데이터 분실 걱정 없음.');

// Steps
k = k.replace('三步驟開始', '3단계로 시작');
k = k.replace('簡單三步，建立你的旅遊行程', '3단계로 여행 일정 만들기');
k = k.replace('編輯行程', '일정 편집');
k = k.replace('新增每日景點、住宿、美食，自由安排旅遊路線。', '매일의 관광지, 숙소, 음식을 추가하고 자유롭게 일정을 구성하세요.');
k = k.replace('分享網址', 'URL 공유');
k = k.replace('產生專屬網址分享給親友，大家都能看到完整行程。', '전용 URL을 생성하여 공유하면 모두가 전체 일정을 볼 수 있습니다.');

// Trips view
k = k.replace('我的行程', '내 여행');
k = k.replace('新增行程', '새 여행');
k = k.replace('免費版最多 5 個行程', '무료 버전: 최대 5개');
k = k.replace('共用給我的', '공유받은 여행');
k = k.replace('還沒有行程，建立你的第一個旅程吧！', '아직 여행이 없습니다. 첫 번째 여행을 만들어보세요!');
k = k.replace('新增第一個行程', '첫 여행 만들기');
k = k.replace('載入中...', '로딩 중...');
k = k.replace('載入失敗', '로딩 실패');
k = k.replace('重試', '다시 시도');
k = k.replace('刪除', '삭제');
k = k.replace('共用', '공유');
k = k.replace('未設定日期', '날짜 미설정');
k = k.replace('擁有者:', '소유자:');
k = k.replace('擁有者', '소유자');

// App view
k = k.replace('訪客唯讀模式', '게스트 (읽기 전용)');
k = k.replace('行程列表', '여행 목록');
k = k.replace('設定', '설정');
k = k.replace('分享', '공유');
k = k.replace('共同編輯', '공동 편집');
k = k.replace('共同編輯管理', '공동 편집자 관리');
k = k.replace('編輯食宿', '숙소/식사 편집');
k = k.replace('刪除這天', '이 날 삭제');
k = k.replace('住宿 (Sleep)', '숙소');
k = k.replace('餐飲 (Eat)', '식사');
k = k.replace('今日行程路線', '오늘의 경로');
k = k.replace('新增景點', '장소 추가');
k = k.replace('旅程備忘錄', '여행 메모');
k = k.replace('新增景點/活動', '장소/액티비티 추가');
k = k.replace('編輯景點', '장소 편집');
k = k.replace('時間', '시간');
k = k.replace('類型圖示', '아이콘');
k = k.replace('標題 (景點名稱)', '제목');
k = k.replace('簡介/玩法建議', '설명');
k = k.replace('取消', '취소');
k = k.replace('儲存變更', '변경 저장');
k = k.replace('儲存設定至雲端', '클라우드에 저장');
k = k.replace('儲存', '저장');
k = k.replace('關閉', '닫기');
k = k.replace('登出', '로그아웃');
k = k.replace('行程名稱：', '여행 이름:');
k = k.replace('至少要保留一天', '최소 1일은 남겨야 합니다');
k = k.replace('尚無備忘錄資訊...', '메모가 아직 없습니다...');
k = k.replace('尚無景點行程，請點擊新增。', '액티비티가 없습니다. 추가를 클릭하세요.');
k = k.replace('無安排', '미정');
k = k.replace('無特別安排', '미정');
k = k.replace('回到行程列表？', '여행 목록으로 돌아갈까요?');
k = k.replace('確定要刪除這個行程嗎？', '이 여행을 삭제할까요?');
k = k.replace('確定刪除？無法復原。', '삭제할까요? 되돌릴 수 없습니다.');
k = k.replace('此操作無法復原。', '이 작업은 되돌릴 수 없습니다.');

// Modals
k = k.replace('行程設定', '여행 설정');
k = k.replace('旅遊行程標題名稱', '여행 제목');
k = k.replace('日期區間', '날짜 범위');
k = k.replace('帳號資訊', '계정 정보');
k = k.replace('登入方式：', '로그인 방식: ');
k = k.replace('同 Email 的登入方式共用同一個行程帳號', '같은 이메일은 같은 여행 계정에 연결됩니다');
k = k.replace('新增共同編輯者（Google Email）', '공동 편집자 추가 (이메일)');
k = k.replace('行程擁有者', '여행 소유자');
k = k.replace('共同編輯者清單', '공동 편집자 목록');
k = k.replace('尚無共同編輯者', '공동 편집자가 없습니다');
k = k.replace('共同編輯者登入後即可編輯此行程', '공동 편집자는 로그인 후 편집할 수 있습니다');
k = k.replace('確定要移除', '삭제: ');
k = k.replace('的編輯權限？', ' 님의 편집 권한을?');

// Editor modal
k = k.replace('編輯今日資訊', '오늘 정보 편집');
k = k.replace('住宿地點', '숙소');
k = k.replace('推薦美食/餐廳', '추천 맛집/레스토랑');
k = k.replace('旅程日記 / 注意事項', '여행 메모 / 주의사항');
k = k.replace('日期', '날짜');

// Activity modal
k = k.replace('預設地標', '기본');
k = k.replace('飛機航班', '비행기');
k = k.replace('高鐵/火車', '기차');
k = k.replace('包車/汽車', '자동차');
k = k.replace('遊船', '배');
k = k.replace('拍照景點', '사진');
k = k.replace('餐飲', '음식');
k = k.replace('徒步', '도보');

// iOS tutorial
k = k.replace('加入主畫面', '홈 화면에 추가');
k = k.replace('將 Travelweb 加入主畫面，像 App 一樣快速開啟', 'Travelweb을 홈 화면에 추가하여 앱처럼 빠르게 실행');
k = k.replace('點擊下方「分享」按鈕', '아래의 "공유" 버튼을 탭');
k = k.replace('在 Safari 底部選單中', 'Safari 메뉴에서');
k = k.replace('滑到下方，點「加入主畫面」', '아래로 스크롤하여 "홈 화면에 추가"를 탭');
k = k.replace('在分享選單中往下滑', '공유 메뉴에서 아래로');
k = k.replace('點右上角「加入」', '오른쪽 상단의 "추가"를 탭');
k = k.replace('完成！從主畫面開啟', '완료! 홈 화면에서 열기');
k = k.replace('稍後再說', '나중에');
k = k.replace('知道了', '확인');

// Footer
k = k.replace('用旅行，創造回憶。', '여행이 추억을 만듭니다.');
k = k.replace('隱私權政策', '개인정보처리방침');
k = k.replace('返回首頁', '홈으로');
k = k.replace('回首頁', '홈으로');

// Toast messages (JS)
k = k.replace('showToast("請先登入")', 'showToast("로그인해 주세요")');
k = k.replace('showToast("請先登入以取得編輯權限")', 'showToast("편집하려면 로그인하세요")');
k = k.replace('showToast("歡迎', 'showToast("환영합니다 ');
k = k.replace('showToast("已登出")', 'showToast("로그아웃되었습니다")');
k = k.replace('showToast("已同步至雲端")', 'showToast("클라우드에 동기화됨")');
k = k.replace('showToast("已複製專屬分享網址！")', 'showToast("공유 URL을 복사했습니다!")');
k = k.replace('showToast("行程已建立！")', 'showToast("여행이 생성되었습니다!")');
k = k.replace('showToast("行程已刪除")', 'showToast("여행이 삭제되었습니다")');
k = k.replace('showToast("標題不能為空")', 'showToast("제목을 입력하세요")');
k = k.replace('showToast("網路錯誤")', 'showToast("네트워크 오류")');
k = k.replace('showToast("請輸入有效的 Email")', 'showToast("유효한 이메일을 입력하세요")');
k = k.replace('showToast("僅擁有者可管理共同編輯者")', 'showToast("소유자만 공동 편집자를 관리할 수 있습니다")');
k = k.replace('showToast("已刪除")', 'showToast("삭제되었습니다")');
k = k.replace('showToast("建立失敗")', 'showToast("생성 실패")');
k = k.replace('showToast("免費版最多 5 個行程")', 'showToast("무료 버전은 최대 5개입니다")');

// Day names
k = k.replace('title: "第一天"', 'title: "Day 1"');
k = k.replace('title: "第二天"', 'title: "Day 2"');
k = k.replace('title: "第三天"', 'title: "Day 3"');
k = k.replace('title: "第四天"', 'title: "Day 4"');
k = k.replace('title: "第五天"', 'title: "Day 5"');
k = k.replace('title: "第六天"', 'title: "Day 6"');
k = k.replace('title: "第七天"', 'title: "Day 7"');

fs.writeFileSync(path + 'ko.html', k, 'utf-8');
console.log('ko.html translated');
