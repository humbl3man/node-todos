const mongoose = require('mongoose');

// set this to false before deploying
const IS_DEV = true;

if (!IS_DEV) {
  const { DB_USERNAME } = process.env;
  const { DB_PASS } = process.env;
  mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASS}@ds249415.mlab.com:49415/todoapp`);
} else {
  mongoose.connect('mongodb://localhost:27017/TodoApp');
}

mongoose.Promise = global.Promise;

module.exports = { mongoose };
