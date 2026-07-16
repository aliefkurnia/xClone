"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    static associate(models) {
      Follower.belongsTo(models.User, {
        foreignKey: "follower_user_id",
        as: "followerUser",
      });
      Follower.belongsTo(models.User, {
        foreignKey: "followed_user_id",
        as: "followedUser",
      });
    }
  }

  Follower.init(
    {
      follower_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      follower_user_id: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      followed_user_id: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Follower",
      tableName: "followers",
      timestamps: false,
    }
  );

  return Follower;
};
