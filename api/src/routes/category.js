const router = require("express").Router();

// Trayendo los métodos del controlador de categorías
const {
  getAll,
  createOne,
  getOne,
  editOne,
  deleteOne,
} = require("../controllers/categories");

router
  .route("/") // Defino la ruta para la llamada
  .get((req, res) => {
    // Defino el método de la llamada
    getAll() // LLamo al método del controlador
      .then((response) => res.json(response)) // OK
      .catch((err) => res.status(400).json(err)); // Err
  })
  .post((req, res) => {
    const { name, description } = req.body;

    createOne(name, description)
      .then((response) => res.status(201).json(response))
      .catch((err) => res.status(400).json(err));
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;

    getOne(id)
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err));
  })
  .put((req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    editOne(id, name, description)
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err));
  })
  .delete((req, res) => {
    const { id } = req.params;

    deleteOne(id)
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err));
  });

router.route("/:id/products").get((req, res) => {
  const { id } = req.params;
  getOne(id)
    .then((category) => res.json(category.products).status(201))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
