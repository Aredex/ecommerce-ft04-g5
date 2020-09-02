module.exports = (sequelize, DataTypes) => {
    // defino el modelo
    return sequelize.define("images_product", {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
    });
};
