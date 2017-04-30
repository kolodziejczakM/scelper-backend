
const nodemailer = require('nodemailer'),
      template = require('../templates/new-scenario.template');

class MailingScenariosService {

    constructor(addressee, deleteCode, activationLink) {

        this.transporter = nodemailer.createTransport({
            port: 465,
            secure: true, 
            host: 'mail11.mydevil.net',
            auth: {
                user: 'rejestracja@scelper.com',
                pass: 'Kolo1234'
            }
        });

        this.mailOptions = {
            from: '"SCELPER.COM" <rejestracja@scelper.com>',
            to: addressee,
            subject: 'Scenarzysto... Dziękujemy!',
            text: '', 
            html: template.getHTML(deleteCode, activationLink),
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
