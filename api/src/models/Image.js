module.exports = (sequelize, DataTypes) => {
    // defino el modelo
    return sequelize.define("image", {
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isUrl: true,
                notEmpty: false,
            },
            set(value) {
                this.setDataValue("url", value.trim());
            },
            // unique: true
        },
    });
};
