const mongoose = require("mongoose");
const config = require("../config");

const { MONGO_USERNAME, MONGO_PASSWORD } = config.getSection("development");

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.akrdf6m.mongodb.net/?appName=Cluster0`;
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Mongo Database Connected!");
    }catch(err){
        console.log(err);
    }
};

connect();