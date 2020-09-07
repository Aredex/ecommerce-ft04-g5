const { getOne: getProduct } = require("./products");
const { getOne: getOrder, createOne: createOrder } = require("./orders");
const { Order_product } = require("../db");

const findByProduct = (productId) => {
    return new Promise((resolve, reject) => {
        Order_product.findAll({ where: { productId } })
            .then((product_order) => resolve(product_order))
            .catch((err) => reject({ error: err }));
    });
};

// Busca una order_product dado el id del product y de la orden
const findOne = (productId, orderId) => {
    return new Promise((resolve, reject) => {
        Order_product.findOne({
            where: { productId, orderId },
        })
            .then((product_order) => {
                if (!product_order) {
                    return reject({ error: "No existe en la BD" });
                }

                resolve(product_order);
            })
            .catch((err) => reject({ error: err }));
    });
};

// Agrega a una orden, el producto, dado su id
// Si la orden no esiste la crea, con un status de IN CREATION
// Si la orden existe pero aún no tiene el producto asignado, se lo asigna
// Si ya la orden tiene el produto, actualiza la candtidad de él
const addProductToOrder = async ({ idProduct, idOrder, amount }) => {
    if (!amount) amount = 1;

    const Product = await getProduct(idProduct);
    let Order = null;

    if (idOrder) {
        Order = await getOrder(idOrder);
    } else {
        Order = await createOrder("IN CREATION", null);
    }

    return new Promise((resolve, reject) => {
        amount = parseInt(amount);

        Order.hasProduct(Product)
            .then((product_order) => {
                if (!product_order) {
                    return Order.addProduct(Product, {
                        through: { price: Product.price, amount: amount },
                    });
                }

                return findOne(Product.id, Order.id)
                    .then((product_order) => product_order)
                    .catch((err) => err);
            })
            .then((product_order) => {
                if (Array.isArray(product_order)) return product_order[0];

                return product_order;
            })
            .then((product_order) => {
                product_order.amount = amount;
                return product_order.save();
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
    findByProduct,
};
