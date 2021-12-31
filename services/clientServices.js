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


module.exports = {
    getClientByID,
    isClientSellerSameUserContext,
}
