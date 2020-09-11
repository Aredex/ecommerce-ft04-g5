module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user_address', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  })
}