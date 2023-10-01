import { createCarousel } from "../components/carousel.js";
import { logoLink } from "../functions/links.js";

// set link on logo in header
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