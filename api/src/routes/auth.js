const router = require("express").Router(),
  jwt = require("jsonwebtoken"),
  passport = require("passport"),
  { getOne, createOne } = require("../controllers/users");

const secret = process.env.AUTH_SECRET || "secret";

router.route("/login/email").post(function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", code: "unauthorized", info });
    } else {
      return res.json({
        user,
        token: jwt.sign({ uid: user.id, role: user.role }, secret),
      });
    }
  })(req, res, next);
});
router.route("/login/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.route("/login/google/callback").get(function (req, res, next) {
  passport.authorize("google", function (err, user) {
    if (err) return next(err);
    if (!user) {
      res.redirect(`${process.env.CALLBACK_URL_BASE || 'http://localhost:3000'}/sign-in?error=401`);
    } else {
      const token = jwt.sign({ uid: user.id, role: user.role }, secret);
      res.redirect(`${process.env.CALLBACK_URL_BASE || 'http://localhost:3000'}/sign-in?token=${token}`);
    }
  })(req, res, next);
});
router.route("/login/facebook").get(passport.authenticate("facebook"));
router.route("/login/facebook/callback").get(function (req, res, next) {
  passport.authorize("facebook", function (err, user) {
    if (err) return next(err);
    if (!user) {
      res.redirect(`${process.env.CALLBACK_URL_BASE || 'http://localhost:3000'}/sign-in?error=401`);
    } else {
      const token = jwt.sign({ uid: user.id, role: user.role }, secret);
      res.redirect(`${process.env.CALLBACK_URL_BASE || 'http://localhost:3000'}/sign-in?token=${token}`);
    }
  })(req, res, next);
});
router.route("/register").post(async (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body;
  try {
    const user = await createOne(name, email, password)
    return res.json({
      user,
      token: jwt.sign({ uid: user.id, role: user.role }, secret),
    });
  }
  catch (err) { res.status(400).json(err) }
})
router.route("/me").get(async (req, res) => {
  if (!req.user) {
    res.sendStatus(401);
  } else if (!req.user.uid) {
    res.sendStatus(401);
  } else {
    const user = await getOne(req.user.uid);
    const { id, name, email, role, status, createdAt, updatedAt, address } = user;
    res.json({ id, name, email, role, status, createdAt, updatedAt, address });
  }
});

module.exports = router;
