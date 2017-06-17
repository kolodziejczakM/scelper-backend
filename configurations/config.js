/*
    Use this command to run application with set process.env.NODE_ENV var.
        NODE_ENV=production node app.js

    Production server should have exported that variable:
        export NODE_ENV=production
*/

exports.producionRootURL = 'https://scelper.com';
exports.developmentRootURL = 'http://localhost:4200';
exports.serverRoot = (process.env.NODE_ENV === 'production') ? this.producionRootURL : this.developmentRootURL;
