
const fs = require('fs'),
      PDFJS = require('pdfjs-dist'),
      PublicScenarios = require('../models/public-scenarios'),
      constants = require('../constants/common.constants');

class PublicScenariosService {

    static prepareForDB(req) {
        const pdfData = new Uint8Array(fs.readFileSync(req.file.path)),
              stateId = this.getStateIdFromString(req.body.state),
              deleteCode = this.getDeleteCode(),
              pdfDocumentReady = this.getPDF(pdfData);

        return pdfDocumentReady.then(pdfDocument => {
            
            const scenario = this.createScenarioEntity(
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

    static createScenarioEntity(req, stateId, numberOfPages, deleteCode) {
        const scenario = new PublicScenarios({
            title: req.body.title,
            authorEmail: req.body.authorEmail,
            stateId,
            description: req.body.description,
            path: req.file.path,
            pages: numberOfPages,
            deleteCode
        });
        return scenario;
    }
     
}

module.exports = PublicScenariosService;
