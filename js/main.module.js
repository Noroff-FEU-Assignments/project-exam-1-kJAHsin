import { fetchPosts } from "./fetch.js";

const baseAPI = "https://blog.skinnyk.no/wp-json/wp/v2/";
const fetchImgURL = `${baseAPI}media/`;

async function setContent() {
	const blogList = await fetchPosts();
    const imageIDs = [];

	blogList.forEach((post) => {
		const testParagraph = document.createElement("p");
		testParagraph.innerHTML = post.content;
		document.body.appendChild(testParagraph);
        imageIDs.push(post.imgid);
	});

    return imageIDs;
}




async function fetchImages() {
    try {
        const imageIDs = await setContent();

        imageIDs.forEach(image => {
            const testImages = document.createElement("img");
            async function renderImg() {
                const results = await fetch(fetchImgURL + image);
                const images = await results.json();
                return images;
            }
            
            async function setImages() {
                const imageInfo = await renderImg();
                const testImage = document.createElement("img");
                testImage.src = imageInfo.source_url;
                document.body.appendChild(testImage);
            }

            setImages();
        })

    }
    catch (error) {
        console.error(`%cDownload error: %c${error.message}`, "color: pink", "color: black; font-weight: bold;");
    }
}

fetchImages();