const burgerOpen = document.querySelector(".burger-icon > svg:first-child");
const burgerClose = document.querySelector(".burger-icon > svg:last-child");
const burgerMenu = document.querySelector(".nav");

burgerOpen.addEventListener("click", () => {
    burgerOpen.classList.add("hidden");
    burgerClose.classList.remove("hidden");
    burgerMenu.classList.add("open");
})

burgerClose.addEventListener("click", () => {
    burgerClose.classList.add("hidden");
    burgerOpen.classList.remove("hidden");
    burgerMenu.classList.remove("open")
})