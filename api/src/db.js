require("dotenv").config();
const { Sequelize, DataTypes, Op } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const ProductModel = require("./models/Product");
const CategoryModel = require("./models/Category");
const ImageModel = require("./models/Image");
const OrderModel = require("./models/Order");
const OrderProductModel = require("./models/Order_product");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const Product = ProductModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const Image = ImageModel(sequelize, DataTypes);
const Order = OrderModel(sequelize, DataTypes);
const Order_product = OrderProductModel(sequelize, DataTypes);

Product.belongsToMany(Category, { through: "product_category" });
Category.belongsToMany(Product, { through: "product_category" });

Product.hasMany(Image);
Image.belongsTo(Product);

Product.belongsToMany(Order, { through: "order_product" });
Order.belongsToMany(Product, { through: "order_product" });

module.exports = {
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  DataTypes,
  Product,
  Category,
  Image,
  Order,
  Order_product,
  Op,
};
