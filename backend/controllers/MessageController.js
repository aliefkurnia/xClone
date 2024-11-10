// backend/controllers/MessageController.js
const { Message } = require("../models");

const MessageController = {
  // Mengirim pesan
  sendMessage: async (req, res) => {
    try {
      const { sender_user_id, receiver_user_id, content } = req.body;
      const message = await Message.create({
        sender_user_id,
        receiver_user_id,
        content,
      });
      res.status(201).json(message);
    } catch (err) {
      res.status(500).json({ message: "Error sending message", error: err });
    }
  },

  // Membaca semua pesan
  getAllMessages: async (req, res) => {
    try {
      const messages = await Message.findAll();
      res.status(200).json(messages);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching all messages", error: err });
    }
  },

  // Membaca semua pesan berdasarkan receiver_user_id (specific user)
  getMessagesForUser: async (req, res) => {
    try {
      const { user_id } = req.params; // Mendapatkan user_id dari parameter URL
      const messages = await Message.findAll({
        where: {
          receiver_user_id: user_id, // Mengambil pesan berdasarkan receiver_user_id
        },
      });
      if (messages.length === 0) {
        return res
          .status(404)
          .json({ message: "No messages found for this user" });
      }
      res.status(200).json(messages);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching messages for user", error: err });
    }
  },
};

module.exports = MessageController;
