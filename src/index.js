'use strict';

import http from 'http';
import PDFJS from 'pdfjs-dist';

module.exports = function hukamJS (options = {  }) {
  const injectNewLine = str => [
    e => e.endsWith("TODAY'S HUKAMNAMA FROM SRI DARBAR SAHIB, Sri Amritsar. "),
    e => e.endsWith(". IST] "),
    e => /, \d{4}$/.test(e) && (str = `\n${str}`),
    e => e.startsWith('(AMg:') && (str = `\n${str}`),
    e => e.startsWith('English Translation') && (str = `\n${str}`),
    e => e.indexOf('Nanakshahi') > 0 && (str = `\n${str}`),
  ].some(condition => condition(str)) ? `${str}\n` : str;

  return new Promise((resolve, reject) => (
    http.get(SGPC_URL, res => {
      let buff = [];

      res.on('data', chunk => buff.push(chunk));

      res.on('end', () => PDFJS.getDocument(new Buffer.concat(buff))
        .then(pdf => pdf.getPage(1))
        .then(page => page.getTextContent())
        .then(({ items = [] }) => {
          let content = '', gurakhr = '', punjabi = '', english = '', ang = 0;

          let gurakhrBegan = false, gurakhrEnded = false;
          let punjabiBegan = false, punjabiEnded = false;
          let englishBegan = false, englishEnded = false;

          items.forEach(({ str }) => {
            content += injectNewLine(str);

            if (str.startsWith('(AMg:')) {
              gurakhrEnded = true;
              punjabiBegan = true;
            }

            if (gurakhrBegan && !gurakhrEnded) gurakhr += str;
            if (punjabiBegan && !punjabiEnded) punjabi += str;
            if (englishBegan && !englishEnded) english += str;

            if (str.startsWith('English Translation')) {
              punjabiEnded = true;
              englishBegan = true;
            }

            if (str.endsWith(' IST] ')) { gurakhrBegan = true; }

            if (str.indexOf('(Page:') > 0) { ang = parseInt(/\(Page: ([\d ]+)/.exec(str)[1]); }
          });

          resolve({ content, ang, gurakhr, punjabi, english });
        })
        .catch(err => reject(err))
      );

    })
  ));
}
