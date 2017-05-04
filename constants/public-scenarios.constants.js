
exports.SCENARIO_ACCEPTABLE_MIMETYPE = 'application/pdf';
exports.SCENARIO_ACCEPTABLE_EXTENSION = 'pdf';
exports.SCENARIO_STATE_STRING = 'Niekompletny';
exports.SCENARIO_FORM_FIELD_NAME = 'file';

exports.ERRORS = {
    COMMON_UPLOAD: {
        msg: 'There was an error with file upload. Please try again.',
        code: 'COMMON_UPLOAD'
    },
    COMMON_DOWNLOAD: {
        msg: 'There was an error with fetching data from server. Please try again.',
        code: 'COMMON_DOWNLOAD'
    },
    COMMON_DB: {
        msg: 'There was a problem with database connection. Please Try again.',
        code: 'COMMON_DB'
    },
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
    },
    DELETE_CODE_NOT_EXISTS: {
        msg: 'ERROR delete code does not exist',
        code: 'DELETE_CODE_NOT_EXISTS'
    }
}

exports.SUCCESSES = {
    SCENARIO_SAVED: {
        msg: 'Scenario has been successfully saved.',
        code: 'SCENARIO_SAVED'
    },
    SCENARIO_UPDATED: {
        msg: 'Scenario has been successfully updated.',
        code: 'SCENARIO_UPDATED'
    },
    SCENARIO_REMOVED: {
        msg: 'Scenario has been successfully removed.',
        code: 'SCENARIO_REMOVED'
    },
    MAIL_SENT: {
        msg: 'Message sent.',
        code: 'MAIL_SENT'
    }
}