
const path = require('path'), 
      multer = require('multer'),
      constants = require('../constants/common.constants');

const KILO_BYTE = constants.KILO_BYTE,
      ACCEPTABLE_MIMETYPE = constants.SCENARIO_ACCEPTABLE_MIMETYPE,
      ACCEPTABLE_EXTENSION = constants.SCENARIO_ACCEPTABLE_EXTENSION;

class MulterMiddleware {

    constructor() {

        this.storagePDF = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/uploads/tmp/pdf/')
            },
            filename: function (req, file, cb) {
                let nameParts = file.originalname.replace(/\s+/g, '_');
                nameParts = nameParts.split('.');
                nameParts.pop();
                const namePart = nameParts.join('.');
                cb(null, namePart + '-'+'scelper.com-'+ Date.now() +  path.extname(file.originalname))
            }
        });

        this.uploadPDF = multer({ 
            storage: this.storagePDF,
            limits: { 
                files: 1,
                fileSize: 200 * KILO_BYTE 
            },
            fileFilter: function (req, file, cb) {
                
                const validExtension = (file.originalname.split('.').pop() === ACCEPTABLE_EXTENSION),
                    validMimetype = (file.mimetype === ACCEPTABLE_MIMETYPE);

                if (!validMimetype || !validExtension) {
            
                    req.fileFormatError = SCENARIO_ERRORS.EXTENSION.msg;
                    return cb(new Error(req.fileValidationError), false);
                }

                cb(null, true);
            }

        });
    }

}

module.exports = MulterMiddleware;
