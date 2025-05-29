"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Category, {
        foreignKey: "categoryId",
        targetKey: "id",
        as: "category",
      });

      Post.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "user",
      });

      //Mot post co nhieu image
      Post.hasMany(models.Image, {
        foreignKey: "postId",
        as: "images",
        sourceKey: "id",
      });

      Post.hasMany(models.Favorite, {
        foreignKey: "postId",
        as: "favorites",
        sourceKey: "id",
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      area: DataTypes.INTEGER,
      status: DataTypes.ENUM,
      address: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
        allowNull: false,
      },
      province: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      priceRangeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "PriceRanges",
          key: "id",
        },
        allowNull: false,
      },
      areaRangeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "AreaRanges",
          key: "id",
        },
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["SHOW", "HIDE"],
        defaultValue: "HIDE",
      },
      target: {
        type: DataTypes.ENUM,
        values: ["ALL", "MALE", "FEMALE"],
        defaultValue: "ALL",
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
