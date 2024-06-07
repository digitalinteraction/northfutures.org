#!/usr/bin/env node

import fs from "node:fs/promises";
import { globby } from "globby";
import path from "node:path";
import cp from "node:child_process";
import { promisify } from "node:util";
import esbuild from "esbuild";
import {
	getBaseStyles,
	getStyles,
	processHtml,
} from "@openlab/alembic/tools.js";

const exec = promisify(cp.exec);

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
const alembicStyles = [await getBaseStyles()];
const styledSelectors = new Set();
const files = await globby(path.join(dir, "**/*.hbs"));
for (const file of files) {
	let contents = await fs.readFile(file, "utf8");
	for (const [selector, style] of getStyles(contents)) {
		if (!styledSelectors.has(selector)) {
			alembicStyles.push(style);
			styledSelectors.add(selector);
		}
	}
	contents = processHtml(contents, {
		extraStyles: [
			`<link rel="stylesheet" href="/assets/css/alembic.css?n=${Math.random()}">`,
		],
	});
	await fs.writeFile(file, contents);
}
await fs.writeFile(
	path.join(dir, "assets/css/alembic.css"),
	alembicStyles.join("\n"),
);

// 3. zip up the theme
await fs.rm("north-futures.zip").catch(() => {});
await exec(`zip -r ../north-futures.zip .`, {
	cwd: dir,
});

// 4. clean up
await fs.rm(dir, { recursive: true });
