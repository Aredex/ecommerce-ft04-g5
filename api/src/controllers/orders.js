const { Order } = require("../db");

const getAll = () => {
  return new Promise((resolve, reject) => {
    Order.findAll({})
      .then((order) => resolve(order))
      .catch((err) => reject({ error: err.message }));
  });
};

module.exports = {
  getAll,
};
