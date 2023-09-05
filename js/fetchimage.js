import { fetchPosts } from "./fetch.js";

const baseAPI = "https://blog.skinnyk.no/wp-json/wp/v2/";
export const fetchImgURL = `${baseAPI}media/`;

async function setContent() {
	const blogList = await fetchPosts();
    const imageIDs = [];
    const carouselCards = document.querySelectorAll(".carousel-card");

	blogList.forEach((post, idx) => {
		const testParagraph = document.createElement("p");
		testParagraph.innerHTML = post.content;
		carouselCards[idx].appendChild(testParagraph);
        imageIDs.push(post.imgid);
	});

    return imageIDs;
}

export async function fetchImages() {
    try {
        const imageIDs = await setContent();
        const carouselCards = document.querySelectorAll(".carousel-card");


        imageIDs.forEach((image, idx) => {
            async function renderImg() {
                const results = await fetch(fetchImgURL + image);
                const images = await results.json();
                return images;
            }
            
            async function setImages() {
                const imageInfo = await renderImg();
                const image = document.createElement("img");
                image.src = imageInfo.source_url;
                image.id = imageInfo.id;
                carouselCards[idx].appendChild(image)
            }

            setImages();
        })

    }
    catch (error) {
        console.error(`%cDownload error: %c${error.message}`, "color: pink", "color: black; font-weight: bold;");
    }
}
