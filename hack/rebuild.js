#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");

const filename = path.join(__dirname, "build.txt");
console.log("target=" + filename.toString());

const server = http.createServer((req, res) => {
	const timestamp = new Date().toISOString();
	console.log(timestamp);
	fs.writeFileSync(filename, timestamp);
	res.end("ok");
});

server.listen(9001, () => console.log("listening on http://localhost:9001"));

process.addListener("SIGINT", () => process.exit(0));
process.addListener("SIGTERM", () => process.exit(1));
