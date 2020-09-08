const { Order_user } = require("../db");

const getOrderByUser = (userId) => {
  return new Promise((resolve, reject) => {
    Order_user.findAll({ where: { userId } })
      .then((user_order) => resolve(user_order))
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
};
