const { getOne: getProduct } = require("./products");
const { getOne: getCategory } = require("./categories");
<<<<<<< HEAD
// ==============================================
//      ESTOS METODOS RETORNAN PROMESAS
// ==============================================

// Dado el Id de un producto y el Id de una categoría
// Agrega dicha categoría a dicho producto
const addCategory = async (IdProduct, IdCategory) => {
    const Product = await getProduct(IdProduct);
    const Category = await getCategory(IdCategory);

    return new Promise((resolve, reject) => {
        Product.addCategory(Category) // Agregamos la categoría
            .then((product_category) => resolve(product_category))
            .catch((err) => reject(err));
    });
};

// TODO Falta implementar en las rutas y comprobar funcionamiento
const removeCategory = async (IdProduct, IdCategory) => {
    const Product = await getProduct(IdProduct);
    const Category = await getCategory(IdCategory);

    return new Promise((resolve, reject) => {
        Product.removeCategory(Category)
            .then((product_category) => resolve(product_category))
            .catch((err) => reject(err));
    });
};

module.exports = {
    addCategory,
    removeCategory,
=======

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
>>>>>>> dev
};
