module.exports = (sequelize, DataTypes) => {
    // defino el modelo
    return sequelize.define("order", {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
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
        },
    });
};
