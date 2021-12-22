const { ApolloServer}  = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const  conectarDB = require("./config/db");


// conectar DB
 conectarDB();

// servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () =>{
      const miContext = "Hola"

        return {
          miContext,
        }
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

