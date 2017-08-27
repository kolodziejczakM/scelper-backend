const MailingService = require('./mailing.service');

class ActivationMailingService extends MailingService {

    constructor(addressee, deleteCode, activationLink, templateName) {
        super();
        this.addressee = addressee;
        this.deleteCode = deleteCode;
        this.activationLink = activationLink;
        this.template = super.getTemplate(templateName);
    }

    getDetails() {
        return Object.assign(
            {
                to: this.addressee,
                html: this.template.getHTML(this.deleteCode, this.activationLink)
            },
            this.template.getOptions()
        );
    }
}

module.exports = ActivationMailingService;
