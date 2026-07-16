const { Comment, User } = require("../models");

const CommentController = {
  addComment: async (req, res) => {
    try {
      const user_id = req.auth.userId;
      const { post_id, content } = req.body;
      const comment = await Comment.create({ user_id, post_id, content });
      const full = await Comment.findByPk(comment.comment_id, {
        include: [{ model: User, as: "user", attributes: ["user_id","name","username","profile_picture"] }],
      });
      res.status(201).json(full);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error adding comment", error: err.message });
    }
  },

  getComments: async (req, res) => {
    try {
      const comments = await Comment.findAll({
        where: { post_id: req.params.post_id },
        include: [{ model: User, as: "user", attributes: ["user_id","name","username","profile_picture"] }],
        order: [["created_at", "ASC"]],
      });
      res.status(200).json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching comments", error: err.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) return res.status(404).json({ message: "Comment not found" });
      if (comment.user_id !== req.auth.userId) return res.status(403).json({ message: "Unauthorized" });
      await comment.destroy();
      res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting comment", error: err.message });
    }
  },
};

module.exports = CommentController;
