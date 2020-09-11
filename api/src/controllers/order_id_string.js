const { Order, Product, Image, User, Op, Category, Review } = require("../db");
const { getOne } =  require('./orders')
const ordersDevolution = (variable) => {
return new Promise( (resolve, reject) => {

	if (/\d/.test(variable) == true) {
		Order.findAll({
			where: {
				id: variable
			},
			include: [{model: Product, include: [Category, Image, Review]}, User]
		})
		.then((order)=> resolve(order))
		.catch((err) => reject(err))

	} else {
			Order.findAll({
				include: [{model: Product, include: [Category, Image, Review]}, {
    model: User,
    where: {
      name: { [Op.substring]: `${variable}` }
    }

  }]
	})
	.then( (orders) => resolve(orders))
	.catch( (err) => reject({error : err}))

}

})
}

module.exports = {
	ordersDevolution
};