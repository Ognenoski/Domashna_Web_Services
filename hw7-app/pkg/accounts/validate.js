const { Validator } = require("node-input-validator");

const AccountSignUp = {
    username: "required|string",
    password: "required|string",
    fullname: "required|string"
};

const AccountLogin = {
    username: "required|string",
    password: "required|string"
};

const AccountReset = {
    username: "required|string",
    old_password: "required|string",
    new_password: "required|string"
};

const validate = async(data, schema) => {

    let v = new Validator(data, schema);
    let e = v.check();

    if(!e){
        throw{
            code: 400,
            error: v.errors,
        }
    }
};

module.exports = {
    AccountSignUp,
    AccountLogin,
    AccountReset,
    validate
};