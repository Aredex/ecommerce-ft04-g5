const {Order} = require('../db');

const returnOrder = (id) => {
    return new Promise( (resolve, reject) => {
            Order.findAll({
            where: {
                userId: id
            }
        })        
        .then((orders)=> {
            if(!id){
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
