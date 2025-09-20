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