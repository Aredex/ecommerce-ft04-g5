const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      set(value) {
        this.setDataValue("name", value.trim().toLowerCase());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: false,
      },
      set(value) {
        this.setDataValue("email", value ? value.trim().toLowerCase() : null);
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
      set(value) {
        if (value) {
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hash);
        }
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["ADMIN", "GUEST"],
      defaultValue: "GUEST",
    },
    status: {
      type: DataTypes.ENUM,
      values: ["ACTIVE", "INACTIVE"],
      defaultValue: "ACTIVE",
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
  });
  User.prototype.compare = function (pass) {
    return bcrypt.compareSync(pass, this.password);
  };
  return User;
};
