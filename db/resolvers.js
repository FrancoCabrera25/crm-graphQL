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
        deleteProduct: async (_, {id}) => {
            try{
                let product = await Product.findById(id);
                if (!product) {
                    throw new Error("Producto no encontrado");
                }

                await Product.findOneAndDelete({_id: id});

                return "Producto eliminado correctamente";
            }catch (e){
                return e
            }
        }
    }
}


module.exports = resolvers;
