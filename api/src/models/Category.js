module.exports = (sequelize, DataTypes) => {
    // defino el modelo
    return sequelize.define("category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};
