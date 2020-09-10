const router = require("express").Router();
const { createOne, getAll, getOne, editOne } = require("../controllers/users");

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
