const User = require("../models/user");


const curses = [
    {
        title: 'JavaScript Moderno Guía Definitiva Construye +10 Proyectos',
        tecnology: 'JavaScript ES6',
    },
    {
        title: 'React – La Guía Completa: Hooks Context Redux MERN +15 Apps',
        tecnology: 'React',
    },
    {
        title: 'Node.js – Bootcamp Desarrollo Web inc. MVC y REST API’s',
        tecnology: 'Node.js'
    },
    {
        title: 'ReactJS Avanzado – FullStack React GraphQL y Apollo',
        tecnology: 'React'
    }
];



// resolvers
const resolvers = {
    Query: {
        getCurses: () => curses[0],
        getCurse: (_, {input}, ctx, info) => {
            console.log('input', input.tecnology);
            console.log('ctx', ctx);
            const resultado = curses.filter( f => f.tecnology === input.tecnology);

            return resultado
        },
        getAllCurses: () => curses,
        getAllTecnology:() => curses,
    },
    Mutation: {
        createUser: async (_, {input}) => {
            const {email, password} = input;
           // revisar si el usuario esta registrado
              //  const existUser = await  User.findOne({email});
                console.log("existe usuario");
            //hasear el password

            // guardar datos
        }
    }
}


module.exports = resolvers;
