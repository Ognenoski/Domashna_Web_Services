const { readData, writeData } = require("../files");

const addMovie = async (id, title, genre, year) => {
    try {
        const movie = {
            id: id,
            title: title,
            genre: genre,
            year: year
        };

        let data = await readData("./movies");
        data.push(movie);

        await writeData(data, "./movies");
    } catch (err) {
        throw err;
    }
};

const updateMovie = async (id, newMovieData) => {
    try {
        let data = await readData("./movies");

        const movie = data.find((movie) => movie.id === id);

        const newMovie = {
            ...movie,
            ...newMovieData
        };

        data = data.filter((movie) => movie.id != id);
        data.push(newMovie);

        await writeData(data, "./movies");
    } catch (err) {
        throw err;
    }
};

const removeMovie = async (id) => {
    try {
        const data = await readData("./movies");

        const out = data.filter((movie) => movie.id !== id);

        await writeData(out, "./movies");
    } catch (err) {
        throw err;
    }
};

module.exports = {
    addMovie,
    updateMovie,
    removeMovie
};