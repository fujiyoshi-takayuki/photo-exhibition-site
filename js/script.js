let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
    if (window.scrollY <= 0) {
        // ページ最上部では常に表示
        header.style.top = "0";
    } elese if (window.scrollY > lastScrollY) {
        // 下スクロール → ヘッダーを隠す
        header.style.top = "70px";
    } else {
        // 上スクロール → ヘッダーを表示
        header.style.top = "0";
    }
    lastScrollY = window.scrollY;
});