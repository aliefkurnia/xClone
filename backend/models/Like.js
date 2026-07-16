"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Like.belongsTo(models.Post, {
        foreignKey: "post_id",
        as: "post",
      });
    }
  }

  Like.init(
    {
      like_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      post_id: {
        type: DataTypes.UUID,
        references: {
          model: "posts",
          key: "post_id",
        },
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Like",
      tableName: "likes",
      timestamps: false,
    }
  );

  return Like;
};
