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
      
      type SellerTop {
        total: Float
        seller: User
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
            getBestSeller: [SellerTop]   
       }
       
       type Mutation {
            #User
            createUser(input: UserInput) : User
            authUser(input: AuthUserInput): Token
       }       
`;

module.exports = userTypeDefs;
