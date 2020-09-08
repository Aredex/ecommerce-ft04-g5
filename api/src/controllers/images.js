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

const deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((image) => image.destroy())
            .then(() => resolve({ res: "imagen eliminada" }))
            .then((err) => reject(err));
    });
};

const deleteMultiple = (arrayId) => {
    return new Promise((resolve, reject) => {
        arrayId.forEach((id) => {
            deleteOne(id)
                .then((image) => {
                    resolve(image);
                })
                .catch((err) => reject(err));
        });
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

const setMultipleProductAsociations = async (idProduct, arrayUrls) => {
    return new Promise((resolve, reject) => {
        let images = arrayUrls.map((url) => {
            return createOne(url)
                .then((image) => image)
                .catch((err) => reject(err));
        });

        Promise.all(images).then((imgs) => {
            imgs.forEach((image) => {
                if (image) {
                    setProductAsociation(image.id, idProduct)
                        .then((createdAsociation) => resolve(createdAsociation))
                        .catch((err) => reject(err));
                }
            });
        });
    });
};

module.exports = {
    createOne,
    getAll,
    getOne,
    setProductAsociation,
    setMultipleProductAsociations,
    deleteOne,
    deleteMultiple,
};
