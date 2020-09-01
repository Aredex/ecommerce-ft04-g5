module.exports = (sequelize, DataTypes) => {
    // defino el modelo
    return sequelize.define("product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    });
};
