const express = require('express'),
      router = express.Router(),
      PublicScenarios = require('../models/public-scenarios');

router.get('/public-scenarios',function(req ,res, next){
    const query = PublicScenarios.find();
    query.exec(function(err,data){
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    });
});

module.exports = router;
