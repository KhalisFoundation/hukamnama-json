'use strict';

const hukam = require('./index.js');

hukam()
  .then(({ ang, content, english, gurbani, punjabi }) => {
    if (ang < 1 || ang > 1430) { console.log("Invalid Ang ", ang); }
    else { console.log("All tests passed!"); }
  })
  .catch(err => console.log(err));
