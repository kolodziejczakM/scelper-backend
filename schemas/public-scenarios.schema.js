
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScenarioState = new Schema({
    id: { type: Number, required: true },
    value: { type: Number,required: true },
    label: { type: String, required: true }
});

const PublicScenarios = new Schema({
    title: { type: String, required: true },
    authorEmail: { type: String, required: true },
    state: ScenarioState,
    description: { type: String, required: true },
    path: { type: String, required: true },
    pages: { type: Number, required: true },
    deleteCode: { type: String, required: true },
    active: { type: Boolean, required: true }
},{
    timestamps: true
});

module.exports = mongoose.model('PublicScenarios', PublicScenarios);
