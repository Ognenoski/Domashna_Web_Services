const { Validator } = require("node-input-validator");

const AccountSignUp = {
    email: "required|email",
    password: "required|string",
    firstName: "required|string",
    familyName: "required|string",
    birthday: "required",
    address: "required|string"
};

const AccountLogin = {
    email: "required|email",
    password: "required|string"
};

const AccountReset = {
    email: "required|email",
    old_password: "required|string",
    new_password: "required|string"
};

const validate = async(data, schema) => {
    let v = new Validator(data, schema);
    let e = v.check();

    if(!e){
        throw {
            status: 400,
            error: v.errors,
        };
    }
};

module.exports = {
    AccountSignUp,
    AccountLogin,
    AccountReset,
    validate
};