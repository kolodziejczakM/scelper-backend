const express = require('express'),
      router = express.Router(),
      PublicScenarios = require('../models/publicScenarios'),
      fs = require('fs'),
      PDFJS = require('pdfjs-dist'),  
      multer = require('multer'),
      storagePDF = multer.diskStorage({
          destination: function (req, file, cb) {
              cb(null, './public/uploads/tmp/pdf/')
          },
          filename: function (req, file, cb) {
              var nameParts = file.originalname.replace(/\s+/g, '_');
              nameParts = nameParts.split(".");
              nameParts.pop();
              namePart = nameParts.join(".");

              cb(null, req.user.username +'-'+ namePart + '-'+'scelper.com-'+ Date.now() +  path.extname(file.originalname))
          }
      });
  
const uploadPDF = multer({ storage: storagePDF }),
      path = require('path');

router.get('/api/v1/public-scenarios',function(req ,res, next){
    var query = PublicScenarios.find();
    query.exec(function(err,data){
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    });
});

router.post('/new-scenario',uploadPDF.single('file'),function(req,res){
    console.log("FILE: ", req.file);
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
