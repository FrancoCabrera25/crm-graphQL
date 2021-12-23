const User = require("../models/user");
const Product = require("../models/product");
const Client = require("../models/client");
const {errorType, errorName} = require("../constants/errors");
const {
    ApolloError,
} = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({

    path: '.env.local'
})

const createToken = (usuario, claveSecreta, expiresIn) => {
    const {id, name, lastname, email} = usuario;
    return jwt.sign({id, name, lastname, email}, claveSecreta, {expiresIn});
}

class CustomError extends ApolloError {
    constructor(message, code) {
        super(message, code);

        Object.defineProperty(this, message, {value: 'CustomError'});
    }
}

const isUserAutorizado = (context) => {
    if (!context.user) {
        throw new CustomError('Usuario no autorizado', errorName.UNAUTHORIZED);
    }
    return true;
}

// resolvers
const resolvers = {
    Query: {
        getUser: async (_, {token}) => {
            const userId = await jwt.verify(token, process.env.CLAVE_SECRETA);

            return userId;
        },
        getProduct: async () => {
            try {
                return await Product.find({});
            } catch (e) {
                console.log(e)
            }
        },
        getProductById: async (_, {id}) => {
            try {
                const product = await Product.findById(id);
                if (!product) {
                    throw new Error("Producto no encontrado");
                }
                return product;
            } catch (e) {
                return e;
            }
        },
        getClients: async () => {
            try {
                    return await Client.find({});
            }catch (e){

            }
        },
        getClientsBySeller: async (_,{},ctx) => {
            try {
                const seller = ctx.user.id;
                return await  Client.find({seller});
            }catch (e){

            }
        },
        getClientByID: async (_, {id}, ctx) =>{
            try{
                const client = await  Client.findById(id);

                if(!client){
                    throw new CustomError('Client no Encontrado', errorName.INTERNAL_ERROR_SERVER);
                }
                if(client.seller.toString() !== ctx.user.id){
                    throw new CustomError('No esta autorizado para ver el cliente', errorName.UNAUTHORIZED);
                }
                return  client;
            }catch (e) {
                return e;
            }
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
                return await doc.save();
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
        },
        updateProduct: async (_, {id, input}) => {
            try {
                let product = await Product.findById(id);
                if (!product) {
                    throw new Error("Producto no encontrado");
                }

                return await Product.findOneAndUpdate({_id: id}, input, {new: true});

            } catch (e) {
                return e;
            }
        },
        deleteProduct: async (_, {id}, ctx) => {
            try {
                if (isUserAutorizado(ctx)) {
                    let product = await Product.findById(id);
                    if (!product) {
                        throw new CustomError("Producto no encontrado", errorName.INTERNAL_ERROR_SERVER);
                    }

                    await Product.findOneAndDelete({_id: id});

                    return "Producto eliminado correctamente";
                }
            } catch
                (e) {
                return e;
            }

        },
        createClient: async (_, {input}, ctx) => {
            try {
                console.log('ctx.user.id', ctx);
                const {dni} = input;
                const client = await Client.findOne({dni});
                if (client) {
                    throw new CustomError(`El client con el dni ${dni} ya se encuentra registrado`, errorName.INTERNAL_ERROR_SERVER);
                }

                const newClient = new Client(input);
                newClient.seller = ctx.user.id;
                return await newClient.save();
            } catch (e) {
                return e;
            }
        },
        updateClient: async (_, {id, input}, ctx) => {
            try {
                let client = await Client.findById(id);
                if (!client) {
                    throw new CustomError("Producto no encontrado", errorName.INTERNAL_ERROR_SERVER);
                }

                if(client.seller.toString() !== ctx.user.id){
                    throw new CustomError('No esta autorizado para actualizar el cliente', errorName.UNAUTHORIZED);
                }

                return await Product.findOneAndUpdate({_id: id}, input, {new: true});

            } catch (e) {
                return e;
            }
        },
    }
}


module.exports = resolvers;
