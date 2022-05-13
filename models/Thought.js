const { Schema, model } = require('mongoose');
// const { get } = require('./Reaction');
// const userSchema = require('./User');
// const Reaction = require ('./Reaction');
const reactionSchema = require('./Reaction');

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      //add getter formatting time
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      // getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount")
   .get(function(){
     return this.reactions.length;
   });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
