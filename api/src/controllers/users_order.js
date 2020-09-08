const { Order_user, Order } = require("../db");

const getOrderByUser = (userId) => {
  return new Promise((resolve, reject) => {
    Order_user.findAll({ where: { userId } })
      .then((user_order) => resolve(user_order))
      .catch((err) => reject({ error: err }));
  });
};


//id de pedido y usuario es el mismo, de prueba
const addOrderOnUser = (status, address, id) => {

  return new Promise((resolve, reject)=>{
  	Order.findOne({where: {
  		id: id
  	}})
            .then((order) => {
            	order.updateAttributes({
            		userId: id
            	})

            return order})
            .then((order) => resolve(order))
            .catch((err) => reject({ error: err }));
        })

}


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
  addOrderOnUser
};
