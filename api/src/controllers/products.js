const { Product, Category, Op, Image } = require("../db");
const {
    createOne: createImage,
    setProductAsociation,
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
                    console.log(imageUrl);
                    createImage(imageUrl)
                        .then((image) => {
                            return image.id;
                        })
                        .then((id) => setProductAsociation(id, product.id))
                        // .then((image) => console.log(image))
                        .catch((err) => reject(err));
                }

                resolve(product);
            })
            .catch((err) => reject({ error: err.message }));
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
            .catch((err) => reject({ error: err.message }));
    });
};

const editOne = (id, name, description, price, stock) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((product) => {
                product.name = name;
                product.description = description;
                product.price = price;

                if (stock) {
                    product.stock = stock;
                }

                return product.save();
            })
            .then((product) => resolve(product))
            .catch((err) => reject(err));
    });
};

const deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((product) => resolve(product.destroy()))
            .catch((err) => reject(err));
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
