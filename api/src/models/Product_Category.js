module.exports = (sequelize, DataTypes) => {
    return sequelize.define("product_category", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    });
};
