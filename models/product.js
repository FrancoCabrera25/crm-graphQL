const mongoose = require("mongoose");
const {Schema} = mongoose;
const ProductSchema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        stock: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        create_At: {
            type: Date,
            default: Date.now()
        },
    }
);

ProductSchema.index({name: 'text'});

module.exports = mongoose.model('Product', ProductSchema);
