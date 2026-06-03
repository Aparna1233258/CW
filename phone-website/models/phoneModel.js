const mongoose = require('mongoose');
const phoneSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    description:{
        type:String,
        required:[true,'Description is required']
    },
    price:{
        type:Number,
        required:[true,'Price is required'],
        min:[0,'Price cannot be negative']
    }
});
module.exports = mongoose.model('Phone', phoneSchema);

