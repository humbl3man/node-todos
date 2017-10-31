const { Todo } = require('../models/todo');

const TodoController = (app) => {
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
};

module.exports = { TodoController };
