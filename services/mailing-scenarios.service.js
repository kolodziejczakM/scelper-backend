
const nodemailer = require('nodemailer'),
      mailingScenariosConfig = require('../configurations/mailing-scenarios.config'),
      newScenarioTemplate = require('../templates/new-scenario.template');

class MailingScenariosService {

    constructor(addressee, deleteCode, activationLink) {

        this.transporter = nodemailer.createTransport(mailingScenariosConfig.data);

        this.mailOptions = {
            from: '"SCELPER.COM" <administracja@scelper.com>',
            to: addressee,
            subject: 'Scenarzysto... Dziękujemy!',
            text: '', 
            html: newScenarioTemplate.getHTML(deleteCode, activationLink),
            attachments: [{
                filename: 'scelper-logo.png',
                path: './public/assets/scelper-logo.png',
                cid: 'rejestracja@scelper.com-logoPicture'
            },{
                filename: 'scelper-mail.png',
                path: './public/assets/scelper-mail.png',
                cid: 'rejestracja@scelper.com-mailPicture'
            }]
        };
    }

    transport() {
        return this.transporter;
    }

}

module.exports = MailingScenariosService;
