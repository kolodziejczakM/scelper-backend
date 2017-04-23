const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      path = require('path'), 
      PDFJS = require('pdfjs-dist'),
      multer = require('multer'),
      PublicScenarios = require('../models/publicScenarios');


const storagePDF = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/tmp/pdf/')
      },
        filename: function (req, file, cb) {
            let nameParts = file.originalname.replace(/\s+/g, '_');
            nameParts = nameParts.split(".");
            nameParts.pop();
            namePart = nameParts.join(".");
        cb(null, namePart + '-'+'scelper.com-'+ Date.now() +  path.extname(file.originalname))
    }
});

const uploadPDF = multer({ storage: storagePDF });


// CORS middleware => delete it on production
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

router.post('/new-scenario', uploadPDF.single('file'), function(req, res) {
    console.log("REQ.FILE: ", req.file);
    console.log("PRZYSŁANO NAM: ", req.body);

    const pdfData = new Uint8Array(fs.readFileSync(req.file.path));

    let stateId, deleteCode;
    if(req.body.state === "Niekompletny"){
      stateId = 0;
    }else{
      stateId = 1;
    }

    deleteCode = String(Date.now()).slice(-5);

    PDFJS.getDocument(pdfData).then(function (pdfDocument) {
        const numberOfPages = pdfDocument.numPages;
        console.log("Number of pages: ", numberOfPages);

        const scenario = new PublicScenarios({
            title: req.body.title,
            authorEmail: req.body.authorEmail,
            stateId,
            description: req.body.description,
            path: req.file.path,
            pages: numberOfPages,
            deleteCode
        });
        
        scenario.save((err) => {
            if (err) return console.log(err);
            res.send('Scenario saved!');
        });
    });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
