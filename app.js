// express
const express = require('express');
const bodyParser = require('body-parser');

const { Todo } = require('./models/todo');
const { User } = require('./models/user');

// mongoose
const { mongoose } = require('./db');

const app = express();

app.use(bodyParser.json());

app.post('/api/todos/', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo
    .save()
    .then((result) => {
      res.status(200).json({
        status: 'SUCCESS',
        result
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: 'FAIL',
        message: {
          title: 'Unable to Save',
          message: error.errors.text.message
        }
      });
    });
});

app.get('/api/users/all', (req, res) => {
  res.send({
    status: 'OK'
  });
});

module.exports = { app };
