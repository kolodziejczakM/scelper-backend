var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicScenarios = new Schema({
    title: { type: String, required: true },
    authorEmail: { type: String, required: true },
    stateId: { type: Number, required: true },
    description: { type: String, required: true },
    path: { type: String, required: true },
    pages: { type: Number, required: true }
},{
    timestamps: true
});

module.exports = mongoose.model('PublicScenarios', PublicScenarios);
