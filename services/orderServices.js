const Product = require("../models/product");
const {errorName} = require("../constants/errors");
const customError = require("../utils/customErrors");


const createOrder = async (order) => {
    try {
     return await order.save();
    } catch (e) {
        throw e;
    }
}



module.exports = {
    createOrder,
}
