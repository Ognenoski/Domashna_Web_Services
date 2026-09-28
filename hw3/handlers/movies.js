const {
    addMovie,
    updateMovie,
    removeMovie
} = require("../pkg/movies");

const createMovie = async (req, res) => {
    try {
        await addMovie(
            req.body.id,
            req.body.title,
            req.body.genre,
            req.body.year
        );

        return res.status(201).send("Movie created");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const editMovie = async (req, res) => {
    try {
        await updateMovie(
            Number(req.params.id),
            req.body
        );

        return res.status(200).send("Movie updated");
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

const deleteMovie = async (req, res) => {
    try {
        await removeMovie(Number(req.params.id));

        return res.status(200).send("Movie deleted");
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
};

module.exports = {
    createMovie,
    editMovie,
    deleteMovie
};