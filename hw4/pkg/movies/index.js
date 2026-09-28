const Movie = require("./mongo");

const getAll = async () => {
    return await Movie.find({});
};

const getOne = async (id) => {
    return await Movie.findById(id);
};

const create = async (movieData) => {
    const movie = new Movie(movieData);
    return await movie.save();
};

const update = async (id, movieData) => {
    return await Movie.findByIdAndUpdate(
        id,
        movieData,
        { new: true }
    );
};

const remove = async (id) => {
    return await Movie.findByIdAndDelete(id);
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};