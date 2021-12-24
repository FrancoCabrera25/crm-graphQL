
const userResolver = require("../resolvers/userResolvers");
const productResolver = require("../resolvers/productResolvers");
const clientResolver = require("../resolvers/clientResolver");
const _ = require("lodash");

const resolvers = _.merge({}, userResolver, productResolver, clientResolver);

module.exports = resolvers;
