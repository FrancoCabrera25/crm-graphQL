const Product = require("../models/product");
const {errorName} = require("../constants/errors");
const customError = require("../utils/customErrors");
const Order = require("../models/order");
const Client = require("../models/client");

const getOrderById = async (id) => {
    try {
        const order = await Order.findById(id);
        if (!order) {
            throw new customError('', errorName.NOT_FOUND_ORDER_BY_ID);
        }
        return order;
    } catch (e) {
        throw e;
    }
}


const getAllOrder = async () => {
    try {
        return await Order.find({});
    } catch (e) {
        throw e;
    }
}

const getOrderBySeller = async (seller) => {
    try {
        return await Order.find({seller});
    } catch (e) {
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

const updateOrder = async (id, order) => {
    try {
        return await Order.findOneAndUpdate({_id: id}, order, {new: true});
    } catch (e) {
        throw e;
    }
}

const deleteOrder = async (id) => {
    try {
        await Order.findOneAndDelete({_id: id});
    } catch (e) {
        throw e;
    }
}

const getOrderByState = async (state, seller) => {
    try {
        return await Order.find({seller, state})
    } catch (e) {
        throw e;
    }
}

const getOrdersInBestClient = async () => {
   const result = await Order.aggregate([
        {$match: {state: 'COMPLETADO'}},
        {$group: {_id: '$client', total: {$sum: '$total'}}},
        {
            $lookup: {
                from: 'client',
                localField: '_id',
                foreignField: '_id',
                as: 'client'
            }
        },
       {
           $sort: { total: -1 }
       }
    ]);

   return result;
}

const getOrdersInBestSeller = async () => {
    const result = await Order.aggregate([
        {$match: {state: 'COMPLETADO'}},
        {$group: {_id: '$seller', total: {$sum: '$total'}}},
        {
            $lookup: {
                from: 'user',
                localField: '_id',
                foreignField: '_id',
                as: 'seller'
            }
        },
        {
            $sort: { total: -1 }
        }
    ]);

    return result;
}

module.exports = {
    createOrder,
    getAllOrder,
    getOrderBySeller,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrderByState,
    getOrdersInBestClient,
    getOrdersInBestSeller
}
