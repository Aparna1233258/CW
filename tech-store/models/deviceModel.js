const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Device name is required']
    },

    brand: {
        type: String,
        required: [true, 'Brand name is required']
    },

    price: {
        type: Number,
        required: [true, 'Price is required']
    },

    warranty: {
        type: Number,
        required: [true, 'Warranty period is required']
    }

});

module.exports = mongoose.model('Device', deviceSchema);