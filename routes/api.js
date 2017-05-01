
const express = require('express'),
      router = express.Router(),
      corsMiddleware = require('../middlewares/cors.middleware'),
      MulterMiddleware = require('../middlewares/multer.middleware'),
      uploadPDF = new MulterMiddleware().uploadPDF;

const publicScenariosConstants = require('../constants/public-scenarios.constants'),
      publicScenariosModel = require('../models/public-scenarios'),
      publicScenariosController = require('../controllers/public-scenarios.controller'),
      MailingScenariosService = require('../services/mailing-scenarios.service');

const SCENARIO_ERRORS = publicScenariosConstants.ERRORS,
      SCENARIO_SUCCESSES = publicScenariosConstants.SUCCESSES,
      SCENARIO_FORM_FIELD_NAME = publicScenariosConstants.SCENARIO_FORM_FIELD_NAME;


corsMiddleware.letLocalhost(router);

router.get('/public-scenarios',function(req ,res, next){

    publicScenariosModel.getAll().exec(function(err,data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    });
});

router.post('/public-scenarios', function(req, res) {
    
    uploadPDF.single(SCENARIO_FORM_FIELD_NAME)(req, res, function(err) {

        if(err) {
            console.log(err);
            return res.status(400).json(SCENARIO_ERRORS.COMMON_UPLOAD.msg);
        }

        const scenarioSaved = publicScenariosController.prepareForDB(req).then(scenario => {
            return scenario.save((err) => {
                if (err) {  
                    console.log(err);
                    return res.status(400).json(`${SCENARIO_ERRORS.SCENARIO_DB_SAVE.msg}`);
                }
            });
        });
    
        const mailSent = scenarioSaved.then(() => {
            const mail = new MailingScenariosService('kolodziejczak.mn@gmail.com', 1234, 'https://www.scelper.com');
            
            mail.transport().sendMail(mail.mailOptions, (error, info) => {
                if (error) {
                    console.log('Error while sending email: ', error);
                    return res.status(400).json(SCENARIO_ERRORS.MAILING.msg);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                return res.json(SCENARIO_SUCCESSES.SCENARIO_SAVED.msg);
            });
        });

    });
});

module.exports = router;
