'use strict';

import dom from 'jsdom';

const SGPC_URL = `http://old.sgpc.net/hukumnama/sgpconlinehukamnama.asp`;

module.exports = (options = {  }) => new Promise((resolve, reject) => dom.env(SGPC_URL, (err, { document }) => {
  if (err) reject(err);
  try { 
    const cleanTable = table => table.textContent.replace(/[\t\r\n]/g, '').trim();
    const tables = [...document.querySelectorAll('table')].splice(1).map(cleanTable);
    const [ gurbani, gurbaniAng, punjabi, english, englishAng ] = tables;

    resolve({
      content: tables.join('\n'),
      gurbani, punjabi, english,
      ang: parseInt(/\(Page: *([\d ]+)/.exec(englishAng)[1]),
      date: document.querySelector('font[face="Georgia, Times New Roman, Times, serif"]').textContent.trim().slice(1,-1),
      url: SGPC_URL
    });

  } catch (e) {
    reject(e);
  }
}));
