const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      corsMiddleware = require('../middlewares/cors.middleware'),
      publicScenariosModel = require('../models/public-scenarios');

corsMiddleware.letLocalhost(router);

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.patch('/activation/:deleteCode', function (req, res, next) {
    
    publicScenariosModel.getScenarioByDeleteCode(req.params.deleteCode).exec(function(err, scenario){
                    
        if(err) {
            console.log('ERROR deleteCode fetching from db', err);
            return res.status(503).json('ERROR deleteCode fetching from db');
        }

        if(!scenario){
            console.log('ERROR deleteCode doesnt exist', req.params.deleteCode);
            return res.status(404).json('ERROR deleteCode doesnt exist');
        }

        const newPath = scenario.path.replace('/tmp',''),
              oldPath = scenario.path;

        scenario.active = true;
        scenario.path = newPath;
        
        const scenarioUpdated = scenario.save(function (err) {
            if(err) {
                console.log('ERROR while updating scenario entity.');
                return res.status(503).json('ERROR while updating scenario entity.');
            }
        });

        scenarioUpdated.then(() => {

            fs.rename(oldPath, newPath, function (err) {
                if(err) {
                    console.log('ERROR while renaming scenario file (moving it)', err); 
                    return res.status(500).json('ERROR while renaming scenario file (moving it)');
                }
                return res.json('Successful update!');
            });
        });
        
    });

});

module.exports = router;
