const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    givenName: {
        type: String,
        required:[true,'Please enter the given name.']
    },
    lastName: {
        type: String,
        required:[true,'Please enter the lastname.']
    },
    middleName: {
        type: String,
        required:[true,'Please enter the middle name.']
    },
    dob: {
        type: String,
        required:[true,'Please enter the date of birth.']
    },
    occupation: {
        type:String,
    },
    contactNum: {
        type:String,
        required: [true, 'Please enter customer phone number']
    },
    address: {
        type: String,
        required:[true, 'Please enter customer address']
    }
},{
    timestamps: true
});


module.exports = new mongoose.model('Customer', customerSchema);