let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY <= 0) {
    // ページ最上部
    header.style.top = "0";
    navbar.style.top = "70px"; // ヘッダーの下
  } else if (window.scrollY > lastScrollY) {
    // 下スクロール → ヘッダー隠す
    header.style.top = "-70px";
    navbar.style.top = "0"; // ナビが最上部に吸い付く
  } else {
    // 上スクロール → ヘッダー表示
    header.style.top = "0";
    navbar.style.top = "70px"; // 押し出されて下にずれる
  }
  lastScrollY = window.scrollY;
});