
const PublicScenarios = require('../schemas/public-scenarios');

exports.getAll = () => {
    return PublicScenarios.find();
}

exports.getScenarioByAuthorAndTitle = (authorEmail, scenarioTitle) => {
    return PublicScenarios.find({ authorEmail, title: scenarioTitle });
}

exports.getScenarioByDeleteCode = (deleteCode) => {
    return PublicScenarios.findOne({ deleteCode });
}

exports.createScenarioEntity = (req, stateId, numberOfPages, deleteCode) => {
    const scenario = new PublicScenarios({
        title: req.body.title,
        authorEmail: req.body.authorEmail,
        stateId,
        description: req.body.description,
        path: req.file.path,
        pages: numberOfPages,
        deleteCode,
        active: false
    });
    return scenario;
}