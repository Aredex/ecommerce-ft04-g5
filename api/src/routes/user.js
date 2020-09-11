const router = require("express").Router();
const {
    createOne,
    getAll,
    getOne,
    editOne,
    deleteOne,
} = require("../controllers/users");
const { getOrderByUser } = require("../controllers/users_order");
const { getAll: getReviews } = require("../controllers/reviews");

router
    .route("/")
    .post((req, res) => {
        const { name, email, password, role } = req.body;

        createOne(name, email, password, role)
            .then((user) => res.json(user).status(201))
            .catch((err) => res.status(400).json(err));
    })
    .get((req, res) => {
        getAll()
            .then((users) => res.json(users).status(200))
            .catch((err) => res.status(404).json(err));
    });

router
    .route("/:id")
    .get((req, res) => {
        const { id } = req.params;

        getOne(id)
            .then((user) => res.json(user))
            .catch((err) => res.status(404).json(err));
    })
    .put((req, res) => {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        editOne({ id, name, email, password, role })
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json({ err }));
    })
    .delete((req, res) => {
        const { id } = req.params;
        deleteOne(id)
            .then((user) => res.json(user).status(200))
            .catch((err) => res.status(400).json(err));
    });

router.route("/:id/orders").get((req, res) => {
    const { id } = req.params;

    getOrderByUser(id)
        .then((orders) => res.json(orders).status(200))
        .catch((err) => res.json(err));
});

// Retorna todas las reviews hechas por el usuario según su id
router.route("/:id/reviews").get((req, res) => {
    const { id } = req.params;

    getReviews({ idUser: id })
        .then((reviews) => res.json(reviews).status(200))
        .catch((err) => res.json(err));
});

router.route("/:id/toadmin").put((req, res) => {
    const { id } = req.params;

    editOne({ id, role: "ADMIN" })
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json({ err }));
});

router.route("/:id/toguest").put((req, res) => {
    const { id } = req.params;

    editOne({ id, role: "GUEST" })
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json({ err }));
});

module.exports = router;
