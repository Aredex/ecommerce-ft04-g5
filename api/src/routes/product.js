const router = require("express").Router();
const { addCategory } = require("../controllers/products_categories");
const {
  getAll,
  getOne,
  createOne,
  editOne,
  deleteOne,
} = require("../controllers/products");

router.get("/", (req, res, next) => {
  getAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  getOne(id)
    .then((products) => res.json(products))
    .catch((err) => res.status(404).json(err));
});
//
router.post("/", (req, res) => {
  const { name, description, price } = req.body;

  createOne(name, description, price)
    .then((products) => res.status(201).json(products))
    .catch((err) => res.status(400).json(err));
});

router.put("/:id", (req, res) => {
  let { id } = req.params;
  id = Number(id);
  const { name, description, price, stock, IdCategory } = req.body;

  if (IdCategory) {
    addCategory(id, IdCategory)
      .then((product_category) => res.json(product_category).status(201))
      .catch((err) => res.json(err));
  }
  editOne(id, name, description, price, stock)
    .then((product) => res.json(product).status(201))
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  id = Number(id);
  deleteOne(id)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((error) => {
      res.status(404).send("Producto inexistente");
    });
});

module.exports = router;

// server.put("/:id", (req, res) => {
//   let { id } = req.params;
//   id = Number(id);
//   const { name, description, price } = req.body;
//   Product.findOne({
//     where: { id },
//   })
//     .then((product) => {
//       product.name = name;
//       product.description = description;
//       console.log(product);
//       return product.save();
//     })
//     .then((product) => {
//       res
//         .json({
//           message: "El producto ha sido modificado!",
//           product,
//         })
//         .status(201);
//     })
//     .catch((err) => {
//       res.json({
//         message: "error",
//         error: err.message,
//       });
//     });
// });
