const mongoose = require("mongoose");

async function connect(mongoURI = "mongodb+srv://devuser:devuser@cluster0.rpcu2.mongodb.net/abctravel?retryWrites=true&w=majority"){
    try{
        await mongoose.connect(
            mongoURI,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            } 
        );

        return mongoose.connection;

    } catch(err){
        console.log("Error connecting to mongodb cluster");
        console.log(err);
    }
}

module.exports = { connect };