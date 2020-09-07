const { Order, Product } = require("../db");

// Obtiene todas las ordenes hechas
const getAll = () => {
    return new Promise((resolve, reject) => {
        Order.findAll({ include: [Product] })
            .then((order) => resolve(order))
            .catch((err) => reject({ error: err }));
    });
};

// Busca una orden por su ID
const getOne = (id) => {
    return new Promise((resolve, reject) => {
        Order.findOne({ where: { id }, include: [Product] })
            .then((order) => resolve(order))
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
module.exports = {
    getAll,
    createOne,
    getOne,
    editOne,
    deleteOne,
};
