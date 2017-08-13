
const path = require('path'),
      multer = require('multer');

const constants = require('../constants/common.constants'),
      publicScenariosConstants = require('../constants/public-scenarios.constants'),
      publicScenariosModel = require('../models/public-scenarios.model');

const KILO_BYTE = constants.KILO_BYTE,
      ACCEPTABLE_MIMETYPE = publicScenariosConstants.SCENARIO_ACCEPTABLE_MIMETYPE,
      ACCEPTABLE_EXTENSION = publicScenariosConstants.SCENARIO_ACCEPTABLE_EXTENSION,
      SCENARIO_ERRORS = publicScenariosConstants.ERRORS;

class MulterMiddleware {

    constructor() {

        this.storagePDF = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, './public/uploads/tmp/pdf/');
            },
            filename: function(req, file, cb) {
                let nameParts = file.originalname.replace(/\s+/g, '_');
                nameParts = nameParts.split('.');
                nameParts.pop();
                const namePart = nameParts.join('.');
                cb(null, namePart + '-'+'scelper.com-'+ Date.now() + path.extname(file.originalname));
            }
        });

        this.uploadPDF = multer({
            storage: this.storagePDF,
            limits: {
                files: 1,
                fileSize: 200 * KILO_BYTE
            },
            fileFilter: function(req, file, cb) {

                const validExtension = (file.originalname.split('.').pop() === ACCEPTABLE_EXTENSION),
                      validMimetype = (file.mimetype === ACCEPTABLE_MIMETYPE);

                if (!validMimetype || !validExtension) {

                    console.log(SCENARIO_ERRORS.EXTENSION.msg);
                    return cb(new Error(SCENARIO_ERRORS.EXTENSION), false);
                }

                publicScenariosModel.getScenarioByAuthorAndTitle(req.body.authorEmail, req.body.title)
                                    .exec(function(err, data) {

                    if (err) {
                        console.log(err);
                        return cb(new Error(err), false);
                    }

                    if (data.length > 0) {
                        console.log(SCENARIO_ERRORS.ALREADY_EXISTS.msg);
                        return cb(new Error(SCENARIO_ERRORS.ALREADY_EXISTS), false);
                    }
                });

                cb(null, true);
            }
        });
    }
}

module.exports = MulterMiddleware;

