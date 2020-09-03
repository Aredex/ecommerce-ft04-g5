const { Image } = require("../db");

const createOne = (url) => {
    return new Promise((resolve, reject) => {
        Image.create({ url })
            .then((image) => resolve(image))
            .catch((err) => reject(err));
    });
};

const getAll = () => {
    return new Promise((resolve, reject) => {
        Image.findAll()
            .then((images) => resolve(images))
            .catch((err) => reject(err));
    });
};

const getOne = (id) => {
    return new Promise((resolve, reject) => {
        Image.findOne({ where: { id } })
            .then((image) => resolve(image))
            .catch((err) => reject(err));
    });
};

const setProductAsociation = (idImage, idProduct) => {
    return new Promise((resolve, reject) => {
        getOne(idImage)
            .then((image) => {
                return image.setProduct(idProduct);
            })
            .then((image) => resolve(image))
            .catch((err) => reject(err));
    });
};

module.exports = {
    createOne,
    getAll,
    getOne,
    setProductAsociation,
};
