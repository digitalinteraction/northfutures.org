module.exports = class DocTemplate {
	data() {
		return {
			layout: "doc.njk",
			permalink: (data) => `${data.doc.url}`,
			pagination: {
				data: "collections.docs",
				size: 1,
				alias: "doc",
				addAllPagesToCollections: true,
			},
			eleventyComputed: {
				title: (data) => data.doc.title,
				codeinjection_head: (data) => data.doc.codeinjection_head,
				codeinjection_foot: (data) => data.doc.codeinjection_foot,
			},
		};
	}
	render(data) {
		return data.doc.html;
	}
};
