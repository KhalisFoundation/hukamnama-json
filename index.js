'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _pdfjsDist = require('pdfjs-dist');

var _pdfjsDist2 = _interopRequireDefault(_pdfjsDist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function hukamJS() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var injectNewLine = function injectNewLine(str) {
    return [function (e) {
      return e.endsWith("TODAY'S HUKAMNAMA FROM SRI DARBAR SAHIB, Sri Amritsar. ");
    }, function (e) {
      return e.endsWith(". IST] ");
    }, function (e) {
      return (/, \d{4}$/.test(e) && (str = '\n' + str)
      );
    }, function (e) {
      return e.startsWith('(AMg:') && (str = '\n' + str);
    }, function (e) {
      return e.startsWith('English Translation') && (str = '\n' + str);
    }, function (e) {
      return e.indexOf('Nanakshahi') > 0 && (str = '\n' + str);
    }].some(function (condition) {
      return condition(str);
    }) ? str + '\n' : str;
  };

  return new Promise(function (resolve, reject) {
    return _http2.default.get(SGPC_URL, function (res) {
      var buff = [];

      res.on('data', function (chunk) {
        return buff.push(chunk);
      });

      res.on('end', function () {
        return _pdfjsDist2.default.getDocument(new Buffer.concat(buff)).then(function (pdf) {
          return pdf.getPage(1);
        }).then(function (page) {
          return page.getTextContent();
        }).then(function (_ref) {
          var _ref$items = _ref.items;
          var items = _ref$items === undefined ? [] : _ref$items;

          var content = '',
              gurakhr = '',
              punjabi = '',
              english = '',
              ang = 0;

          var gurakhrBegan = false,
              gurakhrEnded = false;
          var punjabiBegan = false,
              punjabiEnded = false;
          var englishBegan = false,
              englishEnded = false;

          items.forEach(function (_ref2) {
            var str = _ref2.str;

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

            if (str.endsWith(' IST] ')) {
              gurakhrBegan = true;
            }

            if (str.indexOf('(Page:') > 0) {
              ang = parseInt(/\(Page: ([\d ]+)/.exec(str)[1]);
            }
          });

          resolve({ content: content, ang: ang, gurakhr: gurakhr, punjabi: punjabi, english: english });
        }).catch(function (err) {
          return reject(err);
        });
      });
    });
  });
};
