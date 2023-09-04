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

    rightToggle.addEventListener("click", (e) => {
        e.preventDefault();
        carouselGrid.classList.add("right")
    })
    
    leftToggle.addEventListener("click", (e) => {
        e.preventDefault();
        carouselGrid.classList.remove("right")
    })
}