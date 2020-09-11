const { Order, Product, User } = require("../db");

// Obtiene todas las ordenes hechas
const getAll = ({ status }) => {
    let where = {};

    if (status) {
        status = status.toUpperCase();
        where.status = status;
    }

    return new Promise((resolve, reject) => {
        Order.findAll({
            where,
            include: [Product, User],
            order: [["id", "ASC"]],
        })
            .then((orders) => {
                if (orders.length === 0) {
                    return reject({
                        error: {
                            name: "ApiFindError",
                            type: "Orders error",
                            errors: [
                                {
                                    message:
                                        "there are no orders in the database",
                                    type: "not found",
                                    value: null,
                                },
                            ],
                        },
                    });
                }

                resolve(orders);
            })
            .catch((err) => reject({ error: err }));
    });
};

// Busca una orden por su ID
const getOne = (id) => {
    return new Promise((resolve, reject) => {
        Order.findOne({ where: { id }, include: [Product, User] })
            .then((order) => {
                if (!order) {
                    return reject({
                        error: {
                            name: "ApiFindError",
                            type: "Orders error",
                            errors: [
                                {
                                    message:
                                        "order does not exist in the database",
                                    type: "not found",
                                    value: null,
                                },
                            ],
                        },
                    });
                }

                resolve(order);
            })
            .catch((err) => reject({ error: err }));
    });
};

// Crea una orden
const createOne = (status, address) => {
    return new Promise((resolve, reject) => {
        Order.create({ status, address })
            .then((order) => resolve(order))
            .catch((err) => reject({ error: err }));
    });
};

// Edita una orden según el parámetro enviado
const editOne = ({ id, status, address }) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((order) => {
                if (status) order.status = status;
                if (address) order.address = address;

                return order.save();
            })
            .then((order) => resolve(order))
            .catch((err) => reject({ error: err }));
    });
};

// Elimina una orden dado su ID - Sirve como el concepto de vaciar
const deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((order) => {
                order.destroy();

                resolve({ description: "successfully remove" });
            })
            .catch((err) => reject({ error: err }));
    });
};

// Vacía una orden sin eliminarla
const emptyOrder = (id) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((order) => order.setProducts([]))
            .then((order) => resolve(order))
            .catch((err) => reject({ error: err }));
    });
};

module.exports = {
    getAll,
    createOne,
    getOne,
    editOne,
    deleteOne,
    emptyOrder,
};
