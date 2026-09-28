const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: String,
    genre: String,
    releaseYear: Number,
    account_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "accounts",
        required: true
    }
});

const Movie = mongoose.model("movies", movieSchema, "movies");

const getAll = async(account_id) => {
    return await Movie.find({ account_id });
};

const getOne = async(account_id, id) => {
    return await Movie.findOne({
        account_id: account_id,
        _id: id
    });
};

const create = async(data) => {
    const movie = new Movie(data);
    return await movie.save();
};

const update = async(account_id, id, data) => {
    return await Movie.updateOne(
        {
            account_id: account_id,
            _id: id
        },
        data
    );
};

const remove = async(account_id, id) => {
    return await Movie.deleteOne({
        account_id: account_id,
        _id: id
    });
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};