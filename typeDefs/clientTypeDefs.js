const {gql} = require("apollo-server");

const clientTypeDefs = gql`
        
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

       input ClientInput {
             name: String!
             lastname: String!
             company: String!
            email: String!
             phone: String
             dni: String!
      }

       type Query {
            #Clientes
            getClients: [Client]
            getClientsBySeller: [Client]
            getClientByID(id: ID!): Client
        }

        type Mutation {
            #Client
            createClient(input: ClientInput): Client
            updateClient(id: ID!, input: ClientInput): Client
            deleteClient(id: ID!): String
        }
 `;

module.exports = clientTypeDefs;
