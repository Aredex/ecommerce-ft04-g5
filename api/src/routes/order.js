const router = require("express").Router(),
    isAdmin = require("../lib/isAdmin");
const isUser = require("../lib/isUser");
const mercadopago = require("mercadopago");

// Agrega credenciales
mercadopago.configure({
    sandbox: true,
    access_token: process.env.MELI_ACCESS_TOKEN,
});

const {
    getAll,
    createOne,
    deleteOne,
    getOne,
    editOne,
    emptyOrder,
    confirmedOrder,
    getAllFiler,
    toPaymentOrder,
    rejectedOrder,
} = require("../controllers/orders");
const {
    removeProductToOrder,
    addProductToOrder,
    addMultipleProductsToOrder,
} = require("../controllers/order_products");
const { setUsertoOrder } = require("../controllers/users_order");

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_\\
const { ordersDevolution } = require("../controllers/order_id_string");
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_\\

const { sendEmail } = require("../mailmodel/sendEmail");
const { dispatch } = require("../mailmodel/dispatch");

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_\\

// Rutas para obtener todas las ordenes y crear una orden
router
    .route("/")
    .get((req, res) => {
        const { status } = req.body;
        const { search } = req.query;
        if (isAdmin(req)) {
            if (!search) {
                return getAll({
                    status,
                })
                    .then((orders) => res.json(orders))
                    .catch((err) => res.status(404).json(err));
            }

            getAllFiler({
                search,
            })
                .then((orders) => res.json(orders))
                .catch((err) => res.status(404).json(err));
        } else {
            res.sendStatus(401);
        }
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
    /*
       .get((req, res) => {
           const { id } = req.params;
           getOne(id)
               .then((order) => res.json(order).status(201))
               .catch((err) => res.status(404).json(err));
       })
               .catch((err) => res.status(400).json(err));
       })*/

    .delete((req, res) => {
        const { id } = req.params;
        deleteOne(id)
            .then((order) => res.json(order).status(201))
            .catch((err) => res.status(400).json(err));
    })
    .put((req, res) => {
        const { id } = req.params;
        const { status, address } = req.body;
        editOne({
            id,
            status,
            address,
        })
            .then((order_product) => res.json(order_product))
            .catch((err) => res.status(400).json(err));
    });

// Ruta para agregar un producto a una orden
// Si la orden aún no está creada, la crea y le agrrega el producto
router.route("/product/:idProduct").post((req, res) => {
    const { idProduct } = req.params;
    const { amount, address, idUser } = req.body;

    if (isAdmin(req) || (isUser(req) && req.user.uid === idUser)) {
        addProductToOrder({
            idProduct,
            amount,
            address,
            idUser,
        })
            .then((order_product) => res.json(order_product).status(201))
            .catch((err) => res.status(400).json(err));
    } else {
        res.sendStatus(401);
    }
});

// Agrega muchos productos a una orden ya definida
router.route("/:idOrder/products").post((req, res) => {
    const { idOrder } = req.params;
    const { products, idUser } = req.body;

    if (isAdmin(req) || (isUser(req) && req.user.uid === idUser)) {
        addMultipleProductsToOrder({
            idOrder,
            arrayProducts: products,
            idUser,
        })
            .then((order_product) => res.json(order_product).status(201))
            .catch((err) => res.status(400).json(err));
    } else {
        res.sendStatus(401);
    }
});

// Agrega muchos productos a una orden aunque esta no esté definida. La crea
router.route("/products").post((req, res) => {
    const { products, idUser } = req.body;

    if (isAdmin(req) || (isUser(req) && req.user.uid === idUser)) {
        addMultipleProductsToOrder({
            arrayProducts: products,
            idUser,
        })
            .then((order_product) => res.json(order_product).status(201))
            .catch((err) => res.status(400).json(err));
    } else {
        res.sendStatus(401);
    }
});

// Rutas para
// Agregar un producto específico a una orden ya creada
// Remover ese producto de la orden
router
    .route("/:idOrder/product/:idProduct")
    .post((req, res) => {
        const { idOrder, idProduct } = req.params;
        const { amount, idUser } = req.body;

        if (isAdmin(req) || (isUser(req) && req.user.uid === idUser)) {
            addProductToOrder({
                idProduct,
                idOrder,
                amount,
                idUser,
            })
                .then((order_product) => res.json(order_product))
                .catch((err) => res.status(400).json(err));
        } else {
            res.sendStatus(401);
        }
    })
    .delete((req, res) => {
        const { idOrder, idProduct } = req.params;

        removeProductToOrder(idProduct, idOrder)
            .then((order_product) => res.json(order_product).status(204))
            .catch((err) => res.status(400).json(err));
    })
    .put((req, res) => {
        const { idOrder, idProduct } = req.params;
        const { amount } = req.body;

        addProductToOrder({
            idOrder,
            idProduct,
            amount,
        })
            .then((order) => res.json(order).res.status(204))
            .catch((err) => res.status(400).json(err));
    });

router.route("/:idOrder/user/:idUser").post((req, res) => {
    const { idOrder, idUser } = req.params;

    if (isAdmin(req) || (isUser(req) && req.user.uid === idUser)) {
        setUsertoOrder(idUser, idOrder)
            .then((order_product) => res.json(order_product))
            .catch((err) => res.status(400).json(err));
    } else {
        res.sendStatus(401);
    }
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

    confirmedOrder({
        id,
        address,
    })
        .then((order_product) => {
            sendEmail(order_product);
            res.json(order_product).status(204);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});
// Ruta para especificar que una orden ya ha sido comprada
router.route("/:id/toPayment").post(async (req, res) => {
    const { id } = req.params;
    const { address } = req.body;

    try {
        let Order = await getOne(id);
        let preference = {
            items: Order.products.map((product) => ({
                title: product.name,
                unit_price: product.order_product.price,
                quantity: product.order_product.amount,
            })),
            payment_methods: {
                excluded_payment_types: [
                    {
                        id: "ticket",
                    },
                    {
                        id: "atm",
                    },
                ],
                installments: 1,
            },
            external_reference: Order.id.toString(),
            back_urls: {
                success: `${process.env.API}/payment/meli/callback`,
                failure: `${process.env.API}/payment/meli/callback`,
            },
            auto_return: "approved",
        };
        const response = await mercadopago.preferences.create(preference);
        Order = await toPaymentOrder({
            id,
            address,
            init_point: response.body.init_point,
        });
        res.json({ redirect: response.body.init_point, order: Order });
    } catch (error) {
        res.status(400).json(error);
    }

    // .then((order_product) => {
    //     sendEmail(order_product)
    //     res.redirect()
    // })
    // .catch((err) => res.status(400).json(err));
});
// Ruta para especificar que una orden ha sido rechazada
router.route("/:id/rejected").put((req, res) => {
    const { id } = req.params;

    rejectedOrder(id)
        .then((order_product) => res.json(order_product).status(204))
        .catch((err) => res.status(400).json(err));
});

// Ruta para especificar que una orden ya ha sido comprada
//  Y se está preparando su envío
router.route("/:id/preparing").put((req, res) => {
    const { id } = req.params;
    const { address } = req.body;

    if (isAdmin(req)) {
        editOne({
            id,
            status: "PREPARING",
            address,
        })
            .then((order_product) => res.json(order_product).status(204))
            .catch((err) => res.status(400).json(err));
    } else {
        res.sendStatus(401);
    }
});

// Ruta para especificar que una orden ya ha sido comprada
//  Y ya se ha enviado al cliente
router.route("/:id/sent").put((req, res) => {
    const { id } = req.params;

    if (isAdmin(req)) {
        editOne({
            id,
            status: "SENT",
        })
            .then((order_product) => res.json(order_product).status(204))
            .catch((err) => res.status(400).json(err));
    } else {
        res.sendStatus(401);
    }
});

// Ruta para especificar que una orden ya ha sido entregada
router.route("/:id/delivered").get((req, res) => {
    const { id } = req.params;

    // if (isAdmin(req)) {
    editOne({
        id,
        status: "DELIVERED",
    })
        .then((order_product) => {
            var aux = dispatch(order_product);
            res.send(aux);
            // res.json(order_product).status(204)})
        })
        .catch((err) => res.status(400).json(err));

    // } else {
    //     res.sendStatus(401)
    // }
});

// Ruta para especificar que una orden ya ha sido entregada
//  Recibida con éxito y sin problemas, se pone en estado finalizado
router.route("/:id/finalized").put((req, res) => {
    const { id } = req.params;

    if (isAdmin(req)) {
        editOne({
            id,
            status: "FINALIZED",
        })
            .then((order_product) => res.json(order_product).status(204))
            .catch((err) => res.status(400).json(err));
    } else {
        res.sendStatus(401);
    }
});

router.route("/increation").get((req, res) => {
    if (isAdmin(req)) {
        getAll({
            status: "IN CREATION",
        })
            .then((orders) => res.json(orders))
            .catch((err) => res.status(404).json(err));
    } else {
        res.sendStatus(401);
    }
});

router.route("/sent").get((req, res) => {
    if (isAdmin(req)) {
        getAll({
            status: "sent",
        })
            .then((orders) => res.json(orders))
            .catch((err) => res.status(404).json(err));
    } else {
        res.sendStatus(401);
    }
});

router.route("/confirmed").get((req, res) => {
    if (isAdmin(req)) {
        getAll({
            status: "confirmed",
        })
            .then((orders) => res.json(orders))
            .catch((err) => res.status(404).json(err));
    } else {
        res.sendStatus(401);
    }
});

router.route("/rejected").get((req, res) => {
    if (isAdmin(req)) {
        getAll({
            status: "rejected",
        })
            .then((orders) => res.json(orders))
            .catch((err) => res.status(404).json(err));
    } else {
        res.sendStatus(401);
    }
});

router.route("/preparing").get((req, res) => {
    if (isAdmin(req)) {
        getAll({
            status: "preparing",
        })
            .then((orders) => res.json(orders))
            .catch((err) => res.status(404).json(err));
    } else {
        res.sendStatus(401);
    }
});

router.route("/delivered").get((req, res) => {
    if (isAdmin(req)) {
        getAll({
            status: "delivered",
        })
            .then((orders) => res.json(orders))
            .catch((err) => res.status(404).json(err));
    } else {
        res.sendStatus(401);
    }
});

router.route("/finalized").get((req, res) => {
    if (isAdmin(req)) {
        getAll({
            status: "finalized",
        })
            .then((orders) => res.json(orders))
            .catch((err) => res.status(404).json(err));
    } else {
        res.sendStatus(401);
    }
});

router.route("/:variable").get((req, res) => {
    const { variable } = req.params;

    if (isAdmin(req)) {
        ordersDevolution(variable)
            .then((orders) => res.json(orders))
            .catch((err) => res.status(400).json(err));
    } else {
        res.sendStatus(401);
    }
});
module.exports = router;
