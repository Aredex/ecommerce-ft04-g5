const router = require("express").Router();
const {
    createOne,
    getAll,
    getOne,
    setProductAsociation,
    deleteOne,
    deleteMultiple,
} = require("../controllers/images");

router
    .route("/")
    .post((req, res) => {
        const { url } = req.body;

        createOne(url)
            .then((img) => res.json(img))
            .catch((err) => res.status(400).json(err));
    })
    .get((req, res) => {
        getAll()
            .then((imgs) => res.json(imgs))
            .catch((err) => res.status(404).json(err));
    })
    .delete((req, res) => {
        const { ids } = req.body;

        deleteMultiple(ids)
            .then(() =>
                res.status(204).json({ message: "Eliminado correctamente" })
            )
            .catch((err) => res.status(400).json(err));
    });

router
    .route("/:id")
    .get((req, res) => {
        const { id } = req.params;

        getOne(id)
            .then((img) => res.json(img))
            .catch((err) => res.status(404).json(err));
    })
    .delete((req, res) => {
        const { id } = req.params;

        deleteOne(id)
            .then(() =>
                res.status(204).json({
                    message: `Imagen con el id ${id} eliminada con éxito`,
                })
            )
            .catch((err) => res.status(404).json(err));
    });

router.route("/:id/products/:idProduct").put((req, res) => {
    const { id, idProduct } = req.params;
    setProductAsociation(id, idProduct)
        .then((img) => res.json(img))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;
