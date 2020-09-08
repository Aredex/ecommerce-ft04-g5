const { Order_user, Order } = require("../db");
const { getOne: getUser } = require("./users");
const { getOne: getOrder } = require("./orders");

const getOrderByUser = (userId) => {
    return new Promise((resolve, reject) => {
        Order_user.findAll({ where: { userId } })
            .then((user_order) => resolve(user_order))
            .catch((err) => reject({ error: err }));
    });
};

//id de pedido y usuario es el mismo, de prueba
const addOrderOnUser = async (status, address, id) => {
    return new Promise((resolve, reject) => {
        Order.findOne({
            where: {
                id: id,
            },
        })
            .then((order) => {
                order.updateAttributes({
                    userId: id,
                });

                return order;
            })
            .then((order) => resolve(order))
            .catch((err) => reject({ error: err }));
    });
};

const setUsertoOrder = async (idUser, idOrder) => {
    const Order = await getOrder(idOrder);
    const User = await getUser(idUser);

    return new Promise((resolve, reject) => {
        Order.setUser(User)
            .then((order) => resolve(order))
            .catch((err) => reject({ error: err }));
    });
};

// const returnOrder = (id) => {
//     return new Promise( (resolve, reject) => {
//             Order.findAll({
//             where: {
//                 userId: id
//             }
//         })
//         .then((orders)=> {
//             if(!id){
//                 return reject({
//                     error: {
//                         errors: [
//                         {    message:
//                              "Id doesn't exist",
//                              type: "not found"
//                             },
//                         ],
//                     },

//                 });
//             }

//             resolve(orders);
//             })
//         .catch((err)=>reject ({error : err}))

// })
// }

module.exports = {
    //   returnOrder,
    getOrderByUser,
    addOrderOnUser,
    setUsertoOrder,
};
