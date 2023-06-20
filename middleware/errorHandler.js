const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATIONERROR:
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
        case constants.UNAUTHORIZED:
            res.json({ title: "Un Authorized", message: err.message, stackTrace: err.stack });
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
        case constants.SERVERERROR:
            res.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
        default:
            console.log('No Error');
            break;
    }
}

module.exports = errorHandler;