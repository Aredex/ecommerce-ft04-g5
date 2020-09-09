const { Order, Product, Image } = require("../db");
const { getOne: getUser } = require("./users");
const { getOne: getOrder } = require("./orders");

const getOrderByUser = (userId) => {
    return new Promise((resolve, reject) => {
        getUser(userId).then((user) => {
            if (user) {
                Order.findAll({
                    where: { userId },
                    include: [{ model: Product, include: Image }],
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
};
