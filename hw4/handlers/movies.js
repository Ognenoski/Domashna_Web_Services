const {
    getAll,
    getOne,
    create,
    update,
    remove
} = require("../pkg/movies");

const getAllMovies = async (req, res) => {
    try {
        const movies = await getAll();
        return res.status(200).send(movies);
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

const getOneMovie = async (req, res) => {
    try {
        const movie = await getOne(req.params.id);
        return res.status(200).send(movie);
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

const createMovie = async (req, res) => {
    try {
        const movie = await create(req.body);
        return res.status(201).send(movie);
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

const updateMovie = async (req, res) => {
    try {
        const movie = await update(req.params.id, req.body);
        return res.status(200).send(movie);
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

const deleteMovie = async (req, res) => {
    try {
        await remove(req.params.id);
        return res.status(200).send("Movie deleted");
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

module.exports = {
    getAllMovies,
    getOneMovie,
    createMovie,
    updateMovie,
    deleteMovie
};