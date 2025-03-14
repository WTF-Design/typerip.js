#!/usr/bin/env node

const { program } = require("commander");
const opentype = require("opentype.js");
const fs = require("fs");
const { arrayBuffer } = require("stream/consumers");

program
	.version("0.0.1")
	.argument("[input-directory]", "Input directory for looking up obfuscated font file names")
	.argument("[output-directory]", "Output directory for writing restored font file names")
	.option("-r, --rename", "Rename found files. Default is making copies.")
	.description(`
A tool for restoring obfuscated font file names. Works on a directory basis.
If output directory is not specified, the input directory is used.
If input directory is not specified, current working directory is used.
`)
;

function bufferToArrayBuffer(buffer) {
	const arrayBuffer = new ArrayBuffer(buffer.length);
	const view = new Uint8Array(arrayBuffer);
	for (let i = 0; i < buffer.length; ++i) {
		view[i] = buffer[i];
	}
	return arrayBuffer;
}

program.parse();

const dir = {
	in: "./",
	out: "./",
};

dir.in = program.args[0] ?? "./";
if (dir.in[dir.in.length - 1] != "/") dir.in += "/";
dir.out = program.args[1] ?? dir.in;
if (dir.out[dir.out.length - 1] != "/") dir.out += "/";

let homedir;
Object.keys(dir).forEach(io => {
	if (!homedir && dir[io][0] == "~") {
		homedir = require("os").homedir();
	}
	dir[io] = dir[io].replace(/^~/, homedir);
});

console.log(`Looking in ${dir.in}`);

let fontFiles = fs.readdirSync(dir.in).filter(file => /\.\d+\.(o|t)tf$/.test(file));

if (fontFiles.length) {
	console.log(`Found ${fontFiles.length} obfuscated font file name(s).`);
	console.log(program.opts().rename ? `Renaming...` : "Copying...");
	if (!fs.existsSync(dir.out)) fs.mkdirSync(dir.out, {recursive: true});
	let buffer, font, ext;
	fontFiles.forEach(fontFile => {
		buffer = fs.readFileSync(dir.in + fontFile, null);
		font = opentype.parse(bufferToArrayBuffer(buffer));
		ext = fontFile.slice(fontFile.lastIndexOf("."));
		console.log(`${fontFile} => ${font.names.fullName.en}${ext}`);
		if (program.opts().rename) {
			fs.renameSync(dir.in + fontFile, dir.out + font.names.fullName.en + ext);
		} else {
			fs.copyFileSync(dir.in + fontFile, dir.out + font.names.fullName.en + ext);
		}
	});
	console.log(`Done.`, (dir.in != dir.out ? `Here you go: ${dir.out}` : ""));
} else {
	console.log(`No obfuscated font file names found.`);
}
