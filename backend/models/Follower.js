"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Follower extends Model {
    static associate(models) {
      // Asosiasi dengan User (Follower milik dua User)
      Follower.belongsTo(models.User, {
        foreignKey: "follower_user_id", // kolom yang menjadi foreign key di Follower
        as: "followerUser", // alias yang digunakan dalam query untuk follower
      });

      Follower.belongsTo(models.User, {
        foreignKey: "followed_user_id", // kolom yang menjadi foreign key di Follower
        as: "followedUser", // alias yang digunakan dalam query untuk followed
      });
    }
  }

  // Inisialisasi model Follower
  Follower.init(
    {
      follower_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      follower_user_id: {
        type: DataTypes.UUID,
        references: {
          model: "Users", // mengacu pada model User
          key: "user_id",
        },
      },
      followed_user_id: {
        type: DataTypes.UUID,
        references: {
          model: "Users", // mengacu pada model User
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
      modelName: "Follower", // Nama model ini
    }
  );

  return Follower;
};
