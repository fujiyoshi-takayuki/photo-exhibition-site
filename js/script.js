let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  if (scrollTop <= 0) {
    // ページ最上部
    header.style.top = "0";
    navbar.style.top = "70px";
  } else if (scrollTop + windowHeight >= docHeight) {
    // ページ最下部 → ヘッダーは隠したまま、ナビは上に吸着
    header.style.top = "-70px";
    navbar.style.top = "0";
  } else if (scrollTop > lastScrollY) {
    // 下スクロール中 → ヘッダー隠す、ナビ最上部
    header.style.top = "-70px";
    navbar.style.top = "0";
  } else {
    // 上スクロール中 → ヘッダー表示、ナビを下げる
    header.style.top = "0";
    navbar.style.top = "70px";
  }

  lastScrollY = scrollTop;
});

document.addEventListener("DOMContentLoaded", function() {
  const instaIcons = document.querySelectorAll(".insta-icon");
  if (!instaIcons.length) return;

  // ポップアップ生成
  const overlay = document.createElement("div");
  overlay.className = "popup-overlay";
  overlay.innerHTML = `
    <div class="popup-content">
      <p>Instagramアカウントを表示しますか？</p>
      <div class="popup-buttons">
        <button class="confirm">表示する</button>
        <button class="cancel">閉じる</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const confirmBtn = overlay.querySelector(".confirm");
  const cancelBtn = overlay.querySelector(".cancel");
  let currentURL = null;

  instaIcons.forEach(icon => {
    const parent = icon.closest(".work-author");
    const url = parent.dataset.instagram;
    if (!url) return;

    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      currentURL = url;
      overlay.style.display = "flex";
    });
  });

  // 「表示する」クリックで新タブ
  confirmBtn.addEventListener("click", () => {
    if (currentURL) window.open(currentURL, "_blank");
    overlay.style.display = "none";
  });

  // 「閉じる」または背景クリックで閉じる
  cancelBtn.addEventListener("click", () => overlay.style.display = "none");
  overlay.addEventListener("click", e => {
    if (e.target === overlay) overlay.style.display = "none";
  });
});

/* 説明文の「もっと見る」機能 */

document.addEventListener("DOMContentLoaded", function() {
  const toggleButtons = document.querySelectorAll(".toggle-desc");

  toggleButtons.forEach(button => {
    const desc = button.previousElementSibling;

    // --- 初期チェック: 説明文が短い場合はボタンを非表示 ---
    const originalMaxHeight = getComputedStyle(desc).maxHeight;
    desc.style.maxHeight = "none";
    const fullHeight = desc.scrollHeight;
    desc.style.maxHeight = originalMaxHeight;

    // 表示領域より短い場合はボタンを非表示
    if (fullHeight <= desc.clientHeight + 5) {
      button.style.display = "none";
      return;
    }

    // --- 通常の展開/閉じる動作 ---
    button.addEventListener("click", () => {
      desc.classList.toggle("expanded");
      button.textContent = desc.classList.contains("expanded") ? "閉じる" : "もっと見る";
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const descBlocks = document.querySelectorAll(".work-info .work-description");

  descBlocks.forEach(desc => {
    // 直後の兄弟がボタンの想定
    const btn = desc.nextElementSibling;
    if (!btn || !btn.classList.contains("toggle-desc")) return;

    // 一旦制限を外して本来の高さを測定
    const originalMax = desc.style.maxHeight;
    desc.style.maxHeight = "none";
    const full = desc.scrollHeight; // 全文高さ
    // 初期折りたたみ高さ（CSSの6em相当をpxにする簡易法）
    // 固定 6em ではなく、実測に戻すため px を使う
    const lineHeight = parseFloat(getComputedStyle(desc).lineHeight) || 18;
    const collapsedPx = Math.round(lineHeight * 5); // だいたい5行ぶん
    // 初期状態に戻す
    desc.style.maxHeight = originalMax || `${collapsedPx}px`;

    // 内容が短くて折りたたむ必要がなければボタンを隠す
    if (full <= collapsedPx + 4) {
      btn.style.display = "none";
      return;
    }

    // クリックで開閉
    btn.addEventListener("click", () => {
      const isExpanded = desc.classList.toggle("expanded");
      if (isExpanded) {
        // 展開：実測値をセット
        desc.style.maxHeight = full + "px";
        btn.textContent = "閉じる";
      } else {
        // 折りたたみ：元の高さへ
        desc.style.maxHeight = collapsedPx + "px";
        btn.textContent = "もっと見る";
      }
    });
  });
});