
exports.SCENARIO_ACCEPTABLE_MIMETYPE = 'application/pdf';
exports.SCENARIO_ACCEPTABLE_EXTENSION = 'pdf';
exports.SCENARIO_FORM_FIELD_NAME = 'file';

exports.ERRORS = {
    SCENARIO_REQUEST_DB_SAVE: {
        msg: 'There was a problem with saving scenario request. Database connection failed.',
        code: 'SCENARIO_REQUEST_DB_SAVE'
    },
    SCENARIO_REQUEST_DB_REMOVE: {
        msg: 'ERROR while removing scenario request from database.',
        code: 'SCENARIO_REQUEST_DB_REMOVE'
    },
    SCENARIO_REQUEST_DB_UPDATE: {
        msg: 'There was a problem with updating scenario request. Database connection failed.',
        code: 'SCENARIO_REQUEST_DB_UPDATE'
    },
    SCENARIO_REQUEST_NOT_EXISTS: {
        msg: 'ERROR cannot delete that scenario request, it does not exist',
        code: 'SCENARIO_REQUEST_NOT_EXISTS'
    },
};

exports.SUCCESSES = {
    SCENARIO_REQUEST_UPDATED: {
        msg: 'Scenario request has been successfully updated.',
        code: 'SCENARIO_REQUEST_UPDATED'
    },
    SCENARIO_REQUEST_REMOVED: {
        msg: 'Scenario request has been successfully removed.',
        code: 'SCENARIO_REQUEST_REMOVED'
    }
};
