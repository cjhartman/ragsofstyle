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
    selectedImages: {
        type: Array,
        required: true
    }
});

module.exports = Photos = mongoose.model('photos', PhotoSchema);