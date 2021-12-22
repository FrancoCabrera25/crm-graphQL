const { gql } = require("apollo-server");
// Schema

const typeDefs = gql`     
    
      type User {
         id: ID
         name: String
         lastname: String
         email: String
         create_At: String
      }
      
      input UsuarioInput {
            name: String!
            lastname: String!
            email: String!
            password: String!    
      }      
 
       type Curse {
           title: String
       }
       
       input CurseInput {
            tecnology: String 
       }
       
       type Tecnology {
           tecnology: String 
       }       
       type Query {
                getCurses : Curse
                getCurse(input: CurseInput ) : [Curse]
                getAllCurses : [Curse]
                getAllTecnology : [Tecnology]
       }
       
       type Mutation {
            createUser(input: UsuarioInput) : User
       }
       
`;

module.exports = typeDefs;
