const Client = require("../models/client");
const {errorType, errorName} = require("../constants/errors");
const {
    ApolloError,
} = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Product = require("../models/product");
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
const clientResolver = {
    Query: {
        getClients: async () => {
            try {
                return await Client.find({});
            } catch (e) {

            }
        },
        getClientsBySeller: async (_, {}, ctx) => {
            try {
                const seller = ctx.user.id;
                return await Client.find({seller});
            } catch (e) {

            }
        },
        getClientByID: async (_, {id}, ctx) => {
            try {
                const client = await Client.findById(id);

                if (!client) {
                    throw new CustomError('Client no Encontrado', errorName.INTERNAL_ERROR_SERVER);
                }
                if (client.seller.toString() !== ctx.user.id) {
                    throw new CustomError('No esta autorizado para ver el cliente', errorName.UNAUTHORIZED);
                }
                return client;
            } catch (e) {
                return e;
            }
        }
    },
    Mutation: {
        createClient: async (_, {input}, ctx) => {
            try {
                console.log('ctx.user.id', ctx);
                const {dni} = input;
                const client = await Client.findOne({dni});
                if (client) {
                    throw new CustomError(`El client con el dni ${dni} ya se encuentra registrado`, errorName.INTERNAL_ERROR_SERVER);
                }

                const newClient = new Client(input);
                newClient.seller = ctx.user.id;
                return await newClient.save();
            } catch (e) {
                return e;
            }
        },
        updateClient: async (_, {id, input}, ctx) => {
            try {
                let client = await Client.findById(id);
                if (!client) {
                    throw new CustomError("Cliente no encontrado", errorName.INTERNAL_ERROR_SERVER);
                }

                if (client.seller.toString() !== ctx.user.id) {
                    throw new CustomError('No esta autorizado para actualizar el cliente', errorName.UNAUTHORIZED);
                }

                return await Client.findOneAndUpdate({_id: id}, input, {new: true});

            } catch (e) {
                return e;
            }
        },
        deleteClient: async (_, {id}, ctx) => {
            try {
                //    if (isUserAutorizado(ctx)) {
                let client = await Client.findById(id);
                if (!client) {
                    throw new CustomError("Cliente no encontrado", errorName.INTERNAL_ERROR_SERVER);
                }

                await Client.findOneAndDelete({_id: id});

                return "Cliente eliminado correctamente";
                // }
            } catch
                (e) {
                return e;
            }
        }
    }
}

module.exports = clientResolver;
