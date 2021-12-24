const Product = require("../models/product");
const {errorType, errorName} = require("../constants/errors");
const {
    ApolloError,
} = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
                return await Product.find({});
            } catch (e) {
                console.log(e)
            }
        },
        getProductById: async (_, {id}) => {
            try {
                const product = await Product.findById(id);
                if (!product) {
                    throw new Error("Producto no encontrado");
                }
                return product;
            } catch (e) {
                return e;
            }
        },
    },
    Mutation: {
        createProduct: async (_, {input}) => {
            try {
                const product = new Product(input);
                return await product.save();
            } catch (e) {
                throw new Error("Error al crear un nuevo producto");
            }
        },
        updateProduct: async (_, {id, input}) => {
            try {
                let product = await Product.findById(id);
                if (!product) {
                    throw new Error("Producto no encontrado");
                }

                return await Product.findOneAndUpdate({_id: id}, input, {new: true});

            } catch (e) {
                return e;
            }
        },
        deleteProduct: async (_, {id}, ctx) => {
            try {
            //    if (isUserAutorizado(ctx)) {
                    let product = await Product.findById(id);
                    if (!product) {
                        throw new CustomError("Producto no encontrado", errorName.INTERNAL_ERROR_SERVER);
                    }

                    await Product.findOneAndDelete({_id: id});

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
