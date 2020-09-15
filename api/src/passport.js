const jwt = require("jsonwebtoken"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  BearerStrategy = require("passport-http-bearer").Strategy;

const secret = process.env.AUTH_SECRET || "secret";

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password", session: false },
    (username, password, done) => {
      if (username !== "admin")
        return done(null, false, {
          message: "Username or password is incorrect",
        });
      if (password !== "admin")
        return done(null, false, {
          message: "Username or password is incorrect",
        });
      return done(null, {
        id: 1,
        name: "diego rodríguez",
        role: "GUEST",
      });
    }
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, secret, function (err, user) {
      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

module.exports = passport;
