const {
    getOne: getProduct
} = require("./products");
const {
    Order,
    Product,
    User,
    Op,
    Image
} = require("../db");

// Obtiene todas las ordenes hechas y puede filtrar según su status

const getAllFiler = ({
    search
}) => {
    return new Promise((resolve, reject) => {
        if (!isNaN(search)) {
            search = Number(search);

            getOne(search)
                .then((order) => resolve(order))
                .catch((err) => reject(err));
        } else {
            getAll({
                search
            })
                .then((order) => resolve(order))
                .catch((err) => reject(err));
        }
    });
};

const getAll = ({
    status,
    search
}) => {
    let where = {};
    let obj = {};
    let include = [Product, User];

    if (status) {
        status = status.toUpperCase();
        where.status = status;
    }

    if (search) {
        obj = {
            model: User,
            where: {
                name: {
                    [Op.substring]: search
                }
            }
        };
        include[1] = obj;
    }

    return new Promise((resolve, reject) => {
        Order.findAll({
            where,
            include,
            order: [
                ["id", "ASC"]
            ],
        })
            .then((orders) => {
                if (orders.length === 0) {
                    return reject({
                        error: {
                            name: "ApiFindError",
                            type: "Orders error",
                            errors: [{
                                message: "there are no orders in the database",
                                type: "not found",
                                value: null,
                            },],
                        },
                    });
                }

                resolve(orders);
            })
            .catch((err) => reject({
                error: err
            }));
    });
};

const confirmedOrder = async ({
    id,
    payment_method_id,
    payment_type_id,
    payment_status,
    payment_status_detail,
    card_expiration_month,
    card_expiration_year,
    card_first_six_digits,
    card_last_four_digits
}) => {
    const Order = await getOne(id);
    Order.status = "CONFIRMED";
    Order.payment_method_id = payment_method_id
    Order.payment_type_id = payment_type_id
    Order.payment_status = payment_status
    Order.payment_status_detail = payment_status_detail
    Order.card_expiration_month = card_expiration_month
    Order.card_expiration_year = card_expiration_year
    Order.card_first_six_digits = card_first_six_digits
    Order.card_last_four_digits = card_last_four_digits
    await Order.save()
};

const toPaymentOrder = async ({
    id,
    address,
    init_point
}) => {
    if (!address) {
        return new Promise((resolve, reject) => {
            reject({
                error: {
                    message: "Es necesario tener la dirección de envío"
                },
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
                    message: "No se puede hacer la compra, uno de los productos no tiene el stock suficiente",
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
                Order.status = "PENDING_PAYMENT";
                Order.address = address;
                Order.init_point = init_point;
                Order.save();
            })
            .catch((err) => reject({
                error: err
            }));

        getOne(id)
            .then((e) => {
                resolve(e)
            })
    });
};

// Busca una orden por su ID
const getOne = (id) => {
    return new Promise((resolve, reject) => {
        Order.findOne({
            where: {
                id
            },
            include: [{
                model: Product,
                include: {
                    model: Image
                }
            }, User]
        })
            .then((order) => {
                if (!order) {
                    return reject({
                        error: {
                            name: "ApiFindError",
                            type: "Orders error",
                            errors: [{
                                message: "order does not exist in the database",
                                type: "not found",
                                value: null,
                            },],
                        },
                    });
                }

                resolve(order);
            })
            .catch((err) => reject({
                error: err
            }));
    });
};

// Crea una orden
const createOne = (status, address) => {
    return new Promise((resolve, reject) => {
        Order.create({
            status,
            address
        })
            .then((order) => resolve(order))
            .catch((err) => reject({
                error: err
            }));
    });
};

// Edita una orden según el parámetro enviado
const editOne = ({
    id,
    status,
    address
}) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((order) => {
                if (status) order.status = status;
                if (address) order.address = address;

                return order.save();
            })
            .then((order) => {
                if (order.products.length === 0) {
                    return order.destroy()
                }
                return order
            })
            .then((order) => resolve(order))
            .catch((err) => reject({
                error: err
            }));
    });
};

// Elimina una orden dado su ID - Sirve como el concepto de vaciar
const deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((order) => {
                order.destroy();

                resolve({
                    description: "successfully remove"
                });
            })
            .catch((err) => reject({
                error: err
            }));
    });
};

// Vacía una orden sin eliminarla
const emptyOrder = (id) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((order) => order.setProducts([]))
            .then((order) => resolve(order))
            .catch((err) => reject({
                error: err
            }));
    });
};

module.exports = {
    getAll,
    createOne,
    getOne,
    editOne,
    deleteOne,
    emptyOrder,
    toPaymentOrder,
    confirmedOrder,
    getAllFiler,
};