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