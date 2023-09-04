import { fetchPosts } from "./fetch.js";

async function renderPage() {
    const blogList = await fetchPosts();

    blogList.forEach(post => {
        const testParagraph = document.createElement("p");
        testParagraph.innerHTML = post.content;
        document.body.appendChild(testParagraph);
    })
    
}

renderPage();