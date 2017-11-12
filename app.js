// express
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { Todo } = require('./models/todo');
// const { User } = require('./models/user');

// mongoose
const { mongoose } = require('./db');

const app = express();

app.use(bodyParser.json());

app.get('/api/todos', (req, res) => {
  Todo.find({})
    .then((todos) => {
      res.send({
        status: 'OK',
        todos
      });
    })
    .catch((err) => {
      res.send({
        status: 'FAIL',
        message: err
      });
    });
});

app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send({});
  }

  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({});
      }
      res.status(200).send(todo);
    })
    .catch((error) => {
      res.status(500).send({});
    });
});

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

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send({});
  }

  Todo.findOneAndRemove({
    _id: id
  })
    .then((todo) => {
      if (!todo) {
        return res.status(400).send({});
      }

      const statusObj = {
        status: 'DELETED',
        todo
      };

      res.status(200).send(statusObj);
    })
    .catch(err => res.status(400).send({}));
});

app.get('/api/users/all', (req, res) => {
  res.send({
    status: 'OK'
  });
});

module.exports = { app };
