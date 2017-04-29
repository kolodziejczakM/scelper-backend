const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      path = require('path'), 
      multer = require('multer');
      
const constants = require('./constants.js'),
      newScenarioService = require('../services/new-scenario.service');

const KILO_BYTE = constants.KILO_BYTE,
      ERRORS = constants.ERRORS,
      SUCCESSES = constants.SUCCESSES,
      ACCEPTABLE_MIMETYPE = constants.SCENARIO_ACCEPTABLE_MIMETYPE,
      ACCEPTABLE_EXTENSION = constants.SCENARIO_ACCEPTABLE_EXTENSION;


const storagePDF = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/tmp/pdf/')
    },
    filename: function (req, file, cb) {
        let nameParts = file.originalname.replace(/\s+/g, '_');
        nameParts = nameParts.split('.');
        nameParts.pop();
        namePart = nameParts.join('.');
        cb(null, namePart + '-'+'scelper.com-'+ Date.now() +  path.extname(file.originalname))
    }
});

const uploadPDF = multer({ 
    storage: storagePDF,
    limits: { 
        files: 1,
        fileSize: 200 * KILO_BYTE 
    },
    fileFilter: function (req, file, cb) {
        
        const validExtension = (file.originalname.split('.').pop() === ACCEPTABLE_EXTENSION),
              validMimetype = (file.mimetype === ACCEPTABLE_MIMETYPE);

        if (!validMimetype || !validExtension) {
    
            req.fileFormatError = ERRORS.EXTENSION.msg;
            return cb(new Error(req.fileValidationError), false);
        }

        cb(null, true);
    }

});

// CORS middleware => delete it on production
router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

router.get('/api/v1/public-scenarios',function(req ,res, next){
    const query = PublicScenarios.find();
    query.exec(function(err,data){
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    });
});

router.post('/new-scenario', function(req, res) {
    
    uploadPDF.single('file')(req, res, function(err) {
        
        if(req.fileFormatError) { 
            return res.status(400).send(req.fileFormatError);
        }
    
        if(err){
            return res.status(413).send(ERRORS.COMMON_UPLOAD.msg);
        }

        const x = newScenarioService.saveToDB(req).then(((err) => {
            if (err) {  
                console.log(err);
                res.status(400).send(`${ERRORS.SCENARIO_DB_SAVE} ${err}`);
            }
            res.send(SUCCESSES.SCENARIO_SAVED);
        }));
        console.log('IKS: ', x);
    });

   

    // function saveToDB() {
    //     const pdfData = new Uint8Array(fs.readFileSync(req.file.path)),
    //           stateId = newScenarioService.getStateIdFromString(req.body.state),
    //           deleteCode = newScenarioService.getDeleteCode(),
    //           pdfDocumentReady = newScenarioService.getPDF(pdfData);

    //     pdfDocumentReady.then(pdfDocument => {
    //         console.log('Document PDF: ', pdfDocument);
            
    //         const scenario = newScenarioService.createScenarioEntity(
    //             req,
    //             stateId,
    //             pdfDocument.numPages,
    //             deleteCode
    //         );

    //         scenario.save((err) => {
    //             if (err) {
    //                 console.log(err);
    //                 res.status(400).send(`${ERRORS.SCENARIO_DB_SAVE} ${err}`);
    //             }
    //             res.send(SUCCESSES.SCENARIO_SAVED);
    //         });
            
    //     });
    // }
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
