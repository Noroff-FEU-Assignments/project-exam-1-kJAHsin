import { fetchPosts } from "../functions/fetch.js";

const baseAPI = "https://blog.skinnyk.no/wp-json/wp/v2/";
export const fetchImgURL = `${baseAPI}media/`;

// setting non-image content from fetch
async function setContent() {
	const blogList = await fetchPosts();
	const imageIDs = [];
	const carouselCards = document.querySelectorAll(".carousel-card");

	blogList.forEach((post, idx) => {
		const title = document.createElement("h3");
		title.innerHTML = post.title;

		carouselCards[idx].appendChild(title);
		imageIDs.push(post.imgid);
	});
	return imageIDs;
}

// 
export async function fetchImages() {
	try {
		const imageIDs = await setContent();
		const carouselCards = document.querySelectorAll(".carousel-card");

		// grabbing image by image id
		imageIDs.forEach((image, idx) => {
			async function renderImg() {
				const results = await fetch(fetchImgURL + image);
				const images = await results.json();
				return images;
			}

			// setting image url and alt, and appending it to it's card
			async function setImages() {
				const imageInfo = await renderImg();
				const image = document.createElement("img");
				image.src = imageInfo.source_url;
				image.id = imageInfo.id;
				carouselCards[idx].appendChild(image);
			}

			setImages();
		});
	} catch (error) {
		console.error(
			`%cDownload error: %c${error.message}`,
			"color: pink",
			"color: black; font-weight: bold;"
		);
	}
}
