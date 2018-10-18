const hukam = require('./src/index.js');

hukam()
  .then(({ ang }) => {
    if (ang < 1 || ang > 1430) {
      console.log('Invalid Ang ', ang);
    } else {
      console.log('All tests passed!');
    }
  })
  .catch(err => console.log(err));
