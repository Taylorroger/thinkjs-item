const test = require('ava');
const path = require('path');
require(path.join(process.cwd(), 'production.js'));

test('first test', t => {
  const articleModel = think.model('article');
})
