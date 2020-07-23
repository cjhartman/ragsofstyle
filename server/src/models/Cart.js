const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create cart schema 

const CartSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true 
    },
    price: {
        type: String,
        required: true
    },
    selectedFlickrImage: {
        type: Array,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    sale: {
        type: Boolean,
        required: false
    },
    serverId: {
        type: String,
        required: true
    },
    farmId: {
        type: String,
        required: true
    },
    secret: {
        type: Array,
        required: true
    }
});

module.exports = Cart = mongoose.model('cart', CartSchema);