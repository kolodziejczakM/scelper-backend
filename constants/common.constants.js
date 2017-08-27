const config = require('../configurations/config');

exports.KILO_BYTE = 1024;

exports.SCELPER_MAIN_PAGE = 'https://scelper.com/';
exports.ACTIVATION_PAGES = {
    NEW_SCENARIO: `${config.serverRoot}/beta/#/public-scenarios/activation/`,
    NEW_SCENARIO_REQUEST: `${config.serverRoot}/beta/#/public-scenarios/requests/activation/`
};

exports.SCELPER_LOGO_PATH = 'public/assets/scelper-logo.png';

exports.BLACK_COLOR = '#000';
exports.SCELPER_GRAY_COLOR = '#666';


exports.ROBOTO_FONT_NAME = 'Roboto';
exports.ROBOTO_FONT_PATH = 'public/assets/Roboto-Regular.ttf';

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
    DELETE_CODE_NOT_EXISTS: {
        msg: 'ERROR delete code does not exist',
        code: 'DELETE_CODE_NOT_EXISTS'
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
    }
};
