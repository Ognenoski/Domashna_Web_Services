const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    familyName: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const Account = mongoose.model("accounts", accountSchema);

// BUSINESS LOGIC

const create = async (data) => {
    const account = new Account(data);
    return await account.save();
};

const getByEmail = async (email) => {
    return await Account.findOne({ email });
};

const getById = async (id) => {
    return await Account.findById(id);
};
const setNewPassword = async (id, password) => {
    return await Account.updateOne(
        { _id: id },
        { password: password }
    );
};
module.exports = {
    create,
    getByEmail,
    getById,
    setNewPassword
};