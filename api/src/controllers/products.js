const { Product, Category, Op, Image } = require("../db");
const {
    createOne: createImage,
    setProductAsociation,
    setMultipleProductAsociations,
} = require("../controllers/images");

// ==============================================
//      ESTOS METODOS RETORNAN PROMESAS
// ==============================================

const getAll = () => {
    return new Promise((resolve, reject) => {
        Product.findAll({ include: [Image] })
            .then((products) => resolve(products))
            .catch((err) => reject({ error: err }));
    });
};

const verifyImagesUrl = (imageUrl, product, resolve, reject) => {
    if (!Array.isArray(imageUrl)) {
        createImage(imageUrl)
            .then((image) => image.id)
            .then((id) => setProductAsociation(id, product.id))
            .catch((err) => reject(err));
    } else {
        setMultipleProductAsociations(product.id, imageUrl)
            .then((resp) => resolve(resp))
            .catch((err) => reject({ error: err }));
    }
};

const createOne = (name, description, price, stock, imageUrl) => {
    return new Promise((resolve, reject) => {
        if (!name || !description || !price) {
            return reject({ error: "Uno o mas parametros faltantes" });
        }

        Product.create({ name, description, price })
            .then((product) => {
                if (stock) {
                    product.stock = stock;
                    product.save();
                }

                if (imageUrl) {
                    verifyImagesUrl(imageUrl, product, resolve, reject);
                }

                resolve(product);
            })
            .catch((err) => reject({ error: err }));
    });
};

const getOne = (id) => {
    return new Promise((resolve, reject) => {
        Product.findOne({ where: { id }, include: [Category, Image] })
            .then((product) => {
                if (!product) {
                    return reject({ error: "No existe en la BD" });
                }

                resolve(product);
            })
            .catch((err) => reject({ error: err }));
    });
};

const editOne = (id, name, description, price, stock, imageUrl) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((product) => {
                product.name = name;
                product.description = description;
                product.price = price;

                if (stock) {
                    product.stock = stock;
                }

                if (imageUrl) {
                    verifyImagesUrl(imageUrl, product, resolve, reject);
                }

                return product.save();
            })
            .then((product) => resolve(product))
            .catch((err) => reject({ error: err }));
    });
};

const deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((product) => resolve(product.destroy()))
            .catch((err) => reject({ error: err }));
    });
};

const getByQuery = (query) => {
    return new Promise((resolve, reject) => {
        if (!query) {
            return reject({ error: "Se necesita parámetro de búsqueda" });
        }

        Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } },
                ],
            },
            include: [Image],
        })
            .then((products) => resolve(products))
            .catch(() =>
                reject({
                    error: "No hay productos que conicidan con la búsqueda",
                })
            );
    });
};

module.exports = {
    getAll,
    createOne,
    getOne,
    editOne,
    getByQuery,
    deleteOne,
};
