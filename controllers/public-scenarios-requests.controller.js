const uuidV4 = require('uuid/v4'),
      publicScenariosRequestsModel = require('../models/public-scenarios-requests.model');

class PublicScenariosRequestsController {

    static prepareForDB(req) {
        const genre = JSON.parse(req.body.genre),
              type = JSON.parse(req.body.type),
              deleteCode = this.getDeleteCode();

        const scenarioRequest = publicScenariosRequestsModel.createScenarioRequestEntity(
            req,
            genre,
            type,
            deleteCode
        );

        return scenarioRequest;
    }

    static getDeleteCode() {
        return `${uuidV4()}-req-${String(Date.now()).slice(-5)}`;
    }
}

module.exports = PublicScenariosRequestsController;
