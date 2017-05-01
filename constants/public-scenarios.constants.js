
exports.SCENARIO_ACCEPTABLE_MIMETYPE = 'application/pdf';
exports.SCENARIO_ACCEPTABLE_EXTENSION = 'pdf';
exports.SCENARIO_STATE_STRING = 'Niekompletny';
exports.SCENARIO_FORM_FIELD_NAME = 'file';

exports.ERRORS = {
    COMMON_UPLOAD: {
        msg: 'There was an error with file upload. Please try again.',
        code: 'COMMON_UPLOAD'
    },
    EXTENSION: {
        msg: 'Requested file has invalid format.',
        code: 'EXTENSION'
    },
    SCENARIO_DB_SAVE: {
        msg: 'There was a problem with database connection. Please Try again.',
        code: 'SCENARIO_DB_SAVE'
    },
    ALREADY_EXISTS: {
        msg: 'Scenario already exist in our database. Please contact with administration.',
        code: 'ALREADY_EXISTS'
    },
    MAILING: {
        msg: 'There was a problem with mail validation. Please try again.',
        code: 'MAILING'
    }
}

exports.SUCCESSES = {
    SCENARIO_SAVED: {
        msg: 'Scenario has been successfully saved.',
        code: 'SCENARIO_SAVED'
    }
}