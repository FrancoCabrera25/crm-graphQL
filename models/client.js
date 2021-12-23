const mongoose = require("mongoose");
const {Schema} = mongoose;
const ClientSchema = new Schema({
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
        company: {
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
        dni: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        create_At: {
            type: Date,
            default: Date.now()
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',

        }
    }
);

module.exports = mongoose.model('Client', ClientSchema);
