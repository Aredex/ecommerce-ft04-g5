const { User, Review, Product, Order } = require("../db");

const getAll = () => {
  return new Promise((resolve, reject) => {
    User.findAll({ order: [["id", "ASC"]] })
      .then((users) => {
        if (users.length === 0) {
          return reject({
            error: {
              name: "ApiFindError",
              type: "Users Error",
              errors: [
                {
                  message: "there are no users in the database",
                  type: "not found",
                  value: null,
                },
              ],
            },
          });
        }

        resolve(users);
      })
      .catch((err) => reject(err));
  });
};

const createOne = (name, email, password, role, googleId, facebookId) => {
  return new Promise((resolve, reject) => {
    User.create({ name, email, password, googleId, facebookId })
      .then((user) => {
        if (role) {
          if (role !== "ADMIN" && role !== "GUEST") {
            return reject({
              error: "Los campos para el rol son ADMIN o GUEST",
            });
          }

          user.role = role;
          user.save();
        }

        return user;
      })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};

const editOne = ({ id, name, email, password, role }) => {
  return new Promise((resolve, reject) => {
    getOne(id)
      .then((user) => {
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
          console.log("ANDO POR ACÁ");
          if (password.includes(" ")) {
            return reject({
              error: {
                message: "La contraseña no puede tener espacios en blanco",
              },
            });
          }
          user.password = password;
        }
        if (role) user.role = role;

        return user.save();
      })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};

const getOne = (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: { id },
      include: [
        { model: Review, include: Product },
        Review,
        { model: Order, include: Product },
      ],
    })
      .then((user) => {
        if (!user) {
          return reject({
            error: {
              name: "ApiFindError",
              type: "Users Error",
              errors: [
                {
                  message: "user does not exist in the database",
                  type: "not found",
                  value: null,
                },
              ],
            },
          });
        }

        resolve(user);
      })
      .catch((err) => reject(err));
  });
};

const getOneByEmail = async (email) => {
  try {
    const user = User.findOne({
      where: { email },
      include: [{ model: Review, include: Product }],
    });
    return user;
  } catch (error) {
    return error;
  }
};

const getOneByGoogleId = async (googleId) => {
  try {
    const user = User.findOne({
      where: { googleId },
      include: [{ model: Review, include: Product }],
    });
    return user;
  } catch (error) {
    return error;
  }
};

const getOneByFacebookId = async (facebookId) => {
  try {
    const user = User.findOne({
      where: { facebookId },
      include: [{ model: Review, include: Product }],
    });
    return user;
  } catch (error) {
    return error;
  }
};

const deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    getOne(id)
      .then((user) => {
        user.destroy();

        resolve({ description: "successfully deleted user" });
      })
      .catch((err) => reject(err));
  });
};

module.exports = {
  createOne,
  getAll,
  getOne,
  getOneByEmail,
  getOneByGoogleId,
  getOneByFacebookId,
  editOne,
  deleteOne,
};
