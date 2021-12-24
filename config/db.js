const mongoose = require("mongoose");
require("dotenv").config({

    path: '.env.local'
})

const conectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
        });
        console.log('mongo conectado')
    }catch (e){
        console.log("error conexion DB", e);
        process.exit();
    }
}

module.exports = conectDB;
