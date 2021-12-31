const Order = require("../models/order");
const {getClientByID, isClientSellerSameUserContext} = require("../services/clientServices");
const {validateStockProduct, updateStockProduct} = require("../services/productService");
const {createOrder, getAllOrder, getOrderBySeller, getOrderById } = require('../services/orderServices');
const {errorName} = require("../constants/errors");
const customError = require("../utils/customErrors");
require("dotenv").config({

    path: '.env.local'
})

// resolver
const orderResolver = {
    Query: {
        getOrders: async () => {
            try {
                return await getAllOrder();
            } catch (e) {
                return e;
            }
        },
        getOrdersBySeller: async (_, {}, ctx ) => {
            return await getOrderBySeller(ctx.user.id);
        },
        getOrderById: async (_, {id}, ctx) => {
            try {
                const client = await getOrderById(id);

                if (client.seller.toString() !== ctx.user.id) {
                    throw new customError('No esta autorizado para ver el pedido', errorName.UNAUTHORIZED);
                }
                return client;
            } catch (e) {
                return e;
            }
        }
    },
    Mutation: {
        createOrder: async (_, {input}, ctx) => {
            try {
                const {client, order} = input;
                const clientExist = await getClientByID(client);
                const isPermissions = isClientSellerSameUserContext(clientExist, ctx.user.id);

                if (isPermissions) {
                    for await (const item of order) {
                        const product = await validateStockProduct(item.id, item.quantity);
                        if (product) {
                            await updateStockProduct(product, item.quantity);
                        }
                    }

                    return await createOrder(input,ctx.user.id);
                }

            } catch (e) {
                return e;
            }
        },
    }
}

module.exports = orderResolver;
