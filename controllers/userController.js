const { User } = require('../models/user');

const UserController = (app) => {
  app.get('/api/users/all', (req, res) => {
    res.send({
      status: 'OK'
    });
  });
};

module.exports = { UserController };
