import { fetchPosts } from "./fetch.js";
import { fetchImgURL } from "./fetchimage.js";

const cards = document.querySelectorAll(".blog-grid > .card");

async function setCards() {
	const blogList = await fetchPosts();

	// setting content on cards
	cards.forEach((card, idx) => {
		const cardTitle = document.createElement("h2");
		cardTitle.innerHTML = blogList[idx].title;
		card.appendChild(cardTitle);

		const cardImageURL = fetchImgURL + blogList[idx].imgid;
		const cardImage = document.createElement("img");
		setImages(cardImageURL, cardImage);
		card.appendChild(cardImage);
	});
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

// view more button
const viewBtn = document.getElementById("viewMore");
const blogGrid = document.querySelector(".blog-grid");

viewBtn.addEventListener("click", (e) => {
	e.preventDefault();
	blogGrid.classList.toggle("closed");
});

// open modal
const imageModal = document.createElement("div");
imageModal.className = "blog-modal flex";
document.body.appendChild(imageModal);

const modalTitle = document.createElement("h2");
imageModal.appendChild(modalTitle);

const modalImg = document.createElement("img");
modalImg.className = "modal-image";
imageModal.appendChild(modalImg);

const modalLink = document.createElement("button");
modalLink.className = "modalBtn";
modalLink.innerText = "view blog post";
imageModal.appendChild(modalLink);

// click event to fill modal image
async function getImageId() {
	await setCards();
	cards.forEach((card) => {
		card.addEventListener("click", () => {
			const selectedTitle = card.querySelector("h2");
			modalTitle.innerText = selectedTitle.innerText;
			const selectedImage = card.querySelector("img");
			modalImg.src = selectedImage.src;
			modalImg.alt = selectedImage.alt;
			imageModal.classList.add("open");
		});
	});
}

getImageId();

imageModal.addEventListener("click", (e) => {
    if (e.target !== modalTitle && e.target !== modalImg && e.target !== modalLink) {
        imageModal.classList.remove("open");
    }
})