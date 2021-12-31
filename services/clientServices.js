const Client = require("../models/client");
const {errorName} = require("../constants/errors");
const customError = require("../utils/customErrors");

const getClientByID = async (id) => {
    try {
        const client = await Client.findById(id);
        if(!client) {
            throw new customError( '', errorName.NOT_FOUND_CLIENT_BY_ID);
        }
        return client;

    }catch (e){
        throw e;
    }
}

const isClientSellerSameUserContext = (client, userId) => {
        try {
            if(client.seller.toString() === userId){
                return true;
            }
            throw new customError('', errorName.NOT_PERMISSION_CREATE_ORDER);
        }catch (e) {
            throw e;
        }
}

const getClientAll = async () => {
    try{
        return await Client.find({});
    }catch (e){
        throw e;
    }
}

const getClientBySeller = async (seller) => {
    try{
        return await Client.find({seller});
    }catch (e){
        throw e;
    }
}

const getClientByDni = async (dni) => {
    try{
        return await Client.findOne({dni});
    }catch (e){
        throw e;
    }
}

const createClient = async (client, seller) => {
    try{
        const newClient = new Client(client);
        client.seller = seller;
        return await newClient.save();
    }catch (e){
        throw e;
    }
}

const updateClient = async (id, client ) => {
    try{
        return await Client.findOneAndUpdate({_id: id}, client, {new: true});
    }catch (e){
        throw e;
    }
}

const deleteClient = async (id) => {
    try{
        await Client.findOneAndDelete({_id: id});
    }catch (e){
        throw e;
    }
}

module.exports = {
    getClientByID,
    isClientSellerSameUserContext,
    getClientAll,
    getClientBySeller,
    getClientByDni,
    createClient,
    updateClient,
    deleteClient
}
