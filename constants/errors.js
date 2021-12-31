exports.errorName = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    UNAUTHENTICATED: 'UNAUTHENTICATED',
    INTERNAL_ERROR_SERVER: 'INTERNAL_ERROR_SERVER',

    NOT_FOUND_CLIENT_BY_ID: 'NOT_FOUND_CLIENT_BY_ID',
    INTERNAL_ERROR_GET_ALL_CLIENT: 'INTERNAL_ERROR_GET_ALL_CLIENT',
    INTERNAL_ERROR_GET_ALL_CLIENT_BY_SELLER: 'INTERNAL_ERROR_GET_ALL_CLIENT_BY_SELLER',
    NOT_PERMISSION_CREATE_ORDER: 'NOT_PERMISSION_CREATE_ORDER',

    NOT_FOUND_PRODUCT_BY_ID: 'NOT_FOUND_PRODUCT_BY_ID',
    NOT_AVAILABLE_STOCK_PRODUCT: 'NOT_AVAILABLE_STOCK_PRODUCT',
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
    },
    NOT_FOUND_CLIENT_BY_ID: {
        message: 'Cliente no encontrado',
        statusCode: 500
    },
    NOT_PERMISSION_CREATE_ORDER: {
        message: 'No tienes permisos para crear pedidos para el client ',
        statusCode: 500
    },
    NOT_FOUND_PRODUCT_BY_ID:{
        message: 'Producto no encontrado',
        statusCode: 500
    },
    NOT_AVAILABLE_STOCK_PRODUCT: {
        message: 'El producto no tiene stock suficiente',
        statusCode: 500
    },
    INTERNAL_ERROR_GET_ALL_CLIENT: {
        message: 'Ocurrio un error obteniendo los clientes',
        statusCode: 500
    },
    INTERNAL_ERROR_GET_ALL_CLIENT_BY_SELLER: {
        message: 'Ocurrio un error obteniendo los clientes del vendedor',
        statusCode: 500
    }
}

