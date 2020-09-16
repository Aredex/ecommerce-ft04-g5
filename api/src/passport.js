const jwt = require("jsonwebtoken"),
  { getOneByEmail } = require("./controllers/users"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  BearerStrategy = require("passport-http-bearer").Strategy,
  GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const SECRET = process.env.AUTH_SECRET || "secret",
  GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

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
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/login/google/callback",
      session: false,
    },
    async (token, tokenSecret, profile, done) => {
      console.log(token, tokenSecret, profile);
      const user = await getOneByEmail(profile.emails[0].value);
      const { id, name, email, role, status, createdAt, updatedAt } = user;
      if (!user)
        return done(null, false, {
          message: "No se pudo iniciar sesión",
        });
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
    jwt.verify(token, SECRET, function (err, user) {
      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

module.exports = passport;
