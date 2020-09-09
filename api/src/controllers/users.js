const { User } = require("../db");

const getAll = () => {
  return new Promise((resolve, reject) => {
    User.findAll()
      .then((users) => resolve(users))
      .catch((err) => reject(err));
  });
};

const createOne = (name, email, password, role) => {
  return new Promise((resolve, reject) => {
    User.create({ name, email, password })
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

const editOne = (id, name, email, password, role) => {
  return new Promise((resolve, reject) => {
    getOne(id)
      .then((user) => {
        user.name = name;
        user.email = email;
        user.password = password;
        if (role) {
          user.role = role;
        }
        user.save();
        return user.reload();
      })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};

const getOne = (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ where: { id } })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
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

// Cambia rol de usuario de GUEST por ADMIN
// TODO : avergiguar si puedo hacer un if dentro del audate para intercambiar los roles
const changeRole = (id) => {
  return new Promise((resolve, reject) => {
    User.update(
      { role: "ADMIN" },
      {
        where: {
          role: "GUEST",
        },
      }
    );
    getOne(id)
      .then((user) => {
        resolve({ description: "successfully updated users" });
        return user.save();
      })
      .catch((err) => reject(err));
  });
};

// Cambia rol de usuario de ADMIN por GUEST
const AdminToGuest = () => {
  return new Promise((resolve, reject) => {
    User.update(
      { role: "GUEST" },
      {
        where: {
          role: "ADMIN",
        },
      }
    )
      .then((user) => {
        resolve({ description: "successfully updated users" });
        return user.save();
      })
      .catch((err) => reject(err));
  });
};

module.exports = {
  createOne,
  getAll,
  getOne,
  editOne,
  deleteOne,
  changeRole,
  AdminToGuest,
};
