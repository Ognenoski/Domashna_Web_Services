const { Validator } = require("node-input-validator");

const moviePOST = {
    title: "required|string",
    genre: "required|string",
    releaseYear: "required|integer"
};

const moviePUT = {
    title: "string",
    genre: "string",
    releaseYear: "integer"
};

const validate = async(data, schema) => {

    let v = new Validator(data, schema);
    let e = await v.check();

    if(!e){
        throw{
            code: 400,
            error: v.errors
        };
    }
};

module.exports = {
    moviePOST,
    moviePUT,
    validate
};