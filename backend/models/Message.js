"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // Menambahkan asosiasi dengan User (Message dikirim oleh satu User dan diterima oleh satu User)
      Message.belongsTo(models.User, {
        foreignKey: "sender_user_id", // kolom yang menjadi foreign key untuk pengirim
        as: "sender", // alias untuk pengirim
      });

      Message.belongsTo(models.User, {
        foreignKey: "receiver_user_id", // kolom yang menjadi foreign key untuk penerima
        as: "receiver", // alias untuk penerima
      });
    }
  }

  Message.init(
    {
      message_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      sender_user_id: {
        type: DataTypes.UUID,
        references: {
          model: "Users", // Nama model yang menjadi referensi
          key: "user_id",
        },
      },
      receiver_user_id: {
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
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Message", // Nama model
      tableName: "messages", // Nama tabel yang sesuai
      timestamps: false, // Jika Anda tidak ingin Sequelize mengelola createdAt dan updatedAt otomatis
    }
  );

  return Message;
};
