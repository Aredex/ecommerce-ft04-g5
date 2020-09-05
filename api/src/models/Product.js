module.exports = (sequelize, DataTypes) => {
    // defino el modelo
    return sequelize.define("product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: false,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: false,
            },
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: false,
            },
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                notEmpty: false,
            },
        },
    });
};
