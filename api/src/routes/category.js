const router = require("express").Router();
const {
  getAll,
  createOne,
  getOne,
  editOne,
  deleteOne,
} = require("../controllers/categories");

router
  .route("/")
  .get((req, res) => {
    getAll()
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  })
  .post((req, res) => {
    const { name, description } = req.body;

    createOne(name, description)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;

    getOne(id)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  })
  .put((req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    editOne(id, name, description)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  })
  .delete((req, res) => {
    const { id } = req.params;

    deleteOne(id)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

module.exports = router;
