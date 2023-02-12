const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true,'Please enter the customer name.']
    },
    category: {
        type: String,
        enum:['VCD', 'DVD'],
        default: 'VCD'
    },
    description: {
        type:String,
    },
    price: {
        type:Number,
        enum: [25, 50],
        default: 25 
    },
    rentDays: {
        type:Number,
        enum: [1,2,3],
        default: 1 
    },
    copies: {
        type: Number,
        default: 1
    },
},{
    timestamps: true
});


module.exports = new mongoose.model('Video', videoSchema);