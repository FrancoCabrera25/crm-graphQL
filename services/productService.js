const Product = require("../models/product");
const {errorName} = require("../constants/errors");
const customError = require("../utils/customErrors");


const getProductById = async (id) => {
    try {
        const product = await Product.findById(id);

        if (!product) {
            throw new customError('', errorName.NOT_FOUND_PRODUCT_BY_ID);
        }
        return product;

    } catch (e) {
        throw e;
    }
}

const validateStockProduct = async (id, quantity) => {
    try {
        const product = await getProductById(id);

        if (quantity <= product.stock) {
            return product;
        }
        throw new customError(`El producto ${product.name} no tiene el stock suficiente`, errorName.NOT_AVAILABLE_STOCK_PRODUCT);
    } catch (e) {
        throw e
    }
}

const updateStockProduct = async (product, quantity) => {
    try {
        product.stock = product.stock - quantity;
        return await product.save();

    } catch (e) {
        throw e
    }
}


module.exports = {
    getProductById,
    validateStockProduct,
    updateStockProduct
}
