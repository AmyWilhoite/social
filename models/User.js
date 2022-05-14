const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// self reference user schema
// const userSchema = require('./User');

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
    // need to look at this throwing errors for both
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',  
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  },
);

userSchema.virtual("friendCount")
   .get(function(){
     return this.friends.length;
   });

const User = model('user', userSchema);

module.exports = User;
