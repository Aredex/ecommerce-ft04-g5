const router = require("express").Router();
const { createOne } = require("../controllers/images");

router.route("/").post((req, res) => {
    const { url } = req.body;

    createOne(url)
        .then((img) => res.json(img))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;
