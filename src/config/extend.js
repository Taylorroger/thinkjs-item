const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const mongo = require('think-mongo');

module.exports = [
  model(think.app),
  cache,
  session,
  mongo(think.app)
];
