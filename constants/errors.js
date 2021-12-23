exports.errorName = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    UNAUTHENTICATED: 'UNAUTHENTICATED',
    INTERNAL_ERROR_SERVER: 'INTERNAL_ERROR_SERVER'
}

exports.errorType = {
    UNAUTHORIZED: {
        message: 'Authentication is needed  to get requestes response.',
        statusCode: 401,
    },
    UNAUTHENTICATED: {
        message: 'Authentication is needed  to get requestes response.',
        statusCode: 401,
    },
    INTERNAL_ERROR_SERVER: {
        message: '',
        statusCode: 500,
    }
}

