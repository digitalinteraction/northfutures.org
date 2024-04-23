const fs = require("node:fs");
// const cleanCSS = require("clean-css");
const rss = require("@11ty/eleventy-plugin-rss");
const { eleventyAlembic } = require("@openlab/alembic/11ty");
const localImages = require("eleventy-plugin-local-images");
const lazyImages = require("eleventy-plugin-lazyimages");

const markdown = require("markdown-it");
const markdownAnchor = require("markdown-it-anchor");

const { eleventyGhost } = require("./source/_11ty/ghost.js");

const md = markdown({ html: true });
md.use(markdownAnchor);

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
	config.addPlugin(rss);
	config.addPlugin(eleventyAlembic);
	config.addPlugin(lazyImages, { cacheFile: "" });
	config.addPlugin(localImages, {
		dist: "dist",
		assetPath: "/assets/images",
		selector: "img",
		attribute: "data-src", // Lazy images attribute
		verbose: false,
	});
	config.addPlugin(eleventyGhost);
	// config.addFilter("cssmin", (code) => new cleanCSS({}).minify(code).styles);

	config.addFilter("htmlDateString", (input) => {
		return new Date(input).toISOString().split("T")[0];
	});

	config.addWatchTarget("./source/build.txt");

	// Might be good to use VirtualTemplates in the future?
	// https://github.com/11ty/eleventy/issues/1612

	config.addPassthroughCopy("assets");
	config.setLibrary("md", md);

	return {
		dir: {
			input: "source",
			layouts: "_layouts",
		},
		templateFormats: ["css", "njk", "md", "txt", "11ty.js"],
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
	};
};
