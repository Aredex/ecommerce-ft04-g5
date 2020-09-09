const router = require("express").Router();
const {
    getAll,
    createOne,
    deleteOne,
    getOne,
    editOne,
    emptyOrder,
} = require("../controllers/orders");
const {
    removeProductToOrder,
    addProductToOrder,
    addMultipleProductsToOrder,
} = require("../controllers/order_products");

// Rutas para obtener todas las ordenes y crear una orden
router
    .route("/")
    .get((req, res, next) => {
        getAll()
            .then((orders) => {
                res.send(orders);
            })
            .catch(next);
    })
    .post((req, res) => {
        const { address } = req.body;

        // Crea una orden sin vinculos con productos y usuarios
        createOne("IN CREATION", address)
            .then((order) => res.json(order).status(201))
            .catch((err) => res.status(400).json(err));
    });

//  Rutas para obtener una orden en particular, eliminarla y editarla
//      Solo edita el status y address
//      Eliminar una orden sirve como método para vaciar
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

// Ruta para agregar un producto a una orden
// Si la orden aún no está creada, la crea y le agrrega el producto
router.route("/product/:idProduct").post((req, res) => {
    const { idProduct } = req.params;
    const { amount, address } = req.body;

    addProductToOrder({ idProduct, amount, address })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

// Agrega muchos productos a una orden ya definida
router.route("/:idOrder/products").post((req, res) => {
    const { idOrder } = req.params;
    const { products } = req.body;

    addMultipleProductsToOrder({ idOrder, arrayProducts: products })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

// Agrega muchos productos a una orden aunque esta no esté definida. La crea
router.route("/products").post((req, res) => {
    const { products } = req.body;

    addMultipleProductsToOrder({ arrayProducts: products })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

// Rutas para
// Agregar un producto específico a una orden ya creada
// Remover ese producto de la orden
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

// Ruta alternativa para vaciar una orden
router.route("/:id/empty").delete((req, res) => {
    const { id } = req.params;

    emptyOrder(id)
        .then((order_product) => res.json(order_product).status(204))
        .catch((err) => res.status(400).json(err));
});

// Ruta para especificar que una orden ya ha sido comprada
router.route("/:id/confirmed").put((req, res) => {
    const { id } = req.params;
    const { address } = req.body;

    editOne({ id, status: "CONFIRMED", address })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

// Ruta para especificar que una orden ha sido rechazada
router.route("/:id/rejected").put((req, res) => {
    const { id } = req.params;
    const { address } = req.body;

    editOne({ id, status: "REJECTED", address })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

// Ruta para especificar que una orden ya ha sido comprada
//  Y se está preparando su envío
router.route("/:id/preparing").put((req, res) => {
    const { id } = req.params;
    const { address } = req.body;

    editOne({ id, status: "PREPARING", address })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

// Ruta para especificar que una orden ya ha sido comprada
//  Y ya se ha enviado al cliente
router.route("/:id/sent").put((req, res) => {
    const { id } = req.params;

    editOne({ id, status: "SENT" })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

// Ruta para especificar que una orden ya ha sido entregada
router.route("/:id/delivered").put((req, res) => {
    const { id } = req.params;

    editOne({ id, status: "DELIVERED" })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

// Ruta para especificar que una orden ya ha sido entregada
//  Recibida con éxito y sin problemas, se pone en estado finalizado
router.route("/:id/finalized").put((req, res) => {
    const { id } = req.params;

    editOne({ id, status: "FINALIZED" })
        .then((order_product) => res.json(order_product))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;
