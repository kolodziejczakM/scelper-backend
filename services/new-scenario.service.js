
const fs = require('fs'),
      PublicScenarios = require('../models/public-scenarios'),
      PDFJS = require('pdfjs-dist');

const constants = require('../routes/constants.js');

const ERRORS = constants.ERRORS,
      SUCCESSES = constants.SUCCESSES;

class NewScenarioService {

    static saveToDB(req) {
        const pdfData = new Uint8Array(fs.readFileSync(req.file.path)),
              stateId = this.getStateIdFromString(req.body.state),
              deleteCode = this.getDeleteCode(),
              pdfDocumentReady = this.getPDF(pdfData);

        return pdfDocumentReady.then(pdfDocument => {
        console.log('Document PDF: ', pdfDocument);
            
            const scenario = this.createScenarioEntity(
                req,
                stateId,
                pdfDocument.numPages,
                deleteCode
            );

            return scenario.save;
            // ((err) => {
            //     if (err) {  
            //         console.log(err);
            //         res.status(400).send(`${ERRORS.SCENARIO_DB_SAVE} ${err}`);
            //     }
                
            //     res.send(SUCCESSES.SCENARIO_SAVED);
            // });
            
        });
    }

    static getDeleteCode() {
        return String(Date.now()).slice(-5);
    }

    static getStateIdFromString(stateString = '') {
        if(stateString === 'Niekompletny') {
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

// exports.saveToDB = (req) => {
//     const pdfData = new Uint8Array(fs.readFileSync(req.file.path)),
//             stateId = getStateIdFromString(req.body.state),
//             deleteCode = getDeleteCode(),
//             pdfDocumentReady = getPDF(pdfData);

//     pdfDocumentReady.then(pdfDocument => {
//         console.log('Document PDF: ', pdfDocument);
        
//         const scenario = createScenarioEntity(
//             req,
//             stateId,
//             pdfDocument.numPages,
//             deleteCode
//         );

//         scenario.save((err) => {
//             if (err) {
//                 console.log(err);
//                 res.status(400).send(`${ERRORS.SCENARIO_DB_SAVE} ${err}`);
//             }
//             res.send(SUCCESSES.SCENARIO_SAVED);
//         });
        
//     });
// }

// exports.getDeleteCode = () => {
//     return String(Date.now()).slice(-5);
// }

// exports.getStateIdFromString = (stateString = '') => {
//     if(stateString === 'Niekompletny'){
//         return 0;
//     }else{
//         return 1;
//     }
// }

// exports.getPDF = (docUINT8) => {
//     return PDFJS.getDocument(docUINT8);
// }

// exports.createScenarioEntity = (req, stateId, numberOfPages, deleteCode) => {
//     const scenario = new PublicScenarios({
//         title: req.body.title,
//         authorEmail: req.body.authorEmail,
//         stateId,
//         description: req.body.description,
//         path: req.file.path,
//         pages: numberOfPages,
//         deleteCode
//     });
//     return scenario;
// }

module.exports = NewScenarioService;
