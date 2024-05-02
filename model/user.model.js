const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-]+(.[\w-]+)*@([\w-]+.)+[a-zA-Z]{2,7}$/
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    }
}, {
    versionKey: false,
    timestamps: true
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel
}