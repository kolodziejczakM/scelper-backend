
const fs = require('fs'),
      PDFDocument = require('pdfkit');

const commonConstants = require('../constants/common.constants'),
      summaryGeneratorConstants = require('../constants/summary-generator.constants');

class SummaryGeneratorService {

    static streamSummaryPDF(resultArray) {
        
        const doc = new PDFDocument({ margins: { top: 40, right: 40, bottom: 45, left: 40 } });
        
        doc.registerFont(commonConstants.ROBOTO_FONT_NAME, commonConstants.ROBOTO_FONT_PATH)

        this.appendLogo(doc);

        doc.moveDown();

        this.appendCreatedWithLink(doc)
        
        doc.moveDown(2);

        this.appendQuestionsWithAnswers(resultArray, doc);          

        return doc; 
    }

    static appendLogo(doc) {
        doc.image(commonConstants.SCELPER_LOGO_PATH, (doc.page.width - 100)/2, undefined, { fit: [100, 100] });
    }

    static appendCreatedWithLink(doc) {
        doc.font(commonConstants.ROBOTO_FONT_NAME, 12)
           .fillColor(commonConstants.SCELPER_GRAY_COLOR, summaryGeneratorConstants.CREATED_WITH_LINK_OPACITY)
           .text(
               summaryGeneratorConstants.CREATED_WITH_LINK_TEXT, 
                (doc.page.width - 200)/2, 
                undefined, 
                { link: commonConstants.SCELPER_MAIN_PAGE, underline: false })
    }

    static appendQuestionsWithAnswers(resultArray, doc) {
         resultArray.forEach((question, index) => {
            if (question.answer) {
                doc.font(commonConstants.ROBOTO_FONT_NAME, 18)
                   .fillColor(commonConstants.SCELPER_GRAY_COLOR, 1).text(question.questionText, 40, undefined)
                   .moveDown();

                doc.font(commonConstants.ROBOTO_FONT_NAME, 16)
                   .fillColor(commonConstants.BLACK_COLOR, 1).text(question.answer, 40, undefined)
                   .moveDown();
            }
        });         
    }
}

module.exports = SummaryGeneratorService;
