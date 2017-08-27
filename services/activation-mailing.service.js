const MailingService = require('./mailing.service');

class ActivationMailingService extends MailingService {

    constructor(addressee, deleteCode, activationLink, templateName) {
        super();

        this.template = super.getTemplate(templateName);
        this.details = Object.assign(
            {
                to: addressee,
                html: this.template.getHTML(deleteCode, activationLink)
            },
            this.template.getOptions()
        );
    }
}

module.exports = ActivationMailingService;
