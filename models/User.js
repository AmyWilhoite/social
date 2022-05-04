const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');
// self reference user schema
const userSchema = require('./User');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max_length: 50,
    },
    thought: [thoughtSchema],
    friend: [friendSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  },
);

const User = model('user', userSchema);

module.exports = User;
