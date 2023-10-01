import { fetchPosts } from "../functions/fetch.js";
import { fetchImgURL } from "../functions/fetchimage.js";

// hoooking into cards in blog grid
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

// fetching image data
async function fetchImage(url) {
	const results = await fetch(url);
	const imageData = results.json();
	return imageData;
}

// setting source and alt properties on images
async function setImages(url, img) {
	const imageData = await fetchImage(url);
	img.src = imageData.source_url;
	img.alt = imageData.alt_text;
	img.id = imageData.id;
}

// view more button
const viewBtn = document.getElementById("viewMore");
const blogGrid = document.querySelector(".blog-grid");

viewBtn.addEventListener("click", (e) => {
	e.preventDefault();
	blogGrid.classList.toggle("closed");
	console.log(blogGrid.className);
	(blogGrid.className == "blog-grid grid") ?
		viewBtn.innerText = "view less" :
		viewBtn.innerText = "view more";
});

// open modal
const imageModal = document.createElement("div");
imageModal.className = "blog-modal flex";
document.body.appendChild(imageModal);

// building modal elements
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
			modalLink.id = selectedImage.id;
			console.log(modalLink.id)
			imageModal.classList.add("open");
		});
	});
}

getImageId();

// click even to link to individual post page
modalLink.addEventListener("click", (e) => {
	const imageID = e.target.id;
	window.location.href = `/post.html#/${imageID}`
})

// closes modal on click outside of modal, button and title
imageModal.addEventListener("click", (e) => {
    if (e.target !== modalTitle && e.target !== modalImg && e.target !== modalLink) {
        imageModal.classList.remove("open");
    }
})