const {ApolloError} = require("apollo-server");


class CustomError extends ApolloError {
    constructor(message, code) {
        super(message, code);
        Object.defineProperty(this, message, {value: 'CustomError'});
    }
}

module.exports = CustomError;
