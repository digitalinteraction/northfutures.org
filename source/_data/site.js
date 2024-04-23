const { ghost } = require("../_11ty/ghost.js");

module.exports = async function () {
	try {
		const settings = await ghost.settings.browse({
			include: "icon,url",
		});

		if (process.env.SITE_URL) {
			settings.url = process.env.SITE_URL;
		}

		console.log("SITE", JSON.stringify(settings));

		return settings;
	} catch (error) {
		console.error("Ghost settings error", error);
	}
};
