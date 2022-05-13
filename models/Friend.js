const { Schema, model, Types } = require('mongoose');

const friendSchema = new Schema ({
    friendId: {
        type: Schema.Types.ObjectID,
        default: () => new Types.ObjectID (),
    },
    username: {
        type: String,
        required: true,
    },
});

module.exports = friendSchema;