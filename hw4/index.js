const express = require("express");
require("./pkg/db");

const {
    getAllMovies,
    getOneMovie,
    createMovie,
    updateMovie,
    deleteMovie
} = require("./handlers/movies");

const api = express();

api.use(express.json());

// GET 
api.get("/movies", getAllMovies);

// GET 
api.get("/movies/:id", getOneMovie);

// POST 
api.post("/movies", createMovie);

// PATCH 
api.patch("/movies/:id", updateMovie);

// DELETE 
api.delete("/movies/:id", deleteMovie);

api.listen(10000, (err) => {
    if (err) {
        console.log("Error starting server");
    } else {
        console.log("Server started on port 10000");
    }
});