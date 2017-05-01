
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicScenarios = new Schema({
    title: { type: String, required: true },
    authorEmail: { type: String, required: true },
    stateId: { type: Number, required: true },
    description: { type: String, required: true },
    path: { type: String, required: true },
    pages: { type: Number, required: true },
    deleteCode: {type: String, required: true}
},{
    timestamps: true
});

module.exports = mongoose.model('PublicScenarios', PublicScenarios);
