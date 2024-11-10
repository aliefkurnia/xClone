"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      // Menambahkan asosiasi dengan Post (Comment milik satu Post)
      Comment.belongsTo(models.Post, {
        foreignKey: "post_id", // kolom yang menjadi foreign key di Comment
        as: "post", // alias yang digunakan dalam query
      });

      // Menambahkan asosiasi dengan User (Comment milik satu User)
      Comment.belongsTo(models.User, {
        foreignKey: "user_id", // kolom yang menjadi foreign key di Comment
        as: "user", // alias yang digunakan dalam query
      });
    }
  }

  // Inisialisasi model Comment
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
          model: "Posts", // mengacu pada model Post
          key: "post_id",
        },
      },
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: "Users", // mengacu pada model User
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
      modelName: "Comment", // Nama model ini
    }
  );

  return Comment;
};
