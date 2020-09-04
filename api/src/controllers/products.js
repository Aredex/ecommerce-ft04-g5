const { Product, Category, Op, Image } = require("../db");
const {
    createOne: createImage,
    setProductAsociation,
    setMultipleProductAsociations,
} = require("../controllers/images");

// ==============================================
//      ESTOS METODOS RETORNAN PROMESAS
// ==============================================

const getPagination = (page, pageSize) => {
    let offset = 0;
    let limit = 100;

    if (page && pageSize) {
        offset = (page - 1) * pageSize;
        limit = pageSize;
    }

    return { limit, offset };
};

const getAll = (page, pageSize) => {
    return new Promise((resolve, reject) => {
        const pagination = getPagination(page, pageSize);

        Product.findAll({
            include: [Image, Category],
            order: [["id", "ASC"]],
            limit: pagination.limit,
            offset: pagination.offset,
        })
            .then((products) => {
                if (products.length === 0)
                    return reject({
                        error: {
                            name: "ApiFindError",
                            errors: [
                                {
                                    message:
                                        "there are no products in the database",
                                    type: "not found",
                                    value: null,
                                },
                            ],
                        },
                    });

                resolve(products);
            })
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
        // Validación viene por parte de Sequelize

        name = name.toLowerCase();

        Product.create({ name, description, price })
            .then((product) => {
                if (stock) {
                    product.stock = stock;
                    product.save();
                }

                if (imageUrl) {
                    // Si la imagen no se agrega al producto es porque la imágen ya está asignada a otro producto
                    // ! BUSCAR LA MANERA DE DARLE EL MENSAJE AL CLIENT EN LA RESPUESTA
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
                    return reject({
                        error: {
                            name: "ApiFindError",
                            errors: [
                                {
                                    message:
                                        "product does not exist in the database",
                                    type: "not found",
                                    value: null,
                                },
                            ],
                        },
                    });
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
                // De esta manera solo se actualizará el campo que sea enviando
                // TODO Buscar una mejor manera de escribirlo!

                if (name) product.name = name.toLowerCase();
                if (description) product.description = description;
                if (price) product.price = price;
                if (stock) product.stock = stock;

                if (imageUrl) {
                    // Si la imagen no se agrega al producto es porque la imágen ya está asignada a otro producto
                    // ! BUSCAR LA MANERA DE DARLE EL MENSAJE AL CLIENT EN LA RESPUESTA
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
            .then((product) => {
                product.destroy();
                return resolve({
                    succes: {
                        message: "Successfully removed",
                    },
                });
            })
            .catch((err) => reject({ error: err }));
    });
};

const getByQuery = (query, page, pageSize) => {
    return new Promise((resolve, reject) => {
        if (!query) {
            return reject({ error: "Se necesita parámetro de búsqueda" });
        }

        query = query.toLowerCase();
        const pagination = getPagination(page, pageSize);

        Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.substring]: `${query}` } },
                    { description: { [Op.substring]: `${query}` } },
                ],
            },
            limit: pagination.limit,
            offset: pagination.offset,
            include: [Image, Category],
            order: [["id", "ASC"]],
        })
            .then((products) => {
                if (products.length === 0)
                    return reject({
                        error: {
                            name: "ApiFindError",
                            errors: [
                                {
                                    message:
                                        "there are no products that match your search",
                                    type: "not found",
                                    value: null,
                                },
                            ],
                        },
                    });

                resolve(products);
            })
            .catch(() =>
                reject({
                    error: "No hay productos que conicidan con la búsqueda",
                })
            );
    });
};

const setViews = (id) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((product) => {
                product.views++;
                return product.save();
            })
            .then((product) => resolve(product))
            .catch((err) => reject({ error: err }));
    });
};

module.exports = {
    getAll,
    createOne,
    getOne,
    editOne,
    getByQuery,
    deleteOne,
    setViews,
};
