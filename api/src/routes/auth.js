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

module.exports = router;
