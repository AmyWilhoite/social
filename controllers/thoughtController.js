const { Thought, User } = require('../models');

module.exports = {
  // Get all Thoughts
  getThoughts (req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

  // Create a thought
  createThought (req, res) {
    Thought.create(req.body)
      .then((thought) => {
        // enter create function
        return User.findOneAndUpdate(
          {_id: req.body.userName},
          { $addToSet: {thoughts: thought._id}},
          { runValidators: true, new: true }
        );
      })
      .then((user) => 
      !user
      ? res.status(404).json({ 
        message: 'No user with that name',
      })
      : res.json ('thought created 🎉)')
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtID })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.deleteMany({ _id: { $in: thought.users } })
      )
      .then(() => res.json({ message: 'Thought and Users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // add reaction to thought
  addReaction (req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: {reactions: req.body}},
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No reaction with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction (req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: {reactions: {_id: req.params.friendID}}},
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No reaction with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


};
