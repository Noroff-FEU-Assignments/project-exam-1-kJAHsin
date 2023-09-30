const baseAPI = "https://blog.skinnyk.no/wp-json/wp/v2/";
export const fetchURL = `${baseAPI}posts?per_page=12`;

// fetch elements from posts
// push into blogList that will be returned when reusing the function
export const fetchPosts = async () => {
	try {
		const results = await fetch(fetchURL);
		const posts = await results.json();
		const blogList = [];

		posts.forEach((postInfo) => {
			const postTitle = postInfo.title.rendered;
			const postContent = postInfo.content.rendered;
			const imageID = postInfo.featured_media;

			const post = {
				postid: postInfo.id,
				title: postTitle,
				content: postContent,
				imgid: imageID,
			};

			blogList.push(post);
		});
		return blogList;
	} catch (error) {
		console.error(
			`%cDownload error: %c${error.message}`,
			"color: pink",
			"color: black; font-weight: bold;"
		);
	}
};
