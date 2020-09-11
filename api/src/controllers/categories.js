const { Category, Product, Image } = require("../db");

// ==============================================
//      ESTOS METODOS RETORNAN PROMESAS
// ==============================================

// Este método se encargará de obtener todas las categorías
const getAll = () => {
    return new Promise((resolve, reject) => {
        Category.findAll({})
            .then((categories) => {
                if (categories.length === 0) {
                    return reject({
                        error: {
                            name: "ApiFindError",
                            type: "Categories Error",
                            errors: [
                                {
                                    message:
                                        "there are no categories in the database",
                                    type: "not found",
                                    value: null,
                                },
                            ],
                        },
                    });
                }

                resolve(categories);
            })
            .catch((err) => reject({ error: err.message }));
    });
};

// Obtiene una única categoría buscada por su id
const getOne = (id) => {
    return new Promise((resolve, reject) => {
        Category.findOne({
            where: { id },
            include: [{ model: Product, include: Image }],
        })
            .then((category) => {
                if (!category) {
                    return reject({
                        error: {
                            name: "ApiFindError",
                            type: "Categories Error",
                            errors: [
                                {
                                    message:
                                        "category does not exist in the database",
                                    type: "not found",
                                    value: null,
                                },
                            ],
                        },
                    });
                }

                resolve(category);
            })
            .catch((err) => {
                reject({ error: err.message });
            });
    });
};

// Crea una categoría recibiendo como parámetro el nombre y la descipción
const createOne = (name, description) => {
    return new Promise((resolve, reject) => {
        Category.create({ name, description })
            .then((category) => resolve(category))
            .catch((err) => reject({ error: err.message }));
    });
};

// Dado el Id de una categoría, lo encuentra y lo modifica según el nombre y descripción
const editOne = (id, name, description) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((category) => {
                category.name = name;
                category.description = description;

                return category.save();
            })
            .then((category) => resolve(category))
            .catch((err) => reject(err));
    });
};

// Elimina una categoría de la base de datos, dado su Id
const deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((category) => {
                category.destroy();

                resolve({ description: "successfully removed object" });
            })
            .catch((err) => reject(err));
    });
};
module.exports = {
    getAll,
    createOne,
    getOne,
    editOne,
    deleteOne,
};
