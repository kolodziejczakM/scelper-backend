const mongoose = require('mongoose');
mongoose.Promise = global.Promise // this should be temporary. Now it should be in each model file to avoid deprecation error.

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
