const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScenarioGenre = new Schema({
    id: { type: Number, required: true },
    label: { type: String, required: true }
});

const ScenarioType = new Schema({
    id: { type: Number, required: true },
    label: { type: String, required: true }
});

const PublicScenariosRequests = new Schema(
    {
        genre: ScenarioGenre,
        type: ScenarioType,
        actorNumber: { type: Number, required: true },
        actressNumber: { type: Number, required: true },
        vehicleNumber: { type: Number, required: true },
        budget: { type: Number, required: true },
        requestAuthorEmail: { type: String, required: true },
        description: { type: String, required: true },
        deleteCode: { type: String, required: true },
        active: { type: Boolean, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('PublicScenariosRequests', PublicScenariosRequests);
