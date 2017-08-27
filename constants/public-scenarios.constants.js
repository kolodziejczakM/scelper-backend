
exports.SCENARIO_ACCEPTABLE_MIMETYPE = 'application/pdf';
exports.SCENARIO_ACCEPTABLE_EXTENSION = 'pdf';
exports.SCENARIO_FORM_FIELD_NAME = 'file';

exports.ERRORS = {
    EXTENSION: {
        msg: 'Requested file has invalid format.',
        code: 'EXTENSION'
    },
    SCENARIO_DB_SAVE: {
        msg: 'There was a problem with saving scenario. Database connection failed.',
        code: 'SCENARIO_DB_SAVE'
    },
    SCENARIO_DB_UPDATE: {
        msg: 'There was a problem with updating scenario. Database connection failed.',
        code: 'SCENARIO_DB_UPDATE'
    },
    SCENARIO_DB_REMOVE: {
        msg: 'ERROR while removing scenario from database.',
        code: 'SCENARIO_DB_REMOVE'
    },
    SCENARIO_REQUEST_DB_SAVE: {
        msg: 'There was a problem with saving scenario request. Database connection failed.',
        code: 'SCENARIO_REQUEST_DB_SAVE'
    },
    SCENARIO_FILE_UPDATE: {
        msg: 'There was a problem with updating scenario file.',
        code: 'SCENARIO_FILE_UPDATE'
    },
    SCENARIO_FILE_REMOVE: {
        msg: 'ERROR while deleting scenario file.',
        code: 'SCENARIO_FILE_REMOVE'
    },
    ALREADY_EXISTS: {
        msg: 'Scenario already exist in our database. Please contact with administration.',
        code: 'ALREADY_EXISTS'
    },
    NOT_EXISTS: {
        msg: 'ERROR cannot delete that scenario, it does not exist',
        code: 'NOT_EXISTS'
    },
    MAIL_SENDING: {
        msg: 'Error while sending email.',
        code: 'MAIL_SENDING'
    }
};

exports.SUCCESSES = {
    MAIL_SENT: {
        msg: 'Message sent.',
        code: 'MAIL_SENT'
    },
    SCENARIO_UPDATED: {
        msg: 'Scenario has been successfully updated.',
        code: 'SCENARIO_UPDATED'
    },
    SCENARIO_REMOVED: {
        msg: 'Scenario has been successfully removed.',
        code: 'SCENARIO_REMOVED'
    }
};
