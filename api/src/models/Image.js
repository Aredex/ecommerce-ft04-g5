module.exports = (sequelize, DataTypes) => {
    // defino el modelo
    return sequelize.define("image", {
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
    });
};
