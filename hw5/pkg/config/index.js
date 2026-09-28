const fs = require("fs");

const CONFIG_SOURCE = `${__dirname}/../../config.json`;


// Ovoj blok e samo da se osigurame deka ke imame svezi i tocni podatoci pri sekoe koristenje
let config = null;

if (config === null){
    const file = fs.readFileSync(CONFIG_SOURCE, "utf-8");
    config = JSON.parse(file); // Za ova da ni se pretvori vo JavaScript objekt
};

// config.development
// config.integration
// config.production

const getSection = (section) => {
    //if(!config["test"]){
    // true or false
    //}
    if(!config[section]){
        throw `Configuration section ${section} does not exist!`;
    };

    return config[section];
};

module.exports = {
    getSection
}
