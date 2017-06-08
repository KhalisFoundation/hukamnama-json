## 🙏🏻 🙏🏼 🙏🏽 🙏🏾 🙏🏿  hukamnama-json

NodeJS module that fetches Hukamnama from Harimandir Sahib, Amritsar via [SGPC](http://old.sgpc.net/hukumnama/sgpconlinehukamnama.asp)

# Installation

Requires Node v5+ 

```bash
npm i hukamnama-json
```

# Usage

```javascript
var hukamnama = require('hukamnama'); // ES5
import hukamnama from 'hukamnama';    // ES2015

hukamnama()                           // Returns a promise
.then(hukam => {
  let { ang, content, gurbani, punjabi, english } = hukam;
  console.log(ang, content, gurakhr, punjabi, english);
})
.catch(error => console.log(error));
```
# Changelog

## 1.0.0
* [ ] I don't know `¯\_(ツ)_/¯`, why don't you [suggest](https://github.com/bogas04/hukamnama-json/issues/new)?

## 0.5.0
* [ ] Ensure it's `battle-tested`.
* [ ] Make it universal

### 0.1.6
* [x] Extract date of hukamnama.
* [x] Ensure it works with multiple-page pdf.

## 0.0.4
* [x] Fix #1

## 0.0.3
* [x] Use babel for better backward compatibility 

## 0.0.1 (Initial Release)
* [x] Use rudimentary text parsing to extract.
  * [x] entire content.
  * [x] hukamnama in gurakhr.
  * [x] punjabi translation.
  * [x] english translation.
  * [x] ang.
* [x] Use [PDFJS](https://mozilla.github.io/pdf.js/) to extract contents out of the pdf.

# Contributing

```bash
# Clone
git clone https://github.com/bogas04/hukamnama-json
cd hukamnama.json

# Build
npm i
npm run build

# Test
npm test
```

# License

MIT
