const { Order, Product } = require("../db");
const { getOne: getProduct } = require("./products");

// Obtiene todas las ordenes hechas
const getAll = ({ status }) => {
    let where = {};

    if (status) {
        status = status.toUpperCase();
        where.status = status;
    }

    return new Promise((resolve, reject) => {
        Order.findAll({ where, include: [Product], order: [["id", "ASC"]] })
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

const confirmedOrder = async ({ id, address }) => {
    if (!address) {
        return new Promise((resolve, reject) => {
            reject({
                error: { message: "Es necesario tener la dirección de envío" },
            });
        });
    }

    const Order = await getOne(id);
    let poderComprar = true;

    Order.products.map((product) => {
        if (product.order_product.amount >= product.stock) {
            poderComprar = false;
        }
    });

    return new Promise((resolve, reject) => {
        if (!poderComprar) {
            return reject({
                error: {
                    message:
                        "No se puede hacer la compra, uno de los productos no tiene el stock suficiente",
                },
            });
        }

        const products = Order.products.map((product) => {
            return getProduct(product.id)
                .then((p) => {
                    p.stock = p.stock - product.order_product.amount;
                    return p.save();
                })
                .catch((err) => err);
        });

        Promise.all(products)
            .then(() => {
                Order.status = "CONFIRMED";
                Order.address = address;
                return Order.save();
            })
            .then((order) => resolve(order))
            .catch((err) => reject({ error: err }));
    });
};

// Busca una orden por su ID
const getOne = (id) => {
    return new Promise((resolve, reject) => {
        Order.findOne({ where: { id }, include: [Product] })
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
    confirmedOrder,
};
