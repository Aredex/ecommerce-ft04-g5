const { Image } = require("../db");

const createOne = (url) => {
    return new Promise((resolve, reject) => {
        Image.create({ url })
            .then((image) => resolve(image))
            .catch((err) => reject(err));
    });
};

module.exports = {
    createOne,
};
