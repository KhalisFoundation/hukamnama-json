import { JSDOM } from 'jsdom';

const SGPC_URL = 'http://old.sgpc.net/hukumnama/sgpconlinehukamnama.asp';

module.exports = () => new Promise((resolve, reject) => {
  JSDOM.fromURL(SGPC_URL)
    .then(dom => {
      const { document } = dom.window;

      try {
        const cleanTable = table => table.textContent.replace(/[\t\r\n]/g, '').trim();
        const tables = [...document.querySelectorAll('table')].splice(1).map(cleanTable);
        // eslint-disable-next-line no-unused-vars
        const [gurbani, gurbaniAng, punjabi, english, englishAng] = tables;

        resolve({
          content: tables.join('\n'),
          gurbani,
          punjabi,
          english,
          ang: parseInt(/Page:[ ]*([\d ]+)/.exec(englishAng)[1], 10),
          date: document.querySelector('font[face="Georgia, Times New Roman, Times, serif"]').textContent.trim().slice(1, -1),
          url: SGPC_URL
        });
      } catch (e) {
        reject(e);
      }
    });
});
