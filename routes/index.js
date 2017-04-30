
const express = require('express'),
      router = express.Router(),
      corsMiddleware = require('../middlewares/cors.middleware'),
      MulterMiddleware = require('../middlewares/multer.middleware'),
      uploadPDF = new MulterMiddleware().uploadPDF,
      constants = require('../constants/common.constants'),
      publicScenariosConstants = require('../constants/public-scenarios.constants'),
      publicScenariosService = require('../services/public-scenarios.service');

// DELETE ON PROD
corsMiddleware.letLocalhost(router);

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/new-scenario', function(req, res) {

    const SCENARIO_ERRORS = publicScenariosConstants.ERRORS,
          SCENARIO_SUCCESSES = publicScenariosConstants.SUCCESSES;


    uploadPDF.single(constants.SCENARIO_FORM_FIELD_NAME)(req, res, function(err) {

        if(req.fileFormatError) { 
            res.status(400).send(req.fileFormatError);
        }else if(err) {
            res.status(413).send(SCENARIO_ERRORS.COMMON_UPLOAD.msg);
        }

        publicScenariosService.prepareForDB(req).then(scenario => {
            scenario.save((err) => {
                if (err) {  
                    res.status(400).send(`${SCENARIO_ERRORS.SCENARIO_DB_SAVE.msg} ${err}`);
                }
                
                res.send(SCENARIO_SUCCESSES.SCENARIO_SAVED.msg);
            });
        });

    });
});

module.exports = router;
