const router = require("express").Router();
// import all routers;
const productRouter = require("./product");
const categoryRouter = require("./category");
const ImageProductRouter = require("./image");
const UserRouter = require("./user");

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/images", ImageProductRouter);
router.use("/users", UserRouter);

module.exports = router;
