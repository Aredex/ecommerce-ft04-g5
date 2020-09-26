const router = require("express").Router();
const isAdmin = require("../lib/isAdmin");
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
        const {
            url
        } = req.body;
        if (isAdmin(req)) {
            createOne(url)
                .then((img) => res.json(img))
                .catch((err) => res.status(400).json(err));

        } else {
            res.sendStatus(401)
        }
    })
    .get((req, res) => {
        getAll()
            .then((imgs) => res.json(imgs))
            .catch((err) => res.status(404).json(err));
    })
    .delete((req, res) => {
        const {
            ids
        } = req.body;
        if (isAdmin(req)) {
            deleteMultiple(ids)
                .then(() =>
                    res.status(204).json({
                        message: "Eliminado correctamente"
                    })
                )
                .catch((err) => res.status(400).json(err));

        } else {
            res.sendStatus(401)
        }
    });

router
    .route("/:id")
    .get((req, res) => {
        const {
            id
        } = req.params;

        getOne(id)
            .then((img) => res.json(img))
            .catch((err) => res.status(404).json(err));
    })
    .delete((req, res) => {
        const {
            id
        } = req.params;
        if (isAdmin(req)) {
            deleteOne(id)
                .then(() =>
                    res.status(204).json({
                        message: `Imagen con el id ${id} eliminada con éxito`,
                    })
                )
                .catch((err) => res.status(404).json(err));

        } else {
            res.sendStatus(401)
        }
    });

router.route("/:id/products/:idProduct").put((req, res) => {
    const {
        id,
        idProduct
    } = req.params;
    if (isAdmin(req)) {
        setProductAsociation(id, idProduct)
            .then((img) => res.json(img))
            .catch((err) => res.status(400).json(err));
    } else {
        res.sendStatus(401)
    }
});

module.exports = router;