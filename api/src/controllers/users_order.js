const { Order, Product, Image, User } = require("../db");
const { getOne: getUser } = require("./users");
const { getOne: getOrder } = require("./orders");

const getOrderByUser = (userId) => {
    return new Promise((resolve, reject) => {
        getUser(userId).then((user) => {
            if (user) {
                Order.findAll({
                    where: { userId },
                    include: [{ model: Product, include: Image }, User],
                })
                    .then((user_order) => resolve(user_order))
                    .catch((err) => reject({ error: err }));
            } else {
                return reject({
                    error: {
                        message: "Id doesn't exist",
                        type: "not found",
                    },
                });
            }
        });
    });
};

const getProductsPurchasedByuser = async (userId) => {
    let products = [];
    let productsToSend = [];
    let obj = {};

    const orders = await getOrderByUser(userId);

    orders.forEach(async (order) => {
        if (order.status === "CONFIRMED") {
            // products.concat(order.products);
            order.products.forEach((product) => {
                products.push(product);
            });
        }
    });

    products.forEach((product) => {
        if (!obj[product.id]) {
            obj[product.id] = product;
        } else {
            obj[product.id].order_product.amount +=
                product.order_product.amount;
        }
    });

    for (const p in obj) {
        productsToSend.push(obj[p]);
    }

    return productsToSend;
};

//-------------------------------------------------\\

const setUsertoOrder = async (idUser, idOrder) => {
    const Order = await getOrder(idOrder);
    const User = await getUser(idUser);

    return new Promise((resolve, reject) => {
        Order.setUser(User)
            .then((order) => resolve(order))
            .catch((err) => reject({ error: err }));
    });
};

module.exports = {
    getOrderByUser,
    setUsertoOrder,
    getProductsPurchasedByuser,
};
