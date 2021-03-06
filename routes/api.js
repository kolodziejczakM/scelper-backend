const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      corsMiddleware = require('../middlewares/cors.middleware'),
      MulterMiddleware = require('../middlewares/multer.middleware'),
      uploadPDF = new MulterMiddleware().uploadPDF,
      tts = require('../voice-rss-tts/index.js');

const commonConstants = require('../constants/common.constants');

const publicScenariosConstants = require('../constants/public-scenarios.constants'),
      publicScenariosModel = require('../models/public-scenarios.model'),
      publicScenariosController = require('../controllers/public-scenarios.controller'),
      ActivationMailingService = require('../services/activation-mailing.service');

const publicScenariosRequestsConstants = require('../constants/public-scenarios-requests.constants'),
      publicScenariosRequestsModel = require('../models/public-scenarios-requests.model'),
      publicScenariosRequestsController = require('../controllers/public-scenarios-requests.controller');

const summaryGeneratorService = require('../services/summary-generator.service');

const interviewQuestionsModel = require('../models/interview-questions.model');

const symbolsModel = require('../models/symbols.model');

const COMMON_ERRORS = commonConstants.ERRORS,
      COMMON_SUCCESSES = commonConstants.SUCCESSES,
      SCENARIO_ERRORS = publicScenariosConstants.ERRORS,
      SCENARIO_SUCCESSES = publicScenariosConstants.SUCCESSES,
      SCENARIO_FORM_FIELD_NAME = publicScenariosConstants.SCENARIO_FORM_FIELD_NAME;

const SCENARIO_REQUESTS_ERRORS = publicScenariosRequestsConstants.ERRORS,
      SCENARIO_REQUESTS_SUCCESSES = publicScenariosRequestsConstants.SUCCESSES;

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

router.get('/public-scenarios/requests', function(req, res, next) {

    publicScenariosRequestsModel.getPublicScenariosRequests().exec(function(err, data) {
        if (err) {
            console.log(err);
            return res.status(503).json(COMMON_ERRORS.COMMON_DOWNLOAD);
        } else {
            return res.json(data);
        }
    });
});

router.post('/tts', function(req, res, next) {

    if (!req.body.text) {
        return res.status(400).send(COMMON_ERRORS.TTS_NEEDS_TEXT);
    }

    tts.speech({
        key: '92771de09e6141e1b5a8c2c1ec44c8c0',
        src: req.body.text,
        hl: 'pl-pl',
        r: 0,
        c: 'ogg',
        f: '8khz_8bit_mono',
        ssml: false,
        b64: true,
        callback(err, content) {
            console.log(err || content);

            if (err) {
                console.log(err);
                return res.status(503).send(COMMON_ERRORS.EXTERNAL_PROVIDER);
            }

            return res.send(content);
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

                const activationUrl = `${commonConstants.ACTIVATION_PAGES.NEW_SCENARIO}${scenario.deleteCode}`;
                const mail = new ActivationMailingService(
                    req.body.authorEmail,
                    scenario.deleteCode,
                    activationUrl,
                    'newScenarioTemplate'
                );

                mail.transport().sendMail(mail.getDetails(), (error, info) => {
                    if (error) {
                        console.log(COMMON_ERRORS.MAIL_SENDING.msg, error);
                        return res.status(400).json(COMMON_ERRORS.MAIL_SENDING);
                    }
                    console.log(COMMON_SUCCESSES.MAIL_SENT.msg, info.messageId, info.response);
                    return res.json(COMMON_SUCCESSES.MAIL_SENT);
                });
            });
        });

    });
});

router.post('/public-scenarios/requests', function(req, res) {

    const scenarioRequestPrepared = publicScenariosRequestsController.prepareForDB(req);

    scenarioRequestPrepared.save((err) => {
        if (err) {
            console.log(err);
            return res.status(400).json(SCENARIO_REQUESTS_ERRORS.SCENARIO_REQUEST_DB_SAVE);
        }

        const activationUrl = `${commonConstants.ACTIVATION_PAGES.NEW_SCENARIO_REQUEST}${scenarioRequestPrepared.deleteCode}`;
        const mail = new ActivationMailingService(
            req.body.requestAuthorEmail,
            scenarioRequestPrepared.deleteCode,
            activationUrl,
            'newScenarioRequestTemplate'
        );

        mail.transport().sendMail(mail.getDetails(), (error, info) => {
            if (error) {
                console.log(COMMON_ERRORS.MAIL_SENDING.msg, error);
                return res.status(400).json(COMMON_ERRORS.MAIL_SENDING);
            }
            console.log(COMMON_SUCCESSES.MAIL_SENT.msg, info.messageId, info.response);
            return res.json(COMMON_SUCCESSES.MAIL_SENT);
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

router.delete('/public-scenarios/requests/:deleteCode', function(req, res, next) {

    publicScenariosRequestsModel.getScenarioRequestByDeleteCode(req.params.deleteCode)
                                .exec(function(err, scenarioRequest) {
        if (err) {
            console.log(SCENARIO_REQUESTS_ERRORS.SCENARIO_REQUEST_DB_REMOVE.msg, err);
            return res.status(503).json(SCENARIO_REQUESTS_ERRORS.SCENARIO_REQUEST_DB_REMOVE);
        }

        if (!scenarioRequest) {
            console.log(SCENARIO_REQUESTS_ERRORS.SCENARIO_REQUEST_NOT_EXISTS.msg);
            return res.status(404).json(SCENARIO_REQUESTS_ERRORS.SCENARIO_REQUEST_NOT_EXISTS);
        }

        scenarioRequest.remove(function(err) {
            if (err) {
                console.log(SCENARIO_REQUESTS_ERRORS.SCENARIO_REQUEST_DB_REMOVE.msg, err);
                return res.status(503).json(SCENARIO_ERRORS.SCENARIO_REQUEST_DB_REMOVE);
            }

            return res.json(SCENARIO_REQUESTS_SUCCESSES.SCENARIO_REQUEST_REMOVED);
        });

    });
});

module.exports = router;
