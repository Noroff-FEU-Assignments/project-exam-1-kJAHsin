import { createCarousel } from "./carousel.js";

// make logo into link to home page
const logoLink = document.querySelector(".logo");

logoLink.addEventListener("click", () => {
    window.location = "./index.html"
})

// link to individual blog post page
const linkToPage = async () => {
    // create carousel
    await createCarousel();
    const blogLinks = document.querySelectorAll(".carousel-card");
    blogLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const imageID = e.target.id;
            window.location.href = `/post.html#/${imageID}`
        })
    })
}

linkToPage();