const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      corsMiddleware = require('../middlewares/cors.middleware'),
      MulterMiddleware = require('../middlewares/multer.middleware'),
      uploadPDF = new MulterMiddleware().uploadPDF,
      config = require('../configurations/config');

const commonConstants = require('../constants/common.constants');

const publicScenariosConstants = require('../constants/public-scenarios.constants'),
      publicScenariosModel = require('../models/public-scenarios.model'),
      publicScenariosController = require('../controllers/public-scenarios.controller'),
      MailingScenariosService = require('../services/mailing-scenarios.service');

const publicScenariosRequestsController = require('../controllers/public-scenarios-requests.controller');

const summaryGeneratorService = require('../services/summary-generator.service');

const interviewQuestionsModel = require('../models/interview-questions.model');

const symbolsModel = require('../models/symbols.model');

const COMMON_ERRORS = commonConstants.ERRORS,
      SCENARIO_ERRORS = publicScenariosConstants.ERRORS,
      SCENARIO_SUCCESSES = publicScenariosConstants.SUCCESSES,
      SCENARIO_FORM_FIELD_NAME = publicScenariosConstants.SCENARIO_FORM_FIELD_NAME;

const PDFDocument = require('pdfkit');

corsMiddleware.letLocalhost(router);


router.get('/random-symbols', function(req, res, next) {

    const amount = Number(req.query.amount);

    symbolsModel.getRandom(amount).exec(function(err, data) {
        if (err) {
            console.log(err);
            return res.status(400).json(COMMON_ERRORS.COMMON_DOWNLOAD);
        } else {
            return res.json(data);
        }
    });
});

router.get('/interview-questions', function(req, res, next) {

    interviewQuestionsModel.getAll().exec(function(err, data) {
        if (err) {
            console.log(err);
            return res.status(503).json(COMMON_ERRORS.COMMON_DOWNLOAD);
        } else {
            return res.json(data);
        }
    });
});

router.get('/public-scenarios', function(req, res, next) {

    publicScenariosModel.getPublicScenarios().exec(function(err, data) {
        if (err) {
            console.log(err);
            return res.status(503).json(COMMON_ERRORS.COMMON_DOWNLOAD);
        } else {
            return res.json(data);
        }
    });
});

router.post('/interview-summary', function(req, res) {
    const doc = summaryGeneratorService.streamSummaryPDF(req.body);
    doc.end();
    return doc.pipe(res);
});

router.post('/public-scenarios', function(req, res) {

    uploadPDF.single(SCENARIO_FORM_FIELD_NAME)(req, res, function(err) {

        if (err) {
            console.log(err);
            return res.status(400).json(COMMON_ERRORS.COMMON_UPLOAD);
        }

        const scenarioPrepared = publicScenariosController.prepareForDB(req);

        scenarioPrepared.then(scenario => {
            scenario.save((err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(SCENARIO_ERRORS.SCENARIO_DB_SAVE);
                }

                const activationUrl = `${config.serverRoot}/beta/#/activation/${scenario.deleteCode}`,
                      mail = new MailingScenariosService(req.body.authorEmail, scenario.deleteCode, activationUrl);

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
});

router.post('/public-scenarios/requests', function(req, res) {
    console.log('req, req.body: ', req.body);
    const scenarioRequestPrepared = publicScenariosRequestsController.prepareForDB(req);

    scenarioRequestPrepared.then(scenarioRequest => {
        scenarioRequest.save((err) => {
            if (err) {
                console.log(err);
                return res.status(400).json(SCENARIO_ERRORS.SCENARIO_REQUEST_DB_SAVE);
            }

            const activationUrl = `${config.serverRoot}/beta/#/public-scenarios/requests/activation/${scenario.deleteCode}`;
            const mail = new MailingScenariosService(
                req.body.requestAuthorEmail,
                scenarioRequest.deleteCode,
                activationUrl
            );

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

    publicScenariosModel.getScenarioByDeleteCode(req.params.deleteCode).exec(function(err, scenario) {

        if (err) {
            console.log(SCENARIO_ERRORS.SCENARIO_DB_REMOVE.msg, err);
            return res.status(503).json(SCENARIO_ERRORS.SCENARIO_DB_REMOVE);
        }

        if (!scenario) {
            console.log(SCENARIO_ERRORS.NOT_EXISTS.msg);
            return res.status(404).json(SCENARIO_ERRORS.NOT_EXISTS);
        }

        const newPath = scenario.path.replace('/pdf', '/deleted/pdf'),
              oldPath = scenario.path;

        const scenarioRemoved = scenario.remove(function(err) {
            if (err) {
                console.log(SCENARIO_ERRORS.SCENARIO_DB_REMOVE.msg, err);
                return res.status(503).json(SCENARIO_ERRORS.SCENARIO_DB_REMOVE);
            }
        });

        scenarioRemoved.then((scenario) => {

            fs.rename(oldPath, newPath, function(err) {
                if (err) {
                    console.log(SCENARIO_ERRORS.SCENARIO_FILE_REMOVE.msg, err); 
                    return res.status(500).json(SCENARIO_ERRORS.SCENARIO_FILE_REMOVE);
                }
                return res.json(SCENARIO_SUCCESSES.SCENARIO_REMOVED);
            });
        });

    });

});

module.exports = router;
