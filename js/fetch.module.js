import { baseAPI } from "./main.js";
const fetchURL = baseAPI + "posts";

// https://blog.skinnyk.no/wp-json/wp/v2/media/9

const fetchPosts = async () => {
    try {
        const results = await fetch(fetchURL);
        const posts = await results.json();

        // console.log(posts)

        posts.forEach(postInfo => {

            const postTitle = postInfo.content.rendered.replace("\n<p>", "").replace("</p>\n", "");
            // const postImage = postInfo.content.

            const post = {
                title: postTitle
            }


            console.log(post)
        })
    }
    catch (error) {
        console.error(`%cDownload %cerror: %c${error.message}`, "color: pink", "color: red", "color: black; font-weight: bold;");
    }
}

fetchPosts();