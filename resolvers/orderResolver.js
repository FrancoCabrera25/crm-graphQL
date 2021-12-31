const Order = require("../models/order");
const {getClientByID, isClientSellerSameUserContext} = require("../services/clientServices");
const {validateStockProduct, updateStockProduct} = require("../services/productService");
const {createOrder} = require('../services/orderServices');

require("dotenv").config({

    path: '.env.local'
})

// resolver
const orderResolver = {
    Query: {
        getOrder: async () => {
            try {
            } catch (e) {

            }
        },
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
