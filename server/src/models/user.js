"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: "userId",
        as: "post",
        sourceKey: "id",
      });

      User.hasMany(models.Favorite, {
        foreignKey: "userId",
        as: "favorites",
        sourceKey: "id",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM,
        values: ["ADMIN", "USER"],
        defaultValue: "USER",
      },
      avatar: DataTypes.STRING,
      fileNameAvatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
