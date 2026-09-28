const fs = require("fs");

// READ DATA
const readData = (source) => {
    return new Promise((success, fail) => {
        fs.readFile(`${source}.json`, "utf-8", (err, data) => {
            if (err) return fail(err);

            const out = JSON.parse(data);
            return success(out);
        });
    });
};

// WRITE DATA
const writeData = (data, destination) => {
    return new Promise((success, fail) => {
        const out = JSON.stringify(data);

        fs.writeFile(`${destination}.json`, out, (err) => {
            if (err) return fail(err);

            return success();
        });
    });
};


// MOVIE RESOURCE
// movie {
//     id
//     title
//     genre
//     year
// }


// CREATE
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
console.log("Movie added successfully!");
    } catch (err) {
        throw err;
    }
};


// UPDATE
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
console.log("Movie updated successfully!");
    } catch (err) {
        throw err;
    }
};


// DELETE
const removeMovie = async (id) => {
    try {
        const data = await readData("./movies");

        const out = data.filter((movie) => movie.id !== id);

        await writeData(out, "./movies");
console.log("Movie removed successfully!");
    } catch (err) {
        throw err;
    }
};


// TEST
const execute = async () => {
    await addMovie(4, "The Godfather", "Crime", 1972);

    await updateMovie(4, {
        genre: "Crime/Drama"
    });

    await removeMovie(2);
};

execute();
