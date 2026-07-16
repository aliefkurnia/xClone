"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.Post, {
        foreignKey: "post_id",
        as: "post",
      });
      Comment.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }

  Comment.init(
    {
      comment_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      post_id: {
        type: DataTypes.UUID,
        references: {
          model: "posts",
          key: "post_id",
        },
      },
      user_id: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
      timestamps: false,
    }
  );

  return Comment;
};
