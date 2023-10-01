const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("close");
    }, 800);
});
