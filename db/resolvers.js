const User = require("../models/user");
const Product = require("../models/product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({

    path: '.env.local'
})

const createToken = (usuario, claveSecreta, expiresIn) => {
    const {id, name, lastname, email} = usuario;
    return jwt.sign({id, name, lastname, email}, claveSecreta, {expiresIn});
}


// resolvers
const resolvers = {
    Query: {
        getUser: async (_, {token}) => {
            const userId = await jwt.verify(token, process.env.CLAVE_SECRETA);

            return userId;
        }
    },
    Mutation: {
        createUser: async (_, {input}) => {
            const {email, password} = input;
            // revisar si el usuario esta registrado
            const existUser = await User.findOne({email});
            if (existUser) {
                throw new Error("El usuario ya se encuentra registrado");
            }
            //hasear el password
            const salt = await bcrypt.genSalt(10);
            input.password = await bcrypt.hash(password, salt);
            try {
                // guardar datos
                const doc = new User(input);
                doc.save();
                return doc;
            } catch (e) {
                console.log(e);
            }
        },
        authUser: async (_, {input}) => {
            const {email, password} = input;
            //si el usuario existe
            const existUser = await User.findOne({email});
            if (!existUser) {
                throw new Error("Usuario y/o password incorrecto");
            }

            //revisar password
            const passwordValid = await bcrypt.compare(password, existUser.password);
            if (!passwordValid) {
                throw new Error("Usuario y/o password incorrecto");
            }

            return {
                token: createToken(existUser, process.env.CLAVE_SECRETA, '24h'),
            }
        },

        createProduct: async (_, {input}) => {
            try {
                const product = new Product(input);
                return await product.save();
            } catch (e) {
                throw new Error("Error al crear un nuevo producto");
            }
        }
    }
}


module.exports = resolvers;
