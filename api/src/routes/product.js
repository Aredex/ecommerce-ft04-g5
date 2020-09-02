const router = require("express").Router();
const {
  addCategory,
  removeCategory,
} = require("../controllers/products_categories");
const {
  getAll,
  createOne,
  editOne,
  getOne,
} = require("../controllers/products");

router
  .route("/")
  .get((req, res, next) => {
    getAll()
      .then((products) => {
        res.send(products);
      })
      .catch(next);
  })
  .post((req, res) => {
    const { name, description, price } = req.body;

    createOne(name, description, price)
      .then((products) => res.status(201).json(products))
      .catch((err) => res.status(400).json(err));
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    getOne(id)
      .then((product) => res.json(product))
      .catch((error) => res.status(400).json(error));
  })
  .put((req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    editOne(id, name, description, price)
      .then((product) => res.json(product).status(201))
      .catch((err) => res.json(err));
  });

router
  .route("/:id/category/:idCategory")
  .put((req, res) => {
    const { id, idCategory } = req.params;

    // Dado el caso que existe el IdCategory, significa que están agregando
    // ese categoría, al producto.
    addCategory(id, idCategory) // Llamamos al método del controlador
      .then((product_category) => res.json(product_category).status(201))
      .catch((err) => res.json(err));
  })
  .delete((req, res) => {
    const { id, idCategory } = req.params;
    removeCategory(id, idCategory)
      .then((productCategory) => res.json(productCategory).status(201))
      .catch((err) => res.json(err));
  });

module.exports = router;
