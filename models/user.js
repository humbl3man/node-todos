const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
