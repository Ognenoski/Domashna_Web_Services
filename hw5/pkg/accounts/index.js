const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullname: String
});

const Account = mongoose.model("accounts", accountSchema);

// Task
// try to finish these CRUD functions for database operations in MongoDB

// create,
// getAll,
// getById,
// getByEmail
// update,
// remove

const create = async (acc) => {
    const account = new Account(acc);
    return await account.save();
};

const update = async (id, newData) => {
    return await Account.updateOne({ _id: id}, newData);
};

const remove = async(id) => {
    return await Account.deleteOne({ _id: id });

};

const getAll = async() => {
    return await Account.find({});
};

const getById = async(id) => {
    return await Account.findOne({ _id: id });
};

const getByEmail = async(email) => {
    return await Account.findOne( {email: email });
};

module.exports = {
    create,
    update,
    remove,
    getAll,
    getById,
    getByEmail
}