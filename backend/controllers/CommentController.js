// backend/controllers/CommentController.js
const { Comment } = require("../models");

const CommentController = {
  // Menambahkan komentar pada postingan
  addComment: async (req, res) => {
    try {
      const { user_id, post_id, content } = req.body;
      const comment = await Comment.create({ user_id, post_id, content });
      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ message: "Error adding comment", error: err });
    }
  },

  // Membaca semua komentar pada postingan tertentu
  getComments: async (req, res) => {
    try {
      const comments = await Comment.findAll({
        where: { post_id: req.params.post_id },
      });
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json({ message: "Error fetching comments", error: err });
    }
  },

  // Menghapus komentar berdasarkan ID
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      await comment.destroy();
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting comment", error: err });
    }
  },
};

module.exports = CommentController;
