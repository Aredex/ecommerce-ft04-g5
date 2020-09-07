const router = require("express").Router();
const {
    getAll,
    createOne,
    deleteOne,
    getOne,
    editOne,
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
        const { address } = req.body;

        createOne("IN CREATION", address)
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
    })
    .put((req, res) => {
        const { id } = req.params;
        const { status, address } = req.body;
        editOne({ id, status, address })
            .then((order_product) => res.json(order_product))
            .catch((err) => res.status(400).json(err));
    });

router
    .route("/:idOrder/product/:idProduct")
    .post((req, res) => {
        const { idOrder, idProduct } = req.params;
        const { amount } = req.body;

        addProductToOrder({ idProduct, idOrder, amount })
            .then((order_product) => res.json(order_product))
            .catch((err) => res.status(400).json(err));
    })
    .delete((req, res) => {
        const { idOrder, idProduct } = req.params;

        removeProductToOrder(idProduct, idOrder)
            .then((order_product) => res.json(order_product).status(204))
            .catch((err) => res.status(400).json(err));
    });

router.route("/product/:idProduct").post((req, res) => {
    const { idProduct } = req.params;
    const { amount, address } = req.body;

    addProductToOrder({ idProduct, amount, address })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

router.route("/:id/confirmed").put((req, res) => {
    const { id } = req.params;
    const { address } = req.body;

    editOne({ id, status: "CONFIRMED", address })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

router.route("/:id/rejected").put((req, res) => {
    const { id } = req.params;
    const { address } = req.body;

    editOne({ id, status: "REJECTED", address })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

router.route("/:id/preparing").put((req, res) => {
    const { id } = req.params;
    const { address } = req.body;

    editOne({ id, status: "PREPARING", address })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

router.route("/:id/sent").put((req, res) => {
    const { id } = req.params;

    editOne({ id, status: "SENT" })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

router.route("/:id/delivered").put((req, res) => {
    const { id } = req.params;

    editOne({ id, status: "DELIVERED" })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

router.route("/:id/finalized").put((req, res) => {
    const { id } = req.params;

    editOne({ id, status: "FINALIZED" })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});
module.exports = router;
