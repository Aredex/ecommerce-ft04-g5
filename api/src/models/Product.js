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
            set(value) {
                this.setDataValue("name", value.trim().toLowerCase());
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: false,
            },
            set(value) {
                this.setDataValue("description", value.trim());
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
        views: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        errors: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
    });
};
