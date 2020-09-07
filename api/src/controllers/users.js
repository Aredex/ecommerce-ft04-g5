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

                return user.save();
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



module.exports = {
    createOne,
    getAll,
    getOne,
    editOne,
    deleteOne,
};
