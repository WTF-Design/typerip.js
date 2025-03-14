# typerip.js

```
$ ./typerip.js "~/Library/Application Support/Adobe/CoreSync/plugins/livetype/.r"
Looking in /Users/me/Library/Application Support/Adobe/CoreSync/plugins/livetype/.r/
Found 10 obfuscated font file name(s).
Renaming...
.8420.otf => DepotNew-Bold.otf
.8421.otf => DepotNew-BoldItalic.otf
.8422.otf => DepotNew-Light.otf
.8423.otf => DepotNew-LightItalic.otf
.8424.otf => DepotNew-Medium.otf
.8425.otf => DepotNew-MediumItalic.otf
.8426.otf => DepotNew-Regular.otf
.8427.otf => DepotNew-Italic.otf
.8428.otf => DepotNew-Thin.otf
.8429.otf => DepotNew-ThinItalic.otf
Done.
```

A command line tool for restoring obfuscated font file names. Works on a
directory basis. If output directory is not specified, the input directory is
used. If input directory is not specified, current working directory is used.

> Use case: Adobe Fonts are able to be installed for desktop use using the
Creative Cloud app. But some desktop apps are actually web apps in an Electron
wrapper and can't see locally installed fonts so you need to upload the actual
font files into these apps to be able to use them. Creative Cloud gives you
the files, but tries to hide and obfuscate them from you. Philosophically in the
clear, you can use typerip.js to dig out the files and automatically rename them
according to their internal name.

## Requirements
- Valid Adobe Creative Cloud subscription
- Node.js

## Installation
- Clone/download the project
- Run `npm install` for
	- [commander.js](https://github.com/tj/commander.js), the command line interface framework
	- [opentype.js](https://github.com/opentypejs/opentype.js) for reading font names

## Usage
`./typerip.js [--rename] [input-directory] [output-directory]`

## Examples
- Rename obfuscated font files in the current working directory:
	- `./typerip.js --rename`
- Copy fonts installed via Creative Cloud to a new folder on a Mac (noting the double quotes around the input folder name because of the space in "Application Support"):
	- `./typerip.js "~/Library/Application Support/Adobe/CoreSync/plugins/livetype/.r" ~/Desktop/getripd`
