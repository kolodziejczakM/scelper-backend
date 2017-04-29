

exports.storagePDF = multer.diskStorage({
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

exports.uploadPDF = multer({ 
    storage: storagePDF,
    limits: { fileSize: 200 * KILO_BYTE }
});