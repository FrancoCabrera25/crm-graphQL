const {gql} = require("apollo-server");
// Schema
const userTypeDefs = require("../typeDefs/userTypeDefs");
const productTypeDefs = require("../typeDefs/productTypeDefs");
const clientTypeDefs = require("../typeDefs/clientTypeDefs");

const typeDefs = gql`   
    ${userTypeDefs}
    ${productTypeDefs}
    ${clientTypeDefs}
`;

module.exports = typeDefs;
