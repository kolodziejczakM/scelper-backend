const config = require('../configurations/config');

exports.letLocalhost = (router) => {
    router.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', config.developmentRootURL);
        res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
};
