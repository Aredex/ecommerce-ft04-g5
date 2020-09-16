const jwt = require("jsonwebtoken"),
  { getOneByEmail } = require("./controllers/users"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  BearerStrategy = require("passport-http-bearer").Strategy;

const secret = process.env.AUTH_SECRET || "secret";

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password", session: false },
    async (username, password, done) => {
      const user = await getOneByEmail(username);
      if (!user)
        return done(null, false, {
          message: "Username or password is incorrect",
        });
      if (!user.compare(password))
        return done(null, false, {
          message: "Username or password is incorrect",
        });
      const { id, name, email, role, status, createdAt, updatedAt } = user;
      return done(null, {
        id,
        name,
        email,
        role,
        status,
        createdAt,
        updatedAt,
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
