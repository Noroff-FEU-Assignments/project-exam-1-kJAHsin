import { fetchPosts } from "../functions/fetch.js";
import { fetchImages } from "../functions/fetchimage.js";

// creating carousel in dom
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

    // creating scroll toggle in dom
    const scrollWrapper = document.createElement("div");
    scrollWrapper.className = "scroll-wrapper flex";
    main.appendChild(scrollWrapper)

    const leftToggle = document.createElement("button");
    leftToggle.className = "toggle-left"
    leftToggle.innerText = "< left";
    const rightToggle = document.createElement("button");
    rightToggle.className = "toggle-right"
    rightToggle.innerText = "right >";

    scrollWrapper.appendChild(leftToggle);
    scrollWrapper.appendChild(rightToggle);

    // scrolling logic
    // will be tweaked
    let wrapperWidth;
    let gridWidth;
    let translate = 0;
    let translateX = 12.5;
    
    rightToggle.addEventListener("click", (e) => {
        e.preventDefault();
        wrapperWidth = carouselWrapper.clientWidth;
        gridWidth = carouselGrid.clientWidth;
        
        if ((gridWidth - wrapperWidth ) * -1 / 16 < translate) {
            translate -= translateX;
            carouselGrid.style.translate = `${translate}rem`;
        }
        
    })
    
    leftToggle.addEventListener("click", (e) => {
        e.preventDefault();
        wrapperWidth = carouselWrapper.clientWidth;
        gridWidth = carouselGrid.clientWidth;

        if (translate < 0) {
            translate += translateX;
            carouselGrid.style.translate = `${translate}rem`;
        }

    })
}
