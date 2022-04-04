const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    present: Array,
    Date: String,
    Group: String,
});

module.exports = mongoose.model('Absents', Schema);