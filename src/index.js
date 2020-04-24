import '@babel/polyfill';
import { JSDOM } from 'jsdom';
import request from 'request';

const SGPC_URL = 'http://old.sgpc.net/hukumnama/sgpconlinehukamnama.asp';
const REQUEST_ENCODING = 'utf-8';

const hukamnama = async () => {
  try {
    const res = await request({ uri: SGPC_URL, encoding: REQUEST_ENCODING });
    const dom = new JSDOM(res);
    const { document } = dom.window;
    const cleanTable = table => table.textContent.replace(/[\t\r\n]/g, '').trim();
    const tables = [...document.querySelectorAll('table')].splice(1).map(cleanTable);
    const [gurbani, gurbaniAng, punjabi, english, englishAng] = tables;

    return {
      content: tables.join('\n'),
      gurbani,
      punjabi,
      english,
      ang: parseInt(/Page[ ]*:?[ ]*([\d ]+)/.exec(englishAng)[1], 10),
      date: document.querySelector('font[face="Georgia, Times New Roman, Times, serif"]').textContent.trim().slice(1, -1),
      url: SGPC_URL
    };
  } catch (e) {
    throw e;
  }
};

export default hukamnama;
