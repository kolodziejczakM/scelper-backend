
exports.KILO_BYTE = 1024;
exports.SCENARIO_ACCEPTABLE_MIMETYPE = 'application/pdf';
exports.SCENARIO_ACCEPTABLE_EXTENSION = 'pdf';

exports.ERRORS = {
    COMMON_UPLOAD: {
        msg: 'There was an error with file upload. Please try again.',
        code: 'F0'
    },
    EXTENSION: {
        msg: 'Requested file has invalid format.',
        code: 'F1'
    },
    SCENARIO_DB_SAVE: {
        msg: 'There was a problem with database connection. Please Try again.',
        code: 'DB1'
    }
}

exports.SUCCESSES = {
    SCENARIO_SAVED: {
        msg: 'Scenario has been successfully saved.',
        code: 'SC1'
    }
}