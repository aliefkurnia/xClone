"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Asosiasi dengan User (Post milik satu User)
      Post.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      // Asosiasi untuk Likes
      Post.hasMany(models.Like, {
        foreignKey: "post_id",
        as: "likes",
      });

      // Asosiasi untuk Comments (Replies)
      Post.hasMany(models.Comment, {
        foreignKey: "post_id",
        as: "comments",
      });

      // Self-referencing untuk Replies (Parent Post)
      Post.hasMany(models.Post, {
        foreignKey: "parent_post_id",
        as: "replies",
      });

      Post.belongsTo(models.Post, {
        foreignKey: "parent_post_id",
        as: "parentPost",
      });

      // Self-referencing untuk Retweets
      Post.hasMany(models.Post, {
        foreignKey: "retweet_of_post_id",
        as: "retweets",
      });

      Post.belongsTo(models.Post, {
        foreignKey: "retweet_of_post_id",
        as: "originalPost",
      });
    }
  }

  Post.init(
    {
      post_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      media_url: {
        type: DataTypes.STRING,
      },
      parent_post_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "posts",
          key: "post_id",
        },
      },
      retweet_of_post_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "posts",
          key: "post_id",
        },
      },
      view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      timestamps: false,
    }
  );

  return Post;
};
