"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // Menambahkan asosiasi dengan User (Like dimiliki oleh satu User)
      Like.belongsTo(models.User, {
        foreignKey: "user_id", // kolom yang menjadi foreign key di Like
        as: "user", // alias yang digunakan dalam query
      });

      // Menambahkan asosiasi dengan Post (Like dimiliki oleh satu Post)
      Like.belongsTo(models.Post, {
        foreignKey: "post_id", // kolom yang menjadi foreign key di Like
        as: "post", // alias yang digunakan dalam query
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
        type: DataTypes.UUID,
        references: {
          model: "Users", // Nama model yang menjadi referensi
          key: "user_id",
        },
      },
      post_id: {
        type: DataTypes.UUID,
        references: {
          model: "Posts", // Nama model yang menjadi referensi
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
      modelName: "Like", // Nama model
      tableName: "likes", // Nama tabel yang sesuai
      timestamps: false, // Jika Anda tidak ingin Sequelize mengelola createdAt dan updatedAt otomatis
    }
  );

  return Like;
};
