const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const fileUpload = require("express-fileupload");

const config = require("./pkg/config");
require("./pkg/db");

const {
    login,
    register,
    refreshToken,
    resetPassword
} = require("./handlers/auth");

const {
    getAll,
    getOne,
    create,
    update,
    remove
} = require("./handlers/movies");

const {
    upload,
    download, 
    listFiles,
    removeFile
} = require("./handlers/storage");

const api = express();

api.use(express.json());
api.use(fileUpload());

api.use(
    jwt({
        secret: config.getSection("development").jwt,
        algorithms: ["HS256"],
    }).unless({
        path: [
            "/api/v1/auth/login",
            "/api/v1/auth/register",
        ],
    })
);


// AUTH
api.post("/api/v1/auth/login", login);
api.post("/api/v1/auth/register", register);
api.post("/api/v1/auth/refreshToken", refreshToken);
api.post("/api/v1/auth/resetPassword", resetPassword);


// MOVIES
api.get("/api/v1/movie", getAll);
api.get("/api/v1/movie/:id", getOne);
api.post("/api/v1/movie", create);
api.put("/api/v1/movie/:id", update);
api.delete("/api/v1/movie/:id", remove);


// STORAGE
api.post("/api/v1/storage", upload);
api.get("/api/v1/storage/:filename", download);
api.get("/api/v1/storage", listFiles);
api.delete("/api/v1/storage/:filename", removeFile);


// JWT ERROR
api.use(function(err, req, res, next){
    if(err.name === "UnauthorizedError"){
        return res.status(401).send("Invalid token!");
    }

    next(err);
});


api.listen(config.getSection("development").port, (err) => {
    err
        ? console.error(err)
        : console.log(
            `Server started at port ${config.getSection("development").port}`
        );
});