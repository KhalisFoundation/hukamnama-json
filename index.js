'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var SGPC_URL = 'http://old.sgpc.net/hukumnama/sgpconlinehukamnama.asp';

module.exports = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(function (resolve, reject) {
    return _jsdom2.default.env(SGPC_URL, function (err, _ref) {
      var document = _ref.document;

      if (err) reject(err);
      try {
        var cleanTable = function cleanTable(table) {
          return table.textContent.replace(/[\t\r\n]/g, '').trim();
        };
        var tables = [].concat(_toConsumableArray(document.querySelectorAll('table'))).splice(1).map(cleanTable);

        var _tables = _slicedToArray(tables, 5),
            gurbani = _tables[0],
            gurbaniAng = _tables[1],
            punjabi = _tables[2],
            english = _tables[3],
            englishAng = _tables[4];

        resolve({
          content: tables.join('\n'),
          gurbani: gurbani, punjabi: punjabi, english: english,
          ang: parseInt(/\(Page: *([\d ]+)/.exec(englishAng)[1]),
          date: document.querySelector('font[face="Georgia, Times New Roman, Times, serif"]').textContent.trim().slice(1, -1),
          url: SGPC_URL
        });
      } catch (e) {
        reject(e);
      }
    });
  });
};
