const router = require("express").Router();
const { Category } = require("../db");

router
    .route("/")
    .get((req, res) => {
        Category.findAll({})
            .then((categories) => {
                res.json({
                    message: "Success",
                    categories,
                });
            })
            .catch((err) => {
                res.json({
                    message: "error",
                    error: err.message,
                });
            });
    })
    .post((req, res) => {
        const { name, description } = req.body;

        Category.create({ name, description })
            .then((category) => {
                res.status(201).json({
                    message: "Success",
                    category,
                });
            })
            .catch((err) => {
                res.status(400).json({
                    message: "error",
                    error: err.message,
                });
            });
    });

router
    .route("/:id")
    .get((req, res) => {
        const { id } = req.params;

        Category.findOne({
            where: { id },
        })
            .then((category) => {
                res.json({
                    message: "Success",
                    category,
                });
            })
            .catch((err) => {
                res.json({
                    message: "error",
                    error: err.message,
                });
            });
    })
    .put((req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        Category.findOne({
            where: { id },
        })
            .then((category) => {
                category.name = name;
                category.description = description;

                return category.save();
            })
            .then((category) => {
                res.json({
                    message: "Success",
                    category,
                });
            })
            .catch((err) => {
                res.json({
                    message: "error",
                    error: err.message,
                });
            });
    })
    .delete((req, res) => {
        const { id } = req.params;
        Category.findOne({
            where: { id },
        })
            .then((category) => {
                category.destroy();

                res.json({
                    message: "Success",
                });
            })
            .catch((err) => {
                res.json({
                    message: "error",
                    error: err.message,
                });
            });
    });

module.exports = router;
