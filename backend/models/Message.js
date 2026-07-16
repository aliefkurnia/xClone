"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, {
        foreignKey: "sender_user_id",
        as: "sender",
      });
      Message.belongsTo(models.User, {
        foreignKey: "receiver_user_id",
        as: "receiver",
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
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      receiver_user_id: {
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
      modelName: "Message",
      tableName: "messages",
      timestamps: false,
    }
  );

  return Message;
};
