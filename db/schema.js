const {gql} = require("apollo-server");
// Schema

const typeDefs = gql`     
    
      type User {
         id: ID
         name: String
         lastname: String
         email: String
         create_At: String
      }
      
      type Token {
            token: String
      }
      
       type Product {
            id: ID
            name: String
            stock: Int
            price: Float     
            create_At: String   
      }
      
      
      input UsuarioInput {
            name: String!
            lastname: String!
            email: String!
            password: String!    
      }
      
      input AuthUserInput {
            email: String!
            password: String!
      }      
      
      input ProductInput {
            name: String!
            stock: Int!
            price: Float!            
      }
       
       type Query {
            # User
            getUser(token: String!): User
            
            # Product
            getProduct: [Product]
            getProductById(id: ID!): Product
       }
       
       type Mutation {
            #User
            createUser(input: UsuarioInput) : User
            authUser(input: AuthUserInput): Token
            
            #Product
            createProduct(input: ProductInput): Product
            updateProduct(id: ID!, input: ProductInput): Product
            deleteProduct(id: ID!): String
       }
       
`;

module.exports = typeDefs;
