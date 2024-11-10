"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // Menambahkan asosiasi dengan User (Post milik satu User)
      Post.belongsTo(models.User, {
        foreignKey: "user_id", // kolom yang menjadi foreign key di Post
        as: "user", // alias yang digunakan dalam query
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
        type: DataTypes.UUID,
        references: {
          model: "Users", // Nama model yang menjadi referensi
          key: "user_id",
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      media_url: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Post", // Nama model
      tableName: "posts", // Nama tabel yang sesuai
      timestamps: false, // Jika Anda tidak ingin Sequelize mengelola createdAt dan updatedAt otomatis
    }
  );

  return Post;
};
