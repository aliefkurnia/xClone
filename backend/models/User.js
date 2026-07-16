"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: "user_id",
        as: "posts",
      });

      User.hasMany(models.Comment, {
        foreignKey: "user_id",
        as: "comments",
      });

      User.hasMany(models.Follower, {
        foreignKey: "follower_user_id",
        as: "followers",
      });

      User.hasMany(models.Like, {
        foreignKey: "user_id",
        as: "likes",
      });

      User.hasMany(models.Message, {
        foreignKey: "sender_user_id",
        as: "sentMessages",
      });

      User.hasMany(models.Message, {
        foreignKey: "receiver_user_id",
        as: "receivedMessages",
      });
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      bio: {
        type: DataTypes.TEXT,
      },
      profile_picture: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false,
    }
  );

  return User;
};
