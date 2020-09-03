module.exports = (sequelize, DataTypes) => {
  // defino el modelo
  return sequelize.define("order", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
