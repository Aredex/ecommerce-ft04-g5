module.exports = (sequelize, DataTypes) => {
    return sequelize.define("users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false,
            },
            set(value) {
                this.setDataValue("name", value.trim());
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: false,
            },
            set(value) {
                this.setDataValue("email", value.trim());
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false,
            },
            set(value) {
                this.setDataValue("password", value.trim());
            },
        },
        role: {
            type: DataTypes.ENUM,
            values: ["ADMIN", "GUEST"],
            defaultValue: "GUEST",
        },
    });
};
