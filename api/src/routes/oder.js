const router = require("express").Router();
const {
    getAll,
    createOne,
    deleteOne,
    getOne,
} = require("../controllers/orders");
const {
    removeProductToOrder,
    addProductToOrder,
} = require("../controllers/order_products");

router
    .route("/")
    .get((req, res, next) => {
        getAll()
            .then((products) => {
                res.send(products);
            })
            .catch(next);
    })
    .post((req, res) => {
        createOne("IN CREATION", null)
            .then((order) => res.json(order).status(201))
            .catch((err) => res.status(400).json(err));
    });

router
    .route("/:id")
    .get((req, res) => {
        const { id } = req.params;
        getOne(id)
            .then((order) => res.json(order).status(201))
            .catch((err) => res.status(400).json(err));
    })

    .delete((req, res) => {
        const { id } = req.params;
        deleteOne(id)
            .then((order) => res.json(order).status(201))
            .catch((err) => res.status(400).json(err));
    });

router
    .route("/:idOrder/products/:idProduct")
    .post((req, res) => {
        const { idOrder, idProduct } = req.params;
        const { amount } = req.body;

        addProductToOrder(idProduct, idOrder, amount)
            .then((order_product) => res.json(order_product))
            .catch((err) => res.status(400).json(err));
    })
    .delete((req, res) => {
        const { idOrder, idProduct } = req.params;

        removeProductToOrder(idProduct, idOrder)
            .then((order_product) => res.json(order_product))
            .catch((err) => res.status(400).json(err));
    });
module.exports = router;
