const { Category, Product } = require("../db");

const getAll = () => {
  return new Promise((resolve, reject) => {
    Category.findAll({})
      .then((categories) => {
        resolve(categories);
      })
      .catch((err) => {
        reject({
          error: err.message,
        });
      });
  });
};

const getOne = (id) => {
  return new Promise((resolve, reject) => {
    Category.findOne({
      where: { id },
      include: [Product],
    })
      .then((category) => {
        if (!category) {
          reject({
            error: "No existe en la base de datos",
          });
        }

        resolve(category);
      })
      .catch((err) => {
        reject({
          error: err.message,
        });
      });
  });
};

const createOne = (name, description) => {
  return new Promise((resolve, reject) => {
    Category.create({ name, description })
      .then((category) => {
        resolve(category);
      })
      .catch((err) => {
        reject({
          error: err.message,
        });
      });
  });
};

const editOne = (id, name, description) => {
  return new Promise((resolve, reject) => {
    getOne(id)
      .then((category) => {
        category.name = name;
        category.description = description;

        return category.save();
      })
      .then((category) => {
        resolve(category);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    getOne(id)
      .then((category) => {
        category.destroy();

        resolve({
          description: "successfully removed object",
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports = {
  getAll,
  createOne,
  getOne,
  editOne,
  deleteOne,
};
