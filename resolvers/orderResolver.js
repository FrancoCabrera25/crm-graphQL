const Order = require("../models/order");
const {getClientByID, isClientSellerSameUserContext} = require("../services/clientServices");
const {validateStockProduct, updateStockProduct, getProductById} = require("../services/productService");
const {createOrder, getAllOrder, getOrderBySeller, getOrderById, updateOrder, deleteOrder, getOrderByState } = require('../services/orderServices');
const {errorName} = require("../constants/errors");
const customError = require("../utils/customErrors");
const { ActionUpdateStock } = require("../constants/enums");
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
        getOrdersBySeller: async (_, {}, ctx) => {
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
        },
        getOrderByState: async (_,{state}, ctx) => {
                return await  getOrderByState(state, ctx.user.id);
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
                            await updateStockProduct(product, item.quantity, ActionUpdateStock.MINUS) ;
                        }
                    }

                    return await createOrder(input, ctx.user.id);
                }

            } catch (e) {
                return e;
            }
        },
        updateOrder: async (_, {id, input}, ctx) => {
            const {client, order} = input;
            try {
                const existOrder = await getOrderById(id);
                if (existOrder) {
                    const existClient = await getClientByID(client);
                    if(existClient){
                        const isSameClient = isClientSellerSameUserContext(existClient,ctx.user.id);
                        if(isSameClient){
                            for await (const item of order) {
                                const orderOld = existOrder.order.find(f => f.id === item.id);
                               if( orderOld.quantity > item.quantity){
                                   const dif = orderOld.quantity - item.quantity;
                                   const product = await getProductById(item.id);
                                   await updateStockProduct(product, dif, ActionUpdateStock.PLUS);
                               } else if(orderOld.quantity !== item.quantity){
                                    const product = await validateStockProduct(item.id, item.quantity);
                                    if (product) {
                                        await updateStockProduct(product, item.quantity, ActionUpdateStock.MINUS);
                                    }
                                }
                            }

                            return await updateOrder(id, input);
                        }
                    }
                }
            }catch (e){
                return e;
            }
        },
        deleteOrder: async (_,{id}, ctx) => {
            const existOrder = await getOrderById(id);
            if (existOrder) {
              await deleteOrder(id);
            }

            return 'Pedido eliminado correctamente';
        }
    }
}

module.exports = orderResolver;
