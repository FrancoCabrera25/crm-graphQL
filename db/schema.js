const {gql} = require("apollo-server");
// Schema
const userTypeDefs = require("../typeDefs/userTypeDefs");
const productTypeDefs = require("../typeDefs/productTypeDefs");
const clientTypeDefs = require("../typeDefs/clientTypeDefs");
const orderTypeDefs = require("../typeDefs/orderTypeDefs");

const typeDefs = gql`   
    ${userTypeDefs}
    ${productTypeDefs}
    ${clientTypeDefs}
    ${orderTypeDefs}
`;

module.exports = typeDefs;
