const config = require("../../config.json");

const getSection = (section) => {
    return config[section];
};

module.exports = {
    getSection
};