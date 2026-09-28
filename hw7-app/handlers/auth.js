const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    AccountSignUp,
    AccountLogin,
    validate,
    AccountReset
} = require("../pkg/accounts/validate");

const accounts = require("../pkg/accounts");
const config = require("../pkg/config");

const register = async(req, res) => {
    try{
        await validate(req.body, AccountSignUp);

        const exists = await accounts.getByUsername(req.body.username);

        if(exists){
            return res.status(400).send("Account with this username already exists!");
        };

        req.body.password = bcrypt.hashSync(req.body.password);

        const acc = await accounts.create(req.body);

        return res.status(201).send(acc);

    }catch(err){
        console.log(err);
        return res.status(err.status || err.code || 500).send(err.error || "Internal Server Error");
    }
};

const login = async(req, res) => {
    try{
        await validate(req.body, AccountLogin);

        const { username, password } = req.body;

        const account = await accounts.getByUsername(username);

        if(!account){
            return res.status(400).send("Account not found!");
        };

        if(!bcrypt.compareSync(password, account.password)){
            return res.status(400).send("Wrong password!");
        };

        const payload = {
            fullname: account.fullname,
            username: account.username,
            id: account._id,
            exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
        };

        const token = jwt.sign(
            payload,
            config.getSection("development").jwt
        );

        return res.status(200).send(token);

    }catch(err){
        console.log(err);
        return res.status(err.status || err.code || 500).send(err.error || "Internal Server Error");
    }
};

const refreshToken = async(req, res) => {

    const payload = {
        ...req.auth,
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
    };

    const token = jwt.sign(
        payload,
        config.getSection("development").jwt
    );

    return res.status(200).send(token);
};

const resetPassword = async(req, res) => {

    await validate(req.body, AccountReset);

    const {
        username,
        old_password,
        new_password
    } = req.body;

    const userAccount = await accounts.getByUsername(username);

    if(!userAccount){
        return res.status(400).send("Account not found!");
    };

    if(!bcrypt.compareSync(old_password, userAccount.password)){
        return res.status(400).send("Old password is incorrect");
    };

    if(old_password === new_password){
        return res.status(400).send(
            "New password cannot be the same as the old password!"
        );
    };

    const newPasswordHashed = bcrypt.hashSync(new_password);

    const passwordChanged = await accounts.setNewPassword(
        userAccount._id.toString(),
        newPasswordHashed
    );

    return res.status(200).send(passwordChanged);
};

module.exports = {
    login,
    register,
    refreshToken,
    resetPassword
};