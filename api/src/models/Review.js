module.exports = (sequelize, DataTypes) => {
  return sequelize.define('review', {
    stars: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
      set(value) {
        this.setDataValue("title", value.trim().toLowerCase());
      }
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    }
  })
}