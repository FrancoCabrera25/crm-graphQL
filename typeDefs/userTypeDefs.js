const {gql} = require("apollo-server");

const userTypeDefs = gql`         
     
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
        
      input UserInput {
            name: String!
            lastname: String!
            email: String!
            password: String!    
      }
      
      input AuthUserInput {
            email: String!
            password: String!
      }      
                   
      type Query {
            # User
            getUser(token: String!): User 
       }
       
       type Mutation {
            #User
            createUser(input: UserInput) : User
            authUser(input: AuthUserInput): Token
       }       
`;

module.exports = userTypeDefs;
