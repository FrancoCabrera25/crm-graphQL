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
      
      type Client {
            id: ID
            name: String
            lastname: String
            company: String
            email: String
            phone: String
            dni: String
            seller: ID 
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
      
      input ClientInput {
            name: String!
            lastname: String!
            company: String!
            email: String!
            phone: String 
            dni: String!           
      }
       
       type Query {
            # User
            getUser(token: String!): User
            
            # Product
            getProduct: [Product]
            getProductById(id: ID!): Product
            
            #Clientes
            getClients: [Client]
            getClientsBySeller: [Client]
            getClientByID(id: ID!): Client
       }
       
       type Mutation {
            #User
            createUser(input: UsuarioInput) : User
            authUser(input: AuthUserInput): Token
            
            #Product
            createProduct(input: ProductInput): Product
            updateProduct(id: ID!, input: ProductInput): Product
            deleteProduct(id: ID!): String
            
            #Client
            createClient(input: ClientInput): Client
            updateClient(id: ID!, input: ClientInput): Client
       }
       
`;

module.exports = typeDefs;
