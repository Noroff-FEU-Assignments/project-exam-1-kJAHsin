import { fetchPosts } from "./fetch.js";
import { fetchImages } from "./fetchimage.js";

export const createCarousel = async () => {
    const posts = await fetchPosts();
    const main = document.querySelector("main");
    
    const carouselWrapper = document.createElement("div");
    carouselWrapper.className = "carousel-wrapper flex";
    main.appendChild(carouselWrapper);
    
    const carouselGrid = document.createElement("div");
    carouselGrid.className = "carousel-grid grid"
    carouselWrapper.appendChild(carouselGrid);
    
    posts.forEach(post => {
        const card = document.createElement("div");
        card.className = "carousel-card";
        carouselGrid.appendChild(card);

        const cardTitleBG = document.createElement("div");
        cardTitleBG.className = "title-bg";
        card.appendChild(cardTitleBG);
    })

    fetchImages();

    const scrollWrapper = document.createElement("div");
    scrollWrapper.className = "scroll-wrapper flex";
    main.appendChild(scrollWrapper)

    const leftToggle = document.createElement("button");
    leftToggle.innerText = "left";
    const rightToggle = document.createElement("button");
    rightToggle.innerText = "right";

    scrollWrapper.appendChild(leftToggle);
    scrollWrapper.appendChild(rightToggle);

    const firstImgs = document.querySelectorAll(".carousel-card:nth-child(-n + 6)");
    const lastImgs = document.querySelectorAll(".carousel-card:nth-child(n + 7)");

    rightToggle.addEventListener("click", (e) => {
        e.preventDefault();
        firstImgs.forEach(img => {img.classList.add("hidden")})
        lastImgs.forEach(img => {img.classList.remove("hidden")})
    })
    
    leftToggle.addEventListener("click", (e) => {
        e.preventDefault();
        firstImgs.forEach(img => {img.classList.remove("hidden")})
        lastImgs.forEach(img => {img.classList.add("hidden")})
    })
}