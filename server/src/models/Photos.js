const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create photo meta data schema 

const PhotoSchema = new Schema({
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
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    extras: {
        type: Array,
        required: false
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
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isInCart: {
        type: Boolean,
        default: false
    }
});

module.exports = Photos = mongoose.model('photos', PhotoSchema);