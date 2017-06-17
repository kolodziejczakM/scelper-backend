
const mongoose = require('mongoose');
/*
    Use this command to run application with set process.env.NODE_ENV var.
        NODE_ENV=production node app.js

    Production server should have exported that variable:
        export NODE_ENV=production
*/
exports.productionEnv = (process.env.NODE_ENV === 'production');

exports.productionRootURL = 'https://scelper.com';
exports.developmentRootURL = 'http://localhost:4200';
exports.serverRoot = this.productionEnv ? this.productionRootURL : this.developmentRootURL;

exports.databaseAuth = {
    dbName: 'mo1191_scelper',
    dbServer: 'mongo11.mydevil.net',
    dbPassword: 'Kolo1234'
};

exports.databaseConnect = () => {
    mongoose.Promise = global.Promise;

    if (this.productionEnv) {
        mongoose.connect(`mongodb://${databaseAuth.dbName}:${databaseAuth.dbPassword}@${databaseAuth.dbServer}/${databaseAuth.dbName}`);
    } else {
        mongoose.connect(`mongodb://localhost/scelper_db`);
    }
};
