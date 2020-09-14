module.exports = (sequelize, DataTypes) => {
    // defino el modelo
    return sequelize.define("order", {
        status: {
            type: DataTypes.ENUM,
            values: [
                "IN CREATION",
                "CONFIRMED",
                "REJECTED",
                "PREPARING",
                "SENT",
                "DELIVERED",
                "FINALIZED",
            ],
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false,
            },
            defaultValue: 'Not specified',
            set(value) {
                this.setDataValue("address", value.trim().toLowerCase());
            },
        },
    });
};
