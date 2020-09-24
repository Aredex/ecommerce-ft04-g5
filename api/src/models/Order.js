module.exports = (sequelize, DataTypes) => {
    // defino el modelo
    return sequelize.define("order", {
        status: {
            type: DataTypes.ENUM,
            values: [
                "IN CREATION",
                "PENDING_PAYMENT",
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
        payment_method_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        payment_type_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        payment_status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        payment_status_detail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        card_expiration_month: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        card_expiration_year: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        card_first_six_digits: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        card_last_four_digits: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
};
