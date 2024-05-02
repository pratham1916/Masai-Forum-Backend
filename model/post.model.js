const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        maxlength: 100,
        required: true
    },
    category: {
        type: String,
        enum: ['Development', 'Design', 'Innovation', 'Tutorial', 'Business'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    media: {
        type: String,
    },
    likes: {
        type: [{
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        }],
        default: []
    },
    comments: {
        type: [{
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            content: {
                type: String,
                required: true
            },
            created_at: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }
}, {
    versionKey: false,
    timestamps: true
});

const PostModel = mongoose.model('Post', postSchema);
module.exports = {
    PostModel
};
