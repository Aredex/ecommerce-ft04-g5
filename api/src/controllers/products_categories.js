const { getOne: getProduct } = require("./products");
const { getOne: getCategory } = require("./categories");

const addCategory = async (IdProduct, IdCategory) => {
  const Product = await getProduct(IdProduct);
  const Category = await getCategory(IdCategory);

  return new Promise((resolve, reject) => {
    Product.addCategory(Category)
      .then((product_category) => resolve(product_category))
      .catch((err) => reject(err));
  });
};

module.exports = {
  addCategory,
};
