const Client = require("../models/client");
const {errorType, errorName} = require("../constants/errors");
const customError = require("../utils/customErrors");
const { getClientAll, getClientBySeller, getClientByID, getClientByDni, createClient, updateClient, deleteClient } = require("../services/clientServices");
const {
    ApolloError,
} = require("apollo-server");
require("dotenv").config({

    path: '.env.local'
})

const Client_DELETE = 'Cliente eliminado correctamente';

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
                return await getClientAll();
            } catch (e) {
                return customError('', errorName.INTERNAL_ERROR_GET_ALL_CLIENT);
            }
        },
        getClientsBySeller: async (_, {}, ctx) => {
            try {
                const seller = ctx.user.id;
                return await getClientBySeller(seller);
            } catch (e) {
                return customError('', errorName.INTERNAL_ERROR_GET_ALL_CLIENT_BY_SELLER);
            }
        },
        getClientByID: async (_, {id}, ctx) => {
            try {
                const client = await getClientByID(id);

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
                const {dni} = input;
                const client = await getClientByDni(dni);
                if (client) {
                    throw new CustomError(`El client con el dni ${dni} ya se encuentra registrado`, errorName.INTERNAL_ERROR_SERVER);
                }
                return await createClient(input, ctx.user.id);
            } catch (e) {
                return e;
            }
        },
        updateClient: async (_, {id, input}, ctx) => {
            try {
                let client = await getClientByID(id);
                if (!client) {
                    throw new CustomError('', errorName.NOT_FOUND_CLIENT_BY_ID);
                }

                if (client.seller.toString() !== ctx.user.id) {
                    throw new CustomError('No esta autorizado para actualizar el cliente', errorName.UNAUTHORIZED);
                }

                return await updateClient(id, input);

            } catch (e) {
                return e;
            }
        },
        deleteClient: async (_, {id}, ctx) => {
            try {
                let client = await Client.findById(id);
                if(client){
                    await deleteClient(id);
                    return Client_DELETE;
                }
            } catch
                (e) {
                return e;
            }
        }
    }
}

module.exports = clientResolver;
