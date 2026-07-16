const { Message, User } = require("../models");

const MessageController = {
  getAllMessages: async (req, res) => {
    try {
      const user_id = req.auth.userId;
      const msgs = await Message.findAll({
        where: { sender_user_id: user_id },
        include: [{ model: User, as: "receiver", attributes: ["user_id","name","username","profile_picture"] }],
        order: [["created_at", "DESC"]],
      });
      res.status(200).json(msgs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching messages", error: err.message });
    }
  },

  getMessagesForUser: async (req, res) => {
    try {
      const user_id = req.auth.userId;
      const otherUserId = req.params.user_id;
      const msgs = await Message.findAll({
        where: {
          [require("sequelize").Op.or]: [
            { sender_user_id: user_id, receiver_user_id: otherUserId },
            { sender_user_id: otherUserId, receiver_user_id: user_id },
          ],
        },
        include: [
          { model: User, as: "sender", attributes: ["user_id","name","username","profile_picture"] },
          { model: User, as: "receiver", attributes: ["user_id","name","username","profile_picture"] },
        ],
        order: [["created_at", "ASC"]],
      });
      res.status(200).json(msgs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching messages", error: err.message });
    }
  },

  sendMessage: async (req, res) => {
    try {
      const sender_user_id = req.auth.userId;
      const { receiver_user_id, content } = req.body;
      const msg = await Message.create({ sender_user_id, receiver_user_id, content });
      const full = await Message.findByPk(msg.message_id, {
        include: [{ model: User, as: "sender", attributes: ["user_id","name","username","profile_picture"] }],
      });
      res.status(201).json(full);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error sending message", error: err.message });
    }
  },
};

module.exports = MessageController;
