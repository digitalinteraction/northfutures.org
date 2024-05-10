import fs from "node:fs/promises";
import { globby } from "globby";
import path from "node:path";
import esbuild from "esbuild";
import {
	getBaseScripts,
	getBaseStyles,
	getStyles,
	processHtml,
} from "@openlab/alembic/tools.js";

// 0. create a temp dir
const dir = await fs.mkdtemp("build_");
console.log("dir", dir);

await fs.cp("theme", dir, { recursive: true });
await fs.rm(path.join(dir, "assets/css"), { recursive: true });

// 1. build the css
await esbuild.build({
	entryPoints: ["theme/assets/css/screen.css"],
	outdir: path.join(dir, "assets/css"),
	bundle: true,
	external: ["/assets/img/*"],
	minify: true,
});

// 2. process .hbs files w/ alembic
const alembicStyles = [getBaseStyles()];
const files = await globby(path.join(dir, "**/*.hbs"));
for (const file of files) {
	let contents = await fs.readFile(file, "utf8");
	for (const [_selector, style] of getStyles(contents)) {
		alembicStyles.push(style);
	}
	if (!file.endsWith("default.hbs")) {
		contents = processHtml(contents);
	}
}
await fs.writeFile(
	path.join(dir, "assets/css/alembic.css"),
	alembicStyles.join("\n"),
);
// await fs.writeFile(path.join(dir, 'assets/alembic.js'))

const defaultTemplate = await fs.readFile(
	path.join(dir, "default.hbs"),
	"utf8",
);
// new RegExp(`<!--\\s+@openlab\/alembic\\s+${name}\\s+-->`)
defaultTemplate.replace(/<!--\s+@openlab\/alembic\s+inject-css\s+-->/, `plop`);
await fs.writeFile(path.join(dir, "default.hbs"), defaultTemplate);

// 3. zip up the theme

// 4. clean up
// await fs.rm(dir, { recursive: true });
