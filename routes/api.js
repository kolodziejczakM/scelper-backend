
const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
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

    publicScenariosModel.getPublicScenarios().exec(function(err, data){
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
            return res.status(400).json(SCENARIO_ERRORS.COMMON_UPLOAD);
        }

        const scenarioSaved = publicScenariosController.prepareForDB(req).then(scenario => {
            return scenario.save((err) => {
                if (err) {  
                    console.log(err);
                    return res.status(400).json(SCENARIO_ERRORS.SCENARIO_DB_SAVE);
                }
            });
        });
    
        const mailSent = scenarioSaved.then(() => {
            const mail = new MailingScenariosService('kolodziejczak.mn@gmail.com', 1234, 'https://www.scelper.com');
            
            mail.transport().sendMail(mail.mailOptions, (error, info) => {
                if (error) {
                    console.log(SCENARIO_ERRORS.MAIL_SENDING.msg, error);
                    return res.status(400).json(SCENARIO_ERRORS.MAIL_SENDING);
                }
                console.log(SCENARIO_SUCCESSES.MAIL_SENT.msg, info.messageId, info.response);
                return res.json(SCENARIO_SUCCESSES.MAIL_SENT);
            });
        });

    });
});

router.delete('/public-scenarios/:deleteCode', function(req, res, next) {

    publicScenariosModel.getScenarioByDeleteCode(req.params.deleteCode).exec(function(err, scenario){

        if(err) {
            console.log(SCENARIO_ERRORS.SCENARIO_DB_REMOVE.msg, err);
            return res.status(503).json(SCENARIO_ERRORS.SCENARIO_DB_REMOVE);
        }

        if(!scenario){
            console.log(SCENARIO_ERRORS.NOT_EXISTS.msg);
            return res.status(404).json(SCENARIO_ERRORS.NOT_EXISTS);
        }

        const newPath = scenario.path.replace('/pdf','/deleted/pdf'),
              oldPath = scenario.path;
           
        const scenarioRemoved = scenario.remove(function (err) {
            if(err) {
                console.log(SCENARIO_ERRORS.SCENARIO_DB_REMOVE.msg, err);
                return res.status(503).json(SCENARIO_ERRORS.SCENARIO_DB_REMOVE);
            }
        });
        
        scenarioRemoved.then((scenario) => {

            fs.rename(oldPath, newPath, function (err) {
                if(err) {
                    console.log(SCENARIO_ERRORS.SCENARIO_FILE_REMOVE.msg, err); 
                    return res.status(500).json(SCENARIO_ERRORS.SCENARIO_FILE_REMOVE);
                }
                return res.json(SCENARIO_SUCCESSES.SCENARIO_REMOVED);
            });
        });

    });

});

module.exports = router;
