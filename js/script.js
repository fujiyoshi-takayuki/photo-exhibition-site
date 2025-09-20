let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
        header.style.top = "-70px"; // ヘッダーの高さ分隠す
    } else {
        header.style.top = "0";
    }
    lastScrollY = window.scrollY;
});