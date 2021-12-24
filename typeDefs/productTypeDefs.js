const {gql} = require("apollo-server");

const productTypeDefs = gql`
        
        type Product {
          id: ID
             name: String
            stock: Int
            price: Float
            create_At: String
       }

       input ProductInput {
             name: String!
             stock: Int!
             price: Float!
       }

       type Query {
             # Product
             getProduct: [Product]
           getProductById(id: ID!): Product
        }

        type Mutation {
        
             #Product
             createProduct(input: ProductInput): Product
             updateProduct(id: ID!, input: ProductInput): Product
             deleteProduct(id: ID!): String
        }
 `;

module.exports = productTypeDefs;
