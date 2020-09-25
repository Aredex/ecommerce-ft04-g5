const router = require("express").Router();
const isAdmin = require("../lib/isAdmin");
const isUser = require("../lib/isUser");

const {
  createOne,
  getAll,
  getOne,
  editOne,
  deleteOne,
  getOneByEmail
} = require("../controllers/users");
const { getOrderByUser } = require("../controllers/users_order");
const { getAll: getReviews } = require("../controllers/reviews");

const { passwordReset } = require("../mailmodel/passwordReset")
const jwt = require('jsonwebtoken');
const secret = process.env.AUTH_SECRET || 'secret';


router
  .route("/")
  .post((req, res) => {
    const { name, email, password, role } = req.body;

    createOne(name, email, password, role)
      .then((user) => res.json(user).status(201))
      .catch((err) => res.status(400).json(err));
  })
  .get((req, res) => {
    if (isAdmin(req)) {
      getAll()
        .then((users) => res.json(users).status(200))
        .catch((err) => res.status(404).json(err));
    } else {
      res.sendStatus(401);
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    if (isAdmin(req) || (isUser(req) && req.user.uid == id)) {
      getOne(id)
        .then((user) => res.json(user))
        .catch((err) => res.status(404).json(err));
    } else {
      res.sendStatus(401);
    }
  })
  .put((req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    if (isAdmin(req) || (isUser(req) && req.user.uid === id)) {
      editOne({
        id,
        name,
        email,
        password,
        role,
      })
        .then((user) => res.json(user))
        .catch((err) =>
          res.status(400).json({
            err,
          })
        );
    } else {
      res.sendStatus(401);
    }
  })
  .delete((req, res) => {
    const { id } = req.params;

    if (isAdmin(req) || (isUser(req) && req.user.uid === id)) {
      deleteOne(id)
        .then((user) => res.json(user).status(200))
        .catch((err) => res.status(400).json(err));
    } else {
      res.sendStatus(401);
    }
  });

router.route("/:id/orders").get((req, res) => {
  const { id } = req.params;
  if (isAdmin(req) || (isUser(req) && req.user.uid === id)) {
    getOrderByUser(id)
      .then((orders) => res.json(orders).status(200))
      .catch((err) => res.json(err));
  } else {
    res.sendStatus(401);
  }
});

// Retorna todas las reviews hechas por el usuario según su id
router.route("/:id/reviews").get((req, res) => {
  const { id } = req.params;

  if (isAdmin(req) || (isUser(req) && req.user.uid === id)) {
    getReviews({
      idUser: id,
    })
      .then((reviews) => res.json(reviews).status(200))
      .catch((err) => res.json(err));
  } else {
    res.sendStatus(401);
  }
});

router.route("/:id/toadmin").put((req, res) => {
  const { id } = req.params;
  if (isAdmin(req)) {
    editOne({
      id,
      role: "ADMIN",
    })
      .then((user) => res.json(user))
      .catch((err) =>
        res.status(400).json({
          err,
        })
      );
  } else {
    res.sendStatus(401);
  }
});

router.route("/:id/toguest").put((req, res) => {
  const { id } = req.params;
  if (isAdmin(req)) {
    editOne({
      id,
      role: "GUEST",
    })
      .then((user) => res.json(user))
      .catch((err) =>
        res.status(400).json({
          err,
        })
      );
  } else {
    res.sendStatus(401);
  }
});

router.route("/reset/resetpassword")
  .put((req, res) => {
    const { newPassword, token } = req.body;
    jwt.verify(token, secret, (error, user) => {
      if (error) res.sendStatus(401)
      else {
        editOne({ id: user.uid, password: newPassword })
          .then((user) => res.json(user))
          .catch((err) => res.status(400).json({ err }));
      }
    })
  });

router.route("/reset/password")
  .post((req, res) => {
    getOneByEmail(req.body.email)
      .then((user) => {
        var html = passwordReset(user)
        res.send(html)
      })
  })

module.exports = router;