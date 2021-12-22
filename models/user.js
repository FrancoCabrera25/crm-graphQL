const mongoose = require("mongoose");
const {Schema} = mongoose;
const UserSchema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        create_At: {
            type: Date,
            default: Date.now()
        },
    }
);

module.exports = mongoose.model('User', UserSchema);
