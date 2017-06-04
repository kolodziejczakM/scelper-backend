
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Symbols = new Schema({
    id: { type: Number, required: true },
    codeName: { type: String, required: true },
    path: { type: String, required: true }
},{
    timestamps: true
});

module.exports = mongoose.model('Symbols', Symbols);
