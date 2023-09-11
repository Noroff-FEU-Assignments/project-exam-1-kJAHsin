import { fetchPosts } from "./fetch.js";
import { fetchImgURL } from "./fetchimage.js";

async function setCards() {
	const blogList = await fetchPosts();
	const cards = document.querySelectorAll(".blog-grid > .card");
    const imgIDs = await getImageID();

	// setting content on cards
	cards.forEach((card, idx) => {
		const cardTitle = document.createElement("h2");
		cardTitle.innerHTML = blogList[idx].title;
        card.appendChild(cardTitle)

        const cardImageURL = fetchImgURL + blogList[idx].imgid;
        const cardImage = document.createElement("img");
        setImages(cardImageURL, cardImage);
        card.appendChild(cardImage);
	});
}

async function getImageID() {
    const blogList = await fetchPosts();
    const imgIDs = [];
    
    blogList.forEach(blog => {
        imgIDs.push(blog.imgid);
    })
    
    return imgIDs;
}

async function fetchImage(url) {
    const results = await fetch(url);
    const imageData = results.json();
    return imageData;
}

async function setImages(url, img) {
    const imageData = await fetchImage(url);
    img.src = imageData.source_url;
    img.alt = imageData.alt_text;
}

setCards();

// view more button
const viewBtn = document.getElementById("viewMore");
const blogGrid = document.querySelector(".blog-grid")

viewBtn.addEventListener("click", (e) => {
    e.preventDefault();
    blogGrid.classList.toggle("closed")
})