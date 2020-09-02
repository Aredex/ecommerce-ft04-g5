<<<<<<< HEAD
const { Product, Category, Op } = require("../db");

// ==============================================
//      ESTOS METODOS RETORNAN PROMESAS
// ==============================================

const getAll = () => {
    return new Promise((resolve, reject) => {
        Product.findAll({})
            .then((products) => resolve(products))
            .catch((err) => reject({ error: err }));
    });
};

const createOne = (name, description, price) => {
    return new Promise((resolve, reject) => {
        if (!name || !description || !price) {
            return reject({ error: "Uno o mas parametros faltantes" });
        }
        Product.create({ name, description, price })
            .then((products) => resolve(products))
            .catch((err) => reject({ error: err.message }));
    });
};

const getOne = (id) => {
    return new Promise((resolve, reject) => {
        Product.findOne({ where: { id }, include: [Category] })
            .then((product) => {
                if (!product) {
                    return reject({ error: "No existe en la BD" });
                }

                resolve(product);
            })
            .catch((err) => reject({ error: err.message }));
    });
};

const editOne = (id, name, description, price) => {
    return new Promise((resolve, reject) => {
        getOne(id)
            .then((product) => {
                product.name = name;
                product.description = description;
                product.price = price;

                return product.save();
            })
            .then((product) => resolve(product))
            .catch((err) => reject(err));
    });
};

const getByQuery = (query) => {
    return new Promise((resolve, reject) => {
        if (!query) {
            return reject({ error: "Se necesita parámetro de búsqueda" });
        }

        Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } },
                ],
            },
        })
            .then((products) => resolve(products))
            .catch(() =>
                reject({
                    error: "No hay productos que conicidan con la búsqueda",
                })
            );
    });
};

module.exports = {
    getAll,
    createOne,
    getOne,
    editOne,
    getByQuery,
=======
const { Product, Category } = require("../db");
const { addCategory } = require("./products_categories");

const getAll = () => {
  return new Promise((resolve, reject) => {
    Product.findAll({})
      .then((products) => {
        resolve(products);
      })
      .catch((err) => {
        reject({
          error: err,
        });
      });
  });
};

const getOne = (id) => {
  return new Promise((resolve, reject) => {
    Product.findOne({ where: { id }, include: [Category] })
      .then((product) => {
        if (!product) {
          return reject({ error: "No existe en la BD" });
        }

        resolve(product);
      })
      .catch((err) => reject({ error: err.message }));
  });
};

const createOne = (name, description, price) => {
  return new Promise((resolve, reject) => {
    if (!name || !description || !price) {
      return reject({
        error: "Uno o mas parametros faltantes",
      });
    }
    Product.create({ name, description, price })
      .then((products) => resolve(products))
      .catch((err) => reject({ error: err.message }));
  });
};

const editOne = (id, name, description, price, stock, categoryName) => {
  return new Promise((resolve, reject) => {
    getOne(id)
      .then((product) => {
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;

        return product.save();
      })
      .then((product) => resolve(product))
      .catch((err) => reject(err));
  });
};

const deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    console.log(id);
    Product.findByPk(id)
      .then((product) => {
        if (!product) {
          return reject({ error: "No existe en la BD" });
        }
        product.destroy();
        resolve(product);
      })
      .catch((err) => reject(err));
  });
};

module.exports = {
  getAll,
  getOne,
  createOne,
  editOne,
  deleteOne,
>>>>>>> dev
};
