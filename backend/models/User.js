"use strict";

const { Model } = require("sequelize");
const bcrypt = require("bcrypt"); // Import bcrypt

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Menambahkan asosiasi dengan Post (User dapat memiliki banyak Post)
      User.hasMany(models.Post, {
        foreignKey: "user_id", // kolom yang menjadi foreign key di Post
        as: "posts", // alias yang digunakan dalam query
      });

      // Menambahkan asosiasi dengan Comment (User dapat memiliki banyak Comment)
      User.hasMany(models.Comment, {
        foreignKey: "user_id", // kolom yang menjadi foreign key di Comment
        as: "comments", // alias yang digunakan dalam query
      });

      // Menambahkan asosiasi dengan Follower (User dapat mengikuti banyak User)
      User.hasMany(models.Follower, {
        foreignKey: "follower_user_id", // kolom yang menjadi foreign key di Follower
        as: "followers", // alias untuk followers
      });

      // Menambahkan asosiasi dengan Like (User dapat memberi Like pada banyak Post)
      User.hasMany(models.Like, {
        foreignKey: "user_id", // kolom yang menjadi foreign key di Like
        as: "likes", // alias yang digunakan dalam query
      });

      // Menambahkan asosiasi dengan Message (User dapat mengirim banyak Message)
      User.hasMany(models.Message, {
        foreignKey: "sender_user_id", // kolom yang menjadi foreign key di Message
        as: "sentMessages", // alias untuk pesan yang dikirim oleh User
      });

      User.hasMany(models.Message, {
        foreignKey: "receiver_user_id", // kolom yang menjadi foreign key di Message
        as: "receivedMessages", // alias untuk pesan yang diterima oleh User
      });
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "User", // Nama model
      tableName: "users", // Nama tabel yang sesuai
      timestamps: false, // Jika Anda tidak ingin Sequelize mengelola createdAt dan updatedAt otomatis
    }
  );

  // Menambahkan hash password sebelum menyimpan user
  User.addHook("beforeCreate", async (user, options) => {
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10); // Menggunakan bcrypt untuk hash password
      user.password = hashedPassword; // Gantikan password dengan hash
    }
  });

  return User;
};
