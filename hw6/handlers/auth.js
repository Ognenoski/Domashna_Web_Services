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

        const exists = await accounts.getByEmail(req.body.email);

        if(exists){
            return res.status(400).send(
                "Account with this email already exists!"
            );
        }

        req.body.password = bcrypt.hashSync(req.body.password);

        const acc = await accounts.create(req.body);

        return res.status(201).send(acc);

    }catch(err){
        console.log(err);
        return res.status(err.status || 500).send(
            err.error || "Internal server error"
        );
    }
};


const login = async(req, res) => {
    try{
        await validate(req.body, AccountLogin);

        const { email, password } = req.body;

        const account = await accounts.getByEmail(email);

        if(!account){
            return res.status(400).send("Account not found!");
        }

        if(!bcrypt.compareSync(password, account.password)){
            return res.status(400).send("Wrong password!");
        }

        const payload = {
            firstName: account.firstName,
            familyName: account.familyName,
            email: account.email,
            id: account._id,
            expiry: new Date().getTime() / 1000 + 7 * 24 * 60 * 60
        };

        const token = jwt.sign(
            payload,
            config.getSection("development").jwt
        );

        return res.status(200).send(token);

    }catch(err){
        console.log(err);
        return res.status(err.status || 500).send(
            err.error || "Internal server error"
        );
    }
};


const refreshToken = async(req, res) => {

    const payload = {
        ...req.auth,
        exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60
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
        email,
        old_password,
        new_password
    } = req.body;

    const userAccount = await accounts.getByEmail(email);

    if(!bcrypt.compareSync(old_password, userAccount.password)){
        return res.status(400).send(
            "Old password is incorrect"
        );
    }

    if(old_password === new_password){
        return res.status(400).send(
            "New password cannot be the same as the old password!"
        );
    }

    const newPasswordHashed =
        bcrypt.hashSync(new_password);

    const passwordChanged =
        await accounts.setNewPassword(
            userAccount._id.toString(),
            newPasswordHashed
        );

    return res.status(200).send(passwordChanged);
};


// const forgotPassword = async(req, res) => {
//     // za nareden modul so Mailgun / SendGrid
// };


module.exports = {
    login,
    register,
    refreshToken,
    resetPassword
};