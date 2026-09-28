const mongoose = require("mongoose");
const config = require("../config");

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER } =
    config.getSection("development");

const username = encodeURIComponent(MONGO_USERNAME);
const password = encodeURIComponent(MONGO_PASSWORD);

const uri = `mongodb+srv://${username}:${password}@${MONGO_CLUSTER}/web-services?retryWrites=true&w=majority`;

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Mongo Database Connected!");
    } catch (err) {
        console.log(err);
    }
}

connect();