import { fetchPosts, fetchURL } from "./fetch.js";
import { fetchImgURL } from "./fetchimage.js";

const getBlog = async () => {
	const postId = window.location.href.split("#/").pop();
	const blogList = await fetchPosts();
    let postContent;

	blogList.forEach(post => {
		if (post.imgid == postId) {
			postContent = post;
		}
    })
    return postContent;	
};

async function renderPage() {
    const postContent = await getBlog();
    
    const imageFetchURL = getImageFetchURL(postContent.imgid);
    const postObject = {
        title: postContent.title,
        content: postContent.content,
        imageHref: imageFetchURL
    }    
    return postObject
}

const getImageFetchURL = (id) => {
    const imageURL = fetchImgURL + id;
    return imageURL;
}


// render dom
async function renderPost() {
    const postObject = await renderPage();
    const container = document.querySelector("main");

    const title = document.createElement("h1");
    title.className = "blog-title";
    title.innerHTML = postObject.title;
    container.appendChild(title);

    const content = document.createElement("p");
    content.className = "blog-content";
    content.innerHTML = postObject.content;
    container.appendChild(content);

}

renderPost();