const Product = require("../models/product");
const {errorName} = require("../constants/errors");
const customError = require("../utils/customErrors");
const Order = require("../models/order");


const createOrder = async (order, seller) => {
    try {
        const newOrder = new Order(order);
        newOrder.seller = seller;
        return await newOrder.save();
    } catch (e) {
        throw e;
    }
}


module.exports = {
    createOrder,
}
