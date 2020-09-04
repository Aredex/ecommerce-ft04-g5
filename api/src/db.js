require("dotenv").config();
const { Sequelize, DataTypes, Op } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Importando todos los modelos
const ProductModel = require("./models/Product");
const CategoryModel = require("./models/Category");
const ImageModel = require("./models/Image");
const OrderModel = require("./models/Order");
const OrderProductModel = require("./models/Order_product");
const UserModel = require("./models/User");

// Haciendo la conexion a la BD
const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
    {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
);

// Instanciando Modelos para crear las tablas en la BD
const Product = ProductModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const Image = ImageModel(sequelize, DataTypes);
const Order = OrderModel(sequelize, DataTypes);
const Order_product = OrderProductModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

// Relación entre productos y categorías
Product.belongsToMany(Category, { through: "product_category" });
Category.belongsToMany(Product, { through: "product_category" });

// Relación entre productos e imágenes
Product.hasMany(Image);
Image.belongsTo(Product);

// Relación entre productos y Órdenes
Product.belongsToMany(Order, { through: "order_product" });
Order.belongsToMany(Product, { through: "order_product" });

// Relación entre usuarios y órdenes
User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
    DataTypes,
    Product,
    Category,
    Image,
    Order,
    Order_product,
    Op,
    User,
};
