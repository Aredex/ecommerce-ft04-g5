const router = require("express").Router(),
  productRouter = require("./product"),
  paymentRouter = require("./payment"),
  categoryRouter = require("./category"),
  ImageProductRouter = require("./image"),
  UserRouter = require("./user"),
  OrderRouter = require("./order"),
  ReviewRouter = require("./review"),
  authRouter = require("./auth");

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use("/auth", authRouter);
router.use("/payment", paymentRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/images", ImageProductRouter);
router.use("/users", UserRouter);
router.use("/orders", OrderRouter);
router.use("/reviews", ReviewRouter);

module.exports = router;
