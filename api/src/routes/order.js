const router = require("express").Router();

const { getAll } = require("../controllers/orders");

router.route("/").get((req, res, next) => {
  return getAll()
    .then((products) => {
      res.send(products).status(200);
    })
    .catch(next);
});

module.exports = router;
