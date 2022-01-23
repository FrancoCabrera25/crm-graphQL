const Product = require("../models/product");
const {errorType, errorName} = require("../constants/errors");
const {
    ApolloError,
} = require("apollo-server");
const {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByName
} = require("../services/productService");
require("dotenv").config({

    path: '.env.local'
})

class CustomError extends ApolloError {
    constructor(message, code) {
        super(message, code);

        Object.defineProperty(this, message, {value: 'CustomError'});
    }
}

// resolver
const productResolver = {
    Query: {
        getProduct: async () => {
            try {
                return await getAllProduct();
            } catch (e) {
                return e;
            }
        },
        getProductById: async (_, {id}) => {
            try {
                return await getProductById(id);
            } catch (e) {
                return e;
            }
        },
        getProductByName: async (_, {name}) => {
            return await getProductByName(name);
       },
    },
    Mutation: {
        createProduct: async (_, {input}) => {
            try {
                return await createProduct(input);
            } catch (e) {
                throw new Error("Error al crear un nuevo producto");
            }
        },
        updateProduct: async (_, {id, input}) => {
            try {
                let product = await getProductById(id);
                if (product) {
                    return await updateProduct(id, input);
                }
            } catch (e) {
                return e;
            }
        },
        deleteProduct: async (_, {id}, ctx) => {
            try {
                //    if (isUserAutorizado(ctx)) {
                let product = await getProductById(id);
                if (product) {
                    await deleteProduct(id);
                }
                return "Producto eliminado correctamente";
                // }
            } catch
                (e) {
                return e;
            }

        },
    }
}

module.exports = productResolver;
