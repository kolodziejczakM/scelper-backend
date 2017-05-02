const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      corsMiddleware = require('../middlewares/cors.middleware');

const publicScenariosConstants = require('../constants/public-scenarios.constants'),
      publicScenariosModel = require('../models/public-scenarios.model');

const SCENARIO_ERRORS = publicScenariosConstants.ERRORS,
      SCENARIO_SUCCESSES = publicScenariosConstants.SUCCESSES;

corsMiddleware.letLocalhost(router);

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.patch('/activation/:deleteCode', function (req, res, next) {
    
    publicScenariosModel.getScenarioByDeleteCode(req.params.deleteCode).exec(function(err, scenario){
                    
        if(err) {
            console.log(SCENARIO_ERRORS.COMMON_DB.msg, err);
            return res.status(503).json(SCENARIO_ERRORS.COMMON_DB);
        }

        if(!scenario){
            console.log(SCENARIO_ERRORS.DELETE_CODE_NOT_EXISTS.msg, req.params.deleteCode);
            return res.status(404).json(SCENARIO_ERRORS.DELETE_CODE_NOT_EXISTS);
        }

        const newPath = scenario.path.replace('/tmp',''),
              oldPath = scenario.path;

        scenario.active = true;
        scenario.path = newPath;
        
        const scenarioUpdated = scenario.save(function (err) {
            if(err) {
                console.log(SCENARIO_ERRORS.SCENARIO_DB_UPDATE.msg, err);
                return res.status(503).json(SCENARIO_ERRORS.SCENARIO_DB_UPDATE);
            }
        });

        scenarioUpdated.then(() => {

            fs.rename(oldPath, newPath, function (err) {
                if(err) {
                    console.log(SCENARIO_ERRORS.SCENARIO_FILE_UPDATE.msg, err); 
                    return res.status(500).json(SCENARIO_ERRORS.SCENARIO_FILE_UPDATE);
                }
                return res.json(SCENARIO_SUCCESSES.SCENARIO_UPDATED);
            });
        });
        
    });

});

module.exports = router;
