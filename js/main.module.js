import { createCarousel } from "./carousel.js";
import { logoLink } from "./links.js";

logoLink();

// link to individual blog post page
const linkToPage = async () => {
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