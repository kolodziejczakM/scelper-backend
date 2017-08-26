
const PublicScenariosRequests = require('../schemas/public-scenarios-requests.schema');

exports.getAll = () => {
    return PublicScenariosRequests.find();
};

exports.getPublicScenariosRequests = () => {
    return PublicScenariosRequests.find(
        {active: true},
        { _id: false, active: false, deleteCode: false }
    );
};

exports.getScenarioRequestByDeleteCode = (deleteCode) => {
    return PublicScenariosRequests.findOne({ deleteCode });
};

exports.createScenarioRequestEntity = (req, genre, type, deleteCode) => {
    const scenarioRequest = new PublicScenariosRequests({
        genre,
        type,
        actorNumber: req.body.actorNumber,
        actressNumber: req.body.actressNumber,
        vehicleNumber: req.body.vehicleNumber,
        budget: req.body.budget,
        requestAuthorEmail: req.body.requestAuthorEmail,
        description: req.body.description,
        deleteCode,
        active: false
    });

    return scenarioRequest;
};
