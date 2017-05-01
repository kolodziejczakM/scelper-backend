
const fs = require('fs'),
      PDFJS = require('pdfjs-dist'),
      publicScenariosModel = require('../models/public-scenarios'),
      constants = require('../constants/public-scenarios.constants');

class PublicScenariosController {

    static prepareForDB(req) {
        const pdfData = new Uint8Array(fs.readFileSync(req.file.path)),
              stateId = this.getStateIdFromString(req.body.state),
              deleteCode = this.getDeleteCode(),
              pdfDocumentReady = this.getPDF(pdfData);
        

        return pdfDocumentReady.then(pdfDocument => {
            
            const scenario = publicScenariosModel.createScenarioEntity(
                req,
                stateId,
                pdfDocument.numPages,
                deleteCode
            );
            return scenario;
        });
    }

    static getDeleteCode() {
        return String(Date.now()).slice(-5);
    }

    static getStateIdFromString(stateString = '') {
        if(stateString === constants.SCENARIO_STATE_STRING) {
            return 0;
        } else {
            return 1;
        }
    }

    static getPDF(docUINT8) {
        return PDFJS.getDocument(docUINT8);
    }

}

module.exports = PublicScenariosController;
