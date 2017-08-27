
const nodemailer = require('nodemailer'),
      mailingConfig = require('../configurations/mailing.config'),
      templatesRegistry = require('../templates/templates.registry');

class MailingService {

    constructor() {
        this.transporter = nodemailer.createTransport(mailingConfig.data);
    }

    getTemplate(name) {
        return templatesRegistry.getTemplate(name);
    }

    transport() {
        return this.transporter;
    }
}

module.exports = MailingService;
