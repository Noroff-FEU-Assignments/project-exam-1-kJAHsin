import { fetchPosts } from "./fetch.js";
import { fetchImages } from "./fetchimage.js";

export const createCarousel = async () => {
    const posts = await fetchPosts();
    
    const carouselWrapper = document.createElement("div");
    carouselWrapper.className = "carousel-wrapper";
    document.body.appendChild(carouselWrapper);
    
    const carouselGrid = document.createElement("div");
    carouselGrid.className = "carousel-grid"
    carouselWrapper.appendChild(carouselGrid);
    
    posts.forEach(post => {
        const card = document.createElement("div");
        card.className = "carousel-card";
        carouselGrid.appendChild(card);
    })
    fetchImages();
}