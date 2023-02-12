const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    video: {
      type:   mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    },
    total: {
        type:Number,
    },
    dueDate: {
        type: Date,
        required:true
    },
    overDuePrice: {
        type:Number,
        default:5
    },
    daysOverdue: [{
        type:Date
    }],
    status: {
        type: String,
        enum:['Returned', 'Out'],
        default:'Out'
    }
}, {
    timestamps: true
});


module.exports = new mongoose.model('Rental', rentalSchema);