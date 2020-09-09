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

// * ArrayProducts debe ser un array de objetos, donde cada objeto tenga:
// * => El Id del producto en una propiedad id
// * => La cantidad de ese producto para esa orden en una propiedad amount
const addMultipleProductsToOrder = ({ idOrder, arrayProducts }) => {
    const orders = arrayProducts.map((product) =>
        addProductToOrder({
            idOrder,
            idProduct: product.id,
            amount: product.amount,
        })
    );
    return new Promise((resolve, reject) => {
        // if (orders) return resolve(orders);
        Promise.all(orders)
            .then((product_order) => resolve(product_order))
            .catch((err) => reject({ error: err }));
    });
};

// * Agrega a una orden, el producto, dado su id
// * Si la orden no esiste la crea, con un status de IN CREATION
// * Si la orden existe pero aún no tiene el producto asignado, se lo asigna
// * Si ya la orden tiene el produto, actualiza la candtidad de él
// * - Esta sirve para acutalizar la cantidad de los mismos productos en la orden
const addProductToOrder = async ({ idProduct, idOrder, amount, address }) => {
    if (!amount) amount = 1;

    const Product = await getProduct(idProduct);
    let Order = null;

    if (idOrder) {
        Order = await getOrder(idOrder);
    } else {
        Order = await createOrder("IN CREATION", address);
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

module.exports = {
    addProductToOrder,
    removeProductToOrder,
    findByProduct,
    addMultipleProductsToOrder,
};