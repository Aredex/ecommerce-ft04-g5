const router = require("express").Router();
const isAdmin = require("../lib/isAdmin");
const isUser = require("../lib/isUser");


const {
    createOne,
    getAll,
    getOne,
    editOne,
    deleteOne,
} = require("../controllers/users");
const {
    getOrderByUser
} = require("../controllers/users_order");
const {
    getAll: getReviews
} = require("../controllers/reviews");

router
    .route("/")
    .post((req, res) => {
        const {
            name,
            email,
            password,
            role
        } = req.body;

        createOne(name, email, password, role)
            .then((user) => res.json(user).status(201))
            .catch((err) => res.status(400).json(err));
    })
    .get((req, res) => {
        if (isAdmin(req)) {
            getAll()
                .then((users) => res.json(users).status(200))
                .catch((err) => res.status(404).json(err));
        } else {
            res.sendStatus(401)
        }
    });

router
    .route("/:id")
    .get((req, res) => {
        const {
            id
        } = req.params;
        if (isAdmin(req) || (isUser(req) && req.user.uid == id)) {
            getOne(id)
                .then((user) => res.json(user))
                .catch((err) => res.status(404).json(err));
        } else {
            res.sendStatus(401)
        }
    })
    .put((req, res) => {
        const {
            id
        } = req.params;
        const {
            name,
            email,
            password,
            role
        } = req.body;
        if (isAdmin(req) || (isUser(req) && req.user.uid === id)) {
            editOne({
                    id,
                    name,
                    email,
                    password,
                    role
                })
                .then((user) => res.json(user))
                .catch((err) => res.status(400).json({
                    err
                }));
        } else {
            res.sendStatus(401)
        }



    })
    .delete((req, res) => {
        const {
            id
        } = req.params;

        if (isAdmin(req) || (isUser(req) && req.user.uid === id)) {
            deleteOne(id)
                .then((user) => res.json(user).status(200))
                .catch((err) => res.status(400).json(err));
        } else {
            res.sendStatus(401)
        }

    });

router.route("/:id/orders").get((req, res) => {
    const {
        id
    } = req.params;
    if (isAdmin(req) || (isUser(req) && req.user.uid === id)) {
        getOrderByUser(id)
            .then((orders) => res.json(orders).status(200))
            .catch((err) => res.json(err));
    } else {
        res.sendStatus(401)
    }
});

// Retorna todas las reviews hechas por el usuario según su id
router.route("/:id/reviews").get((req, res) => {
    const {
        id
    } = req.params;

    if (isAdmin(req) || (isUser(req) && req.user.uid === id)) {
        getReviews({
                idUser: id
            })
            .then((reviews) => res.json(reviews).status(200))
            .catch((err) => res.json(err));
    } else {
        res.sendStatus(401)
    }
});

router.route("/:id/toadmin").put((req, res) => {
    const {
        id
    } = req.params;
    if (isAdmin(req)) {
        editOne({
                id,
                role: "ADMIN"
            })
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json({
                err
            }));
    } else {
        res.sendStatus(401)
    }
});

router.route("/:id/toguest").put((req, res) => {
    const {
        id
    } = req.params;
    if (isAdmin(req)) {
        editOne({
                id,
                role: "GUEST"
            })
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json({
                err
            }));
    } else {
        res.sendStatus(401)
    }
});

module.exports = router;