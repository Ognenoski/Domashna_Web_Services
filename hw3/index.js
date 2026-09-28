const express = require("express");

const {
    createMovie,
    editMovie,
    deleteMovie
} = require("./handlers/movies");

const api = express();

api.use(express.json());

api.post("/movies", createMovie);
api.put("/movies/:id", editMovie);
api.delete("/movies/:id", deleteMovie);

api.listen(10000, (err) => {
    if (err) {
        console.log("Error starting server");
    } else {
        console.log("Server started on port 10000");
    }
});