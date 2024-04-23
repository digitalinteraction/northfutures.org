require("dotenv/config");

const Ghost = require("@tryghost/content-api");

const ghost = new Ghost({
	url: process.env.GHOST_URL,
	key: process.env.GHOST_CONTENT_API_KEY,
	version: "v5.0",
});

const ghostUrl = process.env.GHOST_URL;

function stripGhostUrl(input) {
	return input.replace(process.env.GHOST_URL, "");
}

function eleventyGhost(config) {
	// Get all pages, called 'docs' to prevent
	// conflicting the eleventy page object
	config.addCollection("docs", async function (collection) {
		collection = await ghost.pages
			.browse({
				include: "authors",
				limit: "all",
			})
			.catch((err) => {
				console.error(err);
			});

		collection.map((doc) => {
			doc.url = stripGhostUrl(doc.url);
			doc.primary_author.url = stripGhostUrl(doc.primary_author.url);

			// Convert publish date into a Date object
			doc.published_at = new Date(doc.published_at);
			return doc;
		});

		console.log("DOCS", JSON.stringify(collection));

		return collection;
	});

	// Get all posts
	config.addCollection("posts", async function (collection) {
		collection = await ghost.posts
			.browse({
				include: "tags,authors",
				limit: "all",
			})
			.catch((err) => {
				console.error(err);
			});

		collection.forEach((post) => {
			post.url = stripGhostUrl(post.url);
			post.primary_author.url = stripGhostUrl(post.primary_author.url);
			post.tags.map((tag) => (tag.url = stripGhostUrl(tag.url)));

			// Convert publish date into a Date object
			post.published_at = new Date(post.published_at);
		});

		// Bring featured post to the top of the list
		collection.sort((post, nextPost) => nextPost.featured - post.featured);

		console.log("POSTS", JSON.stringify(collection));

		return collection;
	});

	// Get all authors
	config.addCollection("authors", async function (collection) {
		collection = await ghost.authors
			.browse({
				limit: "all",
			})
			.catch((err) => {
				console.error(err);
			});

		// Get all posts with their authors attached
		const posts = await ghost.posts
			.browse({
				include: "authors",
				limit: "all",
			})
			.catch((err) => {
				console.error(err);
			});

		// Attach posts to their respective authors
		collection.forEach(async (author) => {
			const authorsPosts = posts.filter((post) => {
				post.url = stripGhostUrl(post.url);
				return post.primary_author.id === author.id;
			});
			if (authorsPosts.length) author.posts = authorsPosts;

			author.url = stripGhostUrl(author.url);
		});

		console.log("AUTHORS", JSON.stringify(collection));

		return collection;
	});

	// Get all tags
	config.addCollection("tags", async function (collection) {
		collection = await ghost.tags
			.browse({
				include: "count.posts",
				limit: "all",
			})
			.catch((err) => {
				console.error(err);
			});

		// Get all posts with their tags attached
		const posts = await ghost.posts
			.browse({
				include: "tags,authors",
				limit: "all",
			})
			.catch((err) => {
				console.error(err);
			});

		// Attach posts to their respective tags
		collection.forEach(async (tag) => {
			const taggedPosts = posts.filter((post) => {
				post.url = stripGhostUrl(post.url);
				return post.primary_tag && post.primary_tag.slug === tag.slug;
			});
			if (taggedPosts.length) tag.posts = taggedPosts;

			tag.url = stripGhostUrl(tag.url);
		});

		console.log("TAGS", JSON.stringify(collection));

		return collection;
	});
}

module.exports = { ghost, ghostUrl, stripGhostUrl, eleventyGhost };
