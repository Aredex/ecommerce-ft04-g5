module.exports = (sequelize, DataTypes) => {
    // defino el modelo
    return sequelize.define("category", {
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
    });
};
