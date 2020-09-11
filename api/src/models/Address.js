module.exports = (sequelize, DataTypes) => {
  return sequelize.define("address", {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false
      },
      set(value) {
        this.setDataValue("address", value.trim().toLowerCase());
      },
    },
  })
}