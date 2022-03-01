const {errorName} = require("../constants/errors");
const customError = require('./customErrors');

const isUserAutorizado = (context) => {
    if (!context.user) {
        throw new customError('Usuario no autorizado', errorName.UNAUTHORIZED);
    }
    return true;
}

module.exports = isUserAutorizado;