const Product = require("../models/product");
const {errorName} = require("../constants/errors");
const customError = require("../utils/customErrors");
const {ActionUpdateStock} = require("../constants/enums");


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

const updateStockProduct = async (product, quantity, action) => {
    try {
        if(ActionUpdateStock.PLUS === action){
            product.stock = product.stock + quantity;
        }else{
            product.stock = product.stock - quantity;
        }

        return await product.save();

    } catch (e) {
        throw e
    }
}

const getAllProduct = async () => {
    try{
        return await Product.find({});
    }catch (e){
        throw e;
    }
}

const createProduct = async (product) => {
    try{
        const product = new Product(product);
        return await product.save();
    }catch (e){
        throw e;
    }
}

const updateProduct = async (id, product) => {
    try{
        return await Product.findOneAndUpdate({_id: id}, product, {new: true});
    }catch (e){
        throw e;
    }
}

const deleteProduct = async (id) => {
    try{
        await Product.findOneAndDelete({_id: id});
    }catch (e){
        throw e;
    }
}

const getProductByName = async (name) => {
    try{
        return await  Product.find({$text: { $search: name}});
    }catch (e){
        throw  e
    }
}

module.exports = {
    getProductById,
    validateStockProduct,
    updateStockProduct,
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByName
}
