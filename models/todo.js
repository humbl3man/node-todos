const mongoose = require('mongoose');

const { Schema } = mongoose;
const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = { Todo };
