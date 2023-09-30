const loader = document.querySelector(".loader");

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        loader.classList.add("close");
    }, 600);
});
