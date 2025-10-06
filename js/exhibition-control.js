// exhibition-control.js

// === 写真展ごとの設定 ===
const exhibitions = {
  "summer": {
    startDate: new Date("2025-09-10T00:00:00"),  // 公開開始
    endDate: new Date("2025-09-21T23:59:59"),    // 投票締切
    worksPasswordURL: "works.html",              // パスワードページ
    worksPublicURL: "af69592862e159a7cf723a78c20a47ce109d13b04db75224503159b765b84967/index.html",         // 一般公開ページ（終了後）
    navSelector: 'a[href*="2025/summer"]'        // ナビゲーション識別用
  },
  "gakusai": {
    startDate: new Date("2025-11-01T00:00:00"),
    endDate: new Date("2025-11-30T23:59:59"),
    worksPasswordURL: "works.html",
    worksPublicURL: "works_public.html",
    navSelector: 'a[href*="2025/gakusai"]'
  },
  "winter": {
    startDate: new Date("2026-01-10T00:00:00"),
    endDate: new Date("2026-02-15T23:59:59"),
    worksPasswordURL: "works.html",
    worksPublicURL: "works_public.html",
    navSelector: 'a[href*="2025/winter"]'
  }
};

// === 現在ページに応じた制御 ===
const now = new Date();
const path = window.location.pathname;
const match = path.match(/\/2025\/([^/]+)\//);
const exhibitionKey = match ? match[1] : null;

if (exhibitionKey && exhibitions[exhibitionKey]) {
  const { startDate, endDate, worksPasswordURL, worksPublicURL } = exhibitions[exhibitionKey];
  const voteButton = document.querySelector(".vote-container .button");
  const worksLink = document.querySelector('.link-buttons a[href*="works"]');

  if (now < startDate) {
    // 公開前：準備中
    if (voteButton) {
      voteButton.textContent = "準備中";
      voteButton.classList.add("disabled");
      voteButton.removeAttribute("href");
      voteButton.removeAttribute("target");
    }
    if (worksLink) {
      worksLink.textContent = "作品一覧（準備中）";
      worksLink.classList.add("disabled");
      worksLink.removeAttribute("href");
    }
  } else if (now >= startDate && now <= endDate) {
    // 投票期間中：有効化
    if (worksLink) {
      worksLink.setAttribute("href", worksPasswordURL);
      worksLink.classList.remove("disabled");
    }
  } else {
    // 終了後：投票ボタン無効化＋作品一般公開
    if (voteButton) {
      voteButton.textContent = "投票は終了しました";
      voteButton.classList.add("disabled");
      voteButton.removeAttribute("href");
      voteButton.removeAttribute("target");
    }
    if (worksLink) {
      worksLink.setAttribute("href", worksPublicURL);
      worksLink.classList.remove("disabled");
    }
  }
}

// === ナビゲーション制御 ===
for (const [key, conf] of Object.entries(exhibitions)) {
  const { startDate, navSelector } = conf;
  const navLink = document.querySelector(navSelector);
  if (!navLink) continue;

  if (now < startDate) {
    navLink.classList.add("disabled");
    navLink.removeAttribute("href");
  } else {
    navLink.classList.remove("disabled");
  }
}