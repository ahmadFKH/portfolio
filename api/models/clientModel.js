const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    name: String,
    email: String
})

module.exports = mongoose.model('Client', clientSchema);
