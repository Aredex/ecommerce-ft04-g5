const router = require("express").Router(),
  jwt = require("jsonwebtoken"),
  passport = require("passport");

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
      res.redirect("http://localhost:3000/sign-in?error=401");
    } else {
      const token = jwt.sign({ uid: user.id, role: user.role }, secret);
      res.redirect(`http://localhost:3000/sign-in?token=${token}`);
    }
  })(req, res, next);
});

module.exports = router;
