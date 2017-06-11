
const fs = require('fs'),
      PDFJS = require('pdfjs-dist'),
      uuidV4 = require('uuid/v4');

const publicScenariosModel = require('../models/public-scenarios.model'),
      publicScenariosConstants = require('../constants/public-scenarios.constants');

class PublicScenariosController {

    static prepareForDB(req) {
        const pdfData = new Uint8Array(fs.readFileSync(req.file.path)),
              genre = JSON.parse(req.body.genre),
              state = JSON.parse(req.body.state),
              deleteCode = this.getDeleteCode(),
              pdfDocumentReady = this.getPDF(pdfData);
        

        return pdfDocumentReady.then(pdfDocument => {
            
            const scenario = publicScenariosModel.createScenarioEntity(
                req,
                genre,
                state,
                pdfDocument.numPages,
                deleteCode
            );
            return scenario;
        });
    }

    static getDeleteCode() {
        return `${uuidV4()}-${String(Date.now()).slice(-5)}`;
    }

    static getPDF(docUINT8) {
        return PDFJS.getDocument(docUINT8);
    }

}

module.exports = PublicScenariosController;
