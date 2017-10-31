const { app } = require('./app');

const PORT = process.env.PORT || 3000;

// controllers
// const { UserController } = require('./controllers/userController');
// const { TodoController } = require('./controllers/todoController');

// config

// UserController(app);
// TodoController(app);

app.listen(PORT, () => {
  console.log(`start server on PORT ${PORT}`);
});
