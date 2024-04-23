module.exports = class PostTemplate {
	data() {
		return {
			layout: "post.njk",
			permalink: (data) => data.post.url,
			pagination: {
				data: "collections.posts",
				size: 1,
				alias: "post",
				addAllPagesToCollections: true,
			},
			eleventyComputed: {
				title: (data) => data.post.title,
				codeinjection_head: (data) => data.post.codeinjection_head,
				codeinjection_foot: (data) => data.post.codeinjection_foot,
			},
		};
	}
	render(data) {
		return data.post.html;
	}
};
