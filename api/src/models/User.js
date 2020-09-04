module.exports = (sequelize, DataTypes) => {
    return sequelize.define("users", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            values: ["ADMIN", "GUEST"],
            defaultValue: "GUEST",
        },
    });
};
