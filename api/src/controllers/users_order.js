const {Order} = require('../db');

const returnOrder = (id) => {
    return new Promise( (resolve, reject) => {
            Orders.findAll({
            where: {
                userId: `${id}`
            }
        })//
        
        .then((orders)=> {
            if(orders == {}){
                return reject({
                    error: {
                        errors: [
                        {    message:
                             "Id doesn't exist",
                             type: "not found"
                            },
                        ],
                    },

                });
            }
            
            resolve(orders);
            })
        .catch((err)=>reject ({error : err}))
    

})
}

module.exports = {
  returnOrder
}
