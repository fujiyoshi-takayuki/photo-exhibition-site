/*
============================================================
  exhibition-control.js
  法政大学 小金井写真部 写真展サイト - 自動制御スクリプト
============================================================

【目的】
  ・写真展の開催スケジュールに基づいて「準備中」「公開」を自動で切り替える。
  ・投票フォームボタン、作品一覧リンク、ナビゲーション、トップページのボタンを日付で制御。

【更新手順（後輩向け）】
  1️⃣ 下の exhibitions オブジェクトに新しい年度と開催期間を追加。
  2️⃣ HTMLの <a> タグに data-year / data-season 属性があれば、自動で動作。
  3️⃣ 投票フォームや作品一覧ページもこのスクリプトが制御します。

【備考】
  ・disabled クラスを使ってクリック無効＋グレーアウト表示。
  ・「works.html」＝パスワード制、「works_public.html」＝一般公開ページ。
  ・年をまたいでも構造は共通。
============================================================
*/

// === 年度ごとの開催スケジュール ===
const exhibitions = {
  2025: {
    summer: {
      start: "2025-09-15T00:00:00", // 公開開始
      end:   "2025-09-28T23:59:59", // 投票終了
      worksPasswordURL: "works.html",
      worksPublicURL: "af69592862e159a7cf723a78c20a47ce109d13b04db75224503159b765b84967/index.html",
      voteURL: "https://forms.gle/YJQeJJkgrZZoCbBs5"
    },
    gakusai: {
      start: "2025-11-01T00:00:00",
      end:   "2025-11-30T23:59:59",
      worksPasswordURL: "works.html",
      worksPublicURL: "works_public.html",
      voteURL: "https://example.com/form_gakusai" // ← 決まり次第更新
    },
    winter: {
      start: "2026-01-10T00:00:00",
      end:   "2026-02-15T23:59:59",
      worksPasswordURL: "works.html",
      worksPublicURL: "works_public.html",
      voteURL: "https://example.com/form_winter" // ← 決まり次第更新
    },
  },
  2026: {
    summer: {
      start: "2026-09-10T00:00:00",
      end:   "2026-10-15T23:59:59",
      worksPasswordURL: "works.html",
      worksPublicURL: "works_public.html",
      voteURL: "https://example.com/form_2026summer"
    },
    gakusai: {
      start: "2026-11-01T00:00:00",
      end:   "2026-11-30T23:59:59",
      worksPasswordURL: "works.html",
      worksPublicURL: "works_public.html",
      voteURL: "https://example.com/form_2026gakusai"
    },
    winter: {
      start: "2027-01-10T00:00:00",
      end:   "2027-02-15T23:59:59",
      worksPasswordURL: "works.html",
      worksPublicURL: "works_public.html",
      voteURL: "https://example.com/form_2026winter"
    },
  },
};

// === 共通処理 ===
const now = new Date();
const path = window.location.pathname;

// ===============================
//  各写真展ページの制御
// ===============================
const match = path.match(/\/(\d{4})\/([^/]+)\//);
const currentYear = match ? match[1] : null;
const currentSeason = match ? match[2] : null;

if (currentYear && currentSeason && exhibitions[currentYear] && exhibitions[currentYear][currentSeason]) {
  const conf = exhibitions[currentYear][currentSeason];
  const startDate = new Date(conf.start);
  const endDate = new Date(conf.end);

  const voteButton = document.querySelector(".vote-container .button");
  const worksLink = document.querySelector('.link-buttons a[href*="works"]');

  // --- 投票フォームボタンの制御 ---
  if (voteButton) {
    if (now < startDate) {
      voteButton.textContent = "投票期間はまだ始まっていません";
      voteButton.classList.add("disabled");
      voteButton.removeAttribute("href");
      voteButton.removeAttribute("target");
    } else if (now >= startDate && now <= endDate) {
      voteButton.textContent = "投票フォームはこちら";
      voteButton.classList.remove("disabled");
      voteButton.setAttribute("href", conf.voteURL);
      voteButton.setAttribute("target", "_blank");
    } else {
      voteButton.textContent = "投票は終了しました";
      voteButton.classList.add("disabled");
      voteButton.removeAttribute("href");
      voteButton.removeAttribute("target");
    }
  }

  // --- 作品一覧ページの制御 ---
  if (worksLink) {
    if (now < startDate) {
      worksLink.textContent = "作品一覧（準備中）";
      worksLink.classList.add("disabled");
      worksLink.removeAttribute("href");
    } else if (now >= startDate && now <= endDate) {
      worksLink.textContent = "作品一覧（パスワード制）";
      worksLink.classList.remove("disabled");
      worksLink.setAttribute("href", conf.worksPasswordURL);
    } else {
      worksLink.textContent = "作品一覧（一般公開中）";
      worksLink.classList.remove("disabled");
      worksLink.setAttribute("href", conf.worksPublicURL);
    }
  }
}

// ===============================
//  トップページ（index.html）の制御
// ===============================
const topButtons = document.querySelectorAll('.year-block a[data-year][data-season]');

topButtons.forEach(button => {
  const year = button.dataset.year;
  const season = button.dataset.season;
  const conf = exhibitions[year]?.[season];
  if (!conf) return;

  const startDate = new Date(conf.start);
  if (now < startDate) {
    button.textContent = `${year}${season === "summer" ? "夏" : season === "gakusai" ? "学祭" : "冬"}写真展（準備中）`;
    button.classList.add("disabled");
    button.removeAttribute("href");
  } else {
    button.classList.remove("disabled");
    button.setAttribute("href", `/${year}/${season}/`);
  }
});

// ===============================
//  ナビゲーションバーの制御
// ===============================
for (const [year, seasons] of Object.entries(exhibitions)) {
  for (const [season, conf] of Object.entries(seasons)) {
    const navLink = document.querySelector(`.navbar a[href*="${year}/${season}"]`);
    if (!navLink) continue;
    const startDate = new Date(conf.start);

    if (now < startDate) {
      navLink.classList.add("disabled");
      navLink.removeAttribute("href");
    } else {
      navLink.classList.remove("disabled");
      navLink.setAttribute("href", `/${year}/${season}/`);
    }
  }
}