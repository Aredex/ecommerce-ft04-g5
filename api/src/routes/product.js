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
    getByQuery,
    deleteOne,
} = require("../controllers/products");

router
    .route("/")
    .get((req, res, next) => {
        return getAll()
            .then((products) => {
                res.send(products);
            })
            .catch(next);
    })
    .post((req, res) => {
        // TODO - Luego de crear el producto, para visualizarlo completamente, incluídas las fotos, es necesario llamar a la ruta de obtener un único producto.

        const { name, description, price, stock, imageUrl } = req.body;

        createOne(name, description, price, stock, imageUrl)
            .then((product) => res.status(201).json(product))
            .catch((err) => res.status(400).json(err));
    });

router.route("/search").get((req, res) => {
    const { name } = req.query;

    getByQuery(name)
        .then((products) => res.json(products))
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
        const { name, description, price, stock, imageUrl } = req.body;

        // res.json(req.body);

        editOne(id, name, description, price, stock, imageUrl)
            .then((product) => res.json(product).status(201))
            .catch((err) => res.json(err).status(404));
    })
    .delete((req, res) => {
        const { id } = req.params;
        deleteOne(id)
            .then((result) => res.status(204).json(result))
            .catch((err) => res.json(err).status(400));
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
