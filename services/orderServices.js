const Product = require("../models/product");
const {errorName} = require("../constants/errors");
const customError = require("../utils/customErrors");
const Order = require("../models/order");
const Client = require("../models/client");


const getOrderById = async (id) => {
    try{
        const order = await Order.findById(id);
        if (!order) {
            throw new customError('', errorName.NOT_FOUND_ORDER_BY_ID);
        }
        return order;
    }catch (e){
        throw e;
    }
}


const getAllOrder = async () => {
    try{
        return await Order.find({});
    }catch (e){
        throw e;
    }
}

const getOrderBySeller = async (seller) => {
    try{
        return await Order.find({seller});
    }catch (e){
        throw e;
    }
}

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
    getAllOrder,
    getOrderBySeller,
    getOrderById
}
