const router = require("express").Router();
const { Category } = require("../db");

router
    .route("/")
    .get((req, res) => {
        Category.findAll({})
            .then((categories) => {
                res.json(categories);
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
                res.status(201).json(category);
            })
            .catch((err) => {
                res.status(400).json({
                    message: "error",
                    error: err.message,
                });
            });
    });

module.exports = router;
