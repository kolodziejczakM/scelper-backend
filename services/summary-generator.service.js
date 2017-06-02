
const fs = require('fs'),
      PDFDocument = require('pdfkit');


class SummaryGeneratorService {
    static streamSummaryPDF(resultArray) {
        
        const doc = new PDFDocument({ margins: { top: 40, right: 40, bottom: 45, left: 40 } });
        
        doc.registerFont('Roboto', 'public/assets/Roboto-Regular.ttf')
        doc.image('public/assets/scelper-logo.png', (doc.page.width - 100)/2, undefined, { fit: [100, 100] });
        doc.moveDown();

        doc.font('Roboto', 12).text('Utworzono za pomocą scelper.com', (doc.page.width - 200)/2, undefined, { link: 'http://scelper.com/', underline: false }).moveDown(2);

        resultArray.forEach((question, index) => {
            if (question.answer) {
                doc.font('Roboto', 18).text(`${index+1}. ${question.questionText}`, 40, undefined).fillColor('#666').moveDown();
                doc.font('Roboto', 16).text(question.answer, 40, undefined).fillColor('#000').moveDown();
            }
        });                

        return doc; 
    }
}

module.exports = SummaryGeneratorService;
