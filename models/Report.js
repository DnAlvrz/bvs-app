const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    name: {
        type: String
    }
}, {
    timestamps: true
});


module.exports = new mongoose.model('Report', reportSchema);