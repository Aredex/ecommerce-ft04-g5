const { getOne: getProduct } = require("./products");
const { getOne: getOrder, createOne: createOrder } = require("./orders");

const addProductToOrder = async (idProduct, idOrder, amount) => {
    const Product = await getProduct(idProduct);
    const Order = await getOrder(idOrder);

    return new Promise((resolve, reject) => {
        Order.addProduct(Product, {
            through: { price: Product.price, amount: amount },
        })
            .then((product_order) => resolve(product_order))
            .catch((err) => reject({ error: err }));
    });
};

const removeProductToOrder = async (idProduct, idOrder) => {
    const Product = await getProduct(idProduct);
    const Order = await getOrder(idOrder);

    return new Promise((resolve, reject) => {
        Order.removeProduct(Product)
            .then((product_order) => resolve(product_order))
            .catch((err) => reject({ error: err }));
    });
};

// Crea una orden type (In creation)
const createOrderInCreation = async (idProduct) => {
    const Product = await getProduct(idProduct);
    const Order = await createOrder("IN CREATION", null);

    return new Promise((resolve, reject) => {
        Order.addProduct(Product)
            .then((product_category) => resolve(product_category))
            .catch((err) => reject({ error: err }));
    });
};

module.exports = {
    addProductToOrder,
    removeProductToOrder,
    createOrderInCreation,
};
