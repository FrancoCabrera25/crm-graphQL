const { ApolloServer, AuthenticationError, ApolloError}  = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const  conectDB = require("./config/db");
const jwt = require("jsonwebtoken");
const { errorType, errorName} = require("./constants/errors");
const customError = require("./utils/customErrors");

require("dotenv").config({

    path: '.env.local'
})

// conectar DB
  conectDB();

const getErrorCode = (errorName, message) => {
    let error = errorType[errorName];
    if(message){
        return {
            ...error,
            message,
        }
    }
    return  error;
}

// servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
        const header = req.headers['authorization'] || '';
        const authToken = header.replace('Bearer ', '');
        try{
            if(authToken){
                console.log('authToken', authToken);
               const user = jwt.verify(authToken, process.env.CLAVE_SECRETA);
                if(user){
                    return {
                        user,
                        authToken,
                    }
                }
             //   throw new customError('', errorName.UNAUTHORIZED);
               // throw new AuthenticationError(errorName.UNAUTHORIZED);
            }
          //  else{
             //  throw new customError('', errorName.UNAUTHORIZED);
               // throw new AuthenticationError(errorName.UNAUTHORIZED);
           // }
        }
        catch (e){
           // console.log('e', e);
            throw e;
        }
    },
    formatError:(err) => {
        const error = getErrorCode( err.extensions.code, err.message);
        return ({ message: error.message, statusCode: error.statusCode});
    },
    playground: {
        settings: {
            'editor.theme': 'light',
        },
    }
});

// run server
server.listen().then( ({url}) => {
    console.log(`Servidor list en la url ${url}`)
})

