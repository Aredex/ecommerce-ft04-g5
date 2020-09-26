const router = require("express").Router();
const isAdmin = require("../lib/isAdmin");
const isUser = require("../lib/isUser");

const {
    getAll,
    getOne,
    editOne,
    deleteOne,
    createReviewComplete,
} = require("../controllers/reviews");
const {
    removeReviewToProduct,
    addReviewToProduct,
} = require("../controllers/review_products");
const {
    removeUserToReview,
    addUserToReview,
} = require("../controllers/user_review");

router
    .route("/")
    .get((req, res) => {
        const {
            idUser,
            idProduct
        } = req.body;

        if (isAdmin(req) || (isUser(req) && req.user.uid === idUser)) {
            getAll({
                    idUser,
                    idProduct
                })
                .then((response) => res.json(response))
                .catch((err) => res.status(400).json(err));
        } else {
            res.sendStatus(401)
        }

    })
    .post((req, res) => {
        const {
            stars,
            title,
            description,
            idUser,
            idProduct
        } = req.body;

        if (isAdmin(req) || (isUser(req) && req.user.uid === idUser)) {
            createReviewComplete({
                    stars,
                    title,
                    description,
                    idUser,
                    idProduct
                })
                .then((response) => res.status(201).json(response))
                .catch((err) => res.status(400).json(err));
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

        getOne(id)
            .then((response) => res.json(response))
            .catch((err) => res.status(400).json(err));
    })
    .put((req, res) => {
        const {
            id
        } = req.params;
        const {
            stars,
            title,
            description
        } = req.body;
        ////////////////////////////////////////////
        editOne({
                id,
                stars,
                title,
                description
            })
            .then((response) => res.json(response))
            .catch((err) => res.status(400).json(err));
        ////////////////////////////////////////////
    })
    .delete((req, res) => {
        const {
            id
        } = req.params;
        ////////////////////////////////////////////
        deleteOne(id)
            .then((response) => res.json(response))
            .catch((err) => res.status(400).json(err));
        ////////////////////////////////////////////
    });

router
    .route("/:idReview/product/:idProduct")
    .post((req, res) => {
        const {
            idReview,
            idProduct
        } = req.params;
        ////////////////////////////////////////////
        addReviewToProduct(idReview, idProduct)
            .then((response) => res.json(response))
            .catch((err) => res.status(400).json(err));
        ////////////////////////////////////////////
    })
    .delete((req, res) => {
        const {
            idReview,
            idProduct
        } = req.params;

        ////////////////////////////////////////////

        removeReviewToProduct(idReview, idProduct)
            .then((response) => res.json(response))
            .catch((err) => res.status(400).json(err));

        ////////////////////////////////////////////
    });

router
    .route("/:idReview/user/:idUser")
    .post((req, res) => {
        const {
            idReview,
            idUser
        } = req.params;

        if (isAdmin(req) || (isUser(req) && req.user.uid === idUser)) {
            addUserToReview(idReview, idUser)
                .then((response) => res.json(response))
                .catch((err) => res.status(400).json(err));
        } else {
            res.sendStatus(401)
        }
    })
    .delete((req, res) => {
        const {
            idReview,
            idUser
        } = req.params;
        if (isAdmin(req) || (isUser(req) && req.user.uid === idUser)) {
            removeUserToReview(idReview, idUser)
                .then((response) => res.json(response))
                .catch((err) => res.status(400).json(err));
        } else {
            res.sendStatus(401)
        }
    });

module.exports = router;